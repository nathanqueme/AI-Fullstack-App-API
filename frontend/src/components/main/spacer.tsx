/**
 * Spacer.tsx
 * version 1.0.0
 * 
 * Created on the 24/02/2023
 */

import CONSTANTS from '../../utils/main/constants'

interface SpacerInterface {
  paddingSize?: "inner_small" | "inner" | "outer" | "header"
  customSize?: number
}

/**
 * @param paddingSize : defines Spacers' height.
 * - inner_size: 18px
 * - outer_size: 35px
 */
export function Spacer({ paddingSize = "inner", customSize = 0 }: SpacerInterface) {
  const getSpaceSize = () => {
    if (((customSize ?? 0) !== 0)) return customSize
    switch (paddingSize) {
      case "inner_small": return CONSTANTS.UI.PADDING_INNER_SM
      case "inner" : return CONSTANTS.UI.PADDING_INNER
      // isMobile ?  CONSTANTS.ui.mobile_page_header_height :  CONSTANTS.ui.app_header_height
      case "header" : return  CONSTANTS.UI.HEADER_HEIGHT
      case "outer" : return CONSTANTS.UI.PADDING_OUTER
    }
  } 
  const size = getSpaceSize()
  return (
    <div style={{ height: size, width: size }}></div>
  )
}
