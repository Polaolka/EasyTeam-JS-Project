!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},o={},r=e.parcelRequire6a5d;null==r&&((r=function(e){if(e in t)return t[e].exports;if(e in o){var r=o[e];delete o[e];var n={id:e,exports:{}};return t[e]=n,r.call(n.exports,n,n.exports),n.exports}var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,t){o[e]=t},e.parcelRequire6a5d=r),r("3kIvD"),r("FI8sv"),r("1ICs6"),r("bXg0u"),r("bofVl"),r("cJP8v"),r("8UENF"),r("3kIvD"),r("7OfzG");var n=document.querySelector(".search-form"),a="SearchFromFavorites",i=document.querySelector(".input");n.addEventListener("submit",(function(e){localStorage.removeItem(a),e.preventDefault();var t=i.value.trim();document.location.assign("http://localhost:1234"),localStorage.setItem(a,JSON.stringify(t))})),r("kTjSb"),(0,r("7OfzG").getFavIngData)()}();
//# sourceMappingURL=favorites-ingredients.8da24616.js.map