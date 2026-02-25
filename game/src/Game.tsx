import type { Sprite } from "./Sprite";

export class Game {
  canvas: HTMLCanvasElement | null;
  ctx: CanvasRenderingContext2D | null;
  width: number;
  height: number;
  sprites: Sprite[];
  animationId: number | null = null;
  constructor(canvas: HTMLCanvasElement, sprites: Sprite[]) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.width = canvas.width;
    this.height = canvas.height;
    this.sprites = sprites;
    this.sprites.forEach((sprite) => {
      sprite.ctx = this.ctx;
    });
  }
  start() {
    const animate = () => {
      this.animationId = window.requestAnimationFrame(animate);
      if (!this.ctx) {
        throw new Error("Canvas context is possibly null");
      }
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.sprites.forEach((sprite) => {
        sprite.update();
      });
    };
    animate();
  }
  stop() {
    if (this.animationId) {
      window.cancelAnimationFrame(this.animationId);
    }
  }
}
