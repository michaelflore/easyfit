import { createMuiTheme } from '@material-ui/core';
import { purple } from '@material-ui/core/colors';

// app theme data, provides a general use dark theme with a primary color of purple
const theme = createMuiTheme({
    palette: {
        type: "dark",
        primary: purple
    }
});

export default theme;