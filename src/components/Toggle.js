import React from "react";
import { func, string } from "prop-types";
import styled from "styled-components";
import Brightness5RoundedIcon from "@material-ui/icons/Brightness5Rounded"; //sun
import Brightness4RoundedIcon from "@material-ui/icons/Brightness4Rounded"; // moon

// import { yellow, blue } from "@material-ui/core/colors";
import { green, yellow, blue } from "@material-ui/core/colors";

//
const ToggleContainer = styled.button`
  background: ${({ theme }) => theme.gradient};
  border: 1px solid ${({ theme }) => theme.toggleBorder};
  border-radius: 20px;
  cursor: pointer;
  display: flex;
  font-size: 0.5rem;
  justify-content: space-between;
  margin: 0 auto;
  overflow: hidden;
  padding: 0.25rem;
  position: relative;
  width: 4rem;
  height: 2rem;

  svg {
    height: auto;
    width: 1.25rem;
    transition: all 0.3s linear;

    // sun icon
    &:first-child {
      transform: ${({ lightTheme }) =>
        lightTheme ? "translateY(0)" : "translateY(100px)"};
    }

    // moon icon
    &:nth-child(2) {
      transform: ${({ lightTheme }) =>
        lightTheme ? "translateY(-100px)" : "translateY(0)"};
    }
  }
`;

const Toggle = ({ theme, toggleTheme }) => {
  const isLight = theme === "light";
  return (
    <ToggleContainer lightTheme={isLight} onClick={toggleTheme}>
      <Brightness5RoundedIcon style={{ color: yellow[500] }} />
      <Brightness4RoundedIcon style={{ color: green[500] }} />
    </ToggleContainer>
  );
};

Toggle.propTypes = {
  theme: string.isRequired,
  toggleTheme: func.isRequired,
};

export default Toggle;
