// 获取页脚内容
fetch("/footer/footer.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer').innerHTML = data;
    });

// 优化锚点跳转
document.addEventListener('click', function(e) {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;

    e.preventDefault();
    const hash = anchor.getAttribute('href');
    const target = document.querySelector(hash);

    if (target) {
        target.scrollIntoView({ behavior: 'smooth' });

        const newUrl = window.location.pathname + hash;
        history.replaceState(null, document.title, newUrl);
    }
});

window.addEventListener('load', function() {
    if (window.location.hash) {
        const target = document.querySelector(window.location.hash);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// 背景图片定义
const bgConfig = {
    "/": {
        "light": "/img/background/day/main.svg",
        "dark": "/img/background/night/main.svg"
    },
    "/404.html": {
        "light": "/img/background/day/guessnum.svg",
        "dark": "/img/background/night/guessnum.svg"
    },
    "/page/about.html": {
        "light": "/img/background/day/update.svg",
        "dark": "/img/background/night/update.svg"
    },
    "/page/guessnum.html": {
        "light": "/img/background/day/guessnum.svg",
        "dark": "/img/background/night/guessnum.svg"
    },
    "/page/factorize.html": {
        "light": "/img/background/day/factorize.svg",
        "dark": "/img/background/night/factorize.svg"
    },
    "/page/settings.html": {
        "light": "/img/background/day/settings.svg",
        "dark": "/img/background/night/settings.svg"
    },
    "/blog/": {
        "light": "/img/background/day/blog.svg",
        "dark": "/img/background/night/blog.svg"
    }
};

// 在 DOM 加载时初始化
document.addEventListener('DOMContentLoaded', function() {
    // 确保背景层存在
    if (!document.querySelector('.background-layer')) {
        const bgLayer = document.createElement('div');
        bgLayer.className = 'background-layer';
        document.body.insertBefore(bgLayer, document.body.firstChild);
    }
    applySettings();
});

// 动态应用设置
function applySettings() {
    const defaultBgLight = getDefaultBgLight();
    const defaultBgDark = getDefaultBgDark();
    const bgType = localStorage.getItem('bgType') || 'default';

    // 设置字体
    const textFontChinese = localStorage.getItem('textFontChinese') || 'JiangChengHei';
    const textFontWestern = localStorage.getItem('textFontWestern') || 'Inter';
    const codeFontChinese = localStorage.getItem('codeFontChinese') || 'JiangChengHei';
    const codeFontWestern = localStorage.getItem('codeFontWestern') || 'CascadiaMono';

    document.body.style.fontFamily = `${textFontWestern}, ${textFontChinese}`;
    document.querySelectorAll('p:not(.copyright)').forEach(p => p.style.fontFamily = `${textFontWestern}, ${textFontChinese}`);
    document.querySelectorAll('select').forEach(select => {select.style.fontFamily = `${textFontWestern}, ${textFontChinese}`;});
    document.querySelectorAll('button').forEach(button => {button.style.fontFamily = `${textFontWestern}, ${textFontChinese}`;});
    document.querySelectorAll('input').forEach(input => {input.style.fontFamily = `${textFontWestern}, ${textFontChinese}`;});
    document.querySelectorAll('code').forEach(code => {code.style.fontFamily = `${codeFontWestern}, ${codeFontChinese}`;});

    // 应用缩放设置
    const zoomLevel = localStorage.getItem('zoomLevel') || '100';
    applyZoom(zoomLevel);
    
    // 设置背景
    let bgLayer = document.querySelector('.background-layer');
    if (!bgLayer) {
        bgLayer = document.createElement('div');
        bgLayer.className = 'background-layer';
        document.body.insertBefore(bgLayer, document.body.firstChild);
    }

    if (bgType === 'solid') {
        bgLayer.style.display = 'none';
        const bgColorLight = localStorage.getItem('bgColorLight') || '#bcd5da';
        const bgColorDark = localStorage.getItem('bgColorDark') || '#1d446b';
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.body.style.backgroundColor = bgColorDark;
            document.documentElement.style.backgroundColor = bgColorDark;
        } else {
            document.body.style.backgroundColor = bgColorLight;
            document.documentElement.style.backgroundColor = bgColorLight;
        }
    } else {
        bgLayer.style.display = 'block';
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            bgLayer.style.backgroundImage = `url(${defaultBgDark})`;
        } else {
            bgLayer.style.backgroundImage = `url(${defaultBgLight})`;
        }
        document.body.style.backgroundColor = 'transparent';
    }
    
    updateBgLayerHeight();
    window.addEventListener('resize', updateBgLayerHeight);
    window.addEventListener('scroll', updateBgLayerHeight);
}

function updateBgLayerHeight() {
    const bgLayer = document.querySelector('.background-layer');
    if (!bgLayer) return;
    
    const contentHeight = Math.max(
        document.body.scrollHeight, 
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
    );
    
    bgLayer.style.height = `${Math.max(contentHeight, window.innerHeight)}px`;
}

// 为了防止调整窗口大小后背景层高度不正确
window.addEventListener('resize', applySettings);

function bgZoom() {
    const bgLayer = document.querySelector('.background-layer');
    if (!bgLayer) { return; }
    const zoomLevel = localStorage.getItem('zoomLevel') / 100 || 1;
    let pageHeight = document.querySelector('.content').scrollHeight + document.querySelector('#footer').scrollHeight;
    let bgHeight = zoomLevel * pageHeight;
    bgLayer.style.height = `${bgHeight}px`;
}

// 引用 script.js 不加 defer 用这句
// window.addEventListener('load', bgZoom);
document.addEventListener('DOMContentLoaded', bgZoom);

function applyZoom(zoomLevel) {
    document.querySelector('#footer').style.zoom = `${zoomLevel}%`;
    document.querySelector('.content').style.zoom = `${zoomLevel}%`;
    bgZoom();
}

window.addEventListener('load', function() {
    if (document.querySelector('.sidebar')) {
        // let height = window.innerHeight + 'px';
        // const asideElement = document.querySelector('.sidebar');
        // asideElement.style.cssText = 'height: ' + height + ' !important;';
        // asideElement.style.setProperty('height', height, 'important');
        document.querySelector('.sidebar').style.height = '1000px';
    }
});

// 基于路径获取默认背景
function getDefaultBgLight() {
    return getDefaultBg('light');
}

function getDefaultBgDark() {
    return getDefaultBg('dark');
}

function getDefaultBg(mode) {
    const path = window.location.pathname;

    // 优先精确匹配（bgConfig 中直接定义到具体文件的）
    if (bgConfig[path] && bgConfig[path][mode]) {
        return bgConfig[path][mode];
    }

    // 否则找最符合的路径（bgConfig 中定义到文件夹的）
    let matchingFolder = '';
    Object.keys(bgConfig).forEach(key => {
        if (key.endsWith('/') && path.startsWith(key) && key.length > matchingFolder.length) {
            matchingFolder = key;
        }
    });

    return bgConfig[matchingFolder]?.[mode] || '/img/background/day/main.svg';
}

// 应用深色设置
document.addEventListener('DOMContentLoaded', applySettings);
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applySettings);

// 控制台输出字符画
const fontSize = 10;
const colors = [
    '#ADD8E6', '#A0CCDE', '#93C0D7', '#86B4CF', '#79A8C7', 
    '#6C9CBF', '#5F90B7', '#5284AF', '#4578A7', '#386C9F', 
    '#2B6097', '#1E548F', '#365878'
];

console.log("%c       _      __    __                     __         \n" +
            "%c      | | __ / /__ / /______  __ _  ___   / /____     \n" +
            "%c      | |/ |/ / -_) / __/ _ \\/  ' \\/ -_) / __/ _ \\    \n" +
            "%c      |__/|__/\\__/_/\\__/\\___/_/_/_/\\__/  \\__/\\___/    \n" +
            "%c  _____                            __            _    \n" +
            "%c / ___/__  __ _________ ____ ____ / /  __ _____ ( )___\n" +
            "%c/ /__/ _ \\/ // / __/ _ `/ _ `/ -_) /__/ // / _ \\|/(_-<\n" +
            "%c\\___/\\___/\\_,_/_/  \\_,_/\\_, /\\__/____/\\_,_/\\___/ /___/\n" +
            "%c                       /___/                          \n" +
            "%c           _      __    __       _ __                 \n" +
            "%c          | | /| / /__ / /  ___ (_) /____             \n" +
            "%c          | |/ |/ / -_) _ \\(_-</ / __/ -_)            \n" +
            "%c          |__/|__/\\__/_.__/___/_/\\__/\\__/             \n",
            `font-size: ${fontSize}pt; color: ${colors[0]}`,
            `font-size: ${fontSize}pt; color: ${colors[1]}`,
            `font-size: ${fontSize}pt; color: ${colors[2]}`,
            `font-size: ${fontSize}pt; color: ${colors[3]}`,
            `font-size: ${fontSize}pt; color: ${colors[4]}`,
            `font-size: ${fontSize}pt; color: ${colors[5]}`,
            `font-size: ${fontSize}pt; color: ${colors[6]}`,
            `font-size: ${fontSize}pt; color: ${colors[7]}`,
            `font-size: ${fontSize}pt; color: ${colors[8]}`,
            `font-size: ${fontSize}pt; color: ${colors[9]}`,
            `font-size: ${fontSize}pt; color: ${colors[10]}`,
            `font-size: ${fontSize}pt; color: ${colors[11]}`,
            `font-size: ${fontSize}pt; color: ${colors[12]}`);