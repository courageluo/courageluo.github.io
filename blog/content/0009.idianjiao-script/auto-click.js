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

function autoClick() {
    const answers = getAnswers();
    const selection = document.querySelectorAll('dl');

    for (var i = 0; i < numElements; i++) {
        selection[i].children[answers[i]].children[0].children[0].click();
    }
}

autoClick();
