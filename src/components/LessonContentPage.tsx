import { BookOpen, CheckCircle, ArrowLeft, ArrowRight, Play, Clock, Award } from 'lucide-react';
import { useState } from 'react';
import { Page } from '../App';
import { motion } from 'motion/react';

interface LessonContentPageProps {
  moduleId: number;
  onNavigate: (page: Page) => void;
  onComplete?: () => void;
}

interface Lesson {
  id: number;
  title: string;
  duration: string;
  content: string;
  points: number;
}

const moduleLessons: Record<number, Lesson[]> = {
  1: [
    {
      id: 1,
      title: 'Apa itu Cybersecurity?',
      duration: '15 menit',
      content: `
        <h2>Pendahuluan Cybersecurity</h2>
        <p>Cybersecurity atau keamanan siber adalah praktik melindungi sistem komputer, jaringan, dan data dari serangan digital, akses tidak sah, dan kerusakan.</p>
        
        <h3>Mengapa Cybersecurity Penting?</h3>
        <ul>
          <li>Melindungi data pribadi dan informasi sensitif</li>
          <li>Mencegah kerugian finansial</li>
          <li>Menjaga reputasi organisasi</li>
          <li>Memastikan kelangsungan bisnis</li>
        </ul>

        <h3>Ancaman Cyber yang Umum</h3>
        <ul>
          <li><strong>Malware:</strong> Software berbahaya yang merusak sistem</li>
          <li><strong>Phishing:</strong> Penipuan untuk mencuri informasi sensitif</li>
          <li><strong>Ransomware:</strong> Malware yang mengenkripsi data dan meminta tebusan</li>
          <li><strong>DDoS Attack:</strong> Serangan yang membanjiri sistem dengan traffic</li>
        </ul>
      `,
      points: 10,
    },
    {
      id: 2,
      title: 'CIA Triad',
      duration: '20 menit',
      content: `
        <h2>CIA Triad - Pilar Utama Cybersecurity</h2>
        <p>CIA Triad adalah tiga prinsip fundamental dalam keamanan informasi:</p>
        
        <h3>1. Confidentiality (Kerahasiaan)</h3>
        <p>Memastikan informasi hanya dapat diakses oleh pihak yang berwenang.</p>
        <ul>
          <li>Enkripsi data</li>
          <li>Kontrol akses</li>
          <li>Autentikasi pengguna</li>
        </ul>

        <h3>2. Integrity (Integritas)</h3>
        <p>Menjamin data tidak diubah atau dirusak tanpa izin.</p>
        <ul>
          <li>Hashing</li>
          <li>Digital signatures</li>
          <li>Version control</li>
        </ul>

        <h3>3. Availability (Ketersediaan)</h3>
        <p>Memastikan sistem dan data dapat diakses saat dibutuhkan.</p>
        <ul>
          <li>Backup dan recovery</li>
          <li>Redundancy</li>
          <li>Disaster recovery planning</li>
        </ul>
      `,
      points: 15,
    },
    {
      id: 3,
      title: 'Jenis-jenis Serangan Cyber',
      duration: '25 menit',
      content: `
        <h2>Mengenal Berbagai Jenis Serangan Cyber</h2>
        
        <h3>1. Social Engineering</h3>
        <p>Teknik manipulasi psikologis untuk mendapatkan informasi rahasia.</p>
        <ul>
          <li>Phishing email</li>
          <li>Pretexting (berpura-pura)</li>
          <li>Baiting (umpan)</li>
        </ul>

        <h3>2. Malware Attacks</h3>
        <p>Software berbahaya yang dirancang untuk merusak sistem:</p>
        <ul>
          <li><strong>Virus:</strong> Menyebar melalui file yang terinfeksi</li>
          <li><strong>Trojan:</strong> Menyamar sebagai software legitimate</li>
          <li><strong>Worm:</strong> Menyebar sendiri tanpa interaksi pengguna</li>
          <li><strong>Spyware:</strong> Memata-matai aktivitas pengguna</li>
        </ul>

        <h3>3. Network Attacks</h3>
        <ul>
          <li>Man-in-the-Middle (MITM)</li>
          <li>DNS Spoofing</li>
          <li>Session Hijacking</li>
        </ul>
      `,
      points: 20,
    },
  ],
  2: [
    {
      id: 1,
      title: 'Pengenalan Network Security',
      duration: '20 menit',
      content: `
        <h2>Apa itu Network Security?</h2>
        <p>Network Security adalah praktik melindungi jaringan komputer dari ancaman internal dan eksternal, memastikan integritas, kerahasiaan, dan ketersediaan data.</p>
        
        <h3>Komponen Utama Network Security</h3>
        <ul>
          <li><strong>Firewall:</strong> Barrier pertahanan pertama yang memfilter traffic</li>
          <li><strong>IDS/IPS:</strong> Intrusion Detection/Prevention System</li>
          <li><strong>VPN:</strong> Virtual Private Network untuk koneksi aman</li>
          <li><strong>NAC:</strong> Network Access Control</li>
        </ul>

        <h3>Layer Network Security</h3>
        <ul>
          <li>Physical Security - Keamanan fisik perangkat</li>
          <li>Network Security - Firewall, IDS/IPS</li>
          <li>Application Security - WAF, secure coding</li>
          <li>Data Security - Enkripsi, backup</li>
        </ul>
      `,
      points: 15,
    },
    {
      id: 2,
      title: 'Firewall & Filtering',
      duration: '25 menit',
      content: `
        <h2>Memahami Firewall</h2>
        <p>Firewall adalah sistem keamanan yang memonitor dan mengontrol traffic jaringan berdasarkan aturan keamanan yang telah ditentukan.</p>
        
        <h3>Jenis-jenis Firewall</h3>
        <ul>
          <li><strong>Packet Filtering Firewall:</strong> Memeriksa header paket data</li>
          <li><strong>Stateful Inspection Firewall:</strong> Melacak state koneksi</li>
          <li><strong>Application Layer Firewall:</strong> Memeriksa konten aplikasi</li>
          <li><strong>Next-Generation Firewall (NGFW):</strong> Kombinasi semua fitur</li>
        </ul>

        <h3>Firewall Rules Best Practices</h3>
        <ul>
          <li>Default deny - Blokir semua, izinkan yang spesifik</li>
          <li>Principle of least privilege</li>
          <li>Regular rule review dan cleanup</li>
          <li>Logging dan monitoring</li>
        </ul>
      `,
      points: 20,
    },
    {
      id: 3,
      title: 'VPN & Secure Tunneling',
      duration: '30 menit',
      content: `
        <h2>Virtual Private Network (VPN)</h2>
        <p>VPN menciptakan koneksi terenkripsi melalui jaringan publik, memungkinkan komunikasi aman antar lokasi.</p>
        
        <h3>Jenis VPN</h3>
        <ul>
          <li><strong>Site-to-Site VPN:</strong> Menghubungkan dua atau lebih jaringan</li>
          <li><strong>Remote Access VPN:</strong> Untuk pengguna individual</li>
          <li><strong>SSL/TLS VPN:</strong> Berbasis web browser</li>
          <li><strong>IPSec VPN:</strong> Protocol suite untuk secure communication</li>
        </ul>

        <h3>Protokol VPN</h3>
        <ul>
          <li>OpenVPN - Open source, sangat aman</li>
          <li>WireGuard - Modern, cepat, dan sederhana</li>
          <li>IPSec - Industry standard</li>
          <li>L2TP/IPSec - Layer 2 Tunneling Protocol</li>
        </ul>

        <h3>Keuntungan VPN</h3>
        <ul>
          <li>Enkripsi data end-to-end</li>
          <li>Menyembunyikan IP address</li>
          <li>Bypass geo-restrictions</li>
          <li>Secure remote access</li>
        </ul>
      `,
      points: 25,
    },
  ],
  3: [
    {
      id: 1,
      title: 'Pengenalan Kriptografi',
      duration: '25 menit',
      content: `
        <h2>Apa itu Kriptografi?</h2>
        <p>Kriptografi adalah ilmu dan seni menyandikan informasi sehingga hanya pihak yang berwenang yang dapat membaca dan memahaminya.</p>
        
        <h3>Konsep Dasar Kriptografi</h3>
        <ul>
          <li><strong>Plaintext:</strong> Pesan asli yang belum dienkripsi</li>
          <li><strong>Ciphertext:</strong> Pesan yang sudah dienkripsi</li>
          <li><strong>Encryption:</strong> Proses mengubah plaintext menjadi ciphertext</li>
          <li><strong>Decryption:</strong> Proses mengubah ciphertext kembali ke plaintext</li>
          <li><strong>Key:</strong> Informasi rahasia untuk enkripsi/dekripsi</li>
        </ul>

        <h3>Sejarah Kriptografi</h3>
        <ul>
          <li>Caesar Cipher - Era Romawi Kuno</li>
          <li>Enigma Machine - Perang Dunia II</li>
          <li>DES - 1970s</li>
          <li>RSA - 1977</li>
          <li>AES - 2001</li>
        </ul>
      `,
      points: 20,
    },
    {
      id: 2,
      title: 'Symmetric vs Asymmetric Encryption',
      duration: '30 menit',
      content: `
        <h2>Symmetric Encryption (Enkripsi Simetris)</h2>
        <p>Menggunakan satu kunci yang sama untuk enkripsi dan dekripsi.</p>
        
        <h3>Karakteristik Symmetric Encryption</h3>
        <ul>
          <li>Kunci yang sama untuk enkripsi dan dekripsi</li>
          <li>Lebih cepat dari asymmetric</li>
          <li>Cocok untuk enkripsi data dalam jumlah besar</li>
          <li>Masalah: bagaimana berbagi kunci dengan aman?</li>
        </ul>

        <h3>Algoritma Symmetric Popular</h3>
        <ul>
          <li><strong>AES (Advanced Encryption Standard):</strong> Standard modern</li>
          <li><strong>DES/3DES:</strong> Legacy, tidak disarankan</li>
          <li><strong>ChaCha20:</strong> Modern stream cipher</li>
        </ul>

        <h2>Asymmetric Encryption (Enkripsi Asimetris)</h2>
        <p>Menggunakan sepasang kunci: public key dan private key.</p>
        
        <h3>Karakteristik Asymmetric Encryption</h3>
        <ul>
          <li>Public key untuk enkripsi, private key untuk dekripsi</li>
          <li>Lebih lambat dari symmetric</li>
          <li>Tidak perlu berbagi kunci rahasia</li>
          <li>Cocok untuk digital signatures dan key exchange</li>
        </ul>

        <h3>Algoritma Asymmetric Popular</h3>
        <ul>
          <li><strong>RSA:</strong> Paling populer</li>
          <li><strong>ECC (Elliptic Curve):</strong> Lebih efisien</li>
          <li><strong>DSA/ECDSA:</strong> Digital signatures</li>
        </ul>
      `,
      points: 25,
    },
    {
      id: 3,
      title: 'Hashing & Digital Signatures',
      duration: '25 menit',
      content: `
        <h2>Cryptographic Hashing</h2>
        <p>Fungsi hash mengubah data dengan ukuran apapun menjadi fixed-size output (hash/digest).</p>
        
        <h3>Properti Hash Function</h3>
        <ul>
          <li><strong>Deterministic:</strong> Input sama selalu menghasilkan hash sama</li>
          <li><strong>One-way:</strong> Tidak bisa di-reverse</li>
          <li><strong>Collision-resistant:</strong> Sulit menemukan dua input dengan hash sama</li>
          <li><strong>Avalanche effect:</strong> Perubahan kecil = hash berbeda total</li>
        </ul>

        <h3>Algoritma Hashing</h3>
        <ul>
          <li><strong>SHA-256:</strong> Standard modern, sangat aman</li>
          <li><strong>SHA-3:</strong> Generasi terbaru</li>
          <li><strong>MD5:</strong> Deprecated, tidak aman</li>
          <li><strong>bcrypt/scrypt:</strong> Untuk password hashing</li>
        </ul>

        <h3>Penggunaan Hashing</h3>
        <ul>
          <li>Password storage</li>
          <li>Data integrity verification</li>
          <li>Digital signatures</li>
          <li>Blockchain</li>
        </ul>

        <h2>Digital Signatures</h2>
        <p>Kombinasi hashing dan asymmetric encryption untuk verifikasi authenticity dan integrity.</p>
        <ul>
          <li>Non-repudiation - Tidak bisa menyangkal</li>
          <li>Authentication - Membuktikan identitas</li>
          <li>Integrity - Memastikan tidak diubah</li>
        </ul>
      `,
      points: 30,
    },
  ],
  4: [
    {
      id: 1,
      title: 'Pengenalan Secure Coding',
      duration: '20 menit',
      content: `
        <h2>Mengapa Secure Coding Penting?</h2>
        <p>Secure coding adalah praktik menulis kode yang tahan terhadap vulnerability dan serangan cyber.</p>
        
        <h3>Prinsip Secure Coding</h3>
        <ul>
          <li><strong>Defense in Depth:</strong> Berlapis-lapis pertahanan</li>
          <li><strong>Least Privilege:</strong> Minimal permission yang dibutuhkan</li>
          <li><strong>Fail Securely:</strong> Error handling yang aman</li>
          <li><strong>Input Validation:</strong> Selalu validasi input user</li>
          <li><strong>Output Encoding:</strong> Encode output untuk mencegah injection</li>
        </ul>

        <h3>OWASP Top 10</h3>
        <p>Daftar 10 risiko keamanan aplikasi web paling kritis:</p>
        <ul>
          <li>Broken Access Control</li>
          <li>Cryptographic Failures</li>
          <li>Injection</li>
          <li>Insecure Design</li>
          <li>Security Misconfiguration</li>
        </ul>
      `,
      points: 15,
    },
    {
      id: 2,
      title: 'SQL Injection Prevention',
      duration: '30 menit',
      content: `
        <h2>SQL Injection</h2>
        <p>Serangan yang memanfaatkan vulnerability dalam query database untuk mengeksekusi SQL commands berbahaya.</p>
        
        <h3>Contoh SQL Injection</h3>
        <p>Query vulnerable:</p>
        <ul>
          <li><code>SELECT * FROM users WHERE username = '$username' AND password = '$password'</code></li>
          <li>Input: username = <code>admin' --</code></li>
          <li>Hasil: Bypass authentication!</li>
        </ul>

        <h3>Jenis SQL Injection</h3>
        <ul>
          <li><strong>Classic SQLi:</strong> Direct manipulation</li>
          <li><strong>Blind SQLi:</strong> True/false responses</li>
          <li><strong>Time-based SQLi:</strong> Delay responses</li>
          <li><strong>Union-based SQLi:</strong> UNION queries</li>
        </ul>

        <h3>Prevention Techniques</h3>
        <ul>
          <li><strong>Prepared Statements:</strong> Parameterized queries (BEST)</li>
          <li><strong>Stored Procedures:</strong> Pre-compiled SQL</li>
          <li><strong>Input Validation:</strong> Whitelist acceptable inputs</li>
          <li><strong>Least Privilege:</strong> Database user dengan permission minimal</li>
          <li><strong>ORM:</strong> Object-Relational Mapping</li>
        </ul>

        <h3>Contoh Secure Code</h3>
        <p>PHP dengan Prepared Statement:</p>
        <ul>
          <li><code>$stmt = $pdo->prepare('SELECT * FROM users WHERE username = :username');</code></li>
          <li><code>$stmt->execute(['username' => $username]);</code></li>
        </ul>
      `,
      points: 25,
    },
    {
      id: 3,
      title: 'XSS & CSRF Prevention',
      duration: '35 menit',
      content: `
        <h2>Cross-Site Scripting (XSS)</h2>
        <p>Injeksi malicious scripts ke dalam website yang dipercaya user.</p>
        
        <h3>Jenis XSS</h3>
        <ul>
          <li><strong>Stored XSS:</strong> Script disimpan di database (paling berbahaya)</li>
          <li><strong>Reflected XSS:</strong> Script di URL/parameter</li>
          <li><strong>DOM-based XSS:</strong> Client-side manipulation</li>
        </ul>

        <h3>XSS Prevention</h3>
        <ul>
          <li><strong>Output Encoding:</strong> Encode semua user input</li>
          <li><strong>Content Security Policy (CSP):</strong> Header untuk restrict resources</li>
          <li><strong>HTTPOnly Cookies:</strong> Prevent JavaScript access</li>
          <li><strong>Input Validation:</strong> Sanitize input</li>
          <li><strong>Template Engines:</strong> Auto-escaping</li>
        </ul>

        <h2>Cross-Site Request Forgery (CSRF)</h2>
        <p>Memaksa user melakukan aksi yang tidak diinginkan pada aplikasi yang sudah authenticated.</p>

        <h3>Bagaimana CSRF Bekerja?</h3>
        <ul>
          <li>User login ke bank.com</li>
          <li>User mengunjungi evil.com (tanpa logout)</li>
          <li>evil.com mengirim request ke bank.com</li>
          <li>Browser mengirim cookies bank.com secara otomatis</li>
          <li>Transfer uang berhasil dilakukan!</li>
        </ul>

        <h3>CSRF Prevention</h3>
        <ul>
          <li><strong>CSRF Tokens:</strong> Random token untuk setiap request (BEST)</li>
          <li><strong>SameSite Cookies:</strong> Cookie attribute</li>
          <li><strong>Double Submit Cookie:</strong> Cookie + parameter validation</li>
          <li><strong>Custom Headers:</strong> X-Requested-With</li>
          <li><strong>Re-authentication:</strong> Untuk aksi sensitif</li>
        </ul>
      `,
      points: 30,
    },
  ],
  5: [
    {
      id: 1,
      title: 'Pengenalan Ethical Hacking',
      duration: '25 menit',
      content: `
        <h2>Apa itu Ethical Hacking?</h2>
        <p>Ethical hacking adalah praktik legal dan authorized untuk menemukan vulnerability dalam sistem sebelum attacker yang sesungguhnya menemukannya.</p>
        
        <h3>Perbedaan Hacker</h3>
        <ul>
          <li><strong>White Hat:</strong> Ethical hacker, legal, authorized</li>
          <li><strong>Black Hat:</strong> Malicious hacker, illegal</li>
          <li><strong>Gray Hat:</strong> Di antara keduanya</li>
        </ul>

        <h3>Phases of Ethical Hacking</h3>
        <ul>
          <li><strong>1. Reconnaissance:</strong> Information gathering</li>
          <li><strong>2. Scanning:</strong> Port scanning, vulnerability scanning</li>
          <li><strong>3. Gaining Access:</strong> Exploitation</li>
          <li><strong>4. Maintaining Access:</strong> Backdoors, rootkits</li>
          <li><strong>5. Covering Tracks:</strong> Log manipulation</li>
        </ul>

        <h3>Legal & Ethical Considerations</h3>
        <ul>
          <li>Selalu dapatkan written permission</li>
          <li>Ikuti scope yang disepakati</li>
          <li>Jangan merusak atau mencuri data</li>
          <li>Report findings secara profesional</li>
          <li>Jaga kerahasiaan klien</li>
        </ul>
      `,
      points: 20,
    },
    {
      id: 2,
      title: 'Reconnaissance & Scanning',
      duration: '35 menit',
      content: `
        <h2>Reconnaissance (Information Gathering)</h2>
        <p>Fase pertama penetration testing - mengumpulkan informasi sebanyak mungkin tentang target.</p>
        
        <h3>Passive Reconnaissance</h3>
        <ul>
          <li><strong>OSINT:</strong> Open Source Intelligence</li>
          <li><strong>Google Dorking:</strong> Advanced search operators</li>
          <li><strong>WHOIS Lookup:</strong> Domain information</li>
          <li><strong>DNS Records:</strong> MX, TXT, NS records</li>
          <li><strong>Social Media:</strong> LinkedIn, Twitter, Facebook</li>
          <li><strong>Shodan:</strong> Search engine untuk IoT devices</li>
        </ul>

        <h3>Active Reconnaissance</h3>
        <ul>
          <li><strong>Port Scanning:</strong> Identify open ports</li>
          <li><strong>Service Detection:</strong> Identify running services</li>
          <li><strong>OS Fingerprinting:</strong> Identify operating system</li>
          <li><strong>Network Mapping:</strong> Topology discovery</li>
        </ul>

        <h2>Scanning Tools</h2>
        
        <h3>Nmap (Network Mapper)</h3>
        <ul>
          <li>Port scanning: <code>nmap -p- target.com</code></li>
          <li>Service version: <code>nmap -sV target.com</code></li>
          <li>OS detection: <code>nmap -O target.com</code></li>
          <li>Script scanning: <code>nmap -sC target.com</code></li>
        </ul>

        <h3>Vulnerability Scanning</h3>
        <ul>
          <li><strong>Nessus:</strong> Commercial vulnerability scanner</li>
          <li><strong>OpenVAS:</strong> Open source alternative</li>
          <li><strong>Nikto:</strong> Web server scanner</li>
          <li><strong>OWASP ZAP:</strong> Web application scanner</li>
        </ul>
      `,
      points: 30,
    },
    {
      id: 3,
      title: 'Exploitation & Post-Exploitation',
      duration: '40 menit',
      content: `
        <h2>Exploitation</h2>
        <p>Memanfaatkan vulnerability yang ditemukan untuk mendapatkan akses ke sistem.</p>
        
        <h3>Exploitation Frameworks</h3>
        <ul>
          <li><strong>Metasploit:</strong> Framework paling populer</li>
          <li><strong>Exploit-DB:</strong> Database of exploits</li>
          <li><strong>Social Engineering Toolkit (SET):</strong> Phishing attacks</li>
        </ul>

        <h3>Common Exploitation Techniques</h3>
        <ul>
          <li><strong>Buffer Overflow:</strong> Overwrite memory</li>
          <li><strong>Code Injection:</strong> SQL, command, code injection</li>
          <li><strong>Privilege Escalation:</strong> User to admin</li>
          <li><strong>Password Cracking:</strong> Brute force, dictionary attacks</li>
          <li><strong>Social Engineering:</strong> Manipulasi psikologis</li>
        </ul>

        <h2>Post-Exploitation</h2>
        <p>Setelah mendapat akses, ethical hacker perlu:</p>
        
        <h3>Objectives</h3>
        <ul>
          <li><strong>Persistence:</strong> Maintain access (untuk testing)</li>
          <li><strong>Privilege Escalation:</strong> Get higher privileges</li>
          <li><strong>Lateral Movement:</strong> Explore network</li>
          <li><strong>Data Exfiltration:</strong> Identify sensitive data (JANGAN dicuri!)</li>
          <li><strong>Evidence Collection:</strong> Screenshot, logs untuk report</li>
        </ul>

        <h3>Post-Exploitation Tools</h3>
        <ul>
          <li><strong>Meterpreter:</strong> Advanced payload</li>
          <li><strong>PowerShell Empire:</strong> Windows post-exploitation</li>
          <li><strong>Mimikatz:</strong> Windows credential extraction</li>
        </ul>

        <h2>Reporting</h2>
        <p>Langkah terakhir dan terpenting!</p>
        <ul>
          <li><strong>Executive Summary:</strong> High-level overview</li>
          <li><strong>Technical Details:</strong> Vulnerability details, steps to reproduce</li>
          <li><strong>Risk Assessment:</strong> CVSS scores, impact analysis</li>
          <li><strong>Recommendations:</strong> How to fix</li>
          <li><strong>Proof of Concept:</strong> Screenshots, videos</li>
        </ul>
      `,
      points: 35,
    },
  ],
};

export function LessonContentPage({ moduleId, onNavigate, onComplete }: LessonContentPageProps) {
  const lessons = moduleLessons[moduleId] || moduleLessons[1];
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);

  const currentLesson = lessons[currentLessonIndex];
  const isLastLesson = currentLessonIndex === lessons.length - 1;
  const isFirstLesson = currentLessonIndex === 0;

  const handleComplete = () => {
    if (!completedLessons.includes(currentLesson.id)) {
      setCompletedLessons([...completedLessons, currentLesson.id]);
    }

    if (isLastLesson) {
      if (onComplete) onComplete();
      onNavigate('learn');
    } else {
      setCurrentLessonIndex(currentLessonIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (!isFirstLesson) {
      setCurrentLessonIndex(currentLessonIndex - 1);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => onNavigate('learn')}
            className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Modules
          </button>

          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-white mb-2">{currentLesson.title}</h1>
              <div className="flex items-center gap-4 text-gray-400">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{currentLesson.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Award className="w-4 h-4" />
                  <span className="text-sm">{currentLesson.points} points</span>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bg-slate-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">
                Lesson {currentLessonIndex + 1} of {lessons.length}
              </span>
              <span className="text-purple-400 text-sm">
                {Math.round(((currentLessonIndex + 1) / lessons.length) * 100)}%
              </span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-purple-500 to-violet-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((currentLessonIndex + 1) / lessons.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </motion.div>

        {/* Lesson Content */}
        <motion.div
          key={currentLesson.id}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.3 }}
          className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/30 rounded-xl p-8 mb-8"
        >
          <div 
            className="prose prose-invert prose-purple max-w-none"
            dangerouslySetInnerHTML={{ __html: currentLesson.content }}
            style={{
              color: '#e5e7eb',
            }}
          />
        </motion.div>

        {/* Lesson Navigation */}
        <div className="grid md:grid-cols-3 gap-4">
          {lessons.map((lesson, index) => (
            <motion.button
              key={lesson.id}
              onClick={() => setCurrentLessonIndex(index)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`p-4 rounded-lg border-2 text-left transition-all ${
                index === currentLessonIndex
                  ? 'border-purple-400 bg-purple-400/10'
                  : completedLessons.includes(lesson.id)
                  ? 'border-green-400/50 bg-green-400/5'
                  : 'border-slate-700 bg-slate-800/30 hover:border-purple-400/50'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-start gap-3">
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  completedLessons.includes(lesson.id)
                    ? 'bg-green-400/20'
                    : index === currentLessonIndex
                    ? 'bg-purple-400/20'
                    : 'bg-slate-700'
                }`}>
                  {completedLessons.includes(lesson.id) ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  ) : (
                    <span className={index === currentLessonIndex ? 'text-purple-400' : 'text-gray-400'}>
                      {index + 1}
                    </span>
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="text-white text-sm mb-1">{lesson.title}</h4>
                  <p className="text-gray-400 text-xs">{lesson.duration}</p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8">
          <motion.button
            onClick={handlePrevious}
            disabled={isFirstLesson}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
              isFirstLesson
                ? 'bg-slate-700 text-gray-500 cursor-not-allowed'
                : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
            }`}
            whileHover={!isFirstLesson ? { scale: 1.05 } : {}}
            whileTap={!isFirstLesson ? { scale: 0.95 } : {}}
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </motion.button>

          <motion.button
            onClick={handleComplete}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-violet-500 text-white rounded-lg hover:from-purple-600 hover:to-violet-600 transition-all shadow-lg shadow-purple-500/50"
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(168, 85, 247, 0.6)' }}
            whileTap={{ scale: 0.95 }}
          >
            {completedLessons.includes(currentLesson.id) ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <Play className="w-5 h-5" />
            )}
            {isLastLesson ? 'Complete Module' : 'Next Lesson'}
            {!isLastLesson && <ArrowRight className="w-4 h-4" />}
          </motion.button>
        </div>
      </div>

      <style>{`
        .prose h2 {
          color: #a78bfa;
          font-size: 1.5rem;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        .prose h3 {
          color: #c4b5fd;
          font-size: 1.25rem;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }
        .prose p {
          color: #e5e7eb;
          margin-bottom: 1rem;
          line-height: 1.75;
        }
        .prose ul {
          color: #d1d5db;
          margin-left: 1.5rem;
          margin-bottom: 1rem;
        }
        .prose li {
          margin-bottom: 0.5rem;
        }
        .prose strong {
          color: #a78bfa;
        }
      `}</style>
    </div>
  );
}