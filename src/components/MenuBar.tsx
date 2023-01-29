import React from "react";
import styled from "styled-components";

import { Typography, Link, Paper } from "@mui/material";
import { BASE_ROUTE } from "../App";
import { Links } from "../links";

const MenuBar = () => {
  return (
    <StyledPaper>
      <StyledLink href={BASE_ROUTE + Links.About}>
        <StyledTypography>{"Home"}</StyledTypography>
      </StyledLink>
      <StyledLink href={BASE_ROUTE + Links.Home}>
        <StyledTypography>{"Calculator"}</StyledTypography>
      </StyledLink>
      <StyledLink href={BASE_ROUTE + Links.Practice}>
        <StyledTypography>{"Practice"}</StyledTypography>
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
