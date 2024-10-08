/**
 * Icons.tsx
 * version 1.0.0
 * 
 * Created on the 09/05/2023
 */

import COLORS from './colors'
// MUI ICONS
import FileUploadIcon from '@mui/icons-material/FileUpload';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import CheckOutlined from '@mui/icons-material/CheckOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DownloadIcon from '@mui/icons-material/Download';
import RefreshIcon from '@mui/icons-material/Refresh';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';

export type IconName =
  "file-upload" |
  "warning" |
  "redirect" |
  "checkmark-circle" |
  "checkmark" |
  "download" | 
  "refresh" |
  "mic" |
  "mic-off" | 
  "download"

interface IconProps {
  name: IconName
  color?: string
  fontSize?: number | string
  className?: string
}
export function Icon({ name, color = COLORS.black, fontSize = 21, className }: IconProps) {
  const muiIconStyle = { color: color, fontSize: fontSize }
  switch (name) {
    case "file-upload": return <FileUploadIcon style={muiIconStyle} />
    case "warning": return <WarningAmberIcon style={muiIconStyle} />
    case 'redirect': return <OpenInNewOutlinedIcon style={muiIconStyle} />
    case 'checkmark': return <CheckOutlined style={muiIconStyle} />
    case 'checkmark-circle': return <CheckCircleOutlineIcon style={muiIconStyle} />
    case 'download': return <DownloadIcon style={muiIconStyle} />
    case 'refresh': return <RefreshIcon style={muiIconStyle} />
    case 'mic': return <MicIcon style={muiIconStyle} />
    case 'mic-off': return <MicOffIcon style={muiIconStyle} />
    // add others here ...
  }
}