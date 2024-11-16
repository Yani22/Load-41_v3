import AddBoxSharpIcon from '@mui/icons-material/AddBoxSharp';
import CancelPresentationRoundedIcon from '@mui/icons-material/CancelPresentationRounded';
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
import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";

import Draggable from 'react-draggable';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { v4 as uuidv4 } from 'uuid';
import { USA } from '../Json/Cities';
import { Cell, DocId, Maps, deleteData, mapData, page_count } from '../Reducers/userReducer';
import { supabase } from '../firebase';
import MapChart from "./Map";
import { SideRow } from "./SideRow";
import ColumnData from './Table';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
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
  { id: 43, type: 'V', label: 'Van' },
  { id: 31, type: 'R', label: 'Reefer' },
  { id: 12, type: 'F', label: 'Flatbed' },
  { id: 20, type: 'HS', label: 'Hot Shot' },
  { id: 3, type: 'AUTO', label: 'Auto Carrier' },
  { id: 2, type: 'ANIM', label: 'Animal Carrier' },
  { id: 5, type: 'BELT', label: 'Conveyor Belt' },
  { id: 6, type: 'BOAT', label: 'Boat Hauling Trailer' },
  { id: 7, type: 'CH', label: 'Convertible Hopper' },
  { id: 8, type: 'CONT', label: 'Container Trailer' },
  { id: 37, type: 'SD', label: 'Step Deck' },
  { id: 9, type: 'DD', label: 'Double Drop' },
  { id: 10, type: 'DUMP', label: 'Dump Trucks' },
  { id: 11, type: 'ENDP', label: 'End Dump' },
  { id: 26, type: 'LIVE', label: 'Live Bottom Trailer' },
  { id: 28, type: 'MBHM', label: 'Mobile Home' },
  { id: 29, type: 'PNEU', label: 'Pneumatic' },
  { id: 34, type: 'RINT', label: 'Refrigerated Intermodal' },
  { id: 35, type: 'ROLL', label: 'Roll Top Conestoga' },
  { id: 14, type: 'FINT', label: 'Flatbed Intermodal' },
  { id: 15, type: 'FO', label: 'Flatbed Over-Dimension Loads' },
  { id: 16, type: 'FSD', label: 'Flatbed or Step Deck' },
  { id: 17, type: 'FVR', label: 'Flatbed, Van or Reefer' },
  { id: 18, type: 'FWS', label: 'Flatbed With Sides' },
  { id: 19, type: 'HOPP', label: 'Hopper Bottom' },
  { id: 21, type: 'HTU', label: 'Haul and Tow Unit' },
  { id: 22, type: 'LAF', label: 'Landoll Flatbed' },
  { id: 33, type: 'RGNE', label: 'RGN Extendable' },
  { id: 41, type: 'SV', label: 'Straight Van' },
  { id: 23, type: 'LB', label: 'Lowboy' },
  { id: 48, type: 'VF', label: 'Flatbed or Van' },
  { id: 49, type: 'VINT', label: 'Van Intermodal' },
  { id: 50, type: 'VIV', label: 'Vented Insulated Van' },
  { id: 51, type: 'VLG', label: 'Van with Liftgate' },
  { id: 52, type: 'VM', label: 'Moving Van' },
  { id: 53, type: 'VR', label: 'Van or Reefer' },
  { id: 54, type: 'VV', label: 'Vented Van' },
  { id: 55, type: 'WALK', label: 'Walking Floor' },
  { id: 56, type: 'VVR', label: 'Vented Van or Reefer' },
  { id: 57, type: 'VIVR', label: 'Vented Insulated Van or Reefer' },
  { id: 68, type: 'RVF', label: 'Flatbed, Van or Reefer' },
  { id: 69, type: 'RFV', label: 'Flatbed, Van or Reefer' },
  { id: 44, type: 'V-OT', label: 'Open Top Van' },
  { id: 45, type: 'VB', label: 'Blanket Wrap Van' },
  { id: 58, type: 'VA', label: 'Van - Air-Ride' },
  { id: 59, type: 'FA', label: 'FlatBed - Air-Ride' },
  { id: 60, type: 'FV', label: 'Van or Flatbed' },
  { id: 70, type: "RV", label: 'Van or Reefer' },
  { id: 71, type: "SPV", label: 'Cargo/Small/Sprinter' },
  { id: 72, type: "SDC", label: 'Step Deck Conestoga' },
  { id: 73, type: "SDE", label: 'Step Deck Extendable' },
  { id: 74, type: "DA", label: 'Drive Away' },
  { id: 75, type: 'DDE', label: 'Double Drop Extendable' },
  { id: 76, type: 'VRF', label: 'Flatbed, Van or Reefer' },
  { id: 77, type: 'BEAM', label: 'Beam' },
  { id: 78, type: 'CONG', label: 'Conestoga	Flat' },
  { id: 79, type: 'BDMP', label: 'Belly Dump' },
  { id: 61, type: 'FRV', label: 'Flatbed, Van or Reefer' },
  { id: 62, type: 'FSDV', label: 'Flatbed, Step Deck or Van' },
  { id: 63, type: 'FVVR', label: 'Flatbed, Vented Van or Reefer' },
  { id: 64, type: 'VRDD', label: 'Van, Reefer or Double Drop' },
  { id: 65, type: 'FVV', label: 'Flatbed or Vented Van' },
  { id: 66, type: 'SDRG', label: 'Step Deck or RGN' },
  { id: 67, type: 'VFR', label: 'Flatbed, Van or Reefer Van' },
  { id: 46, type: 'CV', label: 'Curtain Van' },
  { id: 25, type: 'LDOT', label: 'Load-Out' },
  { id: 1, type: '2F', label: 'Flatbed Doubles' },
  { id: 27, type: 'MAXI', label: 'Maxi or Double Flat Trailers' },
  { id: 32, type: 'RGN', label: 'Removable Goose Neck' },
  { id: 36, type: 'RPD', label: 'Reefer with Plant Decking' },
  { id: 47, type: 'VCAR', label: 'Cargo Vans (1 Ton capacity)' },
  { id: 24, type: 'LBO', label: 'Lowboy Over-Dimension Loads' },
  { id: 30, type: 'PO', label: 'Power Only' },
  { id: 4, type: 'B-TR', label: 'B-Train/Supertrain' },
  { id: 13, type: 'FEXT', label: 'Stretch Trailers or Extendable Flatbed' },
  { id: 38, type: 'SDL', label: 'Step Deck with Loading Ramps' },
  { id: 39, type: 'SDO', label: 'Step Deck Over-Dimension Loads' },
  { id: 40, type: 'SPEC', label: 'Unspecified Specialized Trailers' },
  { id: 42, type: 'TANK', label: 'Tanker' }
]
export const ViewTruckstop = () => {
  const [note, setNote] = React.useState('')
  const [loadNumber, setLoadNumber] = React.useState('')
  const [postedAllInRate, setPostedAllInRate] = React.useState(1)
  const [tenderAllInRate, setTenderAllInRate] = React.useState(1)
  const [width, setWidth] = React.useState('')
  const [weight, setWeight] = React.useState('')
  const [height, setHeight] = React.useState('')
  const [palletCount, setPalletCount] = React.useState('')
  const [pieceCount, setPieceCount] = React.useState('')
  const [loadLabel, setLoadLabel] = React.useState('')
  const [tenderNotes, setTenderNotes] = React.useState('')
  const [cube, setCube] = React.useState('')
  const [loadReferenceNumbers, setLoadReferenceNumbers] = React.useState('12345')
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
  const load = useSelector((state) => state?.user?.truckstop)
  const page = useSelector((state) => state?.user?.page)
  const map = useSelector((state) => state?.user?.maps)
  const mapdata = useSelector((state) => state?.user?.mapData)
  const [cell, setCell] = React.useState(load)
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
  const [locationNameOrigin, setLocationNameOrigin] = React.useState('')
  const [earlyDateTimeDest, setEarlyDateTimeDest] = React.useState('')
  const [earlyDateTimeOrigin, setEarlyDateTimeOrigin] = React.useState('')
  const [lateDateTimeDest, setLateDateTimeDest] = React.useState('')
  const [lateDateTimeOrigin, setLateDateTimeOrigin] = React.useState('')
  const [locationNameDest, setLocationNameDest] = React.useState('')
  const [streetAddress1Origin, setStreetAddress1Origin] = React.useState('')
  const [streetAddress1Dest, setStreetAddress1Dest] = React.useState('')
  const [streetAddress2Origin, setStreetAddress2Origin] = React.useState('')
  const [streetAddress2Dest, setStreetAddress2Dest] = React.useState('')
  const [postalCodeOrigin, setPostalCodeOrigin] = React.useState('')
  const [postalCodeDest, setPostalCodeDest] = React.useState('')
  const [referenceNumbersOrigin, setRefreshnumbersOrigin] = React.useState('')
  const [referenceNumbersDest, setReferenceNumbersDest] = React.useState('')
  const [contactNameOrigin, setContactNameOrigin] = React.useState('')
  const [contactPhoneOrigin, setContactPhoneOrigin] = React.useState('')
  const [stopNotesOrigin, setStopNotesOrigin] = React.useState('')
  const [contactNameDest, setContactNameDest] = React.useState('')
  const [contactPhoneDest, setContactPhoneDest] = React.useState('')
  const [stopNotesDest, setStopNotesDest] = React.useState('')
  const [equipmentTypeid, setEquipmentTypeid] = React.useState(null)
  const [addlocationdest, setAddlocationdest] = React.useState([])
  const [addlocationorigin, setAddlocationorigin] = React.useState([])
  const [u_id, setU_id] = React.useState('')
  const [equipmentlist, setEquipmentlist] = React.useState(X)
  const [fupartial, setFupartial] = React.useState('FULL')
  const [referenceNumbers, setReferenceNumbers] = React.useState('')
  const [close, setClose] = React.useState('')
  const [pounds, setPounds] = React.useState('')
  const [fp, setFp] = React.useState('')
  const [rate, setRate] = React.useState(0)
  const [ptt, setPtt] = React.useState('Post_to_Truckstop')//Post_to_Truckstop
  const [ptts, setPtts] = React.useState('Post_to_Truckerpath')//Post_to_Truckerpath
  const [dat, setDat] = React.useState('Post_to_DAT')
  const [commodity, setCommodity] = React.useState('FAK')
  const [startWhen, setStartWhen] = React.useState('')
  const [endWhen, setEndWhen] = React.useState('')
  const deletedata = useSelector((state) => state?.user?.deleteData)
  const pastdate = new Date()
  const [trucks_open,setTrucks_open] = React.useState(!localStorage.getItem('trucks_token'))
  const [truckstop_token,setTruckstop_token] = React.useState('')
  const [formdata, setFormdata] = React.useState([
    {
      type: 1,
      sequence: 1,
      earlyDateTime: earlyDateTimeOrigin,
      lateDateTime: lateDateTimeOrigin,
      location: {
        locationName: locationNameOrigin,
        city: originCity,
        state: originStateProv,
        streetAddress1: streetAddress1Origin,
        streetAddress2: streetAddress2Origin,
        countryCode: "USA",
        postalCode: postalCodeOrigin
      },
      contactName: contactNameOrigin,
      contactPhone: contactPhoneOrigin,
      stopNotes: stopNotesOrigin,
      referenceNumbers: [referenceNumbersOrigin]
    },
    {
      type: 2,
      sequence: 1,
      earlyDateTime: earlyDateTimeDest,
      lateDateTime: lateDateTimeDest,
      location: {
        locationName: locationNameDest,
        city: originCity,
        state: originStateProv,
        streetAddress1: streetAddress1Dest,
        streetAddress2: streetAddress2Dest,
        countryCode: "USA",
        postalCode: postalCodeDest
      },
      contactName: contactNameDest,
      contactPhone: contactPhoneDest,
      stopNotes: stopNotesDest,
      referenceNumbers: [referenceNumbersDest]
    }
  ])
  const U = {
    type: formdata?.filter(x => x.type % 2 != 0)[formdata?.filter(x => x.type % 2 != 0)?.length - 1]?.type + 2,
    sequence: 1,
    earlyDateTime: '',
    lateDateTime: '',
    location: {
      locationName: '',
      city: '',
      state: '',
      streetAddress1: '',
      streetAddress2: '',
      countryCode: "USA",
      postalCode: ''
    },
    contactName: '',
    contactPhone: '',
    stopNotes: '',
    referenceNumbers: ''
  }
  const U1 = {
    type: formdata?.filter(x => x.type % 2 == 0)[formdata?.filter(x => x.type % 2 == 0)?.length - 1]?.type + 2,
    sequence: 1,
    earlyDateTime: '',
    lateDateTime: '',
    location: {
      locationName: '',
      city: '',
      state: '',
      streetAddress1: '',
      streetAddress2: '',
      countryCode: "USA",
      postalCode: ''
    },
    contactName: '',
    contactPhone: '',
    stopNotes: '',
    referenceNumbers: ''
  }

  const onChangeFields = (e, j) => {
    const items = [...formdata];
    const y = items.map((t, i) => {
      
      if (e.target?.name == 'earlyDateTime') {
        if (i == j) {
          return { ...t, earlyDateTime: new Date(e.target.value).toISOString() }
        }
        return t
      }
      if (e.target?.name == 'lateDateTime') {
        if (i == j) {
          return { ...t, lateDateTime: new Date(e.target.value).toISOString() }
        }
        return t
      }
      if (e.target?.name == 'locationName') {
        if (i == j) {
          return { ...t, location: { ...t.location, locationName: e.target.value } }
        }
        return t
      }
      if (e.target?.name == 'city') {
        if (i == j) {
          return { ...t, location: { ...t.location, city: e.target.value } }
        }
        return t
      }
      if (e.target?.name == 'state') {
        if (i == j) {
          return { ...t, location: { ...t.location, state: e.target.value } }
        }
        return t
      }
      if (e.target?.name == 'contactName') {
        if (i == j) {
          return { ...t, contactName: e.target.value }
        }
        return t
      }
      if (e.target?.name == 'postalCode') {
        if (i == j) {
          return { ...t, location: { ...t.location, postalCode: e.target.value } }
        }
        return t
      }
      if (e.target?.name == 'contactPhone') {
        if (i == j) {
          return { ...t, contactPhone: e.target.value }
        }
        return t
      }
      if (e.target?.name == 'referenceNumbers') {
        if (i == j) {
          return { ...t, referenceNumbers: [e.target.value] }
        }
        return t
      }
      if (e.target?.name == 'streetAddress1') {
        if (i == j) {
          return { ...t, location: { ...t.location, streetAddress1: e.target.value } }
        }
        return t
      }
      if (e.target?.name == 'streetAddress2') {
        if (i == j) {
          return { ...t, location: { ...t.location, streetAddress2: e.target.value } }
        }
        return t
      }
      if (e.target?.name == 'stopNotes') {
        if (i == j) {
          return { ...t, stopNotes: e.target.value }
        }
        return t
      }
    })
    setFormdata(y)
  }
  const handleChangetab = (e, newValue) => {
    lens < newValue + 1 ? setChange(false) : setChange(true)
    setValue(newValue);
    
  };
  const handleChangetabx = (e, newValue) => {
    setValuex(newValue);
    lenc < newValue + 1 ? setChange(false) : setChange(true)
    
  };
  const handleChangeShippers = (e, newValue) => {
    setValues(newValue);
    
  };

  const handleCloseToken = () => {
    setTruckstop_token('')
    setTrucks_open(false)
  }

  const submitToken = (e) => {
    e.preventDefault()
    localStorage.setItem('trucks_token',truckstop_token)
    setTrucks_open(false)
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
          <div id={params?.id}><Tooltip title="view"><LocationOnIcon style={{ cursor: 'pointer', height: '20px', width: '20px' }} onClick={() => { mapShow(load[params.api.getAllRowIds().indexOf(params.id)]?.loadId, params.api.getAllRowIds().indexOf(params.id)) }} /></Tooltip><Tooltip title="edit"><ModeEditIcon style={{ cursor: 'pointer', height: '20px', width: '20px' }} onClick={() => updatePop(load[params.api.getAllRowIds().indexOf(params.id)]?.loadId, params.api.getAllRowIds().indexOf(params.id))} /></Tooltip><Tooltip title="delete"><DeleteIcon style={{ cursor: 'pointer', height: '20px', width: '20px' }} onClick={() => deleteOpen(load[params.api.getAllRowIds().indexOf(params.id)]?.loadId, params.api.getAllRowIds().indexOf(params.id))} /></Tooltip></div>
        );
      }
    },
    { field: 'loadNumber', headerName: 'Reference ID', width: 120 },
    {
      field: 'lane', headerName: 'Origin', width: 120, valueGetter: (value, params) => {
        
        let result = [];
        if (params?.loadStops) {
          if (params?.loadStops[0]?.location?.city) {
            result.push(params?.loadStops[0]?.location?.city, params?.loadStops[0]?.location?.state);
          }
        } else {
          result = ["Unknown"];
        }
        return result.join(", ");
      }
    },
    {
      field: 'lanes', headerName: 'Origin Zip', width: 100, valueGetter: (value, params) => {
        
        let result = [];
        if (params?.loadStops) {
          if (params?.loadStops[0]?.location?.postalCode) {
            result.push(params?.loadStops[0]?.location?.postalCode);
          } else {
            result = ["Unknown"];
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
        if (params?.loadStops) {
          if (params?.loadStops[1]?.location?.city) {
            result.push(params?.loadStops[1]?.location?.city, params?.loadStops[1]?.location?.state);
          }
        } else {
          result = ["Unknown"];
        }
        return result.join(", ");
      }
    },
    {
      field: 'lanedest', headerName: 'Dest Zip', width: 100, valueGetter: (value, params) => {
        
        let result = [];
        if (params?.loadStops) {
          if (params?.loadStops[1]?.location?.postalCode) {
            result.push(params?.loadStops[1]?.location?.postalCode);
          } else {
            result = ["Unknown"];
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
        if (params?.loadStops) {
          if (params?.loadStops[0]?.earlyDateTime) {
            let c = new Date(params?.loadStops[0]?.earlyDateTime).toLocaleDateString('en-CA')
            result.push(c);
          }
        } else {
          result = ["Unknown"];
        }
        return result.join(", ");
      }
    },
    // { field: 'loadSource', headerName: 'Source', width: 90 },
    // { field: 'createDateTime', headerName: 'Created At', width: 120},
    // { field: 'carrierName', headerName: 'Carrier', width: 90},
    {
      field: 'lanesss', headerName: 'Type', width: 90, valueGetter: (value, params) => {
        
        let result = [];
        if (params?.equipmentAttributes) {
          if (params?.equipmentAttributes?.equipmentTypeId) {
            result.push(X?.filter(t => t.id == params?.equipmentAttributes?.equipmentTypeId)[0]?.type);
          } else {
            result = ["Unknown"];
          }
        } else {
          result = ["Unknown"];
        }
        return result.join(", ");
      }
    },
    {
      field: 'rateAttributes', headerName: 'Price', width: 90, valueGetter: (value, params) => {
        
        let result = [];
        if (params?.rateAttributes) {
          if (params?.rateAttributes?.postedAllInRate) {
            result.push(params?.rateAttributes?.postedAllInRate?.amount);
          } else {
            result = ["Unknown"];
          }
        } else {
          result = ["Unknown"];
        }
        return result.join(", ");
      }
    },
    {
      field: 'freight', headerName: 'Length', width: 90, valueGetter: (value, params) => {
        
        let result = [];
        if (params?.dimensional?.length) {
          if (params?.dimensional?.length) {
            result.push(params?.dimensional?.length);

          }
        } else {
          result = ["Unknown"];
        }
        return result.join(", ");
      }
    },
    {
      field: 'dimensional', headerName: 'Pounds', width: 90, valueGetter: (value, params) => {
        
        let result = [];
        if (params?.dimensional?.weight) {
          if (params?.dimensional?.weight) {
            result.push(params?.dimensional?.weight);

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
        if (params?.commodityId) {
          result.push(params?.commodityId);
        } else {
          result = ["Unknown"];
        }
        return result.join(", ");
      }
    },
    // { field: 'dimensionale', headerName: 'Pallet', width: 90,valueGetter: (value,params) => {
    //   
    //   let result = [];
    //   if (params?.dimensional?.
    //     palletCount
    //     ) {
    //     if (params?.dimensional?.
    //       palletCount
    //       ) {
    //       result.push(params?.dimensional?.
    //         palletCount
    //         );

    //     }
    //   } else {
    //     result = ["Unknown"];
    //   }
    //   return result.join(", ");
    // }},
    // { field: 'dimensionalc', headerName: 'Cubes', width: 90,valueGetter: (value,params) => {
    //   
    //   let result = [];
    //   if (params?.dimensional?.cube) {
    //     if (params?.dimensional?.cube) {
    //       result.push(params?.dimensional?.cube);

    //     }
    //   } else {
    //     result = ["Unknown"];
    //   }
    //   return result.join(", ");
    // }},
    // { field: 'postAsUser', headerName: 'user', width: 90,valueGetter: (value,params) => {
    //   
    //   let result = [];
    //   if (params?.postAsUser) {
    //     if (params?.postAsUser?.userName) {
    //       result.push(params?.postAsUser?.userName);
    //     }else {
    //       result = ["Unknown"];
    //     }
    //   } else {
    //     result = ["Unknown"];
    //   }
    //   return result.join(", ");
    // }},
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
  const deleteOpen = (id) => {
    
    setAlerts(true)
    setDeleteid(id)
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
  }, [])
  React.useEffect(() => {
    fetchLoad();
    fetchUsers();
  }, [page,localStorage.getItem('trucks_token')])


  const getCity = async (lat, lng) => {
    if (lat && lng) {
      const x = await axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`)
      setLocation(x.data.city)
    }
  }


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
    setTenderNotes('')
    setCube('')
    setLoadReferenceNumbers('12345')
    setReferenceNumbers('')
    setFupartial('FULL')
    setEquipmentlist(X)
    setEquipmentTypeid(null)
     setClose('')
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
      case "lateDateTimeDest":
        setLateDateTimeDest(event.target.value)
        break;
      case "earlyDateTimeDest":
        setEarlyDateTimeDest(event.target.value)
        break;
      case "addstatus":
        setFupartial(event.target.value);
        break;
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
          
            const filteredCities = filterByValue(USA, keyword);
            const uniqueCities = filteredCities.filter((a => (r => !r.has(a.city + '|' + a.state) && r.add(a.city + '|' + a.state))(new Set())), Object.create(null));
          
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
        
          const filteredCities = filterByValue(USA, keyword);
          const uniqueCities = filteredCities.filter((a => (r => !r.has(a.city + '|' + a.state) && r.add(a.city + '|' + a.state))(new Set())), Object.create(null));
        
          setCityList(uniqueCities);
        } else {
          const uniqueCities = USA.filter((a => (r => !r.has(a.city + '|' + a.state) && r.add(a.city + '|' + a.state))(new Set())), Object.create(null));
        
          setCityList(uniqueCities);
        }
        
        break;
      case "add_country":
        setAddcountry(event.target.value);
        break;
      case "referenceNumbers":
        setReferenceNumbers(event.target.value);
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
      case "types":
        if (types?.length) { setTypes('') } else { setTypes(event.target.value) }
        break;
      case "ptt":
        if (ptt?.length) { setPtt('') } else { setPtt(event.target.value) }
        break;
      case "ptts":
        if (ptts?.length) { setPtts('') } else { setPtts(event.target.value) }
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
      case "latestAvailability":
        setLatestAvailability(event.target.value);
        break;
      case "full_partial":
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
        } else if (keyword?.length == 0) {
          fetchUsers()
        }
        else {
          setUsers(users);
        }

        break;
      case "created_at":
        setCreated_at(event.target.value);
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
    }
  };

  const mapShow = (id, index) => {
    
    dispatch(DocId(id));
    dispatch(Maps(false));
    dispatch(mapData({
      // Logs:logs,
      // deliveryProofPhotos:load[index]?.deliveryProofPhotos || [],
      // locationLogs:load[index]?.locationLogs || {},
      loadId: load[index]?.loadId || '',
      mobile: load[index]?.driverPhoneNumber || '',
      email: load[index]?.email || '',
      destinationCity: load[index]?.loadStops.filter(x => x.type == 2) || '',
      originCity: load[index]?.loadStops.filter(x => x.type == 1) || ''
    }))
  }
  
  const mapHide = () => {
    dispatch(DocId(''));
    dispatch(Maps(true));
    dispatch(mapData({}));
    dispatch(deleteData([]));
  }
 
  const updatePop = (id, index) => {
    const loadItem = load[index] || {};
    const dimensional = loadItem.dimensional || {};
    const rateAttributes = loadItem.rateAttributes || {};
    const loadStops = loadItem.loadStops || [];
    const firstStop = loadStops[0]?.location || {};
    const secondStop = loadStops[1]?.location || {};
    const firstStopRef = loadStops[0]?.referenceNumbers || [];
    const secondStopRef = loadStops[1]?.referenceNumbers || [];

    // Set basic details
    setEdit(true);
    setD_ID(id);
    setNote(loadItem.note);
    setLoadNumber(loadItem.loadNumber);
    
    // Set rates
    const postedAllInRate = rateAttributes.postedAllInRate?.amount;
    const tenderAllInRate = rateAttributes.tenderAllInRate?.amount;
    setPostedAllInRate(postedAllInRate);
    setRate(postedAllInRate);
    setTenderAllInRate(tenderAllInRate);

    // Set dimensional details
    setLength(dimensional.length);
    setWidth(dimensional.width);
    setHeight(dimensional.height);
    setWeight(dimensional.weight);
    setPounds(dimensional.weight);
    setPalletCount(dimensional.palletCount);
    setPieceCount(dimensional.pieceCount);
    setCube(loadItem.cube);
    setLoadLabel(dimensional.loadLabel);

    // Set stop-related details
    setFormdata(loadStops);
    setOriginCity(firstStop.city);
    setDestinationCity(secondStop.city);
    setLocationNameOrigin(firstStop.locationName);
    setLocationNameDest(secondStop.locationName);
    
    // Set addresses
    setStreetAddress1Origin(firstStop.streetAddress1);
    setStreetAddress1Dest(secondStop.streetAddress1);
    setStreetAddress2Origin(firstStop.streetAddress2);
    setStreetAddress2Dest(secondStop.streetAddress2);
    setPostalCodeOrigin(firstStop.postalCode);
    setPostalCodeDest(secondStop.postalCode);

    // Set contact details
    setContactNameOrigin(loadStops[0]?.contactName);
    setContactPhoneOrigin(loadStops[0]?.contactPhone);
    setContactNameDest(loadStops[1]?.contactName);
    setContactPhoneDest(loadStops[1]?.contactPhone);

    // Set notes
    setStopNotesOrigin(loadStops[0]?.stopNotes);
    setStopNotesDest(loadStops[1]?.stopNotes);
    setTenderNotes(loadItem.tenderNotes);

    // Set reference numbers
    setRefreshnumbersOrigin(firstStopRef[0]);
    setReferenceNumbersDest(secondStopRef[0]);

    // Set time-related details
    const latestAvailability = loadStops[0]?.lateDateTime || '';
    const [latestDate, latestTime] = latestAvailability.split('T');
    setLatestAvailability(latestDate || latestAvailability);
    const [hours, minutes] = latestTime ? latestTime.split(':') : [];
    setLateDateTimeDest(`${hours}:${minutes}` || lateDateTimeDest);
    const earliestAvailability = loadStops[0]?.earlyDateTime || '';
    const [earliestDate, earliestTime] = earliestAvailability.split('T');
    setEarliestAvailability(earliestDate);
    const [earliesthours, earliestminutes] = earliestTime ? earliestTime.split(':') : [];
    setEarlyDateTimeDest(`${earliesthours}:${earliestminutes}` || earlyDateTimeDest);
    setEarlyDateTimeOrigin(loadStops[0]?.earlyDateTime);
    setLateDateTimeOrigin(loadStops[0]?.lateDateTime || lateDateTimeDest);

    // Set equipment details
    const equipmentTypeId = loadItem.equipmentAttributes?.equipmentTypeId;
    const equipmentType = X?.find(x => x.id === equipmentTypeId)?.type;
    setEquipmentType(equipmentType);
    setEquipmentTypeid(equipmentTypeId);

    // Set comment
    setComment(loadItem.note);
    setLoadReferenceNumbers(loadItem.loadReferenceNumbers)
    setAddlocationdest(loadStops[1])
    setAddlocationorigin(loadStops[0])
}



  const Update = async () => {
    setLoads(true)
    setLoading(true)
    const data = {
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
            state: addlocationorigin.location.state,
            streetAddress1: streetAddress1Origin,
            streetAddress2: '',
            countryCode: addlocationorigin?.location.country,
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
            state: addlocationdest.location.state,
            streetAddress1: streetAddress1Dest,
            streetAddress2: '',
            countryCode:addlocationdest?.location.country,
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
    }
    await axios.put(`https://api.truckstop.com/loadmanagement/v2/load/${d_ID}`, data, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('trucks_token')}`,
        'Content-Type': 'application/json'
      }
    })
      .then(docRef => {
        // window.location.reload()
        setLoading(false)
        fetchLoad()
        withReactContent(Swal).fire({
          customClass: {
            container: 'my-swal'
          },
          title: <i>Updated!</i>,
          icon: 'success',
          timer: 2000
        });
        setLoads(false)
        
        setColoumn(false)
        setEdit(false)
        handleClose()
      })
      .catch(error => {
        setLoads(false)
        setColoumn(false)
        setEdit(false)
        setLoading(false)
        handleClose()
        withReactContent(Swal).fire({
          customClass: {
            container: 'my-swal'
          },
          title: error,
          icon: 'error',
          timer: 2000
        });
      })
  }
  const handleCloseAlert = () => {
    setAlerts(false)
    setDeleteid('')
    setDeleteindex('')
  }
  const bulkDeleteLoad = async () => {
    setLoads(true)
    setLoading(true)
    const data = {
      loads: [...new Set(deletedata?.map(x => {
        return {
          loadId: x?.loadId
        }
      }))]
    }
    await axios.post(`https://dr48nfhb-5000.use.devtunnels.ms/truckstop_delete_loads`, data, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('trucks_token')}`,
        'Content-Type': 'application/json'
      }
    })
      .then(docRef => {
        // window.location.reload()
        fetchLoad()
        withReactContent(Swal).fire({
          customClass: {
            container: 'my-swal'
          },
          title: <i>Deleted!</i>,
          icon: 'success',
          timer: 2000
        });
        setLoads(false)
        setLoading(false)
        
        setColoumn(false)
        setEdit(false)
        fetchLoad()
        handleClose()
      })
      .catch(error => {
        setLoads(false)
        setColoumn(false)
        setLoading(false)
        setEdit(false)
        handleClose()
        withReactContent(Swal).fire({
          customClass: {
            container: 'my-swal'
          },
          title: error,
          icon: 'error',
          timer: 2000
        });
      })
  }
  const deleteLoad = async () => {
    setLoads(true)
    setLoading(true)
    const data = {
      loads: [
        {
          loadId: deleteid,
          reason: 2
        },
      ]
    }
    await axios.post(`https://api.truckstop.com//bulkloadmanagement/v2/deletebulkload`, data, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('trucks_token')}`,
        'Content-Type': 'application/json'
      }
    })
      .then(docRef => {
        // window.location.reload()
        fetchLoad()
        withReactContent(Swal).fire({
          customClass: {
            container: 'my-swal'
          },
          title: <i>Deleted!</i>,
          icon: 'success',
          timer: 2000
        });
        setLoads(false)
        setLoading(false)
        
        setColoumn(false)
        setEdit(false)
        fetchLoad()
        handleClose()
      })
      .catch(error => {
        setLoads(false)
        setColoumn(false)
        setLoading(false)
        setEdit(false)
        handleClose()
        withReactContent(Swal).fire({
          customClass: {
            container: 'my-swal'
          },
          title: error,
          icon: 'error',
          timer: 2000
        });
      })
  }
  const generateUniqueId = () => {
    // Generate a random 8-digit number
    const randomNumber = Math.floor(10000000 + Math.random() * 90000000);
    return randomNumber;
  };
  const Submit = async () => {
    setLoads(true)
    setLoading(true)
    const data = {
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
            countryCode: addlocationorigin?.latitude ? addlocationorigin?.country : "CAN",
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
            countryCode: addlocationdest?.latitude ? addlocationdest?.country : "CAN",
            //postalCode:postalCodeDest
          },
          // contactName:contactNameDest,
          // contactPhone:contactPhoneDest,
          // stopNotes:stopNotesDest,
          //referenceNumbers:[referenceNumbersDest]
        }
      ],
      note: comment,
      loadNumber: generateUniqueId(),
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

    // const data = {
    //   postAsUserId: uuidv4(),
    //   equipmentAttributes: {
    //     equipmentTypeId: 17,
    //     equipmentOptions: [
    //       2,
    //       3
    //     ],
    //     transportationModeId: 2,
    //     otherEquipmentNeeds: "Pallet return"
    //   },
    //   commodityId: 1,
    //   loadStops: [
    //     {
    //       type: 1,
    //       sequence: 1,
    //       earlyDateTime: earlyDateTimeOrigin,
    //       lateDateTime: lateDateTimeOrigin,
    //       location: {
    //         locationName:locationNameOrigin,
    //         city:originCity,
    //         state:originStateProv,
    //         streetAddress1:streetAddress1Origin,
    //         streetAddress2:streetAddress2Origin,
    //         countryCode: "USA",
    //         postalCode:postalCodeOrigin
    //       },
    //       contactName:contactNameOrigin,
    //       contactPhone:contactPhoneOrigin,
    //       stopNotes:stopNotesOrigin,
    //       referenceNumbers:[referenceNumbersOrigin]
    //     },
    //     {
    //       type: 2,
    //       sequence: 1,
    //       earlyDateTime: earlyDateTimeDest,
    //       lateDateTime: lateDateTimeDest,
    //       location: {
    //         locationName:locationNameDest,
    //         city:originCity,
    //         state:originStateProv,
    //         streetAddress1:streetAddress1Dest,
    //         streetAddress2:streetAddress2Dest,
    //         countryCode: "USA",
    //         postalCode:postalCodeDest
    //       },
    //       contactName:contactNameDest,
    //       contactPhone:contactPhoneDest,
    //       stopNotes:stopNotesDest,
    //       referenceNumbers:[referenceNumbersDest]
    //     }
    //   ],
    //   note:note,
    //   loadNumber: loadNumber,
    //   loadTrackingRequired: true,
    //   rateAttributes: {
    //     postedAllInRate: {
    //       amount: postedAllInRate,
    //       currencyCode: "USD"
    //     },
    //     tenderAllInRate: {
    //       amount:tenderAllInRate,
    //       currencyCode: "USD"
    //     }
    //   },
    //   customData: [], 
    //   dimensional: {
    //     length: length,
    //     width: width,
    //     weight: weight,
    //     height: height,
    //     palletCount: palletCount,
    //     pieceCount: pieceCount,
    //     cube: cube
    //   },
    //   loadActionAttributes: {
    //     loadActionId: "1",
    //     loadActionOption: "PostOnlineTender"
    //   },
    //   loadLabel: loadLabel,
    //   tenderNotes: tenderNotes,
    //   loadReferenceNumbers: [loadReferenceNumbers],
    //   termsAndConditions: {
    //     id: uuidv4()
    //   }
    // }
    try {
      const docRef = await axios.post('https://api.truckstop.com/loadmanagement/v2/load', data, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('trucks_token')}`,
          'Content-Type': 'application/json'
        }
      })
      fetchLoad()
      setLoading(false)
      handleClose()
      withReactContent(Swal).fire({
        customClass: {
          container: 'my-swal'
        },
        title: <i>added!</i>,
        icon: 'success',
        timer: 2000
      });
      setLoads(false);
      
      setColoumn(false)
      setEdit(false)
    } catch (e) {
      setLoads(false);
      setLoading(false)
      setColoumn(false)
      setEdit(false)
      handleClose()
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

  const fetchLoad = async () => {
    setLoads(true);
    setLoading(true);
  
    const fetchPage = async (pageNumber) => {
      try {
        const response = await axios.post('https://api.truckstop.com/loadmanagement/v2/load/search', 
          {
            pagination: {
              pageNumber: pageNumber,
              pageSize: 100
            }
          }, 
          {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('trucks_token')}`,
              'Content-Type': 'application/json'
            }
          }
        );
        return response.data;
      } catch (error) {
        Swal.fire({
          title: error,
          icon: "error",
          timer: 2000
        });
        throw new Error('Error fetching data from Truckstop API');
      }
    };
  
    const getAllPages = async () => {
      let pageNumber = 1;
      let allData = [];
      let totalPages = 1; // Initialize with a value greater than 0 to enter the loop
  
      while (pageNumber <= totalPages) {
        try {
          const data = await fetchPage(pageNumber);
          totalPages = data.pagination.totalPages;
          allData = [...allData, ...data.data];
          pageNumber++;
        } catch (error) {
          setLoads(false);
          setLoading(false);
          return;
        }
      }
  
      // Update state with all data from all pages
      setLoads(false);
      setLoading(false);
      dispatch(Cell({ id: 'truckstop', data: allData }));
      setCell(allData);
    };
  
    getAllPages();
  };
  
  const fetchUsers = async () => {
    // let { data, error } = await supabase.from('Users_Details').select('*').eq('user_id', localStorage.getItem('id'))
    // setUsers(data);
    // setDocuserID(data);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    edit ? Update(event) : Submit(event)
    // else{
    //   handleClose()
    //   withReactContent(Swal).fire({
    //     title: <i>please Fill All Fields!</i>,
    //     icon:'error'
    //     });
    // }
    // }

  };
  const onFocus = (e) => setFocused(e.target.name);
  const onBlur = (e) => setFocused('');
  const shippersCount = async (t) => {
    
    if (formdata?.length > 1) {
      const x = await tabcount.filter(x => x != t)
      const y = await formdata?.filter(y => y.type != t)
      setTabcount(x)
      setFormdata(y)
      handleChangetab('', 0)
    } else {
      setTabcount(tabcount)
      setFormdata(formdata)
    }
  }
  const conCount = async (t) => {
    if (formdata?.length > 1) {
      const x = await tabcount.filter(x => x != t)
      const y = await formdata?.filter(y => y.type != t)
      setTabcount(x)
      setFormdata(y)
      handleChangetabx('', 0)
    } else {
      setTabcount(tabcount)
      setFormdata(formdata)
    }
  }

  const clickDatas = (option, i, e) => {
    
    setShip(option.name);
    setLP(option.address);
    setOriginCity(option.city);
    setShippersdata(option);
    onChangeFields(e, i, option, consigneedata)
  }
  const clickDatac = (option, i, e) => {
    setCon(option.name);
    setDestinationCity(option.city);
    setDO(option.address);
    setConsigneedata(option);
    onChangeFields(e, i, shippersdata, option)
  }
  
  
  
  
  const addShippersdetails = () => {
    if (formdata?.length >= 2) {
      setFormdata([...formdata, U])
    }
    else {
      setFormdata(formdata)
    }
  }
  const addCondetails = () => {
    if (formdata?.length >= 2) {
      setFormdata([...formdata, U1])
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
        title: <i>added!</i>,
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
  const formatDate = (date) => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding 1 to month and padding with 0 if needed
    const day = String(date.getDate()).padStart(2, '0'); // Padding day with 0 if needed
    return `${year}-${month}-${day}`;
  };
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
          <ColumnData rows={cell} columns={feild} bulkdel={bulkDeleteLoad} openColumn={openColumn}/>
        </> :
          <>
            <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={2} xl={2} onClick={() => mapHide()} style={{ fontSize: '20px', fontWeight: 600, cursor: 'pointer', color: '#fff', textAlign: 'center' }}><Item style={{ color: '#fff',background: '#000', fontWeight: 600 }}>Back to Trukstop</Item></Grid>
              <Grid item xs={12} sm={12} md={2} xl={2}><Item style={{ textAlign: 'left', fontWeight: 600 }}>Tracking ID:<strong>{' '}{mapdata?.loadId}</strong></Item></Grid>
              {/* <Grid item xs={12} sm={12} md={2} xl={2}><Item style={{textAlign:'left',fontWeight:600}}>Location:{location}</Item></Grid> */}
              {/* <Grid item xs={12} sm={12} md={6} xl={6}><Item style={{textAlign:'left',fontWeight:600}}>Email:{mapdata?.email}</Item></Grid> */}
              <Grid item xs={12} sm={12} md={2} xl={2}><Item style={{ textAlign: 'left', fontWeight: 600 }}>Phone:{mapdata?.mobile}</Item></Grid>
            </Grid>
            <br />
            {mapdata?.originCity ? <Row><Col xs={12} sm={12} md={3} xl={3}><SideRow /></Col><Col xs={12} sm={12} md={9} xl={9}><MapChart /></Col></Row> : <Spinner />}
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
          <DialogTitle className='add_title' sx={{ height: '8vh', textAlign: 'center' }}><p style={{ margin: 'auto' }}>Add New Load Truckstop</p></DialogTitle>
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
                      size='small'
                      id="outlined-basic" fullWidth={5} onFocus={onFocus} onBlur={onBlur} label="Earliest Pickup Time" variant="outlined" type="time" name='earlyDateTimeDest' value={earlyDateTimeDest} onChange={(e) => { handleDateChange(e) }}
                      SelectProps={{
                        MenuProps: {
                          PaperProps: {
                            style: {
                              maxHeight: 200, // Set maximum height if needed
                              width: 200, // Set the desired width
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
                      size='small'
                      id="outlined-basic" fullWidth={5} onFocus={onFocus} onBlur={onBlur} label="Latest Pickup Time" variant="outlined" type="time" name='lateDateTimeDest' value={lateDateTimeDest} onChange={(e) => { handleDateChange(e) }}
                      SelectProps={{
                        MenuProps: {
                          PaperProps: {
                            style: {
                              maxHeight: 200, // Set maximum height if needed
                              width: 200, // Set the desired width
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
         focused id="outlined-basic" fullWidth={5} onFocus={onFocus} onBlur={onBlur} label="Earliest Pickup Time" variant="outlined" type="time" name='earlyDateTimeDest' value={earlyDateTimeDest} onChange={(e)=>{handleDateChange(e)}} />
        </FormControl>}
        <FormControl fullWidth sx={{ m: 1,width: '19ch' }}>
        <TextField 
        size='small'
        focused id="outlined-basic"  fullWidth={5} onFocus={onFocus} onBlur={onBlur} label="Latest Pickup Time" variant="outlined" type="time" name='lateDateTimeDest' value={lateDateTimeDest} onChange={(e)=>{handleDateChange(e)}}/>
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
                        <li {...props} key={option} value={option.type} onClick={() => { setEquipmentType(`${option.label},${option.type}`); setEquipmentTypeid(option.id); setClose(''); }}>
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
                          label="Commodity" variant="outlined" type="text" name='commodity' value={commodity} onChange={(e) => { handleChange(e); }} />
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
      {/* <React.Fragment>
        <Dialog
          open={trucks_open}
          onClose={handleCloseToken}
          PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
        >
          <DialogActions sx={{ height: '2vh' }}>
            <HighlightOffIcon style={{ cursor: 'pointer', width: '5vw', height: '5vh', position: 'absolute', top: 15 }} onClick={handleCloseToken} />
          </DialogActions>
          <DialogContent>
            <Box sx={{ borderBottom: 1, borderColor: 'divider',margin:'2%' }}>
            <form onSubmit={submitToken}>
            <FormControl sx={{ m: 1, width: '40ch' }} xs={12} sm={12} md={12} xl={12}>
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

export default ViewTruckstop
