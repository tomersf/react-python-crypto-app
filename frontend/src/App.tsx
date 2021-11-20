import LandingPage from './components/LandingPage';
import { ThemeProvider } from "@material-ui/core/styles";

import theme from './components/ui/Theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LandingPage />
    </ThemeProvider>
  );
}

export default App;
