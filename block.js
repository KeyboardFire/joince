joince.block = {
    blocks: [],
    FRICTION: 0.99,
    init: function() {
        var r = function(x) { return Math.random() * x | 0; };
        for (var i = 0; i < 1; ++i) {
            var b = {
                w: r(scale(50))+scale(100),
                h: r(scale(50))+scale(100),
                r: Math.random() * Math.PI,
                color: 'rgb(' + [r(255),r(255),r(255)] + ')',
                dx: 0, dy: 0, dr: 0, dt: 0
            };
            b.x = r(joince.w - b.w); b.y = r(joince.h - b.h);
            joince.block.blocks.push(b);
        }
    }, update: function() {
        for (var i = 0; i < joince.block.blocks.length; ++i) {
            var b = joince.block.blocks[i];

            if (joince.sprite.collideRot(joince.player, b)) {
                joince.player.w = 0;
            }

            b.x += b.dx; b.y += b.dy; b.r += b.dr;
            joince.sprite.keepInBounds(b, true);
            joince.sprite.draw(b);

            if (Math.random() < 0.005) b.dt = 40;
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

            var r = function(x) { return Math.random() * x | 0; };
            if (Math.random() < 0.0005) {
                joince.block.blocks.splice(i--, 1);
                for (var i = 0; i < 4; ++i) {
                    joince.block.blocks.push(clone(b, {
                        x: b.x + Math.random() * b.w - b.w/2,
                        y: b.y + Math.random() * b.h - b.h/2,
                        w: b.w / 2, h: b.h / 2,
                        color: 'rgb(' + [r(255),r(255),r(255)] + ')'
                    }));
                }
            }

            b.dx *= joince.block.FRICTION;
            b.dy *= joince.block.FRICTION;
            b.dr *= joince.block.FRICTION;
        }
    }
};
