import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';
import usePersistedState from './utils/usePersistedState';

import light from './styles/themes/light';
import dark from './styles/themes/dark';

import GlobalStyle from './styles/global';
import Header from './components/Header';
import Routes from './routes';

const App: React.FC = () => {
  const [ theme, setTheme ] = usePersistedState<any>('theme', light);

  const toggleTheme = () => {
    setTheme(theme.title === 'light' ? dark : light);
  }

  return (
    <Router>
      <ThemeProvider theme={theme} >
        <div className="App">
          <GlobalStyle />
          <Header toggleTheme={toggleTheme} />
        </div>

        <Routes />
      </ThemeProvider>
    </Router>

  );
}

export default App;
