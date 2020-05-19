import React, { createContext, useState } from "react";
import Container from "@material-ui/core/Container";
import {
  createMuiTheme,
  ThemeProvider as MuiThemeProvider,
} from "@material-ui/core/styles";

const UidContext = createContext();
export default UidContext;

export function UidProvider({ children }) {
  const [uid, setUid] = useState();

  return <UidContext.Provider>{children}</UidContext.Provider>;
}
