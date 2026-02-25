import type { ISprite } from "./ISprite";

const GRAVITY = 0.5;

export class Sprite {
  position: ISprite["position"];
  velocity: ISprite["velocity"];
  height: number = 150;
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
    ctx?.fillRect(this.position.x, this.position.y, 50, this.height);
  }
  update() {
    this.draw(this.ctx);
    
    this.position.y += this.velocity.y;
    if(this.position.y + this.height + this.velocity.y >= this.ctx!.canvas.height) 
    {
      this.velocity.y = 0;
    } else {
      this.velocity.y += GRAVITY;
    }
  }
}
