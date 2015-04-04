var joince = {
    cnv: null, ctx: null,
    w: window.innerWidth, h: window.innerHeight,
    player: {
        x: 0, y: 0, w: util.scale(25), h: util.scale(25), r: 0, color: 'red',
        SPEED: util.scale(4)
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

        joince.sprite.keepInBounds(joince.player);
        joince.sprite.draw(joince.player);
    }, 20);
});
