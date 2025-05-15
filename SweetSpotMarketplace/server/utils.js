const path = require('path');

function createPathHelper(importMetaUrl) {
  return {
    resolve: (...paths) => path.resolve(__dirname, ...paths)
  };
}

module.exports = {
  createPathHelper
}; 