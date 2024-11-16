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


const PrivacyPolicy = () => {
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
                color="#fff"
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
          <p>Load 41 is committed to protecting the privacy of our customers. Load 41 exists to make freight transportation fast, reliable, and efficient by bringing the most advanced technology to its community.
            Our Privacy Policy is designed to help you understand how we collect and use personally identifiable information (“Personal Information”) that you provide to us and to help you make informed decisions when using our website and services (collectively, “Load 41”, Company, or “Website”).
            By visiting or using any part of this website, you agree to the terms of this Privacy Policy as they may be amended from time to time. As we update our Website over time, this Privacy Policy may change, so please check for updates.
            Your Online Privacy Responsibilities
          </p><br />
          <p>
            By using this site, you agree to take basic steps to ensure your privacy online. You agree to log out of this site when you are finished, protecting your information from other users. You also agree not to share your password or login ID with anyone else. In addition, you agree to take reasonable precautions against malware and viruses by installing anti-virus software to protect your online activities.
            What Is Personal Information?
          </p><br />
          <p>
            “Personal Information” means any information relating to an identified or identifiable natural person; an identifiable natural person is one who can be identified, directly or indirectly, in particular by reference to an identifier such as a name, an identification number, location data, an online identifier, or to one or more factors specific to the physical, physiological, genetic, mental, economic, cultural, or social identity of that natural person.
            Personal Information may include the following: name, address, date of birth, gender, and contact data (i.e., email address, telephone number, and employer name).
            We may also collect information that is related to you but that does not personally identify you (“Non-personal Information”). Non-personal Information also includes information that could personally identify you in its original form, but that we have modified (for instance, by aggregating, anonymizing or de-identifying such information) in order to remove or hide any Personal Information.
          </p><br />
          <h6>Scope of This Privacy Policy</h6>
          <h6>This Privacy Policy applies to Personal Information and other information collected by Load 41 or its service providers from or about:</h6>
          •	Visitors to, or users of, its website and application<br />
          •	Prospective and current customers using Load 41 services<br />
          •	Service providers and business partners<br />
          •	Prospective and current employees<br />
          •	Other third-parties that it interacts with<br />
          We collect this information to continually improve and enhance the functionality of Load 41. We gather certain information automatically. This information may include IP addresses, browser type, Internet service provider (ISP), referring/exit pages, operating system, date/time stamp, and/or clickstream data. We link this automatically collected data to other information we collect about you.<br /><br />
          <h6>Collection of Personal Information</h6><br />
          We take your privacy seriously and employ information protection controls in keeping with industry standards and practices to safeguard your information and protect your anonymity. Personal Information about you may be collected from you through various sources, including information:<br />
          •	That is entered manually and voluntarily by you on the Site’s application and other forms or postings on the Site;<br />
          •	That you provide regarding your preferences (for example, based on your activity on our website);<br />
          •	From other sources with your consent (for example, from other institutions such as auditors or administrators);<br />
          •	From sources in the public domain;<br />
          •	From other interactions you may have with us (for example, discussions or emails with our staff, including through the use of the Site’s contact features).<br />
          In addition, when you visit our Site/App, we may gather anonymous technical and navigational information, such as computer browser type, Internet protocol address, cookie information, pages visited, and average time spent on our Website/app. This information does not personally identify you and may be used, for example, to alert you to software compatibility issues, to customize any advertising or content you see, fulfill your requests for products and services, contact you, conduct research, or analyze and improve our Site design and functionality.
          Such information collected by us may be stored and processed in the United States or any other country in which our agents or we maintain facilities. By using the Website/app and our Services, you consent to the foregoing collection and use of information and any such transfer of information outside of your country. We make no representation or warranty with respect to any duty to permanently store any Personal Information you may provide.<br /><br />
          <h6>Personal Information You Choose to Provide</h6>
          In order to provide the best experience when you visit our Website/app, we may ask you for Personal Information. Personal Information includes, for example, your name and e-mail address, both of which you may be asked to provide when registering with Load 41. A description of some of the ways that you may provide Personal Information to us, as well as further details on how we may use such Personal Information, is given below.<br /><br />
          <h6>Contact Us/Feedback</h6>
          If you email us using a "Contact us" link on our Website/app, we may ask you for information such as your name and e-mail address so we can respond to your questions and comments. If you choose to correspond with us via e-mail, we may retain the content of your e-mail messages, your e-mail address and our response to you.<br /><br />
          <h6>Surveys</h6>
          We may occasionally ask Website/app visitors to complete online surveys and opinion polls about their activities, attitudes, and interests. These surveys help us improve our products and services. When asking for participation in these surveys, we may ask you to provide us with your name and email address.<br /><br />
          <h6>Website Forms</h6>
          Our Website/app may offer visitors contact forms to request additional details and to download collateral. If you fill out one of our web forms, we may ask you for information such as your name and email address so we can respond to your questions and comments. If you choose to correspond with us via web forms, we may retain the form data which can include name, email address and other contact-related details.<br /><br />
          <h6>Support Community Q&A Posts</h6>
          Our Website/app Load 41 Community site may contain self-reported demographics. If you choose to correspond with us and the community, we may retain the data which could include name, email address and other contact-related details.<br /><br />
          <h6>Website Usage Information</h6>
          <h6>Cookies</h6>
          When visiting Load 41, we may use cookies on or in connection with our Website to maintain information about you. A cookie is a very small text document, which often includes an anonymous unique identifier and additional information necessary to support the site's intended functionality. Load 41 uses session cookies. A session cookie is temporary and disappears after you close your browser.<br />
          Technologies such as: cookies, beacons, tags, and scripts are used by Load 41 and our marketing partners, analytics providers, and customer support systems. These technologies are used in analyzing trends, administering the site, tracking users’ movements around the site, and to gather demographic information about our user base as a whole. We may receive reports based on the use of these technologies by these companies on an individual as well as aggregated basis.<br /><br />
          We use cookies for marketing and for authentication. Users can control the use of cookies at the individual browser level. If you reject cookies, you may still use our site, but your ability to use some features or areas of our site may be limited.<br /><br />
          Most web browsers can be set to tell you when a cookie has been sent to you and give you the opportunity to refuse that cookie. Refusing a cookie may in some cases prevent you from using or negatively impact the display or function of our Website/app or certain areas or features of our Website/app. There are numerous resources on the Internet that can provide more information about how cookies work and how you can manage them.<br /><br />
          <h6>Web Beacons</h6>
          Web Beacons, also known as pixel tags and clear GIFs ("Web Beacons"), are electronic images that allow a Website/app to access cookies and help track marketing campaigns and general usage patterns of visitors to those websites. Web Beacons can recognize certain types of information, such as cookie numbers, time and date of a page view, and a description of the page where the Web Beacons is placed. No personally identifiable information about you is shared with third parties through the use of Web Beacons on the Site. However, through Web Beacons, we may collect general information that will not personally identify you, such as Internet browser, operating system, IP address, date of visit, time of visit, and path taken through the Site.<br /><br />
          <h6>Internal Use of Web Beacons</h6>
          Load 41 may use Web Beacons internally to count visitors and recognize visitors through cookies. Access to cookies helps personalize your experience when you visit the Site.<br /><br />
          <h6>Email</h6>
          Load 41 may include Web Beacons in HTML-formatted email messages that Load 41 sends to you. Web Beacons in email messages help determine your interest in and the effectiveness of such emails.<br /><br />
          <h6>External Use of Web Beacons</h6><br />
          Load 41 may also use Web Beacons externally. For example, to submit complaints, Load 41 may report aggregate information about visitors, such as demographic and usage information, to its affiliates and other third parties. Load 41 may also include other Web Beacons within the Site.<br /><br />
          <h6>Your Opt In/Opt Out Choices</h6>
          You may “opt in” and/or “opt out” of certain uses of your Personal Information. For example, you may have the opportunity to choose whether you would like to receive email correspondence from us. Your Personal Information will not be shared with third-party service providers unless you give consent. You will have the opportunity to opt out of Load 41 marketing emails by clicking the "opt out" or “unsubscribe” link in the email you receive. You can also request this by filling out a web form via our Data Subject Access Request (DSAR) Portal. If the Load 41 DSAR Portal is unavailable, requests can be sent at <Link to='/contact_us'>Cantact Form</Link>.<br /><br />
          Please take note that if you opt out of receiving promotional correspondence from us, we may still contact you in connection with your relationship, activities, transactions, and communications with us.
          Permitted Use of Personal Information<br /><br />
          Load 41 uses Personal Information about you to provide the services and products that you request; to answer your questions; to communicate with you about your account and activities on this Site/app; to offer you personalized services and content; to resolve disputes, collect fees, and troubleshoot problems; to enforce our Terms of Use; to perform research and analysis about your use of, or interest in, our services, products, or content; to manage and improve our products, services, and operations; to protect our rights or property or the security or integrity of our services or the Load 41 Community; to perform functions as otherwise described to you at the time of collection; and to comply with legal obligations.<br /><br />
          <h6>Permitted Disclosures</h6>
          <h6>We may disclose Personal Information we collect or receive:</h6>
          •	With your consent (for example, when you agree to our sharing your information with other third parties for their own marketing purposes subject to their separate privacy policies);<br />
          •	With third-party vendors, consultants, and other service providers who work on our behalf and need access to your information to carry out their work for us;<br />
          •	To comply with laws or to respond to lawful requests and legal processes;<br />
          •	To protect the rights and property of Load 41, our agents, customers, and others, including to enforce our agreements, policies, and Terms of Use;<br />
          •	In an emergency to protect the personal safety of Load 41, its customers, or any person;<br />
          •	In connection with or during negotiation of any merger, financing, acquisition, or dissolution, transaction, or proceeding involving the sale, transfer, divestiture, or disclosure of all or a portion of our business or assets to another company.<br />
          We may also share aggregated or de-identified information, which cannot reasonably be used to identify you.<br /><br />

          <h6>California Consumer Privacy Act (CCPA)</h6>
          On January 1, 2020, the California Consumer Privacy Act of 2018 (CCPA) took effect and sets new requirements and rights relating to personal information of California consumers. This section for California residents applies solely to visitors, users, and others who reside in the State of California (“consumers” or “you”). We adopt this notice to comply with the California Consumer Privacy Act of 2018 (“CCPA”) and other California privacy laws. Any terms defined in the CCPA have the same meaning when used in this notice.
          Information We Collect<br />
          We collect information that identifies, relates to, describes, references, is capable of being associated with, or could reasonably be linked, directly or indirectly, with a particular consumer or device (“personal information”). In particular, we have collected the following categories of personal information from consumers within the last twelve (12) months:
          Category	Examples	Collected<br /><br />
          <table>
            <tr style={{ border: '1px solid #fff' }}><td style={{ border: '1px solid #fff' }}>A. Identifiers.</td><td style={{ border: '1px solid #fff' }}>A real name, alias, postal address, unique personal identifier, online identifier, Internet Protocol address, email address, account name, Social Security number, driver's license number, passport number, or other similar identifiers.</td><td style={{ border: '1px solid #fff' }}>Yes</td></tr>
            <tr style={{ border: '1px solid #fff' }}><td style={{ border: '1px solid #fff' }}>B. Personal information categories listed in the California Customer Records statute (Cal. Civ. Code § 1798.80(e)).</td><td style={{ border: '1px solid #fff' }}>A name, signature, Social Security number, physical characteristics or description, address, telephone number, passport number, driver's license or state identification card number, insurance policy number, education, employment, employment history, bank account number, credit card number, debit card number, or any other financial information, medical information, or health insurance information.Some personal information included in this category may overlap with other categories.</td><td style={{ border: '1px solid #fff' }}>Yes</td></tr>
            <tr style={{ border: '1px solid #fff' }}><td style={{ border: '1px solid #fff' }}>C. Protected classification characteristics under California or federal law.</td><td style={{ border: '1px solid #fff' }}>Age (40 years or older),race, color, ancestry, national origin, citizenship, religion or creed, marital status, medical condition, physical or mental disability, sex (including gender, gender identity, gender expression, pregnancy or childbirth and related medical conditions),sexual orientation, veteran or military status, genetic information (including familial genetic information).</td><td style={{ border: '1px solid #fff' }}>Yes</td></tr>
            <tr style={{ border: '1px solid #fff' }}><td style={{ border: '1px solid #fff' }}>D. Commercial information.</td><td style={{ border: '1px solid #fff' }}>Records of personal property, products or services purchased, obtained, or considered, or other purchasing or consuming histories or tendencies.</td><td style={{ border: '1px solid #fff' }}>Yes</td></tr>
            <tr style={{ border: '1px solid #fff' }}><td style={{ border: '1px solid #fff' }}>F. Internet or other similar network activity.</td><td style={{ border: '1px solid #fff' }}>Browsing history, search history, information on a consumer's interaction with a website, application, or advertisement.</td><td style={{ border: '1px solid #fff' }}>Yes</td></tr>
            <tr style={{ border: '1px solid #fff' }}><td style={{ border: '1px solid #fff' }}>G. Geolocation data.</td><td style={{ border: '1px solid #fff' }}>Physical location or movements.</td><td style={{ border: '1px solid #fff' }}>Yes</td></tr>
            <tr style={{ border: '1px solid #fff' }}><td style={{ border: '1px solid #fff' }}>H. Sensory data.</td><td style={{ border: '1px solid #fff' }}>Audio, electronic, visual, thermal, olfactory, or similar information.</td><td style={{ border: '1px solid #fff' }}>Yes</td></tr>
            <tr style={{ border: '1px solid #fff' }}><td style={{ border: '1px solid #fff' }}>I. Professional or employment-related information.</td><td style={{ border: '1px solid #fff' }}>Current or past job history or performance evaluations.</td><td style={{ border: '1px solid #fff' }}>No</td></tr>
            <tr style={{ border: '1px solid #fff' }}><td style={{ border: '1px solid #fff' }}>J. Non-public education information (per the Family Educational Rights and Privacy Act (20 U.S.C. Section 1232g, 34 C.F.R. Part 99)).</td><td style={{ border: '1px solid #fff' }}>Education records directly related to a student maintained by an educational institution or party acting on its behalf, such as grades, transcripts, class lists, student schedules, student identification codes, student financial information, or student disciplinary records.</td><td style={{ border: '1px solid #fff' }}>No</td></tr>
            <tr style={{ border: '1px solid #fff' }}><td style={{ border: '1px solid #fff' }}>K. Inferences drawn from other personal information.</td><td style={{ border: '1px solid #fff' }}>Profile reflecting a person's preferences, characteristics, psychological trends, predispositions, behavior, attitudes, intelligence, abilities, and aptitudes.</td><td style={{ border: '1px solid #fff' }}>No</td></tr>
          </table>
          <br />
          <h6>California Consumer Privacy Act (CCPA)</h6>
          Effective January 1, 2020, the California Consumer Privacy Act of 2018 (CCPA) establishes new requirements and rights regarding the personal information of California consumers. This section is exclusively for residents of California and applies to visitors, users, and others residing in California ("consumers" or "you"). We have adopted this notice to comply with the CCPA and other California privacy laws. Terms defined in the CCPA have the same meanings when used in this notice.<br /><br />
          <h6>Fair Information Practices</h6>
          The Fair Information Practices Principles form the backbone of privacy law in the United States and have influenced data protection laws globally. Understanding these principles is crucial to comply with various privacy laws that protect personal information. In alignment with Fair Information Practices, we will take the following actions in the event of a data breach:<br /><br />
          •	Notify users via email within 7 business days.<br />
          •	Adhere to the individual redress principle, which ensures that individuals have the right to pursue legally enforceable rights against data collectors and processors who fail to comply with the law. This principle also ensures that individuals have access to courts or government agencies to investigate and/or prosecute non-compliance by data processors.<br />
          <h6>CAN-SPAM Act</h6>
          The CAN-SPAM Act sets the rules for commercial email, establishes requirements for commercial messages, gives recipients the right to stop receiving emails, and outlines tough penalties for violations. To comply with CAN-SPAM, we agree to the following:<br />
          If you wish to unsubscribe from receiving future emails, please email us at <Link to='/contact_us'>Cantact Form</Link> and we will promptly remove you from all correspondence.<br />
          Children’s Online Privacy Protection Act (COPPA)<br />
          Load 41 complies with the requirements of the Children's Online Privacy Protection Act (COPPA). We do not collect any information from anyone under 18 years of age. Our website, products, and services are all directed to individuals who are at least 18 years old. If we learn that we have mistakenly collected personal information from a child under age 18, we will delete that information as soon as possible. If you believe that we might have information from or about a child under age 18, please contact us via email at <Link to='/contact_us'>Cantact Form</Link>.<br /><br />
          <h6>Terms of Use</h6>
          This Privacy Policy is governed by the Terms of Use, which includes all disclaimers of warranties and limitations of liabilities. All capitalized terms not defined in this Privacy Policy will have the meanings set forth in the Terms of Use. To review other applicable terms and conditions that apply to this Privacy Policy, including, without limitation, intellectual property rights, representations and warranties, disclaimer of warranties, limitation of liability, and resolving disputes, please review the Terms of Use.<br /><br />
          <h6>Updates to Our Privacy Statement</h6>
          We may need to change, modify, and/or update this Privacy Policy from time to time, and we reserve the right to do so without prior notice and at any time. If we make changes to how personal information is used or managed, any updates will be posted here. You should revisit this Privacy Policy periodically. Your continued use of the Site and any Services following the posting of any changes will automatically be deemed your acceptance of all changes.<br /><br />
          <h6>Contact Us</h6>
          If you have any questions or comments about this Privacy Policy, or if you would like to review, delete, or update information we have about you or your preferences, requests should be submitted through our Data Subject Access Request (DSAR) Portal. If the Load 41 DSAR portal is unavailable, requests can be sent at <Link to='/contact_us'>Cantact Form</Link> or to:<br />
          LOAD 41<br />
          1006 WEST CENTENNIAL RD<br />
          PAPILLION, NE 68046<br />
          USA<br />
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

export default PrivacyPolicy