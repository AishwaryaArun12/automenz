import { createTheme } from "@mui/material";

const theme = createTheme({
  components: {
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          color: "black", // Set text color to white for all instances
          backgroundColor: "white", // Default background color for all items
          "&.Mui-selected": {
            backgroundColor: "#FFDD11", // Selected page color
            // color: "white",
          },
          "&.Mui-selected:hover": {
            backgroundColor: "#FFDD11", // Keep selected page color on hover
            // color: "white",
          },
          "&:hover": {
            backgroundColor: "#FFDD11", // Hover color
            // color: "black",
          },
        },
      },
    },
  },
});
export default theme