// TODO put this some place better
function scale(x) {
    return ((window.innerWidth + window.innerHeight) / 2) * (x / 1000);
}
function clone(x, merge) {
    var y = {};
    for (z in x) y[z] = x[z];
    if (merge) for (z in merge) y[z] = merge[z];
    return y;
}

var joince = {
    cnv: null, ctx: null,
    w: window.innerWidth, h: window.innerHeight,
    player: { x: 0, y: 0, w: scale(25), h: scale(25), r: 0, color: 'red' },
    blocks: [],
    consts: { SPEED: scale(4), FRICTION: 0.99, joystick: { NUB_RADIUS: scale(12), OUTER_RADIUS: scale(36) } }
};

window.addEventListener('load', function() {
    joince.cnv = document.getElementById('cnv');
    joince.cnv.width = joince.w;
    joince.cnv.height = joince.h;
    joince.cnv.style.position = 'absolute';
    joince.cnv.style.top = '0px';
    joince.cnv.style.left = '0px';
    joince.ctx = joince.cnv.getContext('2d');

    joince.arrowkeys.init();
    joince.joystick.init();
    joince.block.init();

    setInterval(function() {
        joince.ctx.clearRect(0, 0, joince.w, joince.h);

        joince.arrowkeys.update();
        joince.joystick.update();
        joince.block.update();

        joince.sprite.keepInBounds(joince.player);
        joince.sprite.draw(joince.player);
    }, 20);
});
