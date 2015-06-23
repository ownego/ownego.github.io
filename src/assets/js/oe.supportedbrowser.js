$(function() {
  $.supportedBrowser.detect({
    "browser": {
      "chrome": {
        "name": "Google Chrome",
        "icon": "./assets/img/browser/chrome.jpg",
        "url": "http:\/\/www.google.com\/chrome\/",
        "version": "4"
      },
      "firefox": {
        "name": "Mozilla Firefox",
        "icon": "./assets/img/browser/firefox.jpg",
        "url": "https:\/\/www.mozilla.org\/en-US\/firefox\/products\/",
        "version": "11"
      },
      "ie": {
        "name": "Internet Explorer",
        "icon": "./assets/img/browser/ie.jpg",
        "url": "http:\/\/windows.microsoft.com\/en-us\/internet-explorer\/download-ie",
        "version": "9"
      },
      "safari": {
        "name": "Safari",
        "icon": "./assets/img/browser/safari.jpg",
        "url": "https:\/\/www.apple.com\/safari\/",
        "version": "3.1"
      },
      "opera": {
        "name": "Opera",
        "icon": "./assets/img/browser/opera.jpg",
        "url": "http:\/\/www.opera.com\/",
        "version": "11.5"
      }
    },
    "msg": {
      "title": "Improve Your Experience",
      "content": "We built our website using latest technology. This makes our website faster and easier to use. Unfortunately, your browser does not support those technology. Download one of these great browsers below and you will be on your way."
    },
    "version_text": "Version",
    "background": "#fff"
  });
});
