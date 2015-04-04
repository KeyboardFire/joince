joince.block = {
    blocks: [],
    FRICTION: 0.99,
    init: function() {
        var r = function(x) { return Math.random() * x | 0; };
        for (var i = 0; i < 1; ++i) {
            var b = {
                w: r(util.scale(50))+util.scale(100),
                h: r(util.scale(50))+util.scale(100),
                r: Math.random() * Math.PI,
                color: 'rgb(' + [r(255),r(255),r(255)] + ')',
                dx: 0, dy: 0, dr: 0, dt: 0,
                friction: joince.block.FRICTION
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

            joince.sprite.update(b, true);

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
                    joince.block.blocks.push(util.clone(b, {
                        x: b.x + Math.random() * b.w - b.w/2,
                        y: b.y + Math.random() * b.h - b.h/2,
                        w: b.w / 2, h: b.h / 2,
                        color: 'rgb(' + [r(255),r(255),r(255)] + ')'
                    }));
                }
            }
        }
    }
};
