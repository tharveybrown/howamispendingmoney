import React, { useState, useEffect, useMemo } from "react";
// import { useSelector } from "react-redux";
import { createMuiTheme } from "@material-ui/core/styles";

import { darktheme } from "./themes/dark";
import { lighttheme } from "./themes/light";

function useTheme() {
  const muiTheme = lighttheme;
  return createMuiTheme(muiTheme);
}

export { useTheme };
