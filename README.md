# Astera - Премиальный лендинг электронных входных дверей

## Описание проекта

Современный анимированный лендинг для компании Astera, специализирующейся на производстве и установке премиальных электронных входных дверей для домов и квартир. Лендинг создан с использованием лучших мировых практик веб-дизайна и включает передовые анимационные эффекты.

## Особенности

### 🎨 Дизайн
- **Премиальная цветовая палитра** с золотыми акцентами
- **Современная типографика** (Inter, Playfair Display)
- **Адаптивный дизайн** Mobile-First
- **Темная тема** с элегантными переходами
- **Высококачественные рендеры** дверей и иконки

### ⚡ Анимации и эффекты
- **Плавные переходы** и микровзаимодействия
- **Scroll-анимации** с Intersection Observer
- **Параллакс эффекты** для изображений
- **Анимированные счетчики** статистики
- **Морфинг фонов** и частицы
- **Hover-эффекты** с трансформациями

### 🚀 Функциональность
- **Полнофункциональный слайдер** для блока "Наши работы"
- **Модальные окна** с формами обратной связи
- **Валидация форм** в реальном времени
- **Система уведомлений** для пользователей
- **Мобильное меню** с анимациями
- **Ленивая загрузка** изображений

### 📱 Адаптивность
- **Mobile-First подход**
- **Поддержка всех устройств** (320px+)
- **Touch-friendly интерфейс**
- **Оптимизация производительности**

## Структура проекта

```
astera-v4/
├── index.html              # Главная страница
├── css/
│   ├── style.css           # Основные стили
│   ├── animations.css      # Анимации и эффекты
│   └── slider.css          # Стили слайдера
├── js/
│   ├── main.js             # Основная логика
│   └── slider.js           # Функциональность слайдера
├── img/
│   ├── renders/            # Рендеры дверей
│   │   ├── door_render_main.png
│   │   ├── project-luxury-home.png
│   │   ├── project-smart-apartment.png
│   │   └── project-office-building.png
│   ├── icons/              # Иконки
│   │   ├── icon_experience.png
│   │   ├── icon_installation.png
│   │   ├── icon_warranty.png
│   │   └── icon_delivery.png
│   └── works/              # Изображения проектов
│       ├── project-luxury-home.png
│       ├── project-smart-apartment.png
│       └── project-office-building.png
├── fonts/                  # Шрифты (если используются локальные)
├── README.md              # Документация
└── .gitignore             # Git ignore файл
```

## Установка и развертывание

### Вариант 1: Простое развертывание (рекомендуется)

1. **Скачайте архив проекта** с GitHub
2. **Распакуйте** содержимое на ваш веб-сервер
3. **Откройте** `index.html` в браузере

### Вариант 2: Развертывание на хостинге

1. **Загрузите файлы** на ваш хостинг через FTP/SFTP
2. **Убедитесь**, что `index.html` находится в корневой директории
3. **Настройте** веб-сервер для обслуживания статических файлов

### Вариант 3: GitHub Pages

1. **Форкните** репозиторий или загрузите файлы в свой репозиторий
2. **Перейдите** в Settings → Pages
3. **Выберите** источник: Deploy from a branch
4. **Выберите** ветку `main/master` и папку `/ (root)`
5. **Сохраните** настройки

### Вариант 4: Netlify/Vercel

1. **Подключите** ваш GitHub репозиторий
2. **Настройте** автоматическое развертывание
3. **Опубликуйте** сайт

## Настройка и кастомизация

### Изменение контактной информации

Отредактируйте файл `index.html`:

```html
<!-- Найдите и измените -->
<a href="tel:+79637386555">+7 (963) 738-65-55</a>
<a href="mailto:info@astera-doors.ru">info@astera-doors.ru</a>
```

### Изменение цветовой схемы

Отредактируйте CSS переменные в `css/style.css`:

```css
:root {
    --primary-gold: #D4AF37;      /* Основной золотой */
    --secondary-gold: #B8860B;    /* Вторичный золотой */
    --dark-bg: #0A0A0A;          /* Темный фон */
    --text-light: #FFFFFF;        /* Светлый текст */
    /* ... другие переменные */
}
```

### Добавление новых слайдов

В файле `index.html` найдите секцию слайдера и добавьте новые слайды:

```html
<div class="slider-slide">
    <div class="slide-content">
        <img src="img/works/your-new-project.jpg" alt="Новый проект">
        <div class="slide-info">
            <h3>Название проекта</h3>
            <p>Описание проекта</p>
        </div>
    </div>
</div>
```

### Настройка анимаций

Параметры анимаций можно изменить в `css/animations.css`:

```css
/* Скорость анимаций */
.smooth-reveal {
    animation-duration: 0.8s; /* Измените на нужную */
}

/* Задержки появления элементов */
.stagger-item:nth-child(1) { animation-delay: 0.1s; }
```

## Оптимизация производительности

### Для продакшена рекомендуется:

1. **Минификация CSS и JS** файлов
2. **Оптимизация изображений** (WebP формат)
3. **Включение gzip сжатия** на сервере
4. **Настройка кэширования** статических ресурсов
5. **Использование CDN** для шрифтов и библиотек

### Пример настройки .htaccess для Apache:

```apache
# Включение сжатия
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

# Настройка кэширования
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
</IfModule>
```

## Поддержка браузеров

Лендинг протестирован и поддерживает:

- **Chrome** 90+
- **Firefox** 88+
- **Safari** 14+
- **Edge** 90+
- **Mobile Safari** iOS 14+
- **Chrome Mobile** Android 90+

## Техническая поддержка

### Часто задаваемые вопросы

**Q: Слайдер не работает на мобильных устройствах**
A: Убедитесь, что JavaScript файлы загружаются корректно и нет ошибок в консоли браузера.

**Q: Анимации тормозят на слабых устройствах**
A: Можно отключить сложные анимации через CSS media queries для слабых устройств.

**Q: Формы не отправляются**
A: Настройте серверную обработку форм или интеграцию с сервисами типа Formspree.

### Логи и отладка

Для отладки откройте консоль разработчика (F12) и проверьте:
- Ошибки JavaScript
- Загрузку ресурсов
- Сетевые запросы

## Лицензия

Проект создан для компании Astera. Все права защищены.

## Контакты разработчика

При возникновении вопросов по настройке или кастомизации лендинга, обращайтесь к документации или в службу поддержки.

---

**Версия:** 4.0  
**Дата создания:** Октябрь 2024  
**Последнее обновление:** Октябрь 2024
