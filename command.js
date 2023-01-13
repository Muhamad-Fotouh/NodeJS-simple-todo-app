const fs = require("fs");
const FILE_PATH = process.env.FILE_PATH || "./db.json";

// node main.js add title=t body=b
// node main.js edit id=... title=... body=...
// node main.js list all / checked / unchecked
// node main.js remove id
// node main.js check id
// node main.js uncheck id

//parsing through the Data base
function parseDB() {
  const toDos = fs.readFileSync(FILE_PATH, "utf-8");
  const result = JSON.parse(toDos);
  return result;
}

// list cases
function listAll() {
  console.log(parseDB());
}
function listChecked() {
  const parsedToDos = parseDB();
  //fetching the todo obj with the specified list type
  console.log(parsedToDos.filter((obj) => obj.checked == true));
}
function listUnchecked() {
  const parsedToDos = parseDB();
  //fetching the todo obj with the specified list type
  console.log(parsedToDos.filter((obj) => obj.checked == false));
}

// =========================================== Main Operations =====================================================
function add(data) {
  const parsedToDos = parseDB();

  //handling the case of first id
  let idValue;
  if (parsedToDos.length == 0) {
    idValue = 1;
  } else {
    idValue = parsedToDos[parsedToDos.length - 1].id + 1;
  }

  //
  const toDo = {
    id: idValue,
    title: data.title,
    body: data.body,
    // ...data,
    checked: false,
  };
  parsedToDos.push(toDo);
  fs.writeFileSync(FILE_PATH, JSON.stringify(parsedToDos));
}

function edit(data) {
  const parsedToDos = parseDB();

  //fetching the todo obj with the specified id
  const toDo = parsedToDos.filter((obj) => obj.id == data.id);

  //
  toDo[0].title = data.title;
  toDo[0].body = data.body;

  //overriding the existing todo
  parsedToDos[data.id - 1] = toDo[0];

  //
  fs.writeFileSync(FILE_PATH, JSON.stringify(parsedToDos));
}

function list() {
  //let type = Object.keys(data)[0]; // another way
  const [, , , type] = process.argv;

  switch (type) {
    case "all":
      listAll();
      break;
    case "checked":
      listChecked();
      break;
    case "unchecked":
      listUnchecked();
      break;
    default:
      console.log("There's No Such Type");
      break;
  }
}

function remove() {
  let parsedToDos = parseDB();
  const [, , , toDoId] = process.argv;

  //fetching all the todo objs except the one to remove
  const restToDos = parsedToDos.filter((obj) => obj.id != toDoId);

  //overriding the existing todos
  parsedToDos = restToDos;

  //
  fs.writeFileSync(FILE_PATH, JSON.stringify(parsedToDos));
}

function check() {
  const parsedToDos = parseDB();
  const [, , , toDoId] = process.argv;

  //fetching the todo obj with the specified id
  const toDo = parsedToDos.filter((obj) => obj.id == toDoId);

  //
  toDo[0].checked = true;

  //overriding the existing todo
  parsedToDos[toDoId - 1] = toDo[0];

  //
  fs.writeFileSync(FILE_PATH, JSON.stringify(parsedToDos));
}

function uncheck() {
  const parsedToDos = parseDB();
  const [, , , toDoId] = process.argv;

  //fetching the todo obj with the specified id
  const toDo = parsedToDos.filter((obj) => obj.id == toDoId);

  //
  toDo[0].checked = false;

  //overriding the existing todo
  parsedToDos[toDoId - 1] = toDo[0];

  //
  fs.writeFileSync(FILE_PATH, JSON.stringify(parsedToDos));
}

module.exports = {
  add,
  edit,
  list,
  remove,
  check,
  uncheck,
};
