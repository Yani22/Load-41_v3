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
import bgImage from '../Assets/Load_41_logo.png';
import '../Assets/landingPage.css';
import Login from '../UserAuthentication/Authentication';
import { supabase } from '../firebase';


const ContactPage = () => {
  const [show, setShow] = useState(false);
  const [checks, setChecks] = useState(false)
  const [value, setValue] = React.useState(2);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('')
  const [load, setLoad] = useState(false)
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
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

  const handleCloseNavMenu = (id, url) => {
    navigate(url)
    //scroll(id)
    setAnchorElNav(null);
    setAnchorElNav(null);
  };
  const handleCloseNavMenuClose = () => {
    setAnchorElNav(null);
  }
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const scroll = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({
      behavior: 'smooth'
    });
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
              color="#ffffff"
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
      <div className='container' style={{ color: '#fff', background: 'transparent' }}>
        <Row>
          <Col>
            <h3>CONTACT US</h3>
            <p>
              We'd love to hear from you! Whether you have questions, feedback, or need assistance, our team at Load 41 is here to help. Please use the contact form below, or reach out to us through the provided details. We aim to respond to all inquiries as quickly as possible.
            </p>
          </Col>
        </Row><br /><br />
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
              {/* <h2>CONTACT US</h2> */}
              {/* <p>please lets us know by filling out the form below</p> */}
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
        <br /><br />
        <Row>
          {/* <Col xs={12} md={6} xl={6} style={{textAlign:'left'}}>
    <h3>Address</h3>
    <p style={{fontSize:'1em'}}>
    If you prefer to contact us via mail or visit our office, you can find us at:<br/>
    Load 41<br/>
    140 S. 27th Street, Suite A<br/>
    Lincoln, NE 68510<br/>
    </p>
    </Col> */}
          <Col>
            <Container id='con_1'>
              <h3>Business Hours</h3>
              <p style={{ fontSize: '1em' }}>
                Our team is available to assist you during the following hours:<br />
                call us at +1-402-714-5726<br />
                Monday - Friday: 9:00 AM - 6:00 PM CST<br />
                Saturday: Closed<br />
                Sunday: Closed<br />
              </p>
            </Container>
          </Col>
        </Row>
        <br /><br />
        <Row style={{ fontSize: '1.5em' }}><Col>Thank you for choosing Load 41. We look forward to assisting you!</Col></Row>
        <br /><br />
      </div>
      <div className='container' style={{ textAlign: 'center', color: '#fff' }} id='disclaimer'>
        <Row className='row_disclaimer'><Col xs={12} md={4}>© 2024 Load 41. All rights reserved.</Col><Col xs={12} md={4}><Link to='/privacy_policy' style={{ color: '#fff', textDecoration: 'none' }}>Privacy Policy</Link></Col><Col xs={12} md={4}><Link to='/terms_and_conditions' style={{ color: '#fff', textDecoration: 'none' }}>Terms of Service</Link></Col></Row>
      </div><br /><br />
      <Modal show={show} onHide={handleClose} >
        <Modal.Body style={{ backgroundColor: '#555' }}><Login /></Modal.Body>
      </Modal>
    </div>
  )
}

export default ContactPage