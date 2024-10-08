import FileUploadIcon from '@mui/icons-material/FileUpload';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import CheckOutlined from '@mui/icons-material/CheckOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DownloadIcon from '@mui/icons-material/Download';
import RefreshIcon from '@mui/icons-material/Refresh';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import NorthEastIcon from '@mui/icons-material/NorthEast'
import WestIcon from '@mui/icons-material/West';
import PlayIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ExpandIcon from '@mui/icons-material/Expand';
import MinimizeIcon from '@mui/icons-material/Minimize';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CloseIcon from '@mui/icons-material/Close';
import { COLORS } from '../../utils/frontend';

export type IconName =
  "file-upload" |
  "warning" |
  "redirect" |
  "checkmark-circle" |
  "checkmark" |
  "download" |
  "refresh" |
  "trash" |
  "arrow-up-right" | 
  "arrow-left" | 
  "play" | 
  "pause" |
  "mic" | 
  "mic-off" | 
  "copy" | 
  "expand" | 
  "minimize" | 
  "quote" | 
  "camera" | 
  "close"

interface IconProps {
  name: IconName
  color?: string
  fontSize?: number | string
  className?: string
}
export function MuiIcon({ name, color = COLORS.black, fontSize = 21, className }: IconProps) {
  const muiIconStyle = { color: color, fontSize: fontSize }
  switch (name) {
    case "file-upload": return <FileUploadIcon style={muiIconStyle} />
    case "warning": return <WarningAmberIcon style={muiIconStyle} />
    case 'redirect': return <OpenInNewOutlinedIcon style={muiIconStyle} />
    case 'checkmark': return <CheckOutlined style={muiIconStyle} />
    case 'checkmark-circle': return <CheckCircleOutlineIcon style={muiIconStyle} />
    case 'download': return <DownloadIcon style={muiIconStyle} />
    case 'refresh': return <RefreshIcon style={muiIconStyle} />
    case 'trash': return <DeleteForeverIcon style={muiIconStyle} />
    case 'arrow-up-right': return <NorthEastIcon style={muiIconStyle} />
    case 'arrow-left': return <WestIcon style={muiIconStyle} />
    case 'play': return <PlayIcon style={muiIconStyle} />
    case 'pause': return <PauseIcon style={muiIconStyle} />
    case 'mic': return <MicIcon style={muiIconStyle} />
    case 'mic-off': return <MicOffIcon style={muiIconStyle} />
    case 'copy': return <ContentCopyIcon style={muiIconStyle} />
    case 'expand': return <ExpandIcon style={muiIconStyle} />
    case 'minimize': return <MinimizeIcon style={muiIconStyle} />
    case 'quote': return <FormatQuoteIcon style={muiIconStyle} />
    case 'camera': return <CameraAltIcon style={muiIconStyle} />
    case 'close': return <CloseIcon style={muiIconStyle} />
    // add others here ...
  }
}