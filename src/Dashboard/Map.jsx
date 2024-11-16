import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import Test from "./test";

const MapChart = () => {
  const mapdata = useSelector((state) => state?.user?.mapData)
  return (
    <Fragment>
      <div id="map-wrapper">
        <Test />
      </div>
    </Fragment>
  );
};

export default MapChart;
