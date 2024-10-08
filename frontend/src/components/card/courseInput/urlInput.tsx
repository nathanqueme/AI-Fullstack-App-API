import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import DirectionsIcon from '@mui/icons-material/Directions';
import { COLORS } from '../../../utils/frontend';

export default function UrlInput() {
  const handleWebsiteUrl = () => {
    alert("This beta feature is not currently available. Please import a file or record audio instead via the other options.")
  }
  return (
    <Paper
      component="form"
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: "100%",
        maxWidth: 300,
        backgroundColor: COLORS.lightGray
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Enter Website Url"
        inputProps={{ 'aria-label': 'search google maps' }}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton onClick={handleWebsiteUrl} color="primary" sx={{ p: '10px' }} aria-label="directions">
        <DirectionsIcon />
      </IconButton>
    </Paper>
  );
}
