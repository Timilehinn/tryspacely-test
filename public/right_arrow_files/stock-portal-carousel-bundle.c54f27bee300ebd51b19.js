(window.webpackJsonp=window.webpackJsonp||[]).push([[268],{222:function(e,t,a){"use strict";a.r(t);a(52),a(139);var n=a(0),r=a.n(n),c=a(20),l=a(165),o=a(728);function s(e){e.currentTarget.parentNode.querySelector("video").play()}function i(e){e.currentTarget.parentNode.querySelector("video").pause()}function m({asset:e,position:t,searchUrl:a,hoverText:c,textStyle:l,containerId:o,onClick:m}){function u(t){t.preventDefault(),m(e.content_id,o)}return r.a.createElement("div",{className:"js-asset search-result-cell ftl-thumb-mosaic",style:{marginRight:"8px"},"data-position":t,"data-content-id":e.content_id},(()=>{const t="".concat(a,"&asset_id=").concat(e.content_id),o=c&&"".concat(c," >");return e.video_small_preview_url?((t,a)=>r.a.createElement(n.Fragment,null,r.a.createElement("div",{className:"thumb-frame hover-trigger","data-width":e.thumbnail_width,"data-height":e.thumbnail_height},r.a.createElement("video",{preload:"none",muted:!0,poster:e.thumbnail_url,loop:!0,title:e.title},r.a.createElement("source",{src:e.video_small_preview_url,type:"video/mp4"}))),r.a.createElement("a",{className:"container-absolute to-all strong-dark-jungle-overlay instant-reveal",href:t,onClick:u,onMouseOver:s,onMouseOut:i,onFocus:()=>{},onBlur:()=>{}},r.a.createElement("span",{className:"v-align center-align"},r.a.createElement("span",{className:l},a)))))(t,o):((t,a)=>r.a.createElement(n.Fragment,null,r.a.createElement("div",{className:"thumb-frame hover-trigger","data-width":e.thumbnail_width,"data-height":e.thumbnail_height},r.a.createElement("img",{src:e.thumbnail_url,alt:e.title})),r.a.createElement("a",{className:"container-absolute to-all strong-dark-jungle-overlay instant-reveal",href:t,onClick:u},r.a.createElement("span",{className:"v-align center-align"},r.a.createElement("span",{className:l},a)))))(t,o)})())}m.propTypes=o.a;var u=m;const d="carousel-app";function p({containerId:e,items:t,text:a,styles:c,onAssetClick:l,onRender:o}){return Object(n.useEffect)(()=>{o(e)},[o,e,t]),r.a.createElement(n.Fragment,null,Object.keys(t).length>0&&r.a.createElement("div",{className:c.background},r.a.createElement("div",{className:"padding-top-small padding-bottom-small"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"column on-small-6"},r.a.createElement("span",{className:"js-view-result-count ".concat(c.upperLeftText)},a.upperLeftTransformations?a.upperLeftTransformations.map((e,t)=>{let n=a.upperLeftText.slice(e.start,e.end);return e.isBold&&(n=r.a.createElement("strong",{key:"".concat(n,"-").concat(t.toString())},n)),e.isItalics&&(n=r.a.createElement("em",{key:"".concat(n,"-").concat(t.toString())},n)),e.isStrike&&(n=r.a.createElement("strike",{key:"".concat(n,"-").concat(t.toString())},n)),e.classStyles&&(n=r.a.createElement("span",{key:"".concat(n,"-").concat(t.toString()),className:"".concat(e.classStyles)},n)),n}):a.upperLeftText)),r.a.createElement("div",{className:"column on-small-6"},r.a.createElement("div",{className:"right-align"},r.a.createElement("a",{href:a.upperRightSearchUrl,className:"js-view-result ".concat(c.upperRightText)},a.upperRightText))))),r.a.createElement("div",{className:"padding-bottom-large".concat(e===d?" padding-left-xlarge":"")},r.a.createElement("div",{className:"js-mosaic overflow-hidden"},Object.keys(t).map((n,o)=>r.a.createElement(u,{key:t[n].content_id,asset:t[n],hoverText:a.hoverText,textStyle:c.hoverText,position:o,searchUrl:a.hoverSearchUrl,containerId:e,onClick:l}))),r.a.createElement("div",{className:"padding-top-medium padding-right-large center-align"},r.a.createElement("span",{className:c.bottomText},a.bottomText)))))}p.propTypes=o.b;var g=Object(c.c)(null,function(e){return{onAssetClick:(t,a)=>e(Object(l.e)({contentId:t,containerId:a})),onRender:t=>e(Object(l.d)({containerId:t}))}})(p),h=a(737);a.d(t,"Carousel",function(){return g}),a.d(t,"CAROUSEL_RENDERED",function(){return l.a}),a.d(t,"carouselRendered",function(){return l.d}),a.d(t,"RENDER_CAROUSEL",function(){return l.c}),a.d(t,"renderCarousel",function(){return l.f}),a.d(t,"OPEN_ASSET",function(){return l.b}),a.d(t,"openAsset",function(){return l.e}),a.d(t,"reducer",function(){return h.a}),a.d(t,"carouselPropTypes",function(){return o.b}),a.d(t,"assetPropTypes",function(){return o.a})}}]);