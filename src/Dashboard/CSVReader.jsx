import React, { useState } from 'react';
import Papa from 'papaparse';
import '../Assets/csv.css';
import { Button, Tooltip } from '@mui/material';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { supabase } from '../firebase'; // Ensure this is correctly set up
import { CSV } from '../Reducers/userReducer';
import { useDispatch, useSelector } from 'react-redux';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import axios from 'axios';
import { mainHeader } from '../common';

const CSVReader = ({ types }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const shareType = useSelector((state)=>state.user.shareType)
  // Handle CSV file input
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const csvText = e.target.result;
        
        Papa.parse(csvText, {
          header: true,
          dynamicTyping: true,
          complete: (results) => {
            console.log(results);
            setData(results.data);
          },
          error: (error) => {
            console.error('Error parsing CSV:', error);
            Swal.fire({
              title: 'Error parsing CSV',
              text: error.message,
              icon: 'error',
            });
          },
        });
      };

      reader.readAsText(file);
    }
  };

  // Flatten nested objects
  const flattenObject = (obj) => {
    const result = {};
    for (const i in obj) {
      if ((typeof obj[i]) === 'object' && !Array.isArray(obj[i])) {
        const temp = flattenObject(obj[i]);
        for (const j in temp) {
          result[`${i}_${j}`] = temp[j];
        }
      } else {
        result[i] = obj[i];
      }
    }
    return result;
  };

  // Generate CSV file
  const generateCSVData = () => {
    const jsonData = {
      "name": "Manjunath",
      "city": "Texas",
      "mobile": "+18056622113",
      "address": "XYZ Road",
      "address1": "xyz",
      "address2": "xyz",
      "email": "xyz@gmail.com",
      "country": "USA",
      "state": "TX",
      "notes": "xyz",
      "internalnotes": "xyx",
      "notes1": "xyz",
      "contactName": "xyz",
      "appointment": "xyc",
      "contactEmail": "xyt",
      "appointment_1": "xyz",
      "hours": "xyc",
      "type": "xyt",
      "locationData": JSON.stringify({ latitude: 40.0000, longitude: -23.0000, state: 'XYZ' }),
    };

    // Flatten and convert JSON data to CSV
    const flattenedData = flattenObject(jsonData);
    const csv = Papa.unparse([flattenedData]);

    // Create downloadable CSV file
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'data.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Submit data to Supabase
  const submit = async () => {
    setLoading(true);
    try {
      const { data: docRef, error } = await axios.post('https://dr48nfhb-5000.use.devtunnels.ms/users-details',{entries:data?.map(x=>{
        return {
          data:x,
          type:types
        }
      })},{
        headers: mainHeader()
      });
      if (error) {
        throw error;
      }

      withReactContent(Swal).fire({
        title: <i>Added!</i>,
        icon: 'success',
        timer: 2000,
      });

      setData([]);
      dispatch(CSV(false));
    } catch (e) {
      Swal.fire({
        title: e.message || 'An error occurred',
        icon: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <p>Please upload your CSV file here to post all shippers/consignees.<br />
        To post a load, please follow these instructions:<br />
        1. Download the CSV format below<br />
        2. Add values or replace column headers as per the downloaded format.
      </p>
      {data.length ? (
        <>
          <Tooltip title='Download format'>
            <CloudDownloadIcon style={{ cursor: 'pointer' }} onClick={generateCSVData} />
          </Tooltip>
          &nbsp;&nbsp;&nbsp; OR&nbsp;&nbsp;&nbsp;
          <Button
            variant="contained"
            onClick={submit}
            disabled={loading}
          >
            {loading ? 'Please wait...' : 'Submit File'}
          </Button>
        </>
      ) : (
        <>
          <Tooltip title='Download format'>
            <CloudDownloadIcon style={{ cursor: 'pointer' }} onClick={generateCSVData} />
          </Tooltip>
          &nbsp;&nbsp;&nbsp; OR&nbsp;&nbsp;&nbsp;
          <Button
            variant="contained"
            component="label"
          >
            Upload File
            <input
              type="file"
              accept='.csv'
              onChange={handleFileChange}
              hidden
            />
          </Button>
        </>
      )}
    </div>
  );
};

export default CSVReader;
