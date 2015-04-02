joince.arrowkeys = {
    pressed: { left: false, up: false, right: false, down: false },
    update: function(e, pressed) {
        if (e) {
            e.preventDefault();
            switch (e.keyCode) {
            case 37: joince.arrowkeys.pressed.left = pressed; break;
            case 38: joince.arrowkeys.pressed.up = pressed; break;
            case 39: joince.arrowkeys.pressed.right = pressed; break;
            case 40: joince.arrowkeys.pressed.down = pressed; break;
            }
        } else {
            joince.player.r += (joince.arrowkeys.pressed.left ? -0.2 : 0) +
                               (joince.arrowkeys.pressed.right ? 0.2 : 0);
            var mult = joince.arrowkeys.pressed.up ? 1 : joince.arrowkeys.pressed.down ? -1 : 0;
            joince.player.x += Math.cos(joince.player.r) * joince.consts.SPEED * mult;
            joince.player.y += Math.sin(joince.player.r) * joince.consts.SPEED * mult;
        }
    }, addListeners: function() {
        var keyListen = function(pressed) {
            return function(e) { joince.arrowkeys.update(e, pressed); };
        };
        window.addEventListener('keydown', keyListen(true));
        window.addEventListener('keyup', keyListen(false));
    }
};
