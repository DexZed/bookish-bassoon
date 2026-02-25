import { useEffect, useRef } from "react";
import { Sprite } from "./Sprite";
import { Game } from "./Game";


const player = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  ctx: null,
})

const enemy = new Sprite({
  position: {
    x: 400,
    y: 100,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  ctx: null,
})

function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const game = new Game(canvas,[player,enemy])
    game.start()
    return () => {
      game.stop()
    }
  }, []);

  return (
    <>
      <canvas ref={canvasRef} width={1024} height={576}></canvas>
    </>
  );
}

export default App;



