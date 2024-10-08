/**
 * DecoTriangle.tsx
 * version 1.0.0
 * 
 * Created on the 09/03/2023
 */

interface DecoTriangleProps {
    size: string
    color: string
    top: string
    left: string 
    rotation?: number
}
export function DecoTriangle({ size = "30", color, rotation, top, left }: DecoTriangleProps) {
    return (
        <div
            style={{
                borderStyle: 'solid',
                borderWidth: `0px 0px ${size} ${size}`,
                borderColor: `transparent transparent ${color} transparent`,
                transform: `rotate(${rotation}deg)`,
                height: 0,
                width: 0,
                position: "absolute",
                top,
                left,
            }}
        />
    );
}
