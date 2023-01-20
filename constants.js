const path = require("path");
const DATA_PATH = `${path.join(__dirname, "/public/data/data.json")}`;
const UPLOAD_DIR = "./public/photos";

module.exports = {
  DATA_PATH,
  UPLOAD_DIR,
};
