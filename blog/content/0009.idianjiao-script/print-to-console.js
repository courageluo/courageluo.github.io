function formatDateTime() {
    const now = new Date();

    // 获取年、月、日
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');

    // 获取时、分、秒
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    const formattedDate = `${year}.${month}.${day} ${hours}:${minutes}:${seconds}`;

    return formattedDate;
}

function printToConsole() {
    // 打印标题
    const title = document.querySelector('h1').innerHTML;
    console.log('%c%s', 'color: rgb(28, 218, 231); font-weight: bold; font-size: 20px;', title);

    console.log('%cSummary time: %c' + formatDateTime(), 'color:rgb(69, 163, 167); font-size: 12px;', 'font-size: 12px; color: rgb(254, 141, 89);');

    // 打印内容
    const numElements = document.querySelectorAll('.answer').length;

    var answers = new Array();
    for (var i = 0; i < numElements; i++) {
        var ans = document.querySelectorAll('.incorrect')[i].innerText.replace('回答错误,正确答案', '');
        answers[i] = ans;
    }

    const partSize = 5;

    for (var i = 0; i < answers.length; i += partSize) {
        const start = i;
        const end = i + partSize - 1;
        const part = answers.slice(start, start + partSize);
        const partStr = part.join('');

        console.log('%c%s-%s: %c%s', 'color:rgb(117, 195, 216); font-size: 16px; font-weight: bold;', start + 1, end + 1, 'color: rgb(254, 141, 89); font-size: 16px;', partStr);
    }
}

printToConsole();
