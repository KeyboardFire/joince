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
    player: { x: 0, y: 0, w: scale(25), h: scale(25), r: 0, color: 'red' },
    move: { left: false, up: false, right: false, down: false },
    blocks: [],
    consts: { SPEED: scale(4), joystick: { NUB_RADIUS: scale(12), OUTER_RADIUS: scale(36) } },
    joystick: {
        create: function(pos) {
            joince.joystick.nub = joince.joystick.pos = pos;
        }, destroy: function() {
            joince.joystick.nub = joince.joystick.pos = null;
            joince.move.left = joince.move.right = joince.move.up = joince.move.down = false;
        }, update: function(pos) {
            var dx, dy; // because jshint is idiotic
            if (pos) {
                joince.joystick.nub = pos;

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
        }, nub: null, pos: null
    }
};

window.addEventListener('load', function() {
    joince.cnv = document.getElementById('cnv');
    joince.cnv.width = joince.w;
    joince.cnv.height = joince.h;
    joince.cnv.style.position = 'absolute';
    joince.cnv.style.top = '0px';
    joince.cnv.style.left = '0px';
    joince.ctx = joince.cnv.getContext('2d');

    for (var i = 0; i < 10; ++i) {
        var r = function(x) { return Math.random() * x | 0; };
        var b = {
            w: r(scale(50)+5), h: r(scale(50)+5), r: 0,
            color: 'rgb(' + [r(255),r(255),r(255)] + ')'
        };
        b.x = r(joince.w - b.w); b.y = r(joince.h - b.h);
        joince.blocks.push(b);
    }

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
                joince.joystick.update(getClickPos(e));
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

        joince.player.r += (joince.move.left ? -0.2 : 0) + (joince.move.right ? 0.2 : 0);
        var mult = joince.move.up ? 1 : joince.move.down ? -1 : 0;
        joince.player.x += Math.cos(joince.player.r) * joince.consts.SPEED * mult;
        joince.player.y += Math.sin(joince.player.r) * joince.consts.SPEED * mult;

        joince.joystick.update();

        for (var i = 0; i < joince.blocks.length; ++i) {
            var b = draw(joince.blocks[i]);
            if (collide(joince.player, b)) {
                joince.player.w = 0;
            }
        }

        if (joince.player.x < 0) joince.player.x = 0;
        if (joince.player.y < 0) joince.player.y = 0;
        if (joince.player.x + joince.player.w > joince.w) joince.player.x = joince.w - joince.player.w;
        if (joince.player.y + joince.player.h > joince.h) joince.player.y = joince.h - joince.player.h;

        draw(joince.player);
    }, 20);
});

function collide(a, b) {
    return a.x + a.w > b.x && a.x < b.x + b.w && a.y + a.h > b.y && a.y < b.y + b.h;
}

function draw(x) {
    joince.ctx.fillStyle = x.color;

    joince.ctx.translate(x.x + x.w/2, x.y + x.h/2);
    joince.ctx.rotate(x.r);
    joince.ctx.fillRect(-x.w/2, -x.h/2, x.w, x.h);
    joince.ctx.rotate(-x.r);
    joince.ctx.translate(-x.x - x.w/2, -x.y - x.h/2);

    return x;
}
