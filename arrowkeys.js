joince.arrowkeys = {
    pressed: { left: false, up: false, right: false, down: false },
    update: function(e, pressed) {
        if (e) {
            var prev = true;
            switch (e.keyCode) {
            case 37: joince.arrowkeys.pressed.left = pressed; break;
            case 38: joince.arrowkeys.pressed.up = pressed; break;
            case 39: joince.arrowkeys.pressed.right = pressed; break;
            case 40: joince.arrowkeys.pressed.down = pressed; break;
            default: prev = false;
            }
            if (prev) e.preventDefault();
        } else {
            joince.player.r += (joince.arrowkeys.pressed.left ? -0.2 : 0) +
                               (joince.arrowkeys.pressed.right ? 0.2 : 0);
            var mult = joince.arrowkeys.pressed.up ? 1 : joince.arrowkeys.pressed.down ? -1 : 0;
            joince.player.dx += Math.cos(joince.player.r) * joince.player.SPEED * mult;
            joince.player.dy += Math.sin(joince.player.r) * joince.player.SPEED * mult;
        }
    }, init: function() {
        var keyListen = function(pressed) {
            return function(e) { joince.arrowkeys.update(e, pressed); };
        };
        window.addEventListener('keydown', keyListen(true));
        window.addEventListener('keyup', keyListen(false));
    }
};
