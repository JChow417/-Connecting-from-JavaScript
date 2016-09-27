function inputQuery(query, cb) {
  //client.query("SELECT $1::int AS number", ["1"], (err, result) => {
  client.query("SELECT * FROM famous_people WHERE first_name=$1::text OR last_name=$1::text", [query], (err, result) => {
    console.log("Searching ...");
    //console.log(result.rows[0].number); //output: 1
    if (err) {
      return console.error("error running query", err);
    }
    cb(result.rows);
    client.end();
  });
}

function displayResults (result) {
  //console.log(result);
  console.log(`Found ${result.length} person(s) by the name '${input}'`);
  for(var i = 0; i < result.length; i += 1) {
    var id = result[i].id;
    var firstName = result[i].first_name;
    var lastName = result[i].last_name;
    var dob = new Date(result[i].birthdate.toString());
    var day = dob.getUTCDate();
    var month = dob.getMonth()+1;
    var year = dob.getUTCFullYear();
    console.log(`-${id}: ${firstName} ${lastName}, born '${year}-${month}-${day}'`);
  }
}

const pg = require("pg");
const settings = require("./settings"); // settings.json
var input = process.argv[2];

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  inputQuery(input, displayResults);
});

