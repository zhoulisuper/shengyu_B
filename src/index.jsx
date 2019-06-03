import loader from "src/polyfill";

loader.then(() => {
  import(/* webpackChunkName: "mainPoly" */ "./main");
});
