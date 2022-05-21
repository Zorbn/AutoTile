'use strict';

const scale = 2;

export let draw = (ctx, img, x, y) => {
    ctx.drawImage(img, x * scale, y * scale,
        img.width * scale, img.height * scale);
};

export let drawSized = (ctx, img, x, y, width, height) => {
    ctx.drawImage(img, x * scale, y * scale,
        width * scale, height * scale);
};

export let drawSliced = (ctx, img, sx, sy, swidth, sheight, x, y, width, height) => {
    ctx.drawImage(img, sx, sy, swidth, sheight,
        x * scale, y * scale, width * scale, height * scale);
};