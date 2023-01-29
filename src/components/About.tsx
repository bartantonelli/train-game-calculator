import { Typography } from "@mui/material";
import { Box, styled } from "@mui/system";
import React from "react";
import { Helmet } from "react-helmet";

const StyledBox = styled(Box)`
  background-color: #f0f0f0;
  padding: 2rem;
  border-radius: 10px;
`;

export function About() {
  return (
    <>
      <Helmet>
        <title>The Train Game - About</title>
        <meta
          name="description"
          content="Learn more about the exciting and challenging game of The Train Game, where players use their creative problem-solving abilities to reach the ultimate destination: the number 10"
        />
      </Helmet>
      <StyledBox maxWidth="800px" mx="auto">
        <Typography variant="h2" align="center" my={2}>
          Welcome to The Train Game!
        </Typography>
        <Typography variant="body1" align="center" my={2}>
          Get ready to embark on a thrilling journey of numbers and strategy!
          The Train Game is a game of wit and skill where players use their
          creative problem-solving abilities to reach the ultimate destination:
          the number 10.
        </Typography>
        <Typography variant="body1" align="center" my={2}>
          In this game, players are given a four-digit number and must use all
          four digits to create equations that equal 10. Sound easy? Think
          again! The catch is that players can only use each digit once and must
          use all four digits in their equations.
        </Typography>
        <Typography variant="body1" align="center" my={2}>
          With different levels of difficulty and endless possibilities, The
          Train Game will test your mental agility and keep you on the edge of
          your seat. So, climb aboard and put your math skills to the test in
          this exciting adventure!
        </Typography>
      </StyledBox>
    </>
  );
}
