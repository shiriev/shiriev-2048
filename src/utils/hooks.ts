import Direction from '../models/Direction';
import { useEffect } from 'react';

export const useMovementControl = (callback: (direction: Direction) => void, elementRef: React.MutableRefObject<HTMLElement | null>): void => {
    useKeyboardArrows(callback);
    useSwipeOnElement(callback, elementRef);
}

export const useKeyboardArrows = (callback: (direction: Direction) => void): void => {
    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            let direction;
            switch (e.key){
                case 'ArrowUp': direction = Direction.Up; break;
                case 'ArrowDown': direction = Direction.Down; break;
                case 'ArrowLeft': direction = Direction.Left; break;
                case 'ArrowRight': direction = Direction.Right; break;
                default: return;
            };
            callback(direction);
        };
        document.addEventListener('keydown', onKeyDown, false);
        return () => document.removeEventListener('keydown', onKeyDown, false);
    }, [callback]);
}

export const useSwipeOnElement = (callback: (direction: Direction) => void, elementRef: React.MutableRefObject<HTMLElement | null>): void => {
    useEffect(() => {
        const element = elementRef.current;
        if (!element) {
            return;
        }
        
        let xDown: number | null = null;
        let yDown: number | null = null;

        const onTouchStart = (e: TouchEvent) => {
            xDown = e.touches[0].clientX;
            yDown = e.touches[0].clientY;
        };

        const onTouchMove = (e: TouchEvent) => {
            if (!xDown || !yDown) {
                return;
            }
            const xUp = e.touches[0].clientX;
            const yUp = e.touches[0].clientY;
            const xDiff = xDown - xUp;
            const yDiff = yDown - yUp;

            if (Math.abs(xDiff) > Math.abs(yDiff)) {
                if (xDiff > 0) {
                    callback(Direction.Left);
                } else {
                    callback(Direction.Right);
                }
            } else {
                if (yDiff > 0) {
                    callback(Direction.Up);
                } else {
                    callback(Direction.Down);
                }
            }

            xDown = null;
            yDown = null;
        };

        element.addEventListener('touchstart', onTouchStart, false);
        element.addEventListener('touchmove', onTouchMove, false);

        return () => {
            element.removeEventListener('touchstart', onTouchStart, false);
            element.removeEventListener('touchmove', onTouchMove, false);
        }
    }, [callback, elementRef]);
}
