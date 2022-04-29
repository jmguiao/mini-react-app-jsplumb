//import React from "react";
import * as React from "react";
import { jsPlumb } from "jsplumb";
import $ from "jquery";
//import { v4 as uuidv4 } from "uuid";

const diagram = {
  height: "90vh",
  position: "relative",
};
const control1 = {
  left: "50px",
  top: "50px",
};
const control2 = {
  left: "300px",
  top: "200px",
};
// const control3 = {
//   left: "400px",
//   top: "300px",
// };

class Graph extends React.Component {
  componentDidMount() {
    const instance = jsPlumb.getInstance({});
    instance.setContainer("diagram");
    instance.bind("ready", function () {
      instance.registerConnectionTypes({
        "red-connection": {
          paintStyle: { stroke: "blue", strokeWidth: 5 },
          hoverPaintStyle: { stroke: "blue", strokeWidth: 10 },
          connector: "Flowchart",
        },
      });

      // task 1 adding elements on click
      var id = 100;
      instance.on(document.getElementById("add"), "click", function (e) {
        // alert("adding elements");
        id++;
        var container =
          "<div id='control" + id + "' class='control' >New Control</div>";

        $("#diagram").append(container);
        // alert(id);
        instance.draggable("control" + id, { containment: true });
        instance.addEndpoint("control" + id, {
          endpoint: "Dot",
          anchor: ["RightMiddle"],
          isSource: true,
          isTarget: true,
          maxConnections: 3,
          connectionType: "red-connection",
          onMaxConnections: function (info, e) {
            alert("Maximum connections reached");
          },
        });
      });

      // task 2 dragable elements
      instance.draggable("control1", { containment: true });
      instance.draggable("control2", { containment: true });
      //instance.draggable("control3", { containment: true });

      //task 3 delete elements control
      $("body").on("contextmenu", "#diagram .control", function (event) {
        event.preventDefault();
        window.selectedControl = $(this).attr("id");
        $(
          "<div class='custom-menu'><button class='delete-control'>Delete control</button></div>"
        )
          .appendTo("body")
          .css({ top: event.pageY + "px", left: event.pageX + "px" });
      });
      $("body").on("click", ".delete-control", function (event) {
        instance.remove(window.selectedControl);
      });

      //task 4 Connect elements visually
      instance.addEndpoint("control1", {
        endpoint: "Dot",
        anchor: ["RightMiddle"],
        isSource: true,
        connectionType: "red-connection",
      });
      instance.addEndpoint("control2", {
        endpoint: "Dot",
        anchor: ["LeftMiddle"],
        isTarget: true,

        //task 7 connect to multiple endpoints
        maxConnections: 3,
        connectionType: "red-connection",

        //task 8 maximum connection alert
        onMaxConnections: function (info, e) {
          alert("Maximum connections reached");
        },
      });
      // instance.addEndpoint("control3", {
      //   endpoint: "Dot",
      //   anchor: ["RightMiddle"],
      //   isSource: true,
      //   connectionType: "red-connection",
      // });

      // Task 5 delete connection
      instance.bind("contextmenu", function (component, event) {
        if (component.hasClass("jtk-connector")) {
          event.preventDefault();
          window.selectedConnection = component;
          $(
            "<div class='custom-menu'><button class='delete-connection'>Delete connection</button></div>"
          )
            .appendTo("body")
            .css({ top: event.pageY + "px", left: event.pageX + "px" });
        }
      });
      $("body").on("click", ".delete-connection", function (event) {
        //delete the line connection
        instance.deleteConnection(window.selectedConnection);
      });
      //remove the created button
      $(document).bind("click", function (event) {
        $("div.custom-menu").remove();
      });

      //task 6 run a function upon connection established
      instance.bind("connection", function (info, originalEvent) {
        alert("connection established");
      });

      //task 9 delete all connection on click
      instance.on(document.getElementById("endd"), "click", function (e) {
        alert("deleting connections");
        instance.deleteEveryConnection();
      });
    });
  }
  componentWillUnmount() {}

  render() {
    return (
      <React.Fragment>
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-3">
              <div id="toolbox" class="justify-content-center">
                <button id="endd" class="control">
                  Delete Connections
                </button>
                <button id="add" class="control">
                  Add elements
                </button>
              </div>
            </div>
            <div class="col-md-9">
              <div id="diagram" style={diagram}>
                <div id="control1" class="control" style={control1}>
                  Control Target
                </div>
                <div id="control2" class="control" style={control2}>
                  Control Source
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Graph;
