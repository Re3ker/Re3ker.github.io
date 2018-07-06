function lumiFilter(pixels, threshold) {
    for (let i = 0, len = pixels.data.length; i < len; i += 4) {
        let r = pixels.data[i];
        let g = pixels.data[i + 1];
        let b = pixels.data[i + 2];
        let a = pixels.data[i + 3];
        let lumi = (0.299 * r + 0.587 * g + 0.114 * b);
        if (lumi < threshold) {
            pixels.data[i] = 0;
            pixels.data[i + 1] = 0;
            pixels.data[i + 2] = 0;
        } else {
            pixels.data[i] = 255;
            pixels.data[i + 1] = 255;
            pixels.data[i + 2] = 255;
        }
    }

    return pixels;
}

function negativeFilter(pixels) {
    for (let i = 0, len = pixels.data.length; i < len; i += 4) {
        pixels.data[i] = 255 - pixels.data[i];
        pixels.data[i + 1] = 255 - pixels.data[i + 1];
        pixels.data[i + 2] = 255 - pixels.data[i + 2];
    }

    return pixels;
}

function rotateRGB(pixels) {
    for (let i = 0, len = pixels.data.length; i < len; i += 4) {

        let r = pixels.data[i];
        let g = pixels.data[i + 1];
        let b = pixels.data[i + 2];

        pixels.data[i] = g;
        pixels.data[i + 1] = b;
        pixels.data[i + 2] = r;
    }

    return pixels;
}


// Black White Light Filter
function bwlFilter(pixels) {
    for (let i = 0, len = pixels.data.length; i < len; i += 4) {
        let max = Math.max(pixels.data[i], pixels.data[i + 1], pixels.data[i + 2]);
        pixels.data[i] = max;
        pixels.data[i + 1] = max;
        pixels.data[i + 2] = max;
    }

    return pixels;
}

// Black White Dark Filter
function bwdFilter(pixels) {
    for (let i = 0, len = pixels.data.length; i < len; i += 4) {
        let min = Math.min(pixels.data[i], pixels.data[i + 1], pixels.data[i + 2]);
        pixels.data[i] = min;
        pixels.data[i + 1] = min;
        pixels.data[i + 2] = min;
    }

    return pixels;
}