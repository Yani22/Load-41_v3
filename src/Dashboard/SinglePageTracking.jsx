import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Cell, DocId, mapData, Maps } from '../Reducers/userReducer';
import { supabase } from '../firebase';
import { useLocation } from 'react-router-dom';
import { Col, Row, Spinner } from 'react-bootstrap';
import { Box, Grid, Paper, styled, Typography } from '@mui/material';
import MapChart from './Map';
import { SideRow } from './SideRow';
import Swal from 'sweetalert2';
import Draggable from 'react-draggable';
import PropTypes from 'prop-types';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import Buttons from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import { useState } from 'react';
import {Image, Modal, Navbar} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import withReactContent from 'sweetalert2-react-content';
import bgImage from '../Assets/Load_41_logo.png';
import '../Assets/landingPage.css';
import Login from '../UserAuthentication/Authentication';
import axios from 'axios';
function PaperComponent(PaperProps) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...PaperProps} />
    </Draggable>
  );
}
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
const SinglePageTracking = () => {
  const [loading, setLoading] = React.useState(false)
  const [logs, setLogs] = React.useState([])
    const mapdata = useSelector((state) => state?.user?.mapData)
    const load = useSelector((state) => state?.user?.cell.filter(x => x?.isDeleted == false))
    const dispatch = useDispatch()
    const trackingid = useLocation()
    const [show, setShow] = useState(false);
  const [checks, setChecks] = useState(false)
  const [value, setValue] = React.useState(2);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('')
  const [loads, setLoads] = useState(false)
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const [view, setView] = useState('home')
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const pages = [{ id: 'home', name: 'Home', url: '/' }, { id: 'about', name: 'About', url: '/about' }, { id: 'subscribe', name: 'Demo', url: '/demo' }, { id: 'contact', name: 'Contact', url: '/contact_us' }, { id: 'support', name: 'Support', url: '/support' }];
  //const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const handleCloseNavMenu = (id, url) => {
    navigate(url)
    //scroll(id)
    setAnchorElNav(null);
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const handleCloseNavMenuClose = () => {
    setAnchorElNav(null);
  }
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    useEffect(()=>{
      fetchLoad(trackingid?.pathname?.split('/')[2])
    },[])

    useEffect(()=>{
      mapShow(load?.[0]?.loadid, 0)
    },[load?.length])
    
    const mapShow = (id, index) => {
        setLoading(true) 
        dispatch(DocId(id));
        dispatch(mapData({
          Logs: logs,
          deliveryProofPhotos: load[index]?.deliveryProofPhotos || [],
          locationLogs: load[index]?.locationLogs || {},
          loadId: load[index]?.loadId || '',
          trackingId: load[index]?.trackingId || '',
          mobile: load[index]?.driverPhoneNumber || '',
          email: load[index]?.email || '',
          destinationCity: load[index]?.shippingData || '',
          originCity: load[index]?.shippingData || '',
          status: load[index]?.loadStatus || ''
        }))
        dispatch(Maps(false));
        setLoading(false)
      }

      const fetchLoad = async (trackingId) => {
        try {
          let { data} = await axios.get(`https://dr48nfhb-5000.use.devtunnels.ms/trackers_info?trackingId=${trackingId}`,{
            headers: {
              'Content-Type': 'application/json',
          }
        }
          )
          
          if (!data) {
            throw 'error';
          }
      
          if (data) {  
            dispatch(Cell({ id: 'tracking', data: data?.data }));
          }
        } catch (error) {
          Swal.fire({
            title: 'Error!',
            text: error.message,
            icon: "error",
            timer: 2000
          });
        }
      };
      
      const mapHide = () => {
        dispatch(DocId(''));
        dispatch(Maps(true));
        dispatch(mapData({}));
      }
    return (
         <>
      <div className='Land_Page' id='home'>
        {/*panel*/}
        {/* <div className='first_navbar'></div> */}
        {/* <Navbar className='second_navbar'> */}
        {/* <Container>
          <Nav className="me-auto">
            <Nav.Link href="#" onClick={handleShow}>Login</Nav.Link>
            <Nav.Link href="/support">Support</Nav.Link>
          </Nav>
        </Container> */}
        {/* </Navbar><br/> */}
        <Navbar className='second_navbar'>
          {/* <AppBar position="static" style={{backgroundColor:'transparent',color:'black',border:'none'}}> */}
          {/* <Containers maxWidth="xl" className='third_navbar'> */}
          {/* <Containers className='third'> */}
          <Toolbar disableGutters>
            <Image className='logo' src={bgImage} alt='imag' />
            <Typography
              variant="h3"
              noWrap
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 600,
                letterSpacing: '.3rem',
                color: '#ffffff',
                textDecoration: 'none',
                cursor: 'pointer'
              }}
            > LOAD 41
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="#555"
                sx={{ color: "#ffffff", fontSize: '40px' }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenuClose}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page, index) => (
                  <MenuItem sx={{ color: 'black' }} key={index} onClick={() => handleCloseNavMenu(page.id, page.url)}>
                    <Typography textAlign="center">{page.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Image className='logo1' src={bgImage} alt='imag' />
            <Typography
              variant="h5"
              noWrap
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: '#ffffff',
                textDecoration: 'none',
                fontSize: '30px',
                cursor: 'pointer'
              }}
            >
              LOAD 41
            </Typography>
            <Box className='items_navbar' sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page, index) => (
                <Buttons
                  key={index}
                  onClick={() => handleCloseNavMenu(page.id, page.url)}
                  sx={{ my: 2, color: '#ffffff', display: 'block', fontSize: '20px' }}
                >
                  {page.name}
                </Buttons>
              ))}
            </Box>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleShow}
              color="#ffffff"
            >
              <PersonIcon sx={{ color: "#ffffff", fontSize: '40px' }} />
            </IconButton>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="#ffffff"
              sx={{ display: { xs: 'none', md: 'none' } }}
            >
              <MenuIcon sx={{ color: "#ffffff", fontSize: '40px' }} />
            </IconButton>
          </Toolbar>
          {/* </Containers> */}
          {/* </Containers> */}
          {/* </AppBar> */}
        </Navbar>
        <br /><br />
        <div className='single-page'>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={4}>
            <Paper sx={{ padding: 2, textAlign: 'left', fontWeight: 600 }}>
              Tracking ID:<strong>{' '}{mapdata?.trackingId}</strong>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Paper sx={{ padding: 2, textAlign: 'left', fontWeight: 600 }}>
              Current Location:{' '}{mapdata?.locationLogs?.[mapdata?.locationLogs?.length - 1]?.address}
            </Paper>
          </Grid>
          {/* <Grid item xs={12} sm={12} md={4}>
            <Paper sx={{ padding: 2, textAlign: 'left', fontWeight: 600 }}>
              Phone:{' '}{mapdata?.mobile}
            </Paper>
          </Grid> */}
        </Grid>
        <br />
        {mapdata?.originCity ? (
          <Row>
            <Col xs={12} md={3}>
              <SideRow />
            </Col>
            <Col xs={12} md={9}>
              <MapChart />
            </Col>
          </Row>
        ) : (
          <Spinner animation="border" />
        )}
        <div className='container' style={{ textAlign: 'center', color: '#fff' }} id='disclaimer'>
        <Row className='row_disclaimer'><Col xs={12} md={4}>© 2024 Load 41. All rights reserved.</Col><Col xs={12} md={4}><Link to='/privacy_policy' style={{ color: '#fff', textDecoration: 'none' }}>Privacy Policy</Link></Col><Col xs={12} md={4}><Link to='/terms_and_conditions' style={{ color: '#fff', textDecoration: 'none' }}>Terms of Service</Link></Col></Row>
      </div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Body style={{ backgroundColor: '#555' }}><Login /></Modal.Body>
        </Modal>
      </div>
      </div>
        </>
    )
}

export default SinglePageTracking;