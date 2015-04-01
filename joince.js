// TODO put these some place better
function scale(x) {
    return ((window.innerWidth + window.innerHeight) / 2) * (x / 1000);
}
function getClickPos(e) {
    e = e.touches ? e.touches[0] : e;
    return { x: e.clientX, y: e.clientY };
}

var joince = {
    cnv: null, ctx: null,
    w: window.innerWidth, h: window.innerHeight,
    pos: { x: 0, y: 0 }, dim: { w: scale(25), h: scale(25) },
    move: { left: false, up: false, right: false, down: false },
    consts: { SPEED: scale(4), joystick: { NUB_RADIUS: scale(12), OUTER_RADIUS: scale(36) } },
    joystick: { create: joystickCreate, destroy: joystickDestroy, nub: null, pos: null }
}

window.addEventListener('load', function() {
    joince.cnv = document.getElementById('cnv');
    joince.cnv.width = joince.w;
    joince.cnv.height = joince.h;
    joince.cnv.style.position = 'absolute';
    joince.cnv.style.top = '0px';
    joince.cnv.style.left = '0px';
    joince.ctx = joince.cnv.getContext('2d');

    var keyListen = function(pressed) {
        return function(e) {
            e.preventDefault();
            switch (e.keyCode) {
            case 37: joince.move.left = pressed; break;
            case 38: joince.move.up = pressed; break;
            case 39: joince.move.right = pressed; break;
            case 40: joince.move.down = pressed; break;
            }
        };
    };
    window.addEventListener('keydown', keyListen(true));
    window.addEventListener('keyup', keyListen(false));

    var moveListener;
    var mouseListen = function(pressed, mouse) {
        return pressed ? function(e) {
            e.preventDefault();

            joince.joystick.create(getClickPos(e));
            window.addEventListener(mouse ? 'mousemove' : 'touchmove', moveListener = function(e) {
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

    setInterval(function() {
        joince.ctx.clearRect(0, 0, joince.w, joince.h);

        joince.pos.x += (joince.move.left ? -joince.consts.SPEED : 0)
                      + (joince.move.right ? joince.consts.SPEED : 0);
        joince.pos.y += (joince.move.up ? -joince.consts.SPEED : 0)
                      + (joince.move.down ? joince.consts.SPEED : 0);

        if (joince.joystick.nub) {
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

            if (Math.abs(dx) < joince.consts.joystick.OUTER_RADIUS / 2) {}
            else if (dx < 0) joince.pos.x += joince.consts.SPEED;
            else if (dx > 0) joince.pos.x -= joince.consts.SPEED;

            if (Math.abs(dy) < joince.consts.joystick.OUTER_RADIUS / 2) {}
            else if (dy < 0) joince.pos.y += joince.consts.SPEED;
            else if (dy > 0) joince.pos.y -= joince.consts.SPEED;
        }

        joince.ctx.fillRect(joince.pos.x, joince.pos.y, joince.dim.w, joince.dim.h);
    }, 20);
});

function joystickCreate(pos) { joince.joystick.nub = joince.joystick.pos = pos; }
function joystickDestroy() { joince.joystick.nub = joince.joystick.pos = null; }
