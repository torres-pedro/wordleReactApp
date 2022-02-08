import { amber, green, red } from '@material-ui/core/colors';
import { createTheme } from '@mui/material/styles';

const Colors = createTheme({
      palette: {
        primary: green,
        secondary: red,
        default: amber,
      },
   });

export default Colors