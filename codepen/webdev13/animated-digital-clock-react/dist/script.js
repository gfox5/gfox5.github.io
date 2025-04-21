function _extends() {_extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};return _extends.apply(this, arguments);}import React from "https://esm.sh/react@18.3.1";
import ReactDOM from "https://esm.sh/react-dom@18.3.1";

import gsap from "https://esm.sh/gsap";
import { useGSAP } from "https://esm.sh/@gsap/react?deps=react@18.3.1";
gsap.registerPlugin(MorphSVGPlugin);
const { useRef, useState } = React;
const style = window.getComputedStyle(document.body);

const Divider = props => {
  const { contextSafe } = useGSAP({ scope: props.scope.current });
  const colon = useRef();

  useGSAP((context, contextSafe) => {
    gsap.to(colon.current, {
      opacity: 0,
      repeat: -1,
      yoyo: true,
      duration: 0.5,
      ease: 'none' });

  });

  return /*#__PURE__*/(
    React.createElement(React.Fragment, null, /*#__PURE__*/
    React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "360", viewBox: "0 0 800 800",
      className: "dividerSVG" }, /*#__PURE__*/


    React.createElement("defs", null, /*#__PURE__*/
    React.createElement("linearGradient", {
      id: "a",
      x1: 400,
      y1: 0,
      x2: 400,
      y2: 800,
      gradientUnits: "userSpaceOnUse" }, /*#__PURE__*/

    React.createElement("stop", { offset: 0, stopColor: style.getPropertyValue('--grad') }), /*#__PURE__*/
    React.createElement("stop", { offset: 0.5, stopColor: "#fff", stopOpacity: 0 }), /*#__PURE__*/
    React.createElement("stop", { offset: 1, stopColor: style.getPropertyValue('--grad') }))), /*#__PURE__*/



    React.createElement("path", { ref: colon, d: "M555.56,800H244.44v-311.11h311.11v311.11ZM555.56,311.11H244.44S244.44,0,244.44,0h311.11v311.11Z", fill: style.getPropertyValue('--grad'), opacity: 0.5 }))));





};
const TimeNumber = props => {

  const [delay, setDelay] = useState(0.1);
  const [time, setTime] = useState(new Date());
  const { contextSafe } = useGSAP({ scope: props.scope.current });
  const pathArr = [
  { path1: "M640 400H150V160h490v240z",
    path2: "M640 640H150V400h490v240z" },
  { path2: "M320 640H0V160h320v480z",
    path1: "M800 640H480V0h320v640z" },
  { path1: "M640 320H0V160h640v160z",
    path2: "M800 640H160V480h640v160z" },
  { path1: "M640 320H0V160h640v160z",
    path2: "M640 640H0V480h640v160z" },
  { path1: "M640 320H160V0h480v320z",
    path2: "M640 800H0V480h640v320z" },
  { path1: "M800 320H160V160h640v160z",
    path2: "M640 640H0V480h640v160z" },
  { path1: "M800 320H160V160h640v160z",
    path2: "M640 640H160V480h480v160z" },
  { path1: "M640 480H0V160h640v320z",
    path2: "M640 800H0V480h640v320z" },
  { path1: "M640 320H160V160h480v160z",
    path2: "M640 640H160V480h480v160z" },
  { path1: "M640 320H160V160h480v160z",
    path2: "M640 640H0V480h640v160z" }];


  const barPath1 = useRef();
  const barPath2 = useRef();

  const timer = gsap.delayedCall(1, () => setTime(new Date()));

  useGSAP((context, contextSafe) => {
    let hours = time.getHours();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour 0 should be 12
    
    // let h1 = time.getHours().toString().length < 2 ? 0 : time.getHours().toString()[0];
    // let h2 = time.getHours().toString().length < 2 ? time.getHours() : time.getHours().toString()[1];
    let h1 = hours.toString().length < 2 ? 0 : hours.toString()[0];
    let h2 = hours.toString().length < 2 ? hours : hours.toString()[1];

    let m1 = time.getMinutes().toString().length < 2 ? 0 : time.getMinutes().toString()[0];
    let m2 = time.getMinutes().toString().length < 2 ? time.getMinutes() : time.getMinutes().toString()[1];
    //console.log(h1, h2, m1, m2);
    let timeNow = `${h1}${h2}${m1}${m2}`;
    let target1 = pathArr[timeNow[props.id]].path1;
    let target2 = pathArr[timeNow[props.id]].path2;



    gsap.to(barPath1.current, {
      morphSVG: {
        shape: target1 },

      delay: props.id * delay,
      duration: 1,
      ease: 'expo.inOut' });

    gsap.to(barPath2.current, {
      morphSVG: {
        shape: target2 },

      delay: props.id * delay,
      duration: 1,
      ease: 'expo.inOut' });


  }, { dependencies: [time], scope: props.scope.current });

  return /*#__PURE__*/(
    React.createElement("svg", {
      className: "mainSVG",
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 800 800" }, /*#__PURE__*/

    React.createElement("defs", null, /*#__PURE__*/
    React.createElement("linearGradient", {
      id: "a",
      x1: 400,
      y1: 0,
      x2: 400,
      y2: 800,
      gradientUnits: "userSpaceOnUse" }, /*#__PURE__*/

    React.createElement("stop", { offset: 0, stopColor: style.getPropertyValue('--grad') }), /*#__PURE__*/
    React.createElement("stop", { offset: 0.5, stopColor: "#fff", stopOpacity: 0 }), /*#__PURE__*/
    React.createElement("stop", { offset: 1, stopColor: style.getPropertyValue('--grad') }))), /*#__PURE__*/



    React.createElement("path", { d: "M800 800H0V0h800v800z", fill: style.getPropertyValue('--grad') }), /*#__PURE__*/
    React.createElement("path", { d: "M800 800H0V0h800v800z", fill: "url(#a)" }), /*#__PURE__*/
    React.createElement("path", { ref: barPath1, d: "M800 800H0V0h800v800z", fill: style.getPropertyValue('--bg') }), /*#__PURE__*/
    React.createElement("path", { ref: barPath2, d: "M800 800H0V0h800v800z", fill: style.getPropertyValue('--bg') }), /*#__PURE__*/
    React.createElement("path", { d: "M800 800H0V0h800v800z", fill: "transparent", stroke: style.getPropertyValue('--bg'), strokeWidth: "42" })));


};

// Add AM/PM indicator
const AMPMIndicator = props => {
  const [time, setTime] = useState(new Date());
  
  // Update time every second
  const timer = gsap.delayedCall(1, () => setTime(new Date()));
  
  // Determine if it's AM or PM
  const ampm = time.getHours() >= 12 ? 'PM' : 'AM';
  
  return /*#__PURE__*/(
    React.createElement("div", { 
      style: { 
        position: "absolute",
        bottom: "20px", 
        right: "20px", 
        color: style.getPropertyValue('--grad'),
        fontSize: "2rem",
        fontWeight: "bold"
      } 
    }, ampm)
  );
};

const MainTime = props => {
  //console.log(props)
  let list = [];
  for (let i = 0; i < 4; i++) {
    if (i == 2) {
      list.push( /*#__PURE__*/React.createElement(Divider, props));
    }
    list.push( /*#__PURE__*/React.createElement(TimeNumber, _extends({ id: i, key: i }, props)));
  }
  return /*#__PURE__*/(
    React.createElement(React.Fragment, null,
    list));


};
function App() {

  const container = useRef();

  return /*#__PURE__*/(
    React.createElement("div", { className: "App" }, /*#__PURE__*/
    React.createElement("div", { className: "container",
      ref: container }, /*#__PURE__*/

    React.createElement(MainTime, { scope: container })),
    /*#__PURE__*/React.createElement(AMPMIndicator, null)));



}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render( /*#__PURE__*/React.createElement(App, null));