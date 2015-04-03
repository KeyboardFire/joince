joince.sprite = {
    // TODO kill this, rename collideRot (this is no longer in use)
    collide: function(a, b) {
        return a.x + a.w > b.x && a.x < b.x + b.w && a.y + a.h > b.y && a.y < b.y + b.h;
    }, collideRot: function(a, b) {
        var rotPoint = function(p, pivot, angle) {
            var s = Math.sin(-angle), c = Math.cos(-angle),
                dx = p.x - pivot.x, dy = p.y - pivot.y;
            return { x: -c * dx - s * dy + pivot.x, y: s * dx - c * dy + pivot.y };
        };
        var getPoints = function(rect) {
            var middle = { x: rect.x + rect.w/2, y: rect.y + rect.h/2 };
            var points = [
                { x: rect.x         , y: rect.y          },
                { x: rect.x + rect.w, y: rect.y          },
                { x: rect.x + rect.w, y: rect.y + rect.h },
                { x: rect.x         , y: rect.y + rect.h },
            ];
            for (var i = 0; i < points.length; ++i) {
                points[i] = rotPoint(points[i], middle, rect.r);
            }
            return points;
        };
        var getMinMax = function(x, norm) {
            var min, max;
            for (var i = 0; i < x.length; ++i) {
                var proj = norm.x * x[i].x + norm.y * x[i].y;
                if (min === undefined || proj < min) min = proj;
                if (max === undefined || proj > max) max = proj;
            }
            return { min: min, max: max };
        };
        var checkRect = function(rect) {
            for (var i = 0; i < rect.length; ++i) {
                var p1 = rect[i], p2 = rect[(i+1) % rect.length],
                    norm = { x: p2.y - p1.y, y: p1.x - p2.x },
                    mmA = getMinMax(ap, norm), mmB = getMinMax(bp, norm);
                if (mmA.max < mmB.min || mmB.max < mmA.min) return true;
            }
        };

        var ap = getPoints(a), bp = getPoints(b);
        if (checkRect(ap)) return false;
        if (checkRect(bp)) return false;
        return true;
    }, keepInBounds: function(x, bounce) {
        var mx = false, my = false;
        if (x.x < 0) x.x = 0, mx = true;
        if (x.y < 0) x.y = 0, my = true;
        if (x.x + x.w > joince.w) x.x = joince.w - x.w, mx = true;
        if (x.y + x.h > joince.h) x.y = joince.h - x.h, my = true;
        if (bounce && mx) x.dx = -x.dx;
        if (bounce && my) x.dy = -x.dy;
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
