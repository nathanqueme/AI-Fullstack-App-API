/**
 * DecoCircle.tsx
 * version 1.0.0
 * 
 * Created on the 09/03/2023
 */

interface DecoCircleProps {
    color: string
    top: string
    left: string
    size: string
}
export function DecoCircle({ color, top, left, size }: DecoCircleProps) {
    return (
        <div
            style={{
                backgroundColor: color,
                width: size,
                height: size,
                borderRadius: '50%',
                position: 'absolute',
                top,
                left,
            }}
        />
    );
}