const settings = require("./settings"); // settings.json

var knex = require('knex')({
  client: 'pg',
  connection: {
    host     : settings.hostname,
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    port     : settings.port,
    ssl      : settings.ssl
  }//,
  //searchPath: 'knex,public'
});
var firstName = process.argv[2];
var lastName = process.argv[3];
var dob = process.argv[4];

var inputs = [{'first_name': firstName,
'last_name': lastName,
'birthdate': dob
}];

knex('famous_people').insert(inputs).asCallback((err, rows) => {
  if(err) return console.log(err);
  console.log("Inserted succesfully");
});

