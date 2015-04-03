// TODO put this some place better
function scale(x) {
    return ((window.innerWidth + window.innerHeight) / 2) * (x / 1000);
}

var joince = {
    cnv: null, ctx: null,
    w: window.innerWidth, h: window.innerHeight,
    player: { x: 0, y: 0, w: scale(25), h: scale(25), r: 0, color: 'red' },
    blocks: [],
    consts: { SPEED: scale(4), joystick: { NUB_RADIUS: scale(12), OUTER_RADIUS: scale(36) } }
};

window.addEventListener('load', function() {
    joince.cnv = document.getElementById('cnv');
    joince.cnv.width = joince.w;
    joince.cnv.height = joince.h;
    joince.cnv.style.position = 'absolute';
    joince.cnv.style.top = '0px';
    joince.cnv.style.left = '0px';
    joince.ctx = joince.cnv.getContext('2d');

    var r = function(x) { return Math.random() * x | 0; };
    for (var i = 0; i < 10; ++i) {
        var b = {
            w: r(scale(50))+scale(25),
            h: r(scale(50))+scale(50),
            r: Math.random() * Math.PI,
            color: 'rgb(' + [r(255),r(255),r(255)] + ')',
            dx: 0, dy: 0, dr: 0, dt: 0
        };
        b.x = r(joince.w - b.w); b.y = r(joince.h - b.h);
        joince.blocks.push(b);
    }

    joince.arrowkeys.addListeners();
    joince.joystick.addListeners();

    setInterval(function() {
        joince.ctx.clearRect(0, 0, joince.w, joince.h);

        joince.arrowkeys.update();
        joince.joystick.update();

        for (var i = 0; i < joince.blocks.length; ++i) {
            var b = joince.sprite.draw(joince.blocks[i]);
            if (joince.sprite.collideRot(joince.player, b)) {
                joince.player.w = 0;
            }
            b.x += b.dx; b.y += b.dy; b.r += b.dr;
            if (Math.random() < 0.005) {
                b.dt = 40;
            }
            if (b.dt) {
                if (--b.dt) {
                    var b2 = {};
                    for (var x in b) b2[x] = b[x];
                    b2.color = 'rgba(255, 0, 0, ' + b.dt/30 + ')';
                    joince.sprite.draw(b2);
                } else {
                    b.dx += Math.random() * 12 - 6;
                    b.dy += Math.random() * 12 - 6;
                    b.dr = Math.random() * (Math.PI / 4) - Math.PI / 8;
                }
            }
            b.dx *= 0.99; b.dy *= 0.99; b.dr *= 0.99;
            joince.sprite.keepInBounds(b, true);
        }

        joince.sprite.keepInBounds(joince.player);
        joince.sprite.draw(joince.player);
    }, 20);
});
