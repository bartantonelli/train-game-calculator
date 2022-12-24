import React from "react";
import styled from "styled-components";

import { Typography, Link, Paper } from "@mui/material";

const MenuBar = () => {
  return (
    <StyledPaper>
      <StyledLink href="/">
        <StyledTypography>{"Home"}</StyledTypography>
      </StyledLink>
      <StyledLink href="/about">
        <StyledTypography>{"About"}</StyledTypography>
      </StyledLink>
    </StyledPaper>
  );
};

const StyledPaper = styled(Paper)`
  && {
    background-color: darkblue;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
`;

const StyledLink = styled(Link)`
  padding: 1rem;
`;

const StyledTypography = styled(Typography)`
  color: gray;
  text-transform: capitalize;
  &:hover {
    background-color: lightblue;
  }
`;

export default MenuBar;
