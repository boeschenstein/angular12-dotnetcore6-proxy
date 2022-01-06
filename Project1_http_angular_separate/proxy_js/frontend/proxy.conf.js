const { env } = require("process");

const target = "http://localhost:5240"; // backend: webapi port

const PROXY_CONFIG = [
  {
    context: ["/weatherforecast"],
    target: target,
    secure: false,
    logLevel: "debug",
  },
];

module.exports = PROXY_CONFIG;
