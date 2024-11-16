import AddBoxIcon from '@mui/icons-material/AddBox';
import AddBoxSharpIcon from '@mui/icons-material/AddBoxSharp';
import CancelPresentationRoundedIcon from '@mui/icons-material/CancelPresentationRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MessageIcon from '@mui/icons-material/Message';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Autocomplete, Checkbox, FormControlLabel, FormGroup, FormLabel, Grid, MenuItem, Radio, RadioGroup, Switch, TextField, Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import Paper from '@mui/material/Paper';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import Draggable from 'react-draggable';
import nextId from "react-id-generator";
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { USA } from '../Json/Cities';
import { Cell, DocId, Maps, changeDate, deleteData, mapData, page_count } from '../Reducers/userReducer';
import { supabase } from '../firebase';
import MapChart from "./Map";
import { SideRow } from "./SideRow";
import ColumnData from './Table';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import LoadingPage from './LoadingComponent';
import { mainHeader } from '../common';

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
export const TrashCan = () => {
  const [buttonName, setButtonName] = React.useState('')
  const [mobile, setMobile] = React.useState('')
  //const[map,setMap] = React.useState(true)
  const [coloumn, setColoumn] = React.useState(false)
  const [comment, setComment] = React.useState('')
  const [datetime, setDatetime] = React.useState(new Date().toISOString())
  const [destinationCity, setDestinationCity] = React.useState('')
  const [destinationStateProv, setDestinationStateProv] = React.useState('')
  const [dispatcher, setDispatcher] = React.useState('')
  const [earliestAvailability, setEarliestAvailability] = React.useState('')
  const [equipmentType, setEquipmentType] = React.useState('')
  const [latestAvailability, setLatestAvailability] = React.useState('')
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
  const aid = useSelector((state) => state.user?.appleID)
  const trid = useSelector((state) => state.user?.docid)
  const load = useSelector((state) => state?.user?.cell?.filter(x => x?.isDeleted == true))
  const deletedata = useSelector((state) => state?.user?.deleteData)
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
  const [formValues, setFormValues] = useState({
    trackingId: '',
    title: '',
    message: '',
  });
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
  const [locationPickup, setLocationPickup] = React.useState([])
  const [locationPickupcity, setLocationPickupcity] = React.useState([])
  const [locationDest, setLocationDest] = React.useState([])
  const [locationDestcity, setLocationDestcity] = React.useState([])
  const [addressList, setAddressList] = React.useState([])
  const [addressListcity, setAddressListcity] = React.useState([])
  const [loadingLocationPickup, setLoadingLocationPick] = React.useState(false)
  const [loadinLocationDrop, setLoadingLocationDrop] = React.useState(false)
  const [loadinglocation, setLoadinglocation] = React.useState(false)
  const [close, setClose] = React.useState('')
  const [shippersDropdown,setShippersDropdown] = React.useState([])
  const [consigneeDropdown,setConsigneeDropdown] = React.useState([])
  const [formdata, setFormdata] = React.useState({
    shippersData: [{
      id: nextId(),
      shipper: '',
      locationP: '',
      pickUpDate: new Date().toLocaleDateString('en-CA'),
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
      dropOffDate: new Date().toLocaleDateString('en-CA'),
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

  const [copyStatus, setCopyStatus] = useState(false); // To indicate if the text was copied

  const onChangeFields = (e, j, r, f) => {
    const { name, value } = e.target;

    // Deep clone the formdata to avoid modifying read-only properties
    const items = _.cloneDeep(formdata);

    const shipperFields = {
        shipper: name === 'shippers_name' ? value : (r?.name || r?.Name || items.shippersData[j]?.shipper),
        locationP: name === 'location_name_pickup' ? value : (r?.address || r?.Address || items.shippersData[j]?.locationP),
        originCity: name === 'originCity' ? value : (r?.city || r?.City || items.shippersData[j]?.originCity),
        pickUpDate: name === 'Pick up Dates' ? value : items.shippersData[j]?.pickUpDate,
        pickUpHours: name === 'Pick up Hours' ? value : items.shippersData[j]?.pickUpHours,
        notesPickup: name === 'notes_pickup' ? value : items.shippersData[j]?.notesPickup,
        shippersData: r ? r : shippersdata[j],
    };

    const consigneeFields = {
        consignee: name === 'consignee_name' ? value : (f?.name || f?.Name || items.consigneeData[j]?.consignee),
        locationD: name === 'location_name_dropoff' ? value : (f?.address || f?.Address || items.consigneeData[j]?.locationD),
        destinationCity: name === 'destinationCity' ? value : (f?.city || f?.City || items.consigneeData[j]?.destinationCity),
        dropOffDate: name === 'dropoff_date' ? value : items.consigneeData[j]?.dropOffDate,
        dropOffHours: name === 'dropoff_hours' ? value : items.consigneeData[j]?.dropOffHours,
        notesDropoff: name === 'notes_dropoff' ? value : items.consigneeData[j]?.notesDropoff,
        consigneeData: f ? f : consigneedata[j],
    };

    if (items.shippersData[j]) {
        items.shippersData[j] = { ...items.shippersData[j], ...shipperFields };
    }

    if (items.consigneeData[j]) {
        items.consigneeData[j] = { ...items.consigneeData[j], ...consigneeFields };
    }

    setFormdata(items);
};





  const handleChangetab = (e, newValue) => {
    lens < newValue + 1 ? setChange(false) : setChange(true)
    setValue(newValue);
    
    setShip(formdata.shippersData[newValue]?.shipper);
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

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        setCopyStatus(true);
        setTimeout(() => setCopyStatus(false), 2000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
}

  const feild = [
    {
      field: 'action', headerName: 'Action', width: 130, sortable: false, disableColumnMenu: true, renderCell: (params) => {
        
        return (
          <div id={params?.id}><Tooltip title="view"><LocationOnIcon style={{ cursor: 'pointer', height: '20px', width: '20px' }} onClick={() => { mapShow(load[params.api.getAllRowIds().indexOf(params.id)]?.id, load[params.api.getAllRowIds().indexOf(params?.id)]?.loadid, params.api.getAllRowIds().indexOf(params.id)) }} /></Tooltip><Tooltip title="edit"><ModeEditIcon style={{ cursor: 'pointer', height: '20px', width: '20px' }} onClick={() => updatePop(load[params.api.getAllRowIds().indexOf(params.id)]?.id, params.api.getAllRowIds().indexOf(params.id))} /></Tooltip><Tooltip title="message"><MessageIcon style={{ cursor: 'pointer', height: '20px', width: '20px' }} onClick={() => {setMessage(true);setFormValues({
            trackingId: load[params.api.getAllRowIds().indexOf(params?.id)]?.trackingId || '',
            title: "Update Load Status" || '',
            message: `Update Tracking ID : ${load[params.api.getAllRowIds().indexOf(params?.id)]?.trackingId} Load Status` || '',
          });}} /></Tooltip><Tooltip title="delete"><DeleteIcon style={{ cursor: 'pointer', height: '20px', width: '20px' }} onClick={() => deleteOpen(load[params.api.getAllRowIds().indexOf(params.id)]?.id, params.api.getAllRowIds().indexOf(params.id))} /></Tooltip>
          <Tooltip title={copyStatus ? "copied":"copy link"}>
          <FolderCopyIcon onClick={()=>copyToClipboard(`https://load41.com/live-tracking/${load[params.api.getAllRowIds().indexOf(params?.id)]?.trackingId}`)} style={{ cursor: 'pointer', height: '20px', width: '20px' }}/>
          </Tooltip></div>
        );
      }
    },
    { field: 'loadId', headerName: 'Load ID', width: 80 },
    { field: 'trackingId', headerName: 'Trackin ID', width: 100 },
    { field: 'brokerName', headerName: 'Broker', width: 140 },
    {
      field: 'shippingData', headerName: 'Origin', width: 130, valueGetter: (value, params) => {
        
        let result = [];
        if (params?.shippingData?.shippersData) {
          if (params?.shippingData?.shippersData?.[0]) {
            result.push(params?.shippingData?.shippersData?.[0]?.shippersData?.city || params?.shippingData?.shippersData?.[0]?.originCity, params?.shippingData?.shippersData[0]?.shippersData.state);
          }
        } else {
          result = ["Unknown"];
        }
        return result.join(", ");
      }
    },
    {
      field: 'shippingData1', headerName: 'Pickup Date', width: 130, valueGetter: (value, params) => {
        
        let result = [];
        if (params?.shippingData?.shippersData) {
          if (params?.shippingData?.shippersData[0]) {
            result.push(params?.shippingData?.shippersData?.[0]?.pickUpDate);
          }
        } else {
          result = ["Unknown"];
        }
        return result.join(", ");
      }
    },
    {
      field: 'shippingData2', headerName: 'Destination', width: 130, valueGetter: (value, params) => {
        
        let result = [];
        if (params?.shippingData?.consigneeData) {
          if (params?.shippingData?.consigneeData?.[0]) {
            result.push(params?.shippingData?.consigneeData?.[0]?.consigneeData?.city || params?.shippingData?.shippersData?.[0]?.destinationCity, params?.shippingData?.consigneeData[0]?.consigneeData.state);
          }
        } else {
          result = ["Unknown"];
        }
        return result.join(", ");
      }
    },
    {
      field: 'shippingData3', headerName: 'Drop Date', width: 90, valueGetter: (value, params) => {
        
        let result = [];
        if (params?.shippingData?.consigneeData) {
          if (params?.shippingData?.consigneeData[0]?.dropOffDate) {
            result.push(params?.shippingData?.consigneeData[0]?.dropOffDate);
          }
        } else {
          result = ["Unknown"];
        }
        return result.join(", ");
      }
    },

    {
      field: 'locationLogs', headerName: 'Current Location', width: 120, valueGetter: (value, params) => {
        
        let result = [];
        if (params?.locationLogs[params?.locationLogs?.length - 1]?.address) {
          if (!params?.isDeleted) {
            result.push(params?.locationLogs[params?.locationLogs?.length - 1]?.address)
          }
        } else {
          result = ["Unknown"];
        }
        return result.join(", ");
      }
    },
    { field: 'loadStatus', headerName: 'Status', width: 120, editable: true, type: "actions", renderCell: (params) => [<select value={params?.row?.loadStatus?.length ? params?.row?.loadStatus : loadStatus} onChange={e => statusChange(e, load[params.api.getAllRowIds().indexOf(params.id)]?.id, params.api.getAllRowIds().indexOf(params.id))}><option value='DELIVERED'>DELIVERED</option><option value='LOADING'>LOADING</option><option value='UNLOADING'>UNLOADING</option><option value='PICKED UP'>PICKED UP</option><option value='NOT STARTED'>NOT STARTED</option><option value='TRACKING'>TRACKING</option><option value='EN ROUTE'>EN ROUTE</option></select>] },
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
  const deleteOpen = (id, index) => {
    setAlerts(true)
    setDeleteid(id)
    setDeleteindex(index)
  }
  const statusChange = async (e, id, index) => {
    setLoads(true)
    setLoading(true)
    const data = {
      loadStatus: e.target.value,
    };
    try {
      const { data:c} = await axios.put(`https://dr48nfhb-5000.use.devtunnels.ms/trackers-info/${id}`,data,{
        headers: mainHeader()
      })
      fetchLoad()
      withReactContent(Swal).fire({
        title: <i>Updated!</i>,
        icon: 'success',
        timer: 2000
      });
      setLoads(false)
      setLoading(false)
      
      setColoumn(false)
      setEdit(false)
      handleClose()
    }
    catch (error) {
      setLoads(false)
      setColoumn(false)
      setLoading(false)
      setEdit(false)
      handleClose()
      withReactContent(Swal).fire({
        title: error,
        icon: 'error',
        timer: 2000
      });
    }
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
  }, [load?.length])
  // React.useState(async ()=>{
  //  const x = '10177, North Portal Avenue'
  //  const z = await axios.post(`https://geocode.maps.co/search?q=${x}&api_key=6661ba9a1beaa395706210lnt5f2201`)
  //  setAddressList(z.data)
  //  setLocationDest(z.data)
  //  setLocationPickup(z.data)
  //  
  // },[])

  const getCity = async (lat, lng) => {
    if (lat && lng) {
      const x = await axios.get(`https://geocode.maps.co/reverse?lat=${lat}&lon=${lng}&api_key=6661ba9a1beaa395706210lnt5f2201`)
      setLocation(x?.data?.address?.city)
    }
  }


  const handleCloseMessage = () => {
    setMessage(false)
  }

  const handleChangeMessage = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmitMessage = (event) => {
    event.preventDefault();
    handleSendNotification(formValues);
    handleCloseMessage();
  };

  const handleClose = () => {
    setButtonName('')
    setTypes('')
    setError(false)
    setValuex(0)
    setValue(0)
    setTabcountconsignee([1])
    setShip('');
    setCon('')
    setFormdata({
      shippersData: [{
        id: Math.floor(10 + Math.random() * 90),
        shipper: '',
        locationP: '',
        pickUpDate: '',
        pickUpHours: '',
        originCity: '',
        notesPickup: '',
        shippersData: []
      }],
      consigneeData: [{
        id: Math.floor(10 + Math.random() * 90),
        consignee: '',
        locationD: '',
        dropOffHours: '',
        dropOffDate: '',
        destinationCity: '',
        notesDropoff: '',
        consigneeData: []
      }]
    })
    setDeliveryProofPhotos([])
    setTabcount([1])
    setColoumn(false);
    setEdit(false);
    setLP('');
    setDO('');
    setNotes_dropoff('');
    setNotes_pickup('');
    setStreet_dropoff('');
    setDropoff_date('');
    setStreet_pickup('');
    setStatus('NOT STARTED');
    setMobile('');
    setEmail('');
    setPickupdate('');
    setDriver('');
    setCarrier('');
    setComment('');
    setDatetime('');
    setDestinationCity('');
    setDestinationStateProv('');
    setDispatcher('');
    setEarliestAvailability('');
    setEquipmentType('');
    setLatestAvailability('');
    setLoadId('');
    setOriginCity('');
    setOriginStateProv('');
    setPrice('');
    setStatus('NOT STARTED');
    setCreated_at('');
    setShippersdata([]);
    setConsigneedata([]);
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
    const lowerSearchString = keyword?.toLowerCase().split(' ');
  
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
      case "location_name_pickup":
      case "location_name_dropoff":
      case "add_city":
      case "destinationCity":
      case "originCity":
        const setLoadingState = (name, state) => {
          if (name === "add_address" || name === "add_city") setLoadinglocation(state);
          else if (name === "location_name_pickup") setLoadingLocationPick(state);
          else if (name === "location_name_dropoff") setLoadingLocationDrop(state);
          else setLoadingLocationPick(state);
        };
  
        setLoadingState(event.target.name, true);
        await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${keyword.length ? keyword : 1}&key=AIzaSyAjozP-lwYIgqNHXLXiLUtJIyXA0jBtIGU`)
          .then(response => {
            const results = response.data.results;
            switch (event.target.name) {
              case "add_address":
                setAddaddress(keyword);
                setAddressList(results);
                setClose('address');
                break;
              case "location_name_pickup":
                setLP(keyword);
                setLocationPickup(results);
                setClose('LP');
                break;
              case "location_name_dropoff":
                setDO(keyword);
                setLocationDest(results);
                setClose('LD');
                break;
              case "add_city":
                setAddcity(keyword);
                if (!addstate?.length) {
                  setAddressListcity(results);
                  setClose('city');
                }
                break;
              case "destinationCity":
                setDestinationCity(keyword);
                if (!destinationStateProv?.length) {
                  setLocationDestcity(results);
                  setClose('destinationCity');
                }
                break;
              case "originCity":
                setOriginCity(keyword);
                if (!originStateProv?.length) {
                  setLocationPickupcity(results);
                  setClose('originCity');
                }
                break;
            }
          }).catch(error => {
            Swal.fire({ title: error.message, icon: "error", timer: 2000 });
          }).finally(() => {
            setLoadingState(event.target.name, false);
          });
        break;
      case "add_address1":
        setAddaddress1(event.target.value);
        break;
      case "add_address2":
        setAddaddress2(event.target.value);
        break;
      case "add_state":
        setAddstate(event.target.value);
        if (keyword !== '') {
          function filterByValue(array, string) {
            return array.filter(o =>
              Object.keys(o).some(k => String(o[k])?.toLowerCase().includes(string?.toLowerCase()))
            );
          }
          setCityList(filterByValue(USA, keyword));
        } else {
          setCityList(USA);
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
        setAppointment(appointment?.length ? '' : event.target.value);
        break;
      case "types":
        setTypes(types?.length ? '' : event.target.value);
        break;
      case "add_status":
        setAddstatus(event.target.value);
        break;
      case "hours":
        setHours(event.target.value);
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
        setHasValue(2);
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
        setHasValue(1);
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
        setEquipmentType(event.target.value);
        break;
      case "latestAvailability":
        setLatestAvailability(event.target.value);
        break;
      case "loadId":
        setLoadId(event.target.value);
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
      case "consignee_name":
        if (event.target.name === "shippers_name") {
          setClose('shipper');
          setShip(event.target.value);
          if (keyword !== '') {
            if(shippersDropdown?.length){
              const results = shippersDropdown?.filter(user => {
                const lowerName = (user?.data?.name || user?.data?.Name || "").toLowerCase();
                const lowerCity = (user?.data?.city || user?.data?.City || "").toLowerCase();
      
                return lowerName.startsWith(keyword?.toLowerCase()) || lowerCity.startsWith(keyword?.toLowerCase());
              });
      
              setShippersDropdown(results);
            }else{
              fetchUsers();
              const results = shippersDropdown?.filter(user => {
                const lowerName = (user?.data?.name || user?.data?.Name || "").toLowerCase();
                const lowerCity = (user?.data?.city || user?.data?.City || "").toLowerCase();
      
                return lowerName.startsWith(keyword?.toLowerCase()) || lowerCity.startsWith(keyword?.toLowerCase());
              });
      
              setShippersDropdown(results);
            }
          } else if (keyword.length === 0) {
            fetchUsers();
          } else {
            setShippersDropdown(shippersDropdown);
          }
        } else {
          setClose('consignee');
          setCon(event.target.value);
          if (keyword !== '') {
            if(consigneeDropdown?.length){
              const results = consigneeDropdown?.filter(user => {
                const lowerName = (user?.data?.name || user?.data?.Name || "").toLowerCase();
                const lowerCity = (user?.data?.city || user?.data?.City || "").toLowerCase();
      
                return lowerName.startsWith(keyword?.toLowerCase()) || lowerCity.startsWith(keyword?.toLowerCase());
              });
      
              setConsigneeDropdown(results);
            }else{
              fetchUsers();
              const results = consigneeDropdown?.filter(user => {
                const lowerName = (user?.data?.name || user?.data?.Name || "").toLowerCase();
                const lowerCity = (user?.data?.city || user?.data?.City || "").toLowerCase();
      
                return lowerName.startsWith(keyword?.toLowerCase()) || lowerCity.startsWith(keyword?.toLowerCase());
              });
      
              setConsigneeDropdown(results);
            }
          } else if (keyword.length === 0) {
            fetchUsers();
          } else {
            setConsigneeDropdown(consigneeDropdown);
          }
        }
        break;
      case "created_at":
        setCreated_at(event.target.value);
        break;
    }
  };
  

  const mapShow = (i, id, index) => {
    setLoading(true)
    getCity(load[index]?.locationLogs[load[index]?.locationLogs?.length - 1]?.latitude, load[index]?.locationLogs[load[index]?.locationLogs?.length - 1]?.longitude)
    
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
  
  const mapHide = () => {
    dispatch(DocId(''));
    dispatch(Maps(true));
    dispatch(mapData({}));
    dispatch(deleteData([]));
    dispatch(changeDate(''));
  }
  const updatePop = (id, index) => {
    setLens(formdata.shippersData.length)
    setLenc(formdata.consigneeData.length)
    setEdit(true);
    setD_ID(id);
    setDeliveryProofPhotos(load[index]?.deliveryProofPhotos)
    // setLP(load[index]?.shippersData[0]?.pickUpLocation);
    // setDO(load[index]?.consigneeData[0]?.dropOffLocation);
    // setStreet_dropoff(load[index]?.consigneeData[0]?.street_dropoff);
    // setStreet_pickup(load[index]?.shippersData[0].street_pickup);
    setStatus(load[index]?.status);
    setMobile(load[index]?.driverPhoneNumber);
    setEmail(load[index]?.email);
    setDriver(load[index]?.driver);
    setComment(load[index]?.comment);
    setDatetime(load[index]?.datetime);
    setDispatcher(load[index]?.dispatcher);
    setEarliestAvailability(load[index]?.earliestAvailability);
    setEquipmentType(load[index]?.equipmentType);
    setLatestAvailability(load[index]?.latestAvailability);
    setLoadId(load[index]?.loadId);
    setPrice(load[index]?.price);
    setCreated_at(load[index]?.createdAt);
    setStatus(load[index]?.loadStatus)
    setFormdata(load[index]?.shippingData)
    setConsigneedata(load[index]?.shippingData?.consigneeData.map(res=>res.consigneeData))
    setShippersdata(load[index]?.shippingData?.shippersData.map(res=>res.shippersData))
    setIsDeleted(load[index]?.isDeleted)
    setTrackingId(load[index]?.trackingId)
  }


  const Update = async () => {
    setLoads(true);
    setLoading(true);

   
    const data = {
        driverPhoneNumber: mobile,
        email: email,
        shippingData: formdata,
        loadId: loadId
    };

    try {
        
      const { data:c} = await axios.put(`https://dr48nfhb-5000.use.devtunnels.ms/trackers-info/${d_ID}`,data,{
        headers: mainHeader()
      })
        if (!c) {
            throw "error"; 
        }
        fetchLoad();
        withReactContent(Swal).fire({
            title: <i>Updated!</i>,
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
        setLoading(false);
        setColoumn(false);
        setEdit(false);
        handleClose();
        withReactContent(Swal).fire({
            title: error.message || 'An error occurred',
            icon: 'error',
            timer: 2000
        });
    }
};

const bulkDeleteLoad = async () => {
  const dataDelete = deletedata?.map(x => x?.id)
  try {

    const { data: c } = await axios.delete('https://dr48nfhb-5000.use.devtunnels.ms/trackers-info/bulk-delete', {
      data: { IDs: dataDelete },  // Correct placement of the payload
      headers: mainHeader()
  });
    if (!c) {
        throw "error";
    }
    fetchLoad();
    withReactContent(Swal).fire({
        title: <i>Deleted!</i>,
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
    setLoading(false);
    setColoumn(false);
    setEdit(false);
    handleClose();
    withReactContent(Swal).fire({
        title: error.message || 'An error occurred',
        icon: 'error',
        timer: 2000
    });
}
}

  const handleCloseAlert = () => {
    setAlerts(false)
    setDeleteid('')
    setDeleteindex('')
  }
  
  const deleteLoad = async () => {
    setLoads(true);
    setLoading(true);

    try {
      const { data:c} = await axios.delete(`https://dr48nfhb-5000.use.devtunnels.ms/trackers-info/${deleteid}`,{
        headers: mainHeader()
      })

        if (!c) {
            throw "error";
        }
        fetchLoad();
        withReactContent(Swal).fire({
            title: <i>Deleted!</i>,
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
        setLoading(false);
        setColoumn(false);
        setEdit(false);
        handleClose();
        withReactContent(Swal).fire({
            title: error.message || 'An error occurred',
            icon: 'error',
            timer: 2000
        });
    }
};

  
  const Submit = async (textmessage) => {
    setLoads(true);
    setLoading(true);
    const tid = mobile.slice(8, 11) + Math.floor(10000 + Math.random() * 90000)
    try {
      const { data } = await axios.post('https://dr48nfhb-5000.use.devtunnels.ms/trackers-info',{entries:[{
        driverPhoneNumber: mobile,
        email: email,
        comment: comment,
        datetimes: datetime,
        dispatcher: dispatcher,
        driver: driver,
        brokerName: uid?.username,
        deliveryProofPhotos: deliveryProofPhotos,
        isDeleted: isDeleted,
        locationLogs: [],
        shippingData: formdata,
        equipmentType: equipmentType,
        latestAvailability: latestAvailability,
        loadId: loadId,
        trackingId: tid,
        price: price,
        loadStatus: status,
    }]},{
      headers: mainHeader() 
    });

        if (!data) {
            setLoads(false);
            setLoading(false);
            setColoumn(false);
            setEdit(false);
            handleClose();
            Swal.fire({
                title: 'An error occurred',
                icon: "error",
                timer: 3000
            });
        } else {
            fetchLoad();
            setLoading(false);
            handleClose();
            withReactContent(Swal).fire({
                title: <i>added!</i>,
                icon: 'success',
                timer: 2000
            });
            setLoads(false);
            setColoumn(false);
            setEdit(false);
            if(textmessage){
              sendTrackingmessage(mobile,tid,loadId,uid?.username)
            }
        }
    } catch (e) {
        setLoads(false);
        setLoading(false);
        setColoumn(false);
        setEdit(false);
        handleClose();
        Swal.fire({
            title: e.message || 'An unexpected error occurred',
            icon: "error",
            timer: 2000
        });
    }
};

function openAppOrRedirect() {
  const scheme = 'yourapp://';
  const playStoreUrl = 'https://play.google.com/store/apps/details?id=com.jbl.load41';

  // Try to open the app
  const now = new Date().getTime();
  const iframe = document.createElement('iframe');
  iframe.style.border = 'none';
  iframe.style.width = '1px';
  iframe.style.height = '1px';
  iframe.style.visibility = 'hidden';
  iframe.src = scheme;
  document.body.appendChild(iframe);

  // If the app is not opened, redirect to the Play Store
  setTimeout(function() {
    if (new Date().getTime() - now < 1500) {
      window.location = playStoreUrl;
    }
    document.body.removeChild(iframe);
  }, 1000);
}

const sendTrackingmessage = async (to,trackingid,loadid,name) => {
  const Content = () => <div><p>Hi! here is ${name}!<br/>
     Your Tracking ID is ${trackingid} and <br/>
     Your Load ID is ${loadid} and<br/>
      here is your link to open Load41 is <Link to='#' onClick={()=>openAppOrRedirect()}>Open Load41 App</Link>
      </p>
      </div>
  const data = {
    to:to,
   message:`Hi! here is ${name}! Your Tracking ID is ${trackingid} links to Download Android is https://play.google.com/store/apps/details?id=com.jbl.load41 and Apple is https://apps.apple.com/in/app/load41/id6476617385`
}

   await axios.post('https://dr48nfhb-5000.use.devtunnels.ms/send_sms',data,{
    headers: mainHeader() 
  }).then(
     res=>{
       setLoads(false);
       setLoading(false);
       setColoumn(false);
       setEdit(false);
       handleClose();
       Swal.fire({
           title: res?.message || 'message sent!',
           icon: "success",
           timer: 2000
       });
     }
   ).catch(
     error => {
       setLoads(false);
       setLoading(false);
       setColoumn(false);
       setEdit(false);
       handleClose();
       Swal.fire({
           title: error || 'An unexpected error occurred',
           icon: "error",
           timer: 2000
       });
     }
   )
}

  const fetchLoad = async () => {
    let { data} = await axios.get(`https://dr48nfhb-5000.use.devtunnels.ms/trackers_info?user_id=${localStorage.getItem('id')}`)
    if (data?.data) {
      
      // setLogs(data?.filter(x=>x.isDeleted == false)?.map(x=>x.locationLogs))
      // dispatch(Logs(data?.filter(x=>x.isDeleted == false)?.map(x=>x.locationLogs)))          
      setDocID(data?.data?.filter(x => x.isDeleted == true));
      setCell(data?.data);
      // const v = data.map(r=>{
      //   if(r.locationLogs?.length > 1) {
      //     const t = axios.get(`https://geocode.maps.co/reverse?lat=${r.locationLogs[r?.locationLogs?.length-1]?.latitude}&lon=${r.locationLogs[r?.locationLogs?.length-1]?.longitude}&api_key=6661ba9a1beaa395706210lnt5f2201`)
      //     return {...r,currentLocation:t?.data?.address?.city || t?.data?.address?.town || t?.data?.address?.suburb}
      //   }else{
      //     return r
      //   }
      // })
      // 
      dispatch(Cell({ id: 'tracking', data: data?.data }))
    } else {
      Swal.fire({
        title: "failed to fetch data",
        icon: "error",
        timer: 2000
      });
    }
  };
  const fetchUsers = async () => {
    if(localStorage.getItem('authentication')){
    let { data} = await axios.get(`https://dr48nfhb-5000.use.devtunnels.ms/users_details`,{
      headers: mainHeader()
  })
    if (data?.data) {
      setUsers(data?.data);
      setShippersDropdown(data?.data?.filter(x=>(x?.type == 'shippers' || x?.type == 'sc')))
      setConsigneeDropdown(data?.data?.filter(x=>(x?.type == 'consignee' || x?.type == 'sc')))
      setDocuserID(data?.data);
    } else {
      Swal.fire({
        title: 'failed to fetch data',
        icon: "error",
        timer: 2000
      });
    }
  }
  };
  const handleSubmit = (event) => {
    if (event && typeof event.preventDefault === 'function' && typeof event.stopPropagation === 'function') {
        event.preventDefault(); 
        event.stopPropagation();
        if (mobile.length > 2) {
            if (buttonName === 'mainButton') {
                if (edit) {
                    Update();
                } else {
                    Submit(false);
                }
            } else if (buttonName === 'secondaryButton') {
                Submit(true);
            }
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

  const clickDatas = async (option, i, e) => { 
    try {
      setLoading(true);  
      setShip(option.name || option?.Name);
      setLP(option.address || option?.Address);
      setOriginCity(option.city || option?.City);
      setShippersdata(option);
  
      if (option?.locationdata) {
        setLoading(false)
        onChangeFields(e, i, option, consigneedata[i] ? consigneedata[i] : consigneedata);
      } else {
        const addressParts = [
          option.address || option?.Address || '',
          option.city || option?.City || '',
          option.state || option?.State || '',
          option.country || option?.Country || ''
          ];

        const address = addressParts.filter(Boolean).join(', ');
        const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyAjozP-lwYIgqNHXLXiLUtJIyXA0jBtIGU`);
        handleGeocodeResponse(response, i, e, option, 'Pickup');
        setLoading(false)
      }
    } catch (error) {
      showErrorAlert(error);
      setLoading(false)
    } finally {
      setLoading(false);
      setClose('');
    }
  };
  
  const clickDatac = async (option, i, e) => {
    try {
      setLoading(true);
      setCon(option.name || option?.Name);
      setDestinationCity(option.city || option?.City);
      setDO(option.address || option?.Address);
      setConsigneedata(option);
  
      if (option?.locationdata) {
        setLoading(false);
        onChangeFields(e, i, shippersdata[i] ? shippersdata[i] : shippersdata, option);
      } else {
        const addressParts = [
          option.address || option?.Address || '',
          option.city || option?.City || '',
          option.state || option?.State || '',
          option.country || option?.Country || ''
          ];

        const address = addressParts.filter(Boolean).join(', ');
        const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyAjozP-lwYIgqNHXLXiLUtJIyXA0jBtIGU`);
        handleGeocodeResponse(response, i, e, option, 'Dest');
        setLoading(false);
      }
    } catch (error) {
      showErrorAlert(error);
    } finally {
      setLoading(false);
      setClose('');
    }
  };
  
  const handleGeocodeResponse = async (response, i, e, option, type) => {
    setLoading(true)
    const results = response?.data?.results;
    
    if (results?.length) {
      const clickFunction = type === 'Pickup' ? clickAddressPickup : clickAddressDest;
      clickFunction(results[0], i, e, option.name || option?.Name, option.city || option?.City);
      setLoading(false)
    } else {
      const cityResponse = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${option.city || option?.City}&key=AIzaSyAjozP-lwYIgqNHXLXiLUtJIyXA0jBtIGU`);
      const cityResults = cityResponse?.data?.results;
  
      if (cityResults?.length) {
        const clickFunction = type === 'Pickup' ? clickAddressPickup : clickAddressDest;
        clickFunction(cityResults[0], i, e, option.name || option?.Name, option.city || option?.City);
        setLoading(false)
      } else {
        onChangeFields(e, i,type === 'Pickup' ? option : shippersdata[i] ? shippersdata[i]:shippersdata, type === 'Dest' ? option : consigneedata[i] ? consigneedata[i] : consigneedata);
        setLoading(false)
      }
      setLoading(false)
    }
  };
  
  const clickAddressPickup = (option, i, e, x, y) => handleAddress(option, i, e, x, y, true);
  const clickAddressDest = (option, i, e, x, y) => handleAddress(option, i, e, x, y, false);
  
  const handleAddress = async (option, i, e, x, y, isPickup) => {
    setLoading(true)
    try {
      const response = await axios.get(`https://geocode.maps.co/reverse?lat=${option?.geometry?.location?.lat}&lon=${option?.geometry?.location?.lng}&api_key=6661ba9a1beaa395706210lnt5f2201`);
      const addressData = response?.data?.address;
  
      const locationData = {
        name: x,
        city: addressData?.city || addressData?.town || addressData?.village || addressData?.suburb || y,
        state: addressData?.state,
        address: option?.formatted_address,
        locationdata: {
          latitude: Number(option?.geometry?.location?.lat),
          longitude: Number(option?.geometry?.location?.lng),
        },
      };
  
      if (isPickup) {
        setLoading(false)
        setLP(locationData.address);
        setOriginCity(locationData.city);
        setShippersdata(locationData);
        onChangeFields(e, i, locationData, consigneedata[i] ? consigneedata[i]:consigneedata);
      } else {
        setLoading(false)
        setDO(locationData.address);
        setDestinationCity(locationData.city);
        setConsigneedata(locationData);
        onChangeFields(e, i, shippersdata[i] ? shippersdata[i] : shippersdata, locationData);
      }
    } catch (error) {
      showErrorAlert(error);
      setLoading(false)
    } finally {
      setLoadingLocationPick(false);
      setClose('');
      setLoading(false)
    }
  };
  
  const showErrorAlert = (error) => {
    Swal.fire({
      title: error.message || "An error occurred",
      icon: "error",
      timer: 2000,
    });
  };
  
  
  
  
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
  const addTypeOfuser = async (e) => {
    e.preventDefault();
    setLoads(true);
    setLoading(true);

    // Prepare data for insertion
    const data = {
        name: addname,
        city: addcity,
        mobile: addmobile,
        address: addaddress,
        address1: addaddress1,
        address2: addaddress2,
        email: addcemail,
        country: addcountry,
        state: addlocationdata?.state?.length ? addlocationdata.state : addstate,
        locationdata: addlocationdata,
        notes: add_notes,
        internalnotes: add_notes1,
        notes1: add_notes1,
        hours: hours,
        contactName: addcname,
        contactEmail: addcemail,
        appointment: appointment,
        status: addstatus
    };

    // Determine type
    const type = (shippers && types === 'consignee') || (consignee && types === 'shippers') 
        ? 'sc' 
        : shippers 
        ? 'shippers' 
        : consignee 
        ? 'consignee' 
        : '';

    try {
        // Perform the insert operation
        const { data: insertData} = await axios.post('https://dr48nfhb-5000.use.devtunnels.ms/users-details',{entries:[{ data, type }]},{
          headers: mainHeader() 
        });

        if (!insertData) {
            throw "error"; // Handle errors thrown by Supabase
        }

        // Handle success
        handleClosetype();
        fetchUsers();
        withReactContent(Swal).fire({
            title: <i>Added!</i>,
            icon: 'success',
            timer: 2000
        });

    } catch (error) {
        // Handle errors
        setLoads(false);
        setLoading(false);
        handleClosetype();
        Swal.fire({
            title: error.message || 'An error occurred', // Ensure error message is accessible
            icon: "error",
            timer: 2000
        });
    } finally {
        // Ensure state is updated regardless of success or failure
        setLoads(false);
        setLoading(false);
    }
};

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

  const bulkMoveLoad = async () => {
    setLoading(true)
    const dataDelete = deletedata?.map(x =>  {
      return {
      id:x?.id,
      isDeleted: false
      }
  })

  try {
    const { data:c} = await axios.put(`https://dr48nfhb-5000.use.devtunnels.ms/trackers-info/bulk-update`,{IDs:dataDelete},{
      headers: mainHeader() 
    })

      if (!c) {
          throw "error";
      }
      fetchLoad();
      withReactContent(Swal).fire({
          title: <i>Recovered Loads!</i>,
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
      setLoading(false);
      setColoumn(false);
      setEdit(false);
      handleClose();
      withReactContent(Swal).fire({
          title: error.message || 'An error occurred',
          icon: 'error',
          timer: 2000
      });
  }
  }

  const openColumn = () => {
    setColoumn(true)
  }

  const handleSendNotification = async (json) => {
    try {
      const response = await axios.post('https://dr48nfhb-5000.use.devtunnels.ms/send_notification', {message:json.message,trackingId:json.trackingId,title:json.title},{
        headers: mainHeader()
      });
      withReactContent(Swal).fire({
        title: <i>{response.message}</i>,
        icon: 'success',
        timer: 2000
    });
    } catch (error) {
      withReactContent(Swal).fire({
        title: <i>Failed to send notification!</i>,
        icon: 'error',
        timer: 2000
    });
    }
  };

  return (
    <>
      {loading ? <LoadingPage/> :
      <div className='content-bar'>
        {map ? <>
          <ColumnData rows={load} columns={feild} bulkdel={bulkDeleteLoad} bulkmove={bulkMoveLoad} openColumn={openColumn}/>
        </> :
          <>
            <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={2} xl={2} onClick={() => mapHide()} style={{ fontSize: '20px', fontWeight: 600, cursor: 'pointer', color: '#fff', textAlign: 'center' }}><Item style={{ color: '#fff',background: '#000', fontWeight: 600 }}>Back to Tracking</Item></Grid>
              <Grid item xs={12} sm={12} md={2} xl={2}><Item style={{ textAlign: 'left', fontWeight: 600 }}>Tracking ID:<strong>{' '}{mapdata?.trackingId}</strong></Item></Grid>
              <Grid item xs={12} sm={12} md={6} xl={6}><Item style={{ textAlign: 'left', fontWeight: 600 }}>Current Location:{' '}{mapdata?.locationLogs[mapdata?.locationLogs?.length - 1]?.address}</Item></Grid>
              {/* <Grid item xs={12} sm={12} md={2} xl={2}><Item style={{textAlign:'left',fontWeight:600}}>Email:{mapdata?.email}</Item></Grid> */}
              <Grid item xs={12} sm={12} md={2} xl={2}><Item style={{ textAlign: 'left', fontWeight: 600 }}>Phone:{' '}{mapdata?.mobile}</Item></Grid>
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
          <DialogTitle className='add_title' sx={{ height: '8vh', textAlign: 'center' }}><p style={{ margin: 'auto' }}>Add New Load Tracking</p></DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <Container>
                <Card style={{ border: 'none' }}>
                  <Card.Body >
                    <p >Tracking Method</p>
                    <Row>
                      <Col xs={12} md={12}>
                        <FormGroup>
                          <FormControlLabel control={<Switch color="default" defaultChecked style={{ color: '#555' }} />} label="Driver's Number To Load41" />
                          <FormControlLabel disabled control={<Switch color="default" defaultChecked />} label="ELD Track coming soon" />
                        </FormGroup>
                      </Col>
                      <Col xs={12} md={12}>
                        <FormControl sx={{ m: 1, width: '25ch' }}>
                          <TextField id="standard-basic" size='medium' label="Load ID" variant="standard" type="text"
                            value={loadId}
                            required
                            name='loadId'
                            onChange={handleChange}
                            error={loadId?.length == 0}
                            helperText={loadId?.length ? '' : 'Please Provide load id!'}
                          />
                          {/* {email?.length <= 0 && <p style={{color:'#555',fontSize:'10px'}}>Please Provide Email!</p>}  */}
                        </FormControl>
                        <FormControl sx={{ m: 1, width: '25ch', position: 'relative', top: 13 }}>
                          <PhoneInput
                            inputStyle={{ width: '150px', border: 'none', borderBottom: '1px solid #555' }}
                            containerStyle={{ border: 'none' }}
                            required
                            defaultCountry="us"
                            type="phone"
                            placeholder="Mobile Number"
                            value={mobile}
                            name='mobile'
                            onChange={(e) => setMobile(e)}
                          />
                          {mobile?.length <= 2 && <p style={{ color: 'red', fontSize: '10px', paddingTop: '5px' }}>Please Provide Mobile Number!</p>}
                        </FormControl>
                        <FormControl sx={{ m: 1, width: '25ch' }}>
                          <TextField id="standard-basic" size='medium' label="Email" variant="standard" type="email"
                            value={email}
                            // required
                            name='email'
                            onChange={handleChange} />
                          {/* {email?.length <= 0 && <p style={{color:'#555',fontSize:'10px'}}>Please Provide Email!</p>}  */}
                        </FormControl>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
                <br />
                <Card className='box-card'>
                  <Card.Body >
                    {/* <Card.Title>Pick Up</Card.Title> */}
                    <Box sx={{ width: '100%' }}>
                      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChangetab} aria-label="basic tabs example" variant="scrollable" textColor="secondary" indicatorColor="secondary" sx={{ height: '5ch' }}>
                          {formdata?.shippersData?.map((x, i) => <Tab label={`shippers ${i + 1}`} {...a11yProps(i)} iconPosition="end" icon={<span style={{ marginBottom: 10 }}>{formdata?.shippersData?.length > 1 && <CancelPresentationRoundedIcon style={{ cursor: 'pointer' }} onClick={() => shippersCount(x?.id)} />}<AddBoxSharpIcon style={{ cursor: 'pointer' }} onClick={() => { addShippersdetails(i) }} /></span>} />)}
                        </Tabs>
                      </Box>
                      <Tooltip title='Add Shippers'><AddBoxIcon style={{ cursor: 'pointer', position: 'relative', float: 'left' }} onClick={() => setShippers(true)} /></Tooltip>
                      {formdata?.shippersData?.map((x, i) =>
                        <CustomTabPanel key={x?.id} value={value} index={i}>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            <FormControl sx={{ m: 1, width: '25ch' }}>
                              <Autocomplete
                                disableClearable={true}
                                value={x?.shipper || ship}
                                inputValue={x?.shipper || ship}
                                open={close == 'shipper'}
                                disablePortal
                                id="combo-box-demo"
                                getOptionSelected={(option, value) => (option?.data?.name || option?.data?.Name) === (value?.data?.name || value?.data?.Name)}
                                getOptionLabel={option => option?.data?.name  || option?.data?.Name}
                                onClose={() => { fetchUsers(); setClose(''); }}
                                //open={so}
                                // getOptionLabel={(option) => option?.name??''}
                                options={shippersDropdown}
                                //sx={{ width: 300 }}
                                renderInput={(params) => <TextField required error={x?.shipper?.length == 0} {...params} label="Shipper" focused={ship?.length} variant="standard" value={ship} onChange={(e) => { handleChange(e); onChangeFields(e, i) }} name='shippers_name'
                                  // renderOption={(props, option) => (<p  value={option.name}>{option.name},{option.address}<br/>,{option.address1},{option.address2},</p>)}
                                  helperText={x?.shipper?.length ? '' : 'please choose shippers'}
                                />}
                                renderOption={(props, option) => (
                                  <li {...props} key={option?.id} onClick={(e) => { clickDatas(option?.data, i, e) }}>
                                    <Grid container alignItems="center">
                                      <Grid item>
                                        <Box
                                          // key={index}
                                          component="span"
                                          sx={{fontWeight: option?.data?.name  || option?.data?.Name ? 'bold' : 'regular',fontSize:'10px' }}
                                        >
                                          {option?.data?.name  || option?.data?.Name}
                                        </Box>
                                        <Typography variant="body2" color="text.secondary" sx={{fontSize:'10px'}}>
                                          {option?.data?.address  || option?.data?.Address},{option?.data?.city  || option?.data?.City},USA
                                        </Typography>
                                      </Grid>
                                    </Grid>
                                  </li>)}
                              />
                            </FormControl>
                            <FormControl sx={{ m: 1, width: '25ch' }}>
                              <Autocomplete
                                disableClearable={true}
                                loading={loadingLocationPickup}
                                value={x?.locationP}
                                inputValue={x?.locationP}
                                disablePortal
                                id="combo-box-demo"
                                getOptionSelected={(option, value) => option?.formatted_address
                                  === value?.formatted_address
                                }
                                getOptionLabel={option => option?.formatted_address ?? ""}
                                onClose={() => { setClose('') }}
                                open={close == 'LP'}
                                // getOptionLabel={(option) => option?.name??''}
                                filterOptions={(options) => options}
                                options={locationPickup}
                                //sx={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} required error={x?.locationP?.length == 0} helperText={x?.locationP ? '' : 'please enter location name'} focused={x?.locationP?.length ? true : x?.shippersData?.address ? true : LP?.length ? true : false} label="Location Name" variant="standard" type="text" name='location_name_pickup' value={x?.locationP?.length} onChange={(e) => { handleChange(e); onChangeFields(e, i); }} />}
                                renderOption={(props, option) => (
                                  <li {...props} key={option?.place_id} onClick={(e) => { clickAddressPickup(option, i, e, x?.shipper?.length ? x?.shipper : x.shippersData?.name ? x.shippersData?.name : ship, x?.originCity?.length ? x?.originCity : x?.shippersData?.city ? x?.shippersData?.city : originCity) }}>
                                    <Grid container alignItems="center">
                                      <Grid item>
                                        <Box
                                          // key={index}
                                          component="span"
                                          sx={{ fontWeight: option?.formatted_address ? 'bold' : 'regular', fontSize: '10px' }}
                                        >
                                          {option.formatted_address}
                                        </Box>
                                      </Grid>
                                    </Grid>
                                  </li>)}
                              />
                            </FormControl>
                            <FormControl sx={{ m: 1, width: '25ch' }}>
                              <Autocomplete
                                disableClearable={true}
                                loading={loadingLocationPickup}
                                value={x?.originCity}
                                inputValue={x?.originCity}
                                disablePortal
                                id="combo-box-demo"
                                getOptionSelected={(option, value) => option?.formatted_address
                                  === value?.formatted_address
                                }
                                getOptionLabel={option => option?.formatted_address ?? ""}
                                onClose={() => { setClose('') }}
                                open={close == 'originCity'}
                                // getOptionLabel={(option) => option?.name??''}
                                filterOptions={(options) => options}
                                options={locationPickupcity}
                                //sx={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} required error={x?.originCity?.length == 0} label="City" focused={x?.originCity?.length} variant="standard" value={x?.originCity} helperText={x?.originCity?.length ? '' : 'Please your city'} name='originCity' onChange={(e) => { handleChange(e); onChangeFields(e, i); }} />}
                                renderOption={(props, option) => (
                                  <li {...props} key={option?.place_id} onClick={(e) => { clickAddressPickup(option, i, e, x?.shipper?.length ? x?.shipper : x.shippersData?.name ? x.shippersData?.name : ship, x?.originCity?.length ? x?.originCity : x?.shippersData?.city ? x?.shippersData?.city : originCity) }}>
                                    <Grid container alignItems="center">
                                      <Grid item >
                                        <Box
                                          // key={index}
                                          component="span"
                                          sx={{ fontWeight: option?.formatted_address ? 'bold' : 'regular', fontSize: '10px' }}
                                        >
                                          {option.formatted_address}
                                        </Box>
                                      </Grid>
                                    </Grid>
                                  </li>)}
                              />
                            </FormControl>
                            {/* // <FormControl sx={{ m: 1,width:'25ch' }} variant="standard">
        // <TextField required error={x?.originCity?.length == 0} label="City" focused={x?.originCity?.length} variant="standard" value={x?.originCity} helperText={x?.originCity?.length ? '':'Please your city'} name='originCity' onChange={(e)=>{handleChange(e);onChangeFields(e,i);}}/>
        // </FormControl> */}
                            <FormControl fullWidth sx={{ m: 1, width: '25ch' }}>
                              <TextField required error={x?.pickUpDate?.length == 0} focused id="standard-basic" inputProps={{ min: edit ? '' : formatDate(new Date()) }} helperText={x?.pickUpDate?.length ? '' : 'Please provide a Pickup Date.'} fullWidth={5} onFocus={onFocus} onBlur={onBlur} size='medium' label="Pickup Dates" variant="standard" type="date" name='Pick up Dates' value={x?.pickUpDate} onChange={(e) => { onChangeFields(e, i) }} />
                            </FormControl>
                            <FormControl fullWidth sx={{ m: 1, width: '15ch' }} variant="standard">
                              <TextField
                                select
                                focused id="standard-basic" helperText={x?.pickUpHours?.length ? '' : 'provide a Pickup Hours.'} fullWidth={5} onFocus={onFocus} onBlur={onBlur} size='medium' label="Pickup Hours" variant="standard" type="time" name='Pick up Hours' value={x?.pickUpHours} onChange={(e) => { onChangeFields(e, i) }} 
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
                            {/* <FormControl fullWidth sx={{ m: 1, width: '15ch' }}>
                              <TextField focused id="standard-basic" helperText={x?.pickUpHours?.length ? '' : 'provide a Pickup Hours.'} fullWidth={5} onFocus={onFocus} onBlur={onBlur} size='medium' label="Pickup Hours" variant="standard" type="time" name='Pick up Hours' value={x?.pickUpHours} onChange={(e) => { onChangeFields(e, i) }} />
                            </FormControl> */}
                            <FormControl sx={{ m: 1, width: '25ch' }} variant="filled">
                              <TextField helperText={x?.notesPickup?.length ? '' : 'Please provide a valid Notes.'} id="standard-basic" label="Notes" variant="standard" type="text" value={x?.notesPickup} onChange={(e) => { onChangeFields(e, i) }} name='notes_pickup' />
                            </FormControl>
                          </Box>
                        </CustomTabPanel>
                      )
                      }
                    </Box>

                  </Card.Body>
                </Card>
                <br />
                <Card className='box-card'>
                  <Card.Body >
                    <Box sx={{ width: '100%' }}>
                      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={valuex} onChange={handleChangetabx} sx={{ height: '5ch' }} variant="scrollable" aria-label="basic tabs example" textColor="secondary" indicatorColor="secondary">
                          {formdata?.consigneeData?.map((x, i) => <Tab label={`consignee ${i + 1}`} {...a11yProps(i)} iconPosition="end" icon={<span style={{ marginBottom: 10 }}>{formdata?.consigneeData?.length > 1 && <CancelPresentationRoundedIcon style={{ cursor: 'pointer' }} onClick={() => conCount(x?.id)} />}<AddBoxSharpIcon style={{ cursor: 'pointer' }} onClick={() => { addCondetails(i) }} /></span>} />)}
                        </Tabs>
                      </Box>
                      <Tooltip title='Add Consignee'><AddBoxIcon style={{ cursor: 'pointer', position: 'relative', float: 'left' }} onClick={() => setConsignee(true)} /></Tooltip>
                      {formdata?.consigneeData?.map((x, i) =>
                        <CustomTabPanel key={x?.id} value={valuex} index={i}>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            <FormControl sx={{ m: 1, width: '25ch' }}>
                              <Autocomplete
                                disableClearable={true}
                                disablePortal
                                onClose={() => { fetchUsers(); setClose(''); }}
                                value={x?.consignee || con}
                                inputValue={x?.consignee || con}
                                id="combo-box-demo"
                                open={close == 'consignee'}
                                getOptionSelected={(option, value) => option?.data?.name === value?.data?.name}
                                getOptionLabel={option => option?.data?.name}
                                options={consigneeDropdown}
                                //sx={{ width: 300 }}
                                renderInput={(params) => <TextField required error={x?.consignee?.length == 0} {...params} value={con} focused={con?.length} onChange={(e) => { handleChange(e); onChangeFields(e, i); }} name='consignee_name' label="Consignee" variant="standard"
                                  helperText={x?.consignee?.length ? '' : 'please choose consignee'}
                                />}
                                renderOption={(props, option) => (
                                  <li {...props} key={option?.id} onClick={(e) => { clickDatac(option?.data, i, e) }}>
                                    <Grid container alignItems="center">
                                      <Grid item>
                                        <Box
                                          // key={index}
                                          component="span"
                                          sx={{fontWeight: option?.data?.name  || option?.data?.Name ? 'bold' : 'regular',fontSize:'10px' }}
                                        >
                                          {option?.data?.name  || option?.data?.Name}
                                        </Box>
                                        <Typography variant="body2" color="text.secondary" sx={{fontSize:'10px'}}>
                                          {option?.data?.address  || option?.data?.Address},{option?.data?.city  || option?.data?.City},USA
                                        </Typography>
                                      </Grid>
                                    </Grid>
                                  </li>)}
                              />
                            </FormControl>
                            <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                              <Autocomplete
                                disableClearable={true}
                                loading={loadinLocationDrop}
                                value={x?.locationD}
                                inputValue={x?.locationD}
                                disablePortal
                                id="combo-box-demo"
                                getOptionSelected={(option, value) => option?.formatted_address
                                  === value?.formatted_address
                                }
                                getOptionLabel={option => option?.formatted_address ?? ""}
                                onClose={() => { fetchUsers(); setClose(''); }}
                                open={close == 'LD'}
                                // getOptionLabel={(option) => option?.name??''}
                                options={locationDest}
                                filterOptions={(options) => options}
                                //sx={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} required error={x?.locationD?.length == 0} helperText={x?.locationD ? '' : 'Please provide a Location Name.'} id="standard-basic" label="Location Name" variant="standard" type="text" focused={x?.locationD?.length} value={x?.locationD} name='location_name_dropoff' onChange={(e) => { handleChange(e); onChangeFields(e, i); }} />}
                                renderOption={(props, option) => (
                                  <li {...props} key={option?.place_id} onClick={(e) => { clickAddressDest(option, i, e, x?.consignee?.length ? x?.consignee : x?.consigneeData?.name ? x?.consigneeData?.name : con, x?.destinationCity?.length ? x?.destinationCity : x?.consigneeData?.city?.length ? x.consigneeData?.city : destinationCity) }}>
                                    <Grid container alignItems="center">
                                      <Grid item>
                                        <Box
                                          // key={index}
                                          component="span"
                                          sx={{ fontWeight: option.formatted_address ? 'bold' : 'regular', fontSize: '10px' }}
                                        >
                                          {option.formatted_address}
                                        </Box>
                                      </Grid>
                                    </Grid>
                                  </li>)}
                              />
                            </FormControl>
                            <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                              <Autocomplete
                                disableClearable={true}
                                loading={loadinLocationDrop}
                                value={x?.destinationCity}
                                inputValue={x?.destinationCity}
                                disablePortal
                                id="combo-box-demo"
                                getOptionSelected={(option, value) => option?.formatted_address
                                  === value?.formatted_address
                                }
                                getOptionLabel={option => option?.formatted_address ?? ""}
                                onClose={() => { fetchUsers(); setClose(''); }}
                                open={close == 'destinationCity'}
                                // getOptionLabel={(option) => option?.name??''}
                                options={locationDestcity}
                                filterOptions={(options) => options}
                                //sx={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} label="City" required error={x?.destinationCity?.length == 0} focused={x?.destinationCity?.length} variant="standard" value={x?.destinationCity} helperText={x?.destinationCity?.length ? '' : 'Please your city'} name='destinationCity' onChange={(e) => { handleChange(e); onChangeFields(e, i); }} />}
                                renderOption={(props, option) => (
                                  <li {...props} key={option?.place_id} onClick={(e) => { clickAddressDest(option, i, e, x?.consignee?.length ? x?.consignee : x?.consigneeData?.name ? x?.consigneeData?.name : con, x?.destinationCity?.length ? x?.destinationCity : x?.consigneeData?.city?.length ? x.consigneeData?.city : destinationCity) }}>
                                    <Grid container alignItems="center">
                                      <Grid item >
                                        <Box
                                          // key={index}
                                          component="span"
                                          sx={{ fontWeight: option.formatted_address ? 'bold' : 'regular', fontSize: '10px' }}
                                        >
                                          {option.formatted_address}
                                        </Box>
                                      </Grid>
                                    </Grid>
                                  </li>)}
                              />
                            </FormControl>
                            {/* // <FormControl fullWidth sx={{ m: 1,width:'25ch' }} variant="standard">
        // <TextField label="City" required error={x?.destinationCity?.length == 0} focused={x?.destinationCity?.length} variant="standard" value={x?.destinationCity} helperText={x?.destinationCity?.length ? '':'Please your city'} name='destinationCity' onChange={(e)=>{handleChange(e);onChangeFields(e,i);}}/>
        // </FormControl> */}
                            <FormControl fullWidth sx={{ m: 1, width: '25ch' }} variant="standard">
                              <TextField required error={x?.dropOffDate?.length == 0} inputProps={{ min: formatDate(new Date()) }} focused helperText={x?.dropOffDate?.length ? '' : 'Please provide a Drop off Date'} id="outlined-basic" onFocus={onFocus} onBlur={onBlur} fullWidth={5} label="Drop off dates" variant="standard" type="date" value={x?.dropOffDate} onChange={(e) => { onChangeFields(e, i); }} name='dropoff_date' />
                            </FormControl>
                            <FormControl fullWidth sx={{ m: 1, width: '15ch' }} variant="standard">
                              <TextField
                                select
                                focused helperText={x?.dropOffHours?.length ? '' : 'provide a Drop off hours'} id="outlined-basic" onFocus={onFocus} onBlur={onBlur} fullWidth={5} label="Drop off Hours" variant="standard" type="time" value={x?.dropOffHours} onChange={(e) => { onChangeFields(e, i); }} name='dropoff_hours' 
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
                            {/* <FormControl fullWidth sx={{ m: 1, width: '15ch' }} variant="standard">
                              <TextField focused helperText={x?.dropOffHours?.length ? '' : 'provide a Drop off hours'} id="outlined-basic" onFocus={onFocus} onBlur={onBlur} fullWidth={5} label="Drop off Hours" variant="standard" type="time" value={x?.dropOffHours} onChange={(e) => { onChangeFields(e, i); }} name='dropoff_hours' />
                            </FormControl> */}
                            <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                              <TextField id="outlined-basic" helperText={x?.notesDropoff?.length ? '' : 'Please provide a valid Notes'} label="Notes" variant="standard" type="text" value={x?.notesDropoff} onChange={(e) => { onChangeFields(e, i); }} name='notes_dropoff' />
                            </FormControl>
                          </Box>
                        </CustomTabPanel>
                      )}
                    </Box>
                  </Card.Body>
                </Card>
                <br />
                {/* <div className='box-card1'>
            <p className='body_title'>Load being Tracked</p>
            <h6>Pickup and delivery</h6>
            <br/>
            <Container className='row-cont1'>
        {originData?.latitude && destinationData?.latitude ? <Row className='box_container1'><Col md={12}><Col xs={12} md={12}><div className='box1'></div>{''}<span>{originCity}</span></Col><Col xs={12} md={12}><div className='box_line1'></div></Col><Col xs={12} md={12}><div className='box1'></div>{''}<span>{destinationCity}</span></Col></Col>
           <Col md={12}>
              <MapContainer
          center={[(originData?.latitude + destinationData?.latitude)/2, (originData?.longitude + destinationData?.longitude)/2]}
          zoom={13}
          scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[originData?.latitude,originData?.longitude]}>
            <Popup>{originCity}</Popup>
          </Marker>
          <Marker position={[destinationData?.latitude,destinationData?.longitude]}>
            <Popup>{destinationCity}</Popup>
          </Marker>
        </MapContainer>
        </Col>
        </Row>:''}
        </Container>
        </div> */}
                 <Button className='button_add1' type='submit' name='mainButton' onClick={()=>setButtonName('mainButton')}>
          {edit ? 'Update' : 'Generate'}
        </Button>
        {!edit && (
          <Button className='button_add1' type='submit1' name='secondaryButton' onClick={()=>setButtonName('secondaryButton')}>
            {loads ? <Spinner animation="border" role="status" /> : 'Generate and Text message'}
          </Button>
        )}
              </Container>
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
          open={message}
          onClose={handleCloseMessage}
          PaperProps={{
            component: 'form',
            onSubmit: handleSubmitMessage,
          }}
        >
          <DialogTitle>Send Message</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To send message to driver, please enter your message here. We
              will send updates occasionally.
            </DialogContentText>
            <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="trackingId"
            label="Tracking ID"
            type="text"
            fullWidth
            variant="outlined"
            value={formValues.trackingId}
            onChange={handleChangeMessage}
          />
          <TextField
            autoFocus
            required
            id="title"
            name="title"
            label="Title"
            margin="dense"
            type="text"
            fullWidth
            variant="outlined"
            value={formValues.title}
            onChange={handleChangeMessage}
          />
          <TextField
            autoFocus
            required
            multiline
            rows={5}
            id="message"
            name="message"
            label="Message to Driver"
            type="text"
            fullWidth
            variant="outlined"
            value={formValues.message}
            onChange={handleChangeMessage}
          />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseMessage}>Cancel</Button>
            <Button type="submit">Send Message</Button>
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
            <form onSubmit={addTypeOfuser}>
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
                        variant="standard"
                      />
                    </FormControl>
                    <FormControl sx={{ m: 1, width: '25ch' }} xs={12} sm={12} md={6} xl={6}>
                      <Autocomplete
                        disableClearable={true}
                        loading={loadinglocation}
                        disablePortal
                        value={addaddress}
                        inputValue={addaddress}
                        open={close == 'address'}
                        onClose={() => setClose('')}
                        id="combo-box-demo"
                        getOptionSelected={(option, value) => option?.formatted_address
                          === value?.formatted_address
                        }
                        getOptionLabel={option => option?.formatted_address ?? ""}
                        filterOptions={(options) => options}
                        options={addressList}
                        //sx={{ width: 300 }}
                        renderInput={(params) => <TextField
                          {...params}
                          id="standard-basic"
                          name='add_address'
                          label="Address"
                          variant="standard"
                          required
                          error={addaddress?.length == 0}
                          helperText={addaddress?.length > 0 ? '' : 'please enter address'}
                          value={addaddress}
                          onChange={handleChange}
                        />}
                        renderOption={(props, option) => (
                          <li {...props} key={option?.place_id} value={option.formatted_address} onClick={() => {
                            setAddcity(option?.address_components?.filter(x => x.types[0] == 'locality')[0]?.long_name); setAddstate(option?.address_components?.filter(x => x.types[0] == 'administrative_area_level_1')[0]?.short_name); setAddaddress(option.formatted_address); setAddlocationdata({
                              latitude: Number(option?.geometry?.location?.lat),
                              longitude: Number(option?.geometry?.location?.lng),
                              state: option?.address_components?.filter(x => x.types[0] == 'administrative_area_level_1')[0]?.short_name
                            }); setClose('')
                          }}>
                            <Grid container alignItems="center">
                              {/* <Grid item sx={{ display: 'flex', width: 44 }}>
                <LocationOnIcon sx={{ color: 'text.secondary' }} />
              </Grid> */}
                              <Grid item sx={{ width: 'calc(100% - 44px)' }}>
                                <Box
                                  // key={index}
                                  component="span"
                                  sx={{ fontWeight: option.formatted_address ? 'bold' : 'regular', fontSize: '10px' }}
                                >
                                  {option.formatted_address}
                                </Box>
                              </Grid>
                            </Grid>
                          </li>)}
                      />
                    </FormControl>
                    <FormControl sx={{ m: 1, width: '25ch' }} xs={12} sm={12} md={6} xl={6}>
                      <TextField
                        id="standard-basic"
                        label="Address 2"
                        variant="standard"
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
                        variant="standard"
                      />
                    </FormControl>
                    <FormControl sx={{ m: 1, width: '25ch' }} xs={12} sm={12} md={6} xl={6}>
                      <Autocomplete
                        disableClearable={true}
                        loading={loadinglocation}
                        disablePortal
                        value={addcity}
                        inputValue={addcity}
                        open={close == 'city'}
                        onClose={() => setClose('')}
                        id="combo-box-demo"
                        getOptionSelected={(option, value) => option?.formatted_address
                          === value?.formatted_address
                        }
                        getOptionLabel={option => option?.formatted_address ?? ""}
                        filterOptions={(options) => options}
                        options={addressListcity}
                        //sx={{ width: 300 }}
                        renderInput={(params) => <TextField
                          {...params}
                          type='text' id="standard-basic" label="City"
                          required error={addcity?.length == 0} variant="standard" value={addcity} helperText={addcity?.length > 0 ? '' : 'please enter city'} name='add_city' onChange={handleChange}
                        />}
                        renderOption={(props, option) => (
                          <li {...props} key={option?.place_id} value={option.formatted_address} onClick={() => {
                            setAddcity(option?.address_components?.filter(x => x.types[0] == 'locality')[0]?.long_name); setAddstate(option?.address_components?.filter(x => x.types[0] == 'administrative_area_level_1')[0]?.short_name); setAddaddress(option.formatted_address); setAddlocationdata({
                              latitude: Number(option?.geometry?.location?.lat),
                              longitude: Number(option?.geometry?.location?.lng),
                              state: option?.address_components?.filter(x => x.types[0] == 'administrative_area_level_1')[0]?.short_name
                            }); setClose('')
                          }}>
                            <Grid container alignItems="center">
                              {/* <Grid item sx={{ display: 'flex', width: 44 }}>
                <LocationOnIcon sx={{ color: 'text.secondary' }} />
              </Grid> */}
                              <Grid item sx={{ width: 'calc(100% - 44px)' }}>
                                <Box
                                  // key={index}
                                  component="span"
                                  sx={{ fontWeight: option.formatted_address ? 'bold' : 'regular', fontSize: '10px' }}
                                >
                                  {option.formatted_address}
                                </Box>
                              </Grid>
                            </Grid>
                          </li>)}
                      />
                    </FormControl>
                    {/* <FormControl sx={{m:1,width:'25ch'}} xs={12} sm={12} md={6} xl={6}>
        <TextField type='text' id="standard-basic" label="City"
          required error={addcity?.length == 0} variant="standard" value={addcity} helperText={addcity?.length > 0 ? '':'please enter city'} name='add_city' onChange={handleChange} />
        </FormControl> */}
                    <FormControl variant="standard" sx={{ m: 1, width: '25ch' }} xs={12} sm={12} md={6} xl={6}>
                      {/* <InputLabel id="demo-simple-select-standard-label">State</InputLabel> */}
                      <TextField type='text' id="standard-basic" label="State"
                        required error={addstate?.length == 0} variant="standard" value={addstate} helperText={addstate?.length > 0 ? '' : 'please enter state'} name='add_state' onChange={handleChange} />
                      {/* <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select-standard"
          label="State" variant="standard" MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }} onFocus={()=>{if(cityList.length<=0)setCityList(USA)}} required value={addlocationdata?.state?.length ? addlocationdata?.state:addstate} name='add_state' onChange={handleChange}
        >
          {addlocationdata?.length && <MenuItem value={addlocationdata?.state}>{addlocationdata?.state}</MenuItem>}
          {!addlocationdata?.length && cityList.slice(0,50).map(r=><MenuItem value={r?.state}>{r?.state}</MenuItem>)}
        </Select> */}
                    </FormControl>
                    <FormControl sx={{ m: 1, width: '25ch' }} xs={12} sm={12} md={6} xl={6}>
                      <TextField
                        id="standard-basic"
                        label="Country"
                        name='add_country'
                        value={addcountry}
                        variant="standard"
                        onChange={handleChange}
                        helperText={addcountry?.length > 0 ? '' : 'please enter country'}
                        disabled
                      />
                    </FormControl>
                    <FormControl sx={{ m: 1, width: '25ch' }} xs={12} sm={12} md={6} xl={6}>
                      <TextField
                        id="standard-search"
                        label="Contact Email"
                        variant="standard"
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
                        variant="standard"
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
                        variant="standard"
                        name='hours'
                        type='text'
                        value={hours}
                        onChange={handleChange}
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
                        name="add_status"
                        onChange={handleChange}
                        value={addstatus}
                      >
                        <FormControlLabel value="active" control={<Radio />} label="Active" />
                        <FormControlLabel value="inactive" control={<Radio />} label="Inactive" />
                      </RadioGroup>
                    </FormControl><br />
                    <Button type='submit' style={{ backgroundColor: '#313b4c' }}>{loads ? 'loading' : 'submit'}</Button>
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
                        variant="standard"
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
                        variant="standard"
                        name='add_notes1'
                        value={add_notes1}
                        onChange={handleChange}
                      />
                    </FormControl>
                  </Box>
                </CustomTabPanel>
              </Box>
            </form>
          </DialogContent>
        </Dialog>
      </React.Fragment>
    </>
  )
}

export default TrashCan
