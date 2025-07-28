import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import { ApolloProvider } from '@apollo/client';
import App from './App.jsx';
import client from './components/Apollo.jsx'; 


ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>
);
