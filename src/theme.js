import { createTheme } from "@material-ui/core";
import { faIR } from "@material-ui/core/locale";

const theme = createTheme(
  {
    typography: {
      fontFamily: "Shabnam",
    },
    direction: "rtl",
    palette: {
      primary: {
        main: "rgb(70,70,70)",
      },
      secondary: {
        main: "rgb(218,31,61)",
      },
    },
  },
  faIR
);

export default theme;
