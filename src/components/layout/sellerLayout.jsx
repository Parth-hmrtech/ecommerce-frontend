
import React, { useState } from 'react';
import { Box } from '@mui/material';
import Header from '../common/Header';
import Footer from '../common/Footer';
import Sidebar from '../common/Sidebar';


const SellerLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header toggleSidebar={toggleSidebar} />

      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <Sidebar open={sidebarOpen} />
        <Box component="main" sx={{ flexGrow: 1, mt: '64px' }}>
          {children}
        </Box>
      </Box>

      <Footer />
    </Box>
  );
};

export default SellerLayout;

