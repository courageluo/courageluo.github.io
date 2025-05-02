const puppeteer = require('puppeteer');
const fs = require('fs');

// 自定义获取的网页地址
const TARGET_URLS = [
    'https://www.idianjiao.com/djtest/ExamPractice?id=38960&ms=2',
    'https://www.idianjiao.com/djtest/ExamPractice?id=38961&ms=2',
    'https://www.idianjiao.com/djtest/ExamPractice?id=38962&ms=2'
];

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--no-sandbox']
    });

    const page = await browser.newPage();
    let isLoggedIn = false;

    // 添加自定义消息过滤标识
    let customLogIdentifier = '[CUSTOM_LOG]';

    if (fs.existsSync('./cookies.json')) {
        const cookies = JSON.parse(fs.readFileSync('./cookies.json'));
        await page.setCookie(...cookies);
        console.log('Cookies 已加载');
        isLoggedIn = true;
    }

    // 监听控制台消息并过滤
    page.on('console', msg => {
        const text = msg.text();
        // 只处理带有自定义标识的消息
        if (text.startsWith(customLogIdentifier)) {
            // 提取实际内容并清理格式
            const cleanText = text
                .replace(customLogIdentifier, '')
                .replace(/%c|color:.*?;|font-.*?;/g, '')
                .trim();
            console.log(cleanText);
        }
    });

    for (const url of TARGET_URLS) {
        console.log(`\n开始处理: ${url}`);

        try {
            await page.goto(url, {
                waitUntil: 'networkidle2',
                timeout: 60000
            });

            if (!isLoggedIn && page.url().includes('/login')) {
                console.log('检测到需要登录...');
                await login(page);
                isLoggedIn = true;
            }

            await processPage(page, customLogIdentifier);
            console.log(`处理完成: ${url}`);

        } catch (error) {
            console.error(`处理失败 (${url}):`, error.message);
        }
    }

    await browser.close();
})();

// 提供模板，如果 cookies 正确加载那么无需这些代码
async function login(page) {
    await page.goto('https://www.idianjiao.com/djtest/login');
    await page.waitForSelector('#username', { timeout: 5000 });

    // 建议通过环境变量获取凭证
    await page.type('#username', 'your_username');
    await page.type('#password', 'your_password');

    await Promise.all([
        page.waitForNavigation(),
        page.click('#login-button')
    ]);

    const cookies = await page.cookies();
    fs.writeFileSync('./cookies.json', JSON.stringify(cookies));
    console.log('登录成功并保存 Cookies');
}

async function processPage(page, logIdentifier) {
    try {
        await page.waitForSelector('.answer', { timeout: 10000 });

        await page.evaluate((identifier) => {
            function formatDateTime() {
                const now = new Date();
                const pad = n => n.toString().padStart(2, '0');
                return `${now.getFullYear()}.${pad(now.getMonth()+1)}.${pad(now.getDate())} ` +
                       `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
            }

            function printToConsole() {
                // 添加标识前缀并去除样式参数
                try {
                    const title = document.querySelector('h1').innerText;
                    console.log(`${identifier}${title}`);

                    console.log(`${identifier}Summary time: ${formatDateTime()}`);

                    const answers = Array.from(document.querySelectorAll('.incorrect'))
                        .map(el => el.innerText.replace('回答错误,正确答案', ''));

                    const partSize = 5;
                    for (let i = 0; i < answers.length; i += partSize) {
                        const part = answers.slice(i, i + partSize);
                        const range = `${i+1}-${Math.min(i+partSize, answers.length)}`;
                        console.log(`${identifier}${range}: ${part.join('')}`);
                    }
                } catch (error) {
                    console.log(`${identifier}ERROR: ${error.message}`);
                }
            }

            printToConsole();
        }, logIdentifier);

    } catch (error) {
        console.error('页面处理失败:', error.message);
    }
}