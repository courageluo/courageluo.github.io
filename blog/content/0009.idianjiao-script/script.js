// ==UserScript==
// @name         自动显示听力答案
// @namespace    https://courageluo.github.io/
// @supportURL   courageluo@gmail.com
// @version      2025-01-16
// @description  Display the answer of idianjiao automatically
// @author       Courage Luo
// @match        https://www.idianjiao.com/*
// @icon         https://courageluo.github.io/img/favicon.svg
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    window.addEventListener('load', function() {
        // 创建提示文本
        var skipTip = document.createElement('p');
        skipTip.innerText = '\n请点击 "跳过" 按钮以确保脚本正常加载';
        skipTip.style.color = '#c4a699';

        var bsTip = document.getElementsByClassName('bsTip')[0];
        bsTip.appendChild(skipTip);

        // 等待按钮按下后执行
        var tgButton = document.querySelector('.tg');
        tgButton.addEventListener('click', function() {
            applyDisplay();
        });

        // 主要内容
        function applyDisplay() {
            // 获取元素数量
            const numElements = document.querySelectorAll('.answer').length;

            // 获取答案并存储
            var answers = new Array();
            for (var i = 0; i < numElements; i ++ ) {
                var ans = document.querySelectorAll('.incorrect')[i].innerText.replace('回答错误,正确答案', '');
                answers[i] = '第' + (i + 1) + '题选择' + ans + '项';
            }

            // 获取题目元素
            var questions = document.querySelectorAll('.answer');

            // 确保数量匹配
            if (questions.length !== numElements) {
                console.error('数量不匹配！');
                return;
            }

            // 遍历 questions 并插入对应的 answer
            for (i = 0; i < questions.length; i++) {
                // 创建元素存放答案
                var answer = document.createElement('p');
                answer.innerText = answers[i];

                // 调节一下样式
                answer.style.marginTop = '5px';
                answer.style.fontSize = '14px';
                answer.style.color = '#d85b2f';

                // 获取当前元素
                var question = questions[i];

                // 在当前元素之后插入答案元素
                question.parentNode.insertBefore(answer, question.nextSibling);
            }
        }
    });
})();