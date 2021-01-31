import mongodb from 'mongodb';
const { MongoClient } = mongodb;


const url = 'mongodb://localhost:27017';
const dbName = 'NFL_Teams';

async function main() {
    const client = new MongoClient(url);
    await client.connect();



    const admin = client.db(dbName).admin();

    console.log(await admin.serverStatus());
    console.log(await admin.listDatabases());
}

main();






