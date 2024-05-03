module.exports = {
    apps: [
      {
        name: "api-gateway",
        script: "./dist/main.js",
        instances: 1,
        autoRestart: true,
      },
    ],
  };