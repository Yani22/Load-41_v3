import DeleteIcon from '@mui/icons-material/Delete';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { DialogContentText, DialogTitle, TextField, Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import FormControl from '@mui/material/FormControl';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Button, Col, Row, Spinner } from "react-bootstrap";

import Draggable from 'react-draggable';
import 'react-international-phone/style.css';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { USA } from '../Json/Cities';
import ColumnData from './Table';
import { page_count } from '../Reducers/userReducer';
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

const Bearer = 'eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiIxMzVhMWZjMjQxODBiY2NmMTcwY2EzNWVhZGMwMjdjOSIsImp0aSI6Ik1EZ3hZekExTldZdE5HUmxaUzAwTXpobUxXSTBNMk10TW1Oak9UWTNNVEpsWm1WaCIsImV4cCI6MTczMDU5MjAwMH0.NcEgDpg8wai0pnsrleGnywlpIeZEjL2pbElSnJhfsKF5OAQJs6ZLGodH-F1D8zzK5OBPcMruH_WNe7TAgV3S1ZxEt8-Flc2opDPmp2yKpUIrYjLV2wYYg_Q6_7SH_pZLPo7lOrMOfHJSG7mEf8uX3__KgjoAqfQ9oAg78SeuH2gUNeMM8r9DfyzWxSq_VaqW4yXGnqGf9tuilaN_I2S1mgK5spPZNmqVE9ebMwOn7qLHlnKSRgpOEmi3ATOBhNAAEVm72HnfyD4fE9VS72uTACFdjSjkuiDTL8LvoFkZ0lPvnfqAV6_5y9Di3wIAWdNK4qsCAxyD3cEjbtbI1J5trg'
const CompanyList = () => {
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
  const [uids, setUids] = React.useState('')
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
  const [logs, setLogs] = React.useState([])
  const [alerts, setAlerts] = React.useState(false)
  const [deleteindex, setDeleteindex] = React.useState('')
  const [deleteid, setDeleteid] = React.useState('')
  const [company_name, setCompany_name] = React.useState('')
  const [company_dot, setCompany_dot] = React.useState('')
  const [company_mc, setCompany_mc] = React.useState('')
  const [company_email, setCompany_email] = React.useState('')
  const [company_id, setCompany_id] = React.useState('')
  const handleCloseAlert = () => {
    setAlerts(false)
    setDeleteid('')
    setDeleteindex('')
  }
  const deleteOpen = (id, index) => {
    setAlerts(true)
    setDeleteid(id)
  }
  React.useEffect(() => {
    dispatch(page_count(0))
    fetchCompany()
  }, [])

  const deleteCompany = async () => {
    setLoading(true)
    try {
      const docRef = await axios.delete(`https://api.truckerpath.com/truckload/api/company/delete/${deleteid}`)
      withReactContent(Swal).fire({
        title: <i>deleted!</i>,
        icon: 'success',
        timer: 2000
      });
      fetchCompany();
    } catch (e) {
      setLoading(false)
      
      withReactContent(Swal).fire({
        title: <i>something went wrong!</i>,
        icon: 'error',
        timer: 2000
      });
      setLoads(false);
      setLoading(false)
    }
  }

  // const updateCompany = async () => {   
  //   setLoads(true)
  //   setLoading(true)
  //   const data = {
  //     company_name: company_name,
  //     company_dot: company_dot,
  //     company_mc: company_mc,
  //     company_email: company_email,
  //     company_id: company_id
  // };
  //     try{

  //     setLoading(false)
  //     fetchCompany()
  //     withReactContent(Swal).fire({
  //       title: <i>Updated!</i>,
  //       icon:'success',
  //       timer:2000
  //       });
  //       setLoads(false)
  //       
  //       setColoumn(false)
  //       setEdit(false)
  //       handleClose()
  //   }
  //   catch(error){
  //     setLoads(false)
  //     setColoumn(false)
  //     setEdit(false)
  //     setLoading(false)
  //     handleClose()
  //     withReactContent(Swal).fire({
  //       title: error,
  //       icon:'error',
  //       timer:2000
  //       });
  //   }
  //   }

  const handleClose = () => {
    setError(false)
    setEdit(false)
    setColoumn(false)
    setCompany_dot('')
    setCompany_email('')
    setCompany_id('')
    setCompany_mc('')
    setCompany_name('')
  }
  const handleChangeShippers = (e, newValue) => {
    setValues(newValue);
    
  };
  const handleChange = async (event) => {
    const keyword = event.target.value;
    let searchString = keyword.toLowerCase().split(' ')
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
              Object.keys(o).some(k => String(o[k])?.toLowerCase().includes(string.toLowerCase())));
          }
          setCityList(filterByValue(USA, keyword))
        }
        else {
          setCityList(USA);
        }
        break;
      case "add_state":
        setAddstate(event.target.value);
        if (keyword !== '') {
          function filterByValue(array, string) {
            return array.filter(o =>
              Object.keys(o).some(k => String(o[k])?.toLowerCase().includes(string.toLowerCase())));
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
        setAddstatus(event.target.value);
        break;
      case "hours":
        setHours(event.target.value);
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
        setDestinationCity(event.target.value);
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
        if (keyword?.length) {
          const results = await users?.filter(string => {
            let containsAtLeastOneWord = false;
            searchString.forEach(word => {
              if (string?.name?.toLowerCase().includes(word))
                containsAtLeastOneWord = true;
              if (String(string?.zipCode).toLowerCase().includes(word))
                containsAtLeastOneWord = true;
            })
            if (containsAtLeastOneWord)
              return string
          })
          setUsers(results);
        } else if (keyword.length == 0) {
          fetchCompany();
        } else {
          setUsers(users);
        }

        break;
      case "consignee_name":
        setCon(event.target.value);
        if (keyword?.length) {
          const results = await users?.filter(string => {
            let containsAtLeastOneWord = false;
            searchString.forEach(word => {
              if (string?.name?.toLowerCase().includes(word))
                containsAtLeastOneWord = true;
              if (String(string?.city).includes(word))
                containsAtLeastOneWord = true;
            })
            if (containsAtLeastOneWord)
              return string
          })
          setUsers(results);
        } else if (keyword?.length == 0) {
          fetchCompany()
        }
        else {
          setUsers(users);
        }

        break;
      case "created_at":
        setCreated_at(event.target.value);
        break;
      case "company_name":
        setCompany_name(event.target.value);
        break;
      case "company_dot":
        setCompany_dot(event.target.value);
        break;
      case "company_email":
        setCompany_email(event.target.value);
        break;
      case "company_mc":
        setCompany_mc(event.target.value);
        break;
      case "company_id":
        setCompany_id(event.target.value);
        break;
    }
  };
  const updatePop = (id, index) => {
    const x = docuserID
    setEdit(true)
    setD_ID(id);
    setCompany_dot('')
    setCompany_email('')
    setCompany_id('')
    setCompany_mc('')
    setCompany_name('')
  }
  const feild = [
    { field: 'company_id', headerName: 'Company Id', width: 100 },
    { field: 'company_name', headerName: 'Company Name', width: 180 },
    { field: 'company_email', headerName: 'Company Email', width: 180 },
    { field: 'company_mc', headerName: 'Company MC', width: 120, },
    { field: 'company_dot', headerName: 'Company DOT', width: 120 },
    {
      field: 'action', headerName: 'Action', sortable: false, disableColumnMenu: true, width: 120, renderCell: (params) => {
        return (
          <div id={params?.id}><Tooltip title="delete"><DeleteIcon style={{ cursor: 'pointer', height: '20px', width: '20px' }} onClick={() => deleteOpen(params.row.company_id)} /></Tooltip></div>
        );
      }
    }
  ];
  const createCompany = async () => {
    const datas = {
      company_name: company_name,
      company_dot: company_dot,
      company_mc: company_mc,
      company_email: company_email,
      company_id: company_id
    }
    axios.post('https://api.truckerpath.com/truckload/api/company/create', datas, {
      headers: {
        'Authorization': `Bearer ${Bearer}`,
        'Content-Type': 'application/json'
      }
    }).then(data => {
      fetchCompany()
      handleClose()
      withReactContent(Swal).fire({
        title: <i>added!</i>,
        icon: 'success',
        timer: 2000
      });
      setLoads(false);
      setLoading(false)
    }).catch(
      error => {
        withReactContent(Swal).fire({
          title: <i>something went wrong!</i>,
          icon: 'error',
          timer: 2000
        });
        setLoads(false);
        setLoading(false)
      }
    )
  }
  const fetchCompany = async () => {
    setLoads(true);
    setLoading(true)
    axios.get('https://api.truckerpath.com/truckload/api/company/query/list', {
      headers: {
        'Authorization': `Bearer ${Bearer}`,
        'Content-Type': 'application/json'
      }
    }).then(data => {
      setUsers(data);
      setDocuserID(data);
      
      setLoads(false);
      setLoading(false)
    }).catch(
      error => {
        withReactContent(Swal).fire({
          title: <i>something went wrong!</i>,
          icon: 'error',
          timer: 2000
        });
        setLoads(false);
        setLoading(false)
      }
    )
  };
  return (
    <div>
      {loading && <div style={{ margin: 'auto', position: 'absolute', top: '50%', left: '45%' }}><Spinner animation="border" role="status"></Spinner></div>}
      <div className='content-bar'>
        <Row><Col><h4 style={{ textAlign: 'left', fontSize: '16px' }}></h4></Col><Col><Button style={{ backgroundColor: '#000', color: '#fff', marginBottom: 15 }} variant="contained" color="primary" onClick={() => setColoumn(true)}>ADD COMPANY</Button></Col></Row>
        <ColumnData rows={docuserID} columns={feild} />
      </div>
      <React.Fragment>
        <Dialog
          open={coloumn || edit}
          onClose={handleClose}
          PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
        >
          <DialogActions sx={{ height: '2vh' }}>
            <HighlightOffIcon style={{ cursor: 'pointer', width: '5vw', height: '5vh', position: 'absolute', top: 15 }} onClick={handleClose} />
          </DialogActions>
          <DialogContent>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <form autoComplete="off" onSubmit={createCompany}>
                <TextField
                  id="standard-basic"
                  label="Company Name"
                  variant="standard"
                  name='company_name'
                  value={company_name}
                  onChange={handleChange}
                  sx={{ m: 1, width: '25ch' }} xs={12} sm={12} md={6} xl={6}
                  required
                />
                <TextField
                  id="standard-basic"
                  label="Company DOT"
                  name='company_dot'
                  value={company_dot}
                  onChange={handleChange}
                  variant="standard"
                  sx={{ m: 1, width: '25ch' }} xs={12} sm={12} md={6} xl={6}
                  required
                />
                <TextField
                  id="standard-basic"
                  label="Company MC"
                  name='company_mc'
                  value={company_mc}
                  variant="standard"
                  onChange={handleChange}
                  helperText={company_mc?.length > 0 ? '' : 'please enter company mc'}
                  sx={{ m: 1, width: '25ch' }} xs={12} sm={12} md={6} xl={6}
                  required
                />
                <TextField
                  id="standard-basic"
                  label="Company Email"
                  name='company_email'
                  value={company_email}
                  variant="standard"
                  onChange={handleChange}
                  helperText={company_email?.length > 0 ? '' : 'please enter company email'}
                  sx={{ m: 1, width: '25ch' }} xs={12} sm={12} md={6} xl={6}
                  required
                />
                <Button type='submit' style={{ backgroundColor: '#313b4c' }} >{loads ? 'loading' : 'submit'}</Button>
              </form>
            </Box>
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
              deleteCompany();
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

export default CompanyList