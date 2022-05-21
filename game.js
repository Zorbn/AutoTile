'use strict';

import Map from "./map.js"

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

window.onload = start;

let lastTime = 0;

let update = (time) => {
    // let deltaTime = time - lastTime;
    lastTime = time;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    map.drawMap(ctx, tilesImg);

    window.requestAnimationFrame(update);
};

window.requestAnimationFrame(update);

let resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.imageSmoothingEnabled = false;
};

window.onresize = resize;