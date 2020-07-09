import React, { useState, useEffect, useMemo } from "react";
// import { useSelector } from "react-redux";
import { createMuiTheme } from "@material-ui/core/styles";

import { darktheme } from "./themes/dark";
import { lighttheme } from "./themes/light";

function useTheme() {
  const themeObject = createMuiTheme(lighttheme);

  // const muiTheme = darktheme;
  return createMuiTheme(themeObject);
}

export { useTheme };
