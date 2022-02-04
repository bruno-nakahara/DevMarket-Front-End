import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { EditProvider } from './contexts/EditContext';
import { ProductsProvider } from './contexts/ProductsContext';


ReactDOM.render(
  <React.StrictMode>
    {/* Passando os Providers dos contexts */}
    <ProductsProvider>
      <EditProvider>
        <App />
      </EditProvider>      
    </ProductsProvider>    
  </React.StrictMode>,
  document.getElementById('root')
);

