import React, { Children } from 'react';
import { AuthProvider } from './src/context/AuthContext';
import { Navigation } from './src/Navigation/Navigation';

const AppState = ({children} : any) => {
  return (
    <AuthProvider>
      {children}
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

