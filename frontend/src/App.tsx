import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import { ThemeProvider } from "@material-ui/core/styles";
import { Routes, Route } from "react-router-dom";

import theme from "./components/ui/Theme";
import { createContext } from "react";
import ConductTransaction from "./components/ConductTransaction";
import Wallet from "./components/Wallet";

let userName: string | undefined;
const updateName = (name: string): void => {
  userName = name;
};

export const UserContext = createContext({
  userName,
  updateName,
});

function App() {
  return (
    <UserContext.Provider
      value={{
        userName,
        updateName,
      }}
    >
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="home" element={<Home />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="transaction" element={<ConductTransaction />} />
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </ThemeProvider>
    </UserContext.Provider>
  );
}

export default App;
