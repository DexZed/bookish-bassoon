import type { ISprite } from "./ISprite";

export class Sprite {
  position: ISprite["position"];
  velocity: ISprite["velocity"];
  ctx: ISprite["ctx"] = null;
  constructor({ position, velocity }: ISprite) {
    this.position = position;
    this.velocity = velocity;
  }
  draw(ctx: CanvasRenderingContext2D | null) {
    if (!ctx) {
      throw new Error("Canvas context is possibly null");
    }
    ctx.fillStyle = "red";
    ctx?.fillRect(this.position.x, this.position.y, 50, 150);
  }
  update() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}
