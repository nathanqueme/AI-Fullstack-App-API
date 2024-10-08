/**
 * SafeAreaDiv.tsx
 * version 1.0.0
 * 
 * Created on the 25/02/2023
 */

import { COLORS } from '../../utils/main';
import { useSafeAreaInsets } from '../../utils/functions';


interface SafeAreaDivInterface {
    children: any
    backgroundColor?: string
    className?: string
}
export function SafeAreaDiv({ children, backgroundColor = COLORS.whiteToGray2,
    className }: SafeAreaDivInterface) {

    const insets = useSafeAreaInsets()
    const styles: {[key: string]: React.CSSProperties} = {
        box: {
            paddingBottom: insets.bottom,
            backgroundColor: backgroundColor
        }
    }
    return (
        <div
            className={'relative min-h-screen' + " " + className}
            style={styles.box}
        >
            {children}
        </div>
    )
}