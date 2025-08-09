import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import styled, { createGlobalStyle } from 'styled-components';
import CustomerMenu from './components/CustomerMenu';
import AdminDashboard from './components/AdminDashboard';
import OrderConfirmation from './components/OrderConfirmation';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    color: #333;
  }

  #root {
    min-height: 100vh;
  }
`;

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 1rem 2rem;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
`;

const Logo = styled.h1`
  color: #2c3e50;
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Subtitle = styled.p`
  color: #7f8c8d;
  text-align: center;
  margin-top: 0.5rem;
  font-size: 1rem;
  font-weight: 400;
`;

function App() {
  return (
    <Router>
      <GlobalStyle />
      <AppContainer>
        <Header>
          <Logo>The Grill at Pont Pinos</Logo>
          <Subtitle>Special Event Menu - August 8th</Subtitle>
        </Header>
        
        <Routes>
          <Route path="/" element={<CustomerMenu />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/order-confirmation/:orderNumber" element={<OrderConfirmation />} />
        </Routes>
        
        <Toaster 
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              iconTheme: {
                primary: '#4aed88',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ff6b6b',
                secondary: '#fff',
              },
            },
          }}
        />
      </AppContainer>
    </Router>
  );
}

export default App;