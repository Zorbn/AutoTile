'use strict';

import Map from "./map.js"

const scale = 2;
let canvas, ctx, tilesImg;
let map = new Map(100, 100, 16, 8);

let start = () => {
    canvas = document.getElementById("view");
    ctx = canvas.getContext("2d");
    resize();

    tilesImg = new Image;
    tilesImg.src = "tiles.png";

    map.generateMap();
};

let lastTime = 0;

let update = (time) => {
    // let deltaTime = time - lastTime;
    lastTime = time;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    map.drawMap(ctx, tilesImg);

    window.requestAnimationFrame(update);
};

window.onload = () => {
    start();
    window.requestAnimationFrame(update);
};

let resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.scale(scale, scale);
    ctx.imageSmoothingEnabled = false;
};

window.onresize = resize;