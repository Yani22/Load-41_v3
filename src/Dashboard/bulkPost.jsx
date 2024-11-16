import Papa from 'papaparse';
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import pdf from '../Assets/Bulk.pdf';
import '../Assets/post_bulk.css';
import { Bulk } from "../Reducers/userReducer";
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Autocomplete, Checkbox, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import FormControl from '@mui/material/FormControl';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import Draggable from 'react-draggable';
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

const BulkPost = () => {
    const [file, setFile] = React.useState(null);
    const [dat_open,setDat_open] = React.useState(!localStorage.getItem('token'))
  const [dat_token,setDat_token] = React.useState('')
    const bulk = useSelector((state) => state?.user?.bulk);
    const dispatch = useDispatch();

    const postFile = (event) => {
        event.preventDefault();
        const file = event.target.files[0];
        if (file) {
            csvToJson(file);
        }
    };

    const csvToJson = (x) => {
        Papa.parse(x, {
            header: true,
            complete: (results) => {
                setFile(results.data);
            },
        });
    };

    const postFiles = async (event) => {
        event.preventDefault();
        try {
            const bearerToken = localStorage.getItem('token');
            const apiUrl = 'https://freight.api.dat.com/posting/v2/loads/tasks';

            const requestBody = {
                type: "CREATE_LOAD_POSTINGS_TASK",
                arguments: {
                    postings: file
                }
            };

            const apiResponse = await axios.post(apiUrl, requestBody, {
                headers: {
                    'Authorization': `Bearer ${bearerToken}`,
                    'Content-Type': 'application/json'
                }
            });

            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'The request was submitted successfully.',
            });
            dispatch(Bulk(false));

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'An error occurred while submitting the request.',
            });
            dispatch(Bulk(false));
        }
    };

    const handleCloseToken = () => {
        setDat_token('')
        setDat_open(false)
        dispatch(Bulk(false))
      }
    
      const submitToken = (e) => {
        e.preventDefault()
        localStorage.setItem('token',dat_token)
        setDat_open(false)
        dispatch(Bulk(true))
      }

    return (
        <>
            {localStorage.getItem('token') ? <div className="centered-div">
                <div className="containers">
                    <h1>Create Bulk Posts</h1>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                        <p style={{ display: 'inline-flex' }}>
                            Download the multiple shipments <a href="https://kzljklbl-5050.usw3.devtunnels.ms/dashboard/post-bulk/csv" style={{ margin: '0.4rem', textDecoration: 'none' }}>CSV template</a> for an example of the format requirements.
                        </p>
                    </div>

                    <div>
                        <p>The CSV template contains example shipments. If you use the sample file to create your own</p>
                        <p>file make sure to remove all the included examples. Learn more about <a href={pdf} target="_blank">using the CSV file.</a></p>
                    </div>
                    <form id="csvForm" method="POST" onSubmit={postFiles}>
                        <label htmlFor="csvFile" className="custom-file-label">Choose CSV File</label>
                        <input type="file" id="csvFile" name="csv" className="custom-file-input" accept=".csv" onChange={postFile} required />
                        <button type="submit" className="custom-upload">Upload</button>
                    </form>

                    <div className="uploaded-file" id="uploadedFileDiv" style={{ display: 'none' }}>
                        <button id="removeFileButton" style={{ float: 'right', transform: 'translateY(-60%)' }}>X</button>
                        <p id="uploadedFileName"></p>
                    </div>
                </div>
            </div>:
            <React.Fragment>
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
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <form onSubmit={submitToken}>
            <FormControl sx={{ m: 1, width: '35ch' }} xs={12} sm={12} md={12} xl={12}>
                    <TextField
                      id="standard-multiline-static"
                      label="DAT Token"
                      variant="outlined"
                      name='token'
                      value={dat_token}
                      onChange={(e)=>setDat_token(e.target.value)}
                    />
            </FormControl>
            <p>If you dont have token, generate in settings page</p>
            <Button type='submit'>Show Loads</Button>
            </form>
            </Box>
          </DialogContent>
        </Dialog>
      </React.Fragment>}
        </>
    );
}

export default BulkPost;
