$(function () {
    FastClick.attach(document.body);
});
$(function () {
    var winW = $(window).width(),
            winH = $(window).height();
    $(".container").height(winH);
    $(".container").width(winW);
    $("body").height(winH);
    var date = new Date();
    var today = date.getFullYear()+''+month(date.getMonth()+1)+''+date.getDate();

    // flag = true;
    // window.bgMusic = function bgMusic(){
    //
    //     audioController.on("click",function(){
    //         if(flag){
    //             audio.play();
    //             $(this).removeClass("pause").addClass("play");
    //         }else{
    //             audio.pause();
    //             $(this).removeClass("play").addClass("pause");
    //         }
    //         flag = !flag;
    //     });
    //     setTimeout(function(){
    //         audioController.trigger("click");
    //     },1000);
    // };

    var dragImgPage3 = $('#page3');
    var dragImgPage5 = $('#page5');
    var dragImgPage6 = $('#page6');
    var dragImgClassPage3 = $('.page3');
    var dragImgPage3Dark = $('#page3_dark');
    var roomTextThird = $('.page3 .third');
    var tv = $('#tv');
    var lamp = $('#lamp');
    var pointLamp = $('#point-lamp');
    var scoreTotal = $.cookie('earth-envirinmental-day-score');
    var weight = $.cookie('earth-envirinmental-day-weight');
    if (scoreTotal || weight) {
        $.cookie('earth-envirinmental-day-score', '');
        $.cookie('earth-envirinmental-day-weight', '');
    }

//分数
    function scoreCal(scoreData, weigthData) {
        var scoreTotal = $.cookie('earth-envirinmental-day-score');
        var weight = $.cookie('earth-envirinmental-day-weight');
        if (scoreTotal && weight) {
            $.cookie('earth-envirinmental-day-score', (scoreTotal + ',' + scoreData));
            $.cookie('earth-envirinmental-day-weight', (weight + ',' + weigthData));
        } else {
            $.cookie('earth-envirinmental-day-score', scoreData);
            $.cookie('earth-envirinmental-day-weight', weigthData);
        }
    }

    //计算分数
    window.calculateScore = calculateScore();
    function calculateScore() {
        var score = 80;
        var weightTotal = 19.80;
        var scoreTotal = $.cookie('earth-envirinmental-day-score');
        var weight = $.cookie('earth-envirinmental-day-weight');
        if (scoreTotal && weight) {
            var scoreArr = scoreTotal.split(',');
            scoreArr.forEach(function (item) {
                score += parseInt(item);
            });
            var weightArr = weight.split(',');
            weightArr.forEach(function (item) {
                weightTotal += parseFloat(item);
            });
        }
        var data = new Array;
        data['score'] = score;
        data['weight'] = weightTotal;
        return data;

    }

//淡入淡出
    setTimeout(function(){
        $('.page1').on('click',function () {
            var shareData = {
                title: window.title,
                desc: window.desc,
                link: window.link,
                imgUrl: window.imgUrl
            };
            window.share(shareData);
            audioClick.play();
            $(this).fadeOut('slow');
            $(this).next().fadeIn('slow');
            if ($('.page2').is(":visible")) {
                // $('.page2 .page2-second .p6').delay(500).fadeIn(1000);
                // $('.page2 .page2-second .p7').delay(1300).fadeIn(1000);
                // $('.page2 .page2-second').delay(2800).fadeOut(1500);
                $('.page2 .first').delay(500).fadeIn(1500);
                $('.plant1').delay(800).fadeIn();
                $('.plant2').delay(1300).fadeIn();
                $('.plant3').delay(1800).fadeIn();
                $('.plant4').delay(2200).fadeIn();
                $('.plant5').delay(2700).fadeIn(500);
                $('.page2 .second').delay(3200).fadeIn(1200);
//                    $('.page2 .second').delay(0).fadeIn();
                $('.page2 .button').click(function () {
                    var shareData = {
                        title: window.title,
                        desc: window.desc,
                        link: window.link,
                        imgUrl: window.imgUrl
                    };
                    window.share(shareData);
                    audioClick.play();
                    $(this).parent('div').hide('slow');
                    $(this).parent('div').next('div.page').delay(150).fadeIn('slow');
                    dragImgPage3Dark.fadeOut(3000);
                    dragImgPage3.fadeIn(3000);
                    roomTextThird.fadeIn(1000);
                    roomTextThird.delay(2000).fadeOut(2000);
                    tv.removeClass('hidden');
                    lamp.removeClass('hidden');
                    if (parseInt(dragImgPage3.css('left')) == 0) {
                        $('.page3 .point').show();
                    }
                });
            }
        });
    },4000);



//page1
    //云彩晃动、汗滴流下
    var clouds = $('#clouds');
    var drops = $('#drops');

    // setInterval(cloudsMove, 1000);

    function cloudsMove() {
        if (!(clouds.is(":animated"))) {
            clouds.animate({"left": "-=15px"}, 200).animate({"left": "+=15px"}, 200)
                    .animate({"left": "-=12px"}, 200).animate({"left": "+=12px"}, 200)
                    .animate({"left": "-=6px"}, 200).animate({"left": "+=6px"}, 200)
                    .animate({"left": "-=1px"}, 200).animate({"left": "+=1px"}, 200);
        }
    }

//page2


//page3 卧室
    //关闭电视和灯
    $('#tv').click(function () {
        audioClick.play();
        $('#tv').hide();
        $('.tv_score').fadeIn(500);
        $('.tv_score').delay(2000).fadeOut(1000);
        if ($('#lamp').find('img').attr('src') == 'assets/components/room-lamp-close.png') {
            $('.page3 .button').delay(3500).fadeIn(1500);
            $('.page3 .button').click(function () {
                var shareData = {
                    title: window.title,
                    desc: '我今天减排0.77kgCO₂，向中国绿化基金会捐出了0.15元！快和我一起为地球添点绿色吧！',
                    link: window.link,
                    imgUrl: window.imgUrl
                };
                window.share(shareData);
                audioClick.play();
                $(this).parent('div').fadeOut(2000);
                $(this).parent('div').next('div.page').delay(150).fadeIn('slow');
                $(this).parent('div').next('div.page').find('.eighth').fadeIn();
                $(this).parent('div').next('div.page').find('.eighth').delay(5000).fadeOut(1500);
                $(this).parent('div').next('div.page').find('.tenth').delay(6000).fadeIn();
//                $(this).parent('div').next('div.page').find('.tenth').delay(5000).fadeOut(200);
            })
        }else{
            var shareData = {
                title: window.title,
                desc: '我今天减排0.02kgCO₂，向中国绿化基金会捐出了0.15元！快和我一起为地球添点绿色吧！',
                link: window.link,
                imgUrl: window.imgUrl
            };
            window.share(shareData);
        }

    });
    $('#lamp').click(function () {
        pointLamp.hide();
        audioClick.play();
        if ($(this).find('img').attr('src') == 'assets/components/room-lamp.png') {
            $('.lamp_score').fadeIn(500);
            $('.lamp_score').delay(2000).fadeOut(1000);
            $(this).find('img').attr('src', 'assets/components/room-lamp-close.png');
            if ($('#tv').is(':hidden')) {
                $('.page3 .button').delay(3500).fadeIn(1500);
                $('.page3 .button').click(function () {
                    var shareData = {
                        title: window.title,
                        desc: '我今天减排0.77kgCO₂，向中国绿化基金会捐出了0.15元！快和我一起为地球添点绿色吧！',
                        link: window.link,
                        imgUrl: window.imgUrl
                    };
                    window.share(shareData);
                    audioClick.play();
                    $(this).parent('div').fadeOut(2000);
                    $(this).parent('div').next('div.page').delay(150).fadeIn('slow');
                    $(this).parent('div').next('div.page').find('.eighth').fadeIn();
                    $(this).parent('div').next('div.page').find('.eighth').delay(5000).fadeOut(1500);
                    $(this).parent('div').next('div.page').find('.tenth').delay(6000).fadeIn();
//                    $(this).parent('div').next('div.page').find('.tenth').delay(5000).fadeOut(200);
                })
            }else {
                var shareData = {
                    title: window.title,
                    desc: '我今天减排0.75kgCO₂，向中国绿化基金会捐出了0.15元！快和我一起为地球添点绿色吧！',
                    link: window.link,
                    imgUrl: window.imgUrl
                };
                window.share(shareData);
            }
        }
    });

    var img_width = parseInt($('#page3').css('width'));
    var img_height = parseInt($('#page3').css('height'));
    var tvLeft = parseInt(tv.css('left'), 10);
    var lampLeft = parseInt(lamp.css('left'), 10);
    var pointLampLeft = parseInt(pointLamp.css('left'), 10);
    var img_left = winW - img_width;
    var hammerPage3 = new Hammer(dragImgPage3[0], {
        recognizers: [
            [Hammer.Pan],
            [Hammer.Pinch, {
                enable: true
            }]
        ]
    });

    function pointMove() {
        if (!(pointLamp.is(":animated"))) {
            pointLamp.animate({"left": "-=10px"}, 400).animate({"left": "+=10px"}, 400);
        }
    }
    var pointTime;


    hammerPage3.on('panstart', function (ev) {
        clearTimeout(pointTime);
        pageBgLeft = parseInt(dragImgPage3.css('left'), 10);
        $('.page3 .point-right').hide();
        $('.page3 .point-left').hide();
        if (lamp.find('img').attr('src') == 'assets/components/room-lamp.png') {
            pointLamp.show();
        }
    });
    hammerPage3.on('pan', function (ev) {
        var delta = pageBgLeft + ev.deltaX;
        if (delta >= (img_left) && delta <= 0) {
            dragImgPage3.css('left', delta);
            tv.css('left', delta + tvLeft);
            lamp.css('left', delta + lampLeft);
            pointLamp.css('left', delta + pointLampLeft);
        }
    });
    hammerPage3.on('panend', function (ev) {
        pointTime = setInterval(pointMove, 800)
    });
    hammerPage3.on('pinchin', function (ev) {
        pinchinImg(dragImgPage3);
        pinchinImg(tv);
        pinchinImg(lamp);
    });
    hammerPage3.on('pinchout', function (ev) {
        pinchoutImg(dragImgPage3, ev);
        pinchoutImg(tv, ev);
        pinchoutImg(lamp, ev);
    });


// page4厨房
    var dragImg = $('#page4-bg');
    var img_width = parseInt(dragImg.css('width'));
    var img_height = parseInt(dragImg.css('height'));
    var heater = $('#heater');
    var the_outlet = $('#the_outlet');
    var halo = $('#halo');
    var water_drop = $('#water_drop');
    var waterTap = $('#water-tap');
    var screen = $('#screen');
    var heaterPoint = $('#heater-point');
    var heaterLeft = parseInt(heater.css('left'), 10);
    var elementLeft = parseInt(the_outlet.css('left'), 10);
    var haloLeft = parseInt(halo.css('left'), 10);
    var waterDropLeft = parseInt(water_drop.css('left'), 10);
    var waterTapLeft = parseInt(waterTap.css('left'), 10);
    var screenLeft = parseInt(screen.css('left'), 10);
    var heaterPointLeft = parseInt(heaterPoint.css('left'), 10);
    var img_left = winW - img_width;
    var heaterGarbageLeft = 20;
    var heaterGarbageToLeft = 240;
    var theOutletGarbageLeft = -100;
    var theOutletGarbageToLeft = 200;

    waterTap.click(function () {
        var shareData = {
            title: window.title,
            desc: '我今天减排0.96kgCO₂，向中国绿化基金会捐出了0.15元！快和我一起为地球添点绿色吧！',
            link: window.link,
            imgUrl: window.imgUrl
        };
        window.share(shareData);
        audioClick.play();
        if (water_drop.is(':visible')) {
            water_drop.hide();
            $('#water-halo').hide();
            $('.drops_score').fadeIn(1500);
            $('.drops_score').delay(3500).fadeOut(1500);
            if(the_outlet.is(":hidden")&&heater.is(":hidden")&& $('.screen-halo').is(':hidden')){
                $('.page4 .button').delay(3500).fadeIn(1500);
                $('.page4 .button').click(function () {
                    audioClick.play();
                    $('.page4').delay(1000).fadeOut('slow');
                    $('.page5').delay(1500).fadeIn('slow');
                    $('.page5 .eleventh').fadeIn();
                    $('.eleventh').delay(8000).fadeOut(1000);
                });
            }
        }
    });
    var hammerPage4 = new Hammer(dragImg[0], {
        recognizers: [
            [Hammer.Pan],
            [Hammer.Pinch, {
                enable: true
            }]
        ]
    });
    hammerPage4.on('panstart', function (ev) {
        pageBgLeft = parseInt(dragImg.css('left'), 10);
        heaterPanLeft = parseInt(heater.css('left'), 10);
        theOutletPanLeft = parseInt(the_outlet.css('left'), 10);
        haloPanLeft = parseInt(halo.css('left'), 10);
        waterDropPanLeft = parseInt(water_drop.css('left'), 10);
        waterTapPanLeft = parseInt(waterTap.css('left'), 10);
        screenPanLeft = parseInt(screen.css('left'), 10);
        heaterPointPanLeft = parseInt(heaterPoint.css('left'), 10);
        heaterGarbagePanLeft = heaterGarbageLeft;
        heaterGarbagePanToLeft = heaterGarbageToLeft;
        theOutletGarbagePanLeft = theOutletGarbageLeft;
        theOutletGarbagePanToLeft = theOutletGarbageToLeft;
    });
    hammerPage4.on('pan', function (ev) {
        var delta = pageBgLeft + ev.deltaX;
        if (delta >= (img_left) && delta <= 0) {
            dragImg.css('left', delta);
            heater.css('left', heaterPanLeft + ev.deltaX);
            the_outlet.css('left', theOutletPanLeft + ev.deltaX);
            halo.css('left', haloPanLeft + ev.deltaX);
            water_drop.css('left', waterDropPanLeft + ev.deltaX);
            waterTap.css('left', waterTapPanLeft + ev.deltaX);
            screen.css('left', screenPanLeft + ev.deltaX);
            heaterPoint.css('left', heaterPointPanLeft + ev.deltaX);
            heaterGarbageLeft = heaterGarbagePanLeft + ev.deltaX;
            heaterGarbageToLeft = heaterGarbagePanToLeft + ev.deltaX;
            theOutletGarbageLeft = theOutletGarbagePanLeft + ev.deltaX;
            theOutletGarbageToLeft = theOutletGarbagePanToLeft + ev.deltaX;
        }
    });
    hammerPage4.on('pinchin', function (ev) {
        pinchinImg(dragImg);
        pinchinImg(heater);
        pinchinImg(the_outlet);
        pinchinImg(halo);
        pinchinImg(water_drop);
        pinchinImg(waterTap);
        pinchinImg(screen);
    });
    hammerPage4.on('pinchout', function (ev) {
        pinchoutImg(dragImg, ev);
        pinchoutImg(heater, ev);
        pinchoutImg(the_outlet, ev);
        pinchoutImg(halo, ev);
        pinchoutImg(water_drop, ev);
        pinchoutImg(waterTap, ev);
        pinchoutImg(screen, ev);
    });

// page4 heater
//     var page4BgLeft = parseInt(dragImg.css('left'), 10);
//     var heater_hammertime = new Hammer(heater[0]);
//     heater_hammertime.on('panstart', function (ev) {
//         heaterLeft = parseInt(heater.css('left'), 10);
//         heaterTop = parseInt(heater.css('top'), 10);
//         heaterPoint.hide();
//     });
//     heater_hammertime.on('panmove', function (ev) {
//         heater.css('left', heaterLeft + ev.deltaX);
//         heater.css('top', heaterTop + ev.deltaY);
//     });
//     heater_hammertime.on('panend', function (ev) {
//         if (heaterLeft + ev.deltaX > heaterGarbageLeft && elementLeft + ev.deltaX < heaterGarbageToLeft && heaterTop + ev.deltaY > 400 && heaterTop + ev.deltaY < 760) {
//             heater.hide();
//             audioTrash.play();
//             if (the_outlet.is(":hidden")) {
//                 screen.css('opacity', 1);
//                 $('.screen-text').fadeIn(1000);
//                 $('.screen-sig').click(function(){
//                     var shareData = {
//                         title: window.title,
//                         desc: '我今天减排19.80kgCO₂，向中国绿化基金会捐出了0.15元！快和我一起为地球添点绿色吧！',
//                         link: window.link,
//                         imgUrl: window.imgUrl
//                     };
//                     window.share(shareData);
//                     audioClick.play();
//                     $('.screen-text').fadeOut(1000);
//                     $('.screen-sig').css('opacity',1);
//                     $('.screen-halo').hide();
//                     $('.heater_score').fadeIn(1500);
//                     $('.heater_score').delay(4500).fadeOut(1000);
//                     if(water_drop.is(':hidden')){
//                         $('.page4 .button').delay(3500).fadeIn(1500);
//                         $('.page4 .button').click(function () {
//                             audioClick.play();
//                             $('.page4').delay(1000).fadeOut('slow');
//                             $('.page5').delay(1500).fadeIn('slow');
//                             $('.page5 .eleventh').fadeIn();
//                             $('.eleventh').delay(8000).fadeOut(1000);
//                         });
//                     }
//
//                 });
//             }
//         } else {
//             heater.css('left', heaterLeft);
//             heater.css('top', heaterTop);
//         }
//     });
    heater.click(function () {
        var path = anime.path('#motionPath path');

        var motionPath = anime({
            targets: '#header .heater-sig',
            translateX: path('x'),
            translateY: path('y'),
            rotate: path('angle'),
            easing: 'linear',
            duration: 2000
        });
    });

//page4 the_outlet
    var the_outlet_hammertime = new Hammer(the_outlet[0]);
    the_outlet_hammertime.on('panstart', function (ev) {
        elementLeft = parseInt(the_outlet.css('left'), 10);
        elementTop = parseInt(the_outlet.css('top'), 10);
    });
    the_outlet_hammertime.on('panmove', function (ev) {
        the_outlet.css('left', elementLeft + ev.deltaX);
        the_outlet.css('top', elementTop + ev.deltaY);
    });
    the_outlet_hammertime.on('panend', function (ev) {
        if (elementLeft + ev.deltaX > theOutletGarbageLeft && elementLeft + ev.deltaX < theOutletGarbageToLeft && elementTop + ev.deltaY > 500 && elementTop + ev.deltaY < 750) {
            the_outlet.hide();
            audioTrash.play();
            if (heater.is(":hidden")) {
                screen.css('opacity', 1);
                $('.screen-text').delay(200).fadeIn(500);
                $('.screen-sig').click(function(){
                    var shareData = {
                        title: window.title,
                        desc: '我今天减排19.80kgCO₂，向中国绿化基金会捐出了0.15元！快和我一起为地球添点绿色吧！',
                        link: window.link,
                        imgUrl: window.imgUrl
                    };
                    window.share(shareData);
                    audioClick.play();
                    $('.screen-text').fadeOut(1000);
                    $('.screen-sig').css('opacity',1);
                    $('.screen-halo').hide();
                    $('.heater_score').fadeIn(1500);
                    $('.heater_score').delay(4500).fadeOut(1000);
                    if(water_drop.is(':hidden')){
                        $('.page4 .button').delay(3500).fadeIn(1500);
                        $('.page4 .button').click(function () {
                            window.share(shareData);
                            audioClick.play();
                            $('.page4').delay(1000).fadeOut('slow');
                            $('.page5').delay(1500).fadeIn('slow');
                            $('.page5 .eleventh').fadeIn();
                            $('.eleventh').delay(8000).fadeOut(1000);
                        });
                    }
                });
            }
        } else {
            the_outlet.css('left', elementLeft);
            the_outlet.css('top', elementTop);
        }
    })

    function pinchinImg(dragImg) {
        dragImg.css("transformOrigin", "scale(1,1)");
        dragImg.css("transform", "scale(1,1) translate(0px,0px)");
        dragImg.attr("data-x", 0);
        dragImg.attr("data-y", 0);
        dragImg.attr("data-scale", 1);
    }

    function pinchoutImg(dragImg, ev) {
        var scale = 2;
        var mouseX = ev.center.x;//捏开点
        var mouseY = ev.center.y;
        if (dragImg.attr("data-scale") == 1) {
            var translateX = 0;
            var translateY = 0;
            //计算当前点击点相对于图片的偏移比例
            var posX = mouseX / img_width;
            var posY = mouseY / img_height;
            translateX = (img_width * posX / scale) * -1;
            translateY = (img_height * posY / scale) * -1;

            dragImg.css("transformOrigin", "0% 0%");
            dragImg.css("transform", "scale(2,2) translate(" + translateX + "px, " + translateY + "px)");
            dragImg.attr("data-x", translateX);
            dragImg.attr("data-y", translateY);
            dragImg.attr("data-scale", 2);
        }
    }

//page5 楼梯与电梯
    var hammerPage5 = new Hammer(dragImgPage5[0], {
        recognizers: [
            [Hammer.Pan],
            [Hammer.Pinch, {
                enable: true
            }]
        ]
    });

    hammerPage5.on('panstart', function (ev) {
        page5BgLeft = parseInt($('#page5').css('left'), 10);
    });
    hammerPage5.on('pan', function (ev) {
        var delta = page5BgLeft + ev.deltaX;
        if (delta >= (img_left) && delta <= 0) {
            $('#page5').css('left', delta);
        }
    });
    hammerPage5.on('pinchin', function (ev) {
        pinchinImg(dragImgPage5);
    });
    hammerPage5.on('pinchout', function (ev) {
        pinchoutImg(dragImgPage5, ev);
    });

    $('#page5 .next').click(function () {
        audioClick.play();
        $('#page5 .next').unbind('click');
        scoreCal($(this).attr('data-score'), $(this).attr('data-weight'));
        var option = $(this).attr('data-meta');
        $('.' + option + '_score').fadeIn(1500);
        $('.' + option + '_score').delay(4500).fadeOut(1000);
        $('.page5').delay(5500).fadeOut('slow');
        $('.page6').delay(150).fadeIn('slow');
        $('.page6').find('.fifth').delay(2500).fadeIn();
        var data = calculateScore();
        var shareData = {
            title: window.title,
            desc: '我今天减排'+data['weight']+'kgCO₂，向中国绿化基金会捐出了0.15元！快和我一起为地球添点绿色吧！',
            link: window.link,
            imgUrl: window.imgUrl
        };
        window.share(shareData);
        $('.fifth').delay(6000).fadeOut(1500);
    });

//page6
    var hammerPage6 = new Hammer(dragImgPage6[0], {
        recognizers: [
            [Hammer.Pan],
            [Hammer.Pinch, {
                enable: true
            }]
        ]
    });

    hammerPage6.on('panstart', function (ev) {
        page6BgLeft = parseInt($('#page6').css('left'), 10);
    });
    hammerPage6.on('pan', function (ev) {
        var delta = page6BgLeft + ev.deltaX;
        if (delta >= (img_left) && delta <= 0) {
            $('#page6').css('left', delta);
        }
    });
    hammerPage6.on('pinchin', function (ev) {
        pinchinImg(dragImgPage6);
    });
    hammerPage6.on('pinchout', function (ev) {
        pinchoutImg(dragImgPage6, ev);
    });

    $('#page6 .next').click(function () {
        audioClick.play();
        var delaySecond = 0;
        var newdelaySecond = 0;
        $('#page6 .next').unbind('click');
        console.log($(this));
        if ($(this).attr('data-meta') != 'car') {
            delaySecond = 3000;
            newdelaySecond = 3150;
            scoreCal($(this).attr('data-score'), $(this).attr('data-weight'));
            var option = $(this).attr('data-meta');
            $('.' + option + '_score').fadeIn(1500);
            $('.' + option + '_score').delay(4000).fadeOut(5000);
        } else {
            delaySecond = 600;
            newdelaySecond = 800;
        }
        var data = calculateScore();
        var shareData = {
            title: window.title,
            desc: '我今天减排'+data['weight']+'kgCO₂，向中国绿化基金会捐出了0.15元！快和我一起为地球添点绿色吧！',
            link: window.link,
            imgUrl: window.imgUrl
        };
        window.share(shareData);
        $(this).parents('div.page').delay(delaySecond).fadeOut('slow');
        if(today > '20170424'){
            $('.share_text').fadeIn('slow');
            $('.black_bg').click(function () {
                if($('.black_bg').is(':visible')){
                    $('.share_text').hide();
                }
            });
        }
        $(this).parents('div.page').next('div.page').delay(newdelaySecond).fadeIn('slow');

        scoreResult = calculateScore();
        if (scoreResult) {
            $('.sixth p span#weight_total').text(scoreResult['weight'].toFixed(2));
            $('.sixth p span#score_total').text(scoreResult['score']);
        }
        $('.sixth').fadeIn();
    });
    function month(month) {
        if(month < 10){
            month = '0'+month;
        }
        return month;

    }

})
