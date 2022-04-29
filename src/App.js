import React from "react";
import jsPlumb from "jsplumb/dist/js/jsplumb.min";

import "./jsplumbdemo.css";
const style = {
  width: 100,
  height: 100,
  background: "#e0e0e0",
};
export default class MyJsPlumb extends React.Component {
  componentDidMount() {
    const j = jsPlumb.getInstance();
    j.draggable(["el1", "el2"]);
    j.connect({
      source: "el1",
      target: "el2",
    });
  }

  render() {
    return (
      <React.Fragment>
        <div
          id="container"
          style={{
            position: "relative",
          }}
        >
          <div
            id="el1"
            style={{ ...style, position: "absolute", left: 50, top: 50 }}
          />
          <div
            id="el2"
            style={{ ...style, position: "absolute", left: 200, top: 200 }}
          />
        </div>
      </React.Fragment>
    );
  }
}
