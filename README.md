# Astera - Лендинг электронных входных дверей

Премиальный лендинг для компании Astera, специализирующейся на производстве и установке электронных входных дверей с биометрическими замками.

## 🚀 Особенности

- **Премиальный дизайн** с золотыми глянцевыми акцентами
- **Полная адаптивность** для всех устройств
- **Современный слайдер** для демонстрации работ
- **Интерактивные формы** с валидацией
- **Оптимизированная производительность**
- **Доступность (WCAG 2.1 AA)**

## 📁 Структура проекта

```
astera-v3/
├── index.html              # Главная страница
├── css/
│   ├── style.css          # Основные стили
│   └── slider.css         # Стили слайдера
├── js/
│   ├── main.js            # Основная логика
│   └── slider.js          # Функциональность слайдера
├── img/
│   ├── renders/           # Рендеры дверей
│   ├── icons/             # Иконки
│   └── works/             # Изображения работ
├── README.md              # Документация
└── .gitignore            # Исключения Git
```

## 🛠 Установка и развертывание

### Локальная разработка

1. Скачайте архив проекта
2. Распакуйте в нужную директорию
3. Откройте `index.html` в браузере

### Развертывание на хостинге

1. Загрузите все файлы на ваш веб-сервер
2. Убедитесь, что `index.html` находится в корневой директории
3. Настройте веб-сервер для обслуживания статических файлов

### Рекомендуемые настройки веб-сервера

#### Apache (.htaccess)
```apache
# Кэширование статических ресурсов
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
    ExpiresByType image/png "access plus 1 month"
    ExpiresByType image/jpg "access plus 1 month"
    ExpiresByType image/jpeg "access plus 1 month"
    ExpiresByType image/gif "access plus 1 month"
    ExpiresByType image/svg+xml "access plus 1 month"
</IfModule>

# Сжатие
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>
```

#### Nginx
```nginx
location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1M;
    add_header Cache-Control "public, immutable";
}

gzip on;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
```

## 🎨 Кастомизация

### Цветовая палитра

Основные цвета определены в CSS переменных:

```css
:root {
    --primary-gold: #d4af37;
    --secondary-gold: #ffd700;
    --dark-gold: #b8860b;
    --background-dark: #0a0a0a;
    --surface-dark: #1a1a1a;
    --text-light: #ffffff;
    --text-muted: #b0b0b0;
}
```

### Изменение контента

1. **Текст**: Редактируйте содержимое в `index.html`
2. **Изображения**: Замените файлы в папке `img/`
3. **Стили**: Модифицируйте `css/style.css`

### Настройка слайдера

В файле `js/slider.js` можно изменить:

```javascript
// Интервал автопрокрутки (мс)
this.autoPlayInterval = 5000;

// Включить/выключить автопрокрутку
this.isAutoPlay = true;
```

## 📱 Адаптивность

Лендинг адаптирован для следующих разрешений:

- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: до 767px

### Контрольные точки (Breakpoints)

```css
/* Tablet */
@media (max-width: 1199px) { ... }

/* Mobile */
@media (max-width: 768px) { ... }

/* Small Mobile */
@media (max-width: 480px) { ... }
```

## 🔧 Функциональность

### Формы

- Валидация имени (минимум 2 символа)
- Валидация телефона (российский формат)
- Автоформатирование номера телефона
- Защита от спама

### Слайдер

- Автопрокрутка с паузой при наведении
- Навигация кнопками и точками
- Поддержка свайпов на мобильных
- Клавиатурная навигация
- Индикатор прогресса

### Модальные окна

- Закрытие по клику вне области
- Закрытие по клавише Escape
- Фокус на первом поле ввода
- Блокировка прокрутки фона

## 🚀 Оптимизация производительности

### Реализованные оптимизации

- Минификация CSS и JavaScript
- Оптимизация изображений
- Lazy loading для изображений
- Кэширование статических ресурсов
- Сжатие файлов

### Рекомендации

1. Используйте CDN для статических ресурсов
2. Включите HTTP/2 на сервере
3. Настройте правильные заголовки кэширования
4. Мониторьте Core Web Vitals

## 🔍 SEO

### Мета-теги

Обновите мета-теги в `<head>` секции:

```html
<title>Ваш заголовок</title>
<meta name="description" content="Ваше описание">
<meta name="keywords" content="ваши, ключевые, слова">
```

### Структурированные данные

Добавьте JSON-LD разметку для лучшей индексации:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Astera",
  "description": "Электронные входные двери"
}
</script>
```

## 📊 Аналитика

### Google Analytics

Добавьте код отслеживания перед закрывающим тегом `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Яндекс.Метрика

```html
<!-- Yandex.Metrika counter -->
<script type="text/javascript">
   (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

   ym(COUNTER_ID, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true
   });
</script>
```

## 🛡 Безопасность

### Рекомендации

1. Используйте HTTPS
2. Настройте CSP заголовки
3. Валидируйте данные на сервере
4. Защитите от XSS атак

### Content Security Policy

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:;">
```

## 🐛 Отладка

### Консоль браузера

Проверьте консоль на наличие ошибок:
- Откройте DevTools (F12)
- Перейдите на вкладку Console
- Исправьте найденные ошибки

### Валидация HTML

Используйте [W3C Validator](https://validator.w3.org/) для проверки корректности HTML.

### Тестирование производительности

- [PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)
- [WebPageTest](https://www.webpagetest.org/)

## 📞 Поддержка

При возникновении вопросов или проблем:

1. Проверьте консоль браузера на ошибки
2. Убедитесь в корректности путей к файлам
3. Проверьте настройки веб-сервера
4. Обратитесь к документации

## 📄 Лицензия

Этот проект создан для компании Astera. Все права защищены.

---

**Версия**: 3.0  
**Дата обновления**: Октябрь 2025  
**Совместимость**: Все современные браузеры
