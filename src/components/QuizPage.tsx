import { Brain, CheckCircle, XCircle, Trophy, Clock, Lock, Zap, Target, Calendar, Flame, Star, Award } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Page } from '../App';
import { motion, AnimatePresence } from 'motion/react';

interface QuizPageProps {
  isLoggedIn: boolean;
  onNavigate: (page: Page) => void;
  userName: string;
  onQuizComplete?: (quizId: number, score: number, totalQuestions: number, maxPoints: number) => void;
  completedQuizzes?: number[];
}

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface Quiz {
  id: number;
  title: string;
  description: string;
  category: 'daily' | 'weekly' | 'monthly';
  difficulty: 'easy' | 'medium' | 'hard' | 'insane';
  questions: Question[];
  timeLimit: number; // in seconds
  points: number;
  status: 'available' | 'locked' | 'completed';
  deadline?: string;
}

const quizzes: Quiz[] = [
  // DAILY QUIZZES
  {
    id: 1,
    title: 'Cyber Basics Daily',
    description: 'Uji pemahaman dasar cybersecurity Anda setiap hari',
    category: 'daily',
    difficulty: 'easy',
    timeLimit: 180,
    points: 50,
    status: 'available',
    deadline: '24 jam',
    questions: [
      {
        id: 1,
        question: 'Apa kepanjangan dari CIA dalam konteks cybersecurity?',
        options: [
          'Central Intelligence Agency',
          'Confidentiality, Integrity, Availability',
          'Computer Information Access',
          'Cyber Intelligence Analysis'
        ],
        correctAnswer: 1,
      },
      {
        id: 2,
        question: 'Password yang kuat sebaiknya mengandung?',
        options: [
          'Hanya huruf kecil',
          'Kombinasi huruf, angka, dan simbol',
          'Hanya nama dan tanggal lahir',
          'Kata yang mudah diingat'
        ],
        correctAnswer: 1,
      },
      {
        id: 3,
        question: 'Apa yang dimaksud dengan malware?',
        options: [
          'Software untuk membuat email',
          'Software berbahaya yang merusak sistem',
          'Aplikasi antivirus',
          'Program untuk mempercepat komputer'
        ],
        correctAnswer: 1,
      },
      {
        id: 4,
        question: 'Apa fungsi utama antivirus?',
        options: [
          'Mempercepat internet',
          'Mendeteksi dan menghapus malware',
          'Membuat backup data',
          'Mengenkripsi file'
        ],
        correctAnswer: 1,
      },
      {
        id: 5,
        question: 'Protokol apa yang digunakan untuk browsing aman?',
        options: [
          'HTTP',
          'FTP',
          'HTTPS',
          'SMTP'
        ],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: 2,
    title: 'Network Security Check',
    description: 'Quiz harian tentang keamanan jaringan',
    category: 'daily',
    difficulty: 'medium',
    timeLimit: 240,
    points: 75,
    status: 'available',
    deadline: '24 jam',
    questions: [
      {
        id: 1,
        question: 'Apa fungsi utama dari firewall?',
        options: [
          'Mempercepat koneksi internet',
          'Menyimpan data backup',
          'Memfilter dan mengontrol traffic jaringan',
          'Mengenkripsi password'
        ],
        correctAnswer: 2,
      },
      {
        id: 2,
        question: 'Port default untuk HTTPS adalah?',
        options: [
          '80',
          '443',
          '8080',
          '3306'
        ],
        correctAnswer: 1,
      },
      {
        id: 3,
        question: 'Apa kepanjangan dari VPN?',
        options: [
          'Virtual Private Network',
          'Very Private Network',
          'Verified Public Network',
          'Virtual Public Node'
        ],
        correctAnswer: 0,
      },
      {
        id: 4,
        question: 'Serangan yang membanjiri server dengan traffic disebut?',
        options: [
          'Phishing',
          'SQL Injection',
          'DDoS',
          'XSS'
        ],
        correctAnswer: 2,
      },
      {
        id: 5,
        question: 'Apa itu IP Spoofing?',
        options: [
          'Mencuri password',
          'Memalsukan alamat IP',
          'Mengenkripsi data',
          'Memblokir website'
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: 3,
    title: 'Advanced Threat Daily',
    description: 'Tantangan harian untuk ancaman tingkat lanjut',
    category: 'daily',
    difficulty: 'hard',
    timeLimit: 300,
    points: 100,
    status: 'available',
    deadline: '24 jam',
    questions: [
      {
        id: 1,
        question: 'Apa yang dimaksud dengan Zero-Day Exploit?',
        options: [
          'Exploit yang sudah dipatch',
          'Vulnerability yang belum diketahui vendor',
          'Serangan yang gagal',
          'Malware yang tidak berbahaya'
        ],
        correctAnswer: 1,
      },
      {
        id: 2,
        question: 'Teknik APT (Advanced Persistent Threat) biasanya menargetkan?',
        options: [
          'User biasa',
          'Organisasi/perusahaan besar',
          'Website kecil',
          'Mobile apps'
        ],
        correctAnswer: 1,
      },
      {
        id: 3,
        question: 'Apa itu Fileless Malware?',
        options: [
          'Malware yang tidak ada filenya',
          'Malware yang berjalan di memory tanpa file di disk',
          'Malware yang sudah dihapus',
          'Malware untuk mobile'
        ],
        correctAnswer: 1,
      },
      {
        id: 4,
        question: 'SIEM adalah singkatan dari?',
        options: [
          'Security Information and Event Management',
          'System Integration Event Monitor',
          'Secure Internet Email Manager',
          'Software Installation Event Module'
        ],
        correctAnswer: 0,
      },
      {
        id: 5,
        question: 'Apa tujuan utama dari Threat Intelligence?',
        options: [
          'Membuat malware',
          'Mengidentifikasi dan mengantisipasi ancaman',
          'Menjual data',
          'Mempercepat network'
        ],
        correctAnswer: 1,
      },
    ],
  },

  // WEEKLY QUIZZES
  {
    id: 4,
    title: 'Web Security Fundamentals',
    description: 'Quiz mingguan tentang keamanan aplikasi web',
    category: 'weekly',
    difficulty: 'easy',
    timeLimit: 300,
    points: 100,
    status: 'available',
    deadline: '7 hari',
    questions: [
      {
        id: 1,
        question: 'Apa yang dimaksud dengan Cookie?',
        options: [
          'Makanan ringan',
          'Data kecil yang disimpan di browser',
          'Virus komputer',
          'Jenis encryption'
        ],
        correctAnswer: 1,
      },
      {
        id: 2,
        question: 'HTTP method yang digunakan untuk mengirim data form adalah?',
        options: [
          'GET',
          'POST',
          'PUT',
          'DELETE'
        ],
        correctAnswer: 1,
      },
      {
        id: 3,
        question: 'Apa kepanjangan dari SSL?',
        options: [
          'Secure Socket Layer',
          'System Security Lock',
          'Safe Server Link',
          'Security System Layer'
        ],
        correctAnswer: 0,
      },
      {
        id: 4,
        question: 'Session Hijacking adalah?',
        options: [
          'Membuat session baru',
          'Mencuri session user yang sedang aktif',
          'Menghapus session',
          'Mengenkripsi session'
        ],
        correctAnswer: 1,
      },
      {
        id: 5,
        question: 'CORS adalah singkatan dari?',
        options: [
          'Cross-Origin Request Security',
          'Cross-Origin Resource Sharing',
          'Core Origin Request System',
          'Certified Origin Resource Service'
        ],
        correctAnswer: 1,
      },
      {
        id: 6,
        question: 'Apa fungsi dari Content Security Policy (CSP)?',
        options: [
          'Mengenkripsi konten',
          'Mencegah XSS attacks',
          'Mempercepat loading',
          'Backup konten'
        ],
        correctAnswer: 1,
      },
      {
        id: 7,
        question: 'JWT adalah singkatan dari?',
        options: [
          'Java Web Token',
          'JSON Web Token',
          'Just Web Transfer',
          'JavaScript Web Tool'
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: 5,
    title: 'Cryptography Challenge',
    description: 'Uji pengetahuan kriptografi Anda',
    category: 'weekly',
    difficulty: 'medium',
    timeLimit: 360,
    points: 150,
    status: 'available',
    deadline: '7 hari',
    questions: [
      {
        id: 1,
        question: 'Apa perbedaan antara symmetric dan asymmetric encryption?',
        options: [
          'Tidak ada perbedaan',
          'Symmetric menggunakan satu kunci, asymmetric menggunakan sepasang kunci',
          'Symmetric lebih lambat dari asymmetric',
          'Asymmetric tidak aman'
        ],
        correctAnswer: 1,
      },
      {
        id: 2,
        question: 'Algoritma enkripsi mana yang termasuk symmetric?',
        options: [
          'RSA',
          'AES',
          'ECC',
          'DSA'
        ],
        correctAnswer: 1,
      },
      {
        id: 3,
        question: 'Apa fungsi utama dari hashing?',
        options: [
          'Enkripsi data',
          'Verifikasi integritas data',
          'Kompresi file',
          'Transfer data'
        ],
        correctAnswer: 1,
      },
      {
        id: 4,
        question: 'SHA-256 menghasilkan hash dengan ukuran?',
        options: [
          '128 bit',
          '256 bit',
          '512 bit',
          '1024 bit'
        ],
        correctAnswer: 1,
      },
      {
        id: 5,
        question: 'Algoritma hashing mana yang sudah tidak aman?',
        options: [
          'SHA-256',
          'SHA-3',
          'MD5',
          'bcrypt'
        ],
        correctAnswer: 2,
      },
      {
        id: 6,
        question: 'Apa itu Digital Signature?',
        options: [
          'Tanda tangan elektronik menggunakan kriptografi',
          'Password',
          'Username',
          'Fingerprint'
        ],
        correctAnswer: 0,
      },
      {
        id: 7,
        question: 'Public Key digunakan untuk?',
        options: [
          'Dekripsi',
          'Enkripsi',
          'Hashing',
          'Kompresi'
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: 6,
    title: 'Penetration Testing Pro',
    description: 'Quiz mingguan untuk ethical hacker',
    category: 'weekly',
    difficulty: 'hard',
    timeLimit: 420,
    points: 200,
    status: 'available',
    deadline: '7 hari',
    questions: [
      {
        id: 1,
        question: 'Fase pertama dalam penetration testing adalah?',
        options: [
          'Exploitation',
          'Reconnaissance',
          'Reporting',
          'Covering tracks'
        ],
        correctAnswer: 1,
      },
      {
        id: 2,
        question: 'Tool yang paling umum digunakan untuk port scanning?',
        options: [
          'Wireshark',
          'Metasploit',
          'Nmap',
          'Burp Suite'
        ],
        correctAnswer: 2,
      },
      {
        id: 3,
        question: 'Apa itu Privilege Escalation?',
        options: [
          'Meningkatkan hak akses dari user biasa ke admin',
          'Menurunkan privilege',
          'Membuat user baru',
          'Menghapus user'
        ],
        correctAnswer: 0,
      },
      {
        id: 4,
        question: 'Metasploit Framework digunakan untuk?',
        options: [
          'Antivirus',
          'Exploitation',
          'Backup data',
          'Email client'
        ],
        correctAnswer: 1,
      },
      {
        id: 5,
        question: 'Apa yang dimaksud dengan Lateral Movement?',
        options: [
          'Berpindah dari satu sistem ke sistem lain dalam network',
          'Menghapus log',
          'Upload malware',
          'Shutdown sistem'
        ],
        correctAnswer: 0,
      },
      {
        id: 6,
        question: 'Tool untuk web application security testing?',
        options: [
          'Nmap',
          'Wireshark',
          'Burp Suite',
          'Nessus'
        ],
        correctAnswer: 2,
      },
      {
        id: 7,
        question: 'Apa itu Reverse Shell?',
        options: [
          'Shell normal',
          'Target connects back to attacker',
          'Antivirus feature',
          'Firewall rule'
        ],
        correctAnswer: 1,
      },
      {
        id: 8,
        question: 'OSINT adalah singkatan dari?',
        options: [
          'Open Source Intelligence',
          'Operating System Internet',
          'Online Security Integration',
          'Official System Interface'
        ],
        correctAnswer: 0,
      },
    ],
  },
  {
    id: 7,
    title: 'Binary Exploitation Master',
    description: 'Quiz ekstrem tentang binary exploitation',
    category: 'weekly',
    difficulty: 'insane',
    timeLimit: 480,
    points: 300,
    status: 'available',
    deadline: '7 hari',
    questions: [
      {
        id: 1,
        question: 'Apa yang dimaksud dengan Buffer Overflow?',
        options: [
          'Buffer terlalu kecil',
          'Menulis data melebihi batas buffer',
          'Buffer kosong',
          'Buffer error'
        ],
        correctAnswer: 1,
      },
      {
        id: 2,
        question: 'ROP adalah singkatan dari?',
        options: [
          'Return Oriented Programming',
          'Remote Operation Protocol',
          'Reverse Open Port',
          'Real Operating Process'
        ],
        correctAnswer: 0,
      },
      {
        id: 3,
        question: 'Teknik untuk bypass ASLR adalah?',
        options: [
          'Information leak',
          'Install antivirus',
          'Restart komputer',
          'Update OS'
        ],
        correctAnswer: 0,
      },
      {
        id: 4,
        question: 'NX/DEP melindungi dari?',
        options: [
          'Code injection di stack',
          'Password cracking',
          'DDoS',
          'Phishing'
        ],
        correctAnswer: 0,
      },
      {
        id: 5,
        question: 'Apa itu Heap Spraying?',
        options: [
          'Mengisi heap dengan data untuk exploit',
          'Membersihkan heap',
          'Memperbesar heap',
          'Backup heap'
        ],
        correctAnswer: 0,
      },
      {
        id: 6,
        question: 'Format String Vulnerability terjadi karena?',
        options: [
          'Salah format kode',
          'User input langsung di format string',
          'String terlalu panjang',
          'Encoding salah'
        ],
        correctAnswer: 1,
      },
      {
        id: 7,
        question: 'Teknik untuk exploit race condition?',
        options: [
          'TOCTOU (Time Of Check Time Of Use)',
          'Buffer overflow',
          'SQL injection',
          'XSS'
        ],
        correctAnswer: 0,
      },
      {
        id: 8,
        question: 'Apa fungsi dari Canary dalam stack protection?',
        options: [
          'Mendeteksi stack overflow',
          'Enkripsi stack',
          'Backup stack',
          'Kompresi stack'
        ],
        correctAnswer: 0,
      },
      {
        id: 9,
        question: 'Shellcode biasanya ditulis dalam bahasa?',
        options: [
          'Python',
          'Assembly',
          'JavaScript',
          'PHP'
        ],
        correctAnswer: 1,
      },
      {
        id: 10,
        question: 'PIE adalah singkatan dari?',
        options: [
          'Position Independent Executable',
          'Protected Internet Explorer',
          'Private IP Extension',
          'Process Isolation Engine'
        ],
        correctAnswer: 0,
      },
    ],
  },

  // MONTHLY QUIZZES
  {
    id: 8,
    title: 'Cybersecurity Fundamentals',
    description: 'Quiz bulanan komprehensif untuk pemula',
    category: 'monthly',
    difficulty: 'easy',
    timeLimit: 600,
    points: 200,
    status: 'available',
    deadline: '30 hari',
    questions: [
      {
        id: 1,
        question: 'Tiga pilar utama cybersecurity (CIA Triad) adalah?',
        options: [
          'Cost, Investment, Asset',
          'Confidentiality, Integrity, Availability',
          'Computer, Internet, Access',
          'Control, Implementation, Authentication'
        ],
        correctAnswer: 1,
      },
      {
        id: 2,
        question: 'Apa yang dimaksud dengan phishing?',
        options: [
          'Teknik memancing ikan',
          'Serangan untuk mencuri informasi dengan menyamar',
          'Metode enkripsi',
          'Jenis firewall'
        ],
        correctAnswer: 1,
      },
      {
        id: 3,
        question: 'Two-Factor Authentication (2FA) menambahkan lapisan keamanan berupa?',
        options: [
          'Password kedua',
          'Verifikasi tambahan selain password',
          'Antivirus',
          'Firewall'
        ],
        correctAnswer: 1,
      },
      {
        id: 4,
        question: 'Apa itu ransomware?',
        options: [
          'Software gratis',
          'Malware yang mengenkripsi data dan meminta tebusan',
          'Antivirus',
          'Backup tool'
        ],
        correctAnswer: 1,
      },
      {
        id: 5,
        question: 'VPN digunakan untuk?',
        options: [
          'Mempercepat internet',
          'Membuat koneksi terenkripsi',
          'Backup data',
          'Antivirus'
        ],
        correctAnswer: 1,
      },
      {
        id: 6,
        question: 'Social engineering adalah?',
        options: [
          'Teknik programming',
          'Manipulasi psikologis untuk mendapat informasi',
          'Jenis malware',
          'Protokol network'
        ],
        correctAnswer: 1,
      },
      {
        id: 7,
        question: 'Patch/update software penting untuk?',
        options: [
          'Mempercantik tampilan',
          'Menutup vulnerability keamanan',
          'Memperbesar ukuran software',
          'Menghapus data'
        ],
        correctAnswer: 1,
      },
      {
        id: 8,
        question: 'Apa itu firewall?',
        options: [
          'Tembok api literal',
          'Sistem untuk memfilter traffic jaringan',
          'Antivirus',
          'Browser'
        ],
        correctAnswer: 1,
      },
      {
        id: 9,
        question: 'Backup data penting untuk?',
        options: [
          'Mempercepat komputer',
          'Recovery saat terjadi kehilangan data',
          'Menghemat storage',
          'Membuat virus'
        ],
        correctAnswer: 1,
      },
      {
        id: 10,
        question: 'HTTPS lebih aman dari HTTP karena?',
        options: [
          'Lebih cepat',
          'Menggunakan enkripsi SSL/TLS',
          'Gratis',
          'Warna berbeda'
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: 9,
    title: 'Application Security Expert',
    description: 'Quiz bulanan untuk keamanan aplikasi',
    category: 'monthly',
    difficulty: 'medium',
    timeLimit: 720,
    points: 300,
    status: 'available',
    deadline: '30 hari',
    questions: [
      {
        id: 1,
        question: 'Apa yang dimaksud dengan SQL Injection?',
        options: [
          'Teknik mempercepat query',
          'Serangan yang memanfaatkan input untuk eksekusi SQL berbahaya',
          'Metode backup database',
          'Protokol keamanan'
        ],
        correctAnswer: 1,
      },
      {
        id: 2,
        question: 'XSS adalah singkatan dari?',
        options: [
          'Extra Security System',
          'Cross-Site Scripting',
          'XML Security Service',
          'eXtended SQL System'
        ],
        correctAnswer: 1,
      },
      {
        id: 3,
        question: 'Cara terbaik mencegah SQL Injection?',
        options: [
          'Tidak menggunakan database',
          'Prepared statements / parameterized queries',
          'Membuat password kuat',
          'Install antivirus'
        ],
        correctAnswer: 1,
      },
      {
        id: 4,
        question: 'CSRF adalah singkatan dari?',
        options: [
          'Cross-Site Request Forgery',
          'Certified Security Request Form',
          'Core System Request Filter',
          'Cyber Security Response Force'
        ],
        correctAnswer: 0,
      },
      {
        id: 5,
        question: 'OWASP Top 10 adalah?',
        options: [
          '10 hacker terbaik',
          '10 risiko keamanan aplikasi web paling kritis',
          '10 antivirus terbaik',
          '10 firewall teraman'
        ],
        correctAnswer: 1,
      },
      {
        id: 6,
        question: 'Stored XSS lebih berbahaya karena?',
        options: [
          'Script disimpan di server dan affects all users',
          'Lebih cepat',
          'Sulit dideteksi',
          'Tidak berbahaya'
        ],
        correctAnswer: 0,
      },
      {
        id: 7,
        question: 'Input validation sebaiknya dilakukan di?',
        options: [
          'Client-side saja',
          'Server-side saja',
          'Client-side dan server-side',
          'Tidak perlu'
        ],
        correctAnswer: 2,
      },
      {
        id: 8,
        question: 'Apa itu IDOR (Insecure Direct Object Reference)?',
        options: [
          'Akses object tanpa authorization check',
          'Metode enkripsi',
          'Jenis database',
          'Protocol network'
        ],
        correctAnswer: 0,
      },
      {
        id: 9,
        question: 'HTTPOnly flag pada cookie mencegah?',
        options: [
          'Cookie theft via JavaScript',
          'Cookie expiration',
          'Cookie creation',
          'Cookie deletion'
        ],
        correctAnswer: 0,
      },
      {
        id: 10,
        question: 'Rate limiting berguna untuk mencegah?',
        options: [
          'Brute force attacks',
          'Enkripsi',
          'Backup',
          'Logging'
        ],
        correctAnswer: 0,
      },
    ],
  },
  {
    id: 10,
    title: 'Enterprise Security Championship',
    description: 'Tantangan bulanan untuk security professional',
    category: 'monthly',
    difficulty: 'hard',
    timeLimit: 900,
    points: 500,
    status: 'available',
    deadline: '30 hari',
    questions: [
      {
        id: 1,
        question: 'Defense in Depth strategy melibatkan?',
        options: [
          'Satu layer security yang kuat',
          'Multiple layers of security controls',
          'Hanya firewall',
          'Hanya antivirus'
        ],
        correctAnswer: 1,
      },
      {
        id: 2,
        question: 'Apa itu Security Operations Center (SOC)?',
        options: [
          'Ruang server',
          'Tim yang memonitor dan merespons security incidents',
          'Software antivirus',
          'Jenis firewall'
        ],
        correctAnswer: 1,
      },
      {
        id: 3,
        question: 'SIEM digunakan untuk?',
        options: [
          'Email marketing',
          'Centralized logging dan security event analysis',
          'Backup data',
          'Web hosting'
        ],
        correctAnswer: 1,
      },
      {
        id: 4,
        question: 'Incident Response Plan harus mencakup?',
        options: [
          'Hanya contact info',
          'Preparation, Detection, Containment, Eradication, Recovery',
          'Hanya backup procedure',
          'Hanya password list'
        ],
        correctAnswer: 1,
      },
      {
        id: 5,
        question: 'Zero Trust Architecture berasumsi?',
        options: [
          'Trust everyone inside network',
          'Never trust, always verify',
          'Trust admin only',
          'No verification needed'
        ],
        correctAnswer: 1,
      },
      {
        id: 6,
        question: 'Threat modeling adalah proses?',
        options: [
          'Membuat malware',
          'Identifying dan analyzing potential threats',
          'Testing antivirus',
          'Installing firewall'
        ],
        correctAnswer: 1,
      },
      {
        id: 7,
        question: 'Red Team vs Blue Team exercise bertujuan?',
        options: [
          'Game online',
          'Simulate attacks dan test defense',
          'Programming competition',
          'Network speed test'
        ],
        correctAnswer: 1,
      },
      {
        id: 8,
        question: 'Compliance frameworks seperti ISO 27001 berguna untuk?',
        options: [
          'Programming standards',
          'Information security management standards',
          'Web design standards',
          'Hardware standards'
        ],
        correctAnswer: 1,
      },
      {
        id: 9,
        question: 'Security Orchestration, Automation and Response (SOAR) membantu?',
        options: [
          'Manual incident response',
          'Automate security operations',
          'Create malware',
          'Slow down response'
        ],
        correctAnswer: 1,
      },
      {
        id: 10,
        question: 'Risk assessment melibatkan?',
        options: [
          'Identifying assets, threats, vulnerabilities, dan impact',
          'Hanya install antivirus',
          'Hanya backup',
          'Tidak perlu apa-apa'
        ],
        correctAnswer: 0,
      },
      {
        id: 11,
        question: 'Business Continuity Plan (BCP) fokus pada?',
        options: [
          'Marketing strategy',
          'Maintaining operations during/after disaster',
          'Sales target',
          'Employee salary'
        ],
        correctAnswer: 1,
      },
      {
        id: 12,
        question: 'Apa itu Attack Surface?',
        options: [
          'Area fisik server',
          'Sum of all points where attacker can enter',
          'Jenis malware',
          'Antivirus feature'
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: 11,
    title: 'Ultimate Hacker Challenge',
    description: 'Quiz paling sulit untuk master hacker',
    category: 'monthly',
    difficulty: 'insane',
    timeLimit: 1200,
    points: 1000,
    status: 'available',
    deadline: '30 hari',
    questions: [
      {
        id: 1,
        question: 'Advanced Persistent Threat (APT) biasanya disponsori oleh?',
        options: [
          'Individu',
          'Nation-states atau organized groups',
          'Script kiddies',
          'Antivirus companies'
        ],
        correctAnswer: 1,
      },
      {
        id: 2,
        question: 'Teknik untuk detect rootkit di kernel level?',
        options: [
          'Antivirus scan',
          'System call hooking detection',
          'Browser check',
          'Email filtering'
        ],
        correctAnswer: 1,
      },
      {
        id: 3,
        question: 'Memory forensics dapat mengungkapkan?',
        options: [
          'Hanya file di disk',
          'Running processes, network connections, encryption keys',
          'Hanya browser history',
          'Tidak ada yang berguna'
        ],
        correctAnswer: 1,
      },
      {
        id: 4,
        question: 'Covert channel dapat digunakan untuk?',
        options: [
          'Normal communication',
          'Exfiltrate data bypassing security controls',
          'Legitimate file transfer',
          'Email service'
        ],
        correctAnswer: 1,
      },
      {
        id: 5,
        question: 'Side-channel attack memanfaatkan?',
        options: [
          'Software bugs',
          'Physical implementation characteristics (power, timing, EM)',
          'Network vulnerability',
          'Social engineering'
        ],
        correctAnswer: 1,
      },
      {
        id: 6,
        question: 'Spectre dan Meltdown adalah vulnerability di?',
        options: [
          'Web browser',
          'CPU speculative execution',
          'Operating system',
          'Database'
        ],
        correctAnswer: 1,
      },
      {
        id: 7,
        question: 'Polymorphic malware adalah?',
        options: [
          'Malware biasa',
          'Malware yang mengubah code setiap infeksi',
          'Malware yang tidak berbahaya',
          'Antivirus'
        ],
        correctAnswer: 1,
      },
      {
        id: 8,
        question: 'Sandbox escape technique digunakan untuk?',
        options: [
          'Main game',
          'Break out dari isolated environment',
          'Create sandbox',
          'Delete sandbox'
        ],
        correctAnswer: 1,
      },
      {
        id: 9,
        question: 'Domain fronting digunakan untuk?',
        options: [
          'Normal browsing',
          'Hide malicious traffic behind legitimate domains',
          'Speed up internet',
          'Block websites'
        ],
        correctAnswer: 1,
      },
      {
        id: 10,
        question: 'Adversarial machine learning attacks target?',
        options: [
          'Traditional software',
          'AI/ML models dengan input yang di-craft',
          'Hardware',
          'Network cables'
        ],
        correctAnswer: 1,
      },
      {
        id: 11,
        question: 'Supply chain attack menargetkan?',
        options: [
          'Direct target saja',
          'Third-party vendors/suppliers',
          'End users saja',
          'Tidak ada target'
        ],
        correctAnswer: 1,
      },
      {
        id: 12,
        question: 'Living off the Land (LotL) technique menggunakan?',
        options: [
          'Custom malware',
          'Legitimate system tools untuk malicious purposes',
          'Antivirus',
          'Firewall'
        ],
        correctAnswer: 1,
      },
      {
        id: 13,
        question: 'Homomorphic encryption memungkinkan?',
        options: [
          'Normal encryption',
          'Computation on encrypted data',
          'Weak encryption',
          'No encryption'
        ],
        correctAnswer: 1,
      },
      {
        id: 14,
        question: 'Blockchain immutability berguna untuk?',
        options: [
          'Easy data modification',
          'Tamper-evident audit logs',
          'Delete data',
          'Slow down system'
        ],
        correctAnswer: 1,
      },
      {
        id: 15,
        question: 'Quantum computing threatens?',
        options: [
          'Symmetric encryption only',
          'Current public-key cryptography (RSA, ECC)',
          'Hash functions',
          'Nothing'
        ],
        correctAnswer: 1,
      },
    ],
  },
  // NEW DAILY QUIZZES
  {
    id: 12,
    title: 'Social Engineering Daily',
    description: 'Quiz harian tentang teknik social engineering',
    category: 'daily',
    difficulty: 'easy',
    timeLimit: 180,
    points: 50,
    status: 'available',
    deadline: '24 jam',
    questions: [
      {
        id: 1,
        question: 'Apa yang dimaksud dengan social engineering?',
        options: [
          'Teknik coding',
          'Manipulasi psikologis untuk mendapatkan informasi sensitif',
          'Jenis malware',
          'Protokol network'
        ],
        correctAnswer: 1,
      },
      {
        id: 2,
        question: 'Contoh serangan social engineering yang paling umum?',
        options: [
          'DDoS',
          'Phishing',
          'Buffer overflow',
          'SQL injection'
        ],
        correctAnswer: 1,
      },
      {
        id: 3,
        question: 'Pretexting adalah teknik yang melibatkan?',
        options: [
          'Membuat skenario palsu untuk mendapatkan informasi',
          'Mengenkripsi data',
          'Backup sistem',
          'Firewall configuration'
        ],
        correctAnswer: 0,
      },
      {
        id: 4,
        question: 'Cara terbaik untuk menghindari phishing email?',
        options: [
          'Klik semua link',
          'Verifikasi sender dan jangan klik suspicious links',
          'Reply dengan informasi personal',
          'Forward ke teman'
        ],
        correctAnswer: 1,
      },
      {
        id: 5,
        question: 'Tailgating dalam konteks security adalah?',
        options: [
          'Mengikuti orang lain untuk masuk area restricted',
          'Jenis malware',
          'Network protocol',
          'Encryption method'
        ],
        correctAnswer: 0,
      },
    ],
  },
  {
    id: 13,
    title: 'Mobile Security Daily',
    description: 'Quiz harian tentang keamanan perangkat mobile',
    category: 'daily',
    difficulty: 'medium',
    timeLimit: 240,
    points: 75,
    status: 'available',
    deadline: '24 jam',
    questions: [
      {
        id: 1,
        question: 'Apa risiko dari rooting/jailbreaking device?',
        options: [
          'Device lebih aman',
          'Menghilangkan security protections built-in',
          'Mempercepat device',
          'Tidak ada risiko'
        ],
        correctAnswer: 1,
      },
      {
        id: 2,
        question: 'MDM adalah singkatan dari?',
        options: [
          'Mobile Data Manager',
          'Mobile Device Management',
          'Modern Digital Media',
          'Multi Device Monitor'
        ],
        correctAnswer: 1,
      },
      {
        id: 3,
        question: 'Ancaman terbesar dari public WiFi untuk mobile devices?',
        options: [
          'Baterai cepat habis',
          'Man-in-the-Middle attacks',
          'Device menjadi lambat',
          'Storage penuh'
        ],
        correctAnswer: 1,
      },
      {
        id: 4,
        question: 'App permissions yang excessive dapat mengakibatkan?',
        options: [
          'App lebih cepat',
          'Privacy breach dan data leakage',
          'Battery life lebih lama',
          'Free storage'
        ],
        correctAnswer: 1,
      },
      {
        id: 5,
        question: 'Biometric authentication di mobile (fingerprint, face ID) rentan terhadap?',
        options: [
          'Tidak ada kerentanan',
          'Spoofing attacks',
          'Virus',
          'DDoS'
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: 14,
    title: 'Incident Response Daily',
    description: 'Quiz harian tentang respons insiden keamanan',
    category: 'daily',
    difficulty: 'hard',
    timeLimit: 300,
    points: 100,
    status: 'available',
    deadline: '24 jam',
    questions: [
      {
        id: 1,
        question: 'Fase pertama dalam incident response adalah?',
        options: [
          'Eradication',
          'Preparation',
          'Recovery',
          'Lessons learned'
        ],
        correctAnswer: 1,
      },
      {
        id: 2,
        question: 'Chain of custody penting dalam digital forensics untuk?',
        options: [
          'Mempercepat investigation',
          'Memastikan evidence admissible di court',
          'Backup data',
          'Delete evidence'
        ],
        correctAnswer: 1,
      },
      {
        id: 3,
        question: 'Containment strategy bertujuan untuk?',
        options: [
          'Delete semua data',
          'Limit damage dan prevent spread',
          'Restart semua sistem',
          'Install antivirus'
        ],
        correctAnswer: 1,
      },
      {
        id: 4,
        question: 'Indicators of Compromise (IoC) digunakan untuk?',
        options: [
          'Identify signs of security breach',
          'Measure network speed',
          'Count users',
          'Calculate storage'
        ],
        correctAnswer: 0,
      },
      {
        id: 5,
        question: 'Post-incident activity yang paling penting?',
        options: [
          'Merayakan selesainya incident',
          'Lessons learned dan improve processes',
          'Menghapus semua log',
          'Resign dari pekerjaan'
        ],
        correctAnswer: 1,
      },
    ],
  },

  // NEW WEEKLY QUIZZES
  {
    id: 15,
    title: 'Cloud Security Weekly',
    description: 'Quiz mingguan tentang keamanan cloud computing',
    category: 'weekly',
    difficulty: 'easy',
    timeLimit: 300,
    points: 100,
    status: 'available',
    deadline: '7 hari',
    questions: [
      {
        id: 1,
        question: 'Shared Responsibility Model dalam cloud berarti?',
        options: [
          'Cloud provider bertanggung jawab atas semua',
          'Customer dan provider berbagi tanggung jawab security',
          'Customer tidak perlu security',
          'Tidak ada yang bertanggung jawab'
        ],
        correctAnswer: 1,
      },
      {
        id: 2,
        question: 'IAM dalam cloud computing adalah?',
        options: [
          'Internet Access Manager',
          'Identity and Access Management',
          'Internal Application Module',
          'Instant Alert Messaging'
        ],
        correctAnswer: 1,
      },
      {
        id: 3,
        question: 'S3 bucket misconfiguration dapat menyebabkan?',
        options: [
          'Faster upload',
          'Public exposure of sensitive data',
          'Cheaper storage',
          'Better performance'
        ],
        correctAnswer: 1,
      },
      {
        id: 4,
        question: 'Enkripsi data di cloud sebaiknya dilakukan?',
        options: [
          'Tidak perlu enkripsi',
          'At rest dan in transit',
          'Hanya di server',
          'Hanya saat transfer'
        ],
        correctAnswer: 1,
      },
      {
        id: 5,
        question: 'Multi-tenancy dalam cloud dapat menimbulkan risiko?',
        options: [
          'Tidak ada risiko',
          'Data leakage between tenants',
          'Lebih aman',
          'Gratis'
        ],
        correctAnswer: 1,
      },
      {
        id: 6,
        question: 'Cloud Security Posture Management (CSPM) digunakan untuk?',
        options: [
          'Monitor dan remediate cloud misconfigurations',
          'Membuat account cloud',
          'Upload file',
          'Delete data'
        ],
        correctAnswer: 0,
      },
      {
        id: 7,
        question: 'Principle of Least Privilege di cloud berarti?',
        options: [
          'Berikan semua akses ke semua orang',
          'Berikan minimal access yang diperlukan',
          'Tidak ada access control',
          'Admin access untuk semua'
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: 16,
    title: 'Database Security Weekly',
    description: 'Quiz mingguan tentang keamanan database',
    category: 'weekly',
    difficulty: 'medium',
    timeLimit: 360,
    points: 150,
    status: 'available',
    deadline: '7 hari',
    questions: [
      {
        id: 1,
        question: 'Transparent Data Encryption (TDE) mengenkripsi?',
        options: [
          'Hanya password',
          'Data at rest di database files',
          'Network traffic',
          'Application code'
        ],
        correctAnswer: 1,
      },
      {
        id: 2,
        question: 'Database audit trail berguna untuk?',
        options: [
          'Mempercepat query',
          'Track dan investigate suspicious activities',
          'Backup otomatis',
          'Delete old data'
        ],
        correctAnswer: 1,
      },
      {
        id: 3,
        question: 'Row-level security memungkinkan?',
        options: [
          'Delete semua rows',
          'Control access per row berdasarkan user',
          'Faster queries',
          'Automatic backup'
        ],
        correctAnswer: 1,
      },
      {
        id: 4,
        question: 'Database tokenization digunakan untuk?',
        options: [
          'Create user tokens',
          'Replace sensitive data dengan non-sensitive substitutes',
          'Speed up database',
          'Delete data'
        ],
        correctAnswer: 1,
      },
      {
        id: 5,
        question: 'Ancaman dari privilege escalation di database?',
        options: [
          'Faster performance',
          'Unauthorized access to sensitive data',
          'Better security',
          'Free storage'
        ],
        correctAnswer: 1,
      },
      {
        id: 6,
        question: 'Database activity monitoring (DAM) dapat detect?',
        options: [
          'Hanya slow queries',
          'Anomalous behavior dan potential threats',
          'Network speed',
          'Server temperature'
        ],
        correctAnswer: 1,
      },
      {
        id: 7,
        question: 'Stored procedures dapat membantu prevent?',
        options: [
          'Backup',
          'SQL injection attacks',
          'Network issues',
          'Storage problems'
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: 17,
    title: 'Malware Analysis Weekly',
    description: 'Quiz mingguan tentang analisis malware',
    category: 'weekly',
    difficulty: 'hard',
    timeLimit: 420,
    points: 200,
    status: 'available',
    deadline: '7 hari',
    questions: [
      {
        id: 1,
        question: 'Static malware analysis melibatkan?',
        options: [
          'Execute malware',
          'Analyze without executing',
          'Delete malware',
          'Spread malware'
        ],
        correctAnswer: 1,
      },
      {
        id: 2,
        question: 'Sandbox environment digunakan untuk?',
        options: [
          'Production deployment',
          'Safe malware analysis',
          'Normal browsing',
          'Gaming'
        ],
        correctAnswer: 1,
      },
      {
        id: 3,
        question: 'Packer/crypter pada malware bertujuan?',
        options: [
          'Compress file size',
          'Evade detection dan analysis',
          'Make malware faster',
          'Improve functionality'
        ],
        correctAnswer: 1,
      },
      {
        id: 4,
        question: 'Behavioral analysis mengamati?',
        options: [
          'File size',
          'Runtime behavior dan system interactions',
          'File name',
          'File color'
        ],
        correctAnswer: 1,
      },
      {
        id: 5,
        question: 'YARA rules digunakan untuk?',
        options: [
          'Identify dan classify malware',
          'Create malware',
          'Speed up computer',
          'Backup files'
        ],
        correctAnswer: 0,
      },
      {
        id: 6,
        question: 'Process hollowing adalah teknik malware untuk?',
        options: [
          'Delete processes',
          'Inject code into legitimate process',
          'Create new process',
          'Speed up processes'
        ],
        correctAnswer: 1,
      },
      {
        id: 7,
        question: 'Domain Generation Algorithm (DGA) digunakan malware untuk?',
        options: [
          'Generate random domains untuk C&C communication',
          'Create legitimate domains',
          'Speed up DNS',
          'Block websites'
        ],
        correctAnswer: 0,
      },
      {
        id: 8,
        question: 'Anti-debugging techniques bertujuan?',
        options: [
          'Help debugging',
          'Prevent reverse engineering',
          'Speed up execution',
          'Improve code quality'
        ],
        correctAnswer: 1,
      },
    ],
  },

  // NEW MONTHLY QUIZZES
  {
    id: 18,
    title: 'IoT Security Monthly',
    description: 'Quiz bulanan tentang keamanan Internet of Things',
    category: 'monthly',
    difficulty: 'easy',
    timeLimit: 600,
    points: 200,
    status: 'available',
    deadline: '30 hari',
    questions: [
      {
        id: 1,
        question: 'Risiko keamanan terbesar pada IoT devices?',
        options: [
          'Terlalu aman',
          'Default credentials dan lack of updates',
          'Terlalu cepat',
          'Terlalu mahal'
        ],
        correctAnswer: 1,
      },
      {
        id: 2,
        question: 'Mirai botnet menargetkan?',
        options: [
          'Desktop computers',
          'IoT devices dengan weak credentials',
          'Smartphones',
          'Cloud servers'
        ],
        correctAnswer: 1,
      },
      {
        id: 3,
        question: 'Firmware update penting untuk IoT karena?',
        options: [
          'Aesthetic purposes',
          'Patch security vulnerabilities',
          'Make device slower',
          'Use more power'
        ],
        correctAnswer: 1,
      },
      {
        id: 4,
        question: 'Network segmentation untuk IoT devices berarti?',
        options: [
          'Connect semua devices ke satu network',
          'Isolate IoT devices dari critical systems',
          'Delete IoT devices',
          'Turn off all devices'
        ],
        correctAnswer: 1,
      },
      {
        id: 5,
        question: 'Encryption dalam IoT communication penting untuk?',
        options: [
          'Speed',
          'Protect data dari interception',
          'Save battery',
          'Reduce cost'
        ],
        correctAnswer: 1,
      },
      {
        id: 6,
        question: 'Physical security untuk IoT devices meliputi?',
        options: [
          'Tidak penting',
          'Prevent unauthorized physical access',
          'Paint the device',
          'Make it smaller'
        ],
        correctAnswer: 1,
      },
      {
        id: 7,
        question: 'Authentication di IoT devices sebaiknya?',
        options: [
          'Tidak perlu',
          'Strong dan unique per device',
          'Username: admin, Password: admin',
          'No password'
        ],
        correctAnswer: 1,
      },
      {
        id: 8,
        question: 'IoT device monitoring dapat detect?',
        options: [
          'Weather',
          'Unusual traffic patterns indicating compromise',
          'Time',
          'Temperature only'
        ],
        correctAnswer: 1,
      },
      {
        id: 9,
        question: 'Secure boot pada IoT devices memastikan?',
        options: [
          'Fast boot',
          'Only trusted firmware runs',
          'Colorful boot screen',
          'No boot'
        ],
        correctAnswer: 1,
      },
      {
        id: 10,
        question: 'Privacy concern pada smart home devices?',
        options: [
          'Tidak ada concern',
          'Surveillance dan data collection',
          'Too much privacy',
          'Free electricity'
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: 19,
    title: 'Digital Forensics Monthly',
    description: 'Quiz bulanan tentang forensik digital',
    category: 'monthly',
    difficulty: 'medium',
    timeLimit: 720,
    points: 300,
    status: 'available',
    deadline: '30 hari',
    questions: [
      {
        id: 1,
        question: 'Write blocker digunakan dalam forensics untuk?',
        options: [
          'Write data faster',
          'Prevent modification of evidence',
          'Delete evidence',
          'Create backups'
        ],
        correctAnswer: 1,
      },
      {
        id: 2,
        question: 'Forensic imaging berbeda dari regular backup karena?',
        options: [
          'Lebih cepat',
          'Bit-by-bit copy including deleted data',
          'Lebih kecil',
          'Tidak ada perbedaan'
        ],
        correctAnswer: 1,
      },
      {
        id: 3,
        question: 'Volatile data yang harus di-collect pertama kali?',
        options: [
          'Hard disk data',
          'RAM contents, running processes',
          'BIOS settings',
          'Keyboard layout'
        ],
        correctAnswer: 1,
      },
      {
        id: 4,
        question: 'Hash values (MD5, SHA) dalam forensics digunakan untuk?',
        options: [
          'Encrypt data',
          'Verify data integrity',
          'Compress data',
          'Delete data'
        ],
        correctAnswer: 1,
      },
      {
        id: 5,
        question: 'Steganography adalah?',
        options: [
          'Type of encryption',
          'Hiding data within other files',
          'Deleting files',
          'Compressing files'
        ],
        correctAnswer: 1,
      },
      {
        id: 6,
        question: 'File carving digunakan untuk?',
        options: [
          'Delete files',
          'Recover deleted files without file system metadata',
          'Create new files',
          'Rename files'
        ],
        correctAnswer: 1,
      },
      {
        id: 7,
        question: 'Timeline analysis dalam forensics membantu?',
        options: [
          'Set system time',
          'Reconstruct sequence of events',
          'Schedule tasks',
          'Set reminders'
        ],
        correctAnswer: 1,
      },
      {
        id: 8,
        question: 'Anti-forensics techniques bertujuan?',
        options: [
          'Help investigations',
          'Hinder forensic analysis',
          'Speed up analysis',
          'Improve evidence quality'
        ],
        correctAnswer: 1,
      },
      {
        id: 9,
        question: 'Network forensics menganalisis?',
        options: [
          'Hanya hardware',
          'Network traffic dan logs',
          'Hanya cables',
          'Router color'
        ],
        correctAnswer: 1,
      },
      {
        id: 10,
        question: 'Legal hold dalam context forensics berarti?',
        options: [
          'Arrest suspect',
          'Preserve relevant data for litigation',
          'Delete all data',
          'Sell evidence'
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: 20,
    title: 'Red Team Operations Monthly',
    description: 'Quiz bulanan untuk operasi red team tingkat lanjut',
    category: 'monthly',
    difficulty: 'hard',
    timeLimit: 900,
    points: 500,
    status: 'available',
    deadline: '30 hari',
    questions: [
      {
        id: 1,
        question: 'Red team vs penetration testing, perbedaan utama?',
        options: [
          'Tidak ada perbedaan',
          'Red team simulates real adversary dengan broader scope',
          'Pen test lebih sulit',
          'Red team hanya testing network'
        ],
        correctAnswer: 1,
      },
      {
        id: 2,
        question: 'Purple team exercise melibatkan?',
        options: [
          'Hanya red team',
          'Collaboration between red and blue teams',
          'Hanya blue team',
          'Tidak ada team'
        ],
        correctAnswer: 1,
      },
      {
        id: 3,
        question: 'C2 (Command and Control) infrastructure digunakan untuk?',
        options: [
          'Web hosting',
          'Manage compromised systems',
          'Email service',
          'Cloud storage'
        ],
        correctAnswer: 1,
      },
      {
        id: 4,
        question: 'OPSEC (Operational Security) dalam red team operations penting untuk?',
        options: [
          'Speed',
          'Avoid detection dan maintain stealth',
          'Make noise',
          'Alert blue team'
        ],
        correctAnswer: 1,
      },
      {
        id: 5,
        question: 'Credential harvesting technique termasuk?',
        options: [
          'Create new credentials',
          'Kerberoasting, password spraying',
          'Delete accounts',
          'Disable authentication'
        ],
        correctAnswer: 1,
      },
      {
        id: 6,
        question: 'Beacon dalam C2 framework adalah?',
        options: [
          'Lighthouse',
          'Payload yang phones home ke C2 server',
          'Warning signal',
          'Firewall feature'
        ],
        correctAnswer: 1,
      },
      {
        id: 7,
        question: 'Golden ticket attack menargetkan?',
        options: [
          'Movie tickets',
          'Kerberos TGT untuk domain persistence',
          'Lottery',
          'Event tickets'
        ],
        correctAnswer: 1,
      },
      {
        id: 8,
        question: 'Pivoting dalam red team operations berarti?',
        options: [
          'Dance move',
          'Use compromised host to attack other systems',
          'Change strategy',
          'Quit operation'
        ],
        correctAnswer: 1,
      },
      {
        id: 9,
        question: 'EDR evasion techniques termasuk?',
        options: [
          'Install more EDR',
          'Process injection, unhooking',
          'Disable computer',
          'Format hard drive'
        ],
        correctAnswer: 1,
      },
      {
        id: 10,
        question: 'Assumed breach scenario dalam red team berarti?',
        options: [
          'Start from outside',
          'Simulate post-exploitation dari inside',
          'No breach',
          'Automatic success'
        ],
        correctAnswer: 1,
      },
      {
        id: 11,
        question: 'Threat emulation berbeda dari vulnerability assessment karena?',
        options: [
          'Sama saja',
          'Emulates specific threat actor TTPs',
          'Lebih mudah',
          'Tidak perlu tools'
        ],
        correctAnswer: 1,
      },
      {
        id: 12,
        question: 'Exfiltration over alternative protocols bertujuan?',
        options: [
          'Normal data transfer',
          'Bypass DLP dan network monitoring',
          'Speed up transfer',
          'Compress data'
        ],
        correctAnswer: 1,
      },
    ],
  },
];

export function QuizPage({ isLoggedIn, onNavigate, userName, onQuizComplete, completedQuizzes }: QuizPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    if (quizStarted && !showResult && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [quizStarted, showResult, timeLeft]);

  // Handle quiz completion and points
  useEffect(() => {
    if (showResult && selectedQuiz && !quizCompleted && onQuizComplete) {
      const score = calculateScore();
      onQuizComplete(selectedQuiz.id, score, selectedQuiz.questions.length, selectedQuiz.points);
      setQuizCompleted(true);
    }
  }, [showResult, selectedQuiz, quizCompleted, onQuizComplete]);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            <Lock className="w-16 h-16 text-purple-400 mx-auto mb-4" />
          </motion.div>
          <h2 className="text-white mb-4">Login Required</h2>
          <p className="text-gray-400 mb-6">
            Anda harus login terlebih dahulu untuk mengikuti quiz
          </p>
          <motion.button
            onClick={() => onNavigate('login')}
            className="px-8 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Login Sekarang
          </motion.button>
        </motion.div>
      </div>
    );
  }

  const startQuiz = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setQuizStarted(true);
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
    setTimeLeft(quiz.timeLimit);
    setSelectedAnswer(null);
    setQuizCompleted(false);
  };

  const handleAnswer = () => {
    if (selectedAnswer !== null && selectedQuiz) {
      const correct = selectedAnswer === selectedQuiz.questions[currentQuestion].correctAnswer;
      setIsCorrect(correct);
      setShowFeedback(true);

      setTimeout(() => {
        const newAnswers = [...answers, selectedAnswer];
        setAnswers(newAnswers);
        setShowFeedback(false);

        if (currentQuestion < selectedQuiz.questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setSelectedAnswer(null);
        } else {
          setShowResult(true);
        }
      }, 1500);
    }
  };

  const calculateScore = () => {
    if (!selectedQuiz) return 0;
    let correct = 0;
    answers.forEach((answer, index) => {
      if (answer === selectedQuiz.questions[index].correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'text-green-400 bg-green-400/10 border-green-400/30';
      case 'medium':
        return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
      case 'hard':
        return 'text-orange-400 bg-orange-400/10 border-orange-400/30';
      case 'insane':
        return 'text-red-400 bg-red-400/10 border-red-400/30';
      default:
        return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return Star;
      case 'medium':
        return Zap;
      case 'hard':
        return Flame;
      case 'insane':
        return Trophy;
      default:
        return Target;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'daily':
        return Calendar;
      case 'weekly':
        return Clock;
      case 'monthly':
        return Trophy;
      default:
        return Brain;
    }
  };

  const filteredQuizzes = quizzes.filter(q => q.category === selectedCategory);

  // Check quiz completion and update UI
  const getQuizStatus = (quizId: number): 'available' | 'completed' | 'locked' => {
    if (completedQuizzes && completedQuizzes.includes(quizId)) {
      return 'completed';
    }
    return 'available';
  };

  if (showResult && selectedQuiz) {
    const score = calculateScore();
    const percentage = (score / selectedQuiz.questions.length) * 100;

    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full bg-slate-800/50 backdrop-blur-sm border border-purple-500/30 rounded-xl p-8 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <Trophy className={`w-20 h-20 mx-auto mb-6 ${percentage >= 70 ? 'text-yellow-400' : 'text-gray-400'}`} />
          </motion.div>
          
          <h1 className="text-white mb-4">Quiz Completed!</h1>
          
          <div className="mb-8">
            <motion.div
              className="text-6xl text-purple-400 mb-2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
            >
              {score}/{selectedQuiz.questions.length}
            </motion.div>
            <p className="text-gray-300 mb-2">Correct Answers ({percentage.toFixed(0)}%)</p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-purple-400"
            >
              +{Math.floor((score / selectedQuiz.questions.length) * selectedQuiz.points)} points earned
            </motion.div>
          </div>

          <motion.div
            className="bg-slate-900/50 rounded-lg p-6 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="text-white mb-4">Review Jawaban</h3>
            <div className="space-y-3">
              {selectedQuiz.questions.map((question, index) => (
                <motion.div
                  key={question.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-center justify-between text-left bg-slate-800/50 p-3 rounded-lg"
                >
                  <span className="text-gray-400">Question {index + 1}</span>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    {answers[index] === question.correctAnswer ? (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-400" />
                    )}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="flex gap-4">
            <motion.button
              onClick={() => {
                setQuizStarted(false);
                setSelectedQuiz(null);
              }}
              className="flex-1 px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Back to Quizzes
            </motion.button>
            <motion.button
              onClick={() => onNavigate('leaderboard')}
              className="flex-1 px-6 py-3 bg-slate-700 text-gray-300 rounded-lg hover:bg-slate-600 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Leaderboard
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (quizStarted && selectedQuiz) {
    const question = selectedQuiz.questions[currentQuestion];

    return (
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Progress Bar */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400">Question {currentQuestion + 1} of {selectedQuiz.questions.length}</span>
              <motion.div
                className="flex items-center gap-2 text-purple-400"
                animate={timeLeft < 60 ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Clock className="w-4 h-4" />
                <span className={timeLeft < 60 ? 'text-red-400' : ''}>{formatTime(timeLeft)}</span>
              </motion.div>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-purple-500 to-violet-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((currentQuestion + 1) / selectedQuiz.questions.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </motion.div>

          {/* Question Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/30 rounded-xl p-8"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-3 mb-8"
              >
                <Target className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
                <h2 className="text-white">{question.question}</h2>
              </motion.div>

              <div className="space-y-4">
                {question.options.map((option, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => !showFeedback && setSelectedAnswer(index)}
                    disabled={showFeedback}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      showFeedback
                        ? index === question.correctAnswer
                          ? 'border-green-400 bg-green-400/10'
                          : selectedAnswer === index
                          ? 'border-red-400 bg-red-400/10'
                          : 'border-slate-600 bg-slate-700/30'
                        : selectedAnswer === index
                        ? 'border-purple-400 bg-purple-400/10'
                        : 'border-slate-600 hover:border-purple-400/50 bg-slate-700/30'
                    }`}
                    whileHover={!showFeedback ? { scale: 1.02, x: 10 } : {}}
                    whileTap={!showFeedback ? { scale: 0.98 } : {}}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        showFeedback
                          ? index === question.correctAnswer
                            ? 'border-green-400'
                            : selectedAnswer === index
                            ? 'border-red-400'
                            : 'border-gray-500'
                          : selectedAnswer === index 
                          ? 'border-purple-400' 
                          : 'border-gray-500'
                      }`}>
                        {showFeedback && index === question.correctAnswer && (
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        )}
                        {showFeedback && selectedAnswer === index && index !== question.correctAnswer && (
                          <XCircle className="w-5 h-5 text-red-400" />
                        )}
                        {!showFeedback && selectedAnswer === index && (
                          <div className="w-3 h-3 rounded-full bg-purple-400"></div>
                        )}
                      </div>
                      <span className="text-gray-300">{option}</span>
                    </div>
                  </motion.button>
                ))}
              </div>

              <motion.button
                onClick={handleAnswer}
                disabled={selectedAnswer === null || showFeedback}
                className={`w-full mt-8 px-6 py-3 rounded-lg transition-all ${
                  selectedAnswer !== null && !showFeedback
                    ? 'bg-gradient-to-r from-purple-500 to-violet-500 text-white hover:from-purple-600 hover:to-violet-600'
                    : 'bg-slate-600 text-gray-400 cursor-not-allowed'
                }`}
                whileHover={selectedAnswer !== null && !showFeedback ? { scale: 1.02 } : {}}
                whileTap={selectedAnswer !== null && !showFeedback ? { scale: 0.98 } : {}}
              >
                {currentQuestion < selectedQuiz.questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
              </motion.button>
            </motion.div>
          </AnimatePresence>

          {/* Feedback Animation */}
          <AnimatePresence>
            {showFeedback && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
              >
                <motion.div
                  className={`text-6xl ${isCorrect ? 'text-green-400' : 'text-red-400'}`}
                  animate={{
                    scale: [0, 1.2, 1],
                    rotate: [0, 360],
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {isCorrect ? '✓' : '✗'}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  // Quiz List View
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          >
            <Brain className="w-16 h-16 text-purple-400 mx-auto mb-4" />
          </motion.div>
          <h1 className="text-white mb-4">Cybersecurity Quiz Arena</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Uji kemampuan cybersecurity Anda dengan berbagai quiz dari berbagai tingkat kesulitan
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center gap-4 mb-8"
        >
          {(['daily', 'weekly', 'monthly'] as const).map((category) => {
            const Icon = getCategoryIcon(category);
            return (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-lg border-2 transition-all flex items-center gap-2 ${
                  selectedCategory === category
                    ? 'bg-purple-500/20 border-purple-400 text-purple-400'
                    : 'bg-slate-800/50 border-slate-600 text-gray-400 hover:border-purple-400/50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-5 h-5" />
                <span className="capitalize">{category}</span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Quiz Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuizzes.map((quiz, index) => {
            const DifficultyIcon = getDifficultyIcon(quiz.difficulty);
            const quizStatus = getQuizStatus(quiz.id);
            const isCompleted = quizStatus === 'completed';
            
            return (
              <motion.div
                key={quiz.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/30 rounded-xl p-6 cursor-pointer group relative overflow-hidden"
                whileHover={{
                  y: -10,
                  borderColor: 'rgba(168, 85, 247, 0.6)',
                  boxShadow: '0 10px 40px rgba(168, 85, 247, 0.3)'
                }}
                onClick={() => !isCompleted && setSelectedQuiz(quiz)}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
                />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <motion.div
                      className="bg-purple-500/10 w-12 h-12 rounded-lg flex items-center justify-center"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <DifficultyIcon className="w-6 h-6 text-purple-400" />
                    </motion.div>
                    {isCompleted && (
                      <CheckCircle className="w-6 h-6 text-green-400" />
                    )}
                    {quiz.status === 'locked' && (
                      <Lock className="w-6 h-6 text-gray-500" />
                    )}
                  </div>

                  <h3 className="text-white mb-2 group-hover:text-purple-400 transition-colors">
                    {quiz.title}
                  </h3>

                  <p className="text-gray-400 mb-4 text-sm line-clamp-2">
                    {quiz.description}
                  </p>

                  <div className="flex items-center gap-2 mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs border capitalize ${getDifficultyColor(quiz.difficulty)}`}>
                      {quiz.difficulty}
                    </span>
                    <div className="flex items-center gap-1">
                      <Award className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm text-gray-400">{quiz.points} pts</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                      <Brain className="w-4 h-4" />
                      <span>{quiz.questions.length} soal</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{Math.floor(quiz.timeLimit / 60)} min</span>
                    </div>
                  </div>

                  {quiz.deadline && !isCompleted && (
                    <div className="text-xs text-purple-400 mb-4">
                      ⏰ Reset dalam: {quiz.deadline}
                    </div>
                  )}

                  {isCompleted && (
                    <div className="text-xs text-green-400 mb-4 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Completed! Wait for reset
                    </div>
                  )}

                  <motion.button
                    className={`w-full px-4 py-2 rounded-lg transition-all flex items-center justify-center gap-2 ${
                      isCompleted
                        ? 'bg-slate-700 text-gray-500 cursor-not-allowed'
                        : quiz.status === 'locked'
                        ? 'bg-slate-700 text-gray-500 cursor-not-allowed'
                        : 'bg-purple-500/20 text-purple-400 hover:bg-purple-500/30'
                    }`}
                    whileHover={!isCompleted && quiz.status !== 'locked' ? { scale: 1.05 } : {}}
                    whileTap={!isCompleted && quiz.status !== 'locked' ? { scale: 0.95 } : {}}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!isCompleted && quiz.status !== 'locked') {
                        startQuiz(quiz);
                      }
                    }}
                  >
                    {isCompleted ? (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        Completed
                      </>
                    ) : quiz.status === 'locked' ? (
                      <>
                        <Lock className="w-4 h-4" />
                        Locked
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4" />
                        Start Quiz
                      </>
                    )}
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}