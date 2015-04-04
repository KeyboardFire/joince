var joince = {
    cnv: null, ctx: null,
    w: window.innerWidth, h: window.innerHeight,
    player: {
        x: 0, y: 0, w: util.scale(25), h: util.scale(25), r: 0, color: 'red',
        dx: 0, dy: 0, dr: 0, friction: 0.8, SPEED: util.scale(3)
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

    joince.arrowkeys.init();
    joince.joystick.init();
    joince.block.init();

    setInterval(function() {
        joince.ctx.clearRect(0, 0, joince.w, joince.h);

        joince.arrowkeys.update();
        joince.joystick.update();
        joince.block.update();

        joince.sprite.update(joince.player, true);
    }, 20);
});
