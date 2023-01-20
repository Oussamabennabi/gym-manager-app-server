const { UPLOAD_DIR, DATA_PATH } = require("./constants");
const path = require("path");
const fs = require("fs");

const { promisify } = require("util");
const unlinkAsync = promisify(fs.unlink);

async function deleteOldPhoto(originalname) {
  const { json } = readFromFile();

  const member = json.find(
    (member) => member.id === originalname.split(".")[0]
  );
  if (!member) {
    return;
  }

  const oldFileName = member.photo;

  const deleteFileError = await deleteFile(oldFileName);
  if (deleteFileError) {
    console.log(deleteFileError);
  }
}

async function deleteFile(fileName) {
  let error = null;
  if (fileName === "avatar.svg") return;
  const relativePath = path.join(__dirname, UPLOAD_DIR, fileName);

  if (fs.existsSync(relativePath)) {
    await unlinkAsync(relativePath)
      .then((_) => console.log("file was deleted with", relativePath))
      .catch((err) => (error = err));
  }
  return error;
}

function readFromFile() {
  checkForFileExisit();
  
  const json = fs.readFileSync(DATA_PATH, {
    encoding:"utf-8"
  });
  if (!json) return { json: [] };
  return { json: JSON.parse(json) };
}

function writeToFile(data) {
  checkForFileExisit()
  const json = JSON.stringify(data);
  fs.writeFileSync(DATA_PATH, json, {
    encoding:"utf-8"
  });
}
function checkForFileExisit() {
  if (!fs.existsSync(DATA_PATH)) {
    console.log("creating file...")
    fs.appendFile(DATA_PATH,'[]', (err) => {
      if(err) console.log(err)
    });
  }
}

module.exports = {
  deleteOldPhoto,
  deleteFile,
  readFromFile,
  writeToFile,
};
