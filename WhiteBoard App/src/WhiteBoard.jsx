import React, { useEffect } from "react";

const WhiteBoard = () => {
  useEffect(() => {
    const canvas = document.getElementById("canvas");
    const undo = document.getElementById("undo");
    const ctx = canvas.getContext("2d");
   
    canvas.width = 1465;
    canvas.height = 500;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.strokeStyle = "red";
    let drawing = false;
    let pathsry = [];
    let points = [];

    var mouse = { x: 0, y: 0 };
    var previous = { x: 0, y: 0 };
    var r = document.querySelector(".r");
    r.addEventListener("click", (event) => {
      ctx.strokeStyle = event.target.value;
    });
    var g = document.querySelector(".g");
    g.addEventListener("click", (event) => {
      ctx.strokeStyle = event.target.value;
    });
    var b = document.querySelector(".b");
    b.addEventListener("click", (event) => {
      ctx.strokeStyle = event.target.value;
    });
    var y = document.querySelector(".y");
    y.addEventListener("click", (event) => {
      ctx.strokeStyle = event.target.value;
    });
    var penrange = document.querySelector(".pen-range");
    penrange.addEventListener("input", (event) => {
      ctx.lineWidth = event.target.value;
    });
    var colorchange = document.querySelector("#myColor");
    colorchange.addEventListener("change", (event) => {
      ctx.strokeStyle = event.target.value;
    });
    var clear = document.querySelector("#clear");
    var eraser = document.querySelector("#eraser");
    var download = document.querySelector("#download");

    download.addEventListener("click", () => {
      var dataURL = canvas.toDataURL("image/jpeg", 1.0);

      downloadImage(dataURL, "my-canvas.jpeg");
    });
    function downloadImage(data, filename = "untitled.jpeg") {
      var a = document.createElement("a");
      a.href = data;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
    }

    clear.addEventListener("click", () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
    eraser.addEventListener("click", () => {
      ctx.strokeStyle = "#ffffff";
    });
    canvas.addEventListener("mousedown", function (e) {
      drawing = true;
      previous = { x: mouse.x, y: mouse.y };
      mouse = oMousePos(canvas, e);
      points = [];
      points.push({ x: mouse.x, y: mouse.y });
    });

    canvas.addEventListener(
      "mousemove",
      function (e) {
        if (drawing) {
          previous = { x: mouse.x, y: mouse.y };
          mouse = oMousePos(canvas, e);

          points.push({ x: mouse.x, y: mouse.y });

          ctx.beginPath();
          ctx.moveTo(previous.x, previous.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      },
      false
    );

    canvas.addEventListener(
      "mouseup",
      function () {
        drawing = false;

        pathsry.push(points);
      },
      false
    );

    undo.addEventListener("click", Undo);

    function drawPaths() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      pathsry.forEach((path) => {
        ctx.beginPath();
        ctx.moveTo(path[0].x, path[0].y);
        for (let i = 1; i < path.length; i++) {
          ctx.lineTo(path[i].x, path[i].y);
        }
        ctx.stroke();
      });
    }

    function Undo() {
      pathsry.splice(-1, 1);

      drawPaths();
    }

    function oMousePos(canvas, evt) {
      var ClientRect = canvas.getBoundingClientRect();
      return {
        x: Math.round(evt.clientX - ClientRect.left),
        y: Math.round(evt.clientY - ClientRect.top),
      };
    }
  }, []);

  return (
    <div className="field">
      <h1 className="heading">WhiteBoard</h1>
      <div id="sketch">
        <canvas id="canvas"></canvas>
      </div>

      <div className="tools">
        <button type="button" className="button" id="undo">
          Undo
        </button>
        <button type="button" className="button" id="clear">
          Clear
        </button>
        <button type="button" className="button" id="eraser">
          Eraser
        </button>
        <button type="button" className="button" id="download">
          Download
        </button>
        <button
          className="color-field r"
          style={{ background: "red" }}
          value="#FF0000"
        ></button>
        <button
          className="color-field b"
          style={{ background: "blue" }}
          value="#0000FF"
        ></button>
        <button
          className="color-field g"
          style={{ background: "green" }}
          value="#00FF00"
        ></button>
        <button
          className="color-field y"
          style={{ background: "yellow" }}
          value="#FFFF00"
        ></button>

        <input type="color" className="color-picker" id="myColor" />
        <input
          type="range"
          min="-3"
          max="100"
          className="pen-range"
          defaultValue="-3"
        />
        <image id="theimage"></image>
      </div>
    </div>
  );
};

export default WhiteBoard;
