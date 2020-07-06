import React from "react";
import { Route, Switch } from "react-router-dom";

const RouterContext = React.createContext(null);

export const HookedBrowserRouter = ({ children, history }) => (
  <Router history={history}>
    <Route>
      {(routeProps) => (
        <RouterContext.Provider value={routeProps}>
          {children}
        </RouterContext.Provider>
      )}
    </Route>
  </Router>
);

export function useRouter() {
  return React.useContext(RouterContext);
}
