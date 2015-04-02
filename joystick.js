joince.joystick = {
    create: function(e) {
        e.preventDefault();
        joince.joystick.nub = joince.joystick.pos = getClickPos(e);
    }, destroy: function() {
        joince.joystick.nub = joince.joystick.pos = null;
    }, update: function(e) {
        var dx, dy; // because jshint is idiotic
        if (e) {
            e.preventDefault();
            joince.joystick.nub = getClickPos(e);

            var dx = joince.joystick.pos.x - joince.joystick.nub.x,
                dy = joince.joystick.pos.y - joince.joystick.nub.y;

            if (Math.sqrt(dx*dx + dy*dy) > joince.consts.joystick.OUTER_RADIUS) {
                var angle = Math.atan2(-dx, -dy);

                joince.joystick.nub = {
                    x: joince.joystick.pos.x + Math.sin(angle) * joince.consts.joystick.OUTER_RADIUS,
                    y: joince.joystick.pos.y + Math.cos(angle) * joince.consts.joystick.OUTER_RADIUS
                };
            }
        } else {
            if (joince.joystick.nub) {
                joince.ctx.fillStyle = joince.ctx.strokeStyle = 'black';

                joince.ctx.beginPath();
                joince.ctx.arc(joince.joystick.nub.x,
                               joince.joystick.nub.y,
                               joince.consts.joystick.NUB_RADIUS,
                               0, Math.PI*2);
                joince.ctx.fill();

                joince.ctx.beginPath();
                joince.ctx.arc(joince.joystick.pos.x,
                               joince.joystick.pos.y,
                               joince.consts.joystick.OUTER_RADIUS,
                               0, Math.PI*2);
                joince.ctx.stroke();

                var dx = joince.joystick.pos.x - joince.joystick.nub.x,
                    dy = joince.joystick.pos.y - joince.joystick.nub.y;

                if (Math.sqrt(dx*dx + dy*dy) > joince.consts.joystick.OUTER_RADIUS / 2) {
                    var angle = Math.atan2(-dy, -dx);

                    joince.player.r = angle;
                    joince.player.x += Math.cos(joince.player.r) * joince.consts.SPEED;
                    joince.player.y += Math.sin(joince.player.r) * joince.consts.SPEED;
                }
            }
        }
    }, addListeners: function() {
        var moveListener;
        var mouseListen = function(pressed, mouse) {
            return pressed ? function(e) {
                joince.joystick.create(e);
                window.addEventListener(mouse ? 'mousemove' : 'touchmove', moveListener = function(e) {
                    joince.joystick.update(e);
                });
            } : function(e) {
                joince.joystick.destroy();
                window.removeEventListener(mouse ? 'mousemove' : 'touchmove', moveListener);
            };
        };
        window.addEventListener('mousedown', mouseListen(true, true));
        window.addEventListener('touchstart', mouseListen(true, false));
        window.addEventListener('mouseup', mouseListen(false, true));
        window.addEventListener('touchend', mouseListen(false, false));
    }, nub: null, pos: null
};
