import DeleteIcon from '@mui/icons-material/Delete';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Autocomplete, Checkbox, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Button, Card, Col, Container, Image, Row, Spinner } from "react-bootstrap";
import Draggable from 'react-draggable';
import nextId from "react-id-generator";
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { USA } from '../Json/Cities';
import { Cell, DocId, Maps, Single, deleteData, mapData, page_count } from '../Reducers/userReducer';
import { supabase } from '../firebase';
import MapChart from "./Map";
import { SideRow } from "./SideRow";
import ColumnData from './Table';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import TruckstopIcon from '../Assets/ts_waypoint-red.png';
import Truckerpath from '../Assets/Truckerpath.webp';
import Freight from '../Assets/logo-direct-freight.png';
import Load41 from '../Assets/Load_41_logo.png';
import Dat from '../Assets/dat.jpeg'
import LoadingPage from './LoadingComponent';
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

const X = [
  { id: 43, type: 'V', label: 'Van', DATType: 'V', DFType: 'V' },
  { id: 31, type: 'R', label: 'Reefer', DATType: 'R', DFType: 'R' },
  { id: 12, type: 'F', label: 'Flatbed', DATType: 'F', DFType: 'F' },
  { id: 20, type: 'HS', label: 'Hotshot', DATType: 'FH', DFType: 'HS' },
  { id: 3, type: 'AUTO', label: 'Auto Carrier', DATType: 'AC', DFType: 'AC' },
  { id: 2, type: 'ANIM', label: 'Animal Carrier', DATType: 'BT', DFType: 'V' },
  { id: 5, type: 'BELT', label: 'Conveyor Belt', DATType: 'CV', DFType: 'V' },
  { id: 6, type: 'BOAT', label: 'Boat Hauling Trailer', DATType: 'C', DFType: 'V' },
  { id: 7, type: 'CH', label: 'Convertible Hopper', DATType: 'HB', DFType: 'V' },
  { id: 8, type: 'CONT', label: 'Container Trailer', DATType: 'C', DFType: 'CONT' },
  { id: 37, type: 'SD', label: 'Step Deck', DATType: 'SD', DFType: 'SD' },
  { id: 9, type: 'DD', label: 'Double Drop', DATType: 'DD', DFType: 'DD' },
  { id: 10, type: 'DUMP', label: 'Dump Trucks', DATType: 'DT', DFType: 'DT' },
  { id: 11, type: 'ENDP', label: 'End Dump', DATType: 'V', DFType: 'V' },
  { id: 26, type: 'LIVE', label: 'Live Bottom Trailer', DATType: 'V', DFType: 'V' },
  { id: 28, type: 'MBHM', label: 'Mobile Home', DATType: 'V', DFType: 'V' },
  { id: 29, type: 'PNEU', label: 'Pneumatic', DATType: 'NU', DFType: 'V' },
  { id: 34, type: 'RINT', label: 'Refrigerated Intermodal', DATType: 'RN', DFType: 'RINT' },
  { id: 35, type: 'ROLL', label: 'Roll Top Conestoga', DATType: 'CN', DFType: 'V' },
  { id: 14, type: 'FINT', label: 'Flatbed Intermodal', DATType: 'FD', DFType: 'FINT' },
  { id: 15, type: 'FO', label: 'Flatbed Over-Dimension Loads', DATType: 'FO', DFType: 'V' },
  { id: 16, type: 'FSD', label: 'Flatbed or Step Deck', DATType: 'FD', DFType: 'SD' },
  { id: 17, type: 'FVR', label: 'Flatbed, Van or Reefer', DATType: 'F', DFType: 'F' },
  { id: 18, type: 'FWS', label: 'Flatbed With Sides', DATType: 'FS', DFType: 'V' },
  { id: 19, type: 'HOPP', label: 'Hopper Bottom', DATType: 'HB', DFType: 'HB' },
  { id: 21, type: 'HTU', label: 'Haul and Tow Unit', DATType: 'V', DFType: 'V' },
  { id: 22, type: 'LAF', label: 'Landoll Flatbed', DATType: 'V', DFType: 'LA' },
  { id: 33, type: 'RGN', label: 'Reefer with Pallet Exchange', DATType: 'RG', DFType: 'RGN' },
  { id: 41, type: 'SV', label: 'Straight Van', DATType: 'SB', DFType: 'V' },
  { id: 23, type: 'LB', label: 'Lowboy', DATType: 'LB', DFType: 'LB' },
  { id: 48, type: 'VF', label: 'Flatbed or Van', DATType: 'F', DFType: 'F' },
  { id: 49, type: 'VINT', label: 'Van Intermodal', DATType: 'VN', DFType: 'VINT' },
  { id: 50, type: 'VIV', label: 'Vented Insulated Van', DATType: 'VV', DFType: 'V' },
  { id: 51, type: 'VLG', label: 'Van with Liftgate', DATType: 'VG', DFType: 'V' },
  { id: 52, type: 'VM', label: 'Moving Van', DATType: 'MV', DFType: 'V' },
  { id: 53, type: 'VR', label: 'Van or Reefer', DATType: 'V', DFType: 'V' },
  { id: 54, type: 'VV', label: 'Vented Van', DATType: 'VV', DFType: 'VV' },
  { id: 55, type: 'WALK', label: 'Walking Floor', DATType: 'V', DFType: 'V' },
  { id: 56, type: 'VVR', label: 'Vented Van or Reefer', DATType: 'VV', DFType: 'VV' },
  { id: 57, type: 'VIVR', label: 'Vented Insulated Van or Reefer', DATType: 'VV', DFType: 'VV' },
  { id: 68, type: 'RVF', label: 'Flatbed, Van or Reefer', DATType: 'F', DFType: 'F' },
  { id: 69, type: 'RFV', label: 'Flatbed, Van or Reefer', DATType: 'F', DFType: 'F' },
  { id: 44, type: 'V-OT', label: 'Open Top Van', DATType: 'OT', DFType: 'V' },
  { id: 45, type: 'VB', label: 'Blanket Wrap Van', DATType: 'VB', DFType: 'V' },
  { id: 58, type: 'VA', label: 'Van - Air-Ride', DATType: 'VA', DFType: 'VA' },
  { id: 59, type: 'FA', label: 'FlatBed - Air-Ride', DATType: 'FA', DFType: 'V' },
  { id: 60, type: 'FV', label: 'Van or Flatbed', DATType: 'F', DFType: 'F' },
  { id: 70, type: 'RV', label: 'Van or Reefer', DATType: 'V', DFType: 'V' },
  { id: 71, type: 'SPV', label: 'Cargo/Small/Sprinter', DATType: 'SC', DFType: 'V' },
  { id: 72, type: 'SDC', label: 'Step Deck Conestoga', DATType: 'SN', DFType: 'V' },
  { id: 73, type: 'SDE', label: 'Step Deck Extendable', DATType: 'SD', DFType: 'SD' },
  { id: 74, type: 'DA', label: 'Drive Away', DATType: 'V', DFType: 'V' },
  { id: 75, type: 'DDE', label: 'Double Drop Extendable', DATType: 'DD', DFType: 'DD' },
  { id: 76, type: 'VRF', label: 'Flatbed, Van or Reefer', DATType: 'F', DFType: 'F' },
  { id: 77, type: 'BEAM', label: 'Beam', DATType: 'V', DFType: 'V' },
  { id: 78, type: 'CONG', label: 'Conestoga Flat', DATType: 'CN', DFType: 'V' },
  { id: 79, type: 'BDMP', label: 'Belly Dump', DATType: 'V', DFType: 'V' },
  { id: 61, type: 'FRV', label: 'Flatbed, Van or Reefer', DATType: 'F', DFType: 'F' },
  { id: 62, type: 'FSDV', label: 'Flatbed, Step Deck or Van', DATType: 'FD', DFType: 'V' },
  { id: 63, type: 'FVVR', label: 'Flatbed, Vented Van or Reefer', DATType: 'F', DFType: 'F' },
  { id: 64, type: 'VRDD', label: 'Van, Reefer or Double Drop', DATType: 'V', DFType: 'V' },
  { id: 65, type: 'FVV', label: 'Flatbed or Vented Van', DATType: 'F', DFType: 'F' },
  { id: 66, type: 'SDRG', label: 'Step Deck or RGN', DATType: 'SD', DFType: 'SD' },
  { id: 67, type: 'VFR', label: 'Flatbed, Van or Reefer Van', DATType: 'F', DFType: 'F' },
  { id: 46, type: 'CV', label: 'Curtain Van', DATType: 'V', DFType: 'CV' },
  { id: 25, type: 'LDOT', label: 'Load-Out', DATType: 'V', DFType: 'V' },
  { id: 1, type: '2F', label: 'Flatbed Doubles', DATType: 'F2', DFType: 'V' },
  { id: 27, type: 'MAXI', label: 'Maxi or Double Flat Trailers', DATType: 'MX', DFType: 'MX' },
  { id: 32, type: 'RGN', label: 'Removable Goose Neck', DATType: 'RG', DFType: 'RGN' },
  { id: 36, type: 'RPD', label: 'Reefer with Plant Decking', DATType: 'RL', DFType: 'V' },
  { id: 47, type: 'VCAR', label: 'Cargo Vans (1 Ton capacity)', DATType: 'SC', DFType: 'V' },
  { id: 24, type: 'LBO', label: 'Lowboy Over-Dimension Loads', DATType: 'LO', DFType: 'V' },
  { id: 30, type: 'PO', label: 'Power Only', DATType: 'PO', DFType: 'PO' },
  { id: 4, type: 'B-TR', label: 'B-Train/Supertrain', DATType: 'BT', DFType: 'V' },
  { id: 13, type: 'FEXT', label: 'Stretch Trailers or Extendable Flatbed', DATType: 'FD', DFType: 'V' },
  { id: 38, type: 'REX', label: 'Reefer with Pallet Exchange', DATType: 'RP', DFType: 'V' },
  { id: 39, type: 'SDO', label: 'Step Deck Over-Dimension Loads', DATType: 'V', DFType: 'V' },
  { id: 40, type: 'SPEC', label: 'Unspecified Specialized Trailers', DATType: 'V', DFType: 'V' },
  { id: 42, type: 'TANK', label: 'Tanker', DATType: 'TA', DFType: 'TANK' }
];

const DATAllowedType = ["AC", "C", "CI", "CR", "DD", "LA", "DT", "F", "FA", "BT", "F2", "FZ", "FH", "MX", "FS", "FT", "FM", "FD", "FR", "HB", "LB", "MV", "NU", "PO", "R", "RA", "R2", "RZ", "RN", "RL", "RM", "RG", "SD", "ST", "TA", "TN", "TS", "TT", "V", "VA", "VS", "VC", "V2", "VZ", "VH", "VI", "VN", "VG", "VL", "OT", "VB", "V3", "VV", "VM", "VT", "VF", "VR", "IR", "RV", "FC", "RP", "VW", "LR", "VP", "SR", "CV", "FO", "LO", "CN", "FN", "SN", "SB"]
const Bearer = localStorage.getItem('trucker_token')
export const CombinedTable = () => {
  const token = localStorage.getItem('token')
  const page = useSelector((state) => state?.user?.page)
  const single = useSelector((state) => state?.user?.bulk)
  const [note, setNote] = React.useState('')
  const [loadNumber, setLoadNumber] = React.useState('')
  const [postedAllInRate, setPostedAllInRate] = React.useState('')
  const [tenderAllInRate, setTenderAllInRate] = React.useState('')
  const [width, setWidth] = React.useState('')
  const [weight, setWeight] = React.useState('')
  const [height, setHeight] = React.useState('')
  const [palletCount, setPalletCount] = React.useState('')
  const [pieceCount, setPieceCount] = React.useState('')
  const [loadLabel, setLoadLabel] = React.useState('')
  const [fp, setFp] = React.useState('')
  const [pounds, setPounds] = React.useState('')
  const [rate, setRate] = React.useState(0)
  const [commodity, setCommodity] = React.useState('FAK')
  const [startWhen, setStartWhen] = React.useState('')
  const [endWhen, setEndWhen] = React.useState('')
  const [length, setLength] = React.useState('')
  const [mobile, setMobile] = React.useState('')
  //const[map,setMap] = React.useState(true)
  const [coloumn, setColoumn] = React.useState(false)
  const [comment, setComment] = React.useState('FAK')
  const [datetime, setDatetime] = React.useState('')
  const [destinationCity, setDestinationCity] = React.useState('')
  const [destinationStateProv, setDestinationStateProv] = React.useState('')
  const [dispatcher, setDispatcher] = React.useState('')
  const [earliestAvailability, setEarliestAvailability] = React.useState(new Date().toLocaleDateString('en-CA'))
  const [equipmentType, setEquipmentType] = React.useState('')
  const [latestAvailability, setLatestAvailability] = React.useState(new Date().toLocaleDateString('en-CA'))
  const [loadId, setLoadId] = React.useState('')
  const [earlyDateTimeDest, setEarlyDateTimeDest] = React.useState('')
  const [earlyDateTimeOrigin, setEarlyDateTimeOrigin] = React.useState('')
  const [lateDateTimeDest, setLateDateTimeDest] = React.useState('')
  const [streetAddress1Origin, setStreetAddress1Origin] = React.useState('')
  const [streetAddress1Dest, setStreetAddress1Dest] = React.useState('')
  const [lateDateTimeOrigin, setLateDateTimeOrigin] = React.useState('')
  const [originCity, setOriginCity] = React.useState('')
  const [originStateProv, setOriginStateProv] = React.useState('')
  const [owner, setOwner] = React.useState('')
  const [price, setPrice] = React.useState('')
  const [status, setStatus] = React.useState('NOT STARTED')
  const [email, setEmail] = React.useState('')
  const [pickupdate, setPickupdate] = React.useState('')
  const [driver, setDriver] = React.useState('')
  const [carrier, setCarrier] = React.useState('')
  const [docID, setDocID] = React.useState([])
  const [d_ID, setD_ID] = React.useState('')
  const [edit, setEdit] = React.useState(false)
  const uid = useSelector((state) => state.user?.userID)
  const trid = useSelector((state) => state.user?.docid)
  const load = useSelector((state) => state?.user?.load)
  const map = useSelector((state) => state?.user?.maps)
  const mapdata = useSelector((state) => state?.user?.mapData)
  const [cell, setCell] = React.useState(load)
  const [ptt, setPtt] = React.useState('Post_to_Truckstop')//Post_to_Truckstop
  const [ptts, setPtts] = React.useState('Post_to_Truckerpath')//Post_to_Truckerpath
  const [dat, setDat] = React.useState('Post_to_DAT')
  const [direct, setDirect] = React.useState('Post_to_Direct')
  const [location, setLocation] = React.useState([])
  const [LP, setLP] = React.useState('')
  const [DO, setDO] = React.useState('')
  const [notes_dropoff, setNotes_dropoff] = React.useState('')
  const [notes_pickup, setNotes_pickup] = React.useState('')
  const [street_pickup, setStreet_pickup] = React.useState('')
  const [street_dropoff, setStreet_dropoff] = React.useState('')
  const [dropoff_date, setDropoff_date] = React.useState('')
  const [created_at, setCreated_at] = React.useState('')
  const [loads, setLoads] = React.useState(false)
  const [loadStatus, setLoadStatus] = React.useState('')
  const [longitude, setLongitude] = React.useState('')
  const [latitude, setLatitude] = React.useState('')
  const [originData, setOriginData] = React.useState({})
  const [destinationData, setDestinationData] = React.useState({})
  const dispatch = useDispatch()
  const [stateid, setStateid] = useState(0);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [locationlogs, setLocationlogs] = useState([])
  const [focus, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const [message, setMessage] = useState(false)
  const [value, setValue] = React.useState(0);
  const [tabcount, setTabcount] = React.useState([1])
  const [tabcountconsignee, setTabcountconsignee] = React.useState([1])
  const deletedata = useSelector((state) => state?.user?.deleteData)
  const pastdate = new Date()
  const [valuex, setValuex] = React.useState(0);
  const [values, setValues] = React.useState(0);
  const [dropData, setDropData] = React.useState([])
  const [pickupData, setPickupData] = React.useState([])
  const [consignee, setConsignee] = React.useState(false)
  const [shippers, setShippers] = React.useState(false)
  const [addname, setAddname] = React.useState('')
  const [addaddress, setAddaddress] = React.useState('')
  const [addaddress1, setAddaddress1] = React.useState('')
  const [addaddress2, setAddaddress2] = React.useState('')
  const [addcity, setAddcity] = React.useState('')
  const [addlocationdata, setAddlocationdata] = React.useState([])
  const [addstate, setAddstate] = React.useState('')
  const [addcname, setAddcname] = React.useState('')
  const [addcemail, setAddcemail] = React.useState('')
  const [addmobile, setAddmobile] = React.useState('')
  const [hours, setHours] = React.useState('')
  const [addcountry, setAddcountry] = React.useState('USA')
  const [appointment, setAppointment] = React.useState('')
  const [types, setTypes] = React.useState('')
  const [addstatus, setAddstatus] = React.useState('active')
  const [add_notes, setAdd_notes] = React.useState('')
  const [add_notes1, setAdd_notes1] = React.useState('')
  const [shippersdata, setShippersdata] = React.useState([])
  const [consigneedata, setConsigneedata] = React.useState([])
  const [ship, setShip] = React.useState('')
  const [con, setCon] = React.useState('')
  const [users, setUsers] = React.useState([])
  const [docuserID, setDocuserID] = React.useState([])
  const [error, setError] = React.useState('yes')
  const [list, setList] = React.useState(true)
  const [so, setSo] = React.useState(false)
  const [deliveryProofPhotos, setDeliveryProofPhotos] = React.useState([])
  const [locationLogs, setLocationLogs] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [isDeleted, setIsDeleted] = React.useState(false)
  const [logs, setLogs] = React.useState([])
  const [alerts, setAlerts] = React.useState(false)
  const [deleteid, setDeleteid] = React.useState('')
  const [deleteindex, setDeleteindex] = React.useState('')
  const [trackingId, setTrackingId] = React.useState('')
  const [change, setChange] = React.useState(false)
  const [lens, setLens] = React.useState(0)
  const [lenc, setLenc] = React.useState(0)
  const [addlocationdest, setAddlocationdest] = React.useState([])
  const [addlocationorigin, setAddlocationorigin] = React.useState([])
  const [u_id, setU_id] = React.useState('')
  const [e_id, setE_id] = React.useState('')
  const [company_id, setCompany_id] = React.useState('81y4k')
  const [contact_info, setContact_info] = React.useState({
    contact_email: "book@jakebrakelogistics.com",
    contact_first_name: "Thomas",
    contact_phone_number: "402 447 7663",
    contact_phone_ext: "402 447 7663"
  })
  const [tenderNotes, setTenderNotes] = React.useState('')
  const [cube, setCube] = React.useState('')
  const [loadReferenceNumbers, setLoadReferenceNumbers] = React.useState('12345')
  const [referenceNumbers, setReferenceNumbers] = React.useState('')
  const [company, setCompany] = React.useState([])
  const [loadSize, setLoadSize] = React.useState('')
  const [fupartial, setFupartial] = React.useState('FULL')
  const [equipmentlist, setEquipmentlist] = React.useState(X)
  const [equipmentTypeid, setEquipmentTypeid] = React.useState(null)
  const [close, setClose] = React.useState('')
  const [deleteType, setDeleteType] = React.useState('')
  const [posting_type, setPosting_type] = React.useState('loads')
  const [custom_id, setCustom_id] = React.useState('')
  const [posting_id, setPosting_id] = React.useState('')
  const [loadStop,setLoadStop] = React.useState([])
  const [equipmentObject,setEquipmentObject] = React.useState({})
  const [trucks_open,setTrucks_open] = React.useState(true)
  const [truckstop_token,setTruckstop_token] = React.useState('')
  const [dat_open,setDat_open] = React.useState(!localStorage.getItem('token')||!localStorage.getItem('direct_token')||!localStorage.getItem('trucks_token')||!localStorage.getItem('trucker_token'))
  const [dat_token,setDat_token] = React.useState('')
  const [direct_open,setDirect_open] = React.useState(!localStorage.getItem('token')||!localStorage.getItem('direct_token')||!localStorage.getItem('trucks_token'))
  const [direct_token,setDirect_token] = React.useState('')
  const [trucker_open,setTrucker_open] = React.useState(!localStorage.getItem('token')||!localStorage.getItem('direct_token')||!localStorage.getItem('trucks_token')||!localStorage.getItem('trucker_token'))
  const [trucker_token,setTrucker_token] = React.useState('')
  const [formdata, setFormdata] = React.useState({
    shippersData: [{
      id: nextId(),
      shipper: '',
      locationP: '',
      pickUpDate: '',
      pickUpHours: '',
      originCity: '',
      notesPickup: '',
      shippersData: []
    }],
    consigneeData: [{
      id: nextId(),
      consignee: '',
      locationD: '',
      dropOffHours: '',
      dropOffDate: '',
      destinationCity: '',
      notesDropoff: '',
      consigneeData: []
    }]
  })
  const U = {
    id: nextId(),
    shippersData: [],
    shipper: '',
    locationP: '',
    pickUpDate: '',
    pickUpHours: '',
    originCity: '',
    notesPickup: ''
  }
  const U1 = {
    id: nextId(),
    consigneeData: [],
    consignee: '',
    locationD: '',
    dropOffDate: '',
    dropOffHours: '',
    destinationCity: '',
    notesDropoff: ''
  }
  const checkDattype = (y) => {
    const condition = DATAllowedType.filter(x=>x==y)
    if(condition?.length){
      setDat('Post_to_DAT') 
    }else{
      setDat('disabled')
    }
  }
  const formatDate = (date) => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding 1 to month and padding with 0 if needed
    const day = String(date.getDate()).padStart(2, '0'); // Padding day with 0 if needed
    return `${year}-${month}-${day}`;
  };
  const onChangeFields = (e, j, r, f) => {
    const items = { ...formdata };
    if (edit && change) {
      const x = items?.shippersData ?? [].map((t, i) => {
        
        if (items.shippersData[j] != undefined) {
          if ((e.target?.name == 'shippers_name') || (items.shippersData[j] && !e.target?.name)) {
            if (i == j) {
              return { ...t, shipper: e.target?.name ? e.target.value : shippersdata?.name, shippersData: r ? r : shippersdata }
            }
            return t
          }
          if ((e.target?.name == 'location_name_pickup') || (items?.shippersData[j] && !e.target?.name)) {
            if (i == j) {
              return { ...t, locationP: e.target?.name ? e.target.value : shippersdata?.address }
            }
            return t
          }
          // if(items.shippersData[j]?.length){
          //   if(i==j){
          //     return {...t,shippersData:r ? r : shippersdata}
          //   }
          //   return t
          // }
          if ((e.target?.name == 'originCity') || (items?.shippersData[j] && !e.target?.name)) {
            if (i == j) {
              return { ...t, originCity: e.target?.name ? e.target.value : shippersdata?.city }
            }
            return t
          }
          if ((e.target?.name == 'Pick up Dates') || (items?.shippersData[j] && !e.target?.name)) {
            if (i == j) {
              return { ...t, pickUpDate: e.target?.value }
            }
            return t
          }
          if ((e.target?.name == 'Pick up Hours') || (items?.shippersData[j] && !e.target?.name)) {
            if (i == j) {
              return { ...t, pickUpHours: e.target.value }
            }
            return t
          }
          if ((e.target?.name == 'notes_pickup') || (items?.shippersData[j] && !e.target?.name)) {
            if (i == j) {
              return { ...t, notesPickup: e.target.value }
            }
            return t
          }
        }
      })
      const y = items?.consigneeData ?? [].map((t, i) => {
        if (items?.consigneeData[j] != undefined) {
          if ((e.target?.name == 'consignee_name') || (items?.consigneeData[j] && !e.target?.name)) {
            if (i == j) {
              return { ...t, consignee: e.target?.name ? e.target.value : consigneedata?.name, consigneeData: f ? f : consigneedata }
            }
            return t
          }
          if ((e.target?.name == 'location_name_dropoff') || (items?.consigneeData[j] && !e.target?.name)) {
            if (i == j) {
              return { ...t, locationP: e.target?.name ? e.target.value : consigneedata?.address }
            }
            return t
          }
          // if(items.shippersData[j]?.length){
          //   if(i==j){
          //     return {...t,consigneeData:f ? f:consigneedata}
          //   }
          //   return t
          // }
          if ((e.target?.name == 'destinationCity') || (items?.consigneeData[j] && !e.target?.name)) {
            if (i == j) {
              return { ...t, destinationCity: e.target?.name ? e.target.value : consigneedata?.city }
            }
            return t
          }
          if ((e.target?.name == 'dropoff_date') || (items?.consigneeData[j] && !e.target?.name)) {
            if (i == j) {
              return { ...t, pickUpDate: e.target?.value }
            }
            return t
          }
          if ((e.target?.name == 'dropoff_hours') || (items?.consigneeData[j] && !e.target?.name)) {
            if (i == j) {
              return { ...t, pickUpHours: e.target.value }
            }
            return t
          }
          if ((e.target?.name == 'notes_dropoff') || (items?.consigneeData[j] && !e.target?.name)) {
            if (i == j) {
              return { ...t, notesPickup: e.target.value }
            }
            return t
          }
        }
      })
      setFormdata({
        consigneeData: y,
        shippersData: x
      })
    } else {
      if (e.target?.name == 'shippers_name' || (items.shippersData[j] && !e.target?.name)) items.shippersData[j].shipper = e.target?.name ? e.target?.value : r?.name
      if (e.target?.name == 'consignee_name' || (items.consigneeData[j] && !e.target?.name)) items.consigneeData[j].consignee = e.target?.name ? e.target?.value : f?.name
      if (e.target?.name == 'location_name_pickup' || (items.shippersData[j] && !e.target?.name)) items.shippersData[j].locationP = e.target?.name ? e.target?.value : r?.address
      if (e.target?.name == 'location_name_dropoff' || (items.consigneeData[j] && !e.target?.name)) items.consigneeData[j].locationD = e.target?.name ? e.target?.value : f?.address
      if (items.shippersData[j]?.shippersData) items.shippersData[j].shippersData = shippersdata ? shippersdata : []
      if (items.consigneeData[j]?.consigneeData) items.consigneeData[j].consigneeData = consigneedata ? consigneedata : []
      if (e.target?.name == 'destinationCity' || (items.consigneeData[j] && !e.target?.name)) items.consigneeData[j].destinationCity = e.target?.name ? e.target?.value : f?.city
      if (e.target?.name == 'originCity' || (items.shippersData[j] && !e.target?.name)) items.shippersData[j].originCity = e.target?.name ? e.target?.value : r?.city
      if (e.target?.name == 'Pick up Dates') items.shippersData[j].pickUpDate = e.target.value
      if (e.target?.name == 'Pick up Hours') items.shippersData[j].pickUpHours = e.target.value
      if (e.target?.name == 'dropoff_date') items.consigneeData[j].dropOffDate = e.target.value
      if (e.target?.name == 'dropoff_hours') items.consigneeData[j].dropOffHours = e.target.value
      if (e.target?.name == 'notes_pickup') items.shippersData[j].notesPickup = e.target.value
      if (e.target?.name == 'notes_dropoff') items.consigneeData[j].notesDropoff = e.target.value
      setFormdata(items)
    }
  }
  const handleChangetab = (e, newValue) => {
    lens < newValue + 1 ? setChange(false) : setChange(true)
    setValue(newValue);
    
    setShip(formdata.shippersData[newValue]?.shipper ?? ship);
    setLP(formdata.shippersData[newValue]?.locationP);
    setNotes_pickup(formdata.shippersData[newValue]?.notesPickup);
    setPickupdate(formdata.shippersData[newValue]?.pickUpDate);
    setOriginCity(formdata.shippersData[newValue]?.originCity);
    setShippersdata(formdata.shippersData[newValue]?.shippersData);
  };
  const handleChangetabx = (e, newValue) => {
    setValuex(newValue);
    lenc < newValue + 1 ? setChange(false) : setChange(true)
    
    setCon(formdata.consigneeData[newValue]?.consignee)
    setDO(formdata.consigneeData[newValue]?.locationD);
    setNotes_dropoff(formdata.consigneeData[newValue]?.notesDropoff);
    setPickupdate(formdata.shippersData[newValue]?.pickUpDate);
    setDestinationCity(formdata.consigneeData[newValue]?.destinationCity);
    setConsigneedata(formdata.consigneeData[newValue]?.consigneeData);
  };
  const handleChangeShippers = (e, newValue) => {
    setValues(newValue);
    
  };
  const generateUniqueId = () => {
    // Generate a random 8-digit number
    const randomNumber = Math.floor(10000000 + Math.random() * 90000000);
    return randomNumber;
  };

  const handleCloseToken = () => {
    setDat_token('')
    setDat_open(false)
    setDirect_token('')
    setDirect_open(false)
    setTruckstop_token('')
    setTrucker_token('')
    setTrucker_open(false)
    setTrucks_open(false)
  }

  const submitToken = (e) => {
    e.preventDefault()
    localStorage.setItem('token',dat_token)
    setDat_open(false)
    localStorage.setItem('direct_token',direct_token)
    setDirect_open(false)
    localStorage.setItem('trucks_token',truckstop_token)
    setTrucks_open(false)
    localStorage.setItem('trucker_token',trucker_token)
    setTrucker_open(false)
  }

  const handleClosetype = () => {
    setError(false)
    setShippers(false)
    setConsignee(false)
    setValues(0)
    setAdd_notes('')
    setAdd_notes1('')
    setAddstatus('active')
    setTypes('')
    setAppointment('')
    setAddcountry('USA')
    setHours('')
    setAddmobile('')
    setAddcemail('')
    setAddcname('')
    setAddstate('')
    setAddcity('')
    setAddaddress2('')
    setAddaddress('')
    setAddaddress1('')
    setAddname('')
    setAddlocationdata([])
  }
  const feild = [
    {
      field: 'action', sortable: false, disableColumnMenu: true, headerName: 'Action', width: 100, renderCell: (params) => {
        
        return (
          <div id={params?.id}><Tooltip title="view"><LocationOnIcon style={{ cursor: 'pointer', height: '20px', width: '20px' }} onClick={() => { mapShow(load[params.api.getAllRowIds().indexOf(params.id)]?.id || load[params.api.getAllRowIds().indexOf(params.id)]?.loadId || load[params.api.getAllRowIds().indexOf(params.id)]?.shipment_info?.external_id || load[params.api.getAllRowIds().indexOf(params.id)]?.posting_id, params.api.getAllRowIds().indexOf(params.id)) }} /></Tooltip><Tooltip title="edit"><ModeEditIcon style={{ cursor: 'pointer', height: '20px', width: '20px' }} onClick={() => updatePop(load[params.api.getAllRowIds().indexOf(params.id)]?.id, load[params.api.getAllRowIds().indexOf(params.id)]?.loadId, load[params.api.getAllRowIds().indexOf(params.id)]?.shipment_info?.external_id, params.api.getAllRowIds().indexOf(params.id))} /></Tooltip><Tooltip title="delete"><DeleteIcon style={{ cursor: 'pointer', height: '20px', width: '20px' }} onClick={() => load[params.api.getAllRowIds().indexOf(params.id)]?.id ? deleteOpen(load[params.api.getAllRowIds().indexOf(params.id)]?.id, 'DAT') : load[params.api.getAllRowIds().indexOf(params.id)]?.loadId ? deleteOpen(load[params.api.getAllRowIds().indexOf(params.id)]?.loadId, 'truckstop') : load[params.api.getAllRowIds().indexOf(params.id)]?.posting_id ? deleteOpen(load[params.api.getAllRowIds().indexOf(params.id)]?.posting_id, 'Direct', load[params.api.getAllRowIds().indexOf(params.id)]?.custom_id_id) : deleteOpen(load[params.api.getAllRowIds().indexOf(params.id)]?.shipment_info?.external_id, 'truckerpath')} /></Tooltip></div>
        );
      }
    },
    {
      field: 'icon', sortable: false, disableColumnMenu: true, headerName: 'Source', width: 80, renderCell: (params) => {
            if(load[params.api.getAllRowIds().indexOf(params.id)]?.shipment_info?.external_id){
              return <div id={params?.id}><Tooltip title="Truckerpath"><Image style={{ width: '1.5em', height: '1.5em' }} src={Truckerpath} /></Tooltip></div>
            }else if(load[params.api.getAllRowIds().indexOf(params.id)]?.referenceId){
              return <div id={params?.id}><Tooltip title="DAT"><Image style={{ width: '1.5em', height: '1.5em' }} src={Dat} /></Tooltip></div>
            }else if(load[params.api.getAllRowIds().indexOf(params.id)]?.custom_id){
              return <div id={params?.id}><Tooltip title="Direct Freight"><Image style={{ width: '1.5em', height: '1.5em' }} src={Freight} /></Tooltip></div>
            }else if(load[params.api.getAllRowIds().indexOf(params.id)]?.loadNumber){
              return <div id={params?.id}><Tooltip title="Truckstop"><Image style={{ width: '1.5em', height: '1.5em' }} src={TruckstopIcon} /></Tooltip></div>
            }else{
              return 'No Source'
            }
           }
  },
    // { field: 'id', headerName: 'ID', width: 80 },
    {
      field: 'referenceId', headerName: 'Ref ID', width: 120, valueGetter: (value, params) => {
        
        let result = [];
        if (params?.shipment_info) {
          if (params?.shipment_info?.external_id) {
            result.push(params?.shipment_info?.external_id)
          }
        } else if (params?.referenceId) {
          if (params?.referenceId) {
            result.push(params?.referenceId)
          }
        } else if (params?.custom_id) {
          if (params?.custom_id) {
            result.push(params?.custom_id)
          }
        } else if (params?.loadNumber) {
          if (params?.loadNumber) {
            result.push(params?.loadNumber)
          }
        } else {
          result = ["Unknown"];
        }
        return result.join(", ");
      }
    },
    {
      field: 'lane', headerName: 'Origin', width: 120, valueGetter: (value, params) => {
        
        let result = [];
        if (params?.lane?.origin) {
          if (params?.lane?.origin.city) {
            result.push(params?.lane?.origin.city, params?.lane?.origin.stateProv);
          }
        } else if (params?.loadStops) {
          if (params?.loadStops[0]?.location?.city) {
            result.push(params?.loadStops[0]?.location?.city, params?.loadStops[0]?.location?.state);
          }
        } else if (params?.shipment_info) {
          if (params?.shipment_info?.stop_list[0]?.city) {
            result.push(params?.shipment_info?.stop_list[0]?.city, params?.shipment_info?.stop_list[0]?.state)
          }
        } else if (params?.origin_city) {
          if (params?.origin_city) {
            result.push(params?.origin_city, params?.origin_state)
          }
        } else {
          result = ["Unknown"];
        }
        return result.join(", ");
      }
    },
    {
      field: 'lanes', headerName: 'Origin Zip', width: 90, valueGetter: (value, params) => {
        
        let result = [];
        if (params?.lane?.origin) {
          if (params?.lane?.origin.postalCode) {
            result.push(params?.lane?.origin.postalCode);
          }
        } else {
          result = ["Unknown"];
        }
        return result.join(", ");
      }
    },
    {
      field: 'laness', headerName: 'Destination', width: 120, valueGetter: (value, params) => {
        
        let result = [];
        if (params?.lane?.destination) {
          if (params?.lane?.destination.city) {
            result.push(params?.lane?.destination.city, params?.lane?.destination.stateProv);
          }
        } else if (params?.loadStops) {
          if (params?.loadStops[1]?.location?.city) {
            result.push(params?.loadStops[1]?.location?.city, params?.loadStops[1]?.location?.state);
          }
        } else if (params?.shipment_info) {
          if (params?.shipment_info?.stop_list[1]?.city) {
            result.push(params?.shipment_info?.stop_list[1]?.city, params?.shipment_info?.stop_list[1]?.state)
          }
        } else if (params?.destination_city) {
          if (params?.destination_city) {
            result.push(params?.destination_city, params?.destination_state)
          }
        } else {
          result = ["Unknown"];
        }
        return result.join(", ");
      }
    },
    {
      field: 'lanesss', headerName: 'Dest Zip', width: 90, valueGetter: (value, params) => {
        
        let result = [];
        if (params?.lane?.destination) {
          if (params?.lane?.destination?.postalCode) {
            result.push(params?.lane?.destination?.postalCode);
          }
        } else {
          result = ["Unknown"];
        }
        return result.join(", ");
      }
    },
    {
      field: 'exposuresc', headerName: 'Early Pickup', width: 130, valueGetter: (value, params) => {
        
        let result = [];
        if (params?.exposure?.earliestAvailabilityWhen) {
          if (params?.exposure?.earliestAvailabilityWhen) {
            let c = new Date(params?.exposure?.earliestAvailabilityWhen).toLocaleDateString('en-CA')
            result.push(c);
          }
        } else if (params?.shipment_info) {
          if (params?.shipment_info?.stop_list[0]?.date_local) {
            let c = new Date(params?.shipment_info?.stop_list[0]?.date_local).toLocaleDateString('en-CA')
            result.push(c);
          }
        } else if (params?.loadStops) {
          if (params?.loadStops[0]?.earlyDateTime) {
            let c = new Date(params?.loadStops[0]?.earlyDateTime).toLocaleDateString('en-CA')
            result.push(c);
            //result.push(`${c?.getMonth()+1}-${c?.getDate()}-${c?.getFullYear()}`);
          }
        } else if (params?.ship_date) {
          if (params?.ship_date) {
            let c = new Date(params?.ship_date).toLocaleDateString('en-CA')
            result.push(c);
          }
        } else {
          result = ["Unknown"];
        }
        return result.join(", ");
      }
    },
    // { field: 'createDateTime', headerName: 'Created At', width: 120 , 
    //   valueGetter: (value,params) => {
    //     
    //     let result = [];
    //     if (params?.createDateTime) {
    //         result.push(params?.createDateTime);
    //     }else if (params?.lifeCycleEvents?.created) {
    //       if (params?.lifeCycleEvents?.created?.when) {
    //         result.push(params?.lifeCycleEvents?.created?.when);
    //       }
    //     } else {
    //       result = ["Unknown"];
    //     }
    //     return result.join(", ");
    //   }},
    {
      field: 'freight', headerName: 'Type', width: 100, valueGetter: (value, params) => {
        
        let result = [];
        if (params?.freight?.equipmentType) {
          if (params?.freight?.equipmentType) {
            result.push(params?.freight?.equipmentType);

          }
        } else if (params?.equipmentAttributes) {
          if (params?.equipmentAttributes?.equipmentTypeId) {
            result.push(X?.filter(t => t.id == params?.equipmentAttributes?.equipmentTypeId)[0]?.type);
          } else {
            result = ["Unknown"];
          }
        } else if (params?.shipment_info?.equipment) {
          if (params?.shipment_info?.equipment) {
            result.push(params?.shipment_info?.equipment[0]);

          }
        } else if (params?.trailer_type) {
          if (params?.trailer_type) {
            result.push(params?.trailer_type[0]);

          }
        } else {
          result = ["Unknown"];
        }
        return result.join(", ");
      }
    },
    {
      field: 'exposure', headerName: 'Price', width: 90, valueGetter: (value, params) => {
        
        let result = [];
        if (params?.exposure) {
          if (params?.exposure.audience) {
            result.push(params?.exposure?.audience?.loadBoard?.transactionDetails?.loadOfferRateUsd);

          }
        } else if (params?.rateAttributes) {
          if (params?.rateAttributes?.postedAllInRate) {
            result.push(params?.rateAttributes?.postedAllInRate?.amount);
          } else {
            result = ["Unknown"];
          }
        } else if (params?.shipment_info?.shipment_price) {
          if (params?.shipment_info?.shipment_price) {
            result.push(params?.shipment_info?.shipment_price);

          }
        } else if (params?.pay_rate) {
          if (params?.pay_rate) {
            result.push(params?.pay_rate);
          }
        } else {
          result = ["Unknown"];
        }
        return result.join(", ");
      }
    },
    {
      field: 'freightx', headerName: 'Length', width: 90, valueGetter: (value, params) => {
        
        let result = [];
        if (params?.freight?.lengthFeet) {
          if (params?.freight?.lengthFeet) {
            result.push(params?.freight?.lengthFeet);

          }
        } else if (params?.dimensional?.length) {
          if (params?.dimensional?.length) {
            result.push(params?.dimensional?.length);

          }
        } else if (params?.shipment_info?.shipment_dimensions) {
          if (params?.shipment_info?.shipment_dimensions?.shipment_length) {
            result.push(params?.shipment_info?.shipment_dimensions?.shipment_length);
          } else {
            result = ["Unknown"];
          }
        } else if (params?.length) {
          if (params?.length) {
            result.push(params?.length);
          }
        } else {
          result = ["Unknown"];
        }
        return result.join(", ");
      }
    },
    {
      field: 'freightss', headerName: 'Pounds', width: 90, valueGetter: (value, params) => {
        
        let result = [];
        if (params?.freight?.weightPounds) {
          if (params?.freight?.weightPounds) {
            result.push(params?.freight?.weightPounds);

          }
        } else if (params?.dimensional?.weight) {
          if (params?.dimensional?.weight) {
            result.push(params?.dimensional?.weight);

          }
        } else if (params?.weight) {
          if (params?.weight) {
            result.push(params?.weight);

          }
        }
        else if (params?.shipment_info?.shipment_weight) {
          if (params?.shipment_info?.shipment_weight) {
            result.push(params?.shipment_info?.shipment_weight);

          }
        } else {
          result = ["Unknown"];
        }
        return result.join(", ");
      }
    },
    {
      field: 'freights', headerName: 'Commodity', width: 90, valueGetter: (value, params) => {
        
        let result = [];
        if (params?.freight?.commodity) {
          if (params?.freight?.commodity.details) {
            result.push(params?.freight?.commodity.details);

          }
        } else {
          result = ["Unknown"];
        }
        return result.join(", ");
      }
    },
    // { field: 'loadNumber', headerName: 'Load No', width: 80 },   
    // { field: 'loadSource', headerName: 'Source', width: 90 },

    // { field: 'carrierName', headerName: 'Carrier', width: 90},
    // { field: 'postAsUser', headerName: 'user', width: 90,valueGetter: (value,params) => {
    //     
    //     let result = [];
    //     if (params?.postAsUser) {
    //       if (params?.postAsUser?.userName) {
    //         result.push(params?.postAsUser?.userName);
    //       }else {
    //         result = ["Unknown"];
    //       }
    //     } else {
    //       result = ["Unknown"];
    //     }
    //     return result.join(", ");
    //   }},
    // { field: 'lanx', headerName: 'Poster Name', width: 160, valueGetter: (value,params) => {
    //   
    //   let result = [];
    //   if(params?.posterInfo){
    //   if (params?.posterInfo?.company.name) {
    //       result.push(params?.posterInfo?.company.name)
    //   }
    //  } else {
    //     result = ["Unknown"];
    //   }
    //   return result.join(", ");
    // } },
    // { field: 'lanes', headerName: 'Origin Postal', width: 90,valueGetter: (value,params) => {
    //   
    //   let result = [];
    //   if (params?.lane?.origin) {
    //     if (params?.lane?.origin.postalCode) {
    //       result.push(params?.lane?.origin.postalCode);
    //     }
    //   } else {
    //     result = ["Unknown"];
    //   }
    //   return result.join(", ");
    // }},
    // { field: 'lanesss', headerName: 'Dest Postal', width: 90, valueGetter: (value,params) => {
    //   
    //   let result = [];
    //   if (params?.lane?.destination) {
    //     if (params?.lane?.destination?.postalCode) {
    //       result.push(params?.lane?.destination?.postalCode);
    //     }
    //   } else {
    //     result = ["Unknown"];
    //   }
    //   return result.join(", ");
    // } },
    // { field: 'loadStatus', headerName: 'Status', width: 120,editable: true,type: "actions",renderCell: (value,params) => [<select value={loadStatus?.length ? loadStatus:params?.loadStatus} onChange={e=>statusChange(e,docID[params.api.getAllRowIds().indexOf(params.id)]?.id,params.api.getAllRowIds().indexOf(params.id))}><option value='DELIVERED'>DELIVERED</option><option value='LOADING'>LOADING</option><option value='UNLOADING'>UNLOADING</option><option value='PICKED UP'>PICKED UP</option><option value='NOT STARTED'>NOT STARTED</option><option value='TRACKING'>TRACKING</option><option value='IN ROUTE'>IN ROUTE</option></select>]},
  ];
  const inputFilter = [
    { name: 'Load ID', value: loadId },
    { name: 'Status', value: status },
    { name: 'Pick up Dates', value: pickupdate },
    { name: 'Driver', value: driver },
    { name: 'dropoff_date', value: dropoff_date },
    { name: 'originCity', value: originCity },
    { name: 'destinationCity', value: destinationCity }
  ]
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const deleteOpen = (id, type, custom_id) => {
    setAlerts(true)
    setDeleteid(id)
    setDeleteType(type)
    setCustom_id(custom_id)
  }
  function sleep(duration) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, duration);
    });
  }
  //const loading = cityList && cityList?.length === 0;
  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(1e3); // For demo purposes.

      if (active) {
        setCityList([...cityList]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);
  React.useEffect(() => {
    dispatch(page_count(0))
    dispatch(deleteData([]))
    fetchUsers();
  }, [])
  React.useEffect(() => {
    fetchAllData()
  }, [localStorage.getItem('token'),localStorage.getItem('direct_token'),localStorage.getItem('trucks_token'),localStorage.getItem('trucker_token')])

  const handleCloseMessage = () => {
    setMessage(false)
  }
  
  const handleClose = () => {
  setNote('')
  setLoadNumber('')
  setPostedAllInRate('')
  setTenderAllInRate('')
  setWidth('')
  setWeight('')
  setHeight('')
  setPalletCount('')
  setPieceCount('')
  setLoadLabel('')
  setFp('')
  setPounds('')
  setRate(0)
  setCommodity('FAK')
  setStartWhen('')
  setEndWhen('')
  setLength('')
  setMobile('')
  setColoumn(false)
  setComment('FAK')
  setDatetime('')
  setDestinationCity('')
  setDestinationStateProv('')
  setDispatcher('')
  setEarliestAvailability(new Date().toLocaleDateString('en-CA'))
  setEquipmentType('')
  setLatestAvailability(new Date().toLocaleDateString('en-CA'))
  setLoadId('')
  setEarlyDateTimeDest('')
  setEarlyDateTimeOrigin('')
  setLateDateTimeDest('')
  setStreetAddress1Origin('')
  setStreetAddress1Dest('')
  setLateDateTimeOrigin('')
  setOriginCity('')
  setOriginStateProv('')
  setOwner('')
  setPrice('')
  setStatus('NOT STARTED')
  setEmail('')
  setPickupdate('')
  setDriver('')
  setCarrier('')
  setDocID([])
  setD_ID('')
  setEdit(false)
  setCell(load)
  setPtt('Post_to_Truckstop')//Post_to_Truckstop
  setPtts('Post_to_Truckerpath')//Post_to_Truckerpath
  setDat('Post_to_DAT')
  setDirect('Post_to_Direct')
  setLocation([])
  setLP('')
  setDO('')
  setNotes_dropoff('')
  setNotes_pickup('')
  setStreet_pickup('')
  setStreet_dropoff('')
  setDropoff_date('')
  setCreated_at('')
  setLoads(false)
  setLoadStatus('')
  setLongitude('')
  setLatitude('')
  setOriginData({})
  setDestinationData({})
  setStateid(0);
  setStateList([]);
  setCityList([]);
  setLocationlogs([])
  setFocused(false);
  setHasValue(false);
  setMessage(false)
  setValue(0);
  setTabcount([1])
  setTabcountconsignee([1])
  setValuex(0);
  setValues(0);
  setDropData([])
  setPickupData([])
  setConsignee(false)
  setShippers(false)
  setAddname('')
  setAddaddress('')
  setAddaddress1('')
  setAddaddress2('')
  setAddcity('')
  setAddlocationdata([])
  setAddstate('')
  setAddcname('')
  setAddcemail('')
  setAddmobile('')
  setHours('')
  setAddcountry('USA')
  setAppointment('')
  setTypes('')
  setAddstatus('active')
  setAdd_notes('')
  setAdd_notes1('')
  setShippersdata([])
  setConsigneedata([])
  setShip('')
  setCon('')
  setUsers([])
  setDocuserID([])
  setError('yes')
  setList(true)
  setSo(false)
  setDeliveryProofPhotos([])
  setLocationLogs([])
  setLoading(false)
  setIsDeleted(false)
  setLogs([])
  setAlerts(false)
  setDeleteid('')
  setDeleteindex('')
  setTrackingId('')
  setChange(false)
  setLens(0)
  setLenc(0)
  setAddlocationdest([])
  setAddlocationorigin([])
  setU_id('')
  setE_id('')
  setCompany_id('81y4k')
  setContact_info({
    contact_email: "book@jakebrakelogistics.com",
    contact_first_name: "Thomas",
    contact_phone_number: "402 447 7663",
    contact_phone_ext: "402 447 7663"
  })
  setTenderNotes('')
  setCube('')
  setLoadReferenceNumbers('12345')
  setReferenceNumbers('')
  setCompany([])
  setLoadSize('')
  setFupartial('FULL')
  setEquipmentlist(X)
  setEquipmentTypeid(null)
   setClose('')
  setDeleteType('')
  setPosting_type('loads')
  setCustom_id('')
  setPosting_id('')
  setLoadStop([])
  setFormdata({
    shippersData: [{
      id: nextId(),
      shipper: '',
      locationP: '',
      pickUpDate: '',
      pickUpHours: '',
      originCity: '',
      notesPickup: '',
      shippersData: []
    }],
    consigneeData: [{
      id: nextId(),
      consignee: '',
      locationD: '',
      dropOffHours: '',
      dropOffDate: '',
      destinationCity: '',
      notesDropoff: '',
      consigneeData: []
    }]
  })
  setEquipmentObject({})
  dispatch(deleteData([]))
  }
  const handleCloselist = () => {
    setList(false);
  };

  const handleOpenlist = () => {
    setList(true);
  };
  const handleChange = async (event) => {
    const keyword = event.target.value;
    let searchString = keyword?.toLowerCase().split(' ')
    switch (event.target?.name) {
      case "add_notes":
        setAdd_notes(event.target.value);
        break;
      case "add_notes1":
        setAdd_notes1(event.target.value);
        break;
      case "add_name":
        setAddname(event.target.value);
        break;
      case "add_address":
        setAddaddress(event.target.value);
        break;
      case "add_address1":
        setAddaddress1(event.target.value);
        break;
      case "add_address2":
        setAddaddress2(event.target.value);
        break;
      case "add_city":
        setAddcity(event.target.value);
        if (keyword.length >= 1) setList(true)
          if (keyword !== '') {
            function filterByValue(array, string) {
              return array.filter(o =>
                  Object.keys(o).some(k =>
                      String(o[k]).toLowerCase().startsWith(string.toLowerCase())
                  )
              );
            }
    
            // Filter cities based on the keyword
            const filteredCities = filterByValue(USA, keyword);
    
            // Deduplicate filtered cities
            const uniqueCities = [];
            const seen = new Set();
    
            for (const city of filteredCities) {
              const identifier = `${city.city}|${city.state}`;
              if (!seen.has(identifier)) {
                  seen.add(identifier);
                  uniqueCities.push(city);
              }
            }
    
            // Update the city list with unique cities
            setCityList(uniqueCities);
    
          } else {
            const uniqueCities = USA.filter((a => (r => !r.has(a.city + '|' + a.state) && r.add(a.city + '|' + a.state))(new Set())), Object.create(null));
          
            setCityList(uniqueCities);
          }
          
        break;
      case "add_state":
        setAddstate(event.target.value);
        if (keyword !== '') {
          function filterByValue(array, string) {
            return array.filter(o =>
                Object.keys(o).some(k =>
                    String(o[k]).toLowerCase().startsWith(string.toLowerCase())
                )
            );
          }
  
          // Filter cities based on the keyword
          const filteredCities = filterByValue(USA, keyword);
  
          // Deduplicate filtered cities
          const uniqueCities = [];
          const seen = new Set();
  
          for (const city of filteredCities) {
            const identifier = `${city.city}|${city.state}`;
            if (!seen.has(identifier)) {
                seen.add(identifier);
                uniqueCities.push(city);
            }
          }
  
          // Update the city list with unique cities
          setCityList(uniqueCities);
  
        } else {
          const uniqueCities = USA.filter((a => (r => !r.has(a.city + '|' + a.state) && r.add(a.city + '|' + a.state))(new Set())), Object.create(null));
        
          setCityList(uniqueCities);
        }
        
        break;
      case "add_country":
        setAddcountry(event.target.value);
        break;
      case "add_cname":
        setAddcname(event.target.value);
        break;
      case "add_cemail":
        setAddcemail(event.target.value);
        break;
      case "add_mobile":
        setAddmobile(event.target.value);
        break;
      case "appointment":
        if (appointment?.length) { setAppointment('') } else { setAppointment(event.target.value) };
        break;
      case "addstatus":
        setFupartial(event.target.value);
        break;
      case "types":
        if (types?.length) { setTypes('') } else { setTypes(event.target.value) }
        break;
      case "ptt":
        if (ptt?.length) { setPtt('') } else { setPtt(event.target.value) }
        break;
      case "ptts":
        if (ptts?.length) { setPtts('') } else { setPtts(event.target.value) }
        break;
      case "dat":
        if (dat?.length) { setDat('') } else { setDat(event.target.value) }
        break;
      case "add_status":
        setAddstatus(event.target.value);
        break;
      case "hours":
        setHours(event.target.value);
        break;
      case "rate":
        setRate(event.target.value);
        break;
      case "location_name_pickup":
        setLP(event.target.value);
        break;
      case "location_name_dropoff":
        setDO(event.target.value);
        break;
      case "notes_dropoff":
        setNotes_dropoff(event.target.value);
        break;
      case "notes_pickup":
        setNotes_pickup(event.target.value);
        break;
      case "street_dropoff":
        setStreet_dropoff(event.target.value);
        break;
      case "dropoff_date":
        setDropoff_date(event.target.value);
        setHasValue(2)
        break;
      case "street_pickup":
        setStreet_pickup(event.target.value);
        break;
      case "Status":
        setStatus(event.target.value);
        break;
      case "email":
        setEmail(event.target.value);
        break;
      case "Pick up Dates":
        setPickupdate(event.target.value);
        setHasValue(1)
        break;
      case "Driver":
        setDriver(event.target.value);
        break;
      case "carrier":
        setCarrier(event.target.value);
        break;
      case "comment":
        setComment(event.target.value);
        break;
      case "datetime":
        setDatetime(event.target.value);
        break;
      case "destinationCity":
        setClose('dest')
        setDestinationCity(event.target.value);
        if (keyword !== '') {
          function filterByValue(array, string) {
            return array.filter(o =>
                Object.keys(o).some(k =>
                    String(o[k]).toLowerCase().startsWith(string.toLowerCase())
                )
            );
          }
  
          // Filter cities based on the keyword
          const filteredCities = filterByValue(USA, keyword);
  
          // Deduplicate filtered cities
          const uniqueCities = [];
          const seen = new Set();
  
          for (const city of filteredCities) {
            const identifier = `${city.city}|${city.state}`;
            if (!seen.has(identifier)) {
                seen.add(identifier);
                uniqueCities.push(city);
            }
          }
  
          // Update the city list with unique cities
          setCityList(uniqueCities);
  
        } else {
          const uniqueCities = USA.filter((a => (r => !r.has(a.city + '|' + a.state) && r.add(a.city + '|' + a.state))(new Set())), Object.create(null));
        
          setCityList(uniqueCities);
        }
        
        break;
      case "destinationStateProv":
        setDestinationStateProv(event.target.value);
        break;
      case "dispatcher":
        setDispatcher(event.target.value);
        break;
      case "earliestAvailability":
        setEarliestAvailability(event.target.value);
        break;
      case "equipmentType":
        setClose('equipment')
        setEquipmentType(event.target.value);
        if (keyword !== '') {
          function filterByValue(array, string) {
            return array.filter(o =>
              Object.keys(o).some(k => String(o[k])?.toLowerCase().includes(string?.toLowerCase())));
          }
          setEquipmentlist(filterByValue(X, event.target.value));
        }
        else {
          setEquipmentlist(X);
        }
        break;
      case "latestAvailability":
        setLatestAvailability(event.target.value);
        break;
      case "load-size":
        setFp(event.target.value);
        break;
      case "length":
        setLength(event.target.value);
        break;
      case "pounds":
        setPounds(event.target.value);
        break;
      case "commodity":
        setCommodity(event.target.value);
        break;
      case "Start Dates":
        setStartWhen(event.target.value);
        break;
      case "End Dates":
        setEndWhen(event.target.value);
        break;
      case "loadId":
        setLoadId(event.target.value);
        break;
      case "originCity":
        setClose('origin')
        setOriginCity(event.target.value);
        if (keyword !== '') {
          function filterByValue(array, string) {
            return array.filter(o =>
                Object.keys(o).some(k =>
                    String(o[k]).toLowerCase().startsWith(string.toLowerCase())
                )
            );
          }
  
          // Filter cities based on the keyword
          const filteredCities = filterByValue(USA, keyword);
  
          // Deduplicate filtered cities
          const uniqueCities = [];
          const seen = new Set();
  
          for (const city of filteredCities) {
            const identifier = `${city.city}|${city.state}`;
            if (!seen.has(identifier)) {
                seen.add(identifier);
                uniqueCities.push(city);
            }
          }
  
          // Update the city list with unique cities
          setCityList(uniqueCities);
  
        } else {
          const uniqueCities = USA.filter((a => (r => !r.has(a.city + '|' + a.state) && r.add(a.city + '|' + a.state))(new Set())), Object.create(null));
        
          setCityList(uniqueCities);
        }
        
        break;
      case "originStateProv":
        setOriginStateProv(event.target.value);
        break;
      case "owner":
        setOwner(event.target.value);
        break;
      case "status":
        setStatus(event.target.value);
        break;
      case "shippers_name":
        setShip(event.target.value);
        break;
      case "consignee_name":
        setCon(event.target.value);
        if (keyword !== '') {
          const results = await users?.filter(string => {
            let containsAtLeastOneWord = false;
            searchString?.forEach(word => {
              if (string?.name ?? con?.toLowerCase().includes(word))
                containsAtLeastOneWord = true;
              if (String(string?.city)?.toLowerCase().includes(word))
                containsAtLeastOneWord = true;
            })
            if (containsAtLeastOneWord)
              return string
          })
          setUsers(results);
        }
        else {
          setUsers(users);
        }

        break;
      case "lateDateTimeDest":
        setLateDateTimeDest(event.target.value)
        break;
      case "earlyDateTimeDest":
        setEarlyDateTimeDest(event.target.value)
        break;
      case "created_at":
        setCreated_at(event.target.value);
        break;
      case "note":
        setNote(event.target.value);
        break;
      case "loadNumber":
        setLoadNumber(event.target.value);
        break;
      case "postedAllInRate":
        setPostedAllInRate(event.target.value);
        break;
      case "tenderAllInRate":
        setTenderAllInRate(event.target.value);
        break;
      case "width":
        setWidth(event.target.value);
        break;
      case "height":
        setHeight(event.target.value);
        break;
      case "weight":
        setWeight(event.target.value);
        break;
      case "palletCount":
        setPalletCount(event.target.value);
        break;
      case "loadLabel":
        setLoadLabel(event.target.value);
        break;
      case "pieceCount":
        setPieceCount(event.target.value);
        break;
      case "tenderNotes":
        setTenderNotes(event.target.value);
        break;
      case "cube":
        setCube(event.target.value);
        break;
      case "referenceNumbers":
        setReferenceNumbers(event.target.value);
        break;
      case "loadReferenceNumbers":
        setLoadReferenceNumbers(event.target.value);
        break;
      case "length":
        setLength(event.target.value);
        break;
      case "note":
        setNote(event.target.value);
        break;
      case "loadNumber":
        setLoadNumber(event.target.value);
        break;
      case "externalId":
        setE_id(event.target.value);
        break;
      case "postedAllInRate":
        setPostedAllInRate(event.target.value);
        break;
      case "tenderAllInRate":
        setTenderAllInRate(event.target.value);
        break;
      case "width":
        setWidth(event.target.value);
        break;
      case "height":
        setHeight(event.target.value);
        break;
      case "weight":
        setWeight(event.target.value);
        break;
      case "palletCount":
        setPalletCount(event.target.value);
        break;
      case "loadLabel":
        setLoadLabel(event.target.value);
        break;
      case "pieceCount":
        setPieceCount(event.target.value);
        break;
      case "tenderNotes":
        setTenderNotes(event.target.value);
        break;
      case "cube":
        setCube(event.target.value);
        break;
      case "loadReferenceNumbers":
        setLoadReferenceNumbers(event.target.value);
        break;
      case "length":
        setLength(event.target.value);
        break;
      //   case "company":
      //     setCompany_id(event.target.value);
      //     if (keyword !== '') {
      //       const results = await company?.filter(string => {
      //       let containsAtLeastOneWord = false;
      //       searchString?.forEach(word => {
      //       if (string?.company_name.toLowerCase().includes(word))
      //           containsAtLeastOneWord = true;
      //       if (string?.company_email?.toLowerCase().includes(word))
      //           containsAtLeastOneWord = true;
      //       })
      //       if (containsAtLeastOneWord)
      //           return string
      //      })
      //      setCompany(results);
      //     }else if(keyword?.length==0){
      //       fetchCompany()
      //     }
      //     else {
      //       setCompany(company);
      //     }

      //   break;
      case "price":
        setPrice(event.target.value);
        break;
      case "load_size":
        setLoadSize(event.target.value);
        break;
    }
  };

  const mapShow = (id, index) => {
    //getCurrentLocation(i)
    
    dispatch(Maps(false));
    dispatch(mapData({
      //Logs:logs,
      // deliveryProofPhotos:load[index]?.deliveryProofPhotos || [],
      // locationLogs:load[index]?.locationLogs || {},
      referenceId: load[index]?.referenceId || load[index]?.loadId || load[index]?.shipment_info?.external_id,
      mobile: load[index]?.mobile || '',
      email: load[index]?.email || '',
      destinationCity: load[index]?.lane ? load[index]?.lane : load[index]?.loadStops ? load[index]?.loadStops.filter(x => x.type == 2) : load[index]?.shipment_info.stop_list[1],
      originCity: load[index]?.lane ? load[index]?.lane : load[index]?.loadStops ? load[index]?.loadStops.filter(x => x.type == 1) : load[index]?.shipment_info.stop_list[0],
      loadId: load[index]?.loadId || ''
    }))
  }
  
  const mapHide = () => {
    dispatch(DocId(''));
    dispatch(Maps(true));
    dispatch(mapData({}));
    dispatch(deleteData([]));
  }
  const updatePop = (id, id2, id3, index) => {
    const loadItem = load[index] || {}; // Safe access to the load item
    const freight = loadItem?.freight || {};
    const shipmentInfo = loadItem?.shipment_info || {};
    const contactInfo = loadItem?.contact_info || contact_info;
    const dimensional = loadItem?.dimensional || {};
    const lane = loadItem?.lane || {};
    const loadStops = loadItem?.loadStops || [];
    const exposure = loadItem?.exposure || {};
    const rateAttributes = loadItem?.rateAttributes || {};
    const origin = lane.origin || {};
    const destination = lane.destination || {};
    
    setEdit(true);
    setU_id(id);
    setD_ID(id2);
    setE_id(id3);
    setPosting_id(loadItem?.posting_id);
    setCustom_id(loadItem?.custom_id);

    // Comment or Description
    setComment(freight.comments?.[0]?.comment || shipmentInfo.description || loadItem?.comment || loadItem?.note);

    // Equipment Type and ID
    setEquipmentType(
        freight.equipmentType || 
        X?.find(x => x.id === loadItem?.equipmentAttributes?.equipmentTypeId)?.type ||
        shipmentInfo.equipment?.[0] || 
        loadItem?.trailer_type?.[0]
    );
    setEquipmentTypeid(
        loadItem?.equipmentAttributes?.equipmentTypeId || 
        X?.find(x => x.type === freight.equipmentType)?.id
    );

    // Dimensions
    setLength(freight.lengthFeet || dimensional.length || shipmentInfo.shipment_dimensions?.shipment_length || loadItem?.length);
    setHeight(dimensional.height);
    setPalletCount(dimensional.palletCount);
    setPieceCount(dimensional.pieceCount);
    setCube(loadItem?.cube);
    setLoadLabel(dimensional.loadLabel);

    // Load Details
    setFupartial(
        freight.fullPartial || 
        shipmentInfo.load_size || 
        (loadItem?.full_load ? "FULL" : "PARTIAL")
    );
    setPounds(freight.weightPounds || dimensional.weight || shipmentInfo.shipment_weight || loadItem?.weight);
    setRate(
        exposure.audience?.loadBoard?.transactionDetails?.loadOfferRateUsd || 
        rateAttributes.postedAllInRate?.amount || 
        shipmentInfo.shipment_price || 
        loadItem?.pay_rate
    );
    setCommodity(freight.commodity?.details || 'FAK');
    setLoadNumber(loadItem?.loadNumber);
    setPostedAllInRate(rateAttributes.postedAllInRate?.amount);
    setTenderAllInRate(rateAttributes.tenderAllInRate?.amount);
    setLoadReferenceNumbers(loadItem?.loadReferenceNumbers);
    setNote(loadItem?.note);
    setTenderNotes(loadItem?.tenderNotes);

    // Dates and Times
    const latestAvailability = exposure.latestAvailabilityWhen || loadStops?.[0]?.lateDateTime || loadItem?.receive_date || shipmentInfo?.stop_list?.[1]?.date_local || '';
    const [latestDate, latestTime] = latestAvailability.split('T');
    setLatestAvailability(latestDate);
    
    const [hours, minutes] = latestTime ? latestTime.split(':') : [];
    setLateDateTimeDest(hours ? `${hours}:${minutes}`:'');
    // setEarlyDateTimeDest(exposure.earliestAvailabilityWhen || loadStops?.[0]?.earlyDateTime || loadItem?.ship_date);
    const earliestAvailability = exposure.earliestAvailabilityWhen || loadStops?.[0]?.earlyDateTime || loadItem?.ship_date || shipmentInfo?.stop_list?.[0]?.date_local || ""
    const [earlyDate, earlyTime] = earliestAvailability.split('T');
    setEarliestAvailability(earlyDate)
    const [earlyhours, earlyminutes] = earlyTime ? earlyTime.split(':') : [];
    setEarlyDateTimeDest(earlyhours ? `${earlyhours}:${earlyminutes}`:'');
    // Locations
    setOriginCity(origin.city || loadStops?.[0]?.location?.city || shipmentInfo.stop_list?.[0]?.city || loadItem?.origin_city);
    setDestinationCity(destination.city || loadStops?.[1]?.location?.city || shipmentInfo.stop_list?.[1]?.city || loadItem?.destination_city);
    setLoadStop(shipmentInfo.stop_list)
    // Set origin and destination locations with detailed attributes
    setAddlocationorigin({
        city: origin.city || loadItem?.origin_city || loadStops?.[0]?.location?.city,
        state: origin.state || loadItem?.origin_state || loadStops?.[0]?.location?.state,
        zipCode: origin.postalCode,
        latitude: origin.latitude,
        longitude: origin.longitude,
        county: origin.county || loadStops?.[0]?.location?.country
    });
    setAddlocationdest({
        city: destination.city || loadItem?.destination_city || loadStops?.[1]?.location?.city,
        state: destination.state || loadItem?.destination_state || loadStops?.[1]?.location?.state,
        zipCode: destination.postalCode,
        latitude: destination.latitude,
        longitude: destination.longitude,
        county: destination.county || loadStops?.[1]?.location?.country
    });
    setContact_info(contactInfo)
    setLoadReferenceNumbers(loadItem?.loadReferenceNumbers)
    setLoadNumber(loadItem?.loadNumber)
};


const Update = async () => {
  setLoads(true);
  setLoading(true);

  // Construct data for each endpoint
  const dataTP = {
    company_id,
    contact_info:contact_info,
    shipment_info: {
      equipment: [equipmentType?.split(',')[0]?.toUpperCase() || equipmentType],
      load_size: fupartial,
      description: comment,
      stop_list:[
        {
          stop_type: "pickup",
          city: loadStop?.[0]?.city,
          state: loadStop?.[0]?.state,
          lat: loadStop?.[0]?.lat,
          lng: loadStop?.[0]?.lng,
          date_local: earlyDateTimeDest?.length ? `${earliestAvailability}T${earlyDateTimeDest}:00.000Z` : `${earliestAvailability}T00:00:00.000Z`,
          sequence: 1,
          country: loadStop?.[0]?.country,
        },
        {
          stop_type: "dropoff",
          city: loadStop?.[1]?.city,
          state: loadStop?.[1]?.state,
          lat: loadStop?.[1]?.lat,
          lng: loadStop?.[1]?.lng,
          date_local: lateDateTimeDest?.length ? `${latestAvailability}T${lateDateTimeDest}:00.000Z` : `${latestAvailability}T00:00:00.000Z`,
          sequence: 2,
          country: loadStop?.[1]?.country,
        }
      ],
      shipment_weight: Number(pounds),
      shipment_dimensions: { shipment_length: Number(length) },
      requirements: "",
      shipment_price: Number(rate),
      shipment_actions: {
        biddable: false,
        book_now: false,
        link_url: null
      },
      private_load: false,
      external_id: e_id
    }
  };

  const data = {
    freight: {
      equipmentType: equipmentObject?.DATType?.length ? equipmentObject.DATType : equipmentType,
      fullPartial: fupartial,
      comments: [{ comment }],
      commodity: { details: commodity },
      lengthFeet: Number(length),
      weightPounds: Number(pounds)
    },
    exposure: {
      audience: {
        loadBoard: {
          includesExtendedNetwork: false,
          transactionDetails: {
            loadOfferRateUsd: Number(rate),
            transactionType: "NONBOOKABLE_OFFER_RATE"
          }
        }
      },
      isExposed: true,
      earliestAvailabilityWhen: earlyDateTimeDest?.length ? `${earliestAvailability}T${earlyDateTimeDest}:00.000Z` : `${earliestAvailability}T00:00:00.000Z`,
      latestAvailabilityWhen: lateDateTimeDest?.length ? `${latestAvailability}T${lateDateTimeDest}:00.000Z` : `${latestAvailability}T00:00:00.000Z`,
      preferredContactMethod: "EMAIL"
    },
    isTrackingRequired: false
  };

  const dataTs = {
    postAsUserId: "8fab861d-b755-e911-aa1e-b0e52ccc70f6",
    equipmentAttributes: {
      equipmentTypeId: equipmentTypeid,
      transportationModeId: 1,
      otherEquipmentNeeds: "Pallet return"
    },
    commodityId: null,
    loadStops: [
      {
        type: 1,
        sequence: 1,
        earlyDateTime: earlyDateTimeDest?.length ? `${new Date(new Date(earliestAvailability).setDate(new Date(earliestAvailability).getDate() + 1)).toLocaleDateString('en-CA')}T${earlyDateTimeDest}:00.000Z` : new Date(new Date(earliestAvailability).setDate(new Date(earliestAvailability).getDate() + 1)).toISOString(),
        lateDateTime: lateDateTimeDest?.length ? `${new Date(new Date(latestAvailability).setDate(new Date(latestAvailability).getDate() + 1)).toLocaleDateString('en-CA')}T${lateDateTimeDest}:00.000Z` : new Date(new Date(latestAvailability).setDate(new Date(latestAvailability).getDate() + 1)).toISOString(),
        location: {
          locationName: '',
          city: originCity,
          state: addlocationorigin.state,
          streetAddress1: streetAddress1Origin,
          streetAddress2: '',
          countryCode: addlocationorigin?.country,
        },
      },
      {
        type: 2,
        sequence: 1,
        earlyDateTime: null,
        lateDateTime: null,
        location: {
          locationName: '',
          city: destinationCity,
          state: addlocationdest.state,
          streetAddress1: streetAddress1Dest,
          streetAddress2: '',
          countryCode:addlocationdest?.country,
        },
      }
    ],
    note: comment,
    loadNumber: loadNumber,
    loadTrackingRequired: true,
    rateAttributes: {
      postedAllInRate: {
        amount: Number(rate),
        currencyCode: "USD"
      },
      tenderAllInRate: {
        amount: 0,
        currencyCode: "USD"
      }
    },
    customData: [],
    dimensional: {
      length: Number(length),
      weight: Number(pounds),
    },
    loadReferenceNumbers: loadReferenceNumbers,
  };

  const dataDirect = {
    list: [
      {
        comment,
        custom_id: String(custom_id),
        posting_id,
        destination_city: destinationCity?.split(',')[0],
        destination_state: addlocationdest.state,
        full_load: fupartial === 'FULL',
        length: Number(length),
        origin_city: originCity?.split(',')[0],
        origin_state: addlocationorigin.state,
        trailer_type: [equipmentObject?.DFType?.length ? equipmentObject.DFType : equipmentType,],
        other_trailer_types: equipmentObject?.DFType?.length ? equipmentObject.DFType : equipmentType,
        pay_rate: Number(rate),
        receive_date: lateDateTimeDest?.length ? `${latestAvailability}T${lateDateTimeDest}:00.000Z` : `${latestAvailability}T00:00:00.000Z`,
        ship_date: earlyDateTimeDest?.length ? `${earliestAvailability}T${earlyDateTimeDest}:00.000Z` : `${earliestAvailability}T00:00:00.000Z`,
        weight: Number(pounds)
      }
    ]
  };

  try {
    if (dat === 'Post_to_DAT' && u_id) {
      await axios.patch(`https://freight.api.dat.com/posting/v2/loads/${u_id}`, data, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
    }

    if (direct === 'Post_to_Direct' && custom_id) {
      await axios.patch(`https://dr48nfhb-5000.use.devtunnels.ms/fetch_postings/${posting_type}`, dataDirect, {
        headers: {
          'api-token':`${localStorage.getItem('direct-api-key')}`,
          'end-user-token': `${localStorage.getItem('direct_token')}`,
        }
      });
    }
    
    if (ptt === 'Post_to_Truckstop' && d_ID) {
      await axios.post(`https://api.truckstop.com/loadmanagement/v2/load/${d_ID}`, dataTs, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('trucks_token')}`, 'Content-Type': 'application/json' }
      });
    }

    if (ptts === 'Post_to_Truckerpath' && e_id) {
      await axios.post(`https://dr48nfhb-5000.use.devtunnels.ms/trucker_update_load`, dataTP, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('trucker_token')}`}
      });
    }


    // On success
    fetchAllData();
    Swal.fire({
      customClass: { container: 'my-swal' },
      title: "Updated!",
      icon: 'success',
      timer: 2000
    });

  } catch (e) {
    // On error
    console.error(e); // Log error for debugging
    Swal.fire({
      customClass: { container: 'my-swal' },
      title: 'Error updating data',
      icon: 'error',
      timer: 2000
    });
  } finally {
    // Clean up regardless of success or failure
    setLoading(false);
    setLoads(false);
    setColoumn(false);
    setEdit(false);
    handleClose();
  }
};

  const handleCloseAlert = () => {
    setAlerts(false)
    setDeleteid('')
    setDeleteindex('')
  }
  
  const bulkdeleteLoad = async () => {
    setLoads(true);
    setLoading(true);
    
    // Prepare data for different APIs
    const data = {
      loads: [...new Set(deletedata?.filter(x => x?.loadId != null).map(x=> {
        return {
        loadId: x?.loadId
      }
    }
      ))]
    };
  
    const dataTp = {
      external_id: [...new Set(deletedata?.filter(x => x?.shipment_info?.external_id != null).map(x=>x?.shipment_info?.external_id))]
    };
  
    const dataDat = {
        ids: [...new Set(deletedata?.filter(x=>x?.id != null).map(x =>x?.id))]
    };
  
    const dataDirect = {
      posting_ids: [...new Set(deletedata?.filter(x=>x?.posting_id != null).map(x =>x?.posting_id))]
    };
  
    // Function to handle API requests and responses
    const handleApiRequest = async (url, method, requestData, headers) => {
      try {
        const response = await axios({ url, method, data: requestData, headers });
        fetchAllData();
        withReactContent(Swal).fire({
          customClass: { container: 'my-swal' },
          title: 'Deleted!',
          icon: 'success',
          timer: 2000
        });
        setLoads(false);
        setLoading(false);
        setColoumn(false);
        setEdit(false);
        handleClose();
        dispatch(deleteData([]));
      } catch (error) {
        setLoads(false);
        setColoumn(false);
        setLoading(false);
        setEdit(false);
        handleClose();
        withReactContent(Swal).fire({
          customClass: { container: 'my-swal' },
          title: error.message || 'Error deleting data',
          icon: 'error',
          timer: 2000
        });
      }
    };
  
    // Make API requests conditionally
    if (dataDirect?.posting_ids?.length) {
      await handleApiRequest(
        `https://dr48nfhb-5000.use.devtunnels.ms/fetch_postings/${posting_type}`,
        'DELETE',
        dataDirect,
        {
          'api-token':`${localStorage.getItem('direct-api-key')}`,
          'end-user-token': `${localStorage.getItem('direct_token')}`,
        }
      );
    }
  
    if (dataDat?.arguments?.ids?.length) {
      await handleApiRequest(
        `https://dr48nfhb-5000.use.devtunnels.ms/dat_delete_load_postings`,
        'POST',
        dataDat,
        { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      );
    }
  
    if (data?.loads?.length) {
      await handleApiRequest(
        `https://dr48nfhb-5000.use.devtunnels.ms/truckstop_delete_loads`,
        'POST',
        data,
        { 'Authorization': `Bearer ${localStorage.getItem('trucks_token')}`, 'Content-Type': 'application/json' }
      );
    }
  
    if (dataTp?.external_id?.length) {
      await handleApiRequest(
        `https://dr48nfhb-5000.use.devtunnels.ms/trucker_delete_load`,
        'POST',
        dataTp,
        { 'Authorization': `Bearer ${localStorage.getItem('trucker_token')}`}
      );
    }
  };
  
  const deleteLoad = async () => {
    setLoads(true);
    setLoading(true);
  
    // Prepare data for different APIs
    const data = {
      loads: [{ loadId: deleteid, reason: 2 }]
    };
  
    const dataTp = {
      external_id: [deleteid]
    };
  
    const dataDirect = {
      posting_ids: [deleteid]
    };
  
    // Function to handle API requests and responses
    const handleApiRequest = async (url, method, requestData, headers) => {
      try {
        const response = await axios({ url, method, data: requestData, headers });
        fetchAllData();
        withReactContent(Swal).fire({
          customClass: { container: 'my-swal' },
          title: 'Deleted!',
          icon: 'success',
          timer: 2000
        });
        setLoads(false);
        setLoading(false);
        setColoumn(false);
        setEdit(false);
        handleClose();
      } catch (error) {
        setLoads(false);
        setColoumn(false);
        setLoading(false);
        setEdit(false);
        handleClose();
        withReactContent(Swal).fire({
          customClass: { container: 'my-swal' },
          title: error.message || 'Error deleting data',
          icon: 'error',
          timer: 2000
        });
      }
    };
  
    // Make API requests conditionally
    switch (deleteType) {
      case 'DAT':
        await handleApiRequest(
          `https://freight.api.dat.com/posting/v2/loads/?id=${deleteid}`,
          'DELETE',
          null,
          { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        );
        break;
  
      case 'truckstop':
        await handleApiRequest(
          `https://api.truckstop.com//bulkloadmanagement/v2/deletebulkload`,
          'POST',
          data,
          { 'Authorization': `Bearer ${localStorage.getItem('trucks_token')}`, 'Content-Type': 'application/json' }
        );
        break;
  
      case 'Direct':
        await handleApiRequest(
          `https://dr48nfhb-5000.use.devtunnels.ms/fetch_postings/${posting_type}`,
          'DELETE',
          dataDirect,
          {
            'api-token':`${localStorage.getItem('direct-api-key')}`,
            'end-user-token': `${localStorage.getItem('direct_token')}`,
          }
        );
        break;
  
      case 'truckerpath':
        await handleApiRequest(
          `https://dr48nfhb-5000.use.devtunnels.ms/trucker_delete_load`,
          'POST',
          dataTp,
          { 'Authorization': `Bearer ${localStorage.getItem('trucker_token')}`}
        );
        break;
  
      default:
        setLoads(false);
        setLoading(false);
        setColoumn(false);
        setEdit(false);
        handleClose();
        withReactContent(Swal).fire({
          customClass: { container: 'my-swal' },
          title: 'Invalid delete type',
          icon: 'error',
          timer: 2000
        });
    }
  };

  
  const Submit = async () => {
    setLoads(true)
    setLoading(true)
    const generationNumbers = generateUniqueId()
    const dataDirect = {
      list: [
        {
          comment: comment,
          custom_id: String(referenceNumbers?.length ? referenceNumbers : generationNumbers),
          destination_city: destinationCity?.split(',')[0],
          destination_state: addlocationdest.state,
          full_load: fupartial == 'FULL',
          length: Number(length),
          origin_city: originCity?.split(',')[0],
          origin_state: addlocationorigin.state,
          trailer_type: [equipmentObject?.DFType?.length ? equipmentObject.DFType : equipmentType],
          other_trailer_types: equipmentObject?.DFType?.length ? equipmentObject.DFType : equipmentType,
          pay_rate: Number(rate),
          receive_date: lateDateTimeDest?.length ? `${latestAvailability}T${lateDateTimeDest}:00.000Z` : `${latestAvailability}T00:00:00.000Z`,
          ship_date: earlyDateTimeDest?.length ? `${earliestAvailability}T${earlyDateTimeDest}:00.000Z` : `${earliestAvailability}T00:00:00.000Z`,
          weight: Number(pounds)
        }
      ]
    }
    const dataTP = {
      company_id: company_id,
      contact_info: contact_info,
      shipment_info: {
        equipment: [
          equipmentType?.split(',')[0] ? equipmentType?.split(',')[0]?.toUpperCase() : equipmentType
        ],
        load_size: fupartial,
        description: comment,
        shipment_weight: Number(pounds),
        shipment_dimensions: {
          //shipment_height: height,
          //shipment_width: width,
          shipment_length: Number(length)
        },
        requirements: "",
        stop_list: [
          {
            stop_type: "pickup",
            city: originCity.split(',')[0],
            state: addlocationorigin.state,
            lat: addlocationorigin?.latitude,
            lng: addlocationorigin?.longitude,
            date_local: earlyDateTimeDest?.length ? `${earliestAvailability}T${earlyDateTimeDest}:00.000Z` : `${earliestAvailability}T00:00:00.000Z`,
            sequence: 1,
            country: addlocationorigin?.latitude ? "USA" : "CAN",
          },
          {
            stop_type: "dropoff",
            city: destinationCity.split(',')[0],
            state: addlocationdest.state,
            lat: addlocationdest?.latitude,
            lng: addlocationdest?.longitude,
            date_local: lateDateTimeDest?.length ? `${latestAvailability}T${lateDateTimeDest}:00.000Z` : `${latestAvailability}T00:00:00.000Z`,
            sequence: 2,
            country: addlocationdest?.latitude ? "USA" : "CAN",
          }
        ],
        shipment_price: Number(rate),
        shipment_actions: {
          biddable: false,
          book_now: false,
          link_url: null
        },
        private_load: false,
        external_id: referenceNumbers?.length ? referenceNumbers : generationNumbers
      }
    }
    const data = {
      freight: {
        equipmentType: equipmentObject?.DATType?.length ? equipmentObject.DATType : equipmentType,
        fullPartial: fupartial,
        comments: [
          {
            comment: comment
          }
        ],
        commodity: {
          details: commodity
        },
        lengthFeet: Number(length),
        weightPounds: Number(pounds)
      },
      lane: {
        origin: {
          city: originCity?.split(',')[0],
          stateProv: addlocationorigin.state,
          //postalCode: String(addlocationorigin.zipCode),
          latitude: addlocationorigin.latitude,
          longitude: addlocationorigin.longitude,
          country: addlocationorigin?.country ? addlocationorigin?.country : "CAN",
        },
        destination: {
          city: destinationCity?.split(',')[0],
          stateProv: addlocationdest.state,
          //postalCode: String(addlocationdest.zipCode),
          latitude: addlocationdest.latitude,
          longitude: addlocationdest.longitude,
          country: addlocationdest?.latitude ? "USA" : "CAN",
        }
      },
      exposure: {
        audience: {
          loadBoard: {
            includesExtendedNetwork: false,
            transactionDetails: {
              loadOfferRateUsd: Number(rate),
              transactionType: "NONBOOKABLE_OFFER_RATE"
            }
          }
        },
        isExposed: true,
        // startWhen: new Date(startWhen).toISOString(),
        // endWhen: new Date(endWhen).toISOString(),
        earliestAvailabilityWhen: earlyDateTimeDest?.length ? `${earliestAvailability}T${earlyDateTimeDest}:00.000Z` : `${earliestAvailability}T00:00:00.000Z`,
        latestAvailabilityWhen: lateDateTimeDest?.length ? `${latestAvailability}T${lateDateTimeDest}:00.000Z` : `${latestAvailability}T00:00:00.000Z`,
        preferredContactMethod: "EMAIL"
      },
      referenceId: String(referenceNumbers?.length ? referenceNumbers : generationNumbers),
      isTrackingRequired: false
    }
    const dataTs = {
      postAsUserId: "8fab861d-b755-e911-aa1e-b0e52ccc70f6",
      PaymentAmount: Number(rate),
      equipmentAttributes: {
        equipmentTypeId: equipmentTypeid,
        // equipmentOptions: [
        //   1
        // ],
        transportationModeId: 1,
        otherEquipmentNeeds: "Pallet return"
      },
      commodityId: null,
      loadStops: [
        {
          type: 1,
          sequence: 1,
          earlyDateTime: earlyDateTimeDest?.length ? `${new Date(new Date(earliestAvailability).setDate(new Date(earliestAvailability).getDate() + 1)).toLocaleDateString('en-CA')}T${earlyDateTimeDest}:00.000Z` : new Date(new Date(earliestAvailability).setDate(new Date(earliestAvailability).getDate() + 1)).toISOString(),
          lateDateTime: lateDateTimeDest?.length ? `${new Date(new Date(latestAvailability).setDate(new Date(latestAvailability).getDate() + 1)).toLocaleDateString('en-CA')}T${lateDateTimeDest}:00.000Z` : new Date(new Date(new Date(latestAvailability).setDate(new Date(latestAvailability).getDate() + 1)).setHours(new Date(latestAvailability).getHours() + 3)).toISOString(),
          location: {
            locationName: '',
            city: originCity?.split(',')[0],
            state: addlocationorigin.state,
            streetAddress1: streetAddress1Origin,
            streetAddress2: '',
            countryCode: addlocationorigin?.latitude ? "USA" : "CAN",
            //postalCode:postalCodeOrigin
          },
          // contactName:contactNameOrigin,
          // contactPhone:contactPhoneOrigin,
          // stopNotes:stopNotesOrigin,
          //referenceNumbers:[referenceNumbersOrigin]
        },
        {
          type: 2,
          sequence: 1,
          earlyDateTime: null,
          lateDateTime: null,
          location: {
            locationName: '',
            city: destinationCity?.split(',')[0],
            state: addlocationdest.state,
            streetAddress1: streetAddress1Dest,
            streetAddress2: '',
            countryCode: addlocationdest?.latitude ? "USA" : "CAN",
            //postalCode:postalCodeDest
          },
          // contactName:contactNameDest,
          // contactPhone:contactPhoneDest,
          // stopNotes:stopNotesDest,
          //referenceNumbers:[referenceNumbersDest]
        }
      ],
      note: comment,
      loadNumber: referenceNumbers?.length ? referenceNumbers : generationNumbers,
      loadTrackingRequired: true,
      rateAttributes: {
        postedAllInRate: {
          amount: Number(rate),
          currencyCode: "USD"
        },
        tenderAllInRate: {
          amount: 0,
          currencyCode: "USD"
        }
      },
      customData: [],
      dimensional: {
        length: Number(length),
        // width: width,
        weight: Number(pounds),
        // height: height,
        // palletCount: palletCount,
        // pieceCount: pieceCount,
        // cube: cube
      },
      // loadActionAttributes: {
      //   loadActionId: "1",
      //   loadActionOption: "PostOnlineTender"
      // },
      // loadLabel: loadLabel,
      // tenderNotes: tenderNotes,
      loadReferenceNumbers: [loadReferenceNumbers],
      // termsAndConditions: {
      //   id: uuidv4()
      // }
    }
    try {
      if ((dat == 'Post_to_DAT') && localStorage.getItem('token')) {
        const docRef = await axios.post('https://freight.api.dat.com/posting/v2/loads/', data, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        fetchAllData()
      }
      if ((direct == 'Post_to_Direct') && localStorage.getItem('direct_token')) {
        const docRef = await axios.post(`https://dr48nfhb-5000.use.devtunnels.ms/fetch_postings/${posting_type}`, dataDirect, {
          headers:
          {
            'api-token':`${localStorage.getItem('direct-api-key')}`,
            'end-user-token': `${localStorage.getItem('direct_token')}`,
          }
        });
        fetchAllData()
      }
      if ((ptt == 'Post_to_Truckstop') && localStorage.getItem('trucks_token')) {
        const docRefc = await axios.post('https://api.truckstop.com/loadmanagement/v2/load', dataTs, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('trucks_token')}`,
            'Content-Type': 'application/json'
          }
        })
        fetchAllData()
      }
      if ((ptts == 'Post_to_Truckerpath') && localStorage.getItem('trucker_token')) {
        const docRefS = await axios.post('https://dr48nfhb-5000.use.devtunnels.ms/trucker_submit_load', dataTP, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('trucker_token')}`
          }
        })
        fetchAllData()
      }
      // window.location.reload()
      dispatch(Single(false))
      setLoading(false)
      handleClose()
      withReactContent(Swal).fire({
        customClass: {
          container: 'my-swal'
        },
        title: 'added!',
        icon: 'success',
        timer: 2000
      });
      setLoads(false);
      setColoumn(false)
      setEdit(false)
      dispatch(Single(false))
    } catch (e) {
      dispatch(Single(false))
      setLoads(false);
      setLoading(false)
      setColoumn(false)
      setEdit(false)
      handleClose()
      Swal.fire({
        customClass: {
          container: 'my-swal'
        },
        title: "check valid origin and destination and others",
        icon: "error",
        timer: 2000
      });
    }
  }
  
  const fetchLoad = async () => {
    setLoads(true);
    setLoading(true);
    try {
        const response = await axios.get('https://freight.api.dat.com/posting/v2/loads', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.data; // Return data to be used in combined state
    } catch (error) {
        console.error("Error fetching Load:", error);
        setDat_open(true)
        localStorage.removeItem('token')
        return []; // Return empty array on error
    }
};

const fetchTruckstop = async () => {
    try {
      const allData = [];
      let pageNumber = 1;
      let totalPages = 1; // Initialize to a value greater than 0 to enter the loop
    
      while (pageNumber <= totalPages) {
        try {
          const data = {
            pagination: {
              pageNumber: pageNumber,
              pageSize: 100
            }
          };
    
          const response = await axios.post('https://api.truckstop.com/loadmanagement/v2/load/search', data, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('trucks_token')}`,
              'Content-Type': 'application/json'
            }
          });
    
          allData.push(...response.data.data);
          totalPages = response.data.pagination.totalPages; // Assuming 'totalPages' is the key for total pages
          pageNumber++;
        } catch (error) {
          console.error("Error fetching Truckstop:", error);
          break; // Exit loop on error
        }
      }
        return allData; // Return data to be used in combined state
    } catch (error) {
        console.error("Error fetching Truckstop:", error);
        return []; // Return empty array on error
    }
};


const fetchDirectLoad = async () => {
    setLoads(true);
    setLoading(true);
    try {
        const response = await axios.get(`https://dr48nfhb-5000.use.devtunnels.ms/fetch_postings/${posting_type}`, {
            headers: {
              'api-token':`${localStorage.getItem('direct-api-key')}`,
              'end-user-token': `${localStorage.getItem('direct_token')}`,
            }
        });
        return response.data.list; // Return data to be used in combined state
    } catch (error) {
        Swal.fire({
          title: `Error fetching Direct Load:${error}`,
          icon: "error",
          timer: 2000
        });
        return []; // Return empty array on error
    }
};

const fetchTruckerpath = async () => {
  const fetchPage = async (pageNumber) => {
    try {
      const response = await axios.post(
        'https://dr48nfhb-5000.use.devtunnels.ms/trucker_fetch_loads',
        {
          page_num: pageNumber,
          page_size: 100
        },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('trucker_token')}`
          }
        }
      );
      return response.data;
    } catch (error) {
      Swal.fire({
        title: `Error fetching page ${pageNumber} from Truckerpath API:${error}`,
        icon: "error",
        timer: 2000
      });
      return null; // Return null to indicate failure for this page
    }
  };

  try {
    setLoads(true);
    setLoading(true);

    let pageNumber = 1;
    let allData = [];
    let totalPages = 1; // Initialize to enter the loop

    while (pageNumber <= totalPages) {
      const data = await fetchPage(pageNumber);
      if (data) {
        totalPages = data.totalPage || 1; // Ensure totalPages has a default value
        allData = [...allData, ...data.data];
        pageNumber++;
      } else {
        console.error(`Skipping page ${pageNumber} due to fetch error.`);
        break; // Exit the loop on error
      }
    }

    // Return all fetched data or an empty array if none was fetched
    return allData.length > 0 ? allData : [];
    
  } catch (error) {
    console.error("Error fetching Truckerpath:", error);
    withReactContent(Swal).fire({
      customClass: {
        container: 'my-swal'
      },
      title: 'Error fetching data from Truckerpath!',
      icon: 'error'
    });
    return [];
  } finally {
    setLoads(false);
    setLoading(false);
  }
};




const fetchAllData = async () => {
    setLoads(true);
    setLoading(true);
    
    try {
        // Execute all API calls in parallel
        const [loadData, truckstopData, directLoadData, truckerpathData] = await Promise.all([
            fetchLoad(),
            fetchTruckstop(),
            fetchDirectLoad(),
            fetchTruckerpath()
        ]);
        
        // Combine all data
        const combinedData = [
            ...loadData,
            ...truckstopData,
            ...directLoadData,
            ...truckerpathData
        ];

        // Remove duplicates if necessary
        const uniqueData = combinedData.filter((item, index, self) => {
          // Ensure properties exist
          if (item.id || item.loadId || item.posting_id || item.shipment_info?.external_id) {
              // Check for uniqueness
              const isUnique = index === self.findIndex(t => 
                  (item.id && t.id == item.id) || 
                  (item.loadId && t.loadId == item.loadId) || 
                  (item.posting_id && t.posting_id == item.posting_id) || 
                  (item.shipment_info?.external_id && t?.shipment_info?.external_id == item.shipment_info?.external_id)
              );
              return isUnique;
          }
          return false;
      });

        // Update state with combined data
        console.log(combinedData)
        setCell(uniqueData);
        dispatch(Cell({ id: 'load_data', data: uniqueData }));

    } catch (error) {
        Swal.fire({
            title: 'Failed to load data!',
            icon: 'error'
        });
    } finally {
        setLoads(false);
        setLoading(false);
    }
};

  
  const fetchUsers = async () => {
    // let { data, error } = await supabase.from('Users_Details').select('*').eq('user_id', localStorage.getItem('id'))
    // setUsers(data);
    // setDocuserID(data);
  };
  const handleSubmit = (event) => {
    if (event && typeof event.preventDefault === 'function' && typeof event.stopPropagation === 'function') {
            event.preventDefault(); 
            event.stopPropagation();

            if (edit) {
                Update();
            } else {
                Submit();
            }
    } else {
        console.warn("Invalid event object");
    }
};
  const onFocus = (e) => setFocused(e.target.name);
  const onBlur = (e) => setFocused('');
  const shippersCount = async (t) => {
    
    if (formdata?.shippersData?.length > 1) {
      const x = await tabcount.filter(x => x != t)
      const y = await formdata?.shippersData.filter(y => y.id != t)
      setTabcount(x)
      setFormdata({ ...formdata, shippersData: y })
      handleChangetab('', 0)
    } else {
      setTabcount(tabcount)
      setFormdata(formdata)
    }
  }
  const conCount = async (t) => {
    if (formdata?.consigneeData?.length > 1) {
      const x = await tabcount.filter(x => x != t)
      const y = await formdata?.consigneeData.filter(y => y.id != t)
      setTabcount(x)
      setFormdata({ ...formdata, consigneeData: y })
      handleChangetabx('', 0)
    } else {
      setTabcount(tabcount)
      setFormdata(formdata)
    }
  }

  const clickDatas = (option, e) => {
    setShip(option.name);
    setLP(option.address);
    setOriginCity(option.city);
    setShippersdata(option);
  }
  const clickDatac = (option, i, e) => {
    setCon(option.name);
    setDestinationCity(option.city);
    setDO(option.address);
    setConsigneedata(option);
    onChangeFields(e, i, shippersdata, option)
  }
  
  
  
  
  const addShippersdetails = () => {
    if (formdata?.consigneeData?.length >= 1) {
      setFormdata({ ...formdata, shippersData: [...formdata.shippersData, U] })
    }
    else {
      setFormdata(formdata)
    }
  }
  const addCondetails = () => {
    if (formdata?.consigneeData?.length >= 1) {
      setFormdata({ ...formdata, consigneeData: [...formdata.consigneeData, U1] })
    }
    else {
      setFormdata(formdata)
    }
  }
  const addTypeOfuser = async () => {
    setLoads(true)
    setLoading(true)
    try {
      const { docRef, error } = await supabase.from('Users_Details').insert({
        name: addname,
        city: addcity,
        mobile: addmobile,
        address: addaddress,
        address1: addaddress1,
        address2: addaddress2,
        email: addcemail,
        country: addcountry,
        state: addlocationdata?.state?.length ? addlocationdata?.state : addstate,
        locationdata: addlocationdata,
        notes: add_notes,
        internalnotes: add_notes1,
        notes1: add_notes1,
        hours: hours,
        contactName: addcname,
        contactEmail: addcemail,
        appointment: appointment,
        status: addstatus,
        type: shippers && types == 'consignee' || consignee && types == 'shippers' ? 'sc' : shippers ? 'shippers' : consignee ? 'consignee' : ''

      })
      handleClosetype()
      fetchUsers()
      withReactContent(Swal).fire({
        customClass: {
          container: 'my-swal'
        },
        title: 'added!',
        icon: 'success',
        timer: 2000
      });
      setLoads(false);
      setLoading(false)
      
    } catch (e) {
      setLoads(false);
      setLoading(false)
      handleClosetype()
      Swal.fire({
        customClass: {
          container: 'my-swal'
        },
        title: e,
        icon: "error",
        timer: 2000
      });
    }
  }
  const handleDateChange = (event) => {
    const date = new Date(event.target.value);
    const day = date.getDay();
    if (day === 0 || day === 6) {
      setError(true);
      Swal.fire({
        customClass: {
          container: 'my-swal'
        },
        title: 'select only weekdays',
        icon: "error",
        timer: 2000
      });
    } else {
      setError(false);
      handleChange(event)
    }
  };

  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const timeString = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
        times.push(timeString);
      }
    }
    return times;
  };

  const openColumn = () => {
    setColoumn(true)
  }
  return (
    <>
      {loading ? <LoadingPage/> :
      <div className='content-bar'>
        {map ? <>
          <ColumnData rows={load} columns={feild} bulkdel={bulkdeleteLoad} openColumn={openColumn}/>
        </> :
          <>
            <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={2} xl={2} onClick={() => mapHide()} style={{ fontSize: '20px', fontWeight: 600, cursor: 'pointer', color: '#fff', textAlign: 'center' }}><Item style={{ color: '#fff',background: '#000', fontWeight: 600 }}>Back to Loads</Item></Grid>
              <Grid item xs={12} sm={12} md={6} xl={6}><Item style={{ textAlign: 'left', fontWeight: 600 }}>Reference/Load ID:<strong>{' '}{mapdata?.loadId || mapdata?.referenceId}</strong></Item></Grid>
              {/* <Grid item xs={12} sm={12} md={6} xl={6}><Item style={{textAlign:'left',fontWeight:600}}>Location:{location}</Item></Grid> */}
              <Grid item xs={12} sm={12} md={6} xl={6}><Item style={{ textAlign: 'left', fontWeight: 600 }}>Email:{mapdata?.email}</Item></Grid>
              <Grid item xs={12} sm={12} md={6} xl={6}><Item style={{ textAlign: 'left', fontWeight: 600 }}>Phone:{mapdata?.mobile}</Item></Grid>
            </Grid>
            <br />
            {mapdata?.originCity ? <Row><Col xs={12} sm={12} md={4} xl={4}><SideRow /></Col><Col xs={12} sm={12} md={8} xl={8}><MapChart /></Col></Row> : <Spinner />}
          </>}
      </div>}
      <React.Fragment>
        <Dialog
          fullWidth={true}
          maxWidth="md"
          open={coloumn || edit}
          onClose={handleClose}
          scrollable={true}
        >
          <DialogActions sx={{ height: '5vh' }} onClick={handleClose}>
            <HighlightOffIcon style={{ cursor: 'pointer', width: '5vw', height: '5vh', position: 'absolute', top: 10 }} onClick={handleClose} />
          </DialogActions>
          <DialogTitle className='add_title' sx={{ height: '8vh', textAlign: 'center' }}><p style={{ margin: 'auto' }}>Add New Load</p></DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <div className="containers">
                <h6 style={{ textAlign: 'left', fontSize: 18 }}>Shipping Details</h6>
                <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                  {/* <FormControl sx={{ m: 1, width: '25ch' }}>
      <TextField 
      size='small'
      error={ship == 0} label="Name" focused={ship?.length} variant="outlined" value={ship} onChange={(e)=>{handleChange(e);}} name='shippers_name' required 
          helperText={ship?.length ? '':'please choose name'}
          />
        </FormControl> */}
                  {!edit && <FormControl sx={{ m: 1, width: '41ch' }} variant="outlined">
                    <Autocomplete
                      disableClearable={true}
                      size='small'
                      open={close == 'origin'}
                      disablePortal
                      value={originCity}
                      inputValue={originCity}
                      onClose={() => setClose('')}
                      id="combo-box-demo"
                      getOptionSelected={(option, value) => option.city === value.city}
                      getOptionLabel={option => option.city}
                      options={cityList.slice(0, 300)}
                      //sx={{ width: 300 }}
                      renderInput={(params) => <TextField
                        size='small'
                        {...params} type='text' id="outlined-basic" label="Origin(City,State)"
                        error={originCity?.length == 0} variant="outlined" required value={originCity} name='originCity' onChange={handleChange} />}
                      renderOption={(props, option) => (
                        <li {...props} key={option?.zipCode} value={option.city} onClick={() => { setOriginCity(`${option.city},${option.state}`); setAddlocationorigin(option); setClose(''); }}>
                          <Grid container alignItems="center">
                            {/* <Grid item sx={{ display: 'flex', width: 44 }}>
                <LocationOnIcon sx={{ color: 'text.secondary' }} />
              </Grid> */}
                            {/* <Grid item sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>
                  <Box
                    // key={index}
                    component="span"
                    sx={{ fontWeight: option.city ? 'bold' : 'regular' }}
                  > */}
                            <span style={{ textAlign: 'left', position: 'relative' }}>{option.city}</span><span style={{ textAlign: 'right', position: 'relative', right: '-25px' }}>{option.state}</span>
                            {/* </Box>
                <Typography variant="body2" color="text.secondary">
                  {option.state},{option.zipCode},USA
                </Typography>
              </Grid> */}
                          </Grid>
                        </li>)}
                    />
                  </FormControl>}
                  {!edit && <FormControl sx={{ m: 1, width: '40ch' }} variant="outlined">
                    <Autocomplete
                      disableClearable={true}
                      size='small'
                      open={close == 'dest'}
                      disablePortal
                      value={destinationCity}
                      inputValue={destinationCity}
                      onClose={() => setClose('')}
                      id="combo-box-demo"
                      getOptionSelected={(option, value) => option.city === value.city}
                      getOptionLabel={option => option.city}
                      options={cityList.slice(0, 300)}
                      //sx={{ width: 300 }}
                      renderInput={(params) => <TextField
                        size='small'
                        {...params} type='text' id="outlined-basic" label="Dest(City,State)"
                        error={destinationCity?.length == 0} variant="outlined" required value={destinationCity} name='destinationCity' onChange={handleChange} />}
                      renderOption={(props, option) => (
                        <li {...props} key={option?.zipCode} value={option.city} onClick={() => { setDestinationCity(`${option.city},${option.state}`); setAddlocationdest(option); setClose(''); }}>
                          <Grid container alignItems="center">
                            {/* <Grid item sx={{ display: 'flex', width: 44 }}>
                <LocationOnIcon sx={{ color: 'text.secondary' }} />
              </Grid> */}
                            {/* <Grid item sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}> */}
                            {/* <Box
                    // key={index}
                    component="span"
                    sx={{ fontWeight: option.city ? 'bold' : 'regular' }}
                  > */}
                            <span style={{ textAlign: 'left', position: 'relative' }}>{option.city}</span><span style={{ textAlign: 'right', position: 'relative', right: '-25px' }}>{option.state}</span>
                            {/* </Box>
                <Typography variant="body2" color="text.secondary">
                  {option.state},{option.zipCode},USA
                </Typography> */}
                            {/* </Grid> */}
                          </Grid>
                        </li>)}
                    />
                  </FormControl>}
                  <FormControl fullWidth sx={{ m: 1, width: '20ch' }}>
                    <TextField size='small'
                      inputProps={{
                        min: formatDate(pastdate)
                      }}
                      error={earliestAvailability?.length == 0} focused id="outlined-basic" fullWidth={5} onFocus={onFocus} onBlur={onBlur} label="Earliest Pickup Dates" variant="outlined" type="date" name='earliestAvailability' value={earliestAvailability} onChange={(e) => { handleChange(e) }} required />
                  </FormControl>
                  <FormControl fullWidth sx={{ m: 1, width: '19.5ch' }}>
                    <TextField size='small'
                      inputProps={{
                        min: formatDate(pastdate)
                      }}
                      error={latestAvailability?.length == 0} focused id="outlined-basic" fullWidth={5} onFocus={onFocus} onBlur={onBlur} label="Latest Pickup Dates" variant="outlined" type="date" name='latestAvailability' value={latestAvailability} onChange={(e) => { handleChange(e) }} required />
                  </FormControl>
                  <FormControl fullWidth sx={{ m: 1, width: '18.5ch' }}>
                    <TextField
                      select
                      size="small"
                      id="outlined-basic" fullWidth={5} label="Earliest Pickup Time" variant="outlined" type="time" name='earlyDateTimeDest' value={earlyDateTimeDest} onChange={(e) => { handleChange(e) }}
                      SelectProps={{
                        MenuProps: {
                          PaperProps: {
                            style: {
                              maxHeight: 200,
                              width: 200,
                            },
                          },
                        },
                      }}
                    >
                      {generateTimeOptions().map((time) => (
                        <MenuItem key={time} value={time}>
                          {time}
                        </MenuItem>
                      ))}
                    </TextField>
                  </FormControl>
                  <FormControl fullWidth sx={{ m: 1, width: '19ch' }}>
                    <TextField
                      select
                      size="small"
                      id="outlined-basic" fullWidth={5} label="Latest Pickup Time" variant="outlined" type="time" name='lateDateTimeDest' value={lateDateTimeDest} onChange={(e) => { handleChange(e) }}
                      SelectProps={{
                        MenuProps: {
                          PaperProps: {
                            style: {
                              maxHeight: 200,
                              width: 200,
                            },
                          },
                        },
                      }}
                    >
                      {generateTimeOptions().map((time) => (
                        <MenuItem key={time} value={time}>
                          {time}
                        </MenuItem>
                      ))}
                    </TextField>
                  </FormControl>
                  {/* {!edit && <FormControl fullWidth sx={{ m: 1,width: '19ch' }}>
        <TextField 
        size='small'
         focused id="outlined-basic" fullWidth={5} onFocus={onFocus} onBlur={onBlur} label="Earliest Pickup Time" variant="outlined" type="time" name='earlyDateTimeDest' value={earlyDateTimeDest} onChange={(e)=>{handleChange(e)}} />
        </FormControl>}
        <FormControl fullWidth sx={{ m: 1,width: '19ch' }}>
        <TextField 
        size='small'
        focused id="outlined-basic"  fullWidth={5} onFocus={onFocus} onBlur={onBlur} label="Latest Pickup Time" variant="outlined" type="time" name='lateDateTimeDest' value={lateDateTimeDest} onChange={(e)=>{handleChange(e)}}/>
        </FormControl> */}
                  {/* <FormControl sx={{ m: 1, width: '25ch',position:'relative', top:13 }}>
            <PhoneInput
           inputStyle={{width:'150px',border:'none',borderBottom:'1px solid #555'}}
           containerStyle={{border:'none'}}
            required
            defaultCountry="us"
            type="phone"
            placeholder="Mobile Number"
            value={mobile}
            name='mobile'
            onChange={(e)=>setMobile(e)}
          />
          {mobile?.length <= 2 && <p style={{color:'red',fontSize:'10px',paddingTop:'5px'}}>Please Provide Mobile Number!</p>}
            </FormControl>
            <FormControl sx={{ m: 1, width: '25ch' }}>
              <TextField 
              size='small'
              id="outlined-basic" label="Email" variant="outlined" type="email"
            value={email}
           // required
            name='email'
            onChange={handleChange}/>
              {/* {email?.length <= 0 && <p style={{color:'#555',fontSize:'10px'}}>Please Provide Email!</p>}  */}
                  {/* </Box></FormControl> */}
                  {/* <FormControl sx={{ m: 1, width: '25ch' }}>
        <TextField 
        size='small'
        error={equipmentType?.length == 0} helperText={equipmentType?.length ? '':'please enter equipment type'} focused={equipmentType?.length ? true:false} label="Equipment Type" variant="outlined" type="text" name='equipmentType' value={equipmentType} onChange={(e)=>{handleChange(e);}} required />
        </FormControl> */}
                  <br />
                  <FormControl sx={{ m: 1, width: '100ch' }} xs={12} sm={12} md={6} xl={6}>
                    <FormLabel id="demo-row-radio-buttons-group-label" sx={{ textAlign: 'left' }}>Equipment Details</FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="addstatus"
                      onChange={handleChange}
                      value={fupartial}
                    >
                      <FormControlLabel value="FULL" control={<Radio />} label="Full" />
                      <FormControlLabel value="PARTIAL" control={<Radio />} label="Partial" />
                    </RadioGroup>
                  </FormControl>
                  <FormControl sx={{ m: 1, width: '41ch', marginTop: '22px' }}>
                    {/* <TextField 
              size='small'
              id="outlined-basic" label="Equipment Type" variant="outlined" type="text"
            value={equipmentType}
            required
            name='equipmentType'
            onChange={handleChange}
            error={equipmentType?.length == 0 && (ptts === 'Post_to_Truckerpath' || ptt === 'Post_to_Truckstop')}
            helperText={equipmentType?.length ? '':'Please Provide Equipment Type!'}
            /> */}
                    <Autocomplete
                      disableClearable={true}
                      size='small'
                      open={close == 'equipment'}
                      disablePortal
                      value={equipmentType}
                      inputValue={equipmentType}
                      id="combo-box-demo"
                      getOptionSelected={(option, value) => option.type === value.type}
                      getOptionLabel={option => option.type}
                      options={equipmentlist}
                      onClose={() => { setEquipmentlist(X); setClose(''); }}
                      //sx={{ width: 300 }}
                      renderInput={(params) => <TextField
                        size='small'
                        {...params} type='text' id="outlined-basic" label="Equipment Type"
                        error={equipmentType?.length == 0} variant="outlined" required onFocus={() => setClose('equipment')} value={equipmentType} name='equipmentType' onChange={handleChange} />}
                      renderOption={(props, option) => (
                        <li {...props} key={option} value={option.type} onClick={() => { setEquipmentObject(option);setEquipmentType(`${option.label},${option.type}`); checkDattype(option.DATType); setEquipmentTypeid(option.id); setClose(''); }}>
                          <Grid container alignItems="center">
                            {/* <Grid item sx={{ display: 'flex', width: 44 }}>
                <LocationOnIcon sx={{ color: 'text.secondary' }} />
              </Grid> */}
                            {/* <Grid item sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}> */}
                            <Box
                              // key={index}
                              component="span"
                              sx={{ fontWeight: option ? 'bold' : 'regular' }}
                            >
                              {option.label}
                            </Box>
                            {/* </Grid> */}
                          </Grid>
                        </li>)}
                    />
                  </FormControl>
                  {/* <FormControl sx={{ m: 1, width: '25ch' }}>
        <TextField 
        size='small'
        //error={fp?.length == 0&& dat == 'Post_to_DAT'} 
        helperText={fp?.length ? '':'please enter Type'} label="Full Partial" variant="outlined" type="text" name='load-size' value={fp} onChange={(e)=>{handleChange(e);}} required />
        </FormControl> */}
                  <FormControl sx={{ m: 1, width: '19ch', marginTop: '22px' }}>
                    <TextField
                      size='small'
                      error={length == 0} label="Length" variant="outlined" type="text" name='length' value={length} onChange={(e) => { handleChange(e); }} required={length?.length == 0 || length >= 200} />
                  </FormControl>
                  <FormControl sx={{ m: 1, width: '19ch', marginTop: '22px' }}>
                    <TextField
                      size='small'
                      //error={pounds == 0} 
                      label="Pounds" variant="outlined" type="text" name='pounds' value={pounds} onChange={(e) => { handleChange(e); }} required />
                  </FormControl>
                  {/* <FormControl sx={{ m: 1, width: '25ch' }}>
        <TextField 
        size='small'
        error={length == 0} helperText={length?.length ? '':'please enter length'} focused={length?.length ? true:false} label="Length" variant="outlined" type="text" name='length' value={length} onChange={(e)=>{handleChange(e);}} required />
        </FormControl> */}
                  {/* {!edit && <FormControl fullWidth sx={{ m: 1,width: '25ch' }}>
        <TextField size='small'
        error={startWhen?.length == 0} focused id="outlined-basic" helperText={startWhen?.length ? '':'Please provide a Pickup Date.'} fullWidth={5} onFocus={onFocus} onBlur={onBlur} label="Pickup Dates" variant="outlined" type="date" name='Start Dates' value={startWhen} onChange={(e)=>{handleChange(e)}} required />
        </FormControl>}
        {!edit && <FormControl fullWidth sx={{ m: 1,width: '25ch' }}>
        <TextField size='small'
        error={endWhen?.length == 0} focused id="outlined-basic" helperText={endWhen?.length ? '':'Please provide a Drop Off Date.'} fullWidth={5} onFocus={onFocus} onBlur={onBlur} label="dropOff Dates" variant="outlined" type="date" name='Dropoff Dates' value={endWhen} onChange={(e)=>{handleChange(e)}} required />
        </FormControl>} */}
                  {/* {ptt == 'Post_to_Truckstop' && <FormControl sx={{ m: 1, width: '25ch' }}>
        <TextField 
        inputProps={{style: {fontSize: 12}}}
        InputLabelProps={{style: {fontSize: 12}}}
        InputProps={{
          style: {
            height:'35px',
            padding: '0 14px',
          }
        }
      }
        error={earlyDateTimeDest?.length == 0} helperText={earlyDateTimeDest?.length ? '':'please enter Early DropOff'} id="standard-basic" label="Early DropOff Date Time" variant="outlined" type="datetime-local" focused value={earlyDateTimeDest} name='earlyDateTimeDest' onChange={(e)=>{handleChange(e)}} required />
        </FormControl>} */}
                  {/* {ptt == 'Post_to_Truckstop' &&
          <FormControl sx={{ m: 1,width:'25ch' }} variant="outlined">
          <TextField 
          inputProps={{style: {fontSize: 12}}}
          InputLabelProps={{style: {fontSize: 12}}}
          InputProps={{
            style: {
              height:'35px',
              padding: '0 14px',
            }
          }
        }
          error={lateDateTimeDest?.length == 0} label="Late DropOff Date Time" focused variant="outlined" required value={lateDateTimeDest} helperText={lateDateTimeDest?.length ? '':'Please your Late DropOff'} type="datetime-local" name='lateDateTimeDest' onChange={(e)=>{handleChange(e)}}/>
          </FormControl>
        } */}
                  {/* <FormControl fullWidth sx={{ m: 1,width: '15ch' }}>
        <TextField 
        size='small'
        error={hours?.length == 0} focused id="outlined-basic" helperText={hours?.length ? '':'provide a Pickup Hours.'} fullWidth={5} onFocus={onFocus} onBlur={onBlur} label="Pickup Hours" variant="outlined" type="time" name='Pick up Hours' value={hours} onChange={(e)=>{handleChange(e)}} required />
        </FormControl> */}
                  <Row>
                    <Col xs={12} md={5} style={{ textAlign: 'left' }}>
                      <FormControl sx={{ m: 1, width: '41ch' }} variant="filled">
                        <TextField
                          multiline rows={3} id="outlined-basic" label="Comments" variant="outlined" type="text" value={comment} onChange={(e) => { handleChange(e) }} name='comment' required />
                      </FormControl>
                    </Col>
                    <Col xs={12} md={7} style={{ textAlign: 'right', position: 'relative', right: '1%' }}>
                      <FormControl sx={{ m: 1, width: '19ch' }}>
                        <TextField
                          size='small'
                          //error={rate?.length == 0&& dat == 'Post_to_DAT'}
                          label="Rate" variant="outlined" type="text" name='rate' value={rate} onChange={(e) => { handleChange(e); }} required />
                      </FormControl>
                      <FormControl sx={{ m: 1, width: '19ch' }}>
                        <TextField
                          size='small'
                          label="Commodity" variant="outlined" type="text" name='commodity' value={commodity} onChange={(e) => { handleChange(e); }} required />
                      </FormControl>
                      <FormControl sx={{ m: 1, width: '40ch' }} variant="filled">
                        <TextField
                          size='small'
                          id="outlined-basic" label="Reference Numbers" variant="outlined" type="text" value={referenceNumbers} onChange={(e) => { handleChange(e) }} name='referenceNumbers' />
                      </FormControl>
                    </Col>
                  </Row>
                  {/* <FormControl sx={{ m: 1, width: '25ch' }}>
              <TextField 
              size='small'
              id="outlined-basic" label="Load Number" variant="outlined" type="text"
            value={loadNumber}
            required
            name='loadNumber'
            onChange={handleChange}
            error={loadNumber?.length == 0 && ptt === 'Post_to_Truckstop'}
            helperText={loadNumber?.length ? '':'Please Provide Load Number!'}
            />
            </FormControl>
            <FormControl sx={{ m: 1, width: '25ch' }}>
              <TextField 
              size='small'
              id="outlined-basic" label="Posted All In Rate" variant="outlined" type="text"
            value={postedAllInRate}
            required
            name='postedAllInRate'
            onChange={handleChange}
            error={postedAllInRate?.length == 0 && ptt === 'Post_to_Truckstop'}
            helperText={postedAllInRate?.length ? '':'Please Provide Posted All In Rate!'}
            />
            </FormControl>
            <FormControl sx={{ m: 1, width: '25ch' }}>
              <TextField 
              size='small'
              id="outlined-basic" label="Tender All In Rate" variant="outlined" type="text"
            value={tenderAllInRate}
            required
            name='tenderAllInRate'
            onChange={handleChange}
            error={tenderAllInRate?.length == 0 && ptt === 'Post_to_Truckstop'}
            helperText={tenderAllInRate?.length ? '':'Please Provide Tender All In Rate!'}
            />
            </FormControl> */}
                  {/* <FormControl sx={{ m: 1, width: '25ch' }}>
              <TextField 
              size='small'
              id="outlined-basic" label="Width" variant="outlined" type="text"
            value={width}
            required
            name='width'
            onChange={handleChange}
            error={width?.length == 0}
            helperText={width?.length ? '':'Please Provide width!'}
            />
            </FormControl>
            <FormControl sx={{ m: 1, width: '25ch' }}>
              <TextField 
              size='small'
              id="outlined-basic" label="Height" variant="outlined" type="text"
            value={height}
            required
            name='height'
            onChange={handleChange}
            error={height?.length == 0}
            helperText={height?.length ? '':'Please Provide height!'}
            />
            </FormControl> */}
                  {/* <FormControl sx={{ m: 1, width: '25ch' }}>
              <TextField 
              size='small'
              id="outlined-basic" label="Pallet Count" variant="outlined" type="text"
            value={palletCount}
            required
            name='palletCount'
            onChange={handleChange}
            error={palletCount?.length == 0 && ptt === 'Post_to_Truckstop'}
            helperText={palletCount?.length ? '':'Please Provide Pallet Count!'}
            />
            </FormControl>
            <FormControl sx={{ m: 1, width: '25ch' }}>
              <TextField 
              size='small'
              id="outlined-basic" label="Piece Count" variant="outlined" type="text"
            value={pieceCount}
            required
            name='pieceCount'
            onChange={handleChange}
            error={pieceCount?.length == 0 && ptt === 'Post_to_Truckstop'}
            helperText={pieceCount?.length ? '':'Please Provide Piece Count!'}
            />
            </FormControl>
            <FormControl sx={{ m: 1, width: '25ch' }}>
              <TextField 
              size='small'
              id="outlined-basic" label="Load Label" variant="outlined" type="text"
            value={loadLabel}
            required
            name='loadLabel'
            onChange={handleChange}
            //error={loadLabel?.length == 0 && ptt === 'Post_to_Truckstop'}
            helperText={loadLabel?.length ? '':'Please Provide Load Label!'}
            />
            </FormControl>
            <FormControl sx={{ m: 1, width: '25ch' }}>
              <TextField 
              size='small'
              id="outlined-basic" label="Tender Notes" variant="outlined" type="text"
            value={tenderNotes}
            required
            name='tenderNotes'
            onChange={handleChange}
            error={tenderNotes?.length == 0 && ptt === 'Post_to_Truckstop'}
            helperText={tenderNotes?.length ? '':'Please Provide Tender Notes!'}
            />
            </FormControl>
            <FormControl sx={{ m: 1, width: '25ch' }}>
              <TextField 
              size='small'
              id="outlined-basic" label="Load Reference Numbers" variant="outlined" type="text"
            value={loadReferenceNumbers}
            required
            name='loadReferenceNumbers'
            onChange={handleChange}
            error={loadReferenceNumbers?.length == 0 && ptt === 'Post_to_Truckstop'}
            helperText={loadReferenceNumbers?.length ? '':'Please Provide Load Reference Numbers!'}
            />
            </FormControl>
            <FormControl sx={{ m: 1, width: '25ch' }}>
              <TextField 
              size='small'
              id="outlined-basic" label="Cube" variant="outlined" type="text"
            value={cube}
            required
            name='cube'
            onChange={handleChange}
            //error={cube?.length == 0 && ptt === 'Post_to_Truckstop'}
            helperText={cube?.length ? '':'Please Provide Cube!'}
            />
            </FormControl>
            <FormControl sx={{ m: 1, width: '25ch' }}>
          <Autocomplete
          size='small'
          value={company_id}
          inputValue={company_id}
          disablePortal
          id="combo-box-demo"
          getOptionSelected={(option, value) => option?.name === value?.name}
          getOptionLabel={option => option?.name}
          onClose={()=>{fetchCompany()}}
          //open={so}
          // getOptionLabel={(option) => option?.name??''}
          options={company}
          //sx={{ width: 300 }}
          renderInput={(params) => <TextField 
          size='small'
          error={company_id?.length == 0 && ptts === 'Post_to_Truckerpath'} {...params} label="Company" focused={company_id} variant="outlined" value={company_id} onChange={(e)=>{handleChange(e)}} name='company' required 
          // renderOption={(props, option) => (<p  value={option.name}>{option.name},{option.address}<br/>,{option.address1},{option.address2},</p>)}
          helperText={company_id?.length ? '':'please choose company'}
          />}
          renderOption={(props, option) => (
            <li {...props} key={option?.userID} onClick={(e)=>{clickDatas(option,e)}}>
            <Grid container alignItems="center">
              <Grid item sx={{ display: 'flex', width: 44 }}>
                <LocationOnIcon sx={{ color: 'text.secondary' }} />
              </Grid>
              <Grid item sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>
                  <Box
                    // key={index}
                    component="span"
                    sx={{ fontWeight: option.name ? 'bold' : 'regular' }}
                  >
                    {option.name}
                  </Box>
                <Typography variant="body2" color="text.secondary">
                  {option.address},{option.city},USA
                </Typography>
              </Grid>
            </Grid>
          </li>)}
          />
        </FormControl>
          <FormControl sx={{ m: 1, width: '25ch' }}>
              <TextField 
              size='small'
              id="outlined-basic" label="External ID" variant="outlined" type="text"
            value={e_id}
            required
            name='externalId'
            onChange={handleChange}
            error={e_id?.length == 0 && ptts === 'Post_to_Truckerpath'}
            helperText={e_id?.length ? '':'Please Provide External ID!'}
            />
            </FormControl> */}
                  {/* <FormControl sx={{ m: 1, width: '25ch' }}>
              <TextField 
              size='small'
              id="outlined-basic" label="Load Size" variant="outlined" type="text"
            value={loadSize}
            required
            name='load_size'
            onChange={handleChange}
            error={loadSize?.length == 0 && ptt === 'Post_to_DAT'}
            helperText={loadSize?.length ? '':'Please Provide Load Size!'}
            />
            </FormControl> */}
                  {/* {ptt == 'Post_to_Truckstop' && <FormControl sx={{ m: 1, width: '25ch' }}>
              <TextField 
              size='small'
              id="outlined-basic" label="Shipment Width" variant="outlined" type="text"
            value={width}
            required
            name='width'
            onChange={handleChange}
            //error={width?.length == 0 && (ptt === 'Post_to_Truckstop' || ptts === 'Post_to_Truckerpath')}
            helperText={width?.length ? '':'Please Provide Shipment Width!'}
            />
            </FormControl>} */}
                  {/* {ptt == 'Post_to_Truckstop' && <FormControl sx={{ m: 1, width: '25ch' }}>
              <TextField 
              size='small'
              id="outlined-basic" label="Shipment Height" variant="outlined" type="text"
            value={height}
            required
            name='height'
            onChange={handleChange}
            //error={height?.length == 0 && (ptt === 'Post_to_Truckstop' || ptts === 'Post_to_Truckerpath')}
            helperText={height?.length ? '':'Please Provide shipment height!'}
            />
            </FormControl>} */}
                  {/* <FormControl sx={{ m: 1, width: '25ch' }}>
              <TextField 
              size='small'
              id="outlined-basic" label="Description" variant="outlined" type="text"
            value={comment}
            required
            name='comment'
            onChange={handleChange}
            // error={comment?.length == 0}
            helperText={comment?.length ? '':'Please Provide Description!'}
            />
            </FormControl> */}
                  {/* {ptt == 'Post_to_Truckstop' && <FormControl sx={{ m: 1, width: '25ch' }}>
              <TextField 
              size='small'
              id="outlined-basic" label="Shipment Weight" variant="outlined" type="text"
            value={weight}
            required
            name='weight'
            onChange={handleChange}
            //error={weight?.length == 0 && ( ptt === 'Post_to_Truckstop' || ptts === 'Post_to_Truckerpath')}
            helperText={weight?.length ? '':'Please Provide Weight!'}
            />
            </FormControl>} */}
                  {/* {ptt == 'Post_to_Truckstop' && <FormControl sx={{ m: 1, width: '25ch' }}>
              <TextField 
              size='small'
              id="outlined-basic" label="Price" variant="outlined" type="text"
            value={price}
            required
            name='price'
            onChange={handleChange}
            //error={price?.length == 0 && (ptt === 'Post_to_Truckstop' || ptts === 'Post_to_Truckerpath')}
            helperText={price?.length ? '':'Please Provide Price!'}
            />
            </FormControl>} */}
                  {/*<FormControl sx={{ m: 1, width: '25ch' }}>
              <TextField 
              size='small'
              id="outlined-basic" label="Tender Notes" variant="outlined" type="text"
            value={tenderNotes}
            required
            name='tenderNotes'
            onChange={handleChange}
            error={tenderNotes?.length == 0}
            helperText={tenderNotes?.length ? '':'Please Provide Tender Notes!'}
            />
            </FormControl>
            <FormControl sx={{ m: 1, width: '25ch' }}>
              <TextField 
              size='small'
              id="outlined-basic" label="Load Reference Numbers" variant="outlined" type="text"
            value={loadReferenceNumbers}
            required
            name='loadReferenceNumbers'
            onChange={handleChange}
            error={loadReferenceNumbers?.length == 0}
            helperText={loadReferenceNumbers?.length ? '':'Please Provide Load Reference Numbers!'}
            />
            </FormControl>
            <FormControl sx={{ m: 1, width: '25ch' }}>
              <TextField 
              size='small'
              id="outlined-basic" label="Cube" variant="outlined" type="text"
            value={cube}
            required
            name='cube'
            onChange={handleChange}
            error={cube?.length == 0}
            helperText={cube?.length ? '':'Please Provide Cube!'}
            />
            </FormControl> */}
                  {/* {ptt == 'Post_to_Truckstop' && <FormControl sx={{ m: 1, width: '25ch' }}>
              <TextField 
              size='small'
              id="outlined-basic" label="Shipment Length" variant="outlined" type="text"
            value={length}
            required
            name='length'
            onChange={handleChange}
            //error={length?.length == 0 && (ptt === 'Post_to_Truckstop' || ptts === 'Post_to_Truckerpath')}
            helperText={length?.length ? '':'Please Provide Length!'}
            />
            </FormControl>} */}
                  {/* <Box sx={{ width: '100%' }}>
      {formdata?.filter(x=>x?.type%2!=0).map((x,i)=>
      <Box key={x?.type} sx={{ display: 'flex', flexWrap: 'wrap' }}>
       <FormControl sx={{ m: 1, width: '25ch' }}>
        <TextField 
        size='small'
        error={x?.location?.locationName?.length == 0 && ptts === 'Post_to_Truckerpath'} helperText={x?.location?.locationName?.length ? '':'Please provide a Shipper Location Name'} id="outlined-basic" label="Shipper Location Name" variant="outlined" type="text" value={x?.location?.locationName} name='locationName' onChange={(e)=>{onChangeFields(e,formdata?.map(x=>x?.type)?.indexOf(x?.type))}} required />
        </FormControl>
        <FormControl sx={{ m: 1, width: '25ch' }}>
        <TextField 
        size='small'
        error={x?.location?.streetAddress1?.length == 0 && ptts === 'Post_to_Truckerpath'} helperText={x?.location?.streetAddress1?.length ? '':'Please provide a Street Address1'} id="outlined-basic" label="Shipper Street Address1" variant="outlined" type="text" value={x?.location?.streetAddress1} name='streetAddress1' onChange={(e)=>{onChangeFields(e,formdata?.map(x=>x?.type)?.indexOf(x?.type))}} required />
        </FormControl>
        <FormControl sx={{ m: 1, width: '25ch' }}>
        <TextField 
        size='small'
        error={x?.location?.streetAddress2?.length == 0 && ptts === 'Post_to_Truckerpath'} helperText={x?.location?.streetAddress2?.length ? '':'Please provide a Street Address2'} id="outlined-basic" label="Shipper Street Address2" variant="outlined" type="text" value={x?.location?.streetAddress2} name='streetAddress2' onChange={(e)=>{onChangeFields(e,formdata?.map(x=>x?.type)?.indexOf(x?.type))}} required />
        </FormControl>
        <FormControl sx={{ m: 1, width: '25ch' }}>
        <TextField 
        size='small'
        error={x?.location?.city?.length == 0 && ptts === 'Post_to_Truckerpath'} helperText={x?.location?.city?.length ? '':'Please provide a City'} id="outlined-basic" label="Shipper City" variant="outlined" type="text" value={x?.location?.city} name='city' onChange={(e)=>{onChangeFields(e,formdata?.map(x=>x?.type)?.indexOf(x?.type))}} required />
        </FormControl>
        <FormControl sx={{ m: 1, width: '25ch' }}>
        <TextField 
        size='small'
        error={x?.location?.state?.length == 0 && ptts === 'Post_to_Truckerpath'} helperText={x?.location?.state?.length ? '':'Please provide a state'} id="outlined-basic" label="Shipper state" variant="outlined" type="text" value={x?.location?.state} name='state' onChange={(e)=>{onChangeFields(e,formdata?.map(x=>x?.type)?.indexOf(x?.type))}} required />
        </FormControl>
        <FormControl sx={{ m: 1, width: '25ch' }}>
        <TextField 
        size='small'
        error={x?.location?.postalCode?.length == 0 && ptts === 'Post_to_Truckerpath'} helperText={x?.location?.postalCode?.length ? '':'Please provide a Postal Code'} id="outlined-basic" label="Shipper Postal Code" variant="outlined" type="text" focused={x?.location?.postalCode?.length ? true : false} value={x?.location?.postalCode} name='postalCode' onChange={(e)=>{onChangeFields(e,formdata?.map(x=>x?.type)?.indexOf(x?.type))}} required />
        </FormControl>
        <FormControl sx={{ m: 1, width: '25ch' }}>
        <TextField 
        size='small'
        error={x?.earlyDateTime?.length == 0 && ptts === 'Post_to_Truckerpath'} helperText={x?.earlyDateTime?.length ? '':'Please provide a Early Date Time'} id="outlined-basic" label="Shipper Early Date Time" variant="outlined" type="datetime-local" focused value={new Date(x?.earlyDateTime)} name='earlyDateTime' onChange={(e)=>{onChangeFields(e,formdata?.map(x=>x?.type)?.indexOf(x?.type))}} required />
        </FormControl>
        <FormControl sx={{ m: 1,width:'25ch' }} variant="outlined">
        <TextField 
        size='small'
        error={x?.lateDateTime?.length == 0 && ptts === 'Post_to_Truckerpath'} label="Shipper Late Date Time" focused variant="outlined" required value={x?.lateDateTime} helperText={x?.lateDateTime?.length ? '':'Please your Late Date Time'} type="datetime-local" name='lateDateTime' onChange={(e)=>{onChangeFields(e,formdata?.map(x=>x?.type)?.indexOf(x?.type));}}/>
        </FormControl>
        <FormControl fullWidth sx={{ m: 1,width: '25ch' }}>
        <TextField 
        size='small'
        error={x?.contactName?.length == 0 && ptts === 'Post_to_Truckerpath'} id="outlined-basic" helperText={x?.contactName?.length ? '':'Please provide a Contact Name.'} label="Shipper Contact Name" variant="outlined" type="text" name='contactName' value={x?.contactName} onChange={(e)=>{onChangeFields(e,formdata?.map(x=>x?.type)?.indexOf(x?.type))}} required />
        </FormControl>
        <FormControl fullWidth sx={{ m: 1,width: '25ch' }}>
        <TextField 
        size='small'
        error={x?.contactPhone?.length == 0 && ptts === 'Post_to_Truckerpath'} id="outlined-basic" helperText={x?.contactPhone?.length ? '':'provide a Contact Phone.'} label="Shipper Contact Phone" variant="outlined" type="text" name='contactPhone' value={x?.contactPhone} onChange={(e)=>{onChangeFields(e,formdata?.map(x=>x?.type)?.indexOf(x?.type))}} required />
        </FormControl>
        <FormControl sx={{ m: 1, width: '25ch' }} variant="filled">
        <TextField 
        size='small'
        helperText={x?.stopNotes?.length ? '':'Please provide a Stop Notes.'} id="outlined-basic"  label="Shipper Stop Notes" variant="outlined" type="text" value={x?.stopNotes} onChange={(e)=>{onChangeFields(e,formdata?.map(x=>x?.type)?.indexOf(x?.type))}} name='stopNotes' required />
        </FormControl>
        <FormControl sx={{ m: 1, width: '25ch' }} variant="filled">
        <TextField 
        size='small'
        helperText={x?.referenceNumbers?.length ? '':'Please provide a Reference Numbers.'} id="outlined-basic"  label="Shipper Reference Numbers" variant="outlined" type="text" value={x?.referenceNumbers} onChange={(e)=>{onChangeFields(e,formdata?.map(x=>x?.type)?.indexOf(x?.type))}} name='referenceNumbers' required />
        </FormControl>
        </Box>
      )
      }
    </Box>
      {formdata?.filter(x=>x?.type%2==0).map((x,i)=>
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }} index={i}>
        <FormControl sx={{ m: 1, width: '25ch' }}>
        <TextField 
        size='small'
        error={x?.location?.locationName?.length == 0 && ptts === 'Post_to_Truckerpath'} helperText={x?.location?.locationName?.length ? '':'Please provide a Location Name'} id="outlined-basic" label="Consignee Location Name" variant="outlined" type="text" value={x?.location?.locationName} name='locationName' onChange={(e)=>{onChangeFields(e,formdata?.map(x=>x?.type)?.indexOf(x?.type))}} required />
        </FormControl>
        <FormControl sx={{ m: 1, width: '25ch' }}>
        <TextField 
        size='small'
        error={x?.location?.streetAddress1?.length == 0 && ptts === 'Post_to_Truckerpath'} helperText={x?.location?.streetAddress1?.length ? '':'Please provide a Street Address1'} id="outlined-basic" label="Consignee Street Address1" variant="outlined" type="text" value={x?.location?.streetAddress1} name='streetAddress1' onChange={(e)=>{onChangeFields(e,formdata?.map(x=>x?.type)?.indexOf(x?.type))}} required />
        </FormControl>
        <FormControl sx={{ m: 1, width: '25ch' }}>
        <TextField 
        size='small'
        error={x?.location?.streetAddress2?.length == 0 && ptts === 'Post_to_Truckerpath'} helperText={x?.location?.streetAddress2?.length ? '':'Please provide a Street Address2'} id="outlined-basic" label="Consignee Street Address2" variant="outlined" type="text" value={x?.location?.streetAddress2} name='streetAddress2' onChange={(e)=>{onChangeFields(e,formdata?.map(x=>x?.type)?.indexOf(x?.type))}} required />
        </FormControl>
        <FormControl sx={{ m: 1, width: '25ch' }}>
        <TextField 
        size='small'
        error={x?.location?.city?.length == 0 && ptts === 'Post_to_Truckerpath'} helperText={x?.location?.city?.length ? '':'Please provide a City'} id="outlined-basic" label="Consignee City" variant="outlined" type="text" value={x?.location?.city} name='city' onChange={(e)=>{onChangeFields(e,formdata?.map(x=>x?.type)?.indexOf(x?.type))}} required />
        </FormControl>
        <FormControl sx={{ m: 1, width: '25ch' }}>
        <TextField 
        size='small'
        error={x?.location?.state?.length == 0 && ptts === 'Post_to_Truckerpath'} helperText={x?.location?.state?.length ? '':'Please provide a state'} id="outlined-basic" label="Consignee state" variant="outlined" type="text" value={x?.location?.state} name='state' onChange={(e)=>{onChangeFields(e,formdata?.map(x=>x?.type)?.indexOf(x?.type))}} required />
        </FormControl>
        <FormControl sx={{ m: 1, width: '25ch' }}>
        <TextField 
        size='small'
        error={x?.location?.postalCode?.length == 0 && ptts === 'Post_to_Truckerpath'} helperText={x?.location?.postalCode?.length ? '':'Please provide a Postal Code'} id="outlined-basic" label="Consignee Postal Code" variant="outlined" type="text" value={x?.location?.postalCode} name='postalCode' onChange={(e)=>{onChangeFields(e,formdata?.map(x=>x?.type)?.indexOf(x?.type))}} required />
        </FormControl>
        <FormControl sx={{ m: 1, width: '25ch' }}>
        <TextField 
        size='small'
        error={x?.earlyDateTime?.length == 0 && ptts === 'Post_to_Truckerpath'} helperText={x?.earlyDateTime?.length ? '':'Please provide a Early Date Time'} id="outlined-basic" label="Consignee Early Date Time" variant="outlined" type="datetime-local" focused value={new Date(x?.earlyDateTime)} name='earlyDateTime' onChange={(e)=>{onChangeFields(e,formdata?.map(x=>x?.type)?.indexOf(x?.type))}} required />
        </FormControl>
        <FormControl sx={{ m: 1,width:'25ch' }} variant="outlined">
        <TextField 
        size='small'
        error={x?.lateDateTime?.length == 0 && ptts === 'Post_to_Truckerpath'} label="Consignee Late Date Time" focused variant="outlined" required value={new Date(x?.lateDateTime)} helperText={x?.lateDateTime?.length ? '':'Please your Late Date Time'} name='lateDateTime' type="datetime-local" onChange={(e)=>{onChangeFields(e,formdata?.map(x=>x?.type)?.indexOf(x?.type));}} />
        </FormControl> 
        <FormControl fullWidth sx={{ m: 1,width: '25ch' }}>
        <TextField 
        size='small'
        error={x?.contactName?.length == 0 && ptts === 'Post_to_Truckerpath'} id="outlined-basic" helperText={x?.contactName?.length ? '':'Please provide a Contact Name.'} label="Consignee Contact Name" variant="outlined" type="text" name='contactName' value={x?.contactName} onChange={(e)=>{onChangeFields(e,formdata?.map(x=>x?.type)?.indexOf(x?.type))}} required />
        </FormControl>
        <FormControl fullWidth sx={{ m: 1,width: '25ch' }}>
        <TextField 
        size='small'
        error={x?.contactPhone?.length == 0 && ptts === 'Post_to_Truckerpath'} id="outlined-basic" helperText={x?.contactPhone?.length ? '':'provide a Contact Phone.'} label="Consignee Contact Phone" variant="outlined" type="text" name='contactPhone' value={x?.contactPhone} onChange={(e)=>{onChangeFields(e,formdata?.map(x=>x?.type)?.indexOf(x?.type))}} required />
        </FormControl>
        <FormControl sx={{ m: 1, width: '25ch' }} variant="filled">
        <TextField 
        size='small'
        helperText={x?.stopNotes?.length ? '':'Please provide a Stop Notes.'} id="outlined-basic"  label="Consignee Stop Notes" variant="outlined" type="text" value={x?.stopNotes} onChange={(e)=>{onChangeFields(e,formdata?.map(x=>x?.type)?.indexOf(x?.type))}} name='stopNotes' required />
        </FormControl>
        <FormControl sx={{ m: 1, width: '25ch' }} variant="filled">
        <TextField 
        size='small'
        helperText={x?.referenceNumbers?.length ? '':'Please provide a Reference Numbers.'} id="outlined-basic"  label="Consignee Reference Numbers" variant="outlined" type="text" value={x?.referenceNumbers} onChange={(e)=>{onChangeFields(e,formdata?.map(x=>x?.type)?.indexOf(x?.type))}} name='referenceNumbers' required />
        </FormControl>
        </Box>
        )}*/}
                </Box>
                <Button className='button_add1' type='submit'>{loads ? <Spinner animation="border" role="status"></Spinner> : edit ? 'Update' : 'Generate'}</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </React.Fragment>
      <React.Fragment>
        <Dialog
          open={alerts}
          onClose={handleCloseAlert}
          PaperProps={{
            component: 'form',
            onSubmit: (event) => {
              event.preventDefault();
              deleteLoad();
              handleCloseAlert();
            },
          }}
        >
          <DialogTitle>Delete</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are You Sure?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAlert}>Cancel</Button>
            <Button type="submit">Delete</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
      <React.Fragment>
        <Dialog
          open={shippers || consignee}
          onClose={handleClosetype}
          PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
        >
          <DialogActions sx={{ height: '2vh' }}>
            <HighlightOffIcon style={{ cursor: 'pointer', width: '5vw', height: '5vh', position: 'absolute', top: 15 }} onClick={handleClosetype} />
          </DialogActions>
          <DialogContent>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={values} onChange={handleChangeShippers} aria-label="basic tabs example">
                <Tab onClick={() => setValues(0)} label={shippers ? `shippers` : `consignee`} {...a11yProps(0)} />
                <Tab onClick={() => setValues(1)} label={`Notes`} {...a11yProps(1)} />
              </Tabs>
              <CustomTabPanel value={values} index={0}>
                <Box>
                  <FormControl sx={{ m: 1, width: '25ch' }} xs={12} sm={12} md={6} xl={6}>
                    <TextField
                      required
                      error={addname?.length == 0}
                      id="standard-required"
                      name='add_name'
                      value={addname}
                      onChange={handleChange}
                      helperText={addname?.length > 0 ? '' : 'please enter name'}
                      label={shippers ? "Shipper's name" : "Consignee's name"}
                      variant="outlined"
                    />
                  </FormControl>
                  <FormControl sx={{ m: 1, width: '25ch' }} xs={12} sm={12} md={6} xl={6}>
                    <TextField
                      id="standard-basic"
                      name='add_address'
                      label="Address"
                      variant="outlined"
                      required
                      error={addaddress?.length == 0}
                      helperText={addaddress?.length > 0 ? '' : 'please enter address'}
                      value={addaddress}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormControl sx={{ m: 1, width: '25ch' }} xs={12} sm={12} md={6} xl={6}>
                    <TextField
                      id="standard-basic"
                      label="Address 2"
                      variant="outlined"
                      name='add_address1'
                      value={addaddress1}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormControl sx={{ m: 1, width: '25ch' }} xs={12} sm={12} md={6} xl={6}>
                    <TextField
                      id="standard-basic"
                      label="Address 3"
                      name='add_address2'
                      value={addaddress2}
                      onChange={handleChange}
                      variant="outlined"
                    />
                  </FormControl>
                  <FormControl sx={{ m: 1, width: '25ch' }} xs={12} sm={12} md={6} xl={6}>
                    <Autocomplete
                      disablePortal
                      value={addcity}
                      inputValue={addcity}
                      id="combo-box-demo"
                      getOptionSelected={(option, value) => option.city === value.city}
                      getOptionLabel={option => option.city}
                      options={cityList.slice(0, 300)}
                      //sx={{ width: 300 }}
                      renderInput={(params) => <TextField {...params} type='text' id="standard-basic" label="City"
                        error={addcity?.length == 0} variant="outlined" required value={addcity} helperText={addcity?.length > 0 ? '' : 'please enter city'} name='add_city' onChange={handleChange} />}
                      renderOption={(props, option) => (
                        <li {...props} key={option?.zipCode} value={option.city} onClick={() => { setAddcity(option.city); setAddlocationdata(option); }}>
                          <Grid container alignItems="center">
                            <Grid item sx={{ display: 'flex', width: 44 }}>
                              <LocationOnIcon sx={{ color: 'text.secondary' }} />
                            </Grid>
                            <Grid item sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>
                              <Box
                                // key={index}
                                component="span"
                                sx={{ fontWeight: option.city ? 'bold' : 'regular' }}
                              >
                                {option.city}
                              </Box>
                              <Typography variant="body2" color="text.secondary">
                                {option.state},{option.zipCode},USA
                              </Typography>
                            </Grid>
                          </Grid>
                        </li>)}
                    />
                  </FormControl>
                  <FormControl variant="outlined" sx={{ m: 1, width: '25ch' }} xs={12} sm={12} md={6} xl={6}>
                    <InputLabel id="demo-simple-select-standard-label">State</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select-standard"
                      label="State" variant="outlined" MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }} onFocus={() => { if (cityList.length <= 0) setCityList(USA) }} required value={addlocationdata?.state?.length ? addlocationdata?.state : addstate} name='add_state' onChange={handleChange}
                    >
                      {addlocationdata?.length && <MenuItem value={addlocationdata?.state}>{addlocationdata?.state}</MenuItem>}
                      {!addlocationdata?.length && cityList.slice(0, 50).map(r => <MenuItem value={r?.state}>{r?.state}</MenuItem>)}
                    </Select>
                  </FormControl>
                  <FormControl sx={{ m: 1, width: '25ch' }} xs={12} sm={12} md={6} xl={6}>
                    <TextField
                      id="standard-basic"
                      label="Country"
                      name='add_country'
                      value={addcountry}
                      variant="outlined"
                      onChange={handleChange}
                      helperText={addcountry?.length > 0 ? '' : 'please enter country'}
                      disabled
                    />
                  </FormControl>
                  <FormControl sx={{ m: 1, width: '25ch' }} xs={12} sm={12} md={6} xl={6}>
                    <TextField
                      id="standard-search"
                      label="Contact Email"
                      variant="outlined"
                      type='email'
                      name='add_cemail'
                      value={addcemail}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormControl sx={{ m: 1, width: '25ch' }} xs={12} sm={12} md={6} xl={6}>
                    <TextField
                      id="standard-helperText"
                      label="Contact Name"
                      name='add_cname'
                      value={addcname}
                      onChange={handleChange}
                      variant="outlined"
                    />
                  </FormControl>
                  <FormControl sx={{ m: 1, width: '25ch', position: 'relative', top: 13 }} xs={12} sm={12} md={6} xl={6}>
                    <PhoneInput
                      inputStyle={{ width: '150px', border: 'none', borderBottom: '1px solid #555' }}
                      containerStyle={{ border: 'none' }}
                      required
                      defaultCountry="us"
                      type="phone"
                      placeholder="Telephone"
                      value={addmobile}
                      name='add_mobile'
                      onChange={(e) => setAddmobile(e)}
                    />
                  </FormControl>
                  <FormControl sx={{ m: 1, width: '25ch' }} xs={12} sm={12} md={6} xl={6}>
                    <FormControlLabel control={<Checkbox value='yes' onChange={handleChange} name='appointment' checked={appointment === 'yes' ? true : false} />} label="Recieving hours" />
                  </FormControl>
                  {appointment === 'yes' && <FormControl sx={{ m: 1, width: '25ch' }} xs={12} sm={12} md={6} xl={6}>
                    <TextField
                      focused
                      id="standard-basic"
                      label={shippers ? "Shipping Hours" : "Recievind Hours"}
                      variant="outlined"
                      name='hours'
                      type='text'
                      value={hours}
                      onChange={handleChange}
                      required
                      helperText={hours?.length > 0 ? '' : 'please enter hours'}
                      error={hours?.length == 0}
                    />
                  </FormControl>}
                  <FormControl sx={{ m: 1, width: '25ch' }} xs={12} sm={12} md={6} xl={6}>
                    <FormControlLabel control={<Checkbox value={shippers ? 'consignee' : 'shippers'} onChange={handleChange} name='types' checked={types != '' ? true : false} />} label={shippers ? "Add as Consignee" : "Add as Shippers"} />
                  </FormControl>
                  <FormControl sx={{ m: 1, width: '22ch' }} xs={12} sm={12} md={6} xl={6}>
                    <FormLabel id="demo-row-radio-buttons-group-label">Status</FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      onChange={handleChange}
                      value={addstatus}
                    >
                      <FormControlLabel value="active" control={<Radio />} label="Active" />
                      <FormControlLabel value="inactive" control={<Radio />} label="Inactive" />
                    </RadioGroup>
                  </FormControl><br />
                  <Button type='submit' style={{ backgroundColor: '#313b4c' }} onClick={() => { addTypeOfuser(); }}>{loads ? 'loading' : 'submit'}</Button>
                </Box>
              </CustomTabPanel>
              <CustomTabPanel value={values} index={1}>
                <Box>
                  <FormControl sx={{ m: 1, width: '25ch' }} xs={12} sm={12} md={12} xl={12}>
                    <TextField
                      id="standard-multiline-static"
                      label={shippers ? "Shipping Notes" : "Consignee Notes"}
                      multiline
                      rows={8}
                      variant="outlined"
                      name='add_notes'
                      value={add_notes}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormControl sx={{ m: 1, width: '35ch' }} xs={12} sm={12} md={12} xl={12}>
                    <TextField
                      id="standard-multiline-static"
                      label="Internal Notes"
                      multiline
                      rows={8}
                      variant="outlined"
                      name='add_notes1'
                      value={add_notes1}
                      onChange={handleChange}
                    />
                  </FormControl>
                </Box>
              </CustomTabPanel>
            </Box>
          </DialogContent>
        </Dialog>
      </React.Fragment>
      {/* <React.Fragment>
        <Dialog
          open={dat_open}
          onClose={handleCloseToken}
          PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
        >
          <DialogActions sx={{ height: '2vh' }}>
            <HighlightOffIcon style={{ cursor: 'pointer', width: '5vw', height: '5vh', position: 'absolute', top: 15 }} onClick={handleCloseToken} />
          </DialogActions>
          <DialogContent>
            <Box sx={{ borderBottom: 1, borderColor: 'divider',margin:'5%' }}>
            <form onSubmit={submitToken}>
            <FormControl sx={{ m: 1, width: '50ch' }} xs={12} sm={12} md={12} xl={12}>
                    <TextField
                      id="standard-multiline-static"
                      label="DAT Token"
                      variant="outlined"
                      name='token'
                      value={dat_token}
                      onChange={(e)=>setDat_token(e.target.value)}
                      required
                    />
            </FormControl>
            <FormControl sx={{ m: 1, width: '50ch' }} xs={12} sm={12} md={12} xl={12}>
                    <TextField
                      id="standard-multiline-static"
                      label="Direct Freight Token"
                      variant="outlined"
                      name='token'
                      value={direct_token}
                      onChange={(e)=>setDirect_token(e.target.value)}
                      required
                    />
            </FormControl>
            <FormControl sx={{ m: 1, width: '50ch' }} xs={12} sm={12} md={12} xl={12}>
                    <TextField
                      id="standard-multiline-static"
                      label="TRUCKSTOP Token"
                      variant="outlined"
                      name='token'
                      value={truckstop_token}
                      onChange={(e)=>setTruckstop_token(e.target.value)}
                      required
                    />
            </FormControl>
            <FormControl sx={{ m: 1, width: '50ch' }} xs={12} sm={12} md={12} xl={12}>
                    <TextField
                      id="standard-multiline-static"
                      label="Truckerpath Token"
                      variant="outlined"
                      name='token'
                      value={trucker_token}
                      onChange={(e)=>setTrucker_token(e.target.value)}
                      required
                    />
            </FormControl>
            <p>If you dont have token, generate in settings page</p>
            <Button type='submit'>Show Loads</Button>
            </form>
            </Box>
          </DialogContent>
        </Dialog>
      </React.Fragment> */}
    </>
  )
}

export default CombinedTable
