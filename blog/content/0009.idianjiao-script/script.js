// ==UserScript==
// @name         自动显示听力答案
// @namespace    https://courageluo.xn--kivy66br3pu7d.top/
// @supportURL   courageluo@gmail.com
// @version      2024-07-30
// @description  Display the answer of idianjiao automatically
// @author       Courage Luo
// @match        https://www.idianjiao.com/*
// @icon         https://courageluo.xn--kivy66br3pu7d.top/img/favicon.png
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    window.addEventListener('load', function() {
        // 给你2.5秒按"跳过"按钮，原因见下
        setTimeout(() => {
            // 大多数现代浏览器为了防止自动播放广告和其他不必要的声音，限制了自动播放音频的行为。
            // 浏览器要求用户必须有与页面的交互（如点击、键盘输入等），然后才能播放音频。
            // 所以自动按按钮不会播放音频，也就按不了提交按钮，所以懒得折腾了
            // var btn = document.querySelector('.tg');
            // btn.click();

            // 获取答案并存储在数组中
            var answers = new Array();
            for (var i = 0; i < 20; i ++ ) {
                var ans = document.querySelectorAll('.incorrect')[i].innerText.replace('回答错误,正确答案', '');
                answers[i] = '第' + (i + 1) + '题选择' + ans + '项';
            }

            // 获取元素
            var questions = document.querySelectorAll('.answer');

            // 确保数量匹配
            if (questions.length !== answers.length) {
                console.error('数量不匹配！');
                return;
            }

            // 遍历questions并插入对应的answer
            for (i = 0; i < questions.length; i++) {
                // 创建元素存放答案
                var answer = document.createElement('p');
                answer.textContent = answers[i];

                // 调节一下样式
                answer.style.fontSize = '14px';
                answer.style.color = '#FF3333';

                // 获取当前元素
                var question = questions[i];

                // 在当前元素之后插入答案元素
                question.parentNode.insertBefore(answer, question.nextSibling);
            }
        }, 2500);
    });
})();