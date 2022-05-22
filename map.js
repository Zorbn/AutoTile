'use strict';

export default class Map {
    constructor(width, height, tileSize, subTileSize) {
        this.width = width;
        this.height = height;

        this.tileSize = tileSize;
        this.subTileSize = subTileSize;

        this.subTilesPerTex = { x: 5, y: 3 };

        this.tiles = new Array(this.width);
        for (let x = 0; x < this.width; x++) {
            this.tiles[x] = new Array(this.height);
        }
    }

    getTile(x, y) {
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
            return 0;
        }

        return this.tiles[x][y];
    }

    sameTile(x, y, type) {
        return this.getTile(x, y) == type;
    }

    generateMap() {
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.width; y++) {
                this.tiles[x][y] = Math.random() >= 0.4;
            }
        }
    }

    getTileTexOffset(tilesImg, type) {
        let tileTexWidth = this.subTileSize * this.subTilesPerTex.x,
            tileTexturesPerRow = Math.floor(tilesImg.width / tileTexWidth);

        let x = type % tileTexturesPerRow * this.subTilesPerTex.x,
            y = Math.floor(type / tileTexturesPerRow) * this.subTilesPerTex.y;

        return { x, y };
    }

    drawMap(ctx, tilesImg) {
        let drawSubTile = (ctx, tilesImg, x, y, i) => {
            let type = this.getTile(x, y);
            let texOffset = this.getTileTexOffset(tilesImg, type);

            let xOffset = texOffset.x + 1,
                yOffset = texOffset.y + 1;

            let horSide = i % 2, // 0 = left, 1 = right
                verSide = i > 1; // 0 = top,  1 = bottom

            let xSubTileOffset = horSide * this.subTileSize,
                ySubTileOffset = verSide * this.subTileSize;

            let horStep = horSide * 2 - 1,
                verStep = verSide * 2 - 1;

            // Auto-tile
            if (!this.sameTile(x, y + verStep, type)) {
                yOffset += verStep;
            }

            if (!this.sameTile(x + horStep, y, type)) {
                xOffset += horStep;
            }

            if (this.sameTile(x, y + verStep, type) &&
                this.sameTile(x + horStep, y, type) &&
                !this.sameTile(x + horStep, y + verStep, type)) {
                xOffset = texOffset.x + 4 - horSide;
                yOffset = texOffset.y + !verSide;
            }

            ctx.drawImage(tilesImg,
                xOffset * this.subTileSize,
                yOffset * this.subTileSize,
                this.subTileSize, this.subTileSize,
                this.tileSize * x + xSubTileOffset,
                this.tileSize * y + ySubTileOffset,
                this.subTileSize, this.subTileSize);
        }

        let drawTile = (ctx, tilesImg, x, y) => {
            for (let i = 0; i < 4; i++) {
                drawSubTile(ctx, tilesImg, x, y, i);
            }
        }

        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                drawTile(ctx, tilesImg, x, y);
            }
        }
    }
}