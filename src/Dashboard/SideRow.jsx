import FmdGoodIcon from '@mui/icons-material/FmdGood';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import React, { useMemo, useState } from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { changeDate } from '../Reducers/userReducer';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export const SideRow = () => {
  const mapdata = useSelector((state) => state?.user?.mapData)
  const changeDates = useSelector((state) => state?.user?.changeDate)
  const dispatch = useDispatch()
  const [tab, setTab] = useState(true)

  const uniqueByDate = useMemo(() => {
    const dateSet = new Set();
    return mapdata?.locationLogs?.reduce((acc, current) => {
        const currentDate = new Date(current?.loadUpdatedAt)?.toISOString()?.split('T')[0];
        
        if (!dateSet.has(currentDate)) {
            dateSet.add(currentDate);
            acc.push(current);
        }
        
        return acc;
    }, []);
}, [mapdata?.locationLogs]);


  return (
    <div className='siderow'>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={6} xl={6} style={{ cursor: 'pointer' }} onClick={() => setTab(true)}><Item>Stops</Item></Grid>
        {mapdata?.deliveryProofPhotos && <Grid item xs={12} sm={6} md={6} xl={6} style={{ cursor: 'pointer' }} onClick={() => setTab(false)}><Item>Docs</Item></Grid>}
      </Grid><br />
      <div style={{textAlign:'left',marginBottom:'2%'}}>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label">Date</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={changeDates}
        label="Date"
        onChange={(e)=>dispatch(changeDate(e.target.value))}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {uniqueByDate?.map(res=><MenuItem value={res?.loadUpdatedAt?.split('T')?.[0]}>{res?.loadUpdatedAt?.split('T')?.[0]}</MenuItem>)}
      </Select>
    </FormControl>
    </div>
      <Container className='row-cont' style={{ display: 'block', margin: 'auto' }}>
        {tab ? <Row className='box_container'>
          <h6 className='box_title'>Shippers</h6>
          <Col xs={12} md={12}><ShippersList x={mapdata?.originCity} /></Col>
          <h6 className='box_title'>Consignee</h6>
          <Col xs={12} md={12}><ConsigneeList x={mapdata?.destinationCity} /></Col></Row> : <Row>{mapdata?.deliveryProofPhotos?.length ? <Col><StandardImageList /></Col> : <Col><div>No Proof</div></Col>}</Row>}
      </Container>
    </div>
  )
}

//<Col xs={12} md={12}><div className='box'><FmdGoodIcon/></div>{''}<span className='destination'>{res?.destinationCity}</span></Col>
function StandardImageList() {
  const mapdata = useSelector((state) => state?.user?.mapData)
  const downloadImage = async (imageUrl, filename) => {
    try {
      const response = await fetch(imageUrl);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.statusText}`);
      }
      
      const blob = await response.blob();

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error("Error downloading the image:", error);
    }
  };
  
  
  return (
    <ImageList sx={{ maxWidth: 300, height: 300 }} cols={3} rowHeight={144}>
      {mapdata?.deliveryProofPhotos??[].map((item, i) => (
        <ImageListItem key={i} sx={{ position: "relative" }}>
          <img
            srcSet={item.img}
            src={item.img}
            alt="proof"
            loading="lazy"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <FontAwesomeIcon
            icon={faDownload}
            onClick={() => downloadImage(item.img, `proof-${i + 1}.jpg`)}
            style={{
              position: "absolute",
              bottom: 8,
              right: 8,
              color: "white",
              cursor: "pointer",
              fontSize: "20px",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              padding: "5px",
              borderRadius: "50%",
            }}
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

function ShippersList({ x }) {
  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      aria-label="contacts"
    >
      {x?.shippersData ? x?.shippersData.map((x, i) => <ListItem key={i} disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <LocationCityIcon sx={{ margin: '2%', color: '#555' }} />
          </ListItemIcon>
          <ListItemText primary={x.originCity.length ? x.originCity : x.shippersData?.city} secondary={x?.locationP} />
        </ListItemButton>
      </ListItem>) : x.length ? x.map(x =>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <LocationCityIcon sx={{ margin: '2%', color: '#555' }} />
            </ListItemIcon>
            <ListItemText primary={x?.location.city} />
          </ListItemButton>
        </ListItem>
      ) : x?.lat ? <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <LocationCityIcon sx={{ margin: '2%', color: '#555' }} />
          </ListItemIcon>
          <ListItemText primary={x?.city} />
        </ListItemButton>
      </ListItem> : <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <LocationCityIcon sx={{ margin: '2%', color: '#555' }} />
          </ListItemIcon>
          <ListItemText primary={x?.origin.city} secondary={x?.locationP} />
        </ListItemButton>
      </ListItem>}
    </List>
  );
}

function ConsigneeList({ x }) {
  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      aria-label="contacts"
    >
      {x?.consigneeData ? x?.consigneeData.map((x, i) => <ListItem key={i} disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <FmdGoodIcon sx={{ margin: '2%', color: '#555' }} />
          </ListItemIcon>
          <ListItemText primary={x.destinationCity.length ? x.destinationCity : x.consigneeData?.city} secondary={x?.locationD} />
        </ListItemButton>
      </ListItem>) : x.length ? x.map(x =>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <LocationCityIcon sx={{ margin: '2%', color: '#555' }} />
            </ListItemIcon>
            <ListItemText primary={x?.location.city} />
          </ListItemButton>
        </ListItem>
      ) : x?.lat ? <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <LocationCityIcon sx={{ margin: '2%', color: '#555' }} />
          </ListItemIcon>
          <ListItemText primary={x?.city} />
        </ListItemButton>
      </ListItem> : <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <LocationCityIcon sx={{ margin: '2%', color: '#555' }} />
          </ListItemIcon>
          <ListItemText primary={x?.destination.city} secondary={x?.locationD} />
        </ListItemButton>
      </ListItem>}
    </List>
  );
}
