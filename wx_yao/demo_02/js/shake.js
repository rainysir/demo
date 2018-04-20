//摇一摇部分
        var SHAKE_THRESHOLD = 1000;
        var last_update = 0;
        var last_time = 0;
        var x;
        var y;
        var z;
        var last_x;
        var last_y;
        var last_z;
        var sound = new Howl({ urls: ['/shake/sound/shake_sound.mp3'] }).load();
        var findsound = new Howl({ urls: ['/shake/sound/shake_match.mp3'] }).load();
        var curTime;
        var isShakeble = true; 

        function init() {
            if (window.DeviceMotionEvent) {
                window.addEventListener('devicemotion', deviceMotionHandler, false);
            } else {
                $("#cantshake").show();
            }
        }

        function deviceMotionHandler(eventData) {
            curTime = new Date().getTime();
            var diffTime = curTime - last_update;
            if (diffTime > 100) {
                var acceleration = eventData.accelerationIncludingGravity;
                last_update = curTime;
                x = acceleration.x;
                y = acceleration.y;
                z = acceleration.z;
                var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;

                if (speed > SHAKE_THRESHOLD && curTime - last_time > 1100 && $("#loading").attr('class') == "loading" && isShakeble) {
                    shake();
                }
                last_x = x;
                last_y = y;
                last_z = z;
            }
        }

        function shake() {
            last_time = curTime;
            $("#loading").attr('class','loading loading-show');

            $("#shakeup").animate({ top: "10%" }, 700, function () {
                $("#shakeup").animate({ top: "25%" }, 700, function () {
                    $("#loading").attr('class','loading');
                    
                    findsound.play();
                    myDialog.alert('恭喜你，中奖了');
                });
            });
            $("#shakedown").animate({ top: "40%" }, 700, function () {
                $("#shakedown").animate({ top: "25%" }, 700, function () {
                });
            });
            sound.play();
        }
		
		//各种初始化
        $(document).ready(function () {
            Howler.iOSAutoEnable = false;
            FastClick.attach(document.body);
            init();
        });
		