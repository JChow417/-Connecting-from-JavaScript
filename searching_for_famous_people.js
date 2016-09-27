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
var input = process.argv[2];

knex.select().from('famous_people')
  .where('first_name', input)
  .orWhere('last_name', input)
    .asCallback((err, rows) => {
      if(err) return console.log(err);
      displayResults(rows);

    });
