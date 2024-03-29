(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["testpackage"] = factory();
	else
		root["TEST"] = factory();
})((typeof self!='undefined'?self:this), function() {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../node_modules/@alt1/base/dist/alt1api.js":
/*!**************************************************!*\
  !*** ../node_modules/@alt1/base/dist/alt1api.js ***!
  \**************************************************/
/***/ (() => {

"use strict";



/***/ }),

/***/ "../node_modules/@alt1/base/dist/declarations.js":
/*!*******************************************************!*\
  !*** ../node_modules/@alt1/base/dist/declarations.js ***!
  \*******************************************************/
/***/ (() => {

"use strict";



/***/ }),

/***/ "../node_modules/@alt1/base/dist/imagedata-extensions.js":
/*!***************************************************************!*\
  !*** ../node_modules/@alt1/base/dist/imagedata-extensions.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ImageData": () => (/* binding */ ImageData)
/* harmony export */ });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "../node_modules/@alt1/base/dist/index.js");
/* harmony import */ var _nodepolyfill_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./nodepolyfill.js */ "../node_modules/@alt1/base/dist/nodepolyfill.js");


//export this so node.js can also use it
var ImageData;
// //TODO revamp this madness a bit?
// (function () {
// 	var globalvar = (typeof self != "undefined" ? self : (typeof (global as any) != "undefined" ? (global as any) : null)) as any;
// 	//use the node-canvas version when on node
// 	if (typeof globalvar.ImageData == "undefined") {
// 		let nodecnv = requireNodeCanvas();
// 		globalvar.ImageData = nodecnv.ImageData;
// 	}
// 	var fill = typeof globalvar.ImageData == "undefined";
// 	//should never be reach anymore
// 	var constr = function (this: any) {
// 		var i = 0;
// 		var data = (arguments[i] instanceof Uint8ClampedArray ? arguments[i++] : null);
// 		var width = arguments[i++];
// 		var height = arguments[i++];
// 		if (fill) {
// 			if (!data) { data = new Uint8ClampedArray(width * height * 4); }
// 			this.width = width;
// 			this.height = height;
// 			this.data = data;
// 		}
// 		else if (oldconstr) {
// 			return (data ? new oldconstr(data, width, height) : new oldconstr(width, height));
// 		} else {
// 			var canvas = document.createElement('canvas');
// 			canvas.width = width;
// 			canvas.height = height;
// 			var ctx = canvas.getContext("2d")!;
// 			var imageData = ctx.createImageData(width, height);
// 			if (data) { imageData.data.set(data); }
// 			return imageData;
// 		}
// 	}
// 	var oldconstr = globalvar.ImageData;
// 	if (typeof document != "undefined") {
// 		try {
// 			new oldconstr(1, 1);
// 		} catch (e) {
// 			//direct constructor call not allowed in ie
// 			oldconstr = null;
// 		}
// 	}
// 	if (!fill) { constr.prototype = globalvar.ImageData.prototype; }
// 	globalvar.ImageData = constr;
// 	ImageData = constr as any;
// })();
(function () {
    var globalvar = (typeof self != "undefined" ? self : (typeof global != "undefined" ? global : null));
    var filltype = typeof globalvar.ImageData == "undefined" || typeof globalvar.document == "undefined";
    var fillconstr = filltype;
    if (!filltype) {
        var oldconstr = globalvar.ImageData;
        try {
            let data = new Uint8ClampedArray(4);
            data[0] = 1;
            let a = new globalvar.ImageData(data, 1, 1);
            fillconstr = a.data[0] != 1;
        }
        catch (e) {
            fillconstr = true;
        }
    }
    if (fillconstr) {
        var constr = function ImageDataShim() {
            var i = 0;
            var data = (arguments[i] instanceof Uint8ClampedArray ? arguments[i++] : null);
            var width = arguments[i++];
            var height = arguments[i++];
            if (filltype) {
                if (!data) {
                    data = new Uint8ClampedArray(width * height * 4);
                }
                this.width = width;
                this.height = height;
                this.data = data;
            }
            else if (fillconstr) {
                //WARNING This branch of code does not use the same pixel data backing store
                //(problem with wasm, however all wasm browser have a native constructor (unless asm.js is used))
                var canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                var ctx = canvas.getContext("2d");
                var imageData = ctx.createImageData(width, height);
                if (data) {
                    imageData.data.set(data);
                }
                return imageData;
            }
            // else {
            // 	//oh no...
            // 	//we need this monstrocity in order to call the native constructor with variable number of args
            // 	//when es5 transpile is enable (that strips the spread operator)
            // 	return new (Function.prototype.bind.apply(oldconstr, [null,...arguments]));
            // }
        };
        if (!filltype) {
            constr.prototype = globalvar.ImageData.prototype;
        }
        globalvar.ImageData = constr;
        ImageData = constr;
    }
    else {
        ImageData = globalvar.ImageData;
    }
})();
//Recast into a drawable imagedata class on all platforms, into a normal browser ImageData on browsers or a node-canvas imagedata on nodejs
ImageData.prototype.toDrawableData = function () {
    if (typeof document == "undefined") {
        return _nodepolyfill_js__WEBPACK_IMPORTED_MODULE_1__.imageDataToDrawable(this);
    }
    else {
        return this;
    }
};
ImageData.prototype.putImageData = function (buf, cx, cy) {
    for (var dx = 0; dx < buf.width; dx++) {
        for (var dy = 0; dy < buf.height; dy++) {
            var i1 = (dx + cx) * 4 + (dy + cy) * 4 * this.width;
            var i2 = dx * 4 + dy * 4 * buf.width;
            this.data[i1] = buf.data[i2];
            this.data[i1 + 1] = buf.data[i2 + 1];
            this.data[i1 + 2] = buf.data[i2 + 2];
            this.data[i1 + 3] = buf.data[i2 + 3];
        }
    }
};
ImageData.prototype.pixelOffset = function (x, y) {
    return x * 4 + y * this.width * 4;
};
//creates a hash of a portion of the buffer used to check for changes
ImageData.prototype.getPixelHash = function (rect) {
    if (!rect) {
        rect = new _index_js__WEBPACK_IMPORTED_MODULE_0__.Rect(0, 0, this.width, this.height);
    }
    var hash = 0;
    for (var x = rect.x; x < rect.x + rect.width; x++) {
        for (var y = rect.y; y < rect.y + rect.height; y++) {
            var i = x * 4 + y * 4 * this.width;
            hash = (((hash << 5) - hash) + this.data[i]) | 0;
            hash = (((hash << 5) - hash) + this.data[i + 1]) | 0;
            hash = (((hash << 5) - hash) + this.data[i + 2]) | 0;
            hash = (((hash << 5) - hash) + this.data[i + 3]) | 0;
        }
    }
    return hash;
};
ImageData.prototype.clone = function (rect) {
    return this.toImage(rect).getContext("2d").getImageData(0, 0, rect.width, rect.height);
};
ImageData.prototype.show = function (x = 5, y = 5, zoom = 1) {
    if (typeof document == "undefined") {
        console.error("need a document to show an imagedata object");
        return;
    }
    var imgs = document.getElementsByClassName("debugimage");
    while (imgs.length > ImageData.prototype.show.maxImages) {
        imgs[0].remove();
    }
    var el = this.toImage();
    el.classList.add("debugimage");
    el.style.position = "absolute";
    el.style.zIndex = "1000";
    el.style.left = x / zoom + "px";
    el.style.top = y / zoom + "px";
    el.style.background = "purple";
    el.style.cursor = "pointer";
    el.style.imageRendering = "pixelated";
    el.style.outline = "1px solid #0f0";
    el.style.width = (this.width == 1 ? 100 : this.width) * zoom + "px";
    el.style.height = (this.height == 1 ? 100 : this.height) * zoom + "px";
    el.onclick = function () { el.remove(); };
    document.body.appendChild(el);
    return el;
};
ImageData.prototype.show.maxImages = 10;
ImageData.prototype.toImage = function (rect) {
    if (!rect) {
        rect = new _index_js__WEBPACK_IMPORTED_MODULE_0__.Rect(0, 0, this.width, this.height);
    }
    if (typeof document != "undefined") {
        var el = document.createElement("canvas");
        el.width = rect.width;
        el.height = rect.height;
    }
    else {
        el = _nodepolyfill_js__WEBPACK_IMPORTED_MODULE_1__.createCanvas(rect.width, rect.height);
    }
    var ctx = el.getContext("2d");
    ctx.putImageData(this.toDrawableData(), -rect.x, -rect.y);
    return el;
};
ImageData.prototype.getPixel = function (x, y) {
    var i = x * 4 + y * 4 * this.width;
    return [this.data[i], this.data[i + 1], this.data[i + 2], this.data[i + 3]];
};
ImageData.prototype.getPixelValueSum = function (x, y) {
    var i = x * 4 + y * 4 * this.width;
    return this.data[i] + this.data[i + 1] + this.data[i + 2];
};
ImageData.prototype.getPixelInt = function (x, y) {
    var i = x * 4 + y * 4 * this.width;
    return (this.data[i + 3] << 24) + (this.data[i + 0] << 16) + (this.data[i + 1] << 8) + (this.data[i + 2] << 0);
};
ImageData.prototype.getColorDifference = function (x, y, r, g, b, a = 255) {
    var i = x * 4 + y * 4 * this.width;
    return Math.abs(this.data[i] - r) + Math.abs(this.data[i + 1] - g) + Math.abs(this.data[i + 2] - b) * a / 255;
};
ImageData.prototype.setPixel = function (x, y, ...color) {
    var r, g, b, a;
    var [r, g, b, a] = (Array.isArray(color[0]) ? color[0] : color);
    var i = x * 4 + y * 4 * this.width;
    this.data[i] = r;
    this.data[i + 1] = g;
    this.data[i + 2] = b;
    this.data[i + 3] = a == undefined ? 255 : a;
};
ImageData.prototype.setPixelInt = function (x, y, color) {
    var i = x * 4 + y * 4 * this.width;
    this.data[i] = (color >> 24) & 0xff;
    this.data[i + 1] = (color >> 16) & 0xff;
    this.data[i + 2] = (color >> 8) & 0xff;
    this.data[i + 3] = (color >> 0) & 0xff;
};
ImageData.prototype.toFileBytes = function (format, quality) {
    if (typeof HTMLCanvasElement != "undefined") {
        return new Promise(d => this.toImage().toBlob(b => {
            var r = new FileReader();
            r.readAsArrayBuffer(b);
            r.onload = () => d(new Uint8Array(r.result));
        }, format, quality));
    }
    else {
        return _nodepolyfill_js__WEBPACK_IMPORTED_MODULE_1__.imageDataToFileBytes(this, format, quality);
    }
};
ImageData.prototype.toPngBase64 = function () {
    if (typeof HTMLCanvasElement != "undefined") {
        var str = this.toImage().toDataURL("image/png");
        return str.slice(str.indexOf(",") + 1);
    }
    else {
        throw new Error("synchronous image conversion not supported in nodejs, try using ImageData.prototype.toFileBytes");
    }
};
ImageData.prototype.pixelCompare = function (buf, x = 0, y = 0, max) {
    return _index_js__WEBPACK_IMPORTED_MODULE_0__.ImageDetect.simpleCompare(this, buf, x, y, max);
};
ImageData.prototype.copyTo = function (target, sourcex, sourcey, width, height, targetx, targety) {
    //convince v8 that these are 31bit uints
    const targetwidth = target.width | 0;
    const thiswidth = this.width | 0;
    const copywidth = width | 0;
    const fastwidth = Math.floor(width / 4) * 4;
    const thisdata = new Int32Array(this.data.buffer, this.data.byteOffset, this.data.byteLength / 4);
    const targetdata = new Int32Array(target.data.buffer, target.data.byteOffset, target.data.byteLength / 4);
    for (let cy = 0; cy < height; cy++) {
        let cx = 0;
        let it = (cx + targetx) + (cy + targety) * targetwidth;
        let is = (cx + sourcex) + (cy + sourcey) * thiswidth;
        //copy 4 pixels per iter (xmm)
        for (; cx < fastwidth; cx += 4) {
            targetdata[it] = thisdata[is];
            targetdata[it + 1] = thisdata[is + 1];
            targetdata[it + 2] = thisdata[is + 2];
            targetdata[it + 3] = thisdata[is + 3];
            it += 4;
            is += 4;
        }
        //copy remainder per pixel
        for (; cx < copywidth; cx++) {
            targetdata[it] = thisdata[is];
            it += 1;
            is += 1;
        }
    }
};
if (typeof HTMLImageElement != "undefined") {
    HTMLImageElement.prototype.toBuffer = function (x = 0, y = 0, w = this.width, h = this.height) {
        var cnv = document.createElement("canvas");
        cnv.width = w;
        cnv.height = h;
        var ctx = cnv.getContext("2d");
        ctx.drawImage(this, -x, -y);
        return ctx.getImageData(0, 0, w, h);
    };
    HTMLImageElement.prototype.toCanvas = function (x = 0, y = 0, w = this.width, h = this.height) {
        var cnv = document.createElement("canvas");
        cnv.width = w;
        cnv.height = h;
        var ctx = cnv.getContext("2d");
        ctx.drawImage(this, -x, -y);
        return cnv;
    };
}


/***/ }),

/***/ "../node_modules/@alt1/base/dist/imagedetect.js":
/*!******************************************************!*\
  !*** ../node_modules/@alt1/base/dist/imagedetect.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ImageDataSet": () => (/* binding */ ImageDataSet),
/* harmony export */   "asyncMap": () => (/* binding */ asyncMap),
/* harmony export */   "clearPngColorspace": () => (/* binding */ clearPngColorspace),
/* harmony export */   "coldif": () => (/* binding */ coldif),
/* harmony export */   "findSubbuffer": () => (/* binding */ findSubbuffer),
/* harmony export */   "findSubimage": () => (/* binding */ findSubimage),
/* harmony export */   "imageDataFromBase64": () => (/* binding */ imageDataFromBase64),
/* harmony export */   "imageDataFromFileBuffer": () => (/* binding */ imageDataFromFileBuffer),
/* harmony export */   "imageDataFromUrl": () => (/* binding */ imageDataFromUrl),
/* harmony export */   "isPngBuffer": () => (/* binding */ isPngBuffer),
/* harmony export */   "simpleCompare": () => (/* binding */ simpleCompare),
/* harmony export */   "simpleCompareRMSE": () => (/* binding */ simpleCompareRMSE),
/* harmony export */   "webpackImages": () => (/* binding */ webpackImages)
/* harmony export */ });
/* harmony import */ var _imgref_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./imgref.js */ "../node_modules/@alt1/base/dist/imgref.js");
/* harmony import */ var _wrapper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./wrapper.js */ "../node_modules/@alt1/base/dist/wrapper.js");
/* harmony import */ var _nodepolyfill_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./nodepolyfill.js */ "../node_modules/@alt1/base/dist/nodepolyfill.js");
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./index.js */ "../node_modules/@alt1/base/dist/index.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};




/**
* Downloads an image and returns the ImageData
* Make sure the png image does not have a sRGB chunk or the resulting pixels will differ for different users!!!
* @param url http(s) or data url to the image
*/
function imageDataFromUrl(url) {
    return __awaiter(this, void 0, void 0, function* () {
        if (typeof Image != "undefined") {
            var img = new Image();
            img.crossOrigin = "crossorigin";
            return yield new Promise((done, fail) => {
                img.onload = function () { done(img.toBuffer()); };
                img.onerror = fail;
                img.src = url;
            });
        }
        else {
            var hdr = "data:image/png;base64,";
            if (url.startsWith(hdr)) {
                return imageDataFromBase64(url.slice(hdr.length));
            }
            throw new Error("loading remote images in nodejs has been disabled, load the raw bytes and use imageDataFromNodeBuffer instead");
        }
    });
}
/**
* Loads an ImageData object from a base64 encoded png image
* Make sure the png image does not have a sRGB chunk or the resulting pixels will differ for different users!!!
* @param data a base64 encoded png image
*/
function imageDataFromBase64(data) {
    return __awaiter(this, void 0, void 0, function* () {
        if (typeof Image != "undefined") {
            return imageDataFromUrl("data:image/png;base64," + data);
        }
        else {
            return _nodepolyfill_js__WEBPACK_IMPORTED_MODULE_2__.imageDataFromBase64(data);
        }
    });
}
/**
 * Loads an ImageData object directly from a png encoded file buffer
 * This method ensures that png color space headers are taken care off
 * @param data The bytes of a png file
 */
function imageDataFromFileBuffer(data) {
    return __awaiter(this, void 0, void 0, function* () {
        clearPngColorspace(data);
        if (typeof Image != "undefined") {
            let blob = new Blob([data], { type: "image/png" });
            let url = URL.createObjectURL(blob);
            let r = yield imageDataFromUrl(url);
            URL.revokeObjectURL(url);
            return r;
        }
        else {
            return _nodepolyfill_js__WEBPACK_IMPORTED_MODULE_2__.imageDataFromBuffer(data);
        }
    });
}
/**
* Checks if a given byte array is a png file (by checking for ?PNG as first 4 bytes)
* @param bytes Raw bytes of the png file
*/
function isPngBuffer(bytes) {
    return bytes[0] == 137 && bytes[1] == 80 && bytes[2] == 78 && bytes[3] == 71;
}
/**
* Resets the colorspace data in the png file.
* This makes sure the browser renders the exact colors in the file instead of filtering it in order to obtain the best real life representation of
* what it looked like on the authors screen. (this feature is often broken and not supported)
* For example a round trip printscreen -> open in browser results in different colors than the original
* @param data Raw bytes of the png file
*/
function clearPngColorspace(data) {
    if (!isPngBuffer(data)) {
        throw new Error("non-png image received");
    }
    var i = 8;
    while (i < data.length) {
        var length = data[i++] * 0x1000000 + data[i++] * 0x10000 + data[i++] * 0x100 + data[i++];
        var ancillary = !!((data[i] >> 5) & 1);
        var chunkname = String.fromCharCode(data[i], data[i + 1], data[i + 2], data[i + 3]);
        var chunkid = chunkname.toLowerCase();
        if (chunkid != "trns" && ancillary) {
            data[i + 0] = "n".charCodeAt(0);
            data[i + 1] = "o".charCodeAt(0);
            data[i + 2] = "P".charCodeAt(0);
            data[i + 3] = "E".charCodeAt(0);
            //calculate new chunk checksum
            //http://www.libpng.org/pub/png/spec/1.2/PNG-CRCAppendix.html
            var end = i + 4 + length;
            var crc = 0xffffffff;
            //should be fast enough like this
            var bitcrc = function (bit) {
                for (var k = 0; k < 8; k++) {
                    if (bit & 1) {
                        bit = 0xedb88320 ^ (bit >>> 1);
                    }
                    else {
                        bit = bit >>> 1;
                    }
                }
                return bit;
            };
            for (var a = i; a < end; a++) {
                if (a >= i + 4) {
                    data[a] = 0;
                }
                var bit = data[a];
                crc = bitcrc((crc ^ bit) & 0xff) ^ (crc >>> 8);
            }
            crc = crc ^ 0xffffffff;
            //new chunk checksum
            data[i + 4 + length + 0] = (crc >> 24) & 0xff;
            data[i + 4 + length + 1] = (crc >> 16) & 0xff;
            data[i + 4 + length + 2] = (crc >> 8) & 0xff;
            data[i + 4 + length + 3] = (crc >> 0) & 0xff;
        }
        if (chunkname == "IEND") {
            break;
        }
        i += 4; //type
        i += length; //data
        i += 4; //crc
    }
}
/**
* finds the given needle ImageBuffer in the given haystack ImgRef this function uses the best optimized available
* code depending on the type of the haystack. It will use fast c# searching if the haystack is an ImgRefBind, js searching
* is used otherwise.
* the checklist argument is no longer used and should ignored or null/undefined
* The optional sx,sy,sw,sh arguments indicate a bounding rectangle in which to search the needle. The rectangle should be bigger than the needle
* @returns An array of points where the needle is found. The array is empty if none are found
*/
function findSubimage(haystackImgref, needleBuffer, sx = 0, sy = 0, sw = haystackImgref.width, sh = haystackImgref.height) {
    if (!haystackImgref) {
        throw new TypeError();
    }
    if (!needleBuffer) {
        throw new TypeError();
    }
    var max = 30;
    //check if we can do this in alt1
    if (haystackImgref instanceof _imgref_js__WEBPACK_IMPORTED_MODULE_0__.ImgRefBind && _wrapper_js__WEBPACK_IMPORTED_MODULE_1__.hasAlt1 && alt1.bindFindSubImg) {
        var needlestr = _wrapper_js__WEBPACK_IMPORTED_MODULE_1__.encodeImageString(needleBuffer);
        var r = alt1.bindFindSubImg(haystackImgref.handle, needlestr, needleBuffer.width, sx, sy, sw, sh);
        if (!r) {
            throw new _wrapper_js__WEBPACK_IMPORTED_MODULE_1__.Alt1Error();
        }
        return JSON.parse(r);
    }
    return findSubbuffer(haystackImgref.read(), needleBuffer, sx, sy, sw, sh);
}
/**
* Uses js to find the given needle ImageBuffer in the given haystack ImageBuffer. It is better to use the alt1.bind- functions in
* combination with a1nxt.findsubimg.
* the optional sx,sy,sw,sh arguments indicate a bounding rectangle in which to search.
* @returns An array of points where the needle is found. The array is empty if none are found
*/
function findSubbuffer(haystack, needle, sx = 0, sy = 0, sw = haystack.width, sh = haystack.height) {
    var r = [];
    var maxdif = 30;
    var maxresults = 50;
    var needlestride = needle.width * 4;
    var heystackstride = haystack.width * 4;
    //built list of non trans pixel to check
    var checkList = [];
    for (var y = 0; y < needle.height; y++) {
        for (var x = 0; x < needle.width; x++) {
            var i = x * 4 + y * needlestride;
            if (needle.data[i + 3] == 255) {
                checkList.push({ x: x, y: y });
            }
            if (checkList.length == 10) {
                break;
            }
        }
        if (checkList.length == 10) {
            break;
        }
    }
    var cw = (sx + sw) - needle.width;
    var ch = (sy + sh) - needle.height;
    var checklength = checkList.length;
    for (var y = sy; y <= ch; y++) {
        outer: for (var x = sx; x <= cw; x++) {
            for (var a = 0; a < checklength; a++) {
                var i1 = (x + checkList[a].x) * 4 + (y + checkList[a].y) * heystackstride;
                var i2 = checkList[a].x * 4 + checkList[a].y * needlestride;
                var d = 0;
                d = d + Math.abs(haystack.data[i1 + 0] - needle.data[i2 + 0]) | 0;
                d = d + Math.abs(haystack.data[i1 + 1] - needle.data[i2 + 1]) | 0;
                d = d + Math.abs(haystack.data[i1 + 2] - needle.data[i2 + 2]) | 0;
                d *= 255 / needle.data[i2 + 3];
                if (d > maxdif) {
                    continue outer;
                }
            }
            if (simpleCompare(haystack, needle, x, y, maxdif) != Infinity) {
                r.push({ x, y });
                if (r.length > maxresults) {
                    return r;
                }
            }
        }
    }
    return r;
}
/**
* Compares two images and returns the average color difference per pixel between them
* @param max The max color difference at any point in the image before short circuiting the function and returning Infinity. set to -1 to always continue.
* @returns The average color difference per pixel or Infinity if the difference is more than max at any point in the image
*/
function simpleCompare(bigbuf, checkbuf, x, y, max = 30) {
    if (x < 0 || y < 0) {
        throw new RangeError();
    }
    if (x + checkbuf.width > bigbuf.width || y + checkbuf.height > bigbuf.height) {
        throw new RangeError();
    }
    if (max == -1) {
        max = 255 * 4;
    }
    var dif = 0;
    for (var step = 8; step >= 1; step /= 2) {
        for (var cx = 0; cx < checkbuf.width; cx += step) {
            for (var cy = 0; cy < checkbuf.height; cy += step) {
                var i1 = (x + cx) * 4 + (y + cy) * bigbuf.width * 4;
                var i2 = cx * 4 + cy * checkbuf.width * 4;
                var d = 0;
                d = d + Math.abs(bigbuf.data[i1 + 0] - checkbuf.data[i2 + 0]) | 0;
                d = d + Math.abs(bigbuf.data[i1 + 1] - checkbuf.data[i2 + 1]) | 0;
                d = d + Math.abs(bigbuf.data[i1 + 2] - checkbuf.data[i2 + 2]) | 0;
                d *= checkbuf.data[i2 + 3] / 255;
                if (step == 1) {
                    dif += d;
                }
                if (d > max) {
                    return Infinity;
                }
            }
        }
    }
    return dif / checkbuf.width / checkbuf.height;
}
/**
* Calculates the root mean square error between the two buffers at the given coordinate, this method can be used in situations with significant blur or
* transparency, it does not bail early on non-matching images like simpleCompare does so it can be expected to be much slower when called often.
* @returns The root mean square error beteen the images, high single pixel errors are penalized more than consisten low errors. return of 0 means perfect match.
*/
function simpleCompareRMSE(bigbuf, checkbuf, x, y) {
    if (x < 0 || y < 0) {
        throw new RangeError();
    }
    if (x + checkbuf.width > bigbuf.width || y + checkbuf.height > bigbuf.height) {
        throw new RangeError();
    }
    var dif = 0;
    var numpix = 0;
    for (var cx = 0; cx < checkbuf.width; cx++) {
        for (var cy = 0; cy < checkbuf.height; cy++) {
            var i1 = (x + cx) * 4 + (y + cy) * bigbuf.width * 4;
            var i2 = cx * 4 + cy * checkbuf.width * 4;
            var d = 0;
            d = d + Math.abs(bigbuf.data[i1 + 0] - checkbuf.data[i2 + 0]) | 0;
            d = d + Math.abs(bigbuf.data[i1 + 1] - checkbuf.data[i2 + 1]) | 0;
            d = d + Math.abs(bigbuf.data[i1 + 2] - checkbuf.data[i2 + 2]) | 0;
            var weight = checkbuf.data[i2 + 3] / 255;
            numpix += weight;
            dif += d * d * weight;
        }
    }
    return Math.sqrt(dif / numpix);
}
/**
* Returns the difference between two colors (scaled to the alpha of the second color)
*/
function coldif(r1, g1, b1, r2, g2, b2, a2) {
    return (Math.abs(r1 - r2) + Math.abs(g1 - g2) + Math.abs(b1 - b2)) * a2 / 255; //only applies alpha for 2nd buffer!
}
/**
 * Turns map of promises into a map that contains the resolved values after loading.
 * @param input
 */
function asyncMap(input) {
    var raw = {};
    var promises = [];
    for (var a in input) {
        if (input.hasOwnProperty(a)) {
            raw[a] = null;
            promises.push(input[a].then(function (a, i) { raw[a] = i; r[a] = i; }.bind(null, a)));
        }
    }
    var r = {};
    var promise = Promise.all(promises).then(() => { r.loaded = true; return r; });
    Object.defineProperty(r, "loaded", { enumerable: false, value: false, writable: true });
    Object.defineProperty(r, "promise", { enumerable: false, value: promise });
    Object.defineProperty(r, "raw", { enumerable: false, value: raw });
    return Object.assign(r, raw);
}
/**
* Same as asyncMap, but casts the properties to ImageData in typescript
*/
function webpackImages(input) {
    return asyncMap(input);
}
class ImageDataSet {
    constructor() {
        this.buffers = [];
    }
    matchBest(img, x, y, max) {
        let best = null;
        let bestscore = max;
        for (let a = 0; a < this.buffers.length; a++) {
            let score = img.pixelCompare(this.buffers[a], x, y, bestscore);
            if (isFinite(score) && (bestscore == undefined || score < bestscore)) {
                bestscore = score;
                best = a;
            }
        }
        if (best == null) {
            return null;
        }
        return { index: best, score: bestscore };
    }
    static fromFilmStrip(baseimg, width) {
        if ((baseimg.width % width) != 0) {
            throw new Error("slice size does not fit in base img");
        }
        let r = new ImageDataSet();
        for (let x = 0; x < baseimg.width; x += width) {
            r.buffers.push(baseimg.clone(new _index_js__WEBPACK_IMPORTED_MODULE_3__.Rect(x, 0, width, baseimg.height)));
        }
        return r;
    }
    static fromFilmStripUneven(baseimg, widths) {
        let r = new ImageDataSet();
        let x = 0;
        for (let w of widths) {
            r.buffers.push(baseimg.clone(new _index_js__WEBPACK_IMPORTED_MODULE_3__.Rect(x, 0, w, baseimg.height)));
            x += w;
            if (x > baseimg.width) {
                throw new Error("sampling filmstrip outside bounds");
            }
        }
        if (x != baseimg.width) {
            throw new Error("unconsumed pixels left in film strip imagedata");
        }
        return r;
    }
    static fromAtlas(baseimg, slices) {
        let r = new ImageDataSet();
        for (let slice of slices) {
            r.buffers.push(baseimg.clone(slice));
        }
        return r;
    }
}


/***/ }),

/***/ "../node_modules/@alt1/base/dist/imgref.js":
/*!*************************************************!*\
  !*** ../node_modules/@alt1/base/dist/imgref.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ImgRef": () => (/* binding */ ImgRef),
/* harmony export */   "ImgRefBind": () => (/* binding */ ImgRefBind),
/* harmony export */   "ImgRefCtx": () => (/* binding */ ImgRefCtx),
/* harmony export */   "ImgRefData": () => (/* binding */ ImgRefData)
/* harmony export */ });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "../node_modules/@alt1/base/dist/index.js");

/**
 * Represents an image that might be in different types of memory
 * This is mostly used to represent images still in Alt1 memory that have
 * not been transfered to js yet. Various a1lib api's use this type and
 * choose the most efficient approach based on the memory type
 */
class ImgRef {
    constructor(x, y, w, h) {
        this.t = "none";
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
    }
    read(x = 0, y = 0, w = this.width, h = this.height) {
        throw new Error("This imgref (" + this.t + ") does not support toData");
    }
    findSubimage(needle, sx = 0, sy = 0, w = this.width, h = this.height) {
        return _index_js__WEBPACK_IMPORTED_MODULE_0__.ImageDetect.findSubimage(this, needle, sx, sy, w, h);
    }
    toData(x = this.x, y = this.y, w = this.width, h = this.height) {
        return this.read(x - this.x, y - this.y, w, h);
    }
    ;
    containsArea(rect) {
        return this.x <= rect.x && this.y <= rect.y && this.x + this.width >= rect.x + rect.width && this.y + this.height >= rect.y + rect.height;
    }
}
/**
 * Represents an image in js render memory (canvas/image tag)
 */
class ImgRefCtx extends ImgRef {
    constructor(img, x = 0, y = 0) {
        if (img instanceof CanvasRenderingContext2D) {
            super(x, y, img.canvas.width, img.canvas.height);
            this.ctx = img;
        }
        else {
            super(x, y, img.width, img.height);
            var cnv = (img instanceof HTMLCanvasElement ? img : img.toCanvas());
            this.ctx = cnv.getContext("2d");
        }
        this.t = "ctx";
    }
    read(x = 0, y = 0, w = this.width, h = this.height) {
        return this.ctx.getImageData(x, y, w, h);
    }
}
/**
 * Represents in image in Alt1 memory, This type of image can be searched for subimages
 * very efficiently and transfering the full image to js can be avoided this way
 */
class ImgRefBind extends ImgRef {
    constructor(handle, x = 0, y = 0, w = 0, h = 0) {
        super(x, y, w, h);
        this.handle = handle;
        this.t = "bind";
    }
    read(x = 0, y = 0, w = this.width, h = this.height) {
        return (0,_index_js__WEBPACK_IMPORTED_MODULE_0__.transferImageData)(this.handle, x, y, w, h);
    }
}
/**
 * Represents an image in js memory
 */
class ImgRefData extends ImgRef {
    constructor(buf, x = 0, y = 0) {
        super(x, y, buf.width, buf.height);
        this.buf = buf;
        this.t = "data";
    }
    read(x = 0, y = 0, w = this.width, h = this.height) {
        if (x == 0 && y == 0 && w == this.width && h == this.height) {
            return this.buf;
        }
        var r = new ImageData(w, h);
        for (var b = y; b < y + h; b++) {
            for (var a = x; a < x + w; a++) {
                var i1 = (a - x) * 4 + (b - y) * w * 4;
                var i2 = a * 4 + b * 4 * this.buf.width;
                r.data[i1] = this.buf.data[i2];
                r.data[i1 + 1] = this.buf.data[i2 + 1];
                r.data[i1 + 2] = this.buf.data[i2 + 2];
                r.data[i1 + 3] = this.buf.data[i2 + 3];
            }
        }
        return r;
    }
}


/***/ }),

/***/ "../node_modules/@alt1/base/dist/index.js":
/*!************************************************!*\
  !*** ../node_modules/@alt1/base/dist/index.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Alt1Error": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.Alt1Error),
/* harmony export */   "ImageData": () => (/* reexport safe */ _imagedata_extensions_js__WEBPACK_IMPORTED_MODULE_4__.ImageData),
/* harmony export */   "ImageDetect": () => (/* reexport module object */ _imagedetect_js__WEBPACK_IMPORTED_MODULE_1__),
/* harmony export */   "ImageStreamReader": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.ImageStreamReader),
/* harmony export */   "ImgRef": () => (/* reexport safe */ _imgref_js__WEBPACK_IMPORTED_MODULE_6__.ImgRef),
/* harmony export */   "ImgRefBind": () => (/* reexport safe */ _imgref_js__WEBPACK_IMPORTED_MODULE_6__.ImgRefBind),
/* harmony export */   "ImgRefCtx": () => (/* reexport safe */ _imgref_js__WEBPACK_IMPORTED_MODULE_6__.ImgRefCtx),
/* harmony export */   "ImgRefData": () => (/* reexport safe */ _imgref_js__WEBPACK_IMPORTED_MODULE_6__.ImgRefData),
/* harmony export */   "NoAlt1Error": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.NoAlt1Error),
/* harmony export */   "NodePolyfill": () => (/* reexport module object */ _nodepolyfill_js__WEBPACK_IMPORTED_MODULE_5__),
/* harmony export */   "PasteInput": () => (/* reexport module object */ _pasteinput_js__WEBPACK_IMPORTED_MODULE_2__),
/* harmony export */   "Rect": () => (/* reexport safe */ _rect_js__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   "addResizeElement": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.addResizeElement),
/* harmony export */   "capture": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.capture),
/* harmony export */   "captureAsync": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.captureAsync),
/* harmony export */   "captureHold": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.captureHold),
/* harmony export */   "captureHoldFullRs": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.captureHoldFullRs),
/* harmony export */   "captureHoldScreen": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.captureHoldScreen),
/* harmony export */   "captureMultiAsync": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.captureMultiAsync),
/* harmony export */   "captureStream": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.captureStream),
/* harmony export */   "decodeImageString": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.decodeImageString),
/* harmony export */   "encodeImageString": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.encodeImageString),
/* harmony export */   "getMousePosition": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.getMousePosition),
/* harmony export */   "getdisplaybounds": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.getdisplaybounds),
/* harmony export */   "hasAlt1": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.hasAlt1),
/* harmony export */   "hasAlt1Version": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.hasAlt1Version),
/* harmony export */   "identifyApp": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.identifyApp),
/* harmony export */   "mixColor": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.mixColor),
/* harmony export */   "newestversion": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.newestversion),
/* harmony export */   "on": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.on),
/* harmony export */   "once": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.once),
/* harmony export */   "openbrowser": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.openbrowser),
/* harmony export */   "removeListener": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.removeListener),
/* harmony export */   "requireAlt1": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.requireAlt1),
/* harmony export */   "resetEnvironment": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.resetEnvironment),
/* harmony export */   "skinName": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.skinName),
/* harmony export */   "transferImageData": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.transferImageData),
/* harmony export */   "unmixColor": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.unmixColor)
/* harmony export */ });
/* harmony import */ var _declarations_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./declarations.js */ "../node_modules/@alt1/base/dist/declarations.js");
/* harmony import */ var _declarations_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_declarations_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _imagedetect_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./imagedetect.js */ "../node_modules/@alt1/base/dist/imagedetect.js");
/* harmony import */ var _pasteinput_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pasteinput.js */ "../node_modules/@alt1/base/dist/pasteinput.js");
/* harmony import */ var _rect_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./rect.js */ "../node_modules/@alt1/base/dist/rect.js");
/* harmony import */ var _imagedata_extensions_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./imagedata-extensions.js */ "../node_modules/@alt1/base/dist/imagedata-extensions.js");
/* harmony import */ var _nodepolyfill_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./nodepolyfill.js */ "../node_modules/@alt1/base/dist/nodepolyfill.js");
/* harmony import */ var _imgref_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./imgref.js */ "../node_modules/@alt1/base/dist/imgref.js");
/* harmony import */ var _wrapper_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./wrapper.js */ "../node_modules/@alt1/base/dist/wrapper.js");










/***/ }),

/***/ "../node_modules/@alt1/base/dist/nodepolyfill.js":
/*!*******************************************************!*\
  !*** ../node_modules/@alt1/base/dist/nodepolyfill.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createCanvas": () => (/* binding */ createCanvas),
/* harmony export */   "imageDataFromBase64": () => (/* binding */ imageDataFromBase64),
/* harmony export */   "imageDataFromBuffer": () => (/* binding */ imageDataFromBuffer),
/* harmony export */   "imageDataToDrawable": () => (/* binding */ imageDataToDrawable),
/* harmony export */   "imageDataToFileBytes": () => (/* binding */ imageDataToFileBytes),
/* harmony export */   "polyfillRequire": () => (/* binding */ polyfillRequire),
/* harmony export */   "requireElectronCommon": () => (/* binding */ requireElectronCommon),
/* harmony export */   "requireNodeCanvas": () => (/* binding */ requireNodeCanvas),
/* harmony export */   "requireSharp": () => (/* binding */ requireSharp)
/* harmony export */ });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "../node_modules/@alt1/base/dist/index.js");
/* harmony import */ var _imagedetect_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./imagedetect.js */ "../node_modules/@alt1/base/dist/imagedetect.js");
//nodejs and electron polyfills for web api's
//commented out type info as that breaks webpack with optional dependencies
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


var requirefunction = null;
/**
 * Call this function to let the libs require extra dependencies on nodejs in order
 * to polyfill some browser api's (mostly image compression/decompression)
 * `NodePolifill.polyfillRequire(require);` should solve most cases
 */
function polyfillRequire(requirefn) {
    requirefunction = requirefn;
}
function requireSharp() {
    try {
        if (requirefunction) {
            return requirefunction("sharp");
        }
        else {
            return require(/* webpackIgnore: true */ "sharp"); // as typeof import("sharp");
        }
    }
    catch (e) { }
    return null;
}
function requireNodeCanvas() {
    //attempt to require sharp first, after loading canvas the module sharp fails to load
    requireSharp();
    try {
        if (requirefunction) {
            return requirefunction("canvas");
        }
        else {
            return require(/* webpackIgnore: true */ "canvas"); // as typeof import("sharp");
        }
    }
    catch (e) { }
    return null;
}
function requireElectronCommon() {
    try {
        if (requirefunction) {
            return requirefunction("electron/common");
        }
        else {
            return require(/* webpackIgnore: true */ "electron/common");
        }
    }
    catch (e) { }
    return null;
}
function imageDataToDrawable(buf) {
    let nodecnv = requireNodeCanvas();
    if (!nodecnv) {
        throw new Error("couldn't find built-in canvas or the module 'canvas'");
    }
    return new nodecnv.ImageData(buf.data, buf.width, buf.height);
}
function createCanvas(w, h) {
    let nodecnv = requireNodeCanvas();
    if (!nodecnv) {
        throw new Error("couldn't find built-in canvas or the module 'canvas'");
    }
    return nodecnv.createCanvas(w, h);
}
function flipBGRAtoRGBA(data) {
    for (let i = 0; i < data.length; i += 4) {
        let tmp = data[i + 2];
        data[i + 2] = data[i + 0];
        data[i + 0] = tmp;
    }
}
function imageDataToFileBytes(buf, format, quality) {
    return __awaiter(this, void 0, void 0, function* () {
        //use the electron API if we're in electron
        var electronCommon;
        var sharp;
        if (electronCommon = requireElectronCommon()) {
            let nativeImage = electronCommon.nativeImage;
            //need to copy the buffer in order to flip it without destroying the original
            let bufcpy = Buffer.from(buf.data.slice(buf.data.byteOffset, buf.data.byteLength));
            flipBGRAtoRGBA(bufcpy);
            let nativeimg = nativeImage.createFromBitmap(bufcpy, { width: buf.width, height: buf.height });
            return nativeimg.toPNG();
        }
        else if (sharp = requireSharp()) {
            let img = sharp(Buffer.from(buf.data.buffer), { raw: { width: buf.width, height: buf.height, channels: 4 } });
            if (format == "image/png") {
                img.png();
            }
            else if (format == "image/webp") {
                var opts = { quality: 80 };
                if (typeof quality == "number") {
                    opts.quality = quality * 100;
                }
                img.webp(opts);
            }
            else {
                throw new Error("unknown image format: " + format);
            }
            return yield img.toBuffer({ resolveWithObject: false }).buffer;
        }
        throw new Error("coulnd't find build-in image compression methods or the module 'electron/common' or 'sharp'");
    });
}
function imageDataFromBase64(base64) {
    return imageDataFromBuffer(Buffer.from(base64, "base64"));
}
function imageDataFromBuffer(buffer) {
    return __awaiter(this, void 0, void 0, function* () {
        (0,_imagedetect_js__WEBPACK_IMPORTED_MODULE_1__.clearPngColorspace)(buffer);
        //use the electron API if we're in electron
        var electronCommon;
        var nodecnv;
        if (electronCommon = requireElectronCommon()) {
            let nativeImage = electronCommon.nativeImage;
            let img = nativeImage.createFromBuffer(buffer);
            let pixels = img.toBitmap();
            let size = img.getSize();
            let pixbuf = new Uint8ClampedArray(pixels.buffer, pixels.byteOffset, pixels.byteLength);
            flipBGRAtoRGBA(pixbuf);
            return new _index_js__WEBPACK_IMPORTED_MODULE_0__.ImageData(pixbuf, size.width, size.height);
        }
        else if (nodecnv = requireNodeCanvas()) {
            return new Promise((done, err) => {
                let img = new nodecnv.Image();
                img.onerror = err;
                img.onload = () => {
                    var cnv = nodecnv.createCanvas(img.naturalWidth, img.naturalHeight);
                    var ctx = cnv.getContext("2d");
                    ctx.drawImage(img, 0, 0);
                    var data = ctx.getImageData(0, 0, img.naturalWidth, img.naturalHeight);
                    //use our own class
                    done(new _index_js__WEBPACK_IMPORTED_MODULE_0__.ImageData(data.data, data.width, data.height));
                };
                img.src = Buffer.from(buffer.buffer, buffer.byteOffset, buffer.byteLength);
            });
        }
        throw new Error("couldn't find built-in canvas, module 'electron/common' or the module 'canvas'");
    });
}


/***/ }),

/***/ "../node_modules/@alt1/base/dist/pasteinput.js":
/*!*****************************************************!*\
  !*** ../node_modules/@alt1/base/dist/pasteinput.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fileDialog": () => (/* binding */ fileDialog),
/* harmony export */   "lastref": () => (/* binding */ lastref),
/* harmony export */   "listen": () => (/* binding */ listen),
/* harmony export */   "start": () => (/* binding */ start),
/* harmony export */   "startDragNDrop": () => (/* binding */ startDragNDrop),
/* harmony export */   "triggerPaste": () => (/* binding */ triggerPaste),
/* harmony export */   "unlisten": () => (/* binding */ unlisten)
/* harmony export */ });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "../node_modules/@alt1/base/dist/index.js");
/* harmony import */ var _imagedetect_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./imagedetect.js */ "../node_modules/@alt1/base/dist/imagedetect.js");


var listeners = [];
var started = false;
var dndStarted = false;
var pasting = false;
var lastref = null;
function listen(func, errorfunc, dragndrop) {
    listeners.push({ cb: func, error: errorfunc });
    if (!started) {
        start();
    }
    if (dragndrop && !dndStarted) {
        startDragNDrop();
    }
}
function unlisten(func) {
    let i = listeners.findIndex(c => c.cb == func);
    if (i != -1) {
        listeners.splice(i, 1);
    }
}
/**
 * currently used in multiple document situations (iframe), might be removed in the future
 */
function triggerPaste(img) {
    lastref = img;
    for (var a in listeners) {
        listeners[a].cb(lastref);
    }
}
function pasted(img) {
    pasting = false;
    let cnv = img instanceof HTMLCanvasElement ? img : img.toCanvas();
    triggerPaste(new _index_js__WEBPACK_IMPORTED_MODULE_0__.ImgRefCtx(cnv));
}
function error(error, mes) {
    var _a, _b;
    pasting = false;
    for (var a in listeners) {
        (_b = (_a = listeners[a]).error) === null || _b === void 0 ? void 0 : _b.call(_a, mes, error);
    }
}
function startDragNDrop() {
    var getitem = function (items) {
        var foundimage = "";
        for (var a = 0; a < items.length; a++) {
            var item = items[a];
            var m = item.type.match(/^image\/(\w+)$/);
            if (m) {
                if (m[1] == "png") {
                    return item;
                }
                else {
                    foundimage = m[1];
                }
            }
        }
        if (foundimage) {
            error("notpng", "The image you uploaded is not a .png image. Other image type have compression noise and can't be used for image detection.");
        }
        return null;
    };
    window.addEventListener("dragover", function (e) {
        e.preventDefault();
    });
    window.addEventListener("drop", function (e) {
        if (!e.dataTransfer) {
            return;
        }
        var item = getitem(e.dataTransfer.items);
        e.preventDefault();
        if (!item) {
            return;
        }
        fromFile(item.getAsFile());
    });
}
function start() {
    if (started) {
        return;
    }
    started = true;
    //determine if we have a clipboard api
    //try{a=new Event("clipboard"); a="clipboardData" in a;}
    //catch(e){a=false;}
    var ischrome = !!navigator.userAgent.match(/Chrome/) && !navigator.userAgent.match(/Edge/);
    //old method breaks after chrome 41, revert to good old user agent sniffing
    //nvm, internet explorer (edge) decided that it wants to be chrome, however fails at delivering
    //turns out this one is interesting, edge is a hybrid between the paste api's
    var apipasted = function (e) {
        if (!e.clipboardData) {
            return;
        }
        for (var a = 0; a < e.clipboardData.items.length; a++) { //loop all data types
            if (e.clipboardData.items[a].type.indexOf("image") != -1) {
                var file = e.clipboardData.items[a].getAsFile();
                var img = new Image();
                img.src = (window.URL || window.webkitURL).createObjectURL(file);
                if (img.width > 0) {
                    pasted(img);
                }
                else {
                    img.onload = function () { pasted(img); };
                }
            }
        }
    };
    if (ischrome) {
        document.addEventListener("paste", apipasted);
    }
    else {
        var catcher = document.createElement("div");
        catcher.setAttribute("contenteditable", "");
        catcher.className = "forcehidden"; //retarded ie safety/bug, cant apply styles using js//TODO i don't even know what's going on
        catcher.onpaste = function (e) {
            if (e.clipboardData && e.clipboardData.items) {
                apipasted(e);
                return;
            }
            setTimeout(function () {
                var b = catcher.children[0];
                if (!b || b.tagName != "IMG") {
                    return;
                }
                var img = new Image();
                img.src = b.src;
                var a = img.src.match(/^data:([\w\/]+);/);
                if (img.width > 0) {
                    pasted(img);
                }
                else {
                    img.onload = function () { pasted(img); };
                }
                catcher.innerHTML = "";
            }, 1);
        };
        document.body.appendChild(catcher);
    }
    //detect if ctrl-v is pressed and focus catcher if needed
    document.addEventListener("keydown", function (e) {
        if (e.target.tagName == "INPUT") {
            return;
        }
        if (e.keyCode != "V".charCodeAt(0) || !e.ctrlKey) {
            return;
        }
        pasting = true;
        setTimeout(function () {
            if (pasting) {
                error("noimg", "You pressed Ctrl+V, but no image was pasted by your browser, make sure your clipboard contains an image, and not a link to an image.");
            }
        }, 1000);
        if (catcher) {
            catcher.focus();
        }
    });
}
function fileDialog() {
    var fileinput = document.createElement("input");
    fileinput.type = "file";
    fileinput.accept = "image/png";
    fileinput.onchange = function () { if (fileinput.files && fileinput.files[0]) {
        fromFile(fileinput.files[0]);
    } };
    fileinput.click();
    return fileinput;
}
function fromFile(file) {
    if (!file) {
        return;
    }
    var reader = new FileReader();
    reader.onload = function () {
        var bytearray = new Uint8Array(reader.result);
        if (_imagedetect_js__WEBPACK_IMPORTED_MODULE_1__.isPngBuffer(bytearray)) {
            _imagedetect_js__WEBPACK_IMPORTED_MODULE_1__.clearPngColorspace(bytearray);
        }
        var blob = new Blob([bytearray], { type: "image/png" });
        var img = new Image();
        img.onerror = () => error("invalidfile", "The file you uploaded could not be opened as an image.");
        var bloburl = URL.createObjectURL(blob);
        img.src = bloburl;
        if (img.width > 0) {
            pasted(img);
            URL.revokeObjectURL(bloburl);
        }
        else {
            img.onload = function () { pasted(img); URL.revokeObjectURL(bloburl); };
        }
    };
    reader.readAsArrayBuffer(file);
}


/***/ }),

/***/ "../node_modules/@alt1/base/dist/rect.js":
/*!***********************************************!*\
  !*** ../node_modules/@alt1/base/dist/rect.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Rect)
/* harmony export */ });
//util class for rectangle maths
//TODO shit this sucks can we remove it again?
//more of a shorthand to get {x,y,width,height} than a class
//kinda starting to like it again
//TODO remove rant
;
/**
 * Simple rectangle class with some util functions
 */
class Rect {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
    }
    static fromArgs(...args) {
        if (typeof args[0] == "object") {
            return new Rect(args[0].x, args[0].y, args[0].width, args[0].height);
        }
        else if (typeof args[0] == "number" && args.length >= 4) {
            return new Rect(args[0], args[1], args[2], args[3]);
        }
        else {
            throw new Error("invalid rect args");
        }
    }
    /**
     * Resizes this Rect to include the full size of a given second rectangle
     */
    union(r2) {
        var x = Math.min(this.x, r2.x);
        var y = Math.min(this.y, r2.y);
        this.width = Math.max(this.x + this.width, r2.x + r2.width) - x;
        this.height = Math.max(this.y + this.height, r2.y + r2.height) - y;
        this.x = x;
        this.y = y;
        return this;
    }
    /**
     * Resizes this Rect to include a given point
     */
    includePoint(x, y) {
        this.union(new Rect(x, y, 0, 0));
    }
    /**
     * Grows the rectangle with the given dimensions
     */
    inflate(w, h) {
        this.x -= w;
        this.y -= h;
        this.width += 2 * w;
        this.height += 2 * h;
    }
    /**
     * Resizes this Rect to the area that overlaps a given Rect
     * width and height will be set to 0 if the intersection does not exist
     */
    intersect(r2) {
        if (this.x < r2.x) {
            this.width -= r2.x - this.x;
            this.x = r2.x;
        }
        if (this.y < r2.y) {
            this.height -= r2.y - this.y;
            this.y = r2.y;
        }
        this.width = Math.min(this.x + this.width, r2.x + r2.width) - this.x;
        this.height = Math.min(this.y + this.height, r2.y + r2.height) - this.y;
        if (this.width <= 0 || this.height <= 0) {
            this.width = 0;
            this.height = 0;
        }
    }
    /**
     * Returns wether this Rect has at least one pixel overlap with a given Rect
     */
    overlaps(r2) {
        return this.x < r2.x + r2.width && this.x + this.width > r2.x && this.y < r2.y + r2.height && this.y + this.height > r2.y;
    }
    /**
     * Returns wether a given Rect fits completely inside this Rect
     * @param r2
     */
    contains(r2) {
        return this.x <= r2.x && this.x + this.width >= r2.x + r2.width && this.y <= r2.y && this.y + this.height >= r2.y + r2.height;
    }
    /**
     * Returns wether a given point lies inside this Rect
     */
    containsPoint(x, y) {
        return this.x <= x && this.x + this.width > x && this.y <= y && this.y + this.height > y;
    }
}


/***/ }),

/***/ "../node_modules/@alt1/base/dist/wrapper.js":
/*!**************************************************!*\
  !*** ../node_modules/@alt1/base/dist/wrapper.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Alt1Error": () => (/* binding */ Alt1Error),
/* harmony export */   "ImageStreamReader": () => (/* binding */ ImageStreamReader),
/* harmony export */   "NoAlt1Error": () => (/* binding */ NoAlt1Error),
/* harmony export */   "addResizeElement": () => (/* binding */ addResizeElement),
/* harmony export */   "capture": () => (/* binding */ capture),
/* harmony export */   "captureAsync": () => (/* binding */ captureAsync),
/* harmony export */   "captureHold": () => (/* binding */ captureHold),
/* harmony export */   "captureHoldFullRs": () => (/* binding */ captureHoldFullRs),
/* harmony export */   "captureHoldScreen": () => (/* binding */ captureHoldScreen),
/* harmony export */   "captureMultiAsync": () => (/* binding */ captureMultiAsync),
/* harmony export */   "captureStream": () => (/* binding */ captureStream),
/* harmony export */   "decodeImageString": () => (/* binding */ decodeImageString),
/* harmony export */   "encodeImageString": () => (/* binding */ encodeImageString),
/* harmony export */   "getMousePosition": () => (/* binding */ getMousePosition),
/* harmony export */   "getdisplaybounds": () => (/* binding */ getdisplaybounds),
/* harmony export */   "hasAlt1": () => (/* binding */ hasAlt1),
/* harmony export */   "hasAlt1Version": () => (/* binding */ hasAlt1Version),
/* harmony export */   "identifyApp": () => (/* binding */ identifyApp),
/* harmony export */   "mixColor": () => (/* binding */ mixColor),
/* harmony export */   "newestversion": () => (/* binding */ newestversion),
/* harmony export */   "on": () => (/* binding */ on),
/* harmony export */   "once": () => (/* binding */ once),
/* harmony export */   "openbrowser": () => (/* binding */ openbrowser),
/* harmony export */   "removeListener": () => (/* binding */ removeListener),
/* harmony export */   "requireAlt1": () => (/* binding */ requireAlt1),
/* harmony export */   "resetEnvironment": () => (/* binding */ resetEnvironment),
/* harmony export */   "skinName": () => (/* binding */ skinName),
/* harmony export */   "transferImageData": () => (/* binding */ transferImageData),
/* harmony export */   "unmixColor": () => (/* binding */ unmixColor)
/* harmony export */ });
/* harmony import */ var _rect_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rect.js */ "../node_modules/@alt1/base/dist/rect.js");
/* harmony import */ var _imgref_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./imgref.js */ "../node_modules/@alt1/base/dist/imgref.js");
/* harmony import */ var _imagedata_extensions_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./imagedata-extensions.js */ "../node_modules/@alt1/base/dist/imagedata-extensions.js");
/* harmony import */ var _alt1api_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./alt1api.js */ "../node_modules/@alt1/base/dist/alt1api.js");
/* harmony import */ var _alt1api_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_alt1api_js__WEBPACK_IMPORTED_MODULE_3__);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};




/**
 * Thrown when a method is called that can not be used outside of Alt1
 */
class NoAlt1Error extends Error {
    constructor() {
        super();
        this.message = "This method can not be ran outside of Alt1";
    }
}
;
/**
 * Thrown when the Alt1 API returns an invalid result
 * Errors of a different type are throw when internal Alt1 errors occur
 */
class Alt1Error extends Error {
}
/**
 * The latest Alt1 version
 */
var newestversion = "1.5.5";
/**
 * Whether the Alt1 API is available
 */
var hasAlt1 = (typeof alt1 != "undefined");
/**
 * The name of the Alt1 interface skin. (Always "default" if running in a browser)
 */
var skinName = hasAlt1 ? alt1.skinName : "default";
/**
 * Max number of bytes that can be sent by alt1 in one function
 * Not completely sure why this number is different than window.alt1.maxtranfer
 */
var maxtransfer = 4000000;
/**
 * Open a link in the default browser
 * @deprecated use window.open instead
 */
function openbrowser(url) {
    if (hasAlt1) {
        alt1.openBrowser(url);
    }
    else {
        window.open(url, '_blank');
    }
}
/**
 * Throw if Alt1 API is not available
 */
function requireAlt1() {
    if (!hasAlt1) {
        throw new NoAlt1Error();
    }
}
/**
 * Returns an object with a rectangle that spans all screens
 */
function getdisplaybounds() {
    if (!hasAlt1) {
        return false;
    }
    return new _rect_js__WEBPACK_IMPORTED_MODULE_0__["default"](alt1.screenX, alt1.screenY, alt1.screenWidth, alt1.screenHeight);
}
/**
 * gets an imagebuffer with pixel data about the requested region
 */
function capture(...args) {
    //TODO change null return on error into throw instead (x3)
    if (!hasAlt1) {
        throw new NoAlt1Error();
    }
    var rect = _rect_js__WEBPACK_IMPORTED_MODULE_0__["default"].fromArgs(...args);
    if (alt1.capture) {
        return new _imagedata_extensions_js__WEBPACK_IMPORTED_MODULE_2__.ImageData(alt1.capture(rect.x, rect.y, rect.width, rect.height), rect.width, rect.height);
    }
    var buf = new _imagedata_extensions_js__WEBPACK_IMPORTED_MODULE_2__.ImageData(rect.width, rect.height);
    if (rect.width * rect.height * 4 <= maxtransfer) {
        var data = alt1.getRegion(rect.x, rect.y, rect.width, rect.height);
        if (!data) {
            return null;
        }
        decodeImageString(data, buf, 0, 0, rect.width, rect.height);
    }
    else {
        //split up the request to to exceed the single transfer limit (for now)
        var x1 = rect.x;
        var ref = alt1.bindRegion(rect.x, rect.y, rect.width, rect.height);
        if (ref <= 0) {
            return null;
        }
        while (x1 < rect.x + rect.width) {
            var x2 = Math.min(rect.x + rect.width, Math.floor(x1 + (maxtransfer / 4 / rect.height)));
            var data = alt1.bindGetRegion(ref, x1, rect.y, x2 - x1, rect.height);
            if (!data) {
                return null;
            }
            decodeImageString(data, buf, x1 - rect.x, 0, x2 - x1, rect.height);
            x1 = x2;
        }
    }
    return buf;
}
/**
 * Makes alt1 bind an area of the rs client in memory without sending it to the js client
 * returns an imgref object which can be used to get pixel data using the imgreftobuf function
 * currently only one bind can exist per app and the ref in (v) will always be 1
 */
function captureHold(x, y, w, h) {
    x = Math.round(x);
    y = Math.round(y);
    w = Math.round(w);
    h = Math.round(h);
    requireAlt1();
    var r = alt1.bindRegion(x, y, w, h);
    if (r <= 0) {
        throw new Alt1Error("capturehold failed");
    }
    return new _imgref_js__WEBPACK_IMPORTED_MODULE_1__.ImgRefBind(r, x, y, w, h);
}
/**
 * Same as captureHoldRegion, but captures the screen instead of the rs client. it also uses screen coordinates instead and can capture outside of the rs client
 */
function captureHoldScreen(x, y, w, h) {
    x = Math.round(x);
    y = Math.round(y);
    w = Math.round(w);
    h = Math.round(h);
    requireAlt1();
    var r = alt1.bindScreenRegion(x, y, w, h);
    if (r <= 0) {
        return false;
    }
    return new _imgref_js__WEBPACK_IMPORTED_MODULE_1__.ImgRefBind(r, x, y, w, h);
}
/**
 * bind the full rs window if the rs window can be detected by alt1, otherwise return the full screen
 */
function captureHoldFullRs() {
    return captureHold(0, 0, alt1.rsWidth, alt1.rsHeight);
}
/**
 * returns a subregion from a bound image
 * used internally in imgreftobuf if imgref is a bound image
 * @deprecated This should be handled internall by the imgrefbind.toData method
 */
function transferImageData(handle, x, y, w, h) {
    x = Math.round(x);
    y = Math.round(y);
    w = Math.round(w);
    h = Math.round(h);
    requireAlt1();
    if (alt1.bindGetRegionBuffer) {
        return new _imagedata_extensions_js__WEBPACK_IMPORTED_MODULE_2__.ImageData(alt1.bindGetRegionBuffer(handle, x, y, w, h), w, h);
    }
    var r = new _imagedata_extensions_js__WEBPACK_IMPORTED_MODULE_2__.ImageData(w, h);
    var x1 = x;
    while (true) { //split up the request to to exceed the single transfer limit (for now)
        var x2 = Math.min(x + w, Math.floor(x1 + (maxtransfer / 4 / h)));
        var a = alt1.bindGetRegion(handle, x1, y, x2 - x1, h);
        if (!a) {
            throw new Alt1Error();
        }
        decodeImageString(a, r, x1 - x, 0, x2 - x1, h);
        x1 = x2;
        if (x1 == x + w) {
            break;
        }
        ;
    }
    return r;
}
/**
 * decodes a returned string from alt1 to an imagebuffer
 */
function decodeImageString(imagestring, target, x, y, w, h) {
    var bin = atob(imagestring);
    var bytes = target.data;
    w |= 0;
    h |= 0;
    var offset = 4 * x + 4 * y * target.width;
    var target_width = target.width | 0;
    for (var a = 0; a < w; a++) {
        for (var b = 0; b < h; b++) {
            var i1 = (offset + (a * 4 | 0) + (b * target_width * 4 | 0)) | 0;
            var i2 = ((a * 4 | 0) + (b * 4 * w | 0)) | 0;
            bytes[i1 + 0 | 0] = bin.charCodeAt(i2 + 2 | 0); //fix weird red/blue swap in c#
            bytes[i1 + 1 | 0] = bin.charCodeAt(i2 + 1 | 0);
            bytes[i1 + 2 | 0] = bin.charCodeAt(i2 + 0 | 0);
            bytes[i1 + 3 | 0] = bin.charCodeAt(i2 + 3 | 0);
        }
    }
    return target;
}
/**
 * encodes an imagebuffer to a string
 */
function encodeImageString(buf, sx = 0, sy = 0, sw = buf.width, sh = buf.height) {
    var raw = "";
    for (var y = sy; y < sy + sh; y++) {
        for (var x = sx; x < sx + sw; x++) {
            var i = 4 * x + 4 * buf.width * y | 0;
            raw += String.fromCharCode(buf.data[i + 2 | 0]);
            raw += String.fromCharCode(buf.data[i + 1 | 0]);
            raw += String.fromCharCode(buf.data[i + 0 | 0]);
            raw += String.fromCharCode(buf.data[i + 3 | 0]);
        }
    }
    return btoa(raw);
}
/**
 * mixes the given color into a single int. This format is used by alt1
 */
function mixColor(r, g, b, a = 255) {
    return (b << 0) + (g << 8) + (r << 16) + (a << 24);
}
function unmixColor(col) {
    var r = (col >> 16) & 0xff;
    var g = (col >> 8) & 0xff;
    var b = (col >> 0) & 0xff;
    return [r, g, b];
}
function identifyApp(url) {
    if (hasAlt1) {
        alt1.identifyAppUrl(url);
    }
}
function resetEnvironment() {
    hasAlt1 = (typeof alt1 != "undefined");
    skinName = hasAlt1 ? alt1.skinName : "default";
}
function convertAlt1Version(str) {
    var a = str.match(/^(\d+)\.(\d+)\.(\d+)$/);
    if (!a) {
        throw new RangeError("Invalid version string");
    }
    return (+a[1]) * 1000 * 1000 + (+a[2]) * 1000 + (+a[3]) * 1;
}
var cachedVersionInt = -1;
/**
 * checks if alt1 is running and at least the given version. versionstr should be a string with the version eg: 1.3.2
 * @param versionstr
 */
function hasAlt1Version(versionstr) {
    if (!hasAlt1) {
        return false;
    }
    if (cachedVersionInt == -1) {
        cachedVersionInt = alt1.versionint;
    }
    return cachedVersionInt >= convertAlt1Version(versionstr);
}
/**
 * Gets the current cursor position in the game, returns null if the rs window is not active (alt1.rsActive)
 */
function getMousePosition() {
    var pos = alt1.mousePosition;
    if (pos == -1) {
        return null;
    }
    return { x: pos >>> 16, y: pos & 0xFFFF };
}
/**
 * Registers a given HTML element as a frame border, when this element is dragged by the user the Alt1 frame will resize accordingly
 * Use the direction arguements to make a given direction stick to the mouse. eg. Only set left to true to make the element behave as the left border
 * Or set all to true to move the whole window. Not all combinations are permitted
 */
function addResizeElement(el, left, top, right, bot) {
    if (!hasAlt1 || !alt1.userResize) {
        return;
    }
    el.addEventListener("mousedown", function (e) {
        alt1.userResize(left, top, right, bot);
        e.preventDefault();
    });
}
/**
 * Add an event listener
 */
function on(type, listener) {
    if (!hasAlt1) {
        return;
    }
    if (!alt1.events) {
        alt1.events = {};
    }
    if (!alt1.events[type]) {
        alt1.events[type] = [];
    }
    alt1.events[type].push(listener);
}
/**
 * Removes an event listener
 */
function removeListener(type, listener) {
    var elist = hasAlt1 && alt1.events && alt1.events[type];
    if (!elist) {
        return;
    }
    var i = elist.indexOf(listener);
    if (i == -1) {
        return;
    }
    elist.splice(i, 1);
}
/**
 * Listens for the event to fire once and then stops listening
 * @param event
 * @param cb
 */
function once(type, listener) {
    var fn = (e) => {
        removeListener(type, fn);
        listener(e);
    };
    on(type, fn);
}
;
/**
 * Used to read a set of images from a binary stream returned by the Alt1 API
 */
class ImageStreamReader {
    constructor(reader, ...args) {
        this.framebuffer = null;
        this.pos = 0;
        this.reading = false;
        this.closed = false;
        //paused state
        this.pausedindex = -1;
        this.pausedbuffer = null;
        this.streamreader = reader;
        if (args[0] instanceof _imagedata_extensions_js__WEBPACK_IMPORTED_MODULE_2__.ImageData) {
            this.setFrameBuffer(args[0]);
        }
        else if (typeof args[0] == "number") {
            this.setFrameBuffer(new _imagedata_extensions_js__WEBPACK_IMPORTED_MODULE_2__.ImageData(args[0], args[1]));
        }
    }
    /**
     *
     */
    setFrameBuffer(buffer) {
        if (this.reading) {
            throw new Error("can't change framebuffer while reading");
        }
        this.framebuffer = buffer;
    }
    /**
     * Closes the underlying stream and ends reading
     */
    close() {
        this.streamreader.cancel();
    }
    /**
     * Reads a single image from the stream
     */
    nextImage() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.reading) {
                throw new Error("already reading from this stream");
            }
            if (!this.framebuffer) {
                throw new Error("framebuffer not set");
            }
            this.reading = true;
            var synctime = -Date.now();
            var starttime = Date.now();
            var r = false;
            while (!r) {
                if (this.pausedindex != -1 && this.pausedbuffer) {
                    r = this.readChunk(this.pausedindex, this.framebuffer.data, this.pausedbuffer);
                }
                else {
                    synctime += Date.now();
                    var res = yield this.streamreader.read();
                    synctime -= Date.now();
                    if (res.done) {
                        throw new Error("Stream closed while reading");
                    }
                    var data = res.value;
                    r = this.readChunk(0, this.framebuffer.data, data);
                }
            }
            synctime += Date.now();
            //console.log("Decoded async image, " + this.framebuffer.width + "x" + this.framebuffer.height + " time: " + (Date.now() - starttime) + "ms (" + synctime + "ms main thread)");
            this.reading = false;
            return this.framebuffer;
        });
    }
    readChunk(i, framedata, buffer) {
        //very hot code, explicit int32 casting with |0 speeds it up by ~ x2
        i = i | 0;
        var framesize = framedata.length | 0;
        var pos = this.pos;
        var datalen = buffer.length | 0;
        //var data32 = new Float64Array(buffer.buffer);
        //var framedata32 = new Float64Array(framedata.buffer);
        //fix possible buffer misalignment
        //align to 16 for extra loop unrolling
        while (i < datalen) {
            //slow loop, fix alignment and other issues
            while (i < datalen && pos < framesize && (pos % 16 != 0 || !((i + 16 | 0) <= datalen && (pos + 16 | 0) <= framesize))) {
                var rel = pos;
                if (pos % 4 == 0) {
                    rel = rel + 2 | 0;
                }
                if (pos % 4 == 2) {
                    rel = rel - 2 | 0;
                }
                framedata[rel | 0] = buffer[i | 0];
                i = i + 1 | 0;
                pos = pos + 1 | 0;
            }
            //fast unrolled loop for large chunks i wish js had some sort of memcpy
            if (pos % 16 == 0) {
                while ((i + 16 | 0) <= datalen && (pos + 16 | 0) <= framesize) {
                    framedata[pos + 0 | 0] = buffer[i + 2 | 0];
                    framedata[pos + 1 | 0] = buffer[i + 1 | 0];
                    framedata[pos + 2 | 0] = buffer[i + 0 | 0];
                    framedata[pos + 3 | 0] = buffer[i + 3 | 0];
                    framedata[pos + 4 | 0] = buffer[i + 6 | 0];
                    framedata[pos + 5 | 0] = buffer[i + 5 | 0];
                    framedata[pos + 6 | 0] = buffer[i + 4 | 0];
                    framedata[pos + 7 | 0] = buffer[i + 7 | 0];
                    framedata[pos + 8 | 0] = buffer[i + 10 | 0];
                    framedata[pos + 9 | 0] = buffer[i + 9 | 0];
                    framedata[pos + 10 | 0] = buffer[i + 8 | 0];
                    framedata[pos + 11 | 0] = buffer[i + 11 | 0];
                    framedata[pos + 12 | 0] = buffer[i + 14 | 0];
                    framedata[pos + 13 | 0] = buffer[i + 13 | 0];
                    framedata[pos + 14 | 0] = buffer[i + 12 | 0];
                    framedata[pos + 15 | 0] = buffer[i + 15 | 0];
                    //could speed it up another x2 but wouldn't be able to swap r/b swap and possible alignment issues
                    //framedata32[pos / 8 + 0 | 0] = data32[i / 8 + 0 | 0];
                    //framedata32[pos / 8 + 1 | 0] = data32[i / 8 + 1 | 0];
                    //framedata32[pos / 4 + 2 | 0] = data32[i / 4 + 2 | 0];
                    //framedata32[pos / 4 + 3 | 0] = data32[i / 4 + 3 | 0];
                    pos = pos + 16 | 0;
                    i = i + 16 | 0;
                }
            }
            if (pos >= framesize) {
                this.pausedbuffer = null;
                this.pausedindex = -1;
                this.pos = 0;
                if (i != buffer.length - 1) {
                    this.pausedbuffer = buffer;
                    this.pausedindex = i;
                }
                return true;
            }
        }
        this.pos = pos;
        this.pausedbuffer = null;
        this.pausedindex = -1;
        return false;
    }
}
/**
 * Asynchronously captures a section of the game screen
 */
function captureAsync(...args) {
    return __awaiter(this, void 0, void 0, function* () {
        requireAlt1();
        var rect = _rect_js__WEBPACK_IMPORTED_MODULE_0__["default"].fromArgs(...args);
        if (alt1.captureAsync) {
            let img = yield alt1.captureAsync(rect.x, rect.y, rect.width, rect.height);
            return new _imagedata_extensions_js__WEBPACK_IMPORTED_MODULE_2__.ImageData(img, rect.width, rect.height);
        }
        if (!hasAlt1Version("1.4.6")) {
            return capture(rect.x, rect.y, rect.width, rect.height);
        }
        var url = "https://alt1api/pixel/getregion/" + encodeURIComponent(JSON.stringify(Object.assign(Object.assign({}, rect), { format: "raw", quality: 1 })));
        var res = yield fetch(url);
        var imgreader = new ImageStreamReader(res.body.getReader(), rect.width, rect.height);
        return imgreader.nextImage();
    });
}
/**
 * Asynchronously captures multple area's. This method captures the images in the same render frame if possible
 * @param areas
 */
function captureMultiAsync(areas) {
    return __awaiter(this, void 0, void 0, function* () {
        requireAlt1();
        var r = {};
        if (alt1.captureMultiAsync) {
            let bufs = yield alt1.captureMultiAsync(areas);
            for (let a in areas) {
                if (!bufs[a]) {
                    r[a] = null;
                }
                r[a] = new _imagedata_extensions_js__WEBPACK_IMPORTED_MODULE_2__.ImageData(bufs[a], areas[a].width, areas[a].height);
            }
            return r;
        }
        var capts = [];
        var captids = [];
        for (var id in areas) {
            if (areas[id]) {
                capts.push(areas[id]);
                captids.push(id);
            }
            else {
                r[id] = null;
            }
        }
        if (capts.length == 0) {
            return r;
        }
        if (!hasAlt1Version("1.5.1")) {
            var proms = [];
            for (var a = 0; a < capts.length; a++) {
                proms.push(captureAsync(capts[a]));
            }
            var results = yield Promise.all(proms);
            for (var a = 0; a < capts.length; a++) {
                r[captids[a]] = results[a];
            }
        }
        else {
            var res = yield fetch("https://alt1api/pixel/getregionmulti/" + encodeURIComponent(JSON.stringify({ areas: capts, format: "raw", quality: 1 })));
            var imgreader = new ImageStreamReader(res.body.getReader());
            for (var a = 0; a < capts.length; a++) {
                var capt = capts[a];
                imgreader.setFrameBuffer(new _imagedata_extensions_js__WEBPACK_IMPORTED_MODULE_2__.ImageData(capt.width, capt.height));
                r[captids[a]] = yield imgreader.nextImage();
            }
        }
        return r;
    });
}
/**
 * Starts capturing a realtime stream of the game. Make sure you keep reading the stream and close it when you're done or Alt1 WILL crash
 * @param framecb Called whenever a new frame is decoded
 * @param errorcb Called whenever an error occurs, the error is rethrown if not defined
 * @param fps Maximum fps of the stream
 */
function captureStream(x, y, width, height, fps, framecb, errorcb) {
    requireAlt1();
    if (!hasAlt1Version("1.4.6")) {
        throw new Alt1Error("This function is not supported in this version of Alt1");
    }
    var url = "https://alt1api/pixel/streamregion/" + encodeURIComponent(JSON.stringify({ x, y, width, height, fps, format: "raw" }));
    var res = fetch(url).then((res) => __awaiter(this, void 0, void 0, function* () {
        var reader = new ImageStreamReader(res.body.getReader(), width, height);
        try {
            while (!reader.closed && !state.closed) {
                var img = yield reader.nextImage();
                if (!state.closed) {
                    framecb(img);
                    state.framenr++;
                }
            }
        }
        catch (e) {
            if (!state.closed) {
                reader.close();
                if (errorcb) {
                    errorcb(e);
                }
                else {
                    throw e;
                }
            }
        }
        if (!reader.closed && state.closed) {
            reader.close();
        }
    }));
    var state = {
        x, y, width, height,
        framenr: 0,
        close: () => { state.closed = true; },
        closed: false,
    };
    return state;
}


/***/ }),

/***/ "./images/alchemistsChest.data.png":
/*!*****************************************!*\
  !*** ./images/alchemistsChest.data.png ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports=(__webpack_require__(/*! @alt1/base */ "../node_modules/@alt1/base/dist/index.js").ImageDetect.imageDataFromBase64)("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")

/***/ }),

/***/ "./images/alchemistsChestLegacy.data.png":
/*!***********************************************!*\
  !*** ./images/alchemistsChestLegacy.data.png ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports=(__webpack_require__(/*! @alt1/base */ "../node_modules/@alt1/base/dist/index.js").ImageDetect.imageDataFromBase64)("iVBORw0KGgoAAAANSUhEUgAAAIoAAAAJCAYAAADto7QSAAABhG5vUEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJisiSAAAAAZub1BFAAAAAAAA7Gu72AAAAAlub1BFAAAAAAAAAAAAoYpy1QAAAAdub1BFAAAAAAAAAFrm3tAAAAAZbm9QRQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAzWlrwAAAJuklEQVRYw42YWXBb1RnHf/de6V5JlmLLciwvceJYtmMlTGwTA4HgNIEESJxpS2mSYabQadj6UrqlQxtioHQK5IkUKPDAJHkpDJSHtEPJUGAI4w4kaRbqBLLhGLxKXuJ4kXQX3Xv7IOta8pL2vGjumTP/7//9v+0cCffc0WTLbje6bgCwa3WKM3EXZ+Jucteu1Sm2R1WmdIEDnV6OdCnYtoUgiM4Zr5Tm/lUGTWGDgGw7+4MJiT1H/exqTLG9IYPx0kkfHb3yHOyXTvo4+o3EI80626MqALEpEb9sc3nMxZ6jfgf3uQ1T/KHDQ8p0YZomkiRh2xb1xTZbIhovnfTN8F/AdmuVzpaIDkB5gck7Fzwc6VJ4bsMU5QUmAGV+y+GR/T7Q6eWdr2QeatQ4diXFG0dHuK2l3sETBYGwL+3gzbdM06TQK7KjQaWpzCDgnkezWdospFlHn8zDTRr31Sfn1cw0TTZUm46vZQUmf73g4f2v3Ty/MUl5gYkNlE/7OjglIuT4KmKDrhsIgkBJQGFLRKNt2QRXx6ZQFNkhfqDTC8CxrhS7D12id2A0L0n8ss2rWxLUFpvsPJRgxe/jRNoH2LQ/BnqSf3/RxYH/zGA889YlYkPXADh41jez/+ZFhkYnHHsfnVcp391N+LeDvHt8lFOdV5DlTBI3hw2a/HGMtInkkpBlN4Igsj2qUlNk8OXF3hn+89huDhvsuS3Bsx/bbN4fp+21qwzH4vQOjNLR6+aGP44Qae/nk0taJpF2dxNp76fyyTjHz/bR3TvCYELk7+cMapaWOnhPfZDmzhdjtL1+lZHYEL0DowAIgpCn6SIPvLx5gkgwzc5DCaLPDhF5aoDNf4qDkeRU55U83Z958yLx4XEURc7ff+sSsfg13jij5Gv2xCDvHhvhVOcVWiosh9vm/XG2TfvaNzjm+Frb3s8nlzKJVLG7m0j7AJVPDnH8bB+uLGnbttm4ZBwbWLdcxJ8eRdP881bCooCXqooQtm1hWTaSJLGjQaWswGLz/iEGEyKtt0SRJBFdNzjclcRIX8vH8HspKy1ybM9g+6gIFzvJABAqDrDupgZOqwaLQyMYRpqVYQGAn6338Jc/jxJZFkYUXZT7dVqrMs6OT6bm5z9tu7Y407GmhvtZtaIGn1fmzISGkR7nSJdC2eJCqipLKCqcBNIArF+7EkEQ6BddyO4Yn/QvosCXysNTx2IO3ulpvKyfmqY7PHau1CnzW2zaH2co5WJNUw0FXg+6YfDeNxq6fi0/sQI+wosL8zBma5mn2c1RvkKgtGSQ2mLT4RatW0aBT+HMhIFhXOO9Sy7KSouoqghRVDgFZKbLXRuaMC2LrqRKpiUIIMtuttZoPH44c2hno4iqWcy/hOkKEZEkyWnh46rNud4Eq+qrME3TGWcn4j5qlpay0BIEIe97tqDZrud32yytLMG2bUKyxqQGQZ/ID+uT2LaNqqbY3pBiUs/glSg611tfxDLJ+OHPwzzUmEkqU1KoqghhmiZVlSV5/ubyM02DJeUhVFWjfDpIs/Fk2e3gZf30eLwOTuuSjGZf9iWJ1i3BLUkZzWz4rF9h+dLSOUkxGyM3fvkkQdd0XJZKVUVxHrdHmnUEQcxwqyxBkiSHY+5SVQ1DN3C7JJzZ0ViqM2kIvPP5MCf6BB5t9TMSG1hY5VnkyvwWVxMWbpeEzyvPOZOb8ZuiHk79poiDbeMc3DbOgbbxBc04Z7dNsKsx5SRVmd/in5dhLGmxe3OAKz1DlPktWqt0XunIjIqaxS6SqYWT5fI1iac/VRhLWjzYbLH35syIcLskpwAQQJyVyAtpcXlMov1jt4P3RHPMwUMAt9uFqqYW1iyr1/TvfJod2HqN1zbFOLht4n9r1jbOrtUpjLQ5h1v72lEEQcDn81zfNUHALbsRBUFAkWXurU1Q5jP5cm8pK6eLv61OR5LcmKY5FyHnbuPxKMQSEstDEosL3TOzePrM7M7x0XmV6j29RNr7ieztJ7K3b0Gi2bNrnhvg/ZNDnLvQgyAIrAjZdF81ef3ztNNVdjSovHnWTee3U5lEKXGRUrV5u1bWhxMxHw++6+LjixrrlotUmL1zzlg5ozG3OObz8+SI38G7rToHL08vr3PhzGgm5+PknM2OnqwOtU8NztXMBsNIzzm75vkYR04Pc6lrAATonCxm12E5w22ZSHm6ByMnhu5ZXUlRZGzbxtANRNu2CbpV6oJpmveNUf/0IOEnBhhLWjzaGuBydz+iKMxfRYo8XSUaHT0ZIw+0yEiSO+/ekX015O6FggHWr13J+ltXsuk7TdcdR6FggNWrGzhvVLEo4MO2bcK+NJfjOodOC0yosHtzgHWVGq9+OompZCpxzVLF6Si5tp3Wv1RHVmRchWW8eCoIwGKv4VyynY6S4382IbIBz8XN3o3SSuFcvGm9FMXjdJXsC+aBFjdTifz7VJnfwrbtvELLaBbl7o0tbFrfeN1xHQoGWN24gq/tahYFfLQu0dE1HdUV4JWzpQ63kbEpXNMxNHJsQX6BiABbazRODkj0DCVYf2smeCeGCqgpcVHnn8x73QQLstcagbpgmi01Oh6Pwt+uBDgXs3jh3iB3hGN5LfnxliRp0+b/WaIo5FVt1h7Ad1ekiVYXO8+7oXGdRQEfh7v8BH0i+z4Y56vuESgIOR1lYjKVdyGc/eSfGruKIAjUl3ucakyqek6eCHOqbCY4Zp6fuxpT6MmZbjYvniAgKzKyInO4a0aze6rG8uw83pKcMzZFUZhT9fOtXM221RlEq4sz3FIJPIpCbenM6yiV0nBJLjweZV6dsqNH+t3Wome+X68xPJGmo0cgFMpUQtBjckuFwdrlbgbGTVqrbZrDaSoKJR5d52Frrc599UlePWZxtnsM2ePleDzAua5h7qqDh5tU2iI690cT9ExI7P9HL7/Y6KM5nCZYICII0KctAuDHq6ZYtTizjwCxdJAf1CVpDhuOvW11OrdUGuz7MMkvbxdpChtMpUxODyl0TXqpCaT41dvDVC4JU+Av4Hv1GtEyFxIWF8Z97IhqNIcNggUioigQt4ppCWs8dqPGXdVJbq9U2dfh4u3Ph1kRKUdR3DP/s9RoyBJUFLrQBC9X1UwgDMPAsmxs28Iw0qxdYvLYjRptdQbfWWqw718u3v5smFUNVbhdEqZpkk4bmKaJaZqkDIuOXpnz345xT73AY2sM2mp1fnSDSs+ExMsfDPDrO/00luqONoNGEZqu8ZPVKVaGjDwtt0fVvBhtq9W5qVznhQ+TbKp38dMbNe5enuK28qTja82yUlySSDptsq5SY0tEQ5ZsKgpdWHKA4YSNZVr8FxBvzuT2s8hOAAAAAElFTkSuQmCC")

/***/ }),

/***/ "./images/crystalChest.data.png":
/*!**************************************!*\
  !*** ./images/crystalChest.data.png ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports=(__webpack_require__(/*! @alt1/base */ "../node_modules/@alt1/base/dist/index.js").ImageDetect.imageDataFromBase64)("iVBORw0KGgoAAAANSUhEUgAAAG8AAAAJCAYAAAA8aHInAAABhG5vUEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJisiSAAAAAZub1BFAAAAAAAA7Gu72AAAAAlub1BFAAAAAAAAAAAAoYpy1QAAAAdub1BFAAAAAAAAAFrm3tAAAAAZbm9QRQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAzWlrwAAAJcUlEQVRIx22WeZBUxR3HP93vmvdm9tRd2MUyImLwQCESQUVKSxblkuXQUAFvJaJoaaUSpYxRsVIhFmIq3jGJIppSEjQVqywtwQPEA9CgsTAYKlFEYBVYdnZn5h39uvPH253difY/U6+nj+/v8/v2r1vMOqbd5IOYBfMTxp0ek89rBGCAri6bO5b7XHZVyMJLIgAOHJAUCoY3Nzs884xPbzeExgBw/8oy405XbNricu99eTwMbW2SB1Z1s2+/ZO2zBXZ85HL2mSWmz1BIAS2tirXrXN5/q447ftFNe5sGYPjw7Hf/AYno//7D0z7Pr8+h45Qg51EOI3xXcuUVMf/4QPDxzgAdxYTG4LuSxYsrLLwkoq9P8NTTPi++ZOO7Es92iFQCgJAORicI6QBQDiNamgWdnSETfpBSyGsMIIWgq8ti+e0+V12bsGBemb4+wYMP+mzYZAOw9NqIBfOz/R54JOD9LQ5XXhGzYF45Y9dlUchrdv/b4s4VTTgSxk8sM70jxLUsWloV61/I8cqrLitWlGgblgLQNoTFwPeatXlkPohZvaqX40fGLLhVMGZeysjOhI4bFcaL2VossvbJHAAbthraZkcsf1gza3rMuCm9JP2gfFey/N4cn++DsWNj9qoeAPJBggFm3xbz0Gs9jBhdZPnyMsvvE5x/Q8KsZZpeq8Jn3UU2vetyyjzNqE7FG9syQ7TPjhjZmdDeodm2t48ve0pVyEHOw3ZTLpxWYfrcMnt7+wDwXYlJDM/+uR6A93Zqbn2qyL4wREiHI+UIkxhMYtA6oSdKs6RrRX2zZPWqXk48IWX+zTBmXsoJnYqpNyakbsx7R3pYszZfXfeuF4scSRNyruS3T7jV/nvX97C/EvHUGneQ3ayQ1qkp67bEvNP1DaNPqXDnz0vcc7/NBUtjZt1s6DIlvuit8O47OU7tZ/H6EBYndCraOzTvfFnEXtAZ0t6mmbosoeugxbj6emwhoAzP/yUi1iGxk2UcoNlx+Py9FuAbJoxP+eO6iOPcAB2nEEt+92DA6l+XmTdD8fZLKZdfVuGhJz3++1XChIY8Z4xRAKjGEuOKrVBSbN2oSKXhpZds2nMew+sCGtw+IDsdZzc14buSf21KESKrAJExBMDcizNXTp5gaPpeSLjPgdgQGYMXRlXd9bZNey5Hub8vdiQ5aaOjmJxn0xMpvNjwo86I9jZNxzLFvm7JuKOasKWgWIz4+3pNYioMbXWuQ7OfI4xTPCGq/Q2OQ6PlUIl1DbtxDfVse82i2S9z8ugsKWFDidOaW6FX8dHrKaFQ/O0Vm1bP5Zj6PI12L5Bxm9TUCMDHb2nkWZNjenrh0z2a7xfypP0bSddi42aL0fV1WWK+o23YqjlcifAwSNdCuhaf7XR57S2LX90oOW1SmULBsOr5iFFBgG9Z7NwZAPDawzaLFxUJch5O6tJi20jXotXzssW1qe7ju5JKrEmBUfUB0rXwhCDUimkdFZbdZQGwcFZKn8jmDQU5tEk3G6vjlFArvlYJegj4KZMTenph556UY4McdbaDiVPqLJu3t/p8z/drF9SmJv5q9xD9Q1uQ8ziqoDmuEPDeNmpYSNeiVLYYEfjoOOWY+jw6TpGDZwfflUjXIpASOaLNcLgIthCI1OAJgXQtKpGi3rJp8pwaUQAXdJTY8ZHLb9Zo6pzMXZUoc0Yl1jzxVFZmH7w7ZeXvJakxtOdyFFPFtk8Uy+/16C7CVQsVt91xkEqsKeu0epd5GJCD8Afc6wlBhCAns0RPGq8plSTrtkS8+6FkyVxJnxw8GZH5NsD/N6InLSKTndQwVrS36SqPox2XUCuka1XXavWyPoCpZwo++Cs88XiRNY/18PTjPYP7AH7OI+6fNzD28UcOsXhxBak1u79wa1jcdecRgpxHQVLNQWaEQb1D45cHDkhGjoCWBolwMpEDk3xXouOUcjmsEXDLDWVe3KBp9lxGBZkTm/xcdYPyYYetO7KEP/lmmTF1AZExNPoewrXYvj3gx0s9Nm41TJ5gOPaMIvWWnQHUCjeoJ3umDCZBuhaNgUdO2hwultBxyvy5FVqHpXy63uLUEzNIsy+KKGn97cRJUdMnXQsdpzR4VtUYwrHYtz/jcXSDqInfEwJP2jV8Nmw1jJyTMKpTMXqeYlSnqtmvMqRsD4w943LFKx9FfHKkj9AYNm9xuXSpW2XRcupB3KCenLTxPbvfCIO6PTEYv3xzc/bKunyOQfUH53s2JkkZPlwjXQth2TUCXthouOenijmTBh0ZakW5L8qCi3Vmvf6WFzaRzhzfMSkLqHjAYtXq7EExbHjK11GMJwSVSNH19UH0ELt5InNbUamq65tbYkaNShg/3zB6rqJ1qqK7F5bMlRyMom+XTW0wSVo1w0ACwv5TPRDHG5uzWK+YA4k21fgjYwgay1WgA63RcTirqZGzW49ifL4wpGxqoljROMTUzZ7LyXYjn2xpwkcwbXJ2p1cOedy3MnsEtQ5T7PxqP+Uwqr7ia43cr1slyOfWuXy8C1Yus5g7r0KkUyqRIrZgyU9KlCpxjeBmx+Hpx+rZtF1w/y8VJ42Nahwd6TQ7KaL2nmn0PSqR4rqrI8qUCQoe7S1p1RQVnWagXAvhWDVuC3IeB0olQmPQcUrOtVkwB7bvsNnTrThn2NGc3dTElrddjh8hGDM2JlRJNYFNdZmXhGMx8iTD/BnZf74rMQOa+831p+cs/rlLsHKZxXmzetFxWo3/9ltiSpX4W8b4rvIsEXiuTXclHNTQfw/O6QgZe2yBay6rQKDwPZvjjxFVFqHI1tSVKCuPQy69gfiDIId1QlC4++U3LHYfiplxnuaW6xSdMxRLLk/4co/FQy+H3HSZYMI4RVOdQACf7Ar4cLvHUe0RP1uS0tCk2fGxxLJdjIbzz1XMmZHgueB7gj27HbS2sLRh4sSEm65NmDkt5oIpihUPOKzfEnNKY4FEGXzbYsoUxcUXxngetLcIKkWHw0UbE6e4ns0ViwSzZ5Q42KN5812LQDu4nk19Q8o5ExWTTof9hwSTz9L8cHxKe4vg+kuhc4Zi0YKIR9fY7DqQIJEUPAulwRYyu++ly6tvSHYfipl5nmHpNTEzL4y5ZnHMf74QPPpyxE1XyioPCez9LEeoNDdfn3LqyYOcPtvlsujSuEbD7OkJZ01SrHhcc9G5sOzqmJnTIs6forinn8XIhgJOognyOc6dGDJzeozrZixUOUeSNNIdKf4HTx2geqDIlp4AAAAASUVORK5CYII=")

/***/ }),

/***/ "./images/crystalChestLegacy.data.png":
/*!********************************************!*\
  !*** ./images/crystalChestLegacy.data.png ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports=(__webpack_require__(/*! @alt1/base */ "../node_modules/@alt1/base/dist/index.js").ImageDetect.imageDataFromBase64)("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")

/***/ }),

/***/ "./images/eocbotleft.data.png":
/*!************************************!*\
  !*** ./images/eocbotleft.data.png ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports=(__webpack_require__(/*! @alt1/base */ "../node_modules/@alt1/base/dist/index.js").ImageDetect.imageDataFromBase64)("iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAAW5vUEUAYtdMlAAAAARub1BFAAAAAEEgjiIAAAAJbm9QRQAAAAAAAAAAAKGKctUAAAE4SURBVChTfZFNS8NAEIbfbrLpbto0ba0KWqTYQg89CMUKghf/mb/MkyB40IOIHxfRSimWSkNtkzTZrMlYbzUPzO7szs7wziy6g3PNnIY26/u60z/TKcgzZnIDGUIIqFiRnweLIwXGi3SwioL2PJglinCrLoIggFLR+vp/2CoIEab2x17vWK/djVAPKlqBGww68jEZDXOT2PJ7gUglZEnBAk/7mYzHaLR7G5NYtmTVsynZ5RJsx6HAcj7fmGQyvaLqYeCBGSY9zJIzatU6yeufnOLu6hLakmAFLiloOy4aO7s4aHXobKXfI0tlknd7c43u0QCfr88wtpvti0THWKS9eLMpmq1DyHTU3N3Cx/AdJVugUq7Am4ww+5r+TskSkmToKMTL4z2ElHh7ekBicpLl1mrwfR+tThc/Sc6HTgcfco4AAAAASUVORK5CYII=")

/***/ }),

/***/ "./images/eoctopleft.data.png":
/*!************************************!*\
  !*** ./images/eoctopleft.data.png ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports=(__webpack_require__(/*! @alt1/base */ "../node_modules/@alt1/base/dist/index.js").ImageDetect.imageDataFromBase64)("iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAMAAABhq6zVAAAAAW5vUEUAYtdMlAAAAARub1BFAAAAAEEgjiIAAABmUExURQwaIxMiKhsrNCItNSs6RCMyPCg1Px8KCRolLCsODTQRDzNDTREdJEQaFkIUEzsTEgkVHEoVFEsaFUwcGlIeGjwZFVEkI2mAjXOLl2B2g1pvey09SBMYHFRmcRMlMDlLVyM6RgQSG8bROHQAAAAJbm9QRQAAAAAAAAAAAKGKctUAAABzSURBVBhXNcnbFsIgDETRtI3FIKSQBPBe/f+fFHE5T2evAYBpXhDxsODae3X/wRGdI0/kPXk4hd6Rt8iRISTnOYuIqkFKVNiymKl+sbGJZYvj8cKqVcfjiGNW5fpDabWUer4MtPlaarthx/0xT8+9vd7hA+tIB9rzLA2SAAAAAElFTkSuQmCC")

/***/ }),

/***/ "./images/eocx.data.png":
/*!******************************!*\
  !*** ./images/eocx.data.png ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports=(__webpack_require__(/*! @alt1/base */ "../node_modules/@alt1/base/dist/index.js").ImageDetect.imageDataFromBase64)("iVBORw0KGgoAAAANSUhEUgAAABcAAAAWCAMAAAAcqPc3AAAAAW5vUEUAYtdMlAAAAARub1BFAAAAAEEgjiIAAAFKUExURQAAABkqMxIdIxMiKgQSGwINFAIVIUFTXyQyPAkVHRIgKCYtNUAJBn4xGKUyKNBaSj4JBicuNhMlMAwaIxEcISEnLz8IBe/FY+mcV8ZPQj8JByAkKBwwPGEKBJYlHeGQSP7KXEAKBzlLVyEmKzYGBYgaFNWDOvy/SSEuOTE6Q0sKB2sKB811Kvy0NXIKBgwYHjNDTQMJDBsnL0BETGMLCX4PCcVpG/upI2IMCgMDBBgmLzU5QWIKCJYwCPqgEr9eDjU9Ris6RAYMDxYiKWUWDWQWDTM5QDpOWixBTRwoMDE0OlsMDVoMDSsxOQcVHl1xfS09SAYNEBgkKlsLDCsuNUBQWg8dJic1QRItOwYRGDExNlwLDDY9RjlIUlNmcQweKSYuNTQ+RkxeagEFC0daZSM6RgoiLhokKktgbAIbJwQQFgwRFRMdIwAAAMy8RMYAAABudFJOU/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AoAU8MwAAAAlub1BFAAAAAAAAAAAAoYpy1QAAAa1JREFUKFMlkf9T00AQxe+ye/QWbdA8FdBr0GihWmgStYjWggWVICj1Wyl+i4opWvX//9VjfPNmduYzO/vezKq/OiDNZqZmZfbc+Xo4NxfWL1ycVRGTZXDN4tLlK/X5hcXFhfn61WuKyRkJ/uNGvHR9yTtu3FBwLJzYQG7eajTDcHllZTkMmw1lhdnUWmJu32k343h1bW01jpsdZVKBQYb87r37ne76g3XvbmdDsYAYyOTho97j/uZWt7u12d94ooRhWCgbpNs7vaf9jlf/2fNdZQFf05ItsL33Yr/tdfBy95WyTpPVdOh4iNdvem8b7YN370es7JCgB4dHGFMhx3sfPu5/+jyCVrnWMF9KcQxd4Hjn67fvIzitTiTTPyJUgWGKCuSScemQK2bKHFXMKYHLISWAx4ECs05kAi8GnSaYWOSoVIkJbJUlw2rA3KoxjoI8qCI1LlFGtUIDlOifAXwEKg3lyplfhSNMzFQnZ/l5WkWcqnFVFQ4li8lzgaVcrAafKn+FzjKn/jvsKP+dkoj1nCBIxQgk8k3EU9GBUX5Mp2yMYb9tTJoSt/6cmH+D5EJZGWljEQAAAABJRU5ErkJggg==")

/***/ }),

/***/ "./images/legacybotleft.data.png":
/*!***************************************!*\
  !*** ./images/legacybotleft.data.png ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports=(__webpack_require__(/*! @alt1/base */ "../node_modules/@alt1/base/dist/index.js").ImageDetect.imageDataFromBase64)("iVBORw0KGgoAAAANSUhEUgAAAAwAAAAHCAIAAACz0DtzAAAAAW5vUEUAYtdMlAAAAARub1BFAAAAAEEgjiIAAAAJbm9QRQAAAAAAAAAAAKGKctUAAADVSURBVChTY5zQWSYsJLZl6xYWZtY/f39fuXaDgYGBjYX515+/fDy8P358AzJAip4/f6mjrbt3376PHz8AVfz99wdIQgAzEwuQywThXLl62dnJiY2NDSjEy80vJCgCJIGIn18AyAYpsnP2sbRxA6rz8fYBcoGWfv/+DUhCGEARxr72skuXrrx4eE/fzBzIB9q7eu0qIAMCINYxa6gp/fzxnUdA8OvXb0B0//797z9AuiEqgNYBuYwJkV6/f4FMhkgAgaiIMCc72+9/v//8/s/Cyvjn938ASgxr+1oDceAAAAAASUVORK5CYII=")

/***/ }),

/***/ "./images/legacytopleft.data.png":
/*!***************************************!*\
  !*** ./images/legacytopleft.data.png ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports=(__webpack_require__(/*! @alt1/base */ "../node_modules/@alt1/base/dist/index.js").ImageDetect.imageDataFromBase64)("iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAAW5vUEUAYtdMlAAAAARub1BFAAAAAEEgjiIAAAAJbm9QRQAAAAAAAAAAAKGKctUAAAEmSURBVChTTZDJSgNBEIZ7melk9kFRRk0i+ALe9OojePMJvXnw7FkQvXkRNzwFFEVISDJLT3ePf9uDsSh+vir+ql7o5cX5zfUVIeT+7lakKYAzTwgB8LivdGs7s+lDsTeCI9sufM/vTKeNAkgpa1kp1SLZ4dExHJs7Y8whsyzHaBCEPQxDuylhTbF/kKXx1/enbBu0MAoty1XXGcf07PQkzzfeP6aT0Rj1/1iuqjgKANaE5fP57PHpRWnjceZUDKKyXLhybXp+fZvsbmFOGeIxMgyTulyAGaMMr/jdTYTHO8rR5dzqcmkdCGM6FgYRyKkYCDgAcZwAEHYNEt/VyhYqlZZNv7WqSgeUMiRzxV/g2T0RorWGomPv5Au/qtejDhA4DheglP0Aa2SQg761+aoAAAAASUVORK5CYII=")

/***/ }),

/***/ "./images/legacyx.data.png":
/*!*********************************!*\
  !*** ./images/legacyx.data.png ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports=(__webpack_require__(/*! @alt1/base */ "../node_modules/@alt1/base/dist/index.js").ImageDetect.imageDataFromBase64)("iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB00lEQVQ4T6WTsWvbUBDGP4MHZegf4S0uZLChQ7QlkKHOlECXGjzUY8dAps6dsmYqmYrJ1GQIOENAHgzq0GIPLWRUIIFnsOG9QaCDCBru7j3ZMZmaWyQ97n7f3XdPtdZm4x9eETUGnHw9wmxmYBYOeASiN5EiS5IHlSsKj/xNsHmB028XEMCX4z6yzMDmFkSEqB5JkkQ9qkABwznWWVxcTxXQ7x3CGLMs8ooMIQIi31AA8xmLDW884POnQ2QMIMLZeSJC3Q+7kOq66g4uUz0/iOXYLAyS8a120P3YgZ1bST77PqzmZgiLDy4VyrG/F8tIJrdIRh7Q73WQ3RstJMKPK1UL6lXxToyC5QE4BoQOGODmFianyrDhjYf46t3ttgAL7y3nJ79XOjDGwuVOXQeQjFJZX+Q9iN+1FVUSinKtg+CB4/ZKQjKeANio5taXAnHrrRRzzJxF+vOFDniuMH+81ZDX9E9WwVrNBlAWYLFnWzD3usb0lwLaLU5cGjmZKqTZbIBQwM0JafCA15U9GClgSPCBC9gDvlDBPNkUd2BXAJ3323ALpzexRDVnmF2LlpbIVbaE6d9MLxK3yz+HJMqa/K7WbCROqbZAyO6MAm7v9BL9TzwBIN4z8nZ7bgEAAAAASUVORK5CYII=")

/***/ }),

/***/ "./images/triskelionTreasures.data.png":
/*!*********************************************!*\
  !*** ./images/triskelionTreasures.data.png ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports=(__webpack_require__(/*! @alt1/base */ "../node_modules/@alt1/base/dist/index.js").ImageDetect.imageDataFromBase64)("iVBORw0KGgoAAAANSUhEUgAAAKYAAAAJCAYAAAC4wldMAAABhG5vUEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJisiSAAAAAZub1BFAAAAAAAA7Gu72AAAAAlub1BFAAAAAAAAAAAAoYpy1QAAAAdub1BFAAAAAAAAAFrm3tAAAAAZbm9QRQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAzWlrwAAANcUlEQVRYw3WXeZRV1ZXGf3d+9w1Vr6qEGjAiKBJtDFIig4BpBQSLeRDiEAUFiQod26zYDiso6nLKSkRFjYoiyDIJBnUZjd0t2GCJKJaARMEpJKiEQmmpqvfq3fmc/uNW3aoH9v3rrXf23efb39772/squ1ZnZF1tCIpCXW0EQGurigTq6wRr1qRYv8Fk6TUhs2aV4vPDGpmMYNs2gzVPpzhSAADbVLn8coefXOxRLCqseizNtu1ppAgYMdJj+pTYf11tyMaXMry5KcW8SwvMn+NSLCqsuMdm38cmS68rMXmSz6uvm/xhg0nbdzqXXFbisnk+AIdaVXJZyWefayy/I8uCK33mzi5RLCqsWZPi5b8Y2KaK4wtSisIVV3vMn+NSKCo8+lia999L44UB2axk7pyAsee6oChkM4ItzQbr19t8+50knbJIGx7/cUuJh1bmKRYVXMdHtUw03eVni7wE54MPp5I7VVMDwEJy950l6mrDhM9ufrv5Xr3OZu3zOjcuiXr4bVXJZiVbmg1WP2MR+BrtXoRt6Sy6wmH+HLeMhy/+ZnDbLTaqZSI8H1fKJBd/3a2z4yMTC4njC2xTxdINzhlZYvIkD1CTfLz+XxbjLyiy+CqPbFaydl2GP/5Bx0cybqTCrFkOP/qRz7PrMqz/vcbPFnnMneOVYdnSbPD0+jTFooKFRFENrry8I7FrPayRzQi++JvBnXdW0hGEjBnlMmdqSBhJGuoFL7yYQn17m87pswWnzAh4830JQP00j1NnhjRMFLx7qJODjsv69RkANu2Q1E91uWWVYPIkn2EXFNF1BdtUafMinnrGAuDdvYLlG9v5Z2eRs4aGLL/V4a6VOuOv9ZmyVNAqOtjXUeDJ1WZi/9DmDpQKl7FjAq67Q2Pa8k627HdpLQU8syaV3N8wzaPvhIiN7/hs/7aNx5/SEx+/eK7At6GPDOLCAnhuXfzue3sFyzd28NnRAhlLcPeKIn37BpwzT+GUGQGTlkaMGevzxO/aObFOUHI9clXQOCzkxluP4CkOrow5KhQVHlxlA/DzJ0p8UeqkzYsbT/gRFrHd29t0zpwrOWVmyP/04nfgjICGiYL3vy7yreux+imjh99pHrc8Kph6kc+ICZ38rxtiKQopVWfd09ZxPGxodnm3rZ2S6yUCkbHi95tmlyh4Ho4fN4WiGgwc3MnNN3Xyq19rTLw+4KKufOzvLPLaJps9nyoALHikjb97DilF4cMPDV7ZHONf+EgbBxyHZ9fZZVhuXhUx9SKfc8Z1oIr4PikC1vSyq5/qJpi3Hj5C4xCPFbc63PaAysRlEVOWCr6Rnaivv2pQn0kxLF9JXo/JARhVlWegVsmn22tQDZUvC53J2QmWxb6tlQAMb4zYX3JxfIGlKPR+cppOXjM4+dQ4YR3pDgZnM1QHVbQ0V4Ast/9BXufB2wPuX5Vi9eseQ3I5Ts/nqNQ1bFNN7KoNg8Z8JXs21VKbtsvv1HX66CbtIi4sxVCSpMSYNPpaJhOnBpx6asS/rfQJkAzLV5I6nOeBlRaVORg3vYP2MMInxjh0MKx6qEjfuijxFYYy+d3PSh0Xv+MLXvqzTh/bYkxtDZW9+B1TW8PZ2Vo+eSuPooBqmT3xWSafvFMNwIhhEUc8D9tUKble0hjdeRhfX8t7r+WpMg1UU8OVsTL+62QPCYw5W5JuKCXvlFyP07ry4VZ2MiSTocav4p1NGfwgQgYRKbWH6xOzGVxN4WCxRKWuJ/+fZNtlvFYbBvu25mPMjREHSg6OL3B8kXDYbTemtoaWN2roa1kM6oXlh+k0daVKWporUL8JA+p18zhSVVPDExE53aBeN6nQ9LLzbjXatEPQ5vmopoZqlhdQ97Nzd5yQNx7VuXZxiIUkdHT66HriB+C3N8Pmt3QefqXE4EyWupyN8KNkRPaAU7AUBT0d0C+TKr9MjeM4Np5jz6dc6PHVIYUPD4QMTNmJffO2uEDmjFf50ilhKRqFosKSeyJO7gePP9zJD4e42CkLr1eRHBt/b7z90nEcxz4l16PCTnFKRTpRu+6n237TDkF7GMYJ7hrRiQ0SV4TkspL+to3jhckaMbMpYOnt8e+fTBMUwjDBuXO3nuTj0gUOMojA1WlIpfB7xRTzqCEDQVbTibQeTm3LLLdVleTuTTsE3zr+99OvqphIMllJP8tk7950gmXxongNCR0d1VI1PCnxpCTqdZHjhVRoOq6Ig+2dBIFk8oUuO3fp3L9WUKnrOF54XEJUVcWTkq/+bnHLXRZHO+CnF3vc/Kt2LCSmpScJmTBCYcb58NL2kAbboi5nf6/PCSMUdm6QrF9TZMmVLhpqGbbejyclHkr5uegap3WCUEhSmprgdP14ZB5qVamqgKN+gCcjclnJMy9LfrtaJ5+DW28qMPCMzqSYjxYkbtcYd3yBJ2VcRCkLX0pSqo4Ewl44LCSqqVFyPUq+oCMKe3gDpk0LadmlJfwCmIqC16U+3Tw892QHVy106RQ9HDUOCykUFDZs83hvl8Y1s1SKhpcU/Gefa0k+Fl8SccddBTwpEUGEqShJ88YcRiiGdlzBAhi9ml8IyZRJHh901USFacTF21Xc3Zjf3yBY/UQHS64oEWoqez6OEiwL5gXceXcRE4mat7REYY4VGdtUEX5EqeQmSZgwQuGDDZLrry3wylaFasOgv21TZaeOAy567RnN20wuW2azeYdk7HBJ3zPbcLsaAuCDfZL9ByW//01E42kVpFQd29KTAuvpRsnJMwLO/mnIa7scPmprL1dHIZNGS/a971HPQ60qA/pBda5HYRUjbsBsVrLrE0koZaJcoZS8+VoV19+uUZWDFTeXGHxWrApHO+CEdE/8lZYGpobT1XRCBPhSomtq2Zjvjt+XMplIE0YotGyAG64r8epWlWrDoC6VQjU18mkLS9HLeGi8POC/9/h8VXKwLR3hR8y/2KOuTrBvo8YZg+IcTG/yy4q3pSXNpddabN4hGTdcMmh4AbriF73sIj/CdVwsVUFHpb3QLVw+mtlTcLv/FGN+5U04wTI5sSJDyfNBSqQIE8wDunL36i6PTzvihnh7m8klXVjGnC1oOKuA2q1Gx6qODKJE+hVNT867nb+4WXLHDQFTR8dEuSKkVPTK/ERSUmWnGDHSwxMRQVuKB+6LP6L61kW0uz1yf7QAM38OigKrHjiCVdGZ7FPdi3+SeF1nABlamvPkVPW4UW0pyv8/yrtiffOt2N/U8+MC7MbdUC/IZSUvbJJUGjr9ftDzXpvj8tnuCq76pQESHrvX7YkVkcTv+ALX9fH8kLydisewKB/lrh+S+h6MccH5Cb8zztWT+DvCEE/2KGveMjldz/PXLRXYmobjhfQ7SWHwIMGwuZJBs0JqJ0QcLcA1s1RaOx0Azh0b4Hgh/ncW93flo7Yu4ogfb4OHv4kLbmA/BdXQQNNxhURPBXx9SEXvwh0l60bcJC9ulqz4Rci0URqu6+MHEZUpCyco30XPsKtpeSND3jA4f1wcT9ALS00fHxXAExHeMcT5Ghx2/HjHs8r3y2rD4LlnqnirBVbeHjJwSE+CevvRFIWjjsviqzysrMTxQgaeqCTBdHhBme+DrSoLbojBPbWqxJmDO1FNjXTKorUz/viqysV+0+kU85sCTq4xEzWtysWKqZoa/Qd4zGkKjms60VW4L7xg8dUhhfuWavTp7yS4r1nosmOnxr1rI3K6jghjUqsqSBTpwEc2y26zOVr4nqIXEb6UWKqGZeocdVw0U6PStsqUKJ21cLwQ29KP4zdvGDz1eI6t78Nvloec0RjS2hk3areCV+Xike9JyazpEUP6WFiKQtMEl5bdOl8eDTm3uorRVXmamw0G9lP4l2EBvqFy3dUe0vKxTbUsH24kcEXEG1tiPPctVSm5PilTp1+9YEZTwO+eV7A1LeG89wfbk4+kE8xnDQ0xDY1210uUtSrXLXqC+bNhQF6PsaTj4jz15J5poJ2Rz94RCph4XnyxZUJDH4WwYOK0xUoZaQoL5gc0Dg2pyimgKHyx12ZHi0VNvccvl0TYuYD9/0gzd7rPOcOi2A7Y/6nFmJEhS6/2mdkU8uNxIXc9YvGnZo/B+RyXzHYT+7YOOPhplr+8pXFSf59lCwWZipADX2vMmBIx/KyQhj4KS+bB1EkBo88JuGc1LJwXMKIxSs6mT/K5bH7II2s19h4KWXKpSO5QJBz4zML3FV55Q6eo+Ny4UHDp7IimCSEffmRy48oAEaoMyeW4+iqXAf0FVRUKXx/QcDtVfEPF6zD4z60agwb7PPmSoN60SKdNZK9vtO4WDSPB+B+HTJ3sJ/wWv9ModZo4XkjoBiy4PGJYF7+KorB3p86uPWlq6j3+fVFAdY3k4z0q8+aGNA7t4uFimNkUMmpEwP1rFa6cF3DxzIAj7YIt2zXSmERATY1kzMiQ0UPhn4cFAxoUli4KmHShzwXnhax40GDjNp/TMmkqbYsvD8LH+yXnjRIsWxwwdbLP2FERz79o8NDLHidVZKgwdC6Z5/fUhIR/fJ6jebtG3xMDbloSkc6HfLxXZ9Y0j+HDevIzrSlg9IiAXz+rMn60YNnVPtObAs471+feVSk2NHv8H+OWytxcO/RkAAAAAElFTkSuQmCC")

/***/ }),

/***/ "./images/triskelionTreasuresLegacy.data.png":
/*!***************************************************!*\
  !*** ./images/triskelionTreasuresLegacy.data.png ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports=(__webpack_require__(/*! @alt1/base */ "../node_modules/@alt1/base/dist/index.js").ImageDetect.imageDataFromBase64)("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")

/***/ }),

/***/ "../node_modules/@alt1/ocr/dist/index.js":
/*!***********************************************!*\
  !*** ../node_modules/@alt1/ocr/dist/index.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GetChatColorMono": () => (/* binding */ GetChatColorMono),
/* harmony export */   "canblend": () => (/* binding */ canblend),
/* harmony export */   "debug": () => (/* binding */ debug),
/* harmony export */   "debugFont": () => (/* binding */ debugFont),
/* harmony export */   "debugout": () => (/* binding */ debugout),
/* harmony export */   "decompose2col": () => (/* binding */ decompose2col),
/* harmony export */   "decompose3col": () => (/* binding */ decompose3col),
/* harmony export */   "decomposeblack": () => (/* binding */ decomposeblack),
/* harmony export */   "findChar": () => (/* binding */ findChar),
/* harmony export */   "findReadLine": () => (/* binding */ findReadLine),
/* harmony export */   "generatefont": () => (/* binding */ generatefont),
/* harmony export */   "getChatColor": () => (/* binding */ getChatColor),
/* harmony export */   "readChar": () => (/* binding */ readChar),
/* harmony export */   "readLine": () => (/* binding */ readLine),
/* harmony export */   "readSmallCapsBackwards": () => (/* binding */ readSmallCapsBackwards),
/* harmony export */   "unblendBlackBackground": () => (/* binding */ unblendBlackBackground),
/* harmony export */   "unblendKnownBg": () => (/* binding */ unblendKnownBg),
/* harmony export */   "unblendTrans": () => (/* binding */ unblendTrans)
/* harmony export */ });
/* harmony import */ var _alt1_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @alt1/base */ "../node_modules/@alt1/base/dist/index.js");

var debug = {
    printcharscores: false,
    trackread: false
};
var debugout = {};
/**
 * draws the font definition to a buffer and displays it in the dom for debugging purposes
 * @param font
 */
function debugFont(font) {
    var spacing = font.width + 2;
    var buf = new _alt1_base__WEBPACK_IMPORTED_MODULE_0__.ImageData(spacing * font.chars.length, font.height + 1);
    for (var a = 0; a < buf.data.length; a += 4) {
        buf.data[a] = buf.data[a + 1] = buf.data[a + 2] = 0;
        buf.data[a + 3] = 255;
    }
    for (var a = 0; a < font.chars.length; a++) {
        var bx = a * spacing;
        var chr = font.chars[a];
        for (var b = 0; b < chr.pixels.length; b += (font.shadow ? 4 : 3)) {
            buf.setPixel(bx + chr.pixels[b], chr.pixels[b + 1], [chr.pixels[b + 2], chr.pixels[b + 2], chr.pixels[b + 2], 255]);
            if (font.shadow) {
                buf.setPixel(bx + chr.pixels[b], chr.pixels[b + 1], [chr.pixels[b + 3], 0, 0, 255]);
            }
        }
    }
    buf.show();
}
function unblendBlackBackground(img, r, g, b) {
    var rimg = new _alt1_base__WEBPACK_IMPORTED_MODULE_0__.ImageData(img.width, img.height);
    for (var i = 0; i < img.data.length; i += 4) {
        var col = decomposeblack(img.data[i], img.data[i + 1], img.data[i + 2], r, g, b);
        rimg.data[i + 0] = col[0] * 255;
        rimg.data[i + 1] = rimg.data[i + 0];
        rimg.data[i + 2] = rimg.data[i + 0];
        rimg.data[i + 3] = 255;
    }
    return rimg;
}
/**
 * unblends a imagebuffer into match strength with given color
 * the bgimg argument should contain a second image with pixel occluded by the font visible.
 * @param img
 * @param shadow detect black as second color
 * @param bgimg optional second image to
 */
function unblendKnownBg(img, bgimg, shadow, r, g, b) {
    if (bgimg && (img.width != bgimg.width || img.height != bgimg.height)) {
        throw "bgimg size doesn't match";
    }
    var rimg = new _alt1_base__WEBPACK_IMPORTED_MODULE_0__.ImageData(img.width, img.height);
    var totalerror = 0;
    for (var i = 0; i < img.data.length; i += 4) {
        var col = decompose2col(img.data[i], img.data[i + 1], img.data[i + 2], r, g, b, bgimg.data[i + 0], bgimg.data[i + 1], bgimg.data[i + 2]);
        if (shadow) {
            if (col[2] > 0.01) {
                console.log("high error component: " + (col[2] * 100).toFixed(1) + "%");
            }
            totalerror += col[2];
            var m = 1 - col[1] - Math.abs(col[2]); //main color+black=100%-bg-error
            rimg.data[i + 0] = m * 255;
            rimg.data[i + 1] = col[0] / m * 255;
            rimg.data[i + 2] = rimg.data[i + 0];
        }
        else {
            rimg.data[i + 0] = col[0] * 255;
            rimg.data[i + 1] = rimg.data[i + 0];
            rimg.data[i + 2] = rimg.data[i + 0];
        }
        rimg.data[i + 3] = 255;
    }
    return rimg;
}
/**
 * Unblends a font image that is already conpletely isolated to the raw image used ingame. This is the easiest mode for pixel fonts where alpha is 0 or 255, or for extracted font files.
 * @param img
 * @param r
 * @param g
 * @param b
 * @param shadow whether the font has a black shadow
 */
function unblendTrans(img, shadow, r, g, b) {
    var rimg = new _alt1_base__WEBPACK_IMPORTED_MODULE_0__.ImageData(img.width, img.height);
    var pxlum = r + g + b;
    for (var i = 0; i < img.data.length; i += 4) {
        if (shadow) {
            var lum = img.data[i + 0] + img.data[i + 1] + img.data[i + 2];
            rimg.data[i + 0] = img.data[i + 3];
            rimg.data[i + 1] = lum / pxlum * 255;
            rimg.data[i + 2] = rimg.data[i + 0];
        }
        else {
            rimg.data[i + 0] = img.data[i + 3];
            rimg.data[i + 1] = rimg.data[i + 0];
            rimg.data[i + 2] = rimg.data[i + 0];
        }
        rimg.data[i + 3] = 255;
    }
    return rimg;
}
/**
 * Determised wether color [rgb]m can be a result of a blend with color [rgb]1 that is p (0-1) of the mix
 * It returns the number that the second color has to lie outside of the possible color ranges
 * @param rm resulting color
 * @param r1 first color of the mix (the other color is unknown)
 * @param p the portion of the [rgb]1 in the mix (0-1)
 */
function canblend(rm, gm, bm, r1, g1, b1, p) {
    var m = Math.min(50, p / (1 - p));
    var r = rm + (rm - r1) * m;
    var g = gm + (gm - g1) * m;
    var b = bm + (bm - b1) * m;
    return Math.max(-r, -g, -b, r - 255, g - 255, b - 255);
}
/**
 * decomposes a color in 2 given component colors and returns the amount of each color present
 * also return a third (noise) component which is the the amount leftover orthagonal from the 2 given colors
 */
function decompose2col(rp, gp, bp, r1, g1, b1, r2, g2, b2) {
    //get the normal of the error (cross-product of both colors)
    var r3 = g1 * b2 - g2 * b1;
    var g3 = b1 * r2 - b2 * r1;
    var b3 = r1 * g2 - r2 * g1;
    //normalize to length 255
    var norm = 255 / Math.sqrt(r3 * r3 + g3 * g3 + b3 * b3);
    r3 *= norm;
    g3 *= norm;
    b3 *= norm;
    return decompose3col(rp, gp, bp, r1, g1, b1, r2, g2, b2, r3, g3, b3);
}
/**
 * decomposes a pixel in a given color component and black and returns what proportion of the second color it contains
 * this is not as formal as decompose 2/3 and only give a "good enough" number
 */
function decomposeblack(rp, gp, bp, r1, g1, b1) {
    var dr = Math.abs(rp - r1);
    var dg = Math.abs(gp - g1);
    var db = Math.abs(bp - b1);
    var maxdif = Math.max(dr, dg, db);
    return [1 - maxdif / 255];
}
/**
 * decomposes a color in 3 given component colors and returns the amount of each color present
 */
function decompose3col(rp, gp, bp, r1, g1, b1, r2, g2, b2, r3, g3, b3) {
    //P=x*C1+y*C2+z*C3
    //assemble as matrix 
    //M*w=p
    //get inverse of M
    //dirty written out version of cramer's rule
    var A = g2 * b3 - b2 * g3;
    var B = g3 * b1 - b3 * g1;
    var C = g1 * b2 - b1 * g2;
    var D = b2 * r3 - r2 * b3;
    var E = b3 * r1 - r3 * b1;
    var F = b1 * r2 - r1 * b2;
    var G = r2 * g3 - g2 * r3;
    var H = r3 * g1 - g3 * r1;
    var I = r1 * g2 - g1 * r2;
    var det = r1 * A + g1 * D + b1 * G;
    //M^-1*p=w
    var x = (A * rp + D * gp + G * bp) / det;
    var y = (B * rp + E * gp + H * bp) / det;
    var z = (C * rp + F * gp + I * bp) / det;
    return [x, y, z];
}
/**
 * brute force to the exact position of the text
 */
function findChar(buffer, font, col, x, y, w, h) {
    if (x < 0) {
        return null;
    }
    if (y - font.basey < 0) {
        return null;
    }
    if (x + w + font.width > buffer.width) {
        return null;
    }
    if (y + h - font.basey + font.height > buffer.height) {
        return null;
    }
    var best = 1000; //TODO finetune score constants
    var bestchar = null;
    for (var cx = x; cx < x + w; cx++) {
        for (var cy = y; cy < y + h; cy++) {
            var chr = readChar(buffer, font, col, cx, cy, false, false);
            if (chr != null && chr.sizescore < best) {
                best = chr.sizescore;
                bestchar = chr;
            }
        }
    }
    return bestchar;
}
/**
 * reads text with unknown exact coord or color. The given coord should be inside the text
 * color selection not implemented yet
 */
function findReadLine(buffer, font, cols, x, y, w = -1, h = -1) {
    if (w == -1) {
        w = font.width + font.spacewidth;
        x -= Math.ceil(w / 2);
    }
    if (h == -1) {
        h = 7;
        y -= 1;
    }
    var chr = null;
    if (cols.length > 1) {
        //TODO use getChatColor() instead for non-mono?
        var sorted = GetChatColorMono(buffer, new _alt1_base__WEBPACK_IMPORTED_MODULE_0__.Rect(x, y - font.basey, w, h), cols);
        //loop until we have a match (max 2 cols)
        for (var a = 0; a < 2 && a < sorted.length && chr == null; a++) {
            chr = findChar(buffer, font, sorted[a].col, x, y, w, h);
        }
    }
    else {
        chr = findChar(buffer, font, cols[0], x, y, w, h);
    }
    if (chr == null) {
        return { debugArea: { x, y, w, h }, text: "", fragments: [] };
    }
    return readLine(buffer, font, cols, chr.x, chr.y, true, true);
}
function GetChatColorMono(buf, rect, colors) {
    var colormap = colors.map(c => ({ col: c, score: 0 }));
    if (rect.x < 0 || rect.y < 0 || rect.x + rect.width > buf.width || rect.y + rect.height > buf.height) {
        return colormap;
    }
    var data = buf.data;
    var maxd = 50;
    for (var colobj of colormap) {
        var score = 0;
        var col = colobj.col;
        for (var y = rect.y; y < rect.y + rect.height; y++) {
            for (var x = rect.x; x < rect.x + rect.width; x++) {
                var i = x * 4 + y * 4 * buf.width;
                var d = Math.abs(data[i] - col[0]) + Math.abs(data[i + 1] - col[1]) + Math.abs(data[i + 2] - col[2]);
                if (d < maxd) {
                    score += maxd - d;
                }
            }
        }
        colobj.score = score;
    }
    return colormap.sort((a, b) => b.score - a.score);
}
function unblend(r, g, b, R, G, B) {
    var m = Math.sqrt(r * r + g * g + b * b);
    var n = Math.sqrt(R * R + G * G + B * B);
    var x = (r * R + g * G + b * B) / n;
    var y = Math.sqrt(Math.max(0, m * m - x * x));
    var r1 = Math.max(0, (63.75 - y) * 4);
    var r2 = x / n * 255;
    if (r2 > 255) //brighter than refcol
     {
        r1 = Math.max(0, r1 - r2 + 255);
        r2 = 255;
    }
    return [r1, r2];
}
function getChatColor(buf, rect, colors) {
    var bestscore = -1.0;
    var best = null;
    var b2 = 0.0;
    var data = buf.data;
    for (let col of colors) {
        var score = 0.0;
        for (var y = rect.y; y < rect.y + rect.height; y++) {
            for (var x = rect.x; x < rect.x + rect.width; x++) {
                if (x < 0 || x + 1 >= buf.width) {
                    continue;
                }
                if (y < 0 || y + 1 >= buf.width) {
                    continue;
                }
                let i1 = buf.pixelOffset(x, y);
                let i2 = buf.pixelOffset(x + 1, y + 1);
                var pixel1 = unblend(data[i1 + 0], data[i1 + 1], data[i1 + 2], col[0], col[1], col[2]);
                var pixel2 = unblend(data[i2 + 0], data[i2 + 1], data[i2 + 2], col[0], col[1], col[2]);
                //TODO this is from c# can simplify a bit
                var s = (pixel1[0] / 255 * pixel1[1] / 255) * (pixel2[0] / 255 * (255.0 - pixel2[1]) / 255);
                score += s;
            }
        }
        if (score > bestscore) {
            b2 = bestscore;
            bestscore = score;
            best = col;
        }
        else if (score > b2) {
            b2 = score;
        }
    }
    //Console.WriteLine("color: " + bestcol + " - " + (bestscore - b2));
    //bestscore /= rect.width * rect.height;
    return best;
}
/**
 * reads a line of text with exactly known position and color. y should be the y coord of the text base line, x should be the first pixel of a new character
 */
function readLine(buffer, font, colors, x, y, forward, backward = false) {
    if (typeof colors[0] != "number" && colors.length == 1) {
        colors = colors[0];
    }
    var multicol = typeof colors[0] != "number";
    var allcolors = multicol ? colors : [colors];
    var detectcolor = function (sx, sy, backward) {
        var w = Math.floor(font.width * 1.5);
        if (backward) {
            sx -= w;
        }
        sy -= font.basey;
        return getChatColor(buffer, { x: sx, y: sy, width: w, height: font.height }, allcolors);
    };
    var fragments = [];
    var x1 = x;
    var x2 = x;
    var maxspaces = (typeof font.maxspaces == "number" ? font.maxspaces : 1);
    let fragtext = "";
    let fraghadprimary = false;
    var lastcol = null;
    let addfrag = (forward) => {
        if (!fragtext) {
            return;
        }
        let frag = {
            text: fragtext,
            color: lastcol,
            index: 0,
            xstart: x + (forward ? fragstartdx : fragenddx),
            xend: x + (forward ? fragenddx : fragstartdx)
        };
        if (forward) {
            fragments.push(frag);
        }
        else {
            fragments.unshift(frag);
        }
        fragtext = "";
        fragstartdx = dx;
        fraghadprimary = false;
    };
    for (var dirforward of [true, false]) {
        //init vars
        if (dirforward && !forward) {
            continue;
        }
        if (!dirforward && !backward) {
            continue;
        }
        var dx = 0;
        var fragstartdx = dx;
        var fragenddx = dx;
        var triedspaces = 0;
        var triedrecol = false;
        var col = multicol ? null : colors;
        while (true) {
            col = col || detectcolor(x + dx, y, !dirforward);
            var chr = (col ? readChar(buffer, font, col, x + dx, y, !dirforward, true) : null);
            if (col == null || chr == null) {
                if (triedspaces < maxspaces) {
                    dx += (dirforward ? 1 : -1) * font.spacewidth;
                    triedspaces++;
                    continue;
                }
                if (multicol && !triedrecol && fraghadprimary) {
                    dx -= (dirforward ? 1 : -1) * triedspaces * font.spacewidth;
                    triedspaces = 0;
                    col = null;
                    triedrecol = true;
                    continue;
                }
                if (dirforward) {
                    x2 = x + dx - font.spacewidth;
                }
                else {
                    x1 = x + dx + font.spacewidth;
                }
                break;
            }
            else {
                if (lastcol && (col[0] != lastcol[0] || col[1] != lastcol[1] || col[2] != lastcol[2])) {
                    addfrag(dirforward);
                }
                var spaces = "";
                for (var a = 0; a < triedspaces; a++) {
                    spaces += " ";
                }
                if (dirforward) {
                    fragtext += spaces + chr.chr;
                }
                else {
                    fragtext = chr.chr + spaces + fragtext;
                }
                if (!chr.basechar.secondary) {
                    fraghadprimary = true;
                }
                triedspaces = 0;
                triedrecol = false;
                dx += (dirforward ? 1 : -1) * chr.basechar.width;
                fragenddx = dx;
                lastcol = col;
            }
        }
        if (lastcol && fraghadprimary) {
            addfrag(dirforward);
        }
    }
    fragments.forEach((f, i) => f.index = i);
    return {
        debugArea: { x: x1, y: y - 9, w: x2 - x1, h: 10 },
        text: fragments.map(f => f.text).join(""),
        fragments
    };
}
/**
 * Reads a line of text that uses a smallcaps font, these fonts can have duplicate chars that only have a different amount of
 * empty space after the char before the next char starts.
 * The coordinates should be near the end of the string, or a rectangle with high 1 containing all points where the string can end.
 */
function readSmallCapsBackwards(buffer, font, cols, x, y, w = -1, h = -1) {
    if (w == -1) {
        w = font.width + font.spacewidth;
        x -= Math.ceil(w / 2);
    }
    if (h == -1) {
        h = 7;
        y -= 1;
    }
    var matchedchar = null;
    var sorted = (cols.length == 1 ? [{ col: cols[0], score: 1 }] : GetChatColorMono(buffer, new _alt1_base__WEBPACK_IMPORTED_MODULE_0__.Rect(x, y - font.basey, w, h), cols));
    //loop until we have a match (max 2 cols)
    for (var a = 0; a < 2 && a < sorted.length && matchedchar == null; a++) {
        for (var cx = x + w - 1; cx >= x; cx--) {
            var best = 1000; //TODO finetune score constants
            var bestchar = null;
            for (var cy = y; cy < y + h; cy++) {
                var chr = readChar(buffer, font, sorted[a].col, cx, cy, true, false);
                if (chr != null && chr.sizescore < best) {
                    best = chr.sizescore;
                    bestchar = chr;
                }
            }
            if (bestchar) {
                matchedchar = bestchar;
                break;
            }
        }
    }
    if (matchedchar == null) {
        return { text: "", debugArea: { x, y, w, h } };
    }
    return readLine(buffer, font, cols, matchedchar.x, matchedchar.y, false, true);
}
/**
 * Reads a single character at the exact given location
 * @param x exact x location of the start of the character domain (includes part of the spacing between characters)
 * @param y exact y location of the baseline pixel of the character
 * @param backwards read in backwards direction, the x location should be the first pixel after the character domain in that case
 */
function readChar(buffer, font, col, x, y, backwards, allowSecondary) {
    y -= font.basey;
    var shiftx = 0;
    var shifty = font.basey;
    var shadow = font.shadow;
    var debugobj = null;
    var debugimg = null;
    if (debug.trackread) {
        var name = x + ";" + y + " " + JSON.stringify(col);
        if (!debugout[name]) {
            debugout[name] = [];
        }
        debugobj = debugout[name];
    }
    //===== make sure the full domain is inside the bitmap/buffer ======
    if (y < 0 || y + font.height >= buffer.height) {
        return null;
    }
    if (!backwards) {
        if (x < 0 || x + font.width > buffer.width) {
            return null;
        }
    }
    else {
        if (x - font.width < 0 || x > buffer.width) {
            return null;
        }
    }
    //====== start reading the char ======
    var scores = [];
    for (var chr = 0; chr < font.chars.length; chr++) {
        var chrobj = font.chars[chr];
        if (chrobj.secondary && !allowSecondary) {
            continue;
        }
        scores[chr] = { score: 0, sizescore: 0, chr: chrobj };
        var chrx = (backwards ? x - chrobj.width : x);
        if (debug.trackread) {
            debugimg = new _alt1_base__WEBPACK_IMPORTED_MODULE_0__.ImageData(font.width, font.height);
        }
        for (var a = 0; a < chrobj.pixels.length;) {
            var i = (chrx + chrobj.pixels[a]) * 4 + (y + chrobj.pixels[a + 1]) * buffer.width * 4;
            var penalty = 0;
            if (!shadow) {
                penalty = canblend(buffer.data[i], buffer.data[i + 1], buffer.data[i + 2], col[0], col[1], col[2], chrobj.pixels[a + 2] / 255);
                a += 3;
            }
            else {
                var lum = chrobj.pixels[a + 3] / 255;
                penalty = canblend(buffer.data[i], buffer.data[i + 1], buffer.data[i + 2], col[0] * lum, col[1] * lum, col[2] * lum, chrobj.pixels[a + 2] / 255);
                a += 4;
            }
            scores[chr].score += Math.max(0, penalty);
            //TODO add compiler flag to this to remove it for performance
            if (debugimg) {
                debugimg.setPixel(chrobj.pixels[a], chrobj.pixels[a + 1], [penalty, penalty, penalty, 255]);
            }
        }
        scores[chr].sizescore = scores[chr].score - chrobj.bonus;
        if (debugobj) {
            debugobj.push({ chr: chrobj.chr, score: scores[chr].sizescore, rawscore: scores[chr].score, img: debugimg });
        }
    }
    scores.sort((a, b) => a.sizescore - b.sizescore);
    if (debug.printcharscores) {
        scores.slice(0, 5).forEach(q => console.log(q.chr.chr, q.score.toFixed(3), q.sizescore.toFixed(3)));
    }
    var winchr = scores[0];
    if (!winchr || winchr.score > 400) {
        return null;
    }
    return { chr: winchr.chr.chr, basechar: winchr.chr, x: x + shiftx, y: y + shifty, score: winchr.score, sizescore: winchr.sizescore };
}
/**
 * Generates a font json description to use in reader functions
 * @param unblended A source image with all characters lined up. The image should be unblended into components using the unblend functions
 * The lowest pixel line of this image is used to mark the location and size of the charecters if the red component is 255 it means there is a character on that pixel column
 * @param chars A string containing all the characters of the image in the same order
 * @param seconds A string with characters that are considered unlikely and should only be detected if no other character is possible.
 * For example the period (.) character matches positive inside many other characters and should be marked as secondary
 * @param bonusses An object that contains bonus scores for certain difficult characters to make the more likely to be red.
 * @param basey The y position of the baseline pixel of the font
 * @param spacewidth the number of pixels a space takes
 * @param treshold minimal color match proportion (0-1) before a pixel is used for the font
 * @param shadow whether this font also uses the black shadow some fonts have. The "unblended" image should be unblended correspondingly
 * @returns a javascript object describing the font which is used as input for the different read functions
 */
function generatefont(unblended, chars, seconds, bonusses, basey, spacewidth, treshold, shadow) {
    //settings vars
    treshold *= 255;
    //initial vars
    var miny = unblended.height - 1;
    var maxy = 0;
    var font = { chars: [], width: 0, spacewidth: spacewidth, shadow: shadow, height: 0, basey: 0 };
    var ds = false;
    var chardata = [];
    //index all chars
    for (var dx = 0; dx < unblended.width; dx++) {
        var i = 4 * dx + 4 * unblended.width * (unblended.height - 1);
        if (unblended.data[i] == 255 && unblended.data[i + 3] == 255) {
            if (ds === false) {
                ds = dx;
            }
        }
        else {
            if (ds !== false) {
                //char found, start detection
                var de = dx;
                var char = chars[chardata.length];
                var chr = {
                    ds: ds,
                    de: de,
                    width: de - ds,
                    chr: char,
                    bonus: (bonusses && bonusses[char]) || 0,
                    secondary: seconds.indexOf(chars[chardata.length]) != -1,
                    pixels: []
                };
                chardata.push(chr);
                font.width = Math.max(font.width, chr.width);
                for (x = 0; x < de - ds; x++) {
                    for (y = 0; y < unblended.height - 1; y++) {
                        var i = (x + ds) * 4 + y * unblended.width * 4;
                        if (unblended.data[i] >= treshold) {
                            miny = Math.min(miny, y);
                            maxy = Math.max(maxy, y);
                        }
                    }
                }
                ds = false;
            }
        }
    }
    font.height = maxy + 1 - miny;
    font.basey = basey - miny;
    //detect all pixels
    for (var a in chardata) {
        var chr = chardata[a];
        for (var x = 0; x < chr.width; x++) {
            for (var y = 0; y < maxy + 1 - miny; y++) {
                var i = (x + chr.ds) * 4 + (y + miny) * unblended.width * 4;
                if (unblended.data[i] >= treshold) {
                    chr.pixels.push(x, y);
                    chr.pixels.push(unblended.data[i]);
                    if (shadow) {
                        chr.pixels.push(unblended.data[i + 1]);
                    }
                    chr.bonus += 5;
                }
            }
        }
        //prevent js from doing the thing with unnecessary output precision
        chr.bonus = +chr.bonus.toFixed(3);
        font.chars.push({ width: chr.width, bonus: chr.bonus, chr: chr.chr, pixels: chr.pixels, secondary: chr.secondary });
    }
    return font;
}


/***/ }),

/***/ "../node_modules/@alt1/ocr/fonts/aa_9px_mono_allcaps.js":
/*!**************************************************************!*\
  !*** ../node_modules/@alt1/ocr/fonts/aa_9px_mono_allcaps.js ***!
  \**************************************************************/
/***/ (function(module) {

!function(s,e){ true?module.exports=e():0
}("undefined"!=typeof self?self:this,(function(){return s=[s=>{s.exports={chars:[{width:3,bonus:55,chr:"!",pixels:[0,4,221,0,5,170,0,6,153,0,12,153,1,3,221,1,4,255,1,5,221,1,6,204,1,7,170,1,8,153,1,12,204],secondary:!1},{width:6,bonus:30,chr:'"',
pixels:[1,2,221,1,3,255,1,4,170,3,2,221,3,3,255,3,4,170],secondary:!0},{width:9,bonus:160,chr:"#",
pixels:[1,5,221,1,8,255,2,5,255,2,7,153,2,8,255,2,9,204,2,10,238,2,11,238,3,2,187,3,3,238,3,4,255,3,5,255,3,6,170,3,7,170,3,8,255,4,5,255,4,8,255,5,4,153,5,5,255,5,6,170,5,7,204,5,8,255,5,9,238,5,10,204,5,11,170,6,2,238,6,3,204,6,4,204,6,5,255,6,8,255,7,5,255,7,8,153],
secondary:!1},{width:7,bonus:145,chr:"$",
pixels:[1,3,204,1,4,255,1,5,187,1,10,153,1,11,204,2,2,187,2,5,221,2,6,255,2,10,170,2,11,255,2,12,221,3,1,153,3,2,238,3,3,221,3,4,238,3,5,204,3,6,238,3,7,255,3,8,153,3,11,221,4,2,221,4,7,255,4,8,221,4,10,187,5,2,170,5,3,187,5,8,221,5,9,255,5,10,153],
secondary:!1},{width:12,bonus:175,chr:"%",
pixels:[1,4,255,1,5,255,1,6,255,2,3,153,2,7,204,3,3,170,3,7,204,3,12,187,4,3,187,4,4,255,4,5,255,4,6,255,4,10,238,4,11,204,5,7,170,5,8,238,5,9,153,6,5,204,6,6,221,6,9,187,6,10,255,6,11,204,7,3,238,7,4,170,7,8,187,7,11,153,7,12,204,8,8,187,8,12,187,9,8,204,9,9,153,9,12,187,10,9,187,10,10,255,10,11,187],
secondary:!1},{width:12,bonus:175,chr:"&",
pixels:[0,9,221,0,10,255,0,11,153,1,5,153,1,8,238,1,9,187,1,10,238,1,11,255,2,4,255,2,5,255,2,6,255,2,7,255,2,11,170,2,12,221,3,3,204,3,7,255,3,8,221,3,12,255,4,3,221,4,8,238,4,9,221,4,12,238,5,3,238,5,9,238,5,10,187,5,12,170,6,4,153,6,10,255,6,11,238,7,10,221,7,11,255,8,8,238,8,9,170,8,12,238,9,12,221],
secondary:!1},{width:3,bonus:15,chr:"'",pixels:[0,2,153,1,2,187,1,3,204],secondary:!0},{width:5,bonus:60,chr:"(",pixels:[0,6,204,0,7,255,0,8,238,0,9,187,1,4,238,1,5,204,1,6,153,1,9,170,1,10,238,1,11,204,2,3,153,2,12,187],secondary:!1},{width:5,
bonus:50,chr:")",pixels:[1,3,204,1,4,153,1,11,221,2,4,153,2,5,255,2,6,255,2,7,255,2,8,255,2,9,255,2,10,204],secondary:!1},{width:5,bonus:40,chr:"*",pixels:[0,3,170,0,5,153,1,2,187,1,3,187,1,4,221,2,4,170,2,5,221,3,3,153],secondary:!0},{width:8,
bonus:65,chr:"+",pixels:[0,8,153,1,8,255,2,8,255,3,5,153,3,6,255,3,7,255,3,8,255,3,9,255,3,10,255,3,11,153,4,8,255,5,8,255,6,8,187],secondary:!1},{width:3,bonus:10,chr:",",pixels:[1,10,187,1,11,221],secondary:!0},{width:6,bonus:20,chr:"-",
pixels:[0,9,204,1,9,255,2,9,255,3,9,204],secondary:!0},{width:3,bonus:10,chr:".",pixels:[1,11,170,1,12,204],secondary:!0},{width:8,bonus:50,chr:"/",pixels:[0,11,187,1,10,238,2,8,221,2,9,153,3,6,170,3,7,204,4,5,238,5,3,221,5,4,170,6,2,153],
secondary:!1},{width:8,bonus:145,chr:"0",
pixels:[0,7,153,0,8,187,0,9,170,1,5,221,1,6,255,1,7,255,1,8,255,1,9,255,1,10,255,1,11,238,2,4,187,2,11,170,2,12,204,3,4,187,3,12,204,4,4,221,4,12,187,5,5,255,5,6,255,5,7,204,5,8,187,5,9,187,5,10,238,5,11,238,6,6,187,6,7,238,6,8,255,6,9,221,6,10,170],
secondary:!1},{width:7,bonus:95,chr:"1",pixels:[1,5,153,2,5,255,2,6,187,2,7,187,2,8,187,2,9,187,2,10,187,2,11,187,2,12,238,3,4,204,3,5,255,3,6,255,3,7,255,3,8,255,3,9,255,3,10,255,3,11,255,3,12,255,4,12,153],secondary:!1},{width:9,bonus:115,chr:"2",
pixels:[1,4,170,1,5,204,1,12,255,2,4,204,2,11,221,2,12,255,3,4,204,3,10,204,3,12,255,4,4,221,4,9,238,4,12,255,5,4,153,5,5,255,5,6,255,5,7,255,5,8,255,5,12,255,6,5,153,6,6,221,6,7,170,6,11,187,6,12,204],secondary:!1},{width:7,bonus:105,chr:"3",
pixels:[0,11,187,0,12,187,1,4,204,1,12,238,2,4,221,2,12,221,3,4,238,3,7,187,3,8,221,3,12,204,4,4,170,4,5,255,4,6,255,4,7,153,4,8,238,4,9,255,4,10,221,4,11,255,5,5,170,5,9,221,5,10,238],secondary:!1},{width:9,bonus:120,chr:"4",
pixels:[1,9,204,1,10,255,2,8,204,2,10,255,3,7,187,3,10,255,4,5,170,4,6,238,4,7,153,4,8,153,4,9,170,4,10,255,4,11,153,4,12,221,5,4,204,5,5,255,5,6,255,5,7,255,5,8,255,5,9,255,5,10,255,5,11,255,5,12,255,6,10,255],secondary:!1},{width:7,bonus:110,
chr:"5",pixels:[0,11,170,0,12,221,1,4,255,1,5,204,1,6,221,1,7,187,1,12,238,2,4,255,2,7,255,2,12,204,3,4,255,3,7,255,3,8,204,3,12,170,4,4,255,4,8,255,4,9,255,4,10,255,4,11,238,5,4,153,5,9,187,5,10,153],secondary:!1},{width:7,bonus:105,chr:"6",
pixels:[0,8,187,0,9,255,0,10,238,1,6,170,1,7,255,1,8,221,1,9,187,1,10,204,1,11,255,2,5,187,2,6,153,2,12,221,3,8,221,3,12,204,4,8,204,4,9,238,4,10,187,4,11,221,5,9,221,5,10,255,5,11,153],secondary:!1},{width:7,bonus:90,chr:"7",
pixels:[0,4,204,0,5,187,1,4,255,1,12,170,2,4,255,2,10,221,2,11,255,2,12,187,3,4,255,3,8,221,3,9,238,3,10,153,4,4,255,4,5,153,4,6,204,4,7,187,5,4,255,5,5,187],secondary:!1},{width:8,bonus:170,chr:"8",
pixels:[0,10,153,1,5,204,1,6,238,1,9,238,1,10,255,1,11,255,2,4,170,2,5,153,2,6,170,2,7,255,2,8,204,2,12,221,3,4,187,3,7,204,3,8,187,3,12,204,4,4,204,4,7,153,4,8,255,4,12,204,5,4,204,5,5,187,5,6,187,5,7,187,5,8,187,5,9,255,5,10,170,5,11,204,5,12,153,6,5,238,6,6,204,6,9,187,6,10,255,6,11,170],
secondary:!1},{width:7,bonus:105,chr:"9",pixels:[0,6,238,0,7,238,0,8,153,1,5,204,1,6,153,1,7,187,1,8,255,2,4,204,2,9,187,3,4,221,3,11,187,4,5,255,4,6,238,4,7,187,4,8,187,4,9,238,4,10,255,5,6,221,5,7,255,5,8,238,5,9,170],secondary:!1},{width:3,
bonus:20,chr:":",pixels:[0,5,170,0,6,204,0,10,204,0,11,170],secondary:!0},{width:3,bonus:25,chr:";",pixels:[0,4,170,0,5,204,0,9,221,0,11,153,1,9,170],secondary:!0},{width:8,bonus:55,chr:"<",
pixels:[1,8,255,1,9,187,2,8,170,2,9,238,3,7,238,4,7,187,4,10,238,5,6,204,5,10,187,6,6,221,6,11,204],secondary:!1},{width:8,bonus:60,chr:"=",pixels:[1,7,255,1,9,255,2,7,255,2,9,255,3,7,255,3,9,255,4,7,255,4,9,255,5,7,255,5,9,255,6,7,255,6,9,255],
secondary:!1},{width:8,bonus:55,chr:">",pixels:[1,6,238,1,11,170,2,6,170,2,10,221,3,7,238,3,10,204,4,7,204,4,9,187,5,8,221,5,9,238,6,8,221],secondary:!1},{width:7,bonus:80,chr:"?",
pixels:[1,3,170,1,4,153,2,3,221,2,9,238,2,12,153,3,3,238,3,7,170,3,8,221,3,12,204,4,3,204,4,4,238,4,5,221,4,6,255,4,7,187,5,4,221,5,5,238],secondary:!1},{width:11,bonus:185,chr:"@",
pixels:[0,7,187,0,8,238,0,9,255,0,10,187,1,5,153,1,6,170,1,11,238,2,12,170,3,7,221,3,8,255,3,9,255,3,10,238,3,12,204,4,3,153,4,6,170,4,12,187,5,3,153,5,5,170,5,8,170,5,9,204,5,12,170,6,3,170,6,5,187,6,6,238,6,7,255,6,8,255,6,9,255,6,10,238,6,12,153,7,3,170,7,10,204,8,4,187,8,9,170,9,5,204,9,6,221,9,7,221,9,8,170],
secondary:!1},{width:10,bonus:125,chr:"A",
pixels:[1,12,238,2,9,187,2,10,238,2,11,170,2,12,187,3,7,221,3,8,204,3,9,238,4,5,238,4,6,238,4,9,221,5,5,187,5,6,255,5,7,255,5,8,187,5,9,238,6,7,153,6,8,255,6,9,255,6,10,238,6,11,153,7,10,221,7,11,255,7,12,255,8,12,221],secondary:!1},{width:8,
bonus:160,chr:"B",
pixels:[1,4,255,1,5,255,1,6,255,1,7,255,1,8,255,1,9,255,1,10,255,1,11,255,1,12,255,2,4,238,2,5,187,2,6,187,2,7,187,2,8,238,2,9,187,2,10,187,2,11,187,2,12,255,3,4,204,3,8,204,3,12,204,4,4,221,4,5,187,4,7,187,4,8,255,4,12,204,5,5,238,5,6,238,5,9,255,5,10,255,5,11,255,6,10,187],
secondary:!1},{width:9,bonus:120,chr:"C",
pixels:[0,7,221,0,8,255,0,9,221,1,5,221,1,6,255,1,7,238,1,8,221,1,9,255,1,10,255,1,11,204,2,5,187,2,11,255,3,4,204,3,12,204,4,4,221,4,12,238,5,4,221,5,12,221,6,4,221,6,12,238,7,4,187,7,5,204,7,11,187,7,12,170],secondary:!1},{width:11,bonus:200,
chr:"D",
pixels:[1,4,255,1,5,255,1,6,255,1,7,255,1,8,255,1,9,255,1,10,255,1,11,255,1,12,255,2,4,255,2,5,187,2,6,187,2,7,187,2,8,187,2,9,187,2,10,187,2,11,204,2,12,255,3,4,221,3,12,238,4,4,238,4,12,221,5,4,238,5,12,221,6,4,204,6,5,153,6,12,187,7,5,255,7,6,153,7,11,238,8,5,204,8,6,255,8,7,255,8,8,255,8,9,255,8,10,255,8,11,170,9,7,204,9,8,221,9,9,187],
secondary:!1},{width:7,bonus:135,chr:"E",
pixels:[1,4,255,1,5,255,1,6,255,1,7,255,1,8,255,1,9,255,1,10,255,1,11,255,1,12,255,2,4,255,2,5,187,2,6,187,2,7,187,2,8,255,2,9,187,2,10,187,2,11,204,2,12,255,3,4,221,3,8,221,3,12,238,4,4,238,4,8,221,4,12,221,5,4,187,5,8,153,5,12,238],secondary:!1},{
width:7,bonus:115,chr:"F",pixels:[1,4,255,1,5,255,1,6,255,1,7,255,1,8,255,1,9,255,1,10,255,1,11,255,1,12,255,2,4,255,2,5,187,2,6,187,2,7,187,2,8,255,2,9,187,2,10,187,2,11,187,2,12,238,3,4,221,3,8,221,4,4,238,4,8,221,5,4,221],secondary:!1},{width:10,
bonus:150,chr:"G",
pixels:[0,7,204,0,8,255,0,9,255,0,10,187,1,5,187,1,6,255,1,7,238,1,8,221,1,9,238,1,10,255,1,11,221,2,5,204,2,11,238,3,4,204,3,12,204,4,4,221,4,12,238,5,4,238,5,12,221,6,4,221,6,9,238,6,10,187,6,11,187,6,12,221,7,4,170,7,5,221,7,9,255,7,10,255,7,11,255,7,12,153],
secondary:!1},{width:11,bonus:200,chr:"H",
pixels:[1,4,255,1,5,255,1,6,255,1,7,255,1,8,255,1,9,255,1,10,255,1,11,255,1,12,255,2,4,238,2,5,187,2,6,187,2,7,187,2,8,255,2,9,187,2,10,187,2,11,187,2,12,238,3,8,221,4,8,221,5,8,221,6,8,221,7,4,255,7,5,255,7,6,255,7,7,255,7,8,255,7,9,255,7,10,255,7,11,255,7,12,255,8,4,238,8,5,187,8,6,187,8,7,187,8,8,187,8,9,187,8,10,187,8,11,187,8,12,238],
secondary:!1},{width:5,bonus:90,chr:"I",pixels:[1,4,255,1,5,255,1,6,255,1,7,255,1,8,255,1,9,255,1,10,255,1,11,255,1,12,255,2,4,238,2,5,187,2,6,187,2,7,187,2,8,187,2,9,187,2,10,187,2,11,187,2,12,238],secondary:!1},{width:6,bonus:100,chr:"J",
pixels:[2,4,255,2,5,255,2,6,255,2,7,255,2,8,255,2,9,255,2,10,255,2,11,255,2,12,255,2,13,255,2,14,187,3,4,238,3,5,187,3,6,187,3,7,187,3,8,187,3,9,187,3,10,187,3,11,187,3,12,187],secondary:!1},{width:10,bonus:170,chr:"K",
pixels:[1,4,255,1,5,255,1,6,255,1,7,255,1,8,255,1,9,255,1,10,255,1,11,255,1,12,255,2,4,238,2,5,187,2,6,187,2,7,187,2,8,255,2,9,204,2,10,187,2,11,187,2,12,238,3,7,170,3,8,255,3,9,221,4,6,204,4,9,238,4,10,238,5,4,153,5,5,238,5,10,238,5,11,238,6,4,255,6,11,238,6,12,187,7,4,153,7,12,255,8,12,153],
secondary:!1},{width:8,bonus:105,chr:"L",pixels:[1,4,255,1,5,255,1,6,255,1,7,255,1,8,255,1,9,255,1,10,255,1,11,255,1,12,255,2,4,238,2,5,187,2,6,187,2,7,187,2,8,187,2,9,187,2,10,187,2,11,204,2,12,255,3,12,238,4,12,221,5,12,255],secondary:!1},{
width:13,bonus:190,chr:"M",
pixels:[1,9,170,1,10,204,1,11,238,1,12,255,2,4,187,2,5,255,2,6,255,2,7,238,2,8,153,2,12,153,3,6,238,3,7,255,3,8,238,4,8,238,4,9,255,4,10,238,5,10,238,5,11,255,5,12,187,6,9,153,6,10,238,7,7,153,7,8,238,8,5,170,8,6,255,8,7,238,9,4,153,9,5,204,9,6,255,9,7,255,9,8,255,9,9,255,9,10,255,9,11,255,9,12,238,10,10,153,10,11,187,10,12,255],
secondary:!1},{width:11,bonus:170,chr:"N",
pixels:[0,12,170,1,4,187,1,5,255,1,6,255,1,7,238,1,8,255,1,9,255,1,10,255,1,11,255,1,12,255,2,5,204,2,6,255,2,12,153,3,6,221,3,7,255,4,7,238,4,8,255,5,8,238,5,9,255,6,9,238,6,10,238,7,4,153,7,10,255,7,11,238,8,4,255,8,5,255,8,6,255,8,7,255,8,8,255,8,9,255,8,10,255,8,11,255,8,12,204,9,4,153],
secondary:!1},{width:10,bonus:160,chr:"O",
pixels:[0,7,221,0,8,255,0,9,221,1,5,204,1,6,255,1,7,221,1,8,221,1,9,255,1,10,255,1,11,221,2,5,170,2,11,238,3,4,221,3,12,221,4,4,221,4,12,221,5,4,238,5,12,204,6,4,153,6,5,238,6,11,170,7,5,238,7,6,255,7,7,255,7,8,221,7,9,238,7,10,255,7,11,187,8,6,153,8,7,238,8,8,255,8,9,204],
secondary:!1},{width:8,bonus:130,chr:"P",
pixels:[1,4,255,1,5,255,1,6,255,1,7,255,1,8,255,1,9,255,1,10,255,1,11,255,1,12,255,2,4,238,2,5,187,2,6,187,2,7,187,2,8,187,2,9,187,2,10,187,2,11,187,2,12,238,3,4,204,4,4,238,5,4,170,5,5,255,5,6,255,5,7,255,5,8,204,6,6,187],secondary:!1},{width:10,
bonus:200,chr:"Q",
pixels:[0,7,221,0,8,255,0,9,221,1,5,187,1,6,255,1,7,238,1,8,221,1,9,255,1,10,255,1,11,221,2,5,170,2,11,238,2,12,153,3,4,221,3,12,221,4,4,221,4,12,238,5,4,238,5,12,204,6,4,153,6,5,238,6,11,153,6,12,238,7,5,221,7,6,255,7,7,255,7,8,221,7,9,238,7,10,255,7,11,170,7,12,204,7,13,221,8,6,153,8,7,238,8,8,255,8,9,221,8,13,255,8,14,170,9,13,170,9,14,255],
secondary:!1},{width:10,bonus:175,chr:"R",
pixels:[1,4,255,1,5,255,1,6,255,1,7,255,1,8,255,1,9,255,1,10,255,1,11,255,1,12,255,2,4,255,2,5,187,2,6,187,2,7,187,2,8,187,2,9,255,2,10,187,2,11,187,2,12,238,3,4,221,3,9,221,4,4,238,4,9,255,4,10,170,5,4,153,5,5,255,5,6,255,5,7,255,5,8,187,5,10,255,5,11,187,6,6,187,6,11,238,6,12,170,7,12,255,8,12,153],
secondary:!1},{width:7,bonus:95,chr:"S",pixels:[0,11,221,0,12,187,1,5,255,1,6,255,1,7,255,1,12,238,2,4,187,2,7,255,2,8,238,2,12,221,3,4,187,3,8,255,3,9,187,3,12,221,4,4,221,4,8,187,4,9,255,4,10,255,4,11,255],secondary:!1},{width:10,bonus:125,chr:"T",
pixels:[0,4,187,1,4,221,2,4,221,3,4,255,3,5,187,3,6,187,3,7,187,3,8,187,3,9,187,3,10,187,3,11,187,3,12,238,4,4,255,4,5,255,4,6,255,4,7,255,4,8,255,4,9,255,4,10,255,4,11,255,4,12,255,5,4,221,5,12,153,6,4,221,7,4,255],secondary:!1},{width:11,bonus:145,
chr:"U",
pixels:[1,4,238,1,5,187,1,6,187,1,7,187,1,8,187,1,9,187,1,10,153,2,4,255,2,5,255,2,6,255,2,7,255,2,8,255,2,9,255,2,10,255,2,11,255,3,11,170,3,12,204,4,12,238,5,12,221,6,12,204,7,4,187,7,11,221,8,4,255,8,5,255,8,6,255,8,7,255,8,8,255,8,9,238,8,10,204],
secondary:!1},{width:11,bonus:120,chr:"V",pixels:[1,4,204,2,4,255,2,5,255,2,6,204,3,4,187,3,5,170,3,6,255,3,7,255,3,8,238,3,9,153,4,8,204,4,9,255,4,10,255,4,11,187,5,10,238,5,11,255,6,8,204,6,9,221,7,4,170,7,5,153,7,6,238,7,7,187,8,4,255,8,5,170],
secondary:!1},{width:14,bonus:200,chr:"W",
pixels:[1,4,255,1,5,221,2,4,238,2,5,255,2,6,255,2,7,255,2,8,221,3,7,153,3,8,221,3,9,255,3,10,255,3,11,221,4,9,153,4,10,255,4,11,204,5,7,170,5,8,238,5,9,153,6,5,238,6,6,255,6,7,153,7,5,187,7,6,255,7,7,255,7,8,204,8,8,238,8,9,255,8,10,238,8,11,153,9,9,153,9,10,255,9,11,255,9,12,170,10,7,170,10,8,238,10,9,187,11,4,238,11,5,255,11,6,187,12,4,170],
secondary:!1},{width:10,bonus:135,chr:"X",
pixels:[1,4,221,1,12,238,2,4,255,2,5,255,2,10,170,2,11,221,2,12,187,3,4,153,3,5,187,3,6,255,3,7,238,3,9,221,4,7,255,4,8,255,4,9,204,5,6,204,5,7,153,5,9,255,5,10,255,5,11,153,6,4,221,6,5,238,6,10,204,6,11,255,6,12,255,7,4,204,7,12,238],secondary:!1},{
width:9,bonus:115,chr:"Y",pixels:[0,5,187,1,5,255,1,6,221,2,5,170,2,6,238,2,7,255,2,8,170,3,8,255,3,9,255,3,10,187,3,11,187,3,12,187,3,13,238,4,9,255,4,10,255,4,11,255,4,12,255,4,13,255,5,7,187,5,8,204,6,5,238,6,6,238,7,5,204],secondary:!1},{width:9,
bonus:145,chr:"Z",
pixels:[1,5,187,1,6,153,1,13,255,2,5,238,2,11,221,2,12,255,2,13,255,3,5,221,3,9,153,3,10,255,3,11,238,3,13,255,4,5,221,4,8,238,4,9,255,4,10,187,4,13,255,5,5,238,5,6,187,5,7,255,5,8,238,5,13,255,6,5,255,6,6,255,6,7,153,6,13,255,7,5,204,7,12,187,7,13,187],
secondary:!1},{width:5,bonus:70,chr:"[",pixels:[1,3,187,1,4,255,1,5,255,1,6,255,1,7,255,1,8,255,1,9,255,1,10,255,1,11,255,1,12,255,1,13,255,1,14,187,2,3,153,2,14,153],secondary:!1},{width:8,bonus:50,chr:"\\",
pixels:[0,4,170,1,5,204,1,6,170,2,7,238,3,8,170,3,9,204,4,10,221,4,11,153,5,12,238,6,13,187],secondary:!1},{width:4,bonus:70,chr:"]",
pixels:[1,3,170,1,14,170,2,3,187,2,4,255,2,5,255,2,6,255,2,7,255,2,8,255,2,9,255,2,10,255,2,11,255,2,12,255,2,13,255,2,14,187],secondary:!1},{width:7,bonus:55,chr:"^",
pixels:[0,9,238,1,6,170,1,7,238,1,8,153,2,4,204,2,5,221,3,4,187,3,5,238,4,7,238,4,8,187,5,9,204],secondary:!1},{width:8,bonus:35,chr:"_",pixels:[0,12,221,1,12,221,2,12,221,3,12,221,4,12,221,5,12,221,6,12,153],secondary:!1},{width:10,bonus:125,
chr:"a",pixels:[1,12,238,2,9,187,2,10,238,2,11,170,2,12,187,3,7,221,3,8,204,3,9,238,4,5,238,4,6,238,4,9,221,5,5,187,5,6,255,5,7,255,5,8,187,5,9,238,6,7,153,6,8,255,6,9,255,6,10,238,6,11,153,7,10,221,7,11,255,7,12,255,8,12,221],secondary:!1},{width:8,
bonus:160,chr:"b",
pixels:[1,4,255,1,5,255,1,6,255,1,7,255,1,8,255,1,9,255,1,10,255,1,11,255,1,12,255,2,4,238,2,5,187,2,6,187,2,7,187,2,8,238,2,9,187,2,10,187,2,11,187,2,12,255,3,4,204,3,8,204,3,12,204,4,4,221,4,5,187,4,7,187,4,8,255,4,12,204,5,5,238,5,6,238,5,9,255,5,10,255,5,11,255,6,10,187],
secondary:!1},{width:9,bonus:120,chr:"c",
pixels:[0,7,221,0,8,255,0,9,221,1,5,221,1,6,255,1,7,238,1,8,221,1,9,255,1,10,255,1,11,204,2,5,187,2,11,255,3,4,204,3,12,204,4,4,221,4,12,238,5,4,221,5,12,221,6,4,221,6,12,238,7,4,187,7,5,204,7,11,187,7,12,170],secondary:!1},{width:11,bonus:200,
chr:"d",
pixels:[1,4,255,1,5,255,1,6,255,1,7,255,1,8,255,1,9,255,1,10,255,1,11,255,1,12,255,2,4,255,2,5,187,2,6,187,2,7,187,2,8,187,2,9,187,2,10,187,2,11,204,2,12,255,3,4,221,3,12,238,4,4,238,4,12,221,5,4,238,5,12,221,6,4,204,6,5,153,6,12,187,7,5,255,7,6,153,7,11,238,8,5,204,8,6,255,8,7,255,8,8,255,8,9,255,8,10,255,8,11,170,9,7,204,9,8,221,9,9,187],
secondary:!1},{width:7,bonus:135,chr:"e",
pixels:[1,4,255,1,5,255,1,6,255,1,7,255,1,8,255,1,9,255,1,10,255,1,11,255,1,12,255,2,4,255,2,5,187,2,6,187,2,7,187,2,8,255,2,9,187,2,10,187,2,11,204,2,12,255,3,4,221,3,8,221,3,12,238,4,4,238,4,8,221,4,12,221,5,4,187,5,8,153,5,12,238],secondary:!1},{
width:7,bonus:115,chr:"f",pixels:[1,4,255,1,5,255,1,6,255,1,7,255,1,8,255,1,9,255,1,10,255,1,11,255,1,12,255,2,4,255,2,5,187,2,6,187,2,7,187,2,8,255,2,9,187,2,10,187,2,11,187,2,12,238,3,4,221,3,8,221,4,4,238,4,8,221,5,4,221],secondary:!1},{width:10,
bonus:150,chr:"g",
pixels:[0,7,204,0,8,255,0,9,255,0,10,187,1,5,187,1,6,255,1,7,238,1,8,221,1,9,238,1,10,255,1,11,221,2,5,204,2,11,238,3,4,204,3,12,204,4,4,221,4,12,238,5,4,238,5,12,221,6,4,221,6,9,238,6,10,187,6,11,187,6,12,221,7,4,170,7,5,221,7,9,255,7,10,255,7,11,255,7,12,153],
secondary:!1},{width:11,bonus:200,chr:"h",
pixels:[1,4,255,1,5,255,1,6,255,1,7,255,1,8,255,1,9,255,1,10,255,1,11,255,1,12,255,2,4,238,2,5,187,2,6,187,2,7,187,2,8,255,2,9,187,2,10,187,2,11,187,2,12,238,3,8,221,4,8,221,5,8,221,6,8,221,7,4,255,7,5,255,7,6,255,7,7,255,7,8,255,7,9,255,7,10,255,7,11,255,7,12,255,8,4,238,8,5,187,8,6,187,8,7,187,8,8,187,8,9,187,8,10,187,8,11,187,8,12,238],
secondary:!1},{width:5,bonus:90,chr:"i",pixels:[1,5,255,1,6,255,1,7,255,1,8,255,1,9,255,1,10,255,1,11,255,1,12,255,1,13,255,2,5,238,2,6,187,2,7,187,2,8,187,2,9,187,2,10,187,2,11,187,2,12,187,2,13,238],secondary:!1},{width:6,bonus:100,chr:"j",
pixels:[2,4,255,2,5,255,2,6,255,2,7,255,2,8,255,2,9,255,2,10,255,2,11,255,2,12,255,2,13,255,2,14,187,3,4,238,3,5,187,3,6,187,3,7,187,3,8,187,3,9,187,3,10,187,3,11,187,3,12,187],secondary:!1},{width:10,bonus:170,chr:"k",
pixels:[1,4,255,1,5,255,1,6,255,1,7,255,1,8,255,1,9,255,1,10,255,1,11,255,1,12,255,2,4,238,2,5,187,2,6,187,2,7,187,2,8,255,2,9,204,2,10,187,2,11,187,2,12,238,3,7,170,3,8,255,3,9,221,4,6,204,4,9,238,4,10,238,5,4,153,5,5,238,5,10,238,5,11,238,6,4,255,6,11,238,6,12,187,7,4,153,7,12,255,8,12,153],
secondary:!1},{width:8,bonus:105,chr:"l",pixels:[1,4,255,1,5,255,1,6,255,1,7,255,1,8,255,1,9,255,1,10,255,1,11,255,1,12,255,2,4,238,2,5,187,2,6,187,2,7,187,2,8,187,2,9,187,2,10,187,2,11,204,2,12,255,3,12,238,4,12,221,5,12,255],secondary:!1},{
width:13,bonus:190,chr:"m",
pixels:[1,9,170,1,10,204,1,11,238,1,12,255,2,4,187,2,5,255,2,6,255,2,7,238,2,8,153,2,12,153,3,6,238,3,7,255,3,8,238,4,8,238,4,9,255,4,10,238,5,10,238,5,11,255,5,12,187,6,9,153,6,10,238,7,7,153,7,8,238,8,5,170,8,6,255,8,7,238,9,4,153,9,5,204,9,6,255,9,7,255,9,8,255,9,9,255,9,10,255,9,11,255,9,12,238,10,10,153,10,11,187,10,12,255],
secondary:!1},{width:11,bonus:170,chr:"n",
pixels:[0,12,170,1,4,187,1,5,255,1,6,255,1,7,238,1,8,255,1,9,255,1,10,255,1,11,255,1,12,255,2,5,204,2,6,255,2,12,153,3,6,221,3,7,255,4,7,238,4,8,255,5,8,238,5,9,255,6,9,238,6,10,238,7,4,153,7,10,255,7,11,238,8,4,255,8,5,255,8,6,255,8,7,255,8,8,255,8,9,255,8,10,255,8,11,255,8,12,204,9,4,153],
secondary:!1},{width:10,bonus:160,chr:"o",
pixels:[0,7,221,0,8,255,0,9,221,1,5,204,1,6,255,1,7,221,1,8,221,1,9,255,1,10,255,1,11,221,2,5,170,2,11,238,3,4,221,3,12,221,4,4,221,4,12,221,5,4,238,5,12,204,6,4,153,6,5,238,6,11,170,7,5,238,7,6,255,7,7,255,7,8,221,7,9,238,7,10,255,7,11,187,8,6,153,8,7,238,8,8,255,8,9,204],
secondary:!1},{width:8,bonus:130,chr:"p",
pixels:[1,4,255,1,5,255,1,6,255,1,7,255,1,8,255,1,9,255,1,10,255,1,11,255,1,12,255,2,4,238,2,5,187,2,6,187,2,7,187,2,8,187,2,9,187,2,10,187,2,11,187,2,12,238,3,4,204,4,4,238,5,4,170,5,5,255,5,6,255,5,7,255,5,8,204,6,6,187],secondary:!1},{width:10,
bonus:200,chr:"q",
pixels:[0,7,221,0,8,255,0,9,221,1,5,187,1,6,255,1,7,238,1,8,221,1,9,255,1,10,255,1,11,221,2,5,170,2,11,238,2,12,153,3,4,221,3,12,221,4,4,221,4,12,238,5,4,238,5,12,204,6,4,153,6,5,238,6,11,153,6,12,238,7,5,221,7,6,255,7,7,255,7,8,221,7,9,238,7,10,255,7,11,170,7,12,204,7,13,221,8,6,153,8,7,238,8,8,255,8,9,221,8,13,255,8,14,170,9,13,170,9,14,255],
secondary:!1},{width:10,bonus:175,chr:"r",
pixels:[1,4,255,1,5,255,1,6,255,1,7,255,1,8,255,1,9,255,1,10,255,1,11,255,1,12,255,2,4,255,2,5,187,2,6,187,2,7,187,2,8,187,2,9,255,2,10,187,2,11,187,2,12,238,3,4,221,3,9,221,4,4,238,4,9,255,4,10,170,5,4,153,5,5,255,5,6,255,5,7,255,5,8,187,5,10,255,5,11,187,6,6,187,6,11,238,6,12,170,7,12,255,8,12,153],
secondary:!1},{width:7,bonus:95,chr:"s",pixels:[0,11,221,0,12,187,1,5,255,1,6,255,1,7,255,1,12,238,2,4,187,2,7,255,2,8,238,2,12,221,3,4,187,3,8,255,3,9,187,3,12,221,4,4,221,4,8,187,4,9,255,4,10,255,4,11,255],secondary:!1},{width:10,bonus:125,chr:"t",
pixels:[0,4,187,1,4,221,2,4,221,3,4,255,3,5,187,3,6,187,3,7,187,3,8,187,3,9,187,3,10,187,3,11,187,3,12,238,4,4,255,4,5,255,4,6,255,4,7,255,4,8,255,4,9,255,4,10,255,4,11,255,4,12,255,5,4,221,5,12,153,6,4,221,7,4,255],secondary:!1},{width:11,bonus:145,
chr:"u",
pixels:[1,4,238,1,5,187,1,6,187,1,7,187,1,8,187,1,9,187,1,10,153,2,4,255,2,5,255,2,6,255,2,7,255,2,8,255,2,9,255,2,10,255,2,11,255,3,11,170,3,12,204,4,12,238,5,12,221,6,12,204,7,4,187,7,11,221,8,4,255,8,5,255,8,6,255,8,7,255,8,8,255,8,9,238,8,10,204],
secondary:!1},{width:11,bonus:120,chr:"v",pixels:[1,4,204,2,4,255,2,5,255,2,6,204,3,4,187,3,5,170,3,6,255,3,7,255,3,8,238,3,9,153,4,8,204,4,9,255,4,10,255,4,11,187,5,10,238,5,11,255,6,8,204,6,9,221,7,4,170,7,5,153,7,6,238,7,7,187,8,4,255,8,5,170],
secondary:!1},{width:14,bonus:200,chr:"w",
pixels:[1,4,255,1,5,221,2,4,238,2,5,255,2,6,255,2,7,255,2,8,221,3,7,153,3,8,221,3,9,255,3,10,255,3,11,221,4,9,153,4,10,255,4,11,204,5,7,170,5,8,238,5,9,153,6,5,238,6,6,255,6,7,153,7,5,187,7,6,255,7,7,255,7,8,204,8,8,238,8,9,255,8,10,238,8,11,153,9,9,153,9,10,255,9,11,255,9,12,170,10,7,170,10,8,238,10,9,187,11,4,238,11,5,255,11,6,187,12,4,170],
secondary:!1},{width:10,bonus:135,chr:"x",
pixels:[1,4,221,1,12,238,2,4,255,2,5,255,2,10,170,2,11,221,2,12,187,3,4,153,3,5,187,3,6,255,3,7,238,3,9,221,4,7,255,4,8,255,4,9,204,5,6,204,5,7,153,5,9,255,5,10,255,5,11,153,6,4,221,6,5,238,6,10,204,6,11,255,6,12,255,7,4,204,7,12,238],secondary:!1},{
width:9,bonus:115,chr:"y",pixels:[0,4,187,1,4,255,1,5,221,2,4,170,2,5,238,2,6,255,2,7,170,3,7,255,3,8,255,3,9,187,3,10,187,3,11,187,3,12,238,4,8,255,4,9,255,4,10,255,4,11,255,4,12,255,5,6,187,5,7,204,6,4,238,6,5,238,7,4,204],secondary:!1},{width:9,
bonus:145,chr:"z",
pixels:[1,4,187,1,5,153,1,12,255,2,4,238,2,10,221,2,11,255,2,12,255,3,4,221,3,8,153,3,9,255,3,10,238,3,12,255,4,4,221,4,7,238,4,8,255,4,9,187,4,12,255,5,4,238,5,5,187,5,6,255,5,7,238,5,12,255,6,4,255,6,5,255,6,6,153,6,12,255,7,4,204,7,11,187,7,12,187],
secondary:!1},{width:5,bonus:55,chr:"{",pixels:[1,8,204,2,4,255,2,5,255,2,6,255,2,7,187,2,9,238,2,10,255,2,11,255,2,12,255,2,13,187,3,3,170],secondary:!1},{width:3,bonus:65,chr:"|",
pixels:[1,0,255,1,1,255,1,2,255,1,3,255,1,4,255,1,5,255,1,6,255,1,7,255,1,8,255,1,9,255,1,10,255,1,11,255,1,12,255],secondary:!0},{width:6,bonus:55,chr:"}",
pixels:[1,3,170,2,4,255,2,5,255,2,6,255,2,7,187,2,9,238,2,10,255,2,11,255,2,12,255,2,13,187,3,8,204],secondary:!1},{width:7,bonus:35,chr:"~",pixels:[0,9,255,1,8,255,2,8,187,3,9,238,4,10,255,5,8,255,5,9,221],secondary:!1}],width:14,spacewidth:5,
shadow:!1,height:15,basey:12}}],e={},function o(r){var n=e[r];if(void 0!==n)return n.exports;var i=e[r]={exports:{}};return s[r](i,i.exports,o),i.exports}(0);var s,e}));

/***/ }),

/***/ "../node_modules/file-loader/dist/cjs.js?name=[name].[ext]!./appconfig.json":
/*!**********************************************************************************!*\
  !*** ../node_modules/file-loader/dist/cjs.js?name=[name].[ext]!./appconfig.json ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "appconfig.json");

/***/ }),

/***/ "../node_modules/file-loader/dist/cjs.js?name=[name].[ext]!./index.html":
/*!******************************************************************************!*\
  !*** ../node_modules/file-loader/dist/cjs.js?name=[name].[ext]!./index.html ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "index.html");

/***/ }),

/***/ "./JSONs/ItemsAndImagesCrystal.json":
/*!******************************************!*\
  !*** ./JSONs/ItemsAndImagesCrystal.json ***!
  \******************************************/
/***/ ((module) => {

module.exports = {"taverley":[{"name":"Blank","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAM0lEQVRYR+3QMQ0AAAjAMHgxwY1/gSCDp1OwNKtn47E0QIAAAQIECBAgQIAAAQIECHwLHNXiKkGmss7lAAAAAElFTkSuQmCC"},{"name":"Coins","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAHyElEQVRIDbXBW2wcVx3A4d//2GXFWJq1kDa8II1Fod4RAvrCC0ig5qFC8FCppMJW35BAICQKSDxUsrk5atVCKbe2VI3Skoas7cRNmwCRQnqLaKo0JKQh9uw4vszEt715ffYyZ3fsxAdqNUoq6ANIfJ84ns//kzieDyRR0DfgA0kUcEPfgA+YOASs3RZR7HC8QXYkUdA34LPDxCE7rN0WUY43yA5xPD+JAkBEHC+fRIGIcJMUxtyhET2+t39oRI/v7R8e1aAcbzCJgr4BP4mCvgHfxGFhzAWGRvT43v6hES2iHG8QEMfzgSQKRMTx8kkUiIjj5QETh28fdD91vx7f2z882iiMZYdGtAigrN3uG/BNXHS8fBIFl/7QP7PI0Ige39s/PNoojGWHRrSIOF5eHM8HkigQEcfLJ1HAjr4B38Th5YL7iSEtImf3Z+tNvviAFhEQa7dFxPHyQBIFIjJ7OPvxPVpECmPZ6QU9th8Rcby8OJ4PJFEgIo6XB0xcBKy1Iqo46Q7ep0XkzX3ZepMvfU+LCIi12yLieHkgiQIRmZvadfu9ZRE5+OPspXn9yAFExPHy4ng+kESBiDhenhuSKBCRcDJ7x31aRN54Jlvd4J4faBEBrLUi4nh5IIkCEZmb2nX7vWURee6H2UtX9GOHEBHHy4vj+UASBSLiePkkCvoGfCCJAhEJJ7O9PZmP3lt+/Xf9X/im/vX3+x94vAECWLvdN+AnUSCiwIaT2evb+F/V+0f7vzamRRRYx8uL4/lJFLCjb8AHkigA+gZ8ExfDyWxvT6bVST99vx7f2z882iiMZdkxPNq0drtvwDdxcWY8K8L1bVYq3P0d/e09PDklII43KI7nAyYussPx8oCJi7xDZg+7PT2ZRiutae5+oFEYy3LDG2/r3x5RYEFmxl1g6xpr6yyV+fpDDbCgwIrj+YCJQ25wvEHAxGEw4fb00Ksy6820uoE/kNncSrubbF6jGPH6Bb3vmAILMjPuYtmGUo2lCtGa/v1xorICK47nmzgsjLncMDzadLxBE4fBhNvbg5CpNdLqBp/8WCbdTLubJF1mFjl9UR/4kwILMlNwLYhQrrNUYbnMybP6tQsKrIAqjLm81/BoEyhOur09mevX01qD6gZ33pEx3dR0STrMLHL6oi6cVGAdL2/icLrgilDTrNRYLnM20EdOKbACKn4xl26l6RaX5/lghjP/0I8+r4DipNvbk9ncSmuaygaf8TOtTto2tA1zy7w9q586qsA6Xt7E4XTBFWGjxVqNlSqXF/QzLyqwAurqS7l0K+2kmC7RGmen9eMFBQST7m09mXQzrWnKG3z2k5l2J20bmobVKtPz+uEDCqzj5U0cThdcEZoJ5TqrVeaW9WOHFFgBtXQs1+6k7Q6mQ1zm8rx+9TznZlQw4d7Wk+lupTVNZYO1Gl/+XKZt0qahpgljzlzSx/+qHG/QxOF0wRXBdClvsFbjaln/dJ8CKyAgc1O5tkmbCVXN3DLni3rylAom3N4e0i1qmsoGazXu+XymZdK2oZFwZYkLoX72uAILMjPuipBuUqmzuk68pn/0jAIrjuebOLz6Uq5l0pahmbC4xsy8/tWkCibcHkW6xXqDSp3VGl+5K9PupG1D07BU4tK8/sUhBRYkmHARuinlOqtV4pL+yT4FVhzPB0wczh5x24ZmQmmd2av6zcucOKNmD7vpFrUGlTprNe7bnWl30qRDy1De4O9F/fABBRakOOkKJB3KG6xUiVf12LMKrDieD5g4nJ/KJd203WGjRbDAy+f1iTNqbirX3UzXNRXNapU9uzNJJ213aBtKdc4X9SMHFFiQcNIFWoZynZUa0ap+6DkFVhzPB0wcLryQSzppu4NuMz3Pybf0ybNqbiq3uZXWGlTrLFfZszuTdNJ2h7ahVOdvgX70eQUWZPawu21pJZTqrFRYXNOPHFBgxfF8wMTh4tFcu5O2DI02l+f5yC5u9YHbWKmyZ3embdJ2h1ZCqc65QP/8oAILcuVI7tr1tJlQXmelysKq/tlBBVYczwdMHC68kEu6acvQSNBNbvXyOb3vmAKuHsuZbpp0aBtW1znyip56RYEFmZvKbW6lzYTSOisVFlb1Y4cUWHE838Th1ZdySZqaDkmHlSp33sHFWf5l14corXPstJ44pYCFo7mkkyYdGm3OzTDydBMs75D5qVx3M20klNZZrrCwqn9ZUGAF1Oofc+1O2jS0EhptTr2lvzv84d4eNlpppc7aOhOn9IkzauV4LummzYRGm4rmz2/o508osI6XN3E4N5XrpmkjoVRjucrcsv7NpAIrICC8V/Ri7tp1Nlpppc5SmfG/6NcuqIWjuWaSNlpstAgiHnyyyTus4+VNHF454nZTGglr6yyXmVvWTxxRYMXxfMDERW6SxaO5za203qS0ztUSU6/q0xcV71UYc4Hh0SY7Zg+7nZRGm1KdpTKzV/XTRxVYcTyff2PicLrg1pusVFlc48EnmmB5lxTGXN5reLQJXDzo6haldZbKBLHef0yBFcfz+U9MHHKTdbw8O0wczr+Qe2s65RbDo02wIK8+5d71rSbvso6XF8fzeR8mLrLD8fLcwsRhcdJNNynXidb4xsNNsI6XB0wcgmWH4+UBcTyf/56JQ26yjpfnfYjj+fxPTFxkh+PleX//BOtbkJqat4vkAAAAAElFTkSuQmCC"},{"name":"Coins","base64":"data:image/png;base64,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"},{"name":"Uncut dragonstone","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAEAElEQVRIDbXBz24bVRTA4d+54yjohj+zYX2zy9wH4A0QUh+hIRV9C9LmZdiyrVpZiC5YIEtVJbbO7DxCApqmyXVqj5PxzDnEVi1spYUgNd8nPkTukvgQp6MhKzu7kY9KfIjT0VBEWPGh4OMRH+J0NBQRHwrugPgQp6MhSzu7kf9SV6UPe9ya+BCBujoGzGxnN7Kmrko2fcXXL3kO+LDHLYgPkZXpaCgiPhR1VbL0Dd/yDwNR7IwT4Dees+TDHh8mPsTpaLizG4HpaCgiIA/yozY15Nmb9LtiSgc4xJEBSjfmTYdlCPCSnwEf9ngf8SEC09EQ2NmNdXUMcpAfKZ0lk1wysldppHTgAKVzZA5pmCk2owYFe8lzH/a4QXyILNXVMeBDUVflg/wI6OgsWS/vASmdXFEDiikd0NKAOK5l4H7hRzAfCjaJD5FNdVUe5I8FMbRL816+beg4nSo651IxUKClYcGxIA2TAX0f9tgkPkTW1FW5nx86nCCGzVOzlW+dpxMWDGTODARouGJBwGZMMxjQB/OhYI34EFlTV+V+fmjJJBeHm6fGIRecAUrXoRluTuOQhisWZMZEUQcv+AnMh4I14kNkTV2V+/kjMMDhFAXG6YQFcThFgStmLQ3INj7xFwsOeEHfhz3WiA+RNXVVPsiPDAUUc4jgUjoRnKGKOURRsClpm88SJ6xkMKAP5kPBivgQWVNX5UH+WFHAUid51qX5hKR0PbZYUkxpr5gBl0xY6lDgBX0wHwpWxIfImroq9/NDw0AEMrI2tRe8ntNmOIdzZErnyM559QVfnvMHON7RAX0wHwpWxIfIproq7+eHpA6c5A4MGKfXYCxIS/uW80/5bIvtKRcNU3As6IA+mA8FK+JDZFNdlfv5I8NIBh1kWe7G6QxQWrAxp57Pwbb4ZMbkkgnv6IA+mA8FK+JDZFNdlQf5IxBFLXWKZXlvks4Bo7tipljGlmEtV4CiDRMW3IBnYD4UrIgPkRvqqrzP95K7DNekS4eb8tYhNRdKp5hDHL2GOSgY6IxZhhvwDMyHghXxIXJDXZX7+SHgcF1qIANeMeqRKSgKBqI0kPGOa5gOeArmQ8GK+BC5oa7K/fzQIR0mcJ7+dGSAoh0tGEstrXJNHc4hNZMBT8F8KFgRHyI31FV5Pz/MkC61b3gFCBgdZICAQxR7y5nDAco1HfAEHJgPBSviQ+R96qoE7vEQzNEDAQNR1LEw5hREMegcGfArT8B8KFgjPkQ+oK6OQVi6x3cKjmvicGNOlWsKDhjwhAXzoWCT+BD5V3V1zIKwdI+HQJ8f2GCADwU3iA+R26mrYxaEBWONDwUfID5E/qe6Ovah4HbEh8hdEh8id0l8iNylvwGSpe1wgIp9hQAAAABJRU5ErkJggg=="},{"name":"Uncut dragonstone","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAD2klEQVRIDbXBQW4TVxjA8f/3ZpyUR1uN1AO8pecdoFdohXoCKGZBz1BVNA1H6b67NgpCCKkrZKnKBTKLLmYBEQk442A/e+yZ95WxZMmWSRUW+f3EOs9tEus8t0ms89wmsc5zm8Q6z+cIZWFdnxsT6zzXC2XBtm/5/oQXgHV9bkCs8+wIZcHKd/wopIDSRNSQApecASe8ZMW6PtcT6zzbQlkMskOITdW85wxiJEZiSgoIyZL6A5cQWTnhJWBdn08R6zzbQlk8yp4qaNVIZgTzpvrX8JEAkWhIgTkTA1OmrJzwwro+O8Q6z7ZQFoPsUDBKVKIhUbSqzmsmIBGNtKANS0MCGBLQv/kD1LqcbWKdZ1soi0fZU0VBm6pJsz2I4+qiJS6poY3Q0Bg6kRYEzILpkGPr+mwT6zwbQlnc55c06wkGWFazNLszqt6AgCakgSuDAbMgGJIIBuZMIBlyBGpdzgaxzrMhlMUgO1AQOk21ENIPjIBI09CkpDXzhLRmDtGQTBlHInDCC1DrcjaIdZ4NoSwG2SFIWy32si/qai6ZjKtzwGCERNFIWxOASLvP3TFvgZaYYIY8s67PBrHOsyGUxSA7hAi0xJQecFW9A1paVgRamhmTfe6MeJtgQOjokGeg1uWsiXWeDaEsBtlvgKJt1URaRaeMQRN6BhOJBlmymDExSCDQaVkZ8gzUupw1sc6zIZTFg+wJFSYTQ89ARN9XrxualBTosb9k0WNvxNlXfHPJGZ0EWpAhx6DW5ayJdZ5toSweZE+0UiDNEkVBLqtziGAMpqEeM/qSr3vsT7laEEBAQYYcg1qXsybWebaFsniYHQDLqjYkadYDxtU7QGkjOubiLpmi++zPmAYmEIGW9h+eg1qXsybWebaFshhkByAJSV3V0CbZ3lX13iAtsWYKmtCLaEsNRHTOlI4ZcgRqXc6aWOfZEcriYXYgfCRNVQtpYAwyY6I0kRaShHTJPPJRhHbGLKE35AjUupw1sc6zI5TFw+xXECFpqplkqVbNBa8NBjSirDQsAYMBDElgMuQI1LqcNbHOsyOUxSA7VCIgyKg6oyOgDY2iEMFEmkhLRwxJYDzkGNS6nDWxzrMjlMV9fk6zPUUvqtcpaaSNKGuGBOIHRiBgoI0w5E8woNblrIl1nk8JZQH8wE8RTelBBBNpQenImHND2tAAhs4rjkCty9kg1nmuEcpTEFbu8RgwCB0Zcw4SUcAgr/iLjlqXs02s8/yvUJ7SEVbu8Rh4zu9sUcC6nB1inedmQnlKR+goG6zLuYZY5/lMoTy1LudmxDrPbRLrPLdJrPPcpv8AlbfQcFv3wScAAAAASUVORK5CYII="},{"name":"Uncut dragonstone","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAEG0lEQVRIDbXBQWobVxjA8f/3ZmQ3z20Z6AGed553gF6hJfQESaMs0jOUkrrOUbrvrjUOIQS6CoLiA8izKGgWiYmd2CNH82RZM+9rRiCQcNKmEP9+Yp3nJol1vh4NWdra9nxSYp2vR0MRYcm6nE9HrPP1aCgi1uXcALHO16MhC1vbnv8SysK6HT6aWOeBUB4Bqrq17VkRyoJ1X/PtIU8B63b4CGKdZ6keDUXEujyUBQvf8L2QAkoTUUMKnHMMHPKMBet2+DCxztej4da2B+rRUERA+tkexKZq3nAMMRIjMSUFhGTO7C3nEFk45Blg3Q7vI9Z5oB4Nga1tH8ojkPvZIwWtGsmMYF5WfxveESASDSlwycRATc3CIU+t2+Easc6zEMojwLo8lEU/2xOMEpVoSBStqpMZE5CIRlrQhrkhAQwJ6J/8BmpdzjqxzrMulMX97JGioE3VpNkGxHF12hLnzKCN0NAYOpEWBMwV9YAD63ZYJ9Z5VoSyuMNPadYTDDCvpml266x6CQKakAYuDAbMFcGQRDBwyQSSAfug1uWsEOs8K0JZ9LNdBaHTVFdC+pYzINI0NCnpjMuEdMYlRENSM45E4JCnoNblrBDrPCtCWfSzPZC2utrIPptVl5LJuDoBDEZIFI20MwIQaTfZGvMKaIkJZsBj63ZYIdZ5VoSy6Gd7EIGWmNIDLqrXQEvLgkBLM2Wyya0zXiUYEDo64DGodTlLYp1nRSiLfvYLoGhbNZFW0ZoxaELPYCLRIHOupkwMEgh0WhYGPAa1LmdJrPOsCGVxN3tIhcnE0DMQ0TfVi4YmJQV6bM656rFxxvEXfHXOMZ0EWpABB6DW5SyJdZ51oSzuZg+1UiDNEkVBzqsTiGAMpmE25uxzvuyxWXNxRQABBRlwAGpdzpJY51kXyuJetgvMq5khSbMeMK5eA0ob0TGnW2SKbrI5pQ5MIAIt7V88AbUuZ0ms86wLZdHPdkESklk1gzbJNi6qNwZpiTNq0IReRFtmQEQvqemYAfug1uUsiXWea0JZ3Mt2hXekqWZCGhiDTJkoTaSFJCGdcxl5J0I7ZZrQG7APal3OkljnuSaUxb3sZxAhaaqpZKlWzSkvDAY0oiw0zAGDAQxJYDJgH9S6nCWxznNNKIt+tqdEQJCz6piOgDY0ikIEE2kiLR0xJIHxgANQ63KWxDrPNaEs7vBjmm0oelq9SEkjbURZMiQQ33IGAgbaCAN+BwNqXc6SWOd5n1AWwHf8ENGUHkQwkRaUjow5MaQNDWDoPGcf1LqcFWKd5wNCeQTCwm0eAAahI2NOQCIKGOQ5f9BR63LWiXWefxXKIzrCwm0eAE/4lTUKWJdzjVjn+TihPKIjdJQV1uV8gFjn+Z9CeWRdzscR6zw3Sazz3CSxznOT/gGife5wow5uhgAAAABJRU5ErkJggg=="},{"name":"Uncut dragonstone","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAD0klEQVRIDbXB3Woc1wEA4O+cmZXKMaQLfYBzqZ0n6CPkwm9QYuPglwh1ojxJ73vZGJli6FUwAr+BF3oz4CaOY9kjSx797M45RS4LWhQX50LfF1Lu3KaQcuc2hZQ7tymk3LlNIeXO7zH2y5T3fLaQcufTxn5p2599+dxTpLznM4SUOzeM/dJHX/oqaqKwsqYGTRTeeoXnnvoo5T2fFlLubBv75YP5flGL1dHwc1GriRq0iMJkdewdpShRfO4pUt7zW0LKnW1jv/x6/n1VJ1OjCcJ/hn8jaFBNQRs5c0I888GV8tzTlPfcEFLubBv75YP5fhCrUpRGW5VheH3mlFhN1KKsXUYzSmtWlH/5OzXlhW0h5c62sV9+Pf++qpisGjMMw+uiXjivJmqxJlDXShRx7sOhg5T3bAspd64Z++VX829as6DBhfNdu0fDT8SqNNrR+6CJwpmx1RQ1CqOTqHnmMTXlhWtCyp1rxn55f/4dlYC1VSOeDEeFyZopai6cN9qV86JEzeh4UojP/ZOa8sI1IeXONWO/fDDfx2Q9s3vpPIhvh1dotFGkTMqFEcW0K73ziyuFeOhJynuuCSl3rhn75YP5flFRldYMw/Aa1USgEibrMye77rzziysNBYcOqCkvbISUO9eM/fL+/LsoFKVYTybq6XBclJmdIFSVMLk8cxrF0SmK4qNDB9SUFzZCyp1rxn55b/5XAlo7rtQ3w8u1VWuG1s7aqjV759UX/vTGz4iaYsKhA2rKCxsh5c62sV/emz+qCqKmqkEYhl+rddBGYeXy2NEdf9yx88HJuQ9ECg4dUFNe2Agpd7aN/fLe/BHWLhtNawfD8CuKQhm8ueMLzPzh3OnopPif6dATasoLGyHlzraxX96ffxvFoFk5L2qrfT+8daWcGatpZpeycomijE6jiGceU1Ne2Agpd24Y++X9+beEKFy6aDSnw3EUR+8nayqhMVs5pxaK6dJZ1DzzmJrywkZIuXPD2C/vzR8RWs2F80Y7Wb8ZXgZNNdlYuyRGAVEcnT7zmJrywkZIuXPD2C8fzPcnE4J4NPwUhSBMSrFGUQnVupgQRcKp40MH1JQXNkLKnRvGfvmX+TetWVXeDC+jlkpBUaNAQz1xRHSlFPWZfxCpKS9shJQ7v2Xsl7jrIWbaQqRQTQjC4HXUrK0RBfzoB2rKC9eElDufMPYvCD6666GNKB57TSwmQuRHP7hSU17YFlLu/F9j/8KV4KO7HuKJv9lSkfLCDSHlzucZ+xeuBFeqa1Je+ISQcud3GvsXKS98npBy5zaFlDu3KaTcuU3/BVTgy3Cb6OGvAAAAAElFTkSuQmCC"},{"name":"Uncut diamond","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAFD0lEQVRIDbXBzW8bxxkH4N87u7Okh05yiZFLg9FNO39XgfZaoEDRc9oIkFsnUuzYTQxfW7SObVVtgRYIUkPIKYfcCnKtyuLIsiJFpkR9cCju7rxvRQEESCgOXMB+HjLW4U0iYx2AQbcNoDXn8LqRsW7QbbfmXPAdEWnNObxWZKwDEHzH2HzQbRORsTleHzLWARh02wBacy74jrE5Xi74wth5vDIy1uFC8B0Rac05TAm+wKxf/OynS5/fA2DsPF4BGeswMei2icjYPPgCF5YXPkhVSoSyqmuuszQjRf/deApg+e49XDB2Hi9HxrpBt92acwAG3TYRAbT2txWueVSNnmw8ZeGqroU5yzKAEkXDs7Pn3+0KM0MUaPnuPQDGzuOHkLEOwKDbBtCac8F3APr6H6tSc1VXaZqqNPnm228BShIFUFWXmc6IqHdwkKSq1zskRRJ56fN7xs7jEjLW4ULwHQDG5sEXa6uPEkoixxg5a+gY+emWPzo+AiiOMYNHwzOdaWHROoscf/3Bh4AYm2MWGeswK/ji67//lVnAMirLpmkws9/erqs4CIMYI4uUVUVEIhLrSIrO9fv9xZu3jZ3HLDLWYUrwxb/u/6mZNdI0BeHk5PRqyxQbmxiTTOu9F/s6zRTR8clJqlNmVkq96PV0qheWPgHE2BxTyFiHKcEXj1cfShQigsJweKbTdHtnByJVWVd1rbU+CaeZ1qeDwBxTrff2vo8cSdHHd+4CYmyOKWSsw5Tgi7XVR0Q0Ohu1rrZOTk+VSja9F4hO0lSnsY6RuX98JBBmfrv11ka3CyAyJ4n63a07xs5jChnrMCX4Ym11hYUB1DFeaTQA+GfPAJRVBRAAAqqqetE/fOettze6XSIoUoAIcP3mbUCMzTFBxjpMCb54vPqQGEIyqspYMUvc3d+XKM1mg0hxHZVSZ6Ozg6M+kTrs9wUS64gL12/dBsTYHBNkrMOU4IsvH/wFIEVoZE0iMKSz/mQ0KhtZBkHzypXRaNTMGuubG+//5P1ifR2ETOuyrCihxeVPATE2xwQZ6zAr+OLLB/dZGCKZzlgikdr0W7GOSZokSoXh2fPdnWvvvttqmf39F4f9I0pIolBCi8ufAmJsjgky1mFW8MVXK18AGA7P0iS50mwKsLW9DaCqahH4Z1vvXbvGIldbptc/PDg4FMG5Kta/v3UHEGNzTJCxDrOCLx6vPCQFnerTwSAyNxuN5zvfgVDHeHR8zMzNRkNEBmEIAjP3Dg4SlRBhYekmIMbmmCBjHS4Jvvj3ygMaQxgOdZru93og6vUOqrquOSakmjo7HQaWc1zX9dHxSab1wtJNQIzNMUHGOlwSfPHVo/tEpHV6cjrQaVbV5X+KQqdZjJElAiDQaDQipRKlhJGk6rDf//DjTwAxNscEGetwSfDF2upKzTUApdST9Q2VKCIVY12WpQhYmEBlWUZhMFSikkTt7n1//dZtQIzNMUHGOlwSfPHPP/+x2Wgyx/aTdZ1qFubIIME5glKJRNnZ26UxRB5bWFoGFCDG5pggYx1+SPAFgM8+ui4izbQhEFIUWUQiQOc2uz7TelSVIkgSJSK//WgZEGNzTCFjHV4i+A5AuPDZjUUBiEkpRSn5rWcEqmNUis795sYSxsTYHLPIWIcfFXwHY4QLf7ixSKCf//JXmCEAjM1xCRnr8GqC72CMMCaYYmyOlyBjHf5PwXeMzfFqyFiHN4mMdXiTyFiHN+l/XojTfwg8onkAAAAASUVORK5CYII="},{"name":"Uncut diamond","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAEuUlEQVRIDbXBvW8cRRgH4N87O7N3GQdoiGhAU3r370KCFgkJUfNhyYGATUICRGlBEJIYAxJICCKLioIO4Y1x7HEcY+Ocff7au92deV98lk66kxMUCj8PWZfjLJF1Oc4SWZfjLJF1Oc4SWZfj/yh9Yd0knhpZl+PJSl9g3GuvvDzz2Q0A1k3iKZB1OU4pfYETs1NvaaWJUDchcEh1Sor+Wr4PYPb6DZywbhJPRtblGFf6YuHbOQ5cNdW95fss3IQgzGmaApQo6vX7D//eFGaGKNDs9RsArJvE45B1OcaVvvj1+3kJ3IRGa6108tvvvwOUJAqgJtSpSYmos7OTaNXp7JIiiTzz2Q3rJnEKWZdjXOmLhfk7CSWRY4yctkyMfH/N7+3vARQHmMFVr29SIyzGpJHjm2+9C4h1GcaRdTnGlb749btvmAUsVV23bYuZ/fp6aOJReRRjZJG6aYhIRGKIpOhYt9udvnzVukmMI+tyjCh98ePNL9ppS2sNwsHB4fkJWyyvYEBSY7YebRudKqL9gwNtNDMrpR51OkabqZmPALEuwwiyLseI0hd3529LFCKCQq/XN1qvb2xApKlDE4Ix5qA8TI05PCqZozZma+ufyJEUfXjtOiDWZRhB1uUYUfpiYf4OEVX9auL8xMHhoVLJivcCMYnWRscQI3N3f08gzPzsxDPLq6sAInOSqPeuXLNuEiPIuhwjSl8szM+xMIAQ47lWC4B/8ABA3TQAASCgaZpH3d3nnnl2eXWVCIoUIAJcvHwVEOsyDJF1OUaUvrg7f5sYQlI1dWyYJW5ub0uUdrtFpDhEpVS/6u/sdYnUbrcrkBgiTly8chUQ6zIMkXU5RpS++OnWVwApQittE4Ehi0v3qqpupSkE7XPnqqpqp62lleWXXnypWFoCITWmrhtKaHr2Y0CsyzBE1uUYV/rip1s3WRgiqUlZIpFa8WsxxEQniVJlr/9wc+PC889PTNjt7Ue73T1KSKJQQtOzHwNiXYYhsi7HuNIXP899DaDX6+skOdduC7C2vg6gaYII/IO1Fy5cYJHzE7bT3d3Z2RXBsSaG969cA8S6DENkXY5xpS/uzt0mBaPN4dFRZG63Wg83/gYhxLi3v8/M7VZLRI7KHgjM3NnZSVRChKmZy4BYl2GIrMtxSumLX+Zu0QDKXs9ovd3pgKjT2WlCCBwTUm2THvZKlmMcQtjbP0iNmZq5DIh1GYbIuhynlL74+c5NIjJGHxweGZ02of6jKIxOY4wsEQCBqqoipRKlhJFotdvtvvvhR4BYl2GIrMtxSumLhfm5wAGAUure0rJKFJGKMdR1LQIWJlBd11EYDJWoJFGbW/9cvHIVEOsyDJF1OU4pffHDl5+3W23m+Oe9JaMNC3NkkOAYQalEomxsbdIAIg9MzcwCChDrMgyRdTkep/QFgE8/uCgibd0SCCmKLCIRoGMrqz41pmpqESSJEpF3PpgFxLoMI8i6HE9Q+kWAcOLTS9MCEJNSijT5tQcECjEqRcfevjSDAbEuwziyLsd/Kv0iBggnPrk0TaBXX38DYwSAdRlOIetyPJ3SL2KAMCAYYV2GJyDrcvxPpV+0LsPTIetynCWyLsdZIutynKV/ARMoqX8UjUQPAAAAAElFTkSuQmCC"},{"name":"Uncut ruby","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAADjklEQVRIDbXBUW4bxwEA0DdDMk5HKLHoBUZ/2r1HL9EP36GFHedA+e2vYLjwPSR+VQsUcGIn7tQON4pF7hQjiAgFxYUL2O+FlAdfUkh5wPbqAieng88tpDxsry5OTodpvKy1npwOPquQ8oBpvEy5315dhBBS7n0+IeUB26sLnJwO03iZcu/jpnGT8plPFlIe3JrGy1rryengyDRu3Pfnbn5ZIlI+8wlCyoOD7dVFCCHlfho3bv2lmwORG/asNG80L0t0K+UzHxdSHrZXFyenA7ZXFyEEwrNuXdkp32tuNCtN4APvmJmJvCwRKZ/5PSHlAdurC5ycDtN4Sfi2W1f2LAj8U8FCc8NKsyXyM5GZlyWmfOaBkPLg1jReIuV+GjfPuvWCPTMLKm+Ua82eWbMjaBaav5dITbl3X0h5cN80br7t1lWzU5Y6/KhUrpmp7AlU9gTNNc9LTPnMfSHlwZFp3Pytm5e6JTO/Kl/pXituLSmsNL+wpBJ4z5LzEqkp946ElAdHpnHzTbeuBM2NsuCtZkclcs2SX5lZ8I6ZyD9KpKbcOxJSHhyZxs2zbo2d8rXuWgm61wqWLNhTmZg1f+C1phJ4UWLKZ46ElAdHpnHzrFtXzcySyI8Kdu4EdmxJ/EAgamZelEhNuXcQUh4cmcbNN906MLNXKnves+cRgT2RD0yaX5iZ3XlRIjXl3kFIeXBkGjdPupkOX2lmXik7lppH3LDiB/7EK82SHZHnJVJT7h2ElAf3TePmSTdXzUI3E/hJ2bPQ7HjLmkf8h4nITOR5idSUewch5cF907h52q0rOyWy0uGtgj2Vn/gjla95z9admRclUlPuHYSUB/dN4+Zpt44suFYqS11RAjuumVlprt3ZaiLnJVJT7h2ElAcPTOPmabcOBD4oC94R+Jk9eyJLPlCZqUysOC+RmnLvIKQ8eGAaN0+6dSDyQVno9sq/WLFn1kRuNAt3fuG8RGrKvYOQ8uCBadw869azJvC9Eojs2VPdufGbyHuel0hNuXcQUh48MI2bv3bzSjfzSlloqmYmEqj8m6iZNecFkZpy7yCkPPg907jB427G0p3KrIm8YcWN35yXSE25dySkPPiIabwkuPW4mx0seENkdue8RE1NuXdfSHnwP03jpSa49bib8V2J7qlIufdASHnwaabxUhM01ZGUex8RUh78n6bxMuXepwkpD76kkPLgSwopD76k/wIQ6ndw47YagQAAAABJRU5ErkJggg=="},{"name":"Uncut ruby","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAADO0lEQVRIDbXBwY4UxwEA0Fc1M8YpKaNWfqCO2/0f/okc+IdE4PUH5ZrrChHxIfQpaskSNtikAqZZs9NdUa125BmtifBh3wspDx5SSHnwkELKg4cUUh48pJDy4I+YpzHlC18spDz4vHkanfumW1+UiJQvfIGQ8uCeeRrd+mu3BiI3LOw0bzQvSnQr5QufF1IenJun8bLbVw7KD5obzU4T+MQ7VlYiL0pEyhd+T0h5cG6exu+6fWVhQ+DfCjaaG3aaD0R+IbLyosSUL9wTUh6cm6fxsttvWFjZUHmjXGsWVs2BoNlo/lkiNeXeuZDy4Nw8jd91+6o5KFsdflIq16xUFgKVhaC55lmJKV84F1IenJin8e/dutVtWflV+Ur3WnFrS2Gn+ciWSuA9W65KpKbcOxFSHpyYp/Hbbl8Jmhtlw1vNgUrkmi2/srLhHSuRf5VITbl3IqQ8ODFP42W3x0H5WnetBN1rBVs2LFRmVs2feK2pBJ6XmPKFEyHlwYl5Gi+7fdWsbIn8pODgTuDABxI/EoialeclUlPuHYWUByfmafy22wdWFqWy8J6FRwQWIp+YNR9ZWd15XiI15d5RSHlwYp7GJ91Kh680K6+UA1vNI27Y8SN/4ZVmy4HIsxKpKfeOQsqDc/M0PunWqtnoVgI/KwsbzYG37HnEf5mJrESelUhNuXcUUh6cm6fxabevHJTIToe3ChYqP/NnKl/zng/urDwvkZpy7yikPDg3T+PTbh/ZcK1UtrqiBA5cs7LTXLvzQRO5KpGacu8opDy4Z57Gp90+EPikbHhH4BcWFiJbPlFZqczsuCqRmnLvKKQ8uGeexifdPhD5pGx0i/I9OxZWTeRGs3HnI1clUlPuHYWUB/fM03jZ7VdN4AclEFlYqO7c+E3kPc9KpKbcOwopD+6Zp/Fv3brTrbxSNpqqWYkEKv8halbNVUGkptw7CikPfs88jXjcrdi6U1k1kTfsuPGbqxKpKfdOhJQHnzFPLwluPe5WRxveEFnduSpRU1PunQspD/6veXqpCW497lb8o0RnKlLu3RNSHnyZeXqpCZrqRMq9zwgpD/6geXqZcu/LhJQHDymkPHhIIeXBQ/ofxXtNcCVrEHIAAAAASUVORK5CYII="},{"name":"Loop half of a key","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAACvElEQVRIDbXB3WscVRgH4N97dkbNm2LT3XqpLwUh5/wzuSqIRRCCvWmR7Gr9WCliiCjS1rYXKuqFUktLeyOkSGn/DEHpuTx39Yuaye7JzOzOOe4ESyqadLYyz0MsBm0iFoP/xzuLR7As4xHEYvCkvLMAVlaOK0Xdo8+NtrOtLLtze5NlGQ8Ri8ET8c6+9PKraTKTLi4eOtLtjkfjBw/++O33X3649T3LMnYRi8H8vLOvnXwdCEVRFvnO8y8ce/bw4bIsfr1/fzTevn7tWyCyaADEYjA/7+zq6qnRONvKsqfTpzY3bwLqxCurABTo6tWvAcWyDIBYDObknV1ZOb7U7eU747IoRqNRJ017vaO8sEDUyba3blz/BlBAZNHEYjAP7+xa/91JrSzyPC+KvPCLfGiBeeEZnlbTL7/4FDUFRBZNLAbz8M6+8ebZEEIVwnRS5DM7fjwey7EXQzXNsj+/u/IVoIDIogEQi8E8vLP9wXtEFEI1Qwodlfz80493797CHgVEFg2AWAwa8872B8NOJwm1aqbb7RVl+cnHZwGFPZFFYxexGDTjne0PhkmSxhhDCJNJeaTb21h/+9TpM59/dh5QQMQuFo2HiMWgAe9sfzDsJKkiCiGUk3JpaWlj/R3UFGqRReNfiMXgcbyza4Nh0kmTNAlVVZbF5Usf4W8KiABYNP4LsRgcyDu71h8mM2kKoMjzSxc/RE2hFlk09kcsBvvzzp55630AnSRRSuX5zsULG6gpIAJg0TgQsRjszzv7wfq5aTWpplVZlhfOr6OmgMii0QCxGOzPOwsE/IMCIotGM8RicCDvLBCwRwGRRaMZYjF4HO8sagE1BUQWjWaIxaAB7+4BhFpk0WiMWAwa8+4ei8Y8iMWgTcRi0CZiMWgTsRi0iVgM2kQsBm0iFoM2EYtBm4jFoE3EYtCmvwBe7CNw0NtmcwAAAABJRU5ErkJggg=="},{"name":"Loop half of a key","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAACqUlEQVRIDbXBwWsUVxwH8O/vzVtifqbE3bVXf0gpmfff5FAvgnhQvCgFByM0oXRL6ilRLyKIIIIieFLMQfwvvAi+47sFRIk7ycvM7My8dhYllpo4a5nPh1gMukQsBv+PdxZfYFnCF4jF4Ht5ZwEsL/9CFA2HJ9M0HY93Xr58wbKEz4jF4Lt4Z8+ePa91T+ve8eMLg8Fwb2/3w4f3795tb209Y1nCFLEYzM47e+nSr0Aoimx/f//UqZ8WFxeLItve3vZ+9/HjB0BgiQEQi8HsvLMXL15O03Q83pmbm3v+/Cmgzp27gKlHj+4DimUJALEYzMg7u7x8pt8feu+LIt/bG0dRbzj8kZmJVJp+fPLkAaCAwBITi8EsvLNXr/42aRR5Y/8fCws/zM/PHzvGVVXevXsTDQUElphYDGbhnb127fd6ajLJ8zzzjd3Tp38uyzJNdx4+vAcoILDEAIjFYBbe2SRZI6K6URGRUtGbN69fvdrCAQUElhgAsRi05p1NkrUoiupPqsFgWBTFjRurgMKBwBJjilgM2vHOJsma1jqEUNd1WU76/cFotHLlysqdOxuAAgKmWGJ8RiwGLXhnk2RV6x6RqutqMilOnOiPRitoKDQCS4z/IBaDb/HOJsmq1j2tdVXVRZHfvv0XPlFAAMAS42uIxeBI3tkkWY2iXq+nAWRZduvWOhoKjcAS43DEYnA47+z1638A0ForpbIs29z8Ew0FBAAsMY5ELAaH886ur2+WZVlVVZ7nGxsjNBQQWGK0QCwGh/POAjX+RQGBJUY7xGJwJO8sUOOAAgJLjHaIxeBbvLNo1GgoILDEaIdYDFrw7i1AaASWGK0Ri0Fr3r1liTELYjHoErEYdIlYDLpELAZdIhaDLhGLQZeIxaBLxGLQJWIx6BKxGHTpb2ShI3Bg98TvAAAAAElFTkSuQmCC"},{"name":"Tooth half of a key","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAACl0lEQVRIDbXBwUsUURwH8O/vubvEDy92UALhdxDaeRehoFP/jAhrJFh2MCMoCSEqghI6JEjePO1BpIsUYeLFQ6AHw4FInpSCrtm6zptm2vXVLElCmWMwnw+xaGSJWDSyRCwaWSIWjSwRi0aWiEUjS8SikSVi0cgSsWhkiVg0skQsGv9kjY9DLEWcErFoHM8af3DwVhAEe3u7m5uf5ufnWIo4DWLROJ41/vDwvSgK6/Xv24nNN29esRSRGrFo/I01PoBSaYAIAOXzOSL15UtlZ6cyO/uSpYh0iEXjD9b4PT2ler2BJiLK5wu5XJ6Zq9Wvk5PPAcfiIQVi0TjCGh9Ab+9VANXqbqFQiOMYcIXCmba2sx0d5zY2Po+PPwEUSxEpEIvGIWv8vr5rgAPgHCqVrdbW1kaj4dwBkZqaegHgypXB8fGnSCiWIk5CLBpN1vj9/Tecc2iq1xuVylZX1/kwDOL4u3ONiYlnSCjgAFCAY/FwEmLRAKzxS6UBalKKfnLOBYna7u7OpUuXo+ibtcH798sLC/NIOBYPKRCLBmCNPzR0NwyttUEQ1Pb3a93dF8Pwm7VBrVbt7JRcrkWplpWVpenpMuBYPKRDLBqANf7o6OMoisKEtTaoVr92d1+w1q6tfSiXpwBcvz68vPxubu414Fg8pEMsGk3W+CMjD5RScRyFYRgE+3t71fb29rGxh0goJA6QUCxFpEMsGoes8QHcuXNfKRXHUa1WW1//ODNTRkIBDiAkHIuHdIhF4whrVgG6fXtUKbW9vbW4+HZpaQkJx+IBsGaVxUNqxKLxB2v8mzdHHj0awS8KcCweTo9YNP7GGh+/ORYP/4VYNI5hzSqaWDz8L2LRyBKxaGSJWDSyRCwaWSIWjSz9AMpRJXBa5wo+AAAAAElFTkSuQmCC"},{"name":"Dragonstone helm","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAFHUlEQVRIDbXBe2xTVRwH8O+57d2yn3R2Ik4n8SdGc+9RY3zhY0FjYhCmMSY+42PEoJjgDDGg/AHxEQ2aqIsxGhERomJ8ZQZlAZ8JWAZmosSIVI+DrGfM0a5l7XrbM9ZuvUrjkpGtUP/w8xHEEv+F0YrYQZnRitjBCQliiaoZrTpae+/cNIfYMVptuPunhz69kthBZYJYojpGq47W3lgm+kTnLQA23P1TNN7dHmkDfGIXFQhiieoYrTpae2OZaENdI4BovBtAe6QN8IldVCCIJapgtOpo7Y1logAuamyOJn4AMDDc2x5pA3xiFxUIYomTMVp1tPYCiGWiAA57sabQHAArOm8GfGIXlQliiRMyWm1bnAIQTXaj7LAXawrN+f7gZgBbouuJHVQmiCVOxmi1bXHq0HAPyv48sjdy/s7kgb7Yjt2AD4DYRQWCWOJkjFbbFqcODfd8fnVnMW+O5vKjWe/o0LCXGIx1/QyA2EEFgljihIxWXVu3ZD9rfmvuutGMV8ybQi5/7VhN318DiWTyWrM0ETi4cc+zxA6mI4glKjNa7fn2q1dSBwpmZMyMFPIjC4q1npf7Kx4fzmaTQ0PxRCKqegAfALFrtAJA7GCCIJaowGj12LxXWtrOmnEKGWO8XH7Yy2ay2YGBwzljhj1v6B/p9N59+zHhjRt+LISGlncuJHZQJoglKjBaLbp+eX2paf4jp+eMyeXzXi6XzWa9XG771/sA5Ea8cy4YvD24FWWF0BCA5Z0LAZ/YRZkglpiO0Wruww/KP0+rLzXFhzXKUuO6ND6OsoFMrPm69NffIZHpb58XiQd/Pys0Z3nnQsAndjFBEEtMx2g1d8liqcIA+lIHMKE0Pr7gpoPJdCGVPGpZCFrBrbtiiy5d9/KOpTjGJ3YxiSCWmI7RyvcfQDLfejunc4P5Qg7APXfEvHzhzR/DY8VxoARYN52R2NgZAyzAB0Ds4niCWGI6Ris0zgrX1dUS/fYhHxkq7upKvdh1OsZKt87qKxTGvug/DVZg4RnJjp2xtgs+XrPnPgDEDo4niCWmMFotiXSsv2tpOFRXW0OoCdiWjUAAFmDbQSsIlNrvH121peGZBemVa/bce/b73dnN7syr3u5eTexgEkEsMR2jFRpnhUOh2roaBGpsy0IAsOygHUAw+M6SsWWfnPrIZf1vvIXU6L6nLo6gTBV3vd29GgCxgzJBLDGF0QooobGxMRxGTQ3sgA0gYMGyg7aNoEUNpz5+9aGXXh2fETr0y4EsJmmftwPAiq4biB0AglhiCqMVUArPbqytn4maABAAYNs2bCto2U1XuI+et/fZF4oAHGdw/68zWy5ctHb3KhzHJ3YBCGKJKYxWQCk8e3ZtQz0CgcQv+zHhmw+uAfDoCg+A4wyms6M32us39TzTcuEilK3dvQrwiV2UCWKJKYxWQCl87rmZWB+O8fEvsf2T5mUrigBGimbu5emPfsghk8VxfGIXEwSxxBRGK4TrkckCPgBiF2VGq3fXXNq+1kbZOErR/p8BH5MQu5hEEEtMx2gF+MQuJjFabXjuktc3ziiMjd58Szo+ePSDzQOAT+yiAkEsUTWj1dqnLlm3acb8lvjWzobZ5/V9E0kCPrGLCgSxRHWMVpFPm5etxPyW+LdfnnnrbcnnX+sBfGIXlQliieoYrba9d02s30sNFZ5u78ExPrGLExLEEtUxWq150l398h84xgdA7OJkBLFE1YxWgA+A2EV1BLHE/0kQS/yf/gbN9kp/ZuV+oQAAAABJRU5ErkJggg=="},{"name":"Dragonstone hauberk","base64":"data:image/png;base64,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"},{"name":"Dragonstone greaves","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAFD0lEQVRIDbXBe2iVZRwH8O+zecz9SNbQY16qH3Y774tkw9LVmJZRkxDTVTToTqkj0dCgP6SiC2H9USYRdKeIbouWZhfzUs1amk2GIUhPW3Uem8edLd3Zu7PnvPenzmiguNVW+PkIYhv/g1ZyTirZJnuIUxiOILbxn2glAdRWTfcDpI/k01mHOIVTCGIbY6eVXHvTLCJ/Z9l8mHipvPclubgz6xCncDJBbGOMtJJPNViuH+1v9/rmLq2fMlXu9wBsadnUmXWIUziBILYxRlrJJ1dYBS9auHTDY999G0dRTqnoL37oHtjXmXWIUxgiiG2MhVbyzpXLZwa729q93qo6GDO/+7zyzgWHK7Z+6bbW0pWbWzZ2Zh3iFAYJYhujppVc9eA6p7cv37HLC3HF1Q07B7pu/HFFv38sRvR++bOLu+8qmdv8+efvHko7xCkAgtjG6GglV667H0B/rm/gl6+rr7rj04F+xNF1+28GMHBe6+6z2oNCIfYC/4dthzocwBBbgtjGKGgll69ZBSAG8n1OIf3N3AUNOwa64jhCbKI4RhzFsYExC8dP2PbF2wc7HMAQW4LYxihoJe9e1QAT9/f1A3AP7/lj9qLS8eMRxVEcw8RrKy978aUnvCA4uxxbW3oAQ2wBEMQ2/o1W8o6G5cYYGJPvc9Jtu2dMLeu9fElQcBeVn1MSOS3fNMYRpk+G56OpOQMYYguDBLGNkWkliVNayVuX321icyStnFyuJJEoLS29r75+S9NzQYggCMMI5ybhBXD9YGtLD2CILQwSxDaGo5UE0LgsqN+SuOXO24IwDH2/K3M0iqK2fa1VC2pKS0rcox0z58zP5/OB78dR1LzrKxQZYgtDBLGNU2glb5+74u3WV9de8/D4cWdcsGhC464dx7M9B9oOYFBVTTWAaTNmeJ43oewM3/c/a/oYMACILZxAENs4mVaycVlQvyWxpm7WtMnr+g5nB3pm7HSflod+AgyKRO2SxVOmTQ18z/eD0PM/adoMGGILpxDENk6mlVw9580jq7rDt15YvXJ627cr1798D4oMisT1y26YPCWZz+dNVPTJh5sBQ2xhOILYxgm0kgCuf+bxcVtf98PQczGJ0NSSAQyKxJKb6iqmTM4d63ULhTAMv9q2HTDEFkYgiG0M0Uq+e4N+Z+HG0s2v/JYpJCsSXT35Q2kHMACILa3km89v+njv3mM9Wc/197XsAQyxhZEJYhtDtJJPN7zxvXy04IfZ7nwE+CFk2gEMIAC8tmlj20dHewvH32t9HUWG2MI/EsQ2hmgl664533XDo8dyUQTfhex0AAOImsrk4tmT3NI1APb/3nRp6XUbtq8HDLGFfySIbQzSSj5wy+z2TC7dlQNwsMNBkQFETWUyjjBxYlnBDRde+lCQcTZsXw8YYgv/RhDbGKSVXF03qz3bn+nOHexwAIMiUVOZjCNUlJcVvNB1g8ykC9LN3wOG2MIoCGIbQ7SStVXTd+zLAIbYAqCVrL4kGQETKeF6Qd/F8+r6r35i24OAIbYwCoLYxgm0koAhtgBoJasvSUZAOSW0FxyfOW9Rovq5Dx4CDLGF0RHENoajlVxQmQwj9BdQcWbi2jmPRD9f9HjLtYAhtjBqgtjGKbSS9bXn+z7cMCzosLktg78ZYgtjIYhtDEcrWXlhMnXOxMbmXwGDQcQWxkgQ2xiBVhJFhtjCfyWIbYxMq5+ILfwPgtjG6SSIbZxOgtjG6fQnRcyZf1Ni1Y4AAAAASUVORK5CYII="},{"name":"Dragonstone gauntlets","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAEg0lEQVRIDbXBX2xTVRwH8O9p79r119FN2UDK7CGY2Z4tW4iKhGIIwQkijAyDJBuIGBN40Qd9IyH6IJEXDZEEoz5ojPogwRgJaIKGkGoWl8iyP4pcB4NbtjEsmNKxs7X3nHvMKku2IFj/9PNhxAXKiREXKCdGXKCcGHGBcmLEBWaRjk08jv8PIy4wQzr2vt0N+98fRBHxOP4zRlygSDr22uXR53cs+OWnCWPQfzZ7oiuDIuJx/FuMuECRdOwNyVi40nqoOXCmLweguTF8pjc7OYVvezKYi3gcpWHEBQDp2OuTsVAAkXBw06bIpcGJ7p4cgEeWRX7sve4qGA95F0pDufm8RvfZHPE4SsCIC+nY61ZEKWQFA1ZNONDZeW9fzw0DDPSPF5RyNQoKQQvXxhEOugbwPBz7PgMYgAEgHsedMeJCOvbm1bFQpTXy2/j9C+bt3LLg8pjs68+6Gq5WSqHgIhK2xm6gJqSMgavw2alRAEfefPieRRVPbP8BAPE4/gojLqRjb2tdGgz6C672AXs67ptfH3jr0Igq6FBAVYWsvKuMQSZn1UWU0sgrdX7Yjc6v6Ghf7GeorQ9ueiGVzfqIx3EbRlxIx352Y8PFkeySRTWu1q/simoPHx69prR+fFVYaXz5ze/GQ1XIqqtGwVWDo6q2GlufWnzqu6tPrl3ImH8hD7RuPJ2Fj3gcczHiAoB07A3JWG11sKD13t2xgutN5dXEpHfkq+uu0pN55SocS6UBHNiTsNM5AFVkoWjz+igDXn8nneodBnzE45iFERcApGO3r4nNCwV/Hc52D2RQVANvW3tjwdWTeX356njXQAbA7raYAdrWLfT7/D4fPj8+CqDz6frDn45dHBvvOZsBDPEEZjDiAkXSsZPNdbKQ1xoD53M18ACsSi6ZdNXUlNs1kAFw8MWmwZFxGGxcFz1+chRF27fElOcdePeSVWH1DWaHr+aIxzGDEReYIR17eWOdq/O9dq4G3spkvdaYyrup3gxgAHbwpaZLV8Y9gz95HozB9q0xT2P/e+lgANmsSvWOAoZ4AkWMuMAM6dg18ACsTNb7YLlanewexTSDaezwy03hUEX/hZwx8DylDZ57ZonW3muHhqwKq8ICg/XF6SHAEE+giBEXmEU6dttjMeaDVjjRlQYMpjEAna1RokiyKfDz0E3PwHhY9mCkqTligEc7Uu2rYx5wLJUGDPEEZjDiAnNJx8YtBtNYW7IuWhuqrrKMQXYysKqxsv9CruWBSFNLBAbLO1KAARimGeIJzMKIC9xGOudwC+tojS6aX1nhB3zwPGRu+Fe3hHzM19QSOfTRlY+/HgQM8QQA6ZwjnsBcjLjAXUnH3rtjKQAGKA8yr24Wgmuaw7ve6MU0QzyBO2PEBe5KOvaK5rrWZfMAv9Ja5tXEFD44kQYMAOIJ3BUjLvB3pGPv29nAAOVpOaXePpoGDPEESsCIC5RAOvaruxpcpQ98MgQY4gmUhhEXKI10bEwzxBMoGSMuUDLpnCOewD/BiAuUEyMuUE6MuEA5MeIC5cSIC5TTHzpW/nB09NezAAAAAElFTkSuQmCC"},{"name":"Dragonstone boots","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAFdElEQVRIDbXBb2jc9R0H8Pf3LmnaT7z0pncmjdk+Z9lyv59FCBlZZQtBbsPh3AYDUXyyB1tdrD6YwiYzK6H4YIPtmc/GQEXK/kTXJ0O6uiJFpEwqZ7pg2293dvnWa+P9SdL8cve9P7/f9/tddnKst7QDO/J6CWIf/wetJDqIs7gZQezjdmklM8NDiQS2LBUCAMRZ9BLEPm6XVjIzPJRI4FONJgrFgDiLGwhiH720kgCIs/iftJJJ2ORwEkAigUYT8T7I5QBwxB66BLGPG2glM2NDid1YKgQAiLO4Ba3kg5OjABbzxdRYEkAckMUAcMQeugSxjy6tZGZsCEBiNz61VAiIs7gZreSDk6PoWMwXs/cPxw3OnK8AjthDlyD20aWVzIwNAUjsxpbNJpaLAeCIPWyjlXz8of0AStUmgMQdfe1GdPLsNcARe+gSxD66tJK5qdHLK7XEbjSa2FIoBoAj9rCNVvKxb+wXMcQEtjRb+OBCdWBiUp48TZxFlyD20aWVfOKb+0uVZj5fTI0l432QywHgiD3cjFbyvszQ/eOpuIhHxkx//Ye//eDM0sKbgCP20CGIfXRoJZ979MC1oAEgBlwtb0YGV8qtYikgzmIbreRbC3/41cUPn/cOABi7554fvX5Mb6zlX3kdcMQeOgSxjw6t5HOPHnAAHFY2G86ivNY8nb8GOGIP22glDz49mxi520aRDcMojGIx06oHulRdeuNN4iw6BLGPDq3k8VdfPnL02Ye+/HkHrGw0rm82Lw1+cfntd4iz2EYrefDwk4l9IzaKbBgODO1p1Wu21ahVqvlX3wAcsQdAEPvo0Eo+duylennj+4m7+/v7jxx9dtf0t2qVauHkKcARe+illZyaPRSLxwdTd9owHNhLptWyplmvrm+WKuf/dII4C0AQ++jQSn7npV8MJKle3rBhdHTigWf++Pv66qr88wnAEXvopZWcmj0Ui4nBdGpg7x4bRc4YINJr12vlyuJrxwFH7AliHx1aydz8C3d+acQZWytfd1G0/s+r9bX11UuF0tKHxFlso5Wcmj2UGE7vSdIPPjcaGZO+66619fXq2tpTP3kecMSeIPbRoZXMzb+QGh+xxjpja+WNsF6rXLrSqFQLb58GHLGHXlrJqcOHRvz9zwzf++Njr2GLtVPRP+qt6GyQLOb/TpwVxD46tJK5+bnU+Ii1xhlrja2X1mvlyuqlZXnir4Aj9tBLK3nw8JO/fviRp155eUJfcM7cQbuaLaNbJh7DwqnLgBPEPjq0krn5uVR2n7XGGWsj8+L41JmzZ39z7v2r758rnb9InEUvreTBp2cH/nb8C8NJa+GAxJ54OzS6ZQAsnLoMOEHso0MrmZufS3mjvxz/Sn9fXzwez839DO3IhOHszMxPj74IOGIPvbSS0xPpe/clHbB3MB4ahJHRLeOAhbcuA04Q++jQSubm5373+BO5Iz+HwwP2QmRQWW+FJmqHeCd/DXDEHnppJacn0gAy+5J7B+OhQRSZBO36y3sfy+UAcILYR5dW8r7vfTfX/5ExJjKIjNEts7rebIe4slJbLgXEWWyjlZyZTAOwFtbAAKFB2G4tFQLACWIfXVrJ6Yn0t6czH3+irTORQaNlavVWNYiK1dpyMQAcsYdttJIzk2lrYQFj8N5SBf/miD1B7KNLKzk9kQbwyNcyxdJmZNCOzGbdfLK2+e5iBXDEHm5BK4n/cACIPQCC2McNtJIzk+mHv5pxDtZCrWzWGu1zH1XPFwLAEXu4Na0uooPYQ5cg9tFLKzkzmbYWWywQthEaLMoK4Ig9fEaC2Mc2Wkn8N0fs4bMTxD5uRquLuAGxh9siiH3sJEHsYycJYh87SRD72EmC2MdO+hdnQtHqgnBPSQAAAABJRU5ErkJggg=="},{"name":"Lantadyme seed","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAACUElEQVRIDbXBMYvcVhSA0e9qdgdzJwh3aQJ3OukG3LhcjAnuXAZDAiF/0QQC6YJLw5ImYMjodXqwzTZBmY3eelbWk/GCYUOwV0Oic0TNWZKoOdC3O25tts7/StS8b3ebrafYANM0bbbO8VIMgFrFP4maAyk2ajXQtzsRUas5Rorhqyr/3dFdFoBaxUei5nzUt7vN1lNs1GpmSzF8/aRcrVmdcJPY/9ld/FGoVdwSNedW3+42W0+xUauZLcXw6Fl5espqzZjJB66vuu6Sy7ZQqwBRc6Bvd5utp9io1cyWYnj8vFydcHrCCEzkkbc9N30XzguY1GpR877dbbaeYqNWc4wUw9mLEqEoyBkmxoFhYDjw5tUeJrVa1Lxvd9yx2TqzpRiefl9SkDP5HePAMJAHfv91D5NaLWoOpNhwh1rNbCmGpz+UeSS/Yxw4/3nPB5NaDYia85+lGICzF+Xrl3uYALWaW6LmHCPFoFbxLyk2IDCp1dwhas48KQbg4Ze5uywAtYoZRM2ZIcVQneX1+uFqzfVfXd9xEQq1ivuImjNDiuHRs1K/II8MB66vur7jIhRqFZ8las59UgyPn5cPHkDBmGHkkLi+6sJ5AZNazaeJmnOfFMPZt2WxhomcGUeGtwwH3rzaw6RW82mi5syQYvjmxzKP5IFhJN/w2y97mNRqPkvUnHlSDMCT78o88PqnPUxqNfcRNWe2FBsQPpjUamYQNedIKTZqNfOImrMkUXOWJGrOkkTNWZKoOUsSNWdJouYsSdScJYmasyRRc5Ykas6S3gNppARwcHTe3QAAAABJRU5ErkJggg=="},{"name":"Calquat tree seed","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAB8klEQVRIDbXBPWsUURQG4Pe0Jz/ihDR7D0IQJH/Azs5CFEQExc7OwkLSWOjPsLUSUqewCgs2lpncRuZapHDNl5t7J3M/doRtrDYzwszzEItiSsSiAHxdbW0rJkAs6usKABGxGIyNWBSArysiYjEYG7EoAF9XRMRiMDZiUQC+roiIxWBsxKIAfF0REYvB2IhFAfi6IiIWg7ERi/q6wtrWtmJsxKIAgjvBGovBqIhFMUxwFmssMwxGLIoBgrNP7++EmH+dN/PjBcsMwxCLok9w9tUDU1alTeXC5/PL5ptdsMwwALEo+gRnXz+8k0uJsfi2LJt8tWzmxwuWGfoQi6JPcPbNo92YS0wl5hLasvT5yjfz4wXLDLciFkWf4OzbJ7u5IOYSU2lSuQ6tD/nw+ynQsRhsRiyKPsHZ/Wd3Y1qlgpTLTSqhiSHmg6OfQMdisBmxKPoEZ98/v5e70sZVyoilNE1sUvn89QfQsRhsRiyKAYKzH17stXnV5hLj6uzit4/py9EC6FgMNiMWxQDB2Y8v95Z/znKHVHB5fXMZ0sF8AXQsBpsRi2KY4Oy7xzsA2oQLf/Pp8BToWAxuRSyKwYKz+KdjMehDLIr/EdwJ1lgMBiAWxZSIRTElYlFMiVgUUyIWxZSIRTElYlFMiVgUUyIWxZT+Aqfi+GGdeNCQAAAAAElFTkSuQmCC"},{"name":"Calquat tree seed","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAB9klEQVRIDbXBMWsUQRQH8P9rXz7ESxNuHoIIEvAD2FlZBUQEi9jZWQliYaHfwd5CEGvF8hDEMpDNNrKT4pqLOc67md2dndkVrrG67Aq7vx+xKKZELArAFdnBoWICxKKuyAAQEYvB2IhFAbgiIyIWg7ERiwJwRUZELAZjIxYF4IqMiFgMxkYsCsAVGRGxGIyNWBSAKzIiYjEYG7GoKzLsHBwqxkYsCsDbC+ywGIyKWBTDeJtjh2WGwYhFMYC3+eP7R66ql+tyfrZkmWEYYlH08TZ/9sC0LaqUVuv6alP+OF+yzDAAsSj6eJs/f3grplQ3KOvwx8X1ppyfL1lm6EMsij7e5i9ObjcxhSbVTXJl2pZx7cv52ZJlhhsRi6KPt/nLR3dCbJuUQpNcnXyZNmX15ecC6FgM9iMWRR9v89dP7jYxhdg2TSpj8mVyVf15fgl0LAb7EYuij7f5m6fHqWtDSCG2dZPKkHwdPnz7BXQsBvsRi2IAb/O3p8ehaUNMVWivr69chY/zBdCxGOxHLIoBvM3fnd7brn+nNoWElYvrbfz0fQF0LAb7EYtiGG/zVydHAOqYVpv4/usl0LEY3IhYFIN5m+OfjsWgD7Eo/oe3F9hhMRiAWBRTIhbFlIhFMSViUUyJWBRTIhbFlIhFMSViUUyJWBRT+gvgCPph61eYywAAAABJRU5ErkJggg=="},{"name":"Papaya tree seed","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAABP0lEQVRIDbXBMWvbYBiF0efGmW7Aa5fA9VCw3v7//6IIOkiQJZsJSBBi4zbu0sWpU/SdI6doSU4B89g/7IoG5NQ89oAkp2NtcgqYx16S07E2OQXMYy/J6VibnALmsZfkdKxNTgHz2EtyOtYmp4B57CU5HWuTU/PYc/GwK9Ymp4BleuLC6ViVnKIlOUVLcoqW5BRfsUwDf3H2fEpOcbNlGnbftlwc3g4cOHDn7LlOTnGbZRq+P24393Dkt7d3jhyeX+7g7HRcIae4zTIN+8ft5p4/Tkfe3hlfXuHsdFwhp7jNMg0/dtvNPRw5wQmG8RXOTsd1coqbLdPAxX63PR35+fwKZ6fjOjnFVyzTEx/Eh7PT8Sk5xX9Zpien41/kFC3JKVqSU7Qkp2hJTtGSnKIlOUVLcoqW5BQtySlaklO09Av1eGBhcW1AjwAAAABJRU5ErkJggg=="},{"name":"Palm tree seed","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAACBUlEQVRIDbXBsWoUURQG4P+A1clDnHR7z1vY2dgIFoKgIPoIaSwsFKy0VHBjlUIrYxEshGAhgpaxmr0EYS7GRHez2XV3770zmR1H2MZqMyPMfB+xKLpELArAp8nGpqIDxKI+TQAQEYtB24hFAfg0ISIWg7YRiwLwaUJELAZtIxYF4NOEiFgM2kYsCsCnCRGxGLSNWBSATxMiYjFoG7GoTxOsbGwq2kYsCiC4AVZYDFpFLIpmgrNYYemhMWJRNBCcfbl1eTLLDo+n/b0BSw/NEIuiTnB29+GVZflnEYvvw/m3k9nO+0OWHhogFkWd4Oz+k6tZUfpYnM3PhxN/NPLb7wYsPdQhFkWd4OznZ9diVvi89LEYz7PRNB6PfX9vwNLDhYhFUSc4e7B9PeZlyIuQl9NFPv6dDSfh8asDoGIxWI9YFHWCs3bnRsyXMS9DXsxDcTbLx7Ns68UXoGIxWI9YFHWCs+71zfOy8vE85KWPxdTn03l+7+lHoGIxWI9YFA0EZ0/e3ApxucgKH5dfj8rJPNx/vg9ULAbrEYuigeDsr93bdnSpWJZZvvxxOvt5unjQ/wBULAbrEYuimeDsp/5dEEIsjkazO4/eAhWLwYWIRdFYcBb/VCwGdYhF8T+CG2CFxaABYlF0iVgUXSIWRZeIRdElYlF0iVgUXSIWRZeIRdElYlF06S/DZP1h3V6NsAAAAABJRU5ErkJggg=="},{"name":"Money tree seed","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAABrUlEQVRIDbXBsWoUURgF4HOyVidgY6eQP9js/TshD+ED+AY2Cza+gI1aWNmJDyA2iiAIksbKd5DZwRBnVgiYYBOdq7ubuWNYWFxRi93M/T7KHDlR5gCaqtjedWRAmTdVAYCkLKBvlDmApipIygL6RpkDaKqCpCygb5Q5gKYqSMoC+kaZA2iqgqQsoG+UOYCmKkjKAvpGmTdVgYXtXUffKHMAsR5jQRbQK8ocOVHmWBHrEitkQ1wMZY6lWJeP71yNP9B2ONcl3H92JBviAihzLMW6fHJ3Z3Jy6cPR2c4VtQmfv8b99xPZEJuizLEU6/LRKMRpO8P2bDo/S2jb9umrMdDJAjZCmWNFrMtbN6+Ha5fn85Q6tKmtjr+9fjeRDbERyhwrYl3eu31jcG4LP6dtm9Knk+8v9w+BThawPsocf4p1+WC0NxhsTWepS23qcHB8+uLtoWyI9VHm+EusSwAPR3upQ9fh4Mvp8zcfgU4WsCbKHP8S6zFA/NbJAtZHmeP/Yj3GgixgI5Q5cqLMkRNljpwoc+REmSMnyhw5UebIiTJHTpQ5cqLMkRNljpx+AVe7nmHET4WtAAAAAElFTkSuQmCC"},{"name":"Grimy torstol","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAE4UlEQVRIDbXB72sU+R3A8ffnO6Zrv0tz06t7c4mWT64t7MyzIxCEEIKEZSVIwh139GH/uD7zsCgJIlmCiARBAtJn60AfzLT+6GSFG9POGLPZ77ez4SyKXrUP8nqJ1YT/U52nVrt8GrGaAFU2bC8kvFFlw/ZCwofUeUrPsWusdvkEYjWpsiEgIlZjoMqG7YWkyobthYR31XnKVYeHgQFvNeZjxGoCVNlQRKzGVTZsLyR1/thqXGVDEWO1yxt1nnLVrY3CuxdKBsZql48RqwlQZUMRsRpX2VBErMZAlQ1FBMRql1N1nrLu1orwbqdkx4C3Gtd5arXLu+o8tdoFxGoCVNlQRKzGVTYUEasxUGVDEWHFs2cAq906T7nmes/D3bmS2wY8SH+pM9gfWe1yqs5TGj3HrrHaFasJUGVDEbEaV9lQRKzGQJUNRYS+5yWLZfgoPaSx7npFtHuxYNsAVrt1noK3GgN1nrLs+AW04bYBL1YToMqGImI1BqpsKGK8dyIGPNc8FZcPwocXyuUX4YP5sv8yGswVbBk2HVvGapdTdZ6y5Pgla/8O72rJTQNerCZVNuRUeyEB6jz13okY8CBsOsasPAmBvU65OgrPn28NvixovIJdA95qXOcpjWW38q9w7/clLbhuwIvVBKjzx5yyGtd52lvs7D46ALHarfO0v9QZfFEwZkrojaLdiwU/wp7hiuOeoXHZ8dCw6vqvosFXBT8Y8FZjsZrwnjpPmfIg/aXO4EJBwzFl6L+IBHbmChqGK1l4Lyw5gRFr7fDu70puGKa81VisJkCdp7zFarfOU/AgQG9xdneuxNHoFaEJWgIYdhYKrpsrX8/e+7zkhNXDsN1q3ZkraDjYMla7YjWp85QNx2s4hmO+Pgj/+rdDVhx7hmuOAAIwMIYJ/YPITTABg0sFx6z8PdybL1efhSagNdPa0YLGDcOUtxqL1QSo85RvHA6O4IjFInw0W9LYN0vd2UtRyxj+8kXBmKtPIg+DuYKGZzUL78+XvVFoglZrhu3fFlw3/MRbjcVqwqk6T/nO0ZjAK3gNDn6EX7NUhPvp4eZKZ2u+YML6k+jOfMERjbUiNBDMtM4F3L5UMAEHE/rPo8H+yGpXrCa8Uefp5nLHg4PbUcERjOGI5Zfh+Jj9qOQzCEBgAq9p9EahCVqBYWaGhndsPxjxE281FqsJb6nzlMaG4xwEMIETeM3K83A84Vfn2f285DNwcEyjfxAFBhMQGLbmCxzcMOABqzEgVhPeVeePQWh87zDg4ATGMGbtRVgd8fAP5caLaPs3xfpBBBgwAdvzxcazaPvBCLzVmDfEasJ76jzle4cB4ZunEXDry4ITGLP6NLx/saTNeh6dC3ATTIAYtvZGTHmrMW8RqwkfUucp//WdoyHg4Zgr/wjvfVVujiLAO7bni81/RgZu7Y3AW415i1hN+Bl1/hiEDYeAAQFDY/1JdC5gW4tvn0Y374/+dHX+zzvPmPJWY94lVhP+pzpPeWP9cufOwxGnrl3uzMxwa2/ElAesxrxHrCZ8TJ2ni93ZAPbTQ/BMCRuObUPjj44fjNUuHyJWEz5Bnaeby52tByPwIHzruGnAMyXgrcZ8iFhN+DR1noK3GgN1noK3GvMxYjXhLInVhLMkVhPOklhNOEtiNeEsidWEsyRWE87SfwDy/guMbuhzTAAAAABJRU5ErkJggg=="},{"name":"Grimy torstol","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAEyElEQVRIDbXB70tc2RnA8e85o3H7WMKlZHLjutvHdlvuPftqCUggiIjISJCIpcvu2/5pfbVLyi4RJQSHEERECEJerl5owZPG1ZvJsoPtnPXnuZ2ZxmJIdpO+8PMxoo7/U/CFaMb7MaIO6Oxs0Tc85vhFwRc0Ik0rmvEejKjr7GwNj7ngt4GqqobHHD8j+II7kQgrFirRnHcxog4Ifls0Bzo7W8YY0Zy+4AvRjHPBF8zF6b30cb1kxYpmvIsRdZzr7GwNj7ngt0VzIPiCmcgjK5rRF3zBXJzZSx+NlDywUInmwReiGa8LvhDNACPq6OvsbA2PueC3RXP6gi+4E+nAmgVEs+AL7saZ3fTRaMmyhQpMY7ze3GyJZvQFX9DViDStaGZEHdDZ2Roec8Fvi+acC77gbuQY/sXNH5KnxQFdc7HxIm2OlCxZQDQLvoBKNAeCL5iIXIFhWLZQGVHX2dkaHnPBb4vm9AVfiGbBFyxEzqDDrf3kyfX27R+SjZF248e0OVqyaFmILFrRjL7gC25FfsX0Qfr4dyXfWqiMqOvsbHGBMfZmdvVpcSCaBV+wEDlh4lkCrKftyZfJB4NDzdGSrgBNC5VoHnxB10Sc/Hey9kmbK/C1hcqIOiD4bS5ojF83lpUnLdEs+GJ2vL5yo+SYHkvjZdocKWnDmmU68tjSdTuyYZmMs0fpyu9LvrZQieZG1PGG4At6KjCz4/WV6yVdkR5L40VqLCsjJV01pv6RrP6mzTG0mB5OH/+x5J6lpxLNjagDgi+4QDQLvoAKDNAYrzdvlESwzOynFozFwsNPSr6yU59dXb3W5pSpdjIsQw/Skv+6b0UzI+qCL5iPHMEJHHNzP3n69wMmI2uWu5Ea1MDAKUQaeyl9zd+WHDOxk6x/1J7cSwZgaGjooZYYuGfpqURzI+qA4Av+FOk6hJ8Y30s2kzZdT+ytT69+dG3I2MFvRp5zzOzzlMjKaElXZPJZsjbSninTWo0rgyyPlXxleaUSzY2ooy/4gi8iESoI8BM9bUgYf5FsfnewMFFfHC2puOPThx+XHEFkei+1NQYtAzWWteQMzuCMxm7a3GyJZkbUcS74Yn6iDlSR5Q9LjuAIDpn4MTk6ZjNtk0ANanAGh3Q1XqYGBgYZtHSdRZY3WrxSieZG1HFB8AVd85FBqMEZnMARk98np2fIB0OPrpUkcAbHdM3up9YyUKNmWRwtqeBvFipANAeMqON1wW+DoeuLiIEKTuAUjplupYeHRxtZ+26ZLl8v5/bSCAM1jGVptJzfTZfWW1CJ5pwzoo43BF/wZcTStbCbAos3Sk7glKl/Jqsft/k1cz6tWaqIsVhYXG/RU4nmXGBEHW8TfMH/fB6xvHLI1LNk9Q/thf0UiLA0Wi7spsZyf60FlWjOBUbU8TOC3wbDfMSCAQsGLHM+rQ2yNFb++Xn67WrrL3c+/OvD7+mpRHNeZ0Qdvyj4gnNzt+sPNlr0zd2uXxng/lqLngoQzXmDEXW8S/DFeHbV1njy3QFU9BgWIouWri8j96xoxtsYUcd7CL6Yn6gvrbegAsPnkW8sVPQYqERz3saIOt5P8AVUojkQfAGVaM67GFHHZTKijstkRB2XyYg6LpMRdVwmI+q4TEbUcZn+A/v0BYzp2kMYAAAAAElFTkSuQmCC"},{"name":"Iron stone spirit","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAFfUlEQVRIDbXBT2wcZxkH4N87/3b9TlgP4NRuQvUuiGrnI0g991DJlVZIkVKJ0sogrKTl2qqiiIBKgmgq4uSCCOGKVJRIhYObQwvIHILaQwuNsVy1CM0OoWjmOGxEl4T51ju7Mx/uSits2WvnwvMQi8J902mMMZYW7g+xKAB5EmHMbyrskCeR31QAdBoDOPfiCwBWrlwlsgCwtHAYYlF5EvlNpdMOAGOM31QYy5PIb6o8iYiscy++gLGVK1fPf+fbK1euXvje2Vd+8lOWFg5ELAqATjssIYA8iYiIJcyTyG8qnXZYwjyJzj7/3CMnTpx+7vk3rl/76jPP3vjlq1979ltEFmBYQkxHLAoTeRL5TaXTDkuYJxERsYQA8iQioss/PP/Sjy8S0c8vXyqK4rs/epmIALCEmI5YFMbyJPKbSqcdlhBAnkRExBICyJOIiFbOnzt3cYWIrl5aKYri7MsXiAgAS4jpiEUByJPIbyqddlhCjOVJREQsIYA8iYjo4g9eOn/pMhH9bOXioCi+f+EVImIJcSBiUXkS+U2l0w5LiB3yJPKbKk8iv6l02llaOl2r1a5f/8XTT3/z9dd/RWQBhiXEgYhF5UmEHfymwkSeRH5T6bQD0NLSsufVq6p87bVXFxbms+yfAFhCHIhYFACddrADS4gJnXZYQp3GS0vLnlcry7IoBjdu/BogwLCEOBCxKBxGpzFQLS2dtm23qkZlWfV6H9+8uQYYlhAHIhaFw+g0fvLJr7uua9tOVY22aa3X1t4EDEuIAxGLwmF0Gj/11Dccx7MsKj8xKsvRnTt33nnnbZYWDkQsCgfSaRwEjXb7lG07loWyrMpyVJZlv69v3Vrv9bosLUxHLArT6TQOgsbi4knPc4hsy0JVVWVZleWwKIqNjT9mWRcwLCGmIBaF6XQaB0Gj3T7lus7nH/q0f2TGdd3KmOFg+Of3b2vd39jY6PW6LC1MQSwKU+g0DoJGu33K87zWF+dmG7Oe51qO7ZA1MtWW3vrDW5uD4db6+ru93l2WFvZDLAp76DQGEASNdvsJz3Me/sJcMDs7w/V6zbMs27IsY0xRDP+T65tvbQwGxfr6eq/XZWlhD2JR2E2nMVAFQdBuP2Hbtue5X/7SsSM8wzzjup7nugYwBqPRcDAofvv790ajYtutW+u9Xpelhd2IRWEHncZAIwjQbp+yLMtxnAfnZ44tzM82PlWbqbuO49g2EYFQllW/3//N2ntFUZTlsN/f2tzc7PW6LC3sQCwKO+g0DoLG4uJXHKfmuo5t28cX/GMPPuD7fr1ec13XcRwibCvLqiiKN373blEUZVkMBsUHH2wMBuj1uiwtTBCLwoRO4yBoAHj88ZOe51qWvc1x7EdOPHTkCM/UZ1zX9TzHAKaqyqra6g/eXPvTaFSUZVkUxb17//7oozjLuoBhCTFGLAoTOo2DoAFgcfGk5zlEtm1btm2HDz8w99nPzNTrruc6joOxUVn2Pu7dfPv94XBkzLDfL7a2+rdv/zXLuoBhCTFGLAoTOo2DoAHgscfatVrdsizbtufmjloWHV+oB8FsvVZzHIeAUVnevXuv8/d/GWPS9B+jUTkY6DzvJ0mcZV3AsIQYIxaFHXQaB0Hj0UcXa7WZ48c/B4DGLMs6Nu/6PttkkW1Hf7tTVZUxBhMffrgZx3/Jsi5gWEJMEIvCbjqNg+Do8vIZjBEBoG3YzRiD3VZXr2VZFzAsISaIRWE3ncZB0ABqy8tnABABIBxmdfValnUBwxJiB2JR2EOnMYAgOLq8fAYAEQDCFKur1wBkWRcwLCF2IxaF/ei0AxDG5uePYj9Z1sX/GJYQexCLwnQ67eAThP0ZTLCE2A+xKNwHnXawB0uIwxCLwv/TfwE7amF/t5iClwAAAABJRU5ErkJggg=="},{"name":"Iron stone spirit","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAFDElEQVRIDbXB32tkZxkH8O9zznnfmXkmTo5sk5gafYqUzjm1LHpdKBsYKgtGhJZGpCl7I1IpFBdFlKJSqxcigv/AXueyWnGxa4uQbSExtuRCs8dtbM7l4SzttOu8mfPjndfdgWBCZiZ74+dDLDEemEkTjLF08WCIJQYwONxvPxJjOpMmAF65+jLGXvvt7wCwdHEeYokHh/sAiIglwiQmTV65+jJOU4H62a9/w9LFTMQSAxgc7hMRS4RJTJr84KUXv/rlJ5rNplLK9/2qqpJ/f/Cjn78GOJYI0xFLDGBwuE9ELBEmMWly9XvfXVh4SAcqCALPo6qqi7L88au/BBxLhOmIJQYwONwnIpYIk5g0+f6L31l8aEHdFxB5ZVWWZfWTX/wKcCwRpiOWGMDgcJ+IWCJMYtJk/ZvfuPjE42rMI6+syh/+9FXAsUSYiVhiAIPDfSJiiTCFSZP19Re0Vtbashxubb2VZTngWCLMRCzx4HAfY+1HYkxh0mR9/XmtG9baohjevPlWluWAY4kwE7HEAEx6C2MsESYxabK+/rzWDWttWZZbWzeyLAccS4SZiCXGeUyaAKPnnnshCLRztbW23//ozTevA44lwkzEEuM8Jk2eeeZbQaB937N2ZG09GAyuX/894FgizEQsMc5j0uTZZ7+tlCIia2trR3Vd3rlz5+bNv7J0MROxxJjJpEkYdnq9NaUCANba0WhkbWWM2d7e6fdzli6mI5YY05k0CcPO6uplrZXn+bhn5Kyz1tbD4XB3990sywHHEmEKYokxnUmTMOz0el/XOviSXGi3WyrQIzeqqupv7902ZrC3t5tlOUsXUxBLjClMmoRh5+mn17RW3UeX5uc7Wivf833fs3Z0NBzeeHu3KMqdna1+/1OWLiYhlhhnmDQBEIadXm9NaxU9ujA/P9/mlm40fN+7x41GZVX9ZzD48192y7LY3t7p93OWLs4glhinmTQBRmEY9nprSgVKqYuPr7TbLWbWDaUD5e4B6rouiuKN6++WZVWWxfb2Tr+fs3RxGrHEOMGkCdAJQ/R6a77vKxUsLzY///BypzPXbDaVCpQfgAgEa0dHR0ev//Gdui6rqiqK4e7ue/1+ztLFCcQS4wSTJmHYuXTpa1o3fN8PgmBlub28vPSZuXaz1VK+H6iAiABYa4uyev2NrbIs6rouinJvbwdAluUsXRwjlhjHTJqEYQfA6uplrRueR77vq0B95eIX5trtZqvZUEpr7eDcaFTb0XA4/MOf3qmqqq5tWRZ37949ONjPshxwLBHGiCXGMZMmYdgBsLp6WSnl+z4RBUEQP7a0cOFCs9VQ9wUYq639+ONPbry9W9e1tbYohsYc3b79jyzLAccSYYxYYhwzaRKGHQBPPdXTuuX7vufR4uIikb/yuWb42flmQyulAFhrP/n0bvLBR865Dz88sLY6OhoOh4ODgyTLcsCxRBgjlhgnmDQJw86TT17SurWy8kUAngcij4geXmzMzbE39s9/3XFjOPb++39Pkr0sywHHEuEYscQ4zaRJGC5sbFzBmOdhzCMCQBhzzuGMzc1rWZYDjiXCMWKJcZpJkzDsAI2NjSsY8zwAHmba3LyWZTngWCKcQCwxzjBpAiAMFzY2rmDM8wB4mGRz8xqALMsBxxLhNGKJMYlJbwGEsaWlBUySZTn+x7FEOINYYkxn0lu4jzCZwzGWCJMQS4wHYNJbOIMlwnmIJcb/038BQBAxf2yWkzkAAAAASUVORK5CYII="},{"name":"Coal stone spirit","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAFTUlEQVRIDbXBT2gc1x0H8O/vvZld6bfJZiBRc0jhp0ObnUcuveYQUGApGOxCcInbKBaUkhRaSuJTm/gUbCk5hDTpn1svTnqKTu3Flxh6UAsWwtQJZjR1LWYcJ/Gwhm4bZlY7M29e7S1LJaSVfOnnQywGD61IY0yw9PBwiMUAyJOos2gA5EmEqc6iwVSeRETqzdd/jom1938DgKWH4xCLyZMIABGxhHkSERGmWEIAeRKdP/fa6q8+OH/uNUz5nv/Wu++x9HAkYjEA8iQiIpYwTyIiYgkxlScRkQLch7/77dmf/uyPH15SWldV9fednTcurAKOJcRsxGIA5ElERCxhnkSY6CwaTORJRETnfvLqNxYWfnnhIhH9+u21siyrqnrj4hrgWELMRiwGQJ5ERMQSAijSbQDOuc6iAZAnERG9/uorCwsLb15cJaIP1lbLifNr7wCOJcRsxGIA5ElERCwhpvIkIiKWME8iIvr+905955lnzq+9TUTvr14cl+Uv3roAOJYQRyIWAyBPIiJiCfMk6iwaAHkSERFLCCBPIiLlXLOy8spHH/3+9OkfbmxcybIB4FhCHIlYTJ5EmOgsGgB5EgHoLJoi3WYJMZEn0ZkzZz/++A8vvfSj8Xh3Y+NKlg0AxxLiSMRiABTpNiZYQgBFug2AJcRUkcaAe/nlH1try3K8sXElywaAYwlxJGIxOE6RxkDz4otntfabpra2GQ7/+cknlwHHEuJIxGJwnCKNX3jhjO/7WntNU99XFMXly38CHEuIIxGLwXGKND59+gee11KK7AO1tfW9e/c2Nv7M0sORiMXgSEUaB0G33z+ptacUrG2sra21o1Fx9ermcDhg6WE2YjGYrUjjIOguLZ3wPE8pIlIOja3rprFlWW5t/TXLBoBjCTEDsRjMVqRxEHT7/ZNae59/nnitlqeoAZraPvZYMBqNtra2hsMBSw8zEIvBDEUaB0G33z+ptffFV7fnWm2lPVKklGqaxlZVuz1XVeXm5l+Gw3+z9HAYYjE4oEhjAEHQ7fdPaa2/+Or2XKutfd/zNKAUAQ51Y6uqmm+3xuN6c3NzOByw9HAAsRjsV6Qx0ARB0O+f0g+oL+/eaflt3/OUVlppAA3gGltbO9ear+vyvqtXN4fDAUsP+xGLwR5FGgPdIEC/f1IppbXe2bnZebTT9uc9X5PSiogAKLjGVXU115qvqtraajTavXbt2nA4YOlhD2Ix2KNI4yDoLi191/Pavu8R0a3kH48+0vH9tqc9rRRpjQnXNNbadmu+rktry/G4vH59azzGcDhg6WGKWAymijQOgi6A558/0Wr5SmkiUkrfvXvH933P90np+wC4poFzla3mWvPW1tbasiy//vpft27FWTYAHEuICWIxmCrSOAi6AJaWTrRaHpFWirTWt+8k8/Pseb7WpEhjonFuPNplfsTa2rlqNCp3d0c3b97IsgHgWEJMEIvBVJHGQdAF8Nxz/XZ7TimltX788SeI6MaN63677Xm+JgLg4Mbj6ulvhwDSdKeu7Xhc5PkoSeIsGwCOJcQEsRjsUaRxEHSffXap3Z5/6qlvAiAiAET02Y2/tfwWQKTw9LeMcw57fPrptTj+LMsGgGMJMUUsBvsVaRwEC8vLK5ggAkD4LyI4AA6HWV+/lGUDwLGEmCIWg/2KNA6CLtBeXl4BQASAcJz19UtZNgAcS4g9iMXggCKNAQTBwvLyCgAiAIQZ1tcvAciyAeBYQuxHLAaHKdJtgDDx5JMLOEyWDfA/jiXEAcRiMFuRbuMBwuEcplhCHIZYDB5CkW7jAJYQxyEWg/+n/wAhzFZ/huYopwAAAABJRU5ErkJggg=="},{"name":"Coal stone spirit","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAE0ElEQVRIDbXBz2sc5xkH8O/zvvPOSo+TZQ6Rcwl9cijZedsQ6DkQLFgohigEEqJSouBLKSmFUJNSUkIT8qOHUgr9B3zWNSdDSqAgU5BQm6rFrIdYyU5b4QxjylKzr3d+vDO1B0QktLvyJZ8PsVg8Mpcm6LAM8GiIxQKYjkcXnrZYzKUJgHevvoXOR3/4IwCWAc5DLHY6HgEgIpYY87g0effqWzjNBOa93/2eZYCliMUCmI5HRMQSYx6XJm///M0ffP/ZlZUVY4zWuqqq5Mvbv3r/I6BlibEYsVgA0/GIiFhizOPS5OrPfrq29kQYmCAIlKKqqouyfOeDj4GWJcZixGIBTMcjImKJMY9Lk1+8+ZOLT6yZhwIiVVZlWVa//vC3QMsSYzFisQCm4xERscSYx6XJ5ssvPffs90xHkSqr8pe/+QBoWWIsRSwWwHQ8IiKWGAu4NNncfCMMjfe+LGc7O59lWQ60LDGWIhY7HY/QufC0xQIuTTY3Xw/Dnve+KGY3bnyWZTnQssRYilgsAJfeQoclxjwuTTY3Xw/Dnve+LMudnT9lWQ60LDGWIhaL87g0AZrXXnsjCMK2rb33k8l/P/30OtCyxFiKWCzO49LklVd+FASh1sr7xvt6Op1ev/4J0LLEWIpYLM7j0uTVV39sjCEi72vvm7ou7969e+PGn1kGWIpYLJZyaRJF/eFww5gAgPe+aRrvK+fc7u7eZJKzDLAYsVgs5tIkivrr65eNCYg0Ot7X3vuynO3v/yXLcqBlibEAsVgs5tIkivrD4YtaB0dH/wpCE6igQdPUvt+PZrPpwcF+luUsAyxALBYLuDSJov5wuGGMvnPnP2Gvp5VWSkFR07S+rnphWBT13t7OZPI/lgHmIRaLM1yaAIii/nC4YUxwdOffK2HPGKN0QAqKVNOibXxZlGEYlmW5u7s3meQsA5xBLBanuTQBmiiKhsMNYwKt9ddfHxljAmO01qQ0Om3jHwh0WNdVWRa7u3uTSc4ywGnEYnGCSxOgH0UYDjf0Q2o8vs2PPd7rhUYb0loRASCgRVvVldEr3pdVVRXFbH//b5NJzjLACcRicYJLkyjqX7r0wzDs6c6X49uPXXi8F4Y60KT0A+i0TeN9HZpeVZV1XRdFeXCwByDLcpYBjhGLxTGXJlHUB7C+fjkMe0oRkdZaZdmR6YVaG90B0DZN07beV2Gw4n1V174si3v37h0ejrIsB1qWGB1isTjm0iSK+gDW1y8bY7TWRKS1PjpKV1dZm0CRfgCdpvWzWcEr7H3tvS+KmXP3v/jiZpblQMsSo0MsFsdcmkRRH8ALLwzDcFVrrRRdvHgRwM2b/+itrmitFWkATdsWRRk/YwF89dWh99X9+7PZbHp4mGRZDrQsMTrEYnGCS5Mo6j///KUwXH3qqe8AUAqAAvDPm383xigoKDzzXYvTPv/8r0lykGU50LLEOEYsFqe5NImita2tK+gohY7Ceba3r2VZDrQsMY4Ri8VpLk2iqA/0trauoKMUAIWltrevZVkOtCwxTiAWizNcmgCIorWtrSvoKAVAYZ7t7WsAsiwHWpYYpxGLxTwuvQUQOk8+uYZ5sizHN1qWGGcQi8ViLr2FhwjztTjGEmMeYrF4BC69hTNYYpyHWCy+Tf8HtSQafyR6lssAAAAASUVORK5CYII="},{"name":"Runite stone spirit","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAFIUlEQVRIDbXBX4hcVx0H8O/vnnvuzPwmmVxtNlEMnqUgc08bGvKgCMGahSElDylCS1dKt+SlSEUoDRZRikqtPogISvFx8UlX36pIoFIpbBR22Vr3QWYvde3eJ3t7N3XadM7O/XPm2AyM7jJ/Ni9+PsRK456ZJMYIqzbuDbHS/b0uxpqLGtOYJAbw4o3nMPLyT38GgFUbxyFWur/XJSKMsYpwlEniF288h6OkL7/345+wamMuYqX7e10iYhVhBpPE3/zGsxcfPF+v16WUQoiyLON//uNb338ZcKwizEasdH+vi5HmosY0JolvfP1rCwunA1/6vu95VJZVXhTffumHgGMVYTZipQGYZAeAc665qDHBJPHzzz5z5vSCvMsn8oqyKIryOz/4EeBYRZiNWGmM9fe6RMQqwlEmiZe/8uhD5x+QIx55RVm88N2XAMcqwlzESvf3us1FDaC/1yUiVhEmmCReXn46CKS1tigG6+uvp2kGOFYR5iJWGkB/rwuguahNssMqwgSTxMvLTwVBzVqb54Nbt15P0wxwrCLMRaw0RkyyA4BVhGlMEi8vPxUENWttURTr639M0wxwrCLMRaw0jmOSGBg+8cTTvh84V1lre733X3vtJuBYRZiLWGkcxyTxY4991fcDITxrh9ZW/X7/5s1XAccqwlzESuM4Jokff/xJKSURWVtZO6yqYn9//9atN1i1MRex0pjLJHEYtjqda1L6AOzQDW1lbWmM2djY7PUyVm3MRqw0ZjNJHIatpaWrMpDkCQ80hLO2srYqBoOtrb+kaQY4VhFmIFYas5kkDs8udL50RQay0F8ITpz0Zc0Nh2U+yP/8B2M+2t7eStOMVRszECuNGUwSh2HrypVH/aBWPXSJw/v8Wt0TgoTvbFWY/u3f/zLPi83N9V7vQ1ZtTEOsNCaYJAYQhq3OlWvSr5UXLnF4X715QtYaJAR5wrmhLfLBnQ/3X10tinxjY7PXy1i1MYFYaRxlkhgYhmHY6VyTUgop8flO/eSpgJuyVhcycA6Aq8qyyg/e++0virvyjY3NXi9j1cZRxErjEJPEQCsM0elcE0JI6X+weP4Tn1lshJ8MGuxL6fkBCAA5WxWm/+6vX6mqoiyLPB9sbf2118tYtXEIsdI4xCRxGLYuX34kCGrCF0L4H91/ITy32DhxKuCm50tPBiB8zFWVLfJ//ernZXFQVVWeF9vbmwDSNGPVxhix0hgzSRyGLQBLS1eDoOZ5RML3ZYAvPtI4eSposB/URa0G59xwOLRVeWDe/c0rtiyqyhZFfufOnd3dbppmgGMVYYRYaYyZJA7DFoClpatSSiEECSF8UV348smFTwcN9oOa5we4yw2HVf929v7vVm1VWWvzfGDMwdtv/z1NM8CxijBCrDTGTBKHYQvAww93gqAhhPA8OnPmU0Te/ucuNsPTst4QsgZgaMuDD/7d/NsbcO6dd3atLQ8OBoNBf3c3TtMMcKwijBArjUNMEodh69Kly0HQOHfuswA8DyCPiG7ff1GeaHkfE4Lf/JNzQziHsbfeejOOt9M0AxyrCGPESuMok8RhuLCych0jnocRD0T4L+cwYW1tNU0zwLGKMEasNI4ySRyGLaC2snIdI54HwMNca2uraZoBjlWEQ4iVxgSTxADCcGFl5TpGPA+Ah2nW1lYBpGkGOFYRjiJWGtOYZAcgjJw9u4Bp0jTD/zhWESYQK43ZTLKDuwjTOYyxijANsdK4BybZwQRWEY5DrDT+n/4D6No9f08nNrkAAAAASUVORK5CYII="},{"name":"Runite stone spirit","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAFFUlEQVRIDbXBX4hcVx0H8O/vnnvuzPw2mRxtNlEMnqUgc4+GhjwoQrBmYUjJQ4rQ0pXSLXkpUhGKQRGlqNTqg4igFB8Xn3T1rYoEKpXCRmGXrXUfZHKpa/c+2du7qdOmc3bunzPHZmB1l52ZzYufD7E2uG82TTDGuoP7Q6wNgMFOb27BYDqbJgCev/Ecxl786c8AsO7gOMTaDHZ6AIiIdYxJbJo8f+M5HCZD+b0f/4R1BzMRawNgsNMjItYxJrFp8o2vPXvxM+ebzaaUUghRVVXyz3986/svAp51jOmItQEw2OkREesYk9g0ufHVr8zPn45CGYZhEFBV1UVZfvuFHwKedYzpiLUBMNjpERHrGJPYNPn6s8+cOT0v7wmJgrIqy7L6zg9+BHjWMaYj1gbAYKdHRKxjTGLTZOlLjz50/tNyLKCgrMpvfvcFwLOOMROxNgAGOz0iYh1jCpsmS0tPR5F0zpXlcG3t1SzLAc86xkzE2gx2ehibWzCYwqbJ0tJTUdRwzhXF8NatV7MsBzzrGDMRawPAprcxxjrGJDZNlpaeiqKGc64sy7W1P2ZZDnjWMWYi1gbHsWkCjJ544ukwjLyvnXP9/ruvvHIT8KxjzESsDY5j0+Sxx74chpEQgXMj5+rBYHDz5suAZx1jJmJtcBybJo8//qSUkoicq50b1XW5u7t769ZrrDuYiVgbzGTTRKl2t3tNyhCAG/mRq52rrLXr6xv9fs66g+mItcF0Nk2Uai8uXpWRpEAEoBG8c7VzdTkcbm7+JctywLOOMQWxNpjOpok6O9/9whUZydJ8LjpxMpQNPxpVxbD48x+s/WBrazPLctYdTEGsDaawaaJU+8qVR8OoUT90idUDYaMZCEEi9K4u7eDO739ZFOXGxlq//z7rDiYh1gZH2DQBoFS7e+WaDBvVhUusHmjOnZCNFglBgfB+5MpiePf93ZdXyrJYX9/o93PWHRxBrA0Os2kCjJRS3e41KaWQEp/tNk+einhONppCRt4D8HVV1cXeO7/9RXlPsb6+0e/nrDs4jFgbHGDTBGgrhW73mhBCyvC9hfMf+cRCS300anEoZRBGIADkXV3awdu/fqmuy6oqi2K4ufnXfj9n3cEBxNrgAJsmSrUvX34kihoiFEKEHzx4QZ1baJ04FfFcEMpARiB8yNe1K4t//ernVblX13VRlFtbGwCyLGfdwT5ibbDPpolSbQCLi1ejqBEERCIMZYTPP9I6eSpqcRg1RaMB7/1oNHJ1tWff/s1Lrirr2pVlcffu3e3tXpblgGcdY4xYG+yzaaJUG8Di4lUppRCChBChqC988eT8x6MWh1EjCCPc40ejenAnf/d3K66unXNFMbR27803/55lOeBZxxgj1gb7bJoo1Qbw8MPdKGoJIYKAzpz5GFGw+6mLc+q0bLaEbAAYuWrvvX/P/e01eP/WW9vOVXt7w+FwsL2dZFkOeNYxxoi1wQE2TZRqX7p0OYpa5859EkAQABQQ0Z0HL8oT7eBDQvDrf/J+BO+x7403Xk+SrSzLAc86xj5ibXCYTROl5peXr2MsCDAWgAj/5T2OWF1dybIc8Kxj7CPWBofZNFGqDTSWl69jLAgABJhpdXUly3LAs45xALE2OMKmCQCl5peXr2MsCAAEmGR1dQVAluWAZx3jMGJtMIlNbwOEsbNn5zFJluX4H886xhHE2mA6m97GPYTJPPaxjjEJsTa4Dza9jSNYxzgOsTb4f/oPDag0f5UqRuAAAAAASUVORK5CYII="},{"name":"Air rune","base64":"data:image/png;base64,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"},{"name":"Water rune","base64":"data:image/png;base64,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"},{"name":"Earth rune","base64":"data:image/png;base64,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"},{"name":"Fire rune","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAF/ElEQVRIDbXB7YuldRkH8O/1va7rd+77us+ZPTvr7uS28Jtgas4tJNETsfhi1dXcFxa67bq6Pmy2T45P465mlmAUZgVb5i6Y+BRZSFm9kEAUISjsP4jZQ0FzRxJZSFBz9yKY05ljAy666r7o85HINd5N2wxxFpHn8Y4kcg1gZXmpmq3xFm0zBPCjR08pSVXlhFKpJFV5xd7rIs/j7CRyvbK8BEBEIg+wrm2GAJ54+ISSQppyjSqFpFBICqlutmvffgCR5/F2JHINYGV5SUQiDwC0zRDA9x76ejJX5ZgIKSIUjglJEZJCUzU3U3Ozy/fsAxB5HmeSyDWAleUlEYk8aJvhQ/ffl1Jyd4qQFAqFpIhQRJQinBBSRM1ScjczNTe75Oo9kefxJhK5BrCyvCQigHz1nmOdonB3ipAUEQpJUAiSIiSFQiFFOGGmyVNK7uZmdunVeyLPY51ErgGsLC+JyN233lIWa/gGEa4REQpJCCndk9/89+JXSKFQSIoI6WYpeRSlu1++Zx8wijzAhESuAawsL4nIsVsOl0Xp7hShKkkR2fr0qdcOLVKE5PT3TwD45233UkRIoZTfffA/dz9AobullLpV5W6Xf25f5HlMSOR6ZXkJE4tHDkVZkEohKUJSmH/82KsHbhUKhe978hEArx89TlJEKNI79a32zi9zws0ioldV5nbZ7msizwOQyDWAtjmNiWMLRylCUqmkfOi5H2DiTzccoXDbDx/FxN8OLZLc9Nh3MPGv2+8VoZBFSr1et4rYdc1+YBR5IJHrthnuvnJXFd1uRHKnilApQuUFP38GE3+89uAHnn0C6/5y8+0UmXnyEUz8Y+EeEaEIyYiy1+1WEVfsvS7yvESu22b4mU9fNtXrVd1wS0qhkMoLn38W6/5wzc1zP3kK6149cKuIbH36FCZeP3pMhGPu1vFOVZVRxpX7bwRGErlum+GunZf0e71ut3Jzqojox194Dufi9aPHSC06HVWtoowyPnvDAWAkkeu2Ge7ccdH0VL/brcxMVSn85Eu/wLn4++G7VDXKUkTKoqyivOqmm4GRRK7bZrhj+6c2btzY63aTK0VFZfvLz+NcvHZo0U27UYGS3KuI3QcOAiOJXLfNcPsnPrZpeuOG3pS5UlSVF/3qlzgXrx28M7lX3UogSkbE3i8cBkYSuW6b4Uc/cuHm6en+1FRKJqKq3PHrF3Au/nrwzqLT6UYlAhEpymLfwaPASCLXbTP88PwHN23eNFX1qghVkkqVi3/zIt6bV29aULOqXKOkiCT3a48sACOJXLfNcGZm8/vPP396aqrX66XkSlWVnb99Ge/Nn29aMNNeVbm7qpkqyetvuQ0YSeS6bYbA6uzs7Mz0dL/f71UVVVR0jMpLX3kJZ/f7vZ83VXM3s6oMc3U1HTO9ceEOYCSRawBtMwRWL5ifm+5v2rBhQ9FxFX2DqV78yot4O7+76nq3Ne6extzdVNXGDi4eB0aRBxK5BtA2Q2C13+/Pbt3an57uRaSOq6rp/1DVRMdIoapyTFXp5m5qbuYp2YSqmR05/kVgFHkgkWtMtM0QWN02M7Pl/C3d6JVFUXbW6DpTIVWppFBVSTNL7jpGdXdzc1tzx333A6PIAwASucZE2wyBVQAzMzNb+v3eVBVltyyKTtFJbjpB0TFTJWmqNJqaKc3czdzdJu66/wFgFHkAQCLXWNc2Q2AVQL/fnznvvP7UVBVRRuHqZqbrTNVMzUzVTGlmyd3M3M09felrDwKjyANMSOQa69pmCKxiog/MzM1NdbtVt5vM1MxV1cxdTd3MkqvSxpKbuSf35P7At08Ao8gDrJPINd6kbYZYs4qJubnZjd2+u5t7MvOUOu7m5mrmbqbJ3FPqdFLH/RsPnwRGkQd4E4lc40xtcxoQrFkFMDs7G51OUZbR8eQdTym5peSmnpIVnWLs5ONPYc0o8gBnksg13k7bnAZk28xmc4+qKlIqiiK5p5TUzF3dUpTlMz/9GdaMAEQe4C0kco2za5sh3sUIQOQBzkIi13hHbXMaZxd5gHckkWv8P/0XgVQtl4kg9r0AAAAASUVORK5CYII="},{"name":"Body rune","base64":"data:image/png;base64,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"},{"name":"Mind rune","base64":"data:image/png;base64,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"},{"name":"Chaos rune","base64":"data:image/png;base64,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"},{"name":"Death rune","base64":"data:image/png;base64,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"},{"name":"Cosmic rune","base64":"data:image/png;base64,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"},{"name":"Law rune","base64":"data:image/png;base64,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"},{"name":"Nature rune","base64":"data:image/png;base64,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"},{"name":"Large plated rune salvage","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAADpklEQVRIDbXB32uWdRjH8fd1035dM0grIkm/soTn+Z6FEILIkE6DToToYCCZGPMkGIn9Bx0VhlCB0aKioA4iqIPSAxlDECmiyHbHim7U6JdFOO/90Pv69Oyx0cRtzYO9XuYps5HMU2YjmafMRjJPmTtRVyVdnlqsg3nKrENdlXS1HnucCIjyzGeApxZrMk+ZNdVVCTzyxFONBEFACKIJobjw+ceeWqzOPGVWUVcl8OiTz4CAJqKnpy8iIK7PzxFC0UTzzacfemqxCvOUWUldlbtHRukw+voGIoSEFBEoQHPzc0SDRMSXH73rqcVKzFPmNnVV7n36Obru6nduCoUaJKRAhK7P1aEghOL8B296anEb85S5VV2Vw4efp6u3z1kmJCSkUBAKNTdmrzUSEaE4//5JTy1uZZ4yS+qqBPaNHsOK3v5BVqToICIkIhZmZ0IimkY6986rIE9tljFPma66KveNvoAVhRlWYNY34NwqJCTUER0ooomFuWtEhALp7FsnPLVYxjxloK7KXfsP3PPgNsyKosAMs8KKnoFBEDdJSAHEIhQKoehYmJ1BCgVNTI6/4qnFEvOU6aqrctf+A1u2DxVmUGAdYNbnmySBkBABSCiiCRQdSPOzM0jRNCgmTr4E8tSmyzxluuqq3DNyZNMDW7FFmBVmFAXQ1z8YCIEE6kBCioj52RkiogkUoaCJS99+MT152lOLLvOUWVJX5Z6RI3dv3V6YURhWFAZY78CgAAkJFAJpvp5BjUIoFjWBIhSEzrz2IshTGzBPmWXqqtw9Mnpf2okZiwyjgF7fFBIChDQ3O4NEE6FQBBF//3KZJefeex3kqQ2Yp8wydVXuHhnt6R3Y/NA2MDrM6DDr7d+EtDB7FRQCKRRE/H35Il3NjetXf7t04fQnIE9tusxT5lZ1Ve49OAZs3r7D6DDM6DBDAnUgofjrYhVNA5x9+wT/kac2S8xT5jZ1Ve49OLYlDWFGh1Fg/EshkP78aRqYHD/OIrHEU5tlzFNmJXVVDh8a27JjJxgGGEv+mJ4CJsePs0iApzarME+ZVdRVOXxo7N6hFouMris/TkUTk+PHQYCnNmsyT5nV1VW579ljm3c8TNeVH0rQxBsvgzy1WQfzlFlTXZXDh4/eP9T6ffq7X7//upw4BfLUZn3MU+b/1FU5fPjoz1NfTU+cAnlqs27mKbMOdVWySJ7a3AnzlFmfupry1OYOmafMRjJPmY1knjIbyTxlNpJ5ymykfwAuaBt/X6bq4wAAAABJRU5ErkJggg=="},{"name":"Large plated rune salvage","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAD8ElEQVRIDbXB32vVdRzH8ef7284522cT0pLI0o8s4ZzvnQghiQzpNuhGiC4Gkokxb4KR2H/QVWEIFRgtKgrqIoK6KL2QMQSRIops31jRFzX6ZSFu3+2cs+/71TnHRhtua17s8bAQUzaThZiymSzElM1kIabcjSLP6AmxzgZYiCkbUOQZPfXHn8AdPLvwORBinXVZiCnrKvIM2Pvk06UEjoMLvHQhv/LFJyHWWZuFmLKGIs+AR596FgSU7pVKzd3B280FXMhLL7/97KMQ66zBQkxZTZFn+0fH6DBqtQF3ISG5O3LQQnMBL5Fw/+rj90KssxoLMeUORZ4dfOZ5evr6A7e5XCUSkiNc7YXC5biQX/7wrRDr3MFCTFmpyLOR4y/QU60FlnEJCcnluFzl4vxcKeHu8ssfnA2xzkoWYsqSIs+AQ2OnsKTaP8iq5B24u4R7a37WJbwspUvvvgYKscEyFmJKT5Fnh8ZexJLEDEswqw0EVnIJCXV4B3IvvbUwh7vLkS6+fSbEOstYiClQ5Nm+w0fufXAnZkmSYIZZYkllYBDEbRKSA96FXC7kHa35WSSXU/rUxKsh1lliIab0FHm27/CRbbuGEzNIsA4wq4UhSSAkhAMSci8deQdSc34WycsS+eTZl0EhNuixEFN6ijw7MHpi6IEdWBdmiRlJAtT6Bx0hkEAdSEju3pyfxd1LR+5ySr/23ZczU+dDrNNjIaYsKfLswOiJLTt2JWYkhiWJAVYdGBQgIYFcIDWLWVTKhbyrdOQux3Xh9ZdAITYACzFlmSLP9o+O3R/3YEaXYSRQDUMuIUBIC/OzSJTucrnjfvPX6yy59P4boBAbgIWYskyRZ/tHxyrVga0P7wSjw4wOs2r/EFJr/hbIBZLLcb95/So95WL71u/Xrpz/FBRigx4LMWWlIs8OHh0Htu7abXQYZnSYIYE6kJD/fTX3sgQuvnOG/yjEBkssxJQ7FHl28Oj4tjiMGR1GgvEvuUD66+cZYGriNF1iSYgNlrEQU1ZT5NnIsfFtu/eAYYCx5M+ZaWBq4jRdAkJssAYLMWUNRZ6NHBu/b7hOl9Fz46dpL31q4jQICLHBuizElLUVeXbouVNbdz9Cz40fM9Dkm6+AQmywARZiyrqKPBs5fnL7cP2Pme9/++GbbPIcKMQGG2MhpvyfIs9Gjp/8ZfrrmclzoBAbbJiFmLIBRZ7RpRAb3A0LMWVjinw6xAZ3yUJM2UwWYspmshBTNpPFvY+xmWxg+0NlKV9sA9ZX6Utot9rVWrUysMVbRTFXANVaddHpH9zSnJ8rW021W9VKdRGSShWpbDfNkqSv0nePAYulQuiX1CoK+vr+AQcVRJz5g8WhAAAAAElFTkSuQmCC"},{"name":"Huge plated rune salvage","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAElUlEQVRIDbXB0YucVwHG4d+ZnZ2ZnKUmsRalaXuSmjjfJwgilOJSltx5Kd70QlKQNjawF16slIJ/gSDGQsEiBiuhF4JCoSgi9KIsISA0VVhY+2HFfhqpYGsVs2d2Z/a8rzOTLOw23doIeZ4QU83dFGKquUO5bdgnpiGHCzHVfAy5bdjz+a98FRupyEjNa7+OacghQkw1Hym3DfDp02dOfOFR2agUGxWkImMhb776SkxDPkyIqeYQuW2AR79+QRYydlHBRmVhsTfZzsVGQi4qm795OaYhtwkx1dwmtw2w/I1vgZGwCyx2e1iSUSkSLjvbIyykYiNt/OrnMQ05KMRUs09uG2Dlm98GZIORu/0Bsiw0g6UirGJNtjO2JCyk37/ys5iG7BNiqtmT22blwrMdoBOAbm8AloyNhS2bIrlgqQhrZ5Sxiwo28hsvXwbHVLEnxFQzl9vm7Op3mAqhAwS6vSPYYNlYyLKxppDlgmYm21kWMlaR3vjFT2MasifEVAO5bb70tXPHTpwiAIGpDou9I9hgG2xsLNloBkuWStkdbRUbSRbyO5u/u75xLaYhcyGmGsht88jjTx29/0FuCgHoD6JkbLBsbDyDNYXmLEoZjzIuxUb628br1zeugWOqgBBTDeS2eeTxp44/cJKbQmBucRDB2LKRsWQj2ZrCUhHWeLQlCRmXYv/2pRfAMVVAiKlmLrfN8rnVez5zggAE5npHlsDYkrGxJWFN2UaSRSnj7S1ZFMlGvnr5eXBMFRBiqpnLbbN8bvWe+x8i0GEqMNVhsb+EZRtLBgtZKpKwLGNNjUc3sFSM9fbrV65vXItpCISYauZy2yw/sXr0gVME5gJz/UHElo1lG0sGSRZFckG2NR5tSQVbEvKVn/wAHFMVYqrZk9tm+dzq8ZOnOWhxELGwJeMpYUnGUhHW1M7oBjZFsrDWf/x9cExViKlmT26b5SdW7z15hjlBh5nukSVsPCVsyXhKO/kGkiwkFWHJwpbK+o++B46pCjHV7JPbZuX82tETiYN6gyVZGKztfANrCsk2kiw0gy0L6bUXvguOqQox1eyT22bl/NqxB09hZgI39QZLtsf5P7KxsWRTJMsSkiw05e333wWuvvRDcExViKnmoNw2K+fXjj30WT7AU8LGkkGSRdG/37nOTSrM/evvf9l89ZfgmKoQU81BuW0ee3LtUw+f5pYAxoBlsCxjvf/Xt1UKc1cvP88HOaYKCDHV3Ca3zcr5tU+e+hz72diy//nnPzJ35cXnuMUcFFPFXIip5ja5bR57cu2+MxVmj23efesPwJUXn+MWMxdTxSFCTDUfJrfN2QvPHj95Ggy896c3gfVLF5kxczFV/C8hpppD5LY5+/Qz9z48/Mdbm8D6pYtgIKaKjy3EVHOI3DZnn35GKuuXLjLjmCruUIip5nC5bZgxEFPFnQsx1Xyk3L4ZU8X/K8RUczeFmGruppC++GXuptD9xH2dbqff6+9MdjHdhdDpLmp3srDYX+gQQmdra9TvLUguOzu7NtAb9DsLXe1OtDsJC93xeNLv9wngmcl4Yrs/6I93xrb/C1q9iJbuGo2SAAAAAElFTkSuQmCC"}],"prifddinas":[{"name":"Blank","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAM0lEQVRYR+3QMQ0AAAjAMHgxwY1/gSCDp1OwNKtn47E0QIAAAQIECBAgQIAAAQIECHwLHNXiKkGmss7lAAAAAElFTkSuQmCC"},{"name":"Uncut dragonstone","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAEAElEQVRIDbXBz24bVRTA4d+54yjohj+zYX2zy9wH4A0QUh+hIRV9C9LmZdiyrVpZiC5YIEtVJbbO7DxCApqmyXVqj5PxzDnEVi1spYUgNd8nPkTukvgQp6MhKzu7kY9KfIjT0VBEWPGh4OMRH+J0NBQRHwrugPgQp6MhSzu7kf9SV6UPe9ya+BCBujoGzGxnN7Kmrko2fcXXL3kO+LDHLYgPkZXpaCgiPhR1VbL0Dd/yDwNR7IwT4Dees+TDHh8mPsTpaLizG4HpaCgiIA/yozY15Nmb9LtiSgc4xJEBSjfmTYdlCPCSnwEf9ngf8SEC09EQ2NmNdXUMcpAfKZ0lk1wysldppHTgAKVzZA5pmCk2owYFe8lzH/a4QXyILNXVMeBDUVflg/wI6OgsWS/vASmdXFEDiikd0NKAOK5l4H7hRzAfCjaJD5FNdVUe5I8FMbRL816+beg4nSo651IxUKClYcGxIA2TAX0f9tgkPkTW1FW5nx86nCCGzVOzlW+dpxMWDGTODARouGJBwGZMMxjQB/OhYI34EFlTV+V+fmjJJBeHm6fGIRecAUrXoRluTuOQhisWZMZEUQcv+AnMh4I14kNkTV2V+/kjMMDhFAXG6YQFcThFgStmLQ3INj7xFwsOeEHfhz3WiA+RNXVVPsiPDAUUc4jgUjoRnKGKOURRsClpm88SJ6xkMKAP5kPBivgQWVNX5UH+WFHAUid51qX5hKR0PbZYUkxpr5gBl0xY6lDgBX0wHwpWxIfImroq9/NDw0AEMrI2tRe8ntNmOIdzZErnyM559QVfnvMHON7RAX0wHwpWxIfIproq7+eHpA6c5A4MGKfXYCxIS/uW80/5bIvtKRcNU3As6IA+mA8FK+JDZFNdlfv5I8NIBh1kWe7G6QxQWrAxp57Pwbb4ZMbkkgnv6IA+mA8FK+JDZFNdlQf5IxBFLXWKZXlvks4Bo7tipljGlmEtV4CiDRMW3IBnYD4UrIgPkRvqqrzP95K7DNekS4eb8tYhNRdKp5hDHL2GOSgY6IxZhhvwDMyHghXxIXJDXZX7+SHgcF1qIANeMeqRKSgKBqI0kPGOa5gOeArmQ8GK+BC5oa7K/fzQIR0mcJ7+dGSAoh0tGEstrXJNHc4hNZMBT8F8KFgRHyI31FV5Pz/MkC61b3gFCBgdZICAQxR7y5nDAco1HfAEHJgPBSviQ+R96qoE7vEQzNEDAQNR1LEw5hREMegcGfArT8B8KFgjPkQ+oK6OQVi6x3cKjmvicGNOlWsKDhjwhAXzoWCT+BD5V3V1zIKwdI+HQJ8f2GCADwU3iA+R26mrYxaEBWONDwUfID5E/qe6Ovah4HbEh8hdEh8id0l8iNylvwGSpe1wgIp9hQAAAABJRU5ErkJggg=="},{"name":"Uncut dragonstone","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAD2klEQVRIDbXBQW4TVxjA8f/3ZpyUR1uN1AO8pecdoFdohXoCKGZBz1BVNA1H6b67NgpCCKkrZKnKBTKLLmYBEQk442A/e+yZ95WxZMmWSRUW+f3EOs9tEus8t0ms89wmsc5zm8Q6z+cIZWFdnxsT6zzXC2XBtm/5/oQXgHV9bkCs8+wIZcHKd/wopIDSRNSQApecASe8ZMW6PtcT6zzbQlkMskOITdW85wxiJEZiSgoIyZL6A5cQWTnhJWBdn08R6zzbQlk8yp4qaNVIZgTzpvrX8JEAkWhIgTkTA1OmrJzwwro+O8Q6z7ZQFoPsUDBKVKIhUbSqzmsmIBGNtKANS0MCGBLQv/kD1LqcbWKdZ1soi0fZU0VBm6pJsz2I4+qiJS6poY3Q0Bg6kRYEzILpkGPr+mwT6zwbQlnc55c06wkGWFazNLszqt6AgCakgSuDAbMgGJIIBuZMIBlyBGpdzgaxzrMhlMUgO1AQOk21ENIPjIBI09CkpDXzhLRmDtGQTBlHInDCC1DrcjaIdZ4NoSwG2SFIWy32si/qai6ZjKtzwGCERNFIWxOASLvP3TFvgZaYYIY8s67PBrHOsyGUxSA7hAi0xJQecFW9A1paVgRamhmTfe6MeJtgQOjokGeg1uWsiXWeDaEsBtlvgKJt1URaRaeMQRN6BhOJBlmymDExSCDQaVkZ8gzUupw1sc6zIZTFg+wJFSYTQ89ARN9XrxualBTosb9k0WNvxNlXfHPJGZ0EWpAhx6DW5ayJdZ5toSweZE+0UiDNEkVBLqtziGAMpqEeM/qSr3vsT7laEEBAQYYcg1qXsybWebaFsniYHQDLqjYkadYDxtU7QGkjOubiLpmi++zPmAYmEIGW9h+eg1qXsybWebaFshhkByAJSV3V0CbZ3lX13iAtsWYKmtCLaEsNRHTOlI4ZcgRqXc6aWOfZEcriYXYgfCRNVQtpYAwyY6I0kRaShHTJPPJRhHbGLKE35AjUupw1sc6zI5TFw+xXECFpqplkqVbNBa8NBjSirDQsAYMBDElgMuQI1LqcNbHOsyOUxSA7VCIgyKg6oyOgDY2iEMFEmkhLRwxJYDzkGNS6nDWxzrMjlMV9fk6zPUUvqtcpaaSNKGuGBOIHRiBgoI0w5E8woNblrIl1nk8JZQH8wE8RTelBBBNpQenImHND2tAAhs4rjkCty9kg1nmuEcpTEFbu8RgwCB0Zcw4SUcAgr/iLjlqXs02s8/yvUJ7SEVbu8Rh4zu9sUcC6nB1inedmQnlKR+goG6zLuYZY5/lMoTy1LudmxDrPbRLrPLdJrPPcpv8AlbfQcFv3wScAAAAASUVORK5CYII="},{"name":"Uncut dragonstone","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAEG0lEQVRIDbXBQWobVxjA8f/3ZmQ3z20Z6AGed553gF6hJfQESaMs0jOUkrrOUbrvrjUOIQS6CoLiA8izKGgWiYmd2CNH82RZM+9rRiCQcNKmEP9+Yp3nJol1vh4NWdra9nxSYp2vR0MRYcm6nE9HrPP1aCgi1uXcALHO16MhC1vbnv8SysK6HT6aWOeBUB4Bqrq17VkRyoJ1X/PtIU8B63b4CGKdZ6keDUXEujyUBQvf8L2QAkoTUUMKnHMMHPKMBet2+DCxztej4da2B+rRUERA+tkexKZq3nAMMRIjMSUFhGTO7C3nEFk45Blg3Q7vI9Z5oB4Nga1tH8ojkPvZIwWtGsmMYF5WfxveESASDSlwycRATc3CIU+t2+Easc6zEMojwLo8lEU/2xOMEpVoSBStqpMZE5CIRlrQhrkhAQwJ6J/8BmpdzjqxzrMulMX97JGioE3VpNkGxHF12hLnzKCN0NAYOpEWBMwV9YAD63ZYJ9Z5VoSyuMNPadYTDDCvpml266x6CQKakAYuDAbMFcGQRDBwyQSSAfug1uWsEOs8K0JZ9LNdBaHTVFdC+pYzINI0NCnpjMuEdMYlRENSM45E4JCnoNblrBDrPCtCWfSzPZC2utrIPptVl5LJuDoBDEZIFI20MwIQaTfZGvMKaIkJZsBj63ZYIdZ5VoSy6Gd7EIGWmNIDLqrXQEvLgkBLM2Wyya0zXiUYEDo64DGodTlLYp1nRSiLfvYLoGhbNZFW0ZoxaELPYCLRIHOupkwMEgh0WhYGPAa1LmdJrPOsCGVxN3tIhcnE0DMQ0TfVi4YmJQV6bM656rFxxvEXfHXOMZ0EWpABB6DW5SyJdZ51oSzuZg+1UiDNEkVBzqsTiGAMpmE25uxzvuyxWXNxRQABBRlwAGpdzpJY51kXyuJetgvMq5khSbMeMK5eA0ob0TGnW2SKbrI5pQ5MIAIt7V88AbUuZ0ms86wLZdHPdkESklk1gzbJNi6qNwZpiTNq0IReRFtmQEQvqemYAfug1uUsiXWea0JZ3Mt2hXekqWZCGhiDTJkoTaSFJCGdcxl5J0I7ZZrQG7APal3OkljnuSaUxb3sZxAhaaqpZKlWzSkvDAY0oiw0zAGDAQxJYDJgH9S6nCWxznNNKIt+tqdEQJCz6piOgDY0ikIEE2kiLR0xJIHxgANQ63KWxDrPNaEs7vBjmm0oelq9SEkjbURZMiQQ33IGAgbaCAN+BwNqXc6SWOd5n1AWwHf8ENGUHkQwkRaUjow5MaQNDWDoPGcf1LqcFWKd5wNCeQTCwm0eAAahI2NOQCIKGOQ5f9BR63LWiXWefxXKIzrCwm0eAE/4lTUKWJdzjVjn+TihPKIjdJQV1uV8gFjn+Z9CeWRdzscR6zw3Sazz3CSxznOT/gGife5wow5uhgAAAABJRU5ErkJggg=="},{"name":"Uncut dragonstone","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAD0klEQVRIDbXB3Woc1wEA4O+cmZXKMaQLfYBzqZ0n6CPkwm9QYuPglwh1ojxJ73vZGJli6FUwAr+BF3oz4CaOY9kjSx797M45RS4LWhQX50LfF1Lu3KaQcuc2hZQ7tymk3LlNIeXO7zH2y5T3fLaQcufTxn5p2599+dxTpLznM4SUOzeM/dJHX/oqaqKwsqYGTRTeeoXnnvoo5T2fFlLubBv75YP5flGL1dHwc1GriRq0iMJkdewdpShRfO4pUt7zW0LKnW1jv/x6/n1VJ1OjCcJ/hn8jaFBNQRs5c0I888GV8tzTlPfcEFLubBv75YP5fhCrUpRGW5VheH3mlFhN1KKsXUYzSmtWlH/5OzXlhW0h5c62sV9+Pf++qpisGjMMw+uiXjivJmqxJlDXShRx7sOhg5T3bAspd64Z++VX829as6DBhfNdu0fDT8SqNNrR+6CJwpmx1RQ1CqOTqHnmMTXlhWtCyp1rxn55f/4dlYC1VSOeDEeFyZopai6cN9qV86JEzeh4UojP/ZOa8sI1IeXONWO/fDDfx2Q9s3vpPIhvh1dotFGkTMqFEcW0K73ziyuFeOhJynuuCSl3rhn75YP5flFRldYMw/Aa1USgEibrMye77rzziysNBYcOqCkvbISUO9eM/fL+/LsoFKVYTybq6XBclJmdIFSVMLk8cxrF0SmK4qNDB9SUFzZCyp1rxn55b/5XAlo7rtQ3w8u1VWuG1s7aqjV759UX/vTGz4iaYsKhA2rKCxsh5c62sV/emz+qCqKmqkEYhl+rddBGYeXy2NEdf9yx88HJuQ9ECg4dUFNe2Agpd7aN/fLe/BHWLhtNawfD8CuKQhm8ueMLzPzh3OnopPif6dATasoLGyHlzraxX96ffxvFoFk5L2qrfT+8daWcGatpZpeycomijE6jiGceU1Ne2Agpd24Y++X9+beEKFy6aDSnw3EUR+8nayqhMVs5pxaK6dJZ1DzzmJrywkZIuXPD2C/vzR8RWs2F80Y7Wb8ZXgZNNdlYuyRGAVEcnT7zmJrywkZIuXPD2C8fzPcnE4J4NPwUhSBMSrFGUQnVupgQRcKp40MH1JQXNkLKnRvGfvmX+TetWVXeDC+jlkpBUaNAQz1xRHSlFPWZfxCpKS9shJQ7v2Xsl7jrIWbaQqRQTQjC4HXUrK0RBfzoB2rKC9eElDufMPYvCD6666GNKB57TSwmQuRHP7hSU17YFlLu/F9j/8KV4KO7HuKJv9lSkfLCDSHlzucZ+xeuBFeqa1Je+ISQcud3GvsXKS98npBy5zaFlDu3KaTcuU3/BVTgy3Cb6OGvAAAAAElFTkSuQmCC"},{"name":"Uncut diamond","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAFD0lEQVRIDbXBzW8bxxkH4N87u7Okh05yiZFLg9FNO39XgfZaoEDRc9oIkFsnUuzYTQxfW7SObVVtgRYIUkPIKYfcCnKtyuLIsiJFpkR9cCju7rxvRQEESCgOXMB+HjLW4U0iYx2AQbcNoDXn8LqRsW7QbbfmXPAdEWnNObxWZKwDEHzH2HzQbRORsTleHzLWARh02wBacy74jrE5Xi74wth5vDIy1uFC8B0Rac05TAm+wKxf/OynS5/fA2DsPF4BGeswMei2icjYPPgCF5YXPkhVSoSyqmuuszQjRf/deApg+e49XDB2Hi9HxrpBt92acwAG3TYRAbT2txWueVSNnmw8ZeGqroU5yzKAEkXDs7Pn3+0KM0MUaPnuPQDGzuOHkLEOwKDbBtCac8F3APr6H6tSc1VXaZqqNPnm228BShIFUFWXmc6IqHdwkKSq1zskRRJ56fN7xs7jEjLW4ULwHQDG5sEXa6uPEkoixxg5a+gY+emWPzo+AiiOMYNHwzOdaWHROoscf/3Bh4AYm2MWGeswK/ji67//lVnAMirLpmkws9/erqs4CIMYI4uUVUVEIhLrSIrO9fv9xZu3jZ3HLDLWYUrwxb/u/6mZNdI0BeHk5PRqyxQbmxiTTOu9F/s6zRTR8clJqlNmVkq96PV0qheWPgHE2BxTyFiHKcEXj1cfShQigsJweKbTdHtnByJVWVd1rbU+CaeZ1qeDwBxTrff2vo8cSdHHd+4CYmyOKWSsw5Tgi7XVR0Q0Ohu1rrZOTk+VSja9F4hO0lSnsY6RuX98JBBmfrv11ka3CyAyJ4n63a07xs5jChnrMCX4Ym11hYUB1DFeaTQA+GfPAJRVBRAAAqqqetE/fOettze6XSIoUoAIcP3mbUCMzTFBxjpMCb54vPqQGEIyqspYMUvc3d+XKM1mg0hxHZVSZ6Ozg6M+kTrs9wUS64gL12/dBsTYHBNkrMOU4IsvH/wFIEVoZE0iMKSz/mQ0KhtZBkHzypXRaNTMGuubG+//5P1ifR2ETOuyrCihxeVPATE2xwQZ6zAr+OLLB/dZGCKZzlgikdr0W7GOSZokSoXh2fPdnWvvvttqmf39F4f9I0pIolBCi8ufAmJsjgky1mFW8MVXK18AGA7P0iS50mwKsLW9DaCqahH4Z1vvXbvGIldbptc/PDg4FMG5Kta/v3UHEGNzTJCxDrOCLx6vPCQFnerTwSAyNxuN5zvfgVDHeHR8zMzNRkNEBmEIAjP3Dg4SlRBhYekmIMbmmCBjHS4Jvvj3ygMaQxgOdZru93og6vUOqrquOSakmjo7HQaWc1zX9dHxSab1wtJNQIzNMUHGOlwSfPHVo/tEpHV6cjrQaVbV5X+KQqdZjJElAiDQaDQipRKlhJGk6rDf//DjTwAxNscEGetwSfDF2upKzTUApdST9Q2VKCIVY12WpQhYmEBlWUZhMFSikkTt7n1//dZtQIzNMUHGOlwSfPHPP/+x2Wgyx/aTdZ1qFubIIME5glKJRNnZ26UxRB5bWFoGFCDG5pggYx1+SPAFgM8+ui4izbQhEFIUWUQiQOc2uz7TelSVIkgSJSK//WgZEGNzTCFjHV4i+A5AuPDZjUUBiEkpRSn5rWcEqmNUis795sYSxsTYHLPIWIcfFXwHY4QLf7ixSKCf//JXmCEAjM1xCRnr8GqC72CMMCaYYmyOlyBjHf5PwXeMzfFqyFiHN4mMdXiTyFiHN+l/XojTfwg8onkAAAAASUVORK5CYII="},{"name":"Uncut diamond","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAEuUlEQVRIDbXBvW8cRRgH4N87O7N3GQdoiGhAU3r370KCFgkJUfNhyYGATUICRGlBEJIYAxJICCKLioIO4Y1x7HEcY+Ocff7au92deV98lk66kxMUCj8PWZfjLJF1Oc4SWZfjLJF1Oc4SWZfj/yh9Yd0knhpZl+PJSl9g3GuvvDzz2Q0A1k3iKZB1OU4pfYETs1NvaaWJUDchcEh1Sor+Wr4PYPb6DZywbhJPRtblGFf6YuHbOQ5cNdW95fss3IQgzGmaApQo6vX7D//eFGaGKNDs9RsArJvE45B1OcaVvvj1+3kJ3IRGa6108tvvvwOUJAqgJtSpSYmos7OTaNXp7JIiiTzz2Q3rJnEKWZdjXOmLhfk7CSWRY4yctkyMfH/N7+3vARQHmMFVr29SIyzGpJHjm2+9C4h1GcaRdTnGlb749btvmAUsVV23bYuZ/fp6aOJReRRjZJG6aYhIRGKIpOhYt9udvnzVukmMI+tyjCh98ePNL9ppS2sNwsHB4fkJWyyvYEBSY7YebRudKqL9gwNtNDMrpR51OkabqZmPALEuwwiyLseI0hd3529LFCKCQq/XN1qvb2xApKlDE4Ix5qA8TI05PCqZozZma+ufyJEUfXjtOiDWZRhB1uUYUfpiYf4OEVX9auL8xMHhoVLJivcCMYnWRscQI3N3f08gzPzsxDPLq6sAInOSqPeuXLNuEiPIuhwjSl8szM+xMIAQ47lWC4B/8ABA3TQAASCgaZpH3d3nnnl2eXWVCIoUIAJcvHwVEOsyDJF1OUaUvrg7f5sYQlI1dWyYJW5ub0uUdrtFpDhEpVS/6u/sdYnUbrcrkBgiTly8chUQ6zIMkXU5RpS++OnWVwApQittE4Ehi0v3qqpupSkE7XPnqqpqp62lleWXXnypWFoCITWmrhtKaHr2Y0CsyzBE1uUYV/rip1s3WRgiqUlZIpFa8WsxxEQniVJlr/9wc+PC889PTNjt7Ue73T1KSKJQQtOzHwNiXYYhsi7HuNIXP899DaDX6+skOdduC7C2vg6gaYII/IO1Fy5cYJHzE7bT3d3Z2RXBsSaG969cA8S6DENkXY5xpS/uzt0mBaPN4dFRZG63Wg83/gYhxLi3v8/M7VZLRI7KHgjM3NnZSVRChKmZy4BYl2GIrMtxSumLX+Zu0QDKXs9ovd3pgKjT2WlCCBwTUm2THvZKlmMcQtjbP0iNmZq5DIh1GYbIuhynlL74+c5NIjJGHxweGZ02of6jKIxOY4wsEQCBqqoipRKlhJFotdvtvvvhR4BYl2GIrMtxSumLhfm5wAGAUure0rJKFJGKMdR1LQIWJlBd11EYDJWoJFGbW/9cvHIVEOsyDJF1OU4pffHDl5+3W23m+Oe9JaMNC3NkkOAYQalEomxsbdIAIg9MzcwCChDrMgyRdTkep/QFgE8/uCgibd0SCCmKLCIRoGMrqz41pmpqESSJEpF3PpgFxLoMI8i6HE9Q+kWAcOLTS9MCEJNSijT5tQcECjEqRcfevjSDAbEuwziyLsd/Kv0iBggnPrk0TaBXX38DYwSAdRlOIetyPJ3SL2KAMCAYYV2GJyDrcvxPpV+0LsPTIetynCWyLsdZIutynKV/ARMoqX8UjUQPAAAAAElFTkSuQmCC"},{"name":"Uncut ruby","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAADjklEQVRIDbXBUW4bxwEA0DdDMk5HKLHoBUZ/2r1HL9EP36GFHedA+e2vYLjwPSR+VQsUcGIn7tQON4pF7hQjiAgFxYUL2O+FlAdfUkh5wPbqAieng88tpDxsry5OTodpvKy1npwOPquQ8oBpvEy5315dhBBS7n0+IeUB26sLnJwO03iZcu/jpnGT8plPFlIe3JrGy1rryengyDRu3Pfnbn5ZIlI+8wlCyoOD7dVFCCHlfho3bv2lmwORG/asNG80L0t0K+UzHxdSHrZXFyenA7ZXFyEEwrNuXdkp32tuNCtN4APvmJmJvCwRKZ/5PSHlAdurC5ycDtN4Sfi2W1f2LAj8U8FCc8NKsyXyM5GZlyWmfOaBkPLg1jReIuV+GjfPuvWCPTMLKm+Ua82eWbMjaBaav5dITbl3X0h5cN80br7t1lWzU5Y6/KhUrpmp7AlU9gTNNc9LTPnMfSHlwZFp3Pytm5e6JTO/Kl/pXituLSmsNL+wpBJ4z5LzEqkp946ElAdHpnHzTbeuBM2NsuCtZkclcs2SX5lZ8I6ZyD9KpKbcOxJSHhyZxs2zbo2d8rXuWgm61wqWLNhTmZg1f+C1phJ4UWLKZ46ElAdHpnHzrFtXzcySyI8Kdu4EdmxJ/EAgamZelEhNuXcQUh4cmcbNN906MLNXKnves+cRgT2RD0yaX5iZ3XlRIjXl3kFIeXBkGjdPupkOX2lmXik7lppH3LDiB/7EK82SHZHnJVJT7h2ElAf3TePmSTdXzUI3E/hJ2bPQ7HjLmkf8h4nITOR5idSUewch5cF907h52q0rOyWy0uGtgj2Vn/gjla95z9admRclUlPuHYSUB/dN4+Zpt44suFYqS11RAjuumVlprt3ZaiLnJVJT7h2ElAcPTOPmabcOBD4oC94R+Jk9eyJLPlCZqUysOC+RmnLvIKQ8eGAaN0+6dSDyQVno9sq/WLFn1kRuNAt3fuG8RGrKvYOQ8uCBadw869azJvC9Eojs2VPdufGbyHuel0hNuXcQUh48MI2bv3bzSjfzSlloqmYmEqj8m6iZNecFkZpy7yCkPPg907jB427G0p3KrIm8YcWN35yXSE25dySkPPiIabwkuPW4mx0seENkdue8RE1NuXdfSHnwP03jpSa49bib8V2J7qlIufdASHnwaabxUhM01ZGUex8RUh78n6bxMuXepwkpD76kkPLgSwopD76k/wIQ6ndw47YagQAAAABJRU5ErkJggg=="},{"name":"Uncut ruby","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAADO0lEQVRIDbXBwY4UxwEA0Fc1M8YpKaNWfqCO2/0f/okc+IdE4PUH5ZrrChHxIfQpaskSNtikAqZZs9NdUa125BmtifBh3wspDx5SSHnwkELKg4cUUh48pJDy4I+YpzHlC18spDz4vHkanfumW1+UiJQvfIGQ8uCeeRrd+mu3BiI3LOw0bzQvSnQr5QufF1IenJun8bLbVw7KD5obzU4T+MQ7VlYiL0pEyhd+T0h5cG6exu+6fWVhQ+DfCjaaG3aaD0R+IbLyosSUL9wTUh6cm6fxsttvWFjZUHmjXGsWVs2BoNlo/lkiNeXeuZDy4Nw8jd91+6o5KFsdflIq16xUFgKVhaC55lmJKV84F1IenJin8e/dutVtWflV+Ur3WnFrS2Gn+ciWSuA9W65KpKbcOxFSHpyYp/Hbbl8Jmhtlw1vNgUrkmi2/srLhHSuRf5VITbl3IqQ8ODFP42W3x0H5WnetBN1rBVs2LFRmVs2feK2pBJ6XmPKFEyHlwYl5Gi+7fdWsbIn8pODgTuDABxI/EoialeclUlPuHYWUByfmafy22wdWFqWy8J6FRwQWIp+YNR9ZWd15XiI15d5RSHlwYp7GJ91Kh680K6+UA1vNI27Y8SN/4ZVmy4HIsxKpKfeOQsqDc/M0PunWqtnoVgI/KwsbzYG37HnEf5mJrESelUhNuXcUUh6cm6fxabevHJTIToe3ChYqP/NnKl/zng/urDwvkZpy7yikPDg3T+PTbh/ZcK1UtrqiBA5cs7LTXLvzQRO5KpGacu8opDy4Z57Gp90+EPikbHhH4BcWFiJbPlFZqczsuCqRmnLvKKQ8uGeexifdPhD5pGx0i/I9OxZWTeRGs3HnI1clUlPuHYWUB/fM03jZ7VdN4AclEFlYqO7c+E3kPc9KpKbcOwopD+6Zp/Fv3brTrbxSNpqqWYkEKv8halbNVUGkptw7CikPfs88jXjcrdi6U1k1kTfsuPGbqxKpKfdOhJQHnzFPLwluPe5WRxveEFnduSpRU1PunQspD/6veXqpCW497lb8o0RnKlLu3RNSHnyZeXqpCZrqRMq9zwgpD/6geXqZcu/LhJQHDymkPHhIIeXBQ/ofxXtNcCVrEHIAAAAASUVORK5CYII="},{"name":"Loop half of a key","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAACvElEQVRIDbXB3WscVRgH4N97dkbNm2LT3XqpLwUh5/wzuSqIRRCCvWmR7Gr9WCliiCjS1rYXKuqFUktLeyOkSGn/DEHpuTx39Yuaye7JzOzOOe4ESyqadLYyz0MsBm0iFoP/xzuLR7As4xHEYvCkvLMAVlaOK0Xdo8+NtrOtLLtze5NlGQ8Ri8ET8c6+9PKraTKTLi4eOtLtjkfjBw/++O33X3649T3LMnYRi8H8vLOvnXwdCEVRFvnO8y8ce/bw4bIsfr1/fzTevn7tWyCyaADEYjA/7+zq6qnRONvKsqfTpzY3bwLqxCurABTo6tWvAcWyDIBYDObknV1ZOb7U7eU747IoRqNRJ017vaO8sEDUyba3blz/BlBAZNHEYjAP7+xa/91JrSzyPC+KvPCLfGiBeeEZnlbTL7/4FDUFRBZNLAbz8M6+8ebZEEIVwnRS5DM7fjwey7EXQzXNsj+/u/IVoIDIogEQi8E8vLP9wXtEFEI1Qwodlfz80493797CHgVEFg2AWAwa8872B8NOJwm1aqbb7RVl+cnHZwGFPZFFYxexGDTjne0PhkmSxhhDCJNJeaTb21h/+9TpM59/dh5QQMQuFo2HiMWgAe9sfzDsJKkiCiGUk3JpaWlj/R3UFGqRReNfiMXgcbyza4Nh0kmTNAlVVZbF5Usf4W8KiABYNP4LsRgcyDu71h8mM2kKoMjzSxc/RE2hFlk09kcsBvvzzp55630AnSRRSuX5zsULG6gpIAJg0TgQsRjszzv7wfq5aTWpplVZlhfOr6OmgMii0QCxGOzPOwsE/IMCIotGM8RicCDvLBCwRwGRRaMZYjF4HO8sagE1BUQWjWaIxaAB7+4BhFpk0WiMWAwa8+4ei8Y8iMWgTcRi0CZiMWgTsRi0iVgM2kQsBm0iFoM2EYtBm4jFoE3EYtCmvwBe7CNw0NtmcwAAAABJRU5ErkJggg=="},{"name":"Loop half of a key","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAACqUlEQVRIDbXBwWsUVxwH8O/vzVtifqbE3bVXf0gpmfff5FAvgnhQvCgFByM0oXRL6ilRLyKIIIIieFLMQfwvvAi+47sFRIk7ycvM7My8dhYllpo4a5nPh1gMukQsBv+PdxZfYFnCF4jF4Ht5ZwEsL/9CFA2HJ9M0HY93Xr58wbKEz4jF4Lt4Z8+ePa91T+ve8eMLg8Fwb2/3w4f3795tb209Y1nCFLEYzM47e+nSr0Aoimx/f//UqZ8WFxeLItve3vZ+9/HjB0BgiQEQi8HsvLMXL15O03Q83pmbm3v+/Cmgzp27gKlHj+4DimUJALEYzMg7u7x8pt8feu+LIt/bG0dRbzj8kZmJVJp+fPLkAaCAwBITi8EsvLNXr/42aRR5Y/8fCws/zM/PHzvGVVXevXsTDQUElphYDGbhnb127fd6ajLJ8zzzjd3Tp38uyzJNdx4+vAcoILDEAIjFYBbe2SRZI6K6URGRUtGbN69fvdrCAQUElhgAsRi05p1NkrUoiupPqsFgWBTFjRurgMKBwBJjilgM2vHOJsma1jqEUNd1WU76/cFotHLlysqdOxuAAgKmWGJ8RiwGLXhnk2RV6x6RqutqMilOnOiPRitoKDQCS4z/IBaDb/HOJsmq1j2tdVXVRZHfvv0XPlFAAMAS42uIxeBI3tkkWY2iXq+nAWRZduvWOhoKjcAS43DEYnA47+z1638A0ForpbIs29z8Ew0FBAAsMY5ELAaH886ur2+WZVlVVZ7nGxsjNBQQWGK0QCwGh/POAjX+RQGBJUY7xGJwJO8sUOOAAgJLjHaIxeBbvLNo1GgoILDEaIdYDFrw7i1AaASWGK0Ri0Fr3r1liTELYjHoErEYdIlYDLpELAZdIhaDLhGLQZeIxaBLxGLQJWIx6BKxGHTpb2ShI3Bg98TvAAAAAElFTkSuQmCC"},{"name":"Tooth half of a key","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAACl0lEQVRIDbXBwUsUURwH8O/vubvEDy92UALhdxDaeRehoFP/jAhrJFh2MCMoCSEqghI6JEjePO1BpIsUYeLFQ6AHw4FInpSCrtm6zptm2vXVLElCmWMwnw+xaGSJWDSyRCwaWSIWjSwRi0aWiEUjS8SikSVi0cgSsWhkiVg0skQsGv9kjY9DLEWcErFoHM8af3DwVhAEe3u7m5uf5ufnWIo4DWLROJ41/vDwvSgK6/Xv24nNN29esRSRGrFo/I01PoBSaYAIAOXzOSL15UtlZ6cyO/uSpYh0iEXjD9b4PT2ler2BJiLK5wu5XJ6Zq9Wvk5PPAcfiIQVi0TjCGh9Ab+9VANXqbqFQiOMYcIXCmba2sx0d5zY2Po+PPwEUSxEpEIvGIWv8vr5rgAPgHCqVrdbW1kaj4dwBkZqaegHgypXB8fGnSCiWIk5CLBpN1vj9/Tecc2iq1xuVylZX1/kwDOL4u3ONiYlnSCjgAFCAY/FwEmLRAKzxS6UBalKKfnLOBYna7u7OpUuXo+ibtcH798sLC/NIOBYPKRCLBmCNPzR0NwyttUEQ1Pb3a93dF8Pwm7VBrVbt7JRcrkWplpWVpenpMuBYPKRDLBqANf7o6OMoisKEtTaoVr92d1+w1q6tfSiXpwBcvz68vPxubu414Fg8pEMsGk3W+CMjD5RScRyFYRgE+3t71fb29rGxh0goJA6QUCxFpEMsGoes8QHcuXNfKRXHUa1WW1//ODNTRkIBDiAkHIuHdIhF4whrVgG6fXtUKbW9vbW4+HZpaQkJx+IBsGaVxUNqxKLxB2v8mzdHHj0awS8KcCweTo9YNP7GGh+/ORYP/4VYNI5hzSqaWDz8L2LRyBKxaGSJWDSyRCwaWSIWjSz9AMpRJXBa5wo+AAAAAElFTkSuQmCC"},{"name":"Dragonstone helm","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAFHUlEQVRIDbXBe2xTVRwH8O+57d2yn3R2Ik4n8SdGc+9RY3zhY0FjYhCmMSY+42PEoJjgDDGg/AHxEQ2aqIsxGhERomJ8ZQZlAZ8JWAZmosSIVI+DrGfM0a5l7XrbM9ZuvUrjkpGtUP/w8xHEEv+F0YrYQZnRitjBCQliiaoZrTpae+/cNIfYMVptuPunhz69kthBZYJYojpGq47W3lgm+kTnLQA23P1TNN7dHmkDfGIXFQhiieoYrTpae2OZaENdI4BovBtAe6QN8IldVCCIJapgtOpo7Y1logAuamyOJn4AMDDc2x5pA3xiFxUIYomTMVp1tPYCiGWiAA57sabQHAArOm8GfGIXlQliiRMyWm1bnAIQTXaj7LAXawrN+f7gZgBbouuJHVQmiCVOxmi1bXHq0HAPyv48sjdy/s7kgb7Yjt2AD4DYRQWCWOJkjFbbFqcODfd8fnVnMW+O5vKjWe/o0LCXGIx1/QyA2EEFgljihIxWXVu3ZD9rfmvuutGMV8ybQi5/7VhN318DiWTyWrM0ETi4cc+zxA6mI4glKjNa7fn2q1dSBwpmZMyMFPIjC4q1npf7Kx4fzmaTQ0PxRCKqegAfALFrtAJA7GCCIJaowGj12LxXWtrOmnEKGWO8XH7Yy2ay2YGBwzljhj1v6B/p9N59+zHhjRt+LISGlncuJHZQJoglKjBaLbp+eX2paf4jp+eMyeXzXi6XzWa9XG771/sA5Ea8cy4YvD24FWWF0BCA5Z0LAZ/YRZkglpiO0Wruww/KP0+rLzXFhzXKUuO6ND6OsoFMrPm69NffIZHpb58XiQd/Pys0Z3nnQsAndjFBEEtMx2g1d8liqcIA+lIHMKE0Pr7gpoPJdCGVPGpZCFrBrbtiiy5d9/KOpTjGJ3YxiSCWmI7RyvcfQDLfejunc4P5Qg7APXfEvHzhzR/DY8VxoARYN52R2NgZAyzAB0Ds4niCWGI6Ris0zgrX1dUS/fYhHxkq7upKvdh1OsZKt87qKxTGvug/DVZg4RnJjp2xtgs+XrPnPgDEDo4niCWmMFotiXSsv2tpOFRXW0OoCdiWjUAAFmDbQSsIlNrvH121peGZBemVa/bce/b73dnN7syr3u5eTexgEkEsMR2jFRpnhUOh2roaBGpsy0IAsOygHUAw+M6SsWWfnPrIZf1vvIXU6L6nLo6gTBV3vd29GgCxgzJBLDGF0QooobGxMRxGTQ3sgA0gYMGyg7aNoEUNpz5+9aGXXh2fETr0y4EsJmmftwPAiq4biB0AglhiCqMVUArPbqytn4maABAAYNs2bCto2U1XuI+et/fZF4oAHGdw/68zWy5ctHb3KhzHJ3YBCGKJKYxWQCk8e3ZtQz0CgcQv+zHhmw+uAfDoCg+A4wyms6M32us39TzTcuEilK3dvQrwiV2UCWKJKYxWQCl87rmZWB+O8fEvsf2T5mUrigBGimbu5emPfsghk8VxfGIXEwSxxBRGK4TrkckCPgBiF2VGq3fXXNq+1kbZOErR/p8BH5MQu5hEEEtMx2gF+MQuJjFabXjuktc3ziiMjd58Szo+ePSDzQOAT+yiAkEsUTWj1dqnLlm3acb8lvjWzobZ5/V9E0kCPrGLCgSxRHWMVpFPm5etxPyW+LdfnnnrbcnnX+sBfGIXlQliieoYrba9d02s30sNFZ5u78ExPrGLExLEEtUxWq150l398h84xgdA7OJkBLFE1YxWgA+A2EV1BLHE/0kQS/yf/gbN9kp/ZuV+oQAAAABJRU5ErkJggg=="},{"name":"Dragonstone hauberk","base64":"data:image/png;base64,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"},{"name":"Dragonstone greaves","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAFD0lEQVRIDbXBe2iVZRwH8O+zecz9SNbQY16qH3Y774tkw9LVmJZRkxDTVTToTqkj0dCgP6SiC2H9USYRdKeIbouWZhfzUs1amk2GIUhPW3Uem8edLd3Zu7PnvPenzmiguNVW+PkIYhv/g1ZyTirZJnuIUxiOILbxn2glAdRWTfcDpI/k01mHOIVTCGIbY6eVXHvTLCJ/Z9l8mHipvPclubgz6xCncDJBbGOMtJJPNViuH+1v9/rmLq2fMlXu9wBsadnUmXWIUziBILYxRlrJJ1dYBS9auHTDY999G0dRTqnoL37oHtjXmXWIUxgiiG2MhVbyzpXLZwa729q93qo6GDO/+7zyzgWHK7Z+6bbW0pWbWzZ2Zh3iFAYJYhujppVc9eA6p7cv37HLC3HF1Q07B7pu/HFFv38sRvR++bOLu+8qmdv8+efvHko7xCkAgtjG6GglV667H0B/rm/gl6+rr7rj04F+xNF1+28GMHBe6+6z2oNCIfYC/4dthzocwBBbgtjGKGgll69ZBSAG8n1OIf3N3AUNOwa64jhCbKI4RhzFsYExC8dP2PbF2wc7HMAQW4LYxihoJe9e1QAT9/f1A3AP7/lj9qLS8eMRxVEcw8RrKy978aUnvCA4uxxbW3oAQ2wBEMQ2/o1W8o6G5cYYGJPvc9Jtu2dMLeu9fElQcBeVn1MSOS3fNMYRpk+G56OpOQMYYguDBLGNkWkliVNayVuX321icyStnFyuJJEoLS29r75+S9NzQYggCMMI5ybhBXD9YGtLD2CILQwSxDaGo5UE0LgsqN+SuOXO24IwDH2/K3M0iqK2fa1VC2pKS0rcox0z58zP5/OB78dR1LzrKxQZYgtDBLGNU2glb5+74u3WV9de8/D4cWdcsGhC464dx7M9B9oOYFBVTTWAaTNmeJ43oewM3/c/a/oYMACILZxAENs4mVaycVlQvyWxpm7WtMnr+g5nB3pm7HSflod+AgyKRO2SxVOmTQ18z/eD0PM/adoMGGILpxDENk6mlVw9580jq7rDt15YvXJ627cr1798D4oMisT1y26YPCWZz+dNVPTJh5sBQ2xhOILYxgm0kgCuf+bxcVtf98PQczGJ0NSSAQyKxJKb6iqmTM4d63ULhTAMv9q2HTDEFkYgiG0M0Uq+e4N+Z+HG0s2v/JYpJCsSXT35Q2kHMACILa3km89v+njv3mM9Wc/197XsAQyxhZEJYhtDtJJPN7zxvXy04IfZ7nwE+CFk2gEMIAC8tmlj20dHewvH32t9HUWG2MI/EsQ2hmgl664533XDo8dyUQTfhex0AAOImsrk4tmT3NI1APb/3nRp6XUbtq8HDLGFfySIbQzSSj5wy+z2TC7dlQNwsMNBkQFETWUyjjBxYlnBDRde+lCQcTZsXw8YYgv/RhDbGKSVXF03qz3bn+nOHexwAIMiUVOZjCNUlJcVvNB1g8ykC9LN3wOG2MIoCGIbQ7SStVXTd+zLAIbYAqCVrL4kGQETKeF6Qd/F8+r6r35i24OAIbYwCoLYxgm0koAhtgBoJasvSUZAOSW0FxyfOW9Rovq5Dx4CDLGF0RHENoajlVxQmQwj9BdQcWbi2jmPRD9f9HjLtYAhtjBqgtjGKbSS9bXn+z7cMCzosLktg78ZYgtjIYhtDEcrWXlhMnXOxMbmXwGDQcQWxkgQ2xiBVhJFhtjCfyWIbYxMq5+ILfwPgtjG6SSIbZxOgtjG6fQnRcyZf1Ni1Y4AAAAASUVORK5CYII="},{"name":"Dragonstone gauntlets","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAEg0lEQVRIDbXBX2xTVRwH8O9p79r119FN2UDK7CGY2Z4tW4iKhGIIwQkijAyDJBuIGBN40Qd9IyH6IJEXDZEEoz5ojPogwRgJaIKGkGoWl8iyP4pcB4NbtjEsmNKxs7X3nHvMKku2IFj/9PNhxAXKiREXKCdGXKCcGHGBcmLEBWaRjk08jv8PIy4wQzr2vt0N+98fRBHxOP4zRlygSDr22uXR53cs+OWnCWPQfzZ7oiuDIuJx/FuMuECRdOwNyVi40nqoOXCmLweguTF8pjc7OYVvezKYi3gcpWHEBQDp2OuTsVAAkXBw06bIpcGJ7p4cgEeWRX7sve4qGA95F0pDufm8RvfZHPE4SsCIC+nY61ZEKWQFA1ZNONDZeW9fzw0DDPSPF5RyNQoKQQvXxhEOugbwPBz7PgMYgAEgHsedMeJCOvbm1bFQpTXy2/j9C+bt3LLg8pjs68+6Gq5WSqHgIhK2xm6gJqSMgavw2alRAEfefPieRRVPbP8BAPE4/gojLqRjb2tdGgz6C672AXs67ptfH3jr0Igq6FBAVYWsvKuMQSZn1UWU0sgrdX7Yjc6v6Ghf7GeorQ9ueiGVzfqIx3EbRlxIx352Y8PFkeySRTWu1q/simoPHx69prR+fFVYaXz5ze/GQ1XIqqtGwVWDo6q2GlufWnzqu6tPrl3ImH8hD7RuPJ2Fj3gcczHiAoB07A3JWG11sKD13t2xgutN5dXEpHfkq+uu0pN55SocS6UBHNiTsNM5AFVkoWjz+igDXn8nneodBnzE45iFERcApGO3r4nNCwV/Hc52D2RQVANvW3tjwdWTeX356njXQAbA7raYAdrWLfT7/D4fPj8+CqDz6frDn45dHBvvOZsBDPEEZjDiAkXSsZPNdbKQ1xoD53M18ACsSi6ZdNXUlNs1kAFw8MWmwZFxGGxcFz1+chRF27fElOcdePeSVWH1DWaHr+aIxzGDEReYIR17eWOdq/O9dq4G3spkvdaYyrup3gxgAHbwpaZLV8Y9gz95HozB9q0xT2P/e+lgANmsSvWOAoZ4AkWMuMAM6dg18ACsTNb7YLlanewexTSDaezwy03hUEX/hZwx8DylDZ57ZonW3muHhqwKq8ICg/XF6SHAEE+giBEXmEU6dttjMeaDVjjRlQYMpjEAna1RokiyKfDz0E3PwHhY9mCkqTligEc7Uu2rYx5wLJUGDPEEZjDiAnNJx8YtBtNYW7IuWhuqrrKMQXYysKqxsv9CruWBSFNLBAbLO1KAARimGeIJzMKIC9xGOudwC+tojS6aX1nhB3zwPGRu+Fe3hHzM19QSOfTRlY+/HgQM8QQA6ZwjnsBcjLjAXUnH3rtjKQAGKA8yr24Wgmuaw7ve6MU0QzyBO2PEBe5KOvaK5rrWZfMAv9Ja5tXEFD44kQYMAOIJ3BUjLvB3pGPv29nAAOVpOaXePpoGDPEESsCIC5RAOvaruxpcpQ98MgQY4gmUhhEXKI10bEwzxBMoGSMuUDLpnCOewD/BiAuUEyMuUE6MuEA5MeIC5cSIC5TTHzpW/nB09NezAAAAAElFTkSuQmCC"},{"name":"Dragonstone boots","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAFdElEQVRIDbXBb2jc9R0H8Pf3LmnaT7z0pncmjdk+Z9lyv59FCBlZZQtBbsPh3AYDUXyyB1tdrD6YwiYzK6H4YIPtmc/GQEXK/kTXJ0O6uiJFpEwqZ7pg2293dvnWa+P9SdL8cve9P7/f9/tddnKst7QDO/J6CWIf/wetJDqIs7gZQezjdmklM8NDiQS2LBUCAMRZ9BLEPm6XVjIzPJRI4FONJgrFgDiLGwhiH720kgCIs/iftJJJ2ORwEkAigUYT8T7I5QBwxB66BLGPG2glM2NDid1YKgQAiLO4Ba3kg5OjABbzxdRYEkAckMUAcMQeugSxjy6tZGZsCEBiNz61VAiIs7gZreSDk6PoWMwXs/cPxw3OnK8AjthDlyD20aWVzIwNAUjsxpbNJpaLAeCIPWyjlXz8of0AStUmgMQdfe1GdPLsNcARe+gSxD66tJK5qdHLK7XEbjSa2FIoBoAj9rCNVvKxb+wXMcQEtjRb+OBCdWBiUp48TZxFlyD20aWVfOKb+0uVZj5fTI0l432QywHgiD3cjFbyvszQ/eOpuIhHxkx//Ye//eDM0sKbgCP20CGIfXRoJZ979MC1oAEgBlwtb0YGV8qtYikgzmIbreRbC3/41cUPn/cOABi7554fvX5Mb6zlX3kdcMQeOgSxjw6t5HOPHnAAHFY2G86ivNY8nb8GOGIP22glDz49mxi520aRDcMojGIx06oHulRdeuNN4iw6BLGPDq3k8VdfPnL02Ye+/HkHrGw0rm82Lw1+cfntd4iz2EYrefDwk4l9IzaKbBgODO1p1Wu21ahVqvlX3wAcsQdAEPvo0Eo+duylennj+4m7+/v7jxx9dtf0t2qVauHkKcARe+illZyaPRSLxwdTd9owHNhLptWyplmvrm+WKuf/dII4C0AQ++jQSn7npV8MJKle3rBhdHTigWf++Pv66qr88wnAEXvopZWcmj0Ui4nBdGpg7x4bRc4YINJr12vlyuJrxwFH7AliHx1aydz8C3d+acQZWytfd1G0/s+r9bX11UuF0tKHxFlso5Wcmj2UGE7vSdIPPjcaGZO+66619fXq2tpTP3kecMSeIPbRoZXMzb+QGh+xxjpja+WNsF6rXLrSqFQLb58GHLGHXlrJqcOHRvz9zwzf++Njr2GLtVPRP+qt6GyQLOb/TpwVxD46tJK5+bnU+Ii1xhlrja2X1mvlyuqlZXnir4Aj9tBLK3nw8JO/fviRp155eUJfcM7cQbuaLaNbJh7DwqnLgBPEPjq0krn5uVR2n7XGGWsj8+L41JmzZ39z7v2r758rnb9InEUvreTBp2cH/nb8C8NJa+GAxJ54OzS6ZQAsnLoMOEHso0MrmZufS3mjvxz/Sn9fXzwez839DO3IhOHszMxPj74IOGIPvbSS0xPpe/clHbB3MB4ahJHRLeOAhbcuA04Q++jQSubm5373+BO5Iz+HwwP2QmRQWW+FJmqHeCd/DXDEHnppJacn0gAy+5J7B+OhQRSZBO36y3sfy+UAcILYR5dW8r7vfTfX/5ExJjKIjNEts7rebIe4slJbLgXEWWyjlZyZTAOwFtbAAKFB2G4tFQLACWIfXVrJ6Yn0t6czH3+irTORQaNlavVWNYiK1dpyMQAcsYdttJIzk2lrYQFj8N5SBf/miD1B7KNLKzk9kQbwyNcyxdJmZNCOzGbdfLK2+e5iBXDEHm5BK4n/cACIPQCC2McNtJIzk+mHv5pxDtZCrWzWGu1zH1XPFwLAEXu4Na0uooPYQ5cg9tFLKzkzmbYWWywQthEaLMoK4Ig9fEaC2Mc2Wkn8N0fs4bMTxD5uRquLuAGxh9siiH3sJEHsYycJYh87SRD72EmC2MdO+hdnQtHqgnBPSQAAAABJRU5ErkJggg=="},{"name":"Dwarf weed seed","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAABhUlEQVRIDbXBP2/TUBTG4d8baFVOJX+F0633ILEgsaAObAyMSEx8RyY25i6MGRxvtsTIkAb59k+wjeiexpV8n0fmQUkyD6Bv6/OLoACZR9/WgCTzxNJkHkDf1pLME0uTeQB9W0syTyxN5gH0bS3JPLE0mQfQt7Uk88TSZB5A39aSzBNLk3n0bc2j84tgaTIPIHcbHpknFiXzoCSZB7PlruGR+SXzyDyYJ3fNxZvx7y2/fsN2BZhfcozMgxly17y+qk7PWL3griffbNs1sDK/5EkyD2bIXfP2Y3XyinFkuOeuJ99s2/UKJvPEYTIPjsld8+5TdXIGgolh4P6W2z801zuYzBOHyTw4JnfN+8/Vy1PGkXFgGNg/sL9n/WMHk3niMJkHM+Su+fC1GgfGgXHP/oGf33cwmSeeJPNgntw1wNWXatxz/W0Hk3niGJkHs+VuA+K/yTwxg8yDZ8rdxjwxj8yDkmQelCTzoCSZByXJPChJ5kFJMg9KknlQksyDkmQelCTzoKR/SkKIYUEAMigAAAAASUVORK5CYII="},{"name":"Torstol seed","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAACUElEQVRIDbXBMYvcVhSA0e9qdgdzJwh3aQJ3OukG3LhcjAnuXAZDAiF/0QQC6YJLw5ImYMjodXqwzTZBmY3eelbWk/GCYUOwV0Oic0TNWZKoOdC3O25tts7/StS8b3ebrafYANM0bbbO8VIMgFrFP4maAyk2ajXQtzsRUas5Rorhqyr/3dFdFoBaxUei5nzUt7vN1lNs1GpmSzF8/aRcrVmdcJPY/9ld/FGoVdwSNedW3+42W0+xUauZLcXw6Fl5espqzZjJB66vuu6Sy7ZQqwBRc6Bvd5utp9io1cyWYnj8vFydcHrCCEzkkbc9N30XzguY1GpR877dbbaeYqNWc4wUw9mLEqEoyBkmxoFhYDjw5tUeJrVa1Lxvd9yx2TqzpRiefl9SkDP5HePAMJAHfv91D5NaLWoOpNhwh1rNbCmGpz+UeSS/Yxw4/3nPB5NaDYia85+lGICzF+Xrl3uYALWaW6LmHCPFoFbxLyk2IDCp1dwhas48KQbg4Ze5uywAtYoZRM2ZIcVQneX1+uFqzfVfXd9xEQq1ivuImjNDiuHRs1K/II8MB66vur7jIhRqFZ8las59UgyPn5cPHkDBmGHkkLi+6sJ5AZNazaeJmnOfFMPZt2WxhomcGUeGtwwH3rzaw6RW82mi5syQYvjmxzKP5IFhJN/w2y97mNRqPkvUnHlSDMCT78o88PqnPUxqNfcRNWe2FBsQPpjUamYQNedIKTZqNfOImrMkUXOWJGrOkkTNWZKoOUsSNWdJouYsSdScJYmasyRRc5Ykas6S3gNppARwcHTe3QAAAABJRU5ErkJggg=="},{"name":"Yew seed","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAB5ElEQVRIDbXBsWpUQRQG4P9sEeEk+AonCLJz3iKFjY0YktZSJQ9oIaQKaUQIQoqbYZs7jbAEdDXc2b13ztwRA4JLsnEDzvcRi6ImYlEAXdvs7isqIBbt2gYAEbE4/G/EogC6tiEiFoetxeABsEzxIGJRAF3bEBGLwxZi8ABeHbje8sfzGcsUmxGLAujahohYHP4lBn/84tnOk70hZbOcLH84m7FMsQGxKICubYiIxeFBMfg3L58XYBzzZGcvWY43N8veTj9/ZZniPsSiALq2ISIWh81i8G9fuzIil1xG2IhVyv1gy96+LdKFv2aZ4g5i0a5tcGt3X7FZDP7kyFlGHjGWbIYh5dVgq95+xPTpcg5MWKZYRywKIIYr3GJx2CAGf3Lk8ogxw0o2Q8q5HywuLfZp1s7niwlQWBz+QiyKrcXg3x26scByNkPKuR9subSuT+dfroHC4rCOWBRbi8G/P3RjQcp58X3eJ6SEVUIcFhd+AhQWh3XEoniMGPzxwVMzpIQ+YUg4u/yJ3wqLwx3EonikGDzWFAAsDvchFsXjxXCFP1gcNiMWRU3EoqiJWBQ1EYuiJmJR1EQsipqIRVETsShqIhZFTcSiqIlYFDURi6ImYlHURCyKmohFUROxKGoiFkVNvwBMP+5htHWa9AAAAABJRU5ErkJggg=="},{"name":"Elder seed","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAABnklEQVRIDbXBsWoUYRSG4fdbuxOwDYJwtts5TYiFYCFiJxYBvQRbG+/Jy7AW63STwRQzMUY2EQLR+TdumBklEFxRi93M/zwyD3KSeQBtXW5NgwxkHm1dApLMC8Ym8wDaupRkXjA2mQfQ1qUk84KxyTyAti4lmReMTeYBtHUpybxgbDIPoK1LSeYFY5N5tHXJta1pMDaZB5CaA66ZF4xK5kFOMg9WpKZihfmM25F5cCM11eu9h4vl1TDwSw9v3+2bz7gFmQc3UlO9efnoy/m3D+Wn6b3tvuuOTr8ezy/MZ2xK5sGN1FSvnu3+uOrPlyzSsu+7Ht7vf4TBvGAjMg9WpKa6v333wWzaLpZA33H4+eR4fmE+YyMyD1akptp7siMmkwnfF1f03eHRST2/gMG8YH0yD/6UmurF011N7qTLy6Gjh8P6tJ6fmc9Yn8yDv6SmAp4/3qGnp6uOTuvjMxjMC9Yk8+BfUnMA4rfBvGB9Mg/+LzUHXDMv2IjMg5xkHuQk8yAnmQc5yTzISeZBTjIPcpJ5kJPMg5xkHuQk8yCnn0GimWFSBQaTAAAAAElFTkSuQmCC"},{"name":"Papaya tree seed","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAABP0lEQVRIDbXBMWvbYBiF0efGmW7Aa5fA9VCw3v7//6IIOkiQJZsJSBBi4zbu0sWpU/SdI6doSU4B89g/7IoG5NQ89oAkp2NtcgqYx16S07E2OQXMYy/J6VibnALmsZfkdKxNTgHz2EtyOtYmp4B57CU5HWuTU/PYc/GwK9Ymp4BleuLC6ViVnKIlOUVLcoqW5BRfsUwDf3H2fEpOcbNlGnbftlwc3g4cOHDn7LlOTnGbZRq+P24393Dkt7d3jhyeX+7g7HRcIae4zTIN+8ft5p4/Tkfe3hlfXuHsdFwhp7jNMg0/dtvNPRw5wQmG8RXOTsd1coqbLdPAxX63PR35+fwKZ6fjOjnFVyzTEx/Eh7PT8Sk5xX9Zpien41/kFC3JKVqSU7Qkp2hJTtGSnKIlOUVLcoqW5BQtySlaklO09Av1eGBhcW1AjwAAAABJRU5ErkJggg=="},{"name":"Money tree seed","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAABrUlEQVRIDbXBsWoUURgF4HOyVidgY6eQP9js/TshD+ED+AY2Cza+gI1aWNmJDyA2iiAIksbKd5DZwRBnVgiYYBOdq7ubuWNYWFxRi93M/T7KHDlR5gCaqtjedWRAmTdVAYCkLKBvlDmApipIygL6RpkDaKqCpCygb5Q5gKYqSMoC+kaZA2iqgqQsoG+UOYCmKkjKAvpGmTdVgYXtXUffKHMAsR5jQRbQK8ocOVHmWBHrEitkQ1wMZY6lWJeP71yNP9B2ONcl3H92JBviAihzLMW6fHJ3Z3Jy6cPR2c4VtQmfv8b99xPZEJuizLEU6/LRKMRpO8P2bDo/S2jb9umrMdDJAjZCmWNFrMtbN6+Ha5fn85Q6tKmtjr+9fjeRDbERyhwrYl3eu31jcG4LP6dtm9Knk+8v9w+BThawPsocf4p1+WC0NxhsTWepS23qcHB8+uLtoWyI9VHm+EusSwAPR3upQ9fh4Mvp8zcfgU4WsCbKHP8S6zFA/NbJAtZHmeP/Yj3GgixgI5Q5cqLMkRNljpwoc+REmSMnyhw5UebIiTJHTpQ5cqLMkRNljpx+AVe7nmHET4WtAAAAAElFTkSuQmCC"},{"name":"Grimy lantadyme","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAFKUlEQVRIDbXB/0sc6R3A8ffnGc0mj/FLct0LV+7yeBGZeXrhsIZtgiwiy7JBjgvtP9A/rr+XhoiIi4jIIglLgxTSycM2dzORBpq9mrvVmVPHnbnVO0tC0ib9wddLtLH8n9LYaePzYUQbCyRRODJpOZNE4cik5V3S2FGdobWtjc8HEG1sEoWAiGgTAPvfhpc/t0kUjkxa3pTGjvlb0GdzGwptAt5HtLFAEoUiok2QROHlz20SPdUmSKJQRGnjcyaNHQu3ar3O+uUbbG5r4/M+oo0FkigUEW2CJAqVkkvXAyCJQhEB0cbnVBo7Fm7Vep31sWk2/gqFNkEaO2183pTGThsfEG0skEShiGgTJFGolFy6HgBJFIoIlZu0nwDa+GnsqFXq37u1MZ+NNhQgjUq52e5q43MqjR0D1Rla29r4oo0FkigUEW2CJAqVkkvXAyCJQhGh+lv2k9kf//XY9RhYuFXvPV+bmGS9DWjjp7GDQpsASGPHbMDwBUZKrLehEG0skEShiGgTAPvfhkqposhFFBTUfsfB4e3vo0cjn80lO1tXbzQO/9kcn2LtIfU7rD3UxudUGjtmphm+UOvvrJdvsroFhWhjkyjk1MikBdLYFUUuoqAAoX6H46z67w7QGp2c34suXiw1x6egz0FGaxsKbYI0dgzMBtXsReuTm5SGWNqEQrSxQBo/5ZQ2QRq7+mx57fFLEG38NHaNSrk5OslRhgK8+v7ztYlJ9lLaT7j9JY/+xsDMNNsdKl80eNn82LK8CYU2gWhjeUsaO04UII1KuTlynYEcFAON5LnA6vgUA4qFl3/f0JMcHLHbq13dX//kS5ZbnCi0CUQbC6Sx4zXa+GnsoAAB6rNjaxM+eQ7Uex3llQRQrH5sWdpcmBnb0JNk/flsZ6RUWhmf4mfNh9r4oo1NY0etwlFGlpMdzfRebP+jR+UL2k+oVVAeSiHQz8n7jb0o76M8mlenybJq17WuTM+/6iiP0nBp9Vc+AystThTaBKKNBdLY0bjDwMEBP2azvZ3HF67hwXan4o99eq2kFH8esRwf393tFNAcn2Ig78933eaV6fp+R3ml0jBLH1mWNvlFoU0g2lhOpbFjsUqeU+QcZBwekENvj7HRSm+n7Xr3quUH4z45i7tuZWKawwzyWq+jwBsuDXksX7HkOf2cPG/88KzZ7mrjizaWM2ns7s2VC8hheXSaw0OOMrKjuYMX2RHtsc8Y1Qx5iKLIOciA+n5HeSVPMTzMQJGztNXlF4U2gWhjeU0aOwZqFYaG8RR5TpZxnFVffZP1Gb3Imr7BqKYPRxmKxl7kKZSHp3gw7pPDSgsKQJsAEG0sb0rjpyAMLFZRkEP/mOM+x1lt/5vkgEef/ubr/WdLempx7xmgQHksXfG/fuWWtrpQaBNwRrSxvCWNHYtVFCj1+1chcH/Up3/McX9+121O+IxcWvwuHPLI+ygPUTxodTlRaBPwGtHG8i5p7PiPxTlQ/Cw7XPjObVy7eS/pAEXO0rh/b88puN/qQqFNwGtEG8t/kcZPQahVUB4KRDGg1OKuG/JY+sj+4YfwL5vdP9799Z9WX3Ci0CbgTaKN5X9KY8eZxdvllUddTn11uzw8zP1WlxMFoE3AW0Qby/uksZv1xzxoux4UnBDqd1h7yMBXVZZb2vi8i2hj+QBp7O7NlR9sdaEA4e4cq1tQcEKg0CbgXUQby4dJYweFNgGQxg4KbQLeR7SxnCfRxnKeRBvLeRJtLOdJtLGcJ9HGcp5EG8t5+gkUKDaMFSs6OAAAAABJRU5ErkJggg=="},{"name":"Grimy lantadyme","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAFBklEQVRIDbXBfWtb1wHA4d858ktyHFuJWy10a3tEPXPvmUsIDqLGCGOEkTFmIbAvsI+2D7DRYGOMhTFGGJMgEkJZIh+8Dh2bBValjS1HJ5KvdG8lUY+EpE32h59HKG34P3lnlQ74OEJp06xVuTCWNfwm7yz52+w9UTrgIwilTbNWFUJwQemQX+GdZfEOMZQfQaJ0yIcIpU2zVhVCKB3yDu+s0gEXvLMs3ik0jnaufUn5kdIBHyKUNs1alYGxrOEN3lnmb7H/ndIBA95ZCrmlk9r2xJfsPoJE6dA7q3TA27yzSgeAUNoA3h0ASZKMZQ0XvLMs3qHZovIUUDrwzlLILZ3Utq9n2alAAqKYy5QqdaUDBryz9ORvs/dE6UAobbjQrFWFEEqHDHhnKeToRDRas6+fP7YNegq54lmtlJ5i+wGgdOCdhUTpEPDOMhtyZYQro+xUIBFKm2atOpY1QLNWFUIoHXpnlQ68sxTn6HRptb85qT0c/2LeH++nvyq2/1O6MUXpAcU5Sg+UDhjwznJ7mtGRQvTDTmaarX1IhNIGaNaqwFjWeHcAYjaYeGwbSgfeWYpznHfzP1pgL/3Vwqt/XxkeLaWn6Gm12HsCidKhd5ae2XAhfl6++TUjI6zvQiKUNgx4dwAoHXpni7mMkGw9rCsdeGeXc5mt8SydmB5JsXlUSk9xekblKfO32P+OntmQxwfkZpblD1u/M6yXIVE6FEob3uGdpS8BsZzLbI1n6Ylj+mSxWROSrfQUPUIu/vefuypL1KX+sjAZ7Xxm2CjTlygdCqUN4J3lDUoH3llIQADFXKY0nmVg6awmQUgkbN6cYW138fbErsrS7S62j8fU6Mb4NAl9pX2lA6G08c6yNMd5i05MdD778vnjfzXIzVB5SiHHUAohkZJuh7hbPK0xUJqcJorydbt3Y3qhcTgEo6Ojm58GINko05coHQqlDeCdZXmeBFpt2q3cyXHl6k16nhx+86eJzz8dFXL47+N/5LyzfHJIzFZ6CgkxCy+ela9PLzWOUilGhln/ZIb1XX6RKB0KpQ0D3llW8vTEMe02ryPocvKa61dzZ8eVZ417+cz9G4ZOvPKT3ZwMaLeJ40LjSKYYlgylWP/E0ImJY5K4+PL7UqWudCCUNlzwzt7NZ4AkZn18mijiPKId5VvH7XMqE1+QHkdKUpJuzHkbKDaPBAwNMyzp6cas79f5RaJ0KJQ2vME7S8/SHCnJkKQT0405jxZeHna6qCuj29f+wNg14pgoApbPalIylCIluX/DEMNGGRJA6RAQShve5t0BCHpW8yAhJorpRHTiwqujVqu9//nXf351uK6mVs++j2EohZCspc3d0+raXh0SpUMuCKUN7/DOsrqApOfeaRW4Px7QiYmixZ/s7mTA2NXVH6spSRIjJBLu79XpS5QOeYNQ2vA+3ln+ZyVPj4QYos7ii2e7n926d2aBGNbS5t5pVUi+LdchUTrkDUJpw6/w7gAES3NIQCJASiSrL2xqmLXJmb80nv5jt/7Xld//bfM5fYnSIW8TSht+k3eWC6vzmY39OgOr85mRIb4t1+lLAKVD3iGUNnyIdzYXTMgUD581IKFPsDTH9gN6VhfYKCsd8D5CacNH8M7ezWfW9uqQgGAlz+YeJPQJSJQOeR+htOHjeGchUToEvLOQKB3yIUJpw2USShsuk1DacJmE0obLJJQ2XCahtOEyCaUNl+lnUkEtjKuoWPUAAAAASUVORK5CYII="},{"name":"Grimy lantadyme","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAFBElEQVRIDbXB8Uvc5x3A8ffz3Fmzj71o0l27rDSPzLnv96lbCSmiiBwi4iHDUCnsL9if1X+gYyGiBDkpchwiFWmRQXI+C457EuZYXJPo9Z56fs/vd6fUYkja5BdfLyXGcpmUGNtq1DnXN2j5RcE7SreobYuJeAtKjG016kopzomJ+RnBO6Y/JYXqN5CJiXkTJca2GnWllJiYVwTvxEScC94xPTrTbHzVd5PqN2Ii3kSJsa1GnTN9g5YLgndM3mJ9W0zEmeAdM6OzB43VwiBrW5CJiYN3YiJeFrwTEwFKjAWC3wGyLOsbtJwL3jH1KT8csfkAEBMF75gZnz3YXe0f5KstyECVx4qVzX0xEWeCd3SVblHbFhMpMZZzrUZdKSUm5kzwjplxOgmHrdHW3pY7pGtmtNxsVPqHWP0aEBMF7yATEwPBO0ZH6M0hwurXkCkxttWo9w1aoNWoK6XExME7MVHwjvIEJylHRxMH/9qQwcnQWL82XG4/rgwMU9mgPEFlQ0zEmeAdt2N6crPp09X3I+6vQ6bEWKDVqAN9gzb4HVCj0dUtdygmCt5RniBJSs8cULv6u6nv/93bQ2VgiAyOjqhtQyYmDt7RNToylTyp3viE3jyLVciUGMuZ4HcAMXHwrjxW1LCyuS8mCt7NjRVXCkN0Erq0Lrcalf4hDppsPmDyE9b/QdftmG93GBuZ4+nKByMsVSETEysxllcE7ziVgZobK64UBulKOaUpNxs6x0phmC6tp//r1uRD2gnPn89eS1ZvWJZqnMrExEqMBYJ3XCAmCt5BBgoojxUr/UOkJ8DsQUNpdA4N998fYbE6fbu4Jh+SpFPJfwrCcmGYrhQqG2IiJcYG75gd5zjhOCE5uX345Ft3yNgImw+YGSen0Rqt6XTI0vLBLqBh5dcRSaf09GFtYHjq8HEeeq9w/z1L13KNU5mYWImxQPCOuUnSlHabH45Gm0+23vkAcmzvjH189aPfvJvTfCl/4KQz99xxwsrAMF1ZOvX0YfV6NNts5DS9vSxeH2Gxyo8yMbESYzkTvGO+RAppSrvNUZsTaH5P4d2xZmPz4eFCqXhvYIQsnf+uvnwtot0mZabZyEG+h5xm6foIWUonJU3LLx5VNvfFREqM5VzwbqFUzICUxf6IdpvjhHZSaj9pH7NZ+Ij+AjmN1nRS2m20LrcaGvI95DVdGSzW9vlRJiZWYiwXBO/omh0nlyevSVOSDsdJ6cWj9AS50rv6q5v099FJSdqQm2vu5nMoTU+eu1dHyFKWa5ABYmJAibG8LPgdUHTNl1CQQadDktJJZlqPw1F747d//Kz1aLFveL71iBSlyWnuDdiFF/V7tX3IxMScU2IsrwjecacEGs3nL/4J3C38nk6HJJ1+trt2fQi5Mv/sQU6TpmhNTvfcre5xKhMTc4ESY3md4B0/mS/xk/bx9P92125En7dcmpLBYr9dOKhr3XO3ugeZmJgLlBjLzwh+BxSz4yiNBq1Bo5n/rp7Ls/jen/5ysPO3tb2/zt/8YvkxpzIxMS9TYiy/KHjHuTuTxaX1fc7cmSy+k+/5e3WPUxkgJuYVSozlTYJ3ox9f1bD58BAyTinKE1Q26LpTYqkmJuJ1lBjLWwjeLZSK92r7kIHiz5PcX4eMUwoyMTGvo8RY3k7wDjIxMRC8g0xMzJsoMZbLpMRYLpMSY7lMSozlMikxlsukxFgukxJjuUz/B2pOL4wAsXG9AAAAAElFTkSuQmCC"},{"name":"Grimy lantadyme","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAEyElEQVRIDbXBcUtc2RnA4d85M67pmx012c5u02VzQq299+60S8giisggIg5SDJWFfoJ+rH6BloaIEmRkkWEQWZFdpJDE02CZk1BLYzeJznrW6x3v6Rg2SySxcf/weZSYhJ/IOysm4nyUmISfwjtL9SbNTTER56DEJJybd5bJz8mh8TUEMTHvosQknM07KybiFe8sk8NT7daXl6/T+FpMxLsoMQln8M4yfpPVTTERL3lnmRqe3mstl26wsgFBTOydFRNxmndWTAQoMQln8M4y8TnfH7J+HxATeWeZGp3e217uv8GXGxBA1UbK9fVdMREveWfpqt6kuSkmUmISzuCdZWqUTsb+wfDBzobdp2tquNZu1fsHWf4KEBN5ZyGIiQHvLMMVeguIsPwVBCUm4Q3eWTGRd5baGMc5h4dje/9ckxvjvrV6ZaiWPq4PDFFfozZGfU1MxEveWW7F9BSm86fLH0bcW4WgxCSc5p0djvo27L6YyDtLbYwsqz6zQLPvVxPf/au3h/rAIAEOD2luQhATe2fpGq5MZE8a1z6jt8h8A4ISk3Cad7Y2UtawtL4rJvLOzoyUl0qDdDK6tK4dtOr9g+y1Wb/P+Ges/p2uWzHfbDFSmeHp0kcVFhoQxMRKTMIbvLOcCKBmRspLpRt05ZzQ1NotXWCpNESX1pP/sSvyMWnG8+fTV7LlawkLTU4EMbESkwDeWV4jJvLOQgAF1EbK9f5B8mNgeq+lNLqAhnsfVphvTN4qr8jHZPlE9u+SsFgaoiuH+pqYSIlJvLNMj3KUcZSRHd/af/KN3Wekwvp9pkYpaLRGazodQl7b2wY0LP08IutUnz5oDgxN7D8uQu8l7n2Q0LXY5EQQEysxCeCdZWacPCdN+f5wuP1k472PoMDm1sinfZ/84v2C5i/yG447M88txywNDNEV8omnDxpXo+l2q6Dp7WX+aoX5Bj8IYmIlJuEl7yyzVXLIc9KUw5RjaH9H6f2Rdmv9wf5ctXx3oELIZ799uHglIk3JmWq3ClDsoaBZuFoh5HRy8rz24lF9fVdMpMQkvOKdnauWA5Az3x+RphxlpFk1fZIesV76hP4SBY3WdHLSFK1rBy0NxR6Kmq4A881dfhDExEpMwmu8s3RNj1IoUtTkOVmHo6z64lF+jFzqXf7Zdfov08nJUijMtLeLBZSmp8idvgohZ7EJARATA0pMwmnebYGia7aKggCdDllOJ5s6eOwP07Vf/vYPB4/mLw/NHjwiR2kKmrsDydyLh3ebuxDExLyixCS8wTvL7SpoNF+8+Adwp/RrOh2yfPLZ9srVQeTS7LP7BU2eozUF3XOnscOJICbmNUpMwtt4Z/nRbJUfpUeT/91euRZ9cWDznADz/cnc3kOte+40diCIiXmNEpNwBu+2QDE9itJo0Bo0mtlvHxaKzH/wuz/ubf11ZedPs9f/vPiYE0FMzGlKTML/5Z3lldvj5YXVXV66PV5+r9jzt8YOJwIgJuYNSkzCu3hnhz/t07D+YB8CJxS1MeprdN2ustAUE/E2SkzCOXhn56rlu81dCKD4/Tj3ViFwQkEQE/M2SkzC+XhnIYiJAe8sBDEx76LEJFwkJSbhIikxCRdJiUm4SEpMwkVSYhIukhKTcJH+B+8BEYyKC646AAAAAElFTkSuQmCC"},{"name":"Crystal tree blossom","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAEb0lEQVRIDbXBX2iVZRzA8e9zzmnO3/pjFNnCeJTE874JQREiJjLLlJCRU7rJ3XSRdDHwoiuxvPCiXUQXEgp5F7gb8R+I6HHaDmOa60rqZi8I9uRB3ai2uZ3nvNt73vft9V3vOuNsZoSfjxLt8iQp0S7/gzWe6CJLU6Jd/jtrPFKbDx8ZOrRfdJElKNEui7HGIyO6SMYaD9h8+AiZoUP7IRbtsBgl2qWJNd5b+78AWp97Hrh++HPRRcAab9u3fSQUc6707IVYtMMSlGiXJtZ4mw59QxyRKrQuHzzYA3T0HgcKT7eRUFzp2QuxaIelKdEuTazxNn35NVBoXU5q8GAP0NF7nEz5wD6IRTs8khLt0sQar6P3WBRFZAYP9nT0fgeKVPnAPogB0Q6PpES7LGSNR6qj9xgQRRFw90Z51ab3QQG3+k8DlR9KZEQXWYIS7ZKxxgN2nSzXJsdLn3YBHb3HSEVRlMs9Bary41V/emL9x5890/4qmVM73xZdZDFKtEvKGm/XyTKp2uQ4mZnf7/169QL5PFD86BNSoV9bsWYdCUW9ZoFze7aILtJEiXYBa7zOE6V8yzJStclxUvGMD4zdvEFLSzg9/cqW7aFfI7VizToUiXrNkjq3Z4voIgsp0a41XueJEpBvWQbUJseBeMYHKsPlthdWBtOTtLQAL77+JqkVa9ahmHPz6Fd+dapS7odYtMNCSrQLWON1niid795Bau3O3c+uXU8qr1RQnQrDEAh9m29rI1EPZh9Mkgr9GnDrwhmIRTsspES7pKzxIAbVdXYIpczAJVL+n2MtrUImJCJRD4DZB5NA6NcAv1qtlEuiiyykRLtkrBkB1XV2CKUAM3Ap8qskorj9nfdIVa71k6gHZGpj9/1qFaiUSxCLdmigRLtkrPG6zg6RUAq4ffE0qfaNW1GKVOVaP4l6QKY2PuFP/AFUyiWIRTs0UKJdMtZ4nX2XCyIoBdy+eJpU+8atzFEKqFzrpx4AtfEJEsGsX50CKuUSxKIdGijRLhlrvM6+y0BB5PalM8zLqfYNHUDoW2Ds55+m791jXjAL+NWpSrkEsWiHBkq0S8Yar7Pv8i/fH5WVL7dIG/Ny6qU3NpAyAyUSURjWA+YEs6RuXTgFsWiHBkq0S8oar7Pv8vm921dv/3DFmtdoUBufAPTWHYAZKBGFpMJ6QCKYBW5dOAWxaIeFlGiXjDUexKCKXd3kC8zL5UjprTvMQIkoJBPWg6l7vwGjw0MQi3ZYSIl2aWDNCKjVH+xe1irkC8zJ5WgUhaSqY3epB0FYHx0egli0QxMl2qWJNV6xq5tEvkAil6NB9f4d5tQDIAjro8NDEIt2aKJEuzSxxit2dTMnXyCXq47dYV7EQ/UACMJodHgQYtEOi1GiXRZjjQes2vwuD+VIFBTzIoKZmdHhQR6KRTssQYl2WYI1I6BIrdq8jURUByrXy/wtBkQ7LE2Jdnkka0Z4SPGPmJRoh3+jRLs8HmtGSIl2eGxKtMuTpES7PElKtMuT9BfJdtNwoN034AAAAABJRU5ErkJggg=="},{"name":"Crystal tree blossom","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAEiElEQVRIDbXBX4hcVx3A8e9v7nRDfqnEihGx3Z4GEuYei/igtdCEJU2jVMXFJelD+hAQpBIKRV8KeYhS+iApSKFIIXktbMCQGhrEnW4YNoMbiYiIvuyFbdnbHRtiTDOddM7On3PnOLnbG2eZ3ViRfD6ixnI/iRrL/8GliZoKWxM1lv+dSxNyU6++UT/5kpoKWxA1ls24NKGgpkLBpQkw9eobFOonX4KgJmYzosYyxqXJEz89CWzb+QXgD6/8TE0FcGnynV/PMiRC7t0Xj0JQE7MFUWMZ49Jk/y9eJwzIlbfrwonjwMHXzgBlfZAhkXdfPApBTczWRI1ljEuT/T//FVDeruQWThwHDr52hkLt5RcgqIm5J1FjGePS5MCp0wwGFBZOHD946gzCutrLL0AA1MTck6ixbOTShNyBU6cZGgyAxh8XHt33DMLQ+3O/BVZqv6egpsIWRI2l4NIEmDlf79366Hc//iFw4NRp1g0GpVKE8MGVmm99/PjzP9nxlUkKv/neN9RU2IyoseRcmsycrwMhDPrNJoX2zesr8xeJIuDx535Eznc7O3fvZUgk66wB52f2qakwRtRYwKXJ9NlL0cRECAOg32yS890OcP2vfypNbOu3P3l0/zO+2yG3c/deRICss0bu/Mw+NRU2EjXWpcn02UtANDERwqDfbAK+2wE+vHpZv/il7u3bpYltwK6vfp3czt17ESH3lzd/2bndaixUIaiJ2UjUWMClyfTZS+8cPURuzw+ee2iPJVcS6bY/IfNAr9OZ0B1A5n2v1SSXddeA5YvnIKiJ2UjUWHIuTSCAHL6wKEh6eY5c5+aNaLtyVwhA5j3QazWBrLsG+HZrpVZVU2EjUWMpuHQJ5PCFRUGA9PJcv+MYGoTJpw6RW12cBzLvKazduObbLWClVoWgJmaEqLEUXJocvrAICAIsV98mN/nk00iJ3OriPJB5T6F362b3438BK7UqBDUxI0SNpeDSZHp2/gFVQYDl6tvkJp98mnVSAlYX5zPvgd6tm0Dme77dAlZqVQhqYkaIGkvBpcn07DzwgOp71QvcEYCSRA9/awrorTngxt//3L7WoJD5HuDbrZVaFYKamBGixlJwaTI9O/+3t9783K4vRzse5FOhJNGur32T3Gp9DsiyjH6fXOZ75JYvnoOgJmaEqLHkXJpMz86/8/y3H/vuzOcf28OIXvMjYHLqWWC1PpdlGev6fSDzPWD54jkIamI2EjWWgksTCCCVI8eiqMxdJSE3OfXsan0uyzLu6vfbH64Cjat1CGpiNhI1lhEuXQLZ8/0j0XaNojLrSsKILMvItf/5D3xG3zeu1iGoiRkjaixjXJpUjhwDoqjMUEkY0br2Aet8xlDfN67WIaiJGSNqLGNcmlSOHCMXRWVK4q43KPjBgCGfMTTwjSt1CGpiNiNqLJtxaQI8MnWIQrkcUfCDAb1u40qdO4KamC2IGssWXLoEQu6RqUMMeQ80rizwqQCoidmaqLHck0uXuEP4j0BOTcx/I2osn41Ll8ipifnMRI3lfhI1lvtJ1Fjup38DxELkcP7W0SUAAAAASUVORK5CYII="},{"name":"Crystal motherlode shard","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAFJklEQVRIDbXBW4hd1RkH8P+3z23Od8Icg4mZiLCOl+Ts9SCoaeiLxCC9PJSGRCdQk6AW76Igam9KYjIZEmmpNLW+iKIQhT7ETjpRgjhtIUJBqBIMmXO20WTvaCZGQdKJe599WetbTUcPzqDReXB+P2KlsZCIlQYQh51GS6MvDjuNlsb3gVjpOOwAICJWPoA47DRaOg47jZbGjCQKMAurNuaNWGkAcdghIlZ+HHYaLZ1EXVZ+HHYaLZ1EwdWXXZoXRQb0sgzAmbPTAFi1MQ/ESgOIww4RsfLjsENEa9orDwXHnBMiWn2VsgZfKAEoI03NuaIIz3zKqo3vQqw0gDjsEBErPw47RHTXjTf08nzvm/8mog2rr7UWh7b8FqUSFi/FqeiavaN5bs+Z9Eg4xaqNb0WsNIA47BARKz8OO0Q0Mrw+t3bn38aJ6MGf/licFMYUImN3jKK+CKdPrn1h5GwaTyfZO+FJAKzauABipQHEYYeIWPlJFDgnu38x/Lu/7tu6Yd3o/gM7htcnWW5EjLHGSWGMCKyIEbEi1trpLDl4+CirNr4JsdJx2MEMIm/7zesAemLf2M6NG7bt2z86fFOjXivs/xXWFtYmeWFFjLVWxIgYI4WYj/97duJIl1UbX0OsNIAk6mLGk7dsbNRqBDzw4ksjw+sJ3vLFg4/+/FGkPeTpI+N/LArreZ4RKaw11hjjcmsKkef+eQhwrHzMRaw0+pIouPvGNQ64YukSrg0Q4HlEoJF7/pSdOoG0h/fefXjyjUqpBA/GOmOtsbawYsRYcXsOTrBqYy5ipdGXRMGda9dUymWBrBxaluUF16oEjwjbtuxAluHjj34z8Sx5Xr1Stc4aK9ZaY6117vCJk6enp996/zirNmYhVhozkii4efWqwXq9MTDgIA6A4IpLLk6N4WqViHbcthvxORyffPztVwbK1XK5ZL/g3FsfHG9dvESAPxw4CDhWPvqIlcaMJArWX3fN4CIeajazvBDAAXCyYmgoKwoiVMsl69zIuke2jz9VLpfqlQqRZ8W+GRy7culSB+cEAtk59iqrNvqIlUZfEgX3/WjtINeXN5tE3uTU1ECpAjgBrrxkSWrMooEa4Tz6z4mw4pUrZS83ZsXQsl1bRmvNxQ/9+V5xEHFb942xamMGsdLoS6Lg/p+sbQ7Uh5pNkAegOzUFoFapAFg5tKxerZIHgD7vpcbaY2c+8S9dLuJ2bd2L1P1q92aBJFm+/ZW/A46VD4BYacySRMFj63627KImAPJAIAImPzoNwEFWXd4a5HqS5oU1SV5Uy2UCntj2wrYdt4lzIq5X5HGa7hx7FXCsfADESmOuJAr23LqJAPKIACIANHlqCsDLv35+05N3XN9eUYiZ7qXVcqlEHgBxTsRlxsRZ+nkv2zX+GuBY+QCIlcbXJFGw59ZNnkcE0HkAEQBv+31Pb3x8Q61S+cHlrcLatCg8opLnAcgKk+R5nGbnsvT3Bw4CjpUPgFhpfJMkCgA8fftmj0AgIo8AeDj64dRAtSIiVmTqs7O9LEOfsbawdmKyCzhWPmYQK40LSKIuQH+5fTMReQDIIw8E+seRyTjLBBYWlUoFs4y/cxhwrHz0ESuNb5VEwTO/3EwgIvyrG1grSZaKhYMVi/MmJrv4imPlYxZipfFdkigAMPzDVVaQpOnrR45iDoc+Vj7mIlYa85BEXYDwJYdZWPm4MGKlMW9J1AXAyse8ESuNhUSsNBYSsdJYSMRKYyERK42FRKw0FhKx0lhI/wN9S5R/+u5cPQAAAABJRU5ErkJggg=="},{"name":"Corrupted ore","base64":"data:image/png;base64,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"},{"name":"Corrupted ore","base64":"data:image/png;base64,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"},{"name":"Runite stone spirit","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAFIUlEQVRIDbXBX4hcVx0H8O/vnnvuzPwmmVxtNlEMnqUgc08bGvKgCMGahSElDylCS1dKt+SlSEUoDRZRikqtPogISvFx8UlX36pIoFIpbBR22Vr3QWYvde3eJ3t7N3XadM7O/XPm2AyM7jJ/Ni9+PsRK456ZJMYIqzbuDbHS/b0uxpqLGtOYJAbw4o3nMPLyT38GgFUbxyFWur/XJSKMsYpwlEniF288h6OkL7/345+wamMuYqX7e10iYhVhBpPE3/zGsxcfPF+v16WUQoiyLON//uNb338ZcKwizEasdH+vi5HmosY0JolvfP1rCwunA1/6vu95VJZVXhTffumHgGMVYTZipQGYZAeAc665qDHBJPHzzz5z5vSCvMsn8oqyKIryOz/4EeBYRZiNWGmM9fe6RMQqwlEmiZe/8uhD5x+QIx55RVm88N2XAMcqwlzESvf3us1FDaC/1yUiVhEmmCReXn46CKS1tigG6+uvp2kGOFYR5iJWGkB/rwuguahNssMqwgSTxMvLTwVBzVqb54Nbt15P0wxwrCLMRaw0RkyyA4BVhGlMEi8vPxUENWttURTr639M0wxwrCLMRaw0jmOSGBg+8cTTvh84V1lre733X3vtJuBYRZiLWGkcxyTxY4991fcDITxrh9ZW/X7/5s1XAccqwlzESuM4Jokff/xJKSURWVtZO6yqYn9//9atN1i1MRex0pjLJHEYtjqda1L6AOzQDW1lbWmM2djY7PUyVm3MRqw0ZjNJHIatpaWrMpDkCQ80hLO2srYqBoOtrb+kaQY4VhFmIFYas5kkDs8udL50RQay0F8ITpz0Zc0Nh2U+yP/8B2M+2t7eStOMVRszECuNGUwSh2HrypVH/aBWPXSJw/v8Wt0TgoTvbFWY/u3f/zLPi83N9V7vQ1ZtTEOsNCaYJAYQhq3OlWvSr5UXLnF4X715QtYaJAR5wrmhLfLBnQ/3X10tinxjY7PXy1i1MYFYaRxlkhgYhmHY6VyTUgop8flO/eSpgJuyVhcycA6Aq8qyyg/e++0virvyjY3NXi9j1cZRxErjEJPEQCsM0elcE0JI6X+weP4Tn1lshJ8MGuxL6fkBCAA5WxWm/+6vX6mqoiyLPB9sbf2118tYtXEIsdI4xCRxGLYuX34kCGrCF0L4H91/ITy32DhxKuCm50tPBiB8zFWVLfJ//ernZXFQVVWeF9vbmwDSNGPVxhix0hgzSRyGLQBLS1eDoOZ5RML3ZYAvPtI4eSposB/URa0G59xwOLRVeWDe/c0rtiyqyhZFfufOnd3dbppmgGMVYYRYaYyZJA7DFoClpatSSiEECSF8UV348smFTwcN9oOa5we4yw2HVf929v7vVm1VWWvzfGDMwdtv/z1NM8CxijBCrDTGTBKHYQvAww93gqAhhPA8OnPmU0Te/ucuNsPTst4QsgZgaMuDD/7d/NsbcO6dd3atLQ8OBoNBf3c3TtMMcKwijBArjUNMEodh69Kly0HQOHfuswA8DyCPiG7ff1GeaHkfE4Lf/JNzQziHsbfeejOOt9M0AxyrCGPESuMok8RhuLCych0jnocRD0T4L+cwYW1tNU0zwLGKMEasNI4ySRyGLaC2snIdI54HwMNca2uraZoBjlWEQ4iVxgSTxADCcGFl5TpGPA+Ah2nW1lYBpGkGOFYRjiJWGtOYZAcgjJw9u4Bp0jTD/zhWESYQK43ZTLKDuwjTOYyxijANsdK4BybZwQRWEY5DrDT+n/4D6No9f08nNrkAAAAASUVORK5CYII="},{"name":"Runite stone spirit","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAFFUlEQVRIDbXBX4hcVx0H8O/vnnvuzPw2mRxtNlEMnqUgc4+GhjwoQrBmYUjJQ4rQ0pXSLXkpUhGKQRGlqNTqg4igFB8Xn3T1rYoEKpXCRmGXrXUfZHKpa/c+2du7qdOmc3bunzPHZmB1l52ZzYufD7E2uG82TTDGuoP7Q6wNgMFOb27BYDqbJgCev/Ecxl786c8AsO7gOMTaDHZ6AIiIdYxJbJo8f+M5HCZD+b0f/4R1BzMRawNgsNMjItYxJrFp8o2vPXvxM+ebzaaUUghRVVXyz3986/svAp51jOmItQEw2OkREesYk9g0ufHVr8zPn45CGYZhEFBV1UVZfvuFHwKedYzpiLUBMNjpERHrGJPYNPn6s8+cOT0v7wmJgrIqy7L6zg9+BHjWMaYj1gbAYKdHRKxjTGLTZOlLjz50/tNyLKCgrMpvfvcFwLOOMROxNgAGOz0iYh1jCpsmS0tPR5F0zpXlcG3t1SzLAc86xkzE2gx2ehibWzCYwqbJ0tJTUdRwzhXF8NatV7MsBzzrGDMRawPAprcxxjrGJDZNlpaeiqKGc64sy7W1P2ZZDnjWMWYi1gbHsWkCjJ544ukwjLyvnXP9/ruvvHIT8KxjzESsDY5j0+Sxx74chpEQgXMj5+rBYHDz5suAZx1jJmJtcBybJo8//qSUkoicq50b1XW5u7t769ZrrDuYiVgbzGTTRKl2t3tNyhCAG/mRq52rrLXr6xv9fs66g+mItcF0Nk2Uai8uXpWRpEAEoBG8c7VzdTkcbm7+JctywLOOMQWxNpjOpok6O9/9whUZydJ8LjpxMpQNPxpVxbD48x+s/WBrazPLctYdTEGsDaawaaJU+8qVR8OoUT90idUDYaMZCEEi9K4u7eDO739ZFOXGxlq//z7rDiYh1gZH2DQBoFS7e+WaDBvVhUusHmjOnZCNFglBgfB+5MpiePf93ZdXyrJYX9/o93PWHRxBrA0Os2kCjJRS3e41KaWQEp/tNk+einhONppCRt4D8HVV1cXeO7/9RXlPsb6+0e/nrDs4jFgbHGDTBGgrhW73mhBCyvC9hfMf+cRCS300anEoZRBGIADkXV3awdu/fqmuy6oqi2K4ufnXfj9n3cEBxNrgAJsmSrUvX34kihoiFEKEHzx4QZ1baJ04FfFcEMpARiB8yNe1K4t//ernVblX13VRlFtbGwCyLGfdwT5ibbDPpolSbQCLi1ejqBEERCIMZYTPP9I6eSpqcRg1RaMB7/1oNHJ1tWff/s1Lrirr2pVlcffu3e3tXpblgGcdY4xYG+yzaaJUG8Di4lUppRCChBChqC988eT8x6MWh1EjCCPc40ejenAnf/d3K66unXNFMbR27803/55lOeBZxxgj1gb7bJoo1Qbw8MPdKGoJIYKAzpz5GFGw+6mLc+q0bLaEbAAYuWrvvX/P/e01eP/WW9vOVXt7w+FwsL2dZFkOeNYxxoi1wQE2TZRqX7p0OYpa5859EkAQABQQ0Z0HL8oT7eBDQvDrf/J+BO+x7403Xk+SrSzLAc86xj5ibXCYTROl5peXr2MsCDAWgAj/5T2OWF1dybIc8Kxj7CPWBofZNFGqDTSWl69jLAgABJhpdXUly3LAs45xALE2OMKmCQCl5peXr2MsCAAEmGR1dQVAluWAZx3jMGJtMIlNbwOEsbNn5zFJluX4H886xhHE2mA6m97GPYTJPPaxjjEJsTa4Dza9jSNYxzgOsTb4f/oPDag0f5UqRuAAAAAASUVORK5CYII="},{"name":"Orichalcite stone spirit","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAFIElEQVRIDbXBX4hcVx0H8O/vnPtn9oyd3NWdRmjhrCjMPeTBP299KG5lCAQ3QknZClvzIFpFKEQUbONTSQ19EBF8Foyv++ZLXhrwYRV2WAKtlp2bJmGOL3q5C72azpm9f849JkMXdzo7s3nx8yEhFZ6a0QmmhOzh6ZCQCsB4dACgva6wgNEJgOvX3sDUzd/+DoCQPZyFhFTj0UF7XRk9dM611xXmGJ1cv/YGZvme//avfyNkD0uRkAqA0UMh4/HogIiEjDHL6ORnP/nxVy9caIVh4PuM86qq7j18+NaNXwFOyBiLkZAKwHh0AKC9roweChljltHJT3/0w2e7Xc/3fc9jjJVlWVXVW+/cBJyQMRYjIRWmjB4659rrCnOMTq69/oNut+t7nu/7jLFy6pc33wWckDEWIyEVjo1HB0QkZIxZRievfGfzaxcueL4f+D5jrCjLX7x9A3BCxliKhFTj0UF7XQEYjw6ISMgYc4xOtrZeC8PQWlsUR7u7d9I0A5yQMZYiIRWA8egAQHtdGT0UMsYco5Otre0gaDWNLYqj3d07aZoBTsgYS5GQClNGDwEIGeM0RidbW9tBEFpry7LY3b2TphnghIyxFAmpcBajE6DZ2voe537T1NY2ef7xe+/dBpyQMZYiIRXOYnTy8suv+r7Pudc09WPGmNu3/wQ4IWMsRUIqnMXo5MqV73pewBjZJ2pr68PDw93dPwvZw1IkpMJSRidR1On3Nzn3GENjm9rW1trJxOztDfI8E7KHxUhIhcWMTqKos7FxKfA8YsQIj1V1bRtbluX+/l/TNAOckDEWICEVFjM6OR91vtnf9Di7/M/75zyv5bGmwaSpf9/+oplMBvv7eZ4J2cMCJKTCAkYnUdS52N8MufdKdn/ND1Y85jPGiWrnHpX1u965oioHg7/k+X+E7OE0JKTCHKMTAFHU6fcvtzi/kt7rhsG5wFvhnBPjjDVNU9gmr6p3vHNFUQ8GgzzPhOxhDgmpMMvoBGiiKOr3L/uctzh77fB+5HvP+F6L8xYxAA1QWkxsfZ1/vqzLx/b2BnmeCdnDLBJS4QSjE6ATRej3NzljPuff0n//yjMra2GrzXnImc8Y4QnbNI9s8yZbLau6stVkcnT37t08z4Ts4QQSUuEEo5Mo6mxsXPS80Pc9j+jiPz78cntlNQzaPm8R8znDlHWY2ObntFrUlbVlUZTvv79fFMjzTMgejpGQCseMTqKoA+Clly4Fgc8Y50QB49/PHqyG7HOct7jX4qwBGgfb4BNbv8lWS1tba8uyfPTo3w8eJGmaAU7IGFMkpMIxo5Mo6gDY2LgUBB4R54wCzl/9173nV1ptj0LGQu5hqmqQToobwVpla+eqyaQ8Opp89NGHaZoBTsgYUySkwjGjkyjqAHjxxX4YthhjnPO1L6x5RJeTwbNhIDweMgagbprDsvrjl77RACP9sK5tUZjxeDIaJWmaAU7IGFMkpMIJRidR1HnhhY0wXHnuuecBMCIGMKJvJ3uR7zGAM/aH9a83zjWAw6c++OBukvwtTTPACRnjGAmpMMvoJIq629tXMUUEgAhgAAhPODSAw2ft7NxK0wxwQsY4RkIqzDI6iaIOEG5vXwVABIAwRfiUw2ft7NxK0wxwQsY4gYRUmGN0AiCKutvbVwEQASAssLNzC0CaZoATMsYsElLhNEYPAcLU+fNdnCZNM/yPEzLGHBJSYTGjh3iCcDqHY0LGOA0JqfAUjB5ijpAxzkJCKvw//Rew2Dp/10uUMwAAAABJRU5ErkJggg=="},{"name":"Orichalcite stone spirit","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAFE0lEQVRIDbXBX2hkVx0H8O/vnPsn+U13cpXNrg+LJ2ph7tEiqI+FupHBZaERYZdGpCnrg5QWobhYi6WodKuCiOC7rOBTXn1aqBSELEpCtIQimds2bU7fLjfI4HZOZu695x67A6EZJjPZFz8fYqXxyKzJMMaqg0dDrDSAweE+gNaKxgzWZABeu/0Sxt74/R8AsOrgPMRKDw73Wyvamp73vrWiMcWa7LXbL2FSGIS/+O3vWHUwF7HSAKzpsUoHh/tExCrFJGuyn/zoha995YmFhYUwDKWUVVVlH7z/yi/fADyrFLMRKw1gcLgPoLWiremxSjHJmuz2i88vL1+MgjAIAiGoqupRWf7s9V8BnlWK2YiVxpg1Pe99a0VjijXZj1/44aWLy+FDAZEoq7Isq1fv/BrwrFLMRqw0TgwO94mIVYpJ1mTr3/3OV5/4cjgmSJRV+fLPXwc8qxRzESs9ONxvrWgAg8N9ImKVYoo12fr6c1EUOufKcri19VaeF4BnlWIuYqUBDA73AbRWtDU9VimmWJOtrz8bRbFzbjQa3r//Vp4XgGeVYi5ipTFmTQ8AqxRnsSZbX382imLnXFmWW1t/zfMC8KxSzEWsNM5jTQY0zzzzXBBE3tfOuX7/P2++eQ/wrFLMRaw0zmNNduPG94IgklI41zhXDwaDe/f+AnhWKeYiVhrnsSa7efP7YRgSkXO1c01dl0dHR/fv/41VB3MRK425rMmSpN3troVhAKBxzjWNc5W1dnt7p98vWHUwG7HSmM2aLEnaq6vXozAQJAnwaJxrnHPDcri7+/c8LwDPKsUMxEpjNmuyy0n7m92nIxk8nb+7FAULJBrg2DV/5M/Z4WBvbzfPC1YdzECsNGawJkuS9rXuWhzKm8UHy3G0KEUgKAAq4OPK/UZcGI7qnZ2tfv+/rDo4C7HSmGJNBiBJ2t/ursVhcCPPluNoKY4WJQUUCKABRq7pl9UdsVSW5fb2Tr9fsOpgCrHSmGRNBjRJknS7a1EYxFJuFO8mUdQOZCyDBSkAeGDkmmPXvIpkVFdlOdre3un3C1YdTCJWGqdYkwHtJEG3uyaljKT41kfvPH6hdTGOWoGMpQiFJICAuvEf181PsVS6uqqq0Wi4u/uvfr9g1cEpxErjFGuyJGlfvXotiuJAPnTto3e+dKH12ShsySCWIpKEsdrj2PmXkQyrsq7r0ajc29sBkOcFqw5OECuNE9ZkSdIGsLp6PYpiIUiSXJDiB0fvfyYOHgvkogxiSR5oPOoGg9q9Qkulc3XtynL04MGDg4P9PC8AzyrFGLHSOGFNliRtAKur18MwlJ8gCqVcz7MrvPiYFLEUkZQYq5zPh6M74cXa1c650Who7fF77/07zwvAs0oxRqw0TliTJUkbwFNPdaNoUUopBF26dEkCa73ty4sxyyCSAkDdNEej6s9f/IYHPvzwwLnq+Hg4HA4ODrI8LwDPKsUYsdI4xZosSdpPPnk1ihavXPk8ACFAEASs9f6xFEWSIEF/+sLXG8DjU2+//c8s28vzAvCsUpwgVhqTrMmSZHlj4xbGhMAnCAIA4SEPeJxhc/NunheAZ5XiBLHSmGRNliRtIN7YuIUxIQAIzLW5eTfPC8CzSnEKsdKYYk0GIEmWNzZuYUwIAAJn2dy8CyDPC8CzSjGJWGmcxZoeQBi7fHkZZ8nzAp/yrFJMIVYas1nTw0OEs3mcYJXiLMRK4xFY08MUVinOQ6w0/p/+B3IPMn94/WhVAAAAAElFTkSuQmCC"},{"name":"Drakolith stone spirit","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAFGklEQVRIDbXB0Ytc1R0H8O8599w7s7+JwyVmsxZTfvM295CHVihCgsIGBiGwFtR2W7o1tVKrVJTYPoj6JGoUKaXQvyAvvuxbX1KapPRhTcmyXdBSdm6DYc5bb2+KY+yc2Xvn3ntMhizdcXZm8+LnI4g17ps1McaI27g/glgDGPR2ADRaGjNYEwN48/wrGLvw+z8AIG7jMIJYD3o7jZa2puuca7Q0plgTv3n+FUzylf/2b39H3MZcglgDsKZLHA16O0II4giTrIl/86uXvnPyZL1WC3xfet5oNPrXzZtvvPMe4IgjzCaINYBBbwdAo6Wt6RJHmGRN/NqLLxxfXFS+7yslpczzfDQavfHuBcARR5hNEGuMWdN1zjVaGlOsic//8heLi4u+Ur7vSynzsbcufAA44gizCWKNPYPejhCCOMIka+IffH/luydPKt8PfF9KmeX562+/AzjiCHMJYj3o7TRaGsCgtyOEII4wxZp4dfWntVqtLMss293YuJokKeCII8wliDWAQW8HQKOlrekSR5hiTby6uhYE9aoqs2x3Y+NqkqSAI44wlyDWGLOmC4A4wkGsiVdX14KgVpZlnmcbG1eTJAUccYS5BLHGYayJgWp19VnP86uqKMuq3//8ypVLgCOOMJcg1jiMNfFTT/3I933PU1VV3GGtvXTpj4AjjjCXINY4jDXxM8/8WKlASlHeVZRlcevWrY2NvxK3MZcg1pjLmjgMm53OiucpKVGVVVEWZVkOh/b69c1+PyVuYzZBrDGbNXEYNs8sn/UD5QkhJFChKItRWeZ5vrV1LUlSwBFHmEEQa8xmTXwibJ7urASefO7YX8IF1ANUpbIFPrjxPWuHm1tb/X5K3MYMglhjBmviE2HzdGelHqiXlq4sNRX58CU8iaLC7QyvbT2yO8o3Nz/u928Tt3EQQawxxZoYQBg2O50nF3zvxaUrS00V1kEBlAQ8oEI+wn8tXv37I7tZsbm52e+nxG1MEcQak6yJgSoMwyc6T3qetxCIX3/78tEF1azDDwCFuxxQIs/w87+dyor8juvXN/v9lLiNSYJYYx9rYqAZhuh0VjwpfeX98Mjl6Lg6fgRUBxTg4R4Ht4ufXTud5cWoHA2Hu9vb2/1+StzGPoJYYx9r4jBsLi8/oVTN95XyxE8af24/pB4k1OuAAjzc44Acz3382DAflWWeZfknn2xlGfr9lLiNPYJYY481cRg2AZw5czYIfCk95Ym69F5vXT66gEYdCAAFOMABFZDh2Wun86IoyzLP8y+//OKzz+IkSQFHHGFMEGvssSYOwyaA5eWzQaCE8DxP1Dzv5Yf+1DqqHqgBCvAxplDg89t4efvR0ahwbjQc5ru7wxs3/pkkKeCII4wJYo091sRh2ATw+OOdWq0upfQ879ixY74Uzzc++tYD6kgNUAp3lLj1P3z4n6crh565WRRlltnBYNjrxUmSAo44wpgg1tjHmjgMm6dOLddqCw8/fAKAFEIKSInn6aOQlJJKSbz/76fLCpWDwz2ffrodx/9IkhRwxBH2CGKNSdbEYbi4tnYOY0JAQEBAAgJwuKsC4OAwYX39YpKkgCOOsEcQa0yyJg7DJlBbWzsHQAgAAmMC9zh83fr6xSRJAUccYR9BrDHFmhhAGC6urZ0DIAQAgRnW1y8CSJIUcMQRJglijYNY0wUExpaWFnGQJEnxf444whRBrDGbNV3cJXAwhz3EEQ4iiDXugzVdTCGOcBhBrPFN+grWUyV/ZBLUigAAAABJRU5ErkJggg=="},{"name":"Drakolith stone spirit","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAFEUlEQVRIDbXB72tkVxkH8O+599w7yTPL9bZsNl1YfPJu7tEiFGGhXSgbDCsLRoR2G5VmDUpZWiq1i6UopUqtUlQE/4F9I0Le+mpl14qQtZCQWvJCZi5t2px3Xu62TF3m7NwfZ47JYGimk5nsm34+gljhgRmdYoi4hQcjiBWA3l4bQHNBYQKjUwCvXX8JQ2/+4Y8AiFs4iSBWvb12c0EZ3XHONRcUxhidvnb9JYwKZPCL3/6euIWpBLECYHSHOOnttYUQxAlGGZ3+9MXnH/vqozMzM0EQ+L5fVVX64Qev/vJNwBEnmEwQKwC9vTaA5oIyukOcYJTR6fUXrs3NnQ5lIKX0PFFVdVGWP3vj14AjTjCZIFYYMrrjnGsuKIwxOn35+efOnJ4LDkghvLIqy7L6+a9+AzjiBJMJYoVDvb22EII4wSij05XvfPtrj34lGPKEV1blK6+/ATjiBFMJYtXbazcXFIDeXlsIQZxgjNHpysrVMAystWXZ39h4O8tywBEnmEoQKwC9vTaA5oIyukOcYIzR6crKs2HYsNYWRf/OnbezLAcccYKpBLHCkNEdAMQJjmN0urLybBg2rLVlWW5s3M6yHHDECaYSxAonMToFBs88c1XK0LnaWtvtfnLr1k3AESeYShArnMTo9Kmnvitl6PuetQNr616vd/PmXwBHnGAqQaxwEqPTp5/+fhAEQghra2sHdV3evXv3zp1/ELcwlSBWmMroNI6jpaXlIJAABtbawcDayhizubnV7ebELUwmiBUmMzqN4+gbi5dlKH348IDBwNpB7Wy/39/efifLcsARJ5hAECtMZnR6Lo6eWPpWI/B+cPrv8SwolHYAU+KtD873TG9nZzvLcuIWJhDEChMYnZ6LowuXlmelf+3s3+YjSQECD9KXta0/LfCT7cf6Rb21tdHt/pe4heMIYoUxRqcA4ji6tLQ8E8prj9x+JJJfmkGzAc8DPGCAqsbHBj/e+npRlpubW91uTtzCGEGsMMroFBjEcXxpaVkGkqR4mW89PCujWcgAkPi/GlWJtXceL8qqLIvNza1uNyduYZQgVjjC6BSI4hhLS8u+74eBd4VuJWfl/CnMNAAJSBwQgAUKXN14oqjrqqqKor+9/a9uNydu4QhBrHCE0WkcRxcvfjMMG9L3pe9/L/prMi9PNxE2AAlICYEDNVBjbePxflnWdV0U5c7OFoAsy4lbOCSIFQ4ZncZxBGBx8XIYNjxPSN+fleLVhdsPE2gGCIBAYt8AGAAFrv7zfFnZurZlWdy7d293t51lOeCIEwwJYoVDRqdxHAFYXLwcBIG/T4hQ+i+evckPyVOzQAB4EgJwgMOnXbzw7vm6rq21RdE35v777/87y3LAEScYEsQKh4xO4zgC8OSTS2E46+/zxNyZM1LgR6f+fDaS1ACkxL4aH/fwu+zKAPjoo11rq/v3+/1+b3c3zbIccMQJhgSxwhFGp3EcXbhwMQxnz537MgDPg4DnCfyw+aeHaMb3IAXe+s8V6zDAZ95779003cmyHHDECQ4JYoVRRqdxPLe6uoYhz8M+AU8AEDjg4ACHz1tfv5FlOeCIExwSxAqjjE7jOAIaq6trGPI8AB6mWl+/kWU54IgTHCGIFcYYnQKI47nV1TUMeR4AD8dZX78BIMtywBEnGCWIFY5jdAcQGJqfn8NxsizHZxxxgjGCWGEyozs4IHA8h0PECY4jiBUegNEdjCFOcBJBrPBF+h+A0x5/yiKabQAAAABJRU5ErkJggg=="},{"name":"Medium plated rune salvage","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAADIUlEQVRIDbXBT4hVdRjH4c97cpyZd4zI2kTZiwjd+1u0FCFkcFWLttXKoGQqdBOMRLSOFi4UQQIjy3IhtYgWrdzJIIIE0ao6SMIJoUVFiOMZHTvvt3tnGpph/jgu7vOYR2GUzKMwSuZRGCXzKIySeRQeRtvUgEeP7TGPwja0Tc2S3qGXgPryJcCjx4OYR2FLbVMDz7/8KkMigewS0E+XvvXosSXzKGyuber9rx3pMhnS2NjOTN1fvIsEossfv/vKo8fmzKOwkbapgQOHj2KMj3tmIiElInX/XovoskP64ZsvPXpswjwK67RNffDNdxkw2zHhLJPITCUSCOne3Ta7jszvv/7Mo8dGzKOwVtvU028dp6qAnRNTrJZKhERmKhcX7pBdp6TTtYtnPXqsYx6FVdqmnn7n/eqRCqvGJ5x1JKEcIIcWF+6gTOXVL86APPqsZR6FFW1THzr2QWUVVUVllVVjk1P8T6SQUiJTUmaHcrGdT4nMK5+f9uixlnkUVrRNvf+VNx57OrCqqgyrMBufnGJIiJRASNklygFJiwvzdJlKlHOfnvTosYp5FFZpm/rF2Q+xIcyoBmxsYhcSEmgACSmVA/fb+ewylSjp8vInJ0AefVaYR2GVtqlfeP3Yo0/tqayiMswwq7CxSUcgISUg3btzW0pyoEslXaZ0+eOPQB59VphHYa22qQ8cPvpk7MMMDDOgMnZMTDEgLbbzKaEcIFOZt36/yZJrF8+CPPqsMI/COm1THzwy+/gze8AwwDAbn9wlsbhwGyklpMy8dbMBrl44w3/k0WcV8yhspG3qg0dmdz+7FwMMM5ZJaOjv325k1129cIYhscSjz1rmUdhI29TTM7OZ7N67r8IwwFim/PPG9SvnTzMkwKPPJsyjsIm2qadnZnfvfY4hM2PZH9d/vnL+NAjw6LMl8yhsrm3q6ZnZJ/b1WfLXrzVo7twpkEefbTCPwpbapp5++72KKvMf0Ny5UyCPPttjHoUHaZsamJ45PnfuJMijz7aZR2Eb2uYXMJBHn4dhHoVRMo/CKJlHYZTMozBK5lEYJfMojJJ5FEbpX6kgrHCO5Ee7AAAAAElFTkSuQmCC"},{"name":"Large plated rune salvage","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAADpklEQVRIDbXB32uWdRjH8fd1035dM0grIkm/soTn+Z6FEILIkE6DToToYCCZGPMkGIn9Bx0VhlCB0aKioA4iqIPSAxlDECmiyHbHim7U6JdFOO/90Pv69Oyx0cRtzYO9XuYps5HMU2YjmafMRjJPmTtRVyVdnlqsg3nKrENdlXS1HnucCIjyzGeApxZrMk+ZNdVVCTzyxFONBEFACKIJobjw+ceeWqzOPGVWUVcl8OiTz4CAJqKnpy8iIK7PzxFC0UTzzacfemqxCvOUWUldlbtHRukw+voGIoSEFBEoQHPzc0SDRMSXH73rqcVKzFPmNnVV7n36Obru6nduCoUaJKRAhK7P1aEghOL8B296anEb85S5VV2Vw4efp6u3z1kmJCSkUBAKNTdmrzUSEaE4//5JTy1uZZ4yS+qqBPaNHsOK3v5BVqToICIkIhZmZ0IimkY6986rIE9tljFPma66KveNvoAVhRlWYNY34NwqJCTUER0ooomFuWtEhALp7FsnPLVYxjxloK7KXfsP3PPgNsyKosAMs8KKnoFBEDdJSAHEIhQKoehYmJ1BCgVNTI6/4qnFEvOU6aqrctf+A1u2DxVmUGAdYNbnmySBkBABSCiiCRQdSPOzM0jRNCgmTr4E8tSmyzxluuqq3DNyZNMDW7FFmBVmFAXQ1z8YCIEE6kBCioj52RkiogkUoaCJS99+MT152lOLLvOUWVJX5Z6RI3dv3V6YURhWFAZY78CgAAkJFAJpvp5BjUIoFjWBIhSEzrz2IshTGzBPmWXqqtw9Mnpf2okZiwyjgF7fFBIChDQ3O4NEE6FQBBF//3KZJefeex3kqQ2Yp8wydVXuHhnt6R3Y/NA2MDrM6DDr7d+EtDB7FRQCKRRE/H35Il3NjetXf7t04fQnIE9tusxT5lZ1Ve49OAZs3r7D6DDM6DBDAnUgofjrYhVNA5x9+wT/kac2S8xT5jZ1Ve49OLYlDWFGh1Fg/EshkP78aRqYHD/OIrHEU5tlzFNmJXVVDh8a27JjJxgGGEv+mJ4CJsePs0iApzarME+ZVdRVOXxo7N6hFouMris/TkUTk+PHQYCnNmsyT5nV1VW579ljm3c8TNeVH0rQxBsvgzy1WQfzlFlTXZXDh4/eP9T6ffq7X7//upw4BfLUZn3MU+b/1FU5fPjoz1NfTU+cAnlqs27mKbMOdVWySJ7a3AnzlFmfupry1OYOmafMRjJPmY1knjIbyTxlNpJ5ymykfwAuaBt/X6bq4wAAAABJRU5ErkJggg=="},{"name":"Large plated rune salvage","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAD8ElEQVRIDbXB32vVdRzH8ef7284522cT0pLI0o8s4ZzvnQghiQzpNuhGiC4Gkokxb4KR2H/QVWEIFRgtKgrqIoK6KL2QMQSRIops31jRFzX6ZSFu3+2cs+/71TnHRhtua17s8bAQUzaThZiymSzElM1kIabcjSLP6AmxzgZYiCkbUOQZPfXHn8AdPLvwORBinXVZiCnrKvIM2Pvk06UEjoMLvHQhv/LFJyHWWZuFmLKGIs+AR596FgSU7pVKzd3B280FXMhLL7/97KMQ66zBQkxZTZFn+0fH6DBqtQF3ISG5O3LQQnMBL5Fw/+rj90KssxoLMeUORZ4dfOZ5evr6A7e5XCUSkiNc7YXC5biQX/7wrRDr3MFCTFmpyLOR4y/QU60FlnEJCcnluFzl4vxcKeHu8ssfnA2xzkoWYsqSIs+AQ2OnsKTaP8iq5B24u4R7a37WJbwspUvvvgYKscEyFmJKT5Fnh8ZexJLEDEswqw0EVnIJCXV4B3IvvbUwh7vLkS6+fSbEOstYiClQ5Nm+w0fufXAnZkmSYIZZYkllYBDEbRKSA96FXC7kHa35WSSXU/rUxKsh1lliIab0FHm27/CRbbuGEzNIsA4wq4UhSSAkhAMSci8deQdSc34WycsS+eTZl0EhNuixEFN6ijw7MHpi6IEdWBdmiRlJAtT6Bx0hkEAdSEju3pyfxd1LR+5ySr/23ZczU+dDrNNjIaYsKfLswOiJLTt2JWYkhiWJAVYdGBQgIYFcIDWLWVTKhbyrdOQux3Xh9ZdAITYACzFlmSLP9o+O3R/3YEaXYSRQDUMuIUBIC/OzSJTucrnjfvPX6yy59P4boBAbgIWYskyRZ/tHxyrVga0P7wSjw4wOs2r/EFJr/hbIBZLLcb95/So95WL71u/Xrpz/FBRigx4LMWWlIs8OHh0Htu7abXQYZnSYIYE6kJD/fTX3sgQuvnOG/yjEBkssxJQ7FHl28Oj4tjiMGR1GgvEvuUD66+cZYGriNF1iSYgNlrEQU1ZT5NnIsfFtu/eAYYCx5M+ZaWBq4jRdAkJssAYLMWUNRZ6NHBu/b7hOl9Fz46dpL31q4jQICLHBuizElLUVeXbouVNbdz9Cz40fM9Dkm6+AQmywARZiyrqKPBs5fnL7cP2Pme9/++GbbPIcKMQGG2MhpvyfIs9Gjp/8ZfrrmclzoBAbbJiFmLIBRZ7RpRAb3A0LMWVjinw6xAZ3yUJM2UwWYspmshBTNpPFvY+xmWxg+0NlKV9sA9ZX6Utot9rVWrUysMVbRTFXANVaddHpH9zSnJ8rW021W9VKdRGSShWpbDfNkqSv0nePAYulQuiX1CoK+vr+AQcVRJz5g8WhAAAAAElFTkSuQmCC"},{"name":"Huge bladed rune salvage","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAADfUlEQVRIDbXBP2iUZxzA8e8Tzfn6e/On1zNk/N3m82xC10xBFKGI0E1wasZssXSQhhIQQgdDISK3ZNHJqbq0QzkCDYJzh7tXxLtnOKo1vYjt+yCS3FM9fOEVjV4kfj5G1PE5GVEH5N0WQ2ndcaiMqMu7rbTugm8DMca07jg8RtQBwbdFLZB3W8YYUcshMaKOQt5tpXUXfFvUcnDBZ7zDiDqG8m4rrbvg26KWgwg+Y+jsd6tAvv2YQiWdMqIOyLuttO6Cb4taRhZ8Bpz9/ideGQyAfPsxQ4MYk4lpwIi6vNtK6y74tqhlZMFn565cG+zu8spgAOTbjwcxMpRMV9kbNNdXjKjLuy1K0rrjY4LPzl25xtBgd5fB4N+nf1FIpqvsDZrrKxCNqAOCb1Miatlf8NmZy1cp/Lf9NyXJdJW9QXN9BaKoNaKOgwg+O3P5KoWdXpfC+DFJpqvsDZrrKxBFLWBEHSMLPjtz+SqFnV6XknSqNpYkzZ9/hChqGTKijtEEn80v/nA0SRja6XUpSadqwGZjFaKopWBEHSMIPptfXIYIHE2SnV6XknSqBmw2ViGKWkqMqONjgs/mF5d5LQL9XgcYT44zlE7VgM3GKkRRy9uMqOODgs/mF5d5LQL9XofCeHI8naoBm41ViKKWdxhRx/6Cz+YXl3kj9nsdSiaqM0fHj202ViGKWt7HiDr2EXw2v7jMG7Hf61AyUZ0BtjbWIIpa9mFEHe8TfDa3sMRQJUn7vUeUTFRngK2NNYiilv0ZUcc7gs/mFpYo9HsdoJIIQxPVGWBrYw2iqOWDjKjjbcFncwtLFPq9DoVKIhPVGWBrYw2iqOVjjKijJPhsbmGJQr/XoWSyNjteSbY21iCKWkZgRB2F4LNLjTvt5t1jk18A/V6Hksna7BEzdu/mdYiiltEYUUch+OxS4xfgz19vvwx5Wj2RP99haLI2e8SM3bt5HaKoZWRG1FESfHbqwsWXIQfS6on8+Q4wWZs9Ysbu3bwOUdRyEEbUUQg+O3Xh4ljl+ItnT4Gvvvm23bw7Nl4B7t+6AVHUckBG1DEUfHby9Nfpl7PAi2dP/3n04MnD9qXGnQd//Hb/1g2IopaDM6KOQvDZydPngWfdB08etiGC4bUoavkkRtRREnx28vT57Pe7EEUtEHxb1PKpjKjjbcFnEEUth8GIOj4nI+r4nP4HdfZhN+nabDgAAAAASUVORK5CYII="},{"name":"Fire talisman","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAE2UlEQVRIDbXBX4hjVwHA4d+5s7bLGbmO+LAIF848VHPPk+CDUlD0KSCl0IAUkUKYYH0IglLqgxQr/acv0lbFPIxyY+yyg+u6FESLxYels2wdAiV1lcwtS5ujU8q4o800ycnknLt73bk0mJAZd+dhv09IpTk5a9J6rcpUI2kBUpVYIKTSo16XqeVVze1Yk65HIdApV5jRSFqAVCVmCKn0qNcVQjAlVcztWJOuRyHQKVeY10haUpWYElLpUa8rhJAq5nasSZlRe+Rrp++5F2gnzUejlU65spk0gasEUpUoCKn0qNelsLyqOYY1KfCtb9QOJgfOuYm7xR9MxqeWPvLxlY91f3P+0WgF+NlO/yoB5FLFFIRUGrBmG8jzfHlVM8OaVKqSNekTj33be78/HH7ij7/655cedt5nWeacG08m93Yu/atPm2A9Cr+58wHkUsVMCak0U6NeVwghVQxYkwJf4OZlgqe/9/jQju1oHP7+l8DOlx+OLp1/6/MPOp9573f39t7o/BVyEJBLFTNDSKVHve7yqgZGva4QQqrYmvSlKHy9XGkkLeD7j39nMBjKl9eZce3+h+57/eU3P1P2zr3Z7e7uXpeqxAIhlQZGvS6wvKqt2ZYqtiat16pAI2n9+OkfDG+x9p7f/pwFf/vsV7z3g8Hg8lYbcqli5gmpNAVrtgGpYsCatF6rAo2k9fyzT03cZDQa3Tz7AgvSzz3onNsf9F+70oZcqph5QirNAmvSeq0KNJLWT374jPP+YDI5GI/zcy8y79r9D3nvr+/tXd5qQy5VzDwhlWaBNWm9VgUaSeunP3rOZ845P5lMnPece5HC9fIjk8xnLhva4e7u9a03OpBLFTNPSKVZYE26EYWb5QoQf+rTPnPOH7qR3fBZ5rz3zjmf+cxbO94fDN59773O1b9DLlXMPCGVZoE16UYUbpYrQCNpPf/sUxM3uZHd8N5nWeayW7zzfmwPhna4/8EwffvtXu8fgFQl5gmpNAusSTei0MFWuQI0ktaT333s1KmlzGc+y3yWeeec9yM7HgyH/37//deu/KVeqwKNpCVViRlCKs1RrElbUQhslSsUTp8+vRQEYinwzjnv3cQN7eg/+/t/+vOleq0KvHOx+Uo/gFyqmCkhleYY1qStKFyCK+UK87z3v3jpXL1WZeqdi81X+gHkUsXMEFJpjmdNuh6FnXKFYxxcbFJI+gHkUsXME1JpjmJNSqFeq1JoJ82vn1nJODSmT+HahFt+3Q8glypmgZBKM8OalEK9VmVGO2kCbQLghTPhgD6FJ3cDDuVSxRxFSKWZsiat16ocpZ002wSQc0jwPzkgVcwxhFSagjXp2Si8Uq5Q+OgfmsMH1phqJ802AeRSxYA12xSkivm/hFSagjXp2Sjs+r7nQ8MH1oDNpPnF2hrQSFqQSxVzEkIqTcGa9IkzN4HndgOgXqtSuJY076utAY2kBblUMSchpNJMWZNSWI/CTrkCbCbNT8JatLJZrgCNpCVViZMQUmlmWLMNYj0KKVzY6b9KsBGFm+XK3sXm+X4AuVQxd0xIpVlgTboehcCFnf6rBBtR+Lthn8KFfiBViTsmpNIcxZqUD+Ugvrpy80I/4FAuVcwdE1JpjmHNNiBVDFiTQg5IFXMSQirN3SSk0txNQirN3fRfnp1tfwc3VN4AAAAASUVORK5CYII="},{"name":"Water talisman","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAE0klEQVRIDbXBT4icZx3A8e+TjRqePfQR9CAKz4LovM/dkydPevIyB5GhdHAwIIOglHoo4p/Wai+1UIWXpcLbTuwKSgzeJCGVUErWkKRE3TjzSqnzFkq73WhnnZlndp7fs3m7+zZDZ5hdmz3k81HaOk7OF3m71WQmzTqAtjWWKG0dMO53qayuOT6KL3Jj1oFGfZM5adYBtK0xR2nrxv3u6przRQ8oy3J1zfFRfJEbsw406pssSrOOtjVmlLYO8EVP2wQY97tKKW0TjuKLnDmth7955uOfANJsy5izjfpmmt3g0G1ta1SUto6Zcb+7uuZ80dM2YZEvcuC7327tTfdCCNNwQPamk9MrH/ukeejc7/9tzFlgMPg13IZS24SK0tZRGfe7q2vOFz1tE2Z8kWtb80X+w0e/JyK7o5FIkBCDSIwxhDCZTi9fWYV34aYx64PBd6DUNmFGaeuAcb+7uuZ80dM2oeKLnENfhqtPPv7YyE/8eCIxSIxRokQRiUGiiGzfufParb9DCQpKbRPmKG3duN9dXXO+6GmbUPFFbkynUf9LmnWAHz32/eFwFO/elRj34wF58c+f/8ZX/ikiQURC+Fu3u729o22NJUpbN+53mbO65nyRt1tNIM06zzz5k9EB70UkSpS78fk/fe6Rr70uUURikCgiw+Hw1WvXodQ2YZHS1gG+6LFAtVtNIM06zz71xDRMx+Px3jRIkOf+8CkqD3/1XyIxxv0Qwu5w8MrV61Bqm7BIaetY4ou83WoCadZ57hc/CyJ70+neZDIVeealh4CzX39TogSJMe6LyM6dO69euw6ltgmLlLaOJb7I260mkGadXz39c4khBJlOp0EkiEgIEqOITKPEEEd+tL29c+21W1Bqm7BIaetY4ovcmI1G/RKQfOGLEkOQQ/txX2IMIhJCkChRvJ/sDodvvf32rX/chlLbhEVKW8cSX+TGbDTql4A06zz71BPTMN2P+yISYwzxgASRid8b+dHu/0b5G2/0+28C2tZYpLR1LPFFbswGhEb9CpBmnR//4NHTp1eiRIlRYpQQgsjYT4aj0X/ee++Vq39tt5pAmnW0rTFHaes4ii9yY14AGvUrVM6cObNy6pRaOSUhBJEwDSM//u/u7sXLV9qtJpBm78BFKLVNmFHaOo7hi9yYF2ClUX+ZRSLym9/+rt1qMpNm78BFKLVNmKO0dRzPF7kx6436JsdIM8U9L0KpbcIipa3jKL7IqbRbTSpptmVMAyIwYMIHBq9z6CUotU1YorR1zPFFTqXdajInzbY4dBMw5pcDhnxg8FMOldomHEVp65jxRd5uNTlKmm3BTSg5pPhQCWibcAylraPii9yYc436y1TSC59u13eYSbMtuAmltgngix4VbRP+L6Wto+KL3JhzA7ogVNr1HSDNbrRbXwLSrAOltgknobR1VHyRYx7nwOBpoN1qUkmzt9qtzwJp1oFS24STUNo6ZnyRUzFmvVHfBNLsBnzGmG816peANOtoW+MklLaOOb7ogTJmncpgcB4uG7PRqF9KszGch1LbhPumtHUs8UVuzDowGJyHy8ZsDAZ/5J4L2ta4b0pbx1F8kXNPCQrqcIFDpbYJ901p6ziGL3qAtgngixxKQNuEk1DaOh4kpa3jQVLaOh6k9wGywbV/XSAZrAAAAABJRU5ErkJggg=="}],"triskelion":[{"name":"Blank","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAM0lEQVRYR+3QMQ0AAAjAMHgxwY1/gSCDp1OwNKtn47E0QIAAAQIECBAgQIAAAQIECHwLHNXiKkGmss7lAAAAAElFTkSuQmCC"},{"name":"Sealed clue scroll (elite)","base64":"data:image/png;base64,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"},{"name":"Sealed clue scroll (elite)","base64":"data:image/png;base64,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"},{"name":"Sealed clue scroll (master)","base64":"data:image/png;base64,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"},{"name":"Uncut dragonstone","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAEAElEQVRIDbXBz24bVRTA4d+54yjohj+zYX2zy9wH4A0QUh+hIRV9C9LmZdiyrVpZiC5YIEtVJbbO7DxCApqmyXVqj5PxzDnEVi1spYUgNd8nPkTukvgQp6MhKzu7kY9KfIjT0VBEWPGh4OMRH+J0NBQRHwrugPgQp6MhSzu7kf9SV6UPe9ya+BCBujoGzGxnN7Kmrko2fcXXL3kO+LDHLYgPkZXpaCgiPhR1VbL0Dd/yDwNR7IwT4Dees+TDHh8mPsTpaLizG4HpaCgiIA/yozY15Nmb9LtiSgc4xJEBSjfmTYdlCPCSnwEf9ngf8SEC09EQ2NmNdXUMcpAfKZ0lk1wysldppHTgAKVzZA5pmCk2owYFe8lzH/a4QXyILNXVMeBDUVflg/wI6OgsWS/vASmdXFEDiikd0NKAOK5l4H7hRzAfCjaJD5FNdVUe5I8FMbRL816+beg4nSo651IxUKClYcGxIA2TAX0f9tgkPkTW1FW5nx86nCCGzVOzlW+dpxMWDGTODARouGJBwGZMMxjQB/OhYI34EFlTV+V+fmjJJBeHm6fGIRecAUrXoRluTuOQhisWZMZEUQcv+AnMh4I14kNkTV2V+/kjMMDhFAXG6YQFcThFgStmLQ3INj7xFwsOeEHfhz3WiA+RNXVVPsiPDAUUc4jgUjoRnKGKOURRsClpm88SJ6xkMKAP5kPBivgQWVNX5UH+WFHAUid51qX5hKR0PbZYUkxpr5gBl0xY6lDgBX0wHwpWxIfImroq9/NDw0AEMrI2tRe8ntNmOIdzZErnyM559QVfnvMHON7RAX0wHwpWxIfIproq7+eHpA6c5A4MGKfXYCxIS/uW80/5bIvtKRcNU3As6IA+mA8FK+JDZFNdlfv5I8NIBh1kWe7G6QxQWrAxp57Pwbb4ZMbkkgnv6IA+mA8FK+JDZFNdlQf5IxBFLXWKZXlvks4Bo7tipljGlmEtV4CiDRMW3IBnYD4UrIgPkRvqqrzP95K7DNekS4eb8tYhNRdKp5hDHL2GOSgY6IxZhhvwDMyHghXxIXJDXZX7+SHgcF1qIANeMeqRKSgKBqI0kPGOa5gOeArmQ8GK+BC5oa7K/fzQIR0mcJ7+dGSAoh0tGEstrXJNHc4hNZMBT8F8KFgRHyI31FV5Pz/MkC61b3gFCBgdZICAQxR7y5nDAco1HfAEHJgPBSviQ+R96qoE7vEQzNEDAQNR1LEw5hREMegcGfArT8B8KFgjPkQ+oK6OQVi6x3cKjmvicGNOlWsKDhjwhAXzoWCT+BD5V3V1zIKwdI+HQJ8f2GCADwU3iA+R26mrYxaEBWONDwUfID5E/qe6Ovah4HbEh8hdEh8id0l8iNylvwGSpe1wgIp9hQAAAABJRU5ErkJggg=="},{"name":"Uncut dragonstone","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAD2klEQVRIDbXBQW4TVxjA8f/3ZpyUR1uN1AO8pecdoFdohXoCKGZBz1BVNA1H6b67NgpCCKkrZKnKBTKLLmYBEQk442A/e+yZ95WxZMmWSRUW+f3EOs9tEus8t0ms89wmsc5zm8Q6z+cIZWFdnxsT6zzXC2XBtm/5/oQXgHV9bkCs8+wIZcHKd/wopIDSRNSQApecASe8ZMW6PtcT6zzbQlkMskOITdW85wxiJEZiSgoIyZL6A5cQWTnhJWBdn08R6zzbQlk8yp4qaNVIZgTzpvrX8JEAkWhIgTkTA1OmrJzwwro+O8Q6z7ZQFoPsUDBKVKIhUbSqzmsmIBGNtKANS0MCGBLQv/kD1LqcbWKdZ1soi0fZU0VBm6pJsz2I4+qiJS6poY3Q0Bg6kRYEzILpkGPr+mwT6zwbQlnc55c06wkGWFazNLszqt6AgCakgSuDAbMgGJIIBuZMIBlyBGpdzgaxzrMhlMUgO1AQOk21ENIPjIBI09CkpDXzhLRmDtGQTBlHInDCC1DrcjaIdZ4NoSwG2SFIWy32si/qai6ZjKtzwGCERNFIWxOASLvP3TFvgZaYYIY8s67PBrHOsyGUxSA7hAi0xJQecFW9A1paVgRamhmTfe6MeJtgQOjokGeg1uWsiXWeDaEsBtlvgKJt1URaRaeMQRN6BhOJBlmymDExSCDQaVkZ8gzUupw1sc6zIZTFg+wJFSYTQ89ARN9XrxualBTosb9k0WNvxNlXfHPJGZ0EWpAhx6DW5ayJdZ5toSweZE+0UiDNEkVBLqtziGAMpqEeM/qSr3vsT7laEEBAQYYcg1qXsybWebaFsniYHQDLqjYkadYDxtU7QGkjOubiLpmi++zPmAYmEIGW9h+eg1qXsybWebaFshhkByAJSV3V0CbZ3lX13iAtsWYKmtCLaEsNRHTOlI4ZcgRqXc6aWOfZEcriYXYgfCRNVQtpYAwyY6I0kRaShHTJPPJRhHbGLKE35AjUupw1sc6zI5TFw+xXECFpqplkqVbNBa8NBjSirDQsAYMBDElgMuQI1LqcNbHOsyOUxSA7VCIgyKg6oyOgDY2iEMFEmkhLRwxJYDzkGNS6nDWxzrMjlMV9fk6zPUUvqtcpaaSNKGuGBOIHRiBgoI0w5E8woNblrIl1nk8JZQH8wE8RTelBBBNpQenImHND2tAAhs4rjkCty9kg1nmuEcpTEFbu8RgwCB0Zcw4SUcAgr/iLjlqXs02s8/yvUJ7SEVbu8Rh4zu9sUcC6nB1inedmQnlKR+goG6zLuYZY5/lMoTy1LudmxDrPbRLrPLdJrPPcpv8AlbfQcFv3wScAAAAASUVORK5CYII="},{"name":"Uncut dragonstone","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAEG0lEQVRIDbXBQWobVxjA8f/3ZmQ3z20Z6AGed553gF6hJfQESaMs0jOUkrrOUbrvrjUOIQS6CoLiA8izKGgWiYmd2CNH82RZM+9rRiCQcNKmEP9+Yp3nJol1vh4NWdra9nxSYp2vR0MRYcm6nE9HrPP1aCgi1uXcALHO16MhC1vbnv8SysK6HT6aWOeBUB4Bqrq17VkRyoJ1X/PtIU8B63b4CGKdZ6keDUXEujyUBQvf8L2QAkoTUUMKnHMMHPKMBet2+DCxztej4da2B+rRUERA+tkexKZq3nAMMRIjMSUFhGTO7C3nEFk45Blg3Q7vI9Z5oB4Nga1tH8ojkPvZIwWtGsmMYF5WfxveESASDSlwycRATc3CIU+t2+Easc6zEMojwLo8lEU/2xOMEpVoSBStqpMZE5CIRlrQhrkhAQwJ6J/8BmpdzjqxzrMulMX97JGioE3VpNkGxHF12hLnzKCN0NAYOpEWBMwV9YAD63ZYJ9Z5VoSyuMNPadYTDDCvpml266x6CQKakAYuDAbMFcGQRDBwyQSSAfug1uWsEOs8K0JZ9LNdBaHTVFdC+pYzINI0NCnpjMuEdMYlRENSM45E4JCnoNblrBDrPCtCWfSzPZC2utrIPptVl5LJuDoBDEZIFI20MwIQaTfZGvMKaIkJZsBj63ZYIdZ5VoSy6Gd7EIGWmNIDLqrXQEvLgkBLM2Wyya0zXiUYEDo64DGodTlLYp1nRSiLfvYLoGhbNZFW0ZoxaELPYCLRIHOupkwMEgh0WhYGPAa1LmdJrPOsCGVxN3tIhcnE0DMQ0TfVi4YmJQV6bM656rFxxvEXfHXOMZ0EWpABB6DW5SyJdZ51oSzuZg+1UiDNEkVBzqsTiGAMpmE25uxzvuyxWXNxRQABBRlwAGpdzpJY51kXyuJetgvMq5khSbMeMK5eA0ob0TGnW2SKbrI5pQ5MIAIt7V88AbUuZ0ms86wLZdHPdkESklk1gzbJNi6qNwZpiTNq0IReRFtmQEQvqemYAfug1uUsiXWea0JZ3Mt2hXekqWZCGhiDTJkoTaSFJCGdcxl5J0I7ZZrQG7APal3OkljnuSaUxb3sZxAhaaqpZKlWzSkvDAY0oiw0zAGDAQxJYDJgH9S6nCWxznNNKIt+tqdEQJCz6piOgDY0ikIEE2kiLR0xJIHxgANQ63KWxDrPNaEs7vBjmm0oelq9SEkjbURZMiQQ33IGAgbaCAN+BwNqXc6SWOd5n1AWwHf8ENGUHkQwkRaUjow5MaQNDWDoPGcf1LqcFWKd5wNCeQTCwm0eAAahI2NOQCIKGOQ5f9BR63LWiXWefxXKIzrCwm0eAE/4lTUKWJdzjVjn+TihPKIjdJQV1uV8gFjn+Z9CeWRdzscR6zw3Sazz3CSxznOT/gGife5wow5uhgAAAABJRU5ErkJggg=="},{"name":"Uncut dragonstone","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAD0klEQVRIDbXB3Woc1wEA4O+cmZXKMaQLfYBzqZ0n6CPkwm9QYuPglwh1ojxJ73vZGJli6FUwAr+BF3oz4CaOY9kjSx797M45RS4LWhQX50LfF1Lu3KaQcuc2hZQ7tymk3LlNIeXO7zH2y5T3fLaQcufTxn5p2599+dxTpLznM4SUOzeM/dJHX/oqaqKwsqYGTRTeeoXnnvoo5T2fFlLubBv75YP5flGL1dHwc1GriRq0iMJkdewdpShRfO4pUt7zW0LKnW1jv/x6/n1VJ1OjCcJ/hn8jaFBNQRs5c0I888GV8tzTlPfcEFLubBv75YP5fhCrUpRGW5VheH3mlFhN1KKsXUYzSmtWlH/5OzXlhW0h5c62sV9+Pf++qpisGjMMw+uiXjivJmqxJlDXShRx7sOhg5T3bAspd64Z++VX829as6DBhfNdu0fDT8SqNNrR+6CJwpmx1RQ1CqOTqHnmMTXlhWtCyp1rxn55f/4dlYC1VSOeDEeFyZopai6cN9qV86JEzeh4UojP/ZOa8sI1IeXONWO/fDDfx2Q9s3vpPIhvh1dotFGkTMqFEcW0K73ziyuFeOhJynuuCSl3rhn75YP5flFRldYMw/Aa1USgEibrMye77rzziysNBYcOqCkvbISUO9eM/fL+/LsoFKVYTybq6XBclJmdIFSVMLk8cxrF0SmK4qNDB9SUFzZCyp1rxn55b/5XAlo7rtQ3w8u1VWuG1s7aqjV759UX/vTGz4iaYsKhA2rKCxsh5c62sV/emz+qCqKmqkEYhl+rddBGYeXy2NEdf9yx88HJuQ9ECg4dUFNe2Agpd7aN/fLe/BHWLhtNawfD8CuKQhm8ueMLzPzh3OnopPif6dATasoLGyHlzraxX96ffxvFoFk5L2qrfT+8daWcGatpZpeycomijE6jiGceU1Ne2Agpd24Y++X9+beEKFy6aDSnw3EUR+8nayqhMVs5pxaK6dJZ1DzzmJrywkZIuXPD2C/vzR8RWs2F80Y7Wb8ZXgZNNdlYuyRGAVEcnT7zmJrywkZIuXPD2C8fzPcnE4J4NPwUhSBMSrFGUQnVupgQRcKp40MH1JQXNkLKnRvGfvmX+TetWVXeDC+jlkpBUaNAQz1xRHSlFPWZfxCpKS9shJQ7v2Xsl7jrIWbaQqRQTQjC4HXUrK0RBfzoB2rKC9eElDufMPYvCD6666GNKB57TSwmQuRHP7hSU17YFlLu/F9j/8KV4KO7HuKJv9lSkfLCDSHlzucZ+xeuBFeqa1Je+ISQcud3GvsXKS98npBy5zaFlDu3KaTcuU3/BVTgy3Cb6OGvAAAAAElFTkSuQmCC"},{"name":"Uncut diamond","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAFD0lEQVRIDbXBzW8bxxkH4N87u7Okh05yiZFLg9FNO39XgfZaoEDRc9oIkFsnUuzYTQxfW7SObVVtgRYIUkPIKYfcCnKtyuLIsiJFpkR9cCju7rxvRQEESCgOXMB+HjLW4U0iYx2AQbcNoDXn8LqRsW7QbbfmXPAdEWnNObxWZKwDEHzH2HzQbRORsTleHzLWARh02wBacy74jrE5Xi74wth5vDIy1uFC8B0Rac05TAm+wKxf/OynS5/fA2DsPF4BGeswMei2icjYPPgCF5YXPkhVSoSyqmuuszQjRf/deApg+e49XDB2Hi9HxrpBt92acwAG3TYRAbT2txWueVSNnmw8ZeGqroU5yzKAEkXDs7Pn3+0KM0MUaPnuPQDGzuOHkLEOwKDbBtCac8F3APr6H6tSc1VXaZqqNPnm228BShIFUFWXmc6IqHdwkKSq1zskRRJ56fN7xs7jEjLW4ULwHQDG5sEXa6uPEkoixxg5a+gY+emWPzo+AiiOMYNHwzOdaWHROoscf/3Bh4AYm2MWGeswK/ji67//lVnAMirLpmkws9/erqs4CIMYI4uUVUVEIhLrSIrO9fv9xZu3jZ3HLDLWYUrwxb/u/6mZNdI0BeHk5PRqyxQbmxiTTOu9F/s6zRTR8clJqlNmVkq96PV0qheWPgHE2BxTyFiHKcEXj1cfShQigsJweKbTdHtnByJVWVd1rbU+CaeZ1qeDwBxTrff2vo8cSdHHd+4CYmyOKWSsw5Tgi7XVR0Q0Ohu1rrZOTk+VSja9F4hO0lSnsY6RuX98JBBmfrv11ka3CyAyJ4n63a07xs5jChnrMCX4Ym11hYUB1DFeaTQA+GfPAJRVBRAAAqqqetE/fOettze6XSIoUoAIcP3mbUCMzTFBxjpMCb54vPqQGEIyqspYMUvc3d+XKM1mg0hxHZVSZ6Ozg6M+kTrs9wUS64gL12/dBsTYHBNkrMOU4IsvH/wFIEVoZE0iMKSz/mQ0KhtZBkHzypXRaNTMGuubG+//5P1ifR2ETOuyrCihxeVPATE2xwQZ6zAr+OLLB/dZGCKZzlgikdr0W7GOSZokSoXh2fPdnWvvvttqmf39F4f9I0pIolBCi8ufAmJsjgky1mFW8MVXK18AGA7P0iS50mwKsLW9DaCqahH4Z1vvXbvGIldbptc/PDg4FMG5Kta/v3UHEGNzTJCxDrOCLx6vPCQFnerTwSAyNxuN5zvfgVDHeHR8zMzNRkNEBmEIAjP3Dg4SlRBhYekmIMbmmCBjHS4Jvvj3ygMaQxgOdZru93og6vUOqrquOSakmjo7HQaWc1zX9dHxSab1wtJNQIzNMUHGOlwSfPHVo/tEpHV6cjrQaVbV5X+KQqdZjJElAiDQaDQipRKlhJGk6rDf//DjTwAxNscEGetwSfDF2upKzTUApdST9Q2VKCIVY12WpQhYmEBlWUZhMFSikkTt7n1//dZtQIzNMUHGOlwSfPHPP/+x2Wgyx/aTdZ1qFubIIME5glKJRNnZ26UxRB5bWFoGFCDG5pggYx1+SPAFgM8+ui4izbQhEFIUWUQiQOc2uz7TelSVIkgSJSK//WgZEGNzTCFjHV4i+A5AuPDZjUUBiEkpRSn5rWcEqmNUis795sYSxsTYHLPIWIcfFXwHY4QLf7ixSKCf//JXmCEAjM1xCRnr8GqC72CMMCaYYmyOlyBjHf5PwXeMzfFqyFiHN4mMdXiTyFiHN+l/XojTfwg8onkAAAAASUVORK5CYII="},{"name":"Uncut diamond","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAEuUlEQVRIDbXBvW8cRRgH4N87O7N3GQdoiGhAU3r370KCFgkJUfNhyYGATUICRGlBEJIYAxJICCKLioIO4Y1x7HEcY+Ocff7au92deV98lk66kxMUCj8PWZfjLJF1Oc4SWZfjLJF1Oc4SWZfj/yh9Yd0knhpZl+PJSl9g3GuvvDzz2Q0A1k3iKZB1OU4pfYETs1NvaaWJUDchcEh1Sor+Wr4PYPb6DZywbhJPRtblGFf6YuHbOQ5cNdW95fss3IQgzGmaApQo6vX7D//eFGaGKNDs9RsArJvE45B1OcaVvvj1+3kJ3IRGa6108tvvvwOUJAqgJtSpSYmos7OTaNXp7JIiiTzz2Q3rJnEKWZdjXOmLhfk7CSWRY4yctkyMfH/N7+3vARQHmMFVr29SIyzGpJHjm2+9C4h1GcaRdTnGlb749btvmAUsVV23bYuZ/fp6aOJReRRjZJG6aYhIRGKIpOhYt9udvnzVukmMI+tyjCh98ePNL9ppS2sNwsHB4fkJWyyvYEBSY7YebRudKqL9gwNtNDMrpR51OkabqZmPALEuwwiyLseI0hd3529LFCKCQq/XN1qvb2xApKlDE4Ix5qA8TI05PCqZozZma+ufyJEUfXjtOiDWZRhB1uUYUfpiYf4OEVX9auL8xMHhoVLJivcCMYnWRscQI3N3f08gzPzsxDPLq6sAInOSqPeuXLNuEiPIuhwjSl8szM+xMIAQ47lWC4B/8ABA3TQAASCgaZpH3d3nnnl2eXWVCIoUIAJcvHwVEOsyDJF1OUaUvrg7f5sYQlI1dWyYJW5ub0uUdrtFpDhEpVS/6u/sdYnUbrcrkBgiTly8chUQ6zIMkXU5RpS++OnWVwApQittE4Ehi0v3qqpupSkE7XPnqqpqp62lleWXXnypWFoCITWmrhtKaHr2Y0CsyzBE1uUYV/rip1s3WRgiqUlZIpFa8WsxxEQniVJlr/9wc+PC889PTNjt7Ue73T1KSKJQQtOzHwNiXYYhsi7HuNIXP899DaDX6+skOdduC7C2vg6gaYII/IO1Fy5cYJHzE7bT3d3Z2RXBsSaG969cA8S6DENkXY5xpS/uzt0mBaPN4dFRZG63Wg83/gYhxLi3v8/M7VZLRI7KHgjM3NnZSVRChKmZy4BYl2GIrMtxSumLX+Zu0QDKXs9ovd3pgKjT2WlCCBwTUm2THvZKlmMcQtjbP0iNmZq5DIh1GYbIuhynlL74+c5NIjJGHxweGZ02of6jKIxOY4wsEQCBqqoipRKlhJFotdvtvvvhR4BYl2GIrMtxSumLhfm5wAGAUure0rJKFJGKMdR1LQIWJlBd11EYDJWoJFGbW/9cvHIVEOsyDJF1OU4pffHDl5+3W23m+Oe9JaMNC3NkkOAYQalEomxsbdIAIg9MzcwCChDrMgyRdTkep/QFgE8/uCgibd0SCCmKLCIRoGMrqz41pmpqESSJEpF3PpgFxLoMI8i6HE9Q+kWAcOLTS9MCEJNSijT5tQcECjEqRcfevjSDAbEuwziyLsd/Kv0iBggnPrk0TaBXX38DYwSAdRlOIetyPJ3SL2KAMCAYYV2GJyDrcvxPpV+0LsPTIetynCWyLsdZIutynKV/ARMoqX8UjUQPAAAAAElFTkSuQmCC"},{"name":"Uncut ruby","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAADjklEQVRIDbXBUW4bxwEA0DdDMk5HKLHoBUZ/2r1HL9EP36GFHedA+e2vYLjwPSR+VQsUcGIn7tQON4pF7hQjiAgFxYUL2O+FlAdfUkh5wPbqAieng88tpDxsry5OTodpvKy1npwOPquQ8oBpvEy5315dhBBS7n0+IeUB26sLnJwO03iZcu/jpnGT8plPFlIe3JrGy1rryengyDRu3Pfnbn5ZIlI+8wlCyoOD7dVFCCHlfho3bv2lmwORG/asNG80L0t0K+UzHxdSHrZXFyenA7ZXFyEEwrNuXdkp32tuNCtN4APvmJmJvCwRKZ/5PSHlAdurC5ycDtN4Sfi2W1f2LAj8U8FCc8NKsyXyM5GZlyWmfOaBkPLg1jReIuV+GjfPuvWCPTMLKm+Ua82eWbMjaBaav5dITbl3X0h5cN80br7t1lWzU5Y6/KhUrpmp7AlU9gTNNc9LTPnMfSHlwZFp3Pytm5e6JTO/Kl/pXituLSmsNL+wpBJ4z5LzEqkp946ElAdHpnHzTbeuBM2NsuCtZkclcs2SX5lZ8I6ZyD9KpKbcOxJSHhyZxs2zbo2d8rXuWgm61wqWLNhTmZg1f+C1phJ4UWLKZ46ElAdHpnHzrFtXzcySyI8Kdu4EdmxJ/EAgamZelEhNuXcQUh4cmcbNN906MLNXKnves+cRgT2RD0yaX5iZ3XlRIjXl3kFIeXBkGjdPupkOX2lmXik7lppH3LDiB/7EK82SHZHnJVJT7h2ElAf3TePmSTdXzUI3E/hJ2bPQ7HjLmkf8h4nITOR5idSUewch5cF907h52q0rOyWy0uGtgj2Vn/gjla95z9admRclUlPuHYSUB/dN4+Zpt44suFYqS11RAjuumVlprt3ZaiLnJVJT7h2ElAcPTOPmabcOBD4oC94R+Jk9eyJLPlCZqUysOC+RmnLvIKQ8eGAaN0+6dSDyQVno9sq/WLFn1kRuNAt3fuG8RGrKvYOQ8uCBadw869azJvC9Eojs2VPdufGbyHuel0hNuXcQUh48MI2bv3bzSjfzSlloqmYmEqj8m6iZNecFkZpy7yCkPPg907jB427G0p3KrIm8YcWN35yXSE25dySkPPiIabwkuPW4mx0seENkdue8RE1NuXdfSHnwP03jpSa49bib8V2J7qlIufdASHnwaabxUhM01ZGUex8RUh78n6bxMuXepwkpD76kkPLgSwopD76k/wIQ6ndw47YagQAAAABJRU5ErkJggg=="},{"name":"Uncut ruby","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAADO0lEQVRIDbXBwY4UxwEA0Fc1M8YpKaNWfqCO2/0f/okc+IdE4PUH5ZrrChHxIfQpaskSNtikAqZZs9NdUa125BmtifBh3wspDx5SSHnwkELKg4cUUh48pJDy4I+YpzHlC18spDz4vHkanfumW1+UiJQvfIGQ8uCeeRrd+mu3BiI3LOw0bzQvSnQr5QufF1IenJun8bLbVw7KD5obzU4T+MQ7VlYiL0pEyhd+T0h5cG6exu+6fWVhQ+DfCjaaG3aaD0R+IbLyosSUL9wTUh6cm6fxsttvWFjZUHmjXGsWVs2BoNlo/lkiNeXeuZDy4Nw8jd91+6o5KFsdflIq16xUFgKVhaC55lmJKV84F1IenJin8e/dutVtWflV+Ur3WnFrS2Gn+ciWSuA9W65KpKbcOxFSHpyYp/Hbbl8Jmhtlw1vNgUrkmi2/srLhHSuRf5VITbl3IqQ8ODFP42W3x0H5WnetBN1rBVs2LFRmVs2feK2pBJ6XmPKFEyHlwYl5Gi+7fdWsbIn8pODgTuDABxI/EoialeclUlPuHYWUByfmafy22wdWFqWy8J6FRwQWIp+YNR9ZWd15XiI15d5RSHlwYp7GJ91Kh680K6+UA1vNI27Y8SN/4ZVmy4HIsxKpKfeOQsqDc/M0PunWqtnoVgI/KwsbzYG37HnEf5mJrESelUhNuXcUUh6cm6fxabevHJTIToe3ChYqP/NnKl/zng/urDwvkZpy7yikPDg3T+PTbh/ZcK1UtrqiBA5cs7LTXLvzQRO5KpGacu8opDy4Z57Gp90+EPikbHhH4BcWFiJbPlFZqczsuCqRmnLvKKQ8uGeexifdPhD5pGx0i/I9OxZWTeRGs3HnI1clUlPuHYWUB/fM03jZ7VdN4AclEFlYqO7c+E3kPc9KpKbcOwopD+6Zp/Fv3brTrbxSNpqqWYkEKv8halbNVUGkptw7CikPfs88jXjcrdi6U1k1kTfsuPGbqxKpKfdOhJQHnzFPLwluPe5WRxveEFnduSpRU1PunQspD/6veXqpCW497lb8o0RnKlLu3RNSHnyZeXqpCZrqRMq9zwgpD/6geXqZcu/LhJQHDymkPHhIIeXBQ/ofxXtNcCVrEHIAAAAASUVORK5CYII="},{"name":"Uncut onyx","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAACuUlEQVRIDbXBMW/bSBCA0W9FKkqmCKa55goPQMAQ9///GbPkFQcc2AyMeGWZK++BBgWRkh04hd8LYpGvFMQiXymIRb5SEIt8pSAW+ROp78T2fFoQi3ws9R3XfsIjILbnE4JY5EbqO96o/s0N919MHnkjtudjQSyylvpO9R5OTJ55j/svLh4BsT3vCWKRtdR3qvdMTkwqeOKG+6iK+5HZo9ieG0Esspb6TrWBCk5MKjhBhsyC+6i6hRG2gPu/UMRa1oJYZC31neo9nJhVcILMJHNthC3gPsIgtmctiEUWUt+pNkwqJieo4MhFZjbCljfuI5MBiljLQhCLLKS+U224lpllqCEzG2HrPsKRySMUsZaFIBZZSH2n2kAFJ6jgxCRzLTOr3Q9cDGJ7FoJYZCH1nWrDRcXkyDsy1O4HVgYoYi1nQSyykPpOtWEl874MuI+sDFDEWs6CWGQh9Z1qw6xidoQMNQvuB9Uf7gdWBihiLWdBLLKW+k614Vpmwf2guoUasvvIxQBFrOUsiEXWUt+pNlzLnLkfVLdMasjuIxcDFLGWsyAWWUt9p9owqeDELDPLTGrInLmPzAYoYi1nQSxyI/WdasNKZpJ53+jOmwGKWMtZEIvcSH2n2jCp4MTsmd9yH2GAItZyFsQiN1LfqTZcZC4yH3AfYYAi1nIWxCI3Ut+pNsyeoWaSuagB9wMr/8EGiljLWRCLvCf1HaB6xwfcD1wboIi1LASxyAdS/wCBN6p3LLgfWBmYFLGWtSAW+a3UPzAJvFG9A9z/YaUAYi03gljkc1L/wCQwKSyItXwgiEX+UOofxFo+J4hFvlIQi3ylUP/8a1Nvdt92xzFTqKuwqbeveay2u2pDCJunp8PuW/X6Wk7HYy4F+PZ9t6nq1zy+5jFU9cvLuNvtCFAm48tYStl9370cX0op/wMvvyZCjDAwuQAAAABJRU5ErkJggg=="},{"name":"Starved ancient effigy","base64":"data:image/png;base64,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"},{"name":"Loop half of a key","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAACvElEQVRIDbXB3WscVRgH4N97dkbNm2LT3XqpLwUh5/wzuSqIRRCCvWmR7Gr9WCliiCjS1rYXKuqFUktLeyOkSGn/DEHpuTx39Yuaye7JzOzOOe4ESyqadLYyz0MsBm0iFoP/xzuLR7As4xHEYvCkvLMAVlaOK0Xdo8+NtrOtLLtze5NlGQ8Ri8ET8c6+9PKraTKTLi4eOtLtjkfjBw/++O33X3649T3LMnYRi8H8vLOvnXwdCEVRFvnO8y8ce/bw4bIsfr1/fzTevn7tWyCyaADEYjA/7+zq6qnRONvKsqfTpzY3bwLqxCurABTo6tWvAcWyDIBYDObknV1ZOb7U7eU747IoRqNRJ017vaO8sEDUyba3blz/BlBAZNHEYjAP7+xa/91JrSzyPC+KvPCLfGiBeeEZnlbTL7/4FDUFRBZNLAbz8M6+8ebZEEIVwnRS5DM7fjwey7EXQzXNsj+/u/IVoIDIogEQi8E8vLP9wXtEFEI1Qwodlfz80493797CHgVEFg2AWAwa8872B8NOJwm1aqbb7RVl+cnHZwGFPZFFYxexGDTjne0PhkmSxhhDCJNJeaTb21h/+9TpM59/dh5QQMQuFo2HiMWgAe9sfzDsJKkiCiGUk3JpaWlj/R3UFGqRReNfiMXgcbyza4Nh0kmTNAlVVZbF5Usf4W8KiABYNP4LsRgcyDu71h8mM2kKoMjzSxc/RE2hFlk09kcsBvvzzp55630AnSRRSuX5zsULG6gpIAJg0TgQsRjszzv7wfq5aTWpplVZlhfOr6OmgMii0QCxGOzPOwsE/IMCIotGM8RicCDvLBCwRwGRRaMZYjF4HO8sagE1BUQWjWaIxaAB7+4BhFpk0WiMWAwa8+4ei8Y8iMWgTcRi0CZiMWgTsRi0iVgM2kQsBm0iFoM2EYtBm4jFoE3EYtCmvwBe7CNw0NtmcwAAAABJRU5ErkJggg=="},{"name":"Loop half of a key","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAACqUlEQVRIDbXBwWsUVxwH8O/vzVtifqbE3bVXf0gpmfff5FAvgnhQvCgFByM0oXRL6ilRLyKIIIIieFLMQfwvvAi+47sFRIk7ycvM7My8dhYllpo4a5nPh1gMukQsBv+PdxZfYFnCF4jF4Ht5ZwEsL/9CFA2HJ9M0HY93Xr58wbKEz4jF4Lt4Z8+ePa91T+ve8eMLg8Fwb2/3w4f3795tb209Y1nCFLEYzM47e+nSr0Aoimx/f//UqZ8WFxeLItve3vZ+9/HjB0BgiQEQi8HsvLMXL15O03Q83pmbm3v+/Cmgzp27gKlHj+4DimUJALEYzMg7u7x8pt8feu+LIt/bG0dRbzj8kZmJVJp+fPLkAaCAwBITi8EsvLNXr/42aRR5Y/8fCws/zM/PHzvGVVXevXsTDQUElphYDGbhnb127fd6ajLJ8zzzjd3Tp38uyzJNdx4+vAcoILDEAIjFYBbe2SRZI6K6URGRUtGbN69fvdrCAQUElhgAsRi05p1NkrUoiupPqsFgWBTFjRurgMKBwBJjilgM2vHOJsma1jqEUNd1WU76/cFotHLlysqdOxuAAgKmWGJ8RiwGLXhnk2RV6x6RqutqMilOnOiPRitoKDQCS4z/IBaDb/HOJsmq1j2tdVXVRZHfvv0XPlFAAMAS42uIxeBI3tkkWY2iXq+nAWRZduvWOhoKjcAS43DEYnA47+z1638A0ForpbIs29z8Ew0FBAAsMY5ELAaH886ur2+WZVlVVZ7nGxsjNBQQWGK0QCwGh/POAjX+RQGBJUY7xGJwJO8sUOOAAgJLjHaIxeBbvLNo1GgoILDEaIdYDFrw7i1AaASWGK0Ri0Fr3r1liTELYjHoErEYdIlYDLpELAZdIhaDLhGLQZeIxaBLxGLQJWIx6BKxGHTpb2ShI3Bg98TvAAAAAElFTkSuQmCC"},{"name":"Tooth half of a key","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAACl0lEQVRIDbXBwUsUURwH8O/vubvEDy92UALhdxDaeRehoFP/jAhrJFh2MCMoCSEqghI6JEjePO1BpIsUYeLFQ6AHw4FInpSCrtm6zptm2vXVLElCmWMwnw+xaGSJWDSyRCwaWSIWjSwRi0aWiEUjS8SikSVi0cgSsWhkiVg0skQsGv9kjY9DLEWcErFoHM8af3DwVhAEe3u7m5uf5ufnWIo4DWLROJ41/vDwvSgK6/Xv24nNN29esRSRGrFo/I01PoBSaYAIAOXzOSL15UtlZ6cyO/uSpYh0iEXjD9b4PT2ler2BJiLK5wu5XJ6Zq9Wvk5PPAcfiIQVi0TjCGh9Ab+9VANXqbqFQiOMYcIXCmba2sx0d5zY2Po+PPwEUSxEpEIvGIWv8vr5rgAPgHCqVrdbW1kaj4dwBkZqaegHgypXB8fGnSCiWIk5CLBpN1vj9/Tecc2iq1xuVylZX1/kwDOL4u3ONiYlnSCjgAFCAY/FwEmLRAKzxS6UBalKKfnLOBYna7u7OpUuXo+ibtcH798sLC/NIOBYPKRCLBmCNPzR0NwyttUEQ1Pb3a93dF8Pwm7VBrVbt7JRcrkWplpWVpenpMuBYPKRDLBqANf7o6OMoisKEtTaoVr92d1+w1q6tfSiXpwBcvz68vPxubu414Fg8pEMsGk3W+CMjD5RScRyFYRgE+3t71fb29rGxh0goJA6QUCxFpEMsGoes8QHcuXNfKRXHUa1WW1//ODNTRkIBDiAkHIuHdIhF4whrVgG6fXtUKbW9vbW4+HZpaQkJx+IBsGaVxUNqxKLxB2v8mzdHHj0awS8KcCweTo9YNP7GGh+/ORYP/4VYNI5hzSqaWDz8L2LRyBKxaGSJWDSyRCwaWSIWjSz9AMpRJXBa5wo+AAAAAElFTkSuQmCC"},{"name":"Crystal key","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAADPklEQVRIDbXBQWtUVxiA4fdkMHG+mBLiSkE+F4W5Z9GVm4Kr/pGzuz8gCxmIRlJshK6yaSnlSpBDUyrMQqRFFP9AFmlEF/a0Nc1JxqSTEDfFA02T3NaLgUmblJkJPo8RtbxPRtRyaikGuog2OGRELaeTYnAup4v3hWiDihG1nEKKwbkcGB4eHhv7YHT03NraKuB9IdoAjKhlUCkG53JgZ2fr8uUPR0fP1et1Y4ZWVn4BvC9EG0bUMqgUg3M5kFJqtRaozMx8vrLyK+B9AaURtQwqxeBcDnhfQMk7xrkc8L6A0ohaBpJicC7nkPcFFedyKt4XUBpRS/9SDM7lnKAsy62t3x89+h5KI2rpR4oBcC6nS70utdrQP4wZ2t3d3dnZbrW+hVI0M6KWnqUYnMs56uzZ+sjISK1W29vbOzjYTyndvfs1lKIZYEQtPUgxAM7ldNnb+0tk9M6dL/m3UjSjYkQtJ0sxiDZSDM7ldOl0NicmztfrMj//FZQcJZpxyIhaTpBicC73vnAup0unszk+Pn7v3je8VYpmnMyIWo6TYpiautVur9FleXnx4sVLY2PjrdYClIBoxv8yopbjpBicy+myvLx44cKlx49/4K1SNKMHRtRyVIoBcC7nqI2N9pMnD6EERDN6Y0QtXVIMzuV02dhoX7ny8cuXP7daC1CKZvTDiFoOpRicyzmO9wWUohl9MqIWSDEAzuUcevHi+dWrn9Rqte3tDhXvC9EGfTKiNsXgXE6XiYnzr1/veF/cuDG7v7//6tU6Fe8L0Qb9MKI2xXDt2s1OZ5PKmzd/ZNlHu7t/djqb3hfA9PRsjKtUvC9EG/TMiFogxdBsfrq52abifTE9PXtwUK6vR+8LoNmcOXPmzNLS4sOHD6AUzeiNEbVUUgzXr3+2vh6peF80mzPDw8P373/3/PkzYHJyam7uNpSiGT0zopZDKYabN2+vrv5GxfticnJqbu42lLxloBTN6IcRtXRJMUxPz8a4SsX7AkrRjEEZUctRKYapqVvt9hrw7NmPT58uiTYYlBG1/EeKodmc2d7emp//AoagFM0YiBG1HCfFwDulaMagjKjlBCn+BIhmnIIRtbxPRtTyPv0N6/JmLKEHE08AAAAASUVORK5CYII="},{"name":"Crystal key","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAADPklEQVRIDbXBT2tUVxjA4d+ZSDSv0dbY7oLvQujcs+jWRcFVP8nZ3S+QjQmRCbEtCRSki16z8BSpwoBQWhHxGwQapVaQnvovJ2PiNAY3bQ7VjrltLgYmbVJmJvg8RtTyLhlRy4GlGOgiWmeHEbUcTIrBuZwu3heidSpG1HIAKQbncmB4ePjYsfdGR0djfAp4X4jWASNqGVSKwbkc2NhYP336o6NHR48cOVKrDT16FADvC9G6EbUMKsXgXA6klJrNK1RmZ798/PhXwPsCSiNqGVSKwbkc8L6AkreMczngfQGlEbUMJMXgXM4O7wsqzuVUvC+gNKKW/qUYnMvZ3/r685s3v4fSiFr6kWIAnMvpIiK12tA/arXaq1d/bmysN5vfQimaGVFLz1IMzuXsNjIycvjwSK1W29p60+l0Njf/uHz5ayhFM8CIWnqQYgCcy+nS6fwlMnrp0kX+rRTNqBhRy/5SDKL1FINzOV3a7bWTJz8UkYWFr6BkN9GMHUbUso8Ug3O594VzOV3a7bUTJ8auXfuGbaVoxv6MqGUvKYbp6c9arRW6LC0tjo+fOn78/WbzCpSAaMb/MqKWvaQYnMvpsrS0OD5+6tatH9hWimb0wIhadksxAM7l7La21rp9+yaUgGhGb4yopUuKwbmcLqurrTNnPnn4MDSbV6AUzeiHEbXsSDE4l7MX7wsoRTP6ZEQtkGIAnMvZ8eDBz2fPfjo0NLS+3qbifSFap09G1KYYnMvpMjb2wcuXG94XjcZcp9N59myFiveFaJ1+GFGbYjh3bub58zUqm5u/W/vx69ev2+017wug0ZhbXn5CxftCtE7PjKgFUgxTUxdWV1tUvC8ajbmtrTcrK9H7ApiaunDo0KE7dxZv3PgOStGM3hhRSyXFcP78Fysry1S8LyYnZ4eHD1+/fvX+/Z+AiYnp+fkZKEUzemZELTtSDDMz80+fPqbifTExMT0/PwMl2wyUohn9MKKWLimGRmNuefkJFe8LKEUzBmVELbulGKanP2+1InDv3p27d38UrTMoI2r5jxTD5OTsixe/LSxchBqUohkDMaKWvaQYeKsUzRiUEbXsI8VfANGMAzCilnfJiFrepb8BuvhjLAkq81YAAAAASUVORK5CYII="},{"name":"Sinister key","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAADHklEQVRIDbXBQWsbRxiA4Xe8Kyn+WoNzaCBb0Ae+zM7NCPT//4JPph/RwRPMglEPYqsdWdZupkSNQW7tYsvkeZxo4GdyooF3S9E4IOp55EQD75OieV9xwKwR9ew50cA7pGjeV0BRMB6XoxFt2wNmjagHnGjgWCma9xWw3e7OzkajUVkU5ckJq9U9YNaIeicaOFaK5n0FDMNusViyN59ftO09YNZAdqKBY6Vo3leAWQOZH5z3FWDWQHaigaOkaN5XPDJr2PO+Ys+sgexEA2+Xonlf8bLtdn1z00J2ooG3SNEA7ysOjMf8oyjKYeg3m91isYQsWjvRwKulaN5XPFUUjMclMAw98PCAWQNZtAacaOAVUjTA+4ondkUxur5u+LcsWrPnRAMvS9FEfYrmfcWB7XY9mUyKYnR93UDmKdGaR0408IIUzfvKrPG+4sB2uy7LyWKx5LssWvMyJxp4Too2m027rufA3d36/JyynCwWS8iAaM3/cqKB56Ro3lccuLtb//ort7ct32XRmldwooGnUjTA+4qnum59e9tCBkRrXseJBg6kaN5XHOi69adP5227WSyWkEVr3sKJBh6laN5XPMesgSxa80ZONAApGuB9xaPVav358zmw2fTsmTWinjdyoiFF877iwOlpudn0Zs18fjEMfdf17Jk1op63cKIhRZvNpl3XszcMu48fT4eBruvNGmA+v2jbe/bMGlHPqznRAKRos9m063r2zJr5/AL6tu3NGmA2mxZFuVz+dXOzhCxa8zpONLCXos3n07bt2TNrZrNpUZRfvvy5WrXA5eX06uorZNGaV3OigUcp2nx+0bb37Jk1l5fTq6uvkPnOQRateQsnGjiQos3nF217z55ZA1m05lhONPBUijabTbuuB1ar9d1dK+o5lhMN/EeKNptN7+/76+tbOIEsWnMUJxp4TorGD1m05lhONPCCFP8ARGvewYkGfiZ3+tvvw5C/9TvAlaPyhN3DbjwZj07Pvj2k1CVgPBn33/jwy9l20w0P27x7GI/GPZyMxuQ87LbOnZyUo7JwQD9kkQ8554eUKMu/AaQ9gxPBqA3NAAAAAElFTkSuQmCC"},{"name":"Dragon pickaxe","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAADjUlEQVRIDa3BUWjVVRzA8e/5Gwx/jMt5UP6YF35Cwv2fByEissSZWBAUQkQJUQ9BFBSVBqMQC0xtksZw1nowMIkcVBLii4+9RA9B9CDhPWTkSa2uWpzu1plX4/+PDQeT3Lx38/Mxoo4upOBFG/TOiDrmlYIHXrTloZgxi2iDLhhRx9xS8Osp77OUIH1ksAQmO/wDozEDRBvMy4g65pWCZ9p6yidzOw5XiUugZMquVgaINpiDEXXcSgpNphhgPeUjub1K/KTFgOX+PvtTJ34YM9EGN2NEHV1LoQkGWEu5Kedwi4csD/bbcC0OtTLRBv9jRB09SqEJBngjL//tcDQyYBnos1tbbdEGNzKijgVJoQlmLeW9lmORjZaBfvvK+bZog1mMqGOhUvBbbflDZGPOwRb98GZuX221RRvMMKKOhUrB78zLna1sE+WG3B5oxX4YzO22Vlu0wTQj6lioFPygLd+P2ckv9u3eMvhYbve3Yj8M1+2W823RBmBEHb1LwQObbflov524Rn3PtqVL+/Y+u/3hnHdbGXB8Ve3xs23RhhF19CgF/1m91gd9d3B2ktCJE/DA0FuHX94zCc7yacy4rjKijl6k4Ifz2gTRYtvEdocJ+ChmTFtH+URuB1tt4NTq2pozbSPq6FoKfjivjRN/7hDhRMy4ruI6s45ymeVEzJhSGVFHd1Lww3ktEs90GIsZUyqmiRbMSMHfTbnacixmUBlRRxdS8Afz2l/E0x0+jxlUgGjBzaTg11BusIzGzIg65pWCZ9ruvDzdYSxmUIkWzCsFfw/l07k1oo65peBPrqr5Sa7AH534XeRbMqhEC24lBQ8YUcfcUvDfnBy9+MJ2f43vO/FYzKASLehOCk0j6phbCn5k72srVyx/57kdd1mOxwwq0YKuGVHHHFLwX58Y8Wd+/bH5yweHvmJKJVrQCyPquJkU/Oj+1+9csezchYvnf7u0b2QMKtGCHhlRx41S8MCXR3aNj6cLv198e+gwUyrRgt4ZUccsKfiPDwyWVVVW1aXL8cqVztDwUahECxbEiDpmScGP1Wunntq8csXyy3/Gne8dgUq0YKGMqGOWFHyd8qXc7mi1mVKJFiyCEXXMSMHXKYFtuT3XiSMxg0q0YBGMqANS8ECdEng+5+8OB2IGlWjB4hhRl4KvUzLtGUsLjsQMKtGCRTOiDkjBc4NKtOB2MKKOaSk0mSFacJv8BzmMf5yvYpNTAAAAAElFTkSuQmCC"},{"name":"Dragon hatchet","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAEGklEQVRIDbXBW4hVVRjA8f/aOU196WERxU4SPgPh7A0J9RYRdHmLgh4KIl+KIh8iuoAvoSZIWnShBK3UvFRiaZRiPvkQFF2QIKWCWkWXFVOxzWo15nLOnJm1mjklzjRjaU6/nxGtOQPROyZYWaaHm0K0zXFGtOb0Re/oeaZsdWGEsLvhxpLlTUGPaJseI1pzOqJ3wGNlK4PAMHQJw3AedgTmgAED9zSDom3AiNacsujdE2VrFBKMEs7BdgldeLbhvpICO7ePPxm4fWBQtG1Ea05B9A5YWaYEZ8MIbGjo8nePzrMGDOPuGBiEbERr/k30bnWZRiDBKGxpGNPlhA70Q0PBJFm0MqI1/yh6t7pMIzAKmxrGdOH5+Xbdt6HPkgIZ9lEwLjOBaAUY0ZqTi94tLVM/jMKmhjGb59vnQhiFc+Da2TZ12d8JQ7AzFJBFKyYzojUnEb1bXqZh6IfNDWP2LLDLD4e7Ztv3fg/HYBiGwMDLoYAsWjGFEa2ZTvRuRZm68FLDmC70wQKYBZdZIhyDs+AovBIKyKIV0zGiNdOJ3j1Upk6HnYEu3GDpg7KfdxtmQYIrSn7vMOaZUEAWrZiOEa2ZInr3gE0GtgeuswQ4Glhg2RwK4Hqb+uDyfvqwP3XCmlBAFq2YjhGtmSx6t8Smo/BG4ErLrlBwQgaz2KYAV8+2ewbCEXifArJoxXSMaM1k0bt7bXotcJXl9VBAZhJzp02/wY+BSy0bQgFZtOIkjGjNZNG7RTYVsC0UkEUreqJ3wBKbFvTbXZ0QAh243LIlFKJtTsKI1kwWvbvZpnNhWyggi1ZA9O7VF1bEoc7Qsc63q56a02/3NmE/xULSQsv2UIi2mY4RrZkgerfIpptm21sHBiGLVkD07oN9z4XBo/s//DQODXdf3HYEXggFZDCLbNoeCsiiFVMY0ZrJoneMy6IVEL1b//SSi+de8M57B8ORaHfvfjwUjMuMMxvnte4eGIQsWjGFEa2ZIHon2o7+c9EKiN599PamAx9/ceDjL9Zu3MVfMiBa0RO9gyxaMR0jWnNc9O6RMi1rCtE2EL378K0NBz/5sjn0y7JVmyDTI1pxyoxozXHRuxVlOh97fzNIz9Z1D3362ddPrt0BWbTi9BnRmp7o3VNl62fChdg+uORcEnx02y0D3x/a+NJeyKIVp8+I1kD0bv281q9dDnfCRf328054MzDmGsuOUEAWrfhPjGgNRO/Wla1fCV912BUIFJyQRSv+KyNaA9G7NWXrm07YGggUkDlOtOIMGNEaiN4tLdMPHbaEArJoxQwxojUQvXvQpt+gCy+HQrTNDDGiNRC9u9em72BPKCCLVswQI1oD0bvFNm0IBWTRipljRGsgereqbC1tBiGLVswcI1rTE72DLFoxo4xozf/pD9Xs0h9XdhSZAAAAAElFTkSuQmCC"},{"name":"Dragonstone helm","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAFHUlEQVRIDbXBe2xTVRwH8O+57d2yn3R2Ik4n8SdGc+9RY3zhY0FjYhCmMSY+42PEoJjgDDGg/AHxEQ2aqIsxGhERomJ8ZQZlAZ8JWAZmosSIVI+DrGfM0a5l7XrbM9ZuvUrjkpGtUP/w8xHEEv+F0YrYQZnRitjBCQliiaoZrTpae+/cNIfYMVptuPunhz69kthBZYJYojpGq47W3lgm+kTnLQA23P1TNN7dHmkDfGIXFQhiieoYrTpae2OZaENdI4BovBtAe6QN8IldVCCIJapgtOpo7Y1logAuamyOJn4AMDDc2x5pA3xiFxUIYomTMVp1tPYCiGWiAA57sabQHAArOm8GfGIXlQliiRMyWm1bnAIQTXaj7LAXawrN+f7gZgBbouuJHVQmiCVOxmi1bXHq0HAPyv48sjdy/s7kgb7Yjt2AD4DYRQWCWOJkjFbbFqcODfd8fnVnMW+O5vKjWe/o0LCXGIx1/QyA2EEFgljihIxWXVu3ZD9rfmvuutGMV8ybQi5/7VhN318DiWTyWrM0ETi4cc+zxA6mI4glKjNa7fn2q1dSBwpmZMyMFPIjC4q1npf7Kx4fzmaTQ0PxRCKqegAfALFrtAJA7GCCIJaowGj12LxXWtrOmnEKGWO8XH7Yy2ay2YGBwzljhj1v6B/p9N59+zHhjRt+LISGlncuJHZQJoglKjBaLbp+eX2paf4jp+eMyeXzXi6XzWa9XG771/sA5Ea8cy4YvD24FWWF0BCA5Z0LAZ/YRZkglpiO0Wruww/KP0+rLzXFhzXKUuO6ND6OsoFMrPm69NffIZHpb58XiQd/Pys0Z3nnQsAndjFBEEtMx2g1d8liqcIA+lIHMKE0Pr7gpoPJdCGVPGpZCFrBrbtiiy5d9/KOpTjGJ3YxiSCWmI7RyvcfQDLfejunc4P5Qg7APXfEvHzhzR/DY8VxoARYN52R2NgZAyzAB0Ds4niCWGI6Ris0zgrX1dUS/fYhHxkq7upKvdh1OsZKt87qKxTGvug/DVZg4RnJjp2xtgs+XrPnPgDEDo4niCWmMFotiXSsv2tpOFRXW0OoCdiWjUAAFmDbQSsIlNrvH121peGZBemVa/bce/b73dnN7syr3u5eTexgEkEsMR2jFRpnhUOh2roaBGpsy0IAsOygHUAw+M6SsWWfnPrIZf1vvIXU6L6nLo6gTBV3vd29GgCxgzJBLDGF0QooobGxMRxGTQ3sgA0gYMGyg7aNoEUNpz5+9aGXXh2fETr0y4EsJmmftwPAiq4biB0AglhiCqMVUArPbqytn4maABAAYNs2bCto2U1XuI+et/fZF4oAHGdw/68zWy5ctHb3KhzHJ3YBCGKJKYxWQCk8e3ZtQz0CgcQv+zHhmw+uAfDoCg+A4wyms6M32us39TzTcuEilK3dvQrwiV2UCWKJKYxWQCl87rmZWB+O8fEvsf2T5mUrigBGimbu5emPfsghk8VxfGIXEwSxxBRGK4TrkckCPgBiF2VGq3fXXNq+1kbZOErR/p8BH5MQu5hEEEtMx2gF+MQuJjFabXjuktc3ziiMjd58Szo+ePSDzQOAT+yiAkEsUTWj1dqnLlm3acb8lvjWzobZ5/V9E0kCPrGLCgSxRHWMVpFPm5etxPyW+LdfnnnrbcnnX+sBfGIXlQliieoYrba9d02s30sNFZ5u78ExPrGLExLEEtUxWq150l398h84xgdA7OJkBLFE1YxWgA+A2EV1BLHE/0kQS/yf/gbN9kp/ZuV+oQAAAABJRU5ErkJggg=="},{"name":"Dragonstone hauberk","base64":"data:image/png;base64,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"},{"name":"Dragonstone greaves","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAFD0lEQVRIDbXBe2iVZRwH8O+zecz9SNbQY16qH3Y774tkw9LVmJZRkxDTVTToTqkj0dCgP6SiC2H9USYRdKeIbouWZhfzUs1amk2GIUhPW3Uem8edLd3Zu7PnvPenzmiguNVW+PkIYhv/g1ZyTirZJnuIUxiOILbxn2glAdRWTfcDpI/k01mHOIVTCGIbY6eVXHvTLCJ/Z9l8mHipvPclubgz6xCncDJBbGOMtJJPNViuH+1v9/rmLq2fMlXu9wBsadnUmXWIUziBILYxRlrJJ1dYBS9auHTDY999G0dRTqnoL37oHtjXmXWIUxgiiG2MhVbyzpXLZwa729q93qo6GDO/+7zyzgWHK7Z+6bbW0pWbWzZ2Zh3iFAYJYhujppVc9eA6p7cv37HLC3HF1Q07B7pu/HFFv38sRvR++bOLu+8qmdv8+efvHko7xCkAgtjG6GglV667H0B/rm/gl6+rr7rj04F+xNF1+28GMHBe6+6z2oNCIfYC/4dthzocwBBbgtjGKGgll69ZBSAG8n1OIf3N3AUNOwa64jhCbKI4RhzFsYExC8dP2PbF2wc7HMAQW4LYxihoJe9e1QAT9/f1A3AP7/lj9qLS8eMRxVEcw8RrKy978aUnvCA4uxxbW3oAQ2wBEMQ2/o1W8o6G5cYYGJPvc9Jtu2dMLeu9fElQcBeVn1MSOS3fNMYRpk+G56OpOQMYYguDBLGNkWkliVNayVuX321icyStnFyuJJEoLS29r75+S9NzQYggCMMI5ybhBXD9YGtLD2CILQwSxDaGo5UE0LgsqN+SuOXO24IwDH2/K3M0iqK2fa1VC2pKS0rcox0z58zP5/OB78dR1LzrKxQZYgtDBLGNU2glb5+74u3WV9de8/D4cWdcsGhC464dx7M9B9oOYFBVTTWAaTNmeJ43oewM3/c/a/oYMACILZxAENs4mVaycVlQvyWxpm7WtMnr+g5nB3pm7HSflod+AgyKRO2SxVOmTQ18z/eD0PM/adoMGGILpxDENk6mlVw9580jq7rDt15YvXJ627cr1798D4oMisT1y26YPCWZz+dNVPTJh5sBQ2xhOILYxgm0kgCuf+bxcVtf98PQczGJ0NSSAQyKxJKb6iqmTM4d63ULhTAMv9q2HTDEFkYgiG0M0Uq+e4N+Z+HG0s2v/JYpJCsSXT35Q2kHMACILa3km89v+njv3mM9Wc/197XsAQyxhZEJYhtDtJJPN7zxvXy04IfZ7nwE+CFk2gEMIAC8tmlj20dHewvH32t9HUWG2MI/EsQ2hmgl664533XDo8dyUQTfhex0AAOImsrk4tmT3NI1APb/3nRp6XUbtq8HDLGFfySIbQzSSj5wy+z2TC7dlQNwsMNBkQFETWUyjjBxYlnBDRde+lCQcTZsXw8YYgv/RhDbGKSVXF03qz3bn+nOHexwAIMiUVOZjCNUlJcVvNB1g8ykC9LN3wOG2MIoCGIbQ7SStVXTd+zLAIbYAqCVrL4kGQETKeF6Qd/F8+r6r35i24OAIbYwCoLYxgm0koAhtgBoJasvSUZAOSW0FxyfOW9Rovq5Dx4CDLGF0RHENoajlVxQmQwj9BdQcWbi2jmPRD9f9HjLtYAhtjBqgtjGKbSS9bXn+z7cMCzosLktg78ZYgtjIYhtDEcrWXlhMnXOxMbmXwGDQcQWxkgQ2xiBVhJFhtjCfyWIbYxMq5+ILfwPgtjG6SSIbZxOgtjG6fQnRcyZf1Ni1Y4AAAAASUVORK5CYII="},{"name":"Dragonstone gauntlets","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAEg0lEQVRIDbXBX2xTVRwH8O9p79r119FN2UDK7CGY2Z4tW4iKhGIIwQkijAyDJBuIGBN40Qd9IyH6IJEXDZEEoz5ojPogwRgJaIKGkGoWl8iyP4pcB4NbtjEsmNKxs7X3nHvMKku2IFj/9PNhxAXKiREXKCdGXKCcGHGBcmLEBWaRjk08jv8PIy4wQzr2vt0N+98fRBHxOP4zRlygSDr22uXR53cs+OWnCWPQfzZ7oiuDIuJx/FuMuECRdOwNyVi40nqoOXCmLweguTF8pjc7OYVvezKYi3gcpWHEBQDp2OuTsVAAkXBw06bIpcGJ7p4cgEeWRX7sve4qGA95F0pDufm8RvfZHPE4SsCIC+nY61ZEKWQFA1ZNONDZeW9fzw0DDPSPF5RyNQoKQQvXxhEOugbwPBz7PgMYgAEgHsedMeJCOvbm1bFQpTXy2/j9C+bt3LLg8pjs68+6Gq5WSqHgIhK2xm6gJqSMgavw2alRAEfefPieRRVPbP8BAPE4/gojLqRjb2tdGgz6C672AXs67ptfH3jr0Igq6FBAVYWsvKuMQSZn1UWU0sgrdX7Yjc6v6Ghf7GeorQ9ueiGVzfqIx3EbRlxIx352Y8PFkeySRTWu1q/simoPHx69prR+fFVYaXz5ze/GQ1XIqqtGwVWDo6q2GlufWnzqu6tPrl3ImH8hD7RuPJ2Fj3gcczHiAoB07A3JWG11sKD13t2xgutN5dXEpHfkq+uu0pN55SocS6UBHNiTsNM5AFVkoWjz+igDXn8nneodBnzE45iFERcApGO3r4nNCwV/Hc52D2RQVANvW3tjwdWTeX356njXQAbA7raYAdrWLfT7/D4fPj8+CqDz6frDn45dHBvvOZsBDPEEZjDiAkXSsZPNdbKQ1xoD53M18ACsSi6ZdNXUlNs1kAFw8MWmwZFxGGxcFz1+chRF27fElOcdePeSVWH1DWaHr+aIxzGDEReYIR17eWOdq/O9dq4G3spkvdaYyrup3gxgAHbwpaZLV8Y9gz95HozB9q0xT2P/e+lgANmsSvWOAoZ4AkWMuMAM6dg18ACsTNb7YLlanewexTSDaezwy03hUEX/hZwx8DylDZ57ZonW3muHhqwKq8ICg/XF6SHAEE+giBEXmEU6dttjMeaDVjjRlQYMpjEAna1RokiyKfDz0E3PwHhY9mCkqTligEc7Uu2rYx5wLJUGDPEEZjDiAnNJx8YtBtNYW7IuWhuqrrKMQXYysKqxsv9CruWBSFNLBAbLO1KAARimGeIJzMKIC9xGOudwC+tojS6aX1nhB3zwPGRu+Fe3hHzM19QSOfTRlY+/HgQM8QQA6ZwjnsBcjLjAXUnH3rtjKQAGKA8yr24Wgmuaw7ve6MU0QzyBO2PEBe5KOvaK5rrWZfMAv9Ja5tXEFD44kQYMAOIJ3BUjLvB3pGPv29nAAOVpOaXePpoGDPEESsCIC5RAOvaruxpcpQ98MgQY4gmUhhEXKI10bEwzxBMoGSMuUDLpnCOewD/BiAuUEyMuUE6MuEA5MeIC5cSIC5TTHzpW/nB09NezAAAAAElFTkSuQmCC"},{"name":"Dragonstone boots","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAFdElEQVRIDbXBb2jc9R0H8Pf3LmnaT7z0pncmjdk+Z9lyv59FCBlZZQtBbsPh3AYDUXyyB1tdrD6YwiYzK6H4YIPtmc/GQEXK/kTXJ0O6uiJFpEwqZ7pg2293dvnWa+P9SdL8cve9P7/f9/tddnKst7QDO/J6CWIf/wetJDqIs7gZQezjdmklM8NDiQS2LBUCAMRZ9BLEPm6XVjIzPJRI4FONJgrFgDiLGwhiH720kgCIs/iftJJJ2ORwEkAigUYT8T7I5QBwxB66BLGPG2glM2NDid1YKgQAiLO4Ba3kg5OjABbzxdRYEkAckMUAcMQeugSxjy6tZGZsCEBiNz61VAiIs7gZreSDk6PoWMwXs/cPxw3OnK8AjthDlyD20aWVzIwNAUjsxpbNJpaLAeCIPWyjlXz8of0AStUmgMQdfe1GdPLsNcARe+gSxD66tJK5qdHLK7XEbjSa2FIoBoAj9rCNVvKxb+wXMcQEtjRb+OBCdWBiUp48TZxFlyD20aWVfOKb+0uVZj5fTI0l432QywHgiD3cjFbyvszQ/eOpuIhHxkx//Ye//eDM0sKbgCP20CGIfXRoJZ979MC1oAEgBlwtb0YGV8qtYikgzmIbreRbC3/41cUPn/cOABi7554fvX5Mb6zlX3kdcMQeOgSxjw6t5HOPHnAAHFY2G86ivNY8nb8GOGIP22glDz49mxi520aRDcMojGIx06oHulRdeuNN4iw6BLGPDq3k8VdfPnL02Ye+/HkHrGw0rm82Lw1+cfntd4iz2EYrefDwk4l9IzaKbBgODO1p1Wu21ahVqvlX3wAcsQdAEPvo0Eo+duylennj+4m7+/v7jxx9dtf0t2qVauHkKcARe+illZyaPRSLxwdTd9owHNhLptWyplmvrm+WKuf/dII4C0AQ++jQSn7npV8MJKle3rBhdHTigWf++Pv66qr88wnAEXvopZWcmj0Ui4nBdGpg7x4bRc4YINJr12vlyuJrxwFH7AliHx1aydz8C3d+acQZWytfd1G0/s+r9bX11UuF0tKHxFlso5Wcmj2UGE7vSdIPPjcaGZO+66619fXq2tpTP3kecMSeIPbRoZXMzb+QGh+xxjpja+WNsF6rXLrSqFQLb58GHLGHXlrJqcOHRvz9zwzf++Njr2GLtVPRP+qt6GyQLOb/TpwVxD46tJK5+bnU+Ii1xhlrja2X1mvlyuqlZXnir4Aj9tBLK3nw8JO/fviRp155eUJfcM7cQbuaLaNbJh7DwqnLgBPEPjq0krn5uVR2n7XGGWsj8+L41JmzZ39z7v2r758rnb9InEUvreTBp2cH/nb8C8NJa+GAxJ54OzS6ZQAsnLoMOEHso0MrmZufS3mjvxz/Sn9fXzwez839DO3IhOHszMxPj74IOGIPvbSS0xPpe/clHbB3MB4ahJHRLeOAhbcuA04Q++jQSubm5373+BO5Iz+HwwP2QmRQWW+FJmqHeCd/DXDEHnppJacn0gAy+5J7B+OhQRSZBO36y3sfy+UAcILYR5dW8r7vfTfX/5ExJjKIjNEts7rebIe4slJbLgXEWWyjlZyZTAOwFtbAAKFB2G4tFQLACWIfXVrJ6Yn0t6czH3+irTORQaNlavVWNYiK1dpyMQAcsYdttJIzk2lrYQFj8N5SBf/miD1B7KNLKzk9kQbwyNcyxdJmZNCOzGbdfLK2+e5iBXDEHm5BK4n/cACIPQCC2McNtJIzk+mHv5pxDtZCrWzWGu1zH1XPFwLAEXu4Na0uooPYQ5cg9tFLKzkzmbYWWywQthEaLMoK4Ig9fEaC2Mc2Wkn8N0fs4bMTxD5uRquLuAGxh9siiH3sJEHsYycJYh87SRD72EmC2MdO+hdnQtHqgnBPSQAAAABJRU5ErkJggg=="},{"name":"Lantadyme seed","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAC6ElEQVRIDbXBwWscVRzA8e+bTZbyWxl660X47W3eE3IpeFlKKLn1IkjFgvRfLILgQZEeA6EghYC7DzzMg1wWsYybzks3s/OeJlhQpLuzaj4fI+q4S0bUAW09ByZTx//NiLq2nk+mLoZFznkydfwrMXhAtOLvjKgDYliI2raeG2NELXuKwX9cpbcNzbIARCveM6IOaOs5MJm6GBailn3E4D95VI7GjA64jqzeNBc/FaIVt4yo41YMi5zzZOrYRwz+6KQ8PGQ0pk+kNVeXTbNkWReiFWBEHe+19dwYI2oZJgb/8Ek5OuDwgB7IpJ53Lddt488KyKLWiLq2nk+mDmjruTFG1DJMDH72tMRQFKQEmb6j6+jWnL9cQRa1RtQBbT0HJlMXw0LUMlgM/vhZSUFKpA19R9eROl7/sIIsao2o41YMC0DUsqcY/PFXZepJG/qOs29W3MiiFjCijv8sBg/MnpanL1aQAVHLLSPq2EcMXrTiH2JYgIEsavkLI+oYJgYP3H+QmmUBiFYMYEQdA8Tgq1kaj++Pxlz91rQNF74QrdjFiDoGiMEfnZTyEamnW3N12bQNF74QrdjKiDp2icE/fFLeuwcFfYKedeTqsvFnBWRRy4cZUccuMfjZ52UxhkxK9D3dO7o15y9XkEUtH2ZEHQPE4B8/L1NP6uh60jWvvl1BFrVsZUQdw8TggUdflqnj9OsVZFHLLkbUMVgMCzDcyKKWAYyoYx8xeMiAqGUAI+oYJgYPPJimZV0AohUDGFHHADH4alaODvjD9VVz+QvLuhCt2MWIOnaJwR+dlKMDihEkErx90/z8qoAsatnKiDp2icF/+llZjBhBD2Riw+WvTX1eiFZsZUQdu8TgZ1+UBTdSpu/o1vz43QqyqGUrI+rYJQZ//KykgMRmQ3dNt+b19yvIopatjKhjgBj84+flpiNtOH2x4kYWtexiRB3DxOD5UwZELQMYUcdgMSwAUctgRtRxl4yo4y79DmqEWXBj3YdhAAAAAElFTkSuQmCC"},{"name":"Dwarf weed seed","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAC6ElEQVRIDbXBwWscVRzA8e+bTZbyWxl660X47W3eE3IpeFlKKLn1IkjFgvRfLILgQZEeA6EghYC7DzzMg1wWsYybzks3s/OeJlhQpLuzaj4fI+q4S0bUAW09ByZTx//NiLq2nk+mLoZFznkydfwrMXhAtOLvjKgDYliI2raeG2NELXuKwX9cpbcNzbIARCveM6IOaOs5MJm6GBailn3E4D95VI7GjA64jqzeNBc/FaIVt4yo41YMi5zzZOrYRwz+6KQ8PGQ0pk+kNVeXTbNkWReiFWBEHe+19dwYI2oZJgb/8Ek5OuDwgB7IpJ53Lddt488KyKLWiLq2nk+mDmjruTFG1DJMDH72tMRQFKQEmb6j6+jWnL9cQRa1RtQBbT0HJlMXw0LUMlgM/vhZSUFKpA19R9eROl7/sIIsao2o41YMC0DUsqcY/PFXZepJG/qOs29W3MiiFjCijv8sBg/MnpanL1aQAVHLLSPq2EcMXrTiH2JYgIEsavkLI+oYJgYP3H+QmmUBiFYMYEQdA8Tgq1kaj++Pxlz91rQNF74QrdjFiDoGiMEfnZTyEamnW3N12bQNF74QrdjKiDp2icE/fFLeuwcFfYKedeTqsvFnBWRRy4cZUccuMfjZ52UxhkxK9D3dO7o15y9XkEUtH2ZEHQPE4B8/L1NP6uh60jWvvl1BFrVsZUQdw8TggUdflqnj9OsVZFHLLkbUMVgMCzDcyKKWAYyoYx8xeMiAqGUAI+oYJgYPPJimZV0AohUDGFHHADH4alaODvjD9VVz+QvLuhCt2MWIOnaJwR+dlKMDihEkErx90/z8qoAsatnKiDp2icF/+llZjBhBD2Riw+WvTX1eiFZsZUQdu8TgZ1+UBTdSpu/o1vz43QqyqGUrI+rYJQZ//KykgMRmQ3dNt+b19yvIopatjKhjgBj84+flpiNtOH2x4kYWtexiRB3DxOD5UwZELQMYUcdgMSwAUctgRtRxl4yo4y79DmqEWXBj3YdhAAAAAElFTkSuQmCC"},{"name":"Torstol seed","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAC6ElEQVRIDbXBwWscVRzA8e+bTZbyWxl660X47W3eE3IpeFlKKLn1IkjFgvRfLILgQZEeA6EghYC7DzzMg1wWsYybzks3s/OeJlhQpLuzaj4fI+q4S0bUAW09ByZTx//NiLq2nk+mLoZFznkydfwrMXhAtOLvjKgDYliI2raeG2NELXuKwX9cpbcNzbIARCveM6IOaOs5MJm6GBailn3E4D95VI7GjA64jqzeNBc/FaIVt4yo41YMi5zzZOrYRwz+6KQ8PGQ0pk+kNVeXTbNkWReiFWBEHe+19dwYI2oZJgb/8Ek5OuDwgB7IpJ53Lddt488KyKLWiLq2nk+mDmjruTFG1DJMDH72tMRQFKQEmb6j6+jWnL9cQRa1RtQBbT0HJlMXw0LUMlgM/vhZSUFKpA19R9eROl7/sIIsao2o41YMC0DUsqcY/PFXZepJG/qOs29W3MiiFjCijv8sBg/MnpanL1aQAVHLLSPq2EcMXrTiH2JYgIEsavkLI+oYJgYP3H+QmmUBiFYMYEQdA8Tgq1kaj++Pxlz91rQNF74QrdjFiDoGiMEfnZTyEamnW3N12bQNF74QrdjKiDp2icE/fFLeuwcFfYKedeTqsvFnBWRRy4cZUccuMfjZ52UxhkxK9D3dO7o15y9XkEUtH2ZEHQPE4B8/L1NP6uh60jWvvl1BFrVsZUQdw8TggUdflqnj9OsVZFHLLkbUMVgMCzDcyKKWAYyoYx8xeMiAqGUAI+oYJgYPPJimZV0AohUDGFHHADH4alaODvjD9VVz+QvLuhCt2MWIOnaJwR+dlKMDihEkErx90/z8qoAsatnKiDp2icF/+llZjBhBD2Riw+WvTX1eiFZsZUQdu8TgZ1+UBTdSpu/o1vz43QqyqGUrI+rYJQZ//KykgMRmQ3dNt+b19yvIopatjKhjgBj84+flpiNtOH2x4kYWtexiRB3DxOD5UwZELQMYUcdgMSwAUctgRtRxl4yo4y79DmqEWXBj3YdhAAAAAElFTkSuQmCC"},{"name":"Yew seed","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAACtElEQVRIDbXB0WscVRQH4N9NsSFnJZQ+9qFnqYaZ8z8UCb71wZBQn6RPxfQ/lKKIDxICRZBCHnaGYpmLULukJEububtz7zl3qovFSLvakMz3OWLBkByxAGibCZZGY8GVcsTSNpPRWIKvAPR9PxoLro4jFgDBV8QlgLaZOOeIS/yf4GsAxAX+kyMWvNM2k9FYgq+IS6wWfA3gq+2tLtoPh8+JC6zmiAVLbTMZjSX4irjEasHX97+8c319IyaLaqp4fPCMuMAKjlgAtM1kNJbgK+ISqwVff3PvTp+Re1z7ZEMVbftm3ulPv7wgLvAhjljaZjIaS/AVcYnVgq8f7mzlHhnoM1QtJiyizjs9eZ2e1sfEBd7jiKVtJjhnNBZ8SPD1/l5phtybZahaTIiq87m+WaQnR1NgjbjAvzliARB8hXOIS7wn+PrRXpl7mJlmqFoydFHnnYaQfvt9Op2tYYm4wDuOWPDRgq+/3S0tmxpULRli1EWnZ106fHoMYGd7q1P7/uA5cYElRyz4aMHX+7ulZlPD7HQaE7qEGGch4rPbn69vbMRkUc0U3/38jLgA4IgFFxF8ff+LzaToEpIhptnB0dqDe1s5m/W4vv5pjNYDJ7PTH5+8IC4cseCCgq9xzsOdsof1PSzDssWELmrX6VlIh0fHjlhwccFX+Jt7tFfmHvanDM2mCYuoi05Dl5o/po5YcAnB119vb964ccuymUGzqSFGnUdtQ3r5qnPEgssJvt7fLS2bGjSbGmLUedR5SKdnnSMWXE7w9e7dzZs3b6mZZjs9edUlxDQLEb/Wa45YcGnB1wB27m6mhJSwSDg4eo2/9I5YcBWCrwCHf/QAiEtHLLg6wVdYIi6x5IgFQ3LEgiE5YsGQHLFgSI5YMCRHLBiSIxYMyRELhuSIBUNyxIIhOWLBkN4CPCWhbaGDe1AAAAAASUVORK5CYII="},{"name":"Yew seed","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAACtElEQVRIDbXBwWtcVRQH4N/NItIzISJ0VZAzSMt753/oIogbESRDCq50V0v+PhFRXEjIphSkkMW8x4DMBWkZQqdj2nfnvXvPuU8cLEba0YbkfZ8jFgzJEQuAZj7FxmgsuFGOWJr5dDSW4CsAfd+PxoKb44gFQPAVcQmgmU+dc8Ql/k/wNQDiAv/JEQveaObT0ViCr4hLbBd8DeDLg7JT+/F0RlxgO0cs2Gjm09FYgq+IS2wXfP3gs092P9iLyVQtqX1/MiMusIUjFgDNfDoaS/AVcYntgq+//vxeD+RsO7t7SS28erXu9Ocnz4gLvIsjlmY+HY0l+Iq4xHbB1w8Pyz7DeuszNKNN1kVdd7pcpV/rc+ICb3HE0synuGQ0FrxL8PXxUakGy8i9qSIma6O2nf4R0uOzBbBDXODfHLEACL7CJcQl3hJ8fXxUWkY2aG+qSGZd1LDW0KXZfLFY7WCDuMAbjljw3oKvv52UuYeaqSKZdVHXa226dPr0HMDhp2Wn9sPJjLjAhiMWvLfg60eTMvdIZquXiy4hJbQJIa7ufnx399ZejJbMVO27X2bEBQBHLLiK4OsHB/uqSAldQkw4Obv45ot7OSNn7N4axZT7bC+WL396/Iy4cMSCKwq+xiUPD8s+IwO5N1PEZJ3qOmoT0unTc0csuLrgK/zNHR+VlpEN1psqolmMGiLWQX97/rsjFlxD8PVXB/sffnQn9zAzVahZG9FGbVpdLF87YsH1BF8/mpS5h5qpQs2iIrS6bvXFxWtHLLie4OvJ/f3bt++omSqWy0VKaBPWcfWk3nHEgmsLvgYwub+vCV1G2+Lk7AJ/6R2x4CYEXwEO/+gBEJeOWHBzgq+wQVxiwxELhuSIBUNyxIIhOWLBkByxYEiOWDAkRywYkiMWDMkRC4bkiAVDcsSCIf0JdRWjdAHTDloAAAAASUVORK5CYII="},{"name":"Magic seed","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAB+0lEQVRIDbXBPWsUURQG4PekED1BECSWnnR7T7PYiGCR0i4gGGKjov/TIkgQJBACQmanm5sihYsfbDJ3Z+beMyOmMibRWZl5HmJRjIlYFEBZZOubihEQi5ZFBoCIWByGRiwKoCwyImJxGBqxKICyyIiIxWFoxKIAyiIjIhaHoRGLAiiLjIhYHIZGLAqgLDIiYnEYGrFoWWS4sL6pGBqxKIDgZ7jA4jAoYlGMiVgUYyIWxZiIRTEmYlH8l+Bzlgn+hVgUqws+33qy8eHTnGWCvyIWxYqCzwFsPd1YW7u/tz9jmeBmxKJYRfD57vPH0dqvX07u3H1gyd7vzVgmuAGxKHoLPt/Zdl2LW7fvNTGa2fnZIiyrjwenLBNch1gU/QSfv3oxbVuzDl2LGK2JVjdWLdP+wQnQsThcQSyKHoLP3718ZF3bGqw1M5hZE62uLNTp24/lcT5nmeAKYlH0E3z+ZnfatmjNksHMmmh1Y9UyLc6WR8dzoGNxuIxYFP0En7/dnVoLM0sGM4vJqtqqZTqv0+HRKdCxOFxGLIregs9f70ytsxRhZvPvi1TFKqJq6uN8AXQsDpcRi6K34PPtZw9TSjEhJTQxVhUOP8/xS8ficAWxKFYRfI4/dQBYHK5DLIoVBT/Db1gcbkYsijERi2JMxKIYE7EoxkQsijH9BPQZ/mF90Oo9AAAAAElFTkSuQmCC"},{"name":"Magic seed","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAB/ElEQVRIDbXBwUsVURQH4N+JFnak2rRy0XH37qGNIG1cuWsrBIktoqK/skWIRBBuBKlxdnNdGKEiKHPfuzP33KlcZWrNi5nvIxbFmIhFAdRVsbisGAGxaF0VAIiIxWFoxKIA6qogIhaHoRGLAqirgohYHIZGLAqgrgoiYnEYGrEogLoqiIjFYWjEogDqqiAiFoehEYvWVYFLi8uKoRGLAgj+AJdYHAZFLIoxEYtiTMSiGBOxKMZELIr/EnzJMsG/EItifsGX62tL25+OWCb4K2JRzCn4EsD62tKduw8+7BywTHA7YlHMI/hy8/nT1ObT79/uPXxkjb3f/sIywS2IRdFb8OXmxhPLWFi4P2vMLNcXZ6FOH3cPWSa4CbEo+gm+fPViJf/Uoctok8VosWlm07Tz+RDoWByuIRZFD8GX716uWmdmyDmboU3WNBajTZt4cjr9Wh6zTHANsSj6Cb58s7ViGZ3lZGjNUrRpa9NZPL9Ie/tHQMficBWxKPoJvny7tZqzmSFZNrOmtRhtOot1SLt7R0DH4nAVsSh6C758vblihmTZzE5Ozpq2jTPMmrhfngMdi8NVxKLoLfhy49nj1pBSahOa2MYWu3vH+KVjcbiGWBTzCL7EnzoALA43IRbFnII/wG9YHG5HLIoxEYtiTMSiGBOxKMZELIox/QCHUP9hM54hfgAAAABJRU5ErkJggg=="},{"name":"Calquat tree seed","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAEEklEQVRIDbXBwYsbVRwH8O/bVoq/0NWLlx78hULJPMUilIUcpCcvIoiCUBQRC20XDyKKeBBEsGDL+hdIBW8Koui1pScJxSKIUkgyIkveUta2SZPsJPMmM/N+79UNLnbpZhPBfj6KWONhUsQaQNppAahUNf5vilinnValqq1phxAqVY0FWBMDIK5hHkWsAVjTJo7STkspRRxhBmtiTD33zBP9Ud7sJJgirmEGRawBpJ0WgEpVW9MmjrAXa+JTJ488/thy6eBEJoWMMtcfZfHm7eFwibiGvShijSlr2iGESlVjNmvi9189Xsrf4II4hzQvBsPJzf642UmIa3iAItbYkXZaSiniCHuxJn73paOHl5dLgYgXj1KkdJIXMkzz3lbWuNElrmE3RazTTqtS1QDSTkspRRxhL9bE50+fAJZ88E4gIqV4J3AihUgyLn7/o9e8mRDXcB9FrAGknRaASlVb0yaOMIM1MYALZ1YC4MSLwDkpxTvBMBn+tj789c8ECMQRdihijSlr2gCII+zLmjag1lbrIaB0UjrvvAwH/YMHDt4ZTr75aRMIxBF2KGKNxVgTY4q4Zk0MYG217kTywo9HAydIJ+7LKxtAII6wQxFrLMCa+I3nj6WTvLuVNW50iWvWtAEFYG21/uEXP+MfgTjCfRSxxjzWxOdejLzHRGSwlfdG2fVml7gGwJo2oICAKeIIuylijXmsid955WknkpfI8iJJ3dYoazS7xDXMo4g15rEm/uDU8dJJUUpeSprJOHNbNmvc6BLXsC9FrDGPNfFHrz9bOF+KFKWkudhMRtnk8i+bQCCOMJsi1pjHmviTN0+UTgrny1IyJzaTdJL/0NgAAnGE2RSxxjzWxOdPr0jwRSGF83kpWSE2L76+ug4E4gizKWKNBVgTXzi7UpS+cDIpfL/fSyf4trEJBOIIsylijX1ZExPXrIkvnq2Pt+6Kl0IwSN3W2H1/bRMIxBFmU8QaD7Amxo6nqsvNToKpj08dA5A7GYzcpSsbQCCOsC9FrLGbNfFrJ48cWMIjhyqTUrLCja3rp+X67dvD4RL+FYgjzKOINXazJn77hSdLwSE67ETEwXkZ59JPJrf642YnAQIA4ggLUMQau1kTv/fy0UdpuXBePJxsKwVZLoNR3htl15td4hoWo4g1HmBN/OlbJ0qBiDjxLkBEnCDLJUmLW71eo5kQ17AARayxF2viz86slM6Lh3hxAhHvRPJS/urd/fFaFwjEEeZRxBozWBNfPFf3XkS8E4gXEdhxkmTuq6sbQCCOMI8i1pjNmvjz1boP8F6cYJTcBTAYu0uXN4BAHGEeRayxL2tiTK2dqw/6dy58t45tgTjCAhSxxjzWtLFNYVsAQBxhMYpYY2HWtIkj/BeKWONhugd+h5x/wn1YWwAAAABJRU5ErkJggg=="},{"name":"Papaya tree seed","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAACSklEQVRIDbXBwWrjSBRA0ftsTxbPIHqXjeFpYVBVoKH//0PGLshCBdl4J0S7ZhSpoh5rMEkW7paT+BxR89ySqHngWO+Aden5aqLmj/VuXfoU9+M4rkvPlxI1D6S4V3PHeiciao6vI2oeONY7YF36FPdqjvdSDIBaxfVEzTNJcT+O47r0vJFiAO6/vXTQNAtAreIaouY5O9Y7EVFzTFIM5X0BrP5i6BlofnY0zUKtYjZR88d6ty49cKx3IqLmmKQYtpvibkUGBjIMPfWhhVHNMY+oeeBY74B16VPcqzkmKYZqU9ytyJxk6P6hPrQwqjnmETXPJMU9oOY4SzE8lMVyBQOZk+eBx6cWRjXHPKLmuSzF8GNbZGAgw/PA41MLo5pjHlHz/FaKgXdGNcdsoub5kxT3nKk5riFqniulGJioVfyJqHlmSzEAm/uXvqNraFioVfyWqHnmSTFsN8WSkwz/9k3fcWgWahWXiZpnnhRDtSmWK/6XB7qe+tDCqOa4QNQ886QYHspiuYKBDHmg66kPLYxqjgtEzTNbiuHHtsjAwDOEuoURUHNcIGqea6QYeDVyIryhVvGGqHmulOKeV7K5f1nxbaCho4dDs1CrOBM1z0elGLabYslJhqFnoOk7Ds1CrWIiap6PSjFUm+JuReYkD3Q99aGFUc0xETXPR6UYHspiyUmGDHng8amFUc0xETXPJ6QYvm8LBv6T4e+6hVHNcSZqns9JMfBqVHO8IWqeT0txz0TN8Z6oeW5J1Dy3JGqeWxI1zy2JmueWfgHX4v5hgVBu3gAAAABJRU5ErkJggg=="},{"name":"Palm tree seed","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAESUlEQVRIDbXBy2tcVRwH8O+pqcIvggsVpAt/2ejc8we4F0G7ER/QhbTSRqkKosu6cCG0iqLWhYiCaZFS1IponxaJFCm14KNSaqHMvX0kc9o0r8lkJjNzz51zzj33SAeDDc1kRrCfjyCWuJ0EsQSQVsoAhkck/m+CWKaV8vCI1CoOIQyPSAxAqwQAcQn9CGIJQKuYOEorZSEEcYQetErQ9cpTUWWmOX5mGl3EJfQgiCWAtFIGMDwitYqJI6xGq+SD1x5/+IF11hVZxy9pu9DIrs43T5xLpubWEZewGkEs0aVVHEIYHpHoTavkl4+fNs4b511eGOcXW53J2faFicXjv18lLuEWglhiWVopCyGII6xGq+Tg+5sfus8Z520eXO6N9R1XtLS5Nq8nZhtjx2LiElYSxDKtlIdHJIC0UhZCEEdYjVZJ5cAWALkPNvcuLzrOG+uN9Zn107X0m5OVk2evEpdwE0EsAaSVMoDhEalVTByhB60SADPfbS2KwubBOG+ct85n1sdz4YfTF4+eioFAHGGZIJbo0ioGQBxhTVrFgKgdHi1C0CY31nesvzCLu9bfcXmq/sYn40AgjrBMEEsMRqsEXcQlrRIAtSOjHVu0M3t5Yajj8nor2/7OESAQR1gmiCUGoFWyd8ej9Wbn0nRj7FhMXNIqBgSA2uHRe5/Zh38E4gg3EcQS/WiVHNy1MfdFO3PX5ltXZpr7xy8RlwBoFQMCCOgijrCSIJboR6vkxO4nO86nmVts2fl6OlVN9xyPiUvoRxBL9KNV8uunz2YdlxqfZq7W6lQb2XQtHTsWE5ewJkEs0Y9Wybk9mzLjtXHa+Ebb1JY683X97tfngEAcoTdBLNGPVkmy/7nM5Jnx2riWdotNU2t2dnz+GxCII/QmiCX60SpRB7ZYH9LMauPTzDVS02iZlz46BQTiCL0JYokBaJXMfL9VZ3m749Is/2vK11v6zc9OAIE4Qm+CWGJNWiXEJa2SuYPbkuqQy33H5NcXmrML7bfGfgYCcYTeBLHELbRKsOyJRzb8dGYaXafHtkNAZ26q2nzx7UNAII6wJkEssZJWyYevb7xz/br7ybW0XUpttaHVXPuP8kJlrol/BeII/QhiiZW0Sr7cuck4t+Hu3Oa5cYV1vtbsqPn2hcmF8TPTQABAHGEAglhiJa2So7u3PHiPyYy3ubeusLk3rqi3zFS1NTnT3Dd+ibiEwQhiiVtolVz5arNx3jpv88I6b3NvbFjSZramz0609/94nriEAQhiidVolUx9+7xxhcsL57zJvc2Ddb6VuT8nsp17TwKBOEI/gliiB62S6qFt1gXnvXXe5sE6P1kfqi3pl987CgTiCP0IYonetEoWj4wWAdYVNvcXq0MQuF5tvrDrEBCII/QjiCXWpFWCroXDo+en1z326he4IRBHGIAgluhHqxg3CNwQABBHGIwglhiYVjFxhP9CEEvcTn8D4q+4f+xoUo4AAAAASUVORK5CYII="},{"name":"Money tree seed","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAABrUlEQVRIDbXBsWoUURgF4HOyVidgY6eQP9js/TshD+ED+AY2Cza+gI1aWNmJDyA2iiAIksbKd5DZwRBnVgiYYBOdq7ubuWNYWFxRi93M/T7KHDlR5gCaqtjedWRAmTdVAYCkLKBvlDmApipIygL6RpkDaKqCpCygb5Q5gKYqSMoC+kaZA2iqgqQsoG+UOYCmKkjKAvpGmTdVgYXtXUffKHMAsR5jQRbQK8ocOVHmWBHrEitkQ1wMZY6lWJeP71yNP9B2ONcl3H92JBviAihzLMW6fHJ3Z3Jy6cPR2c4VtQmfv8b99xPZEJuizLEU6/LRKMRpO8P2bDo/S2jb9umrMdDJAjZCmWNFrMtbN6+Ha5fn85Q6tKmtjr+9fjeRDbERyhwrYl3eu31jcG4LP6dtm9Knk+8v9w+BThawPsocf4p1+WC0NxhsTWepS23qcHB8+uLtoWyI9VHm+EusSwAPR3upQ9fh4Mvp8zcfgU4WsCbKHP8S6zFA/NbJAtZHmeP/Yj3GgixgI5Q5cqLMkRNljpwoc+REmSMnyhw5UebIiTJHTpQ5cqLMkRNljpx+AVe7nmHET4WtAAAAAElFTkSuQmCC"},{"name":"Carambola seed","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAACj0lEQVRIDbXBvascVRjA4d85oOC7EE69KO8gwsxbxCaN+F/E2lJtU6S1sLYS7K1s/CCFgn+DIIhwkZ0jKebIJXAl4Elwj/FmPswOd2ELs7mR2edxosYpOVEDtt2G2aoyFuVEbdttVpWV1ALTNK0qYzlO1ICSWtEG2HYb55xow0KcqLG37TarykpqRRsW4kSN2bbbrCorqRVtWI4TNWDbbVaVldSKNizKidq226wqK6kVbViaE7Vtt+HAqjKW40QNKKnlgGjDgZIiIFrz8pyocVRJ8cPbzY9nD87uPxatOaqkyEy0ZuZEjecrKX78wa1tefr9D7/cz56ZaM1/KSnC+Dr8BRkvWgNO1Hi+kuLd999+7dVXvrn30wBPMk/hAg+I1hwoKVaM7HU840VrJ2ocVVK8GW5ckpkN0Gf+hgu8aM2spPhWGNnrM8/0cI53osZRJcXAuA4BGMjAAH2mh3O8aA2UFOswMhvY6TM9nOOdqHFUSTEwvhHCwJWBDPyT6eEcL1qXFOswsjew02c6vBM1XqSkeDPcYDZw5ZL8JHOOBwLjOgRgIAMDOw8zGe9EjRcpKQbGKoSBKwM7JecODwTGdQjAQGY2wMNMxjtR4xpKioERqEIABnYuyTEDHgiM6xAGMrOLTMbD5ESN6ykpAoGRAxkPE7jAuA7h9ntvfnvv54tMxsMk2jhR49pKasEBgRHIeJhEG6Ck+MlHt7zzf/xZvvz6LONhEm2cqPGSSmrBsTOJNsxKip/eeWcc+O33/MV3LUyiDeBEjf+lpFa0Ya+k+Nndd/uR9ODR51/9CpNoAzhRYyElRa5Mog0zJ2osp6QWEG3Yc6LGKTlR45ScqHFKTtQ4JSdqnJITNU7JiRqn9C96ZBePnEXTbQAAAABJRU5ErkJggg=="},{"name":"Golden dragonfruit seed","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAACoElEQVRIDbXBzYpcVRAH8H8Z3FQ/RPVG7qkHcDOEEIIyG30NNyIhmEwgDhpRUfzIB8YRR0l8ABeBrIIuwxAYZil9D9n0WevSe4b0PafKzEBDB+zJben+/YhFsUnEogC66QSnRmPFWhGLdtPJaKw5tQDcfTRWrA+xKICcWpYAoJtOiIglYE2IRTHXTSejsebUsgSsCbEoTnXTyWisObUsAetDLAqgm05GY82pZQlYK2LRbjoZjTWnliVg3YhFu+kEC0ZjxfoQiwLIqcUCloAz5RRZGgxALIrBcoo49e72G48eP2Np8CrEohgmp/jhB1ul2mxWj3P/T+5/e/gnS4MzEYtimJzi1ctbZoDDzJ7P6o+/HALOErAcsSgGyCnuXDlvDndzgzvcAbc7e09ZGixHLIoBcoo7V867wx1u5oA7bt87AJwlYDliUQyQU9y9dqEaSjV3uJkDt74/AJwlYDliUQyQU7x542ItqGalmhm+vfsEcJaAMxGLYoCc4hefvFWrvVALujy7de8AcJaAMxGLYkFOEQtYGpzKKX712dtuboaPPv0DJ5wl4FWIRTGXU3z/vTeL4fVz52qtpdjPvx6xNAByit99uV2r7ez+DjgAloABiEUxl1O8enkLeK2cQD1h+w+OWBoAOUWccJaAwYhFMZdT3L12YVasmllBMaullmL7D45YGgA5tSwBqyAWxVxO8ePrF2u1Yi+gFjO3vq8/7B8CzhKwOmJRzOUUv/58u+ue12pWUczc0fd2fNz/dP+QpcHqiEWxIKcI4OaNS1bN3Nwx6202K3f3ngLOErAiYlG8LKcWoL3b7/z1d3a3vrdZb9/ceQI4S8CKiEXxX3KKeImzBKyOWBRL5NRijiXgfyEWxSYRi2KTiEWxScSi2KR/AS1LdHCd1wQlAAAAAElFTkSuQmCC"},{"name":"Grimy avantoe","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAFKklEQVRIDbXB/2sb5x3A8ffnJE3RY8W9JVG0qJ0e7yfdQQjB+AsxrclCcAhmIf0H9sft5wWXlFASuhHs1MVfMKGEKQcj1WlDxj3HvdmnRz2fpGeyqYdDsib9wa+XKO3zK5kwULrBhxGlfaDbao5N+EC31eTE2ITPW0wYuLdq8d87Sjf4AKK0n3zfFEFElPa6raaIcEJpj1NMGLi3a0D8dQes0h7vI0r7QLfVFBGlvW6rKSJKexwzYaB0gxMmDNyF2uRusnWhHH/dUbrB+4jSPtBtNUVEaa/banJsbMI3YeDO1+LljtINjpkwcBdqk7vJ1qVy/KQDVmnPhIHSDd5kwkDpBiBK+0C31RQRpT3AhC8Ba62I496uxSZjNQKUbpgwcO/UpqJks1KOH3fAgixMV55sREo3OGbCAHBv1uKnHaUborQPdFtNEVHa40S31RQR987HZMQH2eR+uhXsA+5CbWo326wW4q86gNINEwZglfYAEwbMVijilgrx4w5YUdoHuq2miCjtdVvNsQnfhIG1QxFxFzX9ftxjdjdZu1Cc20v/8bvyzEG2frkUP2q7i/X4UVvpBsdMGDBdocCtn9KtT9z4YRusKO0n3zdFGBmb8IFuqwmIOGBB3MU6Wf/qdgK8uFi+9jo5d664fqnESK8fP+2AVdozYcDIbOVTk76YcPlNPn7wCqwo7QMmfMkxpT0TBmA5Iko3TBgsTFfWLxTIwGFkai/brBbi/2SsRsxXWI4Yma6wETFXWchYr5fiB22wSnuitM9bTBhwxIIsTFfWf1vglJkfM4G1yyVGHK7/K346XibNeJ3eGmdLu/FSmyNWaU+U9gETBpyidMOEAVgQ4Pbk+GaljAVhKkqcXFEAh7Xfn4//+urm9fHn4+V4mM0n6Vix+O3lEiND4kdtpRuitG/CwL1bJ+3H/YyU66/T5//cZ67CauTeqZHP40AOMuj3Z/ay4QAnx/qVEmn/aid5US1f20mcHMVCce3jEkK81OaIVdoTpX3AhIH7pzpDSPuxySZfp1tjRUa2ounG+CfVouPwt4slMma3exbWL5cYGfav/Tv5rlqe2kucXLFYYOXK+fjBK35mlfZEaZ9jJgzc+3VGBpD2Y5MxspdyoTgdpRvB/r1PK8uVEpYb271vqyXSPpbJ3cSBXKGYz/HNlRIDGMCQmR96TzYipRuitM8JEwb35ioWhvDNpRJpn5T4MJs7SLNDNi4W3Y8K5PMIDCDt4zC1mzi5Ys6hUGDEDvlyNeJnVmlPlPY5xYQB4N6tk4ccDCHrk3F1J8kGnD/HpltmPM8ADvvAzF6Wc3By5ByWKyUgXmqDBZT2AFHa500mfAkCuPfrCFgYwGGfAZN7Sfcngj+4n/3YW/modGOvBzjg5Fiplj7b6X25GoFV2uOEKO3zFhMG7ud1Rpz8zZ0D4OmlEgM47F/bSb6rllH5G51ePsdwgJNDHB4+izhilfY4RZT2eRcTBpxw79f5n5Tr2/Hzuju/1wPskJVqaT7qOfDFswis0h6niNI+/4cJX4K4d2s4eRwQcBi5sd3L51ipnf/jDwdLy9Gf79T+8rjDEau0x5tEaZ9fZMKAE3dnK1+tRRxbnK0UCnzxLOKIBZT2eIso7fM+JgwmG+M52Aj2wXJE3MV6/KgNuJ/X46W20g3eRZT2+QAmDO7NVR6uRmBB3Hv1+GEbLEcErNIe7yJK+3wYEwZglfYAEwZglfZ4H1Ha5yyJ0j5nSZT2OUuitM9ZEqV9zpIo7XOWRGmfs/RfN2M6jCK562UAAAAASUVORK5CYII="},{"name":"Grimy snapdragon","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAFDklEQVRIDbXBUUscWRqA4fc7penk62m7NDG9swROrraqBgZEaIQgQ5CQIQzkJ+yP2z+ww0gICWEYpBFECMJAOgUL03WzUNNGq9vusrWsc1YlQkKym+yFzyNqE/5PZZaqjfg6ojYBpoN+834CTAd9rjTvJ3yizNKVdbfXM2ojvoKoTSZ/9EUQEbXxdNAXEa6ojflAmaWrPzgHe1sGvNqYLxG1CTAd9EVEbTwd9EVEbcylMkvVRlwps3T1oQvHYfFN8XrLqI34ElGbANNBX0TUxtNBn0vN+0mZpd8/cL9vG7URl8os7T50rXFYLBSvfzPg1cZllqqN+FiZpWojQNQmwHTQFxG1MVBmbwHvvYhZ/cHNjnmzawC1UZml3Q3XLsLRQrH7mwEP8ri7/HJ3qDbiUpmlwMq62+sZtZGoTYDpoC8iamOuTAd9Eelu+OqU4wnN4/B1Oga6D1173BmF+e6vBlAblVkKXm0MlFkarbob89xssvurAS9qE2A66IuI2ng66DfvJ2WWeu9EZO2Rd47ZDC3Co2YRTsNyqbh70hm1851XZu2R23ll1EZcKrM0WnHBPH+pw9lysf3CgBe1yeSPvgjnmvcTYDroAyIGPMjaI1edoe9CYNIqFo7Cmzcbo3YOnMzY6xnwauMyS4Fo1S1Xofu2mGuwtWnAi9oEKLO3XFIbl1kKnguiNiqz9HF3+bCVV6cYw7mlSWcU5tMj3uya79fc7zsGiFZcume+67p7dMq7ee+ZAa82FrUJnyizlAse5HF3eb+ZB1A7MJy7M+0IFO2cc4Zbf4bvtKhnjA/421J4+m3Re2a44NXGojYByizlA2qjMkvBgwCPVhdGYYHjXHscmqAhgOH4br61aR6uLLzToq64U4XNRuOgnXNp56VRG4napMzS7oarTqkr6oob43DvX+Pvuu7NruluOGMIDAh1jXMsHnVcjQmYLOVVRWMYlovFN4ehCWjMN6Z3cqD33HDBq41FbQKUWbr22AHVjNkxN8fh+EYRBKR7phst3Os0jCFv5u6M1kHHw6idA85xaxhOFoulSWiCRmOe0e18a9Pwnlcbi9qES2WWrj9xzlF7qhnVCbWjHKMLNMfhbjp+ur580M6do33QGYV5dUIN4Tg0EMw35gJGizkOV1M72qPOy92h2kjUJlwps/Tpg2UPDg5beXVCdcppRTgLq1OmC0WzhZkjEGpPNePc0iQ0QSMwzM9zzjs2t4e859XGojbhA2WWAt0NNz+HCXCOqqI+Qw/DqqZ1k30ttAU11SkYFo86gcEEBIaDdo6j99yAB9TGgKhN+FiZvQUB1p84DDiqGndGfUY4CaczuFfcnXT+1HzpqAMYMAGHi/niYWdzewhebcwVUZvwiTJL1584DMawdNgB9lt5VePOuHUQHodFo0lrvzMX4GpMgBh+6Q254NXGfEDUJnxOmaVcefDEGd47qWjuh6ed4s60A3jHYTtfOuoY+Lk3BK825gOiNuG/KLO3IN0NZwwYAuGcMbQOOnMBo9v57VHnn1vDv//413+8+DcXvNqYj4nahP+pzFKuPFlbfr4z5NJPa8vz8/zcG3LBA2pjPiFqE76kzNLVaCGA3XQMnguy9sjtvDLA+k+u98yojfgcUZvwFcosffpg+ZftIXiQBz+67RcGPBcEvNqYzxG1CV+nzFLwamOgzFLwamO+RNQmXCdRm3CdRG3CdRK1CddJ1CZcJ1GbcJ1EbcJ1+g+9m0+MurlC/wAAAABJRU5ErkJggg=="},{"name":"Grimy lantadyme","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAFKUlEQVRIDbXB/0sc6R3A8ffnGc0mj/FLct0LV+7yeBGZeXrhsIZtgiwiy7JBjgvtP9A/rr+XhoiIi4jIIglLgxTSycM2dzORBpq9mrvVmVPHnbnVO0tC0ib9wddLtLH8n9LYaePzYUQbCyRRODJpOZNE4cik5V3S2FGdobWtjc8HEG1sEoWAiGgTAPvfhpc/t0kUjkxa3pTGjvlb0GdzGwptAt5HtLFAEoUiok2QROHlz20SPdUmSKJQRGnjcyaNHQu3ar3O+uUbbG5r4/M+oo0FkigUEW2CJAqVkkvXAyCJQhEB0cbnVBo7Fm7Vep31sWk2/gqFNkEaO2183pTGThsfEG0skEShiGgTJFGolFy6HgBJFIoIlZu0nwDa+GnsqFXq37u1MZ+NNhQgjUq52e5q43MqjR0D1Rla29r4oo0FkigUEW2CJAqVkkvXAyCJQhGh+lv2k9kf//XY9RhYuFXvPV+bmGS9DWjjp7GDQpsASGPHbMDwBUZKrLehEG0skEShiGgTAPvfhkqposhFFBTUfsfB4e3vo0cjn80lO1tXbzQO/9kcn2LtIfU7rD3UxudUGjtmphm+UOvvrJdvsroFhWhjkyjk1MikBdLYFUUuoqAAoX6H46z67w7QGp2c34suXiw1x6egz0FGaxsKbYI0dgzMBtXsReuTm5SGWNqEQrSxQBo/5ZQ2QRq7+mx57fFLEG38NHaNSrk5OslRhgK8+v7ztYlJ9lLaT7j9JY/+xsDMNNsdKl80eNn82LK8CYU2gWhjeUsaO04UII1KuTlynYEcFAON5LnA6vgUA4qFl3/f0JMcHLHbq13dX//kS5ZbnCi0CUQbC6Sx4zXa+GnsoAAB6rNjaxM+eQ7Uex3llQRQrH5sWdpcmBnb0JNk/flsZ6RUWhmf4mfNh9r4oo1NY0etwlFGlpMdzfRebP+jR+UL2k+oVVAeSiHQz8n7jb0o76M8mlenybJq17WuTM+/6iiP0nBp9Vc+AystThTaBKKNBdLY0bjDwMEBP2azvZ3HF67hwXan4o99eq2kFH8esRwf393tFNAcn2Ig78933eaV6fp+R3ml0jBLH1mWNvlFoU0g2lhOpbFjsUqeU+QcZBwekENvj7HRSm+n7Xr3quUH4z45i7tuZWKawwzyWq+jwBsuDXksX7HkOf2cPG/88KzZ7mrjizaWM2ns7s2VC8hheXSaw0OOMrKjuYMX2RHtsc8Y1Qx5iKLIOciA+n5HeSVPMTzMQJGztNXlF4U2gWhjeU0aOwZqFYaG8RR5TpZxnFVffZP1Gb3Imr7BqKYPRxmKxl7kKZSHp3gw7pPDSgsKQJsAEG0sb0rjpyAMLFZRkEP/mOM+x1lt/5vkgEef/ubr/WdLempx7xmgQHksXfG/fuWWtrpQaBNwRrSxvCWNHYtVFCj1+1chcH/Up3/McX9+121O+IxcWvwuHPLI+ygPUTxodTlRaBPwGtHG8i5p7PiPxTlQ/Cw7XPjObVy7eS/pAEXO0rh/b88puN/qQqFNwGtEG8t/kcZPQahVUB4KRDGg1OKuG/JY+sj+4YfwL5vdP9799Z9WX3Ci0CbgTaKN5X9KY8eZxdvllUddTn11uzw8zP1WlxMFoE3AW0Qby/uksZv1xzxoux4UnBDqd1h7yMBXVZZb2vi8i2hj+QBp7O7NlR9sdaEA4e4cq1tQcEKg0CbgXUQby4dJYweFNgGQxg4KbQLeR7SxnCfRxnKeRBvLeRJtLOdJtLGcJ9HGcp5EG8t5+gkUKDaMFSs6OAAAAABJRU5ErkJggg=="},{"name":"Grimy lantadyme","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAFBklEQVRIDbXBfWtb1wHA4d858ktyHFuJWy10a3tEPXPvmUsIDqLGCGOEkTFmIbAvsI+2D7DRYGOMhTFGGJMgEkJZIh+8Dh2bBValjS1HJ5KvdG8lUY+EpE32h59HKG34P3lnlQ74OEJp06xVuTCWNfwm7yz52+w9UTrgIwilTbNWFUJwQemQX+GdZfEOMZQfQaJ0yIcIpU2zVhVCKB3yDu+s0gEXvLMs3ik0jnaufUn5kdIBHyKUNs1alYGxrOEN3lnmb7H/ndIBA95ZCrmlk9r2xJfsPoJE6dA7q3TA27yzSgeAUNoA3h0ASZKMZQ0XvLMs3qHZovIUUDrwzlLILZ3Utq9n2alAAqKYy5QqdaUDBryz9ORvs/dE6UAobbjQrFWFEEqHDHhnKeToRDRas6+fP7YNegq54lmtlJ5i+wGgdOCdhUTpEPDOMhtyZYQro+xUIBFKm2atOpY1QLNWFUIoHXpnlQ68sxTn6HRptb85qT0c/2LeH++nvyq2/1O6MUXpAcU5Sg+UDhjwznJ7mtGRQvTDTmaarX1IhNIGaNaqwFjWeHcAYjaYeGwbSgfeWYpznHfzP1pgL/3Vwqt/XxkeLaWn6Gm12HsCidKhd5ae2XAhfl6++TUjI6zvQiKUNgx4dwAoHXpni7mMkGw9rCsdeGeXc5mt8SydmB5JsXlUSk9xekblKfO32P+OntmQxwfkZpblD1u/M6yXIVE6FEob3uGdpS8BsZzLbI1n6Ylj+mSxWROSrfQUPUIu/vefuypL1KX+sjAZ7Xxm2CjTlygdCqUN4J3lDUoH3llIQADFXKY0nmVg6awmQUgkbN6cYW138fbErsrS7S62j8fU6Mb4NAl9pX2lA6G08c6yNMd5i05MdD778vnjfzXIzVB5SiHHUAohkZJuh7hbPK0xUJqcJorydbt3Y3qhcTgEo6Ojm58GINko05coHQqlDeCdZXmeBFpt2q3cyXHl6k16nhx+86eJzz8dFXL47+N/5LyzfHJIzFZ6CgkxCy+ela9PLzWOUilGhln/ZIb1XX6RKB0KpQ0D3llW8vTEMe02ryPocvKa61dzZ8eVZ417+cz9G4ZOvPKT3ZwMaLeJ40LjSKYYlgylWP/E0ImJY5K4+PL7UqWudCCUNlzwzt7NZ4AkZn18mijiPKId5VvH7XMqE1+QHkdKUpJuzHkbKDaPBAwNMyzp6cas79f5RaJ0KJQ2vME7S8/SHCnJkKQT0405jxZeHna6qCuj29f+wNg14pgoApbPalIylCIluX/DEMNGGRJA6RAQShve5t0BCHpW8yAhJorpRHTiwqujVqu9//nXf351uK6mVs++j2EohZCspc3d0+raXh0SpUMuCKUN7/DOsrqApOfeaRW4Px7QiYmixZ/s7mTA2NXVH6spSRIjJBLu79XpS5QOeYNQ2vA+3ln+ZyVPj4QYos7ii2e7n926d2aBGNbS5t5pVUi+LdchUTrkDUJpw6/w7gAES3NIQCJASiSrL2xqmLXJmb80nv5jt/7Xld//bfM5fYnSIW8TSht+k3eWC6vzmY39OgOr85mRIb4t1+lLAKVD3iGUNnyIdzYXTMgUD581IKFPsDTH9gN6VhfYKCsd8D5CacNH8M7ezWfW9uqQgGAlz+YeJPQJSJQOeR+htOHjeGchUToEvLOQKB3yIUJpw2USShsuk1DacJmE0obLJJQ2XCahtOEyCaUNl+lnUkEtjKuoWPUAAAAASUVORK5CYII="},{"name":"Grimy lantadyme","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAFBElEQVRIDbXB8Uvc5x3A8ffz3Fmzj71o0l27rDSPzLnv96lbCSmiiBwi4iHDUCnsL9if1X+gYyGiBDkpchwiFWmRQXI+C457EuZYXJPo9Z56fs/vd6fUYkja5BdfLyXGcpmUGNtq1DnXN2j5RcE7SreobYuJeAtKjG016kopzomJ+RnBO6Y/JYXqN5CJiXkTJca2GnWllJiYVwTvxEScC94xPTrTbHzVd5PqN2Ii3kSJsa1GnTN9g5YLgndM3mJ9W0zEmeAdM6OzB43VwiBrW5CJiYN3YiJeFrwTEwFKjAWC3wGyLOsbtJwL3jH1KT8csfkAEBMF75gZnz3YXe0f5KstyECVx4qVzX0xEWeCd3SVblHbFhMpMZZzrUZdKSUm5kzwjplxOgmHrdHW3pY7pGtmtNxsVPqHWP0aEBMF7yATEwPBO0ZH6M0hwurXkCkxttWo9w1aoNWoK6XExME7MVHwjvIEJylHRxMH/9qQwcnQWL82XG4/rgwMU9mgPEFlQ0zEmeAdt2N6crPp09X3I+6vQ6bEWKDVqAN9gzb4HVCj0dUtdygmCt5RniBJSs8cULv6u6nv/93bQ2VgiAyOjqhtQyYmDt7RNToylTyp3viE3jyLVciUGMuZ4HcAMXHwrjxW1LCyuS8mCt7NjRVXCkN0Erq0Lrcalf4hDppsPmDyE9b/QdftmG93GBuZ4+nKByMsVSETEysxllcE7ziVgZobK64UBulKOaUpNxs6x0phmC6tp//r1uRD2gnPn89eS1ZvWJZqnMrExEqMBYJ3XCAmCt5BBgoojxUr/UOkJ8DsQUNpdA4N998fYbE6fbu4Jh+SpFPJfwrCcmGYrhQqG2IiJcYG75gd5zjhOCE5uX345Ft3yNgImw+YGSen0Rqt6XTI0vLBLqBh5dcRSaf09GFtYHjq8HEeeq9w/z1L13KNU5mYWImxQPCOuUnSlHabH45Gm0+23vkAcmzvjH189aPfvJvTfCl/4KQz99xxwsrAMF1ZOvX0YfV6NNts5DS9vSxeH2Gxyo8yMbESYzkTvGO+RAppSrvNUZsTaH5P4d2xZmPz4eFCqXhvYIQsnf+uvnwtot0mZabZyEG+h5xm6foIWUonJU3LLx5VNvfFREqM5VzwbqFUzICUxf6IdpvjhHZSaj9pH7NZ+Ij+AjmN1nRS2m20LrcaGvI95DVdGSzW9vlRJiZWYiwXBO/omh0nlyevSVOSDsdJ6cWj9AS50rv6q5v099FJSdqQm2vu5nMoTU+eu1dHyFKWa5ABYmJAibG8LPgdUHTNl1CQQadDktJJZlqPw1F747d//Kz1aLFveL71iBSlyWnuDdiFF/V7tX3IxMScU2IsrwjecacEGs3nL/4J3C38nk6HJJ1+trt2fQi5Mv/sQU6TpmhNTvfcre5xKhMTc4ESY3md4B0/mS/xk/bx9P92125En7dcmpLBYr9dOKhr3XO3ugeZmJgLlBjLzwh+BxSz4yiNBq1Bo5n/rp7Ls/jen/5ysPO3tb2/zt/8YvkxpzIxMS9TYiy/KHjHuTuTxaX1fc7cmSy+k+/5e3WPUxkgJuYVSozlTYJ3ox9f1bD58BAyTinKE1Q26LpTYqkmJuJ1lBjLWwjeLZSK92r7kIHiz5PcX4eMUwoyMTGvo8RY3k7wDjIxMRC8g0xMzJsoMZbLpMRYLpMSY7lMSozlMikxlsukxFgukxJjuUz/B2pOL4wAsXG9AAAAAElFTkSuQmCC"},{"name":"Grimy lantadyme","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAEyElEQVRIDbXBcUtc2RnA4d85M67pmx012c5u02VzQq299+60S8giisggIg5SDJWFfoJ+rH6BloaIEmRkkWEQWZFdpJDE02CZk1BLYzeJznrW6x3v6Rg2SySxcf/weZSYhJ/IOysm4nyUmISfwjtL9SbNTTER56DEJJybd5bJz8mh8TUEMTHvosQknM07KybiFe8sk8NT7daXl6/T+FpMxLsoMQln8M4yfpPVTTERL3lnmRqe3mstl26wsgFBTOydFRNxmndWTAQoMQln8M4y8TnfH7J+HxATeWeZGp3e217uv8GXGxBA1UbK9fVdMREveWfpqt6kuSkmUmISzuCdZWqUTsb+wfDBzobdp2tquNZu1fsHWf4KEBN5ZyGIiQHvLMMVeguIsPwVBCUm4Q3eWTGRd5baGMc5h4dje/9ckxvjvrV6ZaiWPq4PDFFfozZGfU1MxEveWW7F9BSm86fLH0bcW4WgxCSc5p0djvo27L6YyDtLbYwsqz6zQLPvVxPf/au3h/rAIAEOD2luQhATe2fpGq5MZE8a1z6jt8h8A4ISk3Cad7Y2UtawtL4rJvLOzoyUl0qDdDK6tK4dtOr9g+y1Wb/P+Ges/p2uWzHfbDFSmeHp0kcVFhoQxMRKTMIbvLOcCKBmRspLpRt05ZzQ1NotXWCpNESX1pP/sSvyMWnG8+fTV7LlawkLTU4EMbESkwDeWV4jJvLOQgAF1EbK9f5B8mNgeq+lNLqAhnsfVphvTN4qr8jHZPlE9u+SsFgaoiuH+pqYSIlJvLNMj3KUcZSRHd/af/KN3Wekwvp9pkYpaLRGazodQl7b2wY0LP08IutUnz5oDgxN7D8uQu8l7n2Q0LXY5EQQEysxCeCdZWacPCdN+f5wuP1k472PoMDm1sinfZ/84v2C5i/yG447M88txywNDNEV8omnDxpXo+l2q6Dp7WX+aoX5Bj8IYmIlJuEl7yyzVXLIc9KUw5RjaH9H6f2Rdmv9wf5ctXx3oELIZ799uHglIk3JmWq3ClDsoaBZuFoh5HRy8rz24lF9fVdMpMQkvOKdnauWA5Az3x+RphxlpFk1fZIesV76hP4SBY3WdHLSFK1rBy0NxR6Kmq4A881dfhDExEpMwmu8s3RNj1IoUtTkOVmHo6z64lF+jFzqXf7Zdfov08nJUijMtLeLBZSmp8idvgohZ7EJARATA0pMwmnebYGia7aKggCdDllOJ5s6eOwP07Vf/vYPB4/mLw/NHjwiR2kKmrsDydyLh3ebuxDExLyixCS8wTvL7SpoNF+8+Adwp/RrOh2yfPLZ9srVQeTS7LP7BU2eozUF3XOnscOJICbmNUpMwtt4Z/nRbJUfpUeT/91euRZ9cWDznADz/cnc3kOte+40diCIiXmNEpNwBu+2QDE9itJo0Bo0mtlvHxaKzH/wuz/ubf11ZedPs9f/vPiYE0FMzGlKTML/5Z3lldvj5YXVXV66PV5+r9jzt8YOJwIgJuYNSkzCu3hnhz/t07D+YB8CJxS1MeprdN2ustAUE/E2SkzCOXhn56rlu81dCKD4/Tj3ViFwQkEQE/M2SkzC+XhnIYiJAe8sBDEx76LEJFwkJSbhIikxCRdJiUm4SEpMwkVSYhIukhKTcJH+B+8BEYyKC646AAAAAElFTkSuQmCC"},{"name":"Grimy dwarf weed","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAEwklEQVRIDbXBX2sb2RnA4d97ZEX26z87TXEFpXB8p5lCwBiMwQgRjPBiypr2C/TD9b40xCzBQphgjMEYQqDQyUAvZm4KU1101tk5kWX5nEpOXBKSNumFn0fUJvyfXJGp7fBtRG0C1Hm6vJFwr87T5Y2EL3FFxo7nwqjt8A1EbVLnKSAiamOgztPljaTO0+WNhE+5ImPXcwsXBoLamK8RtQlQ56mIqI3rPF3eSFzxRm1c56mIUdvhnisydv3eODppVlwYtR2+RtQmQJ2nIqI2rvNURNTGQJ2nIgKitsMdV2R0/Z6LThYrzg0EtbErMrUdPuWKTG0HELUJUOepiKiN6zwVEbUxUOepiLAZeG0AtR1XZHR930VDrTgzEED2t9cHlyO1He64ImNmx3Nh1HZEbQLUeSoiauM6T0VEbQzUeSoi7AQcW5PoVXbFTNf3XXu4UnJqALUdV2QQ1MaAKzKeeBahBWcGgqhNgDpPRURtDNR5KmJC8CIGAt3ANTt1dLFY7Y6j89Vq37cHSyWnhp7n1KjtcMcVGb/1PGLPRCdRxYmBIGqTOk+5s7yRAK7IQvAiBgIIPc+U7tsIOFuseuNocbE1WCqZuYYLA0Ft7IqMmSe+S3T2y4pHMDAQRG0CuOINd9TGrsj6W+vDV/8EUdtxRba/vT5oldww16A/bg9XSq7gtWHbc2mYeeL5q2HT7zfbg1+UDAwEtbGoTfiMKzLmAsj+9vqgVTLjeW//pi1wvFQyY3haRS+bFTdQsfc4OnlcMTTMBbWxqE0AV2R8RG3HFRkEEKC/tTbUijt9F5lGSwDDcVRybJ5urr1sVtzS89Fyq/ViqeS9l0ZtR9Qmrsjoea7hBjybP0ev/37Fpue1oesxYMDAFDz7121/i2kwWC2Z0P0pOlutem8j06DVbB1/VzIzNMwFtbGoTQBXZDz1zEzAsfUuetWomPmb2e6s/abdMoY/PyqZ8v3bdoDBUsmd3r+i09WqP45Mo9VqcrRSMjB8ENTGojbhjisy+h4PHiYwZu4K1tiuo8vs6rC7/lxLphzU7RfLJRPw7I0jA41ma6HBjyslHqbg2X/XHlyO1HZEbcI9V2SHu+sBPPy4WDKBa7hh9za6mXC5VLEGBgx4mDDTH0em0WoYmk1mgufofMQHQW0sahM+4oqMmZ7HwAJ4mMI1XRfd3LK6yLBZsQwepszsX7cbBtOgYXiuJR6GBgKgNgZEbcKnXPEGhJm+570pTOGGvZuoHnPxq+qHSftooTy4bgMGTIMjLX9w7aPzEQS1MfdEbcJnXJHR9xhmfu/awLPFkilM6f0cna5UKAc/tRca+FtMAzE8PxsxF9TGfETUJnyJKzL+Y89j+GDC06vo5ePqcNIGgudIy8Nx28CzsxEEtTEfEbUJ/4Ur3oDQ88wYMMwZDt62FxocrZZ/eNf+y+noj9//+k/H/2AuqI35lKhN+J9ckXHvYGf9xcWIO7/bWW82eXY2Yi4AamM+I2oTvsYV2VZnrQGX2RUE5oSe59Qw0/cMjdoOXyJqE76BK7LD3fXn5yMIIOx5TgwE5gSC2pgvEbUJ38YVGQS1MeCKDILamK8RtQkPSdQmPCRRm/CQRG3CQxK1CQ9J1CY8JFGb8JD+DV1hA4x+9gDsAAAAAElFTkSuQmCC"},{"name":"Grimy torstol","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAE4UlEQVRIDbXB72sU+R3A8ffnO6Zrv0tz06t7c4mWT64t7MyzIxCEEIKEZSVIwh139GH/uD7zsCgJIlmCiARBAtJn60AfzLT+6GSFG9POGLPZ77ez4SyKXrUP8nqJ1YT/U52nVrt8GrGaAFU2bC8kvFFlw/ZCwofUeUrPsWusdvkEYjWpsiEgIlZjoMqG7YWkyobthYR31XnKVYeHgQFvNeZjxGoCVNlQRKzGVTZsLyR1/thqXGVDEWO1yxt1nnLVrY3CuxdKBsZql48RqwlQZUMRsRpX2VBErMZAlQ1FBMRql1N1nrLu1orwbqdkx4C3Gtd5arXLu+o8tdoFxGoCVNlQRKzGVTYUEasxUGVDEWHFs2cAq906T7nmes/D3bmS2wY8SH+pM9gfWe1yqs5TGj3HrrHaFasJUGVDEbEaV9lQRKzGQJUNRYS+5yWLZfgoPaSx7npFtHuxYNsAVrt1noK3GgN1nrLs+AW04bYBL1YToMqGImI1BqpsKGK8dyIGPNc8FZcPwocXyuUX4YP5sv8yGswVbBk2HVvGapdTdZ6y5Pgla/8O72rJTQNerCZVNuRUeyEB6jz13okY8CBsOsasPAmBvU65OgrPn28NvixovIJdA95qXOcpjWW38q9w7/clLbhuwIvVBKjzx5yyGtd52lvs7D46ALHarfO0v9QZfFEwZkrojaLdiwU/wp7hiuOeoXHZ8dCw6vqvosFXBT8Y8FZjsZrwnjpPmfIg/aXO4EJBwzFl6L+IBHbmChqGK1l4Lyw5gRFr7fDu70puGKa81VisJkCdp7zFarfOU/AgQG9xdneuxNHoFaEJWgIYdhYKrpsrX8/e+7zkhNXDsN1q3ZkraDjYMla7YjWp85QNx2s4hmO+Pgj/+rdDVhx7hmuOAAIwMIYJ/YPITTABg0sFx6z8PdybL1efhSagNdPa0YLGDcOUtxqL1QSo85RvHA6O4IjFInw0W9LYN0vd2UtRyxj+8kXBmKtPIg+DuYKGZzUL78+XvVFoglZrhu3fFlw3/MRbjcVqwqk6T/nO0ZjAK3gNDn6EX7NUhPvp4eZKZ2u+YML6k+jOfMERjbUiNBDMtM4F3L5UMAEHE/rPo8H+yGpXrCa8Uefp5nLHg4PbUcERjOGI5Zfh+Jj9qOQzCEBgAq9p9EahCVqBYWaGhndsPxjxE281FqsJb6nzlMaG4xwEMIETeM3K83A84Vfn2f285DNwcEyjfxAFBhMQGLbmCxzcMOABqzEgVhPeVeePQWh87zDg4ATGMGbtRVgd8fAP5caLaPs3xfpBBBgwAdvzxcazaPvBCLzVmDfEasJ76jzle4cB4ZunEXDry4ITGLP6NLx/saTNeh6dC3ATTIAYtvZGTHmrMW8RqwkfUucp//WdoyHg4Zgr/wjvfVVujiLAO7bni81/RgZu7Y3AW415i1hN+Bl1/hiEDYeAAQFDY/1JdC5gW4tvn0Y374/+dHX+zzvPmPJWY94lVhP+pzpPeWP9cufOwxGnrl3uzMxwa2/ElAesxrxHrCZ8TJ2ni93ZAPbTQ/BMCRuObUPjj44fjNUuHyJWEz5Bnaeby52tByPwIHzruGnAMyXgrcZ8iFhN+DR1noK3GgN1noK3GvMxYjXhLInVhLMkVhPOklhNOEtiNeEsidWEsyRWE87SfwDy/guMbuhzTAAAAABJRU5ErkJggg=="},{"name":"Grimy torstol","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAEyElEQVRIDbXB70tc2RnA8e85o3H7WMKlZHLjutvHdlvuPftqCUggiIjISJCIpcvu2/5pfbVLyi4RJQSHEERECEJerl5owZPG1ZvJsoPtnPXnuZ2ZxmJIdpO+8PMxoo7/U/CFaMb7MaIO6Oxs0Tc85vhFwRc0Ik0rmvEejKjr7GwNj7ngt4GqqobHHD8j+II7kQgrFirRnHcxog4Ifls0Bzo7W8YY0Zy+4AvRjHPBF8zF6b30cb1kxYpmvIsRdZzr7GwNj7ngt0VzIPiCmcgjK5rRF3zBXJzZSx+NlDywUInmwReiGa8LvhDNACPq6OvsbA2PueC3RXP6gi+4E+nAmgVEs+AL7saZ3fTRaMmyhQpMY7ze3GyJZvQFX9DViDStaGZEHdDZ2Roec8Fvi+acC77gbuQY/sXNH5KnxQFdc7HxIm2OlCxZQDQLvoBKNAeCL5iIXIFhWLZQGVHX2dkaHnPBb4vm9AVfiGbBFyxEzqDDrf3kyfX27R+SjZF248e0OVqyaFmILFrRjL7gC25FfsX0Qfr4dyXfWqiMqOvsbHGBMfZmdvVpcSCaBV+wEDlh4lkCrKftyZfJB4NDzdGSrgBNC5VoHnxB10Sc/Hey9kmbK/C1hcqIOiD4bS5ojF83lpUnLdEs+GJ2vL5yo+SYHkvjZdocKWnDmmU68tjSdTuyYZmMs0fpyu9LvrZQieZG1PGG4At6KjCz4/WV6yVdkR5L40VqLCsjJV01pv6RrP6mzTG0mB5OH/+x5J6lpxLNjagDgi+4QDQLvoAKDNAYrzdvlESwzOynFozFwsNPSr6yU59dXb3W5pSpdjIsQw/Skv+6b0UzI+qCL5iPHMEJHHNzP3n69wMmI2uWu5Ea1MDAKUQaeyl9zd+WHDOxk6x/1J7cSwZgaGjooZYYuGfpqURzI+qA4Av+FOk6hJ8Y30s2kzZdT+ytT69+dG3I2MFvRp5zzOzzlMjKaElXZPJZsjbSninTWo0rgyyPlXxleaUSzY2ooy/4gi8iESoI8BM9bUgYf5FsfnewMFFfHC2puOPThx+XHEFkei+1NQYtAzWWteQMzuCMxm7a3GyJZkbUcS74Yn6iDlSR5Q9LjuAIDpn4MTk6ZjNtk0ANanAGh3Q1XqYGBgYZtHSdRZY3WrxSieZG1HFB8AVd85FBqMEZnMARk98np2fIB0OPrpUkcAbHdM3up9YyUKNmWRwtqeBvFipANAeMqON1wW+DoeuLiIEKTuAUjplupYeHRxtZ+26ZLl8v5/bSCAM1jGVptJzfTZfWW1CJ5pwzoo43BF/wZcTStbCbAos3Sk7glKl/Jqsft/k1cz6tWaqIsVhYXG/RU4nmXGBEHW8TfMH/fB6xvHLI1LNk9Q/thf0UiLA0Wi7spsZyf60FlWjOBUbU8TOC3wbDfMSCAQsGLHM+rQ2yNFb++Xn67WrrL3c+/OvD7+mpRHNeZ0Qdvyj4gnNzt+sPNlr0zd2uXxng/lqLngoQzXmDEXW8S/DFeHbV1njy3QFU9BgWIouWri8j96xoxtsYUcd7CL6Yn6gvrbegAsPnkW8sVPQYqERz3saIOt5P8AVUojkQfAGVaM67GFHHZTKijstkRB2XyYg6LpMRdVwmI+q4TEbUcZn+A/v0BYzp2kMYAAAAAElFTkSuQmCC"},{"name":"Magic logs","base64":"data:image/png;base64,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"},{"name":"Banite stone spirit","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAFBUlEQVRIDbXBwWsc1x0H8O/vvZ2R8xMsc4ici8lvi4x2XhsCPQeCJRaKoSqFhKiUKPhSSkoh1KSEltCWNM0hlEL/AZ917ck0IlCQMZEsWdahrIZUzb7jMKYsNfO8O7NvpvbQpRLSrnzp50MsBi/M2QQNli5eDLEYAPmgv9gxAPJBH1OLHYMpZxMAH9/+AI1P//RnACxdXIZYTD7oAyAiljgf9IkIUywxAGeTj29/gLOCVvDbz//I0sVcxGIA5IM+EbHE+aBPRCwxTnE2+fDn73/3O69duXIlCAKtdVmWyT//8dHvPgVqlhizEYsBkA/6RMQS54M+Gosdgylnk9s/++nS0sthK2i1WkpRWU7GRfGrT/4A1CwxZiMWAyAf9ImIJQbg7DGAuq4XOwYNZ5NfvP+Tqy8vBc+1iFRRFkVR/vr3nwE1S4zZiMUAyAd9ImKJMZUP+kTEEgNwNtn44Q9ef+3bQUORKsril7/5BKhZYsxFLAZAPugTEUucD/qLHQMgH/SJiCVGw9lkY+O9MAy890Ux2tn5Mk0zoGaJMRexmHzQR2OxYwDkgz6AxY5x9pglRsPZZGPj3TBc8N6Px6N7975M0wyoWWLMRSwGgLPHaLDEAJw9BsASY8rZZGPj3TBc8N4XRbGzs52mGVCzxJiLWAwu42wCVO+8816rFdb1xHs/HP7riy/uAjVLjLmIxeAyziZvvfWjVivUWnlfeT/J8/zu3b8ANUuMuYjF4DLOJm+//eMgCIjI+4n31WRSPH78+N69v7F0MRexGMzlbBJF7V5vPQhaALz3VVV5Xzrndnf3hsOMpYvZiMVgNmeTKGqvrt4MghaRBlDX1TPe+6IY7e/fT9MMqFlizEAsBrM5m0RRu9f7vtbq0aNDQGutAHhfdbsro1F+dLSfphlLFzMQi8EMziZR1O711oNAP3z4SOtAa4Up76vl5Wvj8WRvb2c4/DdLFxchFoNznE0ARFG711sPgtaDB4dhGGitAK01AAVU3sP7cnn51aIodnf3hsOMpYtziMXgLGcToIqiqNdbD4IWER0cPApDDQRaK5zifXX9ukwmZVGMd3f3hsOMpYuziMXgFGcToB1F6PXW9XPq/v0HzIHWgdYaUIBSCs9UVQVUy8sd7ydlWY7Ho/39h8NhxtLFKcRicIqzSRS1b9z4Xhgu6MZXX+2G4RWtldYBAKUUGlUFoFpZ+VZZFpPJZDwujo72AKRpxtLFFLEYTDmbRFEbwOrqzTBcUIqItNbq4OBQa6W1BtQzaFRVBVTXr3e895OJL4rxkydPTk76aZoBNUuMBrEYTDmbRFEbwOrqzSAItNZEpLXe23sQhgtaa0ABCv9VeV+urCx7P/Hej8cj555+/fXf0zQDapYYDWIxmHI2iaI2gDff7IXhS1prpejq1asAtre3tQ601oDCc5X35dpaD8A335x4Xz59OhqN8pOTJE0zoGaJ0SAWg1OcTaKo/cYbN8LwpWvXXgWgFAAFYHv7r4DWWgFYW1vDWYeHB0lylKYZULPEmCIWg7OcTaJoaXPzFhpKoaFwma2tO2maATVLjCliMTjL2SSK2sDC5uYtNJQCoDDX1tadNM2AmiXGKcRicI6zCYAoWtrcvIWGUgAULrK1dQdAmmZAzRLjLGIxuIizxwCh8corS7hImmb4n5olxjnEYjCbs8d4jnCxGlMsMS5CLAYvwNljnMMS4zLEYvD/9B/k1yp/0uZapAAAAABJRU5ErkJggg=="},{"name":"Light animica stone spirit","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAFDklEQVRIDbXB74sc9R0H8PdnvjOzt59Llrk0d0lF/NyTsvONIvhYsDlZFIXYgsFra06iJkajEEx/iEXa4i9KKRX7B+TxPe2jgEUo3D2541q5B2VvtFdvwCfjRFmN+83O7HxnNItLb7ndvTzp60UsGnfMxBEGWJq4M8Siu3ttDM0uaoxj4gjAG1evYODtv7wPgKWJwxCL7u61iQhDLCFGmTh64+oVjPJc7/d/+jNLE1MRi+7utYmIJcQEJo5+9cpLD9x738zMjOd5Sql+vx/99z+v/eFtoGIJMRmx6O5eGwOzixrjmDi6evnS/Pxx3/Vc13Uc6veLLM9ff/MdoGIJMRmxaAAm3gFQVdXsosYBJo5efeniwvF57zaXyMn7eZ73f/vWu0DFEmIyYtEY6u61iYglxCgTR8s/feL++055Aw45eT//9e/eBCqWEFMRi+7utWcXNYDuXpuIWEIcYOJoefkZ3/estXneW1v7MElSoGIJMRWxaADdvTaA2UVt4h2WEAeYOFpePuf7NWttlvXW1z9MkhSoWEJMRSwaAybeAcASYhwTR8vL53y/Zq3N83xt7e9JkgIVS4ipiEXjMCaOgPKpp55xXb+qCmttp/PlBx9cByqWEFMRi8ZhTBw9+eTPXNdXyrG2tLbodrvXr/8NqFhCTEUsGocxcXT27C88zyMiawtry6LIb9y4sb7+D5YmpiIWjalMHAVBo9U643kuAFtWpS2s7RtjNjY2O52UpYnJiEVjMhNHQdBYWnrc811yFEgBpbWFLYq8l21trSdJClQsISYgFo3JTBwFJ+5q/fhhVaulP3/Wmzvm1OoorTVm5r23et1vtre3kiRlaWICYtGYwMRRcOKu1umHvXr9i2dfri2cVDxLrut4VPar4uuv8NrlrJdtbq51Ol+zNDEOsWgcYOIIQBA0Wo+c8Wr19LnL9YWTbjCnGI5LpIAStof8y5vVLy/lebaxsdnppCxNHEAsGqNMHAFlEAStR57wXFdx/YvLv6nNHXMbvqpDKcKAtbCmsi8+X2S9PM82NjY7nZSliVHEorGPiSOgEQRotc6o7/jeZz9ZPto8NbPwA/cIlAsHhIESKDKUFy8UWdbv51nW29r6V6eTsjSxD7Fo7GPiKAgap08/6vs15Srlep+dffroj075xxvuESgHCoSBCuiXqJ671O+ZoiiyLN/e3gSQJClLE0PEojFk4igIGgCWlh7z/ZrjELmemql3Xn3dPzbnHoVySeG2CiiBIkN58YLNs6KweZ7dvHlzd7edJClQsYQYIBaNIRNHQdAAsLT0mOd5SilSSnn+5y9cYVn0jkDVSOF7FriVFOrqC7bIrbVZ1jPm1ief/DtJUqBiCTFALBpDJo6CoAHgoYdavl9XSjnKWZg/Cdf9+NzzfPKH6giUj++UfWRpJn/9I8ry0093re3futXr9bq7u1GSpEDFEmKAWDT2MXEUBI0HHzzt+/W7774HgOMApOA4Hz99oTZ3DEqRUve89y5Ki7LE0Ecf/TOKtpMkBSqWEEPEojHKxFEQzK+snMeA4+A2UgCB8L2yAiqMWl29liQpULGEGCIWjVEmjoKgAdRWVs5jwHEAOJhqdfVakqRAxRJiH2LROMDEEYAgmF9ZOY8BxwHgYJzV1WsAkiQFKpYQo4hFYxwT7wCEgRMn5jFOkqT4n4olxAHEojGZiXdwG2G8CkMsIcYhFo07YOIdHMAS4jDEovH/9C1dziJ/MKmp/QAAAABJRU5ErkJggg=="},{"name":"Dark animica stone spirit","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAFB0lEQVRIDbXB32tkZxkH8O/zvuc9M3myjKfaSSuEvtmrOa9dFcF6UygbGJS9iAgtjUhT9kZKRShdFFGKSq1eiAj+A3slEu+qNwuVgpB1ISHaBtHJocbmXFQ4nG0ZNztvZs4573ntDgxNmB/ZGz8fYm3w0GyaYIx1Bw+HWJvBcQ8Ty2sGs9g0AfDajVcw9savfwOAdQcXIdZmcNwjIkywjnGeTZPXbryC81SgfvLLX7HuYCFibQbHPSJiHWMOmybf++7LX3rySrPZVEpJKcuyTP79rx/89A3As44xH7E2g+MexpbXDGaxaXLjOy+124+GgQqCQAgqy2pUFD98/eeAZx1jPmJtANj0EID3fnnNYIpNk1df/vbKo231QEAkirIoivJHP/sF4FnHmI9YG0wMjntExDrGeTZNNr/x9S9c+ZwaEySKsvj+j18HPOsYCxFrMzjuLa8ZAIPjHhGxjjHFpsnm5othqJxzRTHc2Xk7y3LAs46xELE2AAbHPQDLa8amh6xjTLFpsrn5Qhg2nHOj0fD27bezLAc86xgLEWuDMZseAmAdYxabJpubL4RhwzlXFMXOzp+yLAc86xgLEWuDi9g0Aernn38xCELvK+dcv//RW2/dAjzrGAsRa4OL2DR59tlvBkEopXCudq4aDAa3bv0B8KxjLESsDS5i0+S5576llCIi5yrn6qoq7t69e/v2n1l3sBCxNljIpkkUtbrdDaUCAM75uq6cK621u7t7/X7OuoP5iLXBfDZNoqi1vn5NKUUkBVB7uLpyriqK4f7+nSzLAc86xhzE2mA+myZR1O52vyplcD+JQ3VJoVGjrtywXv3LcHj/4GA/y3LWHcxBrA3msGkSRa1ud0Opxmnv8w0VKdUkIQnSw1Xl4P7KH0ejYm9vp9+/x7qDWYi1wRSbJgCiqNXtbijVGPSuNFXUUMuBaJKQArJGXdfFqDy5v/JmUYx2d/f6/Zx1B1OItcF5Nk2AOoqibndDqUDKcPjPL4fqUkMuS9GQIgS8h69RVfXwpP37oiqKYrS7u9fv56w7OI9YG5xh0wRoRRG63Q0ppZJB/u4Tn1pebapHQtEUIpRCET5GrnYlBvfa25UryrIYjYb7+3/r93PWHZxBrA3OsGkSRa2rV78Whg35QPDhweVWc3VJtZRYEkJJEWLMo6rq4r+P/7YsR1VVjUbFwcEegCzLWXcwQawNJmyaRFELwPr6tTBsCEFEQSDV6PArDdUKxZIUjUA0PLxHXaMq6+G9ld85V1aVK4rRycnJ0VEvy3LAs44xRqwNJmyaRFELwPr6NaWUlJJIfswefpHVihIciFCKAGMO1Wnxkf3sm85VzrnRaGjt6Xvv/SPLcsCzjjFGrA0mbJpEUQvAM890w3BJSikEraw8ThD/uXO52XgkEEtSKAC+roZV/zNP/R3w779/5Fx5ejocDgdHR0mW5YBnHWOMWBucYdMkilpPP301DJdWV58AIAQAAdAHdy431SWCIIhPP/Wuhwc8Jt55569JcpBlOeBZx5gg1gbn2TSJovbW1nWMCYExARA+4TFle/tmluWAZx1jglgbnGfTJIpaQGNr6zrGhAAgsND29s0sywHPOsYZxNpgik0TAFHU3tq6jjEhAAjMsr19E0CW5YBnHeM8Ym0wi00PAcLYY4+1MUuW5fiEZx1jCrE2mM+mh3iAMJvHBOsYsxBrg4dg00NMYR3jIsTa4P/pf7GlMX9e9GC5AAAAAElFTkSuQmCC"},{"name":"Crystal triskelion fragment 1","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABb0lEQVRYR+2XsY7CMAyG3bUTb1DdBDzBLfdISCfBg9wh9ZFYEGKHAZ14AyZWkBPcOqnjliYF6SBbC7G//PZvQpYX0ws8cWVvgLcC/16B83EPeTEO+mxQF2Dy0bKE0/csCPEwAIAL5MWkocRrAOCxQ2VIogDWmi/edLwPpDJEA5gEq7UDcPr6rJpucADMTApwEIJ4CICF2AFAZpQgEIQwzzcrJi+BVHsCQYhBAbTaO59tN0YFdEFSBSgJndJ2Id1tsroxt5tgctzR2wUuQH2pwmnnKxA6fRIAI++t2ciLlRta5I8CIPv5M8AZCC3yRwNoM0CzHofs3QM8iDMDlqXa9f7PoQjA/a1dJihYNQnvTC6WgEanaa6/A8DvTwVNMP4AgvkCRsXHXSenoKoCWEe+rJ3saJWWZjdxgzYHeF2lpATjBpZvPaHknVxgQcxXvTjNf3TSlUtL3gmg2e32TZ9kEkwSG7adMqoEMcG77H26Alfq/QVQiZVN9AAAAABJRU5ErkJggg=="},{"name":"Crystal triskelion fragment 1","base64":"data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABaUlEQVRYR+2XMY7CQAxFf9pUe4OICvYINFwJxEHQSisutM0KiQNAQcENqGhBnuDBM3EMySQgAdMmGT//bxuT5cX3CU882Qfgo8DLK3Dcb5EXw9o+67ULKDgWP8B8VgvxMADghLwYVZR4EwDKu8aGThRwXosji07WgWZDMgAF+Pr7DwAOk7Evut4BKDIrIEEY4iEAJcQGQOaUYBCCcOfSip1boHnPIATRK4DlvXx2WK9KFeYzdKoAB/FZuii822RXGwigJjh90boLQoDrUkXTrqJAnwCURaiCKMIb8icpwO0XzwA5EJz/RvbJANYMsFpPQrauAXmJnAEusFH18c+hCiD721om+DL/fsPgqgV+dNLT3Q5Y/npohokHEKZToBg0ypwvtRXgjPhtV1CX0Rpr2UD2u2og8FULyjABiL71aKymAtUCc25F91T/0WkrlxW8cRuWqpSnTTANppM2vJVlkgUpl9/z7dMVOANA9/RBTQ+moQAAAABJRU5ErkJggg=="},{"name":"Crystal triskelion fragment 2","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABVklEQVRYR+2WPQ7CMAyFXcZO3KAjcAIWToSQehakLtyHBbEjGLkBEyvICY+YpDQOpYIhnfqjxl+e7ecUZTW70Q+vIgNkBbICf6nA9XwyzlBWk8EdIvABDj5eNybwpV4NDtFqRIBgAKIbldVUrUSqer0AOJhMkwHf7qx6i7lKvW6ATUN0OAYLYZccjAOhXnwAjXqdAKgDuZAMIvOCHaeq8HYYtdVBuEOLIGUPn7trqCcAT/LCANhUuGfUQSwNUQDZjlDABeOvAwHw0r4nQF4AoD1tUeJc8woUa+HogcSH8PONNpSdoZXf6KeZBe8gXCBXiCnB1QBhOpY03u5b3dFPT8xCVQpgEakE3l1qCwNDilW9D5QEACVMMT4G1osZ1UsiGqksGP8lA1iIo2k/eUmglCn6EYBLCYM89yLu9RO0F4CfT6sMH2T04/urALGKb/ueAbICP1fgDlOWClDHc4C1AAAAAElFTkSuQmCC"},{"name":"Crystal triskelion fragment 3","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABb0lEQVRYR+2UPY7CMBCFx22q3CAlUCOEhPYWIK3EGZA4CwJuwd5im73BQscNUtGymkkmOPb4LyCxhd0lcfy+eW88qqgmd3jjUhngWQdu1zMU1WhwiFERoIhzLVcAXyf6PAQkCEDiiwWUn+tglfV2kwziBUDxcnegQ/Hw8vunB1F/zLtn3sd7Yx0RAdjy7tDprBNiUYZpnvEmKwsGoUOxWABm1XiqLYZvFb1ngKIaw+3620KonnM+CK8Dsriiqgi0jQQhTBEupL6cAY57pxPOHmiqaaqkXNu8H1XbzqAL+uogqDnvYH4nH31zwKySHUEYMxbpcDNOKYqoa6hnbbsiV8ZOhCCiATgGzr8R8IvrEK79QQD8UWo47njJemli4f7kHrAaymjI2GHjG6FRDvTyFKZhaNi8DMCM43E943pBAklyQOqH2EZ0uZAMoEPoY9hn80sj+BcADPGs/cFRPNTWlP8G9UCKQGhvBsgOZAeyA39vIvhBxbL+2wAAAABJRU5ErkJggg=="}],"alchemist":[{"name":"Blank","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAM0lEQVRYR+3QMQ0AAAjAMHgxwY1/gSCDp1OwNKtn47E0QIAAAQIECBAgQIAAAQIECHwLHNXiKkGmss7lAAAAAElFTkSuQmCC"},{"name":"Onyx dust","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAACs0lEQVRIDbXBTWskVRSA4fcQamJO4ZCNExKbnNqEumcxwzAi/v+lC13mVhGRW0M+qLRgI9zbSie0pjFoSNp0C/08oubskqg5kFOsGwdyijyqG+dRTrFunO2JmucUARFRCzlFEeGRWgByinXjOcW6cbYkag7kFEVELeQURUQt8CinWDdehk4t5BTrxtmGqDmQUxQRtZBTZKVunJWcooioBSCnKCJqgY2JmgM5RRFRC0AZOmC5XNaNAzlFEVELQE5RRNQCGxM1B3KKIqIWeJRTFBG1kFMUEbUA5BRFRC2wMVFzIKcoImohp1g3DuQURUQtADnFuvGcYt14GTq1wMZEzXOKrNSNAzlFoG68DJ1aYCWnWDdehk4tsA1Rc6AMHStqAShDB6gF/qUMnVpgS6LmvKYMPStqLVsSNeclZejVWqAMfdueAbPZbBynai3bEDXnmTL0k6OTy/EaaNuzN3tvgHmZ/5R+hqVaYGOi5rykDH0zOblbcHz8rqqqxWLx+ebq8PCw7y/UWjYmas4zZejb9oy/3N/D3v3dH3fAHfv1ft9fwBIEUGt5jag5T5Wh//bjR1by/He4v+fBbDY7qA7mi/k4Ttv2LM9ml+NUreU/iZrzTBn6ZnIKd6x8Wb+tDr64vbkFLsdr4NP7D1e3N+M4haVaYD1Rc15Shh44PHw7m/3WTE6B+WJ+UFXzxeLrd8e3v/5yeXnNg6VaYD1Rc15Shv7T+w9VVQHp6vM4To+OvjqoqvliMY7TZnIKaL1/3l+otawnas4aZeiB7z59A3z/4w/8YwnStmd7cN5fwFItsIaoOeuVoQPhwZInpJmcAFrX5/2FWssaoua8pgydWuCpMvT8bakWWEPUnP+rDB2gFlhP1JxdEjVnl0TN2SVRc3ZJ1JxdEjVnl0TN2SVRc3ZJ1Jxd+hNoECBw+hxq6wAAAABJRU5ErkJggg=="},{"name":"Onyx bolt tips","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAENklEQVRIDaXBUYscxxWA0e/m8QqCX8TCerK3pczQ1S3W5P//jAR7pmI9dIlmoOgXE5gCpW6lMxpn8QxaOSv5HFEbeE5JcbO5p9Y5L2o930rUBuA07V91A09O017kT93m3mGej7CqBb6JqA2naQ+IiFoATtP+VTecpv2bN52711pzXtR6vomoDcBp2ouIWjhN+1fdUNKh3/718PP7N3/ZeK1zXmBVC3w9URuA07QXEbVwmvYiAtJv3x5+fi8im833tdacF7WelykpqvVciNoAnKa9iKiF07QXEZC+3x0OUUS6zfde65wXWNUC/09J8e7udc6LWg+I2gCcpr2IqIXTtBcRkLHf/XiIItJ15u611pwXtZ7fVVLcbO6pdc4LrGpB1AbgNO1FRC0Ap2n/w7vx7z/+FEIf4z+3nTm4+zwfYVULfFlJsdvcO9Rac17UelEbTtOei1fdAJQU1/U/P7wb//HTHoTfrGoBKCmq9XympLjtHvwMaq05L7CK2gCUdOBCLQAlRVi5pRaAkuLd3eucF7WeKyXFfvu2uTu4O7XOeYFV1AaeU9JBLXCrpLjZ3FPrnBdY1QIXJcWx37UzcHfcHeb5CKuoDbxMSbHrHnD3Wue8wKoWuCgpjv2unQF+AfN8hFXUBl6mpLjtHvwMaq05L2o9UFJ8HEM7A1pr7g7uTq1zXkRt4AVKiv32bXN3cPdaa84LrGqhpPg4BqD9Ctwdd4d5PorawJWSIqDWc6WkOPa7dgbujrvXOucFVrUAlBS5GPsd0M78k2k+itrAk5LiZnNPrXNe1HqelBTHftegtYZfwDwfYVULXJR04BPhxipqA09Kit3m3mGej7CqBaCk+DiG1hrQztwd3H2ej7CqBW6VdOCJWhC1gSclxW5z70Ctc17UeqCk+LfHd601oF18dMfda53zotbzu0Rt4KKkuO0eHHB3qLXmvKj1QEmRK32/o7WP7tP0AVa1wJeJ2sBFSXG7fYtfQK015wVWtQCUdOA3wv+saoEnJUW1nluiNgAlxb7f0Vpzd8Dda62Q86LW85mSDoBa4KKkCHz33Z9/+eVfaj1XRG0ASopjv2tngF9ArTXnBVa1wBeUFIHN3esKOS+wqgWuiNpQUnwcQzsDWmvuDrh7rRVyXtR6nlNS7LoH3B1qrTkvsKoFrojaUFJ8HAPQgNYa0FoD3N9PH2BVC9wqKQLb7sEBd4daa84LrGqBK6I2ACVFnreqBa6UFIGx37UzwC+AWue8wKoWuCJqAxclHfiMWuBKSfFxDA1oF4C7g7tT65wXWNUCV0Rt4MVKio9jANoF0NwdcJ/mI6xqgVuiNvA1SorA4xjar9wdcJ/mI6xqgVuiNvCVSjqAAGO/a2f+yTQfYVUL3BK1gW9S0gEEGPvdvz9+fD99gFUtcEvUBv6Akg4gfLKqBT4jagN/WEkHtcBz/gvW5vv68vEnywAAAABJRU5ErkJggg=="},{"name":"Hydrix bolt tips","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAFaUlEQVRIDaXBXYhc5RkH8P/Tuz5LL3v97EXDeU/xQrAtvWjTGDYRu5qG1JiNSVGS3LQWY0CrET8iCL3uvdgP+qWtUGiLFEIJISwD48IWoTOvYjhvzO7OnDlzZs6ZOe+cr+xbHFycIRu7ib8fsfjYjTX6g98d+CTMf/hcg8XDvSIWH0AWtBYWfezIghbRV66/s7QR2e//bBVwLAr3hFj8LGgBICIWBSALWguLfha0wn88vBlNPulOjrzYZPFwT4jFB5AFLSJiUVnQWlj0rWm794/hgXc/entpI8wffGYVcCwKd49YfABZ0CIiFpUFLSICyH3wGO57h4iab/7gRpj9+KU1Fg97Y41m8TBFLD6ALGgREYvKghYRAeQ+PI59bxNR6w8P3uzlh55tAI5F4f+xRv/tl98+erHJ4gEgFh9AFrSIiEVlQYuIAHLBCuSPRHTj3UMbUX6jOznx6hqLhy9kjf7Pbw904/zwhQbgWBSx+ACyoEVELApAFrSQncHCW/j4JH3jz+WVR6OkCAfF/U9dBRyLwp1Zo/WfDnbjfCMqTr62xuIRi58FLUwtLPoArNHObcOeoYVfA4TPORYFwBrN4uE21ujs8nIvKcI434yKoxebgCMWH4A1bUyxKADWaMBhHosCYI3+yxsPHH95jcXDDGu0Wz9WJ2WUFOGg6sb54QsNwBGLj91Y02ZRmGeNXv/N/o3eZPn5JuBYFKas0c6sYFQjLQdJ0RtW3Tjf//Qq4IjFx95Yo+P3HurG1VaUHzy/CjgWhSlrtNs4hVGJUWmTupcU4SD/zrlrgCMWH3tjjR5fXg4HRaef3+xNHn9ljcUDYI122VMY1xhXSKs6LaOkCAdVN84PX2gQi489sEa79WN1UvYGRScuNnqTR19oAo5FWaNddRbFLaQV4gJpOUiK3rDqxvn+p1eJxccMazQAFg8zrNHuxhNISyRlPynCuNjs50vnG4BjUQCs0ZhyndPIayRl1psEW5P7fnKFWHzssEa//+b+7mCy/HyTxcMOa7TbPIVRibQcD8twUGz1y+/99BrgWBSmrGnjU4Q5jlh87LBG//f3B8JheeDnq4BjUQCs0S4/i1GBtEJalUnZGxadfvGts1cBx6Iwz5o2drAoYvGxwxod/HWpNyy78eSRXzRZPADWaLd9Dvk28hq2RjiJO3arX2z288PPNlg8fCFi8TFlja6vPhInVZQU4aDc6tuTl9ZZPADWaMxw+jjGddSxX1/+F+BYFO6MWHxMWaNd40ejtOwnVS8pO/3JkReagGNRAKxp43OEzzgWhR3WaBYP84jFB2CNdh+ewLisR1U/KaK0CuNyK7anLq2zeLiNNW0ALApT1mgAr5/Z99pbH7F4mEEsPgBrtAtWMK4xKkejKkqq3jDv9osjLzYBx6JwB9ZoAJd/9d1OnJ9+fR1wLAoziMW3RrvkSWQ1xiXGdZVWcVpESRXGZWdgn7i0zuJhN9bo7t8f6idFlJSduHj8lTXAsSjMIBbfGu3qc8hr5NuY1MhvwVaY3Mpt/dWD/wQci8I8azSA7WtHBqMiTqooKbtxcfRiE3AsCjOIxQdgjcbuHIvCDGs0AHd9BVmJcT0aVXFaRUnZG5QPP9cAHIvCDGLxMWVNG7dhUZhhjXb2DLIatkRWY1RNxnU8KvvDqpfkS+cbgGNRmEEsPvbMGu3ysyhqpBWyCuO6GlfxqIqT4punrwCORWEesfi4G9ZoAC55EoMCw9KNy0FaxWm1b+XfgGNRmEcsPu6SNW2AALjwNG5maZQP0mrxscuAY1GYRyw+7ok1bYAAuI9PjK+nXzv0HuBYFOYRi48vwZo2QPiUY1G4DbH4+NKsabMo7OZ/V9lZCSHrevAAAAAASUVORK5CYII="},{"name":"Alchemist's key","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAC1klEQVRIDbXBQWvbWBSA0e9VskMuLaSbQrXwhWye3i4I9P//QlZhLvUirwRB8CyMxnq2GxkN0TRgzySD7ZBznGjgIznRwLulaOwR9bxwooH3SdG8L9hj1oh6Rk408A4pmvcFkGVMp/lkQtv2gFkj6gEnGjhXiuZ9AWy3T1++TCaTPMvyT59YLjeAWSPqnWjgXCma9wWw2z3N5wtGdX3dthvArIHBiQbOlaJ5XwBmDQz85rwvALMGBicaOEuK5n3BC7OGkfcFI7MGBicaOF2K5n3B27bb1f19C4MTDZwiRQO8L9gznfKPLMt3u369fprPFzCIlk40cLQUzfuCQ1nGdJoDu10P/PqFWQODaAk40cARUjTA+4IDT1k2ubtr+LdBtGTkRANvS9FEfYrmfcGe7XZ1cXGRZZO7uwYGDomWvHCigTekaN4XZo33BXu221WeX8znC54NoiVvc6KB16RoVTXrup49j4+rqyvy/GI+X8AAiJb8LycaeE2K5n3BnsfH1efPPDy0PBtES47gRAOHUjTA+4JDXbd6eGhhAERLjuNEA3tSNO8L9nTd6tu3q7Zdz+cLGERLTuFEAy9SNO8LXmPWwCBaciInGoAUDfC+4MVyufr+/QpYr3tGZo2o50RONKRo3hfsubzM1+verKnr692u77qekVkj6jmFEw0pWlXNuq5ntNs9ff16udvRdb1ZA9T1ddtuGJk1op6jOdEApGhVNeu6npFZU9fX0Ldtb9YAVTXLsnyx+Ov+fgGDaMlxnGhglKLV9axte0ZmTVXNsiz/8ePP5bIFbm5mt7c/YRAtOZoTDbxI0er6um03jMyam5vZ7e1PGHjmYBAtOYUTDexJ0er6um03jMwaGERLzuVEA4dStKqadV0PLJerx8dW1HMuJxr4jxStqmabTX939wCfYBAtOYsTDbwmReO3QbTkXE408IYU/wBES97BiQY+khMNfKS/AfQVWiwlujibAAAAAElFTkSuQmCC"},{"name":"Marrentill seed","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAADbklEQVRIDbXBzYscRRjA4V/VfBjeSOMtF+Hdg9Bdwl4CuQwhLLlILgFJMCD5Ew1CwENEclxYAiEQyG7BHqZgL4Ma255MTWZ7ukp3cEARM72GfR4j6rhKRtQtpsfX9xxXw4i6xfTYGCNa8RFi8IBoyT8ZUbeYHhtjRCv+rxj852V6V1PPLCBasmVE3WJ6bIzJOV/fc1xeDP7L28VgzGDIeaR5W5+9saIlG0bULabHxpicszFGtOIyYvD7d4vRiMGYLpFWLOd1PWM2taIlYETdYnrM1vU9R28x+Jv3isGQ0ZAOyKSO9wvOF7U/spBFKyPqgBhOcs7GGEC0op8Y/ORBgcFaUoJM19K2tCteP28gi1ZG1LGxmB4bY0QrLiMGf+dRgSUl0pqupW1JLa9+aiCLVkbUsRXDiWjFJcXg73xbpI60pms5etpwIYtWgBF1fLQYPDB5UBw+aSADohUbRtRxGTF40ZJ/ieEEDGTRir8xoo5+YvDAZzdSPbOAaEkPRtTRQwy+nKTx+LPBmOXv9aLmzFvRkl2MqKOHGPz+3UI+JXW0K5bzelFz5q1oyQcZUccuMfib94pr18DSJehYRZbz2h9ZyKIV/82IOnaJwU++LuwYMinRdbTvaVe8ft5AFq3YisEDoiVbRtTRQwz+4HGROlJL25HOefFDA1m0YiMGD9z4Is1OAQuIloARdfQTgwduf1OklsPvG8iiFRsx+HJSYBkPwbKc1/PfmJ1a0dKIOnqL4QQMF7JoxVYMfv+gGH0CQ1jzfkls6voX6jNrRB2XEYOHDIhWbMTgb35VMGQ0hkxKdCsWcxZ1ffbGGlFHPzF44MZemk0tIFqyEYO/db8YjbCGlCHRdcR3LOf16QtrRB09xODLSTEY8qfzZT3/mdnUipZADP72w8KOIJEyqaNraVe8fNZANqKOXWLw+3eLwRA7gESCd2/r0xcWsmgFxOAPHhepI3Wkjq7l6GkDWbQyoo5dYvC37hd2wAA6IBNr5r/W09dWtGQjBs/G5GFx+F0DWbQCjKhjlxj85GFhuZAyXUu74uWzBrJoxVYMJ1wwkEUrNoyoY5cY/J1HBRYS6zXtOe2KVz82kEUrPsiIOnqIwR88LtYtac3hk4YLWbRiFyPq6CcGz18yIFrRgxF19BbDCSBa0ZsRdVwlI+q4Sn8AHn+0L9g4xfQAAAAASUVORK5CYII="},{"name":"Kwuarm seed","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAADbklEQVRIDbXBzYscRRjA4V/VfBjeSOMtF+Hdg9Bdwl4CuQwhLLlILgFJMCD5Ew1CwENEclxYAiEQyG7BHqZgL4Ma255MTWZ7ukp3cEARM72GfR4j6rhKRtQtpsfX9xxXw4i6xfTYGCNa8RFi8IBoyT8ZUbeYHhtjRCv+rxj852V6V1PPLCBasmVE3WJ6bIzJOV/fc1xeDP7L28VgzGDIeaR5W5+9saIlG0bULabHxpicszFGtOIyYvD7d4vRiMGYLpFWLOd1PWM2taIlYETdYnrM1vU9R28x+Jv3isGQ0ZAOyKSO9wvOF7U/spBFKyPqgBhOcs7GGEC0op8Y/ORBgcFaUoJM19K2tCteP28gi1ZG1LGxmB4bY0QrLiMGf+dRgSUl0pqupW1JLa9+aiCLVkbUsRXDiWjFJcXg73xbpI60pms5etpwIYtWgBF1fLQYPDB5UBw+aSADohUbRtRxGTF40ZJ/ieEEDGTRir8xoo5+YvDAZzdSPbOAaEkPRtTRQwy+nKTx+LPBmOXv9aLmzFvRkl2MqKOHGPz+3UI+JXW0K5bzelFz5q1oyQcZUccuMfib94pr18DSJehYRZbz2h9ZyKIV/82IOnaJwU++LuwYMinRdbTvaVe8ft5AFq3YisEDoiVbRtTRQwz+4HGROlJL25HOefFDA1m0YiMGD9z4Is1OAQuIloARdfQTgwduf1OklsPvG8iiFRsx+HJSYBkPwbKc1/PfmJ1a0dKIOnqL4QQMF7JoxVYMfv+gGH0CQ1jzfkls6voX6jNrRB2XEYOHDIhWbMTgb35VMGQ0hkxKdCsWcxZ1ffbGGlFHPzF44MZemk0tIFqyEYO/db8YjbCGlCHRdcR3LOf16QtrRB09xODLSTEY8qfzZT3/mdnUipZADP72w8KOIJEyqaNraVe8fNZANqKOXWLw+3eLwRA7gESCd2/r0xcWsmgFxOAPHhepI3Wkjq7l6GkDWbQyoo5dYvC37hd2wAA6IBNr5r/W09dWtGQjBs/G5GFx+F0DWbQCjKhjlxj85GFhuZAyXUu74uWzBrJoxVYMJ1wwkEUrNoyoY5cY/J1HBRYS6zXtOe2KVz82kEUrPsiIOnqIwR88LtYtac3hk4YLWbRiFyPq6CcGz18yIFrRgxF19BbDCSBa0ZsRdVwlI+q4Sn8AHn+0L9g4xfQAAAAASUVORK5CYII="},{"name":"Cadantine seed","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAADbklEQVRIDbXBzYscRRjA4V/VfBjeSOMtF+Hdg9Bdwl4CuQwhLLlILgFJMCD5Ew1CwENEclxYAiEQyG7BHqZgL4Ma255MTWZ7ukp3cEARM72GfR4j6rhKRtQtpsfX9xxXw4i6xfTYGCNa8RFi8IBoyT8ZUbeYHhtjRCv+rxj852V6V1PPLCBasmVE3WJ6bIzJOV/fc1xeDP7L28VgzGDIeaR5W5+9saIlG0bULabHxpicszFGtOIyYvD7d4vRiMGYLpFWLOd1PWM2taIlYETdYnrM1vU9R28x+Jv3isGQ0ZAOyKSO9wvOF7U/spBFKyPqgBhOcs7GGEC0op8Y/ORBgcFaUoJM19K2tCteP28gi1ZG1LGxmB4bY0QrLiMGf+dRgSUl0pqupW1JLa9+aiCLVkbUsRXDiWjFJcXg73xbpI60pms5etpwIYtWgBF1fLQYPDB5UBw+aSADohUbRtRxGTF40ZJ/ieEEDGTRir8xoo5+YvDAZzdSPbOAaEkPRtTRQwy+nKTx+LPBmOXv9aLmzFvRkl2MqKOHGPz+3UI+JXW0K5bzelFz5q1oyQcZUccuMfib94pr18DSJehYRZbz2h9ZyKIV/82IOnaJwU++LuwYMinRdbTvaVe8ft5AFq3YisEDoiVbRtTRQwz+4HGROlJL25HOefFDA1m0YiMGD9z4Is1OAQuIloARdfQTgwduf1OklsPvG8iiFRsx+HJSYBkPwbKc1/PfmJ1a0dKIOnqL4QQMF7JoxVYMfv+gGH0CQ1jzfkls6voX6jNrRB2XEYOHDIhWbMTgb35VMGQ0hkxKdCsWcxZ1ffbGGlFHPzF44MZemk0tIFqyEYO/db8YjbCGlCHRdcR3LOf16QtrRB09xODLSTEY8qfzZT3/mdnUipZADP72w8KOIJEyqaNraVe8fNZANqKOXWLw+3eLwRA7gESCd2/r0xcWsmgFxOAPHhepI3Wkjq7l6GkDWbQyoo5dYvC37hd2wAA6IBNr5r/W09dWtGQjBs/G5GFx+F0DWbQCjKhjlxj85GFhuZAyXUu74uWzBrJoxVYMJ1wwkEUrNoyoY5cY/J1HBRYS6zXtOe2KVz82kEUrPsiIOnqIwR88LtYtac3hk4YLWbRiFyPq6CcGz18yIFrRgxF19BbDCSBa0ZsRdVwlI+q4Sn8AHn+0L9g4xfQAAAAASUVORK5CYII="},{"name":"Grimy harralander","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAE50lEQVRIDbXB/2udVx3A8ff5PPc2zdE2F8fl8YfNA4I+z1O/pGaLt0IWpISGMhoo/iCD/TChdVgEHfsvnBuI6GAMhFEQxZHSUkaGjBCKeI0tS+vSHhX0lFJ4uKB3KTm5X88xCQs0tLHZD3m9lDYFn5F3VpuM/VHaFHwW3tnpl8LSRdEmYx+UNgX75p09+XIIgcV3BaI2OU+itCnYm3dWm4wd3tmTPwjyt3RQlIvvijYZT6K0KdiDd3bqxXDtt6JNxjbv7My5ICvp4Ovlh78RiNrk3lltMnbzzmqTAUqbgj14Z7/7ctj4hOa8ANpk3tmZ80E+SsN4+cd3BCKo2UZ9odnSJmObdxaYfiksXRRtMqVNwR68szPnw6DD2n9I/llbtmvAzLmQ3ErjePnB2wJok3lnIWqTA97ZybkwMooe44O3BaLSpuAR3lltMu/s7IUw7NNZI6zWhl9tV/9ek/H26D9SJsqFt2T2Qlj4tWiTsc07O3E6VDVjd9PqifLqLwWi0qZgN+/sZHZ02a5pk3lnZy+EfofBjRqbjrXlTjpShYkyQucBSxcFoja5dxaYnAufu1sbnWqPjHLpdYGotCnYzTs726gLvN9saZN5Z0836v1vloMumyShuprG8fKTFs15mfp+uPY7ASZeCDeuSuN74Qv30urz5eWfC0RtcqVNwSO8s2yJoE436v2vlQhhyCZRJB+nkhCOl0QkofuntPeVstvlv3f5cpIeni4vvyFsidrkSpsC8M7yEG0y7yxEUMBsox7HyxDYJCupEiRBoDpVXvqZnJyo97Ky32P0X+kRzWC8BAIs/Eq0yZQ2hXf21Cuh5+l16fcY3q7dsGuNs6E5LzPnQ1JBKkjCoEccoFZSQEBOlP0NOn+pyfE2N9MKjBxGTpTAlTeFLVGbXGlTAN7Z0z8OIdJdZ+MB4Xat/0wb4aP3pXHs6DNf/HwibBy/N+wSrqcMCRMlEAO9Zk2Otysfp4kwMgKN8tLrwqeiNrnSpmCbd/bMqyFEwoDuOp11hkMetDhSh9u15ura2en68NtlHEIzDZNld50QkFtpApUqicCJMg4ZDAhDuJ4uNFvaZEqbgh3e2bPT9QgE+s+W3XV6nq5n5N+1bg+K9thTJFWkwmBAdx1RVFdTgUqVirApwqWlFp+K2uRKm4KHeGeBU6+E5BCVCiHQ36DXIdyshSH68EgnL8eeYjCkvwGK6s20kqCEaoX+c2UMXHlTIALa5IDSpmA37+6AAs68GpQQI4Mu/R6DLpXbqe90j0y3R1fSjW+Uh26lBJSQCMPJMllO55daELXJ2aG0KXiEd3butYBCFMny00DvW/cGffpdwvVUni31GPHPaSKEgAiJVN9bvM+WqE3OQ5Q2BY/jnWXHmZ8GFCiIdD2D5XT0+fLwShoCEYbPlZW/piLV9xbvQ9Qm5yFKm4I9eHcH1KkfBpUggggkiIJmmlRQ3ymry0///sP758586Z0rd9kStcnZTWlT8H95Z9kxN1W/fK3Ftrmp+qFK9Q+L99kSAW1yHqG0KXgS7+zksaMCzdU1iGxRsz8KC28JMPdauPyGaJPxOEqbgn3wzp6drs8vtSCCeuEn4eovBCJbFERtch5HaVOwP95ZiNrkgHcWojY5T6K0KThISpuCg6S0KThISpuCg6S0KThISpuCg6S0KThI/wO+EDCMtl2h8QAAAABJRU5ErkJggg=="},{"name":"Grimy toadflax","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAEVUlEQVRIDbXBX0teRx7A8e/MeYzJL83Tk6ZPZy9sJxeWc47Qm0IQliASgg9eWFYKfQV9WX0Du2yINBRRFhEpBQnsjSAd8CKzhMBUGk+fpNNEPHN6HvOHSOLGXvj5KLEVf1H0TmzB2SixFX9F9I7pxJ4WW3AGSmzFmUXvmE509jS0YkveR4mtOF30TmzBK9E7inS7b/5zENjTYgveR4mtOEX0junEnhZbcCx6R5EW+mZ9FHAaWrFl9E5swUnRO7EFoMRWnCJ6x3TiCB5oQGwRvaNIC32zPgo4DS2o4exgbXtfbMGx6B2d6cSeFlsosRWniN5RJBp4xo3L+X03olOkYW7W6oDTgNgieget2BKI3nE90ZkEp6FVYiveEr0TW0TvKBKd5/z9Sv7Tk/rmlfzHP+rhNbNWB5ymSDgttuBY9I6pRI+FgVn/PbCroVViK06K3t0o+vfdSGwRvaNIwNylHNh6Ws/3zeQEa3Wg08CehlZsGb2jM5XmP843D2sy2NHQKrEVJ0XvhrMDDavb+2KL6N3i7GC1DjS8MLxm1urAc3iguZ54oOlMJR5qrqdFY1ZjYEdDK7ZUYiveEr1jrAW1ODtYrQOdhrGMYW50xuqvgU7GrYtm43GgU7PwuVl/FtjRjLViSyW2AqJ3vEFsEb2DFhQwnB2s1YFjC32jNDpDww9PAjv61peDjVHgiPmPzBXh3uPAC7tabKHEVtE7ikQDR3S+nMz/60ZcTzzQFIlOxlhDZ5gbQMPqk0DD3KV862k93zc9mLzID3Uggx3NWCu2VGIrIHrHTKJzCEfckPz+qKbzUM/O9D/92weZ5p/hIQ2LuaFhtQ4cm7+Ubz6tF66aTDM5ycpBYEfzUiu2VGIrjkXvmEm8cAhHjP0Bl5iVfHt3tDw3uHsQaFjKzb060NC53TcZ9CbINN//FmgYaxjmZm17X2yhxFa8Er1bnhu0QGLlcaCBBo6Yy/Pnh2zHmknIeOmQzvCa0dCboKfptLCytc9LrdhSia14Q/SOTpHIeKmBhrkP8tQgFyfXDwIXGGvoLOaml6E0Ez3u/Bro7GhoAbEloMRWnBT9z6DozCQyaBhroOH2VROfPf+pqf/xkVnZD0sDQ0JpMs3dg7B81dzd2odWbMkrSmzFW6J3fJE49vW1KeDOLw/pNNy6bDZ+D1xg6UOTaVJCazI9cWfzEWOt2JI3KLEV7xK947WZxGsNty6bjWfh609MSrSwchCWrxqtJ+5sPoJWbMkblNiKU0T/MyiKRCfjtaXcZD1WDsI3g6l/bTz6dumz7+79j7FWbMlJSmzF/xW945Wvbg6+/3GfY1/dHFzoTfx78xFjLSC25C1KbMX7RO9uzPQ1bO+OoGVMUSScpvNFYkeLLXgXJbbiDKJ3y3ODu1v70IJiJrGroWVMQSu25F2U2Iqzid5BK7YEonfQii15HyW24jwpsRXnSYmtOE9KbMV5UmIrzpMSW3GelNiK8/QneaPJfdVFa80AAAAASUVORK5CYII="},{"name":"Grimy irit","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAFPklEQVRIDbXB/0ud1x0H8Pc5z3Pv1U++VLhes0uJHwi45zl1dcbMumSZDRISJDQs9Kf+0B861oy2DLbS/2GUtbDBVtgXRqGDwljIqISQUEKQrK2x68xtTT1zOI5sytQLd1qP9z73Oc9ZrlSIJC72B18vQazwFVmjiSPsjiBW+Cqs0Sef77n1zixxhF0QxAq7Zo0+9UJP5jH+9izgiWM8iiBW2Jk1mjjCFmv0qe/3hJ/Wkt6O8bdniSM8iiBW2IE1+sRzRz54d444wiZr9MiLcThVTZ7suPn7WcATx9Zo4gjbWaOJIwCCWGEH1uhTL/Ssr7rJS3MAiCNr9MjFOPxbNe0v3vjtDOABcXaodG1imTjCJms0gJPP99x6Z5Y4EsQKO7BGj1yM07pbrTZy/6hN6lUAIy/GuUrV9Rff//UMAOLIGg144hiANXrge91t7WHbgfyN38wAXhArPMAaTRxZo8+83Jumrr6W4LMVF3Xm9Ar6D+37e80fK15/a+bMK73XfzVNHGGTNbp/tLtA4WPza+JE17VfTANeECtsZ40ejA5O6lXiyBp95pXepOGyjxcAZN84FN6tFXJwx4rwqK+5W3+YBTxxbI0GMHC+++B8rfDdw3kKxl6vAF4QK2xnjT47VJLA1Yll4sgaPTpUanyzmNYdJKREYbrm+ov/XbKTl+dPPHfkg3fnAAw80/3J2Pzgs0c6/7UWDpfHflYBPHEsiBUeYI1GiwfE6FCp8WQRAplzuEcGhU+rMoDr7wKcCILmX5bq0YHmRrr8742vA7mny1feqKDFE8eCWAGwRuM+xJE1GvCAAHB2qNTsLyLDPeFUVUjIABIInn78vZ9OjQyU6tEB10T73NoBQtLf5dFy/ZfTxJEgVtbo0y/FybpLG67ZSN3ntU/06uCzRyYvzY1cjMMwEDlICZcgS10wVQUggezbXc0Nl95ewNFD8k4tBAptwPEygCtvVtDiiWNBrABYo8/+qNdnqK8njTWXfb7S5P1AOHV1fuiJg4e/tj+QsEc7k8TJySU4NI8VJYLMu/TDBRw9lP+sFkgUCnDHy2OvV/AlTxwLYoVN1ujRV/vgXZaisZ5sfOGQobZU7+hqw92ViburF4ZL6VA5dQg/Wkyf6mqsu8wjvFMNgDCHQMIfL6cOmXO+CfHXpWsTy8SRIFbYYo2+MFzyADJsfKurue6SDddYb7T/s9ZIkKnOxzrzMhcEIVyKZD2BQGG6JoEwh1DiHg/8eXwZX/LEsSBWuI81GsDpl+IgH4RhkKbO1V3ScJj6T+ZAbYV63LGvsz3LXNM6CBTuVMMAQiIXIhksZxmuvFkBPADiGIAgVtjOmhlAADj3ah8k4NFsuDRxaeLy0zVbb+wfPkx3lr7oK7ZXqsggJAKJ5Kly/vbi5fFlwBPH2CKIFR5gjT73Wp8UgED+9gqA+kBnmrhm4vBxFceK+zry+HAxkMgySIlA5i7dXECLJ45xH0Gs8DDWaGwZ/UkfBKRA5tHcSLKJamG4i6aWsgweaA6W85OLUuYu3VwAPHGM+whihR1YMwOI0z+MZQDIQASQElIE8qPFIET2ncfbJpb+eGPhB890/25sHi2eOMZ2gljh/7JGY8v5k6X3bi1j0/mTpXyY+9PNBbR4AMQxHiCIFR7FGj34xEEJTNxdBTxaxOmX4/ffmgFw7rW+K29UiCM8jCBW2AVr9IXh0uXxZcADYvTHvVd/Pg14tAjAE8d4GEGssDvWaMATxwCs0YAnjvEoglhhLwlihb0kiBX2kiBW2EuCWGEvCWKFvSSIFfbS/wDBL1mMlRJpkgAAAABJRU5ErkJggg=="},{"name":"Grimy cadantine","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAEnUlEQVRIDbXBb0tcVx7A8e85M+M1PzPjn3iS7ZL2POu9NxAoBRkQGUqQiISG+B72ZfUVlIpLSigGCSIhMAglUAg9D09hXZqbqDNTj7nz5951JEIkcWMf+PkosSl/U/BObMzlKLEpf0fwrnnPtJ9lYmMuQYlNubTg3eKyGUF7K4NSbMLnKLEpFwveiY05E7xbvG/kgN407a1MbMznKLEpFwjeLbQauztdsTGngndL940c8NcsL55mUIpNgndiY84L3omNASU25QLBu8VlE0L+8kUXEBsH75ZWjOwT5ni+mUEJaqVpNtuZ2JhTwTug+Z1pb2diYyU25QLBu6UVMxgQevlkl13XBZbum6kOx3Ps/JIBYuPgHZRiEyB4d7fZmIyIrkXPNzMoldiUjwTvxMbBu9YDUwzJj/PaAe+mkQ4DE80ccTzPzpOs9cDsPMnExpwK3t1ZaEzUuDmIhl/w7HEGpRKbcl7wbiFu7Lqu2Dh413pghgOqr3PgeIapbhTVOJ7jRH5MezuDUmwSvAPuNhs3cvgympioPV3fg1KJTTkveLfSNBp+aWdi4+DdatP0ZhgMQFOBeo/jObqd/OWL7kKrsbvTBe4uNH7b7X6z2PhiFI1u83Q9g1JsosSmfCR4x1gJarVpetOcKHiv3kFXOJrlhNbo/9C7ng9yDt8efj17q7jN1kbGWCk2UWJTIHjHB8TGwTsoQQErTXM0AyUoZB+l0RU0DP9Z2/xp7963pnc9HxU0QlQXerOMFWw/ycTGSmwavGutmjxnMMyLHH3Ir677zWLj5Yvu0orRVbRGVxgOKIZMHXJCQ36Lfo7+Mx/ORxP7VCGaJL8Jiq2NjLFSbKLEpkDw7rvvDQX9nBDy2iFHk5x49Wu3eafx5T+uVzQH04PhgOgNjDiaZ6xA/zfvz0fXO1Q0UUQwtafre7xXik2U2JRTwbvlR6aAYkQ/513Ige4+jTlq+7Rfddda5ugGw5Kp1xzN088pSuSAClRrVDTvblGMGI4oCq69YbOdiY2V2JQzwbu1limBgu4c/Zw8zwd9GoG8Tz5DYzrSVbSiGNHPQVPvoKFao6o5UcK/dzLeK8UmSmzKB4J3QGvV6CrVCkXBcEA+IHqTFyNkMurUmWpQjBj2OVE/pFpBaWpVerMUsLWRQQmITQAlNuW84H8HBSw/MigoGY4Y9hmMqHcI7/KJr6KZDvt1pntQoDQVTe8G9bds7GRQik04o8SmfCR4t7xmNKBr9bec6MwMhiOGfSYy+gYRooyKpijQmoqurW/vMVaKTfiAEpvyKcE7ztx7ZDTv9XOqf8JtZrsUBSX8dYP6W7SurW/vQSk24QNKbMoFgv8dVGvVoNEarUCj4dprKlWOb9am9/nx2d6/vv/qh5//YKwUm3CeEpvyfwXvOPNwyTx+nnHq4ZKZqNZ+2t5jrATEJnxEiU35nODdwp2GhvarLpSMqdYDs/MkA5bXzNZGJjbmU5TYlEsI3q21zMZOBiWoew/Ns8cZlIwpKMUmfIoSm3I5wTsoxSZA8A5KsQmfo8SmXCUlNuUqKbEpV0mJTblKSmzKVVJiU66SEptylf4Hh14KjJERZSYAAAAASUVORK5CYII="},{"name":"Cave nightshade","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAE30lEQVRIDa3BWWgdVRgH8P/ZZu79Emuamlat8NWi3jmWXoKhuCAlhlAQsSg+CKEtKlq0Ku61dQEfhOKGSl1A33zwQRBEH4pSRIIEQSpSqGQQxYPSjWq0MSe5d2bOMV4sJsRoU/v7CWILwLscAHEDZ5sgtt7lay7vS3tMPnYYAHEDZ48gtgC8yzfd3q8SVUxX+9/5GgBxA2eDILYAvMuHtjZNzSSJRMTPhyfHPhgHQNzA/yOILQDv8sGRZlKTpmZMogCcPO6P/nDim7HDxA38D4LYosO7fPi2fpMqkxiTSiHkyRO/Txyd+nLft8QNnClBbNHhXT68tWlqRqdSJ0ZpGUP47bg/8dPJrz/9nriBMyKILTq8y4e2NE0idc2oWVrWuvTUb+1fj02OvncIiMQZlk4QW5ziXT68rV9pSK10IutdqU71xNHJfW8dACJxhqUTxBZzeJcPbWlKLU2qapQqIycnpj9++wAQiTMsnSC2mM+7HMDQ1qZJjTayNdXa/85BIBJnWDpBbLGAd+OAADA40gxlNfreISASZ1g6QWzxT7zLMU8kzrB0gthiAe/yzfdd1WoVranis3cPbrxrYPTtA8QNLJ0gtljAu/zmh66BQKxCCChaBVZ07dszStzAfN7lxA0sThBbzOddfu0t2aqLzxMCMYSiFVozheyt73v+cyASZzjFu3zPfc/vfm0ncQOAdzk6iBs4RRBbzOFdftHlfWvXrzx/zXIAVRmKMhTTRXVO+slLY5jv2R17lNJa6cdeeQjACw++XFZlVZVPvbGbuIEOQWwxh3f5FZvWruLly/q6qjJUZaiq8OGrXww/cNX+V7/Y8szgz0cmj/0wESpYdfX6S5pKay21kgoCVajKalbxxGuPA5E4AyCILebwLh8caZ7Tk6Ljoze+RMfQvRt6u1KT6hCC+WoN1bqoVl+14gKttZgFQAgBEWJVltWuvY8CkTgDIIgt5vMux98iIK688dLzLurp7q3HgBXfrq8npLVZ3bd6uj0tpAhVEEJKKf4EBMSdrzwMROIMgCC2WMC7cfxNbLx1Xe+F567+ccAYo5Ux2mitl3Wf2y5aRidl2W6XJQCtpFJGSdVd697x3HbiBgBBbPGvvMs33rpu22U7D313UKvEaK2VVkp31aldtLUxRdFutVtSSGOM1gZAqKq+npV3PnsbcUMQWyzOuxzAlZszXrfysmPXRUArrbWSQgKQUgKYabdm2tOpSWtJTWtThSqEKoTq6TefBKIgtliEd3n/8NreC7q1kstWdg9MbW4Xba21kjpiVgTQLloz7ZmZ1jTVurqpWwi1a+8j+EskzgSxxeK8ywHccM8Gk5pBNeJnppQ0Ugp0RCDRST2tH584oqSWUu3a+ygQ0UGcARDEFv/Ku3FA3LBjw+bl9/zuJ6WQAGKMiUnSJJVCRcyKx3458uTru4BInGEOQWzxX7zLN93Rv+3i3ZP+ZFEUWukYAcSIjhgjcP8LdwOROMN8gtjiv3iXD440V63pUVreVH8gIMYQqlAWZVmURVkWO57bDkTiDAsIYovT4F1+/fYBnUhtjDJSaSklIGQIoWyV7784BkTiDAsIYovT412Ojo3bB0bfOnDjvRtUYpTE+y+NAZE4wz8RxBanzbtx/EkAERD4SyTOsAhBbHGmvBsHQJxhcX8At6DnHzqQQssAAAAASUVORK5CYII="},{"name":"Poison ivy berries","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAADV0lEQVRIDbXBT2gcVRwH8O/b1MsPnFtYsAu/oIeZdyjkpsSj3i20IJZaFeqhiFXMcauosFQxeBBP6kmLoqR0tQi2QnvqSk+ugjWP/jGvJoVJ0+7um5k383YSRrMkkLK7ZHLYz0cQS0ySIJaYJEEsMUmCWKI0qxUGiH2UI4glSrBaAZirz2Kg1WgT+yhBEEvsxWo1V5/FLpsbuP5xGzuIfYwhiCVKsFrN1Wex466+gz4O8gwqlakDaDXaxD5GEcQS5VitsKN23MszzDz15NQUIPC/VqNN7GOIIJYozeolbBG1V708QnjezNVnsaPVaBP7eJQgltgnq1XtZS+PEV4wGJirz2Kg1WgT+9hFEEvsh9WqdnI6X3cAwqYBCmwR2FYQB9hFEEuUZrWaeWN6Y92tfG+qh72waYCCOABg9RIA4gCPEsQSY1itABD7GLBazZyaTlcdCoQXTfWwFzYNUBAHGE8QS4xitSpufoRsQxw6g4GZU9PpTYfHEV4wAKpHvPC8AQriAOMJYokhVqv+7x/EiYutS7LcZvmRq4vpbRdeNtWjXrhoANRe8la+MwCIfYwniCWGWK3++eUdkzgTu8hmUeyitH/yvR8BVI964aIp/mq4LLdZnmb9g899QuxjDEEsMcRqde2b103sulHai13XpI8dqMwvXKod9/Iebp95O7IuSlxs+2nWf/bEV0BBHGAUQSwxxGr15fsvbGxudkz2oGPDTnzu4p8Aaie8+C6uz78WJc7EmUn6Jsm6kTt99mdiH6MIYolRrFZvHntm7UG0fK8TpfmNW/cB1I55K9+aX794JUnzbpz1jOtEyVSl8u7nV4CCOMAQQSwxhtUKu2z+8aFN8yTLbdr/6erfD3vpeje5dz9qXlkCCuIAowhiifGsXsIW0blWj6wziYuTvk1dnOafnftteXX91koXqAAFcYBRBLHEXqxWN5qnTeJMnPWSzMRZ12TzC5ewrSAOMIYgltiL1eqHhRcrFdGN0o7JOr006298+nULKAAQBxhPEEuUYLU6+9bz3ShbexivrpnLrTtAQRxgL4JYohyr1dOHnlj+dyXsAqgABXGAvQhiidKsVthWEAcoQRBL7IfVSwCIA5QjiCUmSRBLTJIglpgkQSwxSYJYYpL+A8SnsHCC5qyMAAAAAElFTkSuQmCC"},{"name":"Mud rune","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAHbklEQVRIDbXBb4ilVR0H8O8553fOc855/ty/c+/uzu6eSQfnPi8WdrVFCIkw21hMQ1x3RzetbLE0RQnNlISSUAgE/xGRkZggJr3ufUQmRUJIzd7Qdh7dVcfGWqh5Zu69z3NOd64sKLr6qs+HWZfjk5TFEOdh3RI+FrMuB7CxuhIv5PiQshgCePYnT3DOhRCcczHFtwnBpw4fOw7AuiWcB7Mu31hdAcAYs26Ac8piCODnjz7CZjhnJARj/D2MMc4ZCSFnDh1Ztm4JH4VZlwPYWF1hjFk3AFAWQwCPPfwjRcRmfPB1VU9xLgRnXExxwcnoSEWRklJJ+cWj1wOwbgkfxKzLAWysrjDGrBuUxfDhB+5XUpKUDAjBex988N6H8Xg8Go1OvfyrhQNHlZJSqthYa43RWkeRjiKl1BXXHrVuCe/DrMsBbKyuMMYA9sN771ZTUgIIIQAIAEI49adnJhWqgKqqao8A7N13TZJYa6zV2hgdaW2NMVofOrJs3RLOYdblADZWVxhj99x+WxrHKopIbONCMCAACOEfLz1d1dXmBJNqCh4QHBdectTOmCjSUaS1tkZbYy6/5jrrljDDrMsBbKyuMMa+e8e30yQmkkIIEjOcC8Ffe/EpH+A93ji9Pp5gXKPRTYhDcFx06XGtjY4iE22zU0YfPnYcCNYNADDr8o3VFcx87647EmtJEBeChCBJUtBU8dLPvMeZN9fKLYw9JjXqGt1eQoQLDiyTlEZrHako0tbo2MbG6ENHlq1bAsCsywGUxUnMPHjvPSqKpCQiqYQgSSRo6tXfPV4Ua+UWxh6TGlWN3o7kUweOEpGUkiRJIiWV1jqxU+ZLN9wEBOsGzLq8LIbXXnW402o3s0aaxqPRWAgRx7HVWiqpSE6devHJ4tS7/xmNxhNUNSqg308WLr6eiIQQNCW2RUoZo2NrrTGHjx23bolZl5fF8OrDX+i2Oq1mI41jQWJra1RubZpIZ1lmjbHG6Ch67fePnRyubU1QA4120l48TCRJCiUk44yE0MY0sjSSyhprjL7q+E1AYNblZTG88orLO512u9lM48TGdjIeb45Gm5ubxSu/ufDA1Z12e+0vzwfgn2vrownKCVpLn4+kklJ6X0mpjDFW6yzLGlkqhTRWW22+fOPXgMCsy8tieOhzn+12Ou1WI0tSay0RvfrSsx4IHu+un213k3EF4mgl+vTp9Xc3MBawKhIcUySwsO/KRpa2ms1GlgpBOoqsMdd89WYgMOvyshheftln5rrddquZxkkc2yxNT//5mXfeXAcQsM17BMADAhjXqDwmNSY1xjXiLFJS5pceaTWbjTQRgpSSVptrv34CCMy6vCyGl116sN/rtZvNLE06rda//vaCEHjnzfWAbR7wNbwH55ACowmqGhOPqsa4xqRGt59c9Onrmo1GlqZCCBLCGHP0G7cAgVmXl8Xw4MX75/v9ZjPrd3u9Xnf9lecEw9tnznqMgkcN+BoTjz27u6kRq6troxqVR11j4jGp0ekkiweXsyxL4lhs41rr5RPfAgKzLi+L4f59g16n12o2G1m6e+fOfq/3xh+fWjtzNmBUe9RAVaPd6+aXnXj75afX3zq7WY2qGhOPqkaj2wweFxw8lqWpjjQRCcGVVDd88zYgMOvyshj2+3MX7t3babUaWdrr9eZ37Pj3X59jwFtnztZ+VNVo97t7D95otbbWvv6HJ0+/fnZcjSY1Wr1u5as9B44jhDRJibgkSTNfufV2IDDr8rIYAn5pcXHnjl6r0Wpm2d7d83vm50+9+NMA1L6ev+TmcnNTEsXWRkqBgQT9/bePVzUmdV3V6O9fZmBGa8G5nCIpFd146x1AYNblAMpiCPj9+/b1Op1mM9vV39HrdptZFhBCwH/LcjIZJ3EiiRgDwLjgUhCASV2Nx5Ot0YgxRkIIIkVCSnnirruBYN2AWZcDKIsh4Pv9/sL8fLfbzeI4SeK5TqfRaIQQNjc3lZQkJWYYwDiTgnwIPnjvw3uEECSEJFJK3fKde4Bg3YBZl2OmLIaAX1xc2NXrN5JGEscmNlbbViOr6pqEYJhiYJhiAOfchxC8Z5wLzklKzrkkIinvvO/7QLBuAIBZl2OmLIaAB7C0uDjX6TQajSS2sbHGaikIMwwMUxxTnPFtggvGaUoQSZqKlLrz/geAYN0AALMuxzllMQQ8gMWFhd7cXDqVxImxXAhwcLyHM8YkCS5IcCYEF4IkSUmCJJGU9z34EBCsG2CGWZfjnLIYAh4zu/v9nTt3NppZGqeccwAMAGNKCiJJgojEFBdcCUlSKklSyh/8+BEgWDfAOcy6HO9TFkNs8wCazeaeXbs6zSY4AK6IIqVITgkiqQRxwSVJqZSOlJLyoUefAIJ1A7wPsy7HB5XFSYBhmwewuLCgoig2JooiFUlJKpJSKiKSUpAxeuqJp36BbcG6AT6IWZfjo5TFSYDt7s+RlDaOtVJaayWlUkoSSSkEqdiYX77wa2wLAKwb4EOYdTnOryyG+AQBgHUDnAezLsfHKouTOD/rBvhYzLoc/0//A4GKYqZG8fpWAAAAAElFTkSuQmCC"},{"name":"Impious ashes","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAACh0lEQVRIDbXBTYsUVxQG4Pfc6eqWQ5DxF5xl1cWlBFyIiDB/QXCjiAu/cKUQRHBWkoWgIRAG8QMXLeKi/0EIIi4EySYgTCEId2NWCTNOvPRU3XuO0wNDbMbS3tTzEItHn4jFo0/E4tEnYvHoE7F49IlYPPpELB59IhaPPhGLx8JiqDGPpcQ3EYvHYmKob9/68dDyiAhNo02rH/7euvfbW5YS3YjFYwEx1Gv3jo1GgyWHrMhJm1abRqdNe2P1DUuJDsTisYAY6qcPTxZDZ4qcNStS0nOXXmAflhJfIBaPxcRQY9dkvJLVTp35HTCAVn86srw8cg7/fWrfvd94Mn7HUmIPsXh0i6FGJ8MMPfj1eFG4lDROU9Po9ZuvAWOpsItYPL4mhhrA1QuHlw8WPxw8MCqcGabb7dZWu/Fx+s+/zfPJe5YyhnoyXknJ2qTb2+n8lZeAsVTYQywe+8RQr944Mhq64XCpKNxgyQHQHRlt1qbJmx/bjc3p/cfrLGUMNf5nLBW+QCwe+8RQ3/356LAYDAYgckQwg84gJU1ZU0Lb5s2t7Tu//MVSxrCOXSwV5hGLx7wY6rW7x4rCgeDIkYMZVBWGrFDVlDQltElzym3SW7f/ZCnRgVg85sVQP1k7QQQiOOcA6A6DGXQGOWtKSElT1us3XwPGUqEDsXjsE0P97NFJOEcEU5ipGkyhOwyqmhJy0svXXgHGUqEbsXh8TQz1ZLxiBjUzhRlMNRtMoapnL77AjLFU+CZi8egQQ41dk/GKKsxMDZb19Pk/AAPAUuF7iMWjWwzrmCHMMZYKiyEWjwXEsI49LBUWRiwefSIWjz4Ri0efiMWjT8Ti0Sdi8egTsXj0iVg8+vQZ5XRNcP4NHBwAAAAASUVORK5CYII="},{"name":"Accursed ashes","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAACeUlEQVRIDbXBP4tcZRTA4d+5c9d1T/IdTjn3bewCFhZBIrIIAZsIQkAtVmRtUqyfQrDwD4iiENIYLAIWIRJCikUQGxGEvVi9nWBhiuSdcea+57i7sJhhM3Ga+zyilhiTqCXGJGqJMYlaYkyilhiTqCXGJGqJMYlaYkyilthYyT2r1KY8l6glNlNy/+bbL1+8+CJQBx+G4dHfj3/84Te1KeuJWmIDJffX9y63W82kadzx8GE51MGXS//+1k9qU9YQtcQGSu73brzWTtoIr+7h1BrffHafc9SmPEXUEpspuefU/ke74Xzx8V0IkKvXLl24sC3SzOaLv/58dPjgSG3KGVFLrFdyz1rBCXnng1ebSePui8UwLPz2zUMItY5TopZ4lpJ74MobL+3sbG3vbG+1DbBY+nz2z+zx/MmTxc+Hf6hNS+73D3bdvVZfLuu3nz+AUOs4I2qJc0rur167tNVOJm3bvtA0wjEPwr06dTGU2XJW5g/v/a42LbnnP6HW8RRRS5xTcv/Wu69stc0xoGkad48gwr1S3Wv1Wn1e5nfv/Ko2LfmIU2odq0Qtsark/vre5UnbCCCINASBR+DhUanuUb1Wr+51We9894valDVELbGq5P69D680Ag2CAEHgeBDhEXj1Y7V6Hbh98xBCrWMNUUucU3L//o3XERpwiPAICMLDgwiv7j5w66uHEGod64la4llK7vcPdgMIItwDggiPIDy+/vQ+J0Kt47lELbFGyT2n9g92I4hwDwi+/OQeBKDW8X9ELbFeyUecEFaEWsdmRC2xgZKPOKPWsTFRS4xJ1BJjErXEmEQtMSZRS4xJ1BJjErXEmEQtMaZ/AfsIQnDZ6x9CAAAAAElFTkSuQmCC"},{"name":"Infernal ashes","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAABh0lEQVRIDbXBsYrjMBCA4X8ES2AqdW4CU9rz/i+zKgXXuFMlCAH51rnkEpP1rht9n6g5PYma05OoOT2JmtOTqDk9iZrTk6g5PYma05OoOYfVnNhSG/mRqDnH1JwGGi8uUAhqI/tEzTmg5jTQiNwV/psJaiM7RM05oOY0xPbB6srdXAJv1EZeiJpzTM2Jm3NswJ8SYAGJtBN3FygEtZEHUXP21ZzYtbCSgUaEwj8zARa1iRtRc75TcwIiDTjxdOGuENTGmtM5NuDKai4BFrWJB1Fz3tScIu3ErgurQlAba048LWoTL0TNeVNzGmj85gKFoDbW/MmN2sSWqDlbNaeBxpfIRuHdBQpBbWSHqDlbNachNvYUXs0EWNQmdoia86bmNMT2wd2VN4UvMwEWtYl9ouZ8p+Z0jo0XV57mElgtahM/EjVnR82Jm3NsPFxhLgEWQG3iN6Lm7Kv5k5WwsahNHCNqzgE1f/KgNnGYqDk9iZrTk6g5PYma05OoOT2JmtOTqDk9iZrT01/b34BhdMg5nAAAAABJRU5ErkJggg=="},{"name":"Unicorn horn dust","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAACgklEQVRIDbXBPWsVURAG4Hf2Zm9kxOg/mHL3YBOwERELyZ9QsFIQFRQsQvALVBDUiBEFC8UiVkllZyMiKSQgNoKQRRFOJ1ioIR5yd8+Z0QSCXuLqbfZ5iMWhS8Ti0CVicegSsTh0iVgcukQsDl0iFocuEYtDl4jFYWTBVxjGUuCfiMVhNMFX187t2zMxTsiaqIO6+fwl3Jt/z1KgHbE4jCD46sGVg/1+1utlmjQmrRuta62bdPHuG5YCLYjFYQTBV/M3D+d5pqpJoUmj6omLS9iGpcAfiMVhNMFX2LR4byolHDn/AjCALp2a3DOxI8uytTD46Ffnn31gKbCFWBzaBV+hlWEDPbx6MB/LYsL6IK4PdGZ2GTCWEpuIxeFvgq8AnDm6d/eufNfOPM97AAZ1+r42+L5Wf/1WLz7/xFIEXy3MTcWoMel6rScvLwHGUmILsThsE3x16fTkeN7L83y8n2UZfjFDUo0N6qZZ/dF8W60fLa6wFMFX+M1YSvyBWBy2Cb66Pb2/38/GehkRiGAGVSTTlBAbjSk1ja7+aO48ecdSBL+CTSwlhhGLw7Dgq/uXD+T5GBGIkBHMoAZVNUNSpKRNozGlmBCjXn3wlqVAC2JxGBZ89fjGIUJGhAwAQQ1mMFNVJP0FMWlstEmYmV0GjKVEC2Jx2Cb46umtw0QAAQY1qKoZ1GCmSZGSxqRnr78GjKVEO2Jx+Jvgq4W5KQNMoaZmMIWaqkINxy+8wgZjKfFPxOLQIvgKmxbmptRgCjU1xbHpl4ABYCnxP8Ti0C74FWwgDDGWEqMhFocRBL+CLSwlRkYsDl0iFocuEYtDl4jFoUvE4tAlYnHoErE4dIlYHLr0EyFmRXCgrJ7QAAAAAElFTkSuQmCC"},{"name":"Dragon scale dust","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAACYElEQVRIDbXBMYtcVRTA8f95b3ajJ36HY/feFRbCNAELiyCKbD5AKqtUAQtBm/UDWFiolV3AwlawkEAIFouNzbIQWPaBRS6kSCMIupd1591znFlYzLCZOM37/UQtMSVRS0xJ1BJTErXElEQtMSVRS0xJ1BJTErXElEQtsbWSB9apdbyWqCW2U/LQvfvx7hs3QapXxkX5+49nxz+pdWwmaoktlDzs3XnQNjs0DUT1yjhWX1RfDL9+r9axgagltlDyMP/wM2Y7uOPuOFGPH3/DNWodLxG1xHZKHrg03/8C/OjnLyFAutv32htv0bT14uzszxfPT56odVwRtcRmJQ9sFKzI3vuftM2seq3jBX5xcvgQQq3nkqglXqXkAXj71t3Zzs3dG2/S7EBUX9R/ynhexou/ng+Hal3Jw3z/AF8aqYvjJ99CqPVcEbXENSUP3e17tLvtbIdm1tKwEtUreB0XdVHG87NnTx+pdSUP/CfUel4iaolrSh7eee9+28xoWpaaBncIPCqOj3itPtbz8vvRj2pdyadcUutZJ2qJdSUPe3ce0MxahKVGWPKoBF4hqjs+4l59pNbhtx/UOjYQtcS6kodbH3zKiiDCUgQEBB6VwCteq1eoJ4cPIdR6NhC1xDUlD/OPPoeGFcfDCZbCIfCoPoI//eU7CLWezUQt8SolD/P9A1YCDwhw94Ag/Pjx16yEWs9riVpig5IHLs33DyDwgAA/evQVBKDW839ELbFZyaesCGtCrWc7opbYQsmnXFHr2ZqoJaYkaokpiVpiSqKWmJKoJaYkaokpiVpiSqKWmNK/PUUZcPtQSAoAAAAASUVORK5CYII="},{"name":"Raw rat meat","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAFK0lEQVRIDaXB228U1x0H8O/hreehatQ2Ui/qiVJLzPxRfWlVJCfrhGT7UloFqLjUgIWokz4gl6QRKsW50JBYbhAQc2lJTUvtYIPH2RKOMd7bzO6Mic+cmTm/c8quupVXxtROPx/GhY//g5IBNuBiJ3oYFz6+KiWDiTOnnXNFUaRap1orlYZRuP/YcS52ootx4eMrUTL4ePwMkSVLzjl0FcYEn1f2HDwMOC48AIwLH9unZHDxvXFrLREVhirlEv6r9Oo9ufT62CkudgJgXPjYPiWDS++/Yy3lRRHsfhHrfK388/sPlodH3wAcFx7jwsc2KRlc+eB9spTl+d2XBtHvG3v2P3i4vPfICOC48BgXPrZDyeD6xAeWrNbZ3NAubPDN1w5U6/V79+XJt09zsZNx4WPLlAxuTH5E1mqtVaor5RL6PTd8vN5srlRri/funf3TecAxLnxsmZLBjckPU61TnQW7X8AGz+47VGs0Hiw/vPbpp7duzwOOceFjC5QMAPzt44lUZ6lO7740iA2eP3qiEYYr1epSdeXU6T8AOwDHuPDxVEoGAG5emMyNIWN0ls2VduFJvvOrX9eazZVabXZu/sLUVcBx4TEufGxCyQDA9IXJvMhNQYUpjDF3Xx7EJr6+Z2+1Vqs3o9fHxoAdgOPCY1z46KdkgK7pC5M6y4wpTEEFFcHuF7G57x08Wmt2LFb+NX7+I8Bx4QFgXPjoUTIAMHvlcpZlOsvyPC+MKQpTKZfwvzzzi/31MGyG0aVr12ZuzwOOCw8A48IHoGQAYPbK5SzLdJZprQtjgt0vYGt+cHik3mxGrdYXSw/ePHMG2AE4LjwAjAtfyWD2yuUsy7TOdKbzIl98pYTt+NZrB8JWK4xa0zO3Lk5dBxwXHroYF76SwezUpXaSrD56VCkPYRMDI6MAKuUh9Htu+HgzilpxvPxw5Y1Tp4AdgOPCQxfjwlcymLs+FSfJ9I9/hA0GRkbRr1IewjrP7jvcjuOo1bq9sPDehxOA48JDD+PCVzJYuHEtTlbDKFp8tYR+AyOj6FcpD6Hn+aMnWu24lcT1euPPn3xy+84C4Ljw0MO48JUMKjdvxEnSDKO7Lw+i38DIKPpVykPo+e6BI3GStNrxYqXy1tl3AMeFh3UYF76Swf1b0+1ktRmGc6Vd2GBgZBQ9lfIQ1vn23oOtJInC6K83b168eh1wXHhYh3HhKxnU7nzWCB+LZgZ/gq354bHfqDRdS9N2O/5Cyt+++XvAceGhH+PCB6BkcOcvV1Ot0zRVaZoXubWuUh7CJr5/6JhKlVLpmkqVUjPz8+cmJgHHhYd+jAsfgJLB0sw/DJHWOtU6TZVS2hBZZ611lXIJPWL4eJqmRVEYImNMK44bzeaJk78DHBceNmBc+ACUDJY/+ycRGXrMGEMq7dLaOuuss85acmSNoQ5jSCnVipNGGC5XV86eOw84LjxswLjwASgZrMzNUocxRGTIEBmioihUmuZ5bq11zhnqKIoiWX3UTuJGFFar9bfH3wUcFx6ehHHho0vJYGnm70T2MbJEZA0RGWOIjDF5Xhgy1tKXaypZXY2TpBlFtUZ97PQfAceFh00wLnz0KBmga3bqElkistaSIWuJyFpLtKbS5NFqnCRhq7XvyAg6HBceNse48LGOkgvoYOi6fO5da8mQpa41peIkidrtXx4aBhwALjw8FePCx5MouYAOhq7xsZNE5kulfvrKz9DhuPCwBYwLH0+l5AI6GP7DAeDCw9YwLnxsjZILALjwsB3/BnPFn5vCnUxdAAAAAElFTkSuQmCC"},{"name":"Snake hide","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAADAElEQVRIDbXBwWpiVxjA8f9pcPPdKPcBOn7QCNezm8XQJ7gYQnCbSx9tXkFcFcqFItJ1KMwsc0JKc6T7ytWcjdNzm5raatQkZmZ+PyNq2RS8A0QzvgQjalkTvDs7azeT6WBYiWZ8NiNqWQneAWdn7WYyBQbDChDN+AxG1ALBO+DsrM1KM5myNBhWohmvZURt8K64aAHVLGVTM5kCg2EFiGYczohaIHhXXLSAapbyyKLDUjkaA6IZhzCiFgjeFRctluZ3aYw8tuiwVI7GgGjGyxhRy1LwrrhoAfO7NEZ2WHRYKUdj0YwXMKKWpeBdUbSouTe/S2Nkt0Wnmf4KDIaVaMZzjKhlJXjX7+URaFzHyD7NZMrSYFiJZjzJiFpWgnf9Xh5ZalzHyD7NZApEGA4r0Yz9jKhlTfCu38sj/4hH1zypmUxn03flaCyasYcRtWwK3p33cu41rmPkGYtOORpDLdplFyNq2RS86/fyCMfpZTVLedqiA5SjsWjGLkbUsiV4d97Lj9NLoJqlPOUTi245GkMt2mWLEbVsCd4VRYuaB9UsZa9PzWQeYTisRDO2GFHLLsG7omhR86CapezRTKbAYFhBLdplkxG17BG8K4oWNffm03c0bmJkWzOZAoNhxZJoxhojatkveNfv5ZGVxjUQI48tOvwrlqNfANGMJSNqeVLwDuj3ciACjWsgRh755q9OjLRPjie/zYFyNBbNACNqeU7wV2CA/mku6SU1D6pZyqZ2+y3wx+/zn34eQy3aNaKWlwn+CgzwQ9Ga//l95F6MRzdsarffAu/f/wi1aNeIWg4R/BWYfi+P3Ivx6IZdynICtWjXiFoOF7w77+VA+0Rubz+ypSwnUIt2jajlcMG7fi9/00nqur69/cguZTkRzYyo5XDBu/5p/uYkqWsmkw8sxci6spxAbUQthwve9U9z4NvvEmAy+QDEyLqynEBtRC2vErxjzfl5O0b+U5YTqEW7RtTyWsFf8T/Dhlq0CxhRyxcS/BUrol2WjKjlazKilq/pb10cQc6axs9cAAAAAElFTkSuQmCC"},{"name":"Wine of Saradomin","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAFgUlEQVRIDbXBX4hcVx0H8O+5d+78Od19aQX16TwInbn6IogIvvgovvki+lBEfFGrVSQ0EG3TTJslqCWrWK1i0GpFMEQKQRG1SolldV0qS23D3to1vclsZv9mZ2c2Z2fu+f1xMu7qrLvT5qWfj7EuxQQ+zzCZdXXcBWNdiuP4PPvcZx6ITCQqzELExCEEZiZiarfX5v++CMC6Ot6UsS7FcXyeffaBT6loHMVRZOI4jkxk4iiOoqRUiqKIRdY3Np+9eMm6OiYz1qU4js+zT3/yEwDiOIrjODJRHEdRHFXKFVutRlFkIgPFP/917Re/es66OiYw1qU4wufZ17765Teu34hiU4rjKI5jE0VxVC5XrLX31CqRiRVQFSJafOWVy7/9g3V1HMdYl+IIn2cnvvj5Gys3S/G+KDbVcsVau/Kuj8Rxud6bVxUV3djafPnqq1fmFgC1roEjjHUpjvB59o0zj7ZWVtY21kulpBTHlUpl9R0fikuVuJzESaWUlO/v/FVVl15//ZfPXQbUugaOY6xLcRyfZwDOnDzRare7vd3Ne99fqlSSci1OKnFSjpNKnJTf3Xq+1V69dPnXgFrXwHGMdSkm8PkSYACcfOjB9vp6Xn5PqVJNytVSuRonlaRceWf7yvd//FNAAQPAujqOMNalmMzn2cwjp2yt1u/3b3U63V43EEWIMOL7e3/884traxsf/uAHpqenf/enFwBYV8cYY12KyXyezc48jhEWDoGYKISwurG5ubUhAqJgh2q1WrW6td250WrNLbxkXR0HjHUpJvB5NjvTBAwOeO+3O51BUahCISpqIlNOklIpSUqlbm93dX09v359YfFl6+oYMdalOI7Ps3OPnqpWaxizvb29670wq6qoioqKJknynR9eAPDwl76wNxi0V9eWl5cXry5ZVwdgrEtxhM+zR0585b5778MYYtrc2gqBREVZWIdERVvtm1f+Mt/pdAGcfOhB3++3V9deW17+x9Ul6+rGuhRH+Dz7VvN0qVTC/+hev9/p7lBgVREWVhVmVSWiV1/L5uZf+vjHPvq+tGFrtfba6lMXngHUuoaxLsVhPs+eOPXw1NQ09ilGdna6ftDnwKIsrKyiLKLCKusbGwbRe+v3T09P7ex0z337u4Ba1wBgrEtxmM+z2ZkmDlPFrVu3AhMRi7CIypCKsLCKkExN3zNl7W3vZ5/+EaDWNTBirEsxxufZudNfr1bKOGxQhN3d3UCBiEVYRGVIRVhYRVnLlURYnv7JzwC1roEDxroUY3yezc40ccTubT8YDJg5hMCqysyioiysoiyie/29n1+8hDsi6+o4YKxLccDn2ZOPPxbHEcaoYqjX69EQcyCSIWZWFWEVZVEVCRTm/rawtrnZ6XSAyLo6Rox1Kcb4PJudaeKAKoaY2XtPzEQUiGSImVVVWESHAlFRFNdXbrZarV6ns9bpAmpdA4CxLsUYn2ezM00Aqvivfr9PIRAzMYcQWERUlIVVlYWEioJCUdwe7F1bvrZ4dQlQ6xoYMdalOMzn2fmzTYzp9/vERIGIORAxs6oIC6sKcwg0oCIURb8obq625xcWAbWugRFjXYojfJ6dP9vEPu0PBnQHM1EgYhliYRXVgkIIxX/0B6Hb673w4hyg1jUwYqxLcRyfZ+fPNgEl4iHiQIGJOYTAMsQqGpiKIoRQFAUNiqI/GPzm988Dal0DB4x1KSbweXb+7BliZmJiphCIOTAxsQgLSxGGikFBz168hH1qXQNjjHUpJvN59s3maWYiYqY7AhMRi3AI4akLz2CfYsS6Bg4z1qV4Uz7Pzpw8IUOqIsLCTPzk936AOxQj1jUwgbEuxVvxeYb/pwCsa+CtGOtS3AWfL2GMdQ3cHWNdireTsS7F2+nfE4LUjiCzbk0AAAAASUVORK5CYII="},{"name":"Wine of Zamorak","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAFfElEQVRIDbXBS4jdVx0H8O85577mNLOxW+HsvPffLoqIIuJC3Ig7N6KLIuJGrVaR0EC0TTNthqCWjGK1ikGrFcEQKQRFfFJqGUmHlqFp0/nXjuk/meTOM3PnkTP3/s/v4c11Ru84c9ts+vkYHzKMEIsco/nQxB0wPmQ4TCzyL37+fmusqDALEROnlJiZiKndXrr48iwAH5p4W8aHDIeJRf6F+z+ros46a41zzhprnHXWVisVay2LLK+sPnPuvA9NjGZ8yHCYWOSf+8ynAThnnXPWWOesdbZeq/tGw1prrIHin/+68uvfPutDEyMYHzIcEIv8m9/42ltXr1lnKs5Z55yx1tlare69v2usbo1TQFWIaPbVVy/84c8+NHEY40OGA2KRH/3Kl65dv1Fxu6wzjVrde/+h2Rdr1l766MdVRUVX1lZfufza89MzgPrQwgHGhwwHxCL/9slHFq5fX1pZrlSqFefq9fp9r8/Wras6W7euZnHpwx9T1bk33/zNsxcA9aGFwxgfMhwmFjmAk8eOLrTbm1vb98y/XnduzLq6czWLurM166bvff9Ce/H8hd8B6kMLhzE+ZBghFnOAAXDswQfay8vvvfRyw7mGcw3r6s7Vq3amdd+PfvYLQAEDwIcmDjA+ZBgtFvnkw8f92Fi3273Z6WxubSYiC4uB2N35699fWFpa+cgHPzA+Pv7Hvz0HwIcmhhgfMowWi3xq8jEMsHBKxEQppcWV1dW1FREQJd83NjbWaKytd64tLEzPvORDE3uMDxlGiEU+NTkBGOyJMa53Or2yVIVCVNRYU6tWK5VqtVLZ3NpeXF4url6dmX3FhyYGjA8ZDhOL/PQjxxuNMQxZX1/fjlGYVVVURUVFq9Xq939yFsBDX/3yTq/XXlyan5+fvTznQxOA8SHDAbHIHz769bvfczeGENPq2lpKJCrKwtonKrrQvvH8Py52OpsAjj34QOx224tLb8zPX7o850PT+JDhgFjk3504UalU8D+60+12NjcosaoIC6sKs6oS0Wtv5NMXX/rUJz9xb9byY2PtpcUnzz4NqA8t40OG/WKRP378oSNHxrFLMbCxsRl7XU4sysLKKsoiKqyyvLJiYO9pvm98/MjGxubp7/0AUB9aAIwPGfaLRT41OYH9VHHz5s3ERMQiLKLSpyIsrCIkR8bvOuL9rRinnvopoD60MGB8yDAkFvnpE99q1GvYr1em7e3tRImIRVhEpU9FWFhFWWv1qrA89fNfAupDC3uMDxmGxCKfmpzAAdu3Yq/XY+aUEqsqM4uKsrCKsojudHd+de48brM+NLHH+JBhTyzyJx571DmLIaro29raoj7mRCR9zKwqwirKoiqSKE2/OLO0utrpdADrQxMDxocMQ2KRT01OYI8q+pg5xkjMRJSIpI+ZVVVYRPsSUVmWV6/fWFhY2Op0ljqbgPrQAmB8yDAkFvnU5AQAVfxXt9ullIiZmFNKLCIqysKqykJCZUmpLG/1dq7MX5m9PAeoDy0MGB8y7BeL/MypCQzpdrvERImIORExs6oIC6sKc0rUozKVZbcsbyy2L87MAupDCwPGhwwHxCI/c2oCu7Tb69FtzESJiKWPhVVUS0oplf/R7aXNra3nXpgG1IcWBowPGQ4Ti/zMqQlAibiPOFFiYk4psfSxiiamskwplWVJvbLs9nq//9NfAPWhhT3GhwwjxCI/c+okMTMxMVNKxJyYmFiEhaVMfWWvpGfOnccu9aGFIcaHDKPFIv/OxAlmImKm2xITEYtwSunJs09jl2LAhxb2Mz5keFuxyE8eOyp9qiLCwkz8xA9/jNsUAz60MILxIcM7iUWO/6cAfGjhnRgfMtyBWMxhiA8t3BnjQ4Z3k/Ehw7vp3zk71I5kqCK+AAAAAElFTkSuQmCC"}]}

/***/ }),

/***/ "./JSONs/ItemsAndImagesCrystalLegacy.json":
/*!************************************************!*\
  !*** ./JSONs/ItemsAndImagesCrystalLegacy.json ***!
  \************************************************/
/***/ ((module) => {

module.exports = {"taverley":[{"name":"Blank","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAcElEQVRIDbXBQQEAAAABMdoocF/9Y0lhc4meXKInl+jJJXpyiZ5coieX6MklenKJnlyiJ5foySV6comeXKInl+jJJXpyiZ5coieX6MklenKJnlyiJ5foySV6comeXKInl+jJJXpyiZ5coieX6MklehrY9xOB0WoOowAAAABJRU5ErkJggg=="},{"name":"Coins","base64":"data:image/png;base64,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"},{"name":"Coins","base64":"data:image/png;base64,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"},{"name":"Uncut dragonstone","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAEBElEQVRIDbXBwWobVxSA4f/ckXEJTTubvoLnvsD18npTCnmEuA7NW9SJX6bbbkOCKM2iGoogGujanlWg0NaOY185smWPNOfUEhGVcNK6EH+fxOC5SxKD7w32Wdja9HxSEoPvDfZFhIUYCj4dicH3BvsiEkPBHZAYfG+wz9zWpue/lFUdwwa3JjF4oKwOADPb2vQsKauaVYGvK14CMWxwCxKDZ6E32BeRGIqyqpn7hm/5h4EodsIR8BsvmYthg4+TGHxvsL+16YHeYF9EQB7le9PUkGdv0++KKS3gEEcGKO2Qty2WIUDFz0AMG3yIxOCB3mAf2Nr0ZXUAspPvKa0lk1wyssP0WmnBAUrryBzSMFZszAUoWMXLGDa4QWLwzJXVARBDUVb1o3wPaGktWSfvACkdXXEBKKa0wJQGxHEtA/cLP4LFULBKYvCsKqt6J38qiKFtmnTydUOH6VjRCZeKgQJTGmYcM9Iw6tONYYNVEoNnSVnV2/muwwli2CQ1a/naaTpixkAmjEGAhitmBGzMeQZ9umAxFCyRGDxLyqreznctmeTicJPUOOSME0BpWzTDTWgc0nDFjIwZKergFT+BxVCwRGLwLCmrejt/AgY4nKLAMB0xIw6nKHDFeEoDss69xF/MOOAV3Rg2WCIxeJaUVf0o3zMUUMwhgkvpSHCGKuYQRcHOSevcTxyxkEGfLlgMBQsSg2dJWdU7+VNFAUut5FmbJiOS0nZYY04xZXrFGLhkxFyLAq/ogsVQsCAxeJaUVb2d7xoGIpCRTdP0jDcTphnO4RyZ0jqyUw6/5KtT/gDHe9qnCxZDwYLE4FlVVvXDfJfUgpPcgQHD9AaMGZkyfcfp59xfY/2cs4ZzcMxony5YDAULEoNnVVnV2/kTw0gGLWRZ7obpBFCmYEOO7/EF2BqfjRldMuI97dMFi6FgQWLwrCqreid/AqKopVaxLO+M0ilgtFeMFctYM2zKFaBow4gZ1+cFWAwFCxKD54ayqh/yveQuwzXp0uHOeeeQC86UVjGHODoNE1Aw0DHjDNfnBVgMBQsSg+eGsqq3813A4drUQAYc8rpDpqAoGIjSQMZ7ruG8z3OwGAoWJAbPDWVVb+e7DmkxgdP0pyMDFG2ZgjE3ZapcU4dzyAWjPs/BYihYkBg8N5RV/TDfzZA2Td9yCAgYLWSAgEMUe8eJwwHKNe3zDBxYDAULEoPnQ8qqBh7wGMzRAQEDUdQxM+QYRDFoHRnwK8/AYihYIjF4PqKsDkCYe8B3Co5r4nBDjpVrCg7o84wZi6FglcTg+VdldcCMMPeAx0CXH1hhQAwFN0gMntspqwNmhBljSQwFHyExeP6nsjqIoeB2JAbPXZIYPHdJYvDcpb8BAV/2kAv6onEAAAAASUVORK5CYII="},{"name":"Uncut dragonstone","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAD2UlEQVRIDbXBz2obVxTA4d+5M7Ib0paBvoPnvsDZ3mVL6BMkjbJInqGU1HUepfvuWuMQQqCLIQjKfQIPdJmY2Ik9cvTHsmbuaSQQSDguzsLfJ0E9t0mCem6TBPXcJgnquU0S1PMlqlgH3eHGJKjnelWs2aT8EHkJBN3hBiSo54oq1ix9z09CDhhtwhw5cMYREHnFUtAdridBPZuqWPeLPUht037gCFIiJVJODgjZnNlHziCxFHkFBN3hcySoZ1MV60fFMwNrWimc4N42/zo+ESCRHDlwwcjBmDFLkZdBd7hCgno2VbHuF3uCM5KRHJlhTXM8YwSSsEQH1jJ3ZIAjA/ubP8CClmySoJ5NVawfFc8MA2ubNi+2IA2bk440ZwZdgpbWsZDoQMBdMh5wEHSHTRLUs6aK9X1+yYue4IB5M82LO6fNWxCwjHzCucOBu2TiyBI4uGAE2YB9sKAlaySoZ00V636xayAstM2lkH/kFEi0LW1OPuMiI59xAcmRjRkmEhB5CRa0ZI0E9aypYt0v9kC65nKr+GrWXEghw+YYcDghMyzRzZgAiW6bu0PeAR0pww14HnSHNRLUs6aKdb/YgwR0pJwecN68Bzo6lgQ62imjbe6c8i7DgbBgA56DBS1ZkaCeNVWs+8VvgGFd0yY6w8YMwTJ6DpdIDplzOWXkkAkTFjqWBjwHC1qyIkE9a6pYPyie0uAKcfQcJOxD86alzcmBHttzLntsnXL0Dd+dccRCBh3IgAOwoCUrEtSzqYr1g+KpNQbkRWYYyFlzDAmcw7XMhpx+zbc9tsecXzIBAQMZcAAWtGRFgno2VbF+WOwC82bmyPKiBwyb94DRJWzIyV0Kw7bZnjKeMIIEdHT/8AIsaMmKBPVsqmLdL3ZBMrJZM4MuK7bOmw8O6UgzxmAZvYR1zICEXTBmwQ3YBwtasiJBPVdUsX5Y7AqfSNvMhHzCEGTKyGgTHWQZ+ZyLxCcJuinTjN6AfbCgJSsS1HNFFeuHxa8gQtY2Uylya9oT3jgcWMJYapkDDgc4sgmjAftgQUtWJKjniirW/WLPSIAgp80RCwLW0hoGCVyiTXQsiCObMBxwABa0ZEWCeq6oYn2fn/Niy7CT5k1OnugSxoojg/SRUxBw0CUY8Cc4sKAlKxLU8zlVrIEfeZKwnB4kcIkOjAUZcuzIW1rAsfCafbCgJWskqOcaVTwEYekejwGHsCBDjkESBjjkNX+xYEFLNklQz/+q4iELwtI9HgMv+J0NBgQtuUKCem6miocsCAvGmqAl15Cgni9UxcOgJTcjQT23SYJ6bpME9dym/wAbitmQSYnqwQAAAABJRU5ErkJggg=="},{"name":"Uncut dragonstone","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAEHUlEQVRIDbXB3WobRxiA4febXdkNactC78E7NzA+HJ+1hF5B0igH6TWUkrrOpfS8Z61xCCFQ0BIE1dyAvJDDxMRO7JWjH8vana+RQCDhpHUhfh7xznKTxDvb6fVZ2tm2fFbine30+iLCknc5n494Zzu9voh4l3MDxDvb6fVZ2Nm2/JcilN5tcW3inQWKcAio6s62ZUURStY5vgs8A7zb4hrEO8tSp9cXEe/yIpQsfMsPQgoodUQNKXDGERB4zoJ3W3yaeGc7vf7OtgU6vb6IgLSzPYh1Vb/jCGIkRmJKCgjJjOl7ziCyEHgOeLfFx4h3Fuj0+sDOti3CIciD7LGCVrVkRjCvq5eGDwSIREMKXDA0MGLEQuCZd1tcId5ZFopwCHiXF6FsZ3uCUaISDYmiVXU8ZQgS0UgDWjMzJIAhAf2L30G9y1kn3lnWFaF8kD1WFLSu6jTbgDioThrijCk0EWpqw1ykAQFzyajLgXdbrBPvLCuKUN7l5zRrCQaYVZM0u3VavQYBTUjHnBsMmEvGhiSCgQuGkHTZB/UuZ4V4Z1lRhLKd7SoIc3V1KaTvOQUidU2dkk65SEinXEA0JCMGkQgEnoF6l7NCvLOsKELZzvZAmupyI/tiWl1IJoPqGDAYIVE00kwZA5Fmk9sD3gANMcF0eeLdFivEO8uKIpTtbA8i0BBTWsB59RZoaFgQaKgnDDe5dcqbBAPCnHZ5AupdzpJ4Z1lRhLKd/Qoo2lR1pFF0xAA0oWUwkWiQGZcThgYZM2auYaHLE1DvcpbEO8uKIpT3skdUmEwMLQMRfVe9qqlTUqDF5ozLFhunHH3FN2ccMZdAA9LlANS7nCXxzrKuCOW97JFWCqRZoijIWXUMEYzB1EwHnH7J1y02R5xfMgYBBelyAOpdzpJ4Z1lXhPJ+tgvMqqkhSbMWMKjeAkoT0QEnt8kU3WRzwmjMECLQ0PzNU1DvcpbEO8u6IpTtbBckIZlWU2iSbOO8emeQhjhlBJrQimjDFIjoBSPmTJd9UO9ylsQ7yxVFKO9nu8IHUldTIR0zAJkwVOpIA0lCOuMi8kGEZsIkodVlH9S7nCXxznJFEcr72S8gQlJXE8lSreoTXhkMaERZqJkBBgMYkjHDLvug3uUsiXeWK4pQtrM9JQKCnFZHzAloTa0oRDCROtIwJ4ZkzKDLAah3OUvineWKIpR3+SnNNhQ9qV6lpJEmoiwZEojvOQUBA02ELn+AAfUuZ0m8s3xMEUrge36MaEoLIphIA8qcDDg2pDU1YJh7wT6odzkrxDvLJxThEISFOzwEDMKcDDgGiShgkBf8yZx6l7NOvLP8qyIcMics3OEh8JTfWKOAdzlXiHeW6ynCIXPCnLLCu5xPEO8s/1MRDr3LuR7xznKTxDvLTRLvLDfpHxE395B0SVMTAAAAAElFTkSuQmCC"},{"name":"Uncut dragonstone","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAD1UlEQVRIDbXBTYoc1wEA4O+9qtaECJyG3GG6LvDI7m290A2CJWR0CWPZ8kmyzzIWI4Igq0IMiDqBmiwVW5Y1Uo1mNH/d9V4YhYZpxgryYr4v5NS5SSGnzk0KOXVuUsipc5NCTp3fox+WOe36bCGnzqf1w9K2v/jyuafIaddnCDl1rumHpY++9FXURGFlTQ2aKLz1Cs899VFOuz4t5NTZ1g/L+/NHRS1WB+PPRa0matAiCpPVoXeUokTxuafIaddvCTl1tvXD8uv5D1WdTI0mCP8Z/42gQTUFbeTUEfHUB5fKc09z2nVNyKmzrR+W9+ePgliVojTaqozj61PHxGqiFmXtIppRWrOi/MvfqTktbAs5dbb1w/Lr+Q9VxWTVmGEcXxf13Fk1UYs1gbpWoogzH/bt5bRrW8ipc0U/LL+af9OaBQ3One3YORh/Ilal0Z54HzRROHXSaooahRNHUfPMY2pOC1eEnDpX9MPy3vx7KgFrq0Y8Gg8KkzVT1Jw7a7QrZ0WJmhOHk0J87p/UnBauCDl1ruiH5f35I0zWMzsXzoL4dnyFRhtFyqScO0Ex7fjjO7+4VIj7nuS064qQU+eKfljenz8qKqrSmmEcX6OaCFTCZH3qaMftd35xqaFg3x41p4WNkFPnin5Y3pt/H4WiFOvJRD0eD4sycysIVSVMLk4dR/HEMYrio3171JwWNkJOnSv6YXl3/i0BrVsu1Tfjy7VVa4bWrbVVa/bOqy/8+Y2fETXFhH171JwWNkJOnW39sLw7f1gVRE1VgzCOv1broI3CysWhg9v+dMutD47OfCBSsG+PmtPCRsips60flnfnD7F20WhatzCOv6IolNGb277AzB/OHJ84Kv5n2veEmtPCRsips60flvfm30UxaFbOitpq349vXSqnTqppZoeycoGinDiOIp55TM1pYSPk1LmmH5b35t8RonDhvNEcj4dRPPF+sqYSGrOVM2qhmC6cRs0zj6k5LWyEnDrX9MPy7vwhodWcO2u0k/Wb8WXQVJONtQtiFBDFE8fPPKbmtLARcupc0w/L+/NHkwlBPBh/ikIQJqVYo6iEal1MiCLh2OG+PWpOCxshp841/bD86/yb1qwqb8aXUUuloKhRoKEeOSC6VIr6zD+I1JwWNkJOnd/SD0vc8QAzbSFSqCYEYfQ6atbWiAJ6P1JzWrgi5NT5hH54QfDRHQ9sRPHQa2IxESK9H12qOS1sCzl1/q9+eOFS8NEdD/DE32ypyGnhmpBT5/P0wwuXgkvVFTktfELIqfM79cOLnBY+T8ipc5NCTp2bFHLq3KT/Atqk1JDXK1vsAAAAAElFTkSuQmCC"},{"name":"Uncut diamond","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAFHUlEQVRIDbXBT28bxxkH4N87u7OkLSe9xMiluWrnC4yOow9ToL0WKFD0nCYC5NaJFDt2E8PXFo1rW1VbIAGC1BrkxAVyK0quKkuUZUWKTIn6S3J3530rCiBAQnHhAvbzkLMGbxI5awCsNJoAZmcMXjdy1qw0mrMzxmctEZmdMXityFkDwGctZ9OVRpOInE3x+pCzBsBKowlgdsb4rOVsipfzWe7sNF4ZOWtwwWctEZmdMRjjsxyTfvnzny18fh+As9N4BeSswchKo0lEzqY+y3Fhce79WMVEKMqq4iqJE1L0n7WnABbv3ccFZ6fxcuSsWWk0Z2cMgJVGk4gA8n9b4ooH5SBfe8rCZVUJc5IkAEWKev3+8+93hJkhCrR47z4AZ6fxY8hZA2Cl0QQwO2N81gLo238sS8VlVcZxrOKo8d13AEWRAqisikQnRNTZ349i1ekckCIJvPD5fWencQk5a3DBZy0AzqY+y/3y44iiwCEETmo6BH662T48OgQoDDGDB72+TrSwaJ0EDr95/0NAnE0xiZw1mOSz/Nu//5VZwDIoivrVGjO3t7aqMpyenYYQWKQoSyISkVAFUnSu2+3O37rj7DQmkbMGY3yWf/XgT/WkFscxCMfHJ9emrrbW1jEkida7L/Z0nCiio+PjWMfMrJR60enoWM8tfAKIsynGkLMGY3yWP1l+JEGICAq9Xl/H8db2NkTKoiqrSmt9fHaSaH1yesYcYq13d38IHEjRx3fvAeJsijHkrMEYn+V++TERDfqDqWtTxycnSkXr7bZAdBTHOg5VCMzdo0OBMPPbU2+tbWwACMxRpH53+66z0xhDzhqM8Vnul5dYGEAVwpVaDUD72TMARVkCBICAsixfdA9+8tbbaxsbRFCkABHgxq07gDibYoScNRjjs/zJ8iNiCMmgLELJLGFnb0+C1Os1IsVVUEr1B/39wy6ROuh2BRKqgAs3bt8BxNkUI+SswRif5V8//AIgRagldSIwpLmaDwZFLUkgqF+5MhgM6kltdX3tvZ++11pdBSHRuihKimh+8VNAnE0xQs4aTPJZ/vXDBywMkUQnLIFIrbc3QxWiOIqUOuv1n+9sX3/nnampq3t7Lw66hxSRBKGI5hc/BcTZFCPkrMEkn+XfLP0FQK/Xj6PoSr0uwObWFoCyrETQfrb57vXrLHJt6mqne7C/fyCCc2Wofn/7LiDOphghZw0m+Sx/svSIFHSsT05PA3O9Vnu+/T0IVQiHR0fMXK/VROT0rAcCM3f29yMVEWFu4RYgzqYYIWcNLvFZ/s+lhzSEs15Px/FepwOiTme/rKqKQ0SqrpOT3hnLOa6q6vDoONF6buEWIM6mGCFnDS7xWf7N4wdEpHV8fHKq46Ssin+1WjpOQggsAQCBBoMBKRUpJYwoVgfd7ocffwKIsylGyFmDS3yW++WliisASql8dU1FikiFUBVFIQIWJlBRFEEYDBWpKFI7uz/cuH0HEGdTjJCzBpf4LP/yz3+s1+rM4d/5qo41C3NgkOAcQalIgmzv7tAQAg/NLSwCChBnU4yQswY/xmc5gM8+uiEi9bgmEFIUWEQCQOfWN9qJ1oOyEEEUKRH54KNFQJxNMYacNXgJn7UAwoXPbs4LQExKKYqpvfmMQFUIStG5395cwJA4m2ISOWvwP/mshSHChT/cnCfQL371a0wQAM6muIScNXg1PmthiDAkGONsipcgZw3+Tz5rOZvi1ZCzBm8SOWvwJpGzBm/SfwHQn9yfO46BTwAAAABJRU5ErkJggg=="},{"name":"Uncut diamond","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAEwUlEQVRIDbXBzW8bRRgH4N87O7N2m1IuVFzgmt1/YK7zzyDBFQkJcS4QKYVCQr8oVa8gKG1DAAkkBNWKEytxQ5ANaeI0TZOmTpxPe3dn3pc4kiVbaVF7yPOQsylOEjmb4iSRsylOEjmb4iSRsyleRJYXzo7juZGzKZ4tywuMevvNN6a+uAnA2XE8B3I2xTFZXuDI9MR5rTQRqtp79rGOSdG/C/cBTN+4iSPOjuPZyNkUo7K8yL6fYc9lXRYL91m49l6Y4zgGKFLU7fUePloTZoYo0PSNmwCcHcfTkLMpRmV58fuPs+K59rXWWunojz//BCiKFEC1r2ITE1F7czPSqt3eIkUSeOqLm86O4xhyNsWoLC+y2bsRRYFDCBw3TAh8f7m1vbMNUOhjBpfdnomNsBgTBw7vnf8QEGcTjCJnU4zK8uL3H75jFrCUVdU83WDm1sqKr8P+wX4IgUWquiYiEQk+kKJDnU5n8tJVZ8cxipxNMSTLi59vfdWMG1prEHZ3986MnZ5bWESfxMasP9kwOlZEO7u72mhmVko9abeNNhNTnwHibIIh5GyKIVle3Ju9I0GICArdbs9ovbK6CpG68rX3xpjdg73YmL39A+agjVlffxw4kKJPr90AxNkEQ8jZFEOyvMhm7xJR2SvHzozt7u0pFS22WgIxkdZGBx8Cc2dnWyDMfHbspYWlJQCBOYrUR5evOTuOIeRsiiFZXmSzMywMwIdwqtEA0HrwAEBV1wABIKCu6yedrZdfOruwtEQERQoQAS5cugqIswkGyNkUQ7K8uDd7hxhCUtZVqJklrG1sSJBms0Gk2AelVK/sbW53iNRWpyOQ4AOOXLh8FRBnEwyQsymGZHnxy+1vAFKERtwkAkP+mS/KsmrEMQTNU6fKsmzGjfnFhddfe31ufh6E2JiqqimiyekrgDibYICcTTEqy4tfbt9iYYjEJmYJRGqxtRx8iHQUKXXQ7T1cWz33yitjY6c3Np5sdbYpIglCEU1OXwHE2QQD5GyKUVle/DrzLYBut6ej6FSzKcDyygqAuvYiaD1YfvXcORY5M3a63dna3NwSwaE6+I8vXwPE2QQD5GyKUVle3Ju5QwpGm739/cDcbDQerj4CwYewvbPDzM1GQ0T2D7ogMHN7czNSEREmpi4B4myCAXI2xTFZXvw2c5v6cNDtGq032m0QtdubtfeeQ0SqaeK97gHLIfbeb+/sxsZMTF0CxNkEA+RsimOyvPj17i0iMkbv7u0bHde++mtuzug4hMASABCoLEtSKlJKGJFWW53Oh59+BoizCQbI2RTHZHmRzc549gCUUsX8gooUkQrBV1UlAhYmUFVVQRgMFakoUmvrjy9cvgqIswkGyNkUx2R58dPXXzYbTebwdzFvtGFhDgwSHCIoFUmQ1fU16kPgvompaUAB4myCAXI2xdNkeQHg+icXRKSpGwIhRYFFJAB0aHGpFRtT1pUIokiJyAefTAPibIIh5GyKZ8jyOYBw5PrFSQGISSlFmlrLDwjkQ1CKDr1/cQp94myCUeRsiv+V5XPoIxz5/OIkgd56512MEADOJjiGnE3xfLJ8Dn2EPsEQZxM8Azmb4gVl+ZyzCZ4POZviJJGzKU4SOZviJP0HmOyyn7R0Z3MAAAAASUVORK5CYII="},{"name":"Uncut ruby","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAADnElEQVRIDbXBQW4b1wEA0Pc/STstUGLQO1QzF/hafm16iS58hxZ2lAN1261gOPBGs9RcgGQX3RRwYifurx3bikTOL0YQEQqKAxew3ws5db6kkFOH84sVTo47n1vIqTu/WJ0cd/2wrrWeHHc+q5BTh35Y59SeX6xCCDm1Pp+QU4fzixVOjrt+WOfU+rh+2OR05JOFnDo3+mFdaz057hzoh427/tyMz0tETkc+Qcips3d+sQoh5NT2w8aNvzRjIHLNjoXJK5PnJbqR05GPCzl15xerk+MO5xerEALhtFlWtsp3JtcmC5PAFW8YufpT9+Cfq+clIqcjvybk1OH8YoWT464f1oRvmmVlx4zAvxTMTK5ZmLwj8hORkecl5nTknpBT50Y/rJFT2w+b02Y5Y8fIjMor5dJkx2iyJZjMTP5RIjWn1l0hp85d/bD5pllWk60y1+AHpXLJSGVHoLIjmFzytMScjtwVcuoc6IfN35pxrpkz8rPyQPNScWNOYWHygTmVwFvmnJVIzal1IOTUOdAPm6+bZSWYXCszXptsqUQumfMzIzPeMBL5tkRqTq0DIafOgX7YnDZLbJWvNJdK0LxUMGfGjsp7RpPf8dKkEnhWYk5HDoScOgf6YXPaLKvJyJzIDwq2bgW2vOP3fE8gmow8K5GaU2sv5NQ50A+br5tlYGSnVHa8ZcdDAjsiV7w3+cDI6NazEqk5tfZCTp0D/bB53Iw0eGAy8kLZMjd5yDULvuePvDCZsyXytERqTq29kFPnrn7YPG7GajLTjAR+VHbMTLa8ZslD/st7IiORpyVSc2rthZw6d/XD5kmzrGyVyEKD1wp2VH7kD1S+4i3v3Bp5ViI1p9ZeyKlzVz9snjTLyIxLpTLXFCWw5ZKRhcmlW+9MImclUnNq7YWcOvf0w+ZJswwErpQZbwj8xI4dkTlXVEYq71lwViI1p9ZeyKlzTz9sHjfLQORKmWl2yr9ZsGM0iVybzNz6wFmJ1JxaeyGnzj39sDltlqNJ4DslENmxo7p17ReRtzwtkZpTay/k1LmnHzZ/bcaFZuSFMjOpJiORQOU/RJPR5KwgUnNq7YWcOr+mHzZ41IyYu1UZTSKvWHDtF2clUnNqHQg5dT6iH9YENx41o70Zr4iMbp2VaFJzat0Vcur8pn5YmwQ3HjUj/l6iOypyat0Tcup8mn5YmwST6kBOrY8IOXX+T/2wzqn1aUJOnS8p5NT5kkJOnS/pf/PqgpAvDcS/AAAAAElFTkSuQmCC"},{"name":"Uncut ruby","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAADSElEQVRIDbXBsW4cxwEA0Ddzd5IdIIdF/iG8/YFpp/JPpNA/JJBMf1DatISgQNW2+wPWpkhjQLZkKxPJkmjydicYggffgVYgF3wv5NS7TyGn3n0KOfXuU8ipd59CTr3fYxinnM58tpBT79OGcXLqq255XiJyOvMZQk69O4ZxcuMv3RKIXDOz0bzWPC/RjZzOfFrIqXdqGKfzblvZK99rrjUbTeCKtyxc/bl/8K9vn5eInM78lpBT79QwTt9028rMisC/Faw012w074n8TGTheYk5nbkj5NQ7NYzTebddMbOwovJaudTMLJo9QbPS/KNEak47p0JOvVPDOH3Tbatmr6x1+FGpXLJQmQlUZoLmkqcl5nTmVMipd2QYp791y1q3ZuEX5YHuleLGmsJG85E1lcA71lyUSM1p50jIqXdkGKevu20laK6VFW80eyqRS9b8wsKKtyxE/lkiNaedIyGn3pFhnM67LfbKF7pLJeheKVizYqbygUXzJa80lcCzEnM6cyTk1DsyjNN5t62ahTWRHxXs3Qrsec8f+IFA1Cw8K5Ga085ByKl3ZBinr7ttYGFWKjPvmHlIYCZyxQfNRxYWt56VSM1p5yDk1DsyjNPjbqHDA83CS2XPWvOQazb8wJ94qVmzJ/K0RGpOOwchp96pYZwed0vVrHQLgZ+UmZVmzxu2POS/fCCyEHlaIjWnnYOQU+/UME5Pum1lr0Q2OrxRMFP5iT9S+YJ3vHdr4VmJ1Jx2DkJOvVPDOD3ptpEVl0plrStKYM8lCxvNpVvvNZGLEqk57RyEnHp3DOP0pNsGAlfKircEfmZmJrLmispC5QMbLkqk5rRzEHLq3TGM0+NuG4hcKSvdrHzHhplFE7nWrNz6yEWJ1Jx2DkJOvTuGcTrvtosm8L0SiMzMVLeu/SryjqclUnPaOQg59e4Yxumv3bLRLbxUVpqqWYgEKv8hahbNRUGk5rRzEHLq/ZZhnPCoW7B2q7JoIq/ZcO1XFyVSc9o5EnLqfcIwviC48ahbHKx4TWRx66JETc1p51TIqfd/DeMLTXDjUbfg7yU6UZHTzh0hp97nGcYXmqCpjuS08wkhp97vNIwvctr5PCGn3n0KOfXuU8ipd5/+B7w3WJCcBwGbAAAAAElFTkSuQmCC"},{"name":"Loop half of a key","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAACxElEQVRIDbXBTYscRRgH8P9T063ubDCbmXhUCchWfYHn+nyEPQVEEYRFLxHZGY0vI0FcVhQxMfGgoh4UDQa9CBtEzLGudRMUUp8gvhG3dybb3TNd5fRi2IjupifSvx8JG7SJhA3+H+s87iC8ijuQsMG9ss4DWFs7rRT1Tj403s12suyH77eFV3EbCRvcE+v84088nSZz6fLysRO93mQ8uXnzj99+/+W7q98Kr2IfCRsszjr/zLPPA6EoyiLfe/iRUw8eP16Wxa83bownu1e++hyIwhoACRsszjq/vn5mPMl2suz+9L7t7W8A9eRT6wAU6PLlTwElvAqAhA0WZJ1fWzu90uvne5OyKMbjcSdN+/2T3aUlok62u/P1lc8ABURhTcIGi7DObwxendbKIs/zosiLW8vdY0vd7tID3Vk1+/ij91BTQBTWJGywCOv8Cy+eCyFUIcymRT63d2symTx66rFQzbLszy+/+ARQQBTWAEjYYBHW+cHwNSIKoZojhY5Kfv7px2vXruKAAqKwBkDCBo1Z5wfDUaeThFo11+v1i7J85+1zgMKBKKyxj4QNmrHOD4ajJEljjCGE6bQ80etvbb585rmzH35wHlBAxD5hjdtI2KAB6/xgOOokqSIKIZTTcmVlZWvzFdQUalFY419I2OBurPMbw1HSSZM0CVVVlsX7l97C3xQQAQhr/BcSNjiSdX5jMErm0hRAkeeXLr6JmkItCmscjoQNDmedP/vS6wA6SaKUyvO9ixe2UFNABCCscSQSNjicdf6NzXdn1bSaVWVZXji/iZoCorBGAyRscDjrPBDwDwqIwhrNkLDBkazzQMABBURhjWZI2OBurPOoBdQUEIU1miFhgwasuw4QalFYozESNmjMuuvCGosgYYM2kbBBm0jYoE0kbNAmEjZoEwkbtImEDdpEwgZtImGDNpGwQZv+AqztLJD72YmsAAAAAElFTkSuQmCC"},{"name":"Loop half of a key","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAACtUlEQVRIDbXBwWsUVxwH8O/vzVtiYkrc3fYqSGnm/QO/6+9vyKG9CNKD4qVScDBCE0q3pJ6S6kUEKYigCD0pzUG8vuu79OLB9xcEpJLuJJuZ2Zl57SxKLG3irGU+HxI26BIJG/w/1nm8R3gV7yFhg49lnQewtvYlUTQcfpqm6Xi8//z5b8KreIeEDT6Kdf7ixa+17mndO3t2eTAYHh4evHnzx+vXe7u7T4VXMUPCBvOzzl+9+i0QiiI7Ojo6f/7zlZWVosj29vYmk4PHjx8AQTgGQMIG87POX7nyTZqm4/H+wsLCs2e/AurSpcuYefToF0AJrwIgYYM5WefX1r7q94eTyaQo8sPDcRT1hsPPlpaWiFSa/vnkyQNAAUE4JmGDeVjnr1//btoo8sbR35aXP1lcXDxzZqmqynv3fkZDAUE4JmGDeVjnb9z4vp6ZTvM8zyaNgwsXvijLMk33Hz68DyggCMcASNhgHtb5JNkkorpREZFS0cuXv794sYtjCgjCMQASNmjNOp8km1EU1W9Vg8GwKIpbtzYAhWNBOMYMCRu0Y51Pkk2tdQihruuynPb7g9Fo/dq19bt3twEFBMwIx3iHhA1asM4nyYbWPSJV19V0Wpw71x+N1tFQaAThGP9CwgYfYp1Pkg2te1rrqqqLIr9z5ye8pYAAQDjGfyFhg1NZ55NkI4p6vZ4GkGXZ7dtbaCg0gnCMk5Gwwcms8zdv/gBAa62UyrJsZ+dHNBQQAAjHOBUJG5zMOr+1tVOWZVVVeZ5vb4/QUEAQjtECCRuczDoP1PgHBQThGO2QsMGprPNAjWMKCMIx2iFhgw+xzqNRo6GAIByjHRI2aMG6VwChEYRjtEbCBq1Z90o4xjxI2KBLJGzQJRI26BIJG3SJhA26RMIGXSJhgy6RsEGXSNigSyRs0KW/ALKiLJDomaTbAAAAAElFTkSuQmCC"},{"name":"Tooth half of a key","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAACmklEQVRIDbXBwUsUURwH8O/vubuEeLGDEQQdhJ13Egp+p+D3t0SwSYFpBzWEkhCiIqigQ0LUzZMHiS5RiD28yCPQg4JDJEgl6Kqt68w4466vZkkKyhqD+XxIWCNPJKyRJxLWyBMJa+SJhDXyRMIaeSJhjTyRsEaeSFgjTySskScS1vgrY30cEi7jmEhY42jG+gMDN4Ig2NnZXlv7ZMyMcBnHQcIaRzPWHx6+HcdRo7G/kVqbnn4jXEZmJKzxJ8b6ACqVPiIAVCwWiNTWVnVzs/r69SvhMrIhYY3fGOtfvFhpNJpoIaJisVQoFNvb22u1ry9ePAWcsIcMSFjjF8b6AC5dugKgVtsulUpJkgCuVDrR2Xny1KnTX758Hh9/CCjhMjIgYY1DxvqXL18DHADnUK2ud3R0NJtN5w6I1MTEcwC9vQPj44+QUsJl/AsJa7QY61+9et05h5ZGo1mtrnd3l6MoSJJ955rPnj1BSgEHgAKcsId/IWENwFi/UumjFqXoO+dckKpvb28yX4jjvTAMlpYWZmcNUk7YQwYkrAEY6w8O3oqiMAyDIKjv7tZ7es5H0V4YBvV67cyZs4VCm1Jti4vzU1OTgBP2kA0JawDG+mNjD+I4jlJhGAa12teennNhGK6sfJicnADQ3z+8sPB+ZuYt4IQ9ZEPCGi3G+qOjd5VSSRJHURQEuzs7ta6urseP7yGlkDpASgmXkQ0Jaxwy1gdw8+YdpVSSxPV6fXX148uXk0gpwAGElBP2kA0Ja/zC2GWARkbGlFIbG+tzc+/m5+eRcsIeAGOXhT1kRsIavzHWHxoavX9/FD8owAl7OD4S1vgTY3385IQ9/BcS1jiCsctoEfbwv0hYI08krJEnEtbIEwlr5ImENfL0DSzpLpAdxBUJAAAAAElFTkSuQmCC"},{"name":"Dragonstone helm","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAFIElEQVRIDbXBe2xTVRwH8O+57d2ySWcn4HQSFaO9RzTE18/Hgr+YGIRpiIkPjI8Rg2KCM8SA+gfERzRooi7GaEREiArxQWZQFlDURDwOzDxIjEiVM8jqmKNd69r1th1rt16lccnIVqh/+PkIJon/QmnDFEKJ0oYphFMSTBIVU9q0t/TctXk2U0hps3Hxvoe2XsMUQnmCSaIySpv2lp5IKvxEx20ANi7eF452talWwGNyUIZgkqiM0qa9pSeSCtfXNAAIR7sAtKlWwGNyUIZgkqiA0qa9pSeSCgO4rKEpHPsBQP9QT5tqBTwmB2UIJonTUdq0t/QAiKTCAI65kcbAbACrOm4FPCYH5QkmiVNS2uxcmgAQjneh5JgbaQzM/u7INgDbwxuYQihPMEmcjtJm59LE0aFulJi/9quLv48f7o3s3gt4AJgclCGYJE5HabNzaeLoUPdn13UUsrnjmexI2j0+OOTGBiKdPwFgCqEMwSRxSkqbzh3b0582vU3rR1JuIZvLZ7I3jFb1/tkfi8dvyC2P+Y5s0s8xhTAVwSRRntJGf/3lq4nD+dzwaG44nx1eUKh23cyf0ehQOh0fHIzGYuFD3YAHgMlR2gBgCmGcYJIoQ2nz2LxXm1vPnXZGbS6XczPZITedSqf7+49lcrkh1x38RzK5/8BBjHvzph/zgcGVHQuZQigRTBJlKG2W8Mq6YuP8R2ZkcrlMNutmMul02s1kvt11AEBm2D3/koE7/DtQkg8MAljZsRDwmByUCCaJqSht6OEHLzVn1RUbo0N/oCQx9kdxbAwl/alI043JXd8gluprm6ei/t/ODcxe2bEQ8JgcjBNMElNR2tCypZceCgLoTRzGuOLY2IJbjsST+UT8uGXBb/l37IksuWL9K7uX4wSPycEEgkliKkobz3sA8WzLHRckMwPZfAbAPXdG3Gz+rR+Do4UxoAhYt5wd29QRASzAA8Dk4GSCSWIqShs0zAzW1FTX1v764QV/DRb2dCZe6pyB0eKimb35/OjnfWfB8i08O97+faT1ko/X6vsAMIVwMsEkMYnSZplq33D38mCgprqqFlU+27Lh88ECbNtv+YFi2/0jq7fXP7sg+dRafe95H3Slt8np177TtYYphAkEk8RUlDZomBkMBKprquCrsi0LPsCy/bYPfv+7y0ZXfHLmI1f2vfk2EiMHnr5coeRQYc87XWsAMIVQIpgkJlHaAEU0NDQEg6iqgu2zAfgsWLbftuG3auvPfPy6oy+/NjYtcPTnw2lM0DZvN4BVnTcxhQAIJolJlDZAMTirobpuOqp8gA+AbduwLb9lN14tH71o/3MvFgA4zsDBX6Y3z1mybu9qnMRjcgAIJolJlDZAMThrVnV9HXy+2M8HMe6rLdcDeHSVC8BxBpLpkZvtDZu7n22eswQl6/auBjwmByWCSWISpQ1QDF54YSrSixM8/Et8+0nTilUFAMOFHF2V/OiHDFJpnMRjcjBOMElMorRBsA6pNOABYHJQorR5b+0VbetslIyhGO77CfAwAZODCQSTxFSUNoDH5GACpc3G5+e+sWlafnTk1tuS0YHjW7b1Ax6TgzIEk0TFlDbrnp67fvO0+c3RHR31sy7q/UrFAY/JQRmCSaIyShu1tWnFU5jfHP36i3MW3R5/4fVuwGNyUJ5gkqiM0mbn+9dH+tzEYP6Ztm6c4DE5OCXBJFEZpc3aJ+WaV37HCR4AJgenI5gkKqa0ATwATA4qI5gk/k+CSeL/9Ddw31OflLpqQgAAAABJRU5ErkJggg=="},{"name":"Dragonstone hauberk","base64":"data:image/png;base64,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"},{"name":"Dragonstone greaves","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAFGUlEQVRIDbXBfWyV1R0H8O9pvUibka6Bi7yoCerucxIiNrif3ZrymxgtMQSh09jE9yjQSGCBJf5B3LJpFuYfDolZMvdiZhbnVmMFcRN5UcuxvuAhDYaEeE+rXli59LaD3j695T7vZ7uNTSC02mr4fASTxHegtFnupHuyQ0wZTEYwSXwrShsALY2LghC506VcwWXK4BKCSWLmlDZb715aWxscrFkBm6zNPvZCdnV/wWXK4GKCSWKGlDa/bZdeEB/t9Udobdv8BdmjPoA93bv6Cy5TBhcQTBIzpLT5zQZZ9uOVa3f8+oP3kzgunjwZ/18QeceO9BdcpgwmCCaJmVDaPLRx/ZLwcE+vP9zYCmtXDF5b18+n6ve+4+mW2h/v7t7ZX3CZMhgnmCSmTWmz6Ylt7vBIqe+QH+FHt7YfHBv46acbRoOzCeJ/1v1u9eDDVdT11luvnMi5TBkAgkliepQ2G7f9DMBocWTs8/eafvLgv8ZGkcR3HL0HwNi1+vD3e8NyOfHD4JN9J/pcwDI5gkliGpQ267dsApAApRG3nFPE7QfGBpIkRmLjJEESJ4mFtStnzd739svH+1zAMjmCSWIalDaPbGqHTUZHRgF4pz7877JV1bNmIU7iJIFNtjbc/IcXnvbD8Ko67O0eAiyTA0AwSXwTpc2D7euttbC2NOLmeg4vXlAz/MM1YdlbVXd1Vex2q44kxqJ58AN0duUBy+RgnGCSmJrShimjtLlv/SM2sadzJ91isSqVqq6ufrytbU/nc2GEMIyiGNek4YfwgnBv9xBgmRyME0wSk1HaAOhYF7btSd370P1hFEVBMJA/E8dxzxHdyM3VVVXemb4ly1eUSqUwCJI47jr0Liosk4MJgkniEkqbB2jDy/rPW2/7xawrrrx+1eyOQwfOFYaO9RzDuMbmJgALFy/2fX92zZVBEPy78w3AAmBycAHBJHExpU3HurBtT2pL69KF87aNnCqMDS0+6D2TPfEZYFEhWtasnr9wQRj4QRBGfvBm527AMjm4hGCSuJjSZvPyl05vGoz+9vvNGxf1vL9x+x8fRYVFhbhz3V3z5qdLpZKNK958bTdgmRxMRjBJXEBpA+DOZ5+6Yu+LQRT5HubWorM7D1hUiDV3t9bPn1c8O+yVy1EUvbtvP2CZHExBMElMUNq8ctf5v6/cWb37T1/my+n61MBQ6UTOBSwAJkdp89Lzu9746KOzQwXfC450fwhYJgdTE0wSE5Q2z7T/9ePsr8pBVBgsxUAQIZtzAQsIAH/ZtbPn9TPD5XP/0C+iwjI5+FqCSWKC0qb1tus8LzpzthjHCDxk+13AAqK5Ib162VyveguAo//pvKn6jh37twOWycHXEkwS45Q2P793WW++mBsoAjje56LCAqK5IZ3EmDOnpuxFK296Msy7O/ZvByyTg28imCTGKW02ty7tLYzmB4vH+1zAokI0N6STGPV1NWU/8rwwP/f6XNfHgGVyMA2CSWKC0qalcdGBI3nAMjkAlDZNN6ZjYE5tyvPDkcwtraO3Pr3vCcAyOZgGwSRxAaUNYJkcAEqbphvTMVBXmzrvh+eW3LIq1fTcq08ClsnB9AgmickobbghHcUYLaP+e6nbl/8yNj94qvt2wDI5mDbBJHEJpU1by3VBAC+Kyuejrp48vmKZHMyEYJKYjNKm4Ya0c/Wcjq4vAItxTA5mSDBJTEFpgwrL5ODbEkwSU1M6y+TgOxBMEpeTYJK4nASTxOX0PwCpop+4c5ErAAAAAElFTkSuQmCC"},{"name":"Dragonstone gauntlets","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAEgUlEQVRIDbXBX2xTVRwH8O9p79p1Hd2UDaTMSjBrT7ZsIepPQjEnBCeIMDIMkmwgYkzgRR/0jYTog0ReNEQSjPqgMeqDBGMkoIkaQo5mcbmy7I9idgeDlG0MC6a07E97z7nHrLJkC4L1Tz8fJoijnJggjnJigjjKiQniKCcmiGMeaTuC4vj/MEEcc6TtHNjbePD9YRQJiuM/Y4I4iqTtrKfo87uW/PrzpDEYOJc51Z1GkaA4/i0miKNI2s6mZCxcaT3UEjjbnwXQ0hQ+25eZnsF3vWksJCiO0jBBHIC0nY3JWCiASDi4ZUvk0vBkT28WwCOrIj/1XXcVjIe8C6Wh3Hxeo+dcVlAcJWCCuLSdDaujVSErGLBqw4Gurnv7e28YYHAgV1DK1SgoBC1cyyEcdA3geTjxQxowAAMgKI47Y4K4tJ2tIhaqtMZ+y92/ZNHubUsuT0z1D2RcDVcrpVBwEQlbEzdQG1LGwFX47PQ4gGNvPnzPsoondv4IQFAcf4UJ4tJ2drStDAb9BVf7gH2d9y1uCLx1ZEwVdCigqkNW3lXGIJ216iNKaeSVOj/qRhdXdHYs9zPUNQS3vCAzGZ+gOG7DBHFpO89ubrw4llmxrNbV+pU9Ue3hw+PXlNaPrw0rjS+//d14qA5Z9TUouGp4XNXVYPtTy09/f/XJ9UsZ8y99INC2+UwGPkFxLMQEcQDSdjYlY3U1wYLW+/fGCq43k1eT096xr667Sk/nlatwQqYAHNrHh1JZANVVFoq2bowy4PV3UrJvFPAJimMeJogDkLbTsS62KBR0RjM9g2kU1cLb0dFUcPV0Xl++museTAPY2x4zQPuGpX6f3+fD5yfHAXQ93XD004mLE7nec2nACEpgDhPEUSRtJ9lSP1XIa43B89laeADWJldMu2pmxu0eTAM4/GLz8FgOBps3RE9+M46indtiyvMOvXvJqrD6hzOjV7OC4pjDBHHMkbZDTfWuzvcNZWvhrUk2aI2ZvCv70oAB2OGXmi9dyXkGf/I8GIOd22OexsH3UsEAMhkl+8YBIyiBIiaIY460nVp4ANYkG3ywXK2+6RnHLINZ7OjLzeFQxcCFrDHwPKUNnntmhdbea0dGrAqrwgKD9cWZEcAISqCICeKYR9pO+2Mx5oNWONWdAgxmMQBdbdGqqkiyOfDLyE3PwHhYFY80t0QM8Gin7BAxDzghU4ARlMAcJohjIWk7uMVgFmtP1kfrQjXVljHITAfWNlUOXMi2Phhpbo3AgDolYACGWUZQAvMwQRy3kfYQbmGdbdFliysr/IAPnof0Db9oDfmYr7k1cuSjKx9/PQwYQQkA0h4SlMBCTBDHXUnb2b9rJQAGKA9TeXWzEFzXEt7zRh9mGUEJ3BkTxHFX0nZWt9S3rVoE+JXWU3k1OYMPTqUAA0BQAnfFBHH8HWk7B3Y3MkB5empGvX08BRhBCZSACeIogbSdV/c0ukof+mQEMIISKA0TxFEaaTuYZQQlUDImiKNk0h4SlMA/wQRxlBMTxFFOTBBHOTFBHOXEBHGU0x8HKgefqPtlsAAAAABJRU5ErkJggg=="},{"name":"Dragonstone boots","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAFbklEQVRIDbXBX4hc1R0H8O+d2c0mu85mqjPuZt2WMdh7bw3CsuXXSLv8kGmxWNtCQRRffGhj1+hDFVqp27AEH1po33wrBRUJ/bPavBRJY4OEg4TKkXXTxcQ5HdNtnGSdP7ubvfN/7j3ndDsyNNNJCqbs5+Mw+fg/CKnQxeTiRhwmH7dKSJWZGE8ksGM1HwBgctHPYfJxq4RUmYnxRAKfaraQLwRMLq7jMPnoJ6QCwOTifxJSJWGSE0kAiQSaLcSHkFsLAMvkocdh8nEdIVVmejyxF6v5AACTi5sQUj0wOwVgZbmQmk4CiAO5QgBYJg89DpOPHiFVZnocQGIvPrWaD5hc3IiQ6oHZKXStLBe8+ybiGuculAHL5KHHYfLRI6TKTI8DSOzFjmoLa4UAsEweBgipHnvwIIBipQUgcdtQpxmdllcBy+Shx2Hy0SOkytLUpfVaYi+aLezIFwLAMnkYIKR69BsHnRhiDna02nj/YmVkZjZ3+iyTix6HyUePkOrxbx4sllvLy4XUdDI+hNxaAFgmDzcipLo3M36fm4o78Ujrua//4Dfvn1tdehOwTB66HCYfXUKq5x45dDVoAogBV0rVSONyqV0oBkwuBgip3lr6/S8//OB5/xCA6bvu+uHrJxrbm8uvvA5YJg9dDpOPLiHVc48csgAs1qtNa1DabJ1dvgpYJg8DhFSHn55PTN5posiEYRRGsZhu14NGsbL6xptMLrocJh9dQqqTr7587PizD3758xZY325eq7bU2D1rbwsmFwOEVIePPpk4MGmiyIThyPi+dr1m2s1aubL86huAZfIAOEw+uoRUj554qV7afiJx5/Dw8LHjz+6Z+1atXMmfPgNYJg/9hFQ0fyQWj4+lbjdhOLJ/VLfbRrfqla1qsXzhj6eYXAAOk48uIdV3Xvr5SHK0Xto2YXR85v5n/vC7+sZG7k+nAMvkoZ+QiuaPxGLOWDo1sn+fiSKrNRA1Nq/VSuWV104ClslzmHx0Camyiy/c/sVJq02tdM1G0dY/rtQ3tzZUvrj6AZOLAUIqmj+SmEjvS45+/3NTkdbpO+7Y3NqqbG4+9ePnAcvkOUw+uoRU2cUXUu6k0cZqUytth/VaWV1uliv5t88ClslDPyEVHT0y+aWDz0zc/aMTr2GHMRT9vd6OZJAsLP+NyXWYfHQJqbKLCyl30hhttTHa1ItbtVJ5Q63lTv0FsEwe+gmpDh998lcPPfzUKy/PNC5aq28b3dNq60Zbx2NYOnMJsA6Tjy4hVXZxIeUdMEZbbUykX3TpnJS/Pv/elffOFy98yOSin5Dq8NPzI389+YWJpDGwQGJfvBPqRlsDWDpzCbAOk48uIVV2cSHlT/3C/crw0FA8Hs8u/BSdSIfhPPNPjr8IWCYP/YRUczPpuw8kLbB/LB5qhJFutLUFlt66BFiHyUeXkCq7uPDbxx7PHvsZLO43FyON8lY71FEnhFi+ClgmD/2EVHMzaQCZA8n9Y/FQI4p0YnTPn9/9OLcWANZh8tEjpLr3e9/NDn+ktY40Iq0bbb2x1eqEuLxeWysGTC4GCKl4Ng3AGBgNDYQaYae9mg8A6zD56BFSzc2kvz2X+fiThrE60mi2da3ergRRoVJbKwSAZfIwQEjFs2ljYACt8e5qGf9mmTyHyUePkGpuJg3g4a9lCsVqpNGJdLWuP9msvrNSBiyTh5sQUuE/LAAmD4DD5OM6QiqeTT/01Yy1MAb/XK/Wmp3zH1Uu5APAMnm4OSFz6GLy0OMw+egnpOLZtDHYYYCwg1BjJVcGLJOHz8hh8jFASIX/Zpk8fHYOk48bETKH6zB5uCUOk4/d5DD52E0Ok4/d5DD52E0Ok4/d9C/wgdmdYsaJigAAAABJRU5ErkJggg=="},{"name":"Lantadyme seed","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAACU0lEQVRIDbXBsWscRxTA4d/bkw4TwuIuTeqbh8GN4V0hzLvgzmUwOBDyL4aAIV0w3BQG3TQGg7ndKoUaNWFziiyf1jsTLDAoBFt7JPt94qZMSdwUWG+23Fgtlf+VuOl6s10tNaYGKKWslsrhYmoBtwX/JG4KxNS4BWC92YqIW+AQMbXfhvxXR3deAW4LPhE35ZP1ZrtaakyNW2C0mNoHj+vZnNkR1+/Y/dGdva3cFtwQN+XGerNdLTWmxi0wWkztwyf18TGzOUMm77m66Lpzzn+v3BaAuCmw3mxXS42pcQuMFlP76Gk9O+L4iAEo5IH3l1xfds1pBcUtiJuuN9vVUmNq3AKHiKk9eVYjVBU5Q2Ho6Xv6PW9e7qC4BXHT9WbLLaulMlpMrf9QU5Ez+QNDT9+Te17/toPiFsRNgZgabnELjBZT6z/WeSB/YOg5fbHjo+IWAHFT/rOYWuDkWf3q5x0UwC1wQ9yUQ8TUui34l5gaEChugVvETRknpha4/03uzivAbcEI4qaMEFMbTvJ8fn825+rP7rLjrKncFtxF3JQRYmofPqm/+po80O+5uuguO86aym3BF4mbcpeY2kdP63v3oGLIMLB/x9VF15xWUNwCnyduyl1iak++r6s5FHJmGOjf0+9583IHxS3weeKmjBBT+91PdR7IPf1Avib9uoPiFvgicVPGiakFHj+vc8+rX3ZQ3AJ3ETdltJgaED4qboERxE05UEyNW2AccVOmJG7KlMRNmZK4KVMSN2VK4qZMSdyUKYmbMiVxU6YkbsqUxE2Z0t/k/A2Qid6bdQAAAABJRU5ErkJggg=="},{"name":"Calquat tree seed","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAB9ElEQVRIDbXBPWsUURQG4Pf8lRR7DwhBkJPyBOzsLERBRFDs7CwsxMZCf4atlZA6hTCXsOBcsAyTKSwsUrjmczMzO/djR9jGajMjzDwPqTCmRCoMIMuL/T3GBEiFs7wAQEQqBmMjFQaQ5QURqRiMjVQYQJYXRKRiMDZSYQBZXhCRisHYSIUBZHlBRCoGYyMVBpDlBRGpGIyNVDjLC2zs7zHGRioMwLoTbKgYjIpUGMNYV2JDZYbBSIUxgHXl0/s7tY+/z5v58UJlhmFIhdHHuvLVA07r1IZ0UcXzy+b7yUJlhgFIhdHHuvL1wzsxJe9T1aZlE6+Wzfx4oTJDH1Jh9LGufPNo18fkQ/Ix1W1aVvGqaubHC5UZbkUqjD7WlW+f7MYEH5MPqQnppm6rOh7+OAU6FYPtSIXRx7ry/bO7PqxDQohpFVLd+NrHg6NfQKdisB2pMPpYV354fi92qfXrEOFTahrfhPTl20+gUzHYjlQYA1hXfnwhbVy3MXm/Prv4U/nw9WgBdCoG25EKYwDryk8vZXl9FjuEhMub1WUdDuYLoFMx2I5UGMNYV757vAOgDbioVp8PT4FOxeBWpMIYzLoS/3QqBn1IhfE/rDvBhorBAKTCmBKpMKZEKowpkQpjSqTCmBKpMKZEKowpkQpjSqTCmNJfScgBkH9MCj4AAAAASUVORK5CYII="},{"name":"Calquat tree seed","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAB90lEQVRIDbXBMYvUQBQH8P/7MLfzQBBB3mH1rrGzsjoQESzOzs5KEAuL8zvYWwhirdhkWAQz5cGRS2FxxTZ73rHuZpNMZhJhG6u9REh+P1JhTIlUGECSZkeHjAmQCidpBoCIVAzGRioMIEkzIlIxGBupMIAkzYhIxWBspMIAkjQjIhWDsZEKA0jSjIhUDMZGKgwgSTMiUjEYG6lwkmbYOTpkjI1UGIB1F9hRMRgVqTCGsS7HjsoMg5EKYwDr8qcPD4qqXq7K+dlSZYZhSIXRx7r8xSNuW1Qx3qzqq3X583ypMsMApMLoY13+8vGdEGPdoKz9nyKs1uX8fKkyQx9SYfSxLn91fLcJ0TexbmJRxk0ZVttyfrZUmeFWpMLoY13++sk9H9omRt/Eoo7bMq7L6qtbAJ2KwX6kwuhjXf722f0mRB/apolliNsyFlX9ZX4JdCoG+5EKo491+bvnErvW++hDWzex9HFb+4/ffwGdisF+pMIYwLr89ER80/oQK99eX18VFT7NF0CnYrAfqTAGsC5/f/Jgs/od2+gjboqw2oTPPxZAp2KwH6kwhrEuf3N8AKAO8WYdPny7BDoVg1uRCmMw63L806kY9CEVxv+w7gI7KgYDkApjSqTCmBKpMKZEKowpkQpjSqTCmBKpMKZEKowpkQpjSn8Bge4DkJyR+ckAAAAASUVORK5CYII="},{"name":"Papaya tree seed","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAABQUlEQVRIDbXBIVMbYRiF0ecCOrYGgejwvVN/kZffvit3/0CSqUBgcBkcQzJpSU1NaOjsd47ioifFBQzT+vGh6EBxDdMakBQ3lqa4gGFaS4obS1NcwDCtJcWNpSkuYJjWkuLG0hQXMExrSXFjaYoLGKa1pLixNMU1TGtOHh+KpSkuYJw3nMSNRSkuelJc9KS46Elx8RXjvOUv8T2fUlxcbJy3d99WnOzeduzYcRXfc57i4jLjvP1+u7q+gT2/vb2zZ/f8cgXHuHGG4uIy47xtt6vrG/447Hl75+nlFY5x4wzFxWXGefvjbnV9A3sOcIDN0ysc48Z5iouLjfOWk3a3Ouz5+fwKx7hxnuLiK8Z5wwfx4Rg3PqW4+C/jvIkb/6K46Elx0ZPioifFRU+Ki54UFz0pLnpSXPSkuOhJcdGT4qKnX70CaYGxZzKqAAAAAElFTkSuQmCC"},{"name":"Palm tree seed","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAACCklEQVRIDbXBMWvUYBgH8P8DfpZ7ny/wdHzq5uIiOAiCguhH6OLgoOCko4JXpw46WYfiIBQhL4KSd6lbLsVBrK3e9Xrn3SVv0lyMcIvTNRGS349UGF0iFQYQhNHmBqMDpMJBGAEgIhWDtpEKAwjCiIhUDNpGKgwgCCMiUjFoG6kwgCCMiEjFoG2kwgCCMCIiFYO2kQoDCMKIiFQM2kYqHIQRVjY3GG0jFQZg3QArKgatIhVGM9bFWFHpoTFSYTRgXfxy6/Jklh0eT/t7kUoPzZAKo4518e7DK8vyz8IX34fzryeznfeHKj00QCqMOtbF+0+uZkWZ+OJsfj6cJEejZPtdpNJDHVJh1LEu/vTsms+KJC8TX4zn2Wjqj8dJfy9S6eFCpMKoY118sH3d52WaF2leThf5+Hc2nKSPXx0AlYrBeqTCqGNdPNi54fOlz8s0L+ZpcTbLx7Ns68VnoFIxWI9UGHWsi7+9vnleVok/T/My8cU0yafz/N5TC1QqBuuRCqMB6+KTN7dSv1xkReKXX47KyTy9/3wfqFQM1iMVRgPWxb92bw9Gl4plmeXLH6ezn6eLB/0PQKVisB6pMJqxLv7YvwtC6ouj0ezOo7dApWJwIVJhNGZdjH8qFYM6pML4H9YNsKJi0ACpMLpEKowukQqjS6TC6BKpMLpEKowukQqjS6TC6BKpMLr0F2VKBpDK0/RkAAAAAElFTkSuQmCC"},{"name":"Money tree seed","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAABsElEQVRIDbXBsWoUYRgF0HsTKwUbO4UUFjtfKYSb8qb0AXwDm4CNL2CjFlZ24gOIjSIIgqSxmSlnamEyhigRAibYRIlukpkxLCyuqMVu5j+HViAlWgEgL+v1tUACtCIvawAkrQxDoxUA8rImaWUYGq0AkJc1SSvD0GgFgLysSVoZhkYrAORlTdLKMDRaASAva5JWhqHRirysMbG+FhgarQBQVFuYsDIMilYgJVqBGUXVYIY1wvnQCkwVVfP4ztWjH2h7nOk73H+2Z41wDrQCU0XVPLm7sntw4f3e6cqVi22Hz1+PNotda4RF0QpMFVXzaCOOxu0xLh2PT047tG379FUN9FaGhdAKzCiq5tbN63Ht8slJ1/Vou/bT/rfX73atERZCKzCjqJp7t28sn1nCz3Hbdt3Hg+8vN3eA3sowP1qBPxVV82BjdXl5aXzc9V3b9djeP3zxdscaYX60An8pqgbAw43VrkffY/vL4fM3H4DeyjAnWoF/KaotgPittzLMj1bg/4pqCxNWhoXQCqREK5ASrUBKtAIp0QqkRCuQEq1ASrQCKdEKpEQrkBKtQEq/AA4pp4GsNKL3AAAAAElFTkSuQmCC"},{"name":"Grimy torstol","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAE20lEQVRIDbXB3Wsc1xnA4d971uq6mCqT1JuJZBc3bdiZyyB4ZRDilRFCRhiJhIRe9o/rnYOLjYQxWoTxDsLgPWB6uRp6kbb+6GgNGasNliXvOR2JqNjYqd0LPY+Y5vyfCl+advkwYpoD/cFwYTbnRH8wXJjNeZfClywFtpxplw8gpnl/MARExDQD+oPhwmzeHwwXZnPeVPiSq4EIPQfRNON9xDQH+oOhiJhm/cFwYTYv/I5p1h8MRZxplxOFL7kaFkfJ3fM1PWfa5X3ENAf6g6GImGb9wVBETDOgPxiKCIhpl2OFL1kJi1Vyt1Oz6SCaZoUvTbu8qfClaRcQ0xzoD4YiYpr1B0MRMc2A/mAoIsxHth1g2i18ybWw9DTZmqq57SCCLGun50emXY4VvqSxFNhypl0xzYH+YCgipll/MBQR0wzoD4YiwnLkOTN18nBnj8ZKWKrSrQsVGw4w7Ra+hGiaAYUvmQv8As7BbQdRTHOgPxiKiGkG9AdDERdjEHEQuRb5kcu7yYPz9dyz5P50vfw87U1VrDvWAuvOtMuxwpdo4Jcs/ju5e6nmpoMopnl/MOTYwmwOFL6MMYg4iCCsBQ6Zf5QA253aRsnZs+3eZxWNF7DlIJpmhS9pzIX5fyXbv69pw3UHUUxzoPA7HDPNCl8uzXS2Hu6CmHYLXy5rp/dpxSFHhKVRunWh4gfYdlwJ3HM0LgceOCwsv0h7n1d85yCaZmKa85bClxyJIMva6Z2vaASOOJafpQKbUxUNx5Xvk3tJzSsYsXguufu7mhuOI9E0E9McKHzJa0y7hS8hggBLM5NbUzWBxlKVuFZbAMfmbyuuuytfTt77pOYVtpeca7fvTFU0Aqw7066Y5oUvWQ28hAM44Mvd5C9/3WM+sO24FmhBCxwcwpjl3TSMcS16FysOmP97sj1d25PEtWhPtDcvVTRuOI5E00xMc6DwJV8FAuzDPjNV8nCypuGdZpMX07Zz/PnTikOuPkoj9KYqGhH7Pimm66VR4lrt9gQbv6m47vhJNM3ENOdY4Uu+CTTG8AJeQoAf4GO0SvzO3tp8Z326YszKo/TOdMU+jcUqcdCaaJ9pcftixRgCjFl+mvb8yLQrpjknCl+uzXUiBLidVuzDIewz9zw5PMCnNR9BCwTG8JLG0ihxrXbLMTFBIwY27o/4STTNxDTnNYUvaawGzkALxvAKXjL/NDkc86uzbH1S8xEEOKCxvJu2HK5Fy7E+XRHghoMImGaAmOa8qfA7IDS+DTgI8AoO4ZDFZ8mP+zz4ol59lm78ulrZTQEHrsXGdLX6JN24P4JomnFCTHPeUviSbwMOhK8ep8CtzypewSH2OCku1Jxj5W/pmRZhjGshjvXtEUeiacZrxDTnXQpf8l/fBBoCEQ648o/k3uf12igFYmBjulr7Z+rg1vYIomnGa8Q052cUfgeE1YCAAwFHY+VReqbFxqXq68fpzWL0x6vTf9p8wpFomvEmMc35nwpfcmLlcufOgxHHrl3uTExwa3vEkQiYZrxFTHPep/DlTDbZAr+zB5Ejwmpgw9H4Q+A7Z9rlXcQ05wMUvlyb66zfH0EE4evATQeRIwLRNONdxDTnwxS+hGiaAYUvIZpmvI+Y5pwmMc05TWKac5rENOc0iWnOaRLTnNMkpjmn6T+WiBPRPbP1GwAAAABJRU5ErkJggg=="},{"name":"Grimy torstol","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAEw0lEQVRIDbXB70tcVxrA8e85o7HbLOGyZHJjbbfd7e69h75aAo+BII8iMhIk4rKlfbt/Wl+1ZGmJKCE4hKAHEeKBvCzOZRc22Vi9mZQO9peOeu7OTGMxJG3SF34+RsXxG/lQqGS8HqPigLXNLQYmxx2/yoeCRqRpVTJeg1Fxa5tbk+POhxZQVdXkuOMX+FBwPRJhxUKlkvMqRsUBPrRUcmBtc8sYo5Iz4EOhknHCh4K5OL2T3quXrFiVjFcxKo4Ta5tbk+POh5ZKDvhQMBO5a1UyBnwomIszO+nd0ZLbFiqV3IdCJeN5PhQqGWBUHANrm1uT486HlkrOgA8F1yPfg7eASuZDwY04s53eHStZtlCBaUi9GdoqGQM+FPQ0Ik2rkhkVB6xtbk2OOx9aKjknfCi4EenCt1z5OnnQ2qNnLjaepM3RkiULqGQ+FFCp5IAPBRORc3Aeli1URsWtbW5NjjsfWio5Az4UKpkPBQuRY/ieq7vJ/Uuda18nG6Odxjdpc6xk0bIQWbQqGQM+FFyN/I7pvfTen0q+sFAZFbe2ucUpxtgr+YUHrT2VzIeChcghE48SYD3t6NPkjeGR5lhJzw/QtFCp5D4U9ExE/S7x73c4B59ZqIyKA3xocUpDLhnLyv22SuZDMSv1lcslXfosjadpc7SkA94yHbln6bkW2bBonD1IV/5c8pmFSiU3Ko4X+FDQV4GZlfrKpZKeSJ+l8SQ1lpXRkp4aU/9JVv/QoQttps+n9/5actPSV6nkRsUBPhScopL5UEAFBmhIvXm5JIJlZje1YCwW7rxf8qmd+tuF1YsdjpjqJOffHLmdlvzkllXJjIrzoWA+cgCH0OXKbvLg33toxFtuRGpQAwNHEGnspAw0/1jSZeK/yfrbHd1JhmBkZOTOuyUGblr6KpXcqDjAh4K/R3r24UdkJwlJh5779uoHF96+OGLs8Oejj+ky+zglsjJW0hPRR4kf7cyUaa3GuWGW3yv51PJMpZIbFceADwUfRSJU8AP8SF8HEuRJEr7cW5ioL46VVFx/mN55p+QAItM7qa0xbBmqsfxuyTEcwzGN7bQZ2iqZUXGc8KGYn6gDVWT5rZIDOIB9Jr5JDrqEtEMCNajBMezT03iaGhgaZtjScxxZ3mjzTKWSGxXHKT4U9MxHhqEGx3AIB+hXydExb74xcvdiSQLH0KVndje1lqEaNcviWEkF/7JQASo5YFQcz/OhBYaejyIGKjiEI+gy3U739w828s6NMl2+VM7tpBGGahjL0lg5v50urbehUsk5YVQcL/Ch4OOIpWdhOwUWL5ccwhFT/0tW3+nwe+YepjVLFTEWC4vrbfoqlZxTjIrjZXwo+NmHEcsz+0w9Slb/0lnYTYEIS2PlwnZqLLd8GyqVnFOMiuMX+NACw3zEggELBixzD9PaMEvvlf94nH6x2v7n9bc+ufMVfZVKzvOMiuNX+VBwYu5a/fZGm4G5a/VzQ9zybfoqQCXnBUbF8So+FJJfsDXuf7kHFX2GhciipefjyE2rkvEyRsXxGnwo5ifqS+ttqMDwYeRzCxV9BiqVnJcxKo7X40MBlUoO+FBApZLzKkbFcZaMiuMsGRXHWTIqjrNkVBxnyag4zpJRcZyl/wOmVg3RgAmHWwAAAABJRU5ErkJggg=="},{"name":"Iron stone spirit","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAFiklEQVRIDbXBb4gcdxkH8O8z/3b3Lu6NeuldE/tCsTs/jNBXz0Jf9NkrLEIgBWvLKR6J7duWYsUoNRGbYi55I8b4VqgkUH1xzYtW5XwRaWdotZk5rrQizk5aaV+OG+yamN3b2Z35eV1Y3ONu7/LGz4eEFe5ZECUYEa7h3pCwAuCHMUYadYUJfhg36gpAECUAzjz/HIDVS5eJDADCNRyEhJUfxo26CqIWAK11o64w4odxo678MCYyzjz/HEZWL10++73vrl66fO4Hp1/62c+Fa9gXCSsAQdQS9gD4YUxEwp4fxo26CqKWsOeH8elnn3no2LGTzzz72tUrX//OU9d+/fI3nnqayAC0sIfpSFhhzA/jRl0FUUvY88OYiIQ9AH4YE9HFH5994afnieiXFy9kWfb9n7xIRACEPUxHwgojfhg36iqIWsIeAD+MiUjYA+CHMRGtnj1z5vwqEV2+sJpl2ekXzxERAGEP05GwAuCHcaOugqgl7GHED2MiEvYA+GFMROd/9MLZCxeJ6Ber5/tZ9sNzLxGRsId9kbDyw7hRV0HUEvYwwQ/jRl35YdyoqyBqLS+fLJVKV6/+6sknv/3qq78hMgAt7GFfJKz8MMaERl1hzA/jRl0FUQug5eUVxykXRf7KKy8vLi6k6T8BCHvYFwkrAEHUwgRhD2NB1BL2gihZXl5xnFKe51nWv3bttwABWtjDvkhY4SBBlADF8vJJ07SLYpjnRafzyfXr64AW9rAvElY4SBAljz/+Tdu2TdMqiuG2bre7vv46oIU97IuEFQ4SRMkTT3zLshzDoPxTwzwf3rp166233hSuYV8krLCvIEpct9psnjBNyzCQ50WeD/M87/W6N26EnU5buIbpSFhhuiBKXLe6tHTccSwi0zBQFEWeF3k+yLJsY+PPadoGtLCHKUhYYbogSly32myesG3riw98dvZQxbbtQutBfxC9e7Pb7W1sbHQ6beEapiBhhSmCKHHdarN5wnEc78vzc9U5x7ENy7TIGOpiq7v1pzc2+4OtMHy707ktXMNeSFhhlyBKALhutdl8zHGsB780787NVWbK5ZJjGKZhGFrrLBv85273+hsb/X4WhmGn0xauYRcSVtgpiBKgcF232XzMNE3Hsb/6lSOHZiozMxXbdhzb1oDWGA4H/X72+z++Mxxm227cCDudtnANO5GwwoQgSoCq66LZPGEYhmVZ9y9UjiwuzFU/U6qUbcuyTJOIQMjzotfr/W79nSzL8nzQ621tbm52Om3hGiaQsMKEIEpct7q09DXLKtm2ZZrm0cXZI/ffNzs7Wy6XbNu2LIsI2/K8yLLstT+8nWVZnmf9fvbeexv9PjqdtnANYySsMBZEietWATz66HHHsQ3D3GZZ5kPHHjh0aKZSrti27TiWBnRR5EWx1eu/vv6X4TDL8zzLsjt3/v3hh600bQNa2MMICSuMBVHiulUAS0vHHcciMk3TME1TPXjf/Oc/VymXbce2LAsjwzzvfNK5/ua7g8FQ60Gvl21t9W7e/FuatgEt7GGEhBXGgihx3SqARx5plkplwzBM05yfP2wYdHSx7Lpz5VLJsiwChnl++/ad+IN/aa0//vgfw2He73fv3u199FErTduAFvYwQsIKE4Iocd3qww8vlUqVo0e/AIBGDMM4smDPzs6YZJBp/j25VRSF1hpj77+/2Wr9NU3bgBb2MEbCCjsFUeK6h1dWTmGECABtw05aa+y0tnYlTduAFvYwRsIKOwVR4rpVoLSycgoAEQDCQdbWrqRpG9DCHiaQsMIuQZQAcN3DKyunABABIEyxtnYFQJq2AS3sYScSVthLELUAwsjCwmHsJU3b+B8t7GEXElaYLoha+BRhbxpjwh72QsIK9yCIWthF2MNBSFjh/+m/n9FqnwOH6ecAAAAASUVORK5CYII="},{"name":"Iron stone spirit","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAFFUlEQVRIDbXB32tkZxkH8O9zznnfmcnEyZFtElOjgpQ5x7YsevH0pvB0A0NlwYjQ0og0ZW+KtBSKi1KUolKrFyKC/8Be57JacbFriznZFjIntuRCzZxt2uvDWdpp1yRzfrzzujsQTMjMZG/8fEg4xH2L4gQjwm3cHxIOAWx29554LMRkUZwAePXqyxh5/fd/ACDcxnlIONzs7gEgIuEA40Rx8urVl3Ga8tQvfvs74TamIuEQwGZ3j4iEA4wTxcmPX3rhW488Wq/XlVKu65Zl2fvow1d++TpghQNMRsIhgM3uHhEJBxgnipOrL/5wfv4B7SnP8xyHyrLKi+Knr/0asMIBJiPhEMBmd4+IhAOME8XJj154fuGBeXWPR+QUZVEU5c9+9RvACgeYjIRDAJvdPSISDjBOFCdr3/vuxUcfViMOOUVZ/OTnrwFWOMBUJBwC2OzuEZFwgAmiOFlbe05rZYwpisHW1ttpmgFWOMBUJBxudvcw8sRjISaI4mRt7Vmta8aYPB/cvPl2mmaAFQ4wFQmHAKK4hxHhAONEcbK29qzWNWNMURRbWzfSNAOscICpSDjEeaI4AYbPPPOc52lrK2NMv//JW29dB6xwgKlIOMR5ojh56qnve552XceYoTHVwcHB9et/BKxwgKlIOMR5ojh5+ukfKKWIyJjKmGFVFbdv37558+/CbUxFwiGmiuLE91udzqpSHgBjzHA4NKY8PDzc3u72+5lwG5ORcIjJojjx/dbKymWtleO4uGtojTXGVIPBYGfnvTTNACscYAISDjFZFCe+3+p0vqO19/WvXWg2G8rTQzssyzJ+/9bh4cHu7k6aZsJtTEDCISaI4sT3W08+uaq1Ch5anJtraa1cx3Vdx5jh0WBw452dPC+63a1+/3PhNsYh4RBnRHECwPdbnc6q1ip8aH5ubq4509C1mus6d9nhsCjL/xwc/PVvO0WRb293+/1MuI0zSDjEaVGcAEPf9zudVaU8pdTFh5ebzcbMzIyuKe0pexdQVVWe529ef68oyqLIt7e7/X4m3MZpJBzihChOgJbvo9NZdV1XKW9pof7lB5dardl6va6Up1wPRCAYMzw6Onrjz+9WVVGWZZ4Pdnbe7/cz4TZOIOEQJ0Rx4vutS5e+rXXNdV3P85aXmktLi1+YbdYbDeW6nvKICIAxJi/KN97cKoq8qqo8L3Z3uwDSNBNu4xgJhzgWxYnvtwCsrFzWuuY45Lqu8tQ3L35lttmsN+o1pbTWFtYOh5UZDgaDP/3l3bIsq8oURX7nzp39/X+naQZY4QAjJBziWBQnvt8CsLJyWSnlui4ReZ73jfbi/IUL9UZN3eNhpDLm008/u/HOTlVVxpg8HxweHt269c80zQArHGCEhEMci+LE91sARDpaN1zXdRxaWFggcpe/VPe/OFevaaUUAGPMZ5/f6X34ibX244/3jSmPjgaDwcH+fi9NM8AKBxgh4RAnRHHi+63HH7+kdWN5+asAHAdEDhE9uFCbnZ1xRv6V3LYjOPbBB//o9XbTNAOscIBjJBzitChOfH9+ff0KRhwHIw4RAMKItRZnbGxcS9MMsMIBjpFwiNOiOPH9FlBbX7+CEccB4GCqjY1raZoBVjjACSQc4owoTgD4/vz6+hWMOA4AB+NsbFwDkKYZYIUDnEbCIcaJ4h5AGFlcnMc4aZrhf6xwgDNIOMRkUdzDPYTxLI4JBxiHhEPchyju4QzhAOch4RD/T/8FuP86n8M7l60AAAAASUVORK5CYII="},{"name":"Coal stone spirit","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAFVUlEQVRIDbXBT2gc1x0H8O/vvZldyU42A6maQ3psd17JpZefIIf8pMBSMNiF4BK3USwoJSmklMSnNPEp2FJ6KG3SP7denPQUndqLLzF0BrXgGWHqBMPsuBaK4zQe1tBtQrTanXnzam9ZKiGt5Es/HxI2eGhxmmNMuI2HQ8IGQJRkC/MGQJRkmFiYN5iIkoxIvfnazzC2+s5vAQi3cRQSNlGSASAi4TBKMiLChHAIIEqy8+deXfn1u+fPvYoJ3/Pf+uWvhNs4FAkbAFGSEZFwGCUZEQmHmIiSjEgB7r3f/+7sKz/903uXlNZlWeabm29cWAGccIjpSNgAiJKMiITDKMkwtjBvMBYlGRGd+8nLX5+b+/mFi0T0m7dXR6NRWZZvXFwFnHCI6UjYAIiSjIiEQwBx2gXgnFuYNwCiJCOi115+aW5u7s2LK0T07urKaOz86i8AJxxiOhI2AKIkIyLhEBNRkhGRcBglGRF9/3unvvPUU+dX3yaid1YuDkej19+6ADjhEIciYQMgSjIiEg6jJFuYNwCiJCMi4RBAlGREyrl6efml99//w+nTP1xfv1IUPcAJhzgUCZsoyTC2MG8AREkGYGHexGlXOMRYlGRnzpz94IM/vvDCj4bDnfX1K0XRA5xwiEORsAEQp12MCYcA4rQLQDjERJzmgHvxxR9ba0ej4fr6laLoAU44xKFI2OAocZoD9fPPn9Xar+vK2rrf/9eHH14GnHCIQ5GwwVHiNH/uuTO+72vt1XV13/b29uXLfwaccIhDkbDBUeI0P336B57XUIrsA5W11b1799bX/yLcxqFI2OBQcZoHQavTOam1pxSsra2trLWDwfbVq0m/3xNuYzoSNpguTvMgaC0unvA8TykiUg61raq6tqPRaGPjb0XRA5xwiClI2GC6OM2DoNXpnNTa+/TTLa/R8BTVQF3Zxx4LBoPBxsZGv98TbmMKEjaYIk7zIGh1Oie19j77/PZMo6m0R4qUUnVd27JsNmfKcpQkf+33vxBu4yAkbLBPnOYAgqDV6ZzSWn/2+e2ZRlP7vudpQCkCHKralmU522wMh1WSJP1+T7iNfUjYYK84zYE6CIJO55R+QP3z7p2G3/Q9T2mllQZQA662lbUzjdmqGt139WrS7/eE29iLhA12idMcaAUBOp2TSimt9ebmzeOPHm/6s56vSWlFRAAUXO3KqpxpzJZlZW05GOxcu3at3+8Jt7ELCRvsEqd5ELQWF7/reU3f94jo1tY/Hn3kuO83Pe1ppUhrjLm6ttY2G7NVNbJ2NByOrl/fGA7R7/eE25ggYYOJOM2DoAXg2WdPNBq+UpqIlNJ3797xfd/zfVL6PgCuruFcacuZxqy1lbV2NBp9+eW/b93qFkUPcMIhxkjYYCJO8yBoAVhcPNFoeERaKdJa376zNTt7zPN8rUmRxljt3HCwc+zYI9ZWzpWDwWhnZ3Dz5o2i6AFOOMQYCRtMxGkeBC0AzzzTaTZnlFJa68cf/xoR3bhx3W82Pc/XRAAc3HBYtr9lAHzyyWZV2eFw+6uvBltb3aLoAU44xBgJG+wSp3kQtJ5+erHZnH3yyW8AICIARPTxjb83/AZApND+5redc9jlo4+udbsfF0UPcMIhJkjYYK84zYNgbmlpGWNEAAj/RQQHwOEga2uXiqIHOOEQEyRssFec5kHQAppLS8sAiAAQjrK2dqkoeoATDrELCRvsE6c5gCCYW1paBkAEgDDF2tolAEXRA5xwiL1I2OAgcdoFCGNPPDGHgxRFD//jhEPsQ8IG08VpFw8QDuYwIRziICRs8BDitIt9hEMchYQN/p/+A39bX5/dHA75AAAAAElFTkSuQmCC"},{"name":"Coal stone spirit","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAE2UlEQVRIDbXBz2sc5xkH8O/zvvPOSm6yzCFyLqGnsvOmDYUcnlwCTyxYKIaoFBKiUqLgSykphVCTUhJCW9K0hxIC/Qd81jUnQ0IgGpmCdtSmajGVJlbi/hDOMKYsNZJ3frzz1h4QldDuypd+PiRs8ciSNENHeIBHQ8IWwMZo94XnLGZL0gzAO1ffQOe9D34PQHiA85Cw3RjtAiAi4RjTJGn2ztU3cJoJzC9/977wAHORsAWwMdolIuEY0yRp9uZPXn/2W88sLCwYY7TWdV3vfXHr5796D/DCMWYjYQtgY7RLRMIxpknS7OqPf7S09EQYmCAIlKK6bsqqeuvd3wBeOMZsJGwBbIx2iUg4xjRJmv309R9efGLJPBQQqaquqqp++9e/BbxwjNlI2ALYGO0SkXCMaZI0W/3ed7/9zDdNR5Gq6upnv3gX8MIx5iJhC2BjtEtEwjFmSNJsdfW1MDTOuaqabG5+kucF4IVjzEXCdmO0i84Lz1nMkKTZ6uqrYdhzzpXl5MaNT/K8ALxwjLlI2AJI0j10hGNMk6TZ6uqrYdhzzlVVtbn5cZ4XgBeOMRcJW5wnSTOgfeWV14Ig9L5xzo3H//7oo+uAF44xFwlbnCdJs5de+n4QhFor51rnmsPDw+vXPwS8cIy5SNjiPEmavfzyD4wxRORc41zbNNXdu3dv3PhUeIC5SNhiriTNoqg/HK4YEwBwzrVt61x9dHS0tTUajwvhAWYjYYvZkjSLov7y8mVjAiKNjnONc66qJtvbf8jzAvDCMWYgYYvZkjSLov5w+KLWwcHBP4LQBCpo0baN6/ejyeRwZ2c7zwvhAWYgYYsZkjSLov5wuGKMvnPnX2Gvp5VWSkFR23rX1L0wLMtmNNocj/8jPMA0JGxxRpJmAKKoPxyuGBMc3PnnQtgzxigdkIIi1Xr41lVlFYZhVVVbW6PxuBAe4AwStjgtSTOgjaJoOFwxJtBaf/XVgTEmMEZrTUqj41v3QKDDpqmrqtzaGo3HhfAAp5GwxQlJmgH9KMJwuKIfUrdv37rw2OO9Xmi0Ia0VEQACPHzd1EYvOFfVdV2Wk+3tP43HhfAAJ5CwxQlJmkVR/9Kl74RhT3e+uH3rsa893gtDHWhS+gF0fNs614SmV9dV0zRlWe3sjADkeSE8wDEStjiWpFkU9QEsL18Ow55SRKS1Vnl+YHqh1kZ3APi2bb13rg6DBefqpnFVVd67d29//295XgBeOEaHhC2OJWkWRX0Ay8uXjTFaayLSWh8c/H1x8YI2gSL9ADqtd5NJeWHhgnONc64sJ0dH9z///GaeF4AXjtEhYYtjSZpFUR+AyDAMF7XWStHFixcB3Lz5l97igtZakQbQel+WlR08DeDLL/edq+/fn0wmh/v7e3leAF44RoeELU5I0iyK+s8/fykMF5966usAlAKgAPz15p+NMQoKCoNvPI3TPvvsj3t7O3leAF44xjEStjgtSbMoWlpbu4KOUugonGd9/VqeF4AXjnGMhC1OS9IsivpAb23tCjpKAVCYa339Wp4XgBeOcQIJW5yRpBmAKFpaW7uCjlIAFKZZX78GIM8LwAvHOI2ELaZJ0j2A0HnyySVMk+cF/scLxziDhC1mS9I9PESYzuOYcIxpSNjiESTpHs4QjnEeErb4f/ovLiIjn0E6l+QAAAAASUVORK5CYII="},{"name":"Runite stone spirit","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAFLUlEQVRIDbXBX4hcVx0H8O/vnnvuzOwmk2ubTRSDhIJzjxoa8nCWQvC3WRhS8pAitHRFuiUvRSpCaVCkpWhpqw9FBKX4uPikq29VJFCpdO9GYedurftQunPrto/2ejfttOnOzv1z5rQZGN1l/mxe/HyItcJdC6MYA6wbuDvEWq21tjG0MK8wThjFAJ67/hQGXvrFLwGwbuAoxFqttbaJCEOsAxwWRvFz15/CYdKVP3n556wbmIpYq7XWNhGxDjBBGMU/+P6TF75xrlqtSimFEEVRtN/714+efwmwrANMRqzVWmsbAwvzCuOEUXz9e9+dmzvpudJ1XcehoiizPH/mhZ8ClnWAyYi1AhBGbQDW2oV5hRFhFD/95BOnTs7JO1wiJy/yPC+effFngGUdYDJirTC01tomItYBDgujeOlbD91/7utywCEnL/If/vgFwLIOMBWxVmut7YV5BWCttU1ErAOMCKN4aelxz5PGmDzvra+/niQpYFkHmIpYKwBrrW0AC/MqjNqsA4wIo3hp6THPqxhjsqx38+brSZIClnWAqYi1wkAYtQGwDjBOGMVLS495XsUYk+f5+vpfkiQFLOsAUxFrhaOEUQz0H330cdf1rC2NMZ3Oh6+9dgOwrANMRawVjhJG8cMPf9t1PSEcY/rGlHt7ezduvApY1gGmItYKRwmj+JFHviOlJCJjSmP6ZZnv7u7evPkG6wamItYKU4VR7Pv1ZvOqlC4A07d9UxpTdLvdjY1Wp5OybmAyYq0wWRjFvl9fXLwiPUmOcEB9WGNKY8q819vc/HuSpIBlHWACYq0wWRjF/um55jcvS0/mX5v3jh13ZcX2+0XWy/725273062tzSRJWTcwAbFWmCCMYt+vX778kOtVyvsvzvj3upWqIwQJ15oy7+7d+tNvsixvtdY7nU9YNzAOsVYYEUYxAN+vNy9flW6lOH9xxr+3OntMVmokBDnC2r7Js97tT3ZfXcnzbGOj1emkrBsYQawVDgujGOj7vt9sXpVSCimhm9XjJ7yZWVmpCulZC8CWRVFm+//5w6/zO7KNjVank7Ju4DBirXBAGMVA3ffRbF4VQkjpfnz23Be+fLbm3+PVZlwpHdcDASBryry798HvXinLvCjyLOttbv6j00lZN3AAsVY4IIxi369fuvSg51WEK4RwP73vvH/mbO3YCW9m1nGlIz0QPmfL0uTZv3/7qyLfL8syy/KtrRaAJElZNzBErBWGwij2/TqAxcUrnldxHCLhutLDAw/Wjp/wajOuVxWVCqy1/X7flMV+94Pfv2KKvCxNnme3b9/e2XknSVLAsg4wQKwVhsIo9v06gMXFK1JKIQQJIVxRnl84PvclrzbjehXH9XCH7ffLvVvph39cMWVpjMmyXre7/+67bydJCljWAQaItcJQGMW+XwfA3PS8mhDCcejUqS8SObtfvTDrn5TVmpAVAH1T7H/80ew/34C177+/Y0yxv9/r9fZ2dtpJkgKWdYABYq1wQBjFvl+/ePGS59XOnPkKAMcByCGiW/ddkMfqzueEmHnzr9b2YS2G3nrrzXZ7K0lSwLIOMESsFQ4Lo9j355aXr2HAcTDggAj/ZS1GrK6uJEkKWNYBhoi1wmFhFPt+HagsL1/DgOMAcDDV6upKkqSAZR3gAGKtMCKMYgC+P7e8fA0DjgPAwTirqysAkiQFLOsAhxFrhXHCqA0QBk6fnsM4SZLifyzrACOItcJkYdTGHYTxLIZYBxiHWCvchTBqYwTrAEch1gr/T58BW9tGn5X+nX4AAAAASUVORK5CYII="},{"name":"Runite stone spirit","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAFIUlEQVRIDbXBb4gcZx0H8O9vnnlmd++SzdjmEsUgoeDOqKEhL36hEPwlB0tKXqQILT2RXsmbIhWhNCjSUrS01RdFBKX48vCVnr6rIoFKpTcXhdu5Wu9F6d3Ua1/acS7ttunt7fx59mmzcHrH7e7ljZ8PCYe4a1GcYEi4hbtDwiGApc76xfMhxoviBMBz15/C0Eu/+CUA4RYOQ8LhUmcdABEJBxglipPnrj+F/bSrf/Lyz4VbmIiEQwBLnXUiEg4wShQnP/j+k+e+caZer2utlVJlWW68968fPf8SYIUDjEfCIYClzjoRCQcYJYqT69/77szMcc/Vrus6DpVllRfFMy/8FLDCAcYj4RDAUmediIQDjBLFydNPPnHi+Iy+wyVyirIoivLZF38GWOEA45FwCGCps05EwgFGieJk7lsP3X/m63rIIacoix/++AXACgeYiIRDAEuddSISDjBGFCdzc497njbGFEV/efn1NM0AKxxgIhIOlzrrGLp4PsQYUZzMzT3meTVjTJ73b958PU0zwAoHmIiEQwBRvIEh4QCjRHEyN/eY59WMMUVRLC//JU0zwAoHmIiEQxwmihNg8Oijj7uuZ21ljOl2P3zttRuAFQ4wEQmHOEwUJw8//G3X9ZRyjBkYU21vb9+48SpghQNMRMIhDhPFySOPfEdrTUTGVMYMqqrY2tq6efMN4RYmIuEQE0Vx4vvNdvuq1i4AM7ADUxlT9nq9lZVOt5sJtzAeCYcYL4oT32/Ozl7RniZHOaABrDGVMVXR76+u/j1NM8AKBxiDhEOMF8WJf3Km/c3L2tPF1857R466umYHgzLv53/7c6/36draappmwi2MQcIhxojixPebly8/5Hq16v4LU/69bq3uKEXKtaYqetu3/vSbPC86neVu9xPhFkYh4RAHRHECwPeb7ctXtVsrz16Y8u+tTx/RtQYpRY6ydmCKvH/7k61XF4oiX1npdLuZcAsHkHCI/aI4AQa+77fbV7XWSmtwu370mDc1rWt1pT1rAdiqLKt85z9/+HVxR76y0ul2M+EW9iPhEHtEcQI0fR/t9lWllNbux6fPfOHLpxv+PV5jytXacT0QALKmKnrbH/zulaoqyrLI8/7q6j+63Uy4hT1IOMQeUZz4fvPSpQc9r6ZcpZT76X1n/VOnG0eOeVPTjqsd7YHwOVtVpsj//dtflcVOVVV5XqytdQCkaSbcwi4SDrErihPfbwKYnb3ieTXHIVKuqz088GDj6DGvMeV6dVWrwVo7GAxMVe70Pvj9K6YsqsoURX779u3NzXfSNAOscIAhEg6xK4oT328CmJ29orVWSpFSylXV2YtHZ77kNaZcr+a4Hu6wg0G1fSv78I8LpqqMMXne7/V23n337TTNACscYIiEQ+yK4sT3mwBE2p7XUEo5Dp048UUiZ+ur56b947reULoGYGDKnY8/mv7nG7D2/fc3jSl3dvr9/vbm5kaaZoAVDjBEwiH2iOLE95sXLlzyvMapU18B4DgAOUR0675z+kjT+ZxSU2/+1doBrMWut956c2NjLU0zwAoH2EXCIfaL4sT3Z+bnr2HIcTDkgAj/ZS0OWFxcSNMMsMIBdpFwiP2iOPH9JlCbn7+GIccB4GCixcWFNM0AKxxgDxIOcUAUJwB8f2Z+/hqGHAeAg1EWFxcApGkGWOEA+5FwiFGieAMgDJ08OYNR0jTD/1jhAAeQcIjxongDdxBGs9glHGAUEg5xF6J4AwcIBzgMCYf4f/oMhpc9n7pxjXcAAAAASUVORK5CYII="},{"name":"Air rune","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAGvElEQVRIDbXBWW9U5x0H4N9/e+csM2YwAYs0F76gnqNIrapWb1VF1VuUJhQqkaQQlpiwxAXMbuJi1rCEBBCBgNnDIiBiSSCUKCpp1XSRfNQrny9g5sN4ap90JKMEctXnoeAz/JC8aOIpgu/BM1HwGYCR0bHf/DLDd+RFE8DtS+eFmUWES8LCwswiPH9pb/A9eDoKPhsZHQNARME30JYXTQDXhj8WZmJW4UkiTMxMTMxMzGKqC5avABB8D74PBZ8BGBkdI6LgGwDyogngzLEPnJoITyBiJiImnkDMTMTMxCqipipqqvOWLAcQfA+eRMFnAEZGx4go+EZeNI+9t8c5Z2ZMxMzExMTMRMREJEzEPHfe/P/8659MJKrOmamqqKm+vGhJ8D2YgoLPAIyMjhERQIeGBitRZGZMxMxExMTMYGIwM9H8115H28g3f2dmVXHmnDNTU9XfLloSfA/aKPgMwMjoGBHt2Lwxjibxt4h4Ei1a9hZKjx7+mZl+/8YitP37b38lZlN1zpIoNrN5S5YDreAbKFHwGYCR0TEiGty4Po5iM2MiFln5Th+Az2/fYualvStQ+urBF0y0cPGbaPvH14+Y2Eydc9U0NdN5by4PvgclCj4bGR1DaXv/uiSOmIWJmamvfwOAWzeuMzMx9a5cjdLDe58z8xtLlmKKbx79xVSTJKmlqZq+unhZ8D0AKPgMQF48Rmlw0wYmYmZhYab1mzYDuHn1Cguv6luL0r3bt5h5Se8KTPH1lw+JOXKuVqumSbJg2QqgFXyDgs/yorl44YI0qVaTxJmx0MDgjvNnhll405ZtKN24cpmY16xdB+DupzeJmYmWvb0SbV89+IKJmDlJ4lq1mibJ/KW9wfdQ8FleNF/73asdtVpaTUydMA0O7UTpwtkzm7cNALj2ySUm7uvvB3DrxnVmJqLeVavR9uX9e8xsphWrpGmcxMnCFauAFgWf5UVzwSsv12u1ajU1NRYa2rUHpXPDp7dufxfAlYsXiGjdxk0APr12lUWYaMWad9D28N5nzBJVKiKSJnESJ6+vXAO0KPgsL5qvzP11Z0e9Wk1VVUR2792H0vCpk9sHdwC4eP6sEPdv3gLg+pXLTMTCq/rWou3BZ3dFJIljIoqjOE3iP6zuA1oUfJYXzbkv/Wr69Om1atWZMMm+AwcAnDh+XJgGh3YCODc8vHX7dpSufXKJiIR5zbr1aLt/946pVJMUTM4sTZLFa9YCLQo+y4vmS/4XMzqnT6t1qAmTiDATi/CuvftQOnPq5MDgDpQuX7jATMLc178Bbffv3HZmaTUlkDAnSbL0j+uBFgWf5UXz5z/76czOznpHh3NKJCIsLPsPHkTpxPHjwjQ4tBOli+fPKsv6TZsxxb07t6NKpZqkRCCiKI6Wr90AtCj4LC+aP2n8eMbMGR1pLU0SEWYWFnr/8IcAjh75QIh37d2H0tnTp4V588AAprhz84aopvEkYSYiZ/ZW/yagRcFnedHs6pr5o9mzOzs6arWacyYsIvThkWOHDh4Qlv0HD6J06sRHIjwwuANPun3zhqrU0tTMRFRFmPntjVuAFgWf5UUTGO/u7u7q7KzX67U0ZSEhmcDCInLo/cMAjh87KhOI3x0aQtvVSxdVRM1UNY0TNTFREVHTlRu3Ai0KPgOQF01g/MXGnM76jGnTpkUVE5JvqQjLJBZSlp179qLtwtkzppPMzE0wMxURnbB2+5+AVvANCj4DkBdNYLxer3c//3y9s7OWJK5iIqLyPyyiJBN279sH4PTJE8wiwqZmKmqq5pyWRMxs/eAQ0Aq+QcFnKOVFExh/oatr1uxZ1aQWR1FcmSRtKsQswsJMLCLMqurMZAKLmamp6aRte94DWsE3AFDwGUp50QTGAXR1dc2q12sdaRJX4yiqRBVnKiUmmaAizKwirKyiKqxqpmpmquqcG9i7H2gF3wBAwWdoy4smMA6gXq93PfdcvaMjTZI4iUxMVaVNRVRFVUVUhVXVmamqmZq53YePAK3gGyhR8Bna8qIJjKNUB7rmzOmoVtNq1amKqomIqpmomKo6E2Gd4EzVzJk5s4MffQy0gm+gjYLPMEVeNDFpHKU5c7qnV+tmpmZO1ZyrmKmpiaqZqjg1c65ScRWzo8PngFbwDUxBwWd4Ul48BgiTxgF0d3cnlUoUx0nFnFXMOWfqnKmYcxpVognnrl7HpFbwDTyJgs/wffLiMUAvdM1UsySNIhdHkTmL1KmpMxNTl8TxrfsPMKkFIPgGvoOCz/B0edHED2gBCL6Bp6DgMzxTXjzG0wXfwDNR8Bn+n/4L5p98Jv/CpeUAAAAASUVORK5CYII="},{"name":"Water rune","base64":"data:image/png;base64,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"},{"name":"Earth rune","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAF8UlEQVRIDbXBX6hlZRkG8Od53vf99l5r7X1mzxlnDpoXRxjPXkSmWV+ZyKeYTo6gkdPopKVS5v/ExpTEASvJgUxSLCIcvChvisCroNuzKKizA6GbzmyCEgIvIiK8Mzi7s/d0YMSZkbno92PJLT5IN5niLEpewzmx5BbA+sbmtZ9s8T7dZArg9Z/8yCSZmRZMJpNkpptuv7PkNZwdS27XNzYBkCx5jB3dZArgxEsvmkTJTXNmoiSKkihZuB88cheAktdwJiy5BbC+sUmy5DGAbjIF8PLx55KHmbaREklR2yiJlES5mYe7ebgfOHwEQMlreC+W3AJY39gkWfK4m0yPH3s6pRQRIiVRFCWRFEkTqQVKpLmnFOHu5uF+/W2HS17DaVhyC2B9Y5MkwG8/ebTX70eESEkkRUkQBUmkJIqiRGrB3VKklCI83P0ztx0ueQ07WHILYH1jk+Q3H3mo6s/pFFJzJEVJoESJpCSKoiSSUrinFHW/iogDh48As5LHWGDJLYD1jU2SRx+6v+pXESFSZpJI6hRScyQlUiQliqLmqAhPKQ2aJsIPfOFIyWtYYMnt+sYmFh5/4Gt11ZdMlERKomT6y2+P4zSXH3hOEkmREkmd8rs3jt58z4lh03j4jYfuKHkNAEtuAXSTk1g4+vCDIiWZ7O03X8Y5XXHgOUpv/uYZLHzq1hf6KQ2Hg6auD95xFzArecyS224yPXTLwaYeDOo6RchImch//OnHOB+fuPm4pLquhoNBU9c33X5nyWssue0m01s/e+PScNgM6vBkoqh//fmnOE9XHnw+wnvRa5qqrupb7robmLHktptMD95w/Wg4HAya8JCRNBMlkyjJRMlI/v2PP8SZfOSG75goWb/XM7Omruqq/tyX7wVmLLntJtMbrrtmeWk0GDTubmaiZDKKRtEkymTUHEnprT/8AMCl1zwtiZozyczqqiJZ9aumrj5/z1eAGUtuu8n0uquv2r1793AwSGGi0WgyyUz89+arAC647BGJJpMoiaRJMkkmiaSZhdugbiCmiKauD917HzBjyW03mV6dP75nefeu4ZKHiWam/7z1Os5k5WNfN5pE09xff/8CgPG1x9wsRTSDhqBJdV3f/tX7gRlLbrvJ9MorPrp3eXm0tJSSk6a3f4HzMS7PmHu/1xvUDQmS/ap/5L4HgRlLbrvJ9LLxpXv27llqhk1d9/75Bs7HJZ9+KtzNvanmTCKZIr74wMPAjCW33WS6srL3QxdeuLy0NBwOd73z63f3HjKj0WgymaR3//YznMUlVz3pEe42bJqIMHM3k/Slhx4FZiy57SZTYGt1dXVleXk0Gg2bRkajbZPJzNxMJpNte+fkCSzsu/xRk5nJzTzC3Zuq9rAwt21udz/8GDBjyS2AbjIFtj483r882rNr165+L4x2ipvJ5mR0mcyMkplESeFzEZG2RYSbmW+77/EngFnJY5bcAugmU2BrNBqtXnTRaHl5WNepF2bm9j8yc9o2iTIzbTMzhUe4ebhHSr5g5u4PPPEUMCt5zJJbLHSTKbB18crKvgv3Deph1e9XvTnb4UbJTCZRZia5e4qwbbKI8PDwuceePgbMSh4DYMktFrrJFNgCsLKysm80Gi41dTWo+v1ev5fCbUG0bW4myc3kcnM3uUe4R4QvfOPYs8Cs5DEAltxiRzeZAlsARqPRygUXjJaWmrqu6n5YuLvtcDN3c3czd5O7pwh3j/CI9K3vfg+YlTzGAktusaObTIEtLIyAlf37lwaDZjBI7uYeZuYeYW7h7inM5NtSuEekiBTx7PdfBGYlj7GDJbc4TTeZYm4LC/v3r+4ejCLCI5J7pNSL8PAw9wh3Sx6RUq+XehHPv/QKMCt5jNOw5Bbv1U1OAsTcFoDV1dW61+tXVd2LFL1IKYWnFG6Rkvd7/W2vvPoa5mYlj/FeLLnFmXSTkwAvXtnrEXXT9FPq9/spIqVk7hEWnuqq+vkvf4W5GYCSx3gfltzi7LrJFB9gBqDkMc6CJbc4p25yEmdX8hjnxJJb/D/9F5OhFyZ0a3OwAAAAAElFTkSuQmCC"},{"name":"Fire rune","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAGCklEQVRIDbXBXYicZxkG4Pu5n+d55/uZ2Uw2TdbEgCusOx8Fi6hvkVBe0zaNzUGVNuanTdvEuPnbtE2atNZqIKLUqhCtTaAW+yNWKVr1oAilpSD7ST3Y71jYjIIgBjFKEBQ9EHacnbqQ0CRtDrwuSbHCu6mbPq4gxWlclaRYAZibX/jkjRXeoW76AH70zBklqaocUSqVpCpv335PitO4MkmxmptfACAiKfawrG76AJ576pSSQppyiSqFpFBICqlutmXnLgApTuNyJMUKwNz8goik2ANQN30A333ya8FclUMipIhQOCQkRUgKTdXcTM3NNm/bCSDFaVxKUqwAzM0viEiKvbrpP3ni8RCCu1OEpFAoJEWEIqIU4YiQImoWgruZqbnZLXdtS3EaF5EUKwBz8wsiAshXHj3WyjJ3pwhJEaGQBIUgKUJSKBRShCNmGjyE4G5uZrfetS3FaSyTFCsAc/MLIvLI4UN5toRvE+ESEaGQhJDSPv2Nfx/9MikUCkkRId0sBC+y3N03b9sJDFLsYURSrADMzS+IyLFD+/Msd3eKUJWkiKx78cz5fUcpQnL8e6cA/OOBxygipFDy7zzxn0dOUuhuIYR2Wbrb5s/uTHEaI5JiNTe/gJGjB/YVeUYqhaQISeEHfvzsuT2HhULh+55/GsCFg8dJighFOme++a8jX+KImxVF0SlLc7tt644UpwFIihWAujmLkWOzBylCUqmkTL/yA4z88b4DFK7/4TMY+eu+oyRXPfttjPzzwcdEKGQWQqfTLotiy45dwCDFnqRY1U1/6x1byqLdLorgThWhUoTK63/+Ekb+cPfMB19+Dsv+vPdBikw8/zRG/j77qIhQhGRR5J12uyyK27ffk+K0pFjVTf/Tn7ptrNMp24VbUAqFVN7w6stY9vsde6d+8gKWndtzWETWvXgGIxcOHhPhkLu1vFWWeZEXd+y6HxhIilXd9LdsuqXb6bTbpZtTRUQ//toruBYXDh4jNWu1VLUs8iIvPnPfHmAgKVZ109+08abxsW67XZqZqlJ44xu/wLX42/6HVbXIcxHJs7ws8jt37wUGkmJVN/2NGz6xcuXKTrsdXCkqKhvefBXX4vy+o27aLkpQgntZFFv3zAADSbGqm/6G+LFV4ytXdMbMlaKqvOlXv8S1OD9zJLiX7VIgShZFsf3z+4GBpFjVTf+jH7lh9fh4d2wsBBNRVW6sX8O1+MvMkazVahelCEQky7OdMweBgaRY1U3/w70PrVq9aqzslEWhSlKpcvOvX8d7c273rJqV+RIlRSS4331gFhhIilXd9CcmVr9/7drxsbFOpxOCK1VVNv3mTbw3f9o9a6adsnR3VTNVkvceegAYSIpV3fSBxcnJyYnx8W632ylLqqjoEJW3vvUGrux32z9nquZuZmVemKur6ZDp/bMPAQNJsQJQN31g8fre1Hh31YoVK7KWq+jbTPXmt17H5fz2znvdlrh7GHJ3U1Ubmjl6HBik2JMUKwB10wcWu93u5Lp13fHxTlGElquq6f9Q1USHSKGqckhV6eZuam7mIdiIqpkdOP4FYJBiT1KsMFI3fWBx/cTEmrVr2kUnz7K8tUSXmQqpSiWFqkqaWXDXIaq7m5vbkocePwEMUuwBkBQrjNRNH1gEMDExsabb7YyVRd7Os6yVtYKbjlB0yFRJmiqNpmZKM3czd7eRh0+cBAYp9gBIihWW1U0fWATQ7XYnrruuOzZWFkVeZK5uZrrMVM3UzFTNlGYW3M3M3dzDF7/6BDBIsYcRSbHCsrrpA4sY6QITU1Nj7XbZbgczNXNVNXNXUzez4Kq0oeBm7sE9uJ/81ilgkGIPyyTFChepmz6WLGJkampyZbvr7uYezDyElru5uZq5m2kw9xBardBy//pTp4FBij1cRFKscKm6OQsIliwCmJycLFqtLM+LlgdveQjBLQQ39RAsa2VDp7//ApYMUuzhUpJihcupm7OArJ9Ybe5FWWYhZFkW3EMIauaubqHI85d++jMsGQBIsYd3kBQrXFnd9PEuBgBS7OEKJMUKV1U3Z3FlKfZwVZJihf+n/wJdfjQm89DXVgAAAABJRU5ErkJggg=="},{"name":"Body rune","base64":"data:image/png;base64,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"},{"name":"Mind rune","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAG4klEQVRIDbXBW4xdZRkG4Pd7v+9bex32nu5OgbF4yJiMs5ckNYj5QQr5B0ppGaRFWgqVcwoWWkCaQgsVCIVaK9JiARVtMBLjAYynhIAW5DCb8yyDNTFmZt94YTSYYOTKCw2znVk4CQ0UrnweiaHEB+lWPRxBDKN4XxJDCWBicmrsxBLv0q16AH744DeVpKqyplQqSVWedcFFMYziyCSGcmJyCoCIxNDBvG7VA/DQ/n1KCmnKOaoUkkIhKaS62fj6iwHEMIr3IjGUACYmp0Qkhg6AbtUDcN+eXYm5KmeJkCJCOeXvu1H73cfuotBUzc3U3GzFuvUAYhjF4SSGEsDE5JSIxNDpVr09t+1IksTdx/9131OtrUKhkBQRjv3jawBe+tBtnCWkiJolibuZqbnZsjXrYhjFO0gMJYCJySkRAWTntq2NNHX3c//zbdR+k28hQSFIiix7856Jo26hkCKsnfS3OwFMf3Kfm5vZGWvWxTCKeRJDCWBickpEbrp2U5bOYW3NzHdRezy9XkhCSCFFhKRQKGR8Yw9qhz6+O08zd1+xbj3Qj6GDmsRQApiYnBKRrZs2Zmnm7hShKkkRYe2XB3ficJee93WhnPHm3olFt1DobkmSNIvC3Vacvz6GUdQkhnJicgq1LVd/Mc9SUikkRUgKqXziuT14Lxet3kOKCN/mZnmet4rC3M5ce2EMowAkhhJAt5pGbevmayhCUqmkkHz65XsBjI/dTOEsISlC8hcHdwK48JzdFJIQoZBpkrRazSLPxy+8GOjH0JEYym7VW7tqvMibzTxP3KkiVIpQ+Xz1AGorTrnpyRf3jo/dTOrjz3519fLbKfKrp+4CsO7sXSRFhCIk8zxrNZtFnp91wUUxjEoMZbfqrV555kCrVTRzt+SGxY+hduCf57/42rdQO+PkrU+/fO/KU7dR+euJu89ZdquIPPb0VwCsPetOUkQ4y90a3iiKLM/yVRdfBvQlhrJb9caXL2u3Ws1msX34Kcx78I01r/zhQQBj4XpSn311//KlN1L45Iv3nH3ajiee24Pa51fccd5b30HtmfY2VS3yLM/ycy+9AuhLDGW36i0/7dTBgXazWZiZqlJIpQon/3gAwCknXEulCueICEmRgy/cg9rq5bev7R9A7dmF20UkS7Miz867fAPQlxjKbtU7belnFy5c2Go2E1eKiopSSX3tTw8BOPn4TSIkRamkkBSR3760D8DnTv8ySRFRVTdt5gUoiXuR52uvuAroSwxlt+otDZ9ZNLhwQWvAXCmqSgpVeWj6YQAnLtlICqkiQqWKkvLMK98AMD52M6kkTTVxL5qFQJTM8/yCKzcCfYmh7Fa9E47/1NGDg+2BgSQxEVWlUklRKim/n/o+gJOWXE3lHOXz1QOorTx1G5WmpmZpo9HMCxGISJql66+6BuhLDGW36i3pfGLR0YsGilaR56oklSq3jjwHYO9fVqrw0PTDONzpJ20heVn+ox//+3I3U7Mim6OkiCTuX7h6M9CXGMpu1RsaOvrDixcPDgy0Wq0kcaXeedwLqN395zNJmvLQ9MOoLf30ZpJK3TDwCGo/nbnSTFtF4e6qZqokL9l0HdCXGMpu1QNmhoeHhwYH2+12qyiosnvJqwB29cZU1VSpVOocIVVIJanUDQOPoPZz2Vhkubm6mqq6+yWbrgP6EkMJoFv1gJnjOiOD7UULFixIG66ibzNV6hyq3PTRg/e/vkqFVCWFpJtd0fzJo29tSGa5u6mqzbpqy41AP4aOxFAC6FY9YKbdbg8fe2x7cLCV50nDVdX0f6hqotuGnwRw/+urlLNUlW7upuZmniRWU03T9MobtgL9GDoSQ4lat+oBMx8ZGjpm8THNvJWladaYo/NuHXkGtf1/PZuqSppZ4q6zqO5ubm5zvrTjNqAfQweAxFCi1q16wAyAoaGhY9rt1kCRZ80sTRtpI3HTGkVnmSpJU6XR1Exp5m7m7mZW5Pnm7TuAfgwdABJDiXndqgfMAGi320NHHdUeGCjyPMtTVzcznWeqZmpmqmZKM0vczczdGo3G9p1fAfoxdFCTGErM61Y9YAa1NjA0MjLQbBbNZmKmZq6qZu5q6maWuCptVuJm7ol7kiR33L0X6MfQwTyJocQ7dKse5sygNjIyvLDZdndzT8w8SRru5uZq5m6mibknSdpIsjTdtW8/0I+hg3eQGEocrltNA4I5MwCGh4fzRiPNsrzhiTc8SRK3JHFTTxJLG2meZfcd+B7m9GPo4HASQ4n30q2mAQFm2rW80SiyrNHwxBueJA13T5Iiz37w6M8wpw8ghg7eRWIocWTdqocP0AcQQwdHIDGUeF/dahpHFkMH70tiKPH/9F+wkHwm7+fqgQAAAABJRU5ErkJggg=="},{"name":"Chaos rune","base64":"data:image/png;base64,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"},{"name":"Death rune","base64":"data:image/png;base64,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"},{"name":"Cosmic rune","base64":"data:image/png;base64,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"},{"name":"Law rune","base64":"data:image/png;base64,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"},{"name":"Nature rune","base64":"data:image/png;base64,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"},{"name":"Large plated rune salvage","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAADp0lEQVRIDbXBzYtVdRzH8ff30MydpyCtiCQfmOSe3zKEH4LID2kbtBGixYBkYoybYEjsP2hVGEIFRhMVBbWIoBalCzkMghyKKDLnMEWhRk8W4ug86Pl+uvfapRmcma6L+3pZioF+shQD/WQpBvrJUgzcjaKs6EixSQ8sxUAPirKiI3/8CdzBZ898DqTYZEOWYmBDRVkBjz35dC2B4+ACr13Iz3/xSYpN1mcpBtZRlBUQn3oWBNTuAwMNdwe/ubSIC3nt9beffZRik3VYioG1FGW1e2KSFqPRGHYXEpK7IwctLi3iNRLuX338XopN1mIpBu5QlNXeZ56n456hEW5zuWokJEe4bi7ecDku5OWHb6XY5A6WYmC1oqzS4RfoGGyMsIJLSEgux+Wqby1cryXcXV5+cDLFJqtZioGuoqyAfZPHsGxwaJQ1yVtwdwn35YV5l/C6ls69+xooxZwVLMVAR1FW+yZfxLLMDMswawyPsJpLSKjFW5B77cuL13F3OdLZt0+k2GQFSzEARVnt2n/gvoe3YpZlGWaYZZYNDI+CuE1CcsDbkMuFvGV5YR7J5dQ+M/1qik26LMVAR1FWu/Yf2LxtPDODDGsBs8bImCQQEsIBCbnXjrwFaWlhHsnrGnlx8mVQijkdlmKgoyirPRNHxh7agrVhlpmRZUBjaNQRAgnUgoTk7ksL87h77chdTu2XvvtybuZ0ik06LMVAV1FWeyaO3LtlW2ZGZliWGWCDw6MCJCSQC6SlG/Oolgt5W+3IXY7rzOsvgVLMAUsxsEJRVrsnJh/YvhMz2gwjg8GRMZcQIKTFhXkkane53HG/+utlus69/wYoxRywFAMrFGW1e2JyYHB40yNbwWgxo8VscGgMaXnhGsgFkstxv3r5Ih31rZvXfr90/vSnoBRzOizFwGpFWe09OAVs2rbDaDHMaDFDArUgIf/74s9e18DZd07wH6WY02UpBu5QlNXeg1Obt49jRouRYfxLLpD++mkOmJk+TpvoSjFnBUsxsJairNKhqc07doJhgNH159wFYGb6OG0CUsxZh6UYWEdRVunQ1P3jOW1Gx5UfL3jtM9PHQUCKORuyFAPrK8pq33PHNu14lI4rP8yCijdfAaWY0wNLMbChoqzS4aMPjud/zH3/W/XNbHEKlGJObyzFwP8pyiodPvrLha/nilOgFHN6ZikGelCUFW1KMeduWIqB3hTlbIo5d8lSDPSTpRjoJ0sx0E+WYqCfLMVAP/0D6hEknxlR4rQAAAAASUVORK5CYII="},{"name":"Large plated rune salvage","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAD8UlEQVRIDbXBzYtVdRzH8ff3NPfeeRLSksjygSnuOUsRfkgiP6Rt0EaIFgOSiTFugiGx/6BVYQgVGE1UFNQiglqULuQwCHIoosicwxSFGj1ZiPN475zvpzvXhmZwZhoX83pZDBmbyWLI2EwWQ8Zmshgy7kZelHTF0GQDLIaMDciLkq708SdwB5+48DkQQ5N1WQwZ68qLEtj75NOVBI6DC7xyIb/8xScxNFmbxZCxhrwogfDUsyCgcq/VGu4O3p6fw4W88urbzz6KockaLIaM1eRFuX94hA6j0ehzFxKSuyMHzc3P4RUS7l99/F4MTVZjMWTcIS/Kg888T1dPbz+3uVwVEpIjXO25GZfjQl58+FYMTe5gMWSslBdlPP4CXfVGP8u4hITkclyuamF2upJwd3nxwdkYmqxkMWQsyYsSODRyCkvqvQOsSt6Bu0u4t2anXMKrSrr07mugGFKWsRgyuvKiPDTyIpYkZliCWaOvn5VcQkId3oHcK2/NTePucqSLb5+JockyFkMG5EW57/CRex/ciVmSJJhhllhS6xsAcZuE5IAvQi4X8o7W7BSSy6l8fOzVGJossRgyuvKi3Hf4yLZdQ4kZJFgHmDX6ByWBkBAOSMi9cuQdSPOzU0heVcjzsy+DYkjpshgyuvKiPDB8YvCBHdgizBIzkgRo9A44QiCBOpCQ3H1+dgp3rxy5y6n82ndfTo6fj6FJl8WQsSQvygPDJ7bs2JWYkRiWJAZYvW9AgIQEcoE0PzOFKrmQL6ocuctxXXj9JVAMKWAxZCyTF+X+4ZH7dz+KGYsMI4F6/6BLCBDS3OwUEpW7XO643/z1Oksuvf8GKIYUsBgylsmLcv/wSK3et/XhnWB0mNFhVu8dRGrN3gK5QHI57jevX6WrWmjf+v3a5fOfgmJI6bIYMlbKi/Lg0VFg6649RodhRocZEqgDCfnfV3/2qgIuvnOG/yiGlCUWQ8Yd8qI8eHR02+4hzOgwEox/yQXSXz9NAuNjp1kklsSQsozFkLGavCjjsdFtex4FwwBjyZ+TV4DxsdMsEhBDyhoshow15EUZj43eN5SyyOi68eMVr3x87DQIiCFlXRZDxtryojz03Kmtex6h68YPE6D8zVdAMaRsgMWQsa68KOPxk9uH0j8mv/+t/GYiPweKIWVjLIaM/5MXZTx+8pcrX0/m50AxpGyYxZCxAXlRskgxpNwNiyFjY/JiIoaUu2QxZGwmiyFjM1kMGZvJdu99jM1kfdsfqir5QhuwnlpPQrvVrjfqtb4t3pqZmZ4B6o36gtM7sGV+drpqzavdqtfqC5DU6khVe94sSXpqPfcYsFCpv79XUmtmhp6efwBwfU0qy3pehAAAAABJRU5ErkJggg=="},{"name":"Huge plated rune salvage","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAEl0lEQVRIDbXB3Ytc5QHH8e8zOzszyWKT+ILW+JLYZM6h0CLCg7jIQ+56Kd54IRGKpgb2ohdbROhfUBCjICilQUvwQlAQRCkFL+QQQssxKiys9VRRbIqF+tJisi8z+/x+nTnJwq5x1RTy+YQUS66mkGLJFarqhi1SHLKzkGLJD1DVDZt++ov7sJGyjPTBW39KccgOQool36mqG+DGQ4f3/+xu2ShnG2WkLGMhL7/5WopDvk1IsWQHVd0Adz94XBYydlbGRnlmtjdeW8k2EnJWXv7zqykOuUxIseQyVd0A87/8NRgJO8Nst4clGeUs4by+toqFlG2kpTdeTnHIdiHFki2qugHSr34DyAYjd/sDZFloCktZWNkar61gS8JCeu+1l1IcskVIsWRTVTfp+OMdoBOAbm8AloyNhS2bLDljKQtrfXUFOytjI7/z6ilwigWbQoolrapujiz8lokQOkCg29uFDZaNhSwbawJZzmhqvLYiCxkrS++88scUh2wKKZZAVTd33X907/6DBCAw0WG2twsbbIONjSUbTWHJUs4bqxeyjSQL+bPld88tnU1xSCukWAJV3cQHHtlz861cFALQH+yWjA2WjY2nsCZQyyLn0eoKztlG+ufS2+eWzoJTLICQYglUdRMfeGTfLQe4KARas4PdYGzZyFiykWxNYCkLa7R6QRIyztn+64vPgVMsgJBiSauqm/mjC9fctJ8ABFq9XXNgbMnY2JKwJmwjySLn0doFWWTJRj5z6hlwigUQUixpVXUzf3ThmptvI9BhIjDRYbY/h2UbSwYLWcqSsCxjTYxWz2MpG+uTt0+fWzqb4hAIKZa0qrqZf2hhzy0HCbQCrf5gN7ZsLNtYMkiyyJIzsq3R6gUpY0tCPv38U+AUi5BiyaaqbuaPLuw7cIjtZge7sbAl4wlhScZSFtbE+up5bLJkYVV/eBKcYhFSLNlU1c38QwvXHThMS9BhqrtrDhtPCFsyntD6ynkkWUjKwpKFLeXq90+AUyxCiiVbVHWTji3u2X872/UGc7IwWGsr57EmkGwjyUJT2LKQ3nrud+AUi5BiyRZV3aRji3tvPYiZClzUG8zZHq18LRsbSzZZsiwhyUITXvvqc+DMi8+CUyxCiiXbVXWTji3uve0nfIMnhI0lgySLrP9+do6LlGn951+fLr/5OjjFIqRYsl1VN/c+vHj9HYe4JIAxYBksy1hf/eMT5UzrzKln+CanWAAhxZLLVHWTji1ee3DIVja27C8//jut0y88zSVmuxQLWiHFkstUdXPvw4s3HC4xm2zz+YfvA6dfeJpLTCvFgh2EFEu+TVU3R44/vu/AITDwxUd/A6qTJ5gyrRQLvk9IsWQHVd0cefSx6+4o/v3hMlCdPAEGUiz4wUKKJTuo6ubIo49JuTp5gimnWHCFQoolO6vqhikDKRZcuZBiyXeq6g9SLPh/hRRLrqaQYsnVFG6/8x6uptD90Q2dbqff66+PNzDdmdDpzmpjPDPbn+nw8x/3/vLR1/3ejOS8vr5hA71BvzPT1cZYG+Mw0x2Nxv1+nwCeGo/GtvuD/mh9ZPt/TheRJJ86JXgAAAAASUVORK5CYII="}],"prifddinas":[{"name":"Blank","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAcElEQVRIDbXBQQEAAAABMdoocF/9Y0lhc4meXKInl+jJJXpyiZ5coieX6MklenKJnlyiJ5foySV6comeXKInl+jJJXpyiZ5coieX6MklenKJnlyiJ5foySV6comeXKInl+jJJXpyiZ5coieX6MklehrY9xOB0WoOowAAAABJRU5ErkJggg=="},{"name":"Uncut dragonstone","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAEBElEQVRIDbXBwWobVxSA4f/ckXEJTTubvoLnvsD18npTCnmEuA7NW9SJX6bbbkOCKM2iGoogGujanlWg0NaOY185smWPNOfUEhGVcNK6EH+fxOC5SxKD7w32Wdja9HxSEoPvDfZFhIUYCj4dicH3BvsiEkPBHZAYfG+wz9zWpue/lFUdwwa3JjF4oKwOADPb2vQsKauaVYGvK14CMWxwCxKDZ6E32BeRGIqyqpn7hm/5h4EodsIR8BsvmYthg4+TGHxvsL+16YHeYF9EQB7le9PUkGdv0++KKS3gEEcGKO2Qty2WIUDFz0AMG3yIxOCB3mAf2Nr0ZXUAspPvKa0lk1wyssP0WmnBAUrryBzSMFZszAUoWMXLGDa4QWLwzJXVARBDUVb1o3wPaGktWSfvACkdXXEBKKa0wJQGxHEtA/cLP4LFULBKYvCsKqt6J38qiKFtmnTydUOH6VjRCZeKgQJTGmYcM9Iw6tONYYNVEoNnSVnV2/muwwli2CQ1a/naaTpixkAmjEGAhitmBGzMeQZ9umAxFCyRGDxLyqreznctmeTicJPUOOSME0BpWzTDTWgc0nDFjIwZKergFT+BxVCwRGLwLCmrejt/AgY4nKLAMB0xIw6nKHDFeEoDss69xF/MOOAV3Rg2WCIxeJaUVf0o3zMUUMwhgkvpSHCGKuYQRcHOSevcTxyxkEGfLlgMBQsSg2dJWdU7+VNFAUut5FmbJiOS0nZYY04xZXrFGLhkxFyLAq/ogsVQsCAxeJaUVb2d7xoGIpCRTdP0jDcTphnO4RyZ0jqyUw6/5KtT/gDHe9qnCxZDwYLE4FlVVvXDfJfUgpPcgQHD9AaMGZkyfcfp59xfY/2cs4ZzcMxony5YDAULEoNnVVnV2/kTw0gGLWRZ7obpBFCmYEOO7/EF2BqfjRldMuI97dMFi6FgQWLwrCqreid/AqKopVaxLO+M0ilgtFeMFctYM2zKFaBow4gZ1+cFWAwFCxKD54ayqh/yveQuwzXp0uHOeeeQC86UVjGHODoNE1Aw0DHjDNfnBVgMBQsSg+eGsqq3813A4drUQAYc8rpDpqAoGIjSQMZ7ruG8z3OwGAoWJAbPDWVVb+e7DmkxgdP0pyMDFG2ZgjE3ZapcU4dzyAWjPs/BYihYkBg8N5RV/TDfzZA2Td9yCAgYLWSAgEMUe8eJwwHKNe3zDBxYDAULEoPnQ8qqBh7wGMzRAQEDUdQxM+QYRDFoHRnwK8/AYihYIjF4PqKsDkCYe8B3Co5r4nBDjpVrCg7o84wZi6FglcTg+VdldcCMMPeAx0CXH1hhQAwFN0gMntspqwNmhBljSQwFHyExeP6nsjqIoeB2JAbPXZIYPHdJYvDcpb8BAV/2kAv6onEAAAAASUVORK5CYII="},{"name":"Uncut dragonstone","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAD2UlEQVRIDbXBz2obVxTA4d+5M7Ib0paBvoPnvsDZ3mVL6BMkjbJInqGU1HUepfvuWuMQQqCLIQjKfQIPdJmY2Ik9cvTHsmbuaSQQSDguzsLfJ0E9t0mCem6TBPXcJgnquU0S1PMlqlgH3eHGJKjnelWs2aT8EHkJBN3hBiSo54oq1ix9z09CDhhtwhw5cMYREHnFUtAdridBPZuqWPeLPUht037gCFIiJVJODgjZnNlHziCxFHkFBN3hcySoZ1MV60fFMwNrWimc4N42/zo+ESCRHDlwwcjBmDFLkZdBd7hCgno2VbHuF3uCM5KRHJlhTXM8YwSSsEQH1jJ3ZIAjA/ubP8CClmySoJ5NVawfFc8MA2ubNi+2IA2bk440ZwZdgpbWsZDoQMBdMh5wEHSHTRLUs6aK9X1+yYue4IB5M82LO6fNWxCwjHzCucOBu2TiyBI4uGAE2YB9sKAlaySoZ00V636xayAstM2lkH/kFEi0LW1OPuMiI59xAcmRjRkmEhB5CRa0ZI0E9aypYt0v9kC65nKr+GrWXEghw+YYcDghMyzRzZgAiW6bu0PeAR0pww14HnSHNRLUs6aKdb/YgwR0pJwecN68Bzo6lgQ62imjbe6c8i7DgbBgA56DBS1ZkaCeNVWs+8VvgGFd0yY6w8YMwTJ6DpdIDplzOWXkkAkTFjqWBjwHC1qyIkE9a6pYPyie0uAKcfQcJOxD86alzcmBHttzLntsnXL0Dd+dccRCBh3IgAOwoCUrEtSzqYr1g+KpNQbkRWYYyFlzDAmcw7XMhpx+zbc9tsecXzIBAQMZcAAWtGRFgno2VbF+WOwC82bmyPKiBwyb94DRJWzIyV0Kw7bZnjKeMIIEdHT/8AIsaMmKBPVsqmLdL3ZBMrJZM4MuK7bOmw8O6UgzxmAZvYR1zICEXTBmwQ3YBwtasiJBPVdUsX5Y7AqfSNvMhHzCEGTKyGgTHWQZ+ZyLxCcJuinTjN6AfbCgJSsS1HNFFeuHxa8gQtY2Uylya9oT3jgcWMJYapkDDgc4sgmjAftgQUtWJKjniirW/WLPSIAgp80RCwLW0hoGCVyiTXQsiCObMBxwABa0ZEWCeq6oYn2fn/Niy7CT5k1OnugSxoojg/SRUxBw0CUY8Cc4sKAlKxLU8zlVrIEfeZKwnB4kcIkOjAUZcuzIW1rAsfCafbCgJWskqOcaVTwEYekejwGHsCBDjkESBjjkNX+xYEFLNklQz/+q4iELwtI9HgMv+J0NBgQtuUKCem6miocsCAvGmqAl15Cgni9UxcOgJTcjQT23SYJ6bpME9dym/wAbitmQSYnqwQAAAABJRU5ErkJggg=="},{"name":"Uncut dragonstone","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAEHUlEQVRIDbXB3WobRxiA4febXdkNactC78E7NzA+HJ+1hF5B0igH6TWUkrrOpfS8Z61xCCFQ0BIE1dyAvJDDxMRO7JWjH8vana+RQCDhpHUhfh7xznKTxDvb6fVZ2tm2fFbine30+iLCknc5n494Zzu9voh4l3MDxDvb6fVZ2Nm2/JcilN5tcW3inQWKcAio6s62ZUURStY5vgs8A7zb4hrEO8tSp9cXEe/yIpQsfMsPQgoodUQNKXDGERB4zoJ3W3yaeGc7vf7OtgU6vb6IgLSzPYh1Vb/jCGIkRmJKCgjJjOl7ziCyEHgOeLfFx4h3Fuj0+sDOti3CIciD7LGCVrVkRjCvq5eGDwSIREMKXDA0MGLEQuCZd1tcId5ZFopwCHiXF6FsZ3uCUaISDYmiVXU8ZQgS0UgDWjMzJIAhAf2L30G9y1kn3lnWFaF8kD1WFLSu6jTbgDioThrijCk0EWpqw1ykAQFzyajLgXdbrBPvLCuKUN7l5zRrCQaYVZM0u3VavQYBTUjHnBsMmEvGhiSCgQuGkHTZB/UuZ4V4Z1lRhLKd7SoIc3V1KaTvOQUidU2dkk65SEinXEA0JCMGkQgEnoF6l7NCvLOsKELZzvZAmupyI/tiWl1IJoPqGDAYIVE00kwZA5Fmk9sD3gANMcF0eeLdFivEO8uKIpTtbA8i0BBTWsB59RZoaFgQaKgnDDe5dcqbBAPCnHZ5AupdzpJ4Z1lRhLKd/Qoo2lR1pFF0xAA0oWUwkWiQGZcThgYZM2auYaHLE1DvcpbEO8uKIpT3skdUmEwMLQMRfVe9qqlTUqDF5ozLFhunHH3FN2ccMZdAA9LlANS7nCXxzrKuCOW97JFWCqRZoijIWXUMEYzB1EwHnH7J1y02R5xfMgYBBelyAOpdzpJ4Z1lXhPJ+tgvMqqkhSbMWMKjeAkoT0QEnt8kU3WRzwmjMECLQ0PzNU1DvcpbEO8u6IpTtbBckIZlWU2iSbOO8emeQhjhlBJrQimjDFIjoBSPmTJd9UO9ylsQ7yxVFKO9nu8IHUldTIR0zAJkwVOpIA0lCOuMi8kGEZsIkodVlH9S7nCXxznJFEcr72S8gQlJXE8lSreoTXhkMaERZqJkBBgMYkjHDLvug3uUsiXeWK4pQtrM9JQKCnFZHzAloTa0oRDCROtIwJ4ZkzKDLAah3OUvineWKIpR3+SnNNhQ9qV6lpJEmoiwZEojvOQUBA02ELn+AAfUuZ0m8s3xMEUrge36MaEoLIphIA8qcDDg2pDU1YJh7wT6odzkrxDvLJxThEISFOzwEDMKcDDgGiShgkBf8yZx6l7NOvLP8qyIcMics3OEh8JTfWKOAdzlXiHeW6ynCIXPCnLLCu5xPEO8s/1MRDr3LuR7xznKTxDvLTRLvLDfpHxE395B0SVMTAAAAAElFTkSuQmCC"},{"name":"Uncut dragonstone","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAD1UlEQVRIDbXBTYoc1wEA4O+9qtaECJyG3GG6LvDI7m290A2CJWR0CWPZ8kmyzzIWI4Igq0IMiDqBmiwVW5Y1Uo1mNH/d9V4YhYZpxgryYr4v5NS5SSGnzk0KOXVuUsipc5NCTp3fox+WOe36bCGnzqf1w9K2v/jyuafIaddnCDl1rumHpY++9FXURGFlTQ2aKLz1Cs899VFOuz4t5NTZ1g/L+/NHRS1WB+PPRa0matAiCpPVoXeUokTxuafIaddvCTl1tvXD8uv5D1WdTI0mCP8Z/42gQTUFbeTUEfHUB5fKc09z2nVNyKmzrR+W9+ePgliVojTaqozj61PHxGqiFmXtIppRWrOi/MvfqTktbAs5dbb1w/Lr+Q9VxWTVmGEcXxf13Fk1UYs1gbpWoogzH/bt5bRrW8ipc0U/LL+af9OaBQ3One3YORh/Ilal0Z54HzRROHXSaooahRNHUfPMY2pOC1eEnDpX9MPy3vx7KgFrq0Y8Gg8KkzVT1Jw7a7QrZ0WJmhOHk0J87p/UnBauCDl1ruiH5f35I0zWMzsXzoL4dnyFRhtFyqScO0Ex7fjjO7+4VIj7nuS064qQU+eKfljenz8qKqrSmmEcX6OaCFTCZH3qaMftd35xqaFg3x41p4WNkFPnin5Y3pt/H4WiFOvJRD0eD4sycysIVSVMLk4dR/HEMYrio3171JwWNkJOnSv6YXl3/i0BrVsu1Tfjy7VVa4bWrbVVa/bOqy/8+Y2fETXFhH171JwWNkJOnW39sLw7f1gVRE1VgzCOv1broI3CysWhg9v+dMutD47OfCBSsG+PmtPCRsips60flnfnD7F20WhatzCOv6IolNGb277AzB/OHJ84Kv5n2veEmtPCRsips60flvfm30UxaFbOitpq349vXSqnTqppZoeycoGinDiOIp55TM1pYSPk1LmmH5b35t8RonDhvNEcj4dRPPF+sqYSGrOVM2qhmC6cRs0zj6k5LWyEnDrX9MPy7vwhodWcO2u0k/Wb8WXQVJONtQtiFBDFE8fPPKbmtLARcupc0w/L+/NHkwlBPBh/ikIQJqVYo6iEal1MiCLh2OG+PWpOCxshp841/bD86/yb1qwqb8aXUUuloKhRoKEeOSC6VIr6zD+I1JwWNkJOnd/SD0vc8QAzbSFSqCYEYfQ6atbWiAJ6P1JzWrgi5NT5hH54QfDRHQ9sRPHQa2IxESK9H12qOS1sCzl1/q9+eOFS8NEdD/DE32ypyGnhmpBT5/P0wwuXgkvVFTktfELIqfM79cOLnBY+T8ipc5NCTp2bFHLq3KT/Atqk1JDXK1vsAAAAAElFTkSuQmCC"},{"name":"Uncut diamond","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAFHUlEQVRIDbXBT28bxxkH4N87u7OkLSe9xMiluWrnC4yOow9ToL0WKFD0nCYC5NaJFDt2E8PXFo1rW1VbIAGC1BrkxAVyK0quKkuUZUWKTIn6S3J3530rCiBAQnHhAvbzkLMGbxI5awCsNJoAZmcMXjdy1qw0mrMzxmctEZmdMXityFkDwGctZ9OVRpOInE3x+pCzBsBKowlgdsb4rOVsipfzWe7sNF4ZOWtwwWctEZmdMRjjsxyTfvnzny18fh+As9N4BeSswchKo0lEzqY+y3Fhce79WMVEKMqq4iqJE1L0n7WnABbv3ccFZ6fxcuSsWWk0Z2cMgJVGk4gA8n9b4ooH5SBfe8rCZVUJc5IkAEWKev3+8+93hJkhCrR47z4AZ6fxY8hZA2Cl0QQwO2N81gLo238sS8VlVcZxrOKo8d13AEWRAqisikQnRNTZ349i1ekckCIJvPD5fWencQk5a3DBZy0AzqY+y/3y44iiwCEETmo6BH662T48OgQoDDGDB72+TrSwaJ0EDr95/0NAnE0xiZw1mOSz/Nu//5VZwDIoivrVGjO3t7aqMpyenYYQWKQoSyISkVAFUnSu2+3O37rj7DQmkbMGY3yWf/XgT/WkFscxCMfHJ9emrrbW1jEkida7L/Z0nCiio+PjWMfMrJR60enoWM8tfAKIsynGkLMGY3yWP1l+JEGICAq9Xl/H8db2NkTKoiqrSmt9fHaSaH1yesYcYq13d38IHEjRx3fvAeJsijHkrMEYn+V++TERDfqDqWtTxycnSkXr7bZAdBTHOg5VCMzdo0OBMPPbU2+tbWwACMxRpH53+66z0xhDzhqM8Vnul5dYGEAVwpVaDUD72TMARVkCBICAsixfdA9+8tbbaxsbRFCkABHgxq07gDibYoScNRjjs/zJ8iNiCMmgLELJLGFnb0+C1Os1IsVVUEr1B/39wy6ROuh2BRKqgAs3bt8BxNkUI+SswRif5V8//AIgRagldSIwpLmaDwZFLUkgqF+5MhgM6kltdX3tvZ++11pdBSHRuihKimh+8VNAnE0xQs4aTPJZ/vXDBywMkUQnLIFIrbc3QxWiOIqUOuv1n+9sX3/nnampq3t7Lw66hxSRBKGI5hc/BcTZFCPkrMEkn+XfLP0FQK/Xj6PoSr0uwObWFoCyrETQfrb57vXrLHJt6mqne7C/fyCCc2Wofn/7LiDOphghZw0m+Sx/svSIFHSsT05PA3O9Vnu+/T0IVQiHR0fMXK/VROT0rAcCM3f29yMVEWFu4RYgzqYYIWcNLvFZ/s+lhzSEs15Px/FepwOiTme/rKqKQ0SqrpOT3hnLOa6q6vDoONF6buEWIM6mGCFnDS7xWf7N4wdEpHV8fHKq46Ssin+1WjpOQggsAQCBBoMBKRUpJYwoVgfd7ocffwKIsylGyFmDS3yW++WliisASql8dU1FikiFUBVFIQIWJlBRFEEYDBWpKFI7uz/cuH0HEGdTjJCzBpf4LP/yz3+s1+rM4d/5qo41C3NgkOAcQalIgmzv7tAQAg/NLSwCChBnU4yQswY/xmc5gM8+uiEi9bgmEFIUWEQCQOfWN9qJ1oOyEEEUKRH54KNFQJxNMYacNXgJn7UAwoXPbs4LQExKKYqpvfmMQFUIStG5395cwJA4m2ISOWvwP/mshSHChT/cnCfQL371a0wQAM6muIScNXg1PmthiDAkGONsipcgZw3+Tz5rOZvi1ZCzBm8SOWvwJpGzBm/SfwHQn9yfO46BTwAAAABJRU5ErkJggg=="},{"name":"Uncut diamond","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAEwUlEQVRIDbXBzW8bRRgH4N87O7N2m1IuVFzgmt1/YK7zzyDBFQkJcS4QKYVCQr8oVa8gKG1DAAkkBNWKEytxQ5ANaeI0TZOmTpxPe3dn3pc4kiVbaVF7yPOQsylOEjmb4iSRsylOEjmb4iSRsyleRJYXzo7juZGzKZ4tywuMevvNN6a+uAnA2XE8B3I2xTFZXuDI9MR5rTQRqtp79rGOSdG/C/cBTN+4iSPOjuPZyNkUo7K8yL6fYc9lXRYL91m49l6Y4zgGKFLU7fUePloTZoYo0PSNmwCcHcfTkLMpRmV58fuPs+K59rXWWunojz//BCiKFEC1r2ITE1F7czPSqt3eIkUSeOqLm86O4xhyNsWoLC+y2bsRRYFDCBw3TAh8f7m1vbMNUOhjBpfdnomNsBgTBw7vnf8QEGcTjCJnU4zK8uL3H75jFrCUVdU83WDm1sqKr8P+wX4IgUWquiYiEQk+kKJDnU5n8tJVZ8cxipxNMSTLi59vfdWMG1prEHZ3986MnZ5bWESfxMasP9kwOlZEO7u72mhmVko9abeNNhNTnwHibIIh5GyKIVle3Ju9I0GICArdbs9ovbK6CpG68rX3xpjdg73YmL39A+agjVlffxw4kKJPr90AxNkEQ8jZFEOyvMhm7xJR2SvHzozt7u0pFS22WgIxkdZGBx8Cc2dnWyDMfHbspYWlJQCBOYrUR5evOTuOIeRsiiFZXmSzMywMwIdwqtEA0HrwAEBV1wABIKCu6yedrZdfOruwtEQERQoQAS5cugqIswkGyNkUQ7K8uDd7hxhCUtZVqJklrG1sSJBms0Gk2AelVK/sbW53iNRWpyOQ4AOOXLh8FRBnEwyQsymGZHnxy+1vAFKERtwkAkP+mS/KsmrEMQTNU6fKsmzGjfnFhddfe31ufh6E2JiqqimiyekrgDibYICcTTEqy4tfbt9iYYjEJmYJRGqxtRx8iHQUKXXQ7T1cWz33yitjY6c3Np5sdbYpIglCEU1OXwHE2QQD5GyKUVle/DrzLYBut6ej6FSzKcDyygqAuvYiaD1YfvXcORY5M3a63dna3NwSwaE6+I8vXwPE2QQD5GyKUVle3Ju5QwpGm739/cDcbDQerj4CwYewvbPDzM1GQ0T2D7ogMHN7czNSEREmpi4B4myCAXI2xTFZXvw2c5v6cNDtGq032m0QtdubtfeeQ0SqaeK97gHLIfbeb+/sxsZMTF0CxNkEA+RsimOyvPj17i0iMkbv7u0bHde++mtuzug4hMASABCoLEtSKlJKGJFWW53Oh59+BoizCQbI2RTHZHmRzc549gCUUsX8gooUkQrBV1UlAhYmUFVVQRgMFakoUmvrjy9cvgqIswkGyNkUx2R58dPXXzYbTebwdzFvtGFhDgwSHCIoFUmQ1fU16kPgvompaUAB4myCAXI2xdNkeQHg+icXRKSpGwIhRYFFJAB0aHGpFRtT1pUIokiJyAefTAPibIIh5GyKZ8jyOYBw5PrFSQGISSlFmlrLDwjkQ1CKDr1/cQp94myCUeRsiv+V5XPoIxz5/OIkgd56512MEADOJjiGnE3xfLJ8Dn2EPsEQZxM8Azmb4gVl+ZyzCZ4POZviJJGzKU4SOZviJP0HmOyyn7R0Z3MAAAAASUVORK5CYII="},{"name":"Uncut ruby","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAADnElEQVRIDbXBQW4b1wEA0Pc/STstUGLQO1QzF/hafm16iS58hxZ2lAN1261gOPBGs9RcgGQX3RRwYifurx3bikTOL0YQEQqKAxew3ws5db6kkFOH84sVTo47n1vIqTu/WJ0cd/2wrrWeHHc+q5BTh35Y59SeX6xCCDm1Pp+QU4fzixVOjrt+WOfU+rh+2OR05JOFnDo3+mFdaz057hzoh427/tyMz0tETkc+Qcips3d+sQoh5NT2w8aNvzRjIHLNjoXJK5PnJbqR05GPCzl15xerk+MO5xerEALhtFlWtsp3JtcmC5PAFW8YufpT9+Cfq+clIqcjvybk1OH8YoWT464f1oRvmmVlx4zAvxTMTK5ZmLwj8hORkecl5nTknpBT50Y/rJFT2w+b02Y5Y8fIjMor5dJkx2iyJZjMTP5RIjWn1l0hp85d/bD5pllWk60y1+AHpXLJSGVHoLIjmFzytMScjtwVcuoc6IfN35pxrpkz8rPyQPNScWNOYWHygTmVwFvmnJVIzal1IOTUOdAPm6+bZSWYXCszXptsqUQumfMzIzPeMBL5tkRqTq0DIafOgX7YnDZLbJWvNJdK0LxUMGfGjsp7RpPf8dKkEnhWYk5HDoScOgf6YXPaLKvJyJzIDwq2bgW2vOP3fE8gmow8K5GaU2sv5NQ50A+br5tlYGSnVHa8ZcdDAjsiV7w3+cDI6NazEqk5tfZCTp0D/bB53Iw0eGAy8kLZMjd5yDULvuePvDCZsyXytERqTq29kFPnrn7YPG7GajLTjAR+VHbMTLa8ZslD/st7IiORpyVSc2rthZw6d/XD5kmzrGyVyEKD1wp2VH7kD1S+4i3v3Bp5ViI1p9ZeyKlzVz9snjTLyIxLpTLXFCWw5ZKRhcmlW+9MImclUnNq7YWcOvf0w+ZJswwErpQZbwj8xI4dkTlXVEYq71lwViI1p9ZeyKlzTz9sHjfLQORKmWl2yr9ZsGM0iVybzNz6wFmJ1JxaeyGnzj39sDltlqNJ4DslENmxo7p17ReRtzwtkZpTay/k1LmnHzZ/bcaFZuSFMjOpJiORQOU/RJPR5KwgUnNq7YWcOr+mHzZ41IyYu1UZTSKvWHDtF2clUnNqHQg5dT6iH9YENx41o70Zr4iMbp2VaFJzat0Vcur8pn5YmwQ3HjUj/l6iOypyat0Tcup8mn5YmwST6kBOrY8IOXX+T/2wzqn1aUJOnS8p5NT5kkJOnS/pf/PqgpAvDcS/AAAAAElFTkSuQmCC"},{"name":"Uncut ruby","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAADSElEQVRIDbXBsW4cxwEA0Ddzd5IdIIdF/iG8/YFpp/JPpNA/JJBMf1DatISgQNW2+wPWpkhjQLZkKxPJkmjydicYggffgVYgF3wv5NS7TyGn3n0KOfXuU8ipd59CTr3fYxinnM58tpBT79OGcXLqq255XiJyOvMZQk69O4ZxcuMv3RKIXDOz0bzWPC/RjZzOfFrIqXdqGKfzblvZK99rrjUbTeCKtyxc/bl/8K9vn5eInM78lpBT79QwTt9028rMisC/Faw012w074n8TGTheYk5nbkj5NQ7NYzTebddMbOwovJaudTMLJo9QbPS/KNEak47p0JOvVPDOH3Tbatmr6x1+FGpXLJQmQlUZoLmkqcl5nTmVMipd2QYp791y1q3ZuEX5YHuleLGmsJG85E1lcA71lyUSM1p50jIqXdkGKevu20laK6VFW80eyqRS9b8wsKKtyxE/lkiNaedIyGn3pFhnM67LfbKF7pLJeheKVizYqbygUXzJa80lcCzEnM6cyTk1DsyjNN5t62ahTWRHxXs3Qrsec8f+IFA1Cw8K5Ga085ByKl3ZBinr7ttYGFWKjPvmHlIYCZyxQfNRxYWt56VSM1p5yDk1DsyjNPjbqHDA83CS2XPWvOQazb8wJ94qVmzJ/K0RGpOOwchp96pYZwed0vVrHQLgZ+UmZVmzxu2POS/fCCyEHlaIjWnnYOQU+/UME5Pum1lr0Q2OrxRMFP5iT9S+YJ3vHdr4VmJ1Jx2DkJOvVPDOD3ptpEVl0plrStKYM8lCxvNpVvvNZGLEqk57RyEnHp3DOP0pNsGAlfKircEfmZmJrLmispC5QMbLkqk5rRzEHLq3TGM0+NuG4hcKSvdrHzHhplFE7nWrNz6yEWJ1Jx2DkJOvTuGcTrvtosm8L0SiMzMVLeu/SryjqclUnPaOQg59e4Yxumv3bLRLbxUVpqqWYgEKv8hahbNRUGk5rRzEHLq/ZZhnPCoW7B2q7JoIq/ZcO1XFyVSc9o5EnLqfcIwviC48ahbHKx4TWRx66JETc1p51TIqfd/DeMLTXDjUbfg7yU6UZHTzh0hp97nGcYXmqCpjuS08wkhp97vNIwvctr5PCGn3n0KOfXuU8ipd5/+B7w3WJCcBwGbAAAAAElFTkSuQmCC"},{"name":"Loop half of a key","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAACxElEQVRIDbXBTYscRRgH8P9T063ubDCbmXhUCchWfYHn+nyEPQVEEYRFLxHZGY0vI0FcVhQxMfGgoh4UDQa9CBtEzLGudRMUUp8gvhG3dybb3TNd5fRi2IjupifSvx8JG7SJhA3+H+s87iC8ijuQsMG9ss4DWFs7rRT1Tj403s12suyH77eFV3EbCRvcE+v84088nSZz6fLysRO93mQ8uXnzj99+/+W7q98Kr2IfCRsszjr/zLPPA6EoyiLfe/iRUw8eP16Wxa83bownu1e++hyIwhoACRsszjq/vn5mPMl2suz+9L7t7W8A9eRT6wAU6PLlTwElvAqAhA0WZJ1fWzu90uvne5OyKMbjcSdN+/2T3aUlok62u/P1lc8ABURhTcIGi7DObwxendbKIs/zosiLW8vdY0vd7tID3Vk1+/ij91BTQBTWJGywCOv8Cy+eCyFUIcymRT63d2symTx66rFQzbLszy+/+ARQQBTWAEjYYBHW+cHwNSIKoZojhY5Kfv7px2vXruKAAqKwBkDCBo1Z5wfDUaeThFo11+v1i7J85+1zgMKBKKyxj4QNmrHOD4ajJEljjCGE6bQ80etvbb585rmzH35wHlBAxD5hjdtI2KAB6/xgOOokqSIKIZTTcmVlZWvzFdQUalFY419I2OBurPMbw1HSSZM0CVVVlsX7l97C3xQQAQhr/BcSNjiSdX5jMErm0hRAkeeXLr6JmkItCmscjoQNDmedP/vS6wA6SaKUyvO9ixe2UFNABCCscSQSNjicdf6NzXdn1bSaVWVZXji/iZoCorBGAyRscDjrPBDwDwqIwhrNkLDBkazzQMABBURhjWZI2OBurPOoBdQUEIU1miFhgwasuw4QalFYozESNmjMuuvCGosgYYM2kbBBm0jYoE0kbNAmEjZoEwkbtImEDdpEwgZtImGDNpGwQZv+AqztLJD72YmsAAAAAElFTkSuQmCC"},{"name":"Loop half of a key","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAACtUlEQVRIDbXBwWsUVxwH8O/vzVtiYkrc3fYqSGnm/QO/6+9vyKG9CNKD4qVScDBCE0q3pJ6S6kUEKYigCD0pzUG8vuu79OLB9xcEpJLuJJuZ2Zl57SxKLG3irGU+HxI26BIJG/w/1nm8R3gV7yFhg49lnQewtvYlUTQcfpqm6Xi8//z5b8KreIeEDT6Kdf7ixa+17mndO3t2eTAYHh4evHnzx+vXe7u7T4VXMUPCBvOzzl+9+i0QiiI7Ojo6f/7zlZWVosj29vYmk4PHjx8AQTgGQMIG87POX7nyTZqm4/H+wsLCs2e/AurSpcuYefToF0AJrwIgYYM5WefX1r7q94eTyaQo8sPDcRT1hsPPlpaWiFSa/vnkyQNAAUE4JmGDeVjnr1//btoo8sbR35aXP1lcXDxzZqmqynv3fkZDAUE4JmGDeVjnb9z4vp6ZTvM8zyaNgwsXvijLMk33Hz68DyggCMcASNhgHtb5JNkkorpREZFS0cuXv794sYtjCgjCMQASNmjNOp8km1EU1W9Vg8GwKIpbtzYAhWNBOMYMCRu0Y51Pkk2tdQihruuynPb7g9Fo/dq19bt3twEFBMwIx3iHhA1asM4nyYbWPSJV19V0Wpw71x+N1tFQaAThGP9CwgYfYp1Pkg2te1rrqqqLIr9z5ye8pYAAQDjGfyFhg1NZ55NkI4p6vZ4GkGXZ7dtbaCg0gnCMk5Gwwcms8zdv/gBAa62UyrJsZ+dHNBQQAAjHOBUJG5zMOr+1tVOWZVVVeZ5vb4/QUEAQjtECCRuczDoP1PgHBQThGO2QsMGprPNAjWMKCMIx2iFhgw+xzqNRo6GAIByjHRI2aMG6VwChEYRjtEbCBq1Z90o4xjxI2KBLJGzQJRI26BIJG3SJhA26RMIGXSJhgy6RsEGXSNigSyRs0KW/ALKiLJDomaTbAAAAAElFTkSuQmCC"},{"name":"Tooth half of a key","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAACmklEQVRIDbXBwUsUURwH8O/vubuEeLGDEQQdhJ13Egp+p+D3t0SwSYFpBzWEkhCiIqigQ0LUzZMHiS5RiD28yCPQg4JDJEgl6Kqt68w4466vZkkKyhqD+XxIWCNPJKyRJxLWyBMJa+SJhDXyRMIaeSJhjTyRsEaeSFgjTySskScS1vgrY30cEi7jmEhY42jG+gMDN4Ig2NnZXlv7ZMyMcBnHQcIaRzPWHx6+HcdRo7G/kVqbnn4jXEZmJKzxJ8b6ACqVPiIAVCwWiNTWVnVzs/r69SvhMrIhYY3fGOtfvFhpNJpoIaJisVQoFNvb22u1ry9ePAWcsIcMSFjjF8b6AC5dugKgVtsulUpJkgCuVDrR2Xny1KnTX758Hh9/CCjhMjIgYY1DxvqXL18DHADnUK2ud3R0NJtN5w6I1MTEcwC9vQPj44+QUsJl/AsJa7QY61+9et05h5ZGo1mtrnd3l6MoSJJ955rPnj1BSgEHgAKcsId/IWENwFi/UumjFqXoO+dckKpvb28yX4jjvTAMlpYWZmcNUk7YQwYkrAEY6w8O3oqiMAyDIKjv7tZ7es5H0V4YBvV67cyZs4VCm1Jti4vzU1OTgBP2kA0JawDG+mNjD+I4jlJhGAa12teennNhGK6sfJicnADQ3z+8sPB+ZuYt4IQ9ZEPCGi3G+qOjd5VSSRJHURQEuzs7ta6urseP7yGlkDpASgmXkQ0Jaxwy1gdw8+YdpVSSxPV6fXX148uXk0gpwAGElBP2kA0Ja/zC2GWARkbGlFIbG+tzc+/m5+eRcsIeAGOXhT1kRsIavzHWHxoavX9/FD8owAl7OD4S1vgTY3385IQ9/BcS1jiCsctoEfbwv0hYI08krJEnEtbIEwlr5ImENfL0DSzpLpAdxBUJAAAAAElFTkSuQmCC"},{"name":"Dragonstone helm","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAFIElEQVRIDbXBe2xTVRwH8O+57d2ySWcn4HQSFaO9RzTE18/Hgr+YGIRpiIkPjI8Rg2KCM8SA+gfERzRooi7GaEREiArxQWZQFlDURDwOzDxIjEiVM8jqmKNd69r1th1rt16lccnIVqh/+PkIJon/QmnDFEKJ0oYphFMSTBIVU9q0t/TctXk2U0hps3Hxvoe2XsMUQnmCSaIySpv2lp5IKvxEx20ANi7eF452talWwGNyUIZgkqiM0qa9pSeSCtfXNAAIR7sAtKlWwGNyUIZgkqiA0qa9pSeSCgO4rKEpHPsBQP9QT5tqBTwmB2UIJonTUdq0t/QAiKTCAI65kcbAbACrOm4FPCYH5QkmiVNS2uxcmgAQjneh5JgbaQzM/u7INgDbwxuYQihPMEmcjtJm59LE0aFulJi/9quLv48f7o3s3gt4AJgclCGYJE5HabNzaeLoUPdn13UUsrnjmexI2j0+OOTGBiKdPwFgCqEMwSRxSkqbzh3b0582vU3rR1JuIZvLZ7I3jFb1/tkfi8dvyC2P+Y5s0s8xhTAVwSRRntJGf/3lq4nD+dzwaG44nx1eUKh23cyf0ehQOh0fHIzGYuFD3YAHgMlR2gBgCmGcYJIoQ2nz2LxXm1vPnXZGbS6XczPZITedSqf7+49lcrkh1x38RzK5/8BBjHvzph/zgcGVHQuZQigRTBJlKG2W8Mq6YuP8R2ZkcrlMNutmMul02s1kvt11AEBm2D3/koE7/DtQkg8MAljZsRDwmByUCCaJqSht6OEHLzVn1RUbo0N/oCQx9kdxbAwl/alI043JXd8gluprm6ei/t/ODcxe2bEQ8JgcjBNMElNR2tCypZceCgLoTRzGuOLY2IJbjsST+UT8uGXBb/l37IksuWL9K7uX4wSPycEEgkliKkobz3sA8WzLHRckMwPZfAbAPXdG3Gz+rR+Do4UxoAhYt5wd29QRASzAA8Dk4GSCSWIqShs0zAzW1FTX1v764QV/DRb2dCZe6pyB0eKimb35/OjnfWfB8i08O97+faT1ko/X6vsAMIVwMsEkMYnSZplq33D38mCgprqqFlU+27Lh88ECbNtv+YFi2/0jq7fXP7sg+dRafe95H3Slt8np177TtYYphAkEk8RUlDZomBkMBKprquCrsi0LPsCy/bYPfv+7y0ZXfHLmI1f2vfk2EiMHnr5coeRQYc87XWsAMIVQIpgkJlHaAEU0NDQEg6iqgu2zAfgsWLbftuG3auvPfPy6oy+/NjYtcPTnw2lM0DZvN4BVnTcxhQAIJolJlDZAMTirobpuOqp8gA+AbduwLb9lN14tH71o/3MvFgA4zsDBX6Y3z1mybu9qnMRjcgAIJolJlDZAMThrVnV9HXy+2M8HMe6rLdcDeHSVC8BxBpLpkZvtDZu7n22eswQl6/auBjwmByWCSWISpQ1QDF54YSrSixM8/Et8+0nTilUFAMOFHF2V/OiHDFJpnMRjcjBOMElMorRBsA6pNOABYHJQorR5b+0VbetslIyhGO77CfAwAZODCQSTxFSUNoDH5GACpc3G5+e+sWlafnTk1tuS0YHjW7b1Ax6TgzIEk0TFlDbrnp67fvO0+c3RHR31sy7q/UrFAY/JQRmCSaIyShu1tWnFU5jfHP36i3MW3R5/4fVuwGNyUJ5gkqiM0mbn+9dH+tzEYP6Ztm6c4DE5OCXBJFEZpc3aJ+WaV37HCR4AJgenI5gkKqa0ATwATA4qI5gk/k+CSeL/9Ddw31OflLpqQgAAAABJRU5ErkJggg=="},{"name":"Dragonstone hauberk","base64":"data:image/png;base64,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"},{"name":"Dragonstone greaves","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAFGUlEQVRIDbXBfWyV1R0H8O9pvUibka6Bi7yoCerucxIiNrif3ZrymxgtMQSh09jE9yjQSGCBJf5B3LJpFuYfDolZMvdiZhbnVmMFcRN5UcuxvuAhDYaEeE+rXli59LaD3j695T7vZ7uNTSC02mr4fASTxHegtFnupHuyQ0wZTEYwSXwrShsALY2LghC506VcwWXK4BKCSWLmlDZb715aWxscrFkBm6zNPvZCdnV/wWXK4GKCSWKGlDa/bZdeEB/t9Udobdv8BdmjPoA93bv6Cy5TBhcQTBIzpLT5zQZZ9uOVa3f8+oP3kzgunjwZ/18QeceO9BdcpgwmCCaJmVDaPLRx/ZLwcE+vP9zYCmtXDF5b18+n6ve+4+mW2h/v7t7ZX3CZMhgnmCSmTWmz6Ylt7vBIqe+QH+FHt7YfHBv46acbRoOzCeJ/1v1u9eDDVdT11luvnMi5TBkAgkliepQ2G7f9DMBocWTs8/eafvLgv8ZGkcR3HL0HwNi1+vD3e8NyOfHD4JN9J/pcwDI5gkliGpQ267dsApAApRG3nFPE7QfGBpIkRmLjJEESJ4mFtStnzd739svH+1zAMjmCSWIalDaPbGqHTUZHRgF4pz7877JV1bNmIU7iJIFNtjbc/IcXnvbD8Ko67O0eAiyTA0AwSXwTpc2D7euttbC2NOLmeg4vXlAz/MM1YdlbVXd1Vex2q44kxqJ58AN0duUBy+RgnGCSmJrShimjtLlv/SM2sadzJ91isSqVqq6ufrytbU/nc2GEMIyiGNek4YfwgnBv9xBgmRyME0wSk1HaAOhYF7btSd370P1hFEVBMJA/E8dxzxHdyM3VVVXemb4ly1eUSqUwCJI47jr0Liosk4MJgkniEkqbB2jDy/rPW2/7xawrrrx+1eyOQwfOFYaO9RzDuMbmJgALFy/2fX92zZVBEPy78w3AAmBycAHBJHExpU3HurBtT2pL69KF87aNnCqMDS0+6D2TPfEZYFEhWtasnr9wQRj4QRBGfvBm527AMjm4hGCSuJjSZvPyl05vGoz+9vvNGxf1vL9x+x8fRYVFhbhz3V3z5qdLpZKNK958bTdgmRxMRjBJXEBpA+DOZ5+6Yu+LQRT5HubWorM7D1hUiDV3t9bPn1c8O+yVy1EUvbtvP2CZHExBMElMUNq8ctf5v6/cWb37T1/my+n61MBQ6UTOBSwAJkdp89Lzu9746KOzQwXfC450fwhYJgdTE0wSE5Q2z7T/9ePsr8pBVBgsxUAQIZtzAQsIAH/ZtbPn9TPD5XP/0C+iwjI5+FqCSWKC0qb1tus8LzpzthjHCDxk+13AAqK5Ib162VyveguAo//pvKn6jh37twOWycHXEkwS45Q2P793WW++mBsoAjje56LCAqK5IZ3EmDOnpuxFK296Msy7O/ZvByyTg28imCTGKW02ty7tLYzmB4vH+1zAokI0N6STGPV1NWU/8rwwP/f6XNfHgGVyMA2CSWKC0qalcdGBI3nAMjkAlDZNN6ZjYE5tyvPDkcwtraO3Pr3vCcAyOZgGwSRxAaUNYJkcAEqbphvTMVBXmzrvh+eW3LIq1fTcq08ClsnB9AgmickobbghHcUYLaP+e6nbl/8yNj94qvt2wDI5mDbBJHEJpU1by3VBAC+Kyuejrp48vmKZHMyEYJKYjNKm4Ya0c/Wcjq4vAItxTA5mSDBJTEFpgwrL5ODbEkwSU1M6y+TgOxBMEpeTYJK4nASTxOX0PwCpop+4c5ErAAAAAElFTkSuQmCC"},{"name":"Dragonstone gauntlets","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAEgUlEQVRIDbXBX2xTVRwH8O9p79p1Hd2UDaTMSjBrT7ZsIepPQjEnBCeIMDIMkmwgYkzgRR/0jYTog0ReNEQSjPqgMeqDBGMkoIkaQo5mcbmy7I9idgeDlG0MC6a07E97z7nHrLJkC4L1Tz8fJoijnJggjnJigjjKiQniKCcmiGMeaTuC4vj/MEEcc6TtHNjbePD9YRQJiuM/Y4I4iqTtrKfo87uW/PrzpDEYOJc51Z1GkaA4/i0miKNI2s6mZCxcaT3UEjjbnwXQ0hQ+25eZnsF3vWksJCiO0jBBHIC0nY3JWCiASDi4ZUvk0vBkT28WwCOrIj/1XXcVjIe8C6Wh3Hxeo+dcVlAcJWCCuLSdDaujVSErGLBqw4Gurnv7e28YYHAgV1DK1SgoBC1cyyEcdA3geTjxQxowAAMgKI47Y4K4tJ2tIhaqtMZ+y92/ZNHubUsuT0z1D2RcDVcrpVBwEQlbEzdQG1LGwFX47PQ4gGNvPnzPsoondv4IQFAcf4UJ4tJ2drStDAb9BVf7gH2d9y1uCLx1ZEwVdCigqkNW3lXGIJ216iNKaeSVOj/qRhdXdHYs9zPUNQS3vCAzGZ+gOG7DBHFpO89ubrw4llmxrNbV+pU9Ue3hw+PXlNaPrw0rjS+//d14qA5Z9TUouGp4XNXVYPtTy09/f/XJ9UsZ8y99INC2+UwGPkFxLMQEcQDSdjYlY3U1wYLW+/fGCq43k1eT096xr667Sk/nlatwQqYAHNrHh1JZANVVFoq2bowy4PV3UrJvFPAJimMeJogDkLbTsS62KBR0RjM9g2kU1cLb0dFUcPV0Xl++museTAPY2x4zQPuGpX6f3+fD5yfHAXQ93XD004mLE7nec2nACEpgDhPEUSRtJ9lSP1XIa43B89laeADWJldMu2pmxu0eTAM4/GLz8FgOBps3RE9+M46indtiyvMOvXvJqrD6hzOjV7OC4pjDBHHMkbZDTfWuzvcNZWvhrUk2aI2ZvCv70oAB2OGXmi9dyXkGf/I8GIOd22OexsH3UsEAMhkl+8YBIyiBIiaIY460nVp4ANYkG3ywXK2+6RnHLINZ7OjLzeFQxcCFrDHwPKUNnntmhdbea0dGrAqrwgKD9cWZEcAISqCICeKYR9pO+2Mx5oNWONWdAgxmMQBdbdGqqkiyOfDLyE3PwHhYFY80t0QM8Gin7BAxDzghU4ARlMAcJohjIWk7uMVgFmtP1kfrQjXVljHITAfWNlUOXMi2Phhpbo3AgDolYACGWUZQAvMwQRy3kfYQbmGdbdFliysr/IAPnof0Db9oDfmYr7k1cuSjKx9/PQwYQQkA0h4SlMBCTBDHXUnb2b9rJQAGKA9TeXWzEFzXEt7zRh9mGUEJ3BkTxHFX0nZWt9S3rVoE+JXWU3k1OYMPTqUAA0BQAnfFBHH8HWk7B3Y3MkB5empGvX08BRhBCZSACeIogbSdV/c0ukof+mQEMIISKA0TxFEaaTuYZQQlUDImiKNk0h4SlMA/wQRxlBMTxFFOTBBHOTFBHOXEBHGU0x8HKgefqPtlsAAAAABJRU5ErkJggg=="},{"name":"Dragonstone boots","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAFbklEQVRIDbXBX4hc1R0H8O+d2c0mu85mqjPuZt2WMdh7bw3CsuXXSLv8kGmxWNtCQRRffGhj1+hDFVqp27AEH1po33wrBRUJ/bPavBRJY4OEg4TKkXXTxcQ5HdNtnGSdP7ubvfN/7j3ndDsyNNNJCqbs5+Mw+fg/CKnQxeTiRhwmH7dKSJWZGE8ksGM1HwBgctHPYfJxq4RUmYnxRAKfaraQLwRMLq7jMPnoJ6QCwOTifxJSJWGSE0kAiQSaLcSHkFsLAMvkocdh8nEdIVVmejyxF6v5AACTi5sQUj0wOwVgZbmQmk4CiAO5QgBYJg89DpOPHiFVZnocQGIvPrWaD5hc3IiQ6oHZKXStLBe8+ybiGuculAHL5KHHYfLRI6TKTI8DSOzFjmoLa4UAsEweBgipHnvwIIBipQUgcdtQpxmdllcBy+Shx2Hy0SOkytLUpfVaYi+aLezIFwLAMnkYIKR69BsHnRhiDna02nj/YmVkZjZ3+iyTix6HyUePkOrxbx4sllvLy4XUdDI+hNxaAFgmDzcipLo3M36fm4o78Ujrua//4Dfvn1tdehOwTB66HCYfXUKq5x45dDVoAogBV0rVSONyqV0oBkwuBgip3lr6/S8//OB5/xCA6bvu+uHrJxrbm8uvvA5YJg9dDpOPLiHVc48csgAs1qtNa1DabJ1dvgpYJg8DhFSHn55PTN5posiEYRRGsZhu14NGsbL6xptMLrocJh9dQqqTr7587PizD3758xZY325eq7bU2D1rbwsmFwOEVIePPpk4MGmiyIThyPi+dr1m2s1aubL86huAZfIAOEw+uoRUj554qV7afiJx5/Dw8LHjz+6Z+1atXMmfPgNYJg/9hFQ0fyQWj4+lbjdhOLJ/VLfbRrfqla1qsXzhj6eYXAAOk48uIdV3Xvr5SHK0Xto2YXR85v5n/vC7+sZG7k+nAMvkoZ+QiuaPxGLOWDo1sn+fiSKrNRA1Nq/VSuWV104ClslzmHx0Camyiy/c/sVJq02tdM1G0dY/rtQ3tzZUvrj6AZOLAUIqmj+SmEjvS45+/3NTkdbpO+7Y3NqqbG4+9ePnAcvkOUw+uoRU2cUXUu6k0cZqUytth/VaWV1uliv5t88ClslDPyEVHT0y+aWDz0zc/aMTr2GHMRT9vd6OZJAsLP+NyXWYfHQJqbKLCyl30hhttTHa1ItbtVJ5Q63lTv0FsEwe+gmpDh998lcPPfzUKy/PNC5aq28b3dNq60Zbx2NYOnMJsA6Tjy4hVXZxIeUdMEZbbUykX3TpnJS/Pv/elffOFy98yOSin5Dq8NPzI389+YWJpDGwQGJfvBPqRlsDWDpzCbAOk48uIVV2cSHlT/3C/crw0FA8Hs8u/BSdSIfhPPNPjr8IWCYP/YRUczPpuw8kLbB/LB5qhJFutLUFlt66BFiHyUeXkCq7uPDbxx7PHvsZLO43FyON8lY71FEnhFi+ClgmD/2EVHMzaQCZA8n9Y/FQI4p0YnTPn9/9OLcWANZh8tEjpLr3e9/NDn+ktY40Iq0bbb2x1eqEuLxeWysGTC4GCKl4Ng3AGBgNDYQaYae9mg8A6zD56BFSzc2kvz2X+fiThrE60mi2da3ergRRoVJbKwSAZfIwQEjFs2ljYACt8e5qGf9mmTyHyUePkGpuJg3g4a9lCsVqpNGJdLWuP9msvrNSBiyTh5sQUuE/LAAmD4DD5OM6QiqeTT/01Yy1MAb/XK/Wmp3zH1Uu5APAMnm4OSFz6GLy0OMw+egnpOLZtDHYYYCwg1BjJVcGLJOHz8hh8jFASIX/Zpk8fHYOk48bETKH6zB5uCUOk4/d5DD52E0Ok4/d5DD52E0Ok4/d9C/wgdmdYsaJigAAAABJRU5ErkJggg=="},{"name":"Dwarf weed seed","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAABiElEQVRIDbXBMW/TYBSG0ecNtCpLfgNTviskFqTbAVW3bAyMSEz8RyY2FnvoYI9ZHE8dGBnSoDZNg21E9jRG8neOwo2cFG5AUTXXl0YGCreiagBJ4YmpKdyAomokhSempnADiqqRFJ6YmsINKKpGUnhiago3oKgaSeGJqSncgKJqJIUnpqZwK6qGg+tLY2oKN6CsVxyEJyalcCMnhRujlXXLQfiCcRRujFPW7eu3/Z8tP3/BegaELzhF4cYIZd2+uZqfXzB7weM9D3fr2yUwC1/wLIUbI5R1++7j/OwVfU+34/Geh7v17XIGQ3jiOIUbp5R165/mZxcgGOg6dlu2v1ndbGAITxyncOOUsm7ff56/PKfv6Tu6jv0T+x3LHxsYwhPHKdwYoazbD1/nfUff0e/ZP1F/38AQnniWwo1xyroFrr7M+z033zYwhCdOUbgxWlmvQPwzhCdGULjxn8p6FZ4YR+FGTgo3clK4kZPCjZwUbuSkcCMnhRs5KdzISeFGTgo3clK4kdNfBdKRgcQBLiMAAAAASUVORK5CYII="},{"name":"Torstol seed","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAACU0lEQVRIDbXBsWscRxTA4d/bkw4TwuIuTeqbh8GN4V0hzLvgzmUwOBDyL4aAIV0w3BQG3TQGg7ndKoUaNWFziiyf1jsTLDAoBFt7JPt94qZMSdwUWG+23Fgtlf+VuOl6s10tNaYGKKWslsrhYmoBtwX/JG4KxNS4BWC92YqIW+AQMbXfhvxXR3deAW4LPhE35ZP1ZrtaakyNW2C0mNoHj+vZnNkR1+/Y/dGdva3cFtwQN+XGerNdLTWmxi0wWkztwyf18TGzOUMm77m66Lpzzn+v3BaAuCmw3mxXS42pcQuMFlP76Gk9O+L4iAEo5IH3l1xfds1pBcUtiJuuN9vVUmNq3AKHiKk9eVYjVBU5Q2Ho6Xv6PW9e7qC4BXHT9WbLLaulMlpMrf9QU5Ez+QNDT9+Te17/toPiFsRNgZgabnELjBZT6z/WeSB/YOg5fbHjo+IWAHFT/rOYWuDkWf3q5x0UwC1wQ9yUQ8TUui34l5gaEChugVvETRknpha4/03uzivAbcEI4qaMEFMbTvJ8fn825+rP7rLjrKncFtxF3JQRYmofPqm/+po80O+5uuguO86aym3BF4mbcpeY2kdP63v3oGLIMLB/x9VF15xWUNwCnyduyl1iak++r6s5FHJmGOjf0+9583IHxS3weeKmjBBT+91PdR7IPf1Avib9uoPiFvgicVPGiakFHj+vc8+rX3ZQ3AJ3ETdltJgaED4qboERxE05UEyNW2AccVOmJG7KlMRNmZK4KVMSN2VK4qZMSdyUKYmbMiVxU6YkbsqUxE2Z0t/k/A2Qid6bdQAAAABJRU5ErkJggg=="},{"name":"Yew seed","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAB5ElEQVRIDbXBsWoUURSA4f+kiE3wIQR3zguclCcpbGzEkLSWKnlAC8FmhjTuQBDS7E4aK2EJ6Gpwd2fuvTNiQHBJNm7A+33ipuQkbgqU48nBvpKBuGk5ngAi4lbwv4mbAuV4IiJuBVur6gZwG3EvcVOgHE9ExK1gC1XdAC8OtY3p/dml24jNxE2BcjwREbeCf6nq5uTZk91He11IMaYQ07vq0m3EBuKmQDmeiIhbwb2qunn1/OkAfZ92dvdCTIvr62UbP9Rf3EbcRdwUKMcTEXEr2Kyqm9cvdehJQxp6Ys8qpLaLyzZ+nYfz6ZXbiFvETcvxhBsH+8pmVd2cHmtMpJ5+SDHShbTq4qqN3xfh48UMdtxGrBM3Bap6yg23gg2qujk91tTTJ+KQYiSk1HZxsYyLNlx+ns3mOzC4FfxF3JStVXXz5kj7gZhSjISU2i4ul/FnG84+XcHgVrBO3JStVXXz9kj7gZDS/NusDYTAKrDo5ufTHRjcCtaJm/IQVd2cHD6OkRBoA12guvjBb4NbwS3ipjxQVTesGQC3gruIm/JwVT3lD7eCzcRNyUnclJzETclJ3JScxE3JSdyUnMRNyUnclJzETclJ3JScxE3JSdyUnMRNyUnclJzETclJ3JScxE3J6Rfo9PeBVniMqgAAAABJRU5ErkJggg=="},{"name":"Elder seed","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAABoklEQVRIDbXBsWoUYRSG4fdbe9sgWKTaOVWIxQkWcmInFgG9BFsb78nLsJtBLGaadM6OKZYYI5sIgajZuGFmlEBwRS12M//zKNxISeEG5GW9u2MkoHDLyxqQFJ4xNIUbkJe1pPCMoSncgLysJYVnDE3hBuRlLSk8Y2gKNyAva0nhGUNTuAF5WUsKzxiawi0va67t7hhDU7gBRTXhWnjGoBRupKRwY0lRNSwJH3M7CjduFFXzcs/ni6u+55cOXr/ZDx9zCwo3bhRV8+r5w89nX9+9/7h5b6Nr28OTL0ez8/Ax61K4caOomhdPtn9cdWcL5heLrms7eLv/AfrwjLUo3FhSVM39jbsPss3v8wXQtRx8Oj6anYePWYvCjSVF1ezFlhiNRnybX9G1B4fH09k59OEZq1O48aeiap493tbozsXlZd/SwcH0ZDo7DR+zOoUbfymqBnj6aIuOjnZyeDI9OoU+PGNFCjf+pagmIH7rwzNWp3Dj/4pqwrXwjLUo3EhJ4UZKCjdSUriRksKNlBRupKRwIyWFGykp3EhJ4UZKCjdS+gn4AaKB0O0rgQAAAABJRU5ErkJggg=="},{"name":"Papaya tree seed","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAABQUlEQVRIDbXBIVMbYRiF0ecCOrYGgejwvVN/kZffvit3/0CSqUBgcBkcQzJpSU1NaOjsd47ioifFBQzT+vGh6EBxDdMakBQ3lqa4gGFaS4obS1NcwDCtJcWNpSkuYJjWkuLG0hQXMExrSXFjaYoLGKa1pLixNMU1TGtOHh+KpSkuYJw3nMSNRSkuelJc9KS46Elx8RXjvOUv8T2fUlxcbJy3d99WnOzeduzYcRXfc57i4jLjvP1+u7q+gT2/vb2zZ/f8cgXHuHGG4uIy47xtt6vrG/447Hl75+nlFY5x4wzFxWXGefvjbnV9A3sOcIDN0ysc48Z5iouLjfOWk3a3Ouz5+fwKx7hxnuLiK8Z5wwfx4Rg3PqW4+C/jvIkb/6K46Elx0ZPioifFRU+Ki54UFz0pLnpSXPSkuOhJcdGT4qKnX70CaYGxZzKqAAAAAElFTkSuQmCC"},{"name":"Money tree seed","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAABsElEQVRIDbXBsWoUYRgF0HsTKwUbO4UUFjtfKYSb8qb0AXwDm4CNL2CjFlZ24gOIjSIIgqSxmSlnamEyhigRAibYRIlukpkxLCyuqMVu5j+HViAlWgEgL+v1tUACtCIvawAkrQxDoxUA8rImaWUYGq0AkJc1SSvD0GgFgLysSVoZhkYrAORlTdLKMDRaASAva5JWhqHRirysMbG+FhgarQBQVFuYsDIMilYgJVqBGUXVYIY1wvnQCkwVVfP4ztWjH2h7nOk73H+2Z41wDrQCU0XVPLm7sntw4f3e6cqVi22Hz1+PNotda4RF0QpMFVXzaCOOxu0xLh2PT047tG379FUN9FaGhdAKzCiq5tbN63Ht8slJ1/Vou/bT/rfX73atERZCKzCjqJp7t28sn1nCz3Hbdt3Hg+8vN3eA3sowP1qBPxVV82BjdXl5aXzc9V3b9djeP3zxdscaYX60An8pqgbAw43VrkffY/vL4fM3H4DeyjAnWoF/KaotgPittzLMj1bg/4pqCxNWhoXQCqREK5ASrUBKtAIp0QqkRCuQEq1ASrQCKdEKpEQrkBKtQEq/AA4pp4GsNKL3AAAAAElFTkSuQmCC"},{"name":"Grimy lantadyme","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAFKElEQVRIDbXBb0tc6RnA4d/9HM2kuv5Jtm7YsltsxDnHblisya1BJk9kGAyyrLRfoB+u70tDJIgi4jwMEuehQQppzpxpFklooJmt2R21qx7nnI7upiQkbdIXXpdYjfg/OZ9YLfJhxGoEVOvx7emIV6r1+PZ0xLs4n1CapLZttcgHEKtRtR4DImI1BDa24rmZqFqPb09HvMn5BHsdOrhtyK2GvI9YjYBqPRYRq2G1Hn/0q4mDndhqWK3HIsZqkVecT5i7Xm431z+6itu2WuR9xGoEVOuxiFgNq/XYGLl1IwSq9VhEQKwWOeN8wtz1cru5PjjOxp8htxo6n1gt8ibnE6tFQKxGQLUei4jVsFqPjZFbN0KgWo9FBL2GfwRYLTqfUNbKd421wZANDznIvI6s+pbVImecT+gqTVLbtloUqxFQrcciYjWs1mNj5NaNEKjWYxGh9Bv2D6Z++MfDRpuuueuV9tO14VHWPWC16HwCudUQcD5hKqL3Av0F1j3kYjUCqvVYRKyGwMZWbIzJ80zEQE55msOjme92tvo/nz14tnn56vzR31eHxlh7QOUmaw+sFjnjfMLkOL0Xyp1n6yPXWNmEXKxG1XrMmdvTEeB8kueZiIEchMpNTtLSP5tAbWDU7u1cvFhYHRqDDocptW3IrYbOJ3RNRaX0ee3TaxR6WHKQi9UIcL7BGauh80llamTt4QsQq0Xnk3kdWR0Y5TjFAEFl/+na8Ch7/8I/YuZLtv5C1+Q42030i3lerH4ywX0HudVQrEa8xfmEUznIvI6s9v+SrgwMXfMHTwVWhsboMsy9+OtG3yiHx+y2y5f31z/9kvs1TuVWQ7EaAc4nvMZq0fkEchCgMjW4NhySZUCl3TRBQQDDyicTLLm5ycGNvlHSjk2f9RcKy0Nj/Gj1gdWiWI2cTygrxylpRno82X6+/bc2+gX+EWXFBBiDQCcj68zv7WQdTMDq5XHStNRq1C6N25dNE1DoLaz8PKRrucap3GooViPA+YT5m3QdHvJDOtV+9vDCFQLYbmo4+NmVgjH8sX+Ck5M7u80cVofG6Mo6ttVwl8Yr+00TFAq9LH08wZLjJ7nVUKxGnHE+YaFElpFnHKYcHZJBe4/BAW0/8432Ymnk3lBIxsJuY3l4nKMUsnK7aSDoLfQE3L80QZbRyciy+e+frPqW1aJYjXjF+WRxdiSHDO4PjHN0xHFKejx7+Dw9xg9+zkAfPQFiyDMOU6Cy3zRBITD09tKVZyxttvhJbjUUqxGvcT6hq6z09BIYsow05SQtvfwm7TBwkbW+qwz00YHjFMP83k5gMAGB4d5QSAbLNcgBqyEgViPe5HwDhK6FEgYy6Jxw0uEkLe9/c3DI1me//nr/yVLf2MLeE8CACVi6FH79srG02YLcasgrYjXiLc4nLJQwYMxvXz4G7g6EdE446djdhhsO6f/ZwrePewKyDiZADPdqLU7lVkNeI1Yj3sX5hP9YmAXDj9KjuW8bG1euLR40gTxjaShc3GsYuFtrQW415DViNeK/cL4BQlkxAQbE0GXMwm6jJ2Dp44nfff/4T671+zu/+MPKc07lVkPeJFYj/ifnE15ZmBlZ3mpx5quZkd5e7tZanMoBqyFvEasR7+N8MhUOBuAbbcg5JVRusvaArq9K3K9ZLfIuYjXiAzifLM6O3NtsQQ7CnVlWNiHnlEBuNeRdxGrEh3E+gdxqCDifQG415H3EasR5EqsR50msRpwnsRpxnsRqxHkSqxHnSaxGnKd/A7bIPtFpchVgAAAAAElFTkSuQmCC"},{"name":"Grimy lantadyme","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAFAUlEQVRIDbXBf0tc2RnA8e8544/ERCdxdxq23V1krXOvdQnB8Lgiw6MMMiLSEOgb6EvrC2jZoIg4iOhBJPGQEJYmca7dIkoD3cludEyaGWfm3s4MazEku0n/8PMxKiH/J+cjlSwfx6iEmzu7nJmeCPlVzkfkbrH1WCXLRzAq4ebOrjGGMyoBv8D5iJnbxOAeQqIS8CFGJdzc2TXGqAS8w/lIJcsZ5yNmbucrB+tXv8Q9VMnyIUYl3NzZpWN6IuQc5yOmbrL9nUqWDucj8jJ7tL828CUbDyFRCZyPVLK8zflIJQsYlRBwvgQkSTI9EXLG+YiZ27yu4p8AKlnnI/Iye7S/dm2IdQ8JmIJkir6skqXD+YiW3C22HqtkjUrImc2dXWOMSkCH8xF5oVGnUh1/8/xRqUJLXgon+8X0MGv3AZWs8xEkKgHgfMR4yKUeLvWy7iExKuHmzu70RAhs7uwaY1QC5yOVrPMRhUkaTaq1b472H/R/MfWfw+30V4Xav4rXhynepzBJ8b5Klg7nI26N0NuTr/+wnhlhdRsSoxICmzu7wPRE6HwJzHgw8KhUUck6H1GY5LSZ+7EEbKW/0lf/vNTdW0wP01KtsvUYEpXA+YiW8VDj5+7G1/T0sLQBiVEJ6XC+BKgEzkcFyRjL6oOyStb5aE4yq/1DNGJaLIXXB8X0MMcn+CdM3WT7O1rGQx7tImNz9ofV34yy5CBRCYxKyDucj2hLwMxJZrV/iJY4ps0WXu8by2p6mBZjZ/79942+IepNyi/zg/X1z0ZZdrQlKoFRCQHnI85RyTofQQIGKEim2D9Ex+zJvgVjsbByY4zFjZlbAxt9QzSbM7XDK329y/0jJLQVt1WyRiV0PmJ2ktMqjZj66fjL54/+UUHG8E/IC10pjMVamg3iZuF4n47i4Aj1eq5c2ro+opW9Lujt7V35NADLsqMtUQmMSgg4HzE3RQLVGrWqHB36yzdoebz3zR8GPv+019juv/b/ntPG3NEeMavpYSzE6Iun7trIbOUglaKnm6VPxlja4GeJSmBUQjqcj5jP0RLH1Gq8qUOTozdcuywnh/5p5W4uc+/6KI14/qfSymBArUYc5ysHNkW3pSvF0iejNGLimCQuvPy+6MsqWaMScsb56E4uAyQxS/0j1Ouc1qnVc9XD2il+4AvS/VhLytKMOa0BhdcHBrq66ba0NGOWtsv8LFEJjErIOc5HtMxOkrJ0WRoxzZjTur7cazTpu9S7dvV3XLlKHFOvA3Mn+9bSlSJluXd9lBiWHSSASgAYlZC3OV8CQ8tCDizE1GMadRpx/tVBtVrb/vzrP77aW+obXjj5PoauFMaymB69c/xscasMiUrAGaMS8g7nIxYUS8vd42fAvf6ARky9PvNTaWMw4MrlhR+fpSxJjLFYuLdVpi1RCTjHqIS8j/MR/zOfo8VCDPXGzIunG5/dvHtSAmJYTI/ePX5mLN+6MiQqAecYlZBf4HwJDLOTWMBiwFosCy9KqW4WB8f+VHnyt43yn+d/+5eV57QlKgFvMyohv8r5iDMLU5nl7TIdC1OZni6+dWXaEkAl4B1GJeRDnI8kGLApHjytQEKbYXaStfu0LCjLTiXL+xiVkI/gfHQnl1ncKkMChvkcK1uQ0GYgUQl4H6MS8nGcjyBRCQDnI0hUAj7EqIRcJKMScpGMSshFMiohF8mohFwkoxJykYxKyEX6L/yUNdH4NqT/AAAAAElFTkSuQmCC"},{"name":"Grimy lantadyme","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAE/0lEQVRIDbXB8Uvc5x3A8ffz3FkzU6NJd+2y0hBmve83dSsh5aMi8lFEPGQYKoX9Bfuz+g9sLESUICdFzgeR6kOLDJLcfYPjSJhjcU2iV1vP7/l9dkothqRNfvH1Miox58moxCsbVU6NDcb8KucT9CZuU6XIWzAq8cpG1RjDKZWIX+B8wsRnZFD5BoJKxJsYlXhlo2qMUYl4hfOJSpFTzidMyGSj/tXFa1S+USnyJkYlXtmocmJsMOYM5xNGb7K6qVLkhPMJkzK1W1/qvs6yh6ASOZ+oFHmZ84lKETAqMeB8DQghjA3GnHI+Yfwzfjxg/T6gUnQ+YXJ4andrqec6X3kIYEpDhfL6jkqRE84ntOlN3KZK0ajEnFrZqBpjVCJOOJ8wOUwrZW9f9rd9bY+2SSk16uWePpa+BlSKzicQVCLA+QQZoDNHVxdLX0MwKvHKRnVsMAZWNqrGGJXI+USl6HxCaYSjjIODkd1/rXVdH/2hvnq5v9R8XO7tp7xGaYTymkqRE84n3IrpyE1lT5fej7i3CsGoxMDKRhUYG4ydr4GR6JKv7akUnU8ojZCm+qwGuEt/GP/+350dlHv7CHBwgNuEoBI5n9AmA+Ppk8rVT+nMM1eBYFRiTjhfA1Qi55PSUMHC4vqOStH5ZHqosNjdRyulzdrSfr3c08dug/X7jH7K6j9puxXzbZWhgWmeLn4wwHwFgkpkVGJe4XzCsQBmeqiw2H2dtoxjllKjbnMsdvfTZu3Ef2vLXR/STHn+fOpyunT1BvOOY0ElMiox4HzCGSpF5xMIYIDSUKHc00d2BEzt1o3F5rBw7/0B5ioTtwrLXR+SZuPpf7q7WOjupy2D8ppK0ajEzidMDXOYcpiSHt3ae/JtbY+hAdbvMzlMzmIt1tJqEbLS7hZgYfG3EWlLnz5wvf3je4/z0HmBe+/doG3BcSyoREYlBpxPmB4ly2g2+fFAGk/8Ox9Ajs3q0CeXPvrduznL37qKHLWmn9c4YrG3n7aQjT99ULkSTTXqOUtnJ3NXBpir8JOgEhmVmBPOJ8woGWQZzSYHTY6g8T3d7w416usP9ma1cLd3gJDNfPdw4XJEs0nGZKOeg3wHOcv8lQFCRisjy0ovHpXXd1SKRiXmlPPJrBYCkDHXE9FscpjSTLX5pHnIevdH9HSTs1hLK6PZxNrSft1CvoO8pS3AnNvhJ0ElMioxZzif0DY1TC5P3pJlpC0OU33xKDui60Ln0m+u0XORVkbahNx0Yyufw1g68ty5NEDIWHAQAJUIMCoxL3O+Boa2GcVAgFaLNKOVTu4//uGgufb7P36+/2juYv/M/iMyjCVnudt7Y/bFw7tuB4JKxCmjEvMK5xNuK1gsX7xIgDvdH9NqkWYTz7aWr/TRdWHm2f2cJcuwlpztuFPZ5lhQiTjDqMS8jvMJP5tRftY8nPjf1vLV6Iv9WpYRYK7nxuzuQ2s77lS2IahEnGFUYn6B8zUwTA1jLBasBYtl5ruHuTxz7/3pL7vVvy9v/3Xm2pcLjzkWVCJeZlRifpXzCadujxbmV3c4cXu08E6+4x+VbY4FQCXiFUYl5k2cT+STSxbWH+xB4JihNEJ5jbbbyrxTKfI6RiXmLTifzGrhrtuBAIY/j3JvFQLHDASViNcxKjFvx/kEgkoEOJ9AUIl4E6MSc56MSsx5Miox58moxJwnoxJznoxKzHkyKjHn6f8VizfRgxSdlQAAAABJRU5ErkJggg=="},{"name":"Grimy lantadyme","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAEvklEQVRIDbXB/0td5x3A8ffz3GvNTG806W67rDSEOc856d1KSPmgiHwQES8yDJPC/oL9WfsHNhYiSpArRS4PIpWHFhnki09wXBLmWFyT6K2tx3M9Z1dpSiRxsT/4ehmVhJ/J+aAScTZGJeHncD6gN3HrKhFnYFQSzsz5wMTn5ND8GgqVmHcxKgmncz6oRLzifGBCJtutLy9eo/m1SsS7GJWEUzgfGLvJyrpKxDHnA5MytdNaqlxn2UOhEjsfVCJOcj6oRIBRSTiF84Hxz/lhn7X7gErkfGByZGpnc6n/Ol96KMDUh6uNtW2ViGPOB7r0Jm5dJTIqCadwPjA5Qidjd0/2tvzGLl2TUm+3Gv2DLH0FqETOByhUYsD5gNToLdHXx9JXUBiVhDc4H1Qi5wP1UQ5z9vdHd/652nd97PvWyuWhevqkMTBEY5X6KI1VlYhjzgduJfSUpvJnSx/G3FuBwqgknOR8kPiS39hViZwP1EfJMn2+AbhLvxn/7l+9PTQGBilgfx+3DoVK7HygS2rj2dPm1c/oLTPXhMKoJJzkfKgPVy0srm2rRM6H6eHqYmWQTkaXtfW9VqN/kJ02a/cZ+4yVf9B1K+GbRwzXpnm2+FGN+SYUKrFRSXiD84EjBZjp4epi5TpdOUcs9XbLllisDNFl7cR/Npb7PibNePFi6nK2dPUG844jhUpsVBLA+cBrVCLnAxRggPpwtdE/SH4ITO20jMWWsHDvwxpzzYlb1eW+j8ny8ezflT4WKkN05dBYVYmMSuJ8YGqEg4yDjOzw1u7TbzZ2Ga6xdp/JEUoWa7GWTocir+9sAhYWfxmTdfTZAzcwNL77pAy9F7j3wQ26FhxHCpXYqCSA84HpMfKcNOWHfWk/9e99BCXWHw1/eumTX71fsvy1L+KwM/1ig0MWB4boKvLxZw+aV+Kpdqtk6e1l7kqNuSY/KlRio5JwzPnAjJJDnpOm7KccQvs7Ku8Pt1trD3ZntXp3oEaRz3z7cOFyTJqSM9lulaDcQ8kyf6VGkdPJyfP6y8eNtW2VyKgkvOJ8mNVqAeTM9cekKQcZaabp0/SAtcon9FcoWaylk5OmWFvfa1ko91C2dBUw57b5UaESG5WE1zgf6JoaoVSmbMlzsg4Hmb58nB/Sd6F36RfX6L9IJydLoTTd3iyXMJaeMncu1ShyFhwUgEoMGJWEk5zfAEPXjGKggE6HLKeTTe49+X4/Xf317/6493ju4tDM3mNyjKVkuTtwY/blw7tuGwqVmFeMSsIbnA/cVrBYvngZgDuV39LpkOUTzzeXrwzSd2Hm+f2SJc+xlpLtudPc4kihEvMao5LwNs4HfjKj/CQ9mPjv5vLV+Iu9jTyngLn+G7M7D63tudPcgkIl5jVGJeEUzm+AYWoEY7FgLVgsM98+LJWZ++D3f9p59LflrT/PXPvLwhOOFCoxJxmVhP/L+cArt8eq8yvbHLs9Vn2v3PP35hZHCkAl5g1GJeFdnA/y6SULaw92oeCIoT5KY5Wu28q8U4l4G6OScAbOh1mt3nXbUIDhD2PcW4GCIwYKlZi3MSoJZ+N8gEIlBpwPUKjEvItRSThPRiXhPBmVhPNkVBLOk1FJOE9GJeE8GZWE8/Q/sHwZ0dQgvb4AAAAASUVORK5CYII="},{"name":"Crystal tree blossom","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAEdUlEQVRIDbXBX2hWZRzA8e/zvm9zbv1ZFNnCUEnec0gIih4RGz+2MiVk5JRucjddJF0MvOhKLC+8aBfRhYRC3gXuRvwHIvo6bS8P01znRupqB8GWL+pGtc3t3Xu2855zOjvrrHe8mxmxz0eJtllNSrTN/2AcV3SelSnRNv+dcVwSbUePDR45KDrPCpRom+UYxyUlOk/KOC7QdvQYqcEjByESbbEcJdqmjnHctw5+ATQ+9zxw8+jnovOAcdwd3/YRUyy41rMfItEWK1CibeoYx91+5BuikESuca053AO0954Eck83E1Nc69kPkWiLlSnRNnWM427/8msg17iWhDncA7T3niRVPHQAItEWj6VE29QxjtveeyIMQ1LmcE9773egSBQPHYAIEG3xWEq0zVLGcUm0954AwjAE7t8qrt/+PijgTv9ZoPRDgZToPCtQom1SxnGBPaeLlcnxwqddQHvvCRJhGGYyT4Eq/Xjdm57Y8vFnz7S+SurM7rdF51mOEm2TMI6753SRRGVynNTs7w9+vX6JbBawPvqEROBVWjbliSmqlRngwj4RnaeOEm0DxnE7TxWyDWtIVCbHSUSzHjB2+xYNDcH09CuyM/AqJFo25VHEqpUZEhf2ieg8SynRtnHczlMFINuwBqhMjgPRrAeUhorNL6zzpydpaABefP1NEi2b8igW3D7+lVeeKhX7IRJtsZQSbQPGcTtPFS527yKxeffeZzdvIZFVyi9PBUEABN5MtrmZWNWfezRJIvAqwJ1L5yASbbGUEm2TMI4LEaiu84MoNTJwhYT351hDYxOpgJBY1QfmHk0CgVcBvHK5VCyIzrOUEm2TMs4wqK7zgygFjAxcCb0ysTBqfec9EqUb/cSqPqnK2EOvXAZKxQJEoi1qKNE2KeO4XecHiSkF3L18lkTrtg6UIlG60U+s6pOqjE94E38ApWIBItEWNZRom5Rx3M6+q7mmJpQC7l4+S6J1WwcLlAJKN/qp+kBlfIKYP+eVp4BSsQCRaIsaSrRNyjhuZ99VINfUdPfKORZlVOvWdiDwZoCxn3+afvCARf4c4JWnSsUCRKItaijRNinjuJ19V3/5/njTupcbmppZlFEvvbGVxMhAgVgYBFWfBf4ciTuXzkAk2qKGEm2TMI7b2Xf14v6dG3d+2LLpNWpUxieADR27gJGBAmFAIqj6xPw54M6lMxCJtlhKibZJGceFCJTV1U02x6JMhsSGjl0jAwXCgFRQ9ace/AaMDg1CJNpiKSXapoZxhkFt/GDvmsYmsjkWZDLUCgMS5bH7VH0/qI4ODUIk2qKOEm1Txziu1dVNLJsjlslQo/zwHguqPuAH1dGhQYhEW9RRom3qGMe1urpZkM2RyZTH7rEoZF7VB/wgHB0yEIm2WI4SbbMc47jA+rZ3mZchllMsCvFnZ0eHDPMi0RYrUKJtVmCcYVAk1rftIBZWgdLNIn+LANEWK1OibR7LOMPMU/wjIiHa4t8o0TZPxjjDJERbPDEl2mY1KdE2q0mJtllNfwEux9yQrLY8agAAAABJRU5ErkJggg=="},{"name":"Crystal tree blossom","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAEh0lEQVRIDbXBX4hU5xnA4d87Z7LiaLEtsYQkGyLonJNK6EX7RYjyYowJaUuXLpoLvRACJUECob0JeGFDyUUwEAIhBPQ2sELERJTSnawM60fXYk8ppbnaw7Zs3GnEGnUyZtz58535Mp71mFlm1yQEn0fURNxLoibie7BxoqbM6kRNxHdn44SMvv6OPfyKmjKrEDURK7FxQk5NmZyNE0Bff4ecPfwKeDUhKxE1EUNsnJjfHwbWbPgx8Nc//UFNGbBx8uy7E/SJkPn45X3g1YSsQtREDLFxsuO1t/E9MsW1pelDB4Fdbx4DiqX19Il8/PI+8GpCVidqIobYONnxx7eA4toSmelDB4Fdbx4jV331RfBqQu5K1EQMsXGy88hRej1y04cO7jpyDGFJ9dUXwQNqQu5K1EQsZ+OEzM4jR+nr9YDa36Yf2f40Qt9/Jz8C5qt/IaemzCpETUTOxgkwftJ2rl/78+9+C+w8cpQlvV6hECBcPF91jS+27n9p3YOj5D741c/VlFmJqInI2DgZP2kB73vdep1c8+rl+akzBAGw9fkXyLh2a8OmLfSJpK1F4OT4djVlhoiaCLBxMnb8bDAy4n0P6NbrZFy7BVz+198LI2u6zS8f2fG0a7fIbNi0BREgbS2SOTm+XU2Z5URNZONk7PhZIBgZ8b7XrdcB124Bn104V7r/J+0bNwoja4CNP/0ZmQ2btiBC5p/vvdG60ahNV8CrCVlO1ESAjZOx42dP79tNZvNvnv/R5sfIFETazS9JHdBptUZK64DUuU6jTiZtLwJzZ06AVxOynKiJyNg4AQ+y59SMIJ+emyTTunolWFviDu+B1Dmg06gDaXsRcM3GfLWipsxyoiYiZ+NZkD2nZgQBPj032W3dpK/nR5/cTWZhZgpInSO3eOWSazaA+WoFvJqQAaImImfjZM+pGUAQYK7yIZnRbU8hBTILM1NA6hy5zvWr7S8+B+arFfBqQgaImoicjZOxian7SiVBgLnKh2RGtz3FEikACzNTqXNA5/pVIHUd12wA89UKeDUhA0RNRM7GydjEFHBfqfSfyilu8UBBgoeeUKCzeBO48sk/mpdq5FLXAVyzMV+tgFcTMkDURORsnIxNTP37/fd+sPGBYN16bvMFCTY+/gsyC3YSSNOUbpdM6jpk5s6cAK8mZICoicjYOBmbmDq9/5lHfzn+w0c3M6BTvwaM6nPAgp1M05Ql3S6Qug4wd+YEeDUhy4maiJyNE/Ag4d4DQVDkjoKQGdXnFuxkmqbc0e02P1sAahcseDUhy4maiAE2ngXZ/Ou9wdpSEBRZUhAGpGlKpvn//+FSuq52wYJXEzJE1EQMsXES7j0ABEGRvoIwoHHpIktcSl/X1S5Y8GpChoiaiCE2TsK9B8gEQZGC3LxcI+d6PfpcSl/P1c5b8GpCViJqIlZi4wR4WHeTKxYDcq7Xo9Ounbfc4tWErELURKzCxrMgZB7W3fQ5B9TOT3ObB9SErE7URNyVjWe5RfiaJ6Mm5JuImohvx8azZNSEfGuiJuJeEjUR95KoibiXvgIpk+2QpazZegAAAABJRU5ErkJggg=="},{"name":"Crystal motherlode shard","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAFLklEQVRIDbXBX4hcVx0H8O/3zr+dTdhpaNJsimDamrnnRaiNZ32Rs6G0+iCGxG5Ak9BW6r9KBbH1b0mabJakVBRj9UWUClHwIXXrphKkqzK3IHSulmDIcneiSYzNpmlB4qY7c/+c8zvGrYO7tGn3ofv50GiF1USjFYBWOxkdUehrtZPREYX3Ao1WrXYCgKTRIYBWOxkdUa12MjqisCiKO1jC6CZWjEYrAK12QtLosNVORkdUFM8aHbbayeiIiuLOB993a14UGdDLMgBXrs4DMLqJFaDRCkCrnZA0Omy1E5ImbEazZ70XkvoD73cWbyoBKCNN7bWiuHDldaObeDc0WgFotROSRoetdkLy83eP9vL82It/IrlTf8g5RHu/hVIJ6zbg0j/uPDaR5+6aTU9fmDO6iXdEoxWAVjshaXTYaickx8d25M4d+vUUya98/F7xUlhbiEw+NIH6Wly+uO2Z8avpwnw3e/nCRQBGN3EDNFoBaLUTkkaHUdzxXo58euzbvzq+b+f2iedOHBzb0c1yK2Kts14Ka0XgRKyIE3HOzWfdk6fOGN3E26HRqtVOsIgMDty3HeATxycP7dq5//hzE2OfWlOvFe6/CucK57p54USsc07EilgrhdhX/311+nRidBNvQaMVgCiexaInP7NrTa1G4JGf/2J8bAcRbFo39NgnH0PaQ54+OvW9onBBEFiRwjnrrLU+d7YQ+ekfIsAbHWI5Gq3QF8WdL9xtPHD7hvWDtQECQUCC41/8QXbpPNIeOn/92swLlVIJAazz1jnrXOHEinXij56cNrqJ5Wi0Ql8Udz63zVTKZYE0hzdmeTFYqxIBif17DyLL8Oor35z+CYOgXqk676wT55x1znl/6vzFy/PzL/3tnNFNLEGjFRZFcec+vXWoXl8zMOAhHoDg9ltuTq0drFZJHnzgCBau4dzM4395dqBcLZdL7k3ev/T3c5tvXi/Ad0+cBLzRIfpotMKiKO7suOvOobWDw41GlhcCeABetgwPZ0VBolouOe/Htz96YOr75XKpXqmQgRP34uzZOzZs8PBeIJBDk88b3UQfjVboi+LOw/dsGxqsb2o0yGBmbm6gVAG8AHfcsj61du1AjbiOfz5/oRKUK+Ugt3bL8MbDeydqjXVf/eGXxEPE7zs+aXQTi2i0Ql8Ud778sW2NgfpwowEGAJK5OQC1SgVAc3hjvVplAIBv9FLr3Nkrr6lbN4n4w/uOIfVfP7JHIN0sP/DsbwBvdAiARissEcWd72z/xMabGgAYgCCBmVcuA/CQrbdtHhqsd9O8cLabF9VymcAT+5/Zf/AB8V7E94p8IU0PTT4PeKNDADRaYbko7hy9fzcBBiRAAuDMpTkAv/zGz3Y/+dBHwy2F2PleWi2XSgwAiPciPrN2IUvf6GWHp34LeKNDADRa4S2iuHP0/t1BQAK8DiABBAcefnrX4ztrlcqHb9tcOJcWRUCWggBAVthuni+k2bUsferEScAbHQKg0QpvJ4o7AJ5+cE9AECQDAghw5p9zA9WKiDiRuX9d7WUZ+qxzhXPTMwngjQ6xiEYr3EAUzwL80YN7SAYAGDAAwd+fnlnIMoGDQ6VSwRJTL58CvNEh+mi0wjuK4s6PP7uHIIk/JrPOSTdLxcHDicN10zMJ/s8bHWIJGq3wbqK4A2DsI1udoJumvzt9Bst49BkdYjkarbACUTwLEP/jsYTRIW6MRiusWBTPAjA6xIrRaIXVRKMVVhONVlhNNFphNdFohdVEoxVWE41WWE3/AQJDnZ8IwzSUAAAAAElFTkSuQmCC"},{"name":"Corrupted ore","base64":"data:image/png;base64,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"},{"name":"Corrupted ore","base64":"data:image/png;base64,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"},{"name":"Runite stone spirit","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAFLUlEQVRIDbXBX4hcVx0H8O/vnnvuzOwmk2ubTRSDhIJzjxoa8nCWQvC3WRhS8pAitHRFuiUvRSpCaVCkpWhpqw9FBKX4uPikq29VJFCpdO9GYedurftQunPrto/2ejfttOnOzv1z5rQZGN1l/mxe/HyItcJdC6MYA6wbuDvEWq21tjG0MK8wThjFAJ67/hQGXvrFLwGwbuAoxFqttbaJCEOsAxwWRvFz15/CYdKVP3n556wbmIpYq7XWNhGxDjBBGMU/+P6TF75xrlqtSimFEEVRtN/714+efwmwrANMRqzVWmsbAwvzCuOEUXz9e9+dmzvpudJ1XcehoiizPH/mhZ8ClnWAyYi1AhBGbQDW2oV5hRFhFD/95BOnTs7JO1wiJy/yPC+effFngGUdYDJirTC01tomItYBDgujeOlbD91/7utywCEnL/If/vgFwLIOMBWxVmut7YV5BWCttU1ErAOMCKN4aelxz5PGmDzvra+/niQpYFkHmIpYKwBrrW0AC/MqjNqsA4wIo3hp6THPqxhjsqx38+brSZIClnWAqYi1wkAYtQGwDjBOGMVLS495XsUYk+f5+vpfkiQFLOsAUxFrhaOEUQz0H330cdf1rC2NMZ3Oh6+9dgOwrANMRawVjhJG8cMPf9t1PSEcY/rGlHt7ezduvApY1gGmItYKRwmj+JFHviOlJCJjSmP6ZZnv7u7evPkG6wamItYKU4VR7Pv1ZvOqlC4A07d9UxpTdLvdjY1Wp5OybmAyYq0wWRjFvl9fXLwiPUmOcEB9WGNKY8q819vc/HuSpIBlHWACYq0wWRjF/um55jcvS0/mX5v3jh13ZcX2+0XWy/725273062tzSRJWTcwAbFWmCCMYt+vX778kOtVyvsvzvj3upWqIwQJ15oy7+7d+tNvsixvtdY7nU9YNzAOsVYYEUYxAN+vNy9flW6lOH9xxr+3OntMVmokBDnC2r7Js97tT3ZfXcnzbGOj1emkrBsYQawVDgujGOj7vt9sXpVSCimhm9XjJ7yZWVmpCulZC8CWRVFm+//5w6/zO7KNjVank7Ju4DBirXBAGMVA3ffRbF4VQkjpfnz23Be+fLbm3+PVZlwpHdcDASBryry798HvXinLvCjyLOttbv6j00lZN3AAsVY4IIxi369fuvSg51WEK4RwP73vvH/mbO3YCW9m1nGlIz0QPmfL0uTZv3/7qyLfL8syy/KtrRaAJElZNzBErBWGwij2/TqAxcUrnldxHCLhutLDAw/Wjp/wajOuVxWVCqy1/X7flMV+94Pfv2KKvCxNnme3b9/e2XknSVLAsg4wQKwVhsIo9v06gMXFK1JKIQQJIVxRnl84PvclrzbjehXH9XCH7ffLvVvph39cMWVpjMmyXre7/+67bydJCljWAQaItcJQGMW+XwfA3PS8mhDCcejUqS8SObtfvTDrn5TVmpAVAH1T7H/80ew/34C177+/Y0yxv9/r9fZ2dtpJkgKWdYABYq1wQBjFvl+/ePGS59XOnPkKAMcByCGiW/ddkMfqzueEmHnzr9b2YS2G3nrrzXZ7K0lSwLIOMESsFQ4Lo9j355aXr2HAcTDggAj/ZS1GrK6uJEkKWNYBhoi1wmFhFPt+HagsL1/DgOMAcDDV6upKkqSAZR3gAGKtMCKMYgC+P7e8fA0DjgPAwTirqysAkiQFLOsAhxFrhXHCqA0QBk6fnsM4SZLifyzrACOItcJkYdTGHYTxLIZYBxiHWCvchTBqYwTrAEch1gr/T58BW9tGn5X+nX4AAAAASUVORK5CYII="},{"name":"Runite stone spirit","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAFIUlEQVRIDbXBb4gcZx0H8O9vnnlmd++SzdjmEsUgoeDOqKEhL36hEPwlB0tKXqQILT2RXsmbIhWhNCjSUrS01RdFBKX48vCVnr6rIoFKpTcXhdu5Wu9F6d3Ua1/acS7ttunt7fx59mmzcHrH7e7ljZ8PCYe4a1GcYEi4hbtDwiGApc76xfMhxoviBMBz15/C0Eu/+CUA4RYOQ8LhUmcdABEJBxglipPnrj+F/bSrf/Lyz4VbmIiEQwBLnXUiEg4wShQnP/j+k+e+caZer2utlVJlWW68968fPf8SYIUDjEfCIYClzjoRCQcYJYqT69/77szMcc/Vrus6DpVllRfFMy/8FLDCAcYj4RDAUmediIQDjBLFydNPPnHi+Iy+wyVyirIoivLZF38GWOEA45FwCGCps05EwgFGieJk7lsP3X/m63rIIacoix/++AXACgeYiIRDAEuddSISDjBGFCdzc497njbGFEV/efn1NM0AKxxgIhIOlzrrGLp4PsQYUZzMzT3meTVjTJ73b958PU0zwAoHmIiEQwBRvIEh4QCjRHEyN/eY59WMMUVRLC//JU0zwAoHmIiEQxwmihNg8Oijj7uuZ21ljOl2P3zttRuAFQ4wEQmHOEwUJw8//G3X9ZRyjBkYU21vb9+48SpghQNMRMIhDhPFySOPfEdrTUTGVMYMqqrY2tq6efMN4RYmIuEQE0Vx4vvNdvuq1i4AM7ADUxlT9nq9lZVOt5sJtzAeCYcYL4oT32/Ozl7RniZHOaABrDGVMVXR76+u/j1NM8AKBxiDhEOMF8WJf3Km/c3L2tPF1857R466umYHgzLv53/7c6/36draappmwi2MQcIhxojixPebly8/5Hq16v4LU/69bq3uKEXKtaYqetu3/vSbPC86neVu9xPhFkYh4RAHRHECwPeb7ctXtVsrz16Y8u+tTx/RtQYpRY6ydmCKvH/7k61XF4oiX1npdLuZcAsHkHCI/aI4AQa+77fbV7XWSmtwu370mDc1rWt1pT1rAdiqLKt85z9/+HVxR76y0ul2M+EW9iPhEHtEcQI0fR/t9lWllNbux6fPfOHLpxv+PV5jytXacT0QALKmKnrbH/zulaoqyrLI8/7q6j+63Uy4hT1IOMQeUZz4fvPSpQc9r6ZcpZT76X1n/VOnG0eOeVPTjqsd7YHwOVtVpsj//dtflcVOVVV5XqytdQCkaSbcwi4SDrErihPfbwKYnb3ieTXHIVKuqz088GDj6DGvMeV6dVWrwVo7GAxMVe70Pvj9K6YsqsoURX779u3NzXfSNAOscIAhEg6xK4oT328CmJ29orVWSpFSylXV2YtHZ77kNaZcr+a4Hu6wg0G1fSv78I8LpqqMMXne7/V23n337TTNACscYIiEQ+yK4sT3mwBE2p7XUEo5Dp048UUiZ+ur56b947reULoGYGDKnY8/mv7nG7D2/fc3jSl3dvr9/vbm5kaaZoAVDjBEwiH2iOLE95sXLlzyvMapU18B4DgAOUR0675z+kjT+ZxSU2/+1doBrMWut956c2NjLU0zwAoH2EXCIfaL4sT3Z+bnr2HIcTDkgAj/ZS0OWFxcSNMMsMIBdpFwiP2iOPH9JlCbn7+GIccB4GCixcWFNM0AKxxgDxIOcUAUJwB8f2Z+/hqGHAeAg1EWFxcApGkGWOEA+5FwiFGieAMgDJ08OYNR0jTD/1jhAAeQcIjxongDdxBGs9glHGAUEg5xF6J4AwcIBzgMCYf4f/oMhpc9n7pxjXcAAAAASUVORK5CYII="},{"name":"Orichalcite stone spirit","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAFKElEQVRIDbXBT2hcxx0H8O9vZt57q6pZP7XauJAcWlr2DfjQPzCCHDJSymIwlQvBQSko9aGkbQgEXBJo4p6CU5NDKYWeC3WvuvXiSwzVoBa0IwxJG9C+2MbppX08Qbdxo9X7M29qLxGVstqVL/18SCuJx2ZsijGtung8pJUEsNnfBbC8JDGFsSmAq1dew9j13/wWgFZdnIa0kpv93eUlaezAe7+8JDHB2PTqlddwXCCCt3/1a626mIm0kgCMHWiVbPZ3iUirBMcZm77+6ivfPHeuFUVhEDDOq6pK791769ovAa9VgulIKwlgs78LYHlJGjvQKsFxxqY/++mPn+x0RBAEQjDGyrKsquqtd64DXqsE05FWEmPGDrz3y0sSE4xNr/zk5U6nEwgRBAFjrBz7xfV3Aa9VgulIK4lDm/1dItIqwXHGpi98f/Vb586JIAiDgDFWlOXP374GeK0SzERayc3+7vKSBLDZ3yUirRJMMDZdW3spiiLnXFEcbG3dyrIc8FolmIm0kgA2+7sAlpeksQOtEkwwNl1bWw/DVtO4ojjY2rqVZTngtUowE2klMWbsAIBWCU5ibLq2th6GkXOuLIutrVtZlgNeqwQzkVYSpzE2BZq1tR9yHjRN7VwzHP7rvfduAl6rBDORVhKnMTZ9/vkXgyDgXDRN/dD+/v7Nm38EvFYJZiKtJE5jbHrp0g+ECBkj90jtXL23t7e19SetupiJtJKYydg0jtu93irngjE0rqld7Zwbjfa3t/vDYa5VF9ORVhLTGZvGcXtl5UIoBDFihIequnaNK8tyZ+cvWZYDXqsEU5BWEtMZm56N28u9VcHZxX/cOSNES7Cmwaipfzf/lf3RqL+zMxzmWnUxBWklMYWxaRy3z/dWIy5eyO8sBuGcYAFjnKj2/kFZvyvOFFXZ7/95OPxEqy5OQlpJTDA2BRDH7V7vYovzS1naicIzoZjjnBPjjDVNU7hmWFXviDNFUff7/eEw16qLCaSVxHHGpkATx3GvdzHgvMXZS3t34kA8EYgW5y1iABqgdBi5+ir/UlmXD21v94fDXKsujiOtJI4wNgXacYxeb5UzFnD+3Y//9o0n5haj1jznEWcBY4RHXNM8cM2bbKGs6spVo9HB7du3h8Ncqy6OIK0kjjA2jeP2ysp5IaIgEILo/N8//Pr83EIUzge8RSzgDGPOY+SaN2ihqCvnyqIo339/pygwHOZadXGItJI4ZGwax20Azz13IQwDxjgnChn/UX53IWJf5LzFRYuzBmg8XIP/uPpNtlC62jlXluWDB/++e3eQZTngtUowRlpJHDI2jeM2gJWVC2EoiDhnFHL+4j/Tp+da84IixiIuMFY1yEbFtXCxcrX31WhUHhyMPvrowyzLAa9VgjHSSuKQsWkctwE8+2wvilqMMc754pcXBdHFQf/JKPyC4BFjAOqm2SurP3ztOw1w/+N7de2KYv/TT0f37w+yLAe8VgnGSCuJI4xN47j9zDMrUTT31FNPA2BEDGBE3xtsx4FgAGfs91/9duN9A3h85oMPbg8Gf82yHPBaJThEWkkcZ2wax5319csYIwJABDAAhEc8GsDj8zY2bmRZDnitEhwirSSOMzaN4zYQra9fBkAEgDBG+IzH521s3MiyHPBaJTiCtJKYYGwKII476+uXARABIEyxsXEDQJblgNcqwXGklcRJjB0AhLGzZzs4SZbl+B+vVYIJpJXEdMYO8AjhZB6HtEpwEtJK4jEYO8AErRKchrSS+H/6LydFQ5/2iZNDAAAAAElFTkSuQmCC"},{"name":"Orichalcite stone spirit","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAFGklEQVRIDbXBX2hkVx0H8O/vnPsn2e1OrmWz68Mi+Ie5B1sEW05eCr9sZHBZaETYpRFpyvZBpFIoLtbSUlS6VUFE8F1W8CmvPi1UCuZkUTInWkIRZ26bFvp2uUEGt0lm7r3nHrsDoQnJTPbFz4dYKzwyYzOMsW7j0RBrBWC92wOwuKAwgbEZgDdvv4Kxt3/3ewCs2zgLsVbr3d7igjK2771fXFA4wdjszduv4LgwCH/+m9+ybmMqYq0AGNtnna53e0TEOsVxxmY/efmlbz7x5MzMTBiGUsqqqvofffjaL94GPOsUkxFrBWC92wOwuKCM7bNOcZyx2e0f/XB+/mIUhEEQCEFVVY/K8vW3fgl41ikmI9YKY8b2vfeLCwonGJv9+KUfXLo4Hz4UEImyKsuyeuPOrwDPOsVkxFrh0Hq3R0SsUxxnbLby3e9848mvh2OCRFmVr/7sLcCzTjEVsVbr3d7iggKw3u0REesUJxibray8EEWhc64shxsb7+Z5AXjWKaYi1grAercHYHFBGdtnneIEY7OVleejKHbOjUbD+/ffzfMC8KxTTEWsFcaM7QNgneI0xmYrK89HUeycK8tyY+MveV4AnnWKqYi1wlmMzYDmuedeCILI+9o5Nxj855137gGedYqpiLXCWYzNbtz4XhBEUgrnGufqvb29e/f+DHjWKaYi1gpnMTa7efP7YRgSkXO1c01dl7u7u/fv/5V1G1MRa4WpjM2SpNXpLIdhAKBxzjWNc9X+/v7mZncwKFi3MRmxVpjM2CxJWktL16MwECQJ8Gica5xzw3K4tfW3PC8AzzrFBMRaYTJjs8tJa7HzbCSDZ/NsLgpmSDTAgWv+cO6L+8O97e2tPC9YtzEBsVaYwNgsSVrXOstxKG8WH83H0awUgaAAqIBPK/drcWE4qrvdjcHgv6zbOA2xVjjB2AxAkrS+3VmOw+BG3p+Po7k4mpUUUCCABhi5ZlBWd8RcWZabm93BoGDdxgnEWuE4YzOgSZKk01mOwiCWcrXIkihqBTKWwYwUADwwcs2Ba95AMqqrshxtbnYHg4J1G8cRa4UjjM2AVpKg01mWUkZSfOuT97924fzFODofyFiKUEgCCKgb/2nd/BRzpaurqhqNhltb/xwMCtZtHEGsFY4wNkuS1tWr16IoDuRD1z55/6sXzj8ehedlEEsRScJY7XHg/KtIhlVZ1/VoVG5vdwHkecG6jUPEWuGQsVmStAAsLV2PolgIkiRnpHhx98MvxMFjgZyVQSzJA41H3WCvdq/RXOlcXbuyHD148GBn5995XgCedYoxYq1wyNgsSVoAlpauh2EoP0MUSrmS96+cm31MiliKSEqMVc7nw9Gd8GLtaufcaDTc3z/44IN/5XkBeNYpxoi1wiFjsyRpAWDuRNGslFIIunTpkgSWe5uXZ+NzMoikAFA3ze6o+tNXnvbAxx/vOFcdHAyHw72dnX6eF4BnnWKMWCscYWyWJK1nnrkaRbNXrnwJgBAgCAKWe3+fiyJJkKA/fvmpBvD43Hvv/aPf387zAvCsUxwi1grHGZslyfzq6i2MCYHPEAQAwkMe8DjF2trdPC8AzzrFIWKtcJyxWZK0gHh19RbGhAAgMNXa2t08LwDPOsURxFrhBGMzAEkyv7p6C2NCABA4zdraXQB5XgCedYrjiLXCaYztA4Sxy5fncZo8L/A5zzrFCcRaYTJj+3iIcDqPQ6xTnIZYKzwCY/s4gXWKsxBrhf+n/wHobTufq5hU5AAAAABJRU5ErkJggg=="},{"name":"Drakolith stone spirit","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAFJElEQVRIDbXB0YscdwHA8e9v5jeze5d0GWIuV2mEPu38IA9a8HeQYH93gaUQuApt9RTPprVUWyyVVB9K61OpxiIign9BXvpyb75ETCLecI1kf+dBK8LthIb45rgpXVN7ezs7Mz+TJYe33u1dXvx8hNGKh5bYlBGjmzwcYbQCVtubwPycYoLEpsDbF15n5OJvfgsY3eQwwmi12t6cn1OJ7Tjn5ucUeyQ2ffvC64wLZPDOr35tdJMDCaMVkNiO0fFqe1MIYXTMuMSmP/nhq18+dapeq4VB4Pn+cDhMb916692fgzM6ZjJhtAJW25vA/JxKbMfomHGJTd945fsnZmZkEARSep6X5/lwOHzrZxfBGR0zmTBaMZLYjnNufk6xR2LTCz94eWZmJpAyCALP8/KRn158D5zRMZMJoxU7VtubQgijY8YlNv3G1xe/cuqUDIIwCDzPG+T5m++8C87omAMJo9Vqe3N+TgGr7U0hhNExeyQ2XVr6bq1WK8tyMNheW7uWZV1wRsccSBitgNX2JjA/pxLbMTpmj8SmS0vLYVivqnIw2F5bu5ZlXXBGxxxIGK0YSWwHMDpmP4lNl5aWw7BWlmWeD9bWrmVZF5zRMQcSRisOk9gUqqWl530/qKqiLKte79OrVy+DMzrmQMJoxWESmz7zzLeCIPB9WVXFPVtbW5cv/w6c0TEHEkYrDpPY9Lnnvi1l6HmivK8oy+LOnTtra38yusmBhNGKAyU2jaJGq7Xo+9LzqMqqKIuyLPv9rRs32r1e1+gmkwmjFZMlNo2ixtmFc0EofSGEBxVFWQzLMs/z9fXrWdYFZ3TMBMJoxWSJTU9GjTOtxdD3Xjz+x2iKekhVyq2C925+dWur315f7/W6RjeZQBitmCCx6cmocaa1WA/lq7NXZxtyOiDw8D2KirsD3lh/YnuYt9sf9Hp3jW6yH2G0Yo/EpkAUNVqtp6cC/5XZq7MNGdWZDpEe+FCRD/lkix/95YntQdFut3u9rtFN9hBGK8YlNoUqiqKnWk/7vj8Vih9/6cqxKdmoE4Qguc9BST7ge38+PSjye27caPd6XaObjBNGK3ZJbAqNKKLVWvQ9L5D+N49eUSfkiaNM10GCzwMOt80L188M8mJYDvv97Y2NjV6va3STXYTRil0Sm0ZRY2HhKSlrQSClL75z5A/xo/IL09TrIMHnAQc5L37wtX4+LMt8MMg//HB9MKDX6xrdZIcwWrEjsWkUNYCzZ8+FYeB5vvRF3fPffPzKsSmO1CEECQ4cVDDg+etn8qIoyzLP888++9fHH3eyrAvO6JgRYbRiR2LTKGoACwvnwlAK4fu+qPn+a4/+/vFj8pEaSAgYkRR8epfXNuaGw8K5Yb+fb2/3b978W5Z1wRkdMyKMVuxIbBpFDeDJJ1u1Wt3zPN/3jx8/HnjipSPvf/ERebQGUnJPyZ1/88t/Pls5bv/9VlGUg8HW55/3b9/uZFkXnNExI8JoxS6JTaOocfr0Qq029dhjJwFPCE/gebw0/X40LaUnpccv/vFsWVE5HA989NFGp/PXLOuCMzpmhzBaMS6xaRTNLC+fZ0QIBAKBBwIc91WAwzFmZeVSlnXBGR2zQxitGJfYNIoaUFtePg8IAQhGBA84/tfKyqUs64IzOmYXYbRij8SmQBTNLC+fB4QABBOsrFwCsqwLzuiYccJoxX4S2wHByOzsDPvJsi7/5YyO2UMYrZgssR3uE+zPscPomP0IoxUPIbEd9jA65jDCaMX/038ATMAun9/SFocAAAAASUVORK5CYII="},{"name":"Drakolith stone spirit","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAFGklEQVRIDbXB8WskVwHA8e+beTOb5I51Wi6XHhzWn3YeWoQib6E9eLlgODkwIrTXqFzOoMjRUqk9KkUpKrVKURH8B+4XEfKrP53cWTGTs5B9qSU/FLPTxv7qsFfZeiS3Oztvx2RpaNZkN/eLn48wWvHQEpsyYHSNhyOMVsBqYwuYrStGSGwKvHbjJQbe+O3vAKNrnEQYrVYbW7N1ldhmWZazdcURiU1fu/ESwwIZ/PRXvzG6xljCaAUktml0vNrYEkIYHTMssekrLz7/5BeemJiYCILA9/1er9f85wev/uwNKI2OGU0YrYDVxhYwW1eJbRodMyyx6Y0Xrk9PnwllIKX0PNHrFd08/9Hrv4DS6JjRhNGKgcQ2y7KcrSuOSGz68vPfO3tmOtgnhfDyXp7nvR///JdQGh0zmjBacWC1sSWEMDpmWGLTxa9/7YtPfD4Y8ISX9/If/uR1KI2OGUsYrVYbW7N1Baw2toQQRscckdh0cfFaGAbOuTzvrK29lWUtKI2OGUsYrYDVxhYwW1eJbRodc0Ri08XFq2FYcc51u527d9/KshaURseMJYxWDCS2CRgdc5zEpouLV8Ow4pzL83xt7U6WtaA0OmYsYbTiJIlNof/cc9ekDMuycM612/++ffsWlEbHjCWMVpwksekzz3xDytD3Pef6zhU7Ozu3bv0RSqNjxhJGK06S2PTZZ78VBIEQwrnCuX5R5Pfu3bt7969G1xhLGK0YK7FpFFXn5xeCQAJ951y/71xvd3d3fb3RbreMrjGaMFoxWmLTKKp+ee6yDKWPjwf9vnP9onSdTmdj4+0sa0FpdMwIwmjFaIlNz0fVp+e/Wgm8b5/5SzTJVChdn92cNz+o7+zubG5uZFnL6BojCKMVIyQ2PR9VL1xamJT+9XN/nqnKqYDAQ/qycMXHXX6w8WSnWzQaa+32f4yucRxhtOKIxKZAFFUvzS9MhPL6Y3ceq8rPTHCqgueBB316BR/t8v3Gl7p5vr7eaLdbRtc4QhitGJbYFPpRFF2aX5CBnJLi5cdvPzopq5PIACSfKOjlLL/9VDfv5Xl3fb3RbreMrjFMGK04JLEpVKOI+fkF3/fDwLsydVudkzOnmaiABMk+AQ66XFt7ulsUvV6v2+1sbPy93W4ZXeMQYbTikMSmUVS9ePErYViRvi99/5vVP6kZeeYUYQUkSIlgXwEFy2tPdfK8KIpuN9/cbABZ1jK6xgFhtOJAYtMoqgJzc5fDsOJ5Qvr+pBSvfu7Oo1NMTUAAgWRPH/rQ5drf6nnPFYXL8+79+/e3t/+RZS0ojY4ZEEYrDiQ2jaIqMDd3OQgCf48QofRfPHfr8Ufk6UkIwJMIKKHk4zYvvFMvisI51+12dncfvP/+e1nWgtLomAFhtOJAYtMoqgLGzIfhpL/HE9Nnz0rBd0//4VxVTlVASvYUfLTDr7Mrffjww23neg8edDqdne3tZpa1oDQ6ZkAYrTgksWkUVS9cuBiGk+fPfxbwPASeJ/jOqd8/MjXhe0jBm/+64kr6fOrdd99pNjezrAWl0TEHhNGKYYlNo2h6aWmZAc9jj8ATgGBfSQkl/2tl5WaWtaA0OuaAMFoxLLFpFFWhsrS0zIDnAR5jrazczLIWlEbHHCKMVhyR2BSIoumlpWUGPA/wOM7Kyk0gy1pQGh0zTBitOE5imyAYmJmZ5jhZ1uJTpdExRwijFaMltsk+wfFKDhgdcxxhtOIhJLbJEUbHnEQYrfh/+i/3MSefGM9yDAAAAABJRU5ErkJggg=="},{"name":"Medium plated rune salvage","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAADH0lEQVRIDbXBT4hVdRjH4c97cpx/RmRtokxEuPe3afkihLy4qkXbamVQMhW6CUYiWkeLFooggZFluZBaRItW7uQgghyIVoVHEgqhRUWI44yOnffbvTMOzTB/HBf3eSy8MEoWXhglCy+MkoUXRsnCC4+iblogvMf2WHhhG+qmZUn/0MvAtUsXgfAeD2PhhS3VTQu88MprDIkEsktAP1/8PrzHliy8sLm6af31I10mQxob25mp+4t3kUB0+dMP34T32JyFFzZSNy1w4PBRjPHxqcxEQkpE6v69eUSXHdKP330d3mMTFl5Yp27ag2+9x4DZjokplklkphIJhHTv7nx2HZnNt1+E99iIhRfWqps23j5OVQE7J6ZZLZUIicxULi7cIbtOSaerF86E91jHwgur1E0b735QPVZh1fjEFOtIQjlADi0u3EGZyitfnQaF91nLwgsr6qY9dOzDyiqqisoqq8Ymp/mfSCGlRKakzA7l4vxcSmRe/vJUeI+1LLywom5af/XNJ57di1VVZViF2fjkNENCpARCyi5RDkhaXJijy1SirD8/Ed5jFQsvrFI37UuzH2FDmFEN2NjELiQk0AASUioH7s/PZZepREmXlz77BBTeZ4WFF1apm/bFN449/syeyioqwwyzChubnEIgISUg3btzW0pyoEslXaZ06dOPQeF9Vlh4Ya26aQ8cPvr03v2YgWEGVMaOiWkGpMX5uZRQDpCpzFt/3GTJ1QtnQOF9Vlh4YZ26aQ8emX3yuT1gGGCYjU/uklhcuI2UElJm3rr5G3Dl/GkeUHifVSy8sJG6aQ8emd39/D4MMMxYJqGhf36/kV135fxphsSS8D5rWXhhI3XTxsxsJrv37a8wDDCWKf+6cf3yuVMMCQjvswkLL2yibtqYmd29r8eQmbHsz+u/XD53CgSE99mShRc2VzdtzMw+tb+w5O9fr4HqsydB4X22wcILW6qbNt55v6LK/BdUnz0JCu+zPRZeeJi6aYGYOV6fPQEK77NtFl7Yhrq5BgYK7/MoLLwwShZeGCULL4yShRdGycILo2ThhVGy8MIo/QeobbWQ7cOP2gAAAABJRU5ErkJggg=="},{"name":"Large plated rune salvage","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAADp0lEQVRIDbXBzYtVdRzH8ff30MydpyCtiCQfmOSe3zKEH4LID2kbtBGixYBkYoybYEjsP2hVGEIFRhMVBbWIoBalCzkMghyKKDLnMEWhRk8W4ug86Pl+uvfapRmcma6L+3pZioF+shQD/WQpBvrJUgzcjaKs6EixSQ8sxUAPirKiI3/8CdzBZ898DqTYZEOWYmBDRVkBjz35dC2B4+ACr13Iz3/xSYpN1mcpBtZRlBUQn3oWBNTuAwMNdwe/ubSIC3nt9beffZRik3VYioG1FGW1e2KSFqPRGHYXEpK7IwctLi3iNRLuX338XopN1mIpBu5QlNXeZ56n456hEW5zuWokJEe4bi7ecDku5OWHb6XY5A6WYmC1oqzS4RfoGGyMsIJLSEgux+Wqby1cryXcXV5+cDLFJqtZioGuoqyAfZPHsGxwaJQ1yVtwdwn35YV5l/C6ls69+xooxZwVLMVAR1FW+yZfxLLMDMswawyPsJpLSKjFW5B77cuL13F3OdLZt0+k2GQFSzEARVnt2n/gvoe3YpZlGWaYZZYNDI+CuE1CcsDbkMuFvGV5YR7J5dQ+M/1qik26LMVAR1FWu/Yf2LxtPDODDGsBs8bImCQQEsIBCbnXjrwFaWlhHsnrGnlx8mVQijkdlmKgoyirPRNHxh7agrVhlpmRZUBjaNQRAgnUgoTk7ksL87h77chdTu2XvvtybuZ0ik06LMVAV1FWeyaO3LtlW2ZGZliWGWCDw6MCJCSQC6SlG/Oolgt5W+3IXY7rzOsvgVLMAUsxsEJRVrsnJh/YvhMz2gwjg8GRMZcQIKTFhXkkane53HG/+utlus69/wYoxRywFAMrFGW1e2JyYHB40yNbwWgxo8VscGgMaXnhGsgFkstxv3r5Ih31rZvXfr90/vSnoBRzOizFwGpFWe09OAVs2rbDaDHMaDFDArUgIf/74s9e18DZd07wH6WY02UpBu5QlNXeg1Obt49jRouRYfxLLpD++mkOmJk+TpvoSjFnBUsxsJairNKhqc07doJhgNH159wFYGb6OG0CUsxZh6UYWEdRVunQ1P3jOW1Gx5UfL3jtM9PHQUCKORuyFAPrK8pq33PHNu14lI4rP8yCijdfAaWY0wNLMbChoqzS4aMPjud/zH3/W/XNbHEKlGJObyzFwP8pyiodPvrLha/nilOgFHN6ZikGelCUFW1KMeduWIqB3hTlbIo5d8lSDPSTpRjoJ0sx0E+WYqCfLMVAP/0D6hEknxlR4rQAAAAASUVORK5CYII="},{"name":"Large plated rune salvage","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAD8UlEQVRIDbXBzYtVdRzH8ff3NPfeeRLSksjygSnuOUsRfkgiP6Rt0EaIFgOSiTFugiGx/6BVYQgVGE1UFNQiglqULuQwCHIoosicwxSFGj1ZiPN475zvpzvXhmZwZhoX83pZDBmbyWLI2EwWQ8Zmshgy7kZelHTF0GQDLIaMDciLkq708SdwB5+48DkQQ5N1WQwZ68qLEtj75NOVBI6DC7xyIb/8xScxNFmbxZCxhrwogfDUsyCgcq/VGu4O3p6fw4W88urbzz6KockaLIaM1eRFuX94hA6j0ehzFxKSuyMHzc3P4RUS7l99/F4MTVZjMWTcIS/Kg888T1dPbz+3uVwVEpIjXO25GZfjQl58+FYMTe5gMWSslBdlPP4CXfVGP8u4hITkclyuamF2upJwd3nxwdkYmqxkMWQsyYsSODRyCkvqvQOsSt6Bu0u4t2anXMKrSrr07mugGFKWsRgyuvKiPDTyIpYkZliCWaOvn5VcQkId3oHcK2/NTePucqSLb5+JockyFkMG5EW57/CRex/ciVmSJJhhllhS6xsAcZuE5IAvQi4X8o7W7BSSy6l8fOzVGJossRgyuvKi3Hf4yLZdQ4kZJFgHmDX6ByWBkBAOSMi9cuQdSPOzU0heVcjzsy+DYkjpshgyuvKiPDB8YvCBHdgizBIzkgRo9A44QiCBOpCQ3H1+dgp3rxy5y6n82ndfTo6fj6FJl8WQsSQvygPDJ7bs2JWYkRiWJAZYvW9AgIQEcoE0PzOFKrmQL6ocuctxXXj9JVAMKWAxZCyTF+X+4ZH7dz+KGYsMI4F6/6BLCBDS3OwUEpW7XO643/z1Oksuvf8GKIYUsBgylsmLcv/wSK3et/XhnWB0mNFhVu8dRGrN3gK5QHI57jevX6WrWmjf+v3a5fOfgmJI6bIYMlbKi/Lg0VFg6649RodhRocZEqgDCfnfV3/2qgIuvnOG/yiGlCUWQ8Yd8qI8eHR02+4hzOgwEox/yQXSXz9NAuNjp1kklsSQsozFkLGavCjjsdFtex4FwwBjyZ+TV4DxsdMsEhBDyhoshow15EUZj43eN5SyyOi68eMVr3x87DQIiCFlXRZDxtryojz03Kmtex6h68YPE6D8zVdAMaRsgMWQsa68KOPxk9uH0j8mv/+t/GYiPweKIWVjLIaM/5MXZTx+8pcrX0/m50AxpGyYxZCxAXlRskgxpNwNiyFjY/JiIoaUu2QxZGwmiyFjM1kMGZvJdu99jM1kfdsfqir5QhuwnlpPQrvVrjfqtb4t3pqZmZ4B6o36gtM7sGV+drpqzavdqtfqC5DU6khVe94sSXpqPfcYsFCpv79XUmtmhp6efwBwfU0qy3pehAAAAABJRU5ErkJggg=="},{"name":"Huge bladed rune salvage","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAADhElEQVRIDbXBz2vTZxzA8fdTbfxq+mNZLP0TnucojE9O5RMooghDhN0ET+uxtzp2kJVREMoOlkFFculFT56ml+0wQvOsCOY57pJ8EdNLmM4uFbeKSJtnGvzCV7SaSn29jIrjczIqDmg0WwxUK45DZVRco9mqVpwPbSDGWK04Do9RcYAPbRULNJotY4yK5ZAYFUem0WxVK86Htorl4HxIeYdRcQw0mq1qxfnQVrEchA8pA2e/WwZ2th6RKRQnjIoDGs1WteJ8aKtYhuZDCpz9/ide6feBna1HDPRjTMYmAaPiGs1WteJ8aKtYhuZDeu7Ktf7uLq/0+8DO1qN+jAwkkyX2+vXVJaPiGs0WOdWK42N8SM9ducZAf3eXfv/fJ3+RSSZL7PXrq0sQjYoDfGiTo2LZnw/pmctXyfy39Tc5yWSJvX59dQmiijUqjoPwIT1z+SqZ7e4mmdFjJ5LJEnv9+uoSRBULGBXH0HxIz1y+Sma7u0lOcaI8kiT1n3+EqGIZMCqO4fiQzs7/cDRJGNjubpJTnCgD67VliCqWjFFxDMGHdHZ+ESJwNEm2u5vkFCfKwHptGaKKJceoOD7Gh3R2fpHXItDrdoDR5DgDxYkysF5bhqhieZtRcXyQD+ns/CKvRaDX7ZAZTY4XJ8rAem0ZoorlHUbFsT8f0tn5Rd6IvW6HnLHS1NHRY+u1ZYgqlvcxKo59+JDOzi/yRux1O+SMlaaAjbUViCqWfRgVx/v4kM7MLTBQSIq97kNyxkpTwMbaCkQVy/6MiuMdPqQzcwtket0OUEhOMDBWmgI21lYgqlg+yKg43uZDOjO3QKbX7ZApJCfGSlPAxtoKRBXLxxgVR44P6czcAplet0POeHl6tJBsrK1AVLEMwag4Mj6kl2p3WvW7x8a/AHrdDjnj5ekjZuTezesQVSzDMSqOjA/ppdovwJ+/3n75fKdYOrnzbJuB8fL0ETNy7+Z1iCqWoRkVR44P6akLF18+3wGKpZM7z7aB8fL0ETNy7+Z1iCqWgzAqjowP6akLF0cKx188fQJ89c23rfrdkdECcP/WDYgqlgMyKo4BH1J7+uvil9PAi6dP/nmYPn7QulS7k/7x2/1bNyCqWA7OqDgyPqT29Hng6Wb6+EELIhheiyqWT2JUHDk+pPb0+fbvdyGqWMCHtorlUxkVx9t8SCGqWA6DUXF8TkbF8Tn9D9OpaOrFO8GQAAAAAElFTkSuQmCC"},{"name":"Fire talisman","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAE2klEQVRIDbXBUWhkVwGA4f/crO0ico34sAj3sc49b4JwIgU98WlASqEDUkQKQwbrwyAopT5IsdLa6ou0VXEeotxx7LLBdV0KosXiw+Zk2ZocKFNX2eSytEVTSrrRTjqTmdxz7u51c+ngDJO4m4f9PqGV5OSMTZuNOmOtpANoVWGG0EqubmwytrgguRNj0+UoBLrVGhNaSQfQqsIEoZVc3dgUQjCmVcydGJsuRyHQrdaY1ko6WlUYE1rJ1Y1NIYRWMXdibMqExmNfO33f/YBN2o9H891qbS1pA1cJtKpQElrJ1Y1NSosLkmMYmwLf+kbjIDtwzmXuNn+QjU7NfexT85+89tvzj0fzwM+3e1cJoNAqpiS0koCxW0BRFIsLkgnGplpVjE2feuLb3vu9weDTf/r1vxYfdd7nee6cG2XZ/d1L7/ewBMtR+M3tD6HQKmZMaCUZW93YFEJoFQPGpsAXuXWZ4NnvPTkYjob7o/APvwK2v/xodOl8+oWHnc+99zu7u290/wYFCCi0ipkgtJKrG5uLCxJY3dgUQmgVG5u+HIWvV2utpAN8/8nv9PuDj7+yzITrDz7ywOuvvPm5qnfuzWvXdnZuaFVhhtBKAqsbm8DigjR2S6vY2LTZqAOtpPOTZ38wuG04vO93v2DG3z//Fe99v9+/vG6h0CpmmtBKUjJ2C9AqBoxNm4060Eo6Lzz3TOay/f39W2dfZMbWwsPOub1+z1yxUGgVM01oJZlhbNps1IFW0vnpj37ovD/IsoPRqDj3EtOuP/iI9/7G7u7ldQuFVjHThFaSGcamzUYdaCWdn/34eZ8753yWZc57zr1E6Ub1sSz3ucsHw8HOzo31N7pQaBUzTWglmWFsuhKFa9UaID9b8blz/tDN/KbPc+e9d8753Od+OBzt9fvvvvde9+o/oNAqZprQSjLD2HQlCteqNaCVdF547pnMZTfzm977PM9dfpt33o+GB4PhYO/DwdZbb73zzj8BrSpME1pJZhibrkShg/VqDWglnae/+8SpU3O5z32e+zz3zjnv94ej/mDw7w8+MFf+2mzUgVbS0arCBKGV5CjGpp0oBNarNUqnT5+eCwIxF3jnnPcuc4Ph/n/29v78l0vNRh14+2L71V4AhVYxY0IryTGMTTtROAdXqjWmee9/+fK5ZqPO2NsX26/2Aii0ipkgtJIcz9h0OQq71RrHOLjYppT0Aii0ipkmtJIcxdiUUrNRp2ST9tfPzOccGtGjdD3jtt/0Aii0ipkhtJJMMDal1GzUmWCTNmAJgBfPhH16lJ7eCThUaBVzFKGVZMzYtNmocxSbtC0BFBwS/E8BaBVzDKGVpGRsejYKr1RrlD7xx/bgoSXGbNK2BFBoFQPGblHSKub/ElpJSsamZ6Pwmu95PjJ4aAlYS9pfaiwBraQDhVYxJyG0kpSMTZ86cwt4ficAmo06petJ+4HGEtBKOlBoFXMSQivJmLEppeUo7FZrwFrS/gwsRfNr1RrQSjpaVTgJoZVkgrFbIJajkNKF7d5rBCtRuFat7V5sn+8FUGgVc9eEVpIZxqbLUQhc2O69RrAShb8f9Chd6AVaVbhrQivJUYxN+UgB4qvzty70Ag4VWsXcNaGV5BjGbgFaxYCxKRSAVjEnIbSS3EtCK8m9JLSS3Ev/BQ/odp9NYH8MAAAAAElFTkSuQmCC"},{"name":"Water talisman","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAE10lEQVRIDbXBz4vcZx3A8feTjRrw0EfQg+hNnO/zB/jswcOznvTkZQ4iQ3FwMCCDoJR6KOKP1movbaEKXxaFbzuxKygxeJOEVLIPJWv2SUrUjdn5UmoplHbd2M46szM7z+fZfN2dZnCG3djsIa+XctZwcj6U7VaTqbzoAM7WOEI5a4DV9U0mlhYNH8aHUutloFFfY0ZedABna8xQzprV9c2lReNDF6iqamnR8GF8KLVeBhr1NeblRcfZGlPKWQP40HU2A1bXN5VSzmYcx4eSGa1Hv37mox8D8mJD67ON+lpeXOfQLWdrTChnDVOr65tLi8aHrrMZ83woge98q7U33osxjuMB2RuPTi985BP6kXO/+6fWZ4Fe75dwCypnMyaUs4aJ1fXNpUXjQ9fZjCkfSmdrPpQ/eOy7IrIzGIhEiSmKpJRijKPx+PKVj8O/4IbWy73et6FyNmNKOWuA1fXNpUXjQ9fZjAkfSg59Ea4+9cTjg+FouDuSFCWlJEmSiKQoSUS27tx57ebfoAIFlbMZM5SzZnV9c2nR+NB1NmPCh1LrTqP+57zoAD98/Hv9/iDdvSsp7acD8tKfPve1L/1DRKKIxPjX27e3tradrXGEctasrm8yY2nR+FC2W00gLzrPPvXjwYHhUESSJLmbfvXHz37jK69LEpEUJYlIv99/9VqAytmMecpZA/jQZY5qt5pAXnSef/rJcRzv7u7ujaNEeeH3n2Ti0S+XIiml/RjjTr/nrwaonM2Yp5w1HOFD2W41gbzovPDzn0aRvfF4bzQaizz78iPA2a++JUmipJT2RWT7zp1XrwWonM2Yp5w1HOFD2W41gbzo/OKZn0mKMcp4PI4iUURilJREZJwkxTQYDra2tq+9dhMqZzPmKWcNR/hQar3SqF8CzOdrkmKUQ/tpX1KKIhJjlCRJhsPRTr//9jvv3Pz7LaiczZinnDUc4UOp9UqjfgnIi87zTz85juP9tC8iKaWYDkgUGQ33BsPBzn8G3TfeePPNtwBna8xTzhqO8KHUegVio34FyIvOj77/2OnTC0mSpCQpSYxRZHc46g8G/37/fX/1L+1WE8iLjrM1ZihnDcfxodT6RaBRv8LEmTNnFk6dUgunJMYoEsdxMNx9b2fn4uUr7VYTyIt34SJUzmZMKWcN9+FDqfWLsNCov8I8Efn1b37bbjWZyot34SJUzmbMUM4a7s+HUuvlRn2N+8gLxT0vQeVsxjzlrOE4PpRMtFtNJvJiQ+sGJKDHiA/0XufQy1A5m3GEctYww4eSiXaryYy82ODQDUDr53r0+UDvJxyqnM04jnLWMOVD2W41OU5ebMANqDik+J8KcDbjPpSzhgkfSq3PNeqvMJFf+FS7vs1UXmzADaiczQAfukw4m/F/KWcNEz6UWp/rcRuEiXZ9G8iL6+3WF4C86EDlbMZJKGcNEz6U6Cc40HsGaLeaTOTF2+3WZ4C86EDlbMZJKGcNUz6UTGi93KivAXlxHT6t9Tcb9UtAXnScrXESylnDDB+6oLReZqLXOw+XtV5p1C/lxS6ch8rZjAemnDUc4UOp9TLQ652Hy1qv9Hp/4J4LztZ4YMpZw3F8KLmnAgV1uMChytmMB6acNdyHD13A2QzwoYQKcDbjJJSzhodJOWt4mJSzhofpvyMxvp/6pqciAAAAAElFTkSuQmCC"}],"triskelion":[{"name":"Blank","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAcElEQVRIDbXBQQEAAAABMdoocF/9Y0lhc4meXKInl+jJJXpyiZ5coieX6MklenKJnlyiJ5foySV6comeXKInl+jJJXpyiZ5coieX6MklenKJnlyiJ5foySV6comeXKInl+jJJXpyiZ5coieX6MklehrY9xOB0WoOowAAAABJRU5ErkJggg=="},{"name":"Sealed clue scroll (elite)","base64":"data:image/png;base64,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"},{"name":"Sealed clue scroll (elite)","base64":"data:image/png;base64,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"},{"name":"Sealed clue scroll (master)","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAGLklEQVRIDbXBa2hf5R0H8O/vX0263tbWUuqg6wY256Cb2LGnKM5HtrdjDGSwC77bkLHBxhzFaVuVMdmLjYFjdrqJOgaCBTt3KaMXanOIVXNQQkVJTu1WStIk//zP9bmd23OetYFC/qQd7Qs/H+LMxw0IwoizMdw84swHMD45/eBeH9cShBGA4MX9/AfPAOBsDDeDOPPHJ6cBEBFnHoYFYRT+9WlTNdZ2uqxSoR4+8AJnY7hhxJkPYHxymog48zAsCKN3/vJUWTdta5Up41zOLaUHDx3hbAw3hjjzAYxPThMRZx6GBWF05pUnO9sJbaSp41xc6qe//PPfAceZh2VBGGEFzsawAnHmAxifnCYizjwMC8Jo4qWD1lqhTaHKQSrmltL/zvYPnww5GwMQhNGR3/6kappCGm1qWZYHDx3hbAxXEWc+gPHJaSLizMOwIIyCF/e3rS20yYSeH2T9uLi4MHj91HuAA+hfzz5a1a3QWqpSmioRWpvqD6+d5GwMy4gzH8D45DQRceZhhSCM3nnlKVPXTdMKVSZCzQ/SxTif6ydvnJ4CcOy5fVJXddMUyihTC2VSIZWpCmVeOx5yNgaAOPPHJ6ex7MG9PlYIwujMy082bSt1WWiTZGohzuYH2WKS3ffFO9hdu01dN01bKCN1KVSZFEqZKldaqPKfwRTgOPOIMx9AEM5gGWcergrC6Ednm4feOiB1mSsdZ2phkPfTfPfO7T3q3ePvamwnlBHaCFUW0qRCS13myvzt1HuA48wDQJz5uJYgjB5/ey4Z3dJo2RrtrHWd7ay95fnv+7t2sC/sNvVlbaGNkKZQJsmV0KbQ5vDxEHCceVhGnPlYJQijg+8PKiXTka2NEbaunbVdZ2Fb19nOWmdt19mHzr+cKyNUmQuVFDoXOlf66MRZwHHmYRlx5mOVIIyeeHc+Hd3SKFkb6WznOttZ6zrb2RadddZ21jprG6O+/P4f40zmymSFfOP0FOA483AVceZjlSCMHpu4mI5ubbRsK4POOtt1nXXWdp111nZd66xF15Z5VuVxOxdtnzlx+GQIOM48rECc+VglCKMThx5r2laaUujyzXt/0XUW1rrOdtY6a7vOOmttZUyeVNmgnYtkf3HqH68CjjMPKxBnPoYFYXT6T080baNMLU2ZCxNnIlNamWrXjq1TXz2AznbWOmtrmVd53F06J+IlPfvxB6dPAI4zDysQZz6GBWF07Ll9TdsqXQldZlInucylrur24a9/pa6bsmkKaV7f+d0yT6t80M5GctBXs+dn3p0AHGceViDOfKwQhNGpFx5vmkaaWhpTSBNnotClVNXnbt963z2eLquqbpNCZUKluQw375XJkp79z9TJo4DjzMMw4szHCkEYHf39z621ylSFNnEqM2WkNKaud+/cce/du4U2uqySTGVSJ7mYj/Nzm+5Sc+c/mjgNOM48DCPOfFwVhNHxQ/uaxuqykqYqpFnKRC50Wdefv33bA1+6s2qaXBppTJypTMiFpFhKxexCmo7c9vFUCDjOPAwjznwsC8Lo+KF9XedM1ShTCW0GqUiFUqYydet/dvsDe+40dSV1lRRykIo4l4txvpTm/z7zIa5wnHlYhTjzsSwIo6PPPmq77thbZ9evG103OlK3NhW6ats7PrONqHf/Hk/pUmjTT2VSiDiTC3E238+CqXOA48zDtRBnPoAgjL7G/E9vXL9t0/qNGz61fu3orWvWUA8EIgIRCL3793ipUEKZxThPhU4yeWmQXJhPpmYuAo4zD9dCnPkAgjD6Br9788YNmzes27hudO3ICAHogS4DiHpEuKxHdNuWTUtJkUrdj/PFuPjg/IXZxQJwnHm4FuLMx7IgjLDs6Ue+2aMe9UAgIhBA1AOBQESgXq+s6zTXi2m+MMhOhdOA48zDdRBnPq4KwhlcQRj26x9/C4QeEfVA6BHhwqV4IUkXBsXE1DnAcebhOogzH6sE4QyGEJb95qffJgIR3XrLmpPhh/P9JPzoIuA483AdxJmPGxCEM7iCAPzuZ99ZOzKycf3or146OnPhEuA483AdxJmPmxGEMwABePWZH35v//OA48zD9RFnPm5eEM4ABDjOPPxfxJmPTxJx5uOT9D8rfEq9h9pLIgAAAABJRU5ErkJggg=="},{"name":"Uncut dragonstone","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAEBElEQVRIDbXBwWobVxSA4f/ckXEJTTubvoLnvsD18npTCnmEuA7NW9SJX6bbbkOCKM2iGoogGujanlWg0NaOY185smWPNOfUEhGVcNK6EH+fxOC5SxKD7w32Wdja9HxSEoPvDfZFhIUYCj4dicH3BvsiEkPBHZAYfG+wz9zWpue/lFUdwwa3JjF4oKwOADPb2vQsKauaVYGvK14CMWxwCxKDZ6E32BeRGIqyqpn7hm/5h4EodsIR8BsvmYthg4+TGHxvsL+16YHeYF9EQB7le9PUkGdv0++KKS3gEEcGKO2Qty2WIUDFz0AMG3yIxOCB3mAf2Nr0ZXUAspPvKa0lk1wyssP0WmnBAUrryBzSMFZszAUoWMXLGDa4QWLwzJXVARBDUVb1o3wPaGktWSfvACkdXXEBKKa0wJQGxHEtA/cLP4LFULBKYvCsKqt6J38qiKFtmnTydUOH6VjRCZeKgQJTGmYcM9Iw6tONYYNVEoNnSVnV2/muwwli2CQ1a/naaTpixkAmjEGAhitmBGzMeQZ9umAxFCyRGDxLyqreznctmeTicJPUOOSME0BpWzTDTWgc0nDFjIwZKergFT+BxVCwRGLwLCmrejt/AgY4nKLAMB0xIw6nKHDFeEoDss69xF/MOOAV3Rg2WCIxeJaUVf0o3zMUUMwhgkvpSHCGKuYQRcHOSevcTxyxkEGfLlgMBQsSg2dJWdU7+VNFAUut5FmbJiOS0nZYY04xZXrFGLhkxFyLAq/ogsVQsCAxeJaUVb2d7xoGIpCRTdP0jDcTphnO4RyZ0jqyUw6/5KtT/gDHe9qnCxZDwYLE4FlVVvXDfJfUgpPcgQHD9AaMGZkyfcfp59xfY/2cs4ZzcMxony5YDAULEoNnVVnV2/kTw0gGLWRZ7obpBFCmYEOO7/EF2BqfjRldMuI97dMFi6FgQWLwrCqreid/AqKopVaxLO+M0ilgtFeMFctYM2zKFaBow4gZ1+cFWAwFCxKD54ayqh/yveQuwzXp0uHOeeeQC86UVjGHODoNE1Aw0DHjDNfnBVgMBQsSg+eGsqq3813A4drUQAYc8rpDpqAoGIjSQMZ7ruG8z3OwGAoWJAbPDWVVb+e7DmkxgdP0pyMDFG2ZgjE3ZapcU4dzyAWjPs/BYihYkBg8N5RV/TDfzZA2Td9yCAgYLWSAgEMUe8eJwwHKNe3zDBxYDAULEoPnQ8qqBh7wGMzRAQEDUdQxM+QYRDFoHRnwK8/AYihYIjF4PqKsDkCYe8B3Co5r4nBDjpVrCg7o84wZi6FglcTg+VdldcCMMPeAx0CXH1hhQAwFN0gMntspqwNmhBljSQwFHyExeP6nsjqIoeB2JAbPXZIYPHdJYvDcpb8BAV/2kAv6onEAAAAASUVORK5CYII="},{"name":"Uncut dragonstone","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAD2UlEQVRIDbXBz2obVxTA4d+5M7Ib0paBvoPnvsDZ3mVL6BMkjbJInqGU1HUepfvuWuMQQqCLIQjKfQIPdJmY2Ik9cvTHsmbuaSQQSDguzsLfJ0E9t0mCem6TBPXcJgnquU0S1PMlqlgH3eHGJKjnelWs2aT8EHkJBN3hBiSo54oq1ix9z09CDhhtwhw5cMYREHnFUtAdridBPZuqWPeLPUht037gCFIiJVJODgjZnNlHziCxFHkFBN3hcySoZ1MV60fFMwNrWimc4N42/zo+ESCRHDlwwcjBmDFLkZdBd7hCgno2VbHuF3uCM5KRHJlhTXM8YwSSsEQH1jJ3ZIAjA/ubP8CClmySoJ5NVawfFc8MA2ubNi+2IA2bk440ZwZdgpbWsZDoQMBdMh5wEHSHTRLUs6aK9X1+yYue4IB5M82LO6fNWxCwjHzCucOBu2TiyBI4uGAE2YB9sKAlaySoZ00V636xayAstM2lkH/kFEi0LW1OPuMiI59xAcmRjRkmEhB5CRa0ZI0E9aypYt0v9kC65nKr+GrWXEghw+YYcDghMyzRzZgAiW6bu0PeAR0pww14HnSHNRLUs6aKdb/YgwR0pJwecN68Bzo6lgQ62imjbe6c8i7DgbBgA56DBS1ZkaCeNVWs+8VvgGFd0yY6w8YMwTJ6DpdIDplzOWXkkAkTFjqWBjwHC1qyIkE9a6pYPyie0uAKcfQcJOxD86alzcmBHttzLntsnXL0Dd+dccRCBh3IgAOwoCUrEtSzqYr1g+KpNQbkRWYYyFlzDAmcw7XMhpx+zbc9tsecXzIBAQMZcAAWtGRFgno2VbF+WOwC82bmyPKiBwyb94DRJWzIyV0Kw7bZnjKeMIIEdHT/8AIsaMmKBPVsqmLdL3ZBMrJZM4MuK7bOmw8O6UgzxmAZvYR1zICEXTBmwQ3YBwtasiJBPVdUsX5Y7AqfSNvMhHzCEGTKyGgTHWQZ+ZyLxCcJuinTjN6AfbCgJSsS1HNFFeuHxa8gQtY2Uylya9oT3jgcWMJYapkDDgc4sgmjAftgQUtWJKjniirW/WLPSIAgp80RCwLW0hoGCVyiTXQsiCObMBxwABa0ZEWCeq6oYn2fn/Niy7CT5k1OnugSxoojg/SRUxBw0CUY8Cc4sKAlKxLU8zlVrIEfeZKwnB4kcIkOjAUZcuzIW1rAsfCafbCgJWskqOcaVTwEYekejwGHsCBDjkESBjjkNX+xYEFLNklQz/+q4iELwtI9HgMv+J0NBgQtuUKCem6miocsCAvGmqAl15Cgni9UxcOgJTcjQT23SYJ6bpME9dym/wAbitmQSYnqwQAAAABJRU5ErkJggg=="},{"name":"Uncut dragonstone","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAEHUlEQVRIDbXB3WobRxiA4febXdkNactC78E7NzA+HJ+1hF5B0igH6TWUkrrOpfS8Z61xCCFQ0BIE1dyAvJDDxMRO7JWjH8vana+RQCDhpHUhfh7xznKTxDvb6fVZ2tm2fFbine30+iLCknc5n494Zzu9voh4l3MDxDvb6fVZ2Nm2/JcilN5tcW3inQWKcAio6s62ZUURStY5vgs8A7zb4hrEO8tSp9cXEe/yIpQsfMsPQgoodUQNKXDGERB4zoJ3W3yaeGc7vf7OtgU6vb6IgLSzPYh1Vb/jCGIkRmJKCgjJjOl7ziCyEHgOeLfFx4h3Fuj0+sDOti3CIciD7LGCVrVkRjCvq5eGDwSIREMKXDA0MGLEQuCZd1tcId5ZFopwCHiXF6FsZ3uCUaISDYmiVXU8ZQgS0UgDWjMzJIAhAf2L30G9y1kn3lnWFaF8kD1WFLSu6jTbgDioThrijCk0EWpqw1ykAQFzyajLgXdbrBPvLCuKUN7l5zRrCQaYVZM0u3VavQYBTUjHnBsMmEvGhiSCgQuGkHTZB/UuZ4V4Z1lRhLKd7SoIc3V1KaTvOQUidU2dkk65SEinXEA0JCMGkQgEnoF6l7NCvLOsKELZzvZAmupyI/tiWl1IJoPqGDAYIVE00kwZA5Fmk9sD3gANMcF0eeLdFivEO8uKIpTtbA8i0BBTWsB59RZoaFgQaKgnDDe5dcqbBAPCnHZ5AupdzpJ4Z1lRhLKd/Qoo2lR1pFF0xAA0oWUwkWiQGZcThgYZM2auYaHLE1DvcpbEO8uKIpT3skdUmEwMLQMRfVe9qqlTUqDF5ozLFhunHH3FN2ccMZdAA9LlANS7nCXxzrKuCOW97JFWCqRZoijIWXUMEYzB1EwHnH7J1y02R5xfMgYBBelyAOpdzpJ4Z1lXhPJ+tgvMqqkhSbMWMKjeAkoT0QEnt8kU3WRzwmjMECLQ0PzNU1DvcpbEO8u6IpTtbBckIZlWU2iSbOO8emeQhjhlBJrQimjDFIjoBSPmTJd9UO9ylsQ7yxVFKO9nu8IHUldTIR0zAJkwVOpIA0lCOuMi8kGEZsIkodVlH9S7nCXxznJFEcr72S8gQlJXE8lSreoTXhkMaERZqJkBBgMYkjHDLvug3uUsiXeWK4pQtrM9JQKCnFZHzAloTa0oRDCROtIwJ4ZkzKDLAah3OUvineWKIpR3+SnNNhQ9qV6lpJEmoiwZEojvOQUBA02ELn+AAfUuZ0m8s3xMEUrge36MaEoLIphIA8qcDDg2pDU1YJh7wT6odzkrxDvLJxThEISFOzwEDMKcDDgGiShgkBf8yZx6l7NOvLP8qyIcMics3OEh8JTfWKOAdzlXiHeW6ynCIXPCnLLCu5xPEO8s/1MRDr3LuR7xznKTxDvLTRLvLDfpHxE395B0SVMTAAAAAElFTkSuQmCC"},{"name":"Uncut dragonstone","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAD1UlEQVRIDbXBTYoc1wEA4O+9qtaECJyG3GG6LvDI7m290A2CJWR0CWPZ8kmyzzIWI4Igq0IMiDqBmiwVW5Y1Uo1mNH/d9V4YhYZpxgryYr4v5NS5SSGnzk0KOXVuUsipc5NCTp3fox+WOe36bCGnzqf1w9K2v/jyuafIaddnCDl1rumHpY++9FXURGFlTQ2aKLz1Cs899VFOuz4t5NTZ1g/L+/NHRS1WB+PPRa0matAiCpPVoXeUokTxuafIaddvCTl1tvXD8uv5D1WdTI0mCP8Z/42gQTUFbeTUEfHUB5fKc09z2nVNyKmzrR+W9+ePgliVojTaqozj61PHxGqiFmXtIppRWrOi/MvfqTktbAs5dbb1w/Lr+Q9VxWTVmGEcXxf13Fk1UYs1gbpWoogzH/bt5bRrW8ipc0U/LL+af9OaBQ3One3YORh/Ilal0Z54HzRROHXSaooahRNHUfPMY2pOC1eEnDpX9MPy3vx7KgFrq0Y8Gg8KkzVT1Jw7a7QrZ0WJmhOHk0J87p/UnBauCDl1ruiH5f35I0zWMzsXzoL4dnyFRhtFyqScO0Ex7fjjO7+4VIj7nuS064qQU+eKfljenz8qKqrSmmEcX6OaCFTCZH3qaMftd35xqaFg3x41p4WNkFPnin5Y3pt/H4WiFOvJRD0eD4sycysIVSVMLk4dR/HEMYrio3171JwWNkJOnSv6YXl3/i0BrVsu1Tfjy7VVa4bWrbVVa/bOqy/8+Y2fETXFhH171JwWNkJOnW39sLw7f1gVRE1VgzCOv1broI3CysWhg9v+dMutD47OfCBSsG+PmtPCRsips60flnfnD7F20WhatzCOv6IolNGb277AzB/OHJ84Kv5n2veEmtPCRsips60flvfm30UxaFbOitpq349vXSqnTqppZoeycoGinDiOIp55TM1pYSPk1LmmH5b35t8RonDhvNEcj4dRPPF+sqYSGrOVM2qhmC6cRs0zj6k5LWyEnDrX9MPy7vwhodWcO2u0k/Wb8WXQVJONtQtiFBDFE8fPPKbmtLARcupc0w/L+/NHkwlBPBh/ikIQJqVYo6iEal1MiCLh2OG+PWpOCxshp841/bD86/yb1qwqb8aXUUuloKhRoKEeOSC6VIr6zD+I1JwWNkJOnd/SD0vc8QAzbSFSqCYEYfQ6atbWiAJ6P1JzWrgi5NT5hH54QfDRHQ9sRPHQa2IxESK9H12qOS1sCzl1/q9+eOFS8NEdD/DE32ypyGnhmpBT5/P0wwuXgkvVFTktfELIqfM79cOLnBY+T8ipc5NCTp2bFHLq3KT/Atqk1JDXK1vsAAAAAElFTkSuQmCC"},{"name":"Uncut diamond","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAFHUlEQVRIDbXBT28bxxkH4N87u7OkLSe9xMiluWrnC4yOow9ToL0WKFD0nCYC5NaJFDt2E8PXFo1rW1VbIAGC1BrkxAVyK0quKkuUZUWKTIn6S3J3530rCiBAQnHhAvbzkLMGbxI5awCsNJoAZmcMXjdy1qw0mrMzxmctEZmdMXityFkDwGctZ9OVRpOInE3x+pCzBsBKowlgdsb4rOVsipfzWe7sNF4ZOWtwwWctEZmdMRjjsxyTfvnzny18fh+As9N4BeSswchKo0lEzqY+y3Fhce79WMVEKMqq4iqJE1L0n7WnABbv3ccFZ6fxcuSsWWk0Z2cMgJVGk4gA8n9b4ooH5SBfe8rCZVUJc5IkAEWKev3+8+93hJkhCrR47z4AZ6fxY8hZA2Cl0QQwO2N81gLo238sS8VlVcZxrOKo8d13AEWRAqisikQnRNTZ349i1ekckCIJvPD5fWencQk5a3DBZy0AzqY+y/3y44iiwCEETmo6BH662T48OgQoDDGDB72+TrSwaJ0EDr95/0NAnE0xiZw1mOSz/Nu//5VZwDIoivrVGjO3t7aqMpyenYYQWKQoSyISkVAFUnSu2+3O37rj7DQmkbMGY3yWf/XgT/WkFscxCMfHJ9emrrbW1jEkida7L/Z0nCiio+PjWMfMrJR60enoWM8tfAKIsynGkLMGY3yWP1l+JEGICAq9Xl/H8db2NkTKoiqrSmt9fHaSaH1yesYcYq13d38IHEjRx3fvAeJsijHkrMEYn+V++TERDfqDqWtTxycnSkXr7bZAdBTHOg5VCMzdo0OBMPPbU2+tbWwACMxRpH53+66z0xhDzhqM8Vnul5dYGEAVwpVaDUD72TMARVkCBICAsixfdA9+8tbbaxsbRFCkABHgxq07gDibYoScNRjjs/zJ8iNiCMmgLELJLGFnb0+C1Os1IsVVUEr1B/39wy6ROuh2BRKqgAs3bt8BxNkUI+SswRif5V8//AIgRagldSIwpLmaDwZFLUkgqF+5MhgM6kltdX3tvZ++11pdBSHRuihKimh+8VNAnE0xQs4aTPJZ/vXDBywMkUQnLIFIrbc3QxWiOIqUOuv1n+9sX3/nnampq3t7Lw66hxSRBKGI5hc/BcTZFCPkrMEkn+XfLP0FQK/Xj6PoSr0uwObWFoCyrETQfrb57vXrLHJt6mqne7C/fyCCc2Wofn/7LiDOphghZw0m+Sx/svSIFHSsT05PA3O9Vnu+/T0IVQiHR0fMXK/VROT0rAcCM3f29yMVEWFu4RYgzqYYIWcNLvFZ/s+lhzSEs15Px/FepwOiTme/rKqKQ0SqrpOT3hnLOa6q6vDoONF6buEWIM6mGCFnDS7xWf7N4wdEpHV8fHKq46Ssin+1WjpOQggsAQCBBoMBKRUpJYwoVgfd7ocffwKIsylGyFmDS3yW++WliisASql8dU1FikiFUBVFIQIWJlBRFEEYDBWpKFI7uz/cuH0HEGdTjJCzBpf4LP/yz3+s1+rM4d/5qo41C3NgkOAcQalIgmzv7tAQAg/NLSwCChBnU4yQswY/xmc5gM8+uiEi9bgmEFIUWEQCQOfWN9qJ1oOyEEEUKRH54KNFQJxNMYacNXgJn7UAwoXPbs4LQExKKYqpvfmMQFUIStG5395cwJA4m2ISOWvwP/mshSHChT/cnCfQL371a0wQAM6muIScNXg1PmthiDAkGONsipcgZw3+Tz5rOZvi1ZCzBm8SOWvwJpGzBm/SfwHQn9yfO46BTwAAAABJRU5ErkJggg=="},{"name":"Uncut diamond","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAEwUlEQVRIDbXBzW8bRRgH4N87O7N2m1IuVFzgmt1/YK7zzyDBFQkJcS4QKYVCQr8oVa8gKG1DAAkkBNWKEytxQ5ANaeI0TZOmTpxPe3dn3pc4kiVbaVF7yPOQsylOEjmb4iSRsylOEjmb4iSRsyleRJYXzo7juZGzKZ4tywuMevvNN6a+uAnA2XE8B3I2xTFZXuDI9MR5rTQRqtp79rGOSdG/C/cBTN+4iSPOjuPZyNkUo7K8yL6fYc9lXRYL91m49l6Y4zgGKFLU7fUePloTZoYo0PSNmwCcHcfTkLMpRmV58fuPs+K59rXWWunojz//BCiKFEC1r2ITE1F7czPSqt3eIkUSeOqLm86O4xhyNsWoLC+y2bsRRYFDCBw3TAh8f7m1vbMNUOhjBpfdnomNsBgTBw7vnf8QEGcTjCJnU4zK8uL3H75jFrCUVdU83WDm1sqKr8P+wX4IgUWquiYiEQk+kKJDnU5n8tJVZ8cxipxNMSTLi59vfdWMG1prEHZ3986MnZ5bWESfxMasP9kwOlZEO7u72mhmVko9abeNNhNTnwHibIIh5GyKIVle3Ju9I0GICArdbs9ovbK6CpG68rX3xpjdg73YmL39A+agjVlffxw4kKJPr90AxNkEQ8jZFEOyvMhm7xJR2SvHzozt7u0pFS22WgIxkdZGBx8Cc2dnWyDMfHbspYWlJQCBOYrUR5evOTuOIeRsiiFZXmSzMywMwIdwqtEA0HrwAEBV1wABIKCu6yedrZdfOruwtEQERQoQAS5cugqIswkGyNkUQ7K8uDd7hxhCUtZVqJklrG1sSJBms0Gk2AelVK/sbW53iNRWpyOQ4AOOXLh8FRBnEwyQsymGZHnxy+1vAFKERtwkAkP+mS/KsmrEMQTNU6fKsmzGjfnFhddfe31ufh6E2JiqqimiyekrgDibYICcTTEqy4tfbt9iYYjEJmYJRGqxtRx8iHQUKXXQ7T1cWz33yitjY6c3Np5sdbYpIglCEU1OXwHE2QQD5GyKUVle/DrzLYBut6ej6FSzKcDyygqAuvYiaD1YfvXcORY5M3a63dna3NwSwaE6+I8vXwPE2QQD5GyKUVle3Ju5QwpGm739/cDcbDQerj4CwYewvbPDzM1GQ0T2D7ogMHN7czNSEREmpi4B4myCAXI2xTFZXvw2c5v6cNDtGq032m0QtdubtfeeQ0SqaeK97gHLIfbeb+/sxsZMTF0CxNkEA+RsimOyvPj17i0iMkbv7u0bHde++mtuzug4hMASABCoLEtSKlJKGJFWW53Oh59+BoizCQbI2RTHZHmRzc549gCUUsX8gooUkQrBV1UlAhYmUFVVQRgMFakoUmvrjy9cvgqIswkGyNkUx2R58dPXXzYbTebwdzFvtGFhDgwSHCIoFUmQ1fU16kPgvompaUAB4myCAXI2xdNkeQHg+icXRKSpGwIhRYFFJAB0aHGpFRtT1pUIokiJyAefTAPibIIh5GyKZ8jyOYBw5PrFSQGISSlFmlrLDwjkQ1CKDr1/cQp94myCUeRsiv+V5XPoIxz5/OIkgd56512MEADOJjiGnE3xfLJ8Dn2EPsEQZxM8Azmb4gVl+ZyzCZ4POZviJJGzKU4SOZviJP0HmOyyn7R0Z3MAAAAASUVORK5CYII="},{"name":"Uncut ruby","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAADnElEQVRIDbXBQW4b1wEA0Pc/STstUGLQO1QzF/hafm16iS58hxZ2lAN1261gOPBGs9RcgGQX3RRwYifurx3bikTOL0YQEQqKAxew3ws5db6kkFOH84sVTo47n1vIqTu/WJ0cd/2wrrWeHHc+q5BTh35Y59SeX6xCCDm1Pp+QU4fzixVOjrt+WOfU+rh+2OR05JOFnDo3+mFdaz057hzoh427/tyMz0tETkc+Qcips3d+sQoh5NT2w8aNvzRjIHLNjoXJK5PnJbqR05GPCzl15xerk+MO5xerEALhtFlWtsp3JtcmC5PAFW8YufpT9+Cfq+clIqcjvybk1OH8YoWT464f1oRvmmVlx4zAvxTMTK5ZmLwj8hORkecl5nTknpBT50Y/rJFT2w+b02Y5Y8fIjMor5dJkx2iyJZjMTP5RIjWn1l0hp85d/bD5pllWk60y1+AHpXLJSGVHoLIjmFzytMScjtwVcuoc6IfN35pxrpkz8rPyQPNScWNOYWHygTmVwFvmnJVIzal1IOTUOdAPm6+bZSWYXCszXptsqUQumfMzIzPeMBL5tkRqTq0DIafOgX7YnDZLbJWvNJdK0LxUMGfGjsp7RpPf8dKkEnhWYk5HDoScOgf6YXPaLKvJyJzIDwq2bgW2vOP3fE8gmow8K5GaU2sv5NQ50A+br5tlYGSnVHa8ZcdDAjsiV7w3+cDI6NazEqk5tfZCTp0D/bB53Iw0eGAy8kLZMjd5yDULvuePvDCZsyXytERqTq29kFPnrn7YPG7GajLTjAR+VHbMTLa8ZslD/st7IiORpyVSc2rthZw6d/XD5kmzrGyVyEKD1wp2VH7kD1S+4i3v3Bp5ViI1p9ZeyKlzVz9snjTLyIxLpTLXFCWw5ZKRhcmlW+9MImclUnNq7YWcOvf0w+ZJswwErpQZbwj8xI4dkTlXVEYq71lwViI1p9ZeyKlzTz9sHjfLQORKmWl2yr9ZsGM0iVybzNz6wFmJ1JxaeyGnzj39sDltlqNJ4DslENmxo7p17ReRtzwtkZpTay/k1LmnHzZ/bcaFZuSFMjOpJiORQOU/RJPR5KwgUnNq7YWcOr+mHzZ41IyYu1UZTSKvWHDtF2clUnNqHQg5dT6iH9YENx41o70Zr4iMbp2VaFJzat0Vcur8pn5YmwQ3HjUj/l6iOypyat0Tcup8mn5YmwST6kBOrY8IOXX+T/2wzqn1aUJOnS8p5NT5kkJOnS/pf/PqgpAvDcS/AAAAAElFTkSuQmCC"},{"name":"Uncut ruby","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAADSElEQVRIDbXBsW4cxwEA0Ddzd5IdIIdF/iG8/YFpp/JPpNA/JJBMf1DatISgQNW2+wPWpkhjQLZkKxPJkmjydicYggffgVYgF3wv5NS7TyGn3n0KOfXuU8ipd59CTr3fYxinnM58tpBT79OGcXLqq255XiJyOvMZQk69O4ZxcuMv3RKIXDOz0bzWPC/RjZzOfFrIqXdqGKfzblvZK99rrjUbTeCKtyxc/bl/8K9vn5eInM78lpBT79QwTt9028rMisC/Faw012w074n8TGTheYk5nbkj5NQ7NYzTebddMbOwovJaudTMLJo9QbPS/KNEak47p0JOvVPDOH3Tbatmr6x1+FGpXLJQmQlUZoLmkqcl5nTmVMipd2QYp791y1q3ZuEX5YHuleLGmsJG85E1lcA71lyUSM1p50jIqXdkGKevu20laK6VFW80eyqRS9b8wsKKtyxE/lkiNaedIyGn3pFhnM67LfbKF7pLJeheKVizYqbygUXzJa80lcCzEnM6cyTk1DsyjNN5t62ahTWRHxXs3Qrsec8f+IFA1Cw8K5Ga085ByKl3ZBinr7ttYGFWKjPvmHlIYCZyxQfNRxYWt56VSM1p5yDk1DsyjNPjbqHDA83CS2XPWvOQazb8wJ94qVmzJ/K0RGpOOwchp96pYZwed0vVrHQLgZ+UmZVmzxu2POS/fCCyEHlaIjWnnYOQU+/UME5Pum1lr0Q2OrxRMFP5iT9S+YJ3vHdr4VmJ1Jx2DkJOvVPDOD3ptpEVl0plrStKYM8lCxvNpVvvNZGLEqk57RyEnHp3DOP0pNsGAlfKircEfmZmJrLmispC5QMbLkqk5rRzEHLq3TGM0+NuG4hcKSvdrHzHhplFE7nWrNz6yEWJ1Jx2DkJOvTuGcTrvtosm8L0SiMzMVLeu/SryjqclUnPaOQg59e4Yxumv3bLRLbxUVpqqWYgEKv8hahbNRUGk5rRzEHLq/ZZhnPCoW7B2q7JoIq/ZcO1XFyVSc9o5EnLqfcIwviC48ahbHKx4TWRx66JETc1p51TIqfd/DeMLTXDjUbfg7yU6UZHTzh0hp97nGcYXmqCpjuS08wkhp97vNIwvctr5PCGn3n0KOfXuU8ipd5/+B7w3WJCcBwGbAAAAAElFTkSuQmCC"},{"name":"Uncut onyx","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAACwklEQVRIDbXBMW/jRhCA0W9Nyro0h2lSJIULAha3Sjft/HhWAfYXmECaFAcEbAbOBbLMlTegQUGkZB98hd8LppHPFEwjnymYRj5TMI18pmAa+Rld6k13fFgwjbyvSz2XvsIjYLrjA4Jp5EqXel6J/M4V9+9MHnlluuN9wTSy1qVe5B6OTJ54i/t3zh4B0x1vCaaRtS71IvdMjkwq+I8r7qMI7gdmj6Y7rgTTyFqXepEGKjgyqeAIGTIL7qPIBkbYAO7foJi2rAXTyFqXepF7ODKr4AiZSebSCBvAfYTBdMdaMI0sdKkXaZhUTI5QwYGzzGyEDa/cRyYDFNOWhWAaWehSL9JwKTPLUENmNsLGfYQDk0copi0LwTSy0KVepIEKjlDBkUnmUmZWu+85G0x3LATTyEKXepGGs4rJgTdkqN33rAxQTFtOgmlkoUu9SMNK5m0ZcB9ZGaCYtpwE08hCl3qRhlnF7AAZahbc9yK/uO9ZGaCYtpwE08hal3qRhkuZBfe9yAZqyO4jZwMU05aTYBpZ61Iv0nApc+K+F9kwqSG7j5wNUExbToJpZK1LvUjDpIIjs8wsM6khc+I+MhugmLacBNPIlS71Ig0rmUnmbaM7rwYopi0nwTRypUu9SMOkgiOzJ37IfYQBimnLSTCNXOlSL9JwljnLvMN9hAGKactJMI1c6VIv0jB7gppJ5qwG3Pes/AM3UExbToJp5C1d6gGRO97hvufSAMW0ZSGYRt7RpQcIvBK5Y8F9z8rApJi2rAXTyA916YFJ4JXIHeD+NysFMG25EkwjH9OlByaBSWHBtOUdwTTyk7r0YNryMcE08pmCaeQzhfrrrzf1zfZ2exgzhboKN/XmJY/VZlvd8Mdvt3/+9e/2tnp5KcfDIZcC3H7Z3lT1Sx5f8hiq+vl53G63BCiT8XkspWy/bJ8Pz6WU/wGbEi8Z8shqswAAAABJRU5ErkJggg=="},{"name":"Starved ancient effigy","base64":"data:image/png;base64,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"},{"name":"Loop half of a key","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAACxElEQVRIDbXBTYscRRgH8P9T063ubDCbmXhUCchWfYHn+nyEPQVEEYRFLxHZGY0vI0FcVhQxMfGgoh4UDQa9CBtEzLGudRMUUp8gvhG3dybb3TNd5fRi2IjupifSvx8JG7SJhA3+H+s87iC8ijuQsMG9ss4DWFs7rRT1Tj403s12suyH77eFV3EbCRvcE+v84088nSZz6fLysRO93mQ8uXnzj99+/+W7q98Kr2IfCRsszjr/zLPPA6EoyiLfe/iRUw8eP16Wxa83bownu1e++hyIwhoACRsszjq/vn5mPMl2suz+9L7t7W8A9eRT6wAU6PLlTwElvAqAhA0WZJ1fWzu90uvne5OyKMbjcSdN+/2T3aUlok62u/P1lc8ABURhTcIGi7DObwxendbKIs/zosiLW8vdY0vd7tID3Vk1+/ij91BTQBTWJGywCOv8Cy+eCyFUIcymRT63d2symTx66rFQzbLszy+/+ARQQBTWAEjYYBHW+cHwNSIKoZojhY5Kfv7px2vXruKAAqKwBkDCBo1Z5wfDUaeThFo11+v1i7J85+1zgMKBKKyxj4QNmrHOD4ajJEljjCGE6bQ80etvbb585rmzH35wHlBAxD5hjdtI2KAB6/xgOOokqSIKIZTTcmVlZWvzFdQUalFY419I2OBurPMbw1HSSZM0CVVVlsX7l97C3xQQAQhr/BcSNjiSdX5jMErm0hRAkeeXLr6JmkItCmscjoQNDmedP/vS6wA6SaKUyvO9ixe2UFNABCCscSQSNjicdf6NzXdn1bSaVWVZXji/iZoCorBGAyRscDjrPBDwDwqIwhrNkLDBkazzQMABBURhjWZI2OBurPOoBdQUEIU1miFhgwasuw4QalFYozESNmjMuuvCGosgYYM2kbBBm0jYoE0kbNAmEjZoEwkbtImEDdpEwgZtImGDNpGwQZv+AqztLJD72YmsAAAAAElFTkSuQmCC"},{"name":"Loop half of a key","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAACtUlEQVRIDbXBwWsUVxwH8O/vzVtiYkrc3fYqSGnm/QO/6+9vyKG9CNKD4qVScDBCE0q3pJ6S6kUEKYigCD0pzUG8vuu79OLB9xcEpJLuJJuZ2Zl57SxKLG3irGU+HxI26BIJG/w/1nm8R3gV7yFhg49lnQewtvYlUTQcfpqm6Xi8//z5b8KreIeEDT6Kdf7ixa+17mndO3t2eTAYHh4evHnzx+vXe7u7T4VXMUPCBvOzzl+9+i0QiiI7Ojo6f/7zlZWVosj29vYmk4PHjx8AQTgGQMIG87POX7nyTZqm4/H+wsLCs2e/AurSpcuYefToF0AJrwIgYYM5WefX1r7q94eTyaQo8sPDcRT1hsPPlpaWiFSa/vnkyQNAAUE4JmGDeVjnr1//btoo8sbR35aXP1lcXDxzZqmqynv3fkZDAUE4JmGDeVjnb9z4vp6ZTvM8zyaNgwsXvijLMk33Hz68DyggCMcASNhgHtb5JNkkorpREZFS0cuXv794sYtjCgjCMQASNmjNOp8km1EU1W9Vg8GwKIpbtzYAhWNBOMYMCRu0Y51Pkk2tdQihruuynPb7g9Fo/dq19bt3twEFBMwIx3iHhA1asM4nyYbWPSJV19V0Wpw71x+N1tFQaAThGP9CwgYfYp1Pkg2te1rrqqqLIr9z5ye8pYAAQDjGfyFhg1NZ55NkI4p6vZ4GkGXZ7dtbaCg0gnCMk5Gwwcms8zdv/gBAa62UyrJsZ+dHNBQQAAjHOBUJG5zMOr+1tVOWZVVVeZ5vb4/QUEAQjtECCRuczDoP1PgHBQThGO2QsMGprPNAjWMKCMIx2iFhgw+xzqNRo6GAIByjHRI2aMG6VwChEYRjtEbCBq1Z90o4xjxI2KBLJGzQJRI26BIJG3SJhA26RMIGXSJhgy6RsEGXSNigSyRs0KW/ALKiLJDomaTbAAAAAElFTkSuQmCC"},{"name":"Tooth half of a key","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAACmklEQVRIDbXBwUsUURwH8O/vubuEeLGDEQQdhJ13Egp+p+D3t0SwSYFpBzWEkhCiIqigQ0LUzZMHiS5RiD28yCPQg4JDJEgl6Kqt68w4466vZkkKyhqD+XxIWCNPJKyRJxLWyBMJa+SJhDXyRMIaeSJhjTyRsEaeSFgjTySskScS1vgrY30cEi7jmEhY42jG+gMDN4Ig2NnZXlv7ZMyMcBnHQcIaRzPWHx6+HcdRo7G/kVqbnn4jXEZmJKzxJ8b6ACqVPiIAVCwWiNTWVnVzs/r69SvhMrIhYY3fGOtfvFhpNJpoIaJisVQoFNvb22u1ry9ePAWcsIcMSFjjF8b6AC5dugKgVtsulUpJkgCuVDrR2Xny1KnTX758Hh9/CCjhMjIgYY1DxvqXL18DHADnUK2ud3R0NJtN5w6I1MTEcwC9vQPj44+QUsJl/AsJa7QY61+9et05h5ZGo1mtrnd3l6MoSJJ955rPnj1BSgEHgAKcsId/IWENwFi/UumjFqXoO+dckKpvb28yX4jjvTAMlpYWZmcNUk7YQwYkrAEY6w8O3oqiMAyDIKjv7tZ7es5H0V4YBvV67cyZs4VCm1Jti4vzU1OTgBP2kA0JawDG+mNjD+I4jlJhGAa12teennNhGK6sfJicnADQ3z+8sPB+ZuYt4IQ9ZEPCGi3G+qOjd5VSSRJHURQEuzs7ta6urseP7yGlkDpASgmXkQ0Jaxwy1gdw8+YdpVSSxPV6fXX148uXk0gpwAGElBP2kA0Ja/zC2GWARkbGlFIbG+tzc+/m5+eRcsIeAGOXhT1kRsIavzHWHxoavX9/FD8owAl7OD4S1vgTY3385IQ9/BcS1jiCsctoEfbwv0hYI08krJEnEtbIEwlr5ImENfL0DSzpLpAdxBUJAAAAAElFTkSuQmCC"},{"name":"Crystal key","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAADRklEQVRIDbXBT2tUVxjA4d/JYHQSU0JcKQguytyz6UpeKAgv9Iuc3f0AWchANJJiI3SVTUspV4IcaqkwCyktorg6OznYiC6kpzXNnzHpJMRNMdA0yW29GJi0SZlMyPMYFctJMiqWYwsx0UWlwR6jYjmeEJNzOV28L1QaVIyK5RhCTM7lwODg4MjIB8PDZ5eWFgDvC5UGYFQs/QoxOZcDGxtrly59ODx8tl6vGzMwP/8L4H2h0jAqln6FmJzLgc3NzVbrLpWpqc/n538FvC+gNCqWfoWYnMsB7wsoec84lwPeF1AaFUtfQkzO5ezxvqDiXE7F+wJKo2I5uhCTczmHKMtybe33hw9/gNKoWI4ixAQ4l9OlXh+q1Qb+YczA1tbWxsZ6q/UtlCqZUbH0LMTkXM5+Z87UT58+XavVtre3d3d3Njc379z5GkqVDDAqlh6EmADncrpsb/81NDR8+/aX/FupklExKpbDhZhUGiEm53K6dDqrY2Pn6vWh2dmvoGQ/lYw9RsVyiBCTc7n3hXM5XTqd1dHR0Xv3vuGdUiXjcEbFcpAQ08TEzXZ7iS5zc08uXLg4MjLaat2FElDJ+F9GxXKQEJNzOV3m5p6cP3/x0aMfeadUyeiBUbHsF2ICnMvZb2Wl/fjxAygBlYzeGBVLlxCTczldVlbaly9//OpVarXuQqmScRRGxbInxORczkG8L6BUyTgio2KBEBPgXM6ely9fXLnySa1WW1/vUPG+UGlwREbFhpicy+kyNnbuzZsN74vr16d3dnZev16m4n2h0uAojIoNMV29eqPTWaXy9u0f1n60tfVnp7PqfQFMTk4vLi5Q8b5QadAzo2KBEFOz+enqapuK98Xk5PTubrm8vOh9ATSbU6dOnXr69MmDB99DqZLRG6NiqYSYrl37bHl5kYr3RbM5NTg4eP/+dy9ePAfGxydmZm5BqZLRM6Ni2RNiunHj1sLCb1S8L8bHJ2ZmbkHJOwZKlYyjMCqWLiGmycnpxcUFKt4XUKpk9MuoWPYLMU1M3Gy3l4Dnz3969uypSoN+GRXLf4SYms2p9fW12dkvYABKlYy+GBXLQUJMvFeqZPTLqFgOEeLPgErGMRgVy0kyKpaT9DdAmm4o6h1xiwAAAABJRU5ErkJggg=="},{"name":"Crystal key","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAADR0lEQVRIDbXBT2tUVxjA4d+ZSDRjtFXbXXAjzD0uunxdFHw3/SRnd79ANiZEJsS2JFCQLnrNwlPECgNCaUXE7VkJJ0qtIHj8l2RMnMbgpo1UO+a2DgYmbVJmJvg8RsXyIRkVy56FmOiiUmOLUbHsTYjJuZwu3hcqNTqMimUPQkzO5cDw8PChQx+Njo4uLT0FvC9UaoBRsQwqxORcDqyvr504UTt4cPTAgQOVytCjRw8A7wuVmlGxDCrE5FwOvHr1qtG4RMfMzDePHyfA+wJKo2IZVIjJuRzwvoCS94xzOeB9AaVRsQwkxORczhbvCzqcy+nwvoDSqFj6F2JyLmd3a2vPr1//CUqjYulHiAlwLqdLtVqtVIb+UalUXr/+c319rdG4DKVKZlQsPQsxOZez3cjIyP79I5VKZXPzbbvd3tj44+LF76BUyQCjYulBiAlwLqdLu/1XtTp64cJ5/q1UyegwKpbdhZhUaiEm53K6tFqrx459Wq1W5+e/hZLtVDK2GBXLLkJMzuXeF87ldGm1Vo8cOXrlyve8U6pk7M6oWHYSYpqa+rLZXKbLwsKtsbHjhw9/3GhcghJQyfhfRsWykxCTczldFhZujY0dv3HjZ94pVTJ6YFQs24WYAOdytltdbd68eR1KQCWjN0bF0iXE5FxOl5WV5qlTnz98+KDRuASlSkY/jIplS4jJuZydeF9AqZLRJ6NigRAT4FzOlvv3fz19+ouhoaG1tRYd3hcqNfpkVGyIybmcLkePfvLy5br3Rb0+2263nz1bpsP7QqVGP4yKDTGdOTP9/PkqHRsbv588+dmbN29arVXvC6Ben11cfEKH94VKjZ4ZFQuEmCYnz62sNOnwvqjXZzc33y4vL3lfAJOT5/bt23f79q1r136EUiWjN0bF0hFiOnv26+XlRTq8LyYmZoaH91+9+sO9e78A4+NTc3PTUKpk9MyoWLaEmKan554+fUyH98X4+NTc3DSUvGOgVMnoh1GxdAkx1euzi4tP6PC+gFIlY1BGxbJdiGlq6qtmcwm4e/f2nTtRpcagjIrlP0JMExMzL178Nj9/HipQqmQMxKhYdhJi4r1SJWNQRsWyixAfACoZe2BULB+SUbF8SH8DD6BrKOr2ysoAAAAASUVORK5CYII="},{"name":"Sinister key","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAADI0lEQVRIDbXBMWsbSRiA4Xe8KynOxeAUF8geqHChb0oj+Nr58dNO48owExUmmAWjK8Se1pKsXc8RXQzynX3IMnke49TyKxmnlnfzIbHH6YQnxqnlfXxIIhV7YqydTtgxTi3v4EMSqYCiYDgsBwOapgNirJ1OAOPUciwfkkgFbDbbs7PBYFAWRXlywmKxBmKsnU6MU8uxfEgiFdD329lszo7qRdOsgRhryMap5Vg+JJEKiLGGzE9GpAJirCEbp5aj+JBEKp7EWLMjUrETYw3ZOLW8nQ9JpOJ1m83y5qaBbJxa3sKHBIhU7BkO+UdRlH3frVbb2WwO2akYp5aD+ZBEKp4rCobDEuj7Dnh4IMYaslMBjFPLAXxIgEjFM9uiGFxf1/xbdirsGKeW1/mQnE58SCIVezab5Wg0KorB9XUNmeecCk+MU8srfEgiVYy1SMWezWZZlqPZbM4P2anwOuPU8hIf0nQ6btuOPXd3y/NzynI0m80hA06F/2WcWl7iQxKp2HN3t/z0idvbhh+yU+EAxqnlOR8SIFLxXNsub28byIBT4TDGqWWPD0mkYk/bLr98OW+a1Ww2h+xUeAvj1PLEhyRS8ZIYa8hOhTcyTi3gQwJEKp4sFsuvX8+B1apjJ8ba6YQ3Mk6tD0mkYs/pabladTHWqhd937Vtx06MtdMJb2GcWh/SdDpu246dvt9+/nza97RtF2MNqF40zZqdGGunEw5mnFrAhzSdjtu2YyfGWvUCuqbpYqyB6XRcFOV8/tfNzRyyU+Ewxqllx4ekOm6ajp0Y6+l0XBTlt29/LhYNcHk5vrr6DtmpcDDj1PLEh6R60TRrdmKsLy/HV1ffIfODgexUeAvj1LLHh6R60TRrdmKsITsVjmWcWp7zIU2n47btgMVieXfXOJ1wLOPU8h8+pOl0vF5319e3cALZqXAU49TyEh8SP2WnwrGMU8srfIiAU+EdjFPLr2ROf/+j7/NjtwVMOShP2D5sh6Ph4PTs8eH+vr0HhqNh98iH3842q7Z/2OTtw3Aw7OBkMCTnfrsx5uSkHJSFAbo+f/z4Ief8cH9PWf4N3YqKxge14eQAAAAASUVORK5CYII="},{"name":"Dragon pickaxe","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAADkUlEQVRIDa3BUWjVVRzA8e/5GwxjXM6D8se8D0Jy/6cHIaJflrhfYkFQCBElRD0EUVBUGoxCLDC1SRrDWevBwCRyUEmILz4Gh+ihQ/QgYfdkpKnVVYvT3Wpejf8/NhxMcnN38/MxKo458CGqNOieUXHMyocIPG/L/SljGpUGc2BUHDPzIa6lvMdSwq09ZLAIxjv8DcMpA1QazMqoOGblQ2TSWsrHczsKl0mLoGTC9lYGqDSYgVFx3IgPTSYYYC3lQ7m9TPqoRZ/l3h77Yye9nzKVBtdjVBxz5kMTDLCacn3OgRYPWO7vtaevpIFWptLgf4yKo0s+NMEAr+Xlvx0OJfosfT12U6ut0uBaRsUxLz40waymvNtyOLHO0tdrXzrbVmkwjVFxzJcPcZMtv0usy9nXohdez+3LrbZKgylGxTFfPsRtebmtla2n1NzubaVe6M/t5lZbpcEko+KYLx9ivy3fTdmxz3bv2Nj/SG73tFIvDNbtxrNtlQZgVBzd8yECG2z5cK8du0J95+bFi3t2Pb3lwZy3WxlwZEXt0VNtlYZRcXTJh/hJvdYDPbdwapzTnTQG9w28ceDFneNwh+XjlHFVZVQc3fAhDua1MZLFtkntDmPwQcqYtIbysdz2t9rA8ZW1VSfbRsUxZz7Ewbw2SvqpQ4KjKeOqiqvMGsollqMpY0JlVBxz40MczGuJdLLDSMqYUDFJpWCKD/FOypWWwymDyqg45sCHuC+v/Uk60eHTlEEFqBRcjw9xFaVahlNmVByz8iEyaUdenugwkjKoVApm5UO8i/LJ3BoVx8x8iMdW1JrjXILfO+mbxNdkUKkU3IgPETAqjpn5EL86Nnz+uS3NK3zbSYdTBpVKwdz40DQqjpn5EId2vbJ82dK3ntl6u+VIyqBSKZgzo+KYgQ/xy6NDzZO/fP/Dz+/t/4IJlUpBN4yK43p8iMN7Xr1t2ZIz586f/fXC7qERqFQKumRUHNfyIQKfH9w+OvrPud/OvzlwgAmVSkH3jIpjGh/ih3v7y6oqq+rCxXTpUmdg8BBUKgXzYlQc0/gQR+q1409sWL5s6cU/0rZ3DkKlUjBfRsUxjQ+xTvlCbre22kyoVAoWwKg4pvgQ65TA5tye6aShlEGlUrAARsUBPkSgTgk8m/NXh70pg0qlYGGMivMh1imZ9JSlBQdTBpVKwYIZFQf4ELlGpVJwMxgVxyQfmkxRKbhJ/gPbWYZ0BN+gxAAAAABJRU5ErkJggg=="},{"name":"Dragon hatchet","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAEG0lEQVRIDbXBW4hVVRjA8f/aOU0XPSyi2Ek+GMjZ+yEhHz6IiK/LWxT0UBD5UhT5ENIFfAkzIbKiCyVoF81LKpZGKeaTD0GLLGSBhgnVikpiKnbX1Zg6Z87MWs2cEp0cy8v0+xmVmnPgfOAET5Tp8aZQaXOMUak5c84Hel4qW10YIW5vuLVkSVPQo9Kmx6jUnAnnA/BM2cpwEQxDlzgMF2NHYAYYMPBAM6jSBoxKzWlzPjxXtkYhwSjxAmyX2IWXGx4sKbAz+/iLgbsHBlXaRqXmNDgfgCfKlOB8GIFVDV3+6elZ1oBh3D0Dg5CNSs1/cT48VaYRSDAK6xrGdDmuA/3QUDBBVqmMSs2/cj48VaYRGIU1DWO68Opsu/Jg7LOkSIZdFIzLnEClAoxKzak5HxaXqR9GYU3DmLWz7SsxjsIFcON0m7rs6cQh2BoLyCoVExmVmlNwPiwp0zD0w9qGMTvm2CU/x/um291/xKMwDENgYGMsIKtUnMSo1EzG+bC0TF3Y0DCmC30wB6bB1ZYjcBTOg8PwZiwgq1RMxqjUTMb58GiZOh22Rrpwi6UPyn4+bJgGCa4p+aPDmJdiAVmlYjJGpeYkzoeHbTKwOXKTJcLhyBzL2lgAN9vUB/P66cP+1InLYwFZpWIyRqVmIufDIpsOw7uRay3bYsFxGcwCmyJcP93uGIiH4CMKyCoVkzEqNRM5Hxba9HbkOss7sYDMBOZem36HHyJXWVbFArJKxSkYlZqJnA/zbSpgUywgq1T0OB+ARTbN6bfbOjFGOjDPsi4WKm1OwajUTOR8uN2mC2FTLCCrVIDz4a3Xlx4Z6gwd7Rxc9sKMfruziXso5pLmWjbHQqXNZIxKzQmcD/Ntum26vXNgELJKBTgfPt71Shw8vMcfODI03H1j0yF4PRaQwcy3aXMsIKtUnMSo1EzkfGBcVqkA58NrLy66Yualbvcn8dARu337s7FgXGacWT2rdf/AIGSVipMYlZoTOB9U2s5/oVIBzoe9H6zZtz/s2x9WrN7G3zKgUtHjfICsUjEZo1JzjPPhyTI91hQqbcD54N9f9cmnXzY//vrYsjWQ6VGpOG1GpeYY58PSMl2CfagZpGf9ykcPfPb18yu2QFapOHNGpabH+fBC2fqFeBm2D668kAR777pj4LsfV2/YCVml4swZlRpwPrw2q/Vbl5878fJ++3knvhcZc4NlSywgq1ScFaNSA86HlWXrN+JXHbZFIgXHZZWKs2VUasD5sLxsfdOJ6yORAjLHqFScA6NSA86HxWX6vsO6WEBWqZgiRqUGnA+P2PQ7dGFjLFTaTBGjUgPOh4U2fQs7YgFZpWKKGJUacD4ssGlVLCCrVEwdo1IDzodlZWtxMwhZpWLqGJWaHucDZJWKKWVUav5PfwKlAtr2IhBCUwAAAABJRU5ErkJggg=="},{"name":"Dragonstone helm","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAFIElEQVRIDbXBe2xTVRwH8O+57d2ySWcn4HQSFaO9RzTE18/Hgr+YGIRpiIkPjI8Rg2KCM8SA+gfERzRooi7GaEREiArxQWZQFlDURDwOzDxIjEiVM8jqmKNd69r1th1rt16lccnIVqh/+PkIJon/QmnDFEKJ0oYphFMSTBIVU9q0t/TctXk2U0hps3Hxvoe2XsMUQnmCSaIySpv2lp5IKvxEx20ANi7eF452talWwGNyUIZgkqiM0qa9pSeSCtfXNAAIR7sAtKlWwGNyUIZgkqiA0qa9pSeSCgO4rKEpHPsBQP9QT5tqBTwmB2UIJonTUdq0t/QAiKTCAI65kcbAbACrOm4FPCYH5QkmiVNS2uxcmgAQjneh5JgbaQzM/u7INgDbwxuYQihPMEmcjtJm59LE0aFulJi/9quLv48f7o3s3gt4AJgclCGYJE5HabNzaeLoUPdn13UUsrnjmexI2j0+OOTGBiKdPwFgCqEMwSRxSkqbzh3b0582vU3rR1JuIZvLZ7I3jFb1/tkfi8dvyC2P+Y5s0s8xhTAVwSRRntJGf/3lq4nD+dzwaG44nx1eUKh23cyf0ehQOh0fHIzGYuFD3YAHgMlR2gBgCmGcYJIoQ2nz2LxXm1vPnXZGbS6XczPZITedSqf7+49lcrkh1x38RzK5/8BBjHvzph/zgcGVHQuZQigRTBJlKG2W8Mq6YuP8R2ZkcrlMNutmMul02s1kvt11AEBm2D3/koE7/DtQkg8MAljZsRDwmByUCCaJqSht6OEHLzVn1RUbo0N/oCQx9kdxbAwl/alI043JXd8gluprm6ei/t/ODcxe2bEQ8JgcjBNMElNR2tCypZceCgLoTRzGuOLY2IJbjsST+UT8uGXBb/l37IksuWL9K7uX4wSPycEEgkliKkobz3sA8WzLHRckMwPZfAbAPXdG3Gz+rR+Do4UxoAhYt5wd29QRASzAA8Dk4GSCSWIqShs0zAzW1FTX1v764QV/DRb2dCZe6pyB0eKimb35/OjnfWfB8i08O97+faT1ko/X6vsAMIVwMsEkMYnSZplq33D38mCgprqqFlU+27Lh88ECbNtv+YFi2/0jq7fXP7sg+dRafe95H3Slt8np177TtYYphAkEk8RUlDZomBkMBKprquCrsi0LPsCy/bYPfv+7y0ZXfHLmI1f2vfk2EiMHnr5coeRQYc87XWsAMIVQIpgkJlHaAEU0NDQEg6iqgu2zAfgsWLbftuG3auvPfPy6oy+/NjYtcPTnw2lM0DZvN4BVnTcxhQAIJolJlDZAMTirobpuOqp8gA+AbduwLb9lN14tH71o/3MvFgA4zsDBX6Y3z1mybu9qnMRjcgAIJolJlDZAMThrVnV9HXy+2M8HMe6rLdcDeHSVC8BxBpLpkZvtDZu7n22eswQl6/auBjwmByWCSWISpQ1QDF54YSrSixM8/Et8+0nTilUFAMOFHF2V/OiHDFJpnMRjcjBOMElMorRBsA6pNOABYHJQorR5b+0VbetslIyhGO77CfAwAZODCQSTxFSUNoDH5GACpc3G5+e+sWlafnTk1tuS0YHjW7b1Ax6TgzIEk0TFlDbrnp67fvO0+c3RHR31sy7q/UrFAY/JQRmCSaIyShu1tWnFU5jfHP36i3MW3R5/4fVuwGNyUJ5gkqiM0mbn+9dH+tzEYP6Ztm6c4DE5OCXBJFEZpc3aJ+WaV37HCR4AJgenI5gkKqa0ATwATA4qI5gk/k+CSeL/9Ddw31OflLpqQgAAAABJRU5ErkJggg=="},{"name":"Dragonstone hauberk","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAHfklEQVRIDbXBe1BVdQIH8O+5PC/gvVfG9YHG+MB7zqArpf4kDX9rZqIRtL4rbVVKU1xm949tM3W0caesTBNjMysfmazhCrK26OCwrPOrTPspgiDE4S4vEYWLeuFe4D7OOb9d7+Qsjuu0M42fj0SJgodJokTB/4dxlRI7ghhXAVBix0+RKFHwUxhXAYywGa0uE4JsMOYvGbk/vwUAJXY8mESJgv+FcRV3zdyUHRoV6Wl3rRnFr3d4w0JDTBI+uTwyMiYi4Neq8k8giBI77iNRouA+jKs5iw+du1ExYerJwpuTrMN/YQoPgxCedheAgM8f6O2NiI4wdB0Q6dbyzTvqtv364zeKsiix414SJQruw7ias/jQ4fKPACzKcJ22PmMKMUEIA1hoHrKv7nKExWxoOjRdF/ps/XxxieWaq2VGXHZ+zWZK7OhHokTBvRhX0yZmLB526CvHzmb99Avz3CctcyAAiKXWR25csdY0Xbo62TACuqFrns6uJbFV/gt7tNGXD5x4t9XVBghKZNwlUaLgXoyr+e9PyvnU/FTyotNn85c/77GOWLO76mKqOwlBt3tuAugz11dGSs/Hjw3c/rLgqwFzpi27Fdhx7JTW7mqjxI67JEoU9MO4ujV913fXSl9c1Jq7L+rlpZ7DPdNnnHuu5NF8CKS6k6Jbpl28fmLEzPZvpQB0Xa4fkZhUMCAq5GB+1JPTb35+3Dt99Kxj5YcosSNIokTBXYyrR7Z803DpUomjIHOpa8+BqHWZvUbMioajiaWP5s/zzAcQae2tdJwfE5sSnXilp7e39lvUjmlePvhSV7dedGqA092+YMaaHfkbAEGJDECiREE/jKvzkhfedHdue0uTJPxH8/5/NA3NKwo5uzR+VE/jsFD/kA5fNQBmUZeNHH1LHdgVWfnLhPMmE0wm7P4w7PGktA8L3gQEJTIAiRIF/TCu1pTNALD6ZBIMYfh8axPHt1ZGP/aUeevXbO6AGAvPbOqqGDynGkIUOTumlj/Jxp00NN0UGhLo82UlqT84PDn7GwBBiQxAokRBP4yrGdPiN6yL/2PlFK2vzxQWFm4ZYPh9Cy68arZ37Q/ZvzI8rd5bbB+T4K2d3FzRGTD6/m7dZ4kbFjnQmjXsrKZhxaYKQFAiI0iiREE/jKtzk+Nb21068KfVY99rnRzwe21xw7NHJ1w9nAIgT96xfsrjtfsUAMflTwNer6ejwxIX5/1nka5h2KAYw+9hNd2U2BEkUaKgH8bV2SSu2emBhrrW7uTfrjV8PrPNqvl9vbdc0O+AruvCWOZcf2Twe7rf7/f6HKdL05LjG9tdQ2NjTEagtMIJCEpkABIlCoIYVwEky5Zoc0xLp2fowIhvqpwAyKpMs82q+X3e2y7D0DfPSnU0Nh6sroRuhISG6X6/v7fHUXoGQOJIi65h5OCIknInICiRAUiUKAAYVwEDME1MsESZI1o7fE3t3YAAJLIq02yzan6ft6tr1bgJeXnvGzpcCVMhjJDQML/P63P3NJ1hAOYmxzdccw0ZFMMq2gBBiQxAokQBwLial95z+4mcvR+/4+5DrC2ivM4JCEAiqzLNNqvm93m7ui2XyzQjYOhIS385r7oKYaG61+tzu5vYWUAAUiqJC+hAIFBW5aTEDkCiREEQ4ypg2BISHtE6Q0JR4egGBCCRVZlmm8Vz8xaEYaks+1XU57Fp31+7du1vLc0hYaF+T4+jpBQQuENKJXFN1z1Tn0iNqX82t3w5JXaJEgVBjKt56T21YzcUFh6oaeoGBO6QZmx83fD7+m7fzprwmJyQUPJ2RGdvywXverd9CkJC/V1uR2kZICiRGVdTSVyKEl2gJ6b8MD+3fDkgJEoUAIyrubMdgxeXVdfWVH139PjZNkBQIjOuZqfHv/q70WX86ZLivS8sff16/tQG18Va0xYDaB8ybsHopqLi9pqmbkrsjKvbVigBTS80EhN9puGtL20/P1+iRAHAuJo721Hy7JFnvGHs5O4jZ9oAQYnMuJqREh8/EMuzP3lz62rDwOSEP1x1NrR0HtV0xIYFuntxw+2raeoGBCC9u1LxBfRCjH+6/qXt5+cDQqJEAcC4mjvbcSrtL1mDxxzZ+9rhM22AoERmXM1IiYcBARgmZCT99VzdPM3ArOga83NHd+3cGBOO6y5fVVM3ICiRGVff/o0ycPyKj77/uupYMSAkShQAjKsfzKye+HtHh9N5Im/LF2VtgKBEBsC4iqB/8fPvbFqk6ZpmIHXRxmVr1+G/BCUyAMbV7ZnKZ85R4VFhS66/tolNlyhRADCufjCzumDiZ/FVJ8J178HSNkBQIiOI8TrcIQFYOSsu7cWtCzNfAQTuokRGEONqzupxoWOWGYaR/cZGQEiUKAAYVzP+/NatRueoK8VfnKoHBCUy7sN4HSDhDkGJjPswru7JmjBoUvamwmN1xSWAkChRADCuNlzkLpdr186sQ8X1gKBExgMwXkeJjAdgXC05+mVjS8tAm23JK6slShQEMa7iR4ISGT8D4yp+JCRKFNzFeB0ASmT8bIzXAaBElihR8DBJlCh4mCRKFDxM/wZ4cLVHdDY6QwAAAABJRU5ErkJggg=="},{"name":"Dragonstone greaves","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAFGUlEQVRIDbXBfWyV1R0H8O9pvUibka6Bi7yoCerucxIiNrif3ZrymxgtMQSh09jE9yjQSGCBJf5B3LJpFuYfDolZMvdiZhbnVmMFcRN5UcuxvuAhDYaEeE+rXli59LaD3j695T7vZ7uNTSC02mr4fASTxHegtFnupHuyQ0wZTEYwSXwrShsALY2LghC506VcwWXK4BKCSWLmlDZb715aWxscrFkBm6zNPvZCdnV/wWXK4GKCSWKGlDa/bZdeEB/t9Udobdv8BdmjPoA93bv6Cy5TBhcQTBIzpLT5zQZZ9uOVa3f8+oP3kzgunjwZ/18QeceO9BdcpgwmCCaJmVDaPLRx/ZLwcE+vP9zYCmtXDF5b18+n6ve+4+mW2h/v7t7ZX3CZMhgnmCSmTWmz6Ylt7vBIqe+QH+FHt7YfHBv46acbRoOzCeJ/1v1u9eDDVdT11luvnMi5TBkAgkliepQ2G7f9DMBocWTs8/eafvLgv8ZGkcR3HL0HwNi1+vD3e8NyOfHD4JN9J/pcwDI5gkliGpQ267dsApAApRG3nFPE7QfGBpIkRmLjJEESJ4mFtStnzd739svH+1zAMjmCSWIalDaPbGqHTUZHRgF4pz7877JV1bNmIU7iJIFNtjbc/IcXnvbD8Ko67O0eAiyTA0AwSXwTpc2D7euttbC2NOLmeg4vXlAz/MM1YdlbVXd1Vex2q44kxqJ58AN0duUBy+RgnGCSmJrShimjtLlv/SM2sadzJ91isSqVqq6ufrytbU/nc2GEMIyiGNek4YfwgnBv9xBgmRyME0wSk1HaAOhYF7btSd370P1hFEVBMJA/E8dxzxHdyM3VVVXemb4ly1eUSqUwCJI47jr0Liosk4MJgkniEkqbB2jDy/rPW2/7xawrrrx+1eyOQwfOFYaO9RzDuMbmJgALFy/2fX92zZVBEPy78w3AAmBycAHBJHExpU3HurBtT2pL69KF87aNnCqMDS0+6D2TPfEZYFEhWtasnr9wQRj4QRBGfvBm527AMjm4hGCSuJjSZvPyl05vGoz+9vvNGxf1vL9x+x8fRYVFhbhz3V3z5qdLpZKNK958bTdgmRxMRjBJXEBpA+DOZ5+6Yu+LQRT5HubWorM7D1hUiDV3t9bPn1c8O+yVy1EUvbtvP2CZHExBMElMUNq8ctf5v6/cWb37T1/my+n61MBQ6UTOBSwAJkdp89Lzu9746KOzQwXfC450fwhYJgdTE0wSE5Q2z7T/9ePsr8pBVBgsxUAQIZtzAQsIAH/ZtbPn9TPD5XP/0C+iwjI5+FqCSWKC0qb1tus8LzpzthjHCDxk+13AAqK5Ib162VyveguAo//pvKn6jh37twOWycHXEkwS45Q2P793WW++mBsoAjje56LCAqK5IZ3EmDOnpuxFK296Msy7O/ZvByyTg28imCTGKW02ty7tLYzmB4vH+1zAokI0N6STGPV1NWU/8rwwP/f6XNfHgGVyMA2CSWKC0qalcdGBI3nAMjkAlDZNN6ZjYE5tyvPDkcwtraO3Pr3vCcAyOZgGwSRxAaUNYJkcAEqbphvTMVBXmzrvh+eW3LIq1fTcq08ClsnB9AgmickobbghHcUYLaP+e6nbl/8yNj94qvt2wDI5mDbBJHEJpU1by3VBAC+Kyuejrp48vmKZHMyEYJKYjNKm4Ya0c/Wcjq4vAItxTA5mSDBJTEFpgwrL5ODbEkwSU1M6y+TgOxBMEpeTYJK4nASTxOX0PwCpop+4c5ErAAAAAElFTkSuQmCC"},{"name":"Dragonstone gauntlets","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAEgUlEQVRIDbXBX2xTVRwH8O9p79p1Hd2UDaTMSjBrT7ZsIepPQjEnBCeIMDIMkmwgYkzgRR/0jYTog0ReNEQSjPqgMeqDBGMkoIkaQo5mcbmy7I9idgeDlG0MC6a07E97z7nHrLJkC4L1Tz8fJoijnJggjnJigjjKiQniKCcmiGMeaTuC4vj/MEEcc6TtHNjbePD9YRQJiuM/Y4I4iqTtrKfo87uW/PrzpDEYOJc51Z1GkaA4/i0miKNI2s6mZCxcaT3UEjjbnwXQ0hQ+25eZnsF3vWksJCiO0jBBHIC0nY3JWCiASDi4ZUvk0vBkT28WwCOrIj/1XXcVjIe8C6Wh3Hxeo+dcVlAcJWCCuLSdDaujVSErGLBqw4Gurnv7e28YYHAgV1DK1SgoBC1cyyEcdA3geTjxQxowAAMgKI47Y4K4tJ2tIhaqtMZ+y92/ZNHubUsuT0z1D2RcDVcrpVBwEQlbEzdQG1LGwFX47PQ4gGNvPnzPsoondv4IQFAcf4UJ4tJ2drStDAb9BVf7gH2d9y1uCLx1ZEwVdCigqkNW3lXGIJ216iNKaeSVOj/qRhdXdHYs9zPUNQS3vCAzGZ+gOG7DBHFpO89ubrw4llmxrNbV+pU9Ue3hw+PXlNaPrw0rjS+//d14qA5Z9TUouGp4XNXVYPtTy09/f/XJ9UsZ8y99INC2+UwGPkFxLMQEcQDSdjYlY3U1wYLW+/fGCq43k1eT096xr667Sk/nlatwQqYAHNrHh1JZANVVFoq2bowy4PV3UrJvFPAJimMeJogDkLbTsS62KBR0RjM9g2kU1cLb0dFUcPV0Xl++museTAPY2x4zQPuGpX6f3+fD5yfHAXQ93XD004mLE7nec2nACEpgDhPEUSRtJ9lSP1XIa43B89laeADWJldMu2pmxu0eTAM4/GLz8FgOBps3RE9+M46indtiyvMOvXvJqrD6hzOjV7OC4pjDBHHMkbZDTfWuzvcNZWvhrUk2aI2ZvCv70oAB2OGXmi9dyXkGf/I8GIOd22OexsH3UsEAMhkl+8YBIyiBIiaIY460nVp4ANYkG3ywXK2+6RnHLINZ7OjLzeFQxcCFrDHwPKUNnntmhdbea0dGrAqrwgKD9cWZEcAISqCICeKYR9pO+2Mx5oNWONWdAgxmMQBdbdGqqkiyOfDLyE3PwHhYFY80t0QM8Gin7BAxDzghU4ARlMAcJohjIWk7uMVgFmtP1kfrQjXVljHITAfWNlUOXMi2Phhpbo3AgDolYACGWUZQAvMwQRy3kfYQbmGdbdFliysr/IAPnof0Db9oDfmYr7k1cuSjKx9/PQwYQQkA0h4SlMBCTBDHXUnb2b9rJQAGKA9TeXWzEFzXEt7zRh9mGUEJ3BkTxHFX0nZWt9S3rVoE+JXWU3k1OYMPTqUAA0BQAnfFBHH8HWk7B3Y3MkB5empGvX08BRhBCZSACeIogbSdV/c0ukof+mQEMIISKA0TxFEaaTuYZQQlUDImiKNk0h4SlMA/wQRxlBMTxFFOTBBHOTFBHOXEBHGU0x8HKgefqPtlsAAAAABJRU5ErkJggg=="},{"name":"Dragonstone boots","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAFbklEQVRIDbXBX4hc1R0H8O+d2c0mu85mqjPuZt2WMdh7bw3CsuXXSLv8kGmxWNtCQRRffGhj1+hDFVqp27AEH1po33wrBRUJ/bPavBRJY4OEg4TKkXXTxcQ5HdNtnGSdP7ubvfN/7j3ndDsyNNNJCqbs5+Mw+fg/CKnQxeTiRhwmH7dKSJWZGE8ksGM1HwBgctHPYfJxq4RUmYnxRAKfaraQLwRMLq7jMPnoJ6QCwOTifxJSJWGSE0kAiQSaLcSHkFsLAMvkocdh8nEdIVVmejyxF6v5AACTi5sQUj0wOwVgZbmQmk4CiAO5QgBYJg89DpOPHiFVZnocQGIvPrWaD5hc3IiQ6oHZKXStLBe8+ybiGuculAHL5KHHYfLRI6TKTI8DSOzFjmoLa4UAsEweBgipHnvwIIBipQUgcdtQpxmdllcBy+Shx2Hy0SOkytLUpfVaYi+aLezIFwLAMnkYIKR69BsHnRhiDna02nj/YmVkZjZ3+iyTix6HyUePkOrxbx4sllvLy4XUdDI+hNxaAFgmDzcipLo3M36fm4o78Ujrua//4Dfvn1tdehOwTB66HCYfXUKq5x45dDVoAogBV0rVSONyqV0oBkwuBgip3lr6/S8//OB5/xCA6bvu+uHrJxrbm8uvvA5YJg9dDpOPLiHVc48csgAs1qtNa1DabJ1dvgpYJg8DhFSHn55PTN5posiEYRRGsZhu14NGsbL6xptMLrocJh9dQqqTr7587PizD3758xZY325eq7bU2D1rbwsmFwOEVIePPpk4MGmiyIThyPi+dr1m2s1aubL86huAZfIAOEw+uoRUj554qV7afiJx5/Dw8LHjz+6Z+1atXMmfPgNYJg/9hFQ0fyQWj4+lbjdhOLJ/VLfbRrfqla1qsXzhj6eYXAAOk48uIdV3Xvr5SHK0Xto2YXR85v5n/vC7+sZG7k+nAMvkoZ+QiuaPxGLOWDo1sn+fiSKrNRA1Nq/VSuWV104ClslzmHx0Camyiy/c/sVJq02tdM1G0dY/rtQ3tzZUvrj6AZOLAUIqmj+SmEjvS45+/3NTkdbpO+7Y3NqqbG4+9ePnAcvkOUw+uoRU2cUXUu6k0cZqUytth/VaWV1uliv5t88ClslDPyEVHT0y+aWDz0zc/aMTr2GHMRT9vd6OZJAsLP+NyXWYfHQJqbKLCyl30hhttTHa1ItbtVJ5Q63lTv0FsEwe+gmpDh998lcPPfzUKy/PNC5aq28b3dNq60Zbx2NYOnMJsA6Tjy4hVXZxIeUdMEZbbUykX3TpnJS/Pv/elffOFy98yOSin5Dq8NPzI389+YWJpDGwQGJfvBPqRlsDWDpzCbAOk48uIVV2cSHlT/3C/crw0FA8Hs8u/BSdSIfhPPNPjr8IWCYP/YRUczPpuw8kLbB/LB5qhJFutLUFlt66BFiHyUeXkCq7uPDbxx7PHvsZLO43FyON8lY71FEnhFi+ClgmD/2EVHMzaQCZA8n9Y/FQI4p0YnTPn9/9OLcWANZh8tEjpLr3e9/NDn+ktY40Iq0bbb2x1eqEuLxeWysGTC4GCKl4Ng3AGBgNDYQaYae9mg8A6zD56BFSzc2kvz2X+fiThrE60mi2da3ergRRoVJbKwSAZfIwQEjFs2ljYACt8e5qGf9mmTyHyUePkGpuJg3g4a9lCsVqpNGJdLWuP9msvrNSBiyTh5sQUuE/LAAmD4DD5OM6QiqeTT/01Yy1MAb/XK/Wmp3zH1Uu5APAMnm4OSFz6GLy0OMw+egnpOLZtDHYYYCwg1BjJVcGLJOHz8hh8jFASIX/Zpk8fHYOk48bETKH6zB5uCUOk4/d5DD52E0Ok4/d5DD52E0Ok4/d9C/wgdmdYsaJigAAAABJRU5ErkJggg=="},{"name":"Lantadyme seed","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAC7ElEQVRIDbXBwWtcRRzA8e+8TZYi8uitFw+edgYhl8JvD0v5bcmtF0EqFqT/YhEED4oUdg6B7IAUArJv8JBDLkuxPF+apJu3b0YTLCjS3bdqPh+j4rhLRsUBs/kCmI4d/zej4mbzxXTsfKhyztOx41/xIQIqI/7OqDjAh0rFzuYLY4yKZUc+xE9seltTLwtAZcR7RsUBs/kCmI6dD5WKZRc+xM8elYMhgz2uL2ne1Gc/FyojbhkVxy0fqpzzdOzYhQ/x4LDc32cwpEukFVfndb1keVqojACj4nhvNl8YY1Qs/fgQHz4pB3vs79EBmdTx7oLri7o6LiCrWKPiZvPFdOyA2XxhjFGx9ONDnDwtMRQFKUGma2lb2hUnLxvIKtaoOGA2XwDTsfOhUrH05kPUZyUFKZHWdC1tS2p59WMDWcUaFcctHypAxbIjH6J+XaaOtKZrOf624UZWsYBRcfxnPkRg8rQ8etFABlQst4yKYxc+RJUR/+BDBQayiuUvjIqjHx8icP9BqpcFoDKiB6Pi6MGHaCdpOLw/GHL1W31Rc1YVKiO2MSqOHnyIB4flRx+TOtoVV+f1Rc1ZVaiM2MioOLbxIT58Ut67BwVdgo7VJVfndXVcQFaxfJhRcWzjQ5x8URZDyKRE19G+o11x8rKBrGL5MKPi6MGH+Ph5mTpSS9uRrgnfNZBVLBsZFUc/PkTg0Vdlajn6poGsYtnGqDh686ECw42sYunBqDh24UOEDKhYejAqjn58iMCDT9PytABURvRgVBw9+BDtpBzs8Yfrq/r8NcvTQmXENkbFsY0P8eCwHOxRDCCR4O2b+pdQQFaxbGRUHNv4EOXzshgwgA7IXNac/1qfnhQqIzYyKo5tfIiTL8uCGynTtbQrfvq+gaxi2cioOLbxIeqzkgIS6zXtNe2KVz80kFUsGxkVRw8+xMfPy3VLWnP0ouFGVrFsY1Qc/fgQ+VMGVCw9GBVHbz5UgIqlN6PiuEtGxXGXfgezY2KQWmET/gAAAABJRU5ErkJggg=="},{"name":"Dwarf weed seed","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAC7ElEQVRIDbXBwWtcRRzA8e+8TZYi8uitFw+edgYhl8JvD0v5bcmtF0EqFqT/YhEED4oUdg6B7IAUArJv8JBDLkuxPF+apJu3b0YTLCjS3bdqPh+j4rhLRsUBs/kCmI4d/zej4mbzxXTsfKhyztOx41/xIQIqI/7OqDjAh0rFzuYLY4yKZUc+xE9seltTLwtAZcR7RsUBs/kCmI6dD5WKZRc+xM8elYMhgz2uL2ne1Gc/FyojbhkVxy0fqpzzdOzYhQ/x4LDc32cwpEukFVfndb1keVqojACj4nhvNl8YY1Qs/fgQHz4pB3vs79EBmdTx7oLri7o6LiCrWKPiZvPFdOyA2XxhjFGx9ONDnDwtMRQFKUGma2lb2hUnLxvIKtaoOGA2XwDTsfOhUrH05kPUZyUFKZHWdC1tS2p59WMDWcUaFcctHypAxbIjH6J+XaaOtKZrOf624UZWsYBRcfxnPkRg8rQ8etFABlQst4yKYxc+RJUR/+BDBQayiuUvjIqjHx8icP9BqpcFoDKiB6Pi6MGHaCdpOLw/GHL1W31Rc1YVKiO2MSqOHnyIB4flRx+TOtoVV+f1Rc1ZVaiM2MioOLbxIT58Ut67BwVdgo7VJVfndXVcQFaxfJhRcWzjQ5x8URZDyKRE19G+o11x8rKBrGL5MKPi6MGH+Ph5mTpSS9uRrgnfNZBVLBsZFUc/PkTg0Vdlajn6poGsYtnGqDh686ECw42sYunBqDh24UOEDKhYejAqjn58iMCDT9PytABURvRgVBw9+BDtpBzs8Yfrq/r8NcvTQmXENkbFsY0P8eCwHOxRDCCR4O2b+pdQQFaxbGRUHNv4EOXzshgwgA7IXNac/1qfnhQqIzYyKo5tfIiTL8uCGynTtbQrfvq+gaxi2cioOLbxIeqzkgIS6zXtNe2KVz80kFUsGxkVRw8+xMfPy3VLWnP0ouFGVrFsY1Qc/fgQ+VMGVCw9GBVHbz5UgIqlN6PiuEtGxXGXfgezY2KQWmET/gAAAABJRU5ErkJggg=="},{"name":"Torstol seed","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAC7ElEQVRIDbXBwWtcRRzA8e+8TZYi8uitFw+edgYhl8JvD0v5bcmtF0EqFqT/YhEED4oUdg6B7IAUArJv8JBDLkuxPF+apJu3b0YTLCjS3bdqPh+j4rhLRsUBs/kCmI4d/zej4mbzxXTsfKhyztOx41/xIQIqI/7OqDjAh0rFzuYLY4yKZUc+xE9seltTLwtAZcR7RsUBs/kCmI6dD5WKZRc+xM8elYMhgz2uL2ne1Gc/FyojbhkVxy0fqpzzdOzYhQ/x4LDc32cwpEukFVfndb1keVqojACj4nhvNl8YY1Qs/fgQHz4pB3vs79EBmdTx7oLri7o6LiCrWKPiZvPFdOyA2XxhjFGx9ONDnDwtMRQFKUGma2lb2hUnLxvIKtaoOGA2XwDTsfOhUrH05kPUZyUFKZHWdC1tS2p59WMDWcUaFcctHypAxbIjH6J+XaaOtKZrOf624UZWsYBRcfxnPkRg8rQ8etFABlQst4yKYxc+RJUR/+BDBQayiuUvjIqjHx8icP9BqpcFoDKiB6Pi6MGHaCdpOLw/GHL1W31Rc1YVKiO2MSqOHnyIB4flRx+TOtoVV+f1Rc1ZVaiM2MioOLbxIT58Ut67BwVdgo7VJVfndXVcQFaxfJhRcWzjQ5x8URZDyKRE19G+o11x8rKBrGL5MKPi6MGH+Ph5mTpSS9uRrgnfNZBVLBsZFUc/PkTg0Vdlajn6poGsYtnGqDh686ECw42sYunBqDh24UOEDKhYejAqjn58iMCDT9PytABURvRgVBw9+BDtpBzs8Yfrq/r8NcvTQmXENkbFsY0P8eCwHOxRDCCR4O2b+pdQQFaxbGRUHNv4EOXzshgwgA7IXNac/1qfnhQqIzYyKo5tfIiTL8uCGynTtbQrfvq+gaxi2cioOLbxIeqzkgIS6zXtNe2KVz80kFUsGxkVRw8+xMfPy3VLWnP0ouFGVrFsY1Qc/fgQ+VMGVCw9GBVHbz5UgIqlN6PiuEtGxXGXfgezY2KQWmET/gAAAABJRU5ErkJggg=="},{"name":"Yew seed","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAACtUlEQVRIDbXBwWtcVRQH4N+N2BCQULrswkVr3px/4MyqnAnuujAk1JW4Kqb/oYgiwlxCoHNBCtnMe8UiCK1DSjK0yczce8+5z3awGGlHG5L3fU6Y0CUnTACGozGWBn3CtXLCNByNB33yoQbQtu2gT7g+TpgA+FAL9wAMR2PnnHAP/8eHBoBwhf/khAnvDEfjQZ98qIV7WM2HBsBX21sx2U+Hz4QrrOaECUvD0XjQJx9q4R5W86F58OWdG+sbKVtSU8UPB0+FK6zghAnAcDQe9MmHWriH1Xxovrl/py0oLT75dEMV5+ev51F/Cc+FK3yIE6bhaDzokw+1cA+r+dA83NkqLQrQFqhaylgknUc9eZWf1MfCFd7jhGk4GuOCQZ/wIT40+3tkhtKaFahaykiq87m+XuTHRxNgTbjCvzlhAuBDjQuEe3iPD82jPSotzEwLVC0bYtJ51Nks//bHZDJdw5JwhXecMOGj+dB8t0tWTA2qlg0p6SLqWcyHT44B7GxvRbUfD54JV1hywoSP5kOzv0taTA3T00nKiBkpTWcJdz//Yn1jI2VLaqb43j8VrgA4YcJl+NA8kM2siBnZkPL04Gjt2/tbpZi1uLH+WUrWAifT058fPxeunDDhknxocMHDHWphbQsrsGIpIyaNUc9m+fDo2AkTLs+HGn9zj/aotLA3CrSYZiySLqLOYv79xcQJE67Ah+br7c2bN29bMTNoMTWkpPOk57P858vohAlX40Ozv0tWTA1aTA0p6TzpfJZPz6ITJlyND83uvc1bt26rmRY7PXkZM1KezhJ+rdecMOHKfGgA7NzbzBk5Y5FxcPQKb7VOmHAdfKgBh3+0AIR7TphwfXyosSTcw5ITJnTJCRO65IQJXXLChC45YUKXnDChS06Y0CUnTOiSEyZ0yQkTuuSECV36C39ZqNeLipc5AAAAAElFTkSuQmCC"},{"name":"Yew seed","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAACtElEQVRIDbXBwWtcVRQH4N/NIlIMEaGrghtp3zv/wJlVORPEjQiSIQVXuqslf5+IKC6cSzadC1LIZt4bkC6kMoROx7SZee/ec+4TB4uRdrQhed/nhAl9csIEYDyZYmM4INwoJ0zjyXQ4IB8qAF3XDQeEm+OECYAPlXAJYDyZOueES/wfH2oAwgX+kxMmvDaeTIcD8qESLrGdDzWALw6oVfvhZCZcYDsnTNgYT6bDAflQCZfYzof6wacf7763F5OpWlL7zs+EC2zhhAnAeDIdDsiHSrjEdj7UX312rwNytp3dvaS2evly3epP4ZlwgbdxwjSeTIcD8qESLrGdD/XDQ+oyrLMuQzOaZG3UdauLZfqlOhMu8AYnTOPJFJcMB4S38aE+PiI1WEbuTBUxWRO1afWPVXp8Ogd2hAv8mxMmAD5UuES4xBt8qI+PyDKyQTtTRTJro67WumrT7Ol8vtzBhnCB15ww4Z35UH8zotxBzVSRzNqo67VetOnkyRmAw0+oVfvez4QLbDhhwjvzoX40otwhmS1fzNuElNAkrOLy7kd3d2/txWjJTNW+/XkmXABwwoSr8KF+cLCvipTQJsQEf3r+9ef3ckbO2L31fky5y/Z88eLHx8+ECydMuCIfalzy8JC6jAzkzkwRk7Wq66gXq3Ty5MwJE67Ohwp/c8dHZBnZYJ2pIprFqKuI9Up//f03J0y4Bh/qLw/2P/jwTu5gZqpQsyaiiXrR6HzxygkTrseH+tGIcgc1U4WaRcWq0XWjz89fOWHC9fhQj+7v3759R81UsVjMU0KTsI7LUO04YcK1+VADGN3f14Q2o2ngT8/xl84JE26CDxXg8I8OgHDphAk3x4cKG8IlNpwwoU9OmNAnJ0zokxMm9MkJE/rkhAl9csKEPjlhQp+cMKFPTpjQJydM6NOfuEmq3sFt1dgAAAAASUVORK5CYII="},{"name":"Magic seed","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAB90lEQVRIDbXBPWsUURQG4PekEC0EQWJpufdUi82JYHHS2QUEQ2xU9H9aZC5BcC6EgLDMTpkihYsfbEJ2Zu49M2IqY7I6KzPPQyqMMZEKA8jyYneHMQJS4SwvABCRisPQSIUBZHlBRCoOQyMVBpDlBRGpOAyNVBhAlhdEpOIwNFJhAFleEJGKw9BIhQFkeUFEKg5DIxXO8gJXdncYQyMVBuDDHFdUHAZFKowxkQpjTKTCGBOpMMZEKoz/4kOpMsG/kApjcz6U+nTbf1qoTPBXpMLYkA8lAH22vbX18PCoUJlgPVJhbMKH8uCFRGu/fjm9d/+RJftwWKhMsAapMHrzodzf467FnbsPmhjN7OJ8ebmqPoYzlQluQyqMfnwoX7+ctq1Zh65FjNZEqxurVukonAKdisMNpMLowYfy/asn1rWtwVozg5k10erKLuv07cdqNl+oTHADqTD68aF8ezBtW7RmyWBmTbS6sWqVluerk9kC6FQcriMVRj8+lO8OptbCzJLBzGKyqrZqlS7qdHxyBnQqDteRCqM3H8o3+1PrLEWY2eL7MlWxiqiaejZfAp2Kw3WkwujNh3Lv+eOUUkxICU2MVYXjzwv80qk43EAqjE34UOJPHQAVh9uQCmNDPszxGxWH9UiFMSZSYYyJVBhjIhXGmEiFMaafjJYHkKQSussAAAAASUVORK5CYII="},{"name":"Magic seed","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAB/ElEQVRIDbXBsWsVQRAH4N+IRSzUxiqF5dsBm0CYFBaTdLYBwRALUfGvtJDcIoK3TSAo965MEZEkBBKS9/ZuZ09NZUyi9+Tu+0iFMSZSYQBFWa2vMUZAKlyUFQAiUnEYGqkwgKKsiEjFYWikwgCKsiIiFYehkQoDKMqKiFQchkYqDKAoKyJScRgaqTCAoqyISMVhaKTCRVnh0voaY2ikwgB8mOKSisOgSIUxJlJhjIlUGGMiFcaYSIXxX3yoVSb4F1JhLM6HeuPp8s6nA5UJ/opUGAvyoQaw8XT5zt0HH3ylMsHtSIWxCB/qreeS2nz8/du9h4+ssfc7X1QmuAWpMHrzod7afGIZS0v3542Z5fOzk4vz9DHsq0xwE1Jh9OND/erFSv6pQ5fRJovRYtPMZ8l/3gc6FYdrSIXRgw/1u5er1pkZcs5maJM1jcVosyYeHc++Tg9VJriGVBj9+FC/2V6xjM5yMrRmKdqstdk8np6l3b0DoFNxuIpUGP34UL/dXs3ZzJAsm1nTWow2m8fzixR2D4BOxeEqUmH05kP9emvFDMmymR0dnTRtG+eYN3Fvegp0Kg5XkQqjNx/qzWePW0NKqU1oYhtbhN1D/NKpOFxDKoxF+FDjTx0AFYebkApjQT5M8RsVh9uRCmNMpMIYE6kwxkQqjDGRCmNMPwAfzQiQRGIb5AAAAABJRU5ErkJggg=="},{"name":"Calquat tree seed","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAEFklEQVRIDbXBwYtbRRwH8O+0lWKlqxcvPYgUmjcoFqH8lj3Iby9eRBAFoSgiFtouHkQU8SCIYMGW9S+QCt4URNFrSy8ZlmIzIEohJIMsy1LWtkmT7EuyL++9+c3oBhe7dLOJYD8fxaTxMCkmDaBaawBYnNf4vykmXa01Fue1sc0Y4+K8xgyMdQCYKphGMWkAxjaZkmqtoZRiSjCBsQ5jLzz3ZKef19dSjDFVMIFi0gCqtQaAxXltbJMpwV6Mdaf52BOPz5UeXmRUSD/znX7W3LjT6x1gqmAvikljzNhmjHFxXmMyY92Hr58s5W/wUbzHMC+6vdGtzqC+ljJV8ADFpLGjWmsopZgS7MVY9/4rx4/OzZUCkSABpUjpJS+kN8zbm9nKzRZTBbspJl2tNRbnNYBqraGUYkqwF2PdhTOngAMhBi8QkVKCF3iRQiQdFL+7dv1WylTBfRSTBlCtNQAszmtjm0wJJjDWAbh4liLgJYjAeykleEEv7f222vv1jxSITAl2KCaNMWObAJgS7MvYJqCWlxZiROml9MEH6XU7hw4eutsbfWc2gMiUYIdi0piNsQ5jTBVjHYDlpQUvkhdh0O96wXDkv766DkSmBDsUk8YMjHVvvXhiOMpbm9nKzRZTxdgmoAAsLy18/NUv+EdkSnAfxaQxjbHu/Ms6BIxEupt5u5/dqLeYKgCMbQIKiBhjSrCbYtKYxlj33mvPepG8RJYX6dBv9rOVeoupgmkUk8Y0xrqPTp8svRSl5KUMMxlkfnMrW7nZYqpgX4pJYxpj3SdvPl/4UIoUpQxz2cqkn42u2A0gMiWYTDFpTGOs++ztU6WXwoeylMzLVibDUf7TyjoQmRJMppg0pjHWXThDEkNRSOFDXkpWyFZefHttFYhMCSZTTBozMNZdPEdFGQovoyJ0Ou3hCN+vbACRKcFkikljX8Y6poqx7tK5hcHmPQlSCLpDvznwP17fACJTgskUk8YDjHXY8czTc/W1FGOfnj4BIPfS7fvLV9eByJRgX4pJYzdj3Rt87OABPHL4sVEpWeEHW74zLFfv3On1DuBfkSnBNIpJYzdj3bsvPVUKDh856kXEwwcZ5NJJR7c7g/paCkQATAlmoJg0djPWffDq8UePzBU+SICXbaUgy6Xbz9v97Ea9xVTBbBSTxgOMdZ+/c6oUiIiX4CNExAuyXNJhcbvdXqmnTBXMQDFp7MVY98VZKn2QAAniBSLBi+Sl/Nm+9/P1FhCZEkyjmDQmMNZdOr8QgogEL5AgItgapGnmv7m2DkSmBNMoJo3JjHVfLi2EiBDEC/rpPQDdgb98ZR2ITAmmUUwa+zLWYWz5/EK3c/fiD6vYFpkSzEAxaUxjbBPbFLZFAEwJZqOYNGZmbJMpwX+hmDQepr8AcP+lnzyiHlkAAAAASUVORK5CYII="},{"name":"Papaya tree seed","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAACT0lEQVRIDbXBMW/iWBSA0e8Cm9KaLg1FCsS7ijTSNJfy8tt5Ja9f4acUFGnoLGulHcd2PAsrlKTIjEnCOeKmXJO4KbDZ7oD1Svlq4qab7W690pjKYRjWK+VLiZsCMZVuYbPdiYhb4OuImwKb7Q5YrzSm0i3wVkwZcFtyOXFTTmIqh2FYr5RXYsrA7bfnBqpqArgtuYS4KWeb7U5E3AInMeW72wKY/UXX0lH901BVE7clo4mbbra79UqBzXYnIm6Bk5jyYl7czOiBjh66lv2hhsEtMI64KbDZ7oD1SmMq3QInMeUwL25m9Bz10PzL/lDD4BYYR9yUk5hKwC1wFlO+vyumM+joOXrqeHisYXALjCNuyvtiyj8WRQ909PDU8fBYw+AWGEfclN+KKfPG4BYYTdyUP4mp5MwtcAlxUy4UU+bEbcmfiJsyWkwZmN8+tw1NRcXEbclviZsyTkx5MS+mHPXws63ahkM1cVvyPnFTxokph3kxnfG/vqNp2R9qGNwC7xA3ZZyY8v1dMZ1BRw99R9OyP9QwuAXeIW7KaDHlH4uiBzqeoNzXMABugXeIm3KJmDIvBo6EV9yWvCJuyoViKnkh89vnGd86KhpaOFQTtyVn4qZ8VEx5MS+mHPXQtXRUbcOhmrgtORE35aNiymFe3MzoOeo7mpb9oYbBLXAibspHxZTv74opRz300Hc8PNYwuAVOxE35hJjy90VBx396+Htfw+AWOBM35XNiyrwY3AKviJvyaTGVnLgF3hI35ZrETbkmcVOuSdyUaxI35Zp+ATjEB5CfUiG4AAAAAElFTkSuQmCC"},{"name":"Palm tree seed","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAET0lEQVRIDbXBzWtcVRgH4N+JqYIILlSQLtw59/wDb5ZvRFA34gd0Ia20UaqC6LIuXAitoqh1IaJgWqQUtSLaT4tEinSOBXWOlFoozty2Sdqm+ZpMJpmPe+ecc8890mCwoZnMCPZ5BJPE7SSYJIBiqQxgeEji/yaYZLFUHh6SSldCCMNDEn1QOgbAVEAvgkkCULrCFBVLZSEEU4QulI6x4pWn5ORMY0xPYwVTAV0IJgmgWCoDGB6SSleYIqxH6fiD1x4rPDhgXZ52/HJiF5bSq/ONU+cqU3MDTAWsRzBJrFC6EkIYHpLoTun4l4+fNs4b512WG+cXm52J2daF8cWTv19lKuAWgkliVbFUFkIwRViP0vHh97c+fL8zztssuMwb6zsubybm2nwyPrs0eqLMVMBagkkWS+XhIQmgWCoLIZgirEfpePLQNgCZDzbzLss7zhvrjfWp9dO19jenJ0+fvcpUwE0EkwRQLJUBDA9JpStMEbpQOgYw8932PM9tFozzxnnrfGp9eS78cCY+rspAYIqwSjBJrFC6AoApwoaUrgCidnQkDyExmbG+Y/2FWdy16Y5LU/U3PhkDAlOEVYJJoj9Kx1jBVFA6BlA7NtKxeSu1lxYGOy6rN9Od7xwDAlOEVYJJog9Kx/t3PVJvdC5OL42eKDMVlK4AAkDt6Mh9zxzAPwJThJsIJolelI4P73ki83krddfmm5dnGgfHLjIVAChdAQQQsIIpwlqCSaIXpeNTe5/sON9O3WLTztfbU9X2vpNlpgJ6EUwSvSgd//rps2nHtY1vp67W7FSX0ulae/REmamADQkmiV6Ujs/t25IanxiXGL/UMrXlznw9effrc0BgitCdYJLoRem4cvC51GSp8YlxzcQtNkyt0dn1+W9AYIrQnWCS6EXp+MqhbdaHdmoT49upW2qbpaZ56SMFBKYI3QkmiT4oHc98vz1Js1bHtdPszylfbyZvfnYKCEwRuhNMEhtSOmYqKB3PHd5RqQ66zHdMdn2hMbvQemv0ZyAwRehOMEncQukYqx6nzT/paaw4M7oTAknqpqqNF98+AgSmCBsSTBJrKR1/+PoTd24aeOBu10zscttWl5Irc63SXwuTcw38KzBF6EUwSayldPzl7i3Guc33ZDbLjMut87VG58p868LEwpieBgIApgh9EEwSaykdH9+77aF7TWq8zbx1uc28cXm9aaaqzYmZxoGxi0wF9EcwSdxC6fjyV1uN89Z5m+XWeZt5Y8NyYmZrydnx1sEfzzMV0AfBJLEepeOpb583LndZ7pw3mbdZsM43U/fHeLp7/2kgMEXoRTBJdKF0XD2yw7rgvLfO2yxY5yfqg7Xl5OX3jgOBKUIvgkmiO6XjxWMjeYB1uc18XB2EwPVq44U9R4DAFKEXwSSxIaVjrFg4OnJ+euDRV7/ADYEpQh8Ek0QvSldwg8ANAQBThP4IJom+KV1hivBfCCaJ2+lv1SfBn6RfKcwAAAAASUVORK5CYII="},{"name":"Money tree seed","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAABsElEQVRIDbXBsWoUYRgF0HsTKwUbO4UUFjtfKYSb8qb0AXwDm4CNL2CjFlZ24gOIjSIIgqSxmSlnamEyhigRAibYRIlukpkxLCyuqMVu5j+HViAlWgEgL+v1tUACtCIvawAkrQxDoxUA8rImaWUYGq0AkJc1SSvD0GgFgLysSVoZhkYrAORlTdLKMDRaASAva5JWhqHRirysMbG+FhgarQBQVFuYsDIMilYgJVqBGUXVYIY1wvnQCkwVVfP4ztWjH2h7nOk73H+2Z41wDrQCU0XVPLm7sntw4f3e6cqVi22Hz1+PNotda4RF0QpMFVXzaCOOxu0xLh2PT047tG379FUN9FaGhdAKzCiq5tbN63Ht8slJ1/Vou/bT/rfX73atERZCKzCjqJp7t28sn1nCz3Hbdt3Hg+8vN3eA3sowP1qBPxVV82BjdXl5aXzc9V3b9djeP3zxdscaYX60An8pqgbAw43VrkffY/vL4fM3H4DeyjAnWoF/KaotgPittzLMj1bg/4pqCxNWhoXQCqREK5ASrUBKtAIp0QqkRCuQEq1ASrQCKdEKpEQrkBKtQEq/AA4pp4GsNKL3AAAAAElFTkSuQmCC"},{"name":"Carambola seed","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAClUlEQVRIDbXBvYtcVRjA4d85oGATTj0oLCL3vk1swjuIxTt/Q6wt1dYirUVqK8HeysYPUijYz6lkDoiwCHMPKTYyBFYCnoiucXM/zFx2YAoz2cid53GmwjE5UwGWqzWjxVyYlDOV5Wq9mEtMDTAMw2IuTMeZChBTY1oDy9XaOWdaMxFnKuwsV+vFXGJqTGsm4kyF0XK1Xswlpsa0ZjrOVIDlar2YS0yNac2knKksV+vFXGJqTGum5kxluVqzZzEXpuNMBYipYY9pzZ6YMmBa8fKcqXBQTPnD2/Lj6cPT+3+YVhwUU2ZkWjFypsLzxZQ/+eDWXxdPv//h5/vFMzKt+C8xZehfhz+h4E0rwJkKzxdTvvP+26+9+so391IHTwpP4RwPmFbsiSmf0LNzxjPetHKmwkEx5ZvhxiWFUQdt4W84x5tWjGLKb4WenbbwTAsbvDMVDoopB/pZCEBHATpoCy1s8KYVEFOuQ8+oY6sttLDBO1PhoJhyoH8jhI4rHQX4p9DCBm9axZTr0LPTsdUWzvDOVHiRmPLNcINRx5VLypPCBg8E+lkIQEcBOrYeFQremQovElMO9CchdFzp2Loo5QwPBPpZCEBHYdTBo0LBO1PhGmLKgR44CQHo2LqkNAXwQKCfhdBRGJ0XCh4GZypcT0wZCPTsKXgYwAX6WQi333vz23s/nRcKHgbT2pkK1xZTAw4I9EDBw2BaAzHlux/d8s7/9vvFl1+fFjwMprUzFV5STA04tgbTmlFM+dOP3+k78q/li+/WMJjWgDMV/peYGtOanZjyZ3febXsePHz8+Ve/wGBaA85UmEhMmSuDac3ImQrTiakBTGt2nKlwTM5UOCZnKhyTMxWOyZkKx+RMhWNypsIx/QupEB75mWtTTAAAAABJRU5ErkJggg=="},{"name":"Golden dragonfruit seed","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAACnElEQVRIDbXBzYpcVRAH8H8ZfBTvqReoXgyhOohhNvoabkRCMBkhGTQhiuJHPjCOOIrxAVwIriRu+hCG0IdZCn1PHkGXzgy595wqMwMNHbAnt6X79yMVxiaRCgOYTGc4Mx4x1opUeDKdjUccUwvA3ccjxvqQCgOIqVUJACbTGRGpBKwJqTDmJtPZeMQxtSoBa0IqjDOT6Ww84phalYD1IRUGMJnOxiOOqVUJWCtS4cl0Nh5xTK1KwLqRCk+mMywYjxjrQyoMIKYWC1QCzhVTVmkwAKkwBosp48w722/89vszlQavQiqMYWLKH7y/Vap1XT057v857n/59U+VBuciFcYwMeVrV7bMAIeZPe/qdz8mwFUCliMVxgAx5Z2rF83hbm5whzvgdn/vqUqD5UiFMUBMeefqRXe4w80ccMe9hweAqwQsRyqMAWLKu9e1Gko1d7iZA3e/OQBcJWA5UmEMEFO+deNSLahmpZoZvnrwBHCVgHORCmOAmPKnH79Vq71QC46Ou7sPDwBXCTgXqTAWxJSxQKXBmZjy53cuu7kZbt7+A6dcJeBVSIUxF1N+710phtcvXKi1lmI//Hyo0gCIKX/92XattrP7GHAAKgEDkApjLqZ87coW8Fo5hXrK9h8dqjQAYso45SoBg5EKYy6mvHtdu2LVzAqKWS21FNt/dKjSAIipVQlYBakw5mLKH314qVYr9gJqMXPr+/rtfgJcJWB1pMKYiyl/8cn20dHzWs0qipk7+t5OTvrvf0oqDVZHKowFMWUAt268adXMzR1db11XHuw9BVwlYEWkwnhZTC1Ae/fe/uvvY3fre+t6+/L+E8BVAlZEKoz/ElPGS1wlYHWkwlgiphZzKgH/C6kwNolUGJtEKoxNIhXGJv0LkYp9kNMdKvMAAAAASUVORK5CYII="},{"name":"Grimy avantoe","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAFIElEQVRIDbXB0W9T5xnA4d97bM94NekZYDLczt1ufM4FQijKm4io/WAIBSE0RP+B/XG7HqKiQhWom+IvNFX8RRGq0OQcTVx4k6PUIT0DD/dwbH91omYKgg12kecRozH/J+sSo03ejxiNgVa7c3khBlrtDocuL8S8wbokvFpP/9oz2uQ9iNF4Zb0jgogYjVrtjohwyGjEEdYl4bU6kH7dA2804l3EaAy02h0RMRq12h0RMRpxwLrEaJND1iXhcn1ud7B5qpp+3TPa5F3EaAy02h0RMRq12h0OXF6IrUtCU09tz2iTA9Yl4XJ9bneweaaaPuyBNxpZlxht8jrrEqNNQIzGQKvdERGjEWDdFuC9FwnCa/X0Zc5aHzDatC4Jr9fn+4ONWjV90AMPsqy1h65vtMkB6xIgvFJPV3pGm2I0BlrtjogYjTjUandEJLz+ETnpi3zueba59RwIl+vzu/nGbCn9qgcYbVqXgDcaAdYlLNYoE1ZK6YMeeDEaA612R0SMRq125/JCbF3i/UREwpufMBqlQxZ3B+unykt72d9+XV14kbfPVtL73fBmI73fNdrkgHUJWqPE1R+zzY/D9F4XvBiNV9Y7IkxdXoiBVrsDiATgQcKbDfLR+e0B8OR09cKzwYkT5faZClPDUbrSA280si5harH26cvsyW9DflFM7zwFL0ZjwLotDhiNrEvAs0+MNq1LlrXWPlUih4Cp+b18Y7aU/itnrY+pYftMaQ3XZ6m2nNNuVNI7XfBGIzEa8wbrEvZ5kGWttX9V4oiFH3KB9bMVpgIu/iNdmamS5TzLrs6w+UmY3u2yzxuNxGgMWJdwhNGmdQl4EODa3MxGrYoHYb4/CAplAQLWf3My/fPTKxdnHs9U00luBtkH5fK3ZytMTUjvd402xWhsXRLeaJCN0lFOxsVn2eO/P2epxlo/vF6nWCSAAuQwGi3s5ZMxQYH2uQrZ6Hxv8GS2emFnEBQol8rrH1UQ0rtd9nmjkRiNAeuS8A8NJpCN0pf53LNs84MyU5t9jWY+ni0HAX85XSFncXvooX22wtRkdOGfg+9mq/N7g6BQLpdYPXcyvfOUn3mjkRiNOWBdEt5uMDWGbJS+zJnayzhV1n7mtp7f+rRmaxU8l7aH385WyEZ45nYHARRK5WKBb85VGMMYJix8P3zo+kabYjTmkHXJraWahwl8c6ZCNiIjfZUvvcjyV7jT5fDDEsUiAmPIRgTM7w6CQrkQUCox5Sd8udbnZ95oJEZjjrAuAcIbDYpQgAnkI3LO7wzyMSdPsBFWmSkyhlcjYGEvLwQEBQoBtlYB0rtd8IDRCBCjMa+zbgsECG83EPAwhlcjxsztDf79I1u/Cz/7Ybj6YeXS3hAIICiwOlv5bGf45VofvNGIQ2I05g3WJeHnDaaC4pWdF8DKmQpjeDW6sDP4brbKL4uXesNigcmYoIAE3HvUZ583GnGEGI15G+sSDoW3G/xHxsXt9HEjNHtDwE9Yna2Y/jCALx71wRuNOEKMxvwX1m2BhDfqBEUCEAiYurQ9LBZYrZ/8/fcv7tr+H6/X//Sgxz5vNOJ1YjTmf7Iu4dCNxdpX630O3FyslUp88ajPPg8YjXiDGI15F+uSuWimAG7rOXj2SXizkd7vAuHnjfRu12iTtxGjMe/BuuTWUu3eWh88SHirkd7rgmefgDca8TZiNOb9WJeANxoB1iXgjUa8ixiNOU5iNOY4idGY4yRGY46TGI05TmI05jiJ0Zjj9BPVvELRmDJ/sgAAAABJRU5ErkJggg=="},{"name":"Grimy snapdragon","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAFBUlEQVRIDbXBUWsUWRqA4fc7ldiaTKcr0Vg7i9ddxcCABD4DEo4SxEEG/An74/YP7DAioshgH5pA+oAEBqRTzPVATWtS3UlMJ5U6NUkwoOiu7kWeR6xm/J+cz612+TZiNQN6g+G9OxnQGwy5cO9Oxmecz2+vha2+sdrlG4jV7NXmUAQRsZr2BkMR4YLVlI84n6/YEGDLGWispnyNWM2A3mAoIlbT3mAoIlZTzjmfW+1ywfl85X6IJ3H5XfnaGatdvkasZkBvMBQRq2lvMOTcvTuZ8/mPd8PvG8Zql3PO53o/tCdxuVC+fmWgsZo6n1vt8innc6tdQKxmQG8wFBGrKeD8NtA0jYhZsWF6yBtvAKtd53NdD50yHi+U/pWBBuShLr/wI6tdzjmfA7fXwlbfWO2K1QzoDYYiYjXlQm8wFBFdb6pjDveZP4xfb08AvR86k2QcF/43A1jtOp9DYzUFnM/TlXBllqvz+N8MNGI1A3qDoYhYTXuD4b07mfN50wQRWX3QhMB0ylwZ782X8UH8fqm8eZSMO8XmS7P6IGy+NFa7nHM+T2+HaJZ/1PF0udx4bqARq9mrzaEIp+7dyYDeYAiIGGhAVh+E6oS5dzGw3y4X9uKrV1vjTgEcTdnqG2isps7nQLoSlqs4fF/OtHBPDDRiNQOc3+ac1dT5HBrOiNWu8/lDXd5tF9UxxnBqaT8Zx8XBHm+8+XE1/L5pgPR22N4yP2i4RfL+ZtF/aqCxmorVjM84n3OmAXmoy2/niwjqAIZTNw4SgbJTcMpw7a/43VxZT5ns0F2Kj78v+08NZxqrqVjNAOdzPmK163wODQjwYGVhHJcETnUmsYlaAhgObxbuibl/e+HdXFlX3Kji+VZrp1NwbvOFsdoVq5nzua6H6pi6oq64Mom3/pj8oOGNN7oejCEyINQ1IbC4l4QaE7G/VFQVrVH8frH8bjc2Ea3Z1sGNAug/M5xprKZiNQOcz1cfBqCaMj3k6iSeXCmjiO0to+nCraRlDMV8EU5o7yQNjDsFEALXRvH+Yrm0H5uo1ZplfL1wTwwfNFZTsZpxzvl87VEIgbqhmlIdUQfeT5hbYH4S++3J47XlnU4RAp2dZBwX1RE1xJPYQDTbmokYLxYEQk0d6IyTF35ktStWMy44nz++u9xAgN12UR1RHXNcEU/j6piDhXK+jZkhEuqGasqppf3YRK3IMDvLqSbwZGPEB43VVKxmfMT5HND1MDuDiQiBqqI+YW43rmraV3k7V861oaY6BsPiXhIZTERk2OkUBPrPDDSA1RQQqxmfcn4bBFh7FDAQqGrCCfUJ8X58MIVb5c395K+5YmkvAQyYiN3FYnE3ebIxgsZqygWxmvEZ5/O1RwGDMSztJsDbdlHVhBOu7cSHcdmap/02mYkINSZCDL/2R5xprKZ8RKxmfInzORfuPgqGD44q5t/Gx0l54yABmsBup1jaSwz80h9BYzXlI2I1479wfhtE14MxYIiEU8bQ3klmIsbXi+vj5D9u9K+f/vnv539yprGa8imxmvE/OZ9z4dHq8rPNEed+Xl2eneWX/ogzDWA15TNiNeNrnM9X0oUI/PYEGs7I6oOw+dIAaz+H/lNjtcuXiNWMb+B8/vju8q8bI2hA7v4UNp4baDgj0FhN+RKxmvFtnM+hsZoCzufQWE35GrGacZnEasZlEqsZl0msZlwmsZpxmcRqxmUSqxmX6W9cA1fRMyuFBgAAAABJRU5ErkJggg=="},{"name":"Grimy lantadyme","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAFKElEQVRIDbXBb0tc6RnA4d/9HM2kuv5Jtm7YsltsxDnHblisya1BJk9kGAyyrLRfoB+u70tDJIgi4jwMEuehQQppzpxpFklooJmt2R21qx7nnI7upiQkbdIXXpdYjfg/OZ9YLfJhxGoEVOvx7emIV6r1+PZ0xLs4n1CapLZttcgHEKtRtR4DImI1BDa24rmZqFqPb09HvMn5BHsdOrhtyK2GvI9YjYBqPRYRq2G1Hn/0q4mDndhqWK3HIsZqkVecT5i7Xm431z+6itu2WuR9xGoEVOuxiFgNq/XYGLl1IwSq9VhEQKwWOeN8wtz1cru5PjjOxp8htxo6n1gt8ibnE6tFQKxGQLUei4jVsFqPjZFbN0KgWo9FBL2GfwRYLTqfUNbKd421wZANDznIvI6s+pbVImecT+gqTVLbtloUqxFQrcciYjWs1mNj5NaNEKjWYxGh9Bv2D6Z++MfDRpuuueuV9tO14VHWPWC16HwCudUQcD5hKqL3Av0F1j3kYjUCqvVYRKyGwMZWbIzJ80zEQE55msOjme92tvo/nz14tnn56vzR31eHxlh7QOUmaw+sFjnjfMLkOL0Xyp1n6yPXWNmEXKxG1XrMmdvTEeB8kueZiIEchMpNTtLSP5tAbWDU7u1cvFhYHRqDDocptW3IrYbOJ3RNRaX0ee3TaxR6WHKQi9UIcL7BGauh80llamTt4QsQq0Xnk3kdWR0Y5TjFAEFl/+na8Ch7/8I/YuZLtv5C1+Q42030i3lerH4ywX0HudVQrEa8xfmEUznIvI6s9v+SrgwMXfMHTwVWhsboMsy9+OtG3yiHx+y2y5f31z/9kvs1TuVWQ7EaAc4nvMZq0fkEchCgMjW4NhySZUCl3TRBQQDDyicTLLm5ycGNvlHSjk2f9RcKy0Nj/Gj1gdWiWI2cTygrxylpRno82X6+/bc2+gX+EWXFBBiDQCcj68zv7WQdTMDq5XHStNRq1C6N25dNE1DoLaz8PKRrucap3GooViPA+YT5m3QdHvJDOtV+9vDCFQLYbmo4+NmVgjH8sX+Ck5M7u80cVofG6Mo6ttVwl8Yr+00TFAq9LH08wZLjJ7nVUKxGnHE+YaFElpFnHKYcHZJBe4/BAW0/8432Ymnk3lBIxsJuY3l4nKMUsnK7aSDoLfQE3L80QZbRyciy+e+frPqW1aJYjXjF+WRxdiSHDO4PjHN0xHFKejx7+Dw9xg9+zkAfPQFiyDMOU6Cy3zRBITD09tKVZyxttvhJbjUUqxGvcT6hq6z09BIYsow05SQtvfwm7TBwkbW+qwz00YHjFMP83k5gMAGB4d5QSAbLNcgBqyEgViPe5HwDhK6FEgYy6Jxw0uEkLe9/c3DI1me//nr/yVLf2MLeE8CACVi6FH79srG02YLcasgrYjXiLc4nLJQwYMxvXz4G7g6EdE446djdhhsO6f/ZwrePewKyDiZADPdqLU7lVkNeI1Yj3sX5hP9YmAXDj9KjuW8bG1euLR40gTxjaShc3GsYuFtrQW415DViNeK/cL4BQlkxAQbE0GXMwm6jJ2Dp44nfff/4T671+zu/+MPKc07lVkPeJFYj/ifnE15ZmBlZ3mpx5quZkd5e7tZanMoBqyFvEasR7+N8MhUOBuAbbcg5JVRusvaArq9K3K9ZLfIuYjXiAzifLM6O3NtsQQ7CnVlWNiHnlEBuNeRdxGrEh3E+gdxqCDifQG415H3EasR5EqsR50msRpwnsRpxnsRqxHkSqxHnSaxGnKd/A7bIPtFpchVgAAAAAElFTkSuQmCC"},{"name":"Grimy lantadyme","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAFAUlEQVRIDbXBf0tc2RnA8e8544/ERCdxdxq23V1krXOvdQnB8Lgiw6MMMiLSEOgb6EvrC2jZoIg4iOhBJPGQEJYmca7dIkoD3cludEyaGWfm3s4MazEku0n/8PMxKiH/J+cjlSwfx6iEmzu7nJmeCPlVzkfkbrH1WCXLRzAq4ebOrjGGMyoBv8D5iJnbxOAeQqIS8CFGJdzc2TXGqAS8w/lIJcsZ5yNmbucrB+tXv8Q9VMnyIUYl3NzZpWN6IuQc5yOmbrL9nUqWDucj8jJ7tL828CUbDyFRCZyPVLK8zflIJQsYlRBwvgQkSTI9EXLG+YiZ27yu4p8AKlnnI/Iye7S/dm2IdQ8JmIJkir6skqXD+YiW3C22HqtkjUrImc2dXWOMSkCH8xF5oVGnUh1/8/xRqUJLXgon+8X0MGv3AZWs8xEkKgHgfMR4yKUeLvWy7iExKuHmzu70RAhs7uwaY1QC5yOVrPMRhUkaTaq1b472H/R/MfWfw+30V4Xav4rXhynepzBJ8b5Klg7nI26N0NuTr/+wnhlhdRsSoxICmzu7wPRE6HwJzHgw8KhUUck6H1GY5LSZ+7EEbKW/0lf/vNTdW0wP01KtsvUYEpXA+YiW8VDj5+7G1/T0sLQBiVEJ6XC+BKgEzkcFyRjL6oOyStb5aE4yq/1DNGJaLIXXB8X0MMcn+CdM3WT7O1rGQx7tImNz9ofV34yy5CBRCYxKyDucj2hLwMxJZrV/iJY4ps0WXu8by2p6mBZjZ/79942+IepNyi/zg/X1z0ZZdrQlKoFRCQHnI85RyTofQQIGKEim2D9Ex+zJvgVjsbByY4zFjZlbAxt9QzSbM7XDK329y/0jJLQVt1WyRiV0PmJ2ktMqjZj66fjL54/+UUHG8E/IC10pjMVamg3iZuF4n47i4Aj1eq5c2ro+opW9Lujt7V35NADLsqMtUQmMSgg4HzE3RQLVGrWqHB36yzdoebz3zR8GPv+019juv/b/ntPG3NEeMavpYSzE6Iun7trIbOUglaKnm6VPxlja4GeJSmBUQjqcj5jP0RLH1Gq8qUOTozdcuywnh/5p5W4uc+/6KI14/qfSymBArUYc5ysHNkW3pSvF0iejNGLimCQuvPy+6MsqWaMScsb56E4uAyQxS/0j1Ouc1qnVc9XD2il+4AvS/VhLytKMOa0BhdcHBrq66ba0NGOWtsv8LFEJjErIOc5HtMxOkrJ0WRoxzZjTur7cazTpu9S7dvV3XLlKHFOvA3Mn+9bSlSJluXd9lBiWHSSASgAYlZC3OV8CQ8tCDizE1GMadRpx/tVBtVrb/vzrP77aW+obXjj5PoauFMaymB69c/xscasMiUrAGaMS8g7nIxYUS8vd42fAvf6ARky9PvNTaWMw4MrlhR+fpSxJjLFYuLdVpi1RCTjHqIS8j/MR/zOfo8VCDPXGzIunG5/dvHtSAmJYTI/ePX5mLN+6MiQqAecYlZBf4HwJDLOTWMBiwFosCy9KqW4WB8f+VHnyt43yn+d/+5eV57QlKgFvMyohv8r5iDMLU5nl7TIdC1OZni6+dWXaEkAl4B1GJeRDnI8kGLApHjytQEKbYXaStfu0LCjLTiXL+xiVkI/gfHQnl1ncKkMChvkcK1uQ0GYgUQl4H6MS8nGcjyBRCQDnI0hUAj7EqIRcJKMScpGMSshFMiohF8mohFwkoxJykYxKyEX6L/yUNdH4NqT/AAAAAElFTkSuQmCC"},{"name":"Grimy lantadyme","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAE/0lEQVRIDbXB8Uvc5x3A8ffz3FkzU6NJd+2y0hBmve83dSsh5aMi8lFEPGQYKoX9Bfuz+g9sLESUICdFzgeR6kOLDJLcfYPjSJhjcU2iV1vP7/l9dkothqRNfvH1Miox58moxCsbVU6NDcb8KucT9CZuU6XIWzAq8cpG1RjDKZWIX+B8wsRnZFD5BoJKxJsYlXhlo2qMUYl4hfOJSpFTzidMyGSj/tXFa1S+USnyJkYlXtmocmJsMOYM5xNGb7K6qVLkhPMJkzK1W1/qvs6yh6ASOZ+oFHmZ84lKETAqMeB8DQghjA3GnHI+Yfwzfjxg/T6gUnQ+YXJ4andrqec6X3kIYEpDhfL6jkqRE84ntOlN3KZK0ajEnFrZqBpjVCJOOJ8wOUwrZW9f9rd9bY+2SSk16uWePpa+BlSKzicQVCLA+QQZoDNHVxdLX0MwKvHKRnVsMAZWNqrGGJXI+USl6HxCaYSjjIODkd1/rXVdH/2hvnq5v9R8XO7tp7xGaYTymkqRE84n3IrpyE1lT5fej7i3CsGoxMDKRhUYG4ydr4GR6JKv7akUnU8ojZCm+qwGuEt/GP/+350dlHv7CHBwgNuEoBI5n9AmA+Ppk8rVT+nMM1eBYFRiTjhfA1Qi55PSUMHC4vqOStH5ZHqosNjdRyulzdrSfr3c08dug/X7jH7K6j9puxXzbZWhgWmeLn4wwHwFgkpkVGJe4XzCsQBmeqiw2H2dtoxjllKjbnMsdvfTZu3Ef2vLXR/STHn+fOpyunT1BvOOY0ElMiox4HzCGSpF5xMIYIDSUKHc00d2BEzt1o3F5rBw7/0B5ioTtwrLXR+SZuPpf7q7WOjupy2D8ppK0ajEzidMDXOYcpiSHt3ae/JtbY+hAdbvMzlMzmIt1tJqEbLS7hZgYfG3EWlLnz5wvf3je4/z0HmBe+/doG3BcSyoREYlBpxPmB4ly2g2+fFAGk/8Ox9Ajs3q0CeXPvrduznL37qKHLWmn9c4YrG3n7aQjT99ULkSTTXqOUtnJ3NXBpir8JOgEhmVmBPOJ8woGWQZzSYHTY6g8T3d7w416usP9ma1cLd3gJDNfPdw4XJEs0nGZKOeg3wHOcv8lQFCRisjy0ovHpXXd1SKRiXmlPPJrBYCkDHXE9FscpjSTLX5pHnIevdH9HSTs1hLK6PZxNrSft1CvoO8pS3AnNvhJ0ElMioxZzif0DY1TC5P3pJlpC0OU33xKDui60Ln0m+u0XORVkbahNx0Yyufw1g68ty5NEDIWHAQAJUIMCoxL3O+Boa2GcVAgFaLNKOVTu4//uGgufb7P36+/2juYv/M/iMyjCVnudt7Y/bFw7tuB4JKxCmjEvMK5xNuK1gsX7xIgDvdH9NqkWYTz7aWr/TRdWHm2f2cJcuwlpztuFPZ5lhQiTjDqMS8jvMJP5tRftY8nPjf1vLV6Iv9WpYRYK7nxuzuQ2s77lS2IahEnGFUYn6B8zUwTA1jLBasBYtl5ruHuTxz7/3pL7vVvy9v/3Xm2pcLjzkWVCJeZlRifpXzCadujxbmV3c4cXu08E6+4x+VbY4FQCXiFUYl5k2cT+STSxbWH+xB4JihNEJ5jbbbyrxTKfI6RiXmLTifzGrhrtuBAIY/j3JvFQLHDASViNcxKjFvx/kEgkoEOJ9AUIl4E6MSc56MSsx5Miox58moxJwnoxJznoxKzHkyKjHn6f8VizfRgxSdlQAAAABJRU5ErkJggg=="},{"name":"Grimy lantadyme","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAEvklEQVRIDbXB/0td5x3A8ffz3GvNTG806W67rDSEOc856d1KSPmgiHwQES8yDJPC/oL9WfsHNhYiSpArRS4PIpWHFhnki09wXBLmWFyT6K2tx3M9Z1dpSiRxsT/4ehmVhJ/J+aAScTZGJeHncD6gN3HrKhFnYFQSzsz5wMTn5ND8GgqVmHcxKgmncz6oRLzifGBCJtutLy9eo/m1SsS7GJWEUzgfGLvJyrpKxDHnA5MytdNaqlxn2UOhEjsfVCJOcj6oRIBRSTiF84Hxz/lhn7X7gErkfGByZGpnc6n/Ol96KMDUh6uNtW2ViGPOB7r0Jm5dJTIqCadwPjA5Qidjd0/2tvzGLl2TUm+3Gv2DLH0FqETOByhUYsD5gNToLdHXx9JXUBiVhDc4H1Qi5wP1UQ5z9vdHd/652nd97PvWyuWhevqkMTBEY5X6KI1VlYhjzgduJfSUpvJnSx/G3FuBwqgknOR8kPiS39hViZwP1EfJMn2+AbhLvxn/7l+9PTQGBilgfx+3DoVK7HygS2rj2dPm1c/oLTPXhMKoJJzkfKgPVy0srm2rRM6H6eHqYmWQTkaXtfW9VqN/kJ02a/cZ+4yVf9B1K+GbRwzXpnm2+FGN+SYUKrFRSXiD84EjBZjp4epi5TpdOUcs9XbLllisDNFl7cR/Npb7PibNePFi6nK2dPUG844jhUpsVBLA+cBrVCLnAxRggPpwtdE/SH4ITO20jMWWsHDvwxpzzYlb1eW+j8ny8ezflT4WKkN05dBYVYmMSuJ8YGqEg4yDjOzw1u7TbzZ2Ga6xdp/JEUoWa7GWTocir+9sAhYWfxmTdfTZAzcwNL77pAy9F7j3wQ26FhxHCpXYqCSA84HpMfKcNOWHfWk/9e99BCXWHw1/eumTX71fsvy1L+KwM/1ig0MWB4boKvLxZw+aV+Kpdqtk6e1l7kqNuSY/KlRio5JwzPnAjJJDnpOm7KccQvs7Ku8Pt1trD3ZntXp3oEaRz3z7cOFyTJqSM9lulaDcQ8kyf6VGkdPJyfP6y8eNtW2VyKgkvOJ8mNVqAeTM9cekKQcZaabp0/SAtcon9FcoWaylk5OmWFvfa1ko91C2dBUw57b5UaESG5WE1zgf6JoaoVSmbMlzsg4Hmb58nB/Sd6F36RfX6L9IJydLoTTd3iyXMJaeMncu1ShyFhwUgEoMGJWEk5zfAEPXjGKggE6HLKeTTe49+X4/Xf317/6493ju4tDM3mNyjKVkuTtwY/blw7tuGwqVmFeMSsIbnA/cVrBYvngZgDuV39LpkOUTzzeXrwzSd2Hm+f2SJc+xlpLtudPc4kihEvMao5LwNs4HfjKj/CQ9mPjv5vLV+Iu9jTyngLn+G7M7D63tudPcgkIl5jVGJeEUzm+AYWoEY7FgLVgsM98+LJWZ++D3f9p59LflrT/PXPvLwhOOFCoxJxmVhP/L+cArt8eq8yvbHLs9Vn2v3PP35hZHCkAl5g1GJeFdnA/y6SULaw92oeCIoT5KY5Wu28q8U4l4G6OScAbOh1mt3nXbUIDhD2PcW4GCIwYKlZi3MSoJZ+N8gEIlBpwPUKjEvItRSThPRiXhPBmVhPNkVBLOk1FJOE9GJeE8GZWE8/Q/sHwZ0dQgvb4AAAAASUVORK5CYII="},{"name":"Grimy dwarf weed","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAEu0lEQVRIDbXB4Utb6x3A8e/viWnUqveswwXGXuccBoUi/BQk/CwSvMi4sv0D++P2fqxULsUQpHkQwTxQCoMRD3s9OMuLnWtvbYzxOUtsHS3t1u6Fn4+YZvyffMhNW3wbMc2A/mC4s5lxpz8Y7mxmfIkPOVuRM2fa4huIadYfDAERMU2B/mC4s5n1B8OdzYxP+ZCzHbmBMweVacrXiGkG9AdDETFN+4Phzmbmw7lp2h8MRZxpizs+5GzH3XFyXC85c6YtvkZMM6A/GIqIadofDEXENAX6g6GIgJi2uOVDTjvuXibHiyWnDirT1IfctMWnfMhNW4CYZkB/MBQR07Q/GIqIaQr0B0MR4UnFaweYtnzIacfOZdJbLjlxUIHs6Xo3jExb3PIhZ2YrcuZMW2KaAf3BUERM0/5gKCKmKdAfDEWErYpLNibJq/MLZtqxc9nsrRR4B5i2fMihMk0BH3IeRxahAScOKjHNgP5gKCKmKdAfDEVcVUURBxXtiiu23iZni+X2ODldLfdis7tU4B0W8c60xS0fcn4becCuS46TkmMHlZhm/cGQWzubGeBDXlVRxEEFgkWmtN8kwMliaeNkcbHRXSqYuYIzB5Vp6kPOzOPYJjn5ZckD6DqoxDQDfDjnlmnqQ97ZWO+9+ieIacuHfE/Xu42Ca+ZqdMbN3krBBbx2aCQ4Zh5H/up4Evfqze4vCroOKtNUTDM+40POXAWyp+vdRsFM5L2966bA0VLBjONpmbysl1xDye6j5PhRSc8xV5mmYpoBPuR8xLTlQw4VCNDZWOstl9zqXCau1hDAcZQUHLmnT9Ze1ktusJg8bDReLBW899KZtsQ08yHHIldwDZEnPyev/37Bk8hrRzviwIGDKUT2rprxBleju1owof1TcrJa2pvE1WjUG0ffFcz0HHOVaSqmGeBDztPIzAQu2XiXvKqVzPzNabr2m2bDOf78oGDK92+aFXSXCm7ZvxK/WnbGias1GnUOVwq6jg8q01RMM275kNOJRIgwgTFzF7CGvk3C+cVBe/35csGU/bfNFw8LJhDZHScOavXGQo0fVwoiTCGy967ZDSPTlphm3PEhP9heryDCj4sFE7iCa7ZvkusJYalkDRw4iDBhpjNOXK1Rc9TrzFSRw9MRH1SmqZhmfMSHnBmLOFiACFO4on2ZXN+wukivXvIQIkyZ2btq1hyuRs3xfLkgQs9BBZimgJhmfMqHcxBmOpH3pjCFa3avk7djzn5V/jBpHi4U+1dNwIGrcbhc/HDZPDwdQWWackdMMz7jQ04n4pj5/WUTeLZYMIUp9nPiV0qW2f+puVAj3uBqiOP5yYi5yjTlI2Ka8SU+5PzHbsTxwYSnF8nLR+XBpAlUkcPl4mDcdPDsZASVacpHxDTjv/DhHASLzDhwzDn23zQXahyuFn941/yLH/3x+1//6egfzFWmKZ8S04z/yYecO/tb6y/ORtz63dZ6vc6zkxFzFWCa8hkxzfgaH/KNdK0G4fwCKuYEi3jHTCfSc6YtvkRMM76BD/nB9vrz0xFUIOxGjh1UzAlUpilfIqYZ38aHHCrTFPAhh8o05WvENOM+iWnGfRLTjPskphn3SUwz7pOYZtwnMc24T/8GAOsL0XHjb5QAAAAASUVORK5CYII="},{"name":"Grimy torstol","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAE20lEQVRIDbXB3Wsc1xnA4d971uq6mCqT1JuJZBc3bdiZyyB4ZRDilRFCRhiJhIRe9o/rnYOLjYQxWoTxDsLgPWB6uRp6kbb+6GgNGasNliXvOR2JqNjYqd0LPY+Y5vyfCl+advkwYpoD/cFwYTbnRH8wXJjNeZfClywFtpxplw8gpnl/MARExDQD+oPhwmzeHwwXZnPeVPiSq4EIPQfRNON9xDQH+oOhiJhm/cFwYTYv/I5p1h8MRZxplxOFL7kaFkfJ3fM1PWfa5X3ENAf6g6GImGb9wVBETDOgPxiKCIhpl2OFL1kJi1Vyt1Oz6SCaZoUvTbu8qfClaRcQ0xzoD4YiYpr1B0MRMc2A/mAoIsxHth1g2i18ybWw9DTZmqq57SCCLGun50emXY4VvqSxFNhypl0xzYH+YCgipll/MBQR0wzoD4YiwnLkOTN18nBnj8ZKWKrSrQsVGw4w7Ra+hGiaAYUvmQv8As7BbQdRTHOgPxiKiGkG9AdDERdjEHEQuRb5kcu7yYPz9dyz5P50vfw87U1VrDvWAuvOtMuxwpdo4Jcs/ju5e6nmpoMopnl/MOTYwmwOFL6MMYg4iCCsBQ6Zf5QA253aRsnZs+3eZxWNF7DlIJpmhS9pzIX5fyXbv69pw3UHUUxzoPA7HDPNCl8uzXS2Hu6CmHYLXy5rp/dpxSFHhKVRunWh4gfYdlwJ3HM0LgceOCwsv0h7n1d85yCaZmKa85bClxyJIMva6Z2vaASOOJafpQKbUxUNx5Xvk3tJzSsYsXguufu7mhuOI9E0E9McKHzJa0y7hS8hggBLM5NbUzWBxlKVuFZbAMfmbyuuuytfTt77pOYVtpeca7fvTFU0Aqw7066Y5oUvWQ28hAM44Mvd5C9/3WM+sO24FmhBCxwcwpjl3TSMcS16FysOmP97sj1d25PEtWhPtDcvVTRuOI5E00xMc6DwJV8FAuzDPjNV8nCypuGdZpMX07Zz/PnTikOuPkoj9KYqGhH7Pimm66VR4lrt9gQbv6m47vhJNM3ENOdY4Uu+CTTG8AJeQoAf4GO0SvzO3tp8Z326YszKo/TOdMU+jcUqcdCaaJ9pcftixRgCjFl+mvb8yLQrpjknCl+uzXUiBLidVuzDIewz9zw5PMCnNR9BCwTG8JLG0ihxrXbLMTFBIwY27o/4STTNxDTnNYUvaawGzkALxvAKXjL/NDkc86uzbH1S8xEEOKCxvJu2HK5Fy7E+XRHghoMImGaAmOa8qfA7IDS+DTgI8AoO4ZDFZ8mP+zz4ol59lm78ulrZTQEHrsXGdLX6JN24P4JomnFCTHPeUviSbwMOhK8ep8CtzypewSH2OCku1Jxj5W/pmRZhjGshjvXtEUeiacZrxDTnXQpf8l/fBBoCEQ648o/k3uf12igFYmBjulr7Z+rg1vYIomnGa8Q052cUfgeE1YCAAwFHY+VReqbFxqXq68fpzWL0x6vTf9p8wpFomvEmMc35nwpfcmLlcufOgxHHrl3uTExwa3vEkQiYZrxFTHPep/DlTDbZAr+zB5Ejwmpgw9H4Q+A7Z9rlXcQ05wMUvlyb66zfH0EE4evATQeRIwLRNONdxDTnwxS+hGiaAYUvIZpmvI+Y5pwmMc05TWKac5rENOc0iWnOaRLTnNMkpjmn6T+WiBPRPbP1GwAAAABJRU5ErkJggg=="},{"name":"Grimy torstol","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAEw0lEQVRIDbXB70tcVxrA8e85o7HbLOGyZHJjbbfd7e69h75aAo+BII8iMhIk4rKlfbt/Wl+1ZGmJKCE4hKAHEeKBvCzOZRc22Vi9mZQO9peOeu7OTGMxJG3SF34+RsXxG/lQqGS8HqPigLXNLQYmxx2/yoeCRqRpVTJeg1Fxa5tbk+POhxZQVdXkuOMX+FBwPRJhxUKlkvMqRsUBPrRUcmBtc8sYo5Iz4EOhknHCh4K5OL2T3quXrFiVjFcxKo4Ta5tbk+POh5ZKDvhQMBO5a1UyBnwomIszO+nd0ZLbFiqV3IdCJeN5PhQqGWBUHANrm1uT486HlkrOgA8F1yPfg7eASuZDwY04s53eHStZtlCBaUi9GdoqGQM+FPQ0Ik2rkhkVB6xtbk2OOx9aKjknfCi4EenCt1z5OnnQ2qNnLjaepM3RkiULqGQ+FFCp5IAPBRORc3Aeli1URsWtbW5NjjsfWio5Az4UKpkPBQuRY/ieq7vJ/Uuda18nG6Odxjdpc6xk0bIQWbQqGQM+FFyN/I7pvfTen0q+sFAZFbe2ucUpxtgr+YUHrT2VzIeChcghE48SYD3t6NPkjeGR5lhJzw/QtFCp5D4U9ExE/S7x73c4B59ZqIyKA3xocUpDLhnLyv22SuZDMSv1lcslXfosjadpc7SkA94yHbln6bkW2bBonD1IV/5c8pmFSiU3Ko4X+FDQV4GZlfrKpZKeSJ+l8SQ1lpXRkp4aU/9JVv/QoQttps+n9/5actPSV6nkRsUBPhScopL5UEAFBmhIvXm5JIJlZje1YCwW7rxf8qmd+tuF1YsdjpjqJOffHLmdlvzkllXJjIrzoWA+cgCH0OXKbvLg33toxFtuRGpQAwNHEGnspAw0/1jSZeK/yfrbHd1JhmBkZOTOuyUGblr6KpXcqDjAh4K/R3r24UdkJwlJh5779uoHF96+OGLs8Oejj+ky+zglsjJW0hPRR4kf7cyUaa3GuWGW3yv51PJMpZIbFceADwUfRSJU8AP8SF8HEuRJEr7cW5ioL46VVFx/mN55p+QAItM7qa0xbBmqsfxuyTEcwzGN7bQZ2iqZUXGc8KGYn6gDVWT5rZIDOIB9Jr5JDrqEtEMCNajBMezT03iaGhgaZtjScxxZ3mjzTKWSGxXHKT4U9MxHhqEGx3AIB+hXydExb74xcvdiSQLH0KVndje1lqEaNcviWEkF/7JQASo5YFQcz/OhBYaejyIGKjiEI+gy3U739w828s6NMl2+VM7tpBGGahjL0lg5v50urbehUsk5YVQcL/Ch4OOIpWdhOwUWL5ccwhFT/0tW3+nwe+YepjVLFTEWC4vrbfoqlZxTjIrjZXwo+NmHEcsz+0w9Slb/0lnYTYEIS2PlwnZqLLd8GyqVnFOMiuMX+NACw3zEggELBixzD9PaMEvvlf94nH6x2v7n9bc+ufMVfZVKzvOMiuNX+VBwYu5a/fZGm4G5a/VzQ9zybfoqQCXnBUbF8So+FJJfsDXuf7kHFX2GhciipefjyE2rkvEyRsXxGnwo5ifqS+ttqMDwYeRzCxV9BiqVnJcxKo7X40MBlUoO+FBApZLzKkbFcZaMiuMsGRXHWTIqjrNkVBxnyag4zpJRcZyl/wOmVg3RgAmHWwAAAABJRU5ErkJggg=="},{"name":"Magic logs","base64":"data:image/png;base64,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"},{"name":"Banite stone spirit","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAFB0lEQVRIDbXBwWsc1x0H8O/vvZ2Rk8Myh8i5mDRFZufRhkIPP10CP1lioRiqUkiISomCL6WkFEJMQ2gJbUmTHEop9B/wWdeeTCMC3SdjonmSZR1KdydVcx7GlKVG8u7MvpnaQ5dKSLvypZ8PCRs8N+tSNIQ7eD4kbAD0kv7KsgHQS/qYWlk2mLIuBfDR7ffQ+OSPfwIg3MFlSNj0kj4AIhKOe0mfiDAlHAOwLv3o9ns4K2gFv/n9H4Q7mIuEDYBe0ici4biX9IlIOMYp1qW/+Pm73/32a1euXAmCQGtdluXgn//48LefALVwjNlI2ADoJX0iEo57SR+NlWWDKevS2z/76eLiS2EraLVaSlFZTsZF8cuPPwVq4RizkbAB0Ev6RCQcA7BuAKCu65Vlg4Z16fvv/uTqS4vBMy0iVZRFUZS/+t1nQC0cYzYSNgB6SZ+IhGNM9ZI+EQnHAKxLN374g++89q2goUgVZfHBrz8GauEYc5GwAdBL+kQkHPeS/sqyAdBL+kQkHKNhXbqx8U4YBt77ohjt7HyRZTlQC8eYi4RNL+mjsbJsAPSSPoCVZWPdQDhGw7p0Y+PtMFzw3o/Ho3v3vsiyHKiFY8xFwgaAdQM0hGMA1g0ACMeYsi7d2Hg7DBe890VR7OxsZ1kO1MIx5iJhg8tYlwLVW2+902qFdT3x3g+H//r887tALRxjLhI2uIx16Rtv/KjVCrVW3lfeT46Pj+/e/TNQC8eYi4QNLmNd+uabPw6CgIi8n3hfTSbFo0eP7t37q3AHc5GwwVzWpVHU7nbXg6AFwHtfVZX35cnJye5uMhzmwh3MRsIGs1mXRlF7dfVmELSINIC6rp7y3hfFaG/vfpblQC0cYwYSNpjNujSK2t3u97VWDx8eAFprBcD7Ko47o9Hx4eFeluXCHcxAwgYzWJdGUbvbXQ8C/eDBQ60DrRWmvK+Wlq6Nx5Mk2RkO/y3cwUVI2OAc61IAUdTudteDoOXcQRgGWitAaw1AAZX38L5cWnqlKIrd3WQ4zIU7OIeEDc6yLgWqKIq63fUgaBHR/v7DMNRAoLXCKd5X169/YzIpi2K8u5sMh7lwB2eRsMEp1qVAO4rQ7a7rZ9T9++7FFwOtA601oAClFJ6qqgqolpZe9X5SluV4PNrbezAc5sIdnELCBqdYl0ZR+8aN74Xhgm58+eVuGF7RWmkdAFBKoVFVAKpO55tlWUwmk/G4ODxMAGRZLtzBFAkbTFmXRlEbwOrqzTBcUIqItNZqf/9Aa6W1BtRTaFRVBVTXr7/qvZ9MfFGMHz9+fHT09yzLgVo4RoOEDaasS6OoDWB19WYQBFprItJaJ4kLwwWtNaAAhf+qvC87nSXvJ9778Xh0cvLkq6/+lmU5UAvHaJCwwZR1aRS1AYh0w/AFrbVSdPXqVQDb29taB1prQOGZyvtyba0L4Ouvj7wvnzwZjUbHR0eDLMuBWjhGg4QNTrEujaL266/fCMMXrl17BYBSABSA7e2/AFprBWBtbQ1nHRzsDwaHWZYDtXCMKRI2OMu6NIoWNzdvoaEUGgqX2dq6k2U5UAvHmCJhg7OsS6OoDSxsbt5CQykACnNtbd3JshyohWOcQsIG51iXAoiixc3NW2goBUDhIltbdwBkWQ7UwjHOImGDi1g3AAiNl19exEWyLMf/1MIxziFhg9msG+AZwsVqTAnHuAgJGzwH6wY4RzjGZUjY4P/pP0a8M5+VwVDxAAAAAElFTkSuQmCC"},{"name":"Light animica stone spirit","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAFF0lEQVRIDbXBz28c5RkH8O8z78ys1ySrcRo7ASHopTuvAkLq4fEF6XGMVlQghVYiwqWJUYCElIAUkfJDIEQroKiqqiL6B+Tsa0+RqJDqsS/ecYt8QPUONVy4DBPQQurNzuy8M5AVq3rl3XUufD4krHHbgjBCn3Adt4eE9WpzGwML8xqjBGEE4M0rl9H37l8/ACBcx0FIWK82t4kIA8I+hgVh9OaVyxjm2M7v//wX4TomImG92twmImEfYwRh9PKLz//8vvunpqYcx1FK9Xq91mf/fe0P7wKlsI/xSFivNrfRtzCvMUoQRlcuXZydPerajm3blkW9Xp5m2etv/xEohX2MR8IaQBC2AJRluTCvsU8QRi89f2Hu6Kxzi01kZb0sy3pvvPMeUAr7GI+ENQZWm9tEJOxjWBBGS7967IH7Tzh9FllZL3vlrbeBUtjHRCSsV5vbC/MawGpzm4iEfewThNHS0lOu6xhjsqy7tvZRHCdAKexjIhLWAFab2wAW5nUQtoR97BOE0dLSWdetGGPStLu+/lEcJ0Ap7GMiEtboC8IWAGEfowRhtLR01nUrxpgsy9bW/hHHCVAK+5iIhDUOEoQRUDzxxFO27ZZlboxpt7/+8MNrQCnsYyIS1jhIEEaPP/5r23aVsowpjMl3d3evXfs7UAr7mIiENQ4ShNHp079xHIeIjMmNKfI8u379+vr6P4XrmIiENSYKwsjzao3GKcexAZiiLExuTK/T6WxsNNvtRLiO8UhYY7wgjDyvtrj4qOPaZCmQAgpjcpPnWTfd3FyP4wQohX2MQcIa4wVh5B27q7HwkKpUkiefdmaOWJUqCmM6nan33+nu/m9razOOE+E6xiBhjTGCMPKO3dU4+ZBTrX719AuVueNq+g6ybcuholfm336D1y6l3bTZXGu3vxWuYxQS1tgnCCMAnldrPHzKqVSTZy5V547b3oyahmUTKaCA6SL7+kb5u4tZlm5sNNvtRLiOfUhYY1gQRkDheV7j4ccc21bT1a8uvVqZOWLXXFWFUoQ+Y2A6pfnts3nazbJ0Y6PZbifCdQwjYY09gjACap6HRuOU+p7rfPHLpcP+iam5n9iHoGxYIPQVQJ6iuHA+T9NeL0vT7ubmv9vtRLiOPUhYY48gjDyvdvLkL1y3omylbOeL02cO/+yEe7RmH4KyoEDoK4FegfKZi71uJ8/zNM22tpoA4jgRrmOAhDUGgjDyvBqAxcVHXLdiWUS2o6aq7Zded4/M2IehbFK4pQQKIE9RXDhvsjTPTZalN27c2Nn5TxwnQCnso4+ENQaCMPK8GoDFxUccx1FKkVLKcb987vL0vT91DkFVSOEHBrgZ5+rKcybPjDFp2u10bn766SdxnAClsI8+EtYYCMLI82oARBquW1VKWcqamz0O247OPjt9/E51CMrF94oe0iS9929/QlF8/vmOMb2bN7vd7u7OTiuOE6AU9tFHwhp7BGHkebUHHzzputW7774HgGUBpGBZ0ZnzlZkjUIqUuuf991AYFAUGPv74X63WVhwnQCnsY4CENYYFYeR5s8vL59BnWbiFFEAg/KAogRLDVlauxnEClMI+BkhYY1gQRp5XAyrLy+fQZ1kALEy0snI1jhOgFPaxBwlr7BOEEQDPm11ePoc+ywJgYZSVlasA4jgBSmEfw0hYY5QgbAGEvmPHZjFKHCf4v1LYxz4krDFeELZwC2G0EgPCPkYhYY3bEIQt7CPs4yAkrPFj+g7QwCuf1CUcbwAAAABJRU5ErkJggg=="},{"name":"Dark animica stone spirit","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAFC0lEQVRIDbXB4WskZx0H8O/vmXlmN71jnWqTVgiFe7PzoKci+Mubwi8XWJR7ERFaGpGm3BuRilA8FFGKSq2+EBH8B+6VSHxXfXNQKZjJeZCdaBtEb3dq7CuFYc6yXi7J7sw889hbWJqw2c298fMhYYPHFicpxoTbeDwkbLa7PUysrhicJ05SAK/dfBVjb/zyVwCE27gICZvtbo+IMCEc4aw4SV+7+SrO0r7+0c9/IdzGXCRstrs9IhKOMEOcpN/51iuf//TVZrOptfY8ryzL/j//8b0fvwE44QizkbDZ7vYwtrpicJ44SW9+8xuLi08FvvZ9Xykqy2pUFN9//aeAE44wGwkbAHHSB+CcW10xmBIn6bdf+frSU4v6EZ9IFWVRFOUPfvIzwAlHmI2EDSa2uz0iEo5wVpykG1/58mevfkqPKVJFWXz3h68DTjjCXCRstru91RUDYLvbIyLhCFPiJN3YeDkItLW2KIY7O29nWQ444QhzkbABsN3tAVhdMXHSF44wJU7SjY2XgqBhrR2NhnfuvJ1lOeCEI8xFwgZjcdIHIBzhPHGSbmy8FAQNa21RFDs7f8iyHHDCEeYiYYOLxEkK1C+++LLvB85V1trB4IO33roNOOEIc5GwwUXiJH3++a/6fuB5ytra2uro6Oj27d8BTjjCXCRscJE4SV944WtaayKytrK2rqri/v37d+78UbiNuUjYYK44ScOw1emsa+0DsNbVdWVteXx8vLvbHQxy4TZmI2GD2eIkDcPW2tp1rTWRp4DawdaVtVVRDPf27mZZDjjhCDOQsMFscZKG4WKn80XP8x/2TaAvazRq1JUd1st/Gg4f7u/vZVku3MYMJGwwQ5ykYdjqdNa1bpzc+0xDh1o3SXkEz8FW5dHDpd+PRkW3uzMYPBBu4zwkbDAlTlIAYdjqdNa1bhzdu9rUYUNf8lWTlKfg1ajruhiVhw+X3iyK0e5udzDIhduYQsIGZ8VJCtRhGHY661r7nhcM//6FQF9ueJc81fBUADgHV6Oq6uHh4m+LqiiK0e5udzDIhds4i4QNTomTFGiFITqddc/ztOfn7z77sUvLTf1koJpKBZ7ShA+RrW2JoweLW5UtyrIYjYZ7e38ZDHLhNk4hYYNT4iQNw9a1a18Kgob3iP+f/Sut5vKCbmm1oJT2VIAxh6qqi/8+8+uyHFVVNRoV+/tdAFmWC7cxQcIGE3GShmELwNra9SBoKEVEvu/pUW+loVuBWvBUw1cNB+dQ16jKevhg6TfWllVli2J0eHh4cHAvy3LACUcYI2GDiThJw7AFYG3tutba8zwi70PHvc89oZe0esJXgad8jFlUJ8UHx59809rKWjsaDY+PT957729ZlgNOOMIYCRtMxEkahi0AIp0gWPA8TylaWnqGoP5990qz8aSvFjylAbi6GlaDT/BfAff++wfWlicnw+Hw6OCgn2U54IQjjJGwwSlxkoZh67nnrgXBwvLyswCUAqAA+tfdK019maAI6uP8roMDHCbeeefP/f5+luWAE44wQcIGZ8VJGoaLm5s3MKYUxhRA+IjDlK2tW1mWA044wgQJG5wVJ2kYtoDG5uYNjCkFQGGura1bWZYDTjjCKSRsMCVOUgBhuLi5eQNjSgFQOM/W1i0AWZYDTjjCWSRscJ446QOEsaefXsR5sizHR5xwhCkkbDBbnPTxCOF8DhPCEc5DwgaPIU76mCIc4SIkbPD/9D8kpjqfRdLdwQAAAABJRU5ErkJggg=="},{"name":"Crystal triskelion fragment 1","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAACH0lEQVRIDbXB0akjNxSA4f90oA5CXkZq4OCX4VQkEGQLSQamIjEvw8EFWLCkBXWgvWsyic3du7G56+8T08QriWnilcQ08UpimnglMU28kpgmXklME79C9WY68Y6YJj6tegvL2ks2nbgnpolPq97CsvaSYZhGbohp4tOqt7CsvWQYppEbYpr4tOotLCvQSzaduCGmiSdVbxxMJ66qt7CsvWQYppGDmCaeUb2FbefQ55PpBFRvYVl7yTBMIwcxTTypegPCtnPV55PpVL2FZe0lwzCNHMQ08bzqFxAgbDvQ5xMQlrWXDMM0chDTxMOqNw6mU/ULSNj2Pp+AsKy9ZBimkYOYJh5TvYVt59Dnk+lUvYVt583ZgV4yDNPIQUwTj6newrb3+cQ/Bt9J2HbenL2XDMM0ckNME4+p3sK29/kEgyvTWL2FbefN2XvJMEwjN8Q08ZjqLWw70OcTh7DtvDk70EuGYRq5IaaJh1VvYdt57+y9ZBimkXtimnhG9QaEbeeqz6ewrL1kGKaRd8Q08aTqFxAgLCvQS4ZhGvkRMU3cqN64Mp34QPUGhGUFeskwTCMfENPEoXoLywr0v7/y159cmU5A9ca//vgSfvsd6CXDMI18TEwTN6o3ICwrh14yEJaVe71kGKaRnxLTxL3qFxCuwrJy6CVzZ5hG/o+YJn6k+oXvhP8MbphGHiCmiZ+qfuHKNPI8MU28kpgmXklME6/0Da527oG0TeX5AAAAAElFTkSuQmCC"},{"name":"Crystal triskelion fragment 1","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAACCUlEQVRIDbXBzY3bMBCA0W86UAdBLiIbmIMu09ISLEQQEKShuQgG3YAJbA/qgFGcaCNnf2Jjo/fENHIkMY0cSUwjRxLTyJHENHIkMY0cSUwj/4OXatrziphGPs1LZZzIybTnlphGPs1LZZzICZppYEdMI5/mpTJO5ATNNLAjppFP81IZJ1Y5mfbsiGnkQV4qG9OeKy+VcSInaKaBjZhGHuGldj6zWWww7QEvlXEiJ2imgY2YRh7kpQKdz1wtNpj2XirjRE7QTAMbMY08zssFBOh8BhYbWI0TOUEzDWzENHI3L5WNae/lAtL5vNjAapzICZppYCOmkft4qZ3PbBYbTHsvtfMZWM4nVjlBMw1sxDRyHy+183mxgd8aP0nnM7CcT+QEzTSwI6aR+3ipnc+LDdC4Mg1eauczsJxP5ATNNLAjppH7eKmdz8BiA5vOZ2A5n1jlBM00sCOmkbt5qZ3PvLKcT+QEzTRwS0wjj/BSgc5nrhYbGCdygmYaeEVMIw/ycgFhNU6scoJmGniLmEZ2vFSuTHve4aWyGidWOUEzDbxDTCMbL5VxYvX8zPdvXJn2gJfKi6cnvnxllRM008D7xDSy46WyGide5MRqnPhLTtBMAx8S08gtLxcQfhknXuTEjWYa+BcxjbzFy4WfhD8aO6aBO4hp5ENeLlyZBh4nppEjiWnkSGIaOdIPc2rdgTw2AdIAAAAASUVORK5CYII="},{"name":"Crystal triskelion fragment 2","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAACGElEQVRIDbXBwYkkORBA0R9rgazIlAOBLiIMahLSloS8jDtCF6H7MC0rwgMt3UxDFV1VOyyT74lp5EpiGrmSmEauJKaRK4lp5EpiGrmSmEauJKaRK4lp5EbpAzBd+EvENPKl9BGOE/B9M134G8Q0cqP0EY7T9w2m6cpLpQ/AdOE5MY3cKH2E4/R9g2m6cq/0YbrwqfQRagM8J9OFJ8Q0cqP0EY7Tf5z8/GW68KX0AYTaPCfAdCl9hNoAzwmm6cojYhq5UfoIxwn4vsE0XYHSR6iNG56T6VL6CLUBnpPpwiNiGrlX+gjH6fsG03QtfYTaAM+JT6E2wHMCQm2A5wTTdOUbMY3cK32E4/R9g2m6lj5CbYDnBBMk1OY5wQQJtQGeE0zTlW/ENHKv9BGOE/B9M11KH6E2zwkmHyTU5jnBBAm1AZ4TTNOVb8Q08k3pIxwn4PsGhNo8J5imK1D6gMkHCbV5TjBNVx4R08gjpY9wnIDvW6gN8JwA0wUofQChNsBzgmm68oiYRp4ofYTjBHzfQm188pyAUBufPCeYpitPiGnkudJHOE7A97dQO/c8J5imK8+JaeSl0kc4Tr74/hZq95z4ME1XXhLTyH8pfQDhOLnh+xv8Y7rwkphG/kDp7yB8CcfJJ98304XnxDTyx0p/5zfht2m68pyYRv6X0t8B05WXxDRyJTGNXElMI1cS08iVxDRyJTGNXOlf8JXzgVs6S6cAAAAASUVORK5CYII="},{"name":"Crystal triskelion fragment 3","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAACDklEQVRIDbXB0ankNhSA4f90cKqw9R4OgkWcJhIIpAaDazFxukiaEHoRqmBUhTrw5g4MzDJ3dn0f/H3iFriSuAWuJG6BK4lb4Cty624Tp4lb4I3cOq9+/4P//gXcJk4Qt8Bncut8+6Z//sUbY10At4mfErfAi9y6bjsw1kVL5WGkyJ1uO3djXQC3iTfELfAktw7otvO/34y7kSKgpQIjRThAuNNtB8a6uE18RtwCD7l13XZgrAugpQIjRTj4IFrqSBEOtzm3Gx9Etx0Y6+I28ULcAk9y69xpqcBIEQ4Qtym3rqUCI0W3iYfcum776Df++dtt4kfiFvhRbjcQLRUYKQJa6kgR0FKBkSIcbjMPuXXd9rEucLjNPBG3wIvcupYKjBQBLXWkqKUCI0U43Gae5NZ124GxLm4TT8Qt8JncupY6UoQDREsFRopwuM28yK3rtgNjXdwmHsQt8JncupYKjBTdptw6Hw63mTdy63w43GYexC3wRm5dSwVGim5TbjfAbea93G5uM0/ELfBebl1LBUaK3LlNfIW4BX4qt66l8jBSdJs4TdwCv5Jb11K5GynC4TZzjrgFfiW3rqUCI0U43GZOE7fACbl1LXWkCIfbzGniFjght66ljhThcJs5TdwC5+TW4XCb+QpxC1xJ3AJXErfAlcQtcCVxC1xJ3AJXErfAlcQtcCVxC1xJ3AJX+g6piuGBBExF2gAAAABJRU5ErkJggg=="}],"alchemist":[{"name":"Blank","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAcElEQVRIDbXBQQEAAAABMdoocF/9Y0lhc4meXKInl+jJJXpyiZ5coieX6MklenKJnlyiJ5foySV6comeXKInl+jJJXpyiZ5coieX6MklenKJnlyiJ5foySV6comeXKInl+jJJXpyiZ5coieX6MklehrY9xOB0WoOowAAAABJRU5ErkJggg=="},{"name":"Onyx dust","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAACvElEQVRIDbXBTWskVRSA4fcQamImOGTjhMQmZJO+ZzPDEDnl7tRvv7XzFroMtyoiw5APKi3YCGMrnVCaxqAhadMt9POIm7JJ4qZATLkqFYgp86AqlQcx5apU1iduGlMGRMQtxJRFhAduAYgpV6XGlKtSWZO4KRBTFhG3EFMWEbfAg5hyVWrdtG4hplyVyjrETYGYsoi4hZgyC1WpLMSURcQtADFlEXELrEzcFIgpi4hbAOqmBYZhqEoFYsoi4haAmLKIuAVWJm4KxJRFxC3wIKYsIm4hpiwibgGIKYuIW2Bl4qZATFlE3EJMuSoViCmLiFsAYspVqTHlqtS6ad0CKxM3jSmzUJUKxJSBqtS6ad0CCzHlqtS6ad0C6xA3BeqmZcEtAHXTAm6Bf6mb1i2wJnFTXlI3HQtuY9Ykbspz6qZzGwN104VwAkyn076fuI1Zh7gpT9RNN9o/vOivgBBOXm29Ama/zX78+BMMboGViZvynLrpjkeHt3MODt4WRTGfzz9dX+7t7bXtuduYlYmb8kTddCGc8Je7O9i6u/3jFrhle3e7bc9hAAHcxrxE3JTH6qazDx9Y+Dz7He7uuDedTneKndl81veTEE4+T6cX/cRtzH8SN+WJuumOR0dwy8KXu2+KnS9urm+Ai/4KOH33/vLmuu8nMLgFlhM35Tl10wF7e2+m01+PR0fAbD7bKYrZfP7124ObX36+uLji3uAWWE7clOfUTXf67n1RFMDHy099P9nf/2qnKGbzed9PjkdHwOvd7bP23G3McuKmLFE3HfDt6TfAdz98zz8GkBBOtuCsPYfBLbCEuCnL1U0Lwr2BR+R4dAi83t09a8/dxiwhbspL6qZ1CzxWNx1/G9wCS4ib8n/VTQu4BZYTN2WTxE3ZJHFTNknclE0SN2WTxE3ZJHFTNknclE0SN2WT/gS9xCmQzfSE1QAAAABJRU5ErkJggg=="},{"name":"Onyx bolt tips","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAEPklEQVRIDaXBQY8bxxGA0a/yAwxfhAXWzJpSSHaDwhq5lI6l384+sm8x7AzbOiyEAYHGXIzclK7OhKKzMAmtnJX8nphGnpJyWSxuaW2sk+mGryWmEdjth7dvIo92+0HkL8vFrcM4HmE2DXwVMY27/QCIiGkAdvvh7Zu42w8vXy7dvbVW62S64auIaQR2+0FETMNuP7x9E1M+hNXfhl/evfzrwlsb6wSzaeDLiWkEdvtBREzDbj+ICEhYvRp+eScii8V3rbVaJ9MNz5NyMd1wJqYR2O0HETENu/0gIiAhrIfhICLLxXfe2lgnmE0D/0/K5ebmRa2T6QYQ0wjs9oOImIbdfhARkG1Y/zQcRGS5/N7dW2u1TqYb/lDKZbG4pbWxTjCbBjGNwG4/iIhpAHb74YfX23/89HOM4XAoq+X3Du4+jkeYTQOfl3JZLm4dWmu1TqYbMY27/cDZ2zcRSLnM839+eL398ed/gvC72TQAKRfTDZ9IuayWd34CrbVaJ5jFNAIpHzgzDUDKBWaumQYg5XJz86LWyXTDhZRLWL3q7g7uTmtjnWAW08hTUj6YBq6lXBaLW1ob6wSzaeAs5bIN634C7o67wzgeYRbTyPOkXJbLO9y9tbFOMJsGzlIu27DuJ4CfwTgeYRbTyPOkXFbLOz+B1lqtk+kGSLncb2M/AXrv7g7uTmtjncQ08gwpl7B61d0d3L21VusEs2lIudxvI9B/A+6Ou8M4HsU0ciHlAphuuJBy2YZ1PwF3x91bG+sEs2kAUi6cbcMa6Cf+0cN4FNPIo5TLYnFLa2OdTDc8Srlsw7pD7x0/g3E8wmwaOEv5wEfClVlMI49SLsvFrcM4HmE2DUDK5X4be+9AP3F3cPdxPMJsGriW8oFHpkFMI49SLsvFrQOtjXUy3QApl7/fv+69A/3sgzvu3tpYJ9MNf0hMI2cpl9XyzgF3h9ZarZPpBki5cCGENb1/cH94eA+zaeDzxDRylnJZrV7hZ9Baq3WC2TQAKR/4nfA/s2ngUcrFdMM1MY1AyiWENb13dwfcvbUGtU6mGz6R8gEwDZylXIBvv/3m11//ZbrhgphGIOWyDet+AvgZtNZqnWA2DXxGygVY3LxoUOsEs2nggpjGlMv9NvYToPfu7oC7t9ag1sl0w1NSLsvlHe4OrbVaJ5hNAxfENKZc7rcR6EDvHei9A+7vHt7DbBq4lnIBVss7B9wdWmu1TjCbBi6IaQRSLjxtNg1cSLkA27DuJ4CfAa2NdYLZNHBBTCNnKR/4hGngQsrlfhs70M8Adwd3p7WxTjCbBi6IaeTZUi732wj0M6C7O+D+MB5hNg1cE9PIl0i5APfb2H/j7oD7w3iE2TRwTUwjXyjlAwiwDet+4h89jEeYTQPXxDTyVVI+gADbsP73hw/vHt7DbBq4JqaRPyHlAwgfzaaBT4hp5E9L+WAaeMp/AXqGAuHVIH1KAAAAAElFTkSuQmCC"},{"name":"Hydrix bolt tips","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAFaklEQVRIDaXBXYhcZxkH8P/jnRQvva4X5rwv0guhPosX+mwaNil12xhi02yaSEuSG62YBlrbFGtTELz2vtQP/Gq1IKgUIUjmJSzDvF1YKejMWxpimt2dOXPmzJ4zX+cr+0oHl86QTd2kvx8Ja+zFWPf+rw9+FGbfeqEuHOB+kbAGUGs0Fxc0dtUaTaLPXX97aSMaf/P7q4AXVrgvJKxrjSYAIhJWAGqN5uKCrjWa4V8f24wmH3UmR1+2wgHuCwlrALVGk4iEVa3RXFzQxrb8e8fx8DsfvLW0EWaP/HAV8MIK946ENYBao0lEwqrWaBIRQP79J/HQ20Rk31i8GY6+88qacID9MdYJB5giYQ2g1mgSkbCqNZpEBJB3J3DgLSL6928fudXNDj9fB7ywwv9jrPvzz/jYJSscACBhDaDWaBKRsKo1mkQEkL+xggd/R0Q33zm8EWU3O5OTP1kTDvCpjHX//NXBTpwduVgHvLAiYQ2g1mgSkbACUGs0MTqLB97Eh6foy38orj4RJXnYz7/6rAG8sMLdGetavz/UibONKD/12ppwQMK61mhianFBAzDWeb+D8Vl64BcA4RNeWAEw1gkHuIOxbnRluZvkYZxtRvmxSxbwJKwBGNvClLACYKwDPOYJKwDGuj/+9OETP14TDjDDWOfXj1dJESV52C87cXbkYh3wJKyxF2NbwgrzjHXrv5SN7mT5RQt4YYUpY53/zwoGFdKin+Td7bITZ/LcKuBJWGN/jHXxu4924nIryg5dWAW8sMKUsc5vnMagwKAYJ1U3ycN+tnD+GuBJWGN/jHXDK8thP2/3slvdyVOvrgkHAIx1fvQshhWGJdKySosoycN+2YmzIxfrJKyxD8Y6v368SopuP2/H+UZ38sRLFvDCyljny3PIbyMtEedIi36Sd7fLTpzJc6skrDHDWAdAOMAMY52/+TTSAknRS/Iwzjd72dKFOuCFFQBjHaZ8+wyyCkkx6k5ubE0e+u5VEtbYZax77w3p9CfLL1rhALuMdX7zNAYF0mK4XYT9fKtXfON71wAvrDBlbAsfI8zxJKyxy1j3r98cDLeLgz9YBbywAmCs89k5DHKkJdKySIrudt7u5V87ZwAvrDDP2BZ2CSsS1thlrLvxp6XudtGJJ4//yAoHAIx1fuc8sh1kFcYVwkncHm/18s1eduT5unCAT0XCGlPGuso8HidllORhv9jqjU9dXhcOABjrMMO3TmBYRe3xF5f/DnhhhbsjYY0pY52vf3uQFr2k7CZFuzc5+pIFvLACYGwLnyD8jxdW2GWsEw4wj4Q1AGOddycxLKpB2UvyKC3DuNiKx6cvrwsHuIOxLQDCClPGOgCvnz3w2psfCAeYQcIagLHO31jBsMKgGAzKKCm721mnlx992QJeWOEujHUArvz86+04O/P6OuCFFWaQsDbW+eQZjCoMCwyrMi3jNI+SMoyLdn/89OV14QB7MdZ1/vJoL8mjpGjH+VOvrgFeWGEGCWtjna/OI6uQ7WBSIbuNcYnJ7Wxcff7Q3wAvrDDPWAdg59rR/iCPkzJKik6cH7tkAS+sMIOENQBjHfbmhRVmGOsA+OsrGBUYVoNBGadllBTdfvHYC3XACyvMIGGNKWNbuIOwwgxjnR+fxajCuMCowqCcDKt4UPS2y26SLV2oA15YYQYJa+ybsc5n55BXSEuMSgyrcljGgzJO8q+cuQp4YYV5JKxxL4x1AHzyDPo5tgs/LPppGaflgZV/AF5YYR4Ja9wjY1sAAfDhGdwapVHWT8svPXkF8MIK80hY474Y2wIIgP/w5PB6+oXD7wJeWGEeCWt8Bsa2AMLHvLDCHUhY4zMztiWssJf/AvtqX+HxQfzSAAAAAElFTkSuQmCC"},{"name":"Alchemist's key","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAC1klEQVRIDbXBsWsbSRTA4d9kJRtDAk4TyBYqXOhNaRZe+/74aadxJZiJChPMgtEVYk+LpHjFHt6LQL6zgyTj73Omno/kTD3vFmLmgOmUPWfqeZ8Qs0jJgZRq0ykDZ+p5hxCzSAkUBRcXo/GYpumAlGrTKeBMPecKMYuUwHb79OXLeDweFcXo0yeWyw2QUm06daaec4WYRUpgt3uazxcMVG+aZgOkVEPvTD3nCjGLlEBKNfT85kRKIKUaemfqOUuIWaRkL6WagUjJIKUaemfqOV2IWaTkbdvt6v6+gd6Zek4RYgZESg5cXPCvohjtdt16/TSfL6A3FWfqOVqIWaTkpaLg4mIE7HYd8OsXKdXQmwrgTD1HCDEDIiUvPBXFeDar+a/eVBg4U8/bQsym0xCzSMmB7XZ1eXlZFOPZrIael0yFPWfqeUOIWaRMqRYpObDdrkajy/l8wbPeVHibM/W8JsRcVZO27Tjw+Li6vmY0upzPF9ADpsIfOVPPa0LMIiUHHh9Xnz/z8NDwrDcVjuBMPS+FmAGRkpfadvXw0EAPmArHcaaeAyFmkZIDbbv69u26adbz+QJ6U+EUztSzF2IWKXlNSjX0psKJnKkHQsyASMnecrn6/v0aWK87BinVplNO5Ex9iFmk5MDV1Wi97lKqVW92u65tOwYp1aZTTuFMfYi5qiZt2zHY7Z6+fr3a7WjbLqUaUL1pmg2DlGrTKUdzph4IMVfVpG07BinVqjfQNU2XUg1U1aQoRovF3/f3C+hNheM4U88gxKw6aZqOQUp1VU2KYvTjx1/LZQPc3k7u7n5CbyoczZl69kLMqjdNs2GQUn17O7m7+wk9zxz0psIpnKnnQIhZ9aZpNgxSqqE3Fc7lTD0vhZiratK2HbBcrh4fG9Mp53Kmnv8JMVfVZLPpZrMH+AS9qXAWZ+p5TYiZ33pT4VzO1POGEBNgKryDM/V8JGfq+Uj/AEi9Yihx1ByAAAAAAElFTkSuQmCC"},{"name":"Marrentill seed","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAADcUlEQVRIDbXBz2ucRRjA8e/M/rCIvPTWiwcPsjMIuRSeHpbytPQivRSkxYL0T7QIBQ8VKWQOgWSgFAqSHXLIIZdFra/vNtlu3rwzmsWAInbfWPL5GBXPVTIqfntv/84tz9UwKn57b98Yo+L4ACEmQGXCPxkVv723b4xRcfxfIaZPXX5bU88toDLhglHx23v7xphSyp1bnssLMX1xuxqMGQw5PaF5Ux/9ZFUmrBkVv723b4wppRhjVByXEWLauleNRgzGdJm8Yrmo6znzQ6syAYyK397b58KdW57eQkw371eDIaMhHVDIHe+OOT2uZ7sWioozKh4IcVZKMcYAKo5+QkzThxUGa8kZCl1L29KueP2igaLijIpnbXtv3xij4riMEJM+rrDkTD6ja2lbcsurHxsoKs6oeC6EOFNxXFKISb+pckc+o2vZfdZwrqg4wKh4PliICZg+rHaeNlAAFceaUfFcRohJZcK/hDgDA0XF8TdGxdNPiAm4fiPXcwuoTOjBqHh6CDG5aR6Prw/GLH+vj2uOZlZlwiZGxdNDiGnrXvXxJ+SOdsVyUR/XHM2syoT3MiqeTUJMN+9X166BpcvQsTphuahnuxaKiuO/GRXPJiGm6VeVHUMhZ7qO9h3titcvGigqjgshJkBlwgWj4ukhxHT3SZU7ckvbkU+J3zdQVBxrISbgxud5fgBYQGUCGBVPPyEm4PbXVW7Z+a6BouJYCzG5aYVlPATLclEvfmN+YFUmRsXTW4gzMJwrKo4LIaatu9XoIxjCGe+WnDR1/Qv1kTUqnssIMUEBVBxrIaabX1YMGY2hkDPdiuMFx3V99JM1Kp5+QkzAjc/y/NACKhPWQkzyoBqNsIZcINN1nLxluagPojUqnh5CTG5aDYb86XRZL35mfmhVJkCI6fajyo4gkwu5o2tpV7x83kAxKp5NQkxb96rBEDuATIa3b+qDaKGoOCDEdPdJlTtyR+7oWnafNVBUnFHxbBJikgeVHTCADiic1Cx+rQ9fW5UJayEm1qaPqp1vGygqDjAqnk1CTNNHleVcLnQt7YqXzxsoKo4LIc44Z6CoONaMimeTEJM+rrCQOTujPaVd8eqHBoqK472MiqeHENPdJ9VZSz5j52nDuaLi2MSoePoJMfGXAqg4ejAqnt5CnAEqjt6MiucqGRXPVfoDnza8KxWfPtwAAAAASUVORK5CYII="},{"name":"Kwuarm seed","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAADcUlEQVRIDbXBz2ucRRjA8e/M/rCIvPTWiwcPsjMIuRSeHpbytPQivRSkxYL0T7QIBQ8VKWQOgWSgFAqSHXLIIZdFra/vNtlu3rwzmsWAInbfWPL5GBXPVTIqfntv/84tz9UwKn57b98Yo+L4ACEmQGXCPxkVv723b4xRcfxfIaZPXX5bU88toDLhglHx23v7xphSyp1bnssLMX1xuxqMGQw5PaF5Ux/9ZFUmrBkVv723b4wppRhjVByXEWLauleNRgzGdJm8Yrmo6znzQ6syAYyK397b58KdW57eQkw371eDIaMhHVDIHe+OOT2uZ7sWioozKh4IcVZKMcYAKo5+QkzThxUGa8kZCl1L29KueP2igaLijIpnbXtv3xij4riMEJM+rrDkTD6ja2lbcsurHxsoKs6oeC6EOFNxXFKISb+pckc+o2vZfdZwrqg4wKh4PliICZg+rHaeNlAAFceaUfFcRohJZcK/hDgDA0XF8TdGxdNPiAm4fiPXcwuoTOjBqHh6CDG5aR6Prw/GLH+vj2uOZlZlwiZGxdNDiGnrXvXxJ+SOdsVyUR/XHM2syoT3MiqeTUJMN+9X166BpcvQsTphuahnuxaKiuO/GRXPJiGm6VeVHUMhZ7qO9h3titcvGigqjgshJkBlwgWj4ukhxHT3SZU7ckvbkU+J3zdQVBxrISbgxud5fgBYQGUCGBVPPyEm4PbXVW7Z+a6BouJYCzG5aYVlPATLclEvfmN+YFUmRsXTW4gzMJwrKo4LIaatu9XoIxjCGe+WnDR1/Qv1kTUqnssIMUEBVBxrIaabX1YMGY2hkDPdiuMFx3V99JM1Kp5+QkzAjc/y/NACKhPWQkzyoBqNsIZcINN1nLxluagPojUqnh5CTG5aDYb86XRZL35mfmhVJkCI6fajyo4gkwu5o2tpV7x83kAxKp5NQkxb96rBEDuATIa3b+qDaKGoOCDEdPdJlTtyR+7oWnafNVBUnFHxbBJikgeVHTCADiic1Cx+rQ9fW5UJayEm1qaPqp1vGygqDjAqnk1CTNNHleVcLnQt7YqXzxsoKo4LIc44Z6CoONaMimeTEJM+rrCQOTujPaVd8eqHBoqK472MiqeHENPdJ9VZSz5j52nDuaLi2MSoePoJMfGXAqg4ejAqnt5CnAEqjt6MiucqGRXPVfoDnza8KxWfPtwAAAAASUVORK5CYII="},{"name":"Cadantine seed","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAADcUlEQVRIDbXBz2ucRRjA8e/M/rCIvPTWiwcPsjMIuRSeHpbytPQivRSkxYL0T7QIBQ8VKWQOgWSgFAqSHXLIIZdFra/vNtlu3rwzmsWAInbfWPL5GBXPVTIqfntv/84tz9UwKn57b98Yo+L4ACEmQGXCPxkVv723b4xRcfxfIaZPXX5bU88toDLhglHx23v7xphSyp1bnssLMX1xuxqMGQw5PaF5Ux/9ZFUmrBkVv723b4wppRhjVByXEWLauleNRgzGdJm8Yrmo6znzQ6syAYyK397b58KdW57eQkw371eDIaMhHVDIHe+OOT2uZ7sWioozKh4IcVZKMcYAKo5+QkzThxUGa8kZCl1L29KueP2igaLijIpnbXtv3xij4riMEJM+rrDkTD6ja2lbcsurHxsoKs6oeC6EOFNxXFKISb+pckc+o2vZfdZwrqg4wKh4PliICZg+rHaeNlAAFceaUfFcRohJZcK/hDgDA0XF8TdGxdNPiAm4fiPXcwuoTOjBqHh6CDG5aR6Prw/GLH+vj2uOZlZlwiZGxdNDiGnrXvXxJ+SOdsVyUR/XHM2syoT3MiqeTUJMN+9X166BpcvQsTphuahnuxaKiuO/GRXPJiGm6VeVHUMhZ7qO9h3titcvGigqjgshJkBlwgWj4ukhxHT3SZU7ckvbkU+J3zdQVBxrISbgxud5fgBYQGUCGBVPPyEm4PbXVW7Z+a6BouJYCzG5aYVlPATLclEvfmN+YFUmRsXTW4gzMJwrKo4LIaatu9XoIxjCGe+WnDR1/Qv1kTUqnssIMUEBVBxrIaabX1YMGY2hkDPdiuMFx3V99JM1Kp5+QkzAjc/y/NACKhPWQkzyoBqNsIZcINN1nLxluagPojUqnh5CTG5aDYb86XRZL35mfmhVJkCI6fajyo4gkwu5o2tpV7x83kAxKp5NQkxb96rBEDuATIa3b+qDaKGoOCDEdPdJlTtyR+7oWnafNVBUnFHxbBJikgeVHTCADiic1Cx+rQ9fW5UJayEm1qaPqp1vGygqDjAqnk1CTNNHleVcLnQt7YqXzxsoKo4LIc44Z6CoONaMimeTEJM+rrCQOTujPaVd8eqHBoqK472MiqeHENPdJ9VZSz5j52nDuaLi2MSoePoJMfGXAqg4ejAqnt5CnAEqjt6MiucqGRXPVfoDnza8KxWfPtwAAAAASUVORK5CYII="},{"name":"Grimy harralander","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAE4ElEQVRIDbXB72vdVx3A8ff5fO9tmmibi+Py9cHmA8H7/a7+SM12TIXsg5TQUEYDxQci7MGE1mERdOy/cG4gooMxEEZBFEdKSxkZMsKhiNdjy9K61hwFpZTCl4BmKflxf51jEhZoaGOzB3m9jNqSz8j5oLbF/hi1JZ+F80Ffiu6iqG2xD0Ztyb45H06+HGNk/l2BpLbgSYzakr05H9S22OF8OPmDKH/L+89W8++K2hZPYtSW7MH5MPn9eO23orbFNufD1LkoC3n/a9WHvxFIagvng9oWuzkf1LYAo7ZkD86H77wc1z+hPSuA2pbzYep8lI/yOFb98R2BBGZ6ojnXXlLbYpvzAdCXorsoaltGbckenA9T52N/g5X/kP2z4RdXgKlzMbuVp7Hqg7cFUNtyPkBSWwDOBzsTh4YZGeWDtwWSUVvyCOeD2pbzYfpCHPTYWCHebgxay/XQkLHl4X/kjFdzb8n0hTj3a1HbYpvzYfx0rI8wejevn6iu/lIgGbUluzkfbHHUL66obTkfpi/E3gb9Gw02HVuWv+dDdRivEmw8wF0USGoL5wNgZ+Ln7jaGJ5eHhrn0ukAyakt2cz5MTzQF3m8vqW05H05PNHvfqPodNklG/XaexqpPlmjPyuT34rXfCTD+YrxxVSa+G79wL6+/UF3+uUBSWxi1JY9wPrAlgTk90ex9tUKIAzaJIfs4l4x4vCIhGZ0/5d2vVJ0O/73Ll7P8sFaX3xC2JLWFUVsCzgceorblfIAEBpieaKaxKkY2yUJuBMkQqE9Wl34mJ8eb3aLqdRn+V35khP5YBUSY+5WobRm1pfPh1Cuxu0a3Q6/L4E7jxuLKxNnYnpWp8zGrITUko98l9TELOSAgJ6reOht/acjxZW7mNRg6jJyogCtvCluS2sKoLQHnw+kfx5jorLL+gHin0XtmGeGj92Xi2NFnvvj5TFg/fm/QIV7PGRDHKyBFuu2GHF+ufZxnwtAQTFSXXhc+ldQWRm3JNufDmVdjTMQ+nVU2VhkMeLDEkSbcabRvr5zV5uBbVRpAO4+26qwSI3Irz6BWJxM4UaUB/T5xANfzufaS2pZRW7LD+XBWmwmI9J6rOqt01+isMfTvRqcLzy6PPkVWR2r0+3RWEUP9di5Qq1MTNiW45Jb4VFJbGLUlD3E+AKdeidkhajVipLdOd4N4sxEHjBwe2iir0afoD+itg6F+M69lGKFeo/d8lSJX3hRIgNoCMGpLdnN+EQxw5tVohJTod+h16Xeo3cnXNjpHdHl4IV//enXoVk7ECJkwsFXm81m3BEltwQ6jtuQRzoeZ1yIGMWT+aaD7zXv9Hr0O8Xouz1Ujo6Q/55kQIyJkUn9v/j5bktqChxi1JY/jfGDHmZ9GDBhIdNbo+3z4herwQh4jCQbPV7W/5iL19+bvQ1Jb8BCjtmQPzi+COfXDaDJEEIEMMdDOsxrm21XdP/37D++fO/Old67cZUtSW7CbUVvyfzkf2DEz2bx8bYltM5PNQ7X6H+bvsyUBagseYdSWPInzwR47KtC+vQKJLWb6R3HuLQFmXouX3xC1LR7HqC3ZB+fDWW3OuiVIYF78Sbz6C4HEFgNJbcHjGLUl++N8gKS2AJwPkNQWPIlRW3KQjNqSg2TUlhwko7bkIBm1JQfJqC05SEZtyUH6H3+LONHeQLwcAAAAAElFTkSuQmCC"},{"name":"Grimy toadflax","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAEUUlEQVRIDbXBX0sd1xrA4d9as4350+wzabo758JzyIWdGYTeFF6EEl4kBDdeWCqFfoJ+rPMFTmmINBRRDiKLUpAFvRGEvfAilBCYSuN0J00Tcdac2eYPkcTGXvg8RqXkb3I+qOScjVEp+TucD8xG9qxKzhkYlZIzcz4wG+nsWWhVCt7HqJSczvmgkvOK84Ei3u5n/zuo2LMqOe9jVEpO4XxgNrJnVXKOOR8o4mI/2xhXjCy0KoXzQSXnJOeDSg4YlZJTOB+YjRzBfQuo5M4HirjYzzbGFSMLLZjh/GB9e18l55jzgc5sZM+q5Eal5BTOB4pIA8+QK6kfjekUcZhm63XFyAIqufMBWpUCcD5wI9KZhpGF1qiUvMX5oJI7Hygined8fjX96XF982r645/18Hq2XleMLEVkZFVyjjkfmIn0WBxkG39U7FpojUrJSc4HKfp+NFbJnQ8UEdBLKeCe1Av9bHqK9bqi08CehValcD7QmYkLH6VbhzUJ7FhojUrJSc6H4fzAwtr2vkrufFiaH6zVFQ0vDK9n63XFc7hvuRG5b+nMRB5YbsSlLFt7WrFjoVUpjErJW5wPTLRgluYHa3VFp2EiYZhmNmHtt4pOwq2L2eajik7N4ifZxrOKHctEq1IYlRJwPvAGldz5AC0YYDg/WK8rji32M2OxCRZ+eFyxY299NtgcVxyx8GF29TL3HlW8sGtVcqNSOh8oIg0c0flsOv15NOZG5L6liHQSJho6wzQDLKw9rmjQS6l7Ui/0sx5MX+SHuiKBHctEq1IYlRJwPjAX6RzCEXI59eOazgM7P9f/1z8/SCz/rR7QsJRmNKzVFccWLqVbT+rFa1limZ5m9aBix/JSq1IYlZJjzgfmIi8cwhETf8Il5i+n27vjFR3cPahoWE6ze3VFQ+d2P0ugN0Vi+f73ioaJhmGarW/vq+RGpeQV58OKDlogsvqoooEGjtA0fX7I9tOaaUh46ZDO8HpmoTdFz9JpYdXt81KrUhiVkjc4H+gUkYSXGmjQD9LYcPni9MZBxQUmGjpLadZLMJapHnd+q+jsWGgBlQIwKiUnOT8CQ2cukkDDRAMNt69lT589/6mpv/wwW92vlgcZEWNJLHcPqpVr2V23D61KwStGpeQtzgc+jRz76voMcOfXB3Qabl3JNv+ouMDyP7LEEiPWktipO1sPmWhVCt5gVErexfnAa3OR1xpuXck2n1VffZzFSAurB9XKtczaqTtbD6FVKXiDUSk5hfMjMBSRTsJry2mW9Fg9qL4ezHy7+fCb5X//594vTLQqBScZlZK/5HzglS9uDr7/cZ9jX9wcXOhNfbf1kIkWUCl4i1EpeR/ng8z1LWzvjqFlwlBERpbOp5Edq5LzLkal5AycDys6uOv2oQXDXGTXQsuEgVal4F2MSsnZOB+gVSkA5wO0KgXvY1RKzpNRKTlPRqXkPBmVkvNkVErOk1EpOU9GpeQ8/R87HtHCKEKVWQAAAABJRU5ErkJggg=="},{"name":"Grimy irit","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAFNklEQVRIDbXB/2ud1R0H8Pc5z3PvTdIvBm5uuos0g0Ke52g0pqkfs3bdxxJKSygWiz/5gz84ZkVFUPF/GDKFDZywLwzBgTBWOgyltEgph05Nj3Pp1dTkZGQQtgSTXLgmprn3uc95znqDgYY2a/whr5dgUviBtLFMEbZHMCn8ENrYo8/1XvtgminCNggmhW3Txh57vjfz0O9PA54pxv0IJoWtaWOZImzQxh77eW/4ZS3p69TvTzNFuB/BpLAFbeyRZw988uEMU4R12tjhF1Q4Xk0e7bz6p2nAM8XaWKYIm2ljmSIAgklhC9rYY8/3ri47c24GAFOkjR0+q8J/VtOB4pU/TAIeECeHSpfGFpkirNPGAjj6XO+1D6aZIsGksAVt7PBZldbdcrWR+1fNTC0DGH5B5SpVN1D8+HeTAJgibSzgmWIA2tjBp3va2sO2Pfkrv58EvGBSuIs2linSxp54uS9NXX0lwVdLLu7KTS1hYN8uW/OHipffmzzxSt/l304wRVinjR0Y6Sl0hA/Mrogj3Zd+MwF4waSwmTaW4r1mapkp0saeeKUvabjs8zkA2SP7wpu1Qg7uUBEe9RV37c/TgGeKtbEABk/37J2tFX62P98RjL5VAbxgUthMG3tyqCSBi2OLTJE2dmSo1HismNYdJKREYaLmBorfLtwy52ePPHvgkw9nAAw+1fPF6Cw9c6DrPyshl0d/VQE8UyyYFO6ijUWLB8TIUKnxaBECmXO4TQaFL6sygBvoBpwIgubfF+rxnuZauvjftQjIPVm+8HYFLZ4pFkwKgDYWd2CKtLGABwSAk0Ol5kARGW4Lx6tCQgaQQPDkgx/9cnx4sFSP97gm2mdW9nQgGej2aLn87gRTJJiUNvb4SypZdWnDNRup+7r2xdQyPXPAnJsZPqvCMBA5SAmXIEtdMF4FIIHsJ93NNZden8PBffJGLQQKbcDhMoAL71TQ4pliwaQAaGNPvtrnM9RXk8aKy75eav54NxCOX5wdenjv/h/tDiRuHexKEifNAhyah4oSQeZd+ukcDu7Lf1ULJAoFuMPl0bcq+J5nigWTwjpt7Mgb/fAuS9FYTda+c8hQW6h3drfh5tLYzeUzXEqHyqlD+Nl8+kR3Y9VlHuGNagCEOQQS/nA5dcic802IfyxcGltkigSTwgZt7BkueQAZ1h7vbq66ZM01Vhvt/641EmQPdT3QlZe5IAjhUiSrCQQKEzUJhDmEErd54G96Ed/zTLFgUriDNhbA8ZdUkA/CMEhT5+ouaTiMf5M5dLQV6qpzV1d7lrnmLQeBwo1qGEBI5EIkVM4yXHinAngATDEAwaSwmTZTgABw6o1+SMCj2XBp4tLE5Sdqt+qN3by/48bCd/3F9koVGYREIJE8Uc5fnz+vFwHPFGODYFK4izb21Jv9UgAC+etLAOqDXWnimonD51UcKu7qzOPT+UAiyyAlApk7d3UOLZ4pxh0Ek8K9aGOxYeT1fghIgcyjuZZkY9UCd3eML2QZPNCkct7MS5k7d3UO8Ewx7iCYFLagzRQgjr+oZADIQASQElIE8rP5IET20wfbxhb+cmXuF0/1/HF0Fi2eKcZmgknh/9LGYsPpo6WPri1i3emjpXyY++vVObR4AEwx7iKYFO5HG0sP75XA2M1lwKNFHH9ZffzeJIBTb/ZfeLvCFOFeBJPCNmhjz3DpvF4EPCBGXuu7+OsJwKNFAJ4pxr0IJoXt0cYCnikGoI0FPFOM+xFMCjtJMCnsJMGksJMEk8JOEkwKO0kwKewkwaSwk/4Hgqph0X39koQAAAAASUVORK5CYII="},{"name":"Grimy cadantine","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAElklEQVRIDbXBbUscVx/A4d85u+uYNbs+xJO0Je3LmSEQKDccFkT+lCARCQ3xO/Rj9RPcVCwpoRgkyCEElgMlcEPA87JQSzOJurt1zezDTF2JEEm8Y194XUpsyr/kfBAbczlKbMq/4Xxo3TPtZ5nYmEtQYlMuzfmwtGLG0N7OoBSb8DlKbMrFnA9iY844H5bum/oBvVna25nYmM9RYlMu4Hyw0vSuKzbmlPNh+b6pH/D3PC+eZlCKTZwPYmPOcz6IjQElNuUCzoelFdPv5y9fdAGxsfNhedXU9+kv8HwrgxLUaststTOxMaecD0DrO9PeycTGSmzKBZwPy6tmOKTfy6e7+N0usHzfzHQ4XsD9mgFiY+cDlGITwPlwt9WcjoiuRc+3MiiV2JSPOB/Exs4HeWCKEflxXjvg3Sz1DkMTzR1xvIh7kskD455kYmNOOR/u2OZUjZvDaPQlzx5nUCqxKec5H2zS9LtdsbHzQR6Y0ZDq6xw4nmOmG0U1jhc4kR/T3smgFJs4H4C7reaNHL6OpqZqTzf2oFRiU85zPqy2jIZf25nY2Pmw1jK9OYZD0FSg0eN4gW4nf/mia6XpXRe4a5v/891vl5pfjqPxbZ5uZFCKTZTYlI84H5goQa21TG+WEwXvNTroCkfznNAa/Qe96/kw5/DtYTx/q7jN9mbGRCk2UWJTwPnAB8TGzgcoQQGrLXM0ByUo6vsoja6gYfRVbeunvXv/Mb3r+big2Y8adXrzTBTsPMnExkps6nyQNZPnDEd5kaMP+W23++1S8+WL7vKq0VW0RlcYDSlGzBxyQkN+i0GO/isfLUZT+1Qhmia/CYrtzYyJUmyixKaA8+G77w0Fg5x+P68dcjTNiVe/dVt3ml9/cb2iOZgdjoZEb2DM0SITBfrPfLAYXe9Q0UQRfVN7urHHe6XYRIlNOeV8WHlkCijGDHLe9XOgu09zgdo+7VfddTFHNxiVzLzmaJFBTlFSP6AC1RoVzbtbFGNGY4qCa2/YamdiYyU25YzzYV1MCRR0Fxjk5Hk+HNDskw/I52jORrqKVhRjBjloGh00VGtUNSdK+NllvFeKTZTYlA84HwBZM7pKtUJRMBqSD4ne5MWY+nTUaTDTpBgzGnCicUi1gtLUqvTmKWB7M4MSEJsASmzKec7vggJWHhkUlIzGjAYMxzQ69N/lU99Ecx32G8z2oEBpKpreDRpv2XQZlGITziixKR9xPqysGw3oWuMtJzpzw9GY0YCpjIGhXifKqGiKAq2p6NrGzh4TpdiEDyixKZ/ifODMvUdG894gp/oX3Ga+S1FQwt83aLxF69rGzh6UYhM+oMSmXMD5XVCyZtBojVag0XDtNZUqxzdrs/v899neD99/8+MvvzNRik04T4lN+b+cD5x5uGweP8849XDZTFVrP+3sMVECYhM+osSmfI7zwd5pami/6kLJhJIHxj3JgJV1s72ZiY35FCU25RKcD+tiNl0GJah7D82zxxmUTCgoxSZ8ihKbcjnOByjFJoDzAUqxCZ+jxKZcJSU25SopsSlXSYlNuUpKbMpVUmJTrpISm3KV/gFI2RLR539CXgAAAABJRU5ErkJggg=="},{"name":"Cave nightshade","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAE50lEQVRIDa3Bb2he1R0H8O/5d+/zJLGmqWnnKtgWd+9ZSx/Cwg/dGD+yEAoiFmUvhNCWOrRo7XBurmvnBnshFHUypc6BvvPFXgiC6IuiFJHDCMKhQwod5paJMOk/qtHG/Hmee+85iw8tTYjRpvbzEUwWgPMFAKYMN5pgss4Xm7YOpv1mcuIMAKYMN45gsgCcL3Y8OKQSVc7Vx1/7EABThhtBMFkAzheju1umYZJEIuKzM9MTb34EgCnD9yOYLADni5HxVtKQpmFMogBcujB77pOL/5k4w5ThexBMFl3OF2N7h0yqTGJMKoWQly5+NXVuxh87zZThegkmiy7ni7HdLdMwOpU6MUrLGMKXF2Yvfnrpw/c+ZspwXQSTRZfzxeiulkmkbhi1QMtGr575svPF+Wn3+ikgMuVYPcFkcYXzxdieIaUhtdKJbPamOtVT56aPvXICiEw5Vk8wWSzifDG6qyW1NKlq9KTKyOmpuXdePQFEphyrJ5gslnK+ADC6u2VSo41sz7SPv3YSiEw5Vk8wWSzj/CQgAIyMt0JVu9dPAZEpx+oJJotv4nyBJSJTjtUTTBbLOF/sPHBXu122Z8r3/3mSHx52r55gyrB6gsliGeeL+5/4GQRiHUJA2S6xrvfYEceUYSnnC6YMKxNMFks5X/z8l3bD5luEQAyhbIf2fCkHmsee/RcQmXJc4Xxx5MCzh186yJQBcL5AF1OGKwSTxSLOF7dtHdyyff0PNq0FUFehrEI5V9Y3pe8+P4Glnt5/RCmtlf79C08AeO43f6vqqq6rP718mClDl2CyWMT54ic7tmy4fe2awd66CnUV6jq89eIHY4/fdfzFD3b9ZeSzs9PnP5kKNX6sfrr9jpbSWkutpIJAHeqqXlD+8aU/AJEpByCYLBZxvhgZb93Un6Lr7Zc9ukYfo4He1KQ6hGD+vamn0dvTaG5Yd6vWWiwAIISACLGuqvrQ0SeByJQDEEwWSzlf4KoIiDvv/dEtt/X3DTRjwLrT25tJj9Zm4+DGuc6ckCLUQQgppfgaEBAPvvBbIDLlAASTxTLOT+IqwQ9sG/jhzRv/N2yM0coYbbTWa/pu7pRto5Oq6nSqCoBWUimjpOpr9O1/Zh9TBkAwWXwr5wt+YNue7OCp/57UKjFaa6WV0r3Nnk7Z0caUZafdaUshjTFaGwChrgf71z/09F6mTDBZrMz5AsCdO+3t29Zn538RAa201koKCUBKCWC+057vzKUmbSQNrU0d6hDqEOo//+MpIAomixU4XwyNbRm4tU8ruWZ93/DMzk7Z0VorqSMWRACdsj3fmZ9vz/U0evt6+oRQh47+DpdFplwwWazM+QLAPY+SSc2IGp+dn1HSSCnQFYFEJ820eWHqrJJaSnXo6JNARBdTDkAwWXwr5ycBcc9+2rn20a9mp6WQAGKMiUnSJJVCRSyI5z8/+9TfDwGRKccigsniuzhf7PjV0J7Nh6dnL5VlqZWOEUCM6IoxAr9+7hEgMuVYSjBZfBfni5Hx1oZN/UrL+5qPB8QYQh2qsqrKqqyqcv8z+4DIlGMZwWRxDZwv7t43rBOpjVFGKi2lBIQMIVTt6o2/TgCRKccygsni2jhfoIv3DbtXTtz7GKnEKIk3np8AIlOObyKYLK6Z85P4mgAiIHBZZMqxAsFkcb2cnwTAlGNl/wdieO/2dond0wAAAABJRU5ErkJggg=="},{"name":"Poison ivy berries","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAADXUlEQVRIDbXBT2gcVRwH8O/b1KNzCwG7YFCYeZdCLj+UFX4XvVtoQSy1KtRDEauY41ZRYanF4EE8qSctipLSaBFshRYedKW8g6tgNdM/xpoUJk27u2/+vp2E0SwJpOwumRz28xFMEuMkmCTGSTBJjJNgkihNaR99TC7KEUwSJSjtA6jVZ9DXbLSYXJQgmCR2o7Rfq89gh411XDvTwjYmFyMIJokSlPZr9Rlsu/PPbfSw//FpVCoT+9BstJhcDCOYJMpR2se26lEnzzD95BMTE4DA/5qNFpOLAYJJojSlF7FJVF9x8hDBOVOrz2Bbs9FicvEwwSSxR0r71ZecPEJw3qCvVp9BX7PRYnKxg2CS2Aul/erxyXzNAggWDFBgk8CWgsnDDoJJojSl/enXJ9fX7PK3ZuqgEywYoGDyACi9CIDJw8MEk8QISvsAmFz0Ke1Pn5hMVywKBBfM1EEnWDBAweRhNMEkMYzSfnHjQ2Tr4sAp9E2fmExvWDyK4LwBMHXICc4ZoGDyMJpgkhigtN/79f0otlFi4yxPsvzQlfn0lg0umanDTjBvAFRfdJa/MQCYXIwmmCQGKO3//dPbJrYmsmGShZEN097xd78HMHXYCeZN8UfDZnmS5WnW2//sR0wuRhBMEgOU9q9+9ZqJbCdMu5HtmPSRfZXZuYvVo07exa1Tb4WJDWMbJb006z1z7AugYPIwjGCSGKC0//l7z69vbLRNdr+dBO3o7IXfAVSPOdEdXJt9NYytiTIT90ycdUJ78vSPTC6GEUwSwyjtv3Hk6dX74dLddpjm12/eA1A94ix/bX7+7OU4zTtR1jW2HcYTlco7n14GCiYPAwSTxAhK+9hh47cPkjSPszxJez9c+fNBN13rxHfvhQuX/wIKJg/DCCaJ0ZRexCbRvloPE2tiG8W9JLVRmn9y9pellbWbyx2gAhRMHoYRTBK7Udq/vnDSxNZEWTfOTJR1TDY7dxFbCiYPIwgmid0o7X8390KlIjph2jZZu5tmvfWPv2wCBQAmD6MJJokSlPZPv/lcJ8xWH0Qrq+ZS8zZQMHnYjWCSKEdp/6kDjy39uxx0AFSAgsnDbgSTRGlK+9hSMHkoQTBJ7IXSiwCYPJQjmCTGSTBJjJNgkhgnwSQxToJJYpz+A+wpuZDaBLaQAAAAAElFTkSuQmCC"},{"name":"Mud rune","base64":"data:image/png;base64,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"},{"name":"Impious ashes","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAChklEQVRIDbXBz2tUVxQH8O+5mTfjosj0n3jvQpdyoAs5iJB/QXDTUrLQVlwpFBGSlbgQVAoSim3JYkrpYv4DkXBxEbh0IxSaJ7i0q5b8aGXy3r3nmAmEOsRnZ/M+HxL26BMJe/SJhD36RMIefSJhjz6RsEefSNijTyTs0ScS9lhaiDUWCZf4KBL2WE6I9b11/nQ8IkLTaNPqmz8PHz35XbhENxL2WEKI9eaji6PRYMUhK3LSptWm0VnT3tmIwiU6kLDHEkKsf/7hcjF0pshZsyIl/errbZwhXOI9JOyxnBBrnJhOVrPalS+eAQbQxrcXxuORc/jn3/bV672tySvhEqdI2KNbiDU6Gebo6XdSFC4lfTtLTaO37+4AJlzhBAl7fEiINYCb1z4bny8+OX9uVDgzzI7aw8N272D219/Nr9PXwmWI9XSympK1SY+O0tqNAJhwhVMk7HFGiPXGnQujoRsOV4rCDVYcAD2W0WZtmrx/0O7tz77/6Q/hMsQa/zHhCu8hYY8zQqwf3v98WAwGAxA5IphB55CSpqwpoW3z/uHRg8cvhcsQd3FCuMIiEvZYFGK9+fBiUTgQHDlyMIOqwpAVqpqSpoQ2aU65Tbp+7zfhEh1I2GNRiPXW5iUiEME5B0CPGcygc8hZU0JKmrLevrsDmHCFDiTscUaI9S8/XoZzRDCFmarBFHrMoKopISf95tYLwIQrdCNhjw8JsZ5OVs2gZqYwg6lmgylU9cvr25gz4QofRcIeHUKscWI6WVWFmanBsl5dew4YAOEK/4eEPbqFuIs5wgITrrAcEvZYQoi7OCVcYWkk7NEnEvboEwl79ImEPfpEwh59ImGPPpGwR59I2KNP7wA0X1aQpufTUQAAAABJRU5ErkJggg=="},{"name":"Accursed ashes","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAACeElEQVRIDbXBP4tcZRTA4d+5c8d1ST7H3LeyO2AhhyARWYSATQQhoClWZG1SrJ9CsPAPiKIQ0hgsAhYhEkK4LEJ4GxEE9/oFBAtTJDvjzH3PcXdhMcPmxmnu84hpYkximhiTmCbGJKaJMYlpYkximhiTmCbGJKaJMYlpYmNt7lhnOuOFxDSxmTZ3b7/76sWLLwOl977vH//95KcffzWdMUxMExtoc3dt91I9rSZV5Y6H96u+9L5a+Q+3fjadMUBMExtoc7d74416Ukd4cQ+nlPj28/ucYzrjGWKa2EybO07tfbwTzpef3IUAuXJVL1zYEqnmi+Vffz4+ePC76YwzYpoY1uaOQcEJee/D16tJ5e7LZd8v/fbNAwjThlNimnieNnfA5bde2d6ebm1vTesKWK58Mf9n/mTx9Ony0cEfprM2d3v7O+5eiq9W5bsvHkCYNpwR08Q5be6uXNVpPZnUdf1SVQnHPAj34pRlfzRfzY8WD+/9Zjprc8d/wrThGWKaOKfN3Tvvvzatq2NAVVXuHkGEe6G4l+Kl+OJocffOL6azNh9yyrRhnZgm1rW5u7Z7aVJXAggiFUHgEXh4FIp7FC/Fi3tZlTvfZ9MZA8Q0sa7N3fWPLlcCFYIAQeB4EOERePFjpXjpuX3zAMK0YYCYJs5pc/fBjTcRKnCI8AgIwsODCC/u3nPr64cQpg3DxDTxPG3u9vZ3Aggi3AOCCI8gPL757D4nwrThhcQ0MaDNHaf29nciiHAPCL769B4EYNrwf8Q0MazNh5wQ1oRpw2bENLGBNh9yxrRhY2KaGJOYJsYkpokxiWliTGKaGJOYJsYkpokxiWliTP8CSfNLkDroiJ8AAAAASUVORK5CYII="},{"name":"Infernal ashes","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAABiElEQVRIDbXBMW7jMBBA0T8EgrTs1LiW5gLTzuHZ8gRmvY06toYBaiOvvbbgKFHD98RN6UnclJ7ETelJ3JSexE3pSdyUnsRN6UnclJ7ETTks5cKW28iPxE05JuUy0HhxgUpwG9knbsoBKZeBRuSu8t9McBvZIW7KASmXIbYPVlfu5hp44zbyQtyUY1Iu3JxiA/7UAAtIpH1yd4FKcBt5EDdlX8qFXQsrGWhEqPwzE2Bxm7gRN+U7KRcg0oBPni7cVYLbmHI5xQZcWc01wOI28SBuypuUS6R9suvCqhLcxpQLT4vbxAtxU96kXAYav7lAJbiNKZ+5cZvYEjdlK+Uy0PgS2ai8u0AluI3sEDdlK+UyxMaeyquZAIvbxA5xU96kXIbYPri78qbyZSbA4jaxT9yU76RcTrHx4srTXAOrxW3iR+Km7Ei5cHOKjYcrzDXAArhN/EbclH0pn1kJG4vbxDHiphyQ8pkHt4nDxE3pSdyUnsRN6UnclJ7ETelJ3JSexE3pSdyUnv4CKsqJgfKYl98AAAAASUVORK5CYII="},{"name":"Unicorn horn dust","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAACgUlEQVRIDbXBPWsVURAG4Hf2Zm8E8eNX7B6wEWRARKaQ/AkFKwVRQcFCglFBBcEvTFCwUCxilVR2NiJyCgkcbATBrCLYCRYmIUru7jkzmkDQS7J6m30eEnboEgk7dImEHbpEwg5dImGHLpGwQ5dI2KFLJOzQJRJ2GJkPFYYJF/gnEnYYjQ/V9fMH9u4eJ2RN1EHdfP32c2b2vXCBdiTsMAIfqodXD/f7Wa+XadKYtG60rrVu0tT9IFygBQk7jMCHavbWkTzPVDUpNGlUPTnlsYVwgb+QsMNofKiwYX5mIiUcvfASMIAun96/d/eOLMtWfw4+fVmZff5RuMAmEnZo50OFVoZ19Oja4Xwsiwlrg7g20Mm7C4AJl9hAwg7b8aECcPbYvj278l078zzvARjUaXl1sLxaf1+q5198Fi58qOamJ2LUmHSt1lNXPGDCJTaRsMMWPlSXz+wfz3t5no/3syzDb2ZIqrFB3TQrP5qllfrx/AfhwocKf5hwib+QsMMWPlR3Lh7s97OxXkYEIphBFck0JcRGY0pNoys/mntP3wkXPixig3CJYSTsMMyH6sGVQ3k+RgQiZAQzqEFVzZAUKWnTaEwpJsSo1x6+FS7QgoQdhvlQPbkphIwIGQCCGsxgpqpI+hti0thokzB5dwEw4RItSNhhCx+qZ7ePEAEEGNSgqmZQg5kmRUoak5678QYw4RLtSNhhOz5Uc9MTBphCTc1gCjVVhRpOXHqNdSZc4p9I2KGFDxU2zE1PqMEUamqK4xdfAQZAuMT/kLBDOx8WsY4wxIRLjIaEHUbgwyI2CZcYGQk7dImEHbpEwg5dImGHLpGwQ5dI2KFLJOzQJRJ26NIvcEJOkCDkGqoAAAAASUVORK5CYII="},{"name":"Dragon scale dust","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAACYUlEQVRIDbXBMYtcVRTA8f95b2ajxA9hNe8iLISBQ8DiFEEUWT9AKiurgIWgzfoBLCzUyi5gYStYSCAEi4uNXFgWAgvzsEiRwkYQdId1591znFlYzLCZOM37/cQ0MSYxTYxJTBNjEtPEmMQ0MSYxTYxJTBNjEtPEmMQ0sbdceraZznglMU3sJ5e+e/vDg9dug1SvDKvl3388O/3RdMZuYprYQy794b0HbTOlaSCqV4ah+qr6avHLd6YzdhDTxB5y6efvfcpkijvujhP19PHX3GA64wVimthPLj1X5kefg5/89AUESHf3fnvrDZq2Xp6f//n787MnpjOuiWlit1x6dgo25PCdj9tmUr3W4RK/PMsPIUw7rohp4mVy6YE373wwmd4+uPU6zRSi+qr+sxwulsPlX88X2XSWSz8/OsbXBurq9Mk3EKYd18Q0cUMufXf3Pu1BO5nSTFoaNqJ6Ba/Dqq6Ww8X5s6ePTGe59PwnTDteIKaJG3Lp37KP2mZC07LWNLhD4FFxfMBr9aFeLH87+cF0lsuCK6Yd28Q0sS2X/vDeA5pJi7DWCGselcArRHXHB9yrD9S6+PV70xk7iGliWy79nXc/YUMQYS0CAgKPSuAVr9Ur1LP8EMK0YwcxTdyQSz9//zNo2HA8nGAtHAKP6gP405+/hTDt2E1MEy+TSz8/OmYj8IAAdw8Iwk8ff8VGmHa8kpgmdsil58r86BgCDwjwk0dfQgCmHf9HTBO75bJgQ9gSph37EdPEHnJZcM20Y29imhiTmCbGJKaJMYlpYkximhiTmCbGJKaJMYlpYkz/AowhIpBDm6zgAAAAAElFTkSuQmCC"},{"name":"Raw rat meat","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAFNElEQVRIDaXBXW8U1x0H4N/hrjdVq7SR+qI2Si1mvsC5Pd+kN62K5GSdkGxvSqsAFS81YCHqpBfIIW2ESnFeaEgsNwiIGWhJfVpqBxvY6ZaAMd63md0ZE8+cmTn/c8quupVXxtROn4cJ7uL/4EkfGwi+E31McBdflif9qTOnrbVFUaRKpUolSRqEwf5jxwXfiR4muIsvxZP+x5NniAwZstaip9C68s/qnoOHASu4A4AJ7mL7POlffG/SGENEhaZquYT/Kr169/7S6xOnBN8JgAnuYvs86V96/x1jKC+Kyu4Xsc5Xyj+792B5dPwNwAruMMFdbJMn/SsfvE+Gsjy//dIwBn1tz/4HD5f3HhkDrOAOE9zFdnjSvzb1gSGjVLYwsgsbPPPagVqjcffe/ZNvnxZ8JxPcxZZ50r8+/REZo5RKUlUtlzDoudHjjVZrpVb37949+8fzgGWCu9gyT/rXpz9MlUpVVtn9AjZ4dt+herP5YPnh1U8/vXFzEbBMcBdb4EkfwF8/nkpVlqr09kvD2OD5oyeaQbBSqy3VVk6d/j2wA7BMcBdP5UkfgLwwnWtNWqssWyjtwpN865e/qrdaK/X6/MLihRkPsII7THAXm/CkD2D2wnRe5LqgQhda69svD2MTX92zt1avN1rh6xMTwA7ACu4wwV0M8qSPntkL0yrLtC50QQUVld0vYnPfOXi03uryq/+aPP8RYAV3ADDBXfR50gcwf+VylmUqy/I8L7QuCl0tl/C/fP3n+xtB0ArCS1evzt1cBKzgDgAmuAvAkz6A+SuXsyxTWaaUKrSu7H4BW/O9w2ONVitstz9fevDWmTPADsAK7gBggrue9OevXM6yTKlMZSovcv+VErbjG68dCNrtIGzPzt24OHMNsII76GGCu57052cudeJ49dGjankEmxgaGwdQLY9g0HOjx1th2I6i5Ycrb5w6BewArOAOepjgrif9hWszURzP/uiH2GBobByDquURrPPsvsOdKArb7Zt37rz34RRgBXfQxwR3PenfuX41ileDMPRfLWHQ0Ng4BlXLI+h7/uiJdidqx1Gj0fzTJ5/cvHUHsII76GOCu570q/J6FMetILz98jAGDY2NY1C1PIK+bx84EsVxuxP51epvz74DWMEdrMMEdz3p37sx24lXW0GwUNqFDYbGxtFXLY9gnW/uPdiO4zAI/yLlRe8aYAV3sA4T3PWkX7/1WTN4LJwb/jG25gfHfp2k6VqadjrR5/fv/+at3wFWcAeDmOAuAE/6t/7spUqlaZqkaV7kxthqeQSb+O6hY0maJEm6lqRJkswtLp6bmgas4A4GMcFdAJ70l+b+romUUqlSaZokidJExhpjbLVcQt/3R4+naVoUhSbSWrejqNlqnTj5JmAFd7ABE9wF4El/+bN/EJGmx7TWlKQ9ShlrrLHGGkOWjNbUpTUlSdKO4mYQLNdWzp47D1jBHWzABHcBeNJfWZinLq2JSJMm0kRFUSRpmue5McZaq6mrKIp49VEnjpphUKs13p58F7CCO3gSJriLHk/6S3N/IzKPkSEio4lIa02ktc7zQpM2hr5YS+LV1SiOW2FYbzYmTv8BsII72AQT3EWfJ330zM9cIkNExhjSZAwRGWOI1pI0frQaxXHQbu87MoYuK7iDzTHBXazjyQq6GHoun3vXGNJkqGctSaI4DjudXxwaBSwAwR08FRPcxZN4soIuhp7JiZNE+osk+ckrP0WXFdzBFjDBXTyVJyvoYvgPC0BwB1vDBHexNZ6sABDcwXb8G/vgp+DLVDe1AAAAAElFTkSuQmCC"},{"name":"Snake hide","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAC/0lEQVRIDbXBQW8aRxiA4XdqcckatD+g4VCjZY455OvxO62IkMXVq/60/AXEqVK1UoVQNUdPpeTqkataqPeiBZ9IZ+vi0oIB2zjJ8xgVyzbnA6CS8SUYFcsG50O/324ms+GoUsn4bEbFsuZ8APr9djOZAcNRBahkfAajYgHnA9Dvt1lrJjNWhqNKJeOljIp1PhQXLaCap2xrJjNgOKoAlYzjGRULOB+KixZQzVMeWHZYKccTQCXjGEbFAs6H4qLFyuI2jZGHlh1WyvEEUMl4HqNiWXE+FBctYHGbxsgeyw5r5XiikvEMRsWy4nwoihY1dxa3aYzst+w001+B4ahSyXiKUbGsOR8GvTwCjRAjhzSTGSvDUaWS8SijYllzPgx6eWSlEWLkkGYyAyKMRpVKxmFGxbLB+TDo5ZF/xJPAo5rJbD57W44nKhkHGBXLNufDeS/nTiPEyBOWnXI8gVqlyz5GxbLN+TDo5RFO08tqnvK4ZQcoxxOVjH2MimWH8+G8l5+ml0A1T3nMJ5a2HE+gVumyw6hYdjgfiqJFzb1qnnLQp2ayiDAaVSoZO4yKZR/nQ1G0qLlXzVMOaCYzYDiqoFbpss2oWA5wPhRFi5o7i9lbGtcxsquZzIDhqGJFJWODUbEc5nwY9PLIWiMAMfLQssO/Yjn+BVDJWDEqlkc5H4BBLwci0AhAjDzwzV+dGGmfnU5/WwDleKKSAUbF8hTnr8AAg3f5q/SSmnvVPGVbu/0G+OP3xU8/T6BW6RoVy/M4fwUG+KFoLf78PnInxpNrtrXbb4D373+EWqVrVCzHcP4KzKCXR+7EeHLNPmU5hVqla1Qsx3M+nPdyoH326ubmIzvKcgq1SteoWI7nfBj08tedpK7rm5uP7FOWU5XMqFiO53wYvMtfnyV1zXT6gZUY2VSWU6iNiuV4zofBuxz49rsEmE4/ADGyqSynUBsVy4s4H9hwft6Okf+U5RRqla5RsbyU81f8z7ClVukCRsXyhTh/xZpKlxWjYvmajIrla/obwhxKXD7MzwkAAAAASUVORK5CYII="},{"name":"Wine of Saradomin","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAFhUlEQVRIDbXBXYhcZx0H4N97zpz56u5NK6jXwsxRbwR5Ebx4vRTvvBG9KCLeqNUqEhqItmmmZglqySpWqxi0WhEMkUJQRK1SjmV1PVSW2obk2DU2mc3sZ3Z2ZjN75rz/Dyfjrs66O21u+jzG2RhTJGmG6Zxt4B4YZ2McJ0mzz3zqwcAEosIsREzsvWdmIqZOZ23xb0sAnG3gDRlnYxwnSbNPP/gJFQ2DMAhMGIaBCUwYhEEQlUpBELDI+sbmsxcvOdvAdMbZGMdJ0uyTH/8YgDAMwjAMTBCGQRAGlXKlXq0GQWACA8U//nn95798ztkGpjDOxjgiSbOvfPmL/7pxMwhNKQyDMAxNEIRBuVyp1+v31SqBCRVQFSJaeuWVy7/5vbMNHMc4G+OIJM1OfP6zN1dulcJ9QWiq5Uq9Xl95x4fCsNzsL6qKim5sbb585dVkIQXU2SaOMM7GOCJJs6+feay9srK2sV4qRaUwrFQqq2/7QFiqhOUojCqlqNzo/kVVr7722i+euwyos00cxzgb4zhJmgE4c/JEu9Pp9Xc3739fqVKJyrUwqoRROYwqYVR+Z/v5dmf10uVfAepsE8cxzsaYIkmvAQbAyYcf6qyvv15+V6lSjcrVUrkaRpWoXHl7J/nej34CKGAAONvAEcbZGNMlaTb36Kl6rZbn+e1ut9fveaIAAcYG+d4f/vTi2trGB+37Z2dnf/vHFwA428AE42yM6ZI0m597AmMs7D0xkfd+dWNzc2tDBES+PlKr1arVre3uzXZ7IX3J2QYOGGdjTJGk2fxcCzA4MBgMtrvdYVGoQiEqagJTjqJSKYpKpV5/d3V9/fUbN9Kll51tYMw4G+M4SZqde+xUtVrDhO3t7d3BQJhVVVRFRUWjKPr2Dy4AeOQLn9sbDjura8vLy0tXrjrbAGCcjXFEkmaPnvjSA/c/gAnEtLm15T2JirKwjoiKtju3kj8vdrs9ACcffmiQ553VtWx5+e9XrjrbMM7GOCJJs2+2TpdKJfyP7uV5t7dDnlVFWFhVmFWViF7Nri0svvTRj3z4ve+O67VaZ231qQvPAOps0zgb47Akzb526pGZmVnsU4zt7PQGw5w9i7KwsoqyiAqrrG9sGATvaTZmZ2d2dnrnvvUdQJ1tAjDOxjgsSbP5uRYOU8Xt27c9ExGLsIjKiIqwsIqQzMzeN1Ov3xkM5p/+IaDONjFmnI0xIUmzc6e/Wq2Ucdiw8Lu7u548EYuwiMqIirCwirKWK5GwPP3jnwLqbBMHjLMxJiRpNj/XwhG7dwbD4ZCZvfesqswsKsrCKsoiupfv/eziJdwVONvAAeNsjANJmj35xONhGGCCKkb6/T6NMHsiGWFmVRFWURZVEU9+4a/p2uZmt9sFAmcbGDPOxpiQpNn8XAsHVDHCzIPBgJiJyBPJCDOrqrCIjniioihurNxqt9v9bnet2wPU2SYA42yMCUmazc+1AKjiv/I8J++JmZi99ywiKsrCqspCQkVBvijuDPeuL19funIVUGebGDPOxjgsSbPzZ1uYkOc5MZEnYvZEzKwqwsKqwuw9DanwRZEXxa3VzmK6BKizTYwZZ2MckaTZ+bMt7NN8OKS7mIk8EcsIC6uoFuS9L/4jH/pev//CiwuAOtvEmHE2xnGSNDt/tgUoEY8Qe/JMzN57lhFWUc9UFN77oihoWBT5cPjr3z0PqLNNHDDOxpgiSbPzZ88QMxMTM3lPzJ6JiUVYWAo/UgwLevbiJexTZ5uYYJyNMV2SZt9onWYmIma6yzMRsQh775+68Az2KcacbeIw42yMN5Sk2ZmTJ2REVURYmImf/O73cZdizNkmpjDOxngzSZrh/ykAZ5t4M8bZGPcgSa9hgrNN3BvjbIy3knE2xlvp3z9z3a6UFo9TAAAAAElFTkSuQmCC"},{"name":"Wine of Zamorak","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAFgUlEQVRIDbXBW4jcVx0H8O85Z+7dfbGvPs/8bR+KyBEROYgv4psvog9FxBe1WkVCA9E2zdYsQS1ZxWoVg1YrgiFSCIp4pfwtK+mflqVp0+Rv17TJJrPX7OwlszP/87s4GXd11t1p89LPxwSfYIw0yzFe8E3cBRN8gsOkWf6Fzz1ojRUVZiFi4hgjMxMxtdtLF16eAxB8E2/LBJ/gMGmWf/7Bz6ios85a45yzxhpnnbXlUslayyLLK6vPnj0XfBPjmeATHCbN8s9++lMAnLPOOWusc9Y6W61UG7WatdZYA8U//3X11799LvgmxjDBJzggzfJvfP2rb167bp0pOWedc8ZaZyuVaqPRuKdetcYpoCpENPfqq+f/8OfgmziMCT7BAWmWH/nyF6/fuFlyu6wztUq10Wh8cO7FirUXP/IxVVHRlbXVVy69ls5mgAbfwgEm+AQHpFn+7ROPLdy4sbSyXCqVS85Vq9UHXp+rWld2tmpdxeLihz6qqpffeOM3z50HNPgWDmOCT3CYNMsBnDh6ZKHd3tzavm/+9apzdeuqzlUsqs5WrJu9//0L7cVz538HaPAtHMYEn2CMNLsCGABHH36ovbz83osv15yrOVezrupctWyz5IEf/ewXgAIGQPBNHGCCTzBemuXTjx5r1Ou9Xu9Wp7O5tRmJLCyGur2dv/79haWllQ/7D0xOTv7xb88DCL6JESb4BOOlWT4z/QSGWDhGYqIY4+LK6uraigiIYmOgXq/XamvrnesLC7PZS8E3sccEn2CMNMtnpqcAgz3dbne90+kXhSoUoqLGmkq5XCqVy6XS5tb24vLyW9euZXOvBN/EkAk+wWHSLD/12LFarY4R6+vr292uMKuqqIqKipbL5e//5AyAR77ypZ1+v724ND8/P3fpcvBNACb4BAekWf7oka/d+557MYKYVtfWYiRRURbWAVHRhfbN9B8XOp1NAEcffqjb67UXl/L5+YuXLgffNMEnOCDN8u9OHS+VSvgf3en1OpsbFFlVhIVVhVlViei1/MrshZc++YmP3/++pFGvt5cWnzrzDKDBt0zwCfZLs/xbxx6ZmJjELsXQxsZmt9/jyKIsrKyiLKLCKssrKwb2vlZzcnJiY2Pz1Pd+AGjwLQAm+AT7pVk+Mz2F/VRx69atyETEIiyiMqAiLKwiJBOT90w0Gre73Zmnfwpo8C0MmeATjEiz/NTxb9aqFezXL+L29nakSMQiLKIyoCIsrKKslWpZWJ7++S8BDb6FPSb4BCPSLJ+ZnsIB27e7/X6fmWOMrKrMLCrKwirKIrrT2/nV2XO4wwbfxB4TfII9aZY/+cTjzlmMUMXA1tYWDTBHIhlgZlURVlEWVZFIcfbFbGl1tdPpADb4JoZM8AlGpFk+Mz2FPaoYYOZut0vMRBSJZICZVVVYRAciUVEU127cXFhY2Op0ljqbgAbfAmCCTzAizfKZ6SkAqvivXq9HMRIzMccYWURUlIVVlYWEioJiUdzu71ydvzp36TKgwbcwZIJPsF+a5adPTmFEr9cjJopEzJGImVVFWFhVmGOkPhWxKHpFcXOxfSGbAzT4FoZM8AkOSLP89Mkp7NJev093MBNFIpYBFlZRLSjGWPxHrx83t7aef2EW0OBbGDLBJzhMmuWnT04BSsQDxJEiE3OMkWWAVTQyFUWMsSgK6hdFr9///Z/+AmjwLewxwScYI83y0ydPEDMTEzPFSMyRiYlFWFiKOFD0C3r27Dns0uBbGGGCTzBemuXfmTrOTETMdEdkImIRjjE+deYZ7FIMBd/Cfib4BG8rzfITR4/IgKqIsDATP/nDH+MOxVDwLYxhgk/wTtIsx/9TAMG38E5M8AnuQppdwYjgW7g7JvgE7yYTfIJ3078BZSzdrme2es0AAAAASUVORK5CYII="}]}

/***/ }),

/***/ "./JSONs/LocalStorageCrystalInit.json":
/*!********************************************!*\
  !*** ./JSONs/LocalStorageCrystalInit.json ***!
  \********************************************/
/***/ ((module) => {

module.exports = {"Sealed clue scroll (elite)":{"tab":"first","tier":["triskelion"],"quantity":{"triskelion":0},"order":1},"Sealed clue scroll (master)":{"tab":"first","tier":["triskelion"],"quantity":{"triskelion":0},"order":2},"Coins":{"tab":"first","tier":["taverley"],"quantity":{"taverley":0},"order":3},"Uncut dragonstone":{"tab":"first","tier":["taverley","prifddinas","triskelion"],"quantity":{"taverley":0,"prifddinas":0,"triskelion":0},"order":4},"Uncut diamond":{"tab":"first","tier":["taverley","prifddinas","triskelion"],"quantity":{"taverley":0,"prifddinas":0,"triskelion":0},"order":5},"Uncut ruby":{"tab":"first","tier":["taverley","prifddinas","triskelion"],"quantity":{"taverley":0,"prifddinas":0,"triskelion":0},"order":6},"Uncut onyx":{"tab":"first","tier":["triskelion"],"quantity":{"triskelion":0},"order":7},"Onyx dust":{"tab":"first","tier":["alchemist"],"quantity":{"alchemist":0},"order":8},"Onyx bolt tips":{"tab":"first","tier":["alchemist"],"quantity":{"alchemist":0},"order":9},"Hydrix bolt tips":{"tab":"first","tier":["alchemist"],"quantity":{"alchemist":0},"order":10},"Starved ancient effigy":{"tab":"first","tier":["triskelion"],"quantity":{"triskelion":0},"order":11},"Loop half of a key":{"tab":"first","tier":["taverley","prifddinas","triskelion"],"quantity":{"taverley":0,"prifddinas":0,"triskelion":0},"order":12},"Tooth half of a key":{"tab":"first","tier":["taverley","prifddinas","triskelion"],"quantity":{"taverley":0,"prifddinas":0,"triskelion":0},"order":13},"Crystal key":{"tab":"first","tier":["triskelion"],"quantity":{"triskelion":0},"order":14},"Sinister key":{"tab":"first","tier":["triskelion"],"quantity":{"triskelion":0},"order":15},"Alchemist's key":{"tab":"first","tier":["alchemist"],"quantity":{"alchemist":0},"order":16},"Crystal triskelion fragment 1":{"tab":"first","tier":["triskelion"],"quantity":{"triskelion":0},"order":17},"Crystal triskelion fragment 2":{"tab":"first","tier":["triskelion"],"quantity":{"triskelion":0},"order":18},"Crystal triskelion fragment 3":{"tab":"first","tier":["triskelion"],"quantity":{"triskelion":0},"order":19},"Dragon pickaxe":{"tab":"first","tier":["triskelion"],"quantity":{"triskelion":0},"order":20},"Dragon hatchet":{"tab":"first","tier":["triskelion"],"quantity":{"triskelion":0},"order":21},"Dragonstone helm":{"tab":"first","tier":["taverley","prifddinas","triskelion"],"quantity":{"taverley":0,"prifddinas":0,"triskelion":0},"order":22},"Dragonstone hauberk":{"tab":"first","tier":["taverley","prifddinas","triskelion"],"quantity":{"taverley":0,"prifddinas":0,"triskelion":0},"order":23},"Dragonstone greaves":{"tab":"first","tier":["taverley","prifddinas","triskelion"],"quantity":{"taverley":0,"prifddinas":0,"triskelion":0},"order":24},"Dragonstone gauntlets":{"tab":"first","tier":["taverley","prifddinas","triskelion"],"quantity":{"taverley":0,"prifddinas":0,"triskelion":0},"order":25},"Dragonstone boots":{"tab":"first","tier":["taverley","prifddinas","triskelion"],"quantity":{"taverley":0,"prifddinas":0,"triskelion":0},"order":26},"Marrentill seed":{"tab":"second","tier":["alchemist"],"quantity":{"alchemist":0},"order":27},"Kwuarm seed":{"tab":"second","tier":["alchemist"],"quantity":{"alchemist":0},"order":28},"Cadantine seed":{"tab":"second","tier":["alchemist"],"quantity":{"alchemist":0},"order":29},"Lantadyme seed":{"tab":"second","tier":["taverley","triskelion"],"quantity":{"taverley":0,"triskelion":0},"order":30},"Dwarf weed seed":{"tab":"second","tier":["prifddinas","triskelion"],"quantity":{"prifddinas":0,"triskelion":0},"order":31},"Torstol seed":{"tab":"second","tier":["prifddinas","triskelion"],"quantity":{"prifddinas":0,"triskelion":0},"order":32},"Yew seed":{"tab":"second","tier":["prifddinas","triskelion"],"quantity":{"prifddinas":0,"triskelion":0},"order":33},"Magic seed":{"tab":"second","tier":["triskelion"],"quantity":{"triskelion":0},"order":34},"Elder seed":{"tab":"second","tier":["prifddinas"],"quantity":{"prifddinas":0},"order":35},"Calquat tree seed":{"tab":"second","tier":["taverley","triskelion"],"quantity":{"taverley":0,"triskelion":0},"order":36},"Papaya tree seed":{"tab":"second","tier":["taverley","prifddinas","triskelion"],"quantity":{"taverley":0,"prifddinas":0,"triskelion":0},"order":37},"Palm tree seed":{"tab":"second","tier":["taverley","triskelion"],"quantity":{"taverley":0,"triskelion":0},"order":38},"Money tree seed":{"tab":"second","tier":["taverley","prifddinas","triskelion"],"quantity":{"taverley":0,"prifddinas":0,"triskelion":0},"order":39},"Carambola seed":{"tab":"second","tier":["triskelion"],"quantity":{"triskelion":0},"order":40},"Golden dragonfruit seed":{"tab":"second","tier":["triskelion"],"quantity":{"triskelion":0},"order":41},"Grimy harralander":{"tab":"second","tier":["alchemist"],"quantity":{"alchemist":0},"order":42},"Grimy toadflax":{"tab":"second","tier":["alchemist"],"quantity":{"alchemist":0},"order":43},"Grimy irit":{"tab":"second","tier":["alchemist"],"quantity":{"alchemist":0},"order":44},"Grimy avantoe":{"tab":"second","tier":["triskelion"],"quantity":{"triskelion":0},"order":45},"Grimy snapdragon":{"tab":"second","tier":["triskelion"],"quantity":{"triskelion":0},"order":46},"Grimy cadantine":{"tab":"second","tier":["alchemist"],"quantity":{"alchemist":0},"order":47},"Grimy lantadyme":{"tab":"second","tier":["prifddinas","triskelion"],"quantity":{"prifddinas":0,"triskelion":0},"order":48},"Grimy dwarf weed":{"tab":"second","tier":["triskelion"],"quantity":{"triskelion":0},"order":49},"Grimy torstol":{"tab":"second","tier":["taverley","triskelion"],"quantity":{"taverley":0,"triskelion":0},"order":50},"Magic logs":{"tab":"second","tier":["triskelion"],"quantity":{"triskelion":0},"order":51},"Cave nightshade":{"tab":"second","tier":["alchemist"],"quantity":{"alchemist":0},"order":52},"Poison ivy berries":{"tab":"second","tier":["alchemist"],"quantity":{"alchemist":0},"order":53},"Crystal tree blossom":{"tab":"second","tier":["prifddinas"],"quantity":{"prifddinas":0},"order":54},"Crystal motherlode shard":{"tab":"second","tier":["prifddinas"],"quantity":{"prifddinas":0},"order":55},"Corrupted ore":{"tab":"second","tier":["prifddinas"],"quantity":{"prifddinas":0},"order":56},"Iron stone spirit":{"tab":"second","tier":["taverley"],"quantity":{"taverley":0},"order":57},"Coal stone spirit":{"tab":"second","tier":["taverley"],"quantity":{"taverley":0},"order":58},"Runite stone spirit":{"tab":"second","tier":["taverley","prifddinas"],"quantity":{"taverley":0,"prifddinas":0},"order":59},"Orichalcite stone spirit":{"tab":"second","tier":["prifddinas"],"quantity":{"prifddinas":0},"order":60},"Drakolith stone spirit":{"tab":"second","tier":["prifddinas"],"quantity":{"prifddinas":0},"order":61},"Banite stone spirit":{"tab":"second","tier":["triskelion"],"quantity":{"triskelion":0},"order":62},"Light animica stone spirit":{"tab":"second","tier":["triskelion"],"quantity":{"triskelion":0},"order":63},"Dark animica stone spirit":{"tab":"second","tier":["triskelion"],"quantity":{"triskelion":0},"order":64},"Air rune":{"tab":"third","tier":["taverley"],"quantity":{"taverley":0},"order":65},"Water rune":{"tab":"third","tier":["taverley"],"quantity":{"taverley":0},"order":66},"Earth rune":{"tab":"third","tier":["taverley"],"quantity":{"taverley":0},"order":67},"Fire rune":{"tab":"third","tier":["taverley"],"quantity":{"taverley":0},"order":68},"Body rune":{"tab":"third","tier":["taverley"],"quantity":{"taverley":0},"order":69},"Mind rune":{"tab":"third","tier":["taverley"],"quantity":{"taverley":0},"order":70},"Chaos rune":{"tab":"third","tier":["taverley"],"quantity":{"taverley":0},"order":71},"Death rune":{"tab":"third","tier":["taverley"],"quantity":{"taverley":0},"order":72},"Cosmic rune":{"tab":"third","tier":["taverley"],"quantity":{"taverley":0},"order":73},"Law rune":{"tab":"third","tier":["taverley"],"quantity":{"taverley":0},"order":74},"Nature rune":{"tab":"third","tier":["taverley"],"quantity":{"taverley":0},"order":75},"Mud rune":{"tab":"third","tier":["alchemist"],"quantity":{"alchemist":0},"order":76},"Medium plated rune salvage":{"tab":"third","tier":["prifddinas"],"quantity":{"prifddinas":0},"order":77},"Large plated rune salvage":{"tab":"third","tier":["taverley","prifddinas"],"quantity":{"taverley":0,"prifddinas":0},"order":78},"Huge plated rune salvage":{"tab":"third","tier":["taverley"],"quantity":{"taverley":0},"order":79},"Huge bladed rune salvage":{"tab":"third","tier":["prifddinas"],"quantity":{"prifddinas":0},"order":80},"Fire talisman":{"tab":"third","tier":["prifddinas"],"quantity":{"prifddinas":0},"order":81},"Water talisman":{"tab":"third","tier":["prifddinas"],"quantity":{"prifddinas":0},"order":82},"Crimson charm":{"tab":"third","tier":["triskelion"],"quantity":{"triskelion":0},"order":83},"Blue charm":{"tab":"third","tier":["triskelion"],"quantity":{"triskelion":0},"order":84},"Impious ashes":{"tab":"third","tier":["alchemist"],"quantity":{"alchemist":0},"order":85},"Accursed ashes":{"tab":"third","tier":["alchemist"],"quantity":{"alchemist":0},"order":86},"Infernal ashes":{"tab":"third","tier":["alchemist"],"quantity":{"alchemist":0},"order":87},"Unicorn horn dust":{"tab":"third","tier":["alchemist"],"quantity":{"alchemist":0},"order":88},"Dragon scale dust":{"tab":"third","tier":["alchemist"],"quantity":{"alchemist":0},"order":89},"Raw rat meat":{"tab":"third","tier":["alchemist"],"quantity":{"alchemist":0},"order":90},"Snake hide":{"tab":"third","tier":["alchemist"],"quantity":{"alchemist":0},"order":91},"Wine of Saradomin":{"tab":"third","tier":["alchemist"],"quantity":{"alchemist":0},"order":92},"Wine of Zamorak":{"tab":"third","tier":["alchemist"],"quantity":{"alchemist":0},"order":93}}

/***/ }),

/***/ "../node_modules/pixelmatch/index.js":
/*!*******************************************!*\
  !*** ../node_modules/pixelmatch/index.js ***!
  \*******************************************/
/***/ ((module) => {

"use strict";


module.exports = pixelmatch;

const defaultOptions = {
    threshold: 0.1,         // matching threshold (0 to 1); smaller is more sensitive
    includeAA: false,       // whether to skip anti-aliasing detection
    alpha: 0.1,             // opacity of original image in diff ouput
    aaColor: [255, 255, 0], // color of anti-aliased pixels in diff output
    diffColor: [255, 0, 0], // color of different pixels in diff output
    diffColorAlt: null,     // whether to detect dark on light differences between img1 and img2 and set an alternative color to differentiate between the two
    diffMask: false         // draw the diff over a transparent background (a mask)
};

function pixelmatch(img1, img2, output, width, height, options) {

    if (!isPixelData(img1) || !isPixelData(img2) || (output && !isPixelData(output)))
        throw new Error('Image data: Uint8Array, Uint8ClampedArray or Buffer expected.');

    if (img1.length !== img2.length || (output && output.length !== img1.length))
        throw new Error('Image sizes do not match.');

    if (img1.length !== width * height * 4) throw new Error('Image data size does not match width/height.');

    options = Object.assign({}, defaultOptions, options);

    // check if images are identical
    const len = width * height;
    const a32 = new Uint32Array(img1.buffer, img1.byteOffset, len);
    const b32 = new Uint32Array(img2.buffer, img2.byteOffset, len);
    let identical = true;

    for (let i = 0; i < len; i++) {
        if (a32[i] !== b32[i]) { identical = false; break; }
    }
    if (identical) { // fast path if identical
        if (output && !options.diffMask) {
            for (let i = 0; i < len; i++) drawGrayPixel(img1, 4 * i, options.alpha, output);
        }
        return 0;
    }

    // maximum acceptable square distance between two colors;
    // 35215 is the maximum possible value for the YIQ difference metric
    const maxDelta = 35215 * options.threshold * options.threshold;
    let diff = 0;

    // compare each pixel of one image against the other one
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {

            const pos = (y * width + x) * 4;

            // squared YUV distance between colors at this pixel position, negative if the img2 pixel is darker
            const delta = colorDelta(img1, img2, pos, pos);

            // the color difference is above the threshold
            if (Math.abs(delta) > maxDelta) {
                // check it's a real rendering difference or just anti-aliasing
                if (!options.includeAA && (antialiased(img1, x, y, width, height, img2) ||
                                           antialiased(img2, x, y, width, height, img1))) {
                    // one of the pixels is anti-aliasing; draw as yellow and do not count as difference
                    // note that we do not include such pixels in a mask
                    if (output && !options.diffMask) drawPixel(output, pos, ...options.aaColor);

                } else {
                    // found substantial difference not caused by anti-aliasing; draw it as such
                    if (output) {
                        drawPixel(output, pos, ...(delta < 0 && options.diffColorAlt || options.diffColor));
                    }
                    diff++;
                }

            } else if (output) {
                // pixels are similar; draw background as grayscale image blended with white
                if (!options.diffMask) drawGrayPixel(img1, pos, options.alpha, output);
            }
        }
    }

    // return the number of different pixels
    return diff;
}

function isPixelData(arr) {
    // work around instanceof Uint8Array not working properly in some Jest environments
    return ArrayBuffer.isView(arr) && arr.constructor.BYTES_PER_ELEMENT === 1;
}

// check if a pixel is likely a part of anti-aliasing;
// based on "Anti-aliased Pixel and Intensity Slope Detector" paper by V. Vysniauskas, 2009

function antialiased(img, x1, y1, width, height, img2) {
    const x0 = Math.max(x1 - 1, 0);
    const y0 = Math.max(y1 - 1, 0);
    const x2 = Math.min(x1 + 1, width - 1);
    const y2 = Math.min(y1 + 1, height - 1);
    const pos = (y1 * width + x1) * 4;
    let zeroes = x1 === x0 || x1 === x2 || y1 === y0 || y1 === y2 ? 1 : 0;
    let min = 0;
    let max = 0;
    let minX, minY, maxX, maxY;

    // go through 8 adjacent pixels
    for (let x = x0; x <= x2; x++) {
        for (let y = y0; y <= y2; y++) {
            if (x === x1 && y === y1) continue;

            // brightness delta between the center pixel and adjacent one
            const delta = colorDelta(img, img, pos, (y * width + x) * 4, true);

            // count the number of equal, darker and brighter adjacent pixels
            if (delta === 0) {
                zeroes++;
                // if found more than 2 equal siblings, it's definitely not anti-aliasing
                if (zeroes > 2) return false;

            // remember the darkest pixel
            } else if (delta < min) {
                min = delta;
                minX = x;
                minY = y;

            // remember the brightest pixel
            } else if (delta > max) {
                max = delta;
                maxX = x;
                maxY = y;
            }
        }
    }

    // if there are no both darker and brighter pixels among siblings, it's not anti-aliasing
    if (min === 0 || max === 0) return false;

    // if either the darkest or the brightest pixel has 3+ equal siblings in both images
    // (definitely not anti-aliased), this pixel is anti-aliased
    return (hasManySiblings(img, minX, minY, width, height) && hasManySiblings(img2, minX, minY, width, height)) ||
           (hasManySiblings(img, maxX, maxY, width, height) && hasManySiblings(img2, maxX, maxY, width, height));
}

// check if a pixel has 3+ adjacent pixels of the same color.
function hasManySiblings(img, x1, y1, width, height) {
    const x0 = Math.max(x1 - 1, 0);
    const y0 = Math.max(y1 - 1, 0);
    const x2 = Math.min(x1 + 1, width - 1);
    const y2 = Math.min(y1 + 1, height - 1);
    const pos = (y1 * width + x1) * 4;
    let zeroes = x1 === x0 || x1 === x2 || y1 === y0 || y1 === y2 ? 1 : 0;

    // go through 8 adjacent pixels
    for (let x = x0; x <= x2; x++) {
        for (let y = y0; y <= y2; y++) {
            if (x === x1 && y === y1) continue;

            const pos2 = (y * width + x) * 4;
            if (img[pos] === img[pos2] &&
                img[pos + 1] === img[pos2 + 1] &&
                img[pos + 2] === img[pos2 + 2] &&
                img[pos + 3] === img[pos2 + 3]) zeroes++;

            if (zeroes > 2) return true;
        }
    }

    return false;
}

// calculate color difference according to the paper "Measuring perceived color difference
// using YIQ NTSC transmission color space in mobile applications" by Y. Kotsarenko and F. Ramos

function colorDelta(img1, img2, k, m, yOnly) {
    let r1 = img1[k + 0];
    let g1 = img1[k + 1];
    let b1 = img1[k + 2];
    let a1 = img1[k + 3];

    let r2 = img2[m + 0];
    let g2 = img2[m + 1];
    let b2 = img2[m + 2];
    let a2 = img2[m + 3];

    if (a1 === a2 && r1 === r2 && g1 === g2 && b1 === b2) return 0;

    if (a1 < 255) {
        a1 /= 255;
        r1 = blend(r1, a1);
        g1 = blend(g1, a1);
        b1 = blend(b1, a1);
    }

    if (a2 < 255) {
        a2 /= 255;
        r2 = blend(r2, a2);
        g2 = blend(g2, a2);
        b2 = blend(b2, a2);
    }

    const y1 = rgb2y(r1, g1, b1);
    const y2 = rgb2y(r2, g2, b2);
    const y = y1 - y2;

    if (yOnly) return y; // brightness difference only

    const i = rgb2i(r1, g1, b1) - rgb2i(r2, g2, b2);
    const q = rgb2q(r1, g1, b1) - rgb2q(r2, g2, b2);

    const delta = 0.5053 * y * y + 0.299 * i * i + 0.1957 * q * q;

    // encode whether the pixel lightens or darkens in the sign
    return y1 > y2 ? -delta : delta;
}

function rgb2y(r, g, b) { return r * 0.29889531 + g * 0.58662247 + b * 0.11448223; }
function rgb2i(r, g, b) { return r * 0.59597799 - g * 0.27417610 - b * 0.32180189; }
function rgb2q(r, g, b) { return r * 0.21147017 - g * 0.52261711 + b * 0.31114694; }

// blend semi-transparent color with white
function blend(c, a) {
    return 255 + (c - 255) * a;
}

function drawPixel(output, pos, r, g, b) {
    output[pos + 0] = r;
    output[pos + 1] = g;
    output[pos + 2] = b;
    output[pos + 3] = 255;
}

function drawGrayPixel(img, i, alpha, output) {
    const r = img[i + 0];
    const g = img[i + 1];
    const b = img[i + 2];
    const val = blend(rgb2y(r, g, b), alpha * img[i + 3] / 255);
    drawPixel(output, i, val, val, val);
}


/***/ }),

/***/ "../node_modules/resemblejs/compareImages.js":
/*!***************************************************!*\
  !*** ../node_modules/resemblejs/compareImages.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const resemble = __webpack_require__(/*! ./resemble */ "../node_modules/resemblejs/resemble.js");

module.exports = function compareImages(image1, image2, options) {
    return new Promise((resolve, reject) => {
        resemble.compare(image1, image2, options, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};


/***/ }),

/***/ "../node_modules/resemblejs/node_modules/canvas/browser.js":
/*!*****************************************************************!*\
  !*** ../node_modules/resemblejs/node_modules/canvas/browser.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* globals document, ImageData */

const parseFont = __webpack_require__(/*! ./lib/parse-font */ "../node_modules/resemblejs/node_modules/canvas/lib/parse-font.js")

exports.parseFont = parseFont

exports.createCanvas = function (width, height) {
  return Object.assign(document.createElement('canvas'), { width: width, height: height })
}

exports.createImageData = function (array, width, height) {
  // Browser implementation of ImageData looks at the number of arguments passed
  switch (arguments.length) {
    case 0: return new ImageData()
    case 1: return new ImageData(array)
    case 2: return new ImageData(array, width)
    default: return new ImageData(array, width, height)
  }
}

exports.loadImage = function (src, options) {
  return new Promise(function (resolve, reject) {
    const image = Object.assign(document.createElement('img'), options)

    function cleanup () {
      image.onload = null
      image.onerror = null
    }

    image.onload = function () { cleanup(); resolve(image) }
    image.onerror = function () { cleanup(); reject(new Error('Failed to load the image "' + src + '"')) }

    image.src = src
  })
}


/***/ }),

/***/ "../node_modules/resemblejs/node_modules/canvas/lib/parse-font.js":
/*!************************************************************************!*\
  !*** ../node_modules/resemblejs/node_modules/canvas/lib/parse-font.js ***!
  \************************************************************************/
/***/ ((module) => {

"use strict";


/**
 * Font RegExp helpers.
 */

const weights = 'bold|bolder|lighter|[1-9]00'
const styles = 'italic|oblique'
const variants = 'small-caps'
const stretches = 'ultra-condensed|extra-condensed|condensed|semi-condensed|semi-expanded|expanded|extra-expanded|ultra-expanded'
const units = 'px|pt|pc|in|cm|mm|%|em|ex|ch|rem|q'
const string = '\'([^\']+)\'|"([^"]+)"|[\\w\\s-]+'

// [ [ <‘font-style’> || <font-variant-css21> || <‘font-weight’> || <‘font-stretch’> ]?
//    <‘font-size’> [ / <‘line-height’> ]? <‘font-family’> ]
// https://drafts.csswg.org/css-fonts-3/#font-prop
const weightRe = new RegExp(`(${weights}) +`, 'i')
const styleRe = new RegExp(`(${styles}) +`, 'i')
const variantRe = new RegExp(`(${variants}) +`, 'i')
const stretchRe = new RegExp(`(${stretches}) +`, 'i')
const sizeFamilyRe = new RegExp(
  `([\\d\\.]+)(${units}) *((?:${string})( *, *(?:${string}))*)`)

/**
 * Cache font parsing.
 */

const cache = {}

const defaultHeight = 16 // pt, common browser default

/**
 * Parse font `str`.
 *
 * @param {String} str
 * @return {Object} Parsed font. `size` is in device units. `unit` is the unit
 *   appearing in the input string.
 * @api private
 */

module.exports = str => {
  // Cached
  if (cache[str]) return cache[str]

  // Try for required properties first.
  const sizeFamily = sizeFamilyRe.exec(str)
  if (!sizeFamily) return // invalid

  // Default values and required properties
  const font = {
    weight: 'normal',
    style: 'normal',
    stretch: 'normal',
    variant: 'normal',
    size: parseFloat(sizeFamily[1]),
    unit: sizeFamily[2],
    family: sizeFamily[3].replace(/["']/g, '').replace(/ *, */g, ',')
  }

  // Optional, unordered properties.
  let weight, style, variant, stretch
  // Stop search at `sizeFamily.index`
  const substr = str.substring(0, sizeFamily.index)
  if ((weight = weightRe.exec(substr))) font.weight = weight[1]
  if ((style = styleRe.exec(substr))) font.style = style[1]
  if ((variant = variantRe.exec(substr))) font.variant = variant[1]
  if ((stretch = stretchRe.exec(substr))) font.stretch = stretch[1]

  // Convert to device units. (`font.unit` is the original unit)
  // TODO: ch, ex
  switch (font.unit) {
    case 'pt':
      font.size /= 0.75
      break
    case 'pc':
      font.size *= 16
      break
    case 'in':
      font.size *= 96
      break
    case 'cm':
      font.size *= 96.0 / 2.54
      break
    case 'mm':
      font.size *= 96.0 / 25.4
      break
    case '%':
      // TODO disabled because existing unit tests assume 100
      // font.size *= defaultHeight / 100 / 0.75
      break
    case 'em':
    case 'rem':
      font.size *= defaultHeight / 0.75
      break
    case 'q':
      font.size *= 96 / 25.4 / 4
      break
  }

  return (cache[str] = font)
}


/***/ }),

/***/ "../node_modules/resemblejs/resemble.js":
/*!**********************************************!*\
  !*** ../node_modules/resemblejs/resemble.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
James Cryer / Huddle
URL: https://github.com/Huddle/Resemble.js
*/

var naiveFallback = function () {
    // ISC (c) 2011-2019 https://github.com/medikoo/es5-ext/blob/master/global.js
    if (typeof self === "object" && self) {
        return self;
    }
    if (typeof window === "object" && window) {
        return window;
    }
    throw new Error("Unable to resolve global `this`");
};

var getGlobalThis = function () {
    // ISC (c) 2011-2019 https://github.com/medikoo/es5-ext/blob/master/global.js
    // Fallback to standard globalThis if available
    if (typeof globalThis === "object" && globalThis) {
        return globalThis;
    }

    try {
        Object.defineProperty(Object.prototype, "__global__", {
            get: function () {
                return this;
            },
            configurable: true
        });
    } catch (error) {
        return naiveFallback();
    }
    try {
        // eslint-disable-next-line no-undef
        if (!__global__) {
            return naiveFallback();
        }
        return __global__; // eslint-disable-line no-undef
    } finally {
        delete Object.prototype.__global__;
    }
};

var isNode = function () {
    const globalPolyfill = getGlobalThis();
    return typeof globalPolyfill.process !== "undefined" && globalPolyfill.process.versions && globalPolyfill.process.versions.node;
};

(function (root, factory) {
    "use strict";
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}
})(this /* eslint-disable-line no-invalid-this*/, function () {
    "use strict";

    var Img;
    var Canvas;
    var loadNodeCanvasImage;

    if (isNode()) {
        Canvas = __webpack_require__(/*! canvas */ "../node_modules/resemblejs/node_modules/canvas/browser.js"); // eslint-disable-line global-require
        Img = Canvas.Image;
        loadNodeCanvasImage = Canvas.loadImage;
    } else {
        Img = Image;
    }

    function createCanvas(width, height) {
        if (isNode()) {
            return Canvas.createCanvas(width, height);
        }

        var cnvs = document.createElement("canvas");
        cnvs.width = width;
        cnvs.height = height;
        return cnvs;
    }

    var oldGlobalSettings = {};
    var globalOutputSettings = oldGlobalSettings;

    var resemble = function (fileData) {
        var pixelTransparency = 1;

        var errorPixelColor = {
            // Color for Error Pixels. Between 0 and 255.
            red: 255,
            green: 0,
            blue: 255,
            alpha: 255
        };

        var targetPix = { r: 0, g: 0, b: 0, a: 0 }; // isAntialiased

        var errorPixelTransform = {
            flat: function (px, offset) {
                px[offset] = errorPixelColor.red;
                px[offset + 1] = errorPixelColor.green;
                px[offset + 2] = errorPixelColor.blue;
                px[offset + 3] = errorPixelColor.alpha;
            },
            movement: function (px, offset, d1, d2) {
                px[offset] = (d2.r * (errorPixelColor.red / 255) + errorPixelColor.red) / 2;
                px[offset + 1] = (d2.g * (errorPixelColor.green / 255) + errorPixelColor.green) / 2;
                px[offset + 2] = (d2.b * (errorPixelColor.blue / 255) + errorPixelColor.blue) / 2;
                px[offset + 3] = d2.a;
            },
            flatDifferenceIntensity: function (px, offset, d1, d2) {
                px[offset] = errorPixelColor.red;
                px[offset + 1] = errorPixelColor.green;
                px[offset + 2] = errorPixelColor.blue;
                px[offset + 3] = colorsDistance(d1, d2);
            },
            movementDifferenceIntensity: function (px, offset, d1, d2) {
                var ratio = (colorsDistance(d1, d2) / 255) * 0.8;

                px[offset] = (1 - ratio) * (d2.r * (errorPixelColor.red / 255)) + ratio * errorPixelColor.red;
                px[offset + 1] = (1 - ratio) * (d2.g * (errorPixelColor.green / 255)) + ratio * errorPixelColor.green;
                px[offset + 2] = (1 - ratio) * (d2.b * (errorPixelColor.blue / 255)) + ratio * errorPixelColor.blue;
                px[offset + 3] = d2.a;
            },
            diffOnly: function (px, offset, d1, d2) {
                px[offset] = d2.r;
                px[offset + 1] = d2.g;
                px[offset + 2] = d2.b;
                px[offset + 3] = d2.a;
            }
        };

        var errorPixel = errorPixelTransform.flat;
        var errorType;
        var boundingBoxes;
        var ignoredBoxes;
        var ignoreAreasColoredWith;
        var largeImageThreshold = 1200;
        var useCrossOrigin = true;
        var data = {};
        var images = [];
        var updateCallbackArray = [];

        var tolerance = {
            // between 0 and 255
            red: 16,
            green: 16,
            blue: 16,
            alpha: 16,
            minBrightness: 16,
            maxBrightness: 240
        };

        var ignoreAntialiasing = false;
        var ignoreColors = false;
        var scaleToSameSize = false;
        var compareOnly = false;
        var returnEarlyThreshold;

        function colorsDistance(c1, c2) {
            return (Math.abs(c1.r - c2.r) + Math.abs(c1.g - c2.g) + Math.abs(c1.b - c2.b)) / 3;
        }

        function withinBoundingBox(x, y, width, height, box) {
            return x > (box.left || 0) && x < (box.right || width) && y > (box.top || 0) && y < (box.bottom || height);
        }

        function withinComparedArea(x, y, width, height, pixel2) {
            var isIncluded = true;
            var i;
            var boundingBox;
            var ignoredBox;
            var selected;
            var ignored;

            if (boundingBoxes instanceof Array) {
                selected = false;
                for (i = 0; i < boundingBoxes.length; i++) {
                    boundingBox = boundingBoxes[i];
                    if (withinBoundingBox(x, y, width, height, boundingBox)) {
                        selected = true;
                        break;
                    }
                }
            }
            if (ignoredBoxes instanceof Array) {
                ignored = true;
                for (i = 0; i < ignoredBoxes.length; i++) {
                    ignoredBox = ignoredBoxes[i];
                    if (withinBoundingBox(x, y, width, height, ignoredBox)) {
                        ignored = false;
                        break;
                    }
                }
            }

            if (ignoreAreasColoredWith) {
                return colorsDistance(pixel2, ignoreAreasColoredWith) !== 0;
            }

            if (selected === undefined && ignored === undefined) {
                return true;
            }
            if (selected === false && ignored === true) {
                return false;
            }
            if (selected === true || ignored === true) {
                isIncluded = true;
            }
            if (selected === false || ignored === false) {
                isIncluded = false;
            }
            return isIncluded;
        }

        function triggerDataUpdate() {
            var len = updateCallbackArray.length;
            var i;
            for (i = 0; i < len; i++) {
                if (typeof updateCallbackArray[i] === "function") {
                    updateCallbackArray[i](data);
                }
            }
        }

        function loop(w, h, callback) {
            var x;
            var y;

            for (x = 0; x < w; x++) {
                for (y = 0; y < h; y++) {
                    callback(x, y);
                }
            }
        }

        function parseImage(sourceImageData, width, height) {
            var pixelCount = 0;
            var redTotal = 0;
            var greenTotal = 0;
            var blueTotal = 0;
            var alphaTotal = 0;
            var brightnessTotal = 0;
            var whiteTotal = 0;
            var blackTotal = 0;

            loop(width, height, function (horizontalPos, verticalPos) {
                var offset = (verticalPos * width + horizontalPos) * 4;
                var red = sourceImageData[offset];
                var green = sourceImageData[offset + 1];
                var blue = sourceImageData[offset + 2];
                var alpha = sourceImageData[offset + 3];
                var brightness = getBrightness(red, green, blue);

                if (red === green && red === blue && alpha) {
                    if (red === 0) {
                        blackTotal++;
                    } else if (red === 255) {
                        whiteTotal++;
                    }
                }

                pixelCount++;

                redTotal += (red / 255) * 100;
                greenTotal += (green / 255) * 100;
                blueTotal += (blue / 255) * 100;
                alphaTotal += ((255 - alpha) / 255) * 100;
                brightnessTotal += (brightness / 255) * 100;
            });

            data.red = Math.floor(redTotal / pixelCount);
            data.green = Math.floor(greenTotal / pixelCount);
            data.blue = Math.floor(blueTotal / pixelCount);
            data.alpha = Math.floor(alphaTotal / pixelCount);
            data.brightness = Math.floor(brightnessTotal / pixelCount);
            data.white = Math.floor((whiteTotal / pixelCount) * 100);
            data.black = Math.floor((blackTotal / pixelCount) * 100);

            triggerDataUpdate();
        }

        function onLoadImage(hiddenImage, callback) {
            // don't assign to hiddenImage, see https://github.com/Huddle/Resemble.js/pull/87/commits/300d43352a2845aad289b254bfbdc7cd6a37e2d7
            var width = hiddenImage.width;
            var height = hiddenImage.height;

            if (scaleToSameSize && images.length === 1) {
                width = images[0].width;
                height = images[0].height;
            }

            var hiddenCanvas = createCanvas(width, height);
            var imageData;

            hiddenCanvas.getContext("2d").drawImage(hiddenImage, 0, 0, width, height);
            imageData = hiddenCanvas.getContext("2d").getImageData(0, 0, width, height);

            images.push(imageData);

            callback(imageData, width, height);
        }

        function loadImageData(fileDataForImage, callback) {
            var fileReader;
            var hiddenImage = new Img();

            if (!hiddenImage.setAttribute) {
                hiddenImage.setAttribute = function setAttribute() {};
            }

            if (useCrossOrigin) {
                hiddenImage.setAttribute("crossorigin", "anonymous");
            }

            hiddenImage.onerror = function (event) {
                hiddenImage.onload = null;
                hiddenImage.onerror = null; // fixes pollution between calls
                const error = event ? event + "" : "Unknown error";
                images.push({ error: `Failed to load image '${fileDataForImage}'. ${error}` });
                callback();
            };

            hiddenImage.onload = function () {
                hiddenImage.onload = null; // fixes pollution between calls
                hiddenImage.onerror = null;
                onLoadImage(hiddenImage, callback);
            };

            if (typeof fileDataForImage === "string") {
                hiddenImage.src = fileDataForImage;
                if (!isNode() && hiddenImage.complete && hiddenImage.naturalWidth > 0) {
                    hiddenImage.onload();
                }
            } else if (
                typeof fileDataForImage.data !== "undefined" &&
                typeof fileDataForImage.width === "number" &&
                typeof fileDataForImage.height === "number"
            ) {
                images.push(fileDataForImage);

                callback(fileDataForImage, fileDataForImage.width, fileDataForImage.height);
            } else if (typeof Buffer !== "undefined" && fileDataForImage instanceof Buffer) {
                // If we have Buffer, assume we're on Node+Canvas and its supported
                // hiddenImage.src = fileDataForImage;

                loadNodeCanvasImage(fileDataForImage)
                    .then(function (image) {
                        hiddenImage.onload = null; // fixes pollution between calls
                        hiddenImage.onerror = null;
                        onLoadImage(image, callback);
                    })
                    .catch(function (err) {
                        images.push({
                            error: err ? err + "" : "Image load error."
                        });
                        callback();
                    });
            } else {
                fileReader = new FileReader();
                fileReader.onload = function (event) {
                    hiddenImage.src = event.target.result;
                };
                fileReader.readAsDataURL(fileDataForImage);
            }
        }

        function isColorSimilar(a, b, color) {
            var absDiff = Math.abs(a - b);

            if (typeof a === "undefined") {
                return false;
            }
            if (typeof b === "undefined") {
                return false;
            }

            if (a === b) {
                return true;
            } else if (absDiff < tolerance[color]) {
                return true;
            }
            return false;
        }

        function isPixelBrightnessSimilar(d1, d2) {
            var alpha = isColorSimilar(d1.a, d2.a, "alpha");
            var brightness = isColorSimilar(d1.brightness, d2.brightness, "minBrightness");
            return brightness && alpha;
        }

        function getBrightness(r, g, b) {
            return 0.3 * r + 0.59 * g + 0.11 * b;
        }

        function isRGBSame(d1, d2) {
            var red = d1.r === d2.r;
            var green = d1.g === d2.g;
            var blue = d1.b === d2.b;
            return red && green && blue;
        }

        function isRGBSimilar(d1, d2) {
            var red = isColorSimilar(d1.r, d2.r, "red");
            var green = isColorSimilar(d1.g, d2.g, "green");
            var blue = isColorSimilar(d1.b, d2.b, "blue");
            var alpha = isColorSimilar(d1.a, d2.a, "alpha");

            return red && green && blue && alpha;
        }

        function isContrasting(d1, d2) {
            return Math.abs(d1.brightness - d2.brightness) > tolerance.maxBrightness;
        }

        function getHue(red, green, blue) {
            var r = red / 255;
            var g = green / 255;
            var b = blue / 255;
            var max = Math.max(r, g, b);
            var min = Math.min(r, g, b);
            var h;
            var d;

            if (max === min) {
                h = 0; // achromatic
            } else {
                d = max - min;
                switch (max) {
                    case r:
                        h = (g - b) / d + (g < b ? 6 : 0);
                        break;
                    case g:
                        h = (b - r) / d + 2;
                        break;
                    case b:
                        h = (r - g) / d + 4;
                        break;
                    default:
                        h /= 6;
                }
            }

            return h;
        }

        function isAntialiased(sourcePix, pix, cacheSet, verticalPos, horizontalPos, width) {
            var offset;
            var distance = 1;
            var i;
            var j;
            var hasHighContrastSibling = 0;
            var hasSiblingWithDifferentHue = 0;
            var hasEquivalentSibling = 0;

            addHueInfo(sourcePix);

            for (i = distance * -1; i <= distance; i++) {
                for (j = distance * -1; j <= distance; j++) {
                    if (i === 0 && j === 0) {
                        // ignore source pixel
                    } else {
                        offset = ((verticalPos + j) * width + (horizontalPos + i)) * 4;

                        if (!getPixelInfo(targetPix, pix, offset, cacheSet)) {
                            continue;
                        }

                        addBrightnessInfo(targetPix);
                        addHueInfo(targetPix);

                        if (isContrasting(sourcePix, targetPix)) {
                            hasHighContrastSibling++;
                        }

                        if (isRGBSame(sourcePix, targetPix)) {
                            hasEquivalentSibling++;
                        }

                        if (Math.abs(targetPix.h - sourcePix.h) > 0.3) {
                            hasSiblingWithDifferentHue++;
                        }

                        if (hasSiblingWithDifferentHue > 1 || hasHighContrastSibling > 1) {
                            return true;
                        }
                    }
                }
            }

            if (hasEquivalentSibling < 2) {
                return true;
            }

            return false;
        }

        function copyPixel(px, offset, pix) {
            if (errorType === "diffOnly") {
                return;
            }

            px[offset] = pix.r; // r
            px[offset + 1] = pix.g; // g
            px[offset + 2] = pix.b; // b
            px[offset + 3] = pix.a * pixelTransparency; // a
        }

        function copyGrayScalePixel(px, offset, pix) {
            if (errorType === "diffOnly") {
                return;
            }

            px[offset] = pix.brightness; // r
            px[offset + 1] = pix.brightness; // g
            px[offset + 2] = pix.brightness; // b
            px[offset + 3] = pix.a * pixelTransparency; // a
        }

        function getPixelInfo(dst, pix, offset) {
            if (pix.length > offset) {
                dst.r = pix[offset];
                dst.g = pix[offset + 1];
                dst.b = pix[offset + 2];
                dst.a = pix[offset + 3];

                return true;
            }

            return false;
        }

        function addBrightnessInfo(pix) {
            pix.brightness = getBrightness(pix.r, pix.g, pix.b); // 'corrected' lightness
        }

        function addHueInfo(pix) {
            pix.h = getHue(pix.r, pix.g, pix.b);
        }

        function analyseImages(img1, img2, width, height) {
            var data1 = img1.data;
            var data2 = img2.data;
            var hiddenCanvas;
            var context;
            var imgd;
            var pix;

            if (!compareOnly) {
                hiddenCanvas = createCanvas(width, height);

                context = hiddenCanvas.getContext("2d");
                imgd = context.createImageData(width, height);
                pix = imgd.data;
            }

            var mismatchCount = 0;
            var diffBounds = {
                top: height,
                left: width,
                bottom: 0,
                right: 0
            };
            var updateBounds = function (x, y) {
                diffBounds.left = Math.min(x, diffBounds.left);
                diffBounds.right = Math.max(x, diffBounds.right);
                diffBounds.top = Math.min(y, diffBounds.top);
                diffBounds.bottom = Math.max(y, diffBounds.bottom);
            };

            var time = Date.now();

            var skip;

            if (!!largeImageThreshold && ignoreAntialiasing && (width > largeImageThreshold || height > largeImageThreshold)) {
                skip = 6;
            }

            var pixel1 = { r: 0, g: 0, b: 0, a: 0 };
            var pixel2 = { r: 0, g: 0, b: 0, a: 0 };

            var skipTheRest = false;

            loop(width, height, function (horizontalPos, verticalPos) {
                if (skipTheRest) {
                    return;
                }

                if (skip) {
                    // only skip if the image isn't small
                    if (verticalPos % skip === 0 || horizontalPos % skip === 0) {
                        return;
                    }
                }

                var offset = (verticalPos * width + horizontalPos) * 4;
                if (!getPixelInfo(pixel1, data1, offset, 1) || !getPixelInfo(pixel2, data2, offset, 2)) {
                    return;
                }

                var isWithinComparedArea = withinComparedArea(horizontalPos, verticalPos, width, height, pixel2);

                if (ignoreColors) {
                    addBrightnessInfo(pixel1);
                    addBrightnessInfo(pixel2);

                    if (isPixelBrightnessSimilar(pixel1, pixel2) || !isWithinComparedArea) {
                        if (!compareOnly) {
                            copyGrayScalePixel(pix, offset, pixel2);
                        }
                    } else {
                        if (!compareOnly) {
                            errorPixel(pix, offset, pixel1, pixel2);
                        }

                        mismatchCount++;
                        updateBounds(horizontalPos, verticalPos);
                    }
                    return;
                }

                if (isRGBSimilar(pixel1, pixel2) || !isWithinComparedArea) {
                    if (!compareOnly) {
                        copyPixel(pix, offset, pixel1);
                    }
                } else if (
                    ignoreAntialiasing &&
                    (addBrightnessInfo(pixel1), // jit pixel info augmentation looks a little weird, sorry.
                    addBrightnessInfo(pixel2),
                    isAntialiased(pixel1, data1, 1, verticalPos, horizontalPos, width) || isAntialiased(pixel2, data2, 2, verticalPos, horizontalPos, width))
                ) {
                    if (isPixelBrightnessSimilar(pixel1, pixel2) || !isWithinComparedArea) {
                        if (!compareOnly) {
                            copyGrayScalePixel(pix, offset, pixel2);
                        }
                    } else {
                        if (!compareOnly) {
                            errorPixel(pix, offset, pixel1, pixel2);
                        }

                        mismatchCount++;
                        updateBounds(horizontalPos, verticalPos);
                    }
                } else {
                    if (!compareOnly) {
                        errorPixel(pix, offset, pixel1, pixel2);
                    }

                    mismatchCount++;
                    updateBounds(horizontalPos, verticalPos);
                }

                if (compareOnly) {
                    var currentMisMatchPercent = (mismatchCount / (height * width)) * 100;

                    if (currentMisMatchPercent > returnEarlyThreshold) {
                        skipTheRest = true;
                    }
                }
            });

            data.rawMisMatchPercentage = (mismatchCount / (height * width)) * 100;
            data.misMatchPercentage = data.rawMisMatchPercentage.toFixed(2);
            data.diffBounds = diffBounds;
            data.analysisTime = Date.now() - time;

            data.getImageDataUrl = function (text) {
                if (compareOnly) {
                    throw Error("No diff image available - ran in compareOnly mode");
                }

                var barHeight = 0;

                if (text) {
                    barHeight = addLabel(text, context, hiddenCanvas);
                }

                context.putImageData(imgd, 0, barHeight);

                return hiddenCanvas.toDataURL("image/png");
            };

            if (!compareOnly && hiddenCanvas.toBuffer) {
                data.getBuffer = function (includeOriginal) {
                    if (includeOriginal) {
                        var imageWidth = hiddenCanvas.width + 2;
                        hiddenCanvas.width = imageWidth * 3;
                        context.putImageData(img1, 0, 0);
                        context.putImageData(img2, imageWidth, 0);
                        context.putImageData(imgd, imageWidth * 2, 0);
                    } else {
                        context.putImageData(imgd, 0, 0);
                    }
                    return hiddenCanvas.toBuffer();
                };
            }
        }

        function addLabel(text, context, hiddenCanvas) {
            var textPadding = 2;

            context.font = "12px sans-serif";

            var textWidth = context.measureText(text).width + textPadding * 2;
            var barHeight = 22;

            if (textWidth > hiddenCanvas.width) {
                hiddenCanvas.width = textWidth;
            }

            hiddenCanvas.height += barHeight;

            context.fillStyle = "#666";
            context.fillRect(0, 0, hiddenCanvas.width, barHeight - 4);
            context.fillStyle = "#fff";
            context.fillRect(0, barHeight - 4, hiddenCanvas.width, 4);

            context.fillStyle = "#fff";
            context.textBaseline = "top";
            context.font = "12px sans-serif";
            context.fillText(text, textPadding, 1);

            return barHeight;
        }

        function normalise(img, w, h) {
            var c;
            var context;

            if (img.height < h || img.width < w) {
                c = createCanvas(w, h);
                context = c.getContext("2d");
                context.putImageData(img, 0, 0);
                return context.getImageData(0, 0, w, h);
            }

            return img;
        }

        function outputSettings(options) {
            var key;

            if (options.errorColor) {
                for (key in options.errorColor) {
                    if (options.errorColor.hasOwnProperty(key)) {
                        errorPixelColor[key] = options.errorColor[key] === void 0 ? errorPixelColor[key] : options.errorColor[key];
                    }
                }
            }

            if (options.errorType && errorPixelTransform[options.errorType]) {
                errorPixel = errorPixelTransform[options.errorType];
                errorType = options.errorType;
            }

            if (options.errorPixel && typeof options.errorPixel === "function") {
                errorPixel = options.errorPixel;
            }

            pixelTransparency = isNaN(Number(options.transparency)) ? pixelTransparency : options.transparency;

            if (options.largeImageThreshold !== undefined) {
                largeImageThreshold = options.largeImageThreshold;
            }

            if (options.useCrossOrigin !== undefined) {
                useCrossOrigin = options.useCrossOrigin;
            }

            if (options.boundingBox !== undefined) {
                boundingBoxes = [options.boundingBox];
            }

            if (options.ignoredBox !== undefined) {
                ignoredBoxes = [options.ignoredBox];
            }

            if (options.boundingBoxes !== undefined) {
                boundingBoxes = options.boundingBoxes;
            }

            if (options.ignoredBoxes !== undefined) {
                ignoredBoxes = options.ignoredBoxes;
            }

            if (options.ignoreAreasColoredWith !== undefined) {
                ignoreAreasColoredWith = options.ignoreAreasColoredWith;
            }
        }

        function compare(one, two) {
            if (globalOutputSettings !== oldGlobalSettings) {
                outputSettings(globalOutputSettings);
            }

            function onceWeHaveBoth() {
                var width;
                var height;
                if (images.length === 2) {
                    if (images[0].error || images[1].error) {
                        data = {};
                        data.error = images[0].error ? images[0].error : images[1].error;
                        triggerDataUpdate();
                        return;
                    }
                    width = images[0].width > images[1].width ? images[0].width : images[1].width;
                    height = images[0].height > images[1].height ? images[0].height : images[1].height;

                    if (images[0].width === images[1].width && images[0].height === images[1].height) {
                        data.isSameDimensions = true;
                    } else {
                        data.isSameDimensions = false;
                    }

                    data.dimensionDifference = {
                        width: images[0].width - images[1].width,
                        height: images[0].height - images[1].height
                    };

                    analyseImages(normalise(images[0], width, height), normalise(images[1], width, height), width, height);

                    triggerDataUpdate();
                }
            }

            images = [];
            loadImageData(one, onceWeHaveBoth);
            loadImageData(two, onceWeHaveBoth);
        }

        function getCompareApi(param) {
            var secondFileData;
            var hasMethod = typeof param === "function";

            if (!hasMethod) {
                // assume it's file data
                secondFileData = param;
            }

            var self = {
                setReturnEarlyThreshold: function (threshold) {
                    if (threshold) {
                        compareOnly = true;
                        returnEarlyThreshold = threshold;
                    }
                    return self;
                },
                scaleToSameSize: function () {
                    scaleToSameSize = true;

                    if (hasMethod) {
                        param();
                    }
                    return self;
                },
                useOriginalSize: function () {
                    scaleToSameSize = false;

                    if (hasMethod) {
                        param();
                    }
                    return self;
                },
                ignoreNothing: function () {
                    tolerance.red = 0;
                    tolerance.green = 0;
                    tolerance.blue = 0;
                    tolerance.alpha = 0;
                    tolerance.minBrightness = 0;
                    tolerance.maxBrightness = 255;

                    ignoreAntialiasing = false;
                    ignoreColors = false;

                    if (hasMethod) {
                        param();
                    }
                    return self;
                },
                ignoreLess: function () {
                    tolerance.red = 16;
                    tolerance.green = 16;
                    tolerance.blue = 16;
                    tolerance.alpha = 16;
                    tolerance.minBrightness = 16;
                    tolerance.maxBrightness = 240;

                    ignoreAntialiasing = false;
                    ignoreColors = false;

                    if (hasMethod) {
                        param();
                    }
                    return self;
                },
                ignoreAntialiasing: function () {
                    tolerance.red = 32;
                    tolerance.green = 32;
                    tolerance.blue = 32;
                    tolerance.alpha = 32;
                    tolerance.minBrightness = 64;
                    tolerance.maxBrightness = 96;

                    ignoreAntialiasing = true;
                    ignoreColors = false;

                    if (hasMethod) {
                        param();
                    }
                    return self;
                },
                ignoreColors: function () {
                    tolerance.alpha = 16;
                    tolerance.minBrightness = 16;
                    tolerance.maxBrightness = 240;

                    ignoreAntialiasing = false;
                    ignoreColors = true;

                    if (hasMethod) {
                        param();
                    }
                    return self;
                },
                ignoreAlpha: function () {
                    tolerance.red = 16;
                    tolerance.green = 16;
                    tolerance.blue = 16;
                    tolerance.alpha = 255;
                    tolerance.minBrightness = 16;
                    tolerance.maxBrightness = 240;

                    ignoreAntialiasing = false;
                    ignoreColors = false;

                    if (hasMethod) {
                        param();
                    }
                    return self;
                },
                repaint: function () {
                    if (hasMethod) {
                        param();
                    }
                    return self;
                },
                outputSettings: function (options) {
                    outputSettings(options);
                    return self;
                },
                onComplete: function (callback) {
                    updateCallbackArray.push(callback);

                    var wrapper = function () {
                        compare(fileData, secondFileData);
                    };

                    wrapper();

                    return getCompareApi(wrapper);
                },
                setupCustomTolerance: function (customSettings) {
                    for (var property in tolerance) {
                        if (!customSettings.hasOwnProperty(property)) {
                            continue;
                        }

                        tolerance[property] = customSettings[property];
                    }
                }
            };

            return self;
        }

        var rootSelf = {
            onComplete: function (callback) {
                updateCallbackArray.push(callback);
                loadImageData(fileData, function (imageData, width, height) {
                    parseImage(imageData.data, width, height);
                });
            },
            compareTo: function (secondFileData) {
                return getCompareApi(secondFileData);
            },
            outputSettings: function (options) {
                outputSettings(options);
                return rootSelf;
            }
        };

        return rootSelf;
    };

    function setGlobalOutputSettings(settings) {
        globalOutputSettings = settings;
        return resemble;
    }

    function applyIgnore(api, ignore, customTolerance) {
        switch (ignore) {
            case "nothing":
                api.ignoreNothing();
                break;
            case "less":
                api.ignoreLess();
                break;
            case "antialiasing":
                api.ignoreAntialiasing();
                break;
            case "colors":
                api.ignoreColors();
                break;
            case "alpha":
                api.ignoreAlpha();
                break;
            default:
                throw new Error("Invalid ignore: " + ignore);
        }

        api.setupCustomTolerance(customTolerance);
    }

    resemble.compare = function (image1, image2, options, cb) {
        var callback;
        var opt;

        if (typeof options === "function") {
            callback = options;
            opt = {};
        } else {
            callback = cb;
            opt = options || {};
        }

        var res = resemble(image1);
        var compare;

        if (opt.output) {
            res.outputSettings(opt.output);
        }

        compare = res.compareTo(image2);

        if (opt.returnEarlyThreshold) {
            compare.setReturnEarlyThreshold(opt.returnEarlyThreshold);
        }

        if (opt.scaleToSameSize) {
            compare.scaleToSameSize();
        }

        var toleranceSettings = opt.tolerance || {};
        if (typeof opt.ignore === "string") {
            applyIgnore(compare, opt.ignore, toleranceSettings);
        } else if (opt.ignore && opt.ignore.forEach) {
            opt.ignore.forEach(function (v) {
                applyIgnore(compare, v, toleranceSettings);
            });
        }

        compare.onComplete(function (data) {
            if (data.error) {
                callback(data.error);
            } else {
                callback(null, data);
            }
        });
    };

    resemble.outputSettings = setGlobalOutputSettings;
    return resemble;
});


/***/ }),

/***/ "./scripts/modeluireader.ts":
/*!**********************************!*\
  !*** ./scripts/modeluireader.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ModalUIReader": () => (/* binding */ ModalUIReader)
/* harmony export */ });
/* harmony import */ var _alt1_base_dist_imagedetect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @alt1/base/dist/imagedetect */ "../node_modules/@alt1/base/dist/imagedetect.js");
/* harmony import */ var _alt1_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @alt1/base */ "../node_modules/@alt1/base/dist/index.js");
/* harmony import */ var _alt1_ocr__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @alt1/ocr */ "../node_modules/@alt1/ocr/dist/index.js");



var capsfont = __webpack_require__(/*! @alt1/ocr/fonts/aa_9px_mono_allcaps.js */ "../node_modules/@alt1/ocr/fonts/aa_9px_mono_allcaps.js");
let imgs = (0,_alt1_base_dist_imagedetect__WEBPACK_IMPORTED_MODULE_0__.webpackImages)({
    exitbutton: __webpack_require__(/*! ../images/eocx.data.png */ "./images/eocx.data.png"),
    exitbutton_leg: __webpack_require__(/*! ../images/legacyx.data.png */ "./images/legacyx.data.png"),
    topleft: __webpack_require__(/*! ../images/eoctopleft.data.png */ "./images/eoctopleft.data.png"),
    topleft_leg: __webpack_require__(/*! ../images/legacytopleft.data.png */ "./images/legacytopleft.data.png"),
    botleft: __webpack_require__(/*! ../images/eocbotleft.data.png */ "./images/eocbotleft.data.png"),
    botleft_leg: __webpack_require__(/*! ../images/legacybotleft.data.png */ "./images/legacybotleft.data.png"),
});
var ModalUIReader;
(function (ModalUIReader) {
    function find(img) {
        if (!img) {
            img = (0,_alt1_base__WEBPACK_IMPORTED_MODULE_1__.captureHoldFullRs)();
        }
        let treoc = img.findSubimage(imgs.exitbutton);
        let trleg = img.findSubimage(imgs.exitbutton_leg);
        let eocboxes = treoc.map(p => detectEoc(img, p));
        let legacyboxes = trleg.map(p => detectLegacy(img, p));
        return [...eocboxes, ...legacyboxes].filter(m => m);
    }
    ModalUIReader.find = find;
    function detectEoc(img, pos) {
        let left = img.findSubimage(imgs.topleft, img.x, pos.y - 5, pos.x, imgs.topleft.height).sort((a, b) => a.x - b.x)[0];
        if (!left) {
            return null;
        }
        let bot = img.findSubimage(imgs.botleft, left.x, pos.y, imgs.botleft.width, img.y + img.height - pos.y).sort((a, b) => a.y - b.y)[0];
        if (!bot) {
            return null;
        }
        let buf = img.toData(left.x, pos.y, 250, 20);
        let title = _alt1_ocr__WEBPACK_IMPORTED_MODULE_2__.readSmallCapsBackwards(buf, capsfont, [[255, 203, 5]], 0, 13, buf.width, 1);
        return {
            rect: new _alt1_base__WEBPACK_IMPORTED_MODULE_1__.Rect(left.x + 4, pos.y + 24, (pos.x + 21) - (left.x + 4), (bot.y + 8) - (pos.y + 24)),
            legacy: false,
            title: title ? title.text.toLowerCase() : "",
            img: img
        };
    }
    ModalUIReader.detectEoc = detectEoc;
    function detectLegacy(img, pos) {
        let left = img.findSubimage(imgs.topleft_leg, img.x, pos.y - 9, pos.x, imgs.topleft_leg.height).sort((a, b) => a.x - b.x)[0];
        if (!left) {
            return null;
        }
        let bot = img.findSubimage(imgs.botleft_leg, left.x - 2, pos.y, imgs.botleft_leg.width, img.y + img.height - pos.y).sort((a, b) => a.y - b.y)[0];
        if (!bot) {
            return null;
        }
        let buf = img.toData(Math.round(left.x + pos.x - 250) / 2, pos.y - 4, 250, 20);
        let title = _alt1_ocr__WEBPACK_IMPORTED_MODULE_2__.readSmallCapsBackwards(buf, capsfont, [[255, 152, 31]], 0, 13, buf.width, 1);
        return {
            rect: new _alt1_base__WEBPACK_IMPORTED_MODULE_1__.Rect(left.x + 4, pos.y + 20, (pos.x + 20) - (left.x + 4), (bot.y) - (pos.y + 20)),
            legacy: true,
            title: title ? title.text.toLowerCase() : "",
            img: img
        };
    }
    ModalUIReader.detectLegacy = detectLegacy;
})(ModalUIReader || (ModalUIReader = {}));


/***/ }),

/***/ "./scripts/rewardreader.ts":
/*!*********************************!*\
  !*** ./scripts/rewardreader.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ClueRewardReader)
/* harmony export */ });
/* harmony import */ var _alt1_ocr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @alt1/ocr */ "../node_modules/@alt1/ocr/dist/index.js");

var font = __webpack_require__(/*! @alt1/ocr/fonts/aa_9px_mono_allcaps.js */ "../node_modules/@alt1/ocr/fonts/aa_9px_mono_allcaps.js");
class ClueRewardReader {
    constructor() {
        this.pos = null;
    }
    read(img) {
        if (!this.pos) {
            throw new Error("ui not found yet");
            ;
        }
        var buf = img.toData(this.pos.rect.x, this.pos.rect.y, this.pos.rect.width, this.pos.rect.height);
        var hash = 0;
        const xcomp = 20 - 28;
        const ycomp = -19 - 13;
        for (var y = 50 + ycomp; y < 85 + ycomp; y++) {
            for (var x = 25 + xcomp; x < 375 + xcomp; x++) {
                if (this.pos.legacy && buf.getColorDifference(x, y, 62, 53, 40) < 10) {
                    continue;
                }
                if (!this.pos.legacy && buf.getColorDifference(x, y, 10, 31, 41) < 10) {
                    continue;
                }
                hash = (((hash << 5) - hash) + buf.getPixelInt(x, y)) | 0;
            }
        }
        // These tweaks allow for this to read Barrows clue windows.
        let xtweak = 0;
        let ytweak = 125;
        var str = _alt1_ocr__WEBPACK_IMPORTED_MODULE_0__.findReadLine(buf, font, [[255, 255, 255]], 134 + xcomp + xtweak, 113 + ycomp + ytweak);
        // alt1.overLayText("value", a1lib.mixColor(255,255,255), 12, this.pos.rect.x + 134 + xcomp + xtweak, this.pos.rect.y + 113 + ycomp + ytweak, 1000)
        if (!str.text) {
            console.log("Str is not txt");
            return null;
        }
        var text = str.text.toLowerCase();
        var m = text.match(/(value|atual)[: ]+([\d,\.]+)\b/);
        if (!m) {
            console.log("m is a no go");
            return null;
        }
        var value = +m[2].replace(/[,\.]/g, "");
        return { hash, value, text };
    }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "autoDisableCheckAuto": () => (/* binding */ autoDisableCheckAuto),
/* harmony export */   "capture": () => (/* binding */ capture),
/* harmony export */   "changeClueTierSpan": () => (/* binding */ changeClueTierSpan),
/* harmony export */   "cleardb": () => (/* binding */ cleardb),
/* harmony export */   "exporttocsv": () => (/* binding */ exporttocsv),
/* harmony export */   "fetchFromGE": () => (/* binding */ fetchFromGE),
/* harmony export */   "init": () => (/* binding */ init),
/* harmony export */   "initOnLoad": () => (/* binding */ initOnLoad),
/* harmony export */   "insertInitEx": () => (/* binding */ insertInitEx),
/* harmony export */   "insertToDB": () => (/* binding */ insertToDB),
/* harmony export */   "rollbackNo": () => (/* binding */ rollbackNo),
/* harmony export */   "rollbackVeri": () => (/* binding */ rollbackVeri),
/* harmony export */   "rollbackYes": () => (/* binding */ rollbackYes),
/* harmony export */   "saveSettings": () => (/* binding */ saveSettings),
/* harmony export */   "settingsInit": () => (/* binding */ settingsInit),
/* harmony export */   "toggleCapture": () => (/* binding */ toggleCapture),
/* harmony export */   "toggleLootDisplay": () => (/* binding */ toggleLootDisplay),
/* harmony export */   "verifyInsert": () => (/* binding */ verifyInsert)
/* harmony export */ });
/* harmony import */ var _alt1_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @alt1/base */ "../node_modules/@alt1/base/dist/index.js");
/* harmony import */ var resemblejs_compareImages__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! resemblejs/compareImages */ "../node_modules/resemblejs/compareImages.js");
/* harmony import */ var resemblejs_compareImages__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(resemblejs_compareImages__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var pixelmatch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! pixelmatch */ "../node_modules/pixelmatch/index.js");
/* harmony import */ var pixelmatch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(pixelmatch__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _scripts_rewardreader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./scripts/rewardreader */ "./scripts/rewardreader.ts");
/* harmony import */ var _scripts_modeluireader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./scripts/modeluireader */ "./scripts/modeluireader.ts");
/* harmony import */ var _JSONs_LocalStorageCrystalInit_json__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./JSONs/LocalStorageCrystalInit.json */ "./JSONs/LocalStorageCrystalInit.json");
/* harmony import */ var _JSONs_LocalStorageCrystalInit_json__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_JSONs_LocalStorageCrystalInit_json__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _JSONs_ItemsAndImagesCrystal_json__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./JSONs/ItemsAndImagesCrystal.json */ "./JSONs/ItemsAndImagesCrystal.json");
/* harmony import */ var _JSONs_ItemsAndImagesCrystal_json__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_JSONs_ItemsAndImagesCrystal_json__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _JSONs_ItemsAndImagesCrystalLegacy_json__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./JSONs/ItemsAndImagesCrystalLegacy.json */ "./JSONs/ItemsAndImagesCrystalLegacy.json");
/* harmony import */ var _JSONs_ItemsAndImagesCrystalLegacy_json__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_JSONs_ItemsAndImagesCrystalLegacy_json__WEBPACK_IMPORTED_MODULE_7__);
//alt1 base libs, provides all the commonly used methods for image matching and capture
//also gives your editor info about the window.alt1 api








/*
A couple of notes for development
- In order to adjust this plugin for other loot adjust two key things:
    * The JSONs, the initializer and the image lists
    * The Image or images that allow Alt1 to find the window
- One would need to tweak various settings around to accomdate the loot window
- Value reader is also from the Clue Solver, so I'm not sure how it works, it may break.
*/
//tell webpack to add index.html and appconfig.json to output
__webpack_require__(/*! !file-loader?name=[name].[ext]!./index.html */ "../node_modules/file-loader/dist/cjs.js?name=[name].[ext]!./index.html");
__webpack_require__(/*! !file-loader?name=[name].[ext]!./appconfig.json */ "../node_modules/file-loader/dist/cjs.js?name=[name].[ext]!./appconfig.json");
// TODO: FOR THE PROGRAMMERS AND DEBUGGERS
// Set this value to true or false to enable console log messages
var seeConsoleLogs = true;
var settingslist = ["CrystalLogger/Checked button", "CrystalLogger/Algorithm", "CrystalLogger/lagDetect",
    "CrystalLogger/multiButtonPressDetect", "CrystalLogger/hybridPrecision",
    "CrystalLogger/noMenu", "CrystalLogger/RollbackDisplayLimit"];
var valuesAndCounts = ["CrystalLogger/TValue", "CrystalLogger/TCount",
    "CrystalLogger/PValue", "CrystalLogger/PCount",
    "CrystalLogger/KValue", "CrystalLogger/KCount",
    "CrystalLogger/AValue", "CrystalLogger/ACount"];
var rewardSlots = ["first_item", "second_item", "third_item", "fourth_item", "fifth_item",
    "sixth_item", "seventh_item", "eigth_item", "ninth_item", "tenth_item",
    "eleventh_item", "twelfth_item"];
var listOfItemsT = [];
var listOfItemsTArray = [];
var listOfItemsLegacyT = [];
var listOfItemsLegacyTArray = [];
var listOfItemsP = [];
var listOfItemsPArray = [];
var listOfItemsLegacyP = [];
var listOfItemsLegacyPArray = [];
var listOfItemsK = [];
var listOfItemsKArray = [];
var listOfItemsLegacyK = [];
var listOfItemsLegacyKArray = [];
var listOfItemsA = [];
var listOfItemsAArray = [];
var listOfItemsLegacyA = [];
var listOfItemsLegacyAArray = [];
var items = JSON;
var legacy = false;
var displaybox = true;
var lastItems = [];
var lastQuants = [];
var lastValue = 0;
var lastReroll = [0, 0];
var autoCaptureInterval;
var noMenuInterval;
var opentabs = [true, true, true];
var lagDetected = false;
var buttonDisabletoggle = true;
var lagCounter = 0;
var insertVerif = [];
// NOTE: Adjust this for larger windows. I want 12 cause crystals.
var cap = 12;
var rewardslist = ["taverley", "prifddinas", "triskelion", "alchemist"];
var imgs = _alt1_base__WEBPACK_IMPORTED_MODULE_0__.ImageDetect.webpackImages({
    crystalChest: __webpack_require__(/*! ./images/crystalChest.data.png */ "./images/crystalChest.data.png"),
    crystalChestLegacy: __webpack_require__(/*! ./images/crystalChestLegacy.data.png */ "./images/crystalChestLegacy.data.png"),
    triskelionTreasures: __webpack_require__(/*! ./images/triskelionTreasures.data.png */ "./images/triskelionTreasures.data.png"),
    triskelionTreasuresLegacy: __webpack_require__(/*! ./images/triskelionTreasuresLegacy.data.png */ "./images/triskelionTreasuresLegacy.data.png"),
    alchemistsChest: __webpack_require__(/*! ./images/alchemistsChest.data.png */ "./images/alchemistsChest.data.png"),
    alchemistsChestLegacy: __webpack_require__(/*! ./images/alchemistsChestLegacy.data.png */ "./images/alchemistsChestLegacy.data.png")
});
// TODO: Consider adding an update price for all clues within history, current tier value
// TODO: Consider changing the coin icon depending on its quantity
// Maybe extend this with purple sweets, holy biscuits, and various seeds.
// TODO: Consider putting some functions in its own TS files for organization.
async function initOnLoad() {
    if (window.alt1) {
        alt1.overLayClearGroup("disclaimer");
        alt1.overLayClearGroup("overlays");
        alt1.overLayClearGroup("icon");
        alt1.overLayClearGroup("lag");
        alt1.overLayClearGroup("nomenu");
        alt1.overLaySetGroup("overlays");
        alt1.overLayTextEx("Initializing CrystalLogger...", _alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(255, 144, 0), 20, Math.round(alt1.rsWidth / 2), 200, 50000, "", true, true);
    }
    if (seeConsoleLogs)
        console.log("Initializing plugin...");
    toggleLootDisplay("first_rewards");
    toggleLootDisplay("second_rewards");
    toggleLootDisplay("third_rewards");
    await init();
    if (window.alt1) {
        alt1.overLaySetGroup("disclaimer");
        alt1.overLayTextEx("Disclaimer: When using Autocapture,\nduplicate/back-to-back rewards WILL\n     need to be manually captured. ", _alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(255, 80, 80), 19, Math.round(alt1.rsWidth / 2), 270, 8000, "", true, true);
    }
    if (seeConsoleLogs)
        console.log("\nInitialization complete!");
}
async function init() {
    buttonDisabler();
    // TODO: This is a fix for when the buttons are clicked once.
    // When clicked once, it does nothing but when clicked a second
    // time, it closes and works properly.
    // Figure out in toggleLootDisplay how to fix it. Might worry
    // about it in the next logger project...
    // Initializing LocalStorage items
    if (seeConsoleLogs)
        console.log("Initializing LocalStorage items...");
    if (seeConsoleLogs)
        console.log("Initializing radio buttons...");
    if (localStorage.getItem("CrystalLogger/Checked button") == null) { // Checked button init check
        if (seeConsoleLogs)
            console.log("Defaulting button to taverley...");
        let ele = document.getElementById("taverley");
        ele.checked = true;
        document.getElementById('current_reward_span').textContent = "Taverley";
        localStorage.setItem("CrystalLogger/Checked button", "taverley");
    }
    else { // If it does, set the button and span
        if (seeConsoleLogs)
            console.log("Setting previously set radio button: " + localStorage.getItem("CrystalLogger/Checked button") + "...");
        let temp = localStorage.getItem("CrystalLogger/Checked button");
        let ele = document.getElementById(temp);
        ele.checked = true;
        document.getElementById('current_reward_span').textContent = temp[0].toUpperCase() + temp.slice(1).toLowerCase();
    }
    if (seeConsoleLogs)
        console.log("Radio buttons initialized.");
    let tierSpans = document.getElementsByClassName("current_tier_button");
    let tierSpansCaps = document.getElementsByClassName("current_tier_button_caps");
    for (let i = 0; i < tierSpans.length; i++) {
        tierSpans[i].textContent = currentReward()[0];
    }
    for (let i = 0; i < tierSpansCaps.length; i++) {
        tierSpansCaps[i].textContent = currentRewardUpper();
    }
    if (localStorage.getItem("CrystalLogger/items") == null) {
        localStorage.setItem("CrystalLogger/items", JSON.stringify(_JSONs_LocalStorageCrystalInit_json__WEBPACK_IMPORTED_MODULE_5__));
    }
    for (let i = 0; i < valuesAndCounts.length; i++) {
        if (localStorage.getItem(valuesAndCounts[i]) == null) {
            localStorage.setItem(valuesAndCounts[i], "0");
        }
    }
    items = JSON.parse(localStorage.getItem("CrystalLogger/items"));
    if (seeConsoleLogs)
        console.log("LocalStorage items initialized.");
    if (localStorage.getItem("CrystalLogger/Algorithm") == null) { // Algorithim init check
        if (seeConsoleLogs)
            console.log("Defaulting Algorithm button to Hybrid...");
        localStorage.setItem("CrystalLogger/Algorithm", "hybrid");
    }
    if (localStorage.getItem("CrystalLogger/ItemList") == null) { // Item Referense list init check
        if (seeConsoleLogs)
            console.log("Defaulting ItemList to Organized List...");
        localStorage.setItem("CrystalLogger/ItemList", "orglist");
    }
    if (localStorage.getItem("CrystalLogger/autoCapture") == null) { // Autocapture check
        if (seeConsoleLogs)
            console.log("Defaulting autocapture to off...");
        localStorage.setItem("CrystalLogger/autoCapture", "false");
    }
    if (localStorage.getItem("CrystalLogger/lagDetect") == null) { // Lag Detection toggle check
        if (seeConsoleLogs)
            console.log("Defaulting lag detect to true...");
        localStorage.setItem("CrystalLogger/lagDetect", "true");
    }
    if (localStorage.getItem("CrystalLogger/multiButtonPressDetect") == null) { // Button double press detection
        if (seeConsoleLogs)
            console.log("Defaulting multi button press detect to false...");
        localStorage.setItem("CrystalLogger/multiButtonPressDetect", "false");
    }
    if (localStorage.getItem("CrystalLogger/noMenu") == null) { // No hover display box
        if (seeConsoleLogs)
            console.log("Defaulting no menu box to true");
        localStorage.setItem("CrystalLogger/noMenu", "false");
    }
    else if (localStorage.getItem("CrystalLogger/noMenu") == "true") {
        if (seeConsoleLogs)
            console.log("Enabling no menu box");
        noMenuCheck();
    }
    if (localStorage.getItem("CrystalLogger/hybridPrecision") == null) { // Hybrid precision value
        if (seeConsoleLogs)
            console.log("Defaulting hybridPrecision to 0.7...");
        localStorage.setItem("CrystalLogger/hybridPrecision", "0.7");
    }
    if (localStorage.getItem("CrystalLogger/History") == null) { // History initializer
        if (seeConsoleLogs)
            console.log("Creating history");
        localStorage.setItem("CrystalLogger/History", JSON.stringify([]));
    }
    // This code should add the current date to your history log if it does not exist.
    // This snippet can be removed a few months in the future or for future projects with this code.
    // ~ 11/21/2022
    let history = JSON.parse(localStorage.getItem("TetraLogger/History"));
    if (history != null) {
        for (let i = 0; i < history.length; i++) {
            if (history[i][6] == undefined) {
                history[i].push(await dateGetter());
            }
        }
        localStorage.setItem("TetraLogger/History", JSON.stringify(history));
    }
    if (localStorage.getItem("CrystalLogger/PrimaryKeyHistory") == null) { // Initialize primary key for history
        if (seeConsoleLogs)
            console.log("Defaulting PrimaryKeyHistory to 1");
        localStorage.setItem("CrystalLogger/PrimaryKeyHistory", "1");
    }
    if (localStorage.getItem("CrystalLogger/HistoryDisplayLimit") == null) { // Initialize history display limit
        if (seeConsoleLogs)
            console.log("Defaulting history display limit to 25");
        localStorage.setItem("CrystalLogger/HistoryDisplayLimit", "25");
    }
    updateItems();
    if (seeConsoleLogs)
        console.log("\n");
    // Set up image libraries
    await arraySetup();
    //Set display
    lootDisplay();
    //Set up settings
    settingsInit();
    //Set up history window
    historyInit();
    //Set up insert window
    insertInit();
    if (window.alt1) {
        alt1.overLayClearGroup("overlays");
        alt1.overLaySetGroup("overlays");
        alt1.overLayTextEx("CrystalLogger ready!", _alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(100, 255, 100), 20, Math.round(alt1.rsWidth / 2), 200, 2000, "", true, true);
    }
    buttonEnabler();
}
async function cleardb(choice) {
    let keys = Object.keys(items);
    if (choice == 1) { // Nuclear reset all
        if (window.alt1) {
            alt1.overLayClearGroup("overlays");
            alt1.overLaySetGroup("overlays");
            alt1.overLayTextEx("Resetting CrystalLogger...", _alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(255, 144, 0), 20, Math.round(alt1.rsWidth / 2), 200, 4000, "", true, true);
        }
        let ls = Object.keys(localStorage);
        for (const i of ls) {
            if (i.includes("CrystalLogger")) {
                console.log("Removing all CrystalLogger stuff...");
                localStorage.removeItem(i);
            }
        }
        if (window.alt1) {
            alt1.overLayClearGroup("overlays");
            alt1.overLaySetGroup("overlays");
            alt1.overLayTextEx("CrystalLogger successfully reset! Restarting...", _alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(100, 255, 100), 20, Math.round(alt1.rsWidth / 2), 200, 4000, "", true, true);
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
        location.reload();
    }
    else if (choice == 2) { // Full item db clear
        if (window.alt1) {
            alt1.overLayClearGroup("overlays");
            alt1.overLaySetGroup("overlays");
            alt1.overLayTextEx("Clearing all items from reward database...", _alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(255, 144, 0), 20, Math.round(alt1.rsWidth / 2), 200, 4000, "", true, true);
        }
        localStorage.removeItem("CrystalLogger/items");
        localStorage.removeItem("CrystalLogger/History");
        for (let i = 0; i < valuesAndCounts.length; i++) {
            localStorage.removeItem(valuesAndCounts[i]);
        }
        await init();
        if (window.alt1) {
            alt1.overLayClearGroup("overlays");
            alt1.overLaySetGroup("overlays");
            alt1.overLayTextEx("All items cleared successfully!", _alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(100, 255, 100), 20, Math.round(alt1.rsWidth / 2), 200, 4000, "", true, true);
        }
    }
    else if (choice == 3) { // Reset settings
        if (window.alt1) {
            alt1.overLayClearGroup("overlays");
            alt1.overLaySetGroup("overlays");
            alt1.overLayTextEx("Reseting settings to default...", _alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(255, 144, 0), 20, Math.round(alt1.rsWidth / 2), 200, 4000, "", true, true);
        }
        if (localStorage.getItem("CrystalLogger/noMenu") === "true") {
            localStorage.setItem("CrystalLogger/noMenu", "false");
            noMenuCheck();
        }
        for (let i = 0; i < settingslist.length; i++) {
            localStorage.removeItem(settingslist[i]);
        }
        await init();
        if (window.alt1) {
            alt1.overLayClearGroup("overlays");
            alt1.overLaySetGroup("overlays");
            alt1.overLayTextEx("Settings reset successfully!", _alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(100, 255, 100), 20, Math.round(alt1.rsWidth / 2), 200, 4000, "", true, true);
        }
    }
    else if (choice == 4) { // Current reward clear
        if (window.alt1) {
            alt1.overLayClearGroup("overlays");
            alt1.overLaySetGroup("overlays");
            alt1.overLayTextEx("Clearing " + currentRewardUpper() + " reward  from database...", _alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(255, 144, 0), 20, Math.round(alt1.rsWidth / 2), 200, 4000, "", true, true);
        }
        localStorage.setItem(currentReward()[1], "0");
        localStorage.setItem(currentReward()[2], "0");
        for (let i = 0; i < keys.length; i++) {
            items[keys[i]].quantity[currentReward()[0]] = 0;
        }
        updateItems();
        let lsHistory = JSON.parse(localStorage.getItem("CrystalLogger/History"));
        for (let i = lsHistory.length - 1; i >= 0; i--) {
            if (lsHistory[i][3][0] == currentReward()[0] || lsHistory[i][3][0] == currentReward()[0] + " [C] ") {
                lsHistory.splice(i, 1);
            }
        }
        localStorage.setItem("CrystalLogger/History", JSON.stringify(lsHistory));
        if (window.alt1) {
            alt1.overLayClearGroup("overlays");
            alt1.overLaySetGroup("overlays");
            alt1.overLayTextEx(currentRewardUpper() + " cleared successfully!", _alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(100, 255, 100), 20, Math.round(alt1.rsWidth / 2), 200, 4000, "", true, true);
        }
    }
    let ele = document.getElementById("history_body");
    let container = document.createElement("div");
    container.textContent = "There's nothing here to display. Start scanning!";
    container.setAttribute('class', 'nothingToDisplayContainer');
    ele.append(container);
    await historyClear();
    historyInit();
    document.getElementById("number_of_rewards").textContent = "0";
    document.getElementById("value_of_rewards").textContent = "0";
    document.getElementById("average_of_rewards").textContent = "0";
    let divs = document.getElementsByClassName("loot_display");
    for (let i = 0; i < divs.length; i++) {
        divs[i].textContent = "";
    }
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 8; j++) {
            if (rewardSlots[(i * 8) + j] == undefined) {
                break;
            }
            document.getElementById(rewardSlots[(i * 8) + j]).textContent = "";
        }
    }
    document.getElementById("rewards_value").textContent = "0";
    lastItems = [];
    lastQuants = [];
    lastValue = 0;
}
async function changeClueTierSpan(id, event) {
    // Set the clue_tier span for the checked box
    document.getElementById("number_of_rewards").textContent = "0";
    document.getElementById("value_of_rewards").textContent = "Loading...";
    document.getElementById("average_of_rewards").textContent = "Loading...";
    buttonDisabler();
    if (window.alt1) {
        alt1.overLayClearGroup("overlays");
        alt1.overLaySetGroup("overlays");
        alt1.overLayTextEx("Loading " + (id[0] + id.slice(1).toLowerCase()) + " rewards...", _alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(255, 144, 0), 20, Math.round(alt1.rsWidth / 2), 200, 10000, "", true, true);
    }
    if (seeConsoleLogs)
        console.log("Setting button to " + (id[0].toUpperCase() + id.slice(1).toLowerCase()) + "...");
    document.getElementById('current_reward_span').textContent = (id[0].toUpperCase() + id.slice(1).toLowerCase());
    document.getElementById(id).checked = true;
    localStorage.setItem("CrystalLogger/Checked button", id);
    let tierSpans = document.getElementsByClassName("current_tier_button");
    let tierSpansCaps = document.getElementsByClassName("current_tier_button_caps");
    for (let i = 0; i < tierSpans.length; i++) {
        tierSpans[i].textContent = currentReward()[0];
    }
    for (let i = 0; i < tierSpansCaps.length; i++) {
        tierSpansCaps[i].textContent = currentRewardUpper();
    }
    // Clear reward slots and value
    document.getElementById("rewards_value").textContent = "0";
    for (let i = 0; i < 9; i++) {
        document.getElementById(rewardSlots[i]).textContent = "";
    }
    // Set up image libraries
    await arraySetup();
    //Set display
    lootDisplay();
    //Set up settings
    settingsInit();
    //Set up history window
    historyClear();
    historyInit();
    //Set up insert window
    insertInit();
    if (window.alt1) {
        alt1.overLayClearGroup("overlays");
        alt1.overLaySetGroup("overlays");
        alt1.overLayTextEx((id[0].toUpperCase() + id.slice(1).toLowerCase()) + " rewards & images loaded!", _alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(100, 255, 100), 20, Math.round(alt1.rsWidth / 2), 200, 2000, "", true, true);
    }
    await buttonEnabler();
    lastReroll = [0, 0];
}
async function arraySetup() {
    listOfItemsT = _JSONs_ItemsAndImagesCrystal_json__WEBPACK_IMPORTED_MODULE_6__.taverley;
    listOfItemsLegacyT = _JSONs_ItemsAndImagesCrystalLegacy_json__WEBPACK_IMPORTED_MODULE_7__.taverley;
    listOfItemsP = _JSONs_ItemsAndImagesCrystal_json__WEBPACK_IMPORTED_MODULE_6__.prifddinas;
    listOfItemsLegacyP = _JSONs_ItemsAndImagesCrystalLegacy_json__WEBPACK_IMPORTED_MODULE_7__.prifddinas;
    listOfItemsK = _JSONs_ItemsAndImagesCrystal_json__WEBPACK_IMPORTED_MODULE_6__.triskelion;
    listOfItemsLegacyK = _JSONs_ItemsAndImagesCrystalLegacy_json__WEBPACK_IMPORTED_MODULE_7__.triskelion;
    listOfItemsA = _JSONs_ItemsAndImagesCrystal_json__WEBPACK_IMPORTED_MODULE_6__.alchemist;
    listOfItemsLegacyA = _JSONs_ItemsAndImagesCrystalLegacy_json__WEBPACK_IMPORTED_MODULE_7__.alchemist;
    listOfItemsTArray = [];
    listOfItemsLegacyTArray = [];
    listOfItemsPArray = [];
    listOfItemsLegacyPArray = [];
    listOfItemsKArray = [];
    listOfItemsLegacyKArray = [];
    listOfItemsAArray = [];
    listOfItemsLegacyAArray = [];
    let promises = [];
    for (let i = 0; i < listOfItemsT.length; i++) {
        listOfItemsTArray.push([listOfItemsT[i].name, listOfItemsT[i].base64, 0.0]);
        listOfItemsLegacyTArray.push([listOfItemsLegacyT[i].name, listOfItemsLegacyT[i].base64, 0.0]);
        promises.push(await _base64ToImageData(listOfItemsTArray[i][1], 32, 32).then(data => {
            listOfItemsTArray[i].push(data);
        }));
        promises.push(await _base64ToImageData(listOfItemsLegacyTArray[i][1], 32, 32).then(data => {
            listOfItemsLegacyTArray[i].push(data);
        }));
    }
    await Promise.all(promises);
    promises = [];
    for (let i = 0; i < listOfItemsP.length; i++) {
        listOfItemsPArray.push([listOfItemsP[i].name, listOfItemsP[i].base64, 0.0]);
        listOfItemsLegacyPArray.push([listOfItemsLegacyP[i].name, listOfItemsLegacyP[i].base64, 0.0]);
        promises.push(await _base64ToImageData(listOfItemsPArray[i][1], 32, 32).then(data => {
            listOfItemsPArray[i].push(data);
        }));
        promises.push(await _base64ToImageData(listOfItemsLegacyPArray[i][1], 32, 32).then(data => {
            listOfItemsLegacyPArray[i].push(data);
        }));
    }
    await Promise.all(promises);
    promises = [];
    for (let i = 0; i < listOfItemsK.length; i++) {
        listOfItemsKArray.push([listOfItemsK[i].name, listOfItemsK[i].base64, 0.0]);
        listOfItemsLegacyKArray.push([listOfItemsLegacyK[i].name, listOfItemsLegacyK[i].base64, 0.0]);
        promises.push(await _base64ToImageData(listOfItemsKArray[i][1], 32, 32).then(data => {
            listOfItemsKArray[i].push(data);
        }));
        promises.push(await _base64ToImageData(listOfItemsLegacyKArray[i][1], 32, 32).then(data => {
            listOfItemsLegacyKArray[i].push(data);
        }));
    }
    await Promise.all(promises);
    promises = [];
    for (let i = 0; i < listOfItemsA.length; i++) {
        listOfItemsAArray.push([listOfItemsA[i].name, listOfItemsA[i].base64, 0.0]);
        listOfItemsLegacyAArray.push([listOfItemsLegacyA[i].name, listOfItemsLegacyA[i].base64, 0.0]);
        promises.push(await _base64ToImageData(listOfItemsAArray[i][1], 32, 32).then(data => {
            listOfItemsAArray[i].push(data);
        }));
        promises.push(await _base64ToImageData(listOfItemsLegacyAArray[i][1], 32, 32).then(data => {
            listOfItemsLegacyAArray[i].push(data);
        }));
    }
    await Promise.all(promises);
    // TODO: This is a test to see if things exist in the ItemsAndImages
    // Just run this based on the array and you can check.
    // Blank should appear red in the console.
    /*
    let keys = Object.keys(items)
    console.log("TAVERLEY")
    for(let i = 0; i < listOfItemsT.length; i++){
        if(keys.includes(listOfItemsT[i].name))
            console.log(listOfItemsT[i].name, "in the list")
        else
            console.error(listOfItemsT[i].name, "not in the list")
    }
    console.log("PRIFF")
    for(let i = 0; i < listOfItemsP.length; i++){
        if(keys.includes(listOfItemsP[i].name))
            console.log(listOfItemsP[i].name, "in the list")
        else
            console.error(listOfItemsP[i].name, "not in the list")
    }
    console.log("TRISK")
    for(let i = 0; i < listOfItemsK.length; i++){
        if(keys.includes(listOfItemsK[i].name))
            console.log(listOfItemsK[i].name, "in the list")
        else
            console.error(listOfItemsK[i].name, "not in the list")
    }
    console.log("ALCH")
    for(let i = 0; i < listOfItemsA.length; i++){
        if(keys.includes(listOfItemsA[i].name))
            console.log(listOfItemsA[i].name, "in the list")
        else
            console.error(listOfItemsA[i].name, "not in the list")
    }
    */
}
_alt1_base__WEBPACK_IMPORTED_MODULE_0__.on("alt1pressed", alt1pressedcapture);
function alt1pressedcapture() {
    if (buttonDisabletoggle == true) {
        if (document.getElementById("docapturebutton").getAttribute("title") === ("Disabled while scanning. Please wait...")) {
            return;
        }
        else if (document.getElementById("docapturebutton").getAttribute("title") === ("Disable autocapture to use this button")) {
            return;
        }
        else {
            capture(false);
        }
    }
}
async function capture(autobool) {
    if (!window.alt1) {
        return;
    }
    if (!alt1.permissionPixel) {
        return;
    }
    if (localStorage.getItem("CrystalLogger/multiButtonPressDetect") === "true") {
        if (!autobool) {
            document.getElementById("docapturebutton").setAttribute("onclick", "");
            document.getElementById("docapturebutton").setAttribute("title", "Disabled while scanning. Please wait...");
            document.getElementById("docapturebuttonwords").style.setProperty("text-decoration", "line-through");
            await new Promise(resolve => setTimeout(resolve, 200));
        }
    }
    let img = _alt1_base__WEBPACK_IMPORTED_MODULE_0__.captureHoldFullRs();
    const promises = [];
    promises.push(await findtrailComplete(img, autobool));
    await Promise.all(promises);
    if (seeConsoleLogs)
        console.log("Finished checking clue scroll");
    if (localStorage.getItem("CrystalLogger/multiButtonPressDetect") === "true") {
        if (!autobool) {
            await new Promise(resolve => setTimeout(function () {
                document.getElementById("docapturebutton").setAttribute("onclick", "TEST.capture(false)");
                document.getElementById("docapturebutton").setAttribute("title", "");
                document.getElementById("docapturebuttonwords").style.removeProperty("text-decoration");
            }, 400));
        }
    }
}
async function findtrailComplete(img, autobool) {
    // If 3 rerolls..., default
    // Adjust this if you want to add more rerolls.
    if (lagCounter == 5) {
        autoDisableCheckAuto(event);
        if (window.alt1) {
            alt1.overLayClearGroup("overlays");
            alt1.overLayClearGroup("lag");
            alt1.overLayClearGroup("rect");
            alt1.overLaySetGroup("overlays");
            alt1.overLayTextEx("Too much lag or back to back loot detected.\n\n        Autocapture has been automatically\nturned off. Manually capture this clue or turn\n         autocapture back on and try again", _alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(255, 80, 80), 20, Math.round(alt1.rsWidth / 2), 200, 50000, "", true, true);
        }
        lagCounter = 0;
        return;
    }
    try {
        let loc;
        const imgCaptures = [img.findSubimage(imgs.crystalChest),
            img.findSubimage(imgs.crystalChestLegacy),
            img.findSubimage(imgs.triskelionTreasures),
            img.findSubimage(imgs.triskelionTreasuresLegacy),
            img.findSubimage(imgs.alchemistsChest),
            img.findSubimage(imgs.alchemistsChestLegacy)
        ];
        if (currentReward()[0] == "taverley" || currentReward()[0] == "prifddinas") {
            if (imgCaptures[0][0] !== undefined) {
                loc = imgCaptures[0];
                if (seeConsoleLogs)
                    console.log("Non-legacy crystal chest window");
                legacy = false;
            }
            else if (imgCaptures[1][0] !== undefined) {
                loc = imgCaptures[1];
                if (seeConsoleLogs)
                    console.log("legacy crystal chest window");
                legacy = true;
            }
            else {
                return;
            }
        }
        else if (currentReward()[0] == "triskelion") {
            if (imgCaptures[2][0] !== undefined) {
                loc = imgCaptures[2];
                if (seeConsoleLogs)
                    console.log("Non-legacy triskelion window");
                legacy = false;
            }
            else if (imgCaptures[3][0] !== undefined) {
                loc = imgCaptures[3];
                if (seeConsoleLogs)
                    console.log("legacy triskelion window");
                legacy = true;
            }
            else {
                return;
            }
        }
        else if (currentReward()[0] == "alchemist") {
            if (imgCaptures[4][0] !== undefined) {
                loc = imgCaptures[4];
                if (seeConsoleLogs)
                    console.log("Non-legacy alchemist window");
                legacy = false;
            }
            else if (imgCaptures[5][0] !== undefined) {
                loc = imgCaptures[5];
                if (seeConsoleLogs)
                    console.log("legacy alchemist window");
                legacy = true;
            }
            else {
                return;
            }
        }
        else {
            console.log("nothing");
            return;
        }
        // TODO: Tweak these two values below if jagex adjusts the pixel placement of the items
        // Values to tweak in case jagex borks the item placement on the screen
        // x1, +1 = right, -1 = left
        // y1, +1 = up, -1 = down
        // Adjust top crops as well, for the x1 and y1 values for it
        // Consider making this an option in the settings.
        let xdefault;
        let ydefault;
        let xRect;
        let yRect;
        if (!legacy) {
            xdefault = loc[0].x - 10;
            ydefault = loc[0].y + 29;
            xRect = loc[0].x - 27;
            yRect = loc[0].y - 13;
        }
        else {
            if (currentReward()[0] == "taverley") {
                xdefault = loc[0].x - 157;
                ydefault = loc[0].y + 29;
                xRect = loc[0].x - 176;
                yRect = loc[0].y - 13;
            }
            else if (currentReward()[0] == "prifddinas") {
                xdefault = loc[0].x - 157;
                ydefault = loc[0].y + 29;
                xRect = loc[0].x - 176;
                yRect = loc[0].y - 13;
            }
            else if (currentReward()[0] == "triskelion") {
                xdefault = loc[0].x - 129;
                ydefault = loc[0].y + 29;
                xRect = loc[0].x - 148;
                yRect = loc[0].y - 13;
            }
            else if (currentReward()[0] == "alchemist") {
                xdefault = loc[0].x - 143;
                ydefault = loc[0].y + 29;
                xRect = loc[0].x - 161;
                yRect = loc[0].y - 13;
            }
        }
        let x1 = xdefault;
        let y1 = ydefault;
        let crops = [];
        let topCrops = [];
        for (let i = 0; i < 4; i++) {
            let croptemp = new Array(8);
            let toptemp = new Array(8);
            for (let j = 0; j < 8; j++) {
                croptemp[j] = (img.toData(x1, y1, 32, 32));
                toptemp[j] = (img.toData(x1, y1 + 1, 32, 8));
                x1 += 32 + 23;
            }
            crops.push(croptemp);
            topCrops.push(toptemp);
            x1 = xdefault;
            y1 += 32 + 14;
        }
        // Give me the total value!
        // If this breaks, value is obfuscated. Second way to scan it for validity.
        // FIXME: Try to rework this try/catch to an if/else block.
        let value = 0;
        let lastValueList = [];
        try {
            let rewardreader = new _scripts_rewardreader__WEBPACK_IMPORTED_MODULE_3__["default"](); // Thanks Skillbert
            console.log(rewardreader);
            rewardreader.pos = _scripts_modeluireader__WEBPACK_IMPORTED_MODULE_4__.ModalUIReader.find()[0]; // For these two functions
            console.log(rewardreader.read(img).value);
            value = rewardreader.read(img).value;
            let valueStr = value.toString();
            let valueList = [];
            for (let i = valueStr.length - 1; i > 0; i--) {
                valueList.push(valueStr);
                valueStr = valueStr.slice(0, -1);
            }
            let lastValueStr = lastValue.toString();
            for (let i = lastValueStr.length - 1; i > 0; i--) {
                lastValueList.push(lastValueStr);
                lastValueStr = lastValueStr.slice(0, -1);
            }
        }
        catch (e) {
            console.log(e);
            return;
        }
        if (autobool == true) {
            if (lastValue == 0) {
                if (seeConsoleLogs)
                    console.log("value is zero");
            }
            else if (value == lastValue) {
                return;
            }
            else if ( /*valueList.includes(lastValue.toString()) ||*/lastValueList.includes(value.toString())) {
                return;
            }
        }
        alt1.overLayClearGroup("overlays");
        alt1.overLaySetGroup("rect");
        //TODO: Investigate this for changing tiers
        rectangleMaker(255, 144, 0, xRect, yRect, 60000);
        let prevValue = lastValue;
        lastValue = value;
        if (!lagDetected) {
            alt1.overLayClearGroup("overlays");
            alt1.overLayClearGroup("lag");
            alt1.overLayClearGroup("disclaimer");
            alt1.overLaySetGroup("lag");
            alt1.overLayTextEx("Capturing rewards...", _alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(255, 144, 0), 20, Math.round(alt1.rsWidth / 2), 200, 60000, "", true, true);
        }
        let itemResults = [];
        let promises = [];
        x1 = xdefault;
        y1 = ydefault;
        let notBlank = false;
        for (let i = 0; i < 4; i++) {
            let itemtemp = [];
            for (let j = 0; j < 8; j++) {
                if (window.alt1) {
                    alt1.overLayClearGroup("icon");
                    alt1.overLaySetGroup("icon");
                }
                if (displaybox) {
                    // Keep an eye on this in case it incorrectly gives numbers...
                    if (window.alt1) {
                        alt1.overLayRect(_alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(255, 144, 0), x1, y1, 32, 32, 1000, 1);
                        if (((i * 8) + j + 1) >= 20)
                            alt1.overLayText(((i * 8) + j + 1).toString(), _alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(255, 144, 0, 255), 18, x1 - 1, y1, 1000);
                        else if (((i * 8) + j + 1) >= 10)
                            alt1.overLayText(((i * 8) + j + 1).toString(), _alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(255, 144, 0, 255), 18, x1 - 3, y1, 1000);
                        else if (((i * 8) + j + 1) < 10)
                            alt1.overLayText(((i * 8) + j + 1).toString(), _alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(255, 144, 0, 255), 18, x1 + 5, y1, 1000);
                    }
                }
                x1 += 32 + 23;
                promises.push(itemtemp.push(await compareItems(crops[i][j])));
                console.log(itemtemp[j]);
                if (localStorage.getItem("CrystalLogger/lagDetect") == "true") {
                    if (itemtemp[j] == "Blank") {
                        notBlank = true;
                    }
                    else if (itemtemp[j] !== "Blank" && notBlank) {
                        //Do a thing. This detects whether there was a break or not.
                        if (window.alt1) {
                            alt1.overLayClearGroup("overlays");
                            alt1.overLayClearGroup("lag");
                            alt1.overLaySetGroup("lag");
                            alt1.overLayTextEx("Lag detected, rescanning...", _alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(255, 144, 0), 20, Math.round(alt1.rsWidth / 2), 200, 1500, "", true, true);
                        }
                        lagDetected = true;
                        lastValue = 0;
                        lagCounter++;
                        capture(autobool);
                        return;
                    }
                }
            }
            itemResults.push(itemtemp);
            x1 = xdefault;
            y1 += 32 + 14;
        }
        if (localStorage.getItem("CrystalLogger/lagDetect") == "true") {
            for (let i = 0; i < itemResults.length; i++) {
                if (itemResults[itemResults.length - 1] !== "Blank") {
                    break;
                }
                else if (itemResults[i] !== "Blank") {
                    continue;
                }
                else {
                    if (seeConsoleLogs)
                        console.log(itemResults[i]);
                    let newImg = _alt1_base__WEBPACK_IMPORTED_MODULE_0__.captureHoldFullRs();
                    let loc2;
                    let x = 0;
                    let y = 0;
                    // TODO: Investigate this for changing tiers
                    if (!legacy) {
                        loc2 = newImg.findSubimage(imgs.crystalChest);
                    }
                    else {
                        loc2 = newImg.findSubimage(imgs.crystalChest);
                    }
                    x = xdefault;
                    y = ydefault;
                    let row = i / 4;
                    let col = i % 8;
                    x += (32 + 23) * col;
                    y += (32 + 14) * row;
                    if (window.alt1) {
                        alt1.overLayClearGroup("overlays");
                        alt1.overLaySetGroup("overlays");
                        alt1.overLayTextEx("Checking last item for lag...", _alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(255, 144, 0), 20, Math.round(alt1.rsWidth / 2), 170, 1000, "", true, true);
                        alt1.overLayClearGroup("icon");
                        alt1.overLaySetGroup("icon");
                        alt1.overLayRect(_alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(125, 194, 33), x, y, 32, 32, 2000, 1);
                    }
                    let lastcrop = newImg.toData(x - 1, loc2[0].y + 39, 32, 32);
                    let lastresult = "";
                    let promises2 = [];
                    promises2.push(lastresult = await compareItems(lastcrop));
                    await Promise.all(promises2);
                    if (seeConsoleLogs)
                        console.log(itemResults, i);
                    if (seeConsoleLogs)
                        console.log("Comparing", lastresult, "to", itemResults[i]);
                    // Consider doing a value check in here...
                    // TODO: If capture issues with lag checking happen look here...
                    // I think this might be fixed, but idk
                    let comparison = true;
                    if (autobool) {
                        try {
                            let itemResultsNoBlanks = [];
                            for (let i = 0; i < itemResults.length; i++) {
                                if (itemResults[i] !== "Blank") {
                                    itemResultsNoBlanks.push(itemResults[i]);
                                }
                                else {
                                    break;
                                }
                            }
                            let lsHistory = JSON.parse(localStorage.getItem("CrystalLogger/History"))[JSON.parse(localStorage.getItem("CrystalLogger/History")).length - 1][0];
                            if (seeConsoleLogs)
                                console.log("Checking arrays for equivalence:", JSON.parse(localStorage.getItem("CrystalLogger/History"))[JSON.parse(localStorage.getItem("CrystalLogger/History")).length - 1][0], itemResultsNoBlanks);
                            if (lsHistory.join(',') === itemResultsNoBlanks.join(',')) { // https://stackoverflow.com/a/6230314
                                if (seeConsoleLogs)
                                    console.log(lsHistory.join(','), "and", itemResultsNoBlanks.join(','), "are the same...");
                                if (seeConsoleLogs)
                                    console.log("They're the same. make it false.");
                                comparison = false;
                            }
                        }
                        catch (e) {
                            console.log("Something broke.", e);
                        }
                    }
                    let lagDetectValue = new _scripts_rewardreader__WEBPACK_IMPORTED_MODULE_3__["default"]();
                    lagDetectValue.pos = _scripts_modeluireader__WEBPACK_IMPORTED_MODULE_4__.ModalUIReader.find()[0];
                    if (!comparison) {
                        if (window.alt1) {
                            alt1.overLayClearGroup("overlays");
                            alt1.overLayClearGroup("lag");
                            alt1.overLaySetGroup("lag");
                            alt1.overLayTextEx("Lag detected, rescanning...", _alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(255, 144, 0), 20, Math.round(alt1.rsWidth / 2), 200, 60000, "", true, true);
                        }
                        lagDetected = true;
                        lastValue = 0;
                        lagCounter++;
                        capture(autobool);
                        return;
                    } // TODO: Put some console log test statements in here...
                    else if (lastresult === itemResults[i]) {
                        break;
                    }
                    else if (parseInt(lastValueList[0]) === parseInt("lagDetectValue")) {
                        break;
                    }
                    else {
                        if (window.alt1) {
                            alt1.overLayClearGroup("overlays");
                            alt1.overLayClearGroup("lag");
                            alt1.overLaySetGroup("lag");
                            alt1.overLayTextEx("Lag detected, rescanning...", _alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(255, 144, 0), 20, Math.round(alt1.rsWidth / 2), 200, 60000, "", true, true);
                        }
                        lagDetected = true;
                        lastValue = 0;
                        lagCounter++;
                        capture(autobool);
                        return;
                    }
                }
            }
        }
        await Promise.all(promises);
        lagCounter = 0;
        // TODO: See if this even does anything
        //Maybe comment this out later idk
        let equalArrays = true;
        if (autobool) {
            if (lastItems.length == 0) {
                if (seeConsoleLogs)
                    console.log("last item length is 0. Pass...");
            }
            else {
                for (let i = 0; i < itemResults.length; i++) {
                    if (itemResults[i] !== lastItems[i]) {
                        equalArrays = false;
                        if (seeConsoleLogs)
                            console.log("Equal arrays false");
                    }
                }
                if (prevValue == value && !equalArrays) {
                    if (window.alt1) {
                        alt1.overLayClearGroup("overlays");
                        alt1.overLaySetGroup("overlays");
                        alt1.overLayTextEx("                 Reward misread.\nPause Autocapture (if on) and restart\n  plugin or rollback, and try again.", _alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(255, 80, 80), 20, Math.round(alt1.rsWidth / 2), 200, 5000, "", true, true);
                    }
                    lastValue = prevValue;
                    if (seeConsoleLogs)
                        console.log("equal arrays is false, setting last value to previous value");
                    return;
                }
            }
        }
        // Give me the quantity of the items!
        let quantResults = [];
        promises = [];
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 8; j++) {
                if (itemResults[i][j] == "Blank") {
                    break;
                }
                promises.push(quantResults.push(await readQuantities(topCrops[i][j])));
            }
        }
        await Promise.all(promises);
        if (seeConsoleLogs)
            (quantResults);
        itemResults = await itemChecker(itemResults, quantResults, value);
        // Send it to the LS!
        promises = [];
        // console.log("Adding to LS",itemResults, quantResults, value)
        promises.push(await submitToLS(itemResults, quantResults, value));
        await Promise.all(promises);
        // Record data for last reward
        lastItems = itemResults.slice();
        lastQuants = quantResults.slice();
        // console.log("Adding to history",lastValue, lastItems, lastQuants, currentReward())
        addHistoryToLs(lastValue, lastItems, lastQuants, currentReward());
        // Put the items and quantites on the display!
        document.getElementById("rewards_value").textContent = value.toLocaleString("en-US");
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 8; j++) {
                if (rewardSlots[(i * 8) + j] == undefined) {
                    break;
                }
                document.getElementById(rewardSlots[(i * 8) + j]).textContent = "";
            }
        }
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 8; j++) {
                // Displaying in Rewards Capture
                if (itemResults[i][j] == "Blank") {
                    break;
                }
                let nodevar = document.createElement("itembox");
                let imgvar = document.createElement("img");
                let quantvar = document.createElement("span");
                nodevar = nodeMaker(parseInt(quantResults[(i * 8) + j]), itemResults[i][j], "recent");
                imgvar = imgMaker(itemResults[i][j], parseInt(quantResults[(i * 8) + j]));
                quantvar = quantMaker(parseInt(quantResults[(i * 8) + j]));
                nodevar.append(quantvar);
                nodevar.append(imgvar);
                document.getElementById(rewardSlots[(i * 8) + j]).appendChild(nodevar);
            }
        }
        //Show it on the screen!
        lootDisplay();
        //Display the victory screen!!!
        if (window.alt1) {
            alt1.overLayClearGroup("overlays");
            alt1.overLayClearGroup("rect");
            alt1.overLayClearGroup("lag");
            alt1.overLaySetGroup("overlays");
            alt1.overLayTextEx(currentRewardUpper() + " rewards captured successfully!", _alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(100, 255, 100), 20, Math.round(alt1.rsWidth / 2), 200, 4000, "", true, true);
            //TODO: Investigate this for changing tiers
            rectangleMaker(0, 255, 0, xRect, yRect, 1000);
        }
        lagDetected = false;
    }
    catch (e) {
        if (window.alt1) {
            alt1.overLayClearGroup("overlays");
            alt1.overLayClearGroup("lag");
            alt1.overLayClearGroup("rect");
            alt1.overLaySetGroup("overlays");
            alt1.overLayTextEx("        A crash occured.\n\n     Remove any obstructions, \n check tier, open a reward, \nreload plugin or clear database and try again", _alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(255, 80, 80), 20, Math.round(alt1.rsWidth / 2), 200, 5000, "", true, true);
        }
        buttonEnabler();
        console.log(e);
        throw (e);
        return;
    }
}
function rectangleMaker(r, g, b, xRect, yRect, timer) {
    if (!legacy) {
        if (currentReward()[0] == "taverley") {
            alt1.overLayRect(_alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(r, g, b), xRect, yRect, imgs.crystalChest.width + 350, imgs.crystalChest.height + 291, timer, 2);
        }
        else if (currentReward()[0] == "prifddinas") {
            alt1.overLayRect(_alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(r, g, b), xRect, yRect, imgs.crystalChest.width + 350, imgs.crystalChest.height + 291, timer, 2);
        }
        else if (currentReward()[0] == "triskelion") {
            alt1.overLayRect(_alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(r, g, b), xRect, yRect, imgs.triskelionTreasures.width + 294, imgs.triskelionTreasures.height + 291, timer, 2);
        }
        else if (currentReward()[0] == "alchemist") {
            alt1.overLayRect(_alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(r, g, b), xRect, yRect, imgs.alchemistsChest.width + 323, imgs.alchemistsChest.height + 291, timer, 2);
        }
    }
    else {
        if (currentReward()[0] == "taverley") {
            alt1.overLayRect(_alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(r, g, b), xRect, yRect, imgs.crystalChestLegacy.width + 352, imgs.crystalChestLegacy.height + 291, timer, 2);
        }
        else if (currentReward()[0] == "prifddinas") {
            alt1.overLayRect(_alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(r, g, b), xRect, yRect, imgs.crystalChestLegacy.width + 352, imgs.crystalChestLegacy.height + 291, timer, 2);
        }
        else if (currentReward()[0] == "triskelion") {
            alt1.overLayRect(_alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(r, g, b), xRect, yRect, imgs.triskelionTreasuresLegacy.width + 297, imgs.triskelionTreasuresLegacy.height + 291, timer, 2);
        }
        else if (currentReward()[0] == "alchemist") {
            alt1.overLayRect(_alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(r, g, b), xRect, yRect, imgs.alchemistsChestLegacy.width + 324, imgs.alchemistsChestLegacy.height + 291, timer, 2);
        }
    }
}
async function itemChecker(itemResults, quantResults, value) {
    let newItemResults = itemResults.slice();
    if (currentReward()[0] == "taverley") {
    }
    else if (currentReward()[0] == "prifddinas") {
        //if((quantResults[1] == 1 && quantResults[2] == 2) && itemResults[0][1] == "Dwarf weed seed" || itemResults[0][1] == "Torstol seed"){
        //	newItemResults[0][1] = "Dwarf weed seed"
        //	newItemResults[0][2] = "Torstol seed"
        //}
    }
    else if (currentReward()[0] == "triskelion") {
        // if((quantResults[2] == 3 && quantResults[3] == 3 && quantResults[4] == 3) && itemResults[0][2] == "Lantadyme seed" || itemResults[0][2] == "Torstol seed" || itemResults[0][2] == "Lantadyme seed"){
        // 	newItemResults[0][2] = "Lantadyme seed"
        // 	newItemResults[0][3] = "Torstol seed"
        // 	newItemResults[0][4] = "Dwarf weed seed"
        // }
        // else if((quantResults[3] == 3 && quantResults[4] == 3 && quantResults[5] == 3) && itemResults[0][3] == "Lantadyme seed" || itemResults[0][3] == "Torstol seed" || itemResults[0][3] == "Lantadyme seed"){
        // 	newItemResults[0][3] = "Lantadyme seed"
        // 	newItemResults[0][4] = "Torstol seed"
        // 	newItemResults[0][5] = "Dwarf weed seed"
        // }
        // else if((quantResults[2] == 10 && quantResults[3] == 15) && itemResults[0][2] == "Grimy torstol" || itemResults[0][2] == "Grimy snapdragon" || itemResults[0][2] == "Grimy lantadyme" || itemResults[0][2] == "Grimy dwarf weed" || itemResults[0][2] == "Grimy avantoe"){
        // 	newItemResults[0][2] = "Grimy torstol"
        // 	newItemResults[0][3] = "Grimy snapdragon"
        // 	newItemResults[0][4] = "Grimy lantadyme"
        // 	newItemResults[0][5] = "Grimy dwarf weed"
        // 	newItemResults[0][6] = "Grimy avantoe"
        // }
        // else if((quantResults[3] == 10 && quantResults[4] == 15) && itemResults[0][3] == "Grimy torstol" || itemResults[0][3] == "Grimy snapdragon" || itemResults[0][3] == "Grimy lantadyme" || itemResults[0][3] == "Grimy dwarf weed" || itemResults[0][3] == "Grimy avantoe"){
        // 	newItemResults[0][3] = "Grimy torstol"
        // 	newItemResults[0][4] = "Grimy snapdragon"
        // 	newItemResults[0][5] = "Grimy lantadyme"
        // 	newItemResults[0][6] = "Grimy dwarf weed"
        // 	newItemResults[0][7] = "Grimy avantoe"
        // }
    }
    else if (currentReward()[0] == "alchemist") {
        if (itemResults[0][0] == "Cadantine seed" || itemResults[0][0] == "Kwuarm seed" || itemResults[0][0] == "Marrentill seed") {
            let cadantinePrice;
            let kwuarmPrice;
            let marrentillPrice;
            try {
                await fetch("https://api.weirdgloop.org/exchange/history/rs/latest?name=Cadantine seed")
                    .then(function (response) {
                    return response.json();
                })
                    .then(function (data) {
                    cadantinePrice = data["Cadantine seed"].price * quantResults[0];
                });
            }
            catch (e) {
                if (seeConsoleLogs)
                    console.log("It failed... setting to 0...");
                cadantinePrice = 0;
            }
            try {
                await fetch("https://api.weirdgloop.org/exchange/history/rs/latest?name=Kwuarm seed")
                    .then(function (response) {
                    return response.json();
                })
                    .then(function (data) {
                    kwuarmPrice = data["Kwuarm seed"].price * quantResults[0];
                });
            }
            catch (e) {
                if (seeConsoleLogs)
                    console.log("It failed... setting to 0...");
                kwuarmPrice = 0;
            }
            try {
                await fetch("https://api.weirdgloop.org/exchange/history/rs/latest?name=Marrentill seed")
                    .then(function (response) {
                    return response.json();
                })
                    .then(function (data) {
                    marrentillPrice = data["Marrentill seed"].price * quantResults[0];
                });
            }
            catch (e) {
                if (seeConsoleLogs)
                    console.log("It failed... setting to 0...");
                marrentillPrice = 0;
            }
            console.log(value, cadantinePrice, kwuarmPrice, marrentillPrice);
            if (value >= cadantinePrice && value <= cadantinePrice) {
                newItemResults[0][0] = "Cadantine seed";
            }
            else if (value >= kwuarmPrice && value <= kwuarmPrice) {
                newItemResults[0][0] = "Kwuarm seed";
            }
            else if (value >= marrentillPrice && value <= marrentillPrice) {
                newItemResults[0][0] = "Marrentill seed";
            }
        }
    }
    return newItemResults;
}
async function compareItems(item) {
    //TODO: Try to get Legacy to work better
    //Legacy works, but I don't have a lot of testing materials
    // Can't use all at once. Can only do one color at a time.
    // const yellow = { r: 255, g: 0, b: 0, a: 255};
    // const black1 = { r: 0, g: 0, b: 0, a: 255};
    // const black2 = { r: 0, g: 0, b: 1, a: 255};
    // const black3 = { r: 0, g: 0, b: 2, a: 255};
    // const legacytan = { r: 62, g: 53, b: 40, a: 255};
    // const rs3blue = { r: 10, g: 31, b: 41, a: 255};
    // let colors = [yellow, black1, black2, black3]
    // Just hold this for now just in case...
    // Remove blank if not blank
    //	{output: {ignoreAreasColoredWith: colors}}
    // 	Choices are: yellow, black1, black2, black3, legacytan, rs3blue
    // all, twoplus, orglist, orgminus
    let matches = [];
    if (currentReward()[0] == "taverley") {
        if (!legacy) {
            matches = listOfItemsTArray.slice();
        }
        else { // Legacy works. But I don't test with it often. I think its okay...
            matches = listOfItemsLegacyTArray.slice();
        }
    }
    else if (currentReward()[0] == "prifddinas") {
        if (!legacy) {
            matches = listOfItemsPArray.slice();
        }
        else { // Legacy works. But I don't test with it often. I think its okay...
            matches = listOfItemsLegacyPArray.slice();
        }
    }
    else if (currentReward()[0] == "triskelion") {
        if (!legacy) {
            matches = listOfItemsKArray.slice();
        }
        else { // Legacy works. But I don't test with it often. I think its okay...
            matches = listOfItemsLegacyKArray.slice();
        }
    }
    else if (currentReward()[0] == "alchemist") {
        if (!legacy) {
            matches = listOfItemsAArray.slice();
        }
        else { // Legacy works. But I don't test with it often. I think its okay...
            matches = listOfItemsLegacyAArray.slice();
        }
    }
    //Check if the item is blank first
    let imgdata = await resemblejs_compareImages__WEBPACK_IMPORTED_MODULE_1___default()(item, matches[0][1], { output: {}, ignore: "less" });
    matches[0][2] = imgdata.rawMisMatchPercentage;
    if (matches[0][2] == 0.00) {
        return "Blank";
    }
    matches.shift(); // Remove blank from the list
    let found = [];
    if (localStorage.getItem("CrystalLogger/Algorithm") == "resemblejs") {
        found = matches[0];
        const promises = [];
        for (let i = 0; i < matches.length; i++) {
            promises.push(await resemblejs_compareImages__WEBPACK_IMPORTED_MODULE_1___default()(item, matches[i][1], { output: {}, ignore: "less" }).then(data => {
                matches[i][2] = data.rawMisMatchPercentage;
            }));
            if (found[2] > matches[i][2]) {
                found = matches[i];
            }
        }
        await Promise.all(promises);
    }
    else if (localStorage.getItem("CrystalLogger/Algorithm") == "pixelmatch") {
        /* List of items that do not identify in pure PixelMatch
            - Huge Plated Adamant Salvage identifies as Huge Plated Rune Salvage when using TwoPlus or All
        */
        found = matches[0];
        const promises = [];
        for (let i = 0; i < matches.length; i++) {
            promises.push(matches[i][2] = pixelmatch__WEBPACK_IMPORTED_MODULE_2___default()(item.data, matches[i][3].data, null, item.width, item.height, { includeAA: true, threshold: 0.1 }));
            if (found[2] > matches[i][2]) {
                found = matches[i];
            }
        }
        await Promise.all(promises);
    }
    else if (localStorage.getItem("CrystalLogger/Algorithm") == "hybrid") {
        // First we check with Pixelmatch and get the comparison of everything to the item
        let promises = [];
        let total = 0;
        for (let i = 0; i < matches.length; i++) {
            promises.push(matches[i][2] = pixelmatch__WEBPACK_IMPORTED_MODULE_2___default()(item.data, matches[i][3].data, null, item.width, item.height, { includeAA: true, threshold: 0.1 }));
            total += matches[i][2];
        }
        // Then we get the average so we can remove half of the items that don't match
        let average = total / matches.length;
        let precision = parseFloat(localStorage.getItem("CrystalLogger/hybridPrecision")); //1 does nothing
        await Promise.all(promises);
        for (let i = matches.length - 1; i >= 0; i--) {
            if (matches[i][2] > (average * precision)) {
                matches.splice(i, 1);
            }
        }
        //Now we find the correct item with ResembleJS!
        promises = [];
        found = matches[0];
        for (let i = 0; i < matches.length; i++) {
            promises.push(await resemblejs_compareImages__WEBPACK_IMPORTED_MODULE_1___default()(item, matches[i][1], { output: {}, ignore: "less" }).then(data => {
                matches[i][2] = data.rawMisMatchPercentage;
            }));
            if (found[2] > matches[i][2]) {
                found = matches[i];
            }
        }
        await Promise.all(promises);
    }
    return found[0];
}
async function readQuantities(item) {
    // Instead of reading top to bottom individulally, 
    // Read from left to right Read left to right with all columns together
    // And since the height is always the same I dont have to worry about changing
    // the value of the width of the number.
    // Maybe consider this for optimizations :^?
    let itemCan = document.createElement("canvas");
    let itemCon = itemCan.getContext('2d');
    itemCan.width = item.width;
    itemCan.height = item.height;
    itemCon.putImageData(item, 0, 0);
    let itemImg = new Image();
    itemImg.src = itemCan.toDataURL("image/png");
    itemCon.drawImage(itemImg, 0, 0);
    let pixels = itemCon.getImageData(0, 0, item.width, item.height);
    let pixarr = [];
    let pixeldata = 0;
    for (let i = 0; i < 8; i++) {
        let arr2 = [];
        for (let j = 0; j < 32; j++) {
            let vals = { r: pixels.data[pixeldata], g: pixels.data[pixeldata + 1], b: pixels.data[pixeldata + 2], a: pixels.data[pixeldata + 3] };
            pixeldata += 4;
            arr2.push(vals);
        }
        pixarr.push(arr2);
    }
    let pixelCount = 0;
    let streak = 0;
    let longestStreak = 0;
    let yellowInCol = false;
    let noYellowStreak = 0;
    let numbers = "";
    for (let i = 0; i < pixarr[0].length; i++) {
        if (noYellowStreak == 3) {
            break;
        }
        for (let j = 0; j < pixarr.length; j++) {
            if (pixarr[j][i].r == 255 && pixarr[j][i].g == 255 && pixarr[j][i].b == 0 || // Yellow, Every screen has this
                pixarr[j][i].r == 255 && pixarr[j][i].g == 254 && pixarr[j][i].b == 0 || // Very slightly darker yellow, a screenie had this...
                pixarr[j][i].r == 254 && pixarr[j][i].g == 254 && pixarr[j][i].b == 0 || // Very slightly darker yellow, a screenie had this...
                pixarr[j][i].r == 253 && pixarr[j][i].g == 253 && pixarr[j][i].b == 0 || // Slightly darker yellow, for safety
                pixarr[j][i].r == 255 && pixarr[j][i].g == 255 && pixarr[j][i].b == 255) { // White, elites and masters only
                pixelCount++;
                streak++;
                noYellowStreak = 0;
                yellowInCol = true;
                if (streak > longestStreak) {
                    longestStreak = streak;
                }
            }
            else {
                streak = 0;
            }
        }
        if (pixelCount == 0) {
            noYellowStreak++;
        }
        else if (yellowInCol == false) {
            if (pixelCount == 11) {
                if (longestStreak == 3) {
                    numbers += "7";
                }
                else { // 9
                    numbers += "1";
                }
            }
            else if (pixelCount == 13) {
                if (longestStreak == 3) {
                    numbers += "3";
                }
                else { //if 6
                    numbers += "4";
                }
            }
            else if (pixelCount == 14) {
                numbers += "0";
            }
            else if (pixelCount == 15) {
                if (longestStreak == 3) {
                    numbers += "2";
                }
                else if (longestStreak == 4) {
                    numbers += "5";
                }
                else if (longestStreak == 7) {
                    numbers += "9";
                }
                else { //if 8
                    numbers += "000";
                    pixelCount = 0;
                    break;
                }
            }
            else if (pixelCount == 18) {
                numbers += "6";
            }
            else { // if pixelCount == 19
                numbers += "8";
            }
            longestStreak = 0;
            pixelCount = 0;
            noYellowStreak++;
        }
        yellowInCol = false;
    }
    if (pixelCount > 5) {
        numbers += "0";
    }
    if (numbers != "") {
        return numbers;
    }
    else {
        return "1";
    }
}
async function submitToLS(item, quant, value) {
    //Add items to database
    if (seeConsoleLogs)
        console.log("Adding to database...");
    console.log(item, quant, value);
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 8; j++) {
            // If you get null or undefined here, check if one of your rewards doesn't exist in LocalStorage or LocalStorageInit
            // Or maybe the name might be incorrectly written in, idk
            // console.log("checking if in array", item[i]);
            if (item[i][j] == "Blank" || item[i][j] == undefined) {
                break;
            }
            let tempQuant = quant[(i * 8) + j].slice();
            console.log("tempQuant", tempQuant);
            if (quant[(i * 8) + j].includes('k')) {
                tempQuant = tempQuant.slice(0, -1);
                tempQuant += "000";
            }
            // console.log(item[i][j], items[item[i][j]].quantity, tempQuant)
            items[item[i][j]].quantity[currentReward()[0]] = parseInt(items[item[i][j]].quantity[currentReward()[0]]) + parseInt(tempQuant);
            updateItems();
            // console.log(items[item[i][j]].quantity[currentReward()[0]])
        }
    }
    // Increase value and count
    localStorage.setItem(currentReward()[1], JSON.stringify((JSON.parse(localStorage.getItem(currentReward()[1])) + value)));
    localStorage.setItem(currentReward()[2], JSON.stringify((JSON.parse(localStorage.getItem(currentReward()[2])) + 1)));
    return true;
}
async function addHistoryToLs(value, item, quants, reward) {
    // The order of how History items are logged
    // Index 0: Items (Array)
    // Index 1: Quantities (Array)
    // Index 2: Value
    // Index 3: "Reward" or "Reward [C] "
    // Index 4: reward count
    // Index 5: History Primary Key
    // Index 6: Date and time captured
    let itemsArr = [];
    for (let i = 0; i < item.length; i++) {
        for (let j = 0; j < item[i].length; j++) {
            console.log("Checking if", item[i][j], "is equal to", "Blank");
            if (item[i][j] !== "Blank" || item[i][j] != undefined) {
                itemsArr.push(item[i][j]);
            }
        }
    }
    for (let i = 0; i < quants.length; i++) {
        if (quants[i].includes('k')) {
            quants[i] = quants[i].slice(0, -1);
            quants[i] += "000";
        }
    }
    let currentDateTime = await dateGetter();
    let previous = [itemsArr, quants, value, reward, localStorage.getItem(currentReward()[2]), localStorage.getItem("CrystalLogger/PrimaryKeyHistory"), currentDateTime];
    let temp = JSON.parse(localStorage.getItem("CrystalLogger/History"));
    temp.push(previous);
    localStorage.setItem("CrystalLogger/History", JSON.stringify(temp));
    localStorage.setItem("CrystalLogger/PrimaryKeyHistory", JSON.stringify(parseInt(localStorage.getItem("CrystalLogger/PrimaryKeyHistory")) + 1));
    await historyClear();
    historyInit();
}
function lootDisplay() {
    //Set Number of clues and Current and Average values
    document.getElementById("number_of_rewards").textContent = parseInt(JSON.parse(localStorage.getItem(currentReward()[2]))).toLocaleString("en-US");
    document.getElementById("value_of_rewards").textContent = parseInt(JSON.parse(localStorage.getItem(currentReward()[1]))).toLocaleString("en-US");
    console.log(Math.round(parseInt(JSON.parse(localStorage.getItem(currentReward()[2]))) / parseInt(JSON.parse(localStorage.getItem(currentReward()[1])))).toLocaleString("en-US"));
    if (parseInt(JSON.parse(localStorage.getItem(currentReward()[2]))) != 0) {
        document.getElementById("average_of_rewards").textContent = Math.round(parseInt(JSON.parse(localStorage.getItem(currentReward()[1]))) / parseInt(JSON.parse(localStorage.getItem(currentReward()[2])))).toLocaleString("en-US");
    }
    else {
        document.getElementById("average_of_rewards").textContent = "0";
    }
    //Set the icons in the tabs
    tabDisplay();
}
function tabDisplay() {
    let keys = Object.keys(items);
    let divs = document.getElementsByClassName("loot_display");
    for (let i = 0; i < divs.length; i++) {
        divs[i].textContent = "";
    }
    for (let i = 0; i < keys.length; i++) {
        // TODO: Interesting tidbit: Comment out this if block to display every item, 
        // but quantities will be undefined for the given tier if it doesn't exist in it.
        if (items[keys[i]].quantity[currentReward()[0]] == undefined || items[keys[i]].quantity[currentReward()[0]] == 0) {
            continue;
        }
        console.log(keys[i]);
        let ele = document.getElementById(items[keys[i]].tab + "_loot");
        let nodevar = document.createElement("itembox");
        let imgvar = document.createElement("img");
        let quantvar = document.createElement("span");
        nodevar = nodeMaker(parseInt(items[keys[i]].quantity[currentReward()[0]]), keys[i], "tab");
        nodevar.style.order = orderChecker(parseInt(items[keys[i]].order), keys[i]).toString();
        // This if else only exists for when I comment out the above if block.
        // Nice for viewing all of the loot.
        if (items[keys[i]].quantity[currentReward()[0]] == undefined) {
            quantvar = quantMaker(0);
            imgvar = imgMaker(keys[i], 0);
        }
        else {
            quantvar = quantMaker(items[keys[i]].quantity[currentReward()[0]]);
            imgvar = imgMaker(keys[i], items[keys[i]].quantity[currentReward()[0]]);
        }
        nodevar.append(quantvar);
        nodevar.append(imgvar);
        ele.append(nodevar);
    }
}
async function historyClear() {
    removeChildNodes(document.getElementById("history_body"));
}
function historyInit() {
    let lsHistory = JSON.parse(localStorage.getItem("CrystalLogger/History"));
    let title = document.getElementById("history_tier_caps");
    title.textContent = currentRewardUpper();
    let quantity = document.getElementById("history_quantity");
    quantity.textContent = localStorage.getItem("CrystalLogger/HistoryDisplayLimit");
    if (lsHistory.length == 0) {
        let ele = document.getElementById("history_body");
        let container = document.createElement("div");
        container.textContent = "There's nothing to display. Start scanning!";
        container.setAttribute('class', 'nothingToDisplayContainer');
        ele.append(container);
    }
    else {
        let index = parseInt(localStorage.getItem(currentReward()[2]));
        let limit = 0;
        for (let i = lsHistory.length - 1; i >= 0; i--) { //Navigating lsHistory
            if (limit < parseInt(localStorage.getItem("CrystalLogger/HistoryDisplayLimit"))) {
                let temp = lsHistory[i];
                if (temp[3][0].replace(" [C] ", "") === currentReward()[0]) {
                    let ele = document.getElementById("history_body");
                    let container = document.createElement("div");
                    container.setAttribute("class", "historyDisplayContainer");
                    container.setAttribute('id', 'container' + temp[5]);
                    let dateBox = document.createElement("div");
                    let dateImg = document.createElement("div");
                    dateBox.setAttribute('class', 'dateBox');
                    dateImg.setAttribute('class', 'dateImage');
                    dateImg.setAttribute('title', 'Date Captured: ' + temp[6]);
                    dateBox.append(dateImg);
                    container.append(dateBox);
                    if (temp[3][0].includes(" [C] ")) {
                        let customSpan = document.createElement("span");
                        customSpan.setAttribute("class", "customSpan");
                        customSpan.setAttribute("title", "Custom reward manually inserted.");
                        customSpan.textContent = " [C] ";
                        let countText = currentRewardUpper() + " reward: " + index;
                        let count = document.createElement("div");
                        count.innerHTML = countText;
                        count.setAttribute('class', 'historyCount');
                        count.append(customSpan);
                        container.append(count);
                    }
                    else {
                        let count = document.createElement("div");
                        count.textContent = currentRewardUpper() + " reward: " + index;
                        count.setAttribute('class', 'historyCount');
                        container.append(count);
                    }
                    let value = document.createElement("div");
                    value.textContent = "Reward Value: " + temp[2].toLocaleString("en-US");
                    value.setAttribute('class', 'historyValue');
                    container.append(value);
                    let TPcheck = false;
                    for (let j = 0; j < 4; j++) { // Navigating temp
                        for (let k = 0; k < 8; k++) {
                            if (temp[0][(j * 8) + k] == "Blank" || temp[0][(j * 8) + k] == undefined) {
                                if (TPcheck) {
                                    break;
                                }
                                for (let l = (j * 8) + k; l < cap; l++) {
                                    let nodevar = document.createElement("itembox");
                                    let imgvar = document.createElement("img");
                                    let quantvar = document.createElement("span");
                                    imgvar = imgMaker("Transparent", temp[1][(j * 8) + k]);
                                    nodevar.setAttribute("class", "node_history");
                                    nodevar.removeAttribute("title");
                                    quantvar.textContent = "";
                                    nodevar.append(imgvar);
                                    nodevar.append(quantvar);
                                    container.append(nodevar);
                                }
                                TPcheck = true;
                                break;
                            }
                            let nodevar = document.createElement("itembox");
                            let imgvar = document.createElement("img");
                            let quantvar = document.createElement("span");
                            // Note for later. Figure out why insert isnt displaying properly...
                            if (temp[1][(j * 8) + k] === undefined) {
                                imgvar = imgMaker("Transparent", temp[1][(j * 8) + k]);
                                nodevar.setAttribute("class", "node_history");
                                nodevar.removeAttribute("title");
                                quantvar.textContent = "";
                            }
                            else {
                                imgvar = imgMaker(temp[0][(j * 8) + k], temp[1][(j * 8) + k]);
                                nodevar = nodeMaker(parseInt(temp[1][(j * 8) + k]), temp[0][(j * 8) + k], "history");
                                quantvar = quantMaker(temp[1][(j * 8) + k]);
                            }
                            nodevar.append(imgvar);
                            nodevar.append(quantvar);
                            container.append(nodevar);
                        }
                    }
                    let buttonbox = document.createElement("div");
                    let button = document.createElement("div");
                    buttonbox.setAttribute('class', 'buttonboxHistory');
                    buttonbox.setAttribute('id', 'container' + temp[5] + 'buttonbox');
                    button.setAttribute('class', 'nisbutton historyButtonStyle');
                    button.setAttribute('id', 'container' + temp[5] + 'button');
                    button.setAttribute('onClick', 'TEST.rollbackVeri("container' + temp[5] + 'button")');
                    button.textContent = "Delete";
                    buttonbox.append(button);
                    container.append(buttonbox);
                    ele.append(container);
                    index--;
                    limit++;
                }
            }
            else {
                break;
            }
        }
        if (index == parseInt(localStorage.getItem(currentReward()[2]))) {
            let ele = document.getElementById("history_body");
            let container = document.createElement("div");
            container.textContent = "There's nothing to display. Start scanning!";
            container.setAttribute('class', 'nothingToDisplayContainer');
            ele.append(container);
        }
    }
}
function rollbackVeri(id) {
    let buttonbox = document.getElementById(id + "box");
    let button = document.getElementById(id);
    buttonbox.removeChild(button);
    let buttonYes = document.createElement("div");
    let buttonNo = document.createElement("div");
    buttonbox.setAttribute('class', 'buttonBoxHistoryVerify');
    buttonYes.setAttribute('class', 'nisbutton buttonVerif');
    buttonYes.setAttribute('onclick', 'TEST.rollbackYes("' + id + '")');
    buttonYes.textContent = "Yes";
    buttonNo.setAttribute('class', 'nisbuttonblue buttonVerif');
    buttonNo.setAttribute('onclick', 'TEST.rollbackNo("' + id + '")');
    buttonNo.textContent = "No";
    buttonbox.append(buttonYes, buttonNo);
}
function rollbackYes(id) {
    if (window.alt1) {
        alt1.overLayClearGroup("overlays");
        alt1.overLaySetGroup("overlays");
        alt1.overLayTextEx("Rolling back reward...", _alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(255, 144, 0), 20, Math.round(alt1.rsWidth / 2), 200, 2000, "", true, true);
    }
    if (seeConsoleLogs)
        console.log("Rolling back reward from history...");
    let container = document.getElementById(id.replace('button', ''));
    container.remove();
    let pKey = parseInt(id.replace('container', '').replace('button', ''));
    let lsHistory = JSON.parse(localStorage.getItem("CrystalLogger/History"));
    let temp = [];
    for (let i = 0; i < lsHistory.length; i++) {
        if (lsHistory[i][5] == pKey) {
            temp = lsHistory[i];
            lsHistory.splice(i, 1);
            localStorage.setItem("CrystalLogger/History", JSON.stringify(lsHistory));
            break;
        }
    }
    for (let i = 0; i < temp[0].length; i++) {
        console.log(temp[0][i]);
        if (temp[0][i] == "Blank") {
            break;
        }
        items[temp[0][i]].quantity[currentReward()[0]] = items[temp[0][i]].quantity[currentReward()[0]] - parseInt(temp[1][i]);
        updateItems();
    }
    // Decrease value and count
    localStorage.setItem(currentReward()[1], JSON.stringify(JSON.parse(localStorage.getItem(currentReward()[1])) - temp[2]));
    localStorage.setItem(currentReward()[2], JSON.stringify(JSON.parse(localStorage.getItem(currentReward()[2])) - 1));
    if (seeConsoleLogs)
        console.log("Removed", temp, ":", pKey, "from LS");
    if (pKey == ((parseInt(localStorage.getItem("CrystalLogger/PrimaryKeyHistory"))) - 1)) {
        document.getElementById("rewards_value").textContent = "0";
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 8; j++) {
                if (rewardSlots[(i * 8) + j] == undefined) {
                    break;
                }
                document.getElementById(rewardSlots[(i * 8) + j]).textContent = "";
            }
        }
    }
    let historyCount = document.getElementsByClassName('historyCount');
    let index = parseInt(localStorage.getItem(currentReward()[2]));
    for (let i = 0; i < parseInt(localStorage.getItem(currentReward()[2])); i++) {
        if (i >= parseInt(localStorage.getItem("CrystalLogger/RollbackDisplayLimit"))) {
            break;
        }
        if (historyCount[i] == undefined) {
            continue;
        }
        historyCount[i].textContent = "Casket reward: " + index;
        index--;
    }
    historyClear();
    historyInit();
    lootDisplay();
    if (window.alt1) {
        alt1.overLayClearGroup("overlays");
        alt1.overLaySetGroup("overlays");
        alt1.overLayTextEx("Previous rewards rolled back successfully!", _alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(100, 255, 100), 20, Math.round(alt1.rsWidth / 2), 200, 2000, "", true, true);
    }
}
function rollbackNo(id) {
    let buttonbox = document.getElementById(id + "box");
    removeChildNodes(buttonbox);
    buttonbox.setAttribute('class', 'buttonboxHistory');
    let button = document.createElement("div");
    button.setAttribute('class', 'nisbutton historyButtonStyle');
    button.setAttribute('id', id);
    button.setAttribute('onClick', 'TEST.rollbackVeri("' + id + '")');
    button.textContent = "Delete";
    buttonbox.append(button);
}
function insertInitEx() {
    insertInit();
}
async function insertInit() {
    let keys = Object.keys(items);
    let list = [["Blank", "~Nothing~", 0]];
    for (let i = 0; i < keys.length; i++) {
        if (items[keys[i]].tier.includes(currentReward()[0])) {
            list.push([keys[i], keys[i], items[keys[i]].order]);
        }
    }
    list.sort(function (a, b) {
        if (a[2] === b[2])
            return 0;
        else
            return (a[2] < b[2]) ? -1 : 1;
    });
    let itemBoxes = document.getElementsByClassName("items");
    let quantBoxes = document.getElementsByClassName("item_quants");
    let valueBox = document.getElementById("value_input");
    valueBox.value = "0";
    for (let i = 0; i < itemBoxes.length; i++) {
        removeChildNodes(itemBoxes[i]);
        quantBoxes[i].value = "0";
        for (let j = 0; j < list.length; j++) {
            let option = document.createElement('option');
            option.value = list[j][0].toString();
            option.textContent = list[j][1].toString();
            option.setAttribute('class', "insert_options");
            itemBoxes[i].append(option);
        }
    }
}
async function fetchFromGE() {
    if (window.alt1) {
        alt1.overLayClearGroup("overlays");
        alt1.overLaySetGroup("overlays");
        alt1.overLayTextEx("Fetching prices from GE...", _alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(255, 144, 0), 20, Math.round(alt1.rsWidth / 2), 200, 40000, "", true, true);
    }
    let itemsList = [];
    let quants = [];
    let itemDivs = document.getElementsByClassName("items");
    let quantDivs = document.getElementsByClassName("item_quants");
    for (let i = 0; i < itemDivs.length; i++) {
        if (itemDivs[i].options[itemDivs[i].selectedIndex].value == "Blank") {
            continue;
        }
        // OpenLogger relics.
        if (["Saradomin page", "Guthix page", "Zamorak page", "Armadyl page", "Bandos page", "Ancient page"].includes(itemDivs[i].options[itemDivs[i].selectedIndex].value)) {
            itemsList.push((itemDivs[i].options[itemDivs[i].selectedIndex].value) + " 1");
        }
        else if (["Ourg tower-goblin cower shield (damaged)"].includes(itemDivs[i].options[itemDivs[i].selectedIndex].value)) {
            itemsList.push((itemDivs[i].options[itemDivs[i].selectedIndex].value).replace("-", "/"));
        }
        else {
            itemsList.push((itemDivs[i].options[itemDivs[i].selectedIndex].value));
        }
        quants.push(parseInt(quantDivs[i].value));
    }
    if (seeConsoleLogs)
        console.log("Fetched items from GE are", itemsList, "quants are", quants);
    if (itemsList.length == 0) {
        if (window.alt1) {
            alt1.overLayClearGroup("overlays");
            alt1.overLaySetGroup("overlays");
            alt1.overLayTextEx("Nothing selected to fetch.\nTry selecting some items.", _alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(255, 144, 0), 20, Math.round(alt1.rsWidth / 2), 200, 4000, "", true, true);
        }
        if (seeConsoleLogs)
            console.log("No items...");
        return;
    }
    let prices = [];
    for (let i = 0; i < itemsList.length; i++) {
        try {
            await fetch("https://api.weirdgloop.org/exchange/history/rs/latest?name=" + itemsList[i].replace("+", "%2B").replace("+", "%2B"))
                .then(function (response) {
                return response.json();
            })
                .then(function (data) {
                prices.push(data[itemsList[i]].price);
            });
        }
        catch (e) {
            if (seeConsoleLogs)
                console.log("It failed... setting to 0...", itemsList[i], itemsList[i].replace("+", "%2B").replace("+", "%2B"));
            prices.push(0);
        }
    }
    let grandTotal = 0;
    for (let i = 0; i < itemsList.length; i++) {
        if (itemsList[i] == "Coins") {
            grandTotal += quants[i];
        }
        else {
            grandTotal += (quants[i] * prices[i]);
        }
    }
    let ele = document.getElementById("value_input");
    ele.value = grandTotal + "";
    if (window.alt1) {
        alt1.overLayClearGroup("overlays");
        alt1.overLaySetGroup("overlays");
        alt1.overLayTextEx("Prices fetched successfully!", _alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(100, 255, 100), 20, Math.round(alt1.rsWidth / 2), 200, 4000, "", true, true);
    }
}
async function verifyInsert(event) {
    if (seeConsoleLogs)
        console.log("Collecting info from insert...");
    let itemsList = [];
    let quants = [];
    let totalPrice = parseInt(document.getElementById("value_input").value);
    let itemDivs = document.getElementsByClassName("items");
    let quantDivs = document.getElementsByClassName("item_quants");
    removeChildNodes(document.getElementById("value_input"));
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 8; j++) {
            if (itemDivs[(i * 8) + j] == undefined) {
                break;
            }
            if (itemDivs[(i * 8) + j].options[itemDivs[(i * 8) + j].selectedIndex].value == "Blank") {
                continue;
            }
            itemsList.push(itemDivs[(i * 8) + j].options[itemDivs[(i * 8) + j].selectedIndex].value);
            quants.push(parseInt(quantDivs[(i * 8) + j].value));
        }
    }
    if (seeConsoleLogs)
        console.log("items verifying are", itemsList, "quants are", quants);
    console.log(itemsList.length);
    if (itemsList.length == 0) {
        if (window.alt1) {
            alt1.overLayClearGroup("overlays");
            alt1.overLaySetGroup("overlays");
            alt1.overLayTextEx("Nothing selected to insert.\n\u200a\u200aTry selecting some items.", _alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(255, 144, 0), 20, Math.round(alt1.rsWidth / 2), 200, 4000, "", true, true);
        }
        if (seeConsoleLogs)
            console.log("No items...");
        event.stopPropagation();
        return;
    }
    let curr = (parseInt(localStorage.getItem(currentReward()[2])) + 1).toString();
    let ele = document.getElementById("insertVerif_body");
    let container = document.createElement("div");
    container.setAttribute("class", 'historyDisplayContainer');
    container.setAttribute('id', 'container' + curr);
    let dateBox = document.createElement("div");
    let dateImg = document.createElement("div");
    dateBox.setAttribute('class', 'dateBox');
    dateImg.setAttribute('class', 'dateImage');
    dateImg.setAttribute('title', 'Date Captured: ' + (await dateGetter()));
    dateBox.append(dateImg);
    container.append(dateBox);
    let customSpan = document.createElement("span");
    customSpan.setAttribute("class", "customSpan");
    customSpan.setAttribute("title", "Custom clue manually inserted.");
    customSpan.textContent = " [C] ";
    let countText = currentReward()[0] + " rewards" + ": " + curr;
    let count = document.createElement("div");
    count.innerHTML = countText;
    count.setAttribute('class', 'historyCount');
    count.setAttribute('title', 'Date Captured: ' + await dateGetter());
    count.append(customSpan);
    container.append(count);
    let value = document.createElement("div");
    value.textContent = "Reward Value: " + totalPrice.toLocaleString("en-US");
    value.setAttribute('class', 'historyValue');
    value.setAttribute('title', 'Date Captured: ' + await dateGetter());
    container.append(value);
    let TPcheck = false;
    for (let j = 0; j < 4; j++) { // Navigating temp
        for (let k = 0; k < 8; k++) {
            if (itemsList[(j * 8) + k] == "Blank" || itemsList[(j * 8) + k] == undefined) {
                if (TPcheck) {
                    break;
                }
                for (let l = (j * 8) + k; l < cap; l++) {
                    let nodevar = document.createElement("itembox");
                    let imgvar = document.createElement("img");
                    let quantvar = document.createElement("span");
                    imgvar = imgMaker("Transparent", quants[(j * 8) + k]);
                    nodevar.setAttribute("class", "node_history");
                    nodevar.removeAttribute("title");
                    quantvar.textContent = "";
                    nodevar.append(imgvar);
                    nodevar.append(quantvar);
                    container.append(nodevar);
                }
                TPcheck = true;
                break;
            }
            let nodevar = document.createElement("itembox");
            let imgvar = document.createElement("img");
            let quantvar = document.createElement("span");
            // Note for later. Figure out why insert isnt displaying properly...
            if (quants[(j * 8) + k] === undefined) {
                imgvar = imgMaker("Transparent", quants[(j * 8) + k]);
                nodevar.setAttribute("class", "node_history");
                nodevar.removeAttribute("title");
                quantvar.textContent = "";
            }
            else {
                imgvar = imgMaker(itemsList[(j * 8) + k], quants[(j * 8) + k]);
                nodevar = nodeMaker(parseInt(quants[(j * 8) + k]), itemsList[(j * 8) + k], "history");
                quantvar = quantMaker(quants[(j * 8) + k]);
            }
            nodevar.append(imgvar);
            nodevar.append(quantvar);
            container.append(nodevar);
        }
    }
    let buttonbox = document.createElement("div");
    let button = document.createElement("div");
    buttonbox.setAttribute('class', 'buttonboxHistory');
    buttonbox.setAttribute('id', 'container' + curr + 'buttonbox');
    button.setAttribute('class', 'nisbutton historyButtonStyle');
    button.setAttribute('id', 'container' + curr + 'button');
    button.textContent = "Sample";
    let customTier = currentReward();
    customTier[0] += " [C] ";
    insertVerif = [itemsList, quants, totalPrice, customTier];
    buttonbox.append(button);
    container.append(buttonbox);
    ele.append(container);
    if (seeConsoleLogs)
        console.log("Insert collected");
}
function insertToDB() {
    if (window.alt1) {
        alt1.overLayClearGroup("overlays");
        alt1.overLaySetGroup("overlays");
        alt1.overLayTextEx("Submitting custom " + currentReward()[0] + "reward to Database...", _alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(255, 144, 0), 20, Math.round(alt1.rsWidth / 2), 200, 40000, "", true, true);
    }
    console.log(insertVerif);
    let itemsList = insertVerif[0];
    let itemsList2D = [];
    for (let i = 0; i < 4; i++) {
        let templist = [];
        for (let j = 0; j < 8; j++) {
            if (itemsList[(i * 8) + j] == undefined)
                itemsList.push("Blank");
            templist.push(itemsList[(i * 8) + j]);
        }
        itemsList2D.push(templist);
    }
    console.log(itemsList2D);
    let quants = [];
    for (let i = 0; i < insertVerif[1].length; i++) {
        quants.push(insertVerif[1][i].toString());
    }
    console.log(quants);
    let value = insertVerif[2];
    let tier = insertVerif[3];
    insertInit();
    submitToLS(itemsList2D, quants, parseInt(value));
    addHistoryToLs(parseInt(value), itemsList2D, quants, tier);
    lootDisplay();
    if (window.alt1) {
        alt1.overLayClearGroup("overlays");
        alt1.overLaySetGroup("overlays");
        alt1.overLayTextEx("Custom " + currentReward()[0] + " rewards submitted successfully!", _alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(100, 255, 100), 20, Math.round(alt1.rsWidth / 2), 200, 4000, "", true, true);
    }
}
function settingsInit() {
    if (seeConsoleLogs)
        console.log("Initializing settings...");
    if (seeConsoleLogs)
        console.log("Setting previously set radio button for Algorithm: " + localStorage.getItem("CrystalLogger/Algorithm") + "...");
    let temp = localStorage.getItem("CrystalLogger/Algorithm");
    let ele = document.getElementById(temp);
    ele.checked = true;
    if (seeConsoleLogs)
        console.log("Setting previously set radio button for lagDetect: " + localStorage.getItem("CrystalLogger/lagDetect") + "...");
    if (localStorage.getItem("CrystalLogger/lagDetect") == "true") {
        ele = document.getElementById("lagon");
        ele.checked = true;
    }
    else if (localStorage.getItem("CrystalLogger/lagDetect") == "false") {
        ele = document.getElementById("lagoff");
        ele.checked = true;
    }
    if (seeConsoleLogs)
        console.log("Setting previously set radio button for MultiButtonPressDetect: " + localStorage.getItem("CrystalLogger/multiButtonPressDetect") + "...");
    if (localStorage.getItem("CrystalLogger/multiButtonPressDetect") == "true") {
        ele = document.getElementById("multion");
        ele.checked = true;
    }
    else if (localStorage.getItem("CrystalLogger/multiButtonPressDetect") == "false") {
        ele = document.getElementById("multioff");
        ele.checked = true;
    }
    if (seeConsoleLogs)
        console.log("Setting previously set radio button for noMenu: " + localStorage.getItem("CrystalLogger/noMenu") + "...");
    if (localStorage.getItem("CrystalLogger/noMenu") == "true") {
        ele = document.getElementById("menuon");
        ele.checked = true;
    }
    else if (localStorage.getItem("CrystalLogger/noMenu") == "false") {
        ele = document.getElementById("menuoff");
        ele.checked = true;
    }
    if (seeConsoleLogs)
        console.log("Setting previously set radio button for hybridPrecision: " + localStorage.getItem("CrystalLogger/hybridPrecision") + "...");
    ele = document.getElementById("hybrid_precision");
    ele.value = localStorage.getItem("CrystalLogger/hybridPrecision");
    if (seeConsoleLogs)
        console.log("Setting previously set radio button for HistoryDisplayLimit: " + localStorage.getItem("CrystalLogger/HistoryDisplayLimit") + "...");
    ele = document.getElementById("history_display_limit");
    ele.value = localStorage.getItem("CrystalLogger/HistoryDisplayLimit");
    if (seeConsoleLogs)
        console.log("Settings initialized!");
}
async function saveSettings(alg, lag, multi, menu, precision, limit) {
    buttonDisabler();
    if (seeConsoleLogs)
        console.log("Saving settings...");
    if (window.alt1) {
        alt1.overLayClearGroup("overlays");
        alt1.overLaySetGroup("overlays");
        alt1.overLayTextEx("Saving settings...", _alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(255, 144, 0), 20, Math.round(alt1.rsWidth / 2), 200, 50000, "", true, true);
    }
    localStorage.setItem("CrystalLogger/Algorithm", alg);
    localStorage.setItem("CrystalLogger/lagDetect", lag);
    localStorage.setItem("CrystalLogger/hybridPrecision", precision);
    localStorage.setItem("CrystalLogger/HistoryDisplayLimit", limit);
    if (localStorage.getItem("CrystalLogger/multiButtonPressDetect") !== multi) {
        localStorage.setItem("CrystalLogger/multiButtonPressDetect", multi);
        if (seeConsoleLogs)
            console.log("Adjusting saved values");
        if (multi === "true") {
            if (localStorage.getItem("CrystalLogger/autoCapture") === "true") {
                document.getElementById("docapturebutton").setAttribute("onclick", "");
                document.getElementById("docapturebutton").setAttribute("title", "Disable autocapture to use this button");
                document.getElementById("docapturebuttonwords").style.setProperty("text-decoration", "line-through");
            }
        }
        else if (multi === "false") {
            if (localStorage.getItem("CrystalLogger/autoCapture") === "true") {
                document.getElementById("docapturebutton").setAttribute("onclick", "TEST.capture(false)");
                document.getElementById("docapturebutton").setAttribute("title", "");
                document.getElementById("docapturebuttonwords").style.removeProperty("text-decoration");
            }
            else {
                document.getElementById("docapturebutton").setAttribute("onclick", "TEST.capture(false)");
                document.getElementById("docapturebutton").setAttribute("title", "");
                document.getElementById("docapturebuttonwords").style.removeProperty("text-decoration");
            }
        }
    }
    if (localStorage.getItem("CrystalLogger/noMenu") !== menu) {
        localStorage.setItem("CrystalLogger/noMenu", menu);
        noMenuCheck();
    }
    historyClear();
    historyInit();
    settingsInit();
    await arraySetup();
    buttonEnabler();
    if (window.alt1) {
        alt1.overLayClearGroup("overlays");
        alt1.overLaySetGroup("overlays");
        alt1.overLayTextEx("Settings saved!", _alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(100, 255, 100), 20, Math.round(alt1.rsWidth / 2), 200, 2000, "", true, true);
    }
    if (seeConsoleLogs)
        console.log("Settings saved!");
}
function autoDisableCheckAuto(event) {
    if (document.getElementById("toggleunlocktrack").classList.contains("enabled")) {
        toggleCapture(event);
    }
}
function toggleCapture(event) {
    if (document.getElementById("toggleunlocktrack").classList.contains("enabled")) {
        document.getElementById("toggleunlocktrack").classList.remove("enabled");
        localStorage.setItem("CrystalLogger/autoCapture", "false");
        if (window.alt1) {
            alt1.overLayClearGroup("overlays");
            alt1.overLaySetGroup("overlays");
            alt1.overLayTextEx("Autocapture disabled!", _alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(100, 255, 100), 20, Math.round(alt1.rsWidth / 2), 200, 2000, "", true, true);
        }
    }
    else {
        document.getElementById("toggleunlocktrack").classList.add("enabled");
        localStorage.setItem("CrystalLogger/autoCapture", "true");
        if (window.alt1) {
            alt1.overLayClearGroup("overlays");
            alt1.overLaySetGroup("overlays");
            alt1.overLayTextEx("Autocapture enabled!", _alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(100, 255, 100), 20, Math.round(alt1.rsWidth / 2), 200, 2000, "", true, true);
        }
    }
    autoCheck();
    if (event != undefined) {
        event.stopPropagation();
    }
}
function autoCheck() {
    if (localStorage.getItem("CrystalLogger/autoCapture") === "true") {
        if (localStorage.getItem("CrystalLogger/multiButtonPressDetect") === "true") {
            document.getElementById("docapturebutton").setAttribute("onclick", "");
            document.getElementById("docapturebutton").setAttribute("title", "Disable autocapture to use this button");
            document.getElementById("docapturebuttonwords").style.setProperty("text-decoration", "line-through");
        }
        autoCaptureInterval = window.setInterval(async function () {
            let promises = [];
            promises.push(await autoCallCapture());
            await Promise.all(promises);
        }, 600);
    }
    else {
        if (localStorage.getItem("CrystalLogger/multiButtonPressDetect") === "true") {
            document.getElementById("docapturebutton").setAttribute("onclick", "TEST.capture(false)");
            document.getElementById("docapturebutton").setAttribute("title", "");
            document.getElementById("docapturebuttonwords").style.removeProperty("text-decoration");
        }
        window.clearInterval(autoCaptureInterval);
        autoCaptureInterval = null;
    }
}
function autoCallCapture() {
    capture(true);
}
function noMenuCheck() {
    if (localStorage.getItem("CrystalLogger/noMenu") === "true") {
        noMenuInterval = window.setInterval(async function () {
            let img = _alt1_base__WEBPACK_IMPORTED_MODULE_0__.captureHoldFullRs();
            //TODO: Investigate this for changing tiers
            let loc = img.findSubimage(imgs.crystalChest);
            let rewardreader = new _scripts_rewardreader__WEBPACK_IMPORTED_MODULE_3__["default"]();
            rewardreader.pos = _scripts_modeluireader__WEBPACK_IMPORTED_MODULE_4__.ModalUIReader.find()[0];
            let value = rewardreader.read(img).value;
            let length = value.toString().length;
            let comma = Math.floor(length / 3);
            if (seeConsoleLogs)
                console.log("Highlighting value...");
            if (window.alt1) {
                alt1.overLayClearGroup("nomenu");
                alt1.overLaySetGroup("nomenu");
                //TODO: Investigate this for changing tiers, the image used in width and height
                alt1.overLayRect(_alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(255, 50, 50), loc[0].x + 301 - (5 * length) + (1 * comma), loc[0].y + 218, 2 + (8 * length) + (4 * comma), imgs.crystalChest.height + 6, 60000, 2);
                alt1.overLayTextEx("NO MENUS HERE", _alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(255, 50, 50), 10, loc[0].x + 301, loc[0].y + 242, 3000, "", true, true);
            }
        }, 1000);
    }
    else {
        if (window.alt1) {
            alt1.overLayClearGroup("nomenu");
        }
        window.clearInterval(noMenuInterval);
        noMenuInterval = null;
    }
}
function exporttocsv() {
    if (window.alt1) {
        alt1.overLayClearGroup("overlays");
        alt1.overLaySetGroup("overlays");
        alt1.overLayTextEx("Generating CSV...", _alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(255, 144, 0), 20, Math.round(alt1.rsWidth / 2), 200, 2000, "", true, true);
    }
    let csvinfo = [];
    csvinfo.push(["Item", "Taverley", "Prifddinas", "Triskelion", "Alchemist"]);
    let lsHistory = JSON.parse(localStorage.getItem("CrystalLogger/History"));
    let keys = Object.keys(items);
    let currOrder = 1;
    if (seeConsoleLogs)
        console.log("Generating CSV...");
    if (seeConsoleLogs)
        console.log("Getting values and counts...");
    let tCount = localStorage.getItem("CrystalLogger/TCount");
    let tValue = localStorage.getItem("CrystalLogger/TValue");
    let pCount = localStorage.getItem("CrystalLogger/PCount");
    let pValue = localStorage.getItem("CrystalLogger/PValue");
    let kCount = localStorage.getItem("CrystalLogger/KCount");
    let kValue = localStorage.getItem("CrystalLogger/KValue");
    let aCount = localStorage.getItem("CrystalLogger/ACount");
    let aValue = localStorage.getItem("CrystalLogger/AValue");
    csvinfo.push(["Total Count", tCount, pCount, kCount, aCount]);
    csvinfo.push(["Total Value", tValue, pValue, kValue, aValue]);
    if (seeConsoleLogs)
        console.log("Getting item quantities...");
    for (let i = 0; i < keys.length; i++) {
        for (let j = 0; j < keys.length; j++) {
            if (items[keys[j]].order == currOrder.toString()) {
                let val = items[keys[j]];
                let one = val.quantity.taverley;
                let two = val.quantity.prifddinas;
                let three = val.quantity.triskelion;
                let four = val.quantity.alchemist;
                if (one == undefined || one == "0") { // .toLocaleString("en-US")
                    one = "";
                }
                else {
                    one = one.toString();
                }
                if (two == undefined || two == "0") {
                    two = "";
                }
                else {
                    two = two.toString();
                }
                if (three == undefined || three == "0") {
                    three = "";
                }
                else {
                    three = three.toString();
                }
                if (four == undefined || four == "0") {
                    four = "";
                }
                else {
                    four = four.toString();
                }
                csvinfo.push([keys[j], one, two, three, four]);
                currOrder++;
                break;
            }
        }
    }
    csvinfo.push([]);
    csvinfo.push([]);
    csvinfo.push(["Captured Rewards History", 'Parse tier at " : " and " [C] "', '"Parse date and time at "", " "', 'Parse items at " x "']);
    csvinfo.push(["Rewards Tier & Count", "Reward Value", "Date and Time recorded", "Item 1", "Item 2", "Item 3", "Item 4", "Item 5", "Item 6", "Item 7", "Item 8", "Item 9", "Item 10", "Item 11", "Item 12"]);
    console.log(lsHistory);
    if (seeConsoleLogs)
        console.log("Setting history in csv...");
    let taverley = 1;
    let prifddinas = 1;
    let triskelion = 1;
    let alchemist = 1;
    for (let i = 0; i < lsHistory.length; i++) {
        if (lsHistory[i][3][0].replace(" [C] ", "") == ("taverley")) {
            lsHistory[i][4] = taverley;
            taverley++;
        }
        else if (lsHistory[i][3][0].replace(" [C] ", "") == ("prifddinas")) {
            lsHistory[i][4] = prifddinas;
            prifddinas++;
        }
        else if (lsHistory[i][3][0].replace(" [C] ", "") == ("triskelion")) {
            lsHistory[i][4] = triskelion;
            triskelion++;
        }
        else if (lsHistory[i][3][0].replace(" [C] ", "") == ("alchemist")) {
            lsHistory[i][4] = alchemist;
            alchemist++;
        }
        let temp = [lsHistory[i][3][0] + " : " + lsHistory[i][4], lsHistory[i][2]];
        for (let j = 0; j < 4; j++) {
            for (let k = 0; k < 8; k++) {
                if (lsHistory[i][0][(j * 8) + k] == undefined || lsHistory[i][0][(j * 8) + k] === "Blank") {
                    temp.push("");
                }
                else {
                    temp.push(lsHistory[i][1][(j * 8) + k].toString() + " x " + lsHistory[i][0][(j * 8) + k].toString());
                }
            }
        }
        csvinfo.push(temp);
    }
    localStorage.setItem("CrystalLogger/History", JSON.stringify(lsHistory));
    const d = new Date();
    let hour = "0" + d.getHours().toString();
    let minute = "0" + d.getMinutes().toString();
    let second = "0" + d.getSeconds().toString();
    let month = "0" + (d.getMonth() + 1).toString();
    let day = "0" + d.getDate().toString();
    let csvContent = "";
    csvinfo.forEach(function (i) {
        let row = i.join(",");
        csvContent += row + "\r\n";
    });
    let filename = "CrystalLogger CSV " + (d.getFullYear() + "-" + month.slice(-2) + "-" + day.slice(-2) + "--" + hour.slice(-2) + "-" + minute.slice(-2) + "-" + second.slice(-2)) + ".csv";
    let encodedUri = "data:text/csv;charset=utf-8,%EF%BB%BF" + encodeURI(csvContent);
    let link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link); // Required for FF
    link.click();
    if (window.alt1) {
        alt1.overLayClearGroup("overlays");
        alt1.overLaySetGroup("overlays");
        alt1.overLayTextEx("CSV Generated!", _alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(100, 255, 100), 20, Math.round(alt1.rsWidth / 2), 200, 2000, "", true, true);
    }
}
function nodeMaker(quant, item, attribute) {
    let nodevar = document.createElement("itembox");
    if (attribute === "tab") {
        nodevar.setAttribute("class", "node_tab");
        nodevar.setAttribute('style', 'order: ' + orderChecker(parseInt(items[item].order), item) + ';');
    }
    else if (attribute === "history") {
        nodevar.setAttribute("class", "node_history");
    }
    else if (attribute === "recent") {
        nodevar.setAttribute("class", "node_recent");
    }
    nodevar.setAttribute('title', quant.toLocaleString("en-US") + " x " + item);
    return nodevar;
}
function imgMaker(item, quant) {
    let imgvar = document.createElement("img");
    if (false) {}
    else {
        imgvar.src = encodeURI("./images/items/" + item.replace("/", "-") + ".png");
    }
    imgvar.setAttribute('style', 'margin:auto;');
    imgvar.ondragstart = function () { return false; };
    return imgvar;
}
function quantMaker(quant) {
    let quantvar = document.createElement("span");
    if (quant > 9999999 || quant < -9999999) {
        quantvar.setAttribute('class', 'quant_green_text');
        quantvar.textContent = Math.trunc(quant / 1000000).toString() + "M";
    }
    else if (quant > 99999 || quant > 9999 || quant < -9999 || quant < -99999) {
        quantvar.setAttribute('class', 'quant_white_text');
        quantvar.textContent = Math.trunc(quant / 1000).toString() + "k";
    }
    else {
        quantvar.setAttribute('class', 'quant_yellow_text');
        quantvar.textContent = quant + "";
    }
    return quantvar;
}
async function dateGetter() {
    const d = new Date();
    let hour = "0" + d.getUTCHours().toString();
    let minute = "0" + d.getUTCMinutes().toString();
    let second = "0" + d.getUTCSeconds().toString();
    let month = "0" + (d.getUTCMonth() + 1).toString();
    let day = "0" + d.getUTCDate().toString();
    let currentDate = hour.slice(-2) + ":" + minute.slice(-2) + ":" + second.slice(-2) + ", " + d.getUTCFullYear() + "/" + month.slice(-2) + "/" + day.slice(-2) + " UTC";
    return currentDate;
}
function removeChildNodes(div) {
    while (div.firstChild) {
        div.firstChild.remove();
    }
}
function _base64ToImageData(buffer, width, height) {
    return new Promise(resolve => {
        let image = new Image();
        image.addEventListener('load', function (e) {
            let canvasElement = document.createElement('canvas');
            canvasElement.width = width;
            canvasElement.height = height;
            let context = canvasElement.getContext('2d');
            context.drawImage(e.target, 0, 0, width, height);
            resolve(context.getImageData(0, 0, width, height));
        });
        image.src = buffer;
    });
}
function toggleLootDisplay(id) {
    let lootdisplay = Array.from(document.getElementsByClassName('loot_display'));
    let tab = document.getElementById(id);
    if (id == "first_rewards") {
        lootdisplay[0].style.display = (lootdisplay[0].style.display == 'flex') ? 'none' : 'flex';
        tab.style.textDecoration = (lootdisplay[0].style.display == 'flex') ? 'none' : 'line-through';
        tab.title = (lootdisplay[0].style.display == 'flex') ? 'Click here to hide broadcast rewards' : 'Click here to show broadcast rewards';
        opentabs[0] = (lootdisplay[0].style.display == 'flex') ? true : false;
    }
    else if (id == "second_rewards") {
        lootdisplay[1].style.display = (lootdisplay[1].style.display == 'flex') ? 'none' : 'flex';
        tab.style.textDecoration = (lootdisplay[1].style.display == 'flex') ? 'none' : 'line-through';
        tab.title = (lootdisplay[1].style.display == 'flex') ? 'Click here to hide miscellaneous rewards' : 'Click here to show miscellaneous rewards';
        opentabs[1] = (lootdisplay[1].style.display == 'flex') ? true : false;
    }
    else if (id == "third_rewards") {
        lootdisplay[2].style.display = (lootdisplay[2].style.display == 'flex') ? 'none' : 'flex';
        tab.style.textDecoration = (lootdisplay[2].style.display == 'flex') ? 'none' : 'line-through';
        tab.title = (lootdisplay[2].style.display == 'flex') ? 'Click here to hide miscellaneous rewards' : 'Click here to show miscellaneous rewards';
        opentabs[2] = (lootdisplay[2].style.display == 'flex') ? true : false;
    }
    if (seeConsoleLogs)
        console.log(opentabs);
    let truecount = 0;
    for (let i = 0; i < opentabs.length; i++) {
        if (opentabs[i] == true) {
            truecount++;
        }
    }
    if (seeConsoleLogs)
        console.log(truecount);
    let minH = 0;
    if (truecount == 3) {
        minH = 33;
    }
    // Tinker with this. 
    // If you want to change the min heights for each thing, 
    // change variables starting below here
    if (truecount == 2) {
        minH = 40;
    }
    if (truecount == 1) {
        minH = 75;
    }
    let minHval = (minH + "%").toString();
    // Currently circumventing truecount checker
    minHval = "80px";
    if (opentabs[0]) {
        Array.from(document.getElementsByClassName('first'))[0].style.minHeight = minHval;
    }
    else {
        Array.from(document.getElementsByClassName('first'))[0].style.minHeight = "8%";
    }
    if (opentabs[1]) {
        Array.from(document.getElementsByClassName('second'))[0].style.minHeight = minHval;
    }
    else {
        Array.from(document.getElementsByClassName('second'))[0].style.minHeight = "8%";
    }
    if (opentabs[2]) {
        Array.from(document.getElementsByClassName('third'))[0].style.minHeight = minHval;
    }
    else {
        Array.from(document.getElementsByClassName('third'))[0].style.minHeight = "8%";
    }
}
function updateItems() {
    localStorage.setItem("CrystalLogger/items", JSON.stringify(items));
}
function orderChecker(order, item) {
    // TODO: Determine order here if needed 
    return order;
}
function buttonDisabler() {
    if (localStorage.getItem("CrystalLogger/autoCapture") !== "true") {
        document.getElementById("docapturebutton").setAttribute("title", "Currently disabled to due initialization, settings being saved, or autocapture");
        document.getElementById("docapturebuttonwords").style.setProperty("text-decoration", "line-through");
        document.getElementById("docapturebutton").setAttribute("onclick", "");
    }
    document.getElementById("toggleunlocktrack").setAttribute("onclick", "");
    let radiobuttons = document.getElementsByClassName("rewards_level");
    for (let i = 0; i < radiobuttons.length; i++) {
        radiobuttons[i].disabled = true;
    }
    document.getElementById("taverley").setAttribute("onclick", "");
    document.getElementById("prifddinas").setAttribute("onclick", "");
    document.getElementById("triskelion").setAttribute("onclick", "");
    document.getElementById("alchemist").setAttribute("onclick", "");
    document.getElementById("label_taverley").setAttribute("onclick", "");
    document.getElementById("label_prifddinas").setAttribute("onclick", "");
    document.getElementById("label_triskelion").setAttribute("onclick", "");
    document.getElementById("label_alchemist").setAttribute("onclick", "");
    buttonDisabletoggle = false;
}
function buttonEnabler() {
    if (localStorage.getItem("CrystalLogger/autoCapture") !== "true") {
        document.getElementById("docapturebutton").setAttribute("title", "");
        document.getElementById("docapturebuttonwords").style.removeProperty("text-decoration");
        document.getElementById("docapturebutton").setAttribute("onclick", "TEST.capture(false)");
    }
    document.getElementById("toggleunlocktrack").setAttribute("onclick", "TEST.toggleCapture(event)");
    let radiobuttons = document.getElementsByClassName("rewards_level");
    for (let i = 0; i < radiobuttons.length; i++) {
        radiobuttons[i].disabled = false;
    }
    document.getElementById("taverley").setAttribute("onclick", "TEST.changeClueTierSpan('taverley', event);");
    document.getElementById("prifddinas").setAttribute("onclick", "TEST.changeClueTierSpan('prifddinas', event);");
    document.getElementById("triskelion").setAttribute("onclick", "TEST.changeClueTierSpan('triskelion', event);");
    document.getElementById("alchemist").setAttribute("onclick", "TEST.changeClueTierSpan('alchemist', event);");
    document.getElementById("label_taverley").setAttribute("onclick", "TEST.changeClueTierSpan('taverley', event);");
    document.getElementById("label_prifddinas").setAttribute("onclick", "TEST.changeClueTierSpan('prifddinas', event);");
    document.getElementById("label_triskelion").setAttribute("onclick", "TEST.changeClueTierSpan('triskelion', event);");
    document.getElementById("label_alchemist").setAttribute("onclick", "TEST.changeClueTierSpan('alchemist', event);");
    buttonDisabletoggle = true;
}
function currentReward() {
    let currButton = "";
    for (let i = 0; i < rewardslist.length; i++) {
        if (document.getElementById(rewardslist[i]).checked) {
            currButton = rewardslist[i];
            if (currButton == 'taverley') {
                return [currButton, "CrystalLogger/TValue", "CrystalLogger/TCount"];
            }
            else if (currButton == 'prifddinas') {
                return [currButton, "CrystalLogger/PValue", "CrystalLogger/PCount"];
            }
            else if (currButton == 'triskelion') {
                return [currButton, "CrystalLogger/KValue", "CrystalLogger/KCount"];
            }
            else if (currButton == 'alchemist') {
                return [currButton, "CrystalLogger/AValue", "CrystalLogger/ACount"];
            }
        }
    }
}
function currentRewardUpper() {
    return (currentReward()[0][0].toUpperCase() + currentReward()[0].slice(1).toLowerCase());
}
//print text world
//also the worst possible example of how to use global exposed exports as described in webpack.config.json
//output.insertAdjacentHTML("beforeend", `
//	<div>paste an image of rs with homeport button (or not)</div>
//	<div onclick='TEST.capture()'>Click to capture if on alt1</div>`
//);
//check if we are running inside alt1 by checking if the alt1 global exists
if (window.alt1) {
    //tell alt1 about the app
    //this makes alt1 show the add app button when running inside the embedded browser
    //also updates app settings if they are changed
    alt1.identifyAppUrl("./appconfig.json");
}

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});