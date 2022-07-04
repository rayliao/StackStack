import Canvas from "./Canvas";

import document from "./document";
import navigator from "./navigator";
import XMLHttpRequest from "./XMLHttpRequest";
import WebSocket from "./WebSocket";
import Image from "./Image";
import Audio from "./Audio";
import FileReader from "./FileReader";
import HTMLElement from "./HTMLElement";
import localStorage from "./localStorage";
import location from "./location";
export * from "./WindowProperties";
export * from "./constructor";

// 暴露全局的 canvas
const canvas = new Canvas();

export {
  canvas,
  document,
  navigator,
  XMLHttpRequest,
  WebSocket,
  Image,
  Audio,
  FileReader,
  HTMLElement,
  localStorage,
  location,
  // setTimeout,
  // setInterval,
  // clearTimeout,
  // clearInterval,
  // requestAnimationFrame,
  // cancelAnimationFrame,
};

// export { canvas };
// export { setTimeout };
// export { setInterval };
// export { clearTimeout };
// export { clearInterval };
// export { requestAnimationFrame };
// export { cancelAnimationFrame };
