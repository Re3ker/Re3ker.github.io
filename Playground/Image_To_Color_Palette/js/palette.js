class Palette {
    constructor(ctx) {
        this.ctx = ctx;
        this.width = ctx.canvas.width;
        this.height = ctx.canvas.height;
        this.pixels = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
        this.chunks;
    }

    generate(colorCount) {
        let clean = this._clean();
        let sorted = this._sort(clean);
        let combined = this._combine(sorted);
        return combined;

    }

    _clean() {
        let cleanPix = new Array();
        for (let i = 0, len = this.pixels.data.length; i < len; i += 4) {
            let rgb = [this.pixels.data[i], this.pixels.data[i + 1], this.pixels.data[i + 2], this.pixels.data[i + 3]];
            cleanPix.push(rgb);
        }

        return cleanPix;
    }

    _chunk(count) {

    }

    _combine(arr) {
        let combined = new Array();
        for (let i = 0, len = arr.length; i < len; i++) {
            combined.push(arr[i][0]);
            combined.push(arr[i][1]);
            combined.push(arr[i][2]);
            combined.push(arr[i][3]);
        }

        return combined;
    }

    _sort(arr) {
        let sorted = arr.slice(0);
        sorted.sort((a, b) => {

            return (a[0] + a[1] + a[2]) - (b[0] + b[1] + b[2]);
            //return a - b;
        });

        return sorted;
    }
}