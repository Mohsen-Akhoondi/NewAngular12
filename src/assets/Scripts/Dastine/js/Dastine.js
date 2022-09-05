/* 
 * Simple Script to install Dastine based on browser type.
 * Supported browsers are: Internet Explorer, FireFox, Chrome
 */
!function(r,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.jsunicode=e():r.jsunicode=e()}(this,function(){return function(r){function e(t){if(n[t])return n[t].exports;var o=n[t]={exports:{},id:t,loaded:!1};return r[t].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var n={};return e.m=r,e.c=n,e.p="",e(0)}([function(r,e,n){var t=n(1),o=n(6),i=n(8),u=n(9),a=n(4),d=n(5),c=n(2);t.register("UTF-8",u),t.register("UTF-16",i),t.register("UTF-16BE",i),t.register("UTF-16LE",i),t.register("UTF-32",o),t.register("UTF-32BE",o),t.register("UTF-32LE",o);var f=function(r,e){void 0===e&&(e="UTF-8");var n=t.encode(r,{encoding:e,byteWriter:"count",throwOnError:!0});return n},l=function(r,e,n,t){t=t||{},t.byteReaderOptions=t.byteReaderOptions||{},t.byteWriterOptions=t.byteWriterOptions||{};var o=a.get(e,t.byteReaderOptions),i=d.get(n,t.byteWriterOptions);o.begin(r);for(var u=o.read();null!==u;)i.write(u),u=o.read();return i.finish()};e.decode=t.decode,e.encode=t.encode,e.byteReader=a,e.byteWriter=d,e.convertBytes=l,e.countEncodedBytes=f,e.jsunicodeError=c},function(r,e,n){var t=n(2),o=n(3),i=n(4),u=n(5),a={},d=function(r,e){a[r]=e},c=function(r){return a[r]},f=function(r,e){for(var n=[],o=!1,i=null,u=function(r){if(e)throw new t(r);n.push(65533)},a=0;a<r.length;a++){var d=r.charCodeAt(a);d>65535||d<0?(u("String contains invalid character data"),o&&(n.push(65533),o=!1)):d<=55295||d>=57344?(o===!0&&(u("Unmatched surrogate pair in string"),o=!1),n.push(d)):o?(d<56320?u("Low surrogate value not valid"):n.push(65536+(i-55296<<10)+d-56320),o=!1):d>=56320?u("Unexpected high surrogate found"):(o=!0,i=d)}return o&&u("Unexpected end of string (unmatched surrogate pair)"),n},l=function(r,e){e=o({},{encoding:"UTF-8",byteWriter:"hex",throwOnError:!1},e||{}),e.byteWriterOptions=e.byteWriterOptions||{};var n=c(e.encoding);if(void 0===n)throw new t("Unrecognized encoding: "+e.encoding);var i=u.get(e.byteWriter,e.byteWriterOptions);if(void 0===i)throw new t("Unrecognized byte writer name: "+e.byteWriter);if(null===r||void 0===r)return r;var a=f(r,e.throwOnError);n.encode(a,i,e);var d=i.finish();return d},s=function(r,e){e=o({},{encoding:"UTF-8",byteReader:"hex",throwOnError:!1},e||{}),e.byteReaderOptions=e.byteReaderOptions||{};var n=c(e.encoding);if(void 0===n)throw new t("Unrecognized encoding: "+e.encoding);var u=i.get(e.byteReader,e.byteReaderOptions);if(void 0===u)throw new t("Unrecognized byte reader name: "+e.byteReader);if(null===r||void 0===r)return r;u.begin(r);var a=n.decode(u,e);return a};e.register=d,e.get=c,e.decode=s,e.encode=l},function(r,e){var n=function(r){var e=Error.call(this,r);this.name="jsunicodeException",this.message=e.message,this.stack=e.stack},t=function(){};t.prototype=Error.prototype,n.prototype=new t,r.exports=n},function(r,e){"use strict";var n=Object.prototype.hasOwnProperty,t=Object.prototype.toString,o=function(r){return"function"==typeof Array.isArray?Array.isArray(r):"[object Array]"===t.call(r)},i=function(r){if(!r||"[object Object]"!==t.call(r))return!1;var e=n.call(r,"constructor"),o=r.constructor&&r.constructor.prototype&&n.call(r.constructor.prototype,"isPrototypeOf");if(r.constructor&&!e&&!o)return!1;var i;for(i in r);return"undefined"==typeof i||n.call(r,i)};r.exports=function r(){var e,n,t,u,a,d,c=arguments[0],f=1,l=arguments.length,s=!1;for("boolean"==typeof c?(s=c,c=arguments[1]||{},f=2):("object"!=typeof c&&"function"!=typeof c||null==c)&&(c={});f<l;++f)if(e=arguments[f],null!=e)for(n in e)t=c[n],u=e[n],c!==u&&(s&&u&&(i(u)||(a=o(u)))?(a?(a=!1,d=t&&o(t)?t:[]):d=t&&i(t)?t:{},c[n]=r(s,d,u)):"undefined"!=typeof u&&(c[n]=u));return c}},function(r,e,n){var t=n(2),o={},i=function(r,e){o[r]=e};i("hex",function(){var r,e,n=function(n){if(r=n,e=0,n.length%2!==0)throw new t("Invalid hex string length")},o=function(){if(e>=r.length)return null;var n=parseInt(r.substring(e,e+2),16);if(isNaN(n))throw new t("Invalid hex byte");return e+=2,n};return{begin:n,read:o}});var u=function(){var r,e,n=function(n){r=n,e=0},t=function(){return e>=r.length?null:r[e++]};return{begin:n,read:t}};i("byteArray",u),i("Uint8Array",u);var a={A:0,B:1,C:2,D:3,E:4,F:5,G:6,H:7,I:8,J:9,K:10,L:11,M:12,N:13,O:14,P:15,Q:16,R:17,S:18,T:19,U:20,V:21,W:22,X:23,Y:24,Z:25,a:26,b:27,c:28,d:29,e:30,f:31,g:32,h:33,i:34,j:35,k:36,l:37,m:38,n:39,o:40,p:41,q:42,r:43,s:44,t:45,u:46,v:47,w:48,x:49,y:50,z:51,0:52,1:53,2:54,3:55,4:56,5:57,6:58,7:59,8:60,9:61,"+":62,"/":63};i("base64",function(){var r,e,n,o,i,u=function(u){if(u.length%4!==0)throw new t("base64 string length not divisible by 4 (padding is required)");r=u,o=[null,null,null],e=0,n=0,i=r.length/4*3},d=function(){if(e>=i)return null;if(e%3===0){var u=r.substr(n,4);n+=4;for(var d=[null,null,null,null],c=0;c<4;c++)if("="===u[c]){if(e+3<i||c<2||2===c&&"="!==u[3])throw new t("Unexpected padding character");i--,d[c]=null}else if(d[c]=a[u[c]],void 0===d[c])throw new t("Unrecognized base64 character");o[0]=(d[0]<<2)+((48&d[1])>>4),null!==d[2]&&(o[1]=((15&d[1])<<4)+((60&d[2])>>2)),null!==d[3]&&(o[2]=((3&d[2])<<6)+d[3])}var f=o[e%3];return e++,f};return{begin:u,read:d}});var d=function(r,e){var n=o[r];return"function"==typeof n?n(e):void 0===n?void 0:(n.options=e,n)},c=function(){return Object.keys(o)};e.register=i,e.get=d,e.list=c},function(r,e,n){var t={},o=n(3),i=n(2),u=function(r,e){t[r]=e};u("hex",function(r){var e=[];r=o({},{upperCase:!1},r);var n=function(n){if(0===n)e.push("00");else{var t=n.toString(16);t.length<2&&(t="0"+t),t=r.upperCase?t.toUpperCase():t.toLowerCase(),e.push(t)}},t=function(){return e.join("")};return{write:n,finish:t}}),u("byteArray",function(){var r=[],e=function(e){r.push(e)},n=function(){return r};return{write:e,finish:n}}),u("Uint8Array",function(){var r=[],e=function(e){r.push(e)},n=function(){return new Uint8Array(r)};return{write:e,finish:n}}),u("count",function(){var r=0,e=function(){r++},n=function(){return r};return{write:e,finish:n}});var a=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9","+","/"];u("base64",function(){var r=[],e=null,n=null,t=function(t){null===e?e=t:null===n?n=t:(r.push(a[e>>2]),r.push(a[((3&e)<<4)+(n>>4)]),r.push(a[((15&n)<<2)+(t>>6)]),r.push(a[63&t]),e=null,n=null)},o=function(){return null!==e&&(null!==n?(r.push(a[e>>2]),r.push(a[((3&e)<<4)+(n>>4)]),r.push(a[(15&n)<<2]),r.push("=")):(r.push(a[e>>2]),r.push(a[(3&e)<<4]),r.push("=="))),r.join("")};return{write:t,finish:o}});var d=function(r,e){var n=t[r];if("function"==typeof n)n=n(e);else{if(void 0===n)return;n.options=e}return{write:function(r){if("number"!=typeof r||r<0||r>255)throw new i("Invalid byte");return n.write(r)},finish:n.finish}},c=function(){return Object.keys(t)};e.register=u,e.get=d,e.list=c},function(r,e,n){var t=n(7),o=function(r,e){var n=e.throwOnError,o=!1;("UTF-32LE"===e.encoding||e.isLittleEndian)&&(o=!0);for(var i=[],u=[r.read(),r.read(),r.read(),r.read()];null!==u[0];){null!==u[1]&&null!==u[2]&&null!==u[3]||i.push(t.errorString("Unexpected end of input",n));var a;a=o?(u[3]<<24)+(u[2]<<16)+(u[1]<<8)+u[0]:(u[0]<<24)+(u[1]<<16)+(u[2]<<8)+u[3],i.push(t.fromCodePoint(a)),u=[r.read(),r.read(),r.read(),r.read()]}return i.join("")},i=function(r,e,n){var t=!1;("UTF-32LE"===n.encoding||n.isLittleEndian)&&(t=!0);for(var o=0;o<r.length;o++){var i=r[o];t?(e.write(255&i),e.write((65280&i)>>8),e.write((16711680&i)>>16),e.write((4278190080&i)>>24)):(e.write((4278190080&i)>>24),e.write((16711680&i)>>16),e.write((65280&i)>>8),e.write(255&i))}};e.decode=o,e.encode=i},function(r,e,n){var t=n(2),o=function(r,e){var n;if(void 0===e){if(n=r,String.hasOwnProperty("fromCodePoint"))return String.fromCodePoint(n);if(n>=65536){var t=n-65536;return r=55296+(t>>10),e=56320+(1023&t),String.fromCharCode(r)+String.fromCharCode(e)}return String.fromCharCode(n)}return String.hasOwnProperty("fromCodePoint")?(n=65536+(r-55296<<10)+(e-56320),String.fromCodePoint(n)):String.fromCharCode(r)+String.fromCharCode(e)},i=function(r){return!(r>=55296&&r<=57343)&&!(r>1114111)},u=function(r,e){if(e===!0)throw new t(r);if(e===!1)return"�";throw new Error("throwOnError argument required")};e.fromCodePoint=o,e.errorString=u,e.validateCodePoint=i},function(r,e,n){var t=n(7),o=function(r,e){var n=e.throwOnError,o=!1;("UTF-16LE"===e.encoding||e.isLittleEndian)&&(o=!0);for(var i,u=[],a=r.read(),d=r.read(),c=null;null!==a;)null===d&&u.push(t.errorString("Odd number of bytes in byte stream (must be even for UTF-16)",n)),i=o?256*d+a:256*a+d,null!==c?(i<56320||i>57343?u.push(t.errorString("Surrogate code point not found when expected",n)):u.push(t.fromCodePoint(c,i)),c=null):i>=56320&&i<=57343?(u.push(t.errorString("Invalid code point (in high surrogate range)",n)),c=null):i>=55296&&i<=56319?c=i:(u.push(t.fromCodePoint(i)),c=null),a=r.read(),d=r.read();return null!==c&&u.push(t.errorString("High surrogate code point at end of byte stream (expected corresponding low surrogate code point)",n)),u.join("")},i=function(r,e,n){var t=!1;("UTF-16LE"===n.encoding||n.isLittleEndian)&&(t=!0);for(var o=function(r){t?(e.write(255&r),e.write((65280&r)>>8)):(e.write((65280&r)>>8),e.write(255&r))},i=0;i<r.length;i++){var u=r[i];if(u<65536)o(u);else{var a=u-65536,d=55296+(a>>10),c=56320+(1023&a);o(d),o(c)}}};e.decode=o,e.encode=i},function(r,e,n){var t=n(7),o=function(r,e){for(var n,o,i,u=[],a=r.read(),d=e.throwOnError,c=null;null!==a;){if(a<128)u.push(t.fromCodePoint(a)),c=null;else{192===(224&a)?(n=2,i=(31&a)<<6):224===(240&a)?(n=3,i=(15&a)<<12):240===(248&a)?(n=4,i=(7&a)<<18):u.push(t.errorString("Invalid leading byte",d));for(var f=n-1;f>0;f--)o=r.read(),null===o?u.push(t.errorString("Unexpected end of byte stream",d)):128!==(192&o)?u.push(t.errorString("Invalid continuation byte",d)):i+=o-128<<6*(f-1);t.validateCodePoint(i)?(u.push(t.fromCodePoint(i)),c=null):e.allowEncodedSurrogatePair&&null===c&&i>=55296&&i<=56319?c=i:e.allowEncodedSurrogatePair&&null!==c&&i>=56320&&i<=57343?(u.push(t.fromCodePoint(c,i)),c=null):(u.push(t.errorString("Invalid Unicode code point detected",d)),c=null)}a=r.read()}return e.allowEncodedSurrogatePair&&null!==c&&u.push(t.errorString("Unmatched encoded surrogate pair",d)),u.join("")},i=function(r,e){for(var n=0;n<r.length;n++){var t=r[n];t<128?e.write(t):t<2048?(e.write(192+(t>>6)),e.write(128+(63&t))):t<65536?(e.write(224+(t>>12)),e.write(128+(t>>6&63)),e.write(128+(63&t))):(e.write(240+(t>>18)),e.write(128+(t>>12&63)),e.write(128+(t>>6&63)),e.write(128+(63&t)))}};e.decode=o,e.encode=i}])});
var TokenRemovalTimer;
var TokenRemovalTimerWaitPeriod = 500;//millisecond
var RemovalEventRunning=false;
var TokenInsertionTimer;
var TokenInsertionTimerWaitPeriod = 500;//millisecond
var InsertionEventRunning=false;
var conn=false;
var hostUrl = "ws://127.0.0.1:51356/dastine";

var Dastine = {
	isInstalled:false,
	isBusy : false,
	socketConnection:null,
	info:"undefined",
	errorMessage:"DASTINE_NOT_INSTALLED",
	
	
	CheckUpdateCallBack:"",
    CheckUpdate: function(callbackCheckUpdate) {
		Dastine.CheckUpdateCallBack=callbackCheckUpdate;
		var msg = {command: "CheckUpdate"};
		msg["src"] = "dastine.js";
		Dastine.TriggerDastineFunction(msg);		      
    },
	InstallUpdateCallBack:"",
    InstallUpdate: function(callbackInstallUpdate) {
		Dastine.InstallUpdateCallBack=callbackInstallUpdate;
		var msg = {command: "InstallUpdate"};
		msg["src"] = "dastine.js";
		Dastine.TriggerDastineFunction(msg);		      
    },
	SelectCertificateFromWindowsByUICallBack:"",
    SelectCertificateFromWindowsByUI: function(issuer, keyUsages, callbackSelectCertificateFromWindowsByUI) {
		Dastine.SelectCertificateFromWindowsByUICallBack=callbackSelectCertificateFromWindowsByUI;
		var msg = {command: "SelectCertificateFromWindowsByUI"};
		msg["src"] = "dastine.js";
		msg["issuer"] = issuer;
		msg["keyUsages"] = keyUsages;
		Dastine.TriggerDastineFunction(msg);		      
    },
	GetSelectedCertificateCallBack:"",
    GetSelectedCertificate: function(callbackGetSelectedCertificate) {
		Dastine.GetSelectedCertificateCallBack=callbackGetSelectedCertificate;
		var msg = {command: "GetSelectedCertificate"};
		msg["src"] = "dastine.js";
		Dastine.TriggerDastineFunction(msg);	     
    },
	SelectCertificateFromTokenByUICallBack:"",
    SelectCertificateFromTokenByUI: function(issuer, keyUsages, callbackSelectCertificateFromTokenByUI) {
		Dastine.SelectCertificateFromTokenByUICallBack=callbackSelectCertificateFromTokenByUI;
		var msg = {command: "SelectCertificateFromTokenByUI"};
		msg["src"] = "dastine.js";
		msg["issuer"] = issuer;
		msg["keyUsages"] = keyUsages;
		Dastine.TriggerDastineFunction(msg);	      
    },
	SelectCertificateFromFileByUICallBack:"",
    SelectCertificateFromFileByUI: function(issuer, keyUsages, p12, password, callbackSelectCertificateFromFileByUI) {
		Dastine.SelectCertificateFromFileByUICallBack=callbackSelectCertificateFromFileByUI;
		var msg = {command: "SelectCertificateFromFileByUI"};
		msg["src"] = "dastine.js";
		msg["issuer"] = issuer;
		msg["keyUsages"] = keyUsages;
		msg["p12"] = p12;
		msg["password"] = password;
		Dastine.TriggerDastineFunction(msg);	     
    },
	SelectCertificateFromFileBySubjectCallBack:"",
    SelectCertificateFromFileBySubject: function(subjectDn, issuer, keyUsages, p12, password, callbackSelectCertificateFromFileBySubject) {
		Dastine.SelectCertificateFromFileBySubjectCallBack=callbackSelectCertificateFromFileBySubject;
		var msg = {command: "SelectCertificateFromFileBySubject"};
		msg["src"] = "dastine.js";
		msg["subjectDn"] = subjectDn;
		msg["issuer"] = issuer;
		msg["keyUsages"] = keyUsages;
		msg["p12"] = p12;
		msg["password"] = password;
		Dastine.TriggerDastineFunction(msg);	     
    },
	SelectCertificateFromWindowsBySubjectCallBack:"",
    SelectCertificateFromWindowsBySubject: function(subjectDn, issuer, keyUsages, callbackSelectCertificateFromWindowsBySubject) {
		Dastine.SelectCertificateFromWindowsBySubjectCallBack=callbackSelectCertificateFromWindowsBySubject;
		var msg = {command: "SelectCertificateFromWindowsBySubject"};
		msg["src"] = "dastine.js";
		msg["subjectDn"] = subjectDn;
		msg["issuer"] = issuer;
		msg["keyUsages"] = keyUsages;
		Dastine.TriggerDastineFunction(msg);	    
    },
	SelectCertificateFromTokenBySubjectCallBack:"",
    SelectCertificateFromTokenBySubject: function(subjectDn, issuer, keyUsages, callbackSelectCertificateFromTokenBySubject) {
		Dastine.SelectCertificateFromTokenBySubjectCallBack=callbackSelectCertificateFromTokenBySubject;
		var msg = {command: "SelectCertificateFromTokenBySubject"};
		msg["src"] = "dastine.js";
		msg["subjectDn"] = subjectDn;
		msg["issuer"] = issuer;
		msg["keyUsages"] = keyUsages;
		Dastine.TriggerDastineFunction(msg);	    
	},
	FindCertificateFromTokenCallBack:"",
    FindCertificateFromToken: function(issuer, keyUsages, callbackFindCertificateFromToken) {
		Dastine.FindCertificateFromTokenCallBack=callbackFindCertificateFromToken;
		var msg = {command: "FindCertificateFromToken"};
		msg["src"] = "dastine.js";
		msg["issuer"] = issuer;
		msg["keyUsages"] = keyUsages;
		Dastine.TriggerDastineFunction(msg);	      
    },
	ListTokensCallBack:"",
    ListTokens: function(callbackListTokens) {
		Dastine.ListTokensCallBack=callbackListTokens;
		var msg = {command: "ListTokens"};
		msg["src"] = "dastine.js";
		Dastine.TriggerDastineFunction(msg);	       
    },
	GenerateKeyPairAndCertificateRequestCallBack:"",
    GenerateKeyPairAndCertificateRequest: function(subjectDn, keyLen, token, callbackGenerateKeyPairAndCertificateRequest) {
		Dastine.GenerateKeyPairAndCertificateRequestCallBack=callbackGenerateKeyPairAndCertificateRequest;
		var msg = {command: "GenerateKeyPairAndCertificateRequest"};
		msg["src"] = "dastine.js";
		msg["subjectDn"] = subjectDn;
		msg["keyLen"] = keyLen;
		msg["token"] = token;
		Dastine.TriggerDastineFunction(msg);		
    },
	GenerateKeyPairAndCertificateRequestOnSelectedCertificateCallBack:"",
    GenerateKeyPairAndCertificateRequestOnSelectedCertificate: function(subjectDn, keyLen, token, callbackGenerateKeyPairAndCertificateRequestOnSelectedCertificate) {
		Dastine.GenerateKeyPairAndCertificateRequestOnSelectedCertificateCallBack=callbackGenerateKeyPairAndCertificateRequestOnSelectedCertificate;
		var msg = {command: "GenerateKeyPairAndCertificateRequestOnSelectedCertificate"};
		msg["src"] = "dastine.js";
		msg["subjectDn"] = subjectDn;
		msg["keyLen"] = keyLen;
		msg["token"] = token;
		Dastine.TriggerDastineFunction(msg);
		
	},
	GenerateCertificateRequestBySelectedCertificateCallBack:"",
    GenerateCertificateRequestBySelectedCertificate: function(callbackGenerateCertificateRequestBySelectedCertificate) {

		Dastine.GenerateCertificateRequestBySelectedCertificateCallBack=callbackGenerateCertificateRequestBySelectedCertificate;
		var msg = {command: "GenerateCertificateRequestBySelectedCertificate"};
		msg["src"] = "dastine.js";
		Dastine.TriggerDastineFunction(msg);		
    },
	ImportIssuedCertificateCallBack:"",
    ImportIssuedCertificate: function(certificate, callbackImportIssuedCertificate) {
		Dastine.ImportIssuedCertificateCallBack=callbackImportIssuedCertificate;
		var msg = {command: "ImportIssuedCertificate"};
		msg["src"] = "dastine.js";
		msg["certificate"] = certificate;
		Dastine.TriggerDastineFunction(msg);		
    },
	ImportIssuedCertificateOnSelectedCertificateCallBack:"",
    ImportIssuedCertificateOnSelectedCertificate: function(certificate, callbackImportIssuedCertificateOnSelectedCertificate) {

		Dastine.ImportIssuedCertificateOnSelectedCertificateCallBack=callbackImportIssuedCertificateOnSelectedCertificate;
		var msg = {command: "ImportIssuedCertificateOnSelectedCertificate"};
		msg["src"] = "dastine.js";
		msg["certificate"] = certificate;
		Dastine.TriggerDastineFunction(msg);	
	
    },
	SignCallBack:"",
    Sign: function(data, hash, callbackSign) {
		Dastine.SignCallBack=callbackSign;
		var msg = {command: "Sign"};
		msg["src"] = "dastine.js";
		msg["data"] = data;
		msg["hash"] = hash;
		Dastine.TriggerDastineFunction(msg);
	
    },
	CmsSignCallBack:"",
    CmsSign: function(data, attach, callbackCmsSign,hash) {
		Dastine.CmsSignCallBack=callbackCmsSign;
		var msg = {command: "CmsSign"};
		msg["src"] = "dastine.js";
		msg["data"] = data;
		msg["attach"] = attach;
		if(hash ==undefined)
			hash="SHA1";
		msg["hash"] = hash;
		Dastine.TriggerDastineFunction(msg);
	
    },
	CmsSignWithAttributesCallBack:"",
    CmsSignWithAttributes: function(data, AuthenticatedAttributes, UnAuthenticatedAttributes, callbackCmsSignWithAttributes) {
		Dastine.CmsSignWithAttributesCallBack=callbackCmsSignWithAttributes;
		var msg = {command: "CmsSignWithAttributes"};
		msg["src"] = "dastine.js";
		msg["data"] = data;
		msg["AuthenticatedAttributes"] = AuthenticatedAttributes;
		msg["UnAuthenticatedAttributes"] = UnAuthenticatedAttributes;
		Dastine.TriggerDastineFunction(msg);
	
    },
	CmsDecryptCallBack:"",
    CmsDecrypt: function(cipher, callbackCmsDecrypt) {
		Dastine.CmsDecryptCallBack=callbackCmsDecrypt;
		var msg = {command: "CmsDecrypt"};
		msg["src"] = "dastine.js";
		msg["cipher"] = cipher;
		Dastine.TriggerDastineFunction(msg);	    
    },
	Base64ToUnicodeCallBack:"",
    Base64ToUnicode: function(base64Str, callbackBase64ToUnicode) {
		var event =["data"]; 
		event.data=["Result"];
		event.data.Result=jsunicode.decode(base64Str, { encoding: "UTF-16LE", byteReader: "base64" });
		Dastine.Base64ToUnicodeCallBack=callbackBase64ToUnicode;
		Dastine.Base64ToUnicodeCallBack(event);
		/*var msg = {command: "Base64ToUnicode"};
		msg["src"] = "dastine.js";
		msg["base64Str"] = base64Str;
		Dastine.TriggerDastineFunction(msg);	*/  
    },
	UnicodeToBase64CallBack:"",
    UnicodeToBase64: function(unicodeStr, callbackUnicodeToBase64) {
		var event =["data"]; 
		event.data=["Result"];
		event.data.Result=jsunicode.encode(unicodeStr, { encoding: "UTF-16LE", byteWriter: "base64" });
		Dastine.UnicodeToBase64CallBack=callbackUnicodeToBase64;
		Dastine.UnicodeToBase64CallBack(event);
		/*var msg = {command: "UnicodeToBase64"};
		msg["src"] = "dastine.js";
		msg["unicodeStr"] = unicodeStr;
		Dastine.TriggerDastineFunction(msg);	*/
    },
	RemoveSelectedCertificateCallBack:"",
    RemoveSelectedCertificate: function(callbackRemoveSelectedCertificate) {
		Dastine.RemoveSelectedCertificateCallBack=callbackRemoveSelectedCertificate;
		var msg = {command: "RemoveSelectedCertificate"};
		msg["src"] = "dastine.js";
		Dastine.TriggerDastineFunction(msg);	    
    },
	RemoveGeneratedKeyPairCallBack:"",
    RemoveGeneratedKeyPair: function(callbackRemoveGeneratedKeyPair) {
		Dastine.RemoveGeneratedKeyPairCallBack=callbackRemoveGeneratedKeyPair;
		var msg = {command: "RemoveGeneratedKeyPair"};
		msg["src"] = "dastine.js";
		Dastine.TriggerDastineFunction(msg);	    
    },
	GetVersionCallBack:"",
    GetVersion: function(callbackGetVersion) {
		Dastine.GetVersionCallBack=callbackGetVersion;
		var msg = {command: "GetVersion"};
		msg["src"] = "dastine.js";
		Dastine.TriggerDastineFunction(msg);	   
    },
	SetTokenRemoveEventCallBack:"",
	TokenRemoveHandler:"",
    SetTokenRemoveEvent: function(callbackSetTokenRemoveEvent, callbackTokenRemoveHandler) {
		Dastine.SetTokenRemoveEventCallBack=callbackSetTokenRemoveEvent;
		Dastine.TokenRemoveHandler=callbackTokenRemoveHandler;
		var msg = {command: "SetTokenRemoveEvent"};
		msg["src"] = "dastine.js";
		RemovalEventRunning=true;
		Dastine.TriggerDastineFunction(msg);	     
    },
	SetTokenInsertEventCallBack:"",
	TokenInsertHandler:"",
    SetTokenInsertEvent: function(callbackSetTokenInsertEvent,callbackTokenInsertHandler) {
		Dastine.SetTokenInsertEventCallBack=callbackSetTokenInsertEvent;
		Dastine.TokenInsertHandler=callbackTokenInsertHandler;
		var msg = {command: "SetTokenInsertEvent"};
		msg["src"] = "dastine.js";
		InsertionEventRunning=true;
		Dastine.TriggerDastineFunction(msg);	    
    },
	SetAdminKeyCallBack:"",
    SetAdminKey: function(adminKey, token, callbackSetAdminKey) {
		Dastine.SetAdminKeyCallBack=callbackSetAdminKey;
		var msg = {command: "SetAdminKey"};
		msg["src"] = "dastine.js";
		msg["adminKey"] = adminKey;
		msg["token"] = token;
		Dastine.TriggerDastineFunction(msg);	     
    },
	ChangePINCallBack:"",
    ChangePIN: function(token, callbackChangePIN) {
		Dastine.ChangePINCallBack=callbackChangePIN;
		var msg = {command: "ChangePIN"};
		msg["src"] = "dastine.js";
		msg["token"] = token;
		Dastine.TriggerDastineFunction(msg);	
    },
	SetPINCallBack:"",
    SetPIN: function(pin, token, callbackSetPIN) {
		Dastine.SetPINCallBack=callbackSetPIN;
		var msg = {command: "SetPIN"};
		msg["src"] = "dastine.js";
		msg["pin"] = pin;
		msg["token"] = token;
		Dastine.TriggerDastineFunction(msg);	
	},
	SetConfigCallBack:"",
    SetConfig: function(config, callbackSetConfig) {
		Dastine.SetConfigCallBack=callbackSetConfig;
		var msg = {command: "SetConfig"};
		msg["src"] = "dastine.js";
		msg["config"] = config;
		Dastine.TriggerDastineFunction(msg);	  		    
    },
	ResetCallBack:"",
    Reset: function(callbackReset) {
		Dastine.ResetCallBack=callbackReset;
		var msg = {command: "Reset"};
		msg["src"] = "dastine.js";
		Dastine.TriggerDastineFunction(msg);	 
    },
	ReadSignatureImageCallBack:"",
    ReadSignatureImage: function(callbackReadSignatureImage) {
		Dastine.ReadSignatureImageCallBack=callbackReadSignatureImage;
		var msg = {command: "ReadSignatureImage"};
		msg["src"] = "dastine.js";
		Dastine.TriggerDastineFunction(msg);	    
    },
	ReadFingerprintImageCallBack:"",
    ReadFingerprintImage: function(callbackReadFingerprintImage) {
		Dastine.ReadFingerprintImageCallBack=callbackReadFingerprintImage;
		var msg = {command: "ReadFingerprintImage"};
		msg["src"] = "dastine.js";
		Dastine.TriggerDastineFunction(msg);	   
    },
	ReadFaceImageCallBack:"",
    ReadFaceImage: function(callbackReadFaceImage) {
		Dastine.ReadFaceImageCallBack=callbackReadFaceImage;
		var msg = {command: "ReadFaceImage"};
		msg["src"] = "dastine.js";
		Dastine.TriggerDastineFunction(msg);	
    },
	ReadValidationDataCallBack:"",
    ReadValidationData: function(callbackReadValidationData) {
		Dastine.ReadValidationDataCallBack=callbackReadValidationData;
		var msg = {command: "ReadValidationData"};
		msg["src"] = "dastine.js";
		Dastine.TriggerDastineFunction(msg);	  
    },
	ReadPrintedDataCallBack:"",
    ReadPrintedData: function(callbackReadPrintedData) {
		Dastine.ReadPrintedDataCallBack=callbackReadPrintedData;
		var msg = {command: "ReadPrintedData"};
		msg["src"] = "dastine.js";
		Dastine.TriggerDastineFunction(msg);	    
    },
	ImportCertificateFromFileToTokenCallBack:"",
    ImportCertificateFromFileToToken: function(p12, pass, token, keyContainer, callbackImportCertificateFromFileToToken) {
		Dastine.ImportCertificateFromFileToTokenCallBack=callbackImportCertificateFromFileToToken;
		var msg = {command: "ImportCertificateFromFileToToken"};
		msg["src"] = "dastine.js";
		msg["p12"] = p12;
		msg["pass"] = pass;
		msg["token"] = token;
		msg["keyContainer"] = keyContainer;
		Dastine.TriggerDastineFunction(msg);	    
    },
	UnblockPINCallBack:"",
    UnblockPIN: function(token, callbackUnblockPIN) {
		Dastine.UnblockPINCallBack=callbackUnblockPIN;
		var msg = {command: "UnblockPIN"};
		msg["src"] = "dastine.js";
		msg["token"] = token;
		Dastine.TriggerDastineFunction(msg);	   
    },
	SetIDinCardCallBack:"",
    SetIDinCard: function(serialNumber, callbackSetIDinCard) {
		Dastine.SetIDinCardCallBack=callbackSetIDinCard;
		var msg = {command: "SetIDinCard"};
		msg["src"] = "dastine.js";
		msg["serialNumber"] = serialNumber;
		Dastine.TriggerDastineFunction(msg);	   
    },
	SetIDinCardIndexForIssuanceCallBack:"",
    SetIDinCardIndexForIssuance: function(index, callbackSetIDinCardIndexForIssuance) {
		Dastine.SetIDinCardIndexForIssuanceCallBack=callbackSetIDinCardIndexForIssuance;
		var msg = {command: "SetIDinCardIndexForIssuance"};
		msg["src"] = "dastine.js";
		msg["index"] = index;
		Dastine.TriggerDastineFunction(msg);	   
    },
	ReadSerialNumberCallBack:"",
    ReadSerialNumber: function(callbackReadSerialNumber) {
		Dastine.ReadSerialNumberCallBack=callbackReadSerialNumber;
		var msg = {command: "ReadSerialNumber"};
		msg["src"] = "dastine.js";
		Dastine.TriggerDastineFunction(msg);	   
    },
	ReadIDinCardsSerialNumberCallBack:"",
    ReadIDinCardsSerialNumber: function(callbackReadIDinCardsSerialNumber) {
		Dastine.ReadIDinCardsSerialNumberCallBack=callbackReadIDinCardsSerialNumber;
		var msg = {command: "ReadIDinCardsSerialNumber"};
		msg["src"] = "dastine.js";
		Dastine.TriggerDastineFunction(msg);	   
    },
	ReadExtendedPrintedDataCallBack:"",
    ReadExtendedPrintedData: function(callbackReadExtendedPrintedData) {
		Dastine.ReadExtendedPrintedDataCallBack=callbackReadExtendedPrintedData;
		var msg = {command: "ReadExtendedPrintedData"};
		msg["src"] = "dastine.js";
		Dastine.TriggerDastineFunction(msg);	
    },
	ReadCustomFieldCallBack:"",
    ReadCustomField: function(index, callbackReadCustomField) {
		Dastine.ReadCustomFieldCallBack=callbackReadCustomField;
		var msg = {command: "ReadCustomField"};
		msg["src"] = "dastine.js";
		msg["index"] = index;
		Dastine.TriggerDastineFunction(msg);	    
	},
	OpenFingerPrintScannerCallBack:"",
    OpenFingerPrintScanner: function(scannername, callbackOpenFingerPrintScanner) {
		Dastine.OpenFingerPrintScannerCallBack=callbackOpenFingerPrintScanner;
		var msg = {command: "OpenFingerPrintScanner"};
		msg["src"] = "dastine.js";
		msg["scannername"] = scannername;
		Dastine.TriggerDastineFunction(msg);	       
	},
	CaptureFingerPrintScannerCallBack:"",
    CaptureFingerPrintScanner: function(imageformatname, callbackCaptureFingerPrintScanner) {
		Dastine.CaptureFingerPrintScannerCallBack=callbackCaptureFingerPrintScanner;
		var msg = {command: "CaptureFingerPrintScanner"};
		msg["src"] = "dastine.js";
		msg["imageformatname"] = imageformatname;
		Dastine.TriggerDastineFunction(msg);	       
	},
	CloseFingerPrintScannerCallBack:"",
    CloseFingerPrintScanner: function(callbackCloseFingerPrintScanner) {
		Dastine.CloseFingerPrintScannerCallBack=callbackCloseFingerPrintScanner;
		var msg = {command: "CloseFingerPrintScanner"};
		msg["src"] = "dastine.js";
		Dastine.TriggerDastineFunction(msg);	       
	},
	GetFingerPrintScannerSupportedDevicesCallBack:"",
    GetFingerPrintScannerSupportedDevices: function(callbackGetFingerPrintScannerSupportedDevices) {
		Dastine.GetFingerPrintScannerSupportedDevicesCallBack=callbackGetFingerPrintScannerSupportedDevices;
		var msg = {command: "GetFingerPrintScannerSupportedDevices"};
		msg["src"] = "dastine.js";
		Dastine.TriggerDastineFunction(msg);	       
	},
	GetFingerPrintScannerDLLVersionCallBack:"",
    GetFingerPrintScannerDLLVersion: function(callbackGetFingerPrintScannerDLLVersion) {
		Dastine.GetFingerPrintScannerDLLVersionCallBack=callbackGetFingerPrintScannerDLLVersion;
		var msg = {command: "GetFingerPrintScannerDLLVersion"};
		msg["src"] = "dastine.js";
		Dastine.TriggerDastineFunction(msg);	       
	},
	GetFingerPrintScannerSupportedImageFormatCallBack:"",
    GetFingerPrintScannerSupportedImageFormat: function(scannername, callbackGetFingerPrintScannerSupportedImageFormat) {
		Dastine.GetFingerPrintScannerSupportedImageFormatCallBack=callbackGetFingerPrintScannerSupportedImageFormat;
		var msg = {command: "GetFingerPrintScannerSupportedImageFormat"};
		msg["src"] = "dastine.js";
		msg["scannername"] = scannername;
		Dastine.TriggerDastineFunction(msg);	       
	},
	TriggerDastineFunction: function(msg)
	{
		try
		{
			/*if(Dastine.socketConnection == null )
			{
				if(typeof sessionStorage.DastineId == 'undefined')
				{	
					var randomString = generateRandomString();
					sessionStorage.setItem('DastineId', randomString); 
				}
				Dastine.info = sessionStorage.DastineId;
				msg["info"] = Dastine.info;
				//hostUrl = "ws://127.0.0.1:51356/dastine";
				Dastine.socketConnection = new WebSocket(hostUrl);

				Dastine.socketConnection.onmessage = Dastine.TriggerDastineOutput;
				Dastine.socketConnection.onopen = function(e) {
												
												console.log('Socket opened to: ' + hostUrl);
												if (Dastine.socketConnection.readyState == 1) {
													Dastine.socketConnection.send(JSON.stringify(msg));
													Dastine.DastineKeepAlive();
												}else{
													Dastine.isInstalled=false;
													Dastine.errorMessage = "DASTINE_NOT_INSTALLED";
												}												
											};
				Dastine.socketConnection.onerror=function(error){
					hostUrlTest = "ws://127.0.0.1:51356/dastine";
					var socketTest = new WebSocket(hostUrlTest);
					socketTest.onopen = function(e) {
						console.log('Test Socket opened to: ' + hostUrlTest);
						Dastine.errorMessage = "DASTINE_PORTS_ARE_CLOSED";
						socketTest.close();
					}
					socketTest.onerror = function(error) {
						Dastine.isInstalled=false;
						Dastine.errorMessage = "DASTINE_NOT_INSTALLED";
					};

				}
				Dastine.socketConnection.onclose=function(event){
					Dastine.isInstalled=false;
					Dastine.errorMessage = "DASTINE_NOT_INSTALLED";
				}
				
			}else
			{*/
		if(conn==true){
			if(Dastine.isBusy == true)
			{
				console.log("Dastine is busy");
			}
			else
			{
				Dastine.isBusy = true;
				msg["info"] = Dastine.info;			
				Dastine.socketConnection.send(JSON.stringify(msg));
			}

		}
		else{
			setTimeout( function(){ Dastine.TriggerDastineFunction(msg)},100);
		}
			//}
		}
		catch(e)
		{
			console.log(e);
			Dastine.isInstalled=false;
			Dastine.errorMessage = "DASTINE_NOT_INSTALLED";
		}
	},
	TriggerDastineOutput: function(event)
	{
		Dastine.isBusy = false;
		var event = Dastine.CheckResult("", event.data);
		if(event.data.command) {
				switch (event.data.command) {

					case "CheckUpdate":
					if(Dastine.CheckUpdateCallBack)
						Dastine.CheckUpdateCallBack(event);
					else
						console.log("Dastine method callback not set.");
					break;
					case "InstallUpdate":
					if(Dastine.InstallUpdateCallBack)
						Dastine.InstallUpdateCallBack(event);
					else
						console.log("Dastine method callback not set.");
					break;
					case "SelectCertificateFromWindowsByUI":
						if(Dastine.SelectCertificateFromWindowsByUICallBack)
						{
							Dastine.SelectCertificateFromWindowsByUICallBack(event);
							clearInterval(TokenRemovalTimer);
							RemovalEventRunning=false;
						}
						else
							console.log("Dastine method callback not set.");
						break;
					case "SelectCertificateFromWindowsBySubject":
						if(Dastine.SelectCertificateFromWindowsBySubjectCallBack)
						{
							Dastine.SelectCertificateFromWindowsBySubjectCallBack(event);
							clearInterval(TokenRemovalTimer);
							RemovalEventRunning=false;
						}
						else
							console.log("Dastine method callback not set.");
						break;
					case "SelectCertificateFromTokenByUI":
						if(Dastine.SelectCertificateFromTokenByUICallBack)
						{
							Dastine.SelectCertificateFromTokenByUICallBack(event);
							clearInterval(TokenRemovalTimer);
							RemovalEventRunning=false;
						}
						else
							console.log("Dastine method callback not set.");
						break;
					case "SelectCertificateFromTokenBySubject":
						if(Dastine.SelectCertificateFromTokenBySubjectCallBack)
						{
							Dastine.SelectCertificateFromTokenBySubjectCallBack(event);
							clearInterval(TokenRemovalTimer);
							RemovalEventRunning=false;
						}
						else
							console.log("Dastine method callback not set.");
						break;
					case "SelectCertificateFromFileByUI":
						if(Dastine.SelectCertificateFromFileByUICallBack)
						{
							Dastine.SelectCertificateFromFileByUICallBack(event);
							clearInterval(TokenRemovalTimer);
							RemovalEventRunning=false;
						}
						else
							console.log("Dastine method callback not set.");
						break;
					case "SelectCertificateFromFileBySubject":
						if(Dastine.SelectCertificateFromFileBySubjectCallBack)
						{
							Dastine.SelectCertificateFromFileBySubjectCallBack(event);
							clearInterval(TokenRemovalTimer);
							RemovalEventRunning=false;
						}
						else
							console.log("Dastine method callback not set.");
						break;
					case "FindCertificateFromToken":
						if(Dastine.FindCertificateFromTokenCallBack)
						{
							if(event.data.Result.length>3)
							{
								event.data.Result= jsunicode.decode(event.data.Result, { encoding: "UTF-16LE", byteReader: "base64" });
								Dastine.FindCertificateFromTokenCallBack(event);
							}
							else
							{
								Dastine.FindCertificateFromTokenCallBack(event);
							}

						}
							
						else
							console.log("Dastine method callback not set.");
						break;
					case "Sign":
						if(Dastine.SignCallBack)
							Dastine.SignCallBack(event);
						else
							console.log("Dastine method callback not set.");
						break;
					case "CmsSign":
						if(Dastine.CmsSignCallBack)
						{
							Dastine.CmsSignCallBack(event);
							//Dastine.ListenForTokenRemovel();
							//Dastine.SetTokenRemoveEventCallBack(event);
						}
						else
							console.log("Dastine method callback not set.");
						break;
					case "CmsSignWithAttributes":
						if(Dastine.CmsSignWithAttributesCallBack)
							Dastine.CmsSignWithAttributesCallBack(event);
						else
							console.log("Dastine method callback not set.");
						break;							
					case "CmsDecrypt":
						if(Dastine.CmsDecryptCallBack)
							Dastine.CmsDecryptCallBack(event);
						else
							console.log("Dastine method callback not set.");
						break;
					case "GetSelectedCertificate":
						if(Dastine.GetSelectedCertificateCallBack)
							Dastine.GetSelectedCertificateCallBack(event);
						else
							console.log("Dastine method callback not set.");
						break;
					case "ListTokens":
						if(Dastine.ListTokensCallBack)
							Dastine.ListTokensCallBack(event);
						else
							console.log("Dastine method callback not set.");
						break;
					case "GenerateKeyPairAndCertificateRequest":
						if(Dastine.GenerateKeyPairAndCertificateRequestCallBack)
							Dastine.GenerateKeyPairAndCertificateRequestCallBack(event);
						else
							console.log("Dastine method callback not set.");
						break;
					case "GenerateKeyPairAndCertificateRequestOnSelectedCertificate":
						if(Dastine.GenerateKeyPairAndCertificateRequestOnSelectedCertificateCallBack)
							Dastine.GenerateKeyPairAndCertificateRequestOnSelectedCertificateCallBack(event);
						else
							console.log("Dastine method callback not set.");
						break;	
					case "GenerateCertificateRequestBySelectedCertificate":
						if(Dastine.GenerateCertificateRequestBySelectedCertificateCallBack)
							Dastine.GenerateCertificateRequestBySelectedCertificateCallBack(event);
						else
							console.log("Dastine method callback not set.");
						break;	
					case "ImportIssuedCertificate":
						if(Dastine.ImportIssuedCertificateCallBack)
							Dastine.ImportIssuedCertificateCallBack(event);
						else
							console.log("Dastine method callback not set.");
						break;
					case "ImportIssuedCertificateOnSelectedCertificate":
						if(Dastine.ImportIssuedCertificateOnSelectedCertificateCallBack)
							Dastine.ImportIssuedCertificateOnSelectedCertificateCallBack(event);
						else
							console.log("Dastine method callback not set.");
						break;
					case "Base64ToUnicode":
						if(Dastine.Base64ToUnicodeCallBack)
							Dastine.Base64ToUnicodeCallBack(event);
						else
							console.log("Dastine method callback not set.");
						break;
					case "UnicodeToBase64":
						if(Dastine.UnicodeToBase64CallBack)
							Dastine.UnicodeToBase64CallBack(event);
						else
							console.log("Dastine method callback not set.");
						break;
					case "RemoveSelectedCertificate":
						if(Dastine.RemoveSelectedCertificateCallBack)
							Dastine.RemoveSelectedCertificateCallBack(event);
						else
							console.log("Dastine method callback not set.");
						break;
					case "RemoveGeneratedKeyPair":
						if(Dastine.RemoveGeneratedKeyPairCallBack)
							Dastine.RemoveGeneratedKeyPairCallBack(event);
						else
							console.log("Dastine method callback not set.");
						break;
					case "GetVersion":
						if(Dastine.GetVersionCallBack)
							Dastine.GetVersionCallBack(event);
						else
							console.log("Dastine method callback not set.");
						break;
					case "SetTokenRemoveEvent":
						if(Dastine.SetTokenRemoveEventCallBack)
						{
							if(event.data.Result == "0")
								Dastine.ListenForTokenRemovel();
							Dastine.SetTokenRemoveEventCallBack(event);
						}else
							console.log("Dastine method callback not set.");
						break;
					case "SetTokenInsertEvent":
						if(Dastine.SetTokenInsertEventCallBack)
						{
							if(event.data.Result == "0")
								Dastine.ListenForTokenInsertion();
							Dastine.SetTokenInsertEventCallBack(event);
						}else
							console.log("Dastine method callback not set.");
						break;
					case "Reset":
						if(Dastine.ResetCallBack)
						{
							clearInterval(TokenRemovalTimer);
							RemovalEventRunning=false;
							clearInterval(TokenInsertionTimer);
							InsertionEventRunning=false;
							Dastine.ResetCallBack(event);
						}
						else
							console.log("Dastine method callback not set.");
						break;
					case "SetAdminKey":
						if(Dastine.SetAdminKeyCallBack)
							Dastine.SetAdminKeyCallBack(event);
						else
							console.log("Dastine method callback not set.");
						break;
					case "ChangePIN":
						if(Dastine.ChangePINCallBack)
							Dastine.ChangePINCallBack(event);
						else
							console.log("Dastine method callback not set.");
						break;
					case "SetConfig":
						if(Dastine.SetConfigCallBack)
							Dastine.SetConfigCallBack(event);
						else
							console.log("Dastine method callback not set.");
						break;
					case "ReadSignatureImage":
						if(Dastine.ReadSignatureImageCallBack)
							Dastine.ReadSignatureImageCallBack(event);
						else
							console.log("Dastine method callback not set.");
						break;
					case "ReadFaceImage":
						if(Dastine.ReadFaceImageCallBack)
							Dastine.ReadFaceImageCallBack(event);
						else
							console.log("Dastine method callback not set.");
						break;
					case "ReadFingerprintImage":
						if(Dastine.ReadFingerprintImageCallBack)
							Dastine.ReadFingerprintImageCallBack(event);
						else
							console.log("Dastine method callback not set.");
						break;
					case "ReadPrintedData":
						if(Dastine.ReadPrintedDataCallBack)
							Dastine.ReadPrintedDataCallBack(event);
						else
							console.log("Dastine method callback not set.");
						break;
					case "ReadValidationData":
						if(Dastine.ReadValidationDataCallBack)
							Dastine.ReadValidationDataCallBack(event);
						else
							console.log("Dastine method callback not set.");
						break;
					case "SetPIN":
						if(Dastine.SetPINCallBack)
							Dastine.SetPINCallBack(event);
						else
							console.log("Dastine method callback not set.");
						break;
					case "ImportCertificateFromFileToToken":
						if(Dastine.ImportCertificateFromFileToTokenCallBack)
							Dastine.ImportCertificateFromFileToTokenCallBack(event);
						else
							console.log("Dastine method callback not set.");
						break;
					case "UnblockPIN":
						if(Dastine.UnblockPINCallBack)
							Dastine.UnblockPINCallBack(event);
						else
							console.log("Dastine method callback not set.");
						break;
					case "SetIDinCard":
						if(Dastine.SetIDinCardCallBack)
							Dastine.SetIDinCardCallBack(event);
						else
							console.log("Dastine method callback not set.");
						break;
					case "SetIDinCardIndexForIssuance":
						if(Dastine.SetIDinCardIndexForIssuanceCallBack)
							Dastine.SetIDinCardIndexForIssuanceCallBack(event);
						else
							console.log("Dastine method callback not set.");
						break;
					case "ReadSerialNumber":
						if(Dastine.ReadSerialNumberCallBack)
							Dastine.ReadSerialNumberCallBack(event);
						else
							console.log("Dastine method callback not set.");
						break;
					case "ReadIDinCardsSerialNumber":
						if(Dastine.ReadIDinCardsSerialNumberCallBack)
							Dastine.ReadIDinCardsSerialNumberCallBack(event);
						else
							console.log("Dastine method callback not set.");
						break;
					case "ReadExtendedPrintedData":
						if(Dastine.ReadExtendedPrintedDataCallBack)
							Dastine.ReadExtendedPrintedDataCallBack(event);
						else
							console.log("Dastine method callback not set.");
						break;
					case "ReadCustomField":
						if(Dastine.ReadCustomFieldCallBack)
							Dastine.ReadCustomFieldCallBack(event);
						else
							console.log("Dastine method callback not set.");
						break;
					case "OpenFingerPrintScanner":
						if(Dastine.OpenFingerPrintScannerCallBack)
							Dastine.OpenFingerPrintScannerCallBack(event);
						else
							console.log("Dastine method callback not set.");
						break;
					case "CaptureFingerPrintScanner":
						if(Dastine.CaptureFingerPrintScannerCallBack)
							Dastine.CaptureFingerPrintScannerCallBack(event);
						else
							console.log("Dastine method callback not set.");
						break;
					case "CloseFingerPrintScanner":
						if(Dastine.CloseFingerPrintScannerCallBack)
							Dastine.CloseFingerPrintScannerCallBack(event);
						else
							console.log("Dastine method callback not set.");
						break;
					case "GetFingerPrintScannerSupportedDevices":
						if(Dastine.GetFingerPrintScannerSupportedDevicesCallBack)
							Dastine.GetFingerPrintScannerSupportedDevicesCallBack(event);
						else
							console.log("Dastine method callback not set.");
						break;
					case "GetFingerPrintScannerDLLVersion":
						if(Dastine.GetFingerPrintScannerDLLVersionCallBack)
							Dastine.GetFingerPrintScannerDLLVersionCallBack(event);
						else
							console.log("Dastine method callback not set.");
						break;
					case "GetFingerPrintScannerSupportedImageFormat":
						if(Dastine.GetFingerPrintScannerSupportedImageFormatCallBack)
							Dastine.GetFingerPrintScannerSupportedImageFormatCallBack(event);
						else
							console.log("Dastine method callback not set.");
						break;
					case "TokenRemoveHandler":
						if(Dastine.TokenRemoveHandler)
						{
							if(event.data.Result == "0")
							{
								clearInterval(TokenRemovalTimer);
								RemovalEventRunning=false;
								Dastine.TokenRemoveHandler(event);
							}
						}else
							console.log("Dastine method callback not set.");
						break;
					case "TokenInsertHandler":
						if(Dastine.TokenInsertHandler)
						{
							if(event.data.Result == "0")
							{
								clearInterval(TokenInsertionTimer);
								InsertionEventRunning=false;
								Dastine.TokenInsertHandler(event);
							}
						}else
							console.log("Dastine method callback not set.");
						break;
					default:
						console.log("No such function in Dastine!.");
				} 		
			} //else {
			   // console.log("No valid response for dastine.");
		   // }
		
	},
	DastineKeepAlive: function() {
		var msg = {command: "DastineIsAlive"};
		msg["src"] = "dastine.js";
		msg["info"] = Dastine.info;
		if (Dastine.socketConnection.readyState == 1) {
			Dastine.socketConnection.send(JSON.stringify(msg));
			//console.log('send keep alive')
			setTimeout("Dastine.DastineKeepAlive()", 60000);
		}else{
			Dastine.isInstalled=false;
			Dastine.errorMessage = "DASTINE_NOT_INSTALLED";
		}		
        
    },
	isJSON: function(item) {
		item = typeof item !== "string"
			? JSON.stringify(item)
			: item;

		try {
			item = JSON.parse(item);
		} catch (e) {
			return false;
		}

		if (typeof item === "object" && item !== null) {
			return true;
		}

		return false;
	},
	CheckResult: function(message, result) {
		if(Dastine.isJSON(result)){
			var event = {src: "background.js"};	
			event["data"] = JSON.parse(result);
			return event;
		} else {
			var res = {command: message["command"]};	
			res["Result"] = result;	
			res["tab"] = message["tab"];	
			var event = {src: "background.js"};	
			event["data"] = res;
			return event;
		}
	},
	CheckToken: function() {
		var msg = {command: "TokenRemoveHandler"};
		msg["src"] = "dastine.js";
		Dastine.TriggerDastineFunction(msg);		 
	},
	ListenForTokenRemovel: function()
	{
		TokenRemovalTimer = setInterval(function(){ Dastine.CheckToken() }, TokenRemovalTimerWaitPeriod);	
	},
	CheckToken1: function() {
		var msg = {command: "TokenInsertHandler"};
		msg["src"] = "dastine.js";
		Dastine.TriggerDastineFunction(msg);		 
	},
	ListenForTokenInsertion: function()
	{
		TokenInsertionTimer = setInterval(function(){ Dastine.CheckToken1() }, TokenInsertionTimerWaitPeriod);	
	}

};	
var BrowserDetector = {
    init: function () {
        this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
        this.version = this.searchVersion(navigator.userAgent)
            || this.searchVersion(navigator.appVersion)
            || "an unknown version";
        this.OS = this.searchString(this.dataOS) || "an unknown OS";
    },
    searchString: function (data) {
        for (var i=0;i<data.length;i++)	{
            var dataString = data[i].string;
            var dataProp = data[i].prop;
            this.versionSearchString = data[i].versionSearch || data[i].identity;
            if (dataString) {
                if (dataString.indexOf(data[i].subString) != -1)
                    return data[i].identity;
            }
            else if (dataProp)
                return data[i].identity;
        }
    },
    searchVersion: function (dataString) {
        var index = dataString.indexOf(this.versionSearchString);
        if (index == -1) return;
        return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
    },
    dataBrowser: [
        {
            string: navigator.userAgent,
            subString: "Chrome",
            identity: "Chrome"
        },
        {
            string: navigator.userAgent,
            subString: "OmniWeb",
            versionSearch: "OmniWeb/",
            identity: "OmniWeb"
        },
        {
            string: navigator.vendor,
            subString: "Apple",
            identity: "Safari",
            versionSearch: "Version"
        },
        {
            prop: window.opera,
            identity: "Opera",
            versionSearch: "Version"
        },
        {
            string: navigator.vendor,
            subString: "iCab",
            identity: "iCab"
        },
        {
            string: navigator.vendor,
            subString: "KDE",
            identity: "Konqueror"
        },
        {
            string: navigator.userAgent,
            subString: "Firefox",
            identity: "Firefox"
        },
        {
            string: navigator.vendor,
            subString: "Camino",
            identity: "Camino"
        },
        {		// for newer Netscapes (6+)
            string: navigator.userAgent,
            subString: "Netscape",
            identity: "Netscape"
        },
        {
            string: navigator.userAgent,
            subString: "MSIE",
            identity: "Explorer",
            versionSearch: "MSIE"
        },
        {
            string: navigator.userAgent,
            subString: "Gecko",
            identity: "Mozilla",
            versionSearch: "rv"
        },
        { 		// for older Netscapes (4-)
            string: navigator.userAgent,
            subString: "Mozilla",
            identity: "Netscape",
            versionSearch: "Mozilla"
        }
    ],
    dataOS : [
        {
            string: navigator.platform,
            subString: "Win",
            identity: "Windows"
        },
        {
            string: navigator.platform,
            subString: "Mac",
            identity: "Mac"
        },
        {
            string: navigator.userAgent,
            subString: "iPhone",
            identity: "iPhone/iPod"
        },
        {
            string: navigator.platform,
            subString: "Linux",
            identity: "Linux"
        },
		{
            string: navigator.platform,
            subString: "Android",
            identity: "Android"
        }
    ]
	
};
var DastineInstaller = {
	createConnection : function() {
		try
		{
			if(Dastine.socketConnection == null )
			{
				if(typeof sessionStorage.DastineId == 'undefined')
				{	
					var randomString = generateRandomString();
					sessionStorage.setItem('DastineId', randomString); 
				}
				Dastine.info = sessionStorage.DastineId;
				//msg["info"] = Dastine.info;

				Dastine.socketConnection = new WebSocket(hostUrl);

				Dastine.socketConnection.onmessage = Dastine.TriggerDastineOutput;
				Dastine.socketConnection.onopen = function(e) {
												
												console.log('Socket opened to: ' + hostUrl);
												if (Dastine.socketConnection.readyState == 1) {
													//Dastine.socketConnection.send(JSON.stringify(msg));
													Dastine.DastineKeepAlive();
													conn = true;
												}else{
													conn = false;
													Dastine.isInstalled=false;
													Dastine.errorMessage = "DASTINE_NOT_INSTALLED";
												}												
											};
				Dastine.socketConnection.onerror=function(error){
					hostUrlTest = "ws://127.0.0.1:51356/dastine";
					var socketTest = new WebSocket(hostUrlTest);
					socketTest.onopen = function(e) {
						console.log('Test Socket opened to: ' + hostUrlTest);
						Dastine.errorMessage = "DASTINE_PORTS_ARE_CLOSED";
						socketTest.close();
					}
					socketTest.onerror = function(error) {
						Dastine.isInstalled=false;
						Dastine.errorMessage = "DASTINE_NOT_INSTALLED";
					};

				}
				Dastine.socketConnection.onclose=function(event){
					Dastine.isInstalled=false;
					Dastine.errorMessage = "DASTINE_NOT_INSTALLED";
				}
				
			}else
			{
				//msg["info"] = Dastine.info;			
				//Dastine.socketConnection.send(JSON.stringify(msg));
			}
		}
		catch(e)
		{
			Dastine.isInstalled=false;
			Dastine.errorMessage = "DASTINE_NOT_INSTALLED";
		}
	},
    //Link to plugin source for installing if needed
    init: function() {
		
        var os = BrowserDetector.OS;
		
        var browser = BrowserDetector.browser;
		
		if (location.protocol == 'https:')
		{
			if(os=='Windows')			
				hostUrl = "wss://local.dastine.pki.co.ir:51357/dastine";
			else if(os=='Android')
				hostUrl = "wss://local.dastine.pki.co.ir:51357/dastine";
			else if(os=='Linux')
				hostUrl = "wss://local.dastine.pki.co.ir:51357/dastine";
			else
				hostUrl = "wss://local.dastine.pki.co.ir:51357/dastine";
		}
		else
		{
			if(os=='Windows')			
				hostUrl = "ws://local.dastine.pki.co.ir:51356/dastine";
			else if(os=='Android')
				hostUrl = "ws://local.dastine.pki.co.ir:51356/dastine";
			else if(os=='Linux')
				hostUrl = "ws://local.dastine.pki.co.ir:51356/dastine";
			else
				hostUrl = "ws://local.dastine.pki.co.ir:51356/dastine";
		}
		
        var majorVersion = parseInt(BrowserDetector.version,10);

		
        if(os=="Windows") {
            if(browser == "Firefox" ) {
                if(majorVersion >= 10) {
					Dastine.isInstalled=true;	
                } else {
                    Dastine.isInstalled=false;
                    Dastine.errorMessage = "DASTINE_BROWSER_NOT_SUPPORTED";
                }
            } else if(browser == "Chrome") {
                if(majorVersion < 15) {
                    Dastine.isInstalled=false;
                    Dastine.errorMessage = "DASTINE_BROWSER_NOT_SUPPORTED";
                }else{
					Dastine.isInstalled=true;	
				}	
            } else if(browser == "Explorer") { 
				if(majorVersion >= 10) {
					Dastine.isInstalled=true;	
				} else {
					Dastine.isInstalled=false;
					Dastine.errorMessage = "DASTINE_BROWSER_NOT_SUPPORTED";
				}
			}else if(browser == "Opera"){  
				if(majorVersion < 12)
				{
					Dastine.isInstalled=false;
					Dastine.errorMessage = "DASTINE_BROWSER_NOT_SUPPORTED";
				}else{
					Dastine.isInstalled=true;	
				}
			} else if(browser == "Mozilla"){  
				if(majorVersion < 11)
				{
					Dastine.isInstalled=false;
					Dastine.errorMessage = "DASTINE_BROWSER_NOT_SUPPORTED";
				}else{
					Dastine.isInstalled=true;	
				}
			}
		} /*else {
			Dastine.isInstalled=false;
			Dastine.errorMessage = "DASTINE_OS_NOT_SUPPORTED";
		}*/
		try
		{
           var version = "";
		   Dastine.GetVersion(function(event) {
			   
			   version = event.data.Result;											
				//alert(version);
				//alert(DastineConfig.minVersionAndroid);
				if(os=='Windows')	
				{
				   if (version < DastineConfig.minVersion)
				   {
						Dastine.isInstalled=false;
						Dastine.errorMessage = "DASTINE_VERSION_OUTDATED";
				   }else
						Dastine.isInstalled=true;
				}else{
				
					if (version < DastineConfig.minVersionAndroid)
				    {
						Dastine.isInstalled=false;
						Dastine.errorMessage = "DASTINE_VERSION_OUTDATED";
				    }else
						Dastine.isInstalled=true;
				}
				
				
						
				if (Dastine.isInstalled)
				{
					Dastine.SetConfig(DastineConfig.config+"<HostDownloadLink>"+DastineConfig.hostDownloadLink+"</HostDownloadLink>"+"<HostDownloadLinkAndroid>"+DastineConfig.hostDownloadLinkAndroid+"</HostDownloadLinkAndroid>", function(event) {
						if (typeof DastineInitializedCallback=== "function") 
							DastineInitializedCallback();
						//alert(event.data.Result);						
					});
				}			
			});
        }
		catch(e)
		{
			Dastine.isInstalled=false;
			Dastine.errorMessage = "DASTINE_NOT_INSTALLED";
		}
		//window.setTimeout(this.installFireFoxPlugin, 3000);		
    }
	};
function addDastineEventListener(evt,func){
    if ('addEventListener' in window){
        window.addEventListener(evt,func, false);
    } 
}
addDastineEventListener("message", function(event) {
    if(event.source !== window) return;
    if(event.data.src && (event.data.src === "background.js")) {
        console.log("Page received: ");
        console.log(event.data);
		Dastine.TriggerDastineOutput(event);       
    }
}); 
function generateRandomString() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 15; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

//setTimeout( function(){ DastineInstaller.createConnection()},10000);
DastineInstaller.createConnection();
BrowserDetector.init();
DastineInstaller.init();
