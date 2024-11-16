import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import { Checkbox, FormControlLabel } from '@mui/material';
import Box from '@mui/material/Box';
import Buttons from '@mui/material/Button';
import Containers from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Image, Modal, Navbar, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import bgImage from '../Assets/Load_41_logo.png';
import '../Assets/landingPage.css';
import Login from '../UserAuthentication/Authentication';
import { supabase } from '../firebase';

const SupportPage = () => {
  const [value, setValue] = React.useState(2);
  const [show, setShow] = useState(false);
  const [checks, setChecks] = useState(false)
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

  const handleCloseNavMenu = (id, url) => {
    navigate(url)
    //scroll(id)
    setAnchorElNav(null);
    setAnchorElNav(null);
  };
  const handleCloseNavMenuClose = () => {
    setAnchorElNav(null);
  }
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
      setLoad(false)
      
      withReactContent(Swal).fire({
        title: <i>submitted!</i>,
        icon: 'success',
        timer: 2000
      });
    } catch (e) {
      setLoad(false)
      console.error('Error adding document: ', e);
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
                color="#ffffff"
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
      <div style={{ textAlign: 'left', color: '#fff', background: 'transparent' }}>
        <Container style={{ textAlign: 'left', color: '#fff', background: 'transparent' }}>
          <h6>General Support Information</h6>
          Welcome to Load 41 Support! We're here to help you with any questions or issues you might have.<br /><br />
          <h6>Contact Us</h6>
          If you need immediate assistance, you can contact our support team through:<br /><br />
          •	Name: LOAD 41<br />
          •	Address: LOAD 41, 1006 WEST CENTENNIAL RD, PAPILLION, NE 68046, USA<br />
          •	Phone: <a style={{ textDecoration: 'none' }} href='tel:+1-402-714-5726'>+1-402-714-5726</a><br />
          •	Email: <a style={{ textDecoration: 'none' }} href='mailto:support@load41.com'>SUPPORT@LOAD41.COM</a><br />
          •	Contact Form: Located at the bottom of the page<br /><br />
          Our support hours are Monday to Friday, 9 AM to 5 PM (CST).<br /><br />
          <h6>Frequently Asked Questions (FAQs)</h6>
          Q: How do I delete my account?<br />
          A: To delete your account, please go to "Account Options" and then click "Edit Details." On the top right-hand of the screen, click the trash icon. A confirmation window will open; then select "Delete."<br /><br />
          Step-by-Step Guide to Delete an Account<br /><br />

          1. Open the App<br />
          - Launch the app on your device.<br />
          - You should see the home screen.<br /><br />

          2. Navigate to Settings<br />
          - Tap on the settings icon (usually represented by a gear or three vertical dots) located on the main screen.<br /><br />

          3. Go to Account Settings<br />
          - In the settings menu, find and select "Account Settings".<br /><br />

          4. Edit Account<br />
          - Within the Account Settings, look for the "Edit Account" option and tap on it.<br /><br />

          5. Delete Account<br />
          - Scroll to the bottom of the Edit Account page to find the "Delete Account" option.<br />
          - Tap on "Delete Account".<br /><br />

          6. Confirm Account Deletion<br />
          - A confirmation prompt will appear, asking if you are sure you want to delete your account.<br />
          - Confirm that you want to delete your account. This action is usually irreversible.<br /><br />

          7. Return to Home Page<br />
          - After confirming the account deletion, you will be automatically redirected to the home page of the app.<br /><br />
          Q: How do I reset my password?<br />
          A: To reset your password, click on the "Forgot Password" link on the login page. Enter your email address, and we'll send you instructions on how to reset your password.<br /><br />

          {/* Q: How can I track my shipment?<br/>
A: You can track your shipment by logging into your Load 41 account and navigating to the "Dashboard" section. Enter your tracking number to view the latest status of your shipment.<br/>
Q: How do I update my account information?<br/>
A: To update your account information, log in to your Load 41 account and go to the "Account Settings" section. Here you can update your contact information, payment methods, and preferences.<br/><br/> */}
          <h6>Technical Support</h6>
          If you are experiencing technical issues with our website or mobile app, please try the following troubleshooting steps:<br />
          1.	Clear your browser's cache and cookies.<br />
          2.	Ensure you are using the latest version of your browser or app.<br />
          3.	Restart your device.<br /><br />
          If the issue continues, please provide a detailed description through the Contact Form at the bottom of the page, or call us at <a style={{ textDecoration: 'none' }} href='tel:+1-402-714-5726'>+1-402-714-5726</a>. Our technical support team will respond shortly.<br /><br />
          {/* <h6>Billing and Payment Support</h6>
For questions related to billing and payments, please refer to the following:<br/>
Q: How do I view my billing statements?<br/>
A: Log in to your Load 41 account and navigate to the "Billing" section. Here you can view and download your billing statements.<br/>
Q: What payment methods are accepted?<br/>
A: We accept major credit cards, debit cards, and electronic bank transfers. For more information on payment options, please visit the "Payment Methods" section on our website.<br/>
Q: How do I report a billing error?<br/>
A: If you believe there is an error on your bill, please contact our billing support team at <a href='mailto:billing@load41.com'>billing@load41.com</a> within 30 days of receiving your statement. Provide your account details and a description of the error, and we will investigate the issue promptly.<br/><br/> */}

          {/* <h6>Privacy and Security Support</h6>
Your privacy and security are important to us. For questions related to privacy and data security, please refer to our Privacy Policy.<br/> */}
          {/* Q: How do I request data deletion?<br/>
A: To request the deletion of your data, please submit a request through our Data Subject Access Request (DSAR) Portal. If the portal is unavailable, you can send us a message through call us at +1-402-714-5726 or use the Contact Form found at the bottom of the page.<br/> */}
          {/* Q: How does Load 41 protect my data?<br/>
A: Load 41 uses industry-standard security measures to protect your data, including encryption, secure servers, and regular security audits. For more details, please refer to our Privacy Policy.<br/><br/> */}

          {/* <h6>Feedback and Suggestions</h6>
We value your feedback and suggestions! If you have any ideas on how we can improve our services, please share them with us through call us at +1-402-714-5726 or the Contact Form located at the bottom of the page. Your input helps us serve you better and enhance your experience with Load 41.<br/>
Thank you for choosing Load 41. We are committed to providing you with the best possible support and service.<br/><br/><br/> */}
          <div className='container' id='contact'>
            <Row>
              {/* <Col xs={12} md={6} xl={6}>
    <h2>REVIEW</h2>
    <Row> */}
              {/* <Col xs={12} md={12} xl={12} style={{border:'10px solid #fff',marginBottom:'7px',textAlign:'left',padding:'5%'}}>
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
                      <FormControlLabel required control={<Checkbox value={checks} onChange={() => setChecks(!checks)} style={{ color: '#fff' }} />} label="By clicking 'SUBMIT' below, I agree to let LOAD41 LLC send me OTP SMS for anti-bot authentication purposes. LOAD41 LLC will send text messages, phone calls, pre-recorded or artificial voice messages, either from their phone system or with their CRM or Automatic Telephone Dialing System (ATDS), regarding my submitted information to provide additional data, give customer service support, or make a marketing offer. I can unsubscribe at any time by simply texting the word STOP to . LOAD41 LLC assures me that my privacy will always be safeguarded and respected. This consent applies even if I am previously registered on any Federal, State, and/or internal Do Not Call (DNC) list or registries. I confirm that I am at least 18 years old and have read and accepted your website's Privacy Policy. Msg&data rates may apply." />
                    </Form.Group>
                    <Button className='button_message' type='submit'>{load ? 'loading' : 'SUBMIT'}</Button>
                  </Form>
                  {/* <p style={{fontSize:'20px'}}><LocalPhoneIcon/> 1 402 714 5727</p>
        <p style={{fontSize:'20px'}}><MailIcon/> <a href='mailto:support@load41.com' style={{color:'#fff',textDecoration:'none'}}>support@load41.com</a></p> */}
                  {/* <p style={{fontSize:'20px'}}><HelpIcon/> <Link to='/support' style={{color:'#fff',textDecoration:'none'}}>Support</Link></p> */}
                </Container>
              </Col>
              <br /><br />
              <Row>
                <Col xs={12} md={6} xl={6} style={{ textAlign: 'left' }}>
                  <h3>Address</h3>
                  <p style={{ fontSize: '1em' }}>
                    If you prefer to contact us via mail, you can find us at:<br />
                    LOAD 41<br />
                    1006 WEST CENTENNIAL RD<br />
                    PAPILLION, NE 68046<br />
                    USA<br />
                  </p>
                </Col>
                <Col xs={12} md={6} xl={6} style={{ textAlign: 'left' }}>
                  {/* <Container id='con_1'> */}
                  <h3>Business Hours</h3>
                  <p style={{ fontSize: '1em' }}>
                    Our team is available to assist you during the following hours:<br />
                    call us at <a style={{ textDecoration: 'none' }} href='tel:+1-402-714-5726'>+1-402-714-5726</a><br />
                    Monday - Friday: 9:00 AM - 6:00 PM CST<br />
                    Saturday: Closed<br />
                    Sunday: Closed<br />
                  </p>
                  {/* </Container> */}
                </Col>
              </Row>
              <br /><br />
            </Row>


          </div>
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

export default SupportPage;