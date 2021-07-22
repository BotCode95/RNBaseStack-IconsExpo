import React, { Children } from 'react';
import { AuthProvider } from './src/context/AuthContext';
import { Navigation } from './src/Navigation/Navigation';
import { ProductsProvider } from './src/context/ProductsContext';

const AppState = ({children} : any) => {
  return (
    <AuthProvider>
      <ProductsProvider>
      {children}
      </ProductsProvider>
    </AuthProvider>

  )

}

export default function App() {
  return (
    <AppState>
      <Navigation/>
    </AppState>
  );
}

