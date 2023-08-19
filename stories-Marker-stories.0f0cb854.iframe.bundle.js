"use strict";(self.webpackChunkreact_geo_drawings=self.webpackChunkreact_geo_drawings||[]).push([[732],{"./src/stories/Marker.stories.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{MarkerDemo:function(){return MarkerDemo},__namedExportsOrder:function(){return __namedExportsOrder}});__webpack_require__("./node_modules/react/index.js");var _index__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/index.ts"),_MarkerExample__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/stories/MarkerExample.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/react/jsx-runtime.js");__webpack_exports__.default={title:"GeoDrawing/Marker",component:_index__WEBPACK_IMPORTED_MODULE_1__.WK,parameters:{layout:"fullscreen"}};const Template=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_index__WEBPACK_IMPORTED_MODULE_1__.Ib,{provider:"google",apiKey:"",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_MarkerExample__WEBPACK_IMPORTED_MODULE_2__.Z,{})});Template.displayName="Template";const MarkerDemo=Template.bind({});MarkerDemo.args={},MarkerDemo.parameters={...MarkerDemo.parameters,docs:{...MarkerDemo.parameters?.docs,source:{originalSource:'() => <MapProvider provider="google" apiKey="">\n        <MarkerExample />\n    </MapProvider>',...MarkerDemo.parameters?.docs?.source}}};const __namedExportsOrder=["MarkerDemo"]},"./src/stories/MarkerExample.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_mui_material__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@mui/material/Grid/Grid.js"),_mui_material__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@mui/material/TextField/TextField.js"),___WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/index.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react/jsx-runtime.js");const kyiv={lat:50.4501,lng:30.5234},MarkerExample=()=>{const ref=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null),[markerPoint,setMarkerPoint]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(kyiv);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_mui_material__WEBPACK_IMPORTED_MODULE_3__.ZP,{style:{marginTop:10},container:!0,alignItems:"flex-start",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_mui_material__WEBPACK_IMPORTED_MODULE_3__.ZP,{item:!0,xs:4,container:!0,children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_mui_material__WEBPACK_IMPORTED_MODULE_3__.ZP,{item:!0,xs:6,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_mui_material__WEBPACK_IMPORTED_MODULE_4__.Z,{label:"Longitude",value:markerPoint.lng,variant:"outlined"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_mui_material__WEBPACK_IMPORTED_MODULE_3__.ZP,{item:!0,xs:6,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_mui_material__WEBPACK_IMPORTED_MODULE_4__.Z,{label:"Latitude",value:markerPoint.lat,variant:"outlined"})})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_mui_material__WEBPACK_IMPORTED_MODULE_3__.ZP,{item:!0,xs:8,children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div",{style:{height:"600px"},ref:ref,id:"map"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(___WEBPACK_IMPORTED_MODULE_1__.WK,{containerRef:ref,center:kyiv,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(___WEBPACK_IMPORTED_MODULE_1__.Jx,{coordinates:markerPoint,draggable:!0,onChange:point=>{setMarkerPoint(point)}},"my-marker")})]})]})};MarkerExample.displayName="MarkerExample",__webpack_exports__.Z=MarkerExample}}]);