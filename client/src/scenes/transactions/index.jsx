import  { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Header from "../../components/Header";

const Transactions = () => {
   return (
  <Box>
         <Header title="TRANSACTION" subtitle="See your lists of transactions." />
        
    </Box> 
 )

}

export default Transactions