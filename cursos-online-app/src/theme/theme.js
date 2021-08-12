import { unstable_createMuiStrictModeTheme } from '@material-ui/core/styles';

const theme = unstable_createMuiStrictModeTheme({
    palette : {
        primary : {
            light : "#63a4fff",
            main : "#1976d2",
            dark : "#004ba0",
            contrastText : "#ecfad8"
        }

    },
});

export default theme;