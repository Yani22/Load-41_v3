import L from "leaflet";
import { useEffect, useState, useMemo, useCallback } from "react";
import { Popup } from "react-leaflet";
import { LeafletTrackingMarker } from "react-leaflet-tracking-marker";
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { differenceInHours } from 'date-fns'; // Import from 'date-fns'
import navigationicon from "../Assets/navigation.png";
import Truck_Icon from "../Assets/Trucking.png";
import { isNumber } from "@mui/x-data-grid/internals";

export default function AirplaneMarker({
  onClick,
  data,
  iurl,
  id,
  renderer,
  prevLoadUpdatedAt1,
  loadUpdatedAt1,
  prevState,
  userTimeZone // Added prop for user-provided time zone
}) {
  const { latitude, loadUpdatedAt, longitude, address } = data;

  const [prevPos, setPrevPos] = useState([latitude, longitude]);

  useEffect(() => {
    if (prevPos[1] !== longitude || prevPos[0] !== latitude) {
      setPrevPos([latitude, longitude]);
    }
  }, [latitude, longitude, prevPos]);

  const calculateDirection = useCallback((lat1, lon1, lat2, lon2) => {
    const toRadians = degree => degree * (Math.PI / 180);
    const toDegrees = radian => radian * (180 / Math.PI);

    const dLon = toRadians(lon2 - lon1);
    const y = Math.sin(dLon) * Math.cos(toRadians(lat2));
    const x = Math.cos(toRadians(lat1)) * Math.sin(toRadians(lat2)) - 
      Math.sin(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.cos(dLon);

    let brng = toDegrees(Math.atan2(y, x));
    return (brng + 360) % 360;
  }, []);

  const formatDateTo12HourLocal = useCallback((date, timeZone) => {
    const zonedDate = toZonedTime(date, timeZone);
    return format(zonedDate, 'hh:mm a', { timeZone });
  }, []);

  const getDifferenceInHoursUTC = useCallback((currentDate, previousDate) => {
    const diff = differenceInHours(currentDate, previousDate);
    if (diff > 24) {
      return `${Math.floor(diff / 24)} days ago`;
    } else if (diff < 1) {
      return `${Math.floor(diff * 60)} minutes ago`;
    } else {
      return `${Math.floor(diff)} hours ago`;
    }
  }, []);

  const createCustomIcon = useCallback((direction, currentDate, previousDate) => {
    const differenceInMillis = Math.abs(currentDate - previousDate);
    const differenceInHours = differenceInMillis / (1000 * 60 * 60);
    const iconUrl = differenceInHours * 60 < 5 ? iurl : iurl === Truck_Icon ? Truck_Icon : 'https://img.icons8.com/?size=100&id=60362&format=png&color=000000';

    return L.divIcon({
      html: `<div style="transform: rotate(${direction}deg);">
               <img style="width:35px; height:35px;" src="${iconUrl}" />
             </div>`,
      className: 'custom-marker',
      iconSize: iurl === navigationicon || iconUrl === 'https://img.icons8.com/?size=100&id=60362&format=png&color=000000' ? [30, 30] : [35, 35],
      popupAnchor: [2, -20],
    });
  }, [iurl]);

  const showAddress = useCallback((currentDate, previousDate) => {
    const differenceInMillis = Math.abs(currentDate - previousDate);
    const differenceInHours = differenceInMillis / (1000 * 60 * 60);
    return differenceInHours > 6 ? address : '';
  }, [address]);

  const showStayingTimeOfDriver = useCallback((currentDate, previousDate) => {
    const differenceInMillis = Math.abs(currentDate - previousDate);
    const differenceInHours = differenceInMillis / (1000 * 60 * 60);
    const timeLabel = differenceInHours > 24 ? `${Math.floor(differenceInHours / 24)} days` :
      differenceInHours < 1 ? `${Math.floor(differenceInHours * 60)} minutes` :
        `${Math.floor(differenceInHours)} hours`;
    return isNumber(differenceInHours) ? `Time duration of stop (${timeLabel})` : 'Location Stops Sharing';
  }, []);

  const direction = useMemo(() => calculateDirection(prevState[0], prevState[1], latitude, longitude), [prevState, latitude, longitude, calculateDirection]);
  const currentDate = useMemo(() => new Date(), []);
  const prevLoadUpdatedAt = useMemo(() => new Date(prevLoadUpdatedAt1), [prevLoadUpdatedAt1]);
  const loadUpdatedAtDate = useMemo(() => new Date(loadUpdatedAt), [loadUpdatedAt]);

  return (
    <LeafletTrackingMarker
      icon={createCustomIcon(direction, prevLoadUpdatedAt, loadUpdatedAtDate)}
      position={[latitude, longitude]}
      previousPosition={prevPos}
      duration={1000}
      renderer={renderer}
      eventHandlers={{ click: onClick }}
    >
      <Popup>
        <p style={{ color: '#555' }}>
          Load ID: <strong style={{ color: 'green' }}>{id}</strong>
          <p style={{ fontSize: '12px' }}>{showAddress(loadUpdatedAtDate, prevLoadUpdatedAt)}</p>
        </p>
        <strong style={{ color: '#000' }}>
          {`Arrived At ${formatDateTo12HourLocal(loadUpdatedAtDate, userTimeZone)}`}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {prevLoadUpdatedAt1 ? `Left At ${formatDateTo12HourLocal(prevLoadUpdatedAt, userTimeZone)}` : ''}
          <br />
          <strong style={{ color: 'blue' }}>{showStayingTimeOfDriver(prevLoadUpdatedAt, loadUpdatedAtDate)}</strong>
          <br />
          <strong style={{ color: 'violet' }}>{`Last Updated (${getDifferenceInHoursUTC(currentDate, loadUpdatedAtDate)})`}</strong>
        </strong>
      </Popup>
    </LeafletTrackingMarker>
  );
}
