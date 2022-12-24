import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

export function About() {
  return (
    <Box>
      <Typography>
        {
          "The train game is a game where you try to make the number 10 using all four digits of a four digit number."
        }
      </Typography>
    </Box>
  );
}
