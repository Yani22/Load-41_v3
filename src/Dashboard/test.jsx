import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import 'leaflet/dist/leaflet.css';
import 'react-leaflet-markercluster/dist/styles.min.css';
import React, { useEffect, useMemo, useRef } from "react";
import { FeatureGroup, LayersControl, MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import { FullscreenControl } from "react-leaflet-fullscreen";
import "react-leaflet-fullscreen/styles.css";
import { useSelector } from "react-redux";
import Truck_Icon from "../Assets/Trucking.png";
import AirplaneMarker from "./airplanePhoto";
import MarkerClusterGroup from 'react-leaflet-cluster'
import { supabase } from "../firebase";
import navigationicon from "../Assets/navigation.png"
import { io } from 'socket.io-client';


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
});
let polyline;

const socket = io('https://dr48nfhb-5000.use.devtunnels.ms', {
  transports: ['websocket'], // This can help with connection issues
});


export default function Test(props) {
  const [map, setMap] = React.useState(null)
  const mapRef = useRef(null);
  const [position, setPosition] = React.useState(() => map?.getCenter())
  const mapdata = useSelector((state) => state?.user?.mapData)
  const Logs = useSelector((state) => state?.user?.logs)
  const [routingMachine, setRoutingMachine] = React.useState(null)
  const [count, setCount] = React.useState(8)
  const RoutingMachineRef = React.useRef(null)
  const [locationLogs, setLocationLogs] = React.useState([])
  const changeDate = useSelector(state=> state?.user?.changeDate)

  const clusterOptions = {
    // Function to create a custom cluster icon
    iconCreateFunction: (cluster) => {
      // Get the count of markers in the cluster
      const count = cluster.getChildCount();
      // Return a custom icon with the count
      return createCustomClusterIcon(count);
    },
    // Disable clustering at a certain zoom level (e.g., 10)
    disableClusteringAtZoom: 10,
    // Do not zoom to bounds when a cluster is clicked
    zoomToBoundsOnClick: true,
  };
  
  // Function to create a custom cluster icon
  const createCustomClusterIcon = (count) => {
    return new L.DivIcon({
      className: 'custom-cluster-icon',
      html: `<div class="custom-cluster-icon-inner">${count}</div>`,
      iconSize: [40, 40],
    });
  };
  

  
  React.useEffect(() => {
    if (!map) return
    if (map) {
      RoutingMachineRef.current = L.Routing.control({
        position: 'topleft',
        show: false,
        lineOptions: {
          styles: [
            {
              className: 'animate'
            },
          ],
        },
        createMarker: function () { return null; },
        waypoints: mapdata?.originCity?.shippersData && mapdata?.originCity?.consigneeData ? [...mapdata?.originCity?.shippersData?.map(res => L.latLng(res?.shippersData?.locationdata?.latitude, res?.shippersData?.locationdata?.longitude)), ...mapdata?.originCity?.consigneeData?.map(res => L.latLng(res?.consigneeData?.locationdata?.latitude, res?.consigneeData?.locationdata?.longitude))] : mapdata?.originCity?.origin && mapdata?.originCity?.destination ? [L.latLng(mapdata?.originCity?.origin?.latitude, mapdata?.originCity?.origin?.longitude), L.latLng(mapdata?.originCity?.destination?.latitude, mapdata?.originCity?.destination?.longitude)] : mapdata?.originCity?.lat ? [L.latLng(mapdata?.originCity?.lat, mapdata?.originCity?.lng), L.latLng(mapdata?.destinationCity?.lat, mapdata?.destinationCity?.lng)] : mapdata?.destinationCity && mapdata?.originCity ? [...mapdata?.originCity.map((res, i) => L.latLng(res?.location?.latitude, res?.location?.longitude)), ...mapdata?.destinationCity.map((res, i) => L.latLng(res?.location?.latitude, res?.location?.longitude))] : null,
      })
      setRoutingMachine(RoutingMachineRef.current)
    }
  }, [map])
  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  React.useEffect(() => {
    if (!routingMachine) return
    if (routingMachine) {
      routingMachine.addTo(map)
    }
  }, [routingMachine])

  React.useEffect(() => {
    if (!map) return
    if (map) {
      map.on('move', onMove);
      map.on('zoomend', onZoomEnd);

      return () => {
        map.off('move', onMove);
        map.off('zoomend', onZoomEnd);
      };
    }
  }, [map])

  const onZoomEnd = React.useCallback(() => {
    const zoomLevel = map.getZoom();
    if (zoomLevel >= 10) {
      setCount(Math.floor(zoomLevel / 2))
    } else {
      setCount(Math.floor(zoomLevel / 2))
    }
  }, [map])
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

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize the map
    const mapInstance = L.map(mapRef.current).setView([51.505, -0.09], 13);

    // Base Layer: OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(mapInstance);

    setMap(mapInstance);

    // Cleanup function to remove the map on unmount
    return () => {
      mapInstance.remove();
    };
  }, []);
  React.useEffect(() => {
      socket.on('connect', () => {
          console.log('Connected to WebSocket server');
      });
      socket.on('tracker_update', (data) => {
        if (data.trackingId === mapdata.trackingId) {
          setLocationLogs((prevTrackers) => {
            switch (data.action) {
              case 'insert':
                return [...prevTrackers, data];
              case 'update':
                return prevTrackers.map((tracker) =>
                  tracker.id === data.id ? { ...tracker, ...data } : tracker
                );
              case 'delete':
                return prevTrackers.filter((tracker) => tracker.id !== data.id);
              default:
                return prevTrackers;
            }
          });
        }
      });
  
      return () => {
        socket.off('tracker_update');
      };
    
  }, [mapdata.trackingId])
  
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
  const handleMarkerClick = (data) => {
    if (map) {
      map.setView([data.latitude, data.longitude], map.getZoom(), {
        animate: true
      });
    }
  };

  const filteredData = useMemo(() => {
    return mapdata?.locationLogs?.filter(r => {
      const datePart = r?.loadUpdatedAt?.slice(0, 10);
      return changeDate === '' ? true : datePart === changeDate;
    });
  }, [changeDate, mapdata?.locationLogs]);

  const filteredData1 = useMemo(() => {
    return locationLogs?.locationLogs?.filter(r => {
      const datePart = r?.loadUpdatedAt?.slice(0, 10);
      return changeDate === '' ? true : datePart === changeDate;
    });
  }, [changeDate, locationLogs?.locationLogs]);
  //
  return (
    <MapContainer center = {mapdata?.originCity?.shippersData && mapdata?.originCity?.consigneeData 
    ? [
        (
            (mapdata?.originCity?.shippersData[0]?.locationdata?.latitude || 0) + 
            (mapdata?.originCity?.consigneeData[0]?.locationdata?.latitude || 0)
        ) / 2,
        (
            (mapdata?.originCity?.shippersData[0]?.locationdata?.longitude || 0) + 
            (mapdata?.originCity?.consigneeData[0]?.locationdata?.longitude || 0)
        ) / 2
    ] 
    : mapdata?.originCity?.length 
    ? [
        (
            (mapdata?.originCity[0]?.location?.latitude || 0) + 
            (mapdata?.destinationCity[0]?.location?.latitude || 0)
        ) / 2,
        (
            (mapdata?.originCity[0]?.location?.longitude || 0) + 
            (mapdata?.destinationCity[0]?.location?.longitude || 0)
        ) / 2
    ] 
    : mapdata?.originCity?.lat && mapdata?.destinationCity?.lat 
    ? [
        (
            (mapdata?.originCity?.lat || 0) + 
            (mapdata?.destinationCity?.lat || 0)
        ) / 2,
        (
            (mapdata?.originCity?.lng || 0) + 
            (mapdata?.destinationCity?.lng || 0)
        ) / 2
    ] 
    : [
        (
            (mapdata?.originCity?.origin?.latitude || 0) + 
            (mapdata?.originCity?.destination?.latitude || 0)
        ) / 2,
        (
            (mapdata?.originCity?.origin?.longitude || 0) + 
            (mapdata?.originCity?.destination?.longitude || 0)
        ) / 2
    ]}
 zoom={5} ref={setMap}>
      <FullscreenControl position="topleft" />
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="Map">
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
          />
          {mapdata?.originCity?.shippersData ? (
  mapdata.originCity.shippersData.map((res, i) => (
    <Marker
      key={i}
      position={{
        lat: res?.shippersData?.locationdata?.latitude || 0,
        lng: res?.shippersData?.locationdata?.longitude || 0,
      }}
    >
      <Popup>{res?.shippersData?.locationdata?.city || res?.originCity}</Popup>
    </Marker>
  ))
) : mapdata?.originCity?.length ? (
  mapdata.originCity.map((res, i) => (
    <Marker
      key={i}
      position={{
        lat: res.location?.latitude || 0,
        lng: res.location?.longitude || 0,
      }}
    >
      <Popup>{res.location?.city || res.city}</Popup>
    </Marker>
  ))
) : mapdata?.originCity?.lat ? (
  <Marker
    position={{
      lat: mapdata.originCity.lat || 0,
      lng: mapdata.originCity.lng || 0,
    }}
  >
    <Popup>{mapdata.originCity.city}</Popup>
  </Marker>
) : (
  <Marker
    position={{
      lat: mapdata?.originCity?.origin?.latitude || 0,
      lng: mapdata?.originCity?.origin?.longitude || 0,
    }}
  >
    <Popup>{mapdata?.originCity?.origin?.city}</Popup>
  </Marker>
)}

{mapdata?.originCity?.consigneeData ? (
  mapdata.originCity.consigneeData.map((res, i) => (
    <Marker
      key={i}
      position={{
        lat: res?.consigneeData?.locationdata?.latitude || 0,
        lng: res?.consigneeData?.locationdata?.longitude || 0,
      }}
    >
      <Popup>{res?.consigneeData?.locationdata?.city || res?.destinationCity}</Popup>
    </Marker>
  ))
) : mapdata?.destinationCity?.length ? (
  mapdata.destinationCity.map((res, i) => (
    <Marker
      key={i}
      position={{
        lat: res.location?.latitude || 0,
        lng: res.location?.longitude || 0,
      }}
    >
      <Popup>{res.location?.city || res.city}</Popup>
    </Marker>
  ))
) : mapdata?.destinationCity?.lat ? (
  <Marker
    position={{
      lat: mapdata.destinationCity.lat || 0,
      lng: mapdata.destinationCity.lng || 0,
    }}
  >
    <Popup>{mapdata.destinationCity.city}</Popup>
  </Marker>
) : (
  <Marker
    position={{
      lat: mapdata?.originCity?.destination?.latitude || 0,
      lng: mapdata?.originCity?.destination?.longitude || 0,
    }}
  >
    <Popup>{mapdata?.originCity?.destination?.city}</Popup>
  </Marker>
)}

{/* {(filteredData?.length > 200 || filteredData1?.length > 200) ? ( */}
  <>
    <MarkerClusterGroup chunkedLoading {...clusterOptions}>
      {(filteredData1?.length > 0 || filteredData?.length > 0) &&
        (filteredData1
          ? filteredData1.map((res, i) =>
              (filteredData1.at(-1) === res || i) && (
                <AirplaneMarker
                  key={i}
                  onClick={() => handleMarkerClick(res)}
                  prevLoadUpdatedAt1={filteredData1[i + 1]?.loadUpdatedAt || ''}
                  prevState={[
                    filteredData1[i - 1]?.latitude || 0,
                    filteredData1[i - 1]?.longitude || 0,
                  ]}
                  loadUpdatedAt1={
                    filteredData1.at(-1) === res ? '' : filteredData1[i === 0 ? i : i + 1]?.loadUpdatedAt
                  }
                  id={locationLogs.loadId}
                  data={res || {}}
                  iurl={res === filteredData1.at(-1) ? Truck_Icon : navigationicon}
                />
              )
            )
          : filteredData.map((res, i) =>
              (filteredData.at(-1) === res || i) && (
                <AirplaneMarker
                  key={i}
                  onClick={() => handleMarkerClick(res)}
                  prevLoadUpdatedAt1={filteredData[i + 1]?.loadUpdatedAt || ''}
                  prevState={[
                    filteredData[i - 1]?.latitude || 0,
                    filteredData[i - 1]?.longitude || 0,
                  ]}
                  loadUpdatedAt1={
                    filteredData.at(-1) === res ? '' : filteredData[i === 0 ? i : i + 1]?.loadUpdatedAt
                  }
                  id={mapdata.loadId}
                  data={res || {}}
                  iurl={res === filteredData.at(-1) ? Truck_Icon : navigationicon}
                />
              )
            ))}
    </MarkerClusterGroup>

    {(filteredData1?.length > 0 || filteredData?.length > 0) &&
      (filteredData1
        ? filteredData1.map((res, i) =>
            filteredData1.at(-1) === res && (
              <AirplaneMarker
                key={i}
                onClick={() => handleMarkerClick(res)}
                prevLoadUpdatedAt1={new Date()}
                prevState={[
                  filteredData1[i - 1]?.latitude || 0,
                  filteredData1[i - 1]?.longitude || 0,
                ]}
                loadUpdatedAt1={''}
                id={locationLogs.loadId}
                data={res || {}}
                iurl={Truck_Icon}
              />
            )
          )
        : filteredData.map((res, i) =>
            filteredData.at(-1) === res && (
              <AirplaneMarker
                key={i}
                onClick={() => handleMarkerClick(res)}
                prevLoadUpdatedAt1={''}
                prevState={[
                  filteredData[i - 1]?.latitude || 0,
                  filteredData[i - 1]?.longitude || 0,
                ]}
                loadUpdatedAt1={''}
                id={mapdata.loadId}
                data={res || {}}
                iurl={Truck_Icon}
              />
            )
          ))}
  </>
{/* // ) 
// : (
//   <>
//     {(filteredData1?.length > 0 || filteredData?.length > 0) &&
//       (filteredData1
//         ? filteredData1.map((res, i) =>
//             (filteredData1.at(-1) === res || i) && (
//               <AirplaneMarker
//                 key={i}
//                 onClick={() => handleMarkerClick(res)}
//                 prevLoadUpdatedAt1={filteredData1[i + 1]?.loadUpdatedAt || ''}
//                 prevState={[
//                   filteredData1[i - 1]?.latitude || 0,
//                   filteredData1[i - 1]?.longitude || 0,
//                 ]}
//                 loadUpdatedAt1={
//                   filteredData1.at(-1) === res ? '' : filteredData1[i === 0 ? i : i + 1]?.loadUpdatedAt
//                 }
//                 id={locationLogs.loadId}
//                 data={res || {}}
//                 iurl={res === filteredData1.at(-1) ? Truck_Icon : navigationicon}
//               />
//             )
//           )
//         : filteredData.map((res, i) =>
//             (filteredData.at(-1) === res || i) && (
//               <AirplaneMarker
//                 key={i}
//                 onClick={() => handleMarkerClick(res)}
//                 prevLoadUpdatedAt1={filteredData[i + 1]?.loadUpdatedAt || ''}
//                 prevState={[
//                   filteredData[i - 1]?.latitude || 0,
//                   filteredData[i - 1]?.longitude || 0,
//                 ]}
//                 loadUpdatedAt1={
//                   filteredData.at(-1) === res ? '' : filteredData[i === 0 ? i : i + 1]?.loadUpdatedAt
//                 }
//                 id={mapdata.loadId}
//                 data={res || {}}
//                 iurl={res === filteredData.at(-1) ? Truck_Icon : navigationicon}
//               />
//             )
//           ))}
//   </>
// )
// } */}
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
