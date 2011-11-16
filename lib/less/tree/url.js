(function (tree) {

tree.URL = function (val, paths) {
    if (val.data) {
        this.attrs = val;
    } else {
        this.value = val;
        this.paths = paths;
    }
};
tree.URL.prototype = {
    toCSS: function () {
        return "url(" + (this.attrs ? 'data:' + this.attrs.mime + this.attrs.charset + this.attrs.base64 + this.attrs.data
                                    : this.value.toCSS()) + ")";
    },
    eval: function (ctx) {
        if(this.attrs) {
            return this;
        } else {
            var val = this.value.eval(ctx);
            // Add the base path if the URL is relative and we are in the browser
            if (!/^(?:https?:\/\/|file:\/\/|data:)?/.test(val.value) && this.paths.length > 0 && typeof(window) !== 'undefined') {
                val = paths[0] + val;
            }

            return new(tree.URL)(val, this.paths);
        }
    }
};

})(require('../tree'));
