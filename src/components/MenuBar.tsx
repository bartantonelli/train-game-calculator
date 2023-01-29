import React from "react";
import styled from "styled-components";
import { Typography, Link, Paper } from "@mui/material";
import { BASE_ROUTE } from "../App";
import { Links } from "../links";

const MenuBar = () => {
  return (
    <StyledPaper elevation={3}>
      <StyledLink href={BASE_ROUTE + Links.About}>
        <StyledTypography variant="h6">{"Home"}</StyledTypography>
      </StyledLink>
      <StyledLink href={BASE_ROUTE + Links.Home}>
        <StyledTypography variant="h6">{"Calculator"}</StyledTypography>
      </StyledLink>
      <StyledLink href={BASE_ROUTE + Links.Practice}>
        <StyledTypography variant="h6">{"Practice (Beta)"}</StyledTypography>
      </StyledLink>
    </StyledPaper>
  );
};

const StyledPaper = styled(Paper)`
  && {
    background: linear-gradient(to right, #5e72e4, #825ee4);
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
      0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
    padding: 1rem;
    @media (max-width: 600px) {
      flex-wrap: nowrap;
      padding: 0.5rem;
    }
  }
`;

const StyledLink = styled(Link)`
  padding: 1rem;
  &:hover {
    background-color: #3f51b5;
  }

  @media (max-width: 600px) {
    padding: 0.5rem;
  }
`;

const StyledTypography = styled(Typography)`
  color: white;
  text-transform: uppercase;
  font-weight: 600;
  &:hover {
    background-color: #3f51b5;
    color: white;
  }
`;

export default MenuBar;
