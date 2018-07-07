let canvas, ctx, width, height;
document.addEventListener("DOMContentLoaded", e => {
    canvas = document.querySelector('[data-canvas]');
    ctx = canvas.getContext("2d");
    let image = new Image();
    image.src = "images/image4.jpg";
    image.onload = () => {
        canvas.width = width = image.width;
        canvas.height = height = image.height;

        ctx.drawImage(image, 0, 0);

        let palette = new Palette(ctx);
        let pixels = palette.generate(3);
        console.log(pixels.length);

        let y = 0;
        let x = 0;
        for (let i = 0, len = pixels.length; i < len; i += 4) {
            ctx.fillStyle = `rgb(${pixels[i]},${pixels[i+1]},${pixels[i+2]})`;
            ctx.fillRect(x, y, 1, 1);


            x++;
            if (x >= width) {
                y++;
                x = 0;
            }
        }



        //ctx.putImageData(pixels, 0, 0, 0, 0, width, height);
    }

});