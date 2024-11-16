import React, { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Track } from "../Dashboard/Track";
import Dashboard from "../Dashboard/Dashboard";
import TrashCan from "../Dashboard/TrashPost";
import ConsigneeList from "../Dashboard/consigneeList";
import ShippersList from "../Dashboard/shippersList";
import ViewDAT from "../Dashboard/ViewDAT";
import ViewTruckstop from "../Dashboard/ViewTruckstop";
import TruckerPath from "../Dashboard/TruckerPath";
import CompanyList from "../Dashboard/companyDetails";
import TrackTruck from "../Dashboard/TrackTruck";
import TermsAndConditions from "../Dashboard/termsAndCondition";
import PrivacyPolicy from "../Dashboard/PrivacyPolicy";
import SupportPage from "../Dashboard/SupportPage";
import ContactPage from "../LandingPage/contactPage";
import About from "../LandingPage/about";
import Demo from "../LandingPage/demo";
import LandingPage from "../LandingPage/LandingPage";
import NotFound from "../LandingPage/NotFound";
import '../Assets/landingPage.css';
import { Container } from "react-bootstrap";
import CombinedTable from "../Dashboard/combinedTableData";
import DirectFreight from "../Dashboard/DirectFreight";
import SinglePageTracking from "../Dashboard/SinglePageTracking";
import UserProfile from "../Dashboard/Settings";
//const TrashCan = lazy(()=>lazyRetry(()=>import("../Dashboard/TrashPost"),'TrashPost'))
// const ConsigneeList = lazy(()=>lazyRetry(()=>import("../Dashboard/consigneeList"),'consigneeList'))
// const ShippersList = lazy(()=>lazyRetry(()=>import("../Dashboard/shippersList")),'shippersList')
// const ViewDAT = lazy(()=>lazyRetry(()=>import("../Dashboard/ViewDAT"),'ViewDAT'))
// const ViewTruckstop = lazy(()=>lazyRetry(()=>import("../Dashboard/ViewTruckstop"),'ViewTruckstop'))
// const TruckerPath = lazy(()=>lazyRetry(()=>import("../Dashboard/TruckerPath"),'TruckerPath'))
// const CompanyList = lazy(()=>lazyRetry(()=>import("../Dashboard/companyDetails"),'companyDetails'))
// const TrackTruck = lazy(()=>lazyRetry(()=>import("../Dashboard/TrackTruck"),'TrackTruck'))
// const TermsAndConditions = lazy(()=>lazyRetry(()=>import("../Dashboard/termsAndCondition"),'termsAndCondition'))
// const PrivacyPolicy = lazy(()=>lazyRetry(()=>import("../Dashboard/PrivacyPolicy"),'PrivacyPolicy'))
// const SupportPage = lazy(()=>lazyRetry(()=>import("../Dashboard/SupportPage"),'SupportPage'))
// const ContactPage = lazy(()=>lazyRetry(()=>import("../LandingPage/contactPage"),'contactPage'))
// const About = lazy(()=>lazyRetry(()=>import("../LandingPage/about"),'about'))
// const Demo = lazy(()=>lazyRetry(()=>import("../LandingPage/demo"),'demo'))
//const AddEditLoad = lazy(()=>import("../Dashboard/AddEditLoad"),'');
//const Dashboard = lazy(()=>lazyRetry(()=>import("../Dashboard/Dashboard"),'Dashboard'));
// const LandingPage = lazy(()=>lazyRetry(()=>import("../LandingPage/LandingPage"),'LandingPage'));
// const NotFound = lazy(()=>lazyRetry(()=>import("../LandingPage/NotFound"),'NotFound'));
// const lazyRetry = function(componentImport,name) {
//   return new Promise((resolve, reject) => {
//       const hasRefreshed = JSON.parse(
//         window.localStorage.getItem(`retry-${name}-refreshed`) || 'false'
//     );
//       componentImport().then((component) => {
//           window.localStorage.setItem(`retry-${name}-refreshed`, 'false');
//           resolve(component);
//       }).catch((error) => {
//           if (!hasRefreshed) {
//               window.localStorage.setItem(`retry-${name}-refreshed`, 'true');
//               return window.location.reload();
//           }
//           reject(error);
//       });
//   });
// };
const Main = () => {
  const uid = localStorage.getItem('id')
  const PrivateRoute = ({ children }) => {
    return uid ? children : <Navigate to="/" />
  };
  const PublicRoute = ({ children }) => {
    return !uid ? children : <Navigate to="/dashboard" />
  };
  const NotFoundChild = () => {
    return <div>
      <Container style={{ color: '#000', margin: '8% auto', height: '54vh', paddingTop: '10%', background: 'transparent' }}>
        <h1 style={{ color: '#000' }}>404 - Page Not Found</h1>
        <p>Sorry, the page you are looking for could not be found.</p>
      </Container>
    </div>;
  };
  return (
    <>
      <Routes>
        <Route exact path="*" element={<NotFound />} />
        <Route exact path='/' element={<PublicRoute><LandingPage /></PublicRoute>} />
        <Route exact path='/terms_and_conditions' element={<PublicRoute><TermsAndConditions /></PublicRoute>} />
        <Route exact path='/support' element={<PublicRoute><SupportPage /></PublicRoute>} />
        <Route exact path='/about' element={<PublicRoute><About /></PublicRoute>} />
        <Route exact path='/demo' element={<PublicRoute><Demo /></PublicRoute>} />
        <Route exact path='/contact_us' element={<PublicRoute><ContactPage /></PublicRoute>} />
        <Route exact path='/privacy_policy' element={<PublicRoute><PrivacyPolicy /></PublicRoute>} />
        <Route exact path='/live-tracking/:id' element={<SinglePageTracking />} />
        <Route exact path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>}>
          <Route index element={<Track />} />
          <Route exact path='Trash' element={<TrashCan />} />
          <Route exact path='consignee-details' element={<ConsigneeList />} />
          <Route exact path='shippers-details' element={<ShippersList />} />
          <Route exact path='view-dat' element={<ViewDAT />} />
          <Route exact path='direct-freight' element={<DirectFreight />} />
          <Route exact path='view-truckstop' element={<ViewTruckstop />} />
          <Route exact path='Trucker-Path' element={<TruckerPath />} />
          <Route exact path='Company-List' element={<CompanyList />} />
          <Route exact path='Combined-List' element={<CombinedTable />} />
          <Route exact path='trucks' element={<TrackTruck />} />
          <Route exact path='settings' element={<UserProfile />} />
          <Route exact path="*" element={<NotFoundChild />} />
        </Route>
      </Routes>
    </>
  )
}

export default Main;