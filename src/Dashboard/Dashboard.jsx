import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import AdjustIcon from '@mui/icons-material/Adjust';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FireTruckIcon from '@mui/icons-material/FireTruck';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import SettingsIcon from '@mui/icons-material/Settings';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import RvHookupIcon from '@mui/icons-material/RvHookup';
import ShareLocationIcon from '@mui/icons-material/ShareLocation';
import WidgetsIcon from '@mui/icons-material/Widgets';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, SvgIcon, Tooltip } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';
import * as React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, redirect, useNavigate } from 'react-router-dom';
import bgImage from '../Assets/Load_41_logo.png';
import '../Assets/dashboard.css';
import { Bulk, Maps, Single, userID } from "../Reducers/userReducer";
import { supabase } from "../firebase";
import BulkPost from './bulkPost';
import SinglePost from './singlePost';
import TableChartIcon from '@mui/icons-material/TableChart';
import TruckstopIcon from '../Assets/ts_waypoint-red.png';
import Truckerpath from '../Assets/Truckerpath.webp';
import freight from '../Assets/logo-direct-freight.png';
import Load41 from '../Assets/Load_41_logo.png';
import Dat from '../Assets/dat.jpeg'
import { Image } from 'react-bootstrap';
import { mainHeader } from '../common';
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

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
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function Dashboard() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const uid = useSelector((state) => state.user.userID)
  const users = useSelector((state) => state.user.user)
  const bulk = useSelector((state) => state?.user?.bulk)
  const single = useSelector((state) => state?.user?.single)
  const [alerts, setAlerts] = React.useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const Logout = async () => {
    try {
      await fetch('https://dr48nfhb-5000.use.devtunnels.ms/logout', {
        method: 'POST',
        headers: mainHeader()
    })
    .then(response => response.json())
    .then(data => {
      dispatch(userID([]));
      localStorage.removeItem('token')
      localStorage.removeItem('dat_token')
      localStorage.removeItem('direct_token')
      localStorage.removeItem('trucks_token')
      localStorage.removeItem('trucker_token')
      localStorage.removeItem('direct-api-key')
      localStorage.removeItem('id')
      localStorage.removeItem('credentials')
      localStorage.removeItem('datCredential')
      localStorage.removeItem('trucksCredential')
      localStorage.removeItem('authentication')
      window.location.reload();
    })
    .catch(error => console.error('Error:', error));
    }
    catch (error) {
      
    };
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleOpenAlerts = () => {
    setAlerts(true)
  }
  const handleCloseAlert = () => {
    setAlerts(false)
  }
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" open={open} sx={{ background: '#e9ecef' }}>
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <IconButton
              color="#555"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Box
              component="img"
              sx={{ height: 70 }}
              alt="Logo"
              src={bgImage}
            />
            <Typography sx={{ color: '#555' }} noWrap component="div">
              {uid?.username}
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open} sx={{ background: '#e9ecef' }}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List sx={{ textDecoration: 'none' }}>
            {['Tracking Dashboard', 'Load Dashboard', 'DAT', 'TRUCKSTOP', 'Trucker Path', 'Direct Freight', 'Bulk Post', 'Single Post', 'Shippers List', 'Consignee List', 'History', 'Settings', 'Logout'].map((text, index) => (
              <ListItem key={text} component={Link} disablePadding sx={{ display: 'block', textDecoration: 'none' }} to={text === 'History' ? '/dashboard/Trash' : text === 'Consignee List' ? '/dashboard/consignee-details' : text === 'Shippers List' ? '/dashboard/shippers-details' : text === 'DAT' ? '/dashboard/view-dat' : text === 'TRUCKSTOP' ? '/dashboard/view-truckstop' : text === 'Trucker Path' ? '/dashboard/Trucker-Path' : text === 'Company List' ? '/dashboard/Company-List' : text === 'Settings' ? '/dashboard/settings' : text === 'Tracking Dashboard' ? '/dashboard' : text === 'Load Dashboard' ? '/dashboard/Combined-List' : text === 'Direct Freight' ? '/dashboard/direct-freight' : null} onClick={() => text === 'Logout' ? handleOpenAlerts() : text === 'Single Post' ? dispatch(Single(true)) : text === 'Bulk Post' ? dispatch(Bulk(true)) : dispatch(Maps(true))}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                    textDecoration: 'none'
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                      textDecoration: 'none'
                    }}
                  >
                    {index === 0 && <Tooltip title='Load41'><Image style={{ width: '1.5em', height: '1.5em' }} src={Load41} /></Tooltip>}
                    {index === 1 && <Tooltip title='Load Table'><ShareLocationIcon /></Tooltip>}
                    {index === 2 && <Tooltip title='DAT'><Image style={{ width: '1.5em', height: '1.5em' }} src={Dat} /></Tooltip>}
                    {index === 3 && <Tooltip title='Truckstop'><Image style={{ width: '1.5em', height: '1.5em' }} src={TruckstopIcon} /></Tooltip>}
                    {index === 4 && <Tooltip title='Truckerpath'><Image style={{ width: '1.5em', height: '1.5em' }} src={Truckerpath} /></Tooltip>}
                    {index === 5 && <Tooltip title='Direct Freight'><Image style={{ width: '1.5em', height: '1.8em' }} src={freight} /></Tooltip>}
                    {index === 6 && <Tooltip title='Bulk Post'><WidgetsIcon /></Tooltip>}
                    {index === 7 && <Tooltip title='Single Post'><FireTruckIcon /></Tooltip>}
                    {index === 8 && <Tooltip title='shippers'><TableChartIcon /></Tooltip>}
                    {index === 9 && <Tooltip title='consignee'><RvHookupIcon /></Tooltip>}
                    {/* {index === 10 && <Tooltip title='Company List'><LocalShippingOutlinedIcon /></Tooltip>} */}
                    {index === 10 && <Tooltip title='Trash'><RestoreFromTrashIcon /></Tooltip>}
                    {index === 11 && <Tooltip title='Settings'><SettingsIcon /></Tooltip>}
                    {index === 12 && <Tooltip title='Logout'><LogoutIcon /></Tooltip>}
                  </ListItemIcon>
                  <ListItemText style={{ textDecoration: 'none', color: '0000', textDecoration: 'none' }} primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          {/* <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <Outlet />
        </Box>
      </Box>
      <Dialog onClose={() => dispatch(Bulk(false))} maxWidth='md' open={bulk}>
        <BulkPost />
      </Dialog>
      <Dialog onClose={() => dispatch(Single(false))} maxWidth='md' open={single}>
        <SinglePost />
      </Dialog>
      <React.Fragment>
        <Dialog
          open={alerts}
          onClose={() => { handleCloseAlert() }}
          PaperProps={{
            component: 'form',
            onSubmit: (event) => {
              navigate('/dashboard');
              event.preventDefault();
              Logout();
              handleCloseAlert();
            },
          }}
        >
          <DialogTitle>Logout</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are You Sure?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAlert}>Cancel</Button>
            <Button type="submit">Logout</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </>
  );
}