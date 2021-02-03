import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
        light:"#191919",
        main: "#1E88F7",
        dark: "#000",
        text: "#7f7f7f",
        black: "#000",
    },
    type: 'dark',
    background: {
      default: "#000"
    }
  },
});

export default theme