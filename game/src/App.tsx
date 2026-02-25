import { useEffect, useRef } from "react";
import { Sprite } from "./Sprite";
import { Game } from "./Game";

function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Sprite objects
    const player = new Sprite({
      position: {
        x: 0,
        y: 0,
      },
      velocity: {
        x: 0,
        y: 5,
      },
      ctx: null,
    });

    const enemy = new Sprite({
      position: {
        x: 400,
        y: 100,
      },
      velocity: {
        x: 0,
        y: 5,
      },
      ctx: null,
    });

    // Canvas reference
    const canvas = canvasRef.current;
    if (!canvas) return;

     // Game object
    const game = new Game(canvas, [player, enemy]);
    game.start();
    return () => {
      game.stop();
    };
  }, []);

  return (
    <>
      <section className="max-w-screen mx-auto min-h-screen bg-white-500">
        <canvas
          ref={canvasRef}
          width={1024}
          height={576}
          className="bg-black border-2 border-purple-500 rounded-lg"
        ></canvas>
      </section>
    </>
  );
}

export default App;
