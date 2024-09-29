import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import ThemeProvider from './utils/ThemeContext';
import { ChakraProvider } from '@chakra-ui/react'
import App from './App';
import { Provider } from 'react-redux';
import { store } from "./redux/redux-store/store.js";
import ContextWrapper from "./context/ContextWrapper.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <ChakraProvider>
      <Provider store={store}>
        <ThemeProvider>
          <ContextWrapper>

          <App />
          </ContextWrapper>
        </ThemeProvider>
        </Provider>
      </ChakraProvider>
    </Router>
  </React.StrictMode>
);
