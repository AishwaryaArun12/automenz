import React from 'react'
import { createTheme, ThemeProvider } from "@mui/material/styles";
import theme from './theme';
import { Pagination } from '@mui/material';

export const Paginations = ({totalPage, handlePageChange}) => {
  return (
    <>
    <ThemeProvider theme={theme}>
    <Pagination count={totalPage} onChange={handlePageChange} />
  </ThemeProvider>
    </>
  )
}


