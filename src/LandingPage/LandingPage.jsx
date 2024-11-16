import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import { Checkbox, FormControlLabel } from '@mui/material';
import Box from '@mui/material/Box';
import Buttons from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { Button, Col, Container, Image, Modal, Navbar, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import About from '../Assets/About.png';
import bgImage from '../Assets/Load_41_logo.png';
import '../Assets/landingPage.css';
import Login from '../UserAuthentication/Authentication';
import { supabase } from '../firebase';

const LandingPage = () => {
  const [show, setShow] = useState(false);
  const [checks, setChecks] = useState(false)
  const [value, setValue] = React.useState(2);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('')
  const [load, setLoad] = useState(false)
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
  const scroll = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({
      behavior: 'smooth'
    });
    setView(id)
  }
  const reset = () => {
    setUsername('')
    setEmail('')
    setMessage('')
  }
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoad(true)
    try {
      const { docRef, error } = await supabase.from('enquiry').insert({
        username: username,
        email: email,
        message: message
      });
      if(error){
        setLoad(false)
        withReactContent(Swal).fire({
          title: <i>{error}</i>,
          icon: 'error',
          timer: 2000
        });
      }else{
        setLoad(false)
      withReactContent(Swal).fire({
        title: <i>submitted!</i>,
        icon: 'success',
        timer: 2000
      });
      }
    } catch (e) {
      setLoad(false)
      withReactContent(Swal).fire({
        title: <i>{e}</i>,
        icon: 'error',
        timer: 2000
      });
    }
    reset();
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
        <br /><br /><br />
        <div className='container' id='panel'>
          <div style={{ backgroundColor: "transparent", color: '#ffffff', minHeight: '25vh' }}>
            <div className='panel_content' style={{ color: '#fff', fontWeight: 600 }}>
              {/* <Carousel.Item> */}
              {/* <Image src={BannerTruck} className='load-panner'/> */}
              {/* <Carousel.Caption > */}
              <p>YOUR RELIABLE<br />
                FREIGHT TRACKING<br />
                APP</p>
              <p className='panel_text'>All-in-One Digital Tracking App: Robust, Adaptable, and User-Friendly to Streamline Your Freight</p>
              <p className='icon_fixed'>{view == 'disclaimer' ? <ArrowCircleUpIcon onClick={() => scroll('home')} style={{ cursor: 'pointer', fontSize: '4rem', position: 'fixed', zIndex: 999, top: '90%' }} /> : <ArrowCircleDownIcon onClick={() => scroll('disclaimer')} style={{ cursor: 'pointer', fontSize: '4rem', position: 'fixed', zIndex: 999, top: '90%' }} />}</p>
              {/* </Carousel.Caption>
        </Carousel.Item> */}
              {/* <Carousel.Item>
        <Image src={BannerTruck1} className='load-panner'/>
        <Carousel.Caption style={{marginTop:'10%',color:'black',fontSize:'1.5em',fontWeight:700}}>
         <p>Load 41:<br/>Where Freight Finds its Flow</p>
          <p style={{fontSize:'0.5rem'}}>simplify your Freight logistics with load 41<br/><a href='/'>browser</a><button className='panel_button'>Request a Demo</button></p> 
        </Carousel.Caption>
        </Carousel.Item> */}
            </div>
          </div>
        </div><br /><br />
        <div className="container-download">
      {/* <img
        src={bgImage}
        alt="Load41 logo"
        className="logo-down"
      />
      <h1 className="title">Load 41</h1> */}
      <p className="subtitle">Download the Load 41 app here!</p>
      <div className="app-buttons">
        <a href="https://play.google.com/store/apps/details?id=com.jbl.load41" target='_blank' className="store-button">
        <img
    src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
    alt="Google Play"
  />
        </a>
        <a href="https://apps.apple.com/in/app/load41/id6476617385" target='_blank' className="store-button">
        <img
    src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
    alt="App Store"
  />
        </a>
      </div>
      <div className="share-section">
        <span>Share This Page: </span>
        <a href="mailto:?subject=Check%20this%20app!" target='_blank'>
          <img src="https://img.icons8.com/ios-filled/50/000000/email-open.png" alt="Email" />
        </a>
        <a href="https://wa.me/?text=Check%20out%20this%20app!" target='_blank'>
          <img src="https://img.icons8.com/ios-filled/50/000000/whatsapp.png" alt="WhatsApp" />
        </a>
      </div>
    </div>
      <br /><br />
        {/* our features */}
        {/* <div className='container' id='feature'>
        <h3>Our Features</h3>
        <p style={{fontSize:'1em'}}>Experience the power of load 41</p>
        <Container id='feature_c'>
        <Row className='row_feature'>
            <Col xs={12} md={3} style={{marginBottom:'25px'}}>
        <Card className='tracking-image'>
      <Card.Img variant="top" src={Tracks} />
      <Card.Body style={{textAlign:'left'}}>
          <small style={{fontSize:'0.7em'}}>Real-time-tracking</small><br/>
          <strong style={{fontSize:'0.7em'}}>Monitor your shipments in real time</strong>
      </Card.Body>
    </Card>
    </Col>
    <Col xs={12} md={3} style={{marginBottom:'25px'}}>
    <Card className='tracking-image'>
      <Card.Img variant="top" src={Coming} />
      <Card.Body style={{textAlign:'left'}}>
          <small style={{fontSize:'0.7em'}}>Real-time-tracking</small><br/>
          <strong style={{fontSize:'0.7em'}}>Monitor your shipments in real time</strong>
      </Card.Body>
    </Card>
    </Col>
    <Col  xs={12} md={3} style={{marginBottom:'25px'}}>
    <Card className='tracking-image'>
      <Card.Img variant="top" src={Coming}/>
      <Card.Body style={{textAlign:'left'}}>
          <small style={{fontSize:'0.7em'}}>Real-time-tracking</small><br/>
          <strong style={{fontSize:'0.7em'}}>Monitor your shipments in real time</strong>
      </Card.Body>
    </Card>
    </Col>
 </Row>
 </Container>
 </div> */}
        <div className='container' id='about'>
          <Row>
            <Col style={{ color: '#fff' }} xs={12} md={6} xl={6}>
              <h2>ABOUT</h2>
              <h1 style={{ color: '#fff' }}> LOAD 41</h1>
              <p className='load_content'>Load 41 is an innovative all-in-one suite for efficient freight management ~ Offering comprehensive solutions in shipment tracking. With intuitive interfaces, it streamlines freight operations, and enhance supply chain visibility</p>
              <button className='button_request' onClick={() => navigate('/demo')}>Get a Demo</button>
            </Col>
            <Col className='about_image' xs={12} md={6} xl={6}>
              <Image src={About} className='about_image' alt='about' />
            </Col>
          </Row>
        </div>
        <br /><br /><br />
        {/* <div className='container' id='services'>
        <h2>SERVICE</h2>
        <p style={{fontSize:'2.5em'}}>WHAT WE DO?</p>
        <Container id='feature_c'>
        <Row className='row_feature'>
    <Col xs={12} md={4} style={{marginBottom:'25px',borderRadius: '20px'}}>
    <Card style={{backgroundColor:'transparent',color:'#fff',border:'none'}}>
      <Card.Img variant="top" className='service_image' src={Service1} />
      <Card.Body style={{textAlign:'center',marginTop:'4%'}}>
          <strong className='service_text'>Freight Tracking</strong>
      </Card.Body>
    </Card>
    </Col>
    <Col  xs={12} md={4} style={{marginBottom:'25px',borderRadius: '20px'}}>
    <Card style={{backgroundColor:'transparent',color:'#fff',border:'none'}}>
      <Card.Img variant="top" className='service_image' src={Service}/>
      <Card.Body style={{textAlign:'center',marginTop:'4%'}}>
          <strong className='service_text'>Route Optimizations</strong>
      </Card.Body>
    </Card>
    </Col>
    <Col xs={12} md={4} style={{marginBottom:'25px',borderRadius: '20px',backgroundColor:'transparent'}}>
      <Card style={{backgroundColor:'transparent',color:'#fff',border:'none'}}>
      <Card.Img variant="top" src={Service2} className='service_image'/>
      <Card.Body style={{textAlign:'center',marginTop:'4%',backgroundColor:'transparent'}}>
          <strong className='service_text'>Customer Support</strong>
      </Card.Body>
    </Card>
    </Col>
 </Row>
 </Container>
 </div><br/><br/> */}
        {/* <div className='container' id='load'>
  <Row className='row_load_41'>
    <Col className='column_cx' xs={12} md={6} xl={6} xxl={8}>
    <h3 style={{textAlign:'left'}}>Why choose load 41</h3>
    <Row className='column_cx_row'><Col xs={6} md={6} xl={6} xxl={6} style={{textAlign:'left'}}><strong>Increase Proficiancy</strong><br/><small>Stay updated with precise location details</small></Col><Col xs={6} md={6} xl={6} xxl={6} style={{textAlign:'right'}}><strong>Streamline your operations and save time and money with improved route planning, and load management</strong></Col></Row>
    <Row className='column_cx_row'><Col xs={6} md={6} xl={6} xxl={6} style={{textAlign:'left'}}><strong>Improve Transparency</strong><br/><small>manage trucks effortlessly</small></Col><Col xs={6} md={6} xl={6} xxl={6}  st6e={{textAlign:'right'}}><strong>Simplify compliance with FMCSA regulations with ELD integration and reporting tools</strong></Col></Row>
    <Row className='column_cx_row'><Col xs={6} md={6} xl={6} xxl={6} style={{textAlign:'left'}}><strong>Boost Customer Satisfication</strong><br/><small>Find and book trucks in seconds</small></Col><Col xs={6} md={6} xl={6} xxl={6} style={{textAlign:'right'}}><strong>Provide your customers with real-time updates on their shipments and improve their overall experience</strong></Col></Row>
    <Row className='column_cx_row'><Col xs={6} md={6} xl={6} xxl={6} style={{textAlign:'left'}}><strong>Dedicated Support</strong><br/><small>Help available in anytime</small></Col><Col xs={6} md={6} xl={6} xxl={6} style={{textAlign:'right'}}><strong>Keep the all problem out with one phone call</strong></Col></Row>
    </Col>
    <Col style={{backgroundColor:'rgb(230, 230, 230,0.2)',marginLeft:'auto',display:'block'}} xs={12} md={6} xl={6} xxl={4}>
      <Image src={Truck} className='load_image'/>
    </Col>
 </Row>  
 </div> */}
        {/* <div className='container' id='ship'>
 <Row className='row_ship'><Col xs={12} md={12}><Image src={Truck1} className='load_image'/></Col><Col style={{textAlign:'left',padding:'5%',fontSize:'0.8em'}} xs={12} md={12}><h3>Shipment Tracker App</h3><p>Know exactly where your cargo is. Drivers share their journey through the Load 41 app.</p><button className='download_button'>Download Now</button></Col></Row>
 </div> */}
        <div className='container' id='contact'>
          <Row>
            {/* <Col xs={12} md={6} xl={6}>
    <h2>REVIEW</h2>
    <Row>
      <Col xs={12} md={12} xl={12} style={{border:'10px solid #fff',marginBottom:'7px',textAlign:'left',padding:'5%'}}>
      <Row>
        <Col>
      <h3>Yael A.</h3>
      <p>Manager</p>
      </Col>
      <Col>
      <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
      <Typography component="legend">Controlled</Typography>
      <Rating
        name="simple-controlled"
        value={value}
        readOnly
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
      </Box>
      </Col>
      </Row>
      <p style={{fontSize:'1.5em'}}>Streamlined logistics, boosted efficiancy, a game-changer in freight</p>
      </Col>
      <Col xs={12} md={12} xl={12} style={{border:'10px solid #fff',textAlign:'left',padding:'5%'}}>
      <Row>
      <Col>
      <h3>Chad O.</h3>
      <p>Logistics</p>
      </Col>
      <Col>
      <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
      <Typography component="legend">Controlled</Typography>
      <Rating
        name="simple-controlled"
        value={value}
        readOnly
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
      </Box>
      </Col>
      </Row>
      <p style={{fontSize:'1.5em'}}>Load41 revolutionized our shipping process, making logistics effortless and efforts</p>
      </Col>
    </Row>
    </Col> */}
            <Col>
              <Container id='con_1'>
                <h2>CONTACT US</h2>
                <Form onSubmit={onSubmit}>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    {/* <Form.Label>Name</Form.Label> */}
                    <Form.Control type="text" rows={2} placeholder="NAME" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    {/* {!username?.length && <p style={{color:'red',fontSize:15}}>please enter username</p>} */}
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    {/* <Form.Label>Email address</Form.Label> */}
                    <Form.Control type="email" rows={2} placeholder="EMAIL" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    {/* {!email?.length && <p style={{color:'red',fontSize:15}}>please enter email</p>} */}
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    {/* <Form.Label>Message</Form.Label> */}
                    <Form.Control as="textarea" rows={3} type="text" placeholder="MESSAGE" value={message} onChange={(e) => setMessage(e.target.value)} required />
                    {/* {!message?.length && <p style={{color:'red',fontSize:15}}>please enter message</p>} */}
                  </Form.Group>
                  <Form.Group>
                    <FormControlLabel required control={<Checkbox value={checks} style={{ color: '#fff' }} onChange={() => setChecks(!checks)} />} label="By clicking 'SUBMIT' below, I agree to let LOAD41 LLC send me OTP SMS for anti-bot authentication purposes. LOAD41 LLC will send text messages, phone calls, pre-recorded or artificial voice messages, either from their phone system or with their CRM or Automatic Telephone Dialing System (ATDS), regarding my submitted information to provide additional data, give customer service support, or make a marketing offer. I can unsubscribe at any time by simply texting the word STOP to . LOAD41 LLC assures me that my privacy will always be safeguarded and respected. This consent applies even if I am previously registered on any Federal, State, and/or internal Do Not Call (DNC) list or registries. I confirm that I am at least 18 years old and have read and accepted your website's Privacy Policy. Msg&data rates may apply." />
                  </Form.Group>
                  <Button className='button_message' type='submit'>{load ? 'loading' : 'SUBMIT'}</Button>
                </Form>
                {/* <p style={{fontSize:'20px'}}><LocalPhoneIcon/> 1 402 714 5727</p>
        <p style={{fontSize:'20px'}}><MailIcon/> <a href='mailto:support@load41.com' style={{color:'#fff',textDecoration:'none'}}>support@load41.com</a></p> */}
                {/* <p style={{fontSize:'20px'}}><HelpIcon/> <Link to='/support' style={{color:'#fff',textDecoration:'none'}}>Support</Link></p> */}
              </Container>
            </Col>
          </Row>


        </div>
        <br /><br />
        {/* <div className='container' style={{textAlign:'left'}} id='profile'>
<Row className='row_contact'>
    <Col xs={12} md={3} style={{textAlign:'center'}}><div className='circle_profile'></div></Col>
    <Col xs={12} md={6} style={{textAlign:'center'}}>
    <h3>John Mark Doe</h3>
 <p style={{backgroundColor:'#D9D9D9',maxWidth:'130px',textAlign:'center',fontSize:'0.8em',fontWeight:'600',borderRadius:'5px',margin:'auto'}}>Founder & CEO</p>
 <p style={{textAlign:'center',fontSize:'0.8em',fontWeight:'600'}}>At Load 41, we are passionate about revolutionizing the freight brokerage industry. With our innovative technology and dedicated team, we aim to simplify and optimize the shipping process for shippers, brokers, and carriers.</p>
 </Col>
    <Col xs={12} md={3} style={{textAlign:'center'}}><button className='button_contact'>Contact</button></Col>
</Row>
 </div> */}
        <div className='container' style={{ textAlign: 'center', color: '#fff'}} id='disclaimer'>
          <Row className='row_disclaimer'><Col xs={12} md={4}>© 2024 Load 41. All rights reserved.</Col><Col xs={12} md={4}><Link to='/privacy_policy' style={{ color: '#fff', textDecoration: 'none' }}>Privacy Policy</Link></Col><Col xs={12} md={4}><Link to='/terms_and_conditions' style={{ color: '#fff', textDecoration: 'none' }}>Terms of Service</Link></Col></Row>
        </div>
        <br /><br /><br />
        <Modal show={show} onHide={handleClose} >
          <Modal.Body style={{ backgroundColor: '#555' }}><Login /></Modal.Body>
        </Modal>
      </div>
    </>
  )
}

export default LandingPage;