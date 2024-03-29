 = () => {
//         this.setState({ loading: false, thumb: reader.result });
//       };
//       reader.readAsDataURL(nextProps.file);
//     });
//   }
//   render() {
//     const { file } = this.props;
//     const { loading, thumb } = this.state;
//     if (!file) { return null; }
//     if (loading) { return <p>loading...</p>; }
//     return (<img src={thumb}
//       alt={file.name}
//       className="img-thumbnail mt-2"
//       height={200}
//       width={200} />);
//   }
// }

var _c;

__webpack_require__.$Refresh$.register(_c, "Thumb");

const $ReactRefreshModuleId$ = __webpack_require__.$Refresh$.moduleId;
const $ReactRefreshCurrentExports$ = __react_refresh_utils__.getModuleExports(
	$ReactRefreshModuleId$
);

function $ReactRefreshModuleRuntime$(exports) {
	if (true) {
		let errorOverlay;
		if (true) {
			errorOverlay = false;
		}
		let testMode;
		if (typeof __react_refresh_test__ !== 'undefined') {
			testMode = __react_refresh_test__;
		}
		return __react_refresh_utils__.executeRuntime(
			exports,
			$ReactRefreshModuleId$,
			module.hot,
			errorOverlay,
			testMode
		);
	}
}

if (typeof Promise !== 'undefined' && $ReactRefreshCurrentExports$ instanceof Promise) {
	$ReactRefreshCurrentExports$.then($ReactRefreshModuleRuntime$);
} else {
	$ReactRefreshModuleRuntime$($ReactRefreshCurrentExports$);
}

/***/ })��{"module":true,"columns":false,"finalSource":true}�map�bufferedMap�version�file�mappings�sources�sourcesContent�names�x�  ;;;;;;;;;;;;;;;AAAA;AAEA;;;;AACA;AAAsB;;AACpB;AACA;;AAEA;AACE;AACE;AACD;;AACD;;AAEA;;AAEA;AACE;AACA;AACD;;AACD;AACD;;AAED;AAEA;;AACA;AACE;AACD;;AAED;AACE;AAAO;AAAA;AAAA;AAAA;AAAA;AAAA;AACR;;AAED;AAAY;AAAY;AAA+B;AAAa;AAA7D;AAAA;AAAA;AAAA;AAAA;AACR;;AA/BQ;;AAAA;AAiCT,iEAAe,KAAK;AAGpB;AACA;AACA;AACA;AAEA;AACA;AAEA;AACA;AAEA;AACA;AACA;AAEA;AACA;AACA;AAEA;AACA;AACA;AAEA;AAEA;AAEA;AACA;AACA;AACA;AACA;AACA;AACA�webpack://./src/components/ui/Thumb.js4  import React, { useState } from "react"

/* display a thumb picture of uploaded pic */
function Thumb(props) {
  const [loading, setLoading] = useState(true)
  const [thumb, setThumb] = useState("")

  const fileSetup = () => {
    if (!props.file) {
      return
    }
    console.log("fileSetup:" + props.file)
    //! setLoading(true) - ERROR too many react re renders
    let reader = new FileReader()

    reader.onloadend = () => {
      setLoading(false)
      setThumb(reader.result)
    }
    reader.readAsDataURL(props.file)
  }

  fileSetup()

  /* views */
  while (!props.file) {
    return null
  }

  if (loading) {
    return <p>loading...</p>
  }

  return <img src={thumb} className="img-thumbnail mt-2" height={200} width={200} />
}

export default Thumb

// class Thumb extends React.Component {
//   state = {
//     loading: false,
//     thumb: undefined,
//   };

//   componentWillReceiveProps(nextProps) {
//     if (!nextProps.file) { return; }

//     this.setState({ loading: true }, () => {
//       let reader = new FileReader();

//       reader.onloadend = () => {
//         this.setState({ loading: false, thumb: reader.result });
//       };

//       reader.readAsDataURL(nextProps.file);
//     });
//   }

//   render() {
//     const { file } = this.props;
//     const { loading, thumb } = this.state;

//     if (!file) { return null; }

//     if (loading) { return <p>loading...</p>; }

//     return (<img src={thumb}
//       alt={file.name}
//       className="img-thumbnail mt-2"
//       height={200}
//       width={200} />);
//   }
// }
 
   ConcatSourceRawSourceN   /***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
��  __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
   ReplaceSourceSourceMapSourceE  __webpack_require__.$Refresh$.runtime = require('/home/mike/projects/ticket-app/node_modules/react-refresh/runtime.js');

var _jsxFileName = "/home/mike/projects/ticket-app/src/components/ui/Thumb.js",
    _s = $RefreshSig$();

import React, { useState } from "react";
/* display a thumb picture of uploaded pic */

import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";

function Thumb(props) {
  _s();

  const [loading, setLoading] = useState(true);
  const [thumb, setThumb] = useState("");

  const fileSetup = () => {
    if (!props.file) {
      return;
    }

    console.log("fileSetup:" + props.file); //! setLoading(true) - ERROR too many react re renders

    let reader = new FileReader();

    reader.onloadend = () => {
      setLoading(false);
      setThumb(reader.result);
    };

    reader.readAsDataURL(props.file);
  };

  fileSetup();
  /* views */

  while (!props.file) {
    return null;
  }

  if (loading) {
    return /*#__PURE__*/_jsxDEV("p", {
      children: "loading..."
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 31,
      columnNumber: 12
    }, this);
  }

  return /*#__PURE__*/_jsxDEV("img", {
    src: thumb,
    className: "img-thumbnail mt-2",
    height: 200,
    width: 200
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 34,
    columnNumber: 10
  }, this);
}

_s(Thumb, "5BaGtg2KRLatiqLPdvCcOebzKq8=");

_c = Thumb;
export default Thumb; // class Thumb extends React.Component {
//   state = {
//     loading: false,
//     thumb: undefined,
//   };
//   componentWillReceiveProps(nextProps) {
//     if (!nextProps.file) { return; }
//     this.setState({ loading: true }, () => {
//       let reader = new FileReader();
//       reader.onloadend = () => {
//         this.setState({ loading: false, thumb: reader.result });
//       };
//       reader.readAsDataURL(nextProps.file);
//     });
//   }
//   render() {
//     const { file } = this.props;
//    