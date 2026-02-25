export interface ISprite {
  position: {
    x: number;
    y: number;
  };
  velocity: {
    x: number;
    y: number;
  };
  ctx: CanvasRenderingContext2D | null;
}
