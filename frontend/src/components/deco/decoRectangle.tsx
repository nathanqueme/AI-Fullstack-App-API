/**
 * DecoRectangle.tsx
 * version 1.0.0
 * 
 * Created on the 09/03/2023
 */

interface DecoRectangleProps {
    top: string
    left: string
    width: string | number
    height: string | number
    color: string 
    rotation?: number
    borderRadius?: number
    borderAnimation?: "rectangle-to-circle" | "horizonzal-wave"
}
export function DecoRectangle({ height, width, rotation = 0, borderRadius = 0, borderAnimation, color, top, left }: DecoRectangleProps) {
    return (
        <div
            className={borderAnimation}
            style={{
                width,
                height,
                borderRadius: borderAnimation === "horizonzal-wave" ? 20 : borderRadius,
                backgroundColor: color,
                transform: `rotate(${rotation}deg)`,
                position: 'absolute',
                top,
                left,
            }}
        />
    );
}