// src/components/common/Sidebar.jsx
import React from 'react';
import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Box,
} from '@mui/material';
import {
    Dashboard as DashboardIcon,
    Category as CategoryIcon,
    Subtitles as SubtitlesIcon,
    Inventory as InventoryIcon,
    ReceiptLong as ReceiptLongIcon,
    Payment as PaymentIcon,
    RateReview as ReviewsIcon,
    Logout as LogoutIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 220;

const Sidebar = ({ open }) => {
    const navigate = useNavigate();

    return (
        <Drawer
            variant="persistent"
            open={open}
            sx={{
                width: open ? drawerWidth : 0,
                flexShrink: 0,
                whiteSpace: 'nowrap',
                [`& .MuiDrawer-paper`]: {
                    width: drawerWidth,
                    transition: 'width 0.3s',
                    boxSizing: 'border-box',
                    backgroundColor: '#fafafa',
                    display: 'flex',
                    flexDirection: 'column',
                },
            }}
        >
            <Toolbar />

            {/* Wrap the entire list in a Box and push it to the bottom */}
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', mt: '20px' }}>
                <List>
                    {[
                        { text: 'Dashboard', icon: <DashboardIcon />, route: '/seller-dashboard' },
                        { text: 'Categories', icon: <CategoryIcon />, route: '/seller-dashboard/categories' },
                        { text: 'Sub Categories', icon: <SubtitlesIcon />, route: '/sub-categories' },
                        { text: 'Products', icon: <InventoryIcon />, route: '/products' },
                        { text: 'Orders', icon: <ReceiptLongIcon />, route: '/orders' },
                        { text: 'Payments', icon: <PaymentIcon />, route: '/payments' },
                        { text: 'Reviews', icon: <ReviewsIcon />, route: '/reviews' },
                    ].map(({ text, icon, route }) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton onClick={() => navigate(route)}>
                                <ListItemIcon>{icon}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}

                    <ListItem disablePadding>
                        <ListItemButton
                            onClick={() => {
                                localStorage.removeItem('user');
                                navigate('/signin');
                            }}
                        >
                            <ListItemIcon><LogoutIcon /></ListItemIcon>
                            <ListItemText primary="Logout" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
        </Drawer>
    );
};

export default Sidebar;
