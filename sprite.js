joince.sprite = {
    collide: function(a, b) {
        return a.x + a.w > b.x && a.x < b.x + b.w && a.y + a.h > b.y && a.y < b.y + b.h;
    }, keepInBounds: function(x) {
        if (x.x < 0) x.x = 0;
        if (x.y < 0) x.y = 0;
        if (x.x + x.w > joince.w) x.x = joince.w - x.w;
        if (x.y + x.h > joince.h) x.y = joince.h - x.h;
    }, draw: function(x) {
        joince.ctx.fillStyle = x.color;

        joince.ctx.translate(x.x + x.w/2, x.y + x.h/2);
        joince.ctx.rotate(x.r);
        joince.ctx.fillRect(-x.w/2, -x.h/2, x.w, x.h);
        joince.ctx.rotate(-x.r);
        joince.ctx.translate(-x.x - x.w/2, -x.y - x.h/2);

        return x;
    }
};
