import { createMuiTheme } from '@material-ui/core';
import { purple } from '@material-ui/core/colors';

// app theme data
const theme = createMuiTheme({
    palette: {
        type: "dark",
        primary: purple
    }
});

export default theme;