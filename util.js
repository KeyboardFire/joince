var util = {
    scale: function(x) {
        return ((window.innerWidth + window.innerHeight) / 2) * (x / 1000);
    }, clone: function(x, merge) {
        var y = {};
        for (var z in x) y[z] = x[z];
        if (merge) for (var z in merge) y[z] = merge[z];
        return y;
    }
};
