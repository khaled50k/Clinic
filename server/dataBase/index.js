const pg = require("pg");
//'postgres://postgres:123456@localhost:5432/postgres'
module.exports = class Connection {
  static con() {
    const Pool = pg.Pool;
    const connectionString =
      "postgres://postgres:123456@localhost:5432/postgres"; //To link to database
    const dbConnection = new Pool({
      connectionString: connectionString,
      ssl: false,
    });
    // dbConnection.query(
    //   "create table if not exists Patients( id serial not null primary key,name varchar(250) not null,phoneNumber bpchar(10) not null,gender varchar(50) not null  ,dateOfBirth  date not null,currentMedication varchar(250),caseStudy varchar(250),notes varchar(500),deleted bool NULL DEFAULT false);"
    // );
    // dbConnection.query(
    //   "CREATE EXTENSION if not exists btree_gist; create table if not exists Appoitments (id serial not null primary key,pID int not null REFERENCES Patients(id),createdat date not null,appStart timestamp not null,appEnd timestamp not null,cancelled   bool  not null,check(appStart<appEnd),EXCLUDE USING gist (pID WITH =,tsrange(appStart ,appEnd) WITH &&) WHERE (NOT cancelled));"
    // );
    // dbConnection.query(
    //   "create table if not exists Operations (id serial not null primary key,name varchar(250) not null);"
    // );
    // dbConnection.query(
    //   "create table if not exists Invoices (id serial not null primary key UNIQUE ,pID int not null REFERENCES Patients(id),price int not null,discount int,total int not null,check(discount>0 and price > discount),opID int not null REFERENCES operations(id));"
    // );

    // dbConnection.query('set time zone "Asia/Jerusalem";');
    return dbConnection;
  }
};
