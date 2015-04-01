var joince = {
    cnv: null, ctx: null,
    pos: { x: 0, y: 0 },
    move: { left: false, up: false, right: false, down: false },
    consts: { SPEED: 3, joystick: { NUB_RADIUS: 5, OUTER_RADIUS: 15 } },
    joystick: { create: joystickCreate, destroy: joystickDestroy, nub: null, pos: null }
}

window.addEventListener('load', function() {
    joince.cnv = document.getElementById('cnv');
    joince.cnv.width = window.innerWidth;
    joince.cnv.height = window.innerHeight;
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
            joince.joystick.create({x: e.clientX, y: e.clientY});
            window.addEventListener(mouse ? 'mousemove' : 'touchmove', moveListener = function(e) {
                joince.joystick.nub = {x: e.clientX, y: e.clientY};
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
        joince.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

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
        }

        joince.ctx.fillRect(joince.pos.x, joince.pos.y, 10, 10);
    }, 20);
});

function joystickCreate(pos) { joince.joystick.nub = joince.joystick.pos = pos; }
function joystickDestroy() { joince.joystick.nub = joince.joystick.pos = null; }
