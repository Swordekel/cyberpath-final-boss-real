import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// ==================== TYPES ====================
interface UserData {
  name: string;
  email: string;
  password: string;
  bio: string;
  avatar: string;
  photoUrl: string;
  coverPhotoUrl: string;
  location: string;
  website: string;
  joinDate: string;
  totalPoints: number;
  quizzesCompleted: number;
  learningStreak: number;
  completedQuizzes: Array<{
    quizId: number;
    completedAt: string;
    score: number;
    pointsEarned: number;
  }>;
}

// ==================== HELPER FUNCTIONS ====================
function generateUserKey(email: string): string {
  return `user:${email}`;
}

function generateResetCodeKey(email: string): string {
  return `reset:${email}`;
}

// ==================== HEALTH CHECK ====================
app.get("/make-server-094aa1ac/health", (c) => {
  return c.json({ status: "ok" });
});

// ==================== USER REGISTRATION ====================
app.post("/make-server-094aa1ac/register", async (c) => {
  try {
    const body = await c.req.json();
    const { name, email, password } = body;

    // Validation
    if (!name || !email || !password) {
      return c.json({ error: "Name, email, and password are required" }, 400);
    }

    if (!email.includes('@')) {
      return c.json({ error: "Invalid email format" }, 400);
    }

    if (password.length < 6) {
      return c.json({ error: "Password must be at least 6 characters" }, 400);
    }

    // Check if user already exists (with error handling for KV store issues)
    const userKey = generateUserKey(email);
    let existingUser;
    
    try {
      existingUser = await kv.get(userKey);
    } catch (kvError) {
      console.error('KV Store error during user check:', kvError);
      // Return error to trigger localStorage fallback on client
      return c.json({ error: "Database connection error. Please try again or use offline mode." }, 503);
    }
    
    if (existingUser) {
      return c.json({ error: "Email already registered" }, 409);
    }

    // Create new user
    const newUser: UserData = {
      name,
      email,
      password, // In production, hash this with bcrypt!
      bio: 'Cyber security enthusiast passionate about learning and protecting digital assets.',
      avatar: '👨‍💻',
      photoUrl: '',
      coverPhotoUrl: '',
      location: 'Indonesia',
      website: 'https://cyberpath.io',
      joinDate: new Date().toISOString(),
      totalPoints: 0,
      quizzesCompleted: 0,
      learningStreak: 1,
      completedQuizzes: [],
    };

    // Save to database (with error handling)
    try {
      await kv.set(userKey, newUser);
    } catch (kvError) {
      console.error('KV Store error during user save:', kvError);
      return c.json({ error: "Database connection error. Please try again or use offline mode." }, 503);
    }

    // Return user data (without password)
    const { password: _, ...userWithoutPassword } = newUser;
    return c.json({ 
      success: true, 
      user: userWithoutPassword 
    }, 201);

  } catch (error) {
    console.error('Registration error:', error);
    return c.json({ error: 'Internal server error during registration' }, 500);
  }
});

// ==================== USER LOGIN ====================
app.post("/make-server-094aa1ac/login", async (c) => {
  try {
    const body = await c.req.json();
    const { email, password } = body;

    // Validation
    if (!email || !password) {
      return c.json({ error: "Email and password are required" }, 400);
    }

    // Get user from database (with error handling)
    const userKey = generateUserKey(email);
    let user;
    
    try {
      user = await kv.get(userKey);
    } catch (kvError) {
      console.error('KV Store error during login:', kvError);
      return c.json({ error: "Database connection error. Please try again or use offline mode." }, 503);
    }

    if (!user) {
      return c.json({ error: "Invalid email or password" }, 401);
    }

    // Check password
    if (user.password !== password) {
      return c.json({ error: "Invalid email or password" }, 401);
    }

    // Return user data (without password)
    const { password: _, ...userWithoutPassword } = user;
    return c.json({ 
      success: true, 
      user: userWithoutPassword 
    });

  } catch (error) {
    console.error('Login error:', error);
    return c.json({ error: 'Internal server error during login' }, 500);
  }
});

// ==================== GET USER DATA ====================
app.get("/make-server-094aa1ac/user/:email", async (c) => {
  try {
    const email = c.req.param('email');
    
    if (!email) {
      return c.json({ error: "Email is required" }, 400);
    }

    const userKey = generateUserKey(email);
    const user = await kv.get(userKey);

    if (!user) {
      return c.json({ error: "User not found" }, 404);
    }

    // Return user data (without password)
    const { password: _, ...userWithoutPassword } = user;
    return c.json({ user: userWithoutPassword });

  } catch (error) {
    console.error('Get user error:', error);
    return c.json({ error: 'Internal server error while fetching user' }, 500);
  }
});

// ==================== UPDATE USER PROFILE ====================
app.put("/make-server-094aa1ac/user/:email", async (c) => {
  try {
    const email = c.req.param('email');
    const updates = await c.req.json();

    if (!email) {
      return c.json({ error: "Email is required" }, 400);
    }

    // Get existing user
    const userKey = generateUserKey(email);
    const user = await kv.get(userKey);

    if (!user) {
      return c.json({ error: "User not found" }, 404);
    }

    // Update user data (merge with existing)
    const updatedUser = {
      ...user,
      ...updates,
      email: user.email, // Prevent email change
      password: user.password, // Prevent password change via this endpoint
    };

    // Save updated user
    await kv.set(userKey, updatedUser);

    // Return updated user (without password)
    const { password: _, ...userWithoutPassword } = updatedUser;
    return c.json({ 
      success: true, 
      user: userWithoutPassword 
    });

  } catch (error) {
    console.error('Update user error:', error);
    return c.json({ error: 'Internal server error while updating user' }, 500);
  }
});

// ==================== COMPLETE QUIZ ====================
app.post("/make-server-094aa1ac/quiz/complete", async (c) => {
  try {
    const body = await c.req.json();
    const { email, quizId, score, pointsEarned } = body;

    if (!email || quizId === undefined || score === undefined || pointsEarned === undefined) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    // Get user
    const userKey = generateUserKey(email);
    const user = await kv.get(userKey);

    if (!user) {
      return c.json({ error: "User not found" }, 404);
    }

    // Add completed quiz
    const completedQuiz = {
      quizId,
      completedAt: new Date().toISOString(),
      score,
      pointsEarned,
    };

    const updatedUser = {
      ...user,
      completedQuizzes: [...user.completedQuizzes, completedQuiz],
      totalPoints: user.totalPoints + pointsEarned,
      quizzesCompleted: user.quizzesCompleted + 1,
    };

    // Save updated user
    await kv.set(userKey, updatedUser);

    // Return updated user (without password)
    const { password: _, ...userWithoutPassword } = updatedUser;
    return c.json({ 
      success: true, 
      user: userWithoutPassword 
    });

  } catch (error) {
    console.error('Quiz completion error:', error);
    return c.json({ error: 'Internal server error while saving quiz completion' }, 500);
  }
});

// ==================== GET LEADERBOARD ====================
app.get("/make-server-094aa1ac/leaderboard", async (c) => {
  try {
    // Get all users from database (with error handling for KV store issues)
    let allUsers;
    
    try {
      allUsers = await kv.getByPrefix('user:');
    } catch (kvError) {
      console.error('KV Store error during leaderboard fetch:', kvError);
      // Return error to trigger localStorage fallback on client
      return c.json({ error: "Database connection error. Please try again or use offline mode." }, 503);
    }
    
    // Filter users who have completed at least 1 quiz
    const activeUsers = allUsers.filter(user => user.quizzesCompleted > 0);
    
    // Sort by totalPoints (descending)
    const sortedUsers = activeUsers
      .map(user => {
        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
      })
      .sort((a, b) => b.totalPoints - a.totalPoints);

    return c.json({ users: sortedUsers });

  } catch (error) {
    console.error('Leaderboard error:', error);
    return c.json({ error: 'Internal server error while fetching leaderboard' }, 500);
  }
});

// ==================== FORGOT PASSWORD - GENERATE RESET CODE ====================
app.post("/make-server-094aa1ac/forgot-password", async (c) => {
  try {
    const body = await c.req.json();
    const { email } = body;

    if (!email) {
      return c.json({ error: "Email is required" }, 400);
    }

    // Check if user exists
    const userKey = generateUserKey(email);
    const user = await kv.get(userKey);

    if (!user) {
      return c.json({ error: "Email not found" }, 404);
    }

    // Generate 6-digit reset code
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Store reset code with expiry (15 minutes)
    const resetCodeKey = generateResetCodeKey(email);
    await kv.set(resetCodeKey, {
      code: resetCode,
      expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
    });

    return c.json({ 
      success: true, 
      resetCode // In production, send via email instead!
    });

  } catch (error) {
    console.error('Forgot password error:', error);
    return c.json({ error: 'Internal server error during password reset request' }, 500);
  }
});

// ==================== RESET PASSWORD ====================
app.post("/make-server-094aa1ac/reset-password", async (c) => {
  try {
    const body = await c.req.json();
    const { email, resetCode, newPassword } = body;

    if (!email || !resetCode || !newPassword) {
      return c.json({ error: "Email, reset code, and new password are required" }, 400);
    }

    if (newPassword.length < 6) {
      return c.json({ error: "Password must be at least 6 characters" }, 400);
    }

    // Get reset code from database
    const resetCodeKey = generateResetCodeKey(email);
    const storedResetData = await kv.get(resetCodeKey);

    if (!storedResetData) {
      return c.json({ error: "Invalid or expired reset code" }, 400);
    }

    // Check if code matches
    if (storedResetData.code !== resetCode) {
      return c.json({ error: "Invalid reset code" }, 400);
    }

    // Check if code expired
    if (new Date(storedResetData.expiresAt) < new Date()) {
      await kv.del(resetCodeKey);
      return c.json({ error: "Reset code has expired" }, 400);
    }

    // Get user and update password
    const userKey = generateUserKey(email);
    const user = await kv.get(userKey);

    if (!user) {
      return c.json({ error: "User not found" }, 404);
    }

    // Update password
    user.password = newPassword; // In production, hash this!
    await kv.set(userKey, user);

    // Delete reset code
    await kv.del(resetCodeKey);

    return c.json({ success: true });

  } catch (error) {
    console.error('Reset password error:', error);
    return c.json({ error: 'Internal server error during password reset' }, 500);
  }
});

Deno.serve(app.fetch);