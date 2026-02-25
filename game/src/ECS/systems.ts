import type { Entity, Force, Position, Renderable, Velocity } from "./components";

export function gravitySystem(
    positions: Map<Entity, Position>,
    forces: Map<Entity, Force>,
    velocities: Map<Entity, Velocity>,
    canvasHeight: number
){
    for(const [entity,force] of forces){
        const position = positions.get(entity);
        const velocity = velocities.get(entity);
        if(!position || !velocity) continue;

        if(position.y + 150 + velocity.vy > canvasHeight)
            velocity.vy = 0;
        else
            velocity.vy += force.fy;
    }
}

export function movementSystem(
    positions: Map<Entity, Position>,
    velocities: Map<Entity, Velocity>
){
    for(const [entity,velocity] of velocities){
        const position = positions.get(entity);
        if(!position) continue;

        position.x += velocity.vx;
        position.y += velocity.vy;
    }
}

export function renderSystem(
    positions: Map<Entity, Position>,
    renderables: Map<Entity, Renderable>,
    canvas: CanvasRenderingContext2D | null
){
    for (const [entity, renderable] of renderables){
        const position = positions.get(entity);
        if(!position) continue;

        canvas!.fillStyle = renderable.color;
        canvas!.fillRect(position.x, position.y, renderable.width, renderable.height);
    }
}