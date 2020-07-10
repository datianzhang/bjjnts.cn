// ==UserScript==
// @name         ������ְҵ���������ж�����ƽ̨�γ��Զ����š������������Զ�ȷ��
// @version      0.3
// @author       staugur
// @match        https://www.bjjnts.cn/lessonStudy/*
// @grant        none
// @updateURL   https://static.saintic.com/cdn/autoclick.bjjnts.user.js
// ==/UserScript==

(function () {
    'use strict';

    function zeroFill(i) {
        if (i >= 0 && i <= 9) {
            return "0" + i;
        } else {
            return i;
        }
    }

    function getCurrentTime() {
        var date = new Date(); //��ǰʱ��
        var month = zeroFill(date.getMonth() + 1); //��
        var day = zeroFill(date.getDate()); //��
        var hour = zeroFill(date.getHours()); //ʱ
        var minute = zeroFill(date.getMinutes()); //��
        var second = zeroFill(date.getSeconds()); //��

        //��ǰʱ��
        var curTime = date.getFullYear() + "-" + month + "-" + day +
            " " + hour + ":" + minute + ":" + second;

        return curTime;
    }

    window.face_monitor = function () {}

    var current, progress;
    $('.change_chapter').each((i, o) => {
        if (current) return
        var txt = $(o).find('span').text()
        var mch = /�����\s*([\d.]+)%/.exec(txt)
        if (mch) console.log(`��${i + 1}�ڿΣ�����=${mch[1]}%`)
        if (mch && +mch[1] < 100) {
            current = $(o)
            progress = +mch[1]
        }
    })
    if (current) current.click()
    if (!current) console.log('û�ҵ��ɿ�ʼ�Ŀγ̣����ֶ�����')

    var v = window.video || document.getElementById("studymovie")
    if (progress) setTimeout(() => {
        v.currentTime = (v.duration * progress) - 5 // ������
    }, 2000)

    v.onended = function () {
        if (v.currentTime < v.duration) return
        console.log("ˢ��ҳ�������һ���γ� @ " + getCurrentTime());
        location.reload()
    }

    setInterval(function () {
        $('.face_recogn').hide();
        var btn = document.querySelector(".layui-layer-dialog .layui-layer-btn .layui-layer-btn0");
        if (btn) {
            btn.click();
            console.log("�Զ������ť @ " + getCurrentTime());
        }
        if (v.paused) {
            console.log("�Զ����²��� @ " + getCurrentTime());
            v.play();
        }
    }, 2000);
})();