import DeleteIcon from '@mui/icons-material/Delete';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Autocomplete, Checkbox, DialogContentText, DialogTitle, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import FormControl from '@mui/material/FormControl';
import Paper from '@mui/material/Paper';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Button, Col, Row, Spinner } from "react-bootstrap";

import Draggable from 'react-draggable';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { USA } from '../Json/Cities';
import { supabase } from '../firebase';
import ColumnData from './Table';
import { CSV, deleteData, page_count, shareType } from '../Reducers/userReducer';
import CSVReader from './CSVReader';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
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


const ConsigneeList = () => {
  const [mobile, setMobile] = React.useState('')
  //const[map,setMap] = React.useState(true)
  const [coloumn, setColoumn] = React.useState(false)
  const [comment, setComment] = React.useState('')
  const [datetime, setDatetime] = React.useState('')
  const [destinationCity, setDestinationCity] = React.useState('')
  const [destinationStateProv, setDestinationStateProv] = React.useState('')
  const [dispatcher, setDispatcher] = React.useState('')
  const [earliestAvailability, setEarliestAvailability] = React.useState('')
  const [equipmentType, setEquipmentType] = React.useState('')
  const [latestAvailability, setLatestAvailability] = React.useState('')
  const [loadId, setLoadId] = React.useState(mobile.slice(8, 11) + Math.floor(10000 + Math.random() * 90000))
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
  const aid = useSelector((state) => state.user?.appleID)
  const uid = useSelector((state) => state.user?.userID)
  const trid = useSelector((state) => state.user?.docid)
  const load = useSelector((state) => state?.user?.cell)
  const map = useSelector((state) => state?.user?.maps)
  const mapdata = useSelector((state) => state?.user?.mapData)
  const [cell, setCell] = React.useState(load)
  const [location, setLocation] = React.useState()
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
  const consigneecsv = useSelector((state) => state.user?.csv)
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
  const [types, setTypes] = React.useState('consignee')
  const [addstatus, setAddstatus] = React.useState('active')
  const [add_notes, setAdd_notes] = React.useState('')
  const [add_notes1, setAdd_notes1] = React.useState('')
  const [shippersdata, setShippersdata] = React.useState([])
  const [consigneedata, setConsigneedata] = React.useState([])
  const [ship, setShip] = React.useState('')
  const [con, setCon] = React.useState('')
  const [users, setUsers] = React.useState([])
  const [docuserID, setDocuserID] = React.useState([])
  const [error, setError] = React.useState(true)
  const [list, setList] = React.useState(true)
  const [so, setSo] = React.useState(false)
  const [deliveryProofPhotos, setDeliveryProofPhotos] = React.useState([])
  const [locationLogs, setLocationLogs] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [isDeleted, setIsDeleted] = React.useState(false)
  const [uids, setUids] = React.useState('')
  const [logs, setLogs] = React.useState([])
  const [alerts, setAlerts] = React.useState(false)
  const [deleteid, setDeleteid] = React.useState('')
  const [deleteindex, setDeleteindex] = React.useState('')
  const [locationPickup, setLocationPickup] = React.useState([])
  const [locationDest, setLocationDest] = React.useState([])
  const [addressList, setAddressList] = React.useState([])
  const [loadinglocation, setLoadinglocation] = React.useState(false)
  const [close, setClose] = React.useState('')
  const [addressListcity, setAddressListcity] = React.useState([])
  const deleteOpen = (id, index) => {
    setAlerts(true)
    setDeleteid(id)
  }

  const handleCloseAlert = () => {
    setAlerts(false)
    setDeleteid('')
    setDeleteindex('')
  }
  React.useEffect(() => {
    dispatch(page_count(0))
    dispatch(deleteData([]));
    fetchUsers()
  }, [])

  const updateUser = async (e) => {
    e.preventDefault()
    setLoads(true)
    setLoading(true)
    const data = {
      name: addname,
      city: addcity,
      mobile: addmobile,
      address: addaddress,
      address1: addaddress1,
      address2: addaddress2,
      email: addcemail,
      country: addcountry,
      state: addstate || addlocationdata?.state,
      locationdata: addlocationdata,
      notes: add_notes,
      internalnotes: add_notes1,
      notes1: add_notes1,
      contactName: addcname,
      contactEmail: addcemail,
      appointment: appointment,
      status: addstatus
    };

    try {
      const { docRef} = await axios.put(`https://dr48nfhb-5000.use.devtunnels.ms/users-details/${d_ID}`,{data:data,type:types},{
        headers: mainHeader()
      })
      setLoading(false)
      fetchUsers()
      withReactContent(Swal).fire({
        title: <i>Updated!</i>,
        icon: 'success',
        timer: 2000
      });
      setLoads(false)
      
      setColoumn(false)
      setEdit(false)
      handleClose()
    }
    catch (error) {
      setLoads(false)
      setColoumn(false)
      setEdit(false)
      setLoading(false)
      handleClose()
      withReactContent(Swal).fire({
        title: error,
        icon: 'error',
        timer: 2000
      });
    }
  }
  const deleteLoad = async () => {
    setLoading(true)
    try {
      const { docRef } = await axios.delete(`https://dr48nfhb-5000.use.devtunnels.ms/users-details/${deleteid}`,{
        headers: mainHeader()
      })
      setLoading(false)
      withReactContent(Swal).fire({
        title: <i>deleted!</i>,
        icon: 'success',
        timer: 2000
      });
      fetchUsers();
    } catch (e) {
      setLoading(false)
      
    }
  }
  const handleClosetype = () => {
    setEdit(false)
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
  const addTypeOfuser = async (e) => {
    e.preventDefault()
    setLoads(true)
    setLoading(true)
    try {
      const { data: docRef} = await axios.post('https://dr48nfhb-5000.use.devtunnels.ms/users-details',{entries:[{
        data:{
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
        status: addstatus
        },
        type: types
       }]},{
        headers: mainHeader()
      });
      handleClosetype()
      handleClose()
      fetchUsers()
      withReactContent(Swal).fire({
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
      handleClose();
      Swal.fire({
        title: e,
        icon: "error"
      });
    }
  }
  const handleClose = () => {
    setError(false)
    setEdit(false)
    setValuex(0)
    setValue(0)
    setTabcountconsignee([1])
    setShip('');
    setCon('')
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
    setStatus('');
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
    setStatus('');
    setCreated_at('');
    setShippersdata([]);
    setConsigneedata([]);
  }
  const handleChangeShippers = (e, newValue) => {
    setValues(newValue);
    
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
        setLoadinglocation(true)
        setAddaddress(event.target.value);
        await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${event.target.value?.length ? event.target.value : 1}&key=AIzaSyAjozP-lwYIgqNHXLXiLUtJIyXA0jBtIGU`).then(z => {
          setAddressList(z?.data?.results)
          setLoadinglocation(false)
          
          setClose('address')
        }).catch(error => {
          Swal.fire({
            title: error,
            icon: "error",
            timer: 2000
          });
        })
        break;
      case "add_address1":
        setAddaddress1(event.target.value);
        break;
      case "add_address2":
        setAddaddress2(event.target.value);
        break;
      case "add_city":
        setAddcity(event.target.value);
        if (!addstate?.length) {
          setLoadinglocation(true)
          await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${event.target.value?.length ? event.target.value : 1}&key=AIzaSyAjozP-lwYIgqNHXLXiLUtJIyXA0jBtIGU`).then(u => {
            setAddressListcity(u?.data?.results)
            setLoadinglocation(false)
            
            setClose('city')
          }).catch(error => {
            Swal.fire({
              title: error,
              icon: "error",
              timer: 2000
            });
          })
        }
        break;
      case "add_state":
        setAddstate(event.target.value);
        if (keyword !== '') {
          function filterByValue(array, string) {
            return array.filter(o =>
              Object.keys(o).some(k => String(o[k])?.toLowerCase().includes(string?.toLowerCase())));
          }
          setCityList(filterByValue(USA, keyword))
        }
        else {
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
        if (appointment?.length) { setAppointment('') } else { setAppointment(event.target.value) };
        break;
      case "types":
        if (types?.length) { setTypes('') } else { setTypes(event.target.value) }
        break;
      case "add_status":
        setAddstatus(event.target.value)
        break;
      case "hours":
        setHours(event.target.value);
        break;
      case "location_name_pickup":
        //setLoadingLocationPick(true)
        await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${event.target.value?.length ? event.target.value : 1}&key=AIzaSyAjozP-lwYIgqNHXLXiLUtJIyXA0jBtIGU`).then(y => {
          setLP(event.target.value);
          setLocationPickup(y?.data?.results)
          //setLoadingLocationPick(false)
          
          setClose('LP')
        }).catch(error => {
          Swal.fire({
            title: error,
            icon: "error",
            timer: 2000
          });
        })
        break;
      case "location_name_dropoff":
        //setLoadingLocationDrop(true)
        await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${event.target.value?.length ? event.target.value : 1}&key=AIzaSyAjozP-lwYIgqNHXLXiLUtJIyXA0jBtIGU`).then(x => {
          setDO(event.target.value);
          setLocationDest(x?.data?.results)
          //setLoadingLocationDrop(false)
          setClose('LD')
        }).catch(error => {
          Swal.fire({
            title: error,
            icon: "error",
            timer: 2000
          });
        })
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
        setDestinationCity(event.target.value);
        if (!destinationStateProv?.length) {
          //setLoadingLocationPick(true)
          await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${event.target.value?.length ? event.target.value : 1}&key=AIzaSyAjozP-lwYIgqNHXLXiLUtJIyXA0jBtIGU`).then(v => {
            //setLocationPickupcity(v?.data?.results)
            //setLocationDestcity(false)
            
            setClose('destinationCity')
          }).catch(error => {
            Swal.fire({
              title: error,
              icon: "error",
              timer: 2000
            });
          })
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
        setEquipmentType(event.target.value);
        break;
      case "latestAvailability":
        setLatestAvailability(event.target.value);
        break;
      case "loadId":
        setLoadId(event.target.value);
        break;
      case "originCity":
        setOriginCity(event.target.value);
        if (!originStateProv?.length) {
          //setLoadingLocationPick(true)
          await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${event.target.value?.length ? event.target.value : 1}&key=AIzaSyAjozP-lwYIgqNHXLXiLUtJIyXA0jBtIGU`).then(w => {
            //setLocationPickupcity(w?.data?.results)
            //setLoadingLocationPick(false)
            
            setClose('originCity')
          }).catch(error => {
            Swal.fire({
              title: error,
              icon: "error",
              timer: 2000
            });
          })
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
        setClose('shipper')
        setShip(event.target.value);
        if (keyword !== '') {
          const results = await users?.filter(string => {
            let containsAtLeastOneWord = false;
            searchString?.forEach(word => {
              if (string?.name ?? ship?.toLowerCase().includes(word))
                containsAtLeastOneWord = true;
              if (String(string?.city)?.toLowerCase().includes(word))
                containsAtLeastOneWord = true;
            })
            if (containsAtLeastOneWord)
              return string
          })
          setUsers(results);
        } else if (keyword.length == 0) {
          fetchUsers();
        } else {
          setUsers(users);
        }

        break;
      case "consignee_name":
        setClose('consignee')
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
    }
  };
  const feild = [
    {
      field: 'action', sortable: false, disableColumnMenu: true, headerName: 'Action', width: 120, renderCell: (params) => {
        return (
          <div id={params?.id}><Tooltip title="edit"><ModeEditIcon style={{ cursor: 'pointer', height: '20px', width: '20px' }} onClick={() => updatePop(params.row.id, params.api.getAllRowIds().indexOf(params.id))} /></Tooltip><Tooltip title="delete"><DeleteIcon style={{ cursor: 'pointer', height: '20px', width: '20px' }} onClick={() => deleteOpen(params.row.id)} /></Tooltip></div>
        );
      }
    },
    { field: 'userId', headerName: 'User ID', width: 100 , valueGetter: (value, params) => {        
      let result = [];
      if (params?.id) {
        if (params?.id) {
          result.push(params?.id);
        }
      } else {
        result = ["Unknown"];
      }
      return result.join(", ");
    }},
    { field: 'name', headerName: 'Consignee', width: 180, valueGetter: (value, params) => {        
      let result = [];
      if (params?.data?.name || params?.data?.Name) {
        if (params?.data?.name || params?.data?.Name) {
          result.push(params?.data?.name || params?.data?.Name);
        }
      } else {
        result = ["Unknown"];
      }
      return result.join(", ");
    } },
    { field: 'address', headerName: 'Address', width: 180, valueGetter: (value, params) => {        
      let result = [];
      if (params?.data?.address || params?.data?.Address) {
        if (params?.data?.address || params?.data?.Address) {
          result.push(params?.data?.address || params?.data?.Address);
        }
      } else {
        result = ["Unknown"];
      }
      return result.join(", ");
    } },
    { field: 'address1', headerName: 'Address1', width: 120, valueGetter: (value, params) => {        
      let result = [];
      if (params?.data?.address1 || params?.data['Address 2'] || params?.data?.address_2) {
        if (params?.data?.address1 || params?.data['Address 2'] || params?.data?.address_2) {
          result.push(params?.data?.address1 || params?.data['Address 2'] || params?.data?.address_2);
        }
      } else {
        result = ["Unknown"];
      }
      return result.join(", ");
    }},
    { field: 'city', headerName: 'City', width: 120, valueGetter: (value, params) => {        
      let result = [];
      if (params?.data?.city || params?.data?.city) {
        if (params?.data?.city || params?.data?.city) {
          result.push(params?.data?.city || params?.data?.city);
        }
      } else {
        result = ["Unknown"];
      }
      return result.join(", ");
    } },
    { field: 'mobile', headerName: 'Mobile', width: 120, valueGetter: (value, params) => {        
      let result = [];
      if (params?.data?.mobile || params?.data?.Telephone || params?.data?.telephone) {
        if (params?.data?.mobile || params?.data?.Telephone || params?.data?.telephone) {
          result.push(params?.data?.mobile || params?.data?.Telephone || params?.data?.telephone);
        }
      } else {
        result = ["Unknown"];
      }
      return result.join(", ");
    } },
    { field: 'country', headerName: 'Country', width: 100, valueGetter: (value, params) => {        
      let result = [];
      if (params?.data?.country || params?.data?.Country) {
        if (params?.data?.country || params?.data?.Country) {
          result.push(params?.data?.country || params?.data?.Country);
        }
      } else {
        result = ["Unknown"];
      }
      return result.join(", ");
    } },
    { field: 'state', headerName: 'State', width: 80, valueGetter: (value, params) => {        
      let result = [];
      if (params?.data?.state || params?.data?.State) {
        if (params?.data?.state || params?.data?.State) {
          result.push(params?.data?.state || params?.data?.State);
        }
      } else {
        result = ["Unknown"];
      }
      return result.join(", ");
    } },
  ];
  const updatePop = (id, index) => {
    try {
      const x = docuserID?.filter(x => x?.type === 'consignee' || x?.type === 'sc');
      
      if (!x || !x[index]) {
        throw new Error('Invalid index or data structure.');
      }
  
      setEdit(true);
      setD_ID(id);
      setUids(x[index]?.id);
  
      const data = x[index]?.data;
  
      // Check for null or undefined before accessing properties
      setAdd_notes(data?.notes?.length ? data?.notes : data?.Notes || '');
      setAdd_notes1(data?.notes1?.length ? data?.notes1 : data?.['Major Intersection'] || '');
      setAddstatus(data?.status || '');
      setTypes(x[index]?.type || '');
      setAppointment(data?.appointment?.length ? data?.appointment : data?.Appointments || '');
      setAddcountry(data?.country?.length ? data?.country : data?.Country || '');
      setHours(data?.hours || '');
      setAddmobile(data?.mobile?.length ? data?.mobile : data?.Telephone || '');
      setAddcemail(data?.contactEmail?.length ? data?.contactEmail : data?.['Contact Email'] || '');
      setAddcname(data?.contactName?.length ? data?.contactName : data?.Contact || '');
      setAddstate(data?.state?.length ? data?.state : data?.State || '');
      setAddcity(data?.city?.length ? data?.city : data?.City || '');
      setAddaddress2(data?.address2?.length ? data?.address2 : data?.['Address 3'] || '');
      setAddaddress(data?.address?.length ? data?.address : data?.Address || '');
      setAddaddress1(data?.address1?.length ? data?.address1 : data?.['Address 2'] || '');
      setAddname(data?.name?.length ? data?.name : data?.Name || '');
      setAddlocationdata(data?.locationdata || '');
  
    } catch (error) {
      console.error('An error occurred in updatePop:', error);
      alert(`An error occurred while updating: ${error.message}`);
    }
  };
  
  const fetchUsers = async () => {
    try{
      let { data} = await axios.get(`https://dr48nfhb-5000.use.devtunnels.ms/users_details`,{
        headers: mainHeader()
    })
    if(data?.data){
      setUsers(data?.data);
      setDocuserID(data?.data);
    } 
    }catch(e){
      console.log(e)
    }
  };

  const openColumn = () => {
    setConsignee(true)
  }

  return (
    <div>
      {loading && <div style={{ margin: 'auto', position: 'absolute', top: '50%', left: '45%' }}><Spinner animation="border" role="status"></Spinner></div>}
      <div className='content-bar'>
        <ColumnData rows={docuserID?.filter(x => x?.type == 'consignee' || x?.type == 'sc')} columns={feild} openColumn={openColumn}/>
      </div>
      <React.Fragment>
        <Dialog
          open={consignee || edit}
          onClose={handleClosetype}
          PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
        >
          <DialogActions sx={{ height: '2vh' }}>
            <HighlightOffIcon style={{ cursor: 'pointer', width: '5vw', height: '5vh', position: 'absolute', top: 15 }} onClick={handleClosetype} />
          </DialogActions>
          <DialogContent>
            <form onSubmit={edit ? updateUser : addTypeOfuser}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={values} onChange={handleChangeShippers} aria-label="basic tabs example">
                  <Tab onClick={() => setValues(0)} label={'Consignee'} {...a11yProps(0)} />
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
                        label="Consignee's name"
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
                        options={addressList}
                        filterOptions={(options) => options}
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
                    {/* // <FormControl sx={{m:1,width:'25ch'}} xs={12} sm={12} md={6} xl={6}>
        // <TextField id="standard-basic" label="City"
        //   error={addcity?.length == 0} variant="standard" required value={addcity} helperText={addcity?.length > 0 ? '':'please enter city'} name='add_city' onChange={handleChange} />
        // </FormControl> */}
                    <FormControl variant="standard" sx={{ m: 1, width: '25ch' }} xs={12} sm={12} md={6} xl={6}>
                      {/* <InputLabel id="demo-simple-select-standard-label">State</InputLabel> */}
                      <TextField type='text' id="standard-basic" label="State"
                        error={addstate?.length == 0} variant="standard" required value={addstate} helperText={addstate?.length > 0 ? '' : 'please enter state'} name='add_state' onChange={handleChange} />
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
                        label={"Recieving hours"}
                        variant="standard"
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
                      <FormControlLabel control={<Checkbox value='sc' onChange={handleChange} name='types' checked={types === 'sc' ? true : false} />} label="Add as Shippers" />
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
                        label="Consignee Notes"
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
      <React.Fragment>
        <Dialog
          open={consigneecsv}
          onClose={() => dispatch(CSV(false))}
        >
          <DialogContent>
            <DialogContentText>
              <CSVReader types={'consignee'} />
            </DialogContentText>
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
    </div>
  )
}

export default ConsigneeList