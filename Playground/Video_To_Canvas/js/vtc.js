let canvas, ctx, video;
let cw, ch;
let mode = "lumi";
document.addEventListener("DOMContentLoaded", e => {
    canvas = document.querySelector('[data-canvas]');
    ctx = canvas.getContext("2d");

    canvas.width = cw = 1280;
    canvas.height = ch = 720;

    let video = document.createElement("video");
    video.src = "videos/video1.mp4";
    video.loop = true;
    video.autoplay = true;

    video.addEventListener('play', function () {
        draw(this, ctx, cw, ch);
    }, false);
    let modeSelect = document.querySelector('[data-mode]');
    modeSelect.addEventListener('change', () => {
        mode = modeSelect.value;
    });
});

function draw(v, c, w, h) {
    if (v.paused || v.ended) return false;
    c.drawImage(v, 0, 0, w, h);

    let pixels = ctx.getImageData(0, 0, w, h);

    switch (mode) {
        case "lumi":
            {
                ctx.putImageData(lumiFilter(pixels, 100), 0, 0, 0, 0, w, h);
                break;
            }
        case "negative":
            {
                ctx.putImageData(negativeFilter(pixels), 0, 0, 0, 0, w, h);
                break;
            }
        case "bwl":
            {
                ctx.putImageData(bwlFilter(pixels), 0, 0, 0, 0, w, h);
                break;
            }
        case "bwd":
            {
                ctx.putImageData(bwdFilter(pixels), 0, 0, 0, 0, w, h);
                break;
            }
        case "rotatergb":
            {
                ctx.putImageData(rotateRGB(pixels), 0, 0, 0, 0, w, h);
                break;
            }

    }

    setTimeout(draw, 20, v, c, w, h);
}