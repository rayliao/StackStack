import * as window from "./window";
import HTMLElement from "./HTMLElement";
import Image from "./Image";
import Audio from "./Audio";
import Canvas from "./Canvas";
// import "./EventIniter";
console.log(window);
class TouchEvent {
  target = window.canvas;
  currentTarget = window.canvas;
  touches = [];
  targetTouches = [];
  changedTouches = [];
  // preventDefault = noop
  // stopPropagation = noop
  constructor(type) {
    this.type = type;
  }
}

function touchEventHandlerFactory(type) {
  return (event) => {
    const touchEvent = new TouchEvent(type);

    touchEvent.touches = event.touches;
    touchEvent.targetTouches = Array.prototype.slice.call(event.touches);
    touchEvent.changedTouches = event.changedTouches;
    touchEvent.timeStamp = event.timeStamp;
    document.dispatchEvent(touchEvent);
  };
}

wx.onTouchStart(touchEventHandlerFactory("touchstart"));
wx.onTouchMove(touchEventHandlerFactory("touchmove"));
wx.onTouchEnd(touchEventHandlerFactory("touchend"));
wx.onTouchCancel(touchEventHandlerFactory("touchcancel"));

const events = {};

const document = {
  readyState: "complete",
  visibilityState: "visible",
  documentElement: window,
  hidden: false,
  style: {},
  location: window.location,
  ontouchstart: null,
  ontouchmove: null,
  ontouchend: null,

  head: new HTMLElement("head"),
  body: new HTMLElement("body"),

  createElement(tagName) {
    if (tagName === "canvas") {
      return new Canvas();
    } else if (tagName === "audio") {
      return new Audio();
    } else if (tagName === "img") {
      return new Image();
    }

    return new HTMLElement(tagName);
  },

  getElementById(id) {
    if (id === window.canvas.id) {
      return window.canvas;
    }
    return null;
  },

  getElementsByTagName(tagName) {
    if (tagName === "head") {
      return [document.head];
    } else if (tagName === "body") {
      return [document.body];
    } else if (tagName === "canvas") {
      return [window.canvas];
    }
    return [];
  },

  getElementsByName(tagName) {
    if (tagName === "head") {
      return [document.head];
    } else if (tagName === "body") {
      return [document.body];
    } else if (tagName === "canvas") {
      return [window.canvas];
    }
    return [];
  },

  querySelector(query) {
    if (query === "head") {
      return document.head;
    } else if (query === "body") {
      return document.body;
    } else if (query === "canvas") {
      return window.canvas;
    } else if (query === `#${window.canvas.id}`) {
      return window.canvas;
    }
    return null;
  },

  querySelectorAll(query) {
    if (query === "head") {
      return [document.head];
    } else if (query === "body") {
      return [document.body];
    } else if (query === "canvas") {
      return [window.canvas];
    }
    return [];
  },

  addEventListener(type, listener) {
    if (!events[type]) {
      events[type] = [];
    }
    events[type].push(listener);
  },

  removeEventListener(type, listener) {
    const listeners = events[type];

    if (listeners && listeners.length > 0) {
      for (let i = listeners.length; i--; i > 0) {
        if (listeners[i] === listener) {
          listeners.splice(i, 1);
          break;
        }
      }
    }
  },

  dispatchEvent(event) {
    const listeners = events[event.type];

    if (listeners) {
      for (let i = 0; i < listeners.length; i++) {
        listeners[i](event);
      }
    }
  },
};

export default document;
