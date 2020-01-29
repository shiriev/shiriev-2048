import Direction from "./Direction";
import { useEffect } from "react";

export function useKeyboardArrows(callback: (direction: Direction) => void): void {
    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            let direction;
            switch (e.key){
                case "ArrowUp": direction = Direction.Up; break;
                case "ArrowDown": direction = Direction.Down; break;
                case "ArrowLeft": direction = Direction.Left; break;
                case "ArrowRight": direction = Direction.Right; break;
                default: return;
            };
            callback(direction);
        };
        document.addEventListener("keydown", onKeyDown, false);
        return () => document.removeEventListener("keydown", onKeyDown, false); 
    }, [callback]);
}