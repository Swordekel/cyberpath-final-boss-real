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
  6: [
    {
      id: 1,
      title: 'OWASP Top 10 Overview',
      duration: '30 menit',
      content: `
        <h2>OWASP Top 10 - Risiko Keamanan Web Paling Kritis</h2>
        <p>OWASP (Open Web Application Security Project) merilis daftar 10 risiko keamanan aplikasi web yang paling umum dan berbahaya setiap beberapa tahun.</p>
        
        <h3>OWASP Top 10 (2021)</h3>
        <ul>
          <li><strong>A01: Broken Access Control</strong> - Kontrol akses yang lemah</li>
          <li><strong>A02: Cryptographic Failures</strong> - Kegagalan enkripsi</li>
          <li><strong>A03: Injection</strong> - SQL, NoSQL, Command injection</li>
          <li><strong>A04: Insecure Design</strong> - Desain aplikasi yang tidak aman</li>
          <li><strong>A05: Security Misconfiguration</strong> - Konfigurasi salah</li>
          <li><strong>A06: Vulnerable Components</strong> - Library/framework usang</li>
          <li><strong>A07: Authentication Failures</strong> - Autentikasi lemah</li>
          <li><strong>A08: Software & Data Integrity Failures</strong> - CI/CD pipeline issues</li>
          <li><strong>A09: Logging & Monitoring Failures</strong> - Kurang monitoring</li>
          <li><strong>A10: SSRF</strong> - Server-Side Request Forgery</li>
        </ul>

        <h3>Mengapa OWASP Top 10 Penting?</h3>
        <ul>
          <li>Industry standard untuk web security</li>
          <li>Awareness tentang risiko terkini</li>
          <li>Panduan untuk secure development</li>
          <li>Reference untuk security testing</li>
        </ul>
      `,
      points: 25,
    },
    {
      id: 2,
      title: 'Broken Access Control',
      duration: '35 menit',
      content: `
        <h2>Broken Access Control</h2>
        <p>Kelemahan dalam kontrol akses yang memungkinkan user mengakses resource atau melakukan aksi yang seharusnya tidak diizinkan.</p>
        
        <h3>Jenis-jenis Access Control Issues</h3>
        <ul>
          <li><strong>Vertical Privilege Escalation:</strong> User biasa akses admin panel</li>
          <li><strong>Horizontal Privilege Escalation:</strong> User A akses data User B</li>
          <li><strong>IDOR (Insecure Direct Object Reference):</strong> Manipulasi ID di URL</li>
          <li><strong>Path Traversal:</strong> Akses file sistem dengan ../../../</li>
          <li><strong>Missing Function Level Access Control:</strong> API endpoint tanpa auth</li>
        </ul>

        <h3>Contoh Serangan IDOR</h3>
        <ul>
          <li>URL: <code>https://bank.com/account?id=123</code></li>
          <li>Attacker ubah: <code>https://bank.com/account?id=124</code></li>
          <li>Dapat melihat account orang lain!</li>
        </ul>

        <h3>Prevention Techniques</h3>
        <ul>
          <li><strong>Deny by Default:</strong> Semua akses ditolak kecuali explicitly allowed</li>
          <li><strong>Implement RBAC/ABAC:</strong> Role/Attribute-Based Access Control</li>
          <li><strong>Server-side Validation:</strong> Jangan percaya client</li>
          <li><strong>Use UUIDs:</strong> Bukan sequential IDs</li>
          <li><strong>Log Access Attempts:</strong> Monitoring suspicious activity</li>
          <li><strong>Disable Directory Listing:</strong> Pada web server</li>
        </ul>

        <h3>Testing for Access Control</h3>
        <ul>
          <li>Test dengan berbagai role (admin, user, guest)</li>
          <li>Coba akses direct URL tanpa login</li>
          <li>Manipulasi parameter ID</li>
          <li>Test API endpoints dengan low-privilege account</li>
        </ul>
      `,
      points: 30,
    },
    {
      id: 3,
      title: 'API Security Best Practices',
      duration: '40 menit',
      content: `
        <h2>API Security</h2>
        <p>API (Application Programming Interface) adalah target populer attacker karena sering mengekspos data sensitif dan business logic.</p>
        
        <h3>Common API Vulnerabilities</h3>
        <ul>
          <li><strong>Broken Authentication:</strong> Token lemah, no expiration</li>
          <li><strong>Excessive Data Exposure:</strong> Return semua data, bukan hanya yang dibutuhkan</li>
          <li><strong>Lack of Rate Limiting:</strong> Vulnerable terhadap brute force</li>
          <li><strong>Mass Assignment:</strong> User bisa update field yang tidak seharusnya</li>
          <li><strong>Security Misconfiguration:</strong> CORS misconfigured, verbose errors</li>
        </ul>

        <h3>API Security Best Practices</h3>
        <ul>
          <li><strong>Use HTTPS:</strong> Selalu encrypt komunikasi</li>
          <li><strong>Authentication & Authorization:</strong> OAuth 2.0, JWT tokens</li>
          <li><strong>Input Validation:</strong> Validate semua input</li>
          <li><strong>Rate Limiting:</strong> Prevent abuse</li>
          <li><strong>API Versioning:</strong> Maintain backward compatibility</li>
          <li><strong>Logging & Monitoring:</strong> Track API usage</li>
          <li><strong>API Gateway:</strong> Centralized security enforcement</li>
        </ul>

        <h3>JWT (JSON Web Token) Security</h3>
        <ul>
          <li>Use strong signing algorithm (RS256, not HS256 dengan weak secret)</li>
          <li>Set proper expiration time</li>
          <li>Validate token signature pada setiap request</li>
          <li>Don't store sensitive data dalam payload (base64 != encryption)</li>
          <li>Implement token refresh mechanism</li>
        </ul>

        <h3>OWASP API Security Top 10</h3>
        <ul>
          <li>API1: Broken Object Level Authorization</li>
          <li>API2: Broken Authentication</li>
          <li>API3: Excessive Data Exposure</li>
          <li>API4: Lack of Resources & Rate Limiting</li>
          <li>API5: Broken Function Level Authorization</li>
        </ul>
      `,
      points: 35,
    },
  ],
  7: [
    {
      id: 1,
      title: 'Mobile Security Fundamentals',
      duration: '30 menit',
      content: `
        <h2>Mobile Security Landscape</h2>
        <p>Keamanan aplikasi mobile sangat kritis karena device menyimpan data pribadi, financial information, dan sering digunakan untuk autentikasi.</p>
        
        <h3>Platform Mobile</h3>
        <ul>
          <li><strong>Android:</strong> Open source (AOSP), fragmentation issues, Google Play</li>
          <li><strong>iOS:</strong> Closed ecosystem, sandboxing ketat, App Store review</li>
          <li><strong>Hybrid:</strong> React Native, Flutter, Ionic</li>
        </ul>

        <h3>Mobile Threat Landscape</h3>
        <ul>
          <li><strong>Malware:</strong> Trojans, spyware, ransomware</li>
          <li><strong>Data Leakage:</strong> Insecure storage, logs, cache</li>
          <li><strong>Insecure Communication:</strong> Unencrypted network traffic</li>
          <li><strong>Poor Authentication:</strong> Weak passwords, no biometric</li>
          <li><strong>Code Tampering:</strong> Reverse engineering, repackaging</li>
          <li><strong>Improper Platform Usage:</strong> Misuse of platform features</li>
        </ul>

        <h3>OWASP Mobile Top 10</h3>
        <ul>
          <li>M1: Improper Platform Usage</li>
          <li>M2: Insecure Data Storage</li>
          <li>M3: Insecure Communication</li>
          <li>M4: Insecure Authentication</li>
          <li>M5: Insufficient Cryptography</li>
          <li>M6: Insecure Authorization</li>
          <li>M7: Poor Code Quality</li>
          <li>M8: Code Tampering</li>
          <li>M9: Reverse Engineering</li>
          <li>M10: Extraneous Functionality</li>
        </ul>

        <h3>Mobile vs Web Security</h3>
        <ul>
          <li>Device dapat hilang/dicuri - Need device encryption</li>
          <li>Untrusted networks - Public WiFi risks</li>
          <li>Physical access - Screen lock importance</li>
          <li>Limited screen space - UI/UX security challenges</li>
        </ul>
      `,
      points: 25,
    },
    {
      id: 2,
      title: 'Secure Mobile Development',
      duration: '40 menit',
      content: `
        <h2>Secure Data Storage</h2>
        <p>Data storage adalah area paling kritis dalam mobile security.</p>
        
        <h3>Jenis Storage di Mobile</h3>
        <ul>
          <li><strong>Shared Preferences (Android) / UserDefaults (iOS):</strong> Key-value storage</li>
          <li><strong>Internal Storage:</strong> Private app files</li>
          <li><strong>External Storage:</strong> SD Card, accessible by others</li>
          <li><strong>SQLite Database:</strong> Structured data</li>
          <li><strong>Keychain (iOS) / KeyStore (Android):</strong> Secure credential storage</li>
        </ul>

        <h3>Secure Storage Best Practices</h3>
        <ul>
          <li><strong>Never store sensitive data in plain text</strong></li>
          <li><strong>Use Platform Secure Storage:</strong> Keychain/KeyStore untuk passwords, tokens</li>
          <li><strong>Encrypt SQLite Database:</strong> SQLCipher</li>
          <li><strong>Encrypt Shared Preferences:</strong> EncryptedSharedPreferences (Android)</li>
          <li><strong>Don't log sensitive data:</strong> Remove logs di production</li>
          <li><strong>Clear cache/temp files:</strong> After usage</li>
          <li><strong>Implement data at rest encryption</strong></li>
        </ul>

        <h3>Secure Network Communication</h3>
        <ul>
          <li><strong>Always use HTTPS:</strong> Never HTTP</li>
          <li><strong>Certificate Pinning:</strong> Prevent MITM attacks</li>
          <li><strong>TLS 1.2+:</strong> Disable old protocols</li>
          <li><strong>Validate SSL Certificates:</strong> Don't trust all certs</li>
          <li><strong>No sensitive data in URLs:</strong> Use POST body</li>
        </ul>

        <h3>Authentication & Authorization</h3>
        <ul>
          <li><strong>Biometric Authentication:</strong> Face ID, Touch ID, Fingerprint</li>
          <li><strong>Strong Password Policy:</strong> Enforce complexity</li>
          <li><strong>Multi-Factor Authentication:</strong> SMS, Email, Authenticator app</li>
          <li><strong>Session Management:</strong> Timeout, secure tokens</li>
          <li><strong>OAuth 2.0 / OpenID Connect:</strong> For third-party auth</li>
          <li><strong>Jailbreak/Root Detection:</strong> Extra security layer</li>
        </ul>

        <h3>Android Security Features</h3>
        <ul>
          <li>ProGuard/R8 - Code obfuscation</li>
          <li>SafetyNet API - Device integrity check</li>
          <li>Android KeyStore - Hardware-backed keys</li>
          <li>Network Security Configuration</li>
          <li>App Signing - Google Play App Signing</li>
        </ul>

        <h3>iOS Security Features</h3>
        <ul>
          <li>Keychain Services - Secure storage</li>
          <li>App Transport Security (ATS) - Enforce HTTPS</li>
          <li>Code Signing - Developer certificate</li>
          <li>Sandboxing - App isolation</li>
          <li>Data Protection API - File encryption</li>
        </ul>
      `,
      points: 35,
    },
    {
      id: 3,
      title: 'Mobile Pentesting & Reverse Engineering',
      duration: '45 menit',
      content: `
        <h2>Mobile Application Pentesting</h2>
        <p>Methodologi untuk menemukan vulnerability dalam aplikasi mobile sebelum attacker menemukannya.</p>
        
        <h3>Mobile Pentesting Tools</h3>
        <ul>
          <li><strong>MobSF (Mobile Security Framework):</strong> Automated analysis</li>
          <li><strong>Frida:</strong> Dynamic instrumentation toolkit</li>
          <li><strong>Objection:</strong> Runtime mobile exploration</li>
          <li><strong>Burp Suite:</strong> Intercept network traffic</li>
          <li><strong>ADB (Android Debug Bridge):</strong> Android debugging</li>
          <li><strong>Xcode:</strong> iOS debugging</li>
          <li><strong>JADX:</strong> Android decompiler</li>
          <li><strong>Hopper:</strong> iOS disassembler</li>
        </ul>

        <h3>Static Analysis</h3>
        <ul>
          <li>Decompile APK/IPA</li>
          <li>Review AndroidManifest.xml / Info.plist</li>
          <li>Analyze permissions</li>
          <li>Check for hardcoded secrets (API keys, passwords)</li>
          <li>Review code quality and vulnerabilities</li>
          <li>Check for insecure data storage</li>
        </ul>

        <h3>Dynamic Analysis</h3>
        <ul>
          <li><strong>Runtime Analysis:</strong> Frida hooking</li>
          <li><strong>Network Traffic Analysis:</strong> MITM proxy (Burp, Charles)</li>
          <li><strong>File System Analysis:</strong> Check stored data</li>
          <li><strong>Memory Dump:</strong> Extract sensitive data from RAM</li>
          <li><strong>Log Analysis:</strong> Logcat (Android), Console (iOS)</li>
        </ul>

        <h3>Reverse Engineering</h3>
        <ul>
          <li><strong>APK Structure:</strong> classes.dex, resources, manifest</li>
          <li><strong>IPA Structure:</strong> Binary, Info.plist, frameworks</li>
          <li><strong>Decompilation Tools:</strong> JADX, dex2jar, apktool</li>
          <li><strong>Debugging:</strong> Attach debugger untuk dynamic analysis</li>
          <li><strong>Code Obfuscation Detection:</strong> ProGuard, DexGuard</li>
        </ul>

        <h3>Common Findings</h3>
        <ul>
          <li>Hardcoded API keys dan credentials</li>
          <li>Insecure data storage (plain text passwords)</li>
          <li>SSL pinning bypass</li>
          <li>Root/Jailbreak detection bypass</li>
          <li>Insecure random number generation</li>
          <li>WebView vulnerabilities (JavaScript injection)</li>
          <li>Exported components (Android) tanpa proper validation</li>
        </ul>

        <h3>Reporting</h3>
        <ul>
          <li>Classify by OWASP Mobile Top 10</li>
          <li>Provide proof of concept</li>
          <li>Include screenshots/videos</li>
          <li>Suggest remediation</li>
          <li>Rate severity (Critical, High, Medium, Low)</li>
        </ul>
      `,
      points: 40,
    },
  ],
  8: [
    {
      id: 1,
      title: 'Cloud Computing Security Basics',
      duration: '30 menit',
      content: `
        <h2>Cloud Security Fundamentals</h2>
        <p>Cloud security melibatkan teknologi, kebijakan, dan kontrol untuk melindungi data, aplikasi, dan infrastruktur cloud computing.</p>
        
        <h3>Cloud Service Models</h3>
        <ul>
          <li><strong>IaaS (Infrastructure as a Service):</strong> AWS EC2, Azure VMs - User bertanggung jawab atas OS & aplikasi</li>
          <li><strong>PaaS (Platform as a Service):</strong> Heroku, Google App Engine - Provider kelola infrastruktur</li>
          <li><strong>SaaS (Software as a Service):</strong> Gmail, Salesforce - Provider kelola semuanya</li>
        </ul>

        <h3>Cloud Deployment Models</h3>
        <ul>
          <li><strong>Public Cloud:</strong> AWS, Azure, GCP - Shared infrastructure</li>
          <li><strong>Private Cloud:</strong> On-premises atau dedicated - Exclusive untuk satu organisasi</li>
          <li><strong>Hybrid Cloud:</strong> Kombinasi public & private</li>
          <li><strong>Multi-Cloud:</strong> Multiple cloud providers</li>
        </ul>

        <h3>Shared Responsibility Model</h3>
        <ul>
          <li><strong>Provider Responsibility:</strong> Physical security, network, hypervisor</li>
          <li><strong>Customer Responsibility:</strong> Data, identity, applications, OS (depends on service model)</li>
          <li>IaaS = Customer bertanggung jawab lebih banyak</li>
          <li>SaaS = Provider bertanggung jawab hampir semuanya</li>
        </ul>

        <h3>Cloud Security Challenges</h3>
        <ul>
          <li>Loss of control - Data di third-party</li>
          <li>Visibility issues - Sulit monitoring</li>
          <li>Compliance - Regulations & data residency</li>
          <li>Misconfigurations - Human error terbesar</li>
          <li>Account hijacking - Credential theft</li>
          <li>Insider threats - Malicious employees</li>
          <li>Insecure APIs - Attack surface</li>
        </ul>

        <h3>Benefits of Cloud Security</h3>
        <ul>
          <li>Enterprise-grade security untuk semua ukuran bisnis</li>
          <li>Automatic updates dan patches</li>
          <li>Scalability & elasticity</li>
          <li>Disaster recovery & business continuity</li>
          <li>Cost-effective</li>
        </ul>
      `,
      points: 25,
    },
    {
      id: 2,
      title: 'AWS & Azure Security',
      duration: '40 menit',
      content: `
        <h2>AWS Security Best Practices</h2>
        <p>Amazon Web Services adalah cloud provider terbesar dengan berbagai security services.</p>
        
        <h3>AWS Security Services</h3>
        <ul>
          <li><strong>IAM (Identity & Access Management):</strong> User, roles, policies</li>
          <li><strong>Security Groups:</strong> Virtual firewall untuk EC2</li>
          <li><strong>VPC (Virtual Private Cloud):</strong> Isolated network</li>
          <li><strong>KMS (Key Management Service):</strong> Encryption key management</li>
          <li><strong>CloudTrail:</strong> Logging & auditing</li>
          <li><strong>GuardDuty:</strong> Threat detection</li>
          <li><strong>WAF (Web Application Firewall):</strong> Protect web apps</li>
          <li><strong>Shield:</strong> DDoS protection</li>
        </ul>

        <h3>AWS IAM Best Practices</h3>
        <ul>
          <li><strong>Enable MFA:</strong> Untuk root & IAM users</li>
          <li><strong>Least Privilege:</strong> Grant minimum permissions</li>
          <li><strong>Use Roles:</strong> Instead of long-term credentials</li>
          <li><strong>Rotate Credentials:</strong> Regularly change access keys</li>
          <li><strong>Use Groups:</strong> Assign permissions to groups</li>
          <li><strong>Monitor with CloudTrail:</strong> All API calls logged</li>
          <li><strong>Password Policy:</strong> Enforce strong passwords</li>
        </ul>

        <h3>S3 Security</h3>
        <ul>
          <li><strong>Block Public Access:</strong> Default untuk new buckets</li>
          <li><strong>Bucket Policies:</strong> Define access control</li>
          <li><strong>Encryption:</strong> SSE-S3, SSE-KMS, SSE-C</li>
          <li><strong>Versioning:</strong> Protect against accidental deletion</li>
          <li><strong>Access Logging:</strong> Track who accessed what</li>
          <li><strong>VPC Endpoints:</strong> Private access tanpa internet</li>
        </ul>

        <h2>Azure Security</h2>
        
        <h3>Azure Security Services</h3>
        <ul>
          <li><strong>Azure AD:</strong> Identity & access management</li>
          <li><strong>NSG (Network Security Groups):</strong> Firewall rules</li>
          <li><strong>Azure Firewall:</strong> Managed firewall service</li>
          <li><strong>Key Vault:</strong> Secrets & key management</li>
          <li><strong>Security Center:</strong> Unified security management</li>
          <li><strong>Sentinel:</strong> SIEM & SOAR solution</li>
          <li><strong>DDoS Protection:</strong> Automatic DDoS mitigation</li>
        </ul>

        <h3>Azure AD Best Practices</h3>
        <ul>
          <li>Enable Conditional Access policies</li>
          <li>Implement MFA for all users</li>
          <li>Use Privileged Identity Management (PIM)</li>
          <li>Enable Identity Protection</li>
          <li>Regular access reviews</li>
        </ul>

        <h3>Common Cloud Misconfigurations</h3>
        <ul>
          <li>Publicly exposed S3 buckets / Blob storage</li>
          <li>Overly permissive IAM policies (* permissions)</li>
          <li>Disabled logging & monitoring</li>
          <li>Unencrypted data at rest</li>
          <li>Default credentials tidak diubah</li>
          <li>Missing MFA pada privileged accounts</li>
          <li>Open security groups (0.0.0.0/0)</li>
        </ul>
      `,
      points: 35,
    },
    {
      id: 3,
      title: 'Cloud Security Architecture',
      duration: '45 menit',
      content: `
        <h2>Zero Trust Architecture</h2>
        <p>"Never trust, always verify" - Tidak ada implicit trust berdasarkan network location.</p>
        
        <h3>Prinsip Zero Trust</h3>
        <ul>
          <li><strong>Verify Explicitly:</strong> Always authenticate & authorize</li>
          <li><strong>Least Privilege Access:</strong> JIT/JEA (Just In Time/Just Enough Access)</li>
          <li><strong>Assume Breach:</strong> Minimize blast radius, segment access</li>
          <li><strong>Micro-segmentation:</strong> Granular network segmentation</li>
          <li><strong>Multi-Factor Authentication:</strong> Everywhere</li>
        </ul>

        <h3>Cloud-Native Security</h3>
        <ul>
          <li><strong>Container Security:</strong> Docker, Kubernetes security</li>
          <li><strong>Serverless Security:</strong> Lambda, Azure Functions</li>
          <li><strong>Infrastructure as Code:</strong> Terraform, CloudFormation security</li>
          <li><strong>DevSecOps:</strong> Security dalam CI/CD pipeline</li>
        </ul>

        <h3>Data Protection</h3>
        <ul>
          <li><strong>Encryption in Transit:</strong> TLS/SSL untuk semua komunikasi</li>
          <li><strong>Encryption at Rest:</strong> Encrypt storage (disk, database, S3)</li>
          <li><strong>Key Management:</strong> Use KMS/Key Vault, rotate keys</li>
          <li><strong>Data Classification:</strong> Public, Internal, Confidential, Secret</li>
          <li><strong>DLP (Data Loss Prevention):</strong> Prevent data exfiltration</li>
        </ul>

        <h3>Compliance & Governance</h3>
        <ul>
          <li><strong>Compliance Standards:</strong> GDPR, HIPAA, PCI-DSS, SOC 2</li>
          <li><strong>Data Residency:</strong> Where data is stored geographically</li>
          <li><strong>Audit Logging:</strong> CloudTrail, Azure Monitor Logs</li>
          <li><strong>Policy Enforcement:</strong> AWS Config, Azure Policy</li>
          <li><strong>Automated Compliance:</strong> AWS Security Hub, Azure Security Center</li>
        </ul>

        <h3>Incident Response di Cloud</h3>
        <ul>
          <li><strong>Preparation:</strong> Runbooks, playbooks, automation</li>
          <li><strong>Detection:</strong> GuardDuty, Sentinel, SIEM</li>
          <li><strong>Containment:</strong> Isolate affected resources</li>
          <li><strong>Forensics:</strong> Snapshot EC2/VMs, analyze logs</li>
          <li><strong>Recovery:</strong> Restore from backup, rebuild</li>
          <li><strong>Lessons Learned:</strong> Post-incident review</li>
        </ul>

        <h3>Cloud Security Tools</h3>
        <ul>
          <li><strong>CSPM (Cloud Security Posture Management):</strong> Prisma Cloud, Dome9</li>
          <li><strong>CWPP (Cloud Workload Protection):</strong> Protect VMs, containers</li>
          <li><strong>CASB (Cloud Access Security Broker):</strong> Monitor SaaS usage</li>
          <li><strong>Container Security:</strong> Aqua Security, Twistlock</li>
          <li><strong>Secret Management:</strong> HashiCorp Vault</li>
        </ul>

        <h3>Best Practices Summary</h3>
        <ul>
          <li>Enable MFA everywhere</li>
          <li>Implement least privilege access</li>
          <li>Encrypt everything (at rest & in transit)</li>
          <li>Enable logging & monitoring</li>
          <li>Regular security assessments</li>
          <li>Automated security scanning dalam CI/CD</li>
          <li>Implement disaster recovery plan</li>
          <li>Security training untuk developers</li>
        </ul>
      `,
      points: 40,
    },
  ],
  9: [
    {
      id: 1,
      title: 'Database Security Fundamentals',
      duration: '25 menit',
      content: `
        <h2>Pentingnya Database Security</h2>
        <p>Database menyimpan aset paling berharga organisasi: data. Keamanan database adalah prioritas utama untuk melindungi dari akses tidak sah, pencurian data, dan serangan.</p>
        
        <h3>Ancaman Terhadap Database</h3>
        <ul>
          <li><strong>SQL Injection:</strong> Manipulasi query untuk akses tidak sah</li>
          <li><strong>Privilege Escalation:</strong> User mendapat akses lebih tinggi</li>
          <li><strong>Data Breach:</strong> Pencurian data dalam jumlah besar</li>
          <li><strong>Insider Threats:</strong> Abuse dari pengguna internal</li>
          <li><strong>Weak Authentication:</strong> Password lemah atau default credentials</li>
          <li><strong>Unencrypted Data:</strong> Data tersimpan tanpa enkripsi</li>
          <li><strong>Backup Vulnerabilities:</strong> Backup tidak aman</li>
        </ul>

        <h3>Database Security Layers</h3>
        <ul>
          <li><strong>Network Security:</strong> Firewall, VPN, network segmentation</li>
          <li><strong>Access Control:</strong> Authentication & authorization</li>
          <li><strong>Application Security:</strong> Input validation, prepared statements</li>
          <li><strong>Database Security:</strong> Encryption, auditing, monitoring</li>
          <li><strong>Physical Security:</strong> Server room access control</li>
        </ul>

        <h3>Database Security Best Practices</h3>
        <ul>
          <li>Principle of least privilege</li>
          <li>Strong authentication (MFA)</li>
          <li>Encryption at rest dan in transit</li>
          <li>Regular security audits</li>
          <li>Database activity monitoring</li>
          <li>Secure backup & recovery</li>
          <li>Patch management</li>
        </ul>

        <h3>Common Database Types</h3>
        <ul>
          <li><strong>Relational (SQL):</strong> MySQL, PostgreSQL, Oracle, SQL Server</li>
          <li><strong>NoSQL:</strong> MongoDB, Cassandra, Redis, CouchDB</li>
          <li><strong>Cloud Databases:</strong> AWS RDS, Azure SQL, Google Cloud SQL</li>
        </ul>
      `,
      points: 20,
    },
    {
      id: 2,
      title: 'SQL Injection Deep Dive',
      duration: '35 menit',
      content: `
        <h2>SQL Injection - Ancaman #1 Database</h2>
        <p>SQL Injection (SQLi) adalah teknik injeksi kode yang mengeksploitasi vulnerability dalam aplikasi database-driven.</p>
        
        <h3>Bagaimana SQL Injection Bekerja?</h3>
        <p>Contoh vulnerable code:</p>
        <ul>
          <li><code>query = "SELECT * FROM users WHERE username='" + userInput + "'"</code></li>
          <li>Input: <code>admin' OR '1'='1</code></li>
          <li>Query jadi: <code>SELECT * FROM users WHERE username='admin' OR '1'='1'</code></li>
          <li>Result: Bypass authentication!</li>
        </ul>

        <h3>Jenis-jenis SQL Injection</h3>
        <ul>
          <li><strong>In-band SQLi:</strong>
            <ul>
              <li>Error-based: Menggunakan error messages</li>
              <li>Union-based: Menggunakan UNION operator</li>
            </ul>
          </li>
          <li><strong>Blind SQLi:</strong>
            <ul>
              <li>Boolean-based: True/false responses</li>
              <li>Time-based: Delay menggunakan SLEEP()</li>
            </ul>
          </li>
          <li><strong>Out-of-band SQLi:</strong> Menggunakan DNS/HTTP requests</li>
        </ul>

        <h3>SQL Injection Attack Examples</h3>
        <ul>
          <li><strong>Authentication Bypass:</strong> <code>' OR '1'='1' --</code></li>
          <li><strong>Data Extraction:</strong> <code>' UNION SELECT username,password FROM users --</code></li>
          <li><strong>Data Modification:</strong> <code>'; UPDATE users SET password='hacked' WHERE username='admin' --</code></li>
          <li><strong>Database Deletion:</strong> <code>'; DROP TABLE users; --</code></li>
        </ul>

        <h3>Prevention Techniques</h3>
        <ul>
          <li><strong>Prepared Statements (Parameterized Queries):</strong> BEST PRACTICE
            <ul>
              <li>PHP: <code>$stmt = $pdo->prepare("SELECT * FROM users WHERE id = :id");</code></li>
              <li>Java: <code>PreparedStatement stmt = conn.prepareStatement("SELECT * FROM users WHERE id = ?");</code></li>
              <li>Python: <code>cursor.execute("SELECT * FROM users WHERE id = %s", (user_id,))</code></li>
            </ul>
          </li>
          <li><strong>Stored Procedures:</strong> Pre-compiled SQL</li>
          <li><strong>Input Validation:</strong> Whitelist acceptable inputs</li>
          <li><strong>Escaping User Input:</strong> Last resort (not recommended)</li>
          <li><strong>Least Privilege:</strong> Database user dengan minimal permissions</li>
          <li><strong>WAF (Web Application Firewall):</strong> Detect & block SQLi</li>
          <li><strong>ORM Frameworks:</strong> Sequelize, Hibernate, Django ORM</li>
        </ul>

        <h3>Detection & Testing</h3>
        <ul>
          <li>Manual testing dengan payload: <code>' OR 1=1 --</code></li>
          <li>Automated scanners: SQLMap, Burp Suite, OWASP ZAP</li>
          <li>Code review untuk vulnerable patterns</li>
          <li>Database monitoring untuk suspicious queries</li>
        </ul>
      `,
      points: 30,
    },
    {
      id: 3,
      title: 'Database Encryption & Access Control',
      duration: '30 menit',
      content: `
        <h2>Database Encryption</h2>
        <p>Enkripsi adalah pertahanan terakhir jika attacker berhasil mencuri data.</p>
        
        <h3>Encryption at Rest</h3>
        <ul>
          <li><strong>Transparent Data Encryption (TDE):</strong> Encrypt entire database
            <ul>
              <li>SQL Server TDE</li>
              <li>Oracle Advanced Security</li>
              <li>MySQL Enterprise Encryption</li>
            </ul>
          </li>
          <li><strong>Column-Level Encryption:</strong> Encrypt specific sensitive columns
            <ul>
              <li>Credit card numbers</li>
              <li>Social security numbers</li>
              <li>Passwords (use bcrypt/argon2)</li>
            </ul>
          </li>
          <li><strong>File-Level Encryption:</strong> Encrypt database files di OS level</li>
        </ul>

        <h3>Encryption in Transit</h3>
        <ul>
          <li><strong>SSL/TLS:</strong> Encrypt connections antara app dan database</li>
          <li>MySQL: Require SSL connections</li>
          <li>PostgreSQL: Force SSL mode</li>
          <li>MongoDB: TLS/SSL configuration</li>
          <li>Certificate validation</li>
        </ul>

        <h3>Key Management</h3>
        <ul>
          <li><strong>Never hardcode encryption keys dalam code!</strong></li>
          <li>Use Key Management Systems (KMS):
            <ul>
              <li>AWS KMS</li>
              <li>Azure Key Vault</li>
              <li>HashiCorp Vault</li>
            </ul>
          </li>
          <li>Key rotation policies</li>
          <li>Separate keys untuk different environments</li>
        </ul>

        <h2>Access Control</h2>
        
        <h3>Authentication</h3>
        <ul>
          <li><strong>Strong Passwords:</strong> Complexity requirements</li>
          <li><strong>Multi-Factor Authentication:</strong> Extra layer</li>
          <li><strong>Certificate-Based Authentication:</strong> Untuk services</li>
          <li><strong>Disable Default Accounts:</strong> sa, root, admin</li>
          <li><strong>Account Lockout Policies:</strong> After failed attempts</li>
        </ul>

        <h3>Authorization - Principle of Least Privilege</h3>
        <ul>
          <li><strong>Role-Based Access Control (RBAC):</strong>
            <ul>
              <li>Admin role: Full access</li>
              <li>Developer role: Read/Write specific tables</li>
              <li>App role: Minimal permissions</li>
              <li>Read-only role: SELECT only</li>
            </ul>
          </li>
          <li><strong>Grant Minimal Permissions:</strong>
            <ul>
              <li>App user: JANGAN gunakan root/sa</li>
              <li>Grant per-table permissions</li>
              <li>Restrict dangerous commands (DROP, TRUNCATE)</li>
            </ul>
          </li>
        </ul>

        <h3>Auditing & Monitoring</h3>
        <ul>
          <li><strong>Enable Database Auditing:</strong>
            <ul>
              <li>Track login attempts</li>
              <li>Log privileged operations</li>
              <li>Monitor DDL changes (CREATE, ALTER, DROP)</li>
              <li>Track data access (SELECT, UPDATE, DELETE)</li>
            </ul>
          </li>
          <li><strong>Database Activity Monitoring (DAM):</strong>
            <ul>
              <li>Real-time monitoring</li>
              <li>Anomaly detection</li>
              <li>Alert pada suspicious activity</li>
            </ul>
          </li>
          <li><strong>Regular Security Audits:</strong>
            <ul>
              <li>Review user permissions</li>
              <li>Check for unused accounts</li>
              <li>Verify encryption settings</li>
            </ul>
          </li>
        </ul>

        <h3>Backup Security</h3>
        <ul>
          <li>Encrypt backup files</li>
          <li>Store backups securely (offsite, cloud)</li>
          <li>Test restore procedures regularly</li>
          <li>Access control untuk backup files</li>
          <li>Retention policies</li>
        </ul>
      `,
      points: 25,
    },
  ],
  10: [
    {
      id: 1,
      title: 'Introduction to Digital Forensics',
      duration: '30 menit',
      content: `
        <h2>Apa itu Digital Forensics?</h2>
        <p>Digital forensics adalah proses mengidentifikasi, mengumpulkan, menganalisis, dan menyimpan bukti digital untuk investigasi kejahatan cyber atau insiden keamanan.</p>
        
        <h3>Tujuan Digital Forensics</h3>
        <ul>
          <li>Mengidentifikasi insiden keamanan</li>
          <li>Mengumpulkan bukti yang admissible di pengadilan</li>
          <li>Menentukan root cause</li>
          <li>Mengidentifikasi pelaku</li>
          <li>Recovery dari insiden</li>
          <li>Mencegah insiden serupa di masa depan</li>
        </ul>

        <h3>Jenis Digital Forensics</h3>
        <ul>
          <li><strong>Computer Forensics:</strong> Investigasi komputer dan laptop</li>
          <li><strong>Mobile Forensics:</strong> Smartphone, tablets</li>
          <li><strong>Network Forensics:</strong> Network traffic analysis</li>
          <li><strong>Cloud Forensics:</strong> Cloud services investigation</li>
          <li><strong>Database Forensics:</strong> Database audit trails</li>
          <li><strong>Malware Forensics:</strong> Reverse engineering malware</li>
          <li><strong>Email Forensics:</strong> Email analysis</li>
        </ul>

        <h3>Digital Forensics Process</h3>
        <ul>
          <li><strong>1. Identification:</strong> Mengenali insiden dan evidence</li>
          <li><strong>2. Preservation:</strong> Secure dan protect evidence (chain of custody)</li>
          <li><strong>3. Collection:</strong> Mengumpulkan data secara forensically sound</li>
          <li><strong>4. Examination:</strong> Extract dan assess evidence</li>
          <li><strong>5. Analysis:</strong> Analyze untuk menemukan facts</li>
          <li><strong>6. Presentation:</strong> Report findings</li>
        </ul>

        <h3>Chain of Custody</h3>
        <p>Dokumentasi yang mencatat siapa yang memiliki akses ke evidence dan kapan.</p>
        <ul>
          <li>Who collected the evidence?</li>
          <li>When dan where was it collected?</li>
          <li>Who took possession?</li>
          <li>How was it stored?</li>
          <li>Who accessed it?</li>
        </ul>

        <h3>Legal Considerations</h3>
        <ul>
          <li>Fourth Amendment (US) - Search & seizure</li>
          <li>Privacy laws - GDPR, CCPA</li>
          <li>Authorization - Get legal approval</li>
          <li>Admissibility - Evidence must be legally obtained</li>
          <li>Expert witness testimony</li>
        </ul>

        <h3>Forensics Principles</h3>
        <ul>
          <li><strong>Do No Harm:</strong> Jangan modify original evidence</li>
          <li><strong>Work on Copies:</strong> Forensic images, bukan original</li>
          <li><strong>Document Everything:</strong> Detailed notes</li>
          <li><strong>Maintain Chain of Custody:</strong> Unbroken documentation</li>
          <li><strong>Be Thorough:</strong> Don't miss evidence</li>
        </ul>
      `,
      points: 25,
    },
    {
      id: 2,
      title: 'Forensic Investigation Techniques',
      duration: '40 menit',
      content: `
        <h2>Data Acquisition</h2>
        <p>Proses mengumpulkan data dari devices atau media storage.</p>
        
        <h3>Jenis Data Acquisition</h3>
        <ul>
          <li><strong>Dead Acquisition:</strong> System powered off
            <ul>
              <li>Lebih aman, data tidak berubah</li>
              <li>Kehilangan volatile memory (RAM)</li>
              <li>Good untuk most cases</li>
            </ul>
          </li>
          <li><strong>Live Acquisition:</strong> System powered on
            <ul>
              <li>Capture RAM contents</li>
              <li>Running processes</li>
              <li>Network connections</li>
              <li>Encryption keys in memory</li>
            </ul>
          </li>
        </ul>

        <h3>Disk Imaging</h3>
        <ul>
          <li><strong>Bit-by-bit Copy:</strong> Exact replica including deleted files</li>
          <li><strong>Tools:</strong>
            <ul>
              <li>FTK Imager (Free, Windows)</li>
              <li>dd (Linux): <code>dd if=/dev/sda of=image.dd bs=4M</code></li>
              <li>EnCase</li>
              <li>Autopsy</li>
            </ul>
          </li>
          <li><strong>Image Formats:</strong>
            <ul>
              <li>Raw (.dd, .raw) - Universal, large size</li>
              <li>E01 (EnCase) - Compressed, with metadata</li>
              <li>AFF (Advanced Forensics Format)</li>
            </ul>
          </li>
          <li><strong>Hash Verification:</strong> MD5/SHA256 untuk verify integrity</li>
        </ul>

        <h3>Memory Forensics</h3>
        <ul>
          <li><strong>RAM Analysis:</strong> Capture volatile data
            <ul>
              <li>Running processes & services</li>
              <li>Network connections</li>
              <li>Decryption keys</li>
              <li>Recently accessed files</li>
              <li>Passwords in memory</li>
            </ul>
          </li>
          <li><strong>Tools:</strong>
            <ul>
              <li>Volatility Framework - Best untuk memory analysis</li>
              <li>Rekall</li>
              <li>Redline</li>
              <li>DumpIt - Memory acquisition</li>
            </ul>
          </li>
        </ul>

        <h3>File System Analysis</h3>
        <ul>
          <li><strong>Deleted File Recovery:</strong>
            <ul>
              <li>File carving techniques</li>
              <li>Unallocated space analysis</li>
              <li>Tools: PhotoRec, Scalpel</li>
            </ul>
          </li>
          <li><strong>Timeline Analysis:</strong>
            <ul>
              <li>MAC Times (Modified, Accessed, Created)</li>
              <li>Reconstruct user activity</li>
              <li>Tools: log2timeline, Plaso</li>
            </ul>
          </li>
          <li><strong>Metadata Examination:</strong>
            <ul>
              <li>EXIF data in images</li>
              <li>Document properties</li>
              <li>Hidden data in files</li>
            </ul>
          </li>
        </ul>

        <h2>Artifact Analysis</h2>
        
        <h3>Windows Artifacts</h3>
        <ul>
          <li><strong>Registry:</strong> User activity, installed software, USB devices</li>
          <li><strong>Event Logs:</strong> System, Security, Application logs</li>
          <li><strong>Prefetch:</strong> Program execution history</li>
          <li><strong>LNK Files:</strong> Recently accessed files</li>
          <li><strong>Browser History:</strong> Chrome, Firefox, Edge artifacts</li>
          <li><strong>Recycle Bin:</strong> Deleted files metadata</li>
        </ul>

        <h3>Linux Artifacts</h3>
        <ul>
          <li><strong>/var/log:</strong> System logs</li>
          <li><strong>bash_history:</strong> Command history</li>
          <li><strong>/etc/passwd:</strong> User accounts</li>
          <li><strong>Cron jobs:</strong> Scheduled tasks</li>
        </ul>

        <h3>Network Forensics</h3>
        <ul>
          <li><strong>Packet Capture:</strong> Wireshark, tcpdump</li>
          <li><strong>Log Analysis:</strong> Firewall, IDS/IPS, proxy logs</li>
          <li><strong>NetFlow Analysis:</strong> Traffic patterns</li>
          <li><strong>DNS Logs:</strong> Domain queries</li>
        </ul>
      `,
      points: 35,
    },
    {
      id: 3,
      title: 'Incident Response & Malware Analysis',
      duration: '45 menit',
      content: `
        <h2>Incident Response Framework</h2>
        <p>Proses terstruktur untuk menangani security incidents.</p>
        
        <h3>NIST Incident Response Lifecycle</h3>
        <ul>
          <li><strong>1. Preparation:</strong>
            <ul>
              <li>Establish IR team & procedures</li>
              <li>Deploy monitoring tools</li>
              <li>Training & awareness</li>
              <li>Create playbooks</li>
            </ul>
          </li>
          <li><strong>2. Detection & Analysis:</strong>
            <ul>
              <li>Monitor alerts (SIEM)</li>
              <li>Analyze indicators of compromise (IOCs)</li>
              <li>Determine incident severity</li>
              <li>Initial triage</li>
            </ul>
          </li>
          <li><strong>3. Containment:</strong>
            <ul>
              <li>Short-term: Isolate affected systems</li>
              <li>Long-term: Apply patches, change credentials</li>
              <li>Preserve evidence</li>
            </ul>
          </li>
          <li><strong>4. Eradication:</strong>
            <ul>
              <li>Remove malware</li>
              <li>Delete backdoors</li>
              <li>Fix vulnerabilities</li>
            </ul>
          </li>
          <li><strong>5. Recovery:</strong>
            <ul>
              <li>Restore systems from clean backups</li>
              <li>Monitor untuk reinfection</li>
              <li>Return to normal operations</li>
            </ul>
          </li>
          <li><strong>6. Lessons Learned:</strong>
            <ul>
              <li>Post-incident review</li>
              <li>Update procedures</li>
              <li>Improve defenses</li>
            </ul>
          </li>
        </ul>

        <h3>Incident Classification</h3>
        <ul>
          <li><strong>Severity Levels:</strong>
            <ul>
              <li>Critical: Data breach, ransomware, system compromise</li>
              <li>High: Malware infection, unauthorized access</li>
              <li>Medium: Phishing, policy violation</li>
              <li>Low: Failed login attempts, suspicious email</li>
            </ul>
          </li>
        </ul>

        <h2>Malware Analysis</h2>
        
        <h3>Jenis Malware</h3>
        <ul>
          <li><strong>Virus:</strong> Self-replicating, needs host file</li>
          <li><strong>Worm:</strong> Self-propagating, no host needed</li>
          <li><strong>Trojan:</strong> Disguised as legitimate software</li>
          <li><strong>Ransomware:</strong> Encrypts files, demands ransom</li>
          <li><strong>Spyware:</strong> Steals information</li>
          <li><strong>Rootkit:</strong> Hides presence, privileged access</li>
          <li><strong>Botnet:</strong> Network of infected machines</li>
        </ul>

        <h3>Static Analysis</h3>
        <ul>
          <li><strong>Tanpa menjalankan malware:</strong>
            <ul>
              <li>File properties & hashes</li>
              <li>Strings analysis</li>
              <li>PE/ELF header analysis</li>
              <li>Disassembly (IDA Pro, Ghidra)</li>
              <li>Decompilation</li>
            </ul>
          </li>
          <li><strong>Tools:</strong>
            <ul>
              <li>PEiD - Detect packers</li>
              <li>strings - Extract readable text</li>
              <li>VirusTotal - Multi-AV scanning</li>
              <li>Ghidra - Free reverse engineering tool</li>
            </ul>
          </li>
        </ul>

        <h3>Dynamic Analysis</h3>
        <ul>
          <li><strong>Menjalankan malware di sandbox:</strong>
            <ul>
              <li>Behavioral analysis</li>
              <li>Network traffic monitoring</li>
              <li>File system changes</li>
              <li>Registry modifications</li>
              <li>Process activity</li>
            </ul>
          </li>
          <li><strong>Sandbox Environments:</strong>
            <ul>
              <li>Cuckoo Sandbox - Open source</li>
              <li>ANY.RUN - Interactive online sandbox</li>
              <li>Joe Sandbox</li>
              <li>Hybrid Analysis</li>
            </ul>
          </li>
          <li><strong>Tools:</strong>
            <ul>
              <li>Process Monitor (Procmon) - Track file/registry changes</li>
              <li>Process Explorer - Process tree analysis</li>
              <li>Wireshark - Network traffic</li>
              <li>Regshot - Registry comparison</li>
            </ul>
          </li>
        </ul>

        <h3>Indicators of Compromise (IOCs)</h3>
        <ul>
          <li>File hashes (MD5, SHA256)</li>
          <li>IP addresses & domains</li>
          <li>URLs</li>
          <li>Registry keys</li>
          <li>Mutex names</li>
          <li>File paths</li>
        </ul>

        <h3>Threat Intelligence</h3>
        <ul>
          <li><strong>MITRE ATT&CK Framework:</strong> Tactics, techniques, procedures</li>
          <li><strong>Sharing Platforms:</strong>
            <ul>
              <li>AlienVault OTX</li>
              <li>MISP - Malware Information Sharing Platform</li>
              <li>Threat Connect</li>
            </ul>
          </li>
          <li><strong>YARA Rules:</strong> Malware detection signatures</li>
        </ul>

        <h3>Reporting</h3>
        <ul>
          <li><strong>Executive Summary:</strong> High-level overview</li>
          <li><strong>Timeline:</strong> Sequence of events</li>
          <li><strong>Technical Details:</strong> IOCs, attack vectors</li>
          <li><strong>Impact Assessment:</strong> Data loss, downtime, cost</li>
          <li><strong>Root Cause:</strong> How breach occurred</li>
          <li><strong>Recommendations:</strong> Prevent future incidents</li>
          <li><strong>Evidence:</strong> Screenshots, logs, artifacts</li>
        </ul>
      `,
      points: 40,
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