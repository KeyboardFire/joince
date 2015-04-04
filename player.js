joince.player = {
    x: 0, y: 0, w: util.scale(25), h: util.scale(25), r: 0, color: 'red',
    dx: 0, dy: 0, dr: 0, friction: 0.8, SPEED: util.scale(3),
    init: function() {},
    update: function() {
        joince.sprite.update(joince.player, true);
    }
};
