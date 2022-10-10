import * as React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { mainListItems } from './ListItems';
import LatestTransfer from './LatestTransfer';
import Customers from './Customers';
import Transfer from './Transfer';
import Customer from './Customer';


const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

const mdTheme = createTheme();

function DashboardContent({ customers, latest}) {
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <Router>

            <ThemeProvider theme={mdTheme}>
                <Box sx={{ display: 'flex' }}>
                    <CssBaseline />
                    <AppBar position="absolute" open={open}>
                        <Toolbar
                            sx={{
                                pr: '24px', // keep right padding when drawer closed
                            }}
                        >
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="open drawer"
                                onClick={toggleDrawer}
                                sx={{
                                    marginRight: '36px',
                                    ...(open && { display: 'none' }),
                                }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography
                                component="h1"
                                variant="h6"
                                color="inherit"
                                noWrap
                                sx={{ flexGrow: 1 }}
                            >
                                GRIP Bank
                            </Typography>

                        </Toolbar>
                    </AppBar>
                    <Drawer variant="permanent" open={open}>
                        <Toolbar
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                px: [1],
                            }}
                        >
                            <IconButton onClick={toggleDrawer}>
                                <ChevronLeftIcon />
                            </IconButton>
                        </Toolbar>
                        <Divider />
                        <List component="nav">
                            {mainListItems}
                        </List>
                    </Drawer>
                    <Box
                        component="main"
                        sx={{
                            backgroundColor: (theme) =>
                                theme.palette.mode === 'light'
                                    ? theme.palette.grey[100]
                                    : theme.palette.grey[900],
                            flexGrow: 1,
                            height: '100vh',
                            overflow: 'auto',
                        }}
                    >
                        <Toolbar />

                        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                            <Grid container spacing={2}>
                                <Routes>
                                    <Route path='/' element={
                                        <React.Fragment>

                                            {/* Latest Transfer */}
                                            <Grid item xs={12} >
                                                <Paper
                                                    sx={{
                                                        p: 2,
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        height: 240,
                                                    }}
                                                >
                                                    <LatestTransfer latest={latest} customers={customers} />
                                                </Paper>
                                            </Grid>
                                            {/* Customers */}
                                            <Grid item xs={12} >
                                                <Paper
                                                    sx={{
                                                        p: 2,
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        height: 'auto',
                                                    }}
                                                >
                                                    <Customers customers={customers} />
                                                </Paper>
                                            </Grid>
                                        </React.Fragment>
                                    } />
                                    <Route path='/customers' element={
                                        <React.Fragment>
                                            <Grid item xs={12} >
                                                <Paper
                                                    sx={{
                                                        p: 2,
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        height: 'auto',
                                                    }}
                                                >
                                                    <Customers customers={customers} />
                                                </Paper>
                                            </Grid>
                                        </React.Fragment>
                                    } />
                                    <Route path='/transfer' element={
                                        <React.Fragment>
                                            <Grid item xs={12} >
                                                <Paper
                                                    sx={{
                                                        p: 2,
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        height: "auto",
                                                    }}
                                                >
                                                    <Transfer customers={customers}/>
                                                </Paper>
                                            </Grid>
                                        </React.Fragment>
                                    } />
                                    <Route path='/customer/:id' element={
                                        <React.Fragment>
                                            <Grid item xs={12} >
                                                <Paper
                                                    sx={{
                                                        p: 2,
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        height: "auto",
                                                    }}
                                                >
                                                    <Customer />
                                                </Paper>
                                            </Grid>
                                        </React.Fragment>
                                    }/>
                                </Routes>

                            </Grid>
                        </Container>
                    </Box>
                </Box>
            </ThemeProvider>
        </Router>
    );
}

export default function Dashboard({ customers, latest}) {
    return <DashboardContent customers={customers} latest={latest} />;
}