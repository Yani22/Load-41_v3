import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import 'leaflet/dist/leaflet.css';
import React from "react";
import { FeatureGroup, LayersControl, MapContainer, TileLayer } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import { FullscreenControl } from "react-leaflet-fullscreen";
import "react-leaflet-fullscreen/styles.css";
import { useDispatch, useSelector } from "react-redux";
import Truck_Icon from "../Assets/Trucking.png";
import { supabase } from "../firebase";
import AirplaneMarker from "./airplanePhoto";
import MarkerClusterGroup from 'react-leaflet-cluster'
import { page_count } from "../Reducers/userReducer";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { Tooltip } from "@mui/material";
import axios from "axios";


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
});


let polyline;
export default function TrackTruck(props) {
  const [map, setMap] = React.useState(null)
  const [position, setPosition] = React.useState(() => map?.getCenter())
  const [mapdata, setMapdata] = React.useState([])
  const dispatch = useDispatch()
  const Logs = useSelector((state) => state?.user?.logs)
  const [routingMachine, setRoutingMachine] = React.useState(null)
  const RoutingMachineRef = React.useRef(null)
  //   React.useEffect(() => {
  //     if (!map) return 
  //     if (map) {
  //       RoutingMachineRef.current = L.Routing.control({
  //         position: 'topleft',
  //         show:false,
  //         lineOptions: {
  //           styles: [
  //             {
  //               color: '#5356FF',
  //             },
  //           ],
  //         },
  //         createMarker: function() { return null; },
  //         waypoints: mapdata?.originCity?.shippersData&&mapdata?.originCity?.consigneeData ? [...mapdata?.originCity?.shippersData?.map(res => L.latLng(res?.shippersData?.locationdata?.latitude,res?.shippersData?.locationdata?.longitude)),...mapdata?.originCity?.consigneeData?.map(res => L.latLng(res?.consigneeData?.locationdata?.latitude,res?.consigneeData?.locationdata?.longitude))]:[L.latLng(mapdata?.originCity?.origin?.latitude,mapdata?.originCity?.origin?.longitude),L.latLng(mapdata?.originCity?.destination?.latitude,mapdata?.originCity?.destination?.longitude)],
  //       })
  //       setRoutingMachine(RoutingMachineRef.current)
  //     }
  //   }, [map])

  //   React.useEffect(() => {
  //     if (!routingMachine) return
  //     if (routingMachine) {
  //       routingMachine.addTo(map)
  //     }
  //   }, [routingMachine])
  React.useEffect(() => {
    dispatch(page_count(0))
    window.scrollTo(0, 0)
  }, [])
  React.useEffect(() => {
    fetchLoad()
    setInterval(() => fetchLoad(), 5 * 60 * 1000)
  }, [])
  const onMove = React.useCallback(() => {
    setPosition(map?.getCenter())
  }, [map])

  React.useEffect(() => {
    map?.on('move', onMove)
    return () => {
      map?.off('move', onMove)
    }
  }, [map, onMove])
  const _onEdited = e => {
    let numEdited = 0;
    e.layers?.eachLayer(layer => {
      numEdited += 1;
    });
    

    _onChange();
  };

  const _onCreated = e => {
    let type = e.layerType;
    let layer = e.layer;
    if (type === "marker") {
      // Do marker specific actions
      
    } else {
      
    }
    // Do whatever else you need to. (save to db; etc)

    _onChange();
  };

  const _onDeleted = e => {
    let numDeleted = 0;
    e.layers?.eachLayer(layer => {
      numDeleted += 1;
    });
    

    _onChange();
  };

  const _onMounted = drawControl => {
    
  };

  const _onEditStart = e => {
    
  };

  const _onEditStop = e => {
    
  };

  const _onDeleteStart = e => {
    
  };

  const _onDeleteStop = e => {
    
  };


  var _editableFG = null;

  const _onFeatureGroupReady = reactFGref => {
    // populate the leaflet FeatureGroup with the geoJson layers

    let leafletGeoJSON = new L.GeoJSON(getGeoJson());
    let leafletFG = reactFGref?.leafletElement;

    leafletGeoJSON?.eachLayer(layer => {
      leafletFG?.addLayer(layer);
    });

    // store the ref for future access to content

    _editableFG = reactFGref;
  };

  const _onChange = () => {
    // _editableFG contains the edited geometry, which can be manipulated through the leaflet API

    const { onChange } = props;

    if (!_editableFG || !onChange) {
      return;
    }

    const geojsonData = _editableFG?.leafletElement.toGeoJSON();
    onChange(geojsonData);
  };
  const fetchLoad = async () => {
    let { data} = await axios.get(`https://dr48nfhb-5000.use.devtunnels.ms/trackers_info?user_id=${localStorage.getItem('id')}`)
    
    // setLogs(data?.filter(x=>x.isDeleted == false)?.map(x=>x.locationLogs))
    // dispatch(Logs(data?.filter(x=>x.isDeleted == false)?.map(x=>x.locationLogs)))          
    setMapdata(data?.data)
  };
  

  const handleMarkerClick = (data) => {
    if (map) {
      map.setView([data.latitude, data.longitude], 15);
    }
  };
  const handleResetClick = () => {
    if (map) {
      map.setView([40.117869638684866, -102.05903532420234], 4.4);
    }
  };
  //
  return (
    <div id="map-wrapper-Truck">
      <MapContainer center={[40.117869638684866, -102.05903532420234]} zoom={4.4} ref={setMap}>
        <FullscreenControl position="topleft" />
        <LayersControl position="topright">
          <div className="flex-justify-end-z-400">
            <Tooltip title='reset view'><button onClick={handleResetClick} style={{ width: '35px', height: '35px' }}><RestartAltIcon /></button></Tooltip>
          </div>
          <LayersControl.BaseLayer checked name="Map">
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
            />
            {/* <MarkerClusterGroup chunkedLoading> */}
            {mapdata?.length > 0 && mapdata?.filter(x => x.isDeleted == false)?.map((mapdata, i) => mapdata?.locationLogs?.length > 1 && <AirplaneMarker onClick={() => handleMarkerClick(mapdata?.locationLogs[mapdata?.locationLogs.length - 1])} prevLoadUpdatedAt1={''} prevState={[mapdata?.locationLogs[i - 1]?.latitude, mapdata?.locationLogs[i - 1]?.longitude]} key={i} loadUpdatedAt1={mapdata?.locationLogs?.at(-1) == mapdata ? '' : mapdata?.locationLogs[i == 0 ? i : i + 1 ? i + 1 : i]?.loadUpdatedAt} data={mapdata?.locationLogs[mapdata?.locationLogs.length - 1] ?? {}} iurl={Truck_Icon} id={mapdata?.loadId} />)}
            {/* {mapdata?.length && mapdata?.map(mapdata => mapdata?.locationLogs?.length > 1 && <Marker position={{ lat: mapdata?.locationLogs[mapdata?.locationLogs?.length-1]?.latitude, lng: mapdata?.locationLogs[mapdata?.locationLogs?.length-1]?.longitude }}></Marker>)} */}
            {/* </MarkerClusterGroup> */}
          </LayersControl.BaseLayer>
        </LayersControl>
        <FeatureGroup
          ref={reactFGref => {
            _onFeatureGroupReady(reactFGref);
          }}
        >
          <EditControl
            position="topright"
            onEdited={_onEdited}
            onCreated={_onCreated}
            onDeleted={_onDeleted}
            onMounted={_onMounted}
            onEditStart={_onEditStart}
            onEditStop={_onEditStop}
            onDeleteStart={_onDeleteStart}
            onDeleteStop={_onDeleteStop}
            draw={{
              rectangle: false
            }}
          />
        </FeatureGroup>
      </MapContainer>
    </div>
  );
}


function getGeoJson() {
  return {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: [
            [-122.47979164123535, 37.830124319877235],
            [-122.47721672058105, 37.809377088502615]
          ]
        }
      },
      {
        type: "Feature",
        properties: {},
        geometry: {
          type: "Point",
          coordinates: [-122.46923446655273, 37.80293476836673]
        }
      },
      {
        type: "Feature",
        properties: {},
        geometry: {
          type: "Point",
          coordinates: [-122.48399734497069, 37.83466623607849]
        }
      },
      {
        type: "Feature",
        properties: {},
        geometry: {
          type: "Point",
          coordinates: [-122.47867584228514, 37.81893781173967]
        }
      },
      {
        type: "Feature",
        properties: {},
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [-122.48069286346434, 37.800637436707525],
              [-122.48069286346434, 37.803104310307276],
              [-122.47950196266174, 37.803104310307276],
              [-122.47950196266174, 37.800637436707525],
              [-122.48069286346434, 37.800637436707525]
            ]
          ]
        }
      },
      {
        type: "Feature",
        properties: {},
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [-122.48103886842728, 37.833075326166274],
              [-122.48065531253813, 37.832558431940114],
              [-122.4799284338951, 37.8322660885204],
              [-122.47963070869446, 37.83231693093747],
              [-122.47948586940764, 37.832467339549524],
              [-122.47945636510849, 37.83273426112019],
              [-122.47959315776825, 37.83289737938241],
              [-122.48004108667372, 37.833109220743104],
              [-122.48058557510376, 37.83328293020496],
              [-122.48080283403395, 37.83332529830436],
              [-122.48091548681259, 37.83322785163939],
              [-122.48103886842728, 37.833075326166274]
            ]
          ]
        }
      },
      {
        type: "Feature",
        properties: {},
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [-122.48043537139893, 37.82564992009924],
              [-122.48129367828368, 37.82629397920697],
              [-122.48240947723389, 37.82544653184479],
              [-122.48373985290527, 37.82632787689904],
              [-122.48425483703613, 37.82680244295304],
              [-122.48605728149415, 37.82639567223645],
              [-122.4898338317871, 37.82663295542695],
              [-122.4930953979492, 37.82415839321614],
              [-122.49700069427489, 37.821887146654376],
              [-122.4991464614868, 37.82171764783966],
              [-122.49850273132326, 37.81798857543524],
              [-122.50923156738281, 37.82090404811055],
              [-122.51232147216798, 37.823344820392535],
              [-122.50150680541992, 37.8271414168374],
              [-122.48743057250977, 37.83093781796035],
              [-122.48313903808594, 37.82822612280363],
              [-122.48043537139893, 37.82564992009924]
            ]
          ]
        }
      }
    ]
  };
}
