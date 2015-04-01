var joince = {
    cnv: null, ctx: null,
    pos: { x: 0, y: 0 },
    move: { left: false, up: false, right: false, down: false },
    consts: { SPEED: 3 }
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

    setInterval(function() {
        joince.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

        joince.pos.x += (joince.move.left ? -joince.consts.SPEED : 0)
                      + (joince.move.right ? joince.consts.SPEED : 0);
        joince.pos.y += (joince.move.up ? -joince.consts.SPEED : 0)
                      + (joince.move.down ? joince.consts.SPEED : 0);

        joince.ctx.fillRect(joince.pos.x, joince.pos.y, 10, 10);
    }, 20);
});
