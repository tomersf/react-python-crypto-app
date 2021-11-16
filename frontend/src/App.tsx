import './App.css';
import LandingPage from './components/LandingPage';
import { ThemeProvider } from "@material-ui/core/styles";

import theme from './components/ui/Theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
    <div className="App">
      <LandingPage />
    </div>
    </ThemeProvider>
  );
}

export default App;
