const numElements = document.querySelectorAll('.answer').length;

function getAnswers() {
    var answers = new Array();

    for (var i = 0; i < numElements; i++) {
        var ans = document.querySelectorAll('.incorrect')[i].innerText.replace('回答错误,正确答案', '');
        answers[i] = letterToNumber(ans);
    }

    return answers;
}

function letterToNumber(letter) {
    const map = { A: 1, B: 2, C: 3 };
    return map[letter] || 'undef';
}

function handleClick() {
    const answers = getAnswers();
    const selection = document.querySelectorAll('dl');

    for (var i = 0; i < numElements; i++) {
        selection[i].children[answers[i]].children[0].children[0].click();
    }

    return answers;
}

function autoClick() {
    const answers = handleClick();

    if (arguments.length === 0) {
        return;
    } else if (arguments.length === 1) {
        const count = arguments[0];
        const selection = document.querySelectorAll('dl');

        if (count < 0 || count > 20 || typeof count !== 'number') {
            throw new Error('输入参数无效');
        }

        let numbers = Array.from({ length: 20 }, (_, i) => i);
        for (let i = numbers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
        }

        const wrongMap = { 1: 2, 2: 3, 3: 1 };
        for (let i = 0; i < count; i++) {
            selection[numbers[i]].children[wrongMap[answers[i]]].children[0].children[0].click();
        }
    } else {
        throw new Error('输入参数过多');
    }
}

// 用法：autoClick() 自动点击正确答案
// autoClick(n) 在点击正确答案之后重新点击n个错误答案
autoClick(1);
