import { BookOpen, CheckCircle, ArrowLeft, ArrowRight, Play, Clock, Award } from 'lucide-react';
import { useState } from 'react';
import { Page } from '../App';
import { motion } from 'motion/react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

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
        <p>Cybersecurity atau keamanan siber adalah praktik melindungi sistem komputer, jaringan, dan data dari serangan digital.</p>
        
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
        <p>CIA Triad adalah tiga prinsip fundamental dalam keamanan informasi.</p>
        
        <h3>1. Confidentiality (Kerahasiaan)</h3>
        <ul>
          <li>Enkripsi data</li>
          <li>Kontrol akses</li>
          <li>Autentikasi pengguna</li>
        </ul>

        <h3>2. Integrity (Integritas)</h3>
        <ul>
          <li>Hashing</li>
          <li>Digital signatures</li>
          <li>Version control</li>
        </ul>

        <h3>3. Availability (Ketersediaan)</h3>
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
        <ul>
          <li>Phishing email</li>
          <li>Pretexting (berpura-pura)</li>
          <li>Baiting (umpan)</li>
        </ul>

        <h3>2. Malware Attacks</h3>
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
      points: 15,
    },
    {
      id: 4,
      title: 'Password Security',
      duration: '18 menit',
      content: `
        <h2>Keamanan Password</h2>
        <p>Password adalah pertahanan pertama terhadap akses tidak sah.</p>
        
        <h3>Password Best Practices</h3>
        <ul>
          <li>Minimal 12 karakter</li>
          <li>Kombinasi huruf besar, kecil, angka, simbol</li>
          <li>Tidak menggunakan informasi pribadi</li>
          <li>Unique password untuk setiap akun</li>
          <li>Gunakan password manager</li>
        </ul>

        <h3>Multi-Factor Authentication (MFA)</h3>
        <ul>
          <li><strong>Something you know:</strong> Password, PIN</li>
          <li><strong>Something you have:</strong> SMS, authenticator app</li>
          <li><strong>Something you are:</strong> Biometric</li>
        </ul>
      `,
      points: 12,
    },
    {
      id: 5,
      title: 'Network Security Basics',
      duration: '20 menit',
      content: `
        <h2>Dasar Keamanan Jaringan</h2>
        
        <h3>Firewall</h3>
        <ul>
          <li>Barrier antara trusted dan untrusted network</li>
          <li>Memfilter traffic berdasarkan rules</li>
          <li>Hardware firewall vs Software firewall</li>
        </ul>

        <h3>Antivirus & Anti-Malware</h3>
        <ul>
          <li>Signature-based detection</li>
          <li>Real-time scanning</li>
          <li>Regular updates penting</li>
        </ul>

        <h3>Secure Networks</h3>
        <ul>
          <li>WPA3 untuk WiFi</li>
          <li>Disable WPS</li>
          <li>Change default router credentials</li>
        </ul>
      `,
      points: 12,
    },
    {
      id: 6,
      title: 'Social Engineering Defense',
      duration: '15 menit',
      content: `
        <h2>Melindungi Diri dari Social Engineering</h2>
        
        <h3>Red Flags Phishing</h3>
        <ul>
          <li>Sender email address yang suspicious</li>
          <li>Urgency atau threats</li>
          <li>Grammar dan spelling errors</li>
          <li>Unexpected attachments atau links</li>
          <li>Requests untuk personal information</li>
        </ul>

        <h3>Defense Strategies</h3>
        <ul>
          <li>Verify identity sebelum memberikan informasi</li>
          <li>Hover over links untuk check URL</li>
          <li>Report suspicious emails</li>
          <li>Security awareness training</li>
        </ul>
      `,
      points: 10,
    },
    {
      id: 7,
      title: 'Data Protection & Privacy',
      duration: '18 menit',
      content: `
        <h2>Melindungi Data dan Privacy</h2>
        
        <h3>Data Classification</h3>
        <ul>
          <li><strong>Public:</strong> Dapat dibagikan publik</li>
          <li><strong>Internal:</strong> Untuk internal organisasi</li>
          <li><strong>Confidential:</strong> Sensitive business data</li>
          <li><strong>Restricted:</strong> Highly sensitive</li>
        </ul>

        <h3>Data Protection Methods</h3>
        <ul>
          <li>Encryption untuk data at rest dan in transit</li>
          <li>Access controls (RBAC)</li>
          <li>Data masking</li>
          <li>Regular backups</li>
        </ul>

        <h3>Privacy Regulations</h3>
        <ul>
          <li>GDPR (Europe)</li>
          <li>CCPA (California)</li>
          <li>HIPAA (Healthcare)</li>
        </ul>
      `,
      points: 12,
    },
    {
      id: 8,
      title: 'Security Best Practices',
      duration: '15 menit',
      content: `
        <h2>Security Mindset</h2>
        
        <h3>Daily Security Habits</h3>
        <ul>
          <li>Lock screen ketika away</li>
          <li>Update software secara regular</li>
          <li>Be cautious dengan public WiFi</li>
          <li>Verify before clicking links</li>
          <li>Report security incidents immediately</li>
        </ul>

        <h3>Secure Browsing</h3>
        <ul>
          <li>HTTPS untuk semua sensitive transactions</li>
          <li>Clear cookies dan cache regularly</li>
          <li>Use privacy-focused browsers</li>
          <li>Disable unnecessary browser extensions</li>
        </ul>
      `,
      points: 10,
    },
  ],
  2: [
    {
      id: 1,
      title: 'Pengenalan Network Security',
      duration: '20 menit',
      content: `
        <h2>Apa itu Network Security?</h2>
        <p>Network Security adalah praktik melindungi jaringan komputer dari ancaman internal dan eksternal.</p>
        
        <h3>Komponen Utama</h3>
        <ul>
          <li><strong>Firewall:</strong> Barrier pertahanan pertama</li>
          <li><strong>IDS/IPS:</strong> Intrusion Detection/Prevention System</li>
          <li><strong>VPN:</strong> Virtual Private Network</li>
          <li><strong>NAC:</strong> Network Access Control</li>
        </ul>
      `,
      points: 10,
    },
    {
      id: 2,
      title: 'Firewall & Filtering',
      duration: '25 menit',
      content: `
        <h2>Memahami Firewall</h2>
        
        <h3>Jenis-jenis Firewall</h3>
        <ul>
          <li><strong>Packet Filtering Firewall:</strong> Memeriksa header paket</li>
          <li><strong>Stateful Inspection Firewall:</strong> Melacak state koneksi</li>
          <li><strong>Application Layer Firewall:</strong> Memeriksa konten aplikasi</li>
          <li><strong>Next-Generation Firewall:</strong> Kombinasi semua fitur</li>
        </ul>

        <h3>Firewall Rules Best Practices</h3>
        <ul>
          <li>Default deny - Blokir semua, izinkan yang spesifik</li>
          <li>Principle of least privilege</li>
          <li>Regular rule review</li>
        </ul>
      `,
      points: 15,
    },
    {
      id: 3,
      title: 'VPN & Secure Tunneling',
      duration: '30 menit',
      content: `
        <h2>Virtual Private Network</h2>
        
        <h3>Jenis VPN</h3>
        <ul>
          <li><strong>Site-to-Site VPN:</strong> Menghubungkan networks</li>
          <li><strong>Remote Access VPN:</strong> Untuk individual users</li>
          <li><strong>SSL/TLS VPN:</strong> Berbasis web browser</li>
          <li><strong>IPSec VPN:</strong> Protocol suite untuk secure communication</li>
        </ul>

        <h3>Protokol VPN</h3>
        <ul>
          <li>OpenVPN - Open source, sangat aman</li>
          <li>WireGuard - Modern, cepat</li>
          <li>IPSec - Industry standard</li>
        </ul>
      `,
      points: 15,
    },
    {
      id: 4,
      title: 'Network Protocols & Security',
      duration: '22 menit',
      content: `
        <h2>Secure Network Protocols</h2>
        
        <h3>Transport Layer Security</h3>
        <ul>
          <li><strong>TLS/SSL:</strong> Encrypt HTTP traffic (HTTPS)</li>
          <li><strong>SSH:</strong> Secure remote access</li>
          <li><strong>SFTP:</strong> Secure file transfer</li>
        </ul>

        <h3>Authentication Protocols</h3>
        <ul>
          <li>Kerberos - Network authentication</li>
          <li>RADIUS - Remote Authentication</li>
          <li>OAuth/SAML - Modern authentication</li>
        </ul>
      `,
      points: 12,
    },
    {
      id: 5,
      title: 'Intrusion Detection Systems',
      duration: '28 menit',
      content: `
        <h2>IDS vs IPS</h2>
        
        <h3>Intrusion Detection System (IDS)</h3>
        <ul>
          <li>Monitor dan detect malicious activity</li>
          <li>Alert administrators</li>
          <li>Passive - tidak block traffic</li>
        </ul>

        <h3>Intrusion Prevention System (IPS)</h3>
        <ul>
          <li>Detect DAN block threats</li>
          <li>Active defense</li>
          <li>In-line deployment</li>
        </ul>

        <h3>Detection Methods</h3>
        <ul>
          <li>Signature-based detection</li>
          <li>Anomaly-based detection</li>
          <li>Policy-based detection</li>
        </ul>
      `,
      points: 15,
    },
    {
      id: 6,
      title: 'Wireless Security',
      duration: '25 menit',
      content: `
        <h2>Securing Wireless Networks</h2>
        
        <h3>WiFi Security Standards</h3>
        <ul>
          <li><strong>WEP:</strong> Deprecated, easily cracked</li>
          <li><strong>WPA:</strong> Better, but still vulnerable</li>
          <li><strong>WPA2:</strong> Current standard, secure</li>
          <li><strong>WPA3:</strong> Latest, most secure</li>
        </ul>

        <h3>Wireless Attacks</h3>
        <ul>
          <li>Evil Twin - Fake access point</li>
          <li>Deauthentication Attack</li>
          <li>WPS Brute Force</li>
        </ul>
      `,
      points: 13,
    },
    {
      id: 7,
      title: 'Network Segmentation',
      duration: '20 menit',
      content: `
        <h2>Network Segmentation Strategy</h2>
        
        <h3>Benefits</h3>
        <ul>
          <li>Limit lateral movement</li>
          <li>Contain breaches</li>
          <li>Better performance</li>
        </ul>

        <h3>Segmentation Methods</h3>
        <ul>
          <li>VLANs - Virtual LANs</li>
          <li>Subnetting</li>
          <li>DMZ - Demilitarized zone</li>
          <li>Micro-segmentation</li>
        </ul>
      `,
      points: 10,
    },
    {
      id: 8,
      title: 'DNS Security',
      duration: '18 menit',
      content: `
        <h2>Domain Name System Security</h2>
        
        <h3>DNS Attacks</h3>
        <ul>
          <li>DNS Spoofing/Cache Poisoning</li>
          <li>DNS Tunneling - Data exfiltration</li>
          <li>DNS Amplification - DDoS attack</li>
        </ul>

        <h3>DNSSEC</h3>
        <ul>
          <li>DNS Security Extensions</li>
          <li>Cryptographic signatures</li>
          <li>Validate authenticity</li>
        </ul>
      `,
      points: 10,
    },
    {
      id: 9,
      title: 'Network Monitoring',
      duration: '24 menit',
      content: `
        <h2>Network Monitoring Tools</h2>
        
        <h3>Traffic Analysis</h3>
        <ul>
          <li>Wireshark - Packet analyzer</li>
          <li>tcpdump - Command-line packet capture</li>
          <li>NetFlow - Traffic flow data</li>
          <li>SIEM - Security Information & Event Management</li>
        </ul>

        <h3>What to Monitor</h3>
        <ul>
          <li>Bandwidth usage</li>
          <li>Connection attempts</li>
          <li>Failed logins</li>
          <li>Unusual protocols</li>
        </ul>
      `,
      points: 12,
    },
    {
      id: 10,
      title: 'Network Access Control',
      duration: '22 menit',
      content: `
        <h2>NAC Implementation</h2>
        
        <h3>NAC Components</h3>
        <ul>
          <li>Authentication - Who are you?</li>
          <li>Authorization - What can you access?</li>
          <li>Policy enforcement</li>
          <li>Device compliance check</li>
        </ul>
      `,
      points: 12,
    },
    {
      id: 11,
      title: 'Zero Trust Architecture',
      duration: '26 menit',
      content: `
        <h2>Zero Trust Model</h2>
        
        <h3>Principles</h3>
        <ul>
          <li>"Never trust, always verify"</li>
          <li>No implicit trust based on location</li>
          <li>Continuous verification</li>
          <li>Least privilege access</li>
        </ul>

        <h3>Implementation</h3>
        <ul>
          <li>MFA untuk all access</li>
          <li>Device health checks</li>
          <li>Conditional access policies</li>
        </ul>
      `,
      points: 14,
    },
    {
      id: 12,
      title: 'Network Security Best Practices',
      duration: '20 menit',
      content: `
        <h2>Comprehensive Network Security</h2>
        
        <h3>Defense in Depth</h3>
        <ul>
          <li>Multiple layers of security</li>
          <li>Firewall + IPS + WAF + Endpoint protection</li>
          <li>No single point of failure</li>
        </ul>

        <h3>Regular Maintenance</h3>
        <ul>
          <li>Patch management</li>
          <li>Firmware updates</li>
          <li>Configuration reviews</li>
          <li>Security audits</li>
        </ul>
      `,
      points: 12,
    },
  ],
  3: [
    {
      id: 1,
      title: 'Introduction to Cryptography',
      duration: '25 menit',
      content: `
        <h2>Apa itu Cryptography?</h2>
        <p>Cryptography adalah ilmu mengamankan komunikasi dengan mengubah informasi menjadi format yang tidak dapat dibaca tanpa kunci khusus.</p>
        
        <h3>Tujuan Cryptography</h3>
        <ul>
          <li><strong>Confidentiality:</strong> Hanya pihak berwenang yang bisa membaca</li>
          <li><strong>Integrity:</strong> Memastikan data tidak diubah</li>
          <li><strong>Authentication:</strong> Verifikasi identitas pengirim</li>
          <li><strong>Non-repudiation:</strong> Pengirim tidak bisa menyangkal</li>
        </ul>

        <h3>Sejarah Cryptography</h3>
        <ul>
          <li>Caesar Cipher - Ancient Rome</li>
          <li>Enigma Machine - World War II</li>
          <li>Modern Cryptography - Computer age</li>
        </ul>
      `,
      points: 15,
    },
    {
      id: 2,
      title: 'Symmetric Encryption',
      duration: '30 menit',
      content: `
        <h2>Symmetric Key Cryptography</h2>
        <p>Menggunakan kunci yang sama untuk enkripsi dan dekripsi.</p>
        
        <h3>Algoritma Symmetric</h3>
        <ul>
          <li><strong>AES (Advanced Encryption Standard):</strong> Industry standard</li>
          <li><strong>DES:</strong> Deprecated, tidak aman lagi</li>
          <li><strong>3DES:</strong> Triple DES, lebih aman dari DES</li>
          <li><strong>ChaCha20:</strong> Modern, cepat untuk mobile</li>
        </ul>

        <h3>Keuntungan & Kerugian</h3>
        <ul>
          <li><strong>Pros:</strong> Cepat, efisien untuk data besar</li>
          <li><strong>Cons:</strong> Key distribution challenge</li>
        </ul>
      `,
      points: 18,
    },
    {
      id: 3,
      title: 'Asymmetric Encryption',
      duration: '35 menit',
      content: `
        <h2>Public Key Cryptography</h2>
        <p>Menggunakan sepasang kunci: public key (enkripsi) dan private key (dekripsi).</p>
        
        <h3>Algoritma Asymmetric</h3>
        <ul>
          <li><strong>RSA:</strong> Paling populer, basis matematika</li>
          <li><strong>ECC (Elliptic Curve):</strong> Lebih efisien</li>
          <li><strong>DSA:</strong> Digital Signature Algorithm</li>
        </ul>

        <h3>Use Cases</h3>
        <ul>
          <li>SSL/TLS certificates</li>
          <li>Digital signatures</li>
          <li>Secure email (PGP)</li>
          <li>SSH key authentication</li>
        </ul>
      `,
      points: 20,
    },
    {
      id: 4,
      title: 'Hash Functions',
      duration: '28 menit',
      content: `
        <h2>Cryptographic Hash Functions</h2>
        <p>Mengubah data menjadi fixed-size string yang unik.</p>
        
        <h3>Algoritma Hash</h3>
        <ul>
          <li><strong>SHA-256:</strong> Secure Hash Algorithm, sangat aman</li>
          <li><strong>SHA-3:</strong> Latest SHA variant</li>
          <li><strong>MD5:</strong> Deprecated, vulnerable to collisions</li>
          <li><strong>bcrypt:</strong> Password hashing dengan salt</li>
        </ul>

        <h3>Properties</h3>
        <ul>
          <li>Deterministic - Same input = same output</li>
          <li>One-way function - Cannot reverse</li>
          <li>Collision resistant</li>
        </ul>
      `,
      points: 16,
    },
    {
      id: 5,
      title: 'Digital Signatures',
      duration: '25 menit',
      content: `
        <h2>Digital Signatures</h2>
        <p>Verifikasi authenticity dan integrity dokumen digital.</p>
        
        <h3>How It Works</h3>
        <ul>
          <li>Hash dokumen</li>
          <li>Encrypt hash dengan private key</li>
          <li>Recipient decrypt dengan public key</li>
          <li>Compare hash untuk verify integrity</li>
        </ul>

        <h3>Applications</h3>
        <ul>
          <li>Software signing</li>
          <li>Email signing</li>
          <li>Document authentication</li>
          <li>Blockchain transactions</li>
        </ul>
      `,
      points: 14,
    },
    {
      id: 6,
      title: 'SSL/TLS Protocols',
      duration: '32 menit',
      content: `
        <h2>Transport Layer Security</h2>
        
        <h3>TLS Handshake Process</h3>
        <ul>
          <li>Client Hello - Request connection</li>
          <li>Server Hello - Send certificate</li>
          <li>Key Exchange - Establish session keys</li>
          <li>Encrypted Communication</li>
        </ul>

        <h3>TLS Versions</h3>
        <ul>
          <li>SSL 2.0/3.0 - Deprecated, insecure</li>
          <li>TLS 1.0/1.1 - Deprecated</li>
          <li>TLS 1.2 - Still widely used</li>
          <li>TLS 1.3 - Latest, fastest, most secure</li>
        </ul>
      `,
      points: 18,
    },
    {
      id: 7,
      title: 'Public Key Infrastructure',
      duration: '30 menit',
      content: `
        <h2>PKI - Public Key Infrastructure</h2>
        
        <h3>PKI Components</h3>
        <ul>
          <li><strong>Certificate Authority (CA):</strong> Issue certificates</li>
          <li><strong>Registration Authority:</strong> Verify identities</li>
          <li><strong>Certificate Repository:</strong> Store certificates</li>
          <li><strong>Certificate Revocation List:</strong> Revoked certificates</li>
        </ul>

        <h3>X.509 Certificates</h3>
        <ul>
          <li>Subject name</li>
          <li>Public key</li>
          <li>Validity period</li>
          <li>Digital signature dari CA</li>
        </ul>
      `,
      points: 16,
    },
    {
      id: 8,
      title: 'Key Management',
      duration: '22 menit',
      content: `
        <h2>Cryptographic Key Management</h2>
        
        <h3>Key Lifecycle</h3>
        <ul>
          <li>Generation - Create secure keys</li>
          <li>Distribution - Safely share keys</li>
          <li>Storage - Secure key storage</li>
          <li>Rotation - Regular key changes</li>
          <li>Destruction - Secure key deletion</li>
        </ul>

        <h3>Best Practices</h3>
        <ul>
          <li>Use Hardware Security Modules (HSM)</li>
          <li>Never hardcode keys in code</li>
          <li>Implement key rotation policies</li>
        </ul>
      `,
      points: 12,
    },
    {
      id: 9,
      title: 'Cryptographic Attacks',
      duration: '28 menit',
      content: `
        <h2>Common Crypto Attacks</h2>
        
        <h3>Attack Types</h3>
        <ul>
          <li><strong>Brute Force:</strong> Try all possible keys</li>
          <li><strong>Collision Attack:</strong> Find two inputs with same hash</li>
          <li><strong>Rainbow Table:</strong> Precomputed hash values</li>
          <li><strong>Side Channel:</strong> Timing, power analysis</li>
          <li><strong>Man-in-the-Middle:</strong> Intercept communications</li>
        </ul>

        <h3>Defenses</h3>
        <ul>
          <li>Use strong algorithms (AES-256, RSA-2048+)</li>
          <li>Implement salt untuk password hashing</li>
          <li>Regular key rotation</li>
        </ul>
      `,
      points: 15,
    },
    {
      id: 10,
      title: 'Modern Cryptography Applications',
      duration: '25 menit',
      content: `
        <h2>Real-World Crypto Applications</h2>
        
        <h3>Blockchain & Cryptocurrency</h3>
        <ul>
          <li>Bitcoin - SHA-256 hashing</li>
          <li>Ethereum - Elliptic curve cryptography</li>
          <li>Smart contracts</li>
        </ul>

        <h3>Secure Messaging</h3>
        <ul>
          <li>WhatsApp - End-to-end encryption</li>
          <li>Signal Protocol</li>
          <li>PGP Email encryption</li>
        </ul>

        <h3>Future of Cryptography</h3>
        <ul>
          <li>Quantum Cryptography</li>
          <li>Post-Quantum Algorithms</li>
          <li>Homomorphic Encryption</li>
        </ul>
      `,
      points: 14,
    },
  ],
  4: [
    {
      id: 1,
      title: 'Introduction to Secure Coding',
      duration: '20 menit',
      content: `
        <h2>Apa itu Secure Coding?</h2>
        <p>Secure Coding adalah praktik menulis code yang resistant terhadap vulnerabilities dan attacks.</p>
        
        <h3>Why Secure Coding Matters</h3>
        <ul>
          <li>Prevent data breaches</li>
          <li>Protect user privacy</li>
          <li>Maintain application availability</li>
          <li>Comply dengan regulations</li>
        </ul>
      `,
      points: 10,
    },
    {
      id: 2,
      title: 'Input Validation',
      duration: '25 menit',
      content: `
        <h2>Input Validation Best Practices</h2>
        
        <h3>Validation Techniques</h3>
        <ul>
          <li>Whitelist validation - Only allow known good</li>
          <li>Sanitize input - Remove dangerous characters</li>
          <li>Type checking</li>
          <li>Length limits</li>
        </ul>

        <h3>Never Trust User Input</h3>
        <ul>
          <li>Validate on server side</li>
          <li>Client-side validation is not enough</li>
          <li>Use parameterized queries</li>
        </ul>
      `,
      points: 12,
    },
    {
      id: 3,
      title: 'SQL Injection Prevention',
      duration: '30 menit',
      content: `
        <h2>Preventing SQL Injection</h2>
        
        <h3>SQL Injection Basics</h3>
        <ul>
          <li>Malicious SQL code injected into queries</li>
          <li>Can bypass authentication</li>
          <li>Access/modify/delete database data</li>
        </ul>

        <h3>Prevention Methods</h3>
        <ul>
          <li><strong>Prepared Statements:</strong> Best practice</li>
          <li><strong>Stored Procedures:</strong> Encapsulate SQL logic</li>
          <li><strong>ORM:</strong> Use Object-Relational Mapping</li>
          <li><strong>Input Validation:</strong> Sanitize all inputs</li>
        </ul>
      `,
      points: 15,
    },
    {
      id: 4,
      title: 'XSS (Cross-Site Scripting)',
      duration: '28 menit',
      content: `
        <h2>Understanding XSS Attacks</h2>
        
        <h3>Types of XSS</h3>
        <ul>
          <li><strong>Stored XSS:</strong> Malicious script saved in database</li>
          <li><strong>Reflected XSS:</strong> Script in URL parameters</li>
          <li><strong>DOM-based XSS:</strong> Client-side JavaScript manipulation</li>
        </ul>

        <h3>Prevention</h3>
        <ul>
          <li>Output encoding/escaping</li>
          <li>Content Security Policy (CSP)</li>
          <li>HTTPOnly cookies</li>
          <li>Input validation</li>
        </ul>
      `,
      points: 14,
    },
    {
      id: 5,
      title: 'CSRF (Cross-Site Request Forgery)',
      duration: '25 menit',
      content: `
        <h2>CSRF Attacks</h2>
        
        <h3>How CSRF Works</h3>
        <ul>
          <li>Attacker tricks user to perform unwanted actions</li>
          <li>Exploits user's authenticated session</li>
          <li>Changes account settings, transfers money, etc.</li>
        </ul>

        <h3>Prevention</h3>
        <ul>
          <li>CSRF tokens</li>
          <li>SameSite cookies</li>
          <li>Check Referer header</li>
          <li>Require re-authentication untuk sensitive actions</li>
        </ul>
      `,
      points: 12,
    },
    {
      id: 6,
      title: 'Authentication Best Practices',
      duration: '30 menit',
      content: `
        <h2>Secure Authentication</h2>
        
        <h3>Password Handling</h3>
        <ul>
          <li>Never store passwords in plaintext</li>
          <li>Use bcrypt, scrypt, or Argon2</li>
          <li>Implement password complexity requirements</li>
          <li>Add salt to password hashes</li>
        </ul>

        <h3>Multi-Factor Authentication</h3>
        <ul>
          <li>TOTP (Time-based One-Time Password)</li>
          <li>SMS codes (less secure)</li>
          <li>Biometric authentication</li>
        </ul>
      `,
      points: 15,
    },
    {
      id: 7,
      title: 'Session Management',
      duration: '25 menit',
      content: `
        <h2>Secure Session Handling</h2>
        
        <h3>Session Best Practices</h3>
        <ul>
          <li>Generate strong session IDs</li>
          <li>Regenerate session ID after login</li>
          <li>Set appropriate session timeouts</li>
          <li>Secure session storage</li>
        </ul>

        <h3>Cookie Security</h3>
        <ul>
          <li>HttpOnly flag - Prevent JavaScript access</li>
          <li>Secure flag - HTTPS only</li>
          <li>SameSite attribute - CSRF protection</li>
        </ul>
      `,
      points: 12,
    },
    {
      id: 8,
      title: 'Error Handling & Logging',
      duration: '22 menit',
      content: `
        <h2>Secure Error Handling</h2>
        
        <h3>Error Handling Guidelines</h3>
        <ul>
          <li>Don't expose sensitive information in errors</li>
          <li>Use generic error messages untuk users</li>
          <li>Log detailed errors server-side</li>
          <li>Implement proper exception handling</li>
        </ul>

        <h3>Secure Logging</h3>
        <ul>
          <li>Log security events</li>
          <li>Don't log sensitive data (passwords, tokens)</li>
          <li>Protect log files</li>
        </ul>
      `,
      points: 10,
    },
    {
      id: 9,
      title: 'API Security',
      duration: '28 menit',
      content: `
        <h2>Securing APIs</h2>
        
        <h3>API Authentication</h3>
        <ul>
          <li>OAuth 2.0 / OpenID Connect</li>
          <li>API Keys</li>
          <li>JWT (JSON Web Tokens)</li>
        </ul>

        <h3>API Best Practices</h3>
        <ul>
          <li>Rate limiting</li>
          <li>Input validation</li>
          <li>HTTPS only</li>
          <li>Proper error handling</li>
          <li>API versioning</li>
        </ul>
      `,
      points: 14,
    },
    {
      id: 10,
      title: 'File Upload Security',
      duration: '25 menit',
      content: `
        <h2>Secure File Uploads</h2>
        
        <h3>File Upload Risks</h3>
        <ul>
          <li>Malicious file uploads</li>
          <li>Path traversal attacks</li>
          <li>File type spoofing</li>
        </ul>

        <h3>Security Measures</h3>
        <ul>
          <li>Validate file types (whitelist)</li>
          <li>Scan for malware</li>
          <li>Limit file size</li>
          <li>Store files outside web root</li>
          <li>Rename uploaded files</li>
        </ul>
      `,
      points: 12,
    },
    {
      id: 11,
      title: 'Dependency Management',
      duration: '20 menit',
      content: `
        <h2>Managing Dependencies Securely</h2>
        
        <h3>Third-Party Library Risks</h3>
        <ul>
          <li>Vulnerable dependencies</li>
          <li>Supply chain attacks</li>
          <li>License compliance issues</li>
        </ul>

        <h3>Best Practices</h3>
        <ul>
          <li>Regular dependency updates</li>
          <li>Use dependency scanning tools</li>
          <li>Review security advisories</li>
          <li>Lock dependency versions</li>
        </ul>
      `,
      points: 10,
    },
    {
      id: 12,
      title: 'Code Review & Static Analysis',
      duration: '25 menit',
      content: `
        <h2>Code Security Review</h2>
        
        <h3>Code Review Focus Areas</h3>
        <ul>
          <li>Input validation</li>
          <li>Authentication/Authorization</li>
          <li>Sensitive data handling</li>
          <li>Error handling</li>
        </ul>

        <h3>Static Analysis Tools</h3>
        <ul>
          <li>SonarQube</li>
          <li>Checkmarx</li>
          <li>Veracode</li>
        </ul>
      `,
      points: 12,
    },
    {
      id: 13,
      title: 'Secrets Management',
      duration: '22 menit',
      content: `
        <h2>Managing Secrets Securely</h2>
        
        <h3>What Are Secrets?</h3>
        <ul>
          <li>API keys</li>
          <li>Database credentials</li>
          <li>Encryption keys</li>
          <li>Certificates</li>
        </ul>

        <h3>Best Practices</h3>
        <ul>
          <li>Never hardcode secrets in code</li>
          <li>Use environment variables</li>
          <li>Use secrets management tools (Vault, AWS Secrets Manager)</li>
          <li>Rotate secrets regularly</li>
        </ul>
      `,
      points: 11,
    },
    {
      id: 14,
      title: 'Security Testing',
      duration: '28 menit',
      content: `
        <h2>Testing for Security</h2>
        
        <h3>Types of Security Testing</h3>
        <ul>
          <li><strong>SAST:</strong> Static Application Security Testing</li>
          <li><strong>DAST:</strong> Dynamic Application Security Testing</li>
          <li><strong>IAST:</strong> Interactive Application Security Testing</li>
          <li><strong>Penetration Testing:</strong> Manual security testing</li>
        </ul>

        <h3>Testing Tools</h3>
        <ul>
          <li>OWASP ZAP</li>
          <li>Burp Suite</li>
          <li>Nmap</li>
        </ul>
      `,
      points: 14,
    },
    {
      id: 15,
      title: 'Secure SDLC',
      duration: '25 menit',
      content: `
        <h2>Security in Development Lifecycle</h2>
        
        <h3>SDL Phases</h3>
        <ul>
          <li><strong>Requirements:</strong> Identify security requirements</li>
          <li><strong>Design:</strong> Threat modeling</li>
          <li><strong>Implementation:</strong> Secure coding practices</li>
          <li><strong>Testing:</strong> Security testing</li>
          <li><strong>Deployment:</strong> Secure configuration</li>
          <li><strong>Maintenance:</strong> Patch management</li>
        </ul>

        <h3>DevSecOps</h3>
        <ul>
          <li>Shift security left</li>
          <li>Automate security testing</li>
          <li>Continuous monitoring</li>
        </ul>
      `,
      points: 12,
    },
  ],
  5: [
    {
      id: 1,
      title: 'Introduction to Ethical Hacking',
      duration: '25 menit',
      content: `
        <h2>Apa itu Ethical Hacking?</h2>
        <p>Ethical hacking adalah praktik legal untuk menemukan vulnerabilities dalam sistem dengan izin owner.</p>
        
        <h3>Types of Hackers</h3>
        <ul>
          <li><strong>White Hat:</strong> Ethical hackers</li>
          <li><strong>Black Hat:</strong> Malicious hackers</li>
          <li><strong>Grey Hat:</strong> In between</li>
        </ul>

        <h3>Ethical Hacking Phases</h3>
        <ul>
          <li>Reconnaissance</li>
          <li>Scanning</li>
          <li>Gaining Access</li>
          <li>Maintaining Access</li>
          <li>Covering Tracks</li>
        </ul>
      `,
      points: 15,
    },
    {
      id: 2,
      title: 'Reconnaissance Techniques',
      duration: '30 menit',
      content: `
        <h2>Information Gathering</h2>
        
        <h3>Passive Reconnaissance</h3>
        <ul>
          <li>Google Dorking</li>
          <li>WHOIS lookup</li>
          <li>DNS enumeration</li>
          <li>Social media profiling</li>
        </ul>

        <h3>Active Reconnaissance</h3>
        <ul>
          <li>Port scanning</li>
          <li>Network mapping</li>
          <li>Service identification</li>
        </ul>
      `,
      points: 15,
    },
    {
      id: 3,
      title: 'Scanning & Enumeration',
      duration: '35 menit',
      content: `
        <h2>Network Scanning</h2>
        
        <h3>Scanning Tools</h3>
        <ul>
          <li><strong>Nmap:</strong> Network mapper</li>
          <li><strong>Nessus:</strong> Vulnerability scanner</li>
          <li><strong>OpenVAS:</strong> Open source scanner</li>
        </ul>

        <h3>Enumeration Techniques</h3>
        <ul>
          <li>NetBIOS enumeration</li>
          <li>SNMP enumeration</li>
          <li>LDAP enumeration</li>
          <li>NFS enumeration</li>
        </ul>
      `,
      points: 18,
    },
    {
      id: 4,
      title: 'Vulnerability Assessment',
      duration: '28 menit',
      content: `
        <h2>Identifying Vulnerabilities</h2>
        
        <h3>Vulnerability Types</h3>
        <ul>
          <li>Configuration weaknesses</li>
          <li>Unpatched software</li>
          <li>Weak passwords</li>
          <li>Missing encryption</li>
        </ul>

        <h3>Assessment Tools</h3>
        <ul>
          <li>Nessus</li>
          <li>OpenVAS</li>
          <li>Qualys</li>
          <li>Rapid7 Nexpose</li>
        </ul>
      `,
      points: 14,
    },
    {
      id: 5,
      title: 'Exploitation Basics',
      duration: '32 menit',
      content: `
        <h2>Exploiting Vulnerabilities</h2>
        
        <h3>Exploitation Frameworks</h3>
        <ul>
          <li><strong>Metasploit:</strong> Most popular framework</li>
          <li><strong>Exploit-DB:</strong> Exploit database</li>
          <li><strong>BeEF:</strong> Browser exploitation</li>
        </ul>

        <h3>Exploitation Steps</h3>
        <ul>
          <li>Identify vulnerable service</li>
          <li>Select appropriate exploit</li>
          <li>Configure payload</li>
          <li>Execute exploit</li>
          <li>Verify access</li>
        </ul>
      `,
      points: 16,
    },
    {
      id: 6,
      title: 'Web Application Pentesting',
      duration: '35 menit',
      content: `
        <h2>Testing Web Applications</h2>
        
        <h3>Common Web Vulnerabilities</h3>
        <ul>
          <li>SQL Injection</li>
          <li>XSS (Cross-Site Scripting)</li>
          <li>CSRF (Cross-Site Request Forgery)</li>
          <li>Authentication bypass</li>
          <li>Insecure direct object references</li>
        </ul>

        <h3>Testing Tools</h3>
        <ul>
          <li>Burp Suite</li>
          <li>OWASP ZAP</li>
          <li>SQLMap</li>
          <li>Nikto</li>
        </ul>
      `,
      points: 18,
    },
    {
      id: 7,
      title: 'Network Penetration Testing',
      duration: '30 menit',
      content: `
        <h2>Network Pentesting</h2>
        
        <h3>Network Attack Vectors</h3>
        <ul>
          <li>Man-in-the-Middle attacks</li>
          <li>ARP spoofing</li>
          <li>DNS hijacking</li>
          <li>Session hijacking</li>
        </ul>

        <h3>Network Tools</h3>
        <ul>
          <li>Wireshark</li>
          <li>Ettercap</li>
          <li>Aircrack-ng</li>
          <li>Hydra</li>
        </ul>
      `,
      points: 15,
    },
    {
      id: 8,
      title: 'Wireless Network Hacking',
      duration: '32 menit',
      content: `
        <h2>WiFi Security Testing</h2>
        
        <h3>Wireless Attacks</h3>
        <ul>
          <li>WEP/WPA cracking</li>
          <li>Evil twin attack</li>
          <li>Deauthentication attack</li>
          <li>Rogue access points</li>
        </ul>

        <h3>Wireless Tools</h3>
        <ul>
          <li>Aircrack-ng suite</li>
          <li>Reaver (WPS cracking)</li>
          <li>Wifite</li>
          <li>Kismet</li>
        </ul>
      `,
      points: 16,
    },
    {
      id: 9,
      title: 'Password Cracking',
      duration: '28 menit',
      content: `
        <h2>Password Attack Techniques</h2>
        
        <h3>Attack Methods</h3>
        <ul>
          <li><strong>Brute Force:</strong> Try all combinations</li>
          <li><strong>Dictionary Attack:</strong> Use wordlists</li>
          <li><strong>Rainbow Tables:</strong> Precomputed hashes</li>
          <li><strong>Hybrid Attack:</strong> Combination methods</li>
        </ul>

        <h3>Cracking Tools</h3>
        <ul>
          <li>John the Ripper</li>
          <li>Hashcat</li>
          <li>Hydra</li>
          <li>Medusa</li>
        </ul>
      `,
      points: 14,
    },
    {
      id: 10,
      title: 'Social Engineering Attacks',
      duration: '25 menit',
      content: `
        <h2>Human-based Attacks</h2>
        
        <h3>Social Engineering Techniques</h3>
        <ul>
          <li>Phishing</li>
          <li>Pretexting</li>
          <li>Baiting</li>
          <li>Tailgating</li>
          <li>Vishing (Voice phishing)</li>
        </ul>

        <h3>SE Tools</h3>
        <ul>
          <li>SET (Social Engineering Toolkit)</li>
          <li>Gophish</li>
        </ul>
      `,
      points: 12,
    },
    {
      id: 11,
      title: 'Privilege Escalation',
      duration: '30 menit',
      content: `
        <h2>Escalating Privileges</h2>
        
        <h3>Types</h3>
        <ul>
          <li><strong>Vertical Escalation:</strong> Gain higher privileges</li>
          <li><strong>Horizontal Escalation:</strong> Access other user accounts</li>
        </ul>

        <h3>Escalation Techniques</h3>
        <ul>
          <li>Exploit kernel vulnerabilities</li>
          <li>Misconfigured services</li>
          <li>SUID binaries</li>
          <li>Sudo misconfigurations</li>
        </ul>
      `,
      points: 15,
    },
    {
      id: 12,
      title: 'Post-Exploitation',
      duration: '28 menit',
      content: `
        <h2>Maintaining Access</h2>
        
        <h3>Post-Exploitation Activities</h3>
        <ul>
          <li>Backdoor installation</li>
          <li>Data exfiltration</li>
          <li>Lateral movement</li>
          <li>Covering tracks</li>
        </ul>

        <h3>Persistence Techniques</h3>
        <ul>
          <li>Rootkits</li>
          <li>Scheduled tasks</li>
          <li>Registry modifications</li>
        </ul>
      `,
      points: 14,
    },
    {
      id: 13,
      title: 'Malware Analysis Basics',
      duration: '32 menit',
      content: `
        <h2>Analyzing Malware</h2>
        
        <h3>Analysis Types</h3>
        <ul>
          <li><strong>Static Analysis:</strong> Without execution</li>
          <li><strong>Dynamic Analysis:</strong> Execute in sandbox</li>
          <li><strong>Behavioral Analysis:</strong> Monitor behavior</li>
        </ul>

        <h3>Analysis Tools</h3>
        <ul>
          <li>IDA Pro</li>
          <li>OllyDbg</li>
          <li>Cuckoo Sandbox</li>
          <li>VirusTotal</li>
        </ul>
      `,
      points: 16,
    },
    {
      id: 14,
      title: 'Mobile App Pentesting',
      duration: '30 menit',
      content: `
        <h2>Testing Mobile Applications</h2>
        
        <h3>Mobile Vulnerabilities</h3>
        <ul>
          <li>Insecure data storage</li>
          <li>Weak encryption</li>
          <li>Insecure communication</li>
          <li>Code injection</li>
        </ul>

        <h3>Mobile Testing Tools</h3>
        <ul>
          <li>MobSF (Mobile Security Framework)</li>
          <li>Frida</li>
          <li>Burp Suite Mobile Assistant</li>
        </ul>
      `,
      points: 15,
    },
    {
      id: 15,
      title: 'API Pentesting',
      duration: '28 menit',
      content: `
        <h2>Testing APIs</h2>
        
        <h3>API Vulnerabilities</h3>
        <ul>
          <li>Broken authentication</li>
          <li>Excessive data exposure</li>
          <li>Lack of rate limiting</li>
          <li>Injection flaws</li>
        </ul>

        <h3>API Testing Tools</h3>
        <ul>
          <li>Postman</li>
          <li>Burp Suite</li>
          <li>OWASP ZAP</li>
        </ul>
      `,
      points: 14,
    },
    {
      id: 16,
      title: 'Cloud Pentesting',
      duration: '32 menit',
      content: `
        <h2>Testing Cloud Infrastructure</h2>
        
        <h3>Cloud Security Issues</h3>
        <ul>
          <li>Misconfigured S3 buckets</li>
          <li>Exposed databases</li>
          <li>IAM misconfigurations</li>
          <li>Container vulnerabilities</li>
        </ul>

        <h3>Cloud Testing Tools</h3>
        <ul>
          <li>ScoutSuite</li>
          <li>Pacu (AWS exploitation)</li>
          <li>CloudMapper</li>
        </ul>
      `,
      points: 16,
    },
    {
      id: 17,
      title: 'Red Team Operations',
      duration: '30 menit',
      content: `
        <h2>Advanced Adversary Simulation</h2>
        
        <h3>Red Team vs Pentest</h3>
        <ul>
          <li>Red Team: Simulates real adversary</li>
          <li>Pentest: Find vulnerabilities</li>
          <li>Red Team is stealthier</li>
        </ul>

        <h3>Red Team Tools</h3>
        <ul>
          <li>Cobalt Strike</li>
          <li>Empire</li>
          <li>BloodHound</li>
        </ul>
      `,
      points: 15,
    },
    {
      id: 18,
      title: 'Exploit Development Basics',
      duration: '35 menit',
      content: `
        <h2>Creating Exploits</h2>
        
        <h3>Exploitation Techniques</h3>
        <ul>
          <li>Buffer overflow</li>
          <li>Return-oriented programming (ROP)</li>
          <li>Heap spraying</li>
        </ul>

        <h3>Exploit Mitigations</h3>
        <ul>
          <li>DEP (Data Execution Prevention)</li>
          <li>ASLR (Address Space Layout Randomization)</li>
          <li>Stack canaries</li>
        </ul>
      `,
      points: 18,
    },
    {
      id: 19,
      title: 'Reporting & Documentation',
      duration: '25 menit',
      content: `
        <h2>Pentest Reporting</h2>
        
        <h3>Report Components</h3>
        <ul>
          <li>Executive summary</li>
          <li>Methodology</li>
          <li>Findings dengan severity ratings</li>
          <li>Remediation recommendations</li>
          <li>Technical details</li>
        </ul>

        <h3>Severity Ratings</h3>
        <ul>
          <li>Critical - Immediate action required</li>
          <li>High - Important vulnerabilities</li>
          <li>Medium - Should be fixed</li>
          <li>Low - Minor issues</li>
        </ul>
      `,
      points: 12,
    },
    {
      id: 20,
      title: 'Legal & Ethical Considerations',
      duration: '20 menit',
      content: `
        <h2>Pentesting Ethics & Laws</h2>
        
        <h3>Legal Requirements</h3>
        <ul>
          <li>Always get written permission</li>
          <li>Define scope clearly</li>
          <li>Follow rules of engagement</li>
          <li>Maintain confidentiality</li>
        </ul>

        <h3>Certifications</h3>
        <ul>
          <li>CEH (Certified Ethical Hacker)</li>
          <li>OSCP (Offensive Security Certified Professional)</li>
          <li>GPEN (GIAC Penetration Tester)</li>
        </ul>
      `,
      points: 10,
    },
  ],
  6: [
    {
      id: 1,
      title: 'Web Application Architecture',
      duration: '25 menit',
      content: `
        <h2>Understanding Web App Architecture</h2>
        
        <h3>Components</h3>
        <ul>
          <li>Frontend (Client-side)</li>
          <li>Backend (Server-side)</li>
          <li>Database</li>
          <li>APIs</li>
        </ul>

        <h3>Technologies</h3>
        <ul>
          <li>HTML, CSS, JavaScript</li>
          <li>Server-side languages (PHP, Python, Node.js)</li>
          <li>Databases (SQL, NoSQL)</li>
        </ul>
      `,
      points: 12,
    },
    {
      id: 2,
      title: 'OWASP Top 10',
      duration: '30 menit',
      content: `
        <h2>OWASP Top 10 Web Vulnerabilities</h2>
        
        <h3>Top Vulnerabilities</h3>
        <ul>
          <li>Injection</li>
          <li>Broken Authentication</li>
          <li>Sensitive Data Exposure</li>
          <li>XML External Entities (XXE)</li>
          <li>Broken Access Control</li>
          <li>Security Misconfiguration</li>
          <li>Cross-Site Scripting (XSS)</li>
          <li>Insecure Deserialization</li>
          <li>Using Components with Known Vulnerabilities</li>
          <li>Insufficient Logging & Monitoring</li>
        </ul>
      `,
      points: 15,
    },
    {
      id: 3,
      title: 'SQL Injection Deep Dive',
      duration: '35 menit',
      content: `
        <h2>Advanced SQL Injection</h2>
        
        <h3>SQL Injection Types</h3>
        <ul>
          <li>Classic SQLi</li>
          <li>Blind SQLi</li>
          <li>Time-based SQLi</li>
          <li>Union-based SQLi</li>
        </ul>

        <h3>Prevention</h3>
        <ul>
          <li>Parameterized queries</li>
          <li>Stored procedures</li>
          <li>Input validation</li>
          <li>Least privilege database access</li>
        </ul>
      `,
      points: 18,
    },
    {
      id: 4,
      title: 'Cross-Site Scripting (XSS)',
      duration: '30 menit',
      content: `
        <h2>XSS Attack & Defense</h2>
        
        <h3>XSS Types</h3>
        <ul>
          <li>Stored XSS</li>
          <li>Reflected XSS</li>
          <li>DOM-based XSS</li>
        </ul>

        <h3>Prevention</h3>
        <ul>
          <li>Output encoding</li>
          <li>Content Security Policy (CSP)</li>
          <li>HTTPOnly cookies</li>
          <li>Input validation</li>
        </ul>
      `,
      points: 15,
    },
    {
      id: 5,
      title: 'Authentication Vulnerabilities',
      duration: '28 menit',
      content: `
        <h2>Authentication Flaws</h2>
        
        <h3>Common Issues</h3>
        <ul>
          <li>Weak password policies</li>
          <li>Credential stuffing</li>
          <li>Session fixation</li>
          <li>Brute force attacks</li>
        </ul>

        <h3>Secure Authentication</h3>
        <ul>
          <li>Strong password requirements</li>
          <li>MFA implementation</li>
          <li>Account lockout policies</li>
          <li>CAPTCHA</li>
        </ul>
      `,
      points: 14,
    },
    {
      id: 6,
      title: 'Authorization & Access Control',
      duration: '25 menit',
      content: `
        <h2>Access Control Security</h2>
        
        <h3>Access Control Models</h3>
        <ul>
          <li>RBAC (Role-Based Access Control)</li>
          <li>ABAC (Attribute-Based Access Control)</li>
          <li>DAC (Discretionary Access Control)</li>
          <li>MAC (Mandatory Access Control)</li>
        </ul>

        <h3>Common Vulnerabilities</h3>
        <ul>
          <li>Insecure Direct Object References (IDOR)</li>
          <li>Missing function level access control</li>
          <li>Privilege escalation</li>
        </ul>
      `,
      points: 12,
    },
    {
      id: 7,
      title: 'CSRF Protection',
      duration: '22 menit',
      content: `
        <h2>Cross-Site Request Forgery</h2>
        
        <h3>How CSRF Works</h3>
        <ul>
          <li>Exploits user's authenticated session</li>
          <li>Tricks user into submitting requests</li>
          <li>Can change settings, make transactions</li>
        </ul>

        <h3>Defense Mechanisms</h3>
        <ul>
          <li>Anti-CSRF tokens</li>
          <li>SameSite cookies</li>
          <li>Double-submit cookies</li>
          <li>Custom headers</li>
        </ul>
      `,
      points: 11,
    },
    {
      id: 8,
      title: 'Security Headers',
      duration: '25 menit',
      content: `
        <h2>HTTP Security Headers</h2>
        
        <h3>Important Headers</h3>
        <ul>
          <li><strong>Content-Security-Policy:</strong> Prevent XSS</li>
          <li><strong>X-Frame-Options:</strong> Prevent clickjacking</li>
          <li><strong>Strict-Transport-Security:</strong> Force HTTPS</li>
          <li><strong>X-Content-Type-Options:</strong> Prevent MIME sniffing</li>
        </ul>
      `,
      points: 12,
    },
    {
      id: 9,
      title: 'API Security Best Practices',
      duration: '28 menit',
      content: `
        <h2>Securing REST APIs</h2>
        
        <h3>API Security Measures</h3>
        <ul>
          <li>Authentication (OAuth 2.0, JWT)</li>
          <li>Rate limiting</li>
          <li>Input validation</li>
          <li>HTTPS only</li>
          <li>API versioning</li>
        </ul>

        <h3>Common API Vulnerabilities</h3>
        <ul>
          <li>Broken object level authorization</li>
          <li>Excessive data exposure</li>
          <li>Mass assignment</li>
        </ul>
      `,
      points: 14,
    },
    {
      id: 10,
      title: 'File Upload Security',
      duration: '25 menit',
      content: `
        <h2>Secure File Uploads</h2>
        
        <h3>Upload Risks</h3>
        <ul>
          <li>Malware upload</li>
          <li>Path traversal</li>
          <li>File type spoofing</li>
          <li>DoS via large files</li>
        </ul>

        <h3>Security Controls</h3>
        <ul>
          <li>File type validation (whitelist)</li>
          <li>File size limits</li>
          <li>Virus scanning</li>
          <li>Store outside web root</li>
          <li>Rename files</li>
        </ul>
      `,
      points: 12,
    },
    {
      id: 11,
      title: 'Server-Side Request Forgery',
      duration: '22 menit',
      content: `
        <h2>SSRF Attacks</h2>
        
        <h3>What is SSRF?</h3>
        <ul>
          <li>Attacker makes server request internal resources</li>
          <li>Bypass firewall restrictions</li>
          <li>Access internal services</li>
        </ul>

        <h3>Prevention</h3>
        <ul>
          <li>Whitelist allowed URLs</li>
          <li>Disable unused protocols</li>
          <li>Network segmentation</li>
        </ul>
      `,
      points: 11,
    },
    {
      id: 12,
      title: 'XML External Entities (XXE)',
      duration: '25 menit',
      content: `
        <h2>XXE Vulnerabilities</h2>
        
        <h3>XXE Attack Impact</h3>
        <ul>
          <li>Read local files</li>
          <li>SSRF attacks</li>
          <li>Denial of Service</li>
        </ul>

        <h3>Prevention</h3>
        <ul>
          <li>Disable XML external entities</li>
          <li>Use JSON instead of XML</li>
          <li>Input validation</li>
        </ul>
      `,
      points: 12,
    },
    {
      id: 13,
      title: 'Web Application Firewall (WAF)',
      duration: '24 menit',
      content: `
        <h2>Implementing WAF</h2>
        
        <h3>WAF Functions</h3>
        <ul>
          <li>Filter malicious traffic</li>
          <li>Block common attacks</li>
          <li>Rate limiting</li>
          <li>Logging & monitoring</li>
        </ul>

        <h3>Popular WAFs</h3>
        <ul>
          <li>ModSecurity</li>
          <li>Cloudflare WAF</li>
          <li>AWS WAF</li>
        </ul>
      `,
      points: 12,
    },
    {
      id: 14,
      title: 'Secure Development Lifecycle',
      duration: '26 menit',
      content: `
        <h2>SDL for Web Applications</h2>
        
        <h3>Security in SDLC</h3>
        <ul>
          <li>Threat modeling in design phase</li>
          <li>Secure coding practices</li>
          <li>Security testing (SAST, DAST)</li>
          <li>Penetration testing</li>
          <li>Security monitoring</li>
        </ul>
      `,
      points: 13,
    },
  ],
  7: [
    {
      id: 1,
      title: 'Mobile Security Landscape',
      duration: '20 menit',
      content: `
        <h2>Mobile Security Overview</h2>
        
        <h3>Mobile Platforms</h3>
        <ul>
          <li>iOS - Apple's mobile OS</li>
          <li>Android - Google's mobile OS</li>
        </ul>

        <h3>Mobile Threats</h3>
        <ul>
          <li>Malicious apps</li>
          <li>Data leakage</li>
          <li>Network attacks</li>
          <li>Device loss/theft</li>
        </ul>
      `,
      points: 10,
    },
    {
      id: 2,
      title: 'Mobile App Architecture',
      duration: '25 menit',
      content: `
        <h2>Understanding Mobile Apps</h2>
        
        <h3>App Types</h3>
        <ul>
          <li>Native apps</li>
          <li>Hybrid apps</li>
          <li>Web apps</li>
        </ul>

        <h3>Components</h3>
        <ul>
          <li>UI layer</li>
          <li>Business logic</li>
          <li>Data storage</li>
          <li>APIs</li>
        </ul>
      `,
      points: 12,
    },
    {
      id: 3,
      title: 'iOS Security',
      duration: '30 menit',
      content: `
        <h2>iOS Security Features</h2>
        
        <h3>iOS Security Architecture</h3>
        <ul>
          <li>Secure Boot Chain</li>
          <li>Code signing</li>
          <li>Sandboxing</li>
          <li>Data protection</li>
        </ul>

        <h3>iOS-Specific Vulnerabilities</h3>
        <ul>
          <li>Jailbreak exploits</li>
          <li>IPA manipulation</li>
          <li>Keychain vulnerabilities</li>
        </ul>
      `,
      points: 15,
    },
    {
      id: 4,
      title: 'Android Security',
      duration: '30 menit',
      content: `
        <h2>Android Security Model</h2>
        
        <h3>Android Security Features</h3>
        <ul>
          <li>Permission model</li>
          <li>App sandboxing</li>
          <li>SELinux</li>
          <li>Verified Boot</li>
        </ul>

        <h3>Android Vulnerabilities</h3>
        <ul>
          <li>Rooting</li>
          <li>APK tampering</li>
          <li>Intent hijacking</li>
          <li>Insecure data storage</li>
        </ul>
      `,
      points: 15,
    },
    {
      id: 5,
      title: 'Mobile App Security Testing',
      duration: '35 menit',
      content: `
        <h2>Testing Mobile Apps</h2>
        
        <h3>Testing Methodologies</h3>
        <ul>
          <li>Static analysis</li>
          <li>Dynamic analysis</li>
          <li>Runtime analysis</li>
          <li>Network traffic analysis</li>
        </ul>

        <h3>Testing Tools</h3>
        <ul>
          <li>MobSF (Mobile Security Framework)</li>
          <li>Frida</li>
          <li>Burp Suite</li>
          <li>OWASP ZAP</li>
        </ul>
      `,
      points: 18,
    },
    {
      id: 6,
      title: 'Insecure Data Storage',
      duration: '28 menit',
      content: `
        <h2>Mobile Data Storage Security</h2>
        
        <h3>Storage Locations</h3>
        <ul>
          <li>Shared preferences</li>
          <li>SQLite databases</li>
          <li>Internal storage</li>
          <li>External storage (SD card)</li>
        </ul>

        <h3>Secure Storage Practices</h3>
        <ul>
          <li>Encrypt sensitive data</li>
          <li>Use Keychain (iOS) / Keystore (Android)</li>
          <li>Avoid storing sensitive data when possible</li>
          <li>Implement data expiration</li>
        </ul>
      `,
      points: 14,
    },
    {
      id: 7,
      title: 'Mobile Network Security',
      duration: '25 menit',
      content: `
        <h2>Securing Mobile Communications</h2>
        
        <h3>Network Threats</h3>
        <ul>
          <li>Man-in-the-Middle (MITM) attacks</li>
          <li>SSL stripping</li>
          <li>Rogue WiFi access points</li>
        </ul>

        <h3>Secure Communication</h3>
        <ul>
          <li>Certificate pinning</li>
          <li>TLS/SSL properly configured</li>
          <li>Avoid public WiFi for sensitive data</li>
          <li>VPN usage</li>
        </ul>
      `,
      points: 12,
    },
    {
      id: 8,
      title: 'Mobile Authentication',
      duration: '28 menit',
      content: `
        <h2>Mobile Authentication Best Practices</h2>
        
        <h3>Authentication Methods</h3>
        <ul>
          <li>Biometric (fingerprint, face)</li>
          <li>PIN/Password</li>
          <li>OAuth 2.0</li>
          <li>JWT tokens</li>
        </ul>

        <h3>Secure Implementation</h3>
        <ul>
          <li>Don't store passwords locally</li>
          <li>Implement MFA</li>
          <li>Secure token storage</li>
          <li>Session timeout</li>
        </ul>
      `,
      points: 14,
    },
    {
      id: 9,
      title: 'Mobile Code Security',
      duration: '30 menit',
      content: `
        <h2>Secure Mobile Coding</h2>
        
        <h3>Code Vulnerabilities</h3>
        <ul>
          <li>Hardcoded secrets</li>
          <li>Insecure algorithms</li>
          <li>Code injection</li>
          <li>Improper error handling</li>
        </ul>

        <h3>Secure Coding Practices</h3>
        <ul>
          <li>Code obfuscation</li>
          <li>Input validation</li>
          <li>Use secure APIs</li>
          <li>Regular security reviews</li>
        </ul>
      `,
      points: 15,
    },
    {
      id: 10,
      title: 'Mobile API Security',
      duration: '25 menit',
      content: `
        <h2>Securing Mobile APIs</h2>
        
        <h3>API Vulnerabilities</h3>
        <ul>
          <li>Broken authentication</li>
          <li>Excessive data exposure</li>
          <li>Lack of rate limiting</li>
          <li>Injection flaws</li>
        </ul>

        <h3>API Security Measures</h3>
        <ul>
          <li>OAuth 2.0 / JWT</li>
          <li>API key management</li>
          <li>Input validation</li>
          <li>HTTPS only</li>
        </ul>
      `,
      points: 12,
    },
    {
      id: 11,
      title: 'Mobile Malware',
      duration: '28 menit',
      content: `
        <h2>Mobile Malware Threats</h2>
        
        <h3>Types of Mobile Malware</h3>
        <ul>
          <li>Trojans</li>
          <li>Spyware</li>
          <li>Ransomware</li>
          <li>Adware</li>
        </ul>

        <h3>Prevention & Detection</h3>
        <ul>
          <li>App vetting process</li>
          <li>Runtime protection</li>
          <li>Anomaly detection</li>
          <li>Mobile antivirus</li>
        </ul>
      `,
      points: 14,
    },
    {
      id: 12,
      title: 'Mobile Device Management',
      duration: '25 menit',
      content: `
        <h2>MDM Solutions</h2>
        
        <h3>MDM Capabilities</h3>
        <ul>
          <li>Device enrollment</li>
          <li>Policy enforcement</li>
          <li>Remote wipe</li>
          <li>App distribution</li>
        </ul>

        <h3>BYOD Security</h3>
        <ul>
          <li>Containerization</li>
          <li>VPN enforcement</li>
          <li>Compliance checking</li>
        </ul>
      `,
      points: 12,
    },
    {
      id: 13,
      title: 'Mobile Payment Security',
      duration: '30 menit',
      content: `
        <h2>Securing Mobile Payments</h2>
        
        <h3>Payment Technologies</h3>
        <ul>
          <li>NFC payments</li>
          <li>Mobile wallets</li>
          <li>In-app purchases</li>
        </ul>

        <h3>Security Measures</h3>
        <ul>
          <li>Tokenization</li>
          <li>Biometric authentication</li>
          <li>PCI-DSS compliance</li>
          <li>Fraud detection</li>
        </ul>
      `,
      points: 15,
    },
    {
      id: 14,
      title: 'Mobile Privacy',
      duration: '22 menit',
      content: `
        <h2>Protecting User Privacy</h2>
        
        <h3>Privacy Concerns</h3>
        <ul>
          <li>Location tracking</li>
          <li>Contact access</li>
          <li>Camera/microphone permissions</li>
          <li>Data collection</li>
        </ul>

        <h3>Privacy Best Practices</h3>
        <ul>
          <li>Principle of least privilege</li>
          <li>Clear privacy policies</li>
          <li>User consent</li>
          <li>Data minimization</li>
        </ul>
      `,
      points: 11,
    },
    {
      id: 15,
      title: 'OWASP Mobile Top 10',
      duration: '28 menit',
      content: `
        <h2>OWASP Mobile Top 10 Risks</h2>
        
        <h3>Top Mobile Risks</h3>
        <ul>
          <li>M1: Improper Platform Usage</li>
          <li>M2: Insecure Data Storage</li>
          <li>M3: Insecure Communication</li>
          <li>M4: Insecure Authentication</li>
          <li>M5: Insufficient Cryptography</li>
          <li>M6: Insecure Authorization</li>
          <li>M7: Client Code Quality</li>
          <li>M8: Code Tampering</li>
          <li>M9: Reverse Engineering</li>
          <li>M10: Extraneous Functionality</li>
        </ul>
      `,
      points: 14,
    },
    {
      id: 16,
      title: 'Mobile Security Best Practices',
      duration: '25 menit',
      content: `
        <h2>Mobile Security Guidelines</h2>
        
        <h3>Development Best Practices</h3>
        <ul>
          <li>Security by design</li>
          <li>Regular security testing</li>
          <li>Code signing</li>
          <li>Security updates</li>
        </ul>

        <h3>User Best Practices</h3>
        <ul>
          <li>Keep OS updated</li>
          <li>Install from official stores</li>
          <li>Review app permissions</li>
          <li>Enable device encryption</li>
          <li>Use screen lock</li>
        </ul>
      `,
      points: 12,
    },
  ],
  8: [
    {
      id: 1,
      title: 'Cloud Computing Fundamentals',
      duration: '25 menit',
      content: `
        <h2>Introduction to Cloud Computing</h2>
        
        <h3>Cloud Service Models</h3>
        <ul>
          <li><strong>IaaS:</strong> Infrastructure as a Service</li>
          <li><strong>PaaS:</strong> Platform as a Service</li>
          <li><strong>SaaS:</strong> Software as a Service</li>
        </ul>

        <h3>Cloud Deployment Models</h3>
        <ul>
          <li>Public Cloud</li>
          <li>Private Cloud</li>
          <li>Hybrid Cloud</li>
          <li>Multi-Cloud</li>
        </ul>
      `,
      points: 12,
    },
    {
      id: 2,
      title: 'Cloud Security Challenges',
      duration: '28 menit',
      content: `
        <h2>Unique Cloud Security Risks</h2>
        
        <h3>Cloud-Specific Threats</h3>
        <ul>
          <li>Data breaches</li>
          <li>Misconfiguration</li>
          <li>Insecure APIs</li>
          <li>Account hijacking</li>
          <li>Insider threats</li>
        </ul>

        <h3>Shared Responsibility Model</h3>
        <ul>
          <li>Provider responsibilities</li>
          <li>Customer responsibilities</li>
        </ul>
      `,
      points: 14,
    },
    {
      id: 3,
      title: 'Identity & Access Management (IAM)',
      duration: '30 menit',
      content: `
        <h2>Cloud IAM</h2>
        
        <h3>IAM Components</h3>
        <ul>
          <li>Users and groups</li>
          <li>Roles and policies</li>
          <li>Service accounts</li>
          <li>MFA enforcement</li>
        </ul>

        <h3>IAM Best Practices</h3>
        <ul>
          <li>Least privilege principle</li>
          <li>Regular access reviews</li>
          <li>No root account usage</li>
          <li>Role-based access control</li>
        </ul>
      `,
      points: 15,
    },
    {
      id: 4,
      title: 'Cloud Data Protection',
      duration: '28 menit',
      content: `
        <h2>Securing Data in the Cloud</h2>
        
        <h3>Data Security Measures</h3>
        <ul>
          <li>Encryption at rest</li>
          <li>Encryption in transit</li>
          <li>Key management</li>
          <li>Data classification</li>
        </ul>

        <h3>Data Loss Prevention</h3>
        <ul>
          <li>Backup strategies</li>
          <li>Disaster recovery</li>
          <li>Data retention policies</li>
        </ul>
      `,
      points: 14,
    },
    {
      id: 5,
      title: 'Cloud Network Security',
      duration: '30 menit',
      content: `
        <h2>Securing Cloud Networks</h2>
        
        <h3>Network Security Controls</h3>
        <ul>
          <li>Virtual Private Cloud (VPC)</li>
          <li>Security groups</li>
          <li>Network ACLs</li>
          <li>Firewall rules</li>
        </ul>

        <h3>Network Segmentation</h3>
        <ul>
          <li>Public vs private subnets</li>
          <li>DMZ configuration</li>
          <li>Micro-segmentation</li>
        </ul>
      `,
      points: 15,
    },
    {
      id: 6,
      title: 'Container Security',
      duration: '32 menit',
      content: `
        <h2>Securing Containers</h2>
        
        <h3>Container Risks</h3>
        <ul>
          <li>Vulnerable images</li>
          <li>Container escape</li>
          <li>Misconfigured containers</li>
        </ul>

        <h3>Container Security Practices</h3>
        <ul>
          <li>Image scanning</li>
          <li>Runtime protection</li>
          <li>Least privilege containers</li>
          <li>Network policies</li>
        </ul>

        <h3>Kubernetes Security</h3>
        <ul>
          <li>RBAC configuration</li>
          <li>Pod security policies</li>
          <li>Secrets management</li>
        </ul>
      `,
      points: 16,
    },
    {
      id: 7,
      title: 'Serverless Security',
      duration: '28 menit',
      content: `
        <h2>Securing Serverless Applications</h2>
        
        <h3>Serverless Threats</h3>
        <ul>
          <li>Function injection</li>
          <li>Insecure dependencies</li>
          <li>Over-privileged functions</li>
        </ul>

        <h3>Security Practices</h3>
        <ul>
          <li>Minimal function permissions</li>
          <li>Input validation</li>
          <li>Dependency scanning</li>
          <li>API Gateway security</li>
        </ul>
      `,
      points: 14,
    },
    {
      id: 8,
      title: 'Cloud Storage Security',
      duration: '25 menit',
      content: `
        <h2>Securing Cloud Storage</h2>
        
        <h3>Storage Services</h3>
        <ul>
          <li>Object storage (S3, Blob)</li>
          <li>Block storage</li>
          <li>File storage</li>
        </ul>

        <h3>Security Measures</h3>
        <ul>
          <li>Access policies</li>
          <li>Encryption</li>
          <li>Versioning</li>
          <li>MFA delete</li>
          <li>Bucket policies</li>
        </ul>
      `,
      points: 12,
    },
    {
      id: 9,
      title: 'Cloud Compliance & Governance',
      duration: '28 menit',
      content: `
        <h2>Cloud Compliance</h2>
        
        <h3>Compliance Standards</h3>
        <ul>
          <li>GDPR</li>
          <li>HIPAA</li>
          <li>PCI-DSS</li>
          <li>SOC 2</li>
          <li>ISO 27001</li>
        </ul>

        <h3>Governance Tools</h3>
        <ul>
          <li>Cloud audit logs</li>
          <li>Compliance automation</li>
          <li>Policy enforcement</li>
        </ul>
      `,
      points: 14,
    },
    {
      id: 10,
      title: 'Cloud Monitoring & Logging',
      duration: '26 menit',
      content: `
        <h2>Cloud Security Monitoring</h2>
        
        <h3>Monitoring Tools</h3>
        <ul>
          <li>CloudWatch (AWS)</li>
          <li>Azure Monitor</li>
          <li>Cloud Logging (GCP)</li>
        </ul>

        <h3>What to Monitor</h3>
        <ul>
          <li>API calls</li>
          <li>Resource changes</li>
          <li>Authentication attempts</li>
          <li>Security group changes</li>
        </ul>
      `,
      points: 13,
    },
    {
      id: 11,
      title: 'Cloud Incident Response',
      duration: '30 menit',
      content: `
        <h2>Cloud Incident Response</h2>
        
        <h3>Incident Response Plan</h3>
        <ul>
          <li>Detection & analysis</li>
          <li>Containment</li>
          <li>Eradication</li>
          <li>Recovery</li>
          <li>Post-incident review</li>
        </ul>

        <h3>Cloud-Specific Considerations</h3>
        <ul>
          <li>Snapshot compromised instances</li>
          <li>Isolate affected resources</li>
          <li>Review cloud logs</li>
        </ul>
      `,
      points: 15,
    },
    {
      id: 12,
      title: 'Multi-Cloud Security',
      duration: '28 menit',
      content: `
        <h2>Securing Multi-Cloud Environments</h2>
        
        <h3>Multi-Cloud Challenges</h3>
        <ul>
          <li>Inconsistent security controls</li>
          <li>Complex management</li>
          <li>Data transfer security</li>
        </ul>

        <h3>Best Practices</h3>
        <ul>
          <li>Unified security policies</li>
          <li>Centralized monitoring</li>
          <li>Cloud Security Posture Management (CSPM)</li>
        </ul>
      `,
      points: 14,
    },
    {
      id: 13,
      title: 'Cloud Security Best Practices',
      duration: '25 menit',
      content: `
        <h2>Comprehensive Cloud Security</h2>
        
        <h3>Security Framework</h3>
        <ul>
          <li>Defense in depth</li>
          <li>Zero trust model</li>
          <li>Regular security assessments</li>
          <li>Security automation</li>
        </ul>

        <h3>Operational Best Practices</h3>
        <ul>
          <li>Regular patching</li>
          <li>Configuration management</li>
          <li>Backup and disaster recovery</li>
          <li>Security training</li>
        </ul>
      `,
      points: 12,
    },
  ],
  9: [
    {
      id: 1,
      title: 'Database Security Fundamentals',
      duration: '25 menit',
      content: `
        <h2>Pentingnya Database Security</h2>
        
        <h3>Ancaman Terhadap Database</h3>
        <ul>
          <li>SQL Injection</li>
          <li>Privilege Escalation</li>
          <li>Data Breach</li>
          <li>Insider Threats</li>
        </ul>

        <h3>Database Security Layers</h3>
        <ul>
          <li>Network Security</li>
          <li>Access Control</li>
          <li>Application Security</li>
          <li>Database Security</li>
          <li>Physical Security</li>
        </ul>
      `,
      points: 12,
    },
    {
      id: 2,
      title: 'SQL Injection Deep Dive',
      duration: '35 menit',
      content: `
        <h2>SQL Injection - Ancaman #1</h2>
        
        <h3>Jenis SQL Injection</h3>
        <ul>
          <li>In-band SQLi (Error-based, Union-based)</li>
          <li>Blind SQLi (Boolean-based, Time-based)</li>
          <li>Out-of-band SQLi</li>
        </ul>

        <h3>Prevention</h3>
        <ul>
          <li>Prepared Statements</li>
          <li>Stored Procedures</li>
          <li>Input validation</li>
          <li>Least privilege</li>
        </ul>
      `,
      points: 18,
    },
    {
      id: 3,
      title: 'Database Access Control',
      duration: '28 menit',
      content: `
        <h2>Mengontrol Akses Database</h2>
        
        <h3>Authentication Methods</h3>
        <ul>
          <li>Password authentication</li>
          <li>Certificate-based</li>
          <li>Kerberos</li>
          <li>LDAP integration</li>
        </ul>

        <h3>Authorization & Privileges</h3>
        <ul>
          <li>GRANT/REVOKE commands</li>
          <li>Role-based access</li>
          <li>Row-level security</li>
          <li>Column-level security</li>
        </ul>
      `,
      points: 14,
    },
    {
      id: 4,
      title: 'Database Encryption',
      duration: '30 menit',
      content: `
        <h2>Enkripsi Data</h2>
        
        <h3>Encryption Types</h3>
        <ul>
          <li><strong>Transparent Data Encryption (TDE):</strong> Encrypt at rest</li>
          <li><strong>Column-level encryption:</strong> Selective encryption</li>
          <li><strong>Application-level encryption:</strong> Before storage</li>
        </ul>

        <h3>Key Management</h3>
        <ul>
          <li>Key rotation</li>
          <li>Secure key storage</li>
          <li>HSM usage</li>
        </ul>
      `,
      points: 15,
    },
    {
      id: 5,
      title: 'Database Auditing',
      duration: '25 menit',
      content: `
        <h2>Audit dan Monitoring</h2>
        
        <h3>What to Audit</h3>
        <ul>
          <li>Login attempts</li>
          <li>Privileged operations</li>
          <li>Schema changes</li>
          <li>Data access</li>
          <li>Failed queries</li>
        </ul>

        <h3>Audit Tools</h3>
        <ul>
          <li>Database native auditing</li>
          <li>Third-party tools</li>
          <li>SIEM integration</li>
        </ul>
      `,
      points: 12,
    },
    {
      id: 6,
      title: 'Database Backup & Recovery',
      duration: '28 menit',
      content: `
        <h2>Backup Security</h2>
        
        <h3>Backup Best Practices</h3>
        <ul>
          <li>Regular backup schedule</li>
          <li>Encrypt backups</li>
          <li>Off-site storage</li>
          <li>Test restore procedures</li>
        </ul>

        <h3>Recovery Strategies</h3>
        <ul>
          <li>Point-in-time recovery</li>
          <li>Disaster recovery plan</li>
          <li>RPO/RTO objectives</li>
        </ul>
      `,
      points: 14,
    },
    {
      id: 7,
      title: 'NoSQL Database Security',
      duration: '26 menit',
      content: `
        <h2>Securing NoSQL Databases</h2>
        
        <h3>NoSQL Security Challenges</h3>
        <ul>
          <li>NoSQL injection</li>
          <li>Lack of encryption</li>
          <li>Weak authentication</li>
        </ul>

        <h3>NoSQL Security Measures</h3>
        <ul>
          <li>Input validation</li>
          <li>Authentication & authorization</li>
          <li>Network isolation</li>
          <li>Encryption at rest and in transit</li>
        </ul>
      `,
      points: 13,
    },
    {
      id: 8,
      title: 'Database Firewall',
      duration: '22 menit',
      content: `
        <h2>Database Firewalls</h2>
        
        <h3>How DB Firewalls Work</h3>
        <ul>
          <li>Monitor database traffic</li>
          <li>Block malicious queries</li>
          <li>Whitelist/blacklist queries</li>
        </ul>

        <h3>Benefits</h3>
        <ul>
          <li>Prevent SQL injection</li>
          <li>Protect against data exfiltration</li>
          <li>Compliance reporting</li>
        </ul>
      `,
      points: 11,
    },
    {
      id: 9,
      title: 'Database Vulnerability Assessment',
      duration: '25 menit',
      content: `
        <h2>Assessing Database Security</h2>
        
        <h3>Assessment Areas</h3>
        <ul>
          <li>Configuration weaknesses</li>
          <li>Patch levels</li>
          <li>Access controls</li>
          <li>Encryption status</li>
        </ul>

        <h3>Assessment Tools</h3>
        <ul>
          <li>Nessus</li>
          <li>OpenVAS</li>
          <li>Database-specific scanners</li>
        </ul>
      `,
      points: 12,
    },
    {
      id: 10,
      title: 'Database Hardening',
      duration: '28 menit',
      content: `
        <h2>Hardening Database Servers</h2>
        
        <h3>Hardening Steps</h3>
        <ul>
          <li>Remove default accounts</li>
          <li>Change default ports</li>
          <li>Disable unnecessary features</li>
          <li>Apply security patches</li>
          <li>Configure strong passwords</li>
        </ul>

        <h3>Security Configuration</h3>
        <ul>
          <li>Least privilege principle</li>
          <li>Network segmentation</li>
          <li>Enable SSL/TLS</li>
        </ul>
      `,
      points: 14,
    },
    {
      id: 11,
      title: 'Database Security Best Practices',
      duration: '24 menit',
      content: `
        <h2>Comprehensive Database Security</h2>
        
        <h3>Development Practices</h3>
        <ul>
          <li>Use parameterized queries</li>
          <li>Input validation</li>
          <li>Secure coding standards</li>
        </ul>

        <h3>Operational Practices</h3>
        <ul>
          <li>Regular patching</li>
          <li>Access reviews</li>
          <li>Security monitoring</li>
          <li>Incident response plan</li>
        </ul>
      `,
      points: 12,
    },
  ],
  10: [
    {
      id: 1,
      title: 'Introduction to Digital Forensics',
      duration: '25 menit',
      content: `
        <h2>Apa itu Digital Forensics?</h2>
        <p>Digital forensics adalah proses mengidentifikasi, mengawetkan, menganalisis, dan mempresentasikan bukti digital untuk investigasi.</p>
        
        <h3>Digital Forensics Phases</h3>
        <ul>
          <li>Identification</li>
          <li>Preservation</li>
          <li>Collection</li>
          <li>Examination</li>
          <li>Analysis</li>
          <li>Presentation</li>
        </ul>
      `,
      points: 12,
    },
    {
      id: 2,
      title: 'Types of Digital Forensics',
      duration: '28 menit',
      content: `
        <h2>Jenis-jenis Digital Forensics</h2>
        
        <h3>Forensic Disciplines</h3>
        <ul>
          <li><strong>Computer Forensics:</strong> PC, laptops, servers</li>
          <li><strong>Mobile Forensics:</strong> Smartphones, tablets</li>
          <li><strong>Network Forensics:</strong> Network traffic analysis</li>
          <li><strong>Cloud Forensics:</strong> Cloud environments</li>
          <li><strong>Memory Forensics:</strong> RAM analysis</li>
        </ul>
      `,
      points: 14,
    },
    {
      id: 3,
      title: 'Evidence Collection',
      duration: '30 menit',
      content: `
        <h2>Mengumpulkan Bukti Digital</h2>
        
        <h3>Chain of Custody</h3>
        <ul>
          <li>Documentation</li>
          <li>Proper handling</li>
          <li>Secure storage</li>
          <li>Transfer logs</li>
        </ul>

        <h3>Evidence Types</h3>
        <ul>
          <li>Volatile data (RAM, cache)</li>
          <li>Non-volatile data (hard drives)</li>
          <li>Network logs</li>
          <li>Application logs</li>
        </ul>
      `,
      points: 15,
    },
    {
      id: 4,
      title: 'Disk Forensics',
      duration: '32 menit',
      content: `
        <h2>Hard Drive Analysis</h2>
        
        <h3>Disk Imaging</h3>
        <ul>
          <li>Bit-by-bit copy</li>
          <li>Write-blocker usage</li>
          <li>Hash verification (MD5, SHA)</li>
        </ul>

        <h3>File Recovery</h3>
        <ul>
          <li>Deleted file recovery</li>
          <li>File carving</li>
          <li>Partition analysis</li>
        </ul>

        <h3>Tools</h3>
        <ul>
          <li>FTK Imager</li>
          <li>EnCase</li>
          <li>Autopsy</li>
        </ul>
      `,
      points: 16,
    },
    {
      id: 5,
      title: 'Memory Forensics',
      duration: '30 menit',
      content: `
        <h2>RAM Analysis</h2>
        
        <h3>What's in Memory?</h3>
        <ul>
          <li>Running processes</li>
          <li>Network connections</li>
          <li>Encryption keys</li>
          <li>Passwords</li>
          <li>Malware artifacts</li>
        </ul>

        <h3>Memory Acquisition</h3>
        <ul>
          <li>Live acquisition</li>
          <li>Memory dumps</li>
          <li>Hibernation files</li>
        </ul>

        <h3>Analysis Tools</h3>
        <ul>
          <li>Volatility</li>
          <li>Rekall</li>
        </ul>
      `,
      points: 15,
    },
    {
      id: 6,
      title: 'Mobile Forensics',
      duration: '32 menit',
      content: `
        <h2>Mobile Device Investigation</h2>
        
        <h3>Mobile Evidence</h3>
        <ul>
          <li>Call logs</li>
          <li>SMS/MMS</li>
          <li>App data</li>
          <li>Location history</li>
          <li>Photos/videos</li>
        </ul>

        <h3>Acquisition Methods</h3>
        <ul>
          <li>Logical acquisition</li>
          <li>Physical acquisition</li>
          <li>File system extraction</li>
        </ul>

        <h3>Tools</h3>
        <ul>
          <li>Cellebrite</li>
          <li>Oxygen Forensics</li>
          <li>XRY</li>
        </ul>
      `,
      points: 16,
    },
    {
      id: 7,
      title: 'Network Forensics',
      duration: '28 menit',
      content: `
        <h2>Network Traffic Analysis</h2>
        
        <h3>Network Evidence</h3>
        <ul>
          <li>Packet captures</li>
          <li>Firewall logs</li>
          <li>IDS/IPS alerts</li>
          <li>DNS logs</li>
        </ul>

        <h3>Analysis Tools</h3>
        <ul>
          <li>Wireshark</li>
          <li>tcpdump</li>
          <li>NetworkMiner</li>
        </ul>
      `,
      points: 14,
    },
    {
      id: 8,
      title: 'Log Analysis',
      duration: '26 menit',
      content: `
        <h2>Analyzing System Logs</h2>
        
        <h3>Log Types</h3>
        <ul>
          <li>Windows Event Logs</li>
          <li>Linux/Unix logs</li>
          <li>Application logs</li>
          <li>Web server logs</li>
        </ul>

        <h3>What to Look For</h3>
        <ul>
          <li>Failed login attempts</li>
          <li>Privilege escalation</li>
          <li>File modifications</li>
          <li>Network connections</li>
        </ul>
      `,
      points: 13,
    },
    {
      id: 9,
      title: 'Malware Forensics',
      duration: '30 menit',
      content: `
        <h2>Investigating Malware</h2>
        
        <h3>Malware Analysis Approaches</h3>
        <ul>
          <li>Static analysis</li>
          <li>Dynamic analysis</li>
          <li>Behavioral analysis</li>
        </ul>

        <h3>Analysis Tools</h3>
        <ul>
          <li>Cuckoo Sandbox</li>
          <li>IDA Pro</li>
          <li>PEiD</li>
          <li>VirusTotal</li>
        </ul>

        <h3>Indicators of Compromise (IoC)</h3>
        <ul>
          <li>File hashes</li>
          <li>IP addresses</li>
          <li>Domain names</li>
          <li>Registry keys</li>
        </ul>
      `,
      points: 15,
    },
    {
      id: 10,
      title: 'Email Forensics',
      duration: '24 menit',
      content: `
        <h2>Email Investigation</h2>
        
        <h3>Email Evidence</h3>
        <ul>
          <li>Email headers</li>
          <li>Attachments</li>
          <li>Sender information</li>
          <li>Routing information</li>
        </ul>

        <h3>Analysis</h3>
        <ul>
          <li>Header analysis</li>
          <li>Spoofing detection</li>
          <li>Phishing identification</li>
        </ul>
      `,
      points: 12,
    },
    {
      id: 11,
      title: 'Cloud Forensics',
      duration: '28 menit',
      content: `
        <h2>Investigating Cloud Environments</h2>
        
        <h3>Cloud Forensic Challenges</h3>
        <ul>
          <li>Multi-tenancy</li>
          <li>Distributed data</li>
          <li>Limited access</li>
          <li>Data volatility</li>
        </ul>

        <h3>Cloud Evidence Sources</h3>
        <ul>
          <li>API logs</li>
          <li>Access logs</li>
          <li>Configuration changes</li>
          <li>Storage snapshots</li>
        </ul>
      `,
      points: 14,
    },
    {
      id: 12,
      title: 'Incident Response Process',
      duration: '30 menit',
      content: `
        <h2>Responding to Security Incidents</h2>
        
        <h3>IR Phases</h3>
        <ul>
          <li><strong>Preparation:</strong> IR plan, tools, training</li>
          <li><strong>Detection & Analysis:</strong> Identify incidents</li>
          <li><strong>Containment:</strong> Stop the spread</li>
          <li><strong>Eradication:</strong> Remove threat</li>
          <li><strong>Recovery:</strong> Restore systems</li>
          <li><strong>Post-Incident:</strong> Lessons learned</li>
        </ul>
      `,
      points: 15,
    },
    {
      id: 13,
      title: 'SIEM & Security Monitoring',
      duration: '28 menit',
      content: `
        <h2>Security Information & Event Management</h2>
        
        <h3>SIEM Capabilities</h3>
        <ul>
          <li>Log aggregation</li>
          <li>Correlation rules</li>
          <li>Alerting</li>
          <li>Dashboards</li>
          <li>Forensic analysis</li>
        </ul>

        <h3>Popular SIEM Tools</h3>
        <ul>
          <li>Splunk</li>
          <li>IBM QRadar</li>
          <li>ArcSight</li>
          <li>ELK Stack</li>
        </ul>
      `,
      points: 14,
    },
    {
      id: 14,
      title: 'Threat Intelligence',
      duration: '26 menit',
      content: `
        <h2>Cyber Threat Intelligence</h2>
        
        <h3>Threat Intel Types</h3>
        <ul>
          <li>Strategic - High-level trends</li>
          <li>Tactical - TTPs (Tactics, Techniques, Procedures)</li>
          <li>Operational - Specific attacks</li>
          <li>Technical - IoCs</li>
        </ul>

        <h3>Threat Intel Sources</h3>
        <ul>
          <li>Open source (OSINT)</li>
          <li>Commercial feeds</li>
          <li>ISACs</li>
          <li>Government agencies</li>
        </ul>
      `,
      points: 13,
    },
    {
      id: 15,
      title: 'Incident Documentation',
      duration: '24 menit',
      content: `
        <h2>Documenting Incidents</h2>
        
        <h3>Documentation Requirements</h3>
        <ul>
          <li>Timeline of events</li>
          <li>Actions taken</li>
          <li>Evidence collected</li>
          <li>Analysis results</li>
          <li>Impact assessment</li>
        </ul>

        <h3>Reporting</h3>
        <ul>
          <li>Executive summary</li>
          <li>Technical details</li>
          <li>Recommendations</li>
        </ul>
      `,
      points: 12,
    },
    {
      id: 16,
      title: 'Legal & Compliance',
      duration: '28 menit',
      content: `
        <h2>Legal Aspects of Forensics</h2>
        
        <h3>Legal Considerations</h3>
        <ul>
          <li>Admissibility of evidence</li>
          <li>Chain of custody</li>
          <li>Privacy laws</li>
          <li>Search warrants</li>
        </ul>

        <h3>Compliance Requirements</h3>
        <ul>
          <li>Data breach notification</li>
          <li>Reporting timelines</li>
          <li>Regulatory requirements</li>
        </ul>
      `,
      points: 14,
    },
    {
      id: 17,
      title: 'Advanced Persistent Threats',
      duration: '30 menit',
      content: `
        <h2>Investigating APTs</h2>
        
        <h3>APT Characteristics</h3>
        <ul>
          <li>Long-term presence</li>
          <li>Sophisticated techniques</li>
          <li>Targeted attacks</li>
          <li>Stealthy operations</li>
        </ul>

        <h3>APT Detection</h3>
        <ul>
          <li>Behavioral analysis</li>
          <li>Anomaly detection</li>
          <li>Threat hunting</li>
          <li>IoC matching</li>
        </ul>
      `,
      points: 15,
    },
    {
      id: 18,
      title: 'Forensics Best Practices',
      duration: '25 menit',
      content: `
        <h2>Digital Forensics Guidelines</h2>
        
        <h3>Best Practices</h3>
        <ul>
          <li>Maintain chain of custody</li>
          <li>Document everything</li>
          <li>Use forensically sound tools</li>
          <li>Work on copies, not originals</li>
          <li>Stay current with techniques</li>
        </ul>

        <h3>Certifications</h3>
        <ul>
          <li>GCFE (GIAC Certified Forensic Examiner)</li>
          <li>CHFI (Computer Hacking Forensic Investigator)</li>
          <li>EnCE (EnCase Certified Examiner)</li>
        </ul>
      `,
      points: 12,
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

  const handleComplete = async () => {
    if (!completedLessons.includes(currentLesson.id)) {
      setCompletedLessons([...completedLessons, currentLesson.id]);
    }

    if (isLastLesson) {
      // Save module completion to database
      try {
        const userStr = localStorage.getItem('user');
        if (userStr) {
          const user = JSON.parse(userStr);
          console.log('[LessonContentPage] Completing module:', moduleId);

          const response = await fetch(
            `https://${projectId}.supabase.co/functions/v1/make-server-094aa1ac/module/complete`,
            {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${publicAnonKey}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: user.email,
                moduleId: moduleId,
                lessonsCompleted: lessons.length,
                totalLessons: lessons.length,
              }),
            }
          );

          if (!response.ok) {
            console.warn('[LessonContentPage] Failed to save to server, using localStorage fallback');
            // Fallback to localStorage
            const localCompletions = localStorage.getItem('completedModules');
            const completedIds = localCompletions ? JSON.parse(localCompletions) : [];
            if (!completedIds.includes(moduleId)) {
              completedIds.push(moduleId);
              localStorage.setItem('completedModules', JSON.stringify(completedIds));
            }
          } else {
            const data = await response.json();
            console.log('[LessonContentPage] Module completion saved:', data);
            
            // Also update localStorage
            const localCompletions = localStorage.getItem('completedModules');
            const completedIds = localCompletions ? JSON.parse(localCompletions) : [];
            if (!completedIds.includes(moduleId)) {
              completedIds.push(moduleId);
              localStorage.setItem('completedModules', JSON.stringify(completedIds));
            }
          }
        }
      } catch (error) {
        console.error('[LessonContentPage] Error saving module completion:', error);
        // Fallback to localStorage on error
        const localCompletions = localStorage.getItem('completedModules');
        const completedIds = localCompletions ? JSON.parse(localCompletions) : [];
        if (!completedIds.includes(moduleId)) {
          completedIds.push(moduleId);
          localStorage.setItem('completedModules', JSON.stringify(completedIds));
        }
      }

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
