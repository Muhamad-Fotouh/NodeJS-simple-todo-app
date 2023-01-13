const command = require("./command");
const fs = require("fs");
const FILE_PATH = process.env.FILE_PATH || "./db.json";

// node main.js add title=t body=b
// node main.js edit id=... title=... body=...
// node main.js list all / checked / unchecked
// node main.js remove id
// node main.js check id
// node main.js uncheck id

//check if the file exist if not write []
(function () {
  if (fs.readFileSync(FILE_PATH, "utf-8") === "") {
    fs.writeFileSync(FILE_PATH, "[]");
  }
})();

//parsing the command line args
function parseArgs(data) {
  return data.reduce((cum, el) => {
    [key, value] = el.split("=");
    cum[key] = value;
    return cum;
  }, {});
}

//main entry point
function main(cmdArgs) {
  const [, , operation, ...data] = cmdArgs;
  const parsedData = parseArgs(data);

  // console.log(parsedData);

  switch (operation) {
    case "add":
      command.add(parsedData);
      break;
    case "edit":
      command.edit(parsedData);
      break;
    case "remove":
      command.remove(parsedData);
      break;
    case "list":
      command.list(parsedData);
      break;
    case "check":
      command.check(parsedData);
      break;
    case "uncheck":
      command.uncheck(parsedData);
      break;
    default:
      console.log("There's No Such Operation");
      break;
  }
}

main(process.argv);
