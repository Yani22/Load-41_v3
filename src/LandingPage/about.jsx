import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import Box from '@mui/material/Box';
import Buttons from '@mui/material/Button';
import Containers from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import { Col, Container, Image, Modal, Navbar, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import bgImage from '../Assets/Load_41_logo.png';
import '../Assets/landingPage.css';
import Login from '../UserAuthentication/Authentication';

const About = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('')
  const [load, setLoad] = useState(false)
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
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
  const handleCloseNavMenuClose = () => {
    setAnchorElNav(null);
  }
  const handleCloseNavMenu = (id, url) => {
    navigate(url)
    //scroll(id)
    setAnchorElNav(null);
    setAnchorElNav(null);
  };
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const scroll = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({
      behavior: 'smooth'
    });
  }
  return (
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
        <Containers maxWidth="xl" className='third_navbar'>
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
        </Containers>
        {/* </AppBar> */}
      </Navbar>
      <br /><br /><br />
      <div>
        <Container style={{ color: '#fff', background: 'transparent' }}>
          <p style={{ textAlign: 'left', color: '#fff' }}>
            <h2>About Us</h2><br />
            Welcome to Load 41, your ultimate solution for efficient and reliable load tracking! At Load 41, we are dedicated to bridging the gap between brokers and carriers with our state-of-the-art tracking app. Our mission is to streamline logistics, enhance communication, and ensure transparency throughout the shipping process.<br /><br />
            <h3>Who We Are</h3><br />
            Founded by industry experts, Load 41 was created to address the common challenges faced by both brokers and carriers. Our team comprises seasoned professionals with extensive experience in logistics, technology, and customer service. We understand the complexities of the transportation industry and strive to provide a tool that simplifies operations for all stakeholders.<br /><br />
            <h3>Our Mission</h3><br />
            Our mission is to revolutionize the logistics industry by providing an innovative tracking solution that empowers brokers and carriers alike. We aim to:<br />
            •	Improve Efficiency: Streamline load tracking and management, reducing the time spent on manual updates and phone calls.<br />
            •	Enhance Transparency: Provide real-time tracking and updates, ensuring that all parties have access to accurate and up-to-date information.<br />
            •	Foster Better Communication: Facilitate seamless communication between brokers and carriers, minimizing misunderstandings and delays.<br /><br />
            <h3>What We Offer</h3><br />
            Load 41 offers a comprehensive tracking app designed to meet the unique needs of brokers and carriers:<br /><br />
            •	Real-Time Tracking: Keep track of loads in real time with our intuitive and user-friendly interface.<br />
            •	Automated Updates: Receive automatic notifications and updates, keeping everyone informed without the need for constant check-ins.<br />
            •	Robust Reporting: Access detailed reports and analytics to gain insights into your operations and make data-driven decisions.<br />
            •	Secure and Reliable: Our app employs industry-standard security measures to protect your data and ensure reliability.<br /><br />
            <h3>Why Choose Load 41</h3><br />
            •	User-Friendly: Our app is designed with simplicity in mind, making it easy for both brokers and carriers to use.<br />
            •	Customer Support: We offer dedicated customer support to assist you with any questions or issues you may encounter.<br />
            •	Continuous Improvement: We are committed to continuously improving our app based on user feedback and technological advancements.<br /><br />
            <h3>Join Us</h3><br />
            Join the growing number of brokers and carriers who trust Load 41 for their tracking needs. Experience the benefits of a streamlined, transparent, and efficient logistics process. Thank you for choosing Load 41. We look forward to serving you and helping your business thrive.<br /><br />
          </p>
          {/* <p style={{textAlign:'center'}}>© 2024 Load 41. All rights reserved.</p> */}
        </Container>
      </div><br /><br />
      <div className='container' style={{ textAlign: 'center', color: '#fff' }} id='disclaimer'>
        <Row className='row_disclaimer'><Col xs={12} md={4}>© 2024 Load 41. All rights reserved.</Col><Col xs={12} md={4}><Link to='/privacy_policy' style={{ color: '#fff', textDecoration: 'none' }}>Privacy Policy</Link></Col><Col xs={12} md={4}><Link to='/terms_and_conditions' style={{ color: '#fff', textDecoration: 'none' }}>Terms of Service</Link></Col></Row>
      </div><br /><br />
      <Modal show={show} onHide={handleClose} >
        <Modal.Body style={{ backgroundColor: '#555' }}><Login /></Modal.Body>
      </Modal>
    </div>
  )
}

export default About