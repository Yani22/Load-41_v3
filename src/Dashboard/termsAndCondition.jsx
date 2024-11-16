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


const TermsAndConditions = () => {
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
          <h2>LOAD 41</h2>
          <h4>Terms of Service</h4>
          <h6>Last Updated: 27 April 2024</h6>
          <p style={{ textAlign: 'left', color: '#fff' }}>
            <h5>Welcome to Load 41!</h5>
            Thank you for your interest in Load 41. ("Load 41," "we," or "us") and our mobile application for Drivers and the associated service (collectively, the "App"). These Terms of Service are a legally binding contract between you and Load 41 regarding your use of the App.
            <br /><br />
            <h5>PLEASE READ THE FOLLOWING TERMS CAREFULLY.</h5>

            BY CLICKING "I ACCEPT," (OR OTHER WORDS INDICATING YOUR AGREEMENT) OR BY DOWNLOADING, INSTALLING, OR OTHERWISE ACCESSING OR USING THE APP, YOU AGREE THAT YOU HAVE READ AND UNDERSTOOD, AND, AS A CONDITION TO YOUR USE OF THE APP, YOU AGREE TO BE BOUND BY, THE FOLLOWING TERMS AND CONDITIONS, INCLUDING LOAD 41’s DRIVER PRIVACY POLICY (TOGETHER, THESE "TERMS"). IF YOU ARE NOT ELIGIBLE, OR DO NOT AGREE TO THE TERMS, THEN YOU DO NOT HAVE OUR PERMISSION TO USE THE APP. YOUR USE OF THE APP, AND LOAD 41’s PROVISION OF THE APP TO YOU, CONSTITUTES AN AGREEMENT BY LOAD 41 AND BY YOU TO BE BOUND BY THESE TERMS.

            ARBITRATION NOTICE. Except for certain kinds of disputes described in Section 14, you agree that disputes arising under these Terms will be resolved by binding, individual arbitration, and BY ACCEPTING THESE TERMS, YOU AND LOAD 41 ARE EACH WAIVING THE RIGHT TO A TRIAL BY JURY OR TO PARTICIPATE IN ANY CLASS ACTION OR REPRESENTATIVE PROCEEDING. YOU AGREE TO GIVE UP YOUR RIGHT TO GO TO COURT to assert or defend your rights under this contract (except for matters that may be taken to small claims court). Your rights will be determined by a NEUTRAL ARBITRATOR and NOT a judge or jury. (See Section 14.)
            <br /><br />
            <h5>1. Load 41 App Overview</h5>
            Load 41 is in the business of, among other things providing a tracking solution for shippers of goods or third-party logistics companies (collectively, "Shippers") through various carriers ("Carriers"). You are a driver on behalf of a Carrier (a "Driver") or employ a Driver, and are transporting one or more goods (the "Equipment") of such Shipper and have agreed to the collection and use of information as further described in our Driver Privacy Policy and as set out in these Terms.
            <br /><br />
            <h5>2. Eligibility</h5>
            You must be at least 18 years old to use the App. By agreeing to these Terms, you represent and warrant to us that: (a) you are at least 18 years old; (b) you have not previously been suspended or removed from the App; (c) your use of the App is in compliance with any and all applicable laws and regulations; and (d) you are the Driver of the Equipment at issue. If you are an entity, organization, or company, the individual accepting these Terms on your behalf represents and warrants that they have authority to bind you to these Terms, you agree to be bound by these Terms, and you have obtained the necessary consent to from the Driver to the data practices described in the Driver Privacy Policy as well as in these Terms.
            <br /><br />
            <h5>3. Accounts and Registration</h5>
            You will be, or have been, invited to download the App. That invitation will include a unique Equipment identifier (an "Equipment ID"). After you have downloaded the mobile app, you will be able to associate the Equipment ID with your instance of the App.
            <br /><br />
            <h5>4. Licenses</h5>
            <h5>4.1 Limited License</h5>
            Subject to your complete and ongoing compliance with these Terms, Load 41 grants you, solely for your individual, commercial use in connection with the delivery of Equipment corresponding to the issued Equipment IDs, a limited, non-exclusive, non-transferable, non-sublicensable, revocable license to install and use one object code copy of the App obtained from a legitimate marketplace on a mobile device that you own or control.
            <br /><br />
            <h5>4.2 License Restrictions</h5>
            Except and solely to the extent such a restriction is impermissible under applicable law, you may not:
            <br /><br />
            (a) reproduce, distribute, publicly display, or publicly perform the App;<br />
            (b) make modifications to the App; or<br />
            (c) interfere with or circumvent any feature of the App, including any security or access control mechanism.<br />
            If you are prohibited under applicable law from using the App, you may not use it.<br />
            <br />
            <h5>4.3 Feedback</h5>
            If you choose to provide input and suggestions regarding problems with or proposed modifications or improvements to the App ("Feedback"), then you hereby grant Load 41 an unrestricted, perpetual, sublicensable, irrevocable, non-exclusive, fully-paid, royalty-free right to exploit the Feedback in any manner and for any purpose, including to improve the App and create other products and services.
            <br /><br />
            <h5>5. Ownership; Proprietary Rights</h5>
            The App is owned and operated by Load 41. The visual interfaces, graphics, design, compilation, information, data, computer code (including source code or object code), products, software, services, and all other elements of the App ("Materials") provided by Load 41 are protected by intellectual property and other laws. All Materials included in the App or made available through the App are the property of Load 41 or its third-party licensors. Except as expressly authorized by Load 41, you may not make use of the Materials. Load 41 reserves all rights to the Materials not granted expressly in these Terms.
            <br /><br />
            <h5>6. User Content</h5>
            <h5>6.1 User Content Generally</h5>
            Certain features of the App may permit users (including you) to upload content to the App, including photos, video, images data, text, and other types of works ("User Content") and to publish User Content. You retain any copyright and other proprietary rights that you may hold in the User Content that you post or submit through the App.
            <br /><br />
            <h5>6.2 Limited License Grant to Load 41 </h5>
            By providing User Content to or via the App, you grant Load 41 a worldwide, perpetual, non-exclusive, irrevocable, royalty-free, fully paid right and license (with the right to sublicense) to host, store, transfer, display, perform, reproduce, modify for the purpose of formatting for display, and distribute your User Content, in whole or in part, in any media formats and through any media channels now known or hereafter developed.
            <br /><br />
            <h5>6.3 Limited License Grant to Other Users</h5>
            By providing User Content to or via the App, you grant those other users of our products and services, a non-exclusive license to access and use that User Content as permitted by these Terms and the functionality of the App, and our products and services.
            <br /><br />
            <h5>6.4 User Content Representations and Warranties</h5>
            Load 41 disclaims any and all liability in connection with User Content. You are solely responsible for your User Content and the consequences of providing User Content via the App. By providing User Content via the App, you affirm, represent, and warrant that:<br />

            a. you are the creator and owner of the User Content, or have the necessary licenses, rights, consents, and permissions to authorize Load 41 and users of the App and our products and services to use and distribute your User Content as necessary to exercise the licenses granted by you in this Section, in the manner contemplated by Load 41, the App, and these Terms;<br />
            b. your User Content, and the use of your User Content as contemplated by these Terms, does not and will not: (i) infringe, violate, or misappropriate any third party right, including any copyright, trademark, patent, trade secret, moral right, privacy right, right of publicity, or any other intellectual property or proprietary right; (ii) slander, defame, libel, or invade the right of privacy, publicity or other property rights of any other person; or (iii) cause Load 41 to violate any law or regulation; and<br />
            c. your User Content could not be deemed by a reasonable person to be objectionable, profane, indecent, pornographic, harassing, threatening, embarrassing, hateful, or otherwise inappropriate.
            <h5>6.5 User Content Disclaimer</h5>
            We are under no obligation to edit or control User Content that you or other users post or publish, and will not be in any way responsible or liable for User Content. Load 41 may, however, at any time and without prior notice, screen, remove, edit, or block any User Content that in our sole judgment violates these Terms or is otherwise objectionable. You understand that when using the App you will be exposed to User Content from a variety of sources and acknowledge that User Content may be inaccurate, offensive, indecent, or objectionable. You agree to waive, and do waive, any legal or equitable right or remedy you have or may have against Load 41 with respect to User Content. If notified by a user or content owner that User Content allegedly does not conform to these Terms, we may investigate the allegation and determine in our sole discretion whether to remove the User Content, which we reserve the right to do at any time and without notice. For clarity, Load 41 does not permit copyright-infringing activities on the App.
            <br /><br />
            <h5>6.6 Monitoring Content</h5>
            Load 41 does not control and does not have any obligation to monitor: (a) User Content; (b) any content made available by third parties; or (c) the use of the App by its users. You acknowledge and agree that Load 41 reserves the right to, and may from time to time, monitor any and all information transmitted or received through the App for operational and other purposes. If at any time Load 41 chooses to monitor the content, Load 41 still assumes no responsibility or liability for content or any loss or damage incurred as a result of the use of content. During monitoring, information may be examined, recorded, copied, and used in accordance with the Driver Privacy Policy.
            <br /><br />
            <h5>7. Prohibited Conduct</h5>
            BY USING THE APP, YOU AGREE NOT TO:<br />

            a. use the App for any illegal purpose or in violation of any local, state, national, or international law;<br />
            b. harass, threaten, demean, embarrass, or otherwise harm any other user of the App;<br />
            c. violate, or encourage others to violate, any right of a third party, including by infringing or misappropriating any third-party intellectual property right;<br />
            d. interfere with security-related features of the App, including by: (i) disabling or circumventing features that prevent or limit use or copying of any content; or (ii) reverse engineering or otherwise attempting to discover the source code of any portion of the App except to the extent that the activity is expressly permitted by applicable law;<br />
            e. interfere with the operation of the App or any user’s enjoyment of the App, including by: (i) uploading or otherwise disseminating any virus, adware, spyware, worm, or other malicious code; (ii) making any unsolicited offer or advertisement to another user of the App; (iii) collecting personal information about another user or third party without consent; or (iv) interfering with or disrupting any network, equipment, or server connected to or used to provide the App;<br />
            f. perform any fraudulent activity including impersonating any person or entity, claiming a false affiliation, accessing any other App account without permission, or falsifying your age or date of birth;<br />
            g. sell or otherwise transfer the access granted under these Terms or any Materials (as defined in Section 5) or any right or ability to view, access, or use any Materials; or<br />
            h. attempt to do any of the acts described in this Section 7 or assist or permit any person in engaging in any of the acts described in this Section 7.<br />
            <br />
            <h5>8. Digital Millennium Copyright Act</h5>
            <h5>8.1 DMCA Notification</h5>
            We comply with the provisions of the Digital Millennium Copyright Act applicable to Internet service providers (17 U.S.C. §512, as amended). If you have an intellectual property rights-related complaint about material posted on the App, you may contact our office at the following address:<br />

            Load 41<br />
            1006 West Centennial Rd<br />
            Papillion, NE 68046<br />
            Any notice alleging that materials hosted by or distributed through the App infringe intellectual property rights must comply include the following information:<br />

            a. an electronic or physical signature of the person authorized to act on behalf of the owner of the copyright or other right being infringed;<br />
            b. a description of the copyrighted work or other intellectual property that you claim has been infringed;<br />
            c. a description of the material that you claim is infringing and where it is located on the App;<br />
            d. your address, telephone number, and email address;<br />
            e. a statement by you that you have a good faith belief that the use of the materials on the App of which you are complaining is not authorized by the copyright owner, its agent, or the law; and<br />
            f. a statement by you that the above information in your notice is accurate and that, under penalty of perjury, you are the copyright or intellectual property owner or authorized to act on the copyright or intellectual property owner’s behalf.<br />
            <br />
            <h5>8.2 Repeat Infringers</h5>
            Load 41 will promptly terminate the accounts of users that are determined by Load 41 to be repeat infringers.
            <br /><br />
            <h5>9. Modification of these Terms</h5>
            We reserve the right to change these Terms on a going-forward basis. Please check these Terms periodically for changes. If a change to these Terms materially modifies your rights or obligations, we may require that you accept the modified Terms in order to continue to use the App. Material modifications are effective upon your acceptance of the modified Terms. Immaterial modifications are effective upon publication. Except as expressly permitted in this Section 9, these Terms may be amended only by a written agreement signed by authorized representatives of the parties to these Terms. Disputes arising under these Terms will be resolved in accordance with the version of these Terms that was in effect at the time the dispute arose.
            <br /><br />
            <h5>10. Term, Termination and Modification of the App</h5>
            <h5>10.1 Term</h5>
            These Terms are effective beginning when you accept the Terms or first download, install, access, or use the App, and ending when terminated as described in Section 10.2.
            <br /><br />
            <h5>10.2 Termination</h5>
            If you violate any provision of these Terms, your authorization to access the App and these Terms automatically terminate. In addition, Load 41 may, at its sole discretion, terminate these Terms or your account, or suspend or terminate your access to the App, at any time for any reason or no reason, with or without notice.
            <br /><br />
            <h5>10.3 Effect of Termination</h5>
            Upon termination of these Terms: (a) your license rights will terminate and you must immediately cease all use of the App; (b) you will no longer be authorized to access your account or the App; (c) you must pay Load 41 any unpaid amount that was due prior to termination; and (d) Sections 4.3, 5, 6, 10.3, 11, 12, 13, 14 and 15 will survive.
            <br /><br />
            <h5>10.4 Modification of the App</h5>
            Load 41 reserves the right to modify or discontinue the App at any time (including by limiting or discontinuing certain features of the App), temporarily or permanently, without notice to you. Load 41 will have no liability for any change to the App or any suspension or termination of your access to or use of the App.
            <br /><br />
            <h5>11. Indemnity</h5>
            To the fullest extent permitted by law, you are responsible for your use of the App, and you will defend and indemnify Load 41 and its officers, directors, employees, consultants, affiliates, subsidiaries and agents (together, the "Load 41 Entities") from and against every claim brought by a third party (including Carriers and Shippers), and any related liability, damage, loss, and expense, including reasonable attorneys’ fees and costs, arising out of or connected with: (a) your unauthorized use of, or misuse of, the App; (b) your violation of any portion of these Terms, any representation, warranty, or agreement referenced in these Terms, or any applicable law or regulation; (c) your violation of any third party right, including any intellectual property right or publicity, confidentiality, other property, or privacy right; or (d) any dispute or issue between you and any third party, including a Shipper or Carrier. We reserve the right, at our own expense, to assume the exclusive defense and control of any matter otherwise subject to indemnification by you (without limiting your indemnification obligations with respect to that matter), and in that case, you agree to cooperate with our defense of those claims.
            <br /><br />
            <h5>12. Disclaimers; No Warranties</h5>
            THE APP AND ALL MATERIALS AND CONTENT AVAILABLE THROUGH THE APP ARE PROVIDED "AS IS" AND ON AN "AS AVAILABLE" BASIS. LOAD 41 DISCLAIMS ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, RELATING TO THE APP AND ALL MATERIALS AND CONTENT AVAILABLE THROUGH THE APP, INCLUDING: (A) ANY IMPLIED WARRANTY OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, QUIET ENJOYMENT, OR NON-INFRINGEMENT; AND (B) ANY WARRANTY ARISING OUT OF COURSE OF DEALING, USAGE, OR TRADE. Load 41 DOES NOT WARRANT THAT THE APP OR ANY PORTION OF THE APP, OR ANY MATERIALS OR CONTENT OFFERED THROUGH THE APP, WILL BE UNINTERRUPTED, SECURE, OR FREE OF ERRORS, VIRUSES, OR OTHER HARMFUL COMPONENTS, AND Load 41 DOES NOT WARRANT THAT ANY OF THOSE ISSUES WILL BE CORRECTED.

            NO ADVICE OR INFORMATION, WHETHER ORAL OR WRITTEN, OBTAINED BY YOU FROM THE APP OR Load 41 ENTITIES OR ANY MATERIALS OR CONTENT AVAILABLE THROUGH THE APP WILL CREATE ANY WARRANTY REGARDING ANY OF THE Load 41 ENTITIES OR THE APP THAT IS NOT EXPRESSLY STATED IN THESE TERMS. WE ARE NOT RESPONSIBLE FOR ANY DAMAGE THAT MAY RESULT FROM THE APP AND YOUR DEALING WITH ANY OTHER USER OR ANY SHIPPER OR CARRIER. YOU UNDERSTAND AND AGREE THAT YOU USE ANY PORTION OF THE APP AT YOUR OWN DISCRETION AND RISK, AND THAT WE ARE NOT RESPONSIBLE FOR ANY DAMAGE TO YOUR PROPERTY (INCLUDING YOUR COMPUTER SYSTEM OR MOBILE DEVICE USED IN CONNECTION WITH THE APP) OR ANY LOSS OF DATA, INCLUDING USER CONTENT.

            THE LIMITATIONS, EXCLUSIONS AND DISCLAIMERS IN THIS SECTION APPLY TO THE FULLEST EXTENT PERMITTED BY LAW. Load 41 does not disclaim any warranty or other right that Load 41 is prohibited from disclaiming under applicable law.
            <br /><br />
            <h5>13. Limitation of Liability</h5>
            TO THE FULLEST EXTENT PERMITTED BY LAW, IN NO EVENT WILL THE Load 41 ENTITIES BE LIABLE TO YOU FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL OR PUNITIVE DAMAGES (INCLUDING DAMAGES FOR LOSS OF PROFITS, GOODWILL, OR ANY OTHER INTANGIBLE LOSS) ARISING OUT OF OR RELATING TO YOUR ACCESS TO OR USE OF, OR YOUR INABILITY TO ACCESS OR USE, THE APP OR ANY MATERIALS OR CONTENT ON THE APP, WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE), STATUTE, OR ANY OTHER LEGAL THEORY, AND WHETHER OR NOT Load 41 ENTITIES HAVE BEEN INFORMED OF THE POSSIBILITY OF DAMAGE.

            EXCEPT AS PROVIDED IN SECTION 14.4 AND TO THE FULLEST EXTENT PERMITTED BY LAW, THE AGGREGATE LIABILITY OF THE Load 41 ENTITIES TO YOU FOR ALL CLAIMS ARISING OUT OF OR RELATING TO THE USE OF OR ANY INABILITY TO USE ANY PORTION OF THE APP OR OTHERWISE UNDER THESE TERMS, WHETHER IN CONTRACT, TORT, OR OTHERWISE, IS LIMITED TO $100.

            EACH PROVISION OF THESE TERMS THAT PROVIDES FOR A LIMITATION OF LIABILITY, DISCLAIMER OF WARRANTIES, OR EXCLUSION OF DAMAGES IS INTENDED TO AND DOES ALLOCATE THE RISKS BETWEEN THE PARTIES UNDER THESE TERMS. THIS ALLOCATION IS AN ESSENTIAL ELEMENT OF THE BASIS OF THE BARGAIN BETWEEN THE PARTIES. EACH OF THESE PROVISIONS IS SEVERABLE AND INDEPENDENT OF ALL OTHER PROVISIONS OF THESE TERMS. THE LIMITATIONS IN THIS SECTION 13 WILL APPLY EVEN IF ANY LIMITED REMEDY FAILS OF ITS ESSENTIAL PURPOSE.
            <br /><br />
            <h5>14. Dispute Resolution and Arbitration</h5>
            <h5>14.1 Generally</h5>
            In the interest of resolving disputes between you and Load 41 in the most expedient and cost-effective manner, and except as described in Section 14.2, you and Load 41 agree that every dispute arising in connection with these Terms will be resolved by binding arbitration. Arbitration is less formal than a lawsuit in court. Arbitration uses a neutral arbitrator instead of a judge or jury, may allow for more limited discovery than in court, and can be subject to very limited review by courts. Arbitrators can award the same damages and relief that a court can award. This agreement to arbitrate disputes includes all claims arising out of or relating to any aspect of these Terms, whether based in contract, tort, statute, fraud, misrepresentation, or any other legal theory, and regardless of whether a claim arises during or after the termination of these Terms. YOU UNDERSTAND AND AGREE THAT, BY ENTERING INTO THESE TERMS, YOU AND Load 41 ARE EACH WAIVING THE RIGHT TO A TRIAL BY JURY OR TO PARTICIPATE IN A CLASS ACTION.
            <br /><br />
            <h5>14.2 Exceptions</h5>
            Despite the provisions of Section 14.1, nothing in these Terms will be deemed to waive, preclude, or otherwise limit the right of either party to: (a) bring an individual action in small claims court; (b) pursue an enforcement action through the applicable federal, state, or local agency if that action is available; (c) seek injunctive relief in a court of law in aid of arbitration; or (d) to file suit in a court of law to address an intellectual property infringement claim.
            <br /><br />
            <h5>14.3 Arbitrator</h5>
            Any arbitration between you and Load 41 will be settled under the Federal Arbitration Act and administered by the American Arbitration Association ("AAA") under its Consumer Arbitration Rules (collectively, "AAA Rules") as modified by these Terms. The AAA Rules and filing forms are available online at www.adr.org, by calling the AAA at 1-800-778-7879, or by contacting Load 41. The arbitrator has exclusive authority to resolve any dispute relating to the interpretation, applicability, or enforceability of this binding arbitration agreement.
            <br /><br />
            <h5>14.4 Notice of Arbitration; Process</h5>
            A party who intends to seek arbitration must first send a written notice of the dispute to the other party by certified U.S. Mail or by Federal Express (signature required) or, only if that other party has not provided a current physical address, then by electronic mail ("Notice of Arbitration"). Load 41’s address for Notice is: 2807 S 87th Ave, Omaha, NE 68124, United States. The Notice of Arbitration must: (a) describe the nature and basis of the claim or dispute; and (b) set forth the specific relief sought ("Demand"). The parties will make good faith efforts to resolve the claim directly, but if the parties do not reach an agreement to do so within 30 days after the Notice of Arbitration is received, you or Load 41 may commence an arbitration proceeding. All arbitration proceedings between the parties will be confidential unless otherwise agreed by the parties in writing. During the arbitration, the amount of any settlement offer made by you or Load 41 must not be disclosed to the arbitrator until after the arbitrator makes a final decision and award, if any. If the arbitrator awards you an amount higher than the last written settlement amount offered by Load 41 in settlement of the dispute prior to the award, Load 41 will pay to you the higher of: (i) the amount awarded by the arbitrator; or (ii) $10,000.
            <br /><br />
            <h5>14.5 Fees</h5>
            If you commence arbitration in accordance with these Terms, Load 41 will reimburse you for your payment of the filing fee, unless your claim is for more than $10,000, in which case the payment of any fees will be decided by the AAA Rules. Any arbitration hearing will take place at a location to be agreed upon in Omaha, NE, but if the claim is for $10,000 or less, you may choose whether the arbitration will be conducted: (a) solely on the basis of documents submitted to the arbitrator; (b) through a non-appearance based telephone hearing; or (c) by an in-person hearing as established by the AAA Rules in the county (or parish) of your billing address. If the arbitrator finds that either the substance of your claim or the relief sought in the Demand is frivolous or brought for an improper purpose (as measured by the standards set forth in Federal Rule of Civil Procedure 11(b)), then the payment of all fees will be governed by the AAA Rules. In that case, you agree to reimburse Load 41 for all monies previously disbursed by it that are otherwise your obligation to pay under the AAA Rules. Regardless of the manner in which the arbitration is conducted, the arbitrator must issue a reasoned written decision sufficient to explain the essential findings and conclusions on which the decision and award, if any, are based. The arbitrator may make rulings and resolve disputes as to the payment and reimbursement of fees or expenses at any time during the proceeding and upon request from either party made within 14 days of the arbitrator’s ruling on the merits.
            <br /><br />
            <h5>14.6 No Class Actions</h5>
            YOU AND LOAD 41 AGREE THAT EACH MAY BRING CLAIMS AGAINST THE OTHER ONLY IN YOUR OR ITS INDIVIDUAL CAPACITY AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS OR REPRESENTATIVE PROCEEDING. Further, unless both you and Load 41 agree otherwise, the arbitrator may not consolidate more than one person’s claims, and may not otherwise preside over any form of a representative or class proceeding.
            <br /><br />
            <h5>14.7 Modifications to this Arbitration Provision</h5>
            If Load 41 makes any future change to this arbitration provision, other than a change to Load 41 address for Notice of Arbitration, you may reject the change by sending us written notice within 30 days of the change to Load 41 address for Notice of Arbitration, in which case your account with Load 41 will be immediately terminated and this arbitration provision, as in effect immediately prior to the changes you rejected will survive.
            <br /><br />
            <h5>14.8 Enforceability</h5>
            If Section 14.6 is found to be unenforceable or if the entirety of this Section 14 is found to be unenforceable, then the entirety of this Section 14 will be null and void and, in that case, the parties agree that the exclusive jurisdiction and venue described in Section 15.2 will govern any action arising out of or related to these Terms.
            <br /><br />
            <h5>15. Miscellaneous</h5>
            <h5>15.1 General Terms</h5>
            These Terms, together with the Driver Privacy Policy and any other agreements expressly incorporated by reference into these Terms, are the entire and exclusive understanding and agreement between you and Load 41 regarding your use of the App. You may not assign or transfer these Terms or your rights under these Terms, in whole or in part, by operation of law or otherwise, without our prior written consent. We may assign these Terms at any time without notice or consent. The failure to require performance of any provision will not affect our right to require performance at any other time after that, nor will a waiver by us of any breach or default of these Terms, or any provision of these Terms, be a waiver of any subsequent breach or default or a waiver of the provision itself. Use of section headers in these Terms is for convenience only and will not have any impact on the interpretation of any provision. Throughout these Terms the use of the word "including" means "including but not limited to". If any part of these Terms is held to be invalid or unenforceable, the unenforceable part will be given effect to the greatest extent possible, and the remaining parts will remain in full force and effect.
            <br /><br />
            <h5>15.2 Governing Law</h5>
            These Terms are governed by the laws of the State of Nebraska without regard to conflict of law principles. You and Load 41 submit to the personal and exclusive jurisdiction of the state courts and federal courts located within Omaha, NE for resolution of any lawsuit or court proceeding permitted under these Terms. We operate the App from our offices in Omaha, NE and we make no representation that Materials included in or made available through the App are appropriate or available for use in other locations.
            <br /><br />
            <h5>15.3 Privacy Policy</h5>
            Please read the Load 41 Privacy Policy carefully for information relating to our collection, use, storage, disclosure of your personal information. The Load 41 Privacy Policy is incorporated by this reference into, and made a part of, these Terms.
            <br /><br />
            <h5>15.4 Additional Terms</h5>
            Your use of the App is subject to all additional terms, policies, rules, or guidelines applicable to the App or certain features of the App that we may post on or link to from the App (the "Additional Terms"). All Additional Terms are incorporated by this reference into, and made a part of, these Terms.
            <br /><br />
            <h5>15.5 Consent to Electronic Communications</h5>
            By using the App, you consent to receiving certain electronic communications from us as further described in our Privacy Policy. Please read our Privacy Policy to learn more about our electronic communications practices. You agree that any notices, agreements, disclosures, or other communications that we send to you electronically will satisfy any legal communication requirements, including that those communications be in writing.
            <br /><br />
            <h5>15.6 Contact Information</h5>
            The App is offered by Load 41 Inc. located at 2807 S 87th Ave, Omaha, NE 68124, United States. You may contact us by sending correspondence to that address. You can access a copy of these Terms by clicking here: [TOS link]
            <br /><br />
            <h5>15.7 Notice to California Residents</h5>
            If you are a California resident, under California Civil Code Section 1789.3, you may contact the Complaint Assistance Unit of the Division of Consumer Services of the California Department of Consumer Affairs in writing at 1625 N. Market Blvd., Suite S-202, Sacramento, California 95834, or by telephone at (800) 952-5210 in order to resolve a complaint regarding the App or to receive further information regarding use of the App.
            <br /><br />
            <h5>15.8 No Support</h5>
            We are under no obligation to provide support for the App. In instances where we may offer support, the support will be subject to published policies.
            <br /><br />
            <h5>15.9 International Use</h5>
            The App is intended for visitors located within the United States. We make no representation that the App is appropriate or available for use outside of the United States. Access to the App from countries or territories or by individuals where such access is illegal is prohibited.
            <br /><br />
            <h5>16. Notice Regarding Apple</h5>
            This Section 16 only applies to the extent you are using our mobile application on an iOS device. You acknowledge that these Terms are between you and Load 41 only, not with Apple Inc. ("Apple"), and Apple is not responsible for the App or the content thereof. Apple has no obligation to furnish any maintenance and support services with respect to the App. If the App fails to conform to any applicable warranty, you may notify Apple and Apple will refund any applicable purchase price for the mobile application to you; and, to the maximum extent permitted by applicable law, Apple has no other warranty obligation with respect to the App. Apple is not responsible for addressing any claims by you or any third party relating to the App or your possession and/or use of the App, including: (a) product liability claims; (b) any claim that the App fails to conform to any applicable legal or regulatory requirement; or (c) claims arising under consumer protection or similar legislation. Apple is not responsible for the investigation, defense, settlement and discharge of any third-party claim that the App and/or your possession and use of the App infringes a third party’s intellectual property rights. You agree to comply with any applicable third-party terms when using the App. Apple and Apple’s subsidiaries are third party beneficiaries of these Terms, and upon your acceptance of these Terms, Apple will have the right (and will be deemed to have accepted the right) to enforce these Terms against you as a third-party beneficiary of these Terms. You hereby represent and warrant that: (i) you are not located in a country that is subject to a U.S. Government embargo, or that has been designated by the U.S. Government as a "terrorist supporting" country; and (ii) you are not listed on any U.S. Government list of prohibited or restricted parties.
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

export default TermsAndConditions