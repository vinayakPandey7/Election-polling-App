const env =  {
    //uploadFilePath : "/var/www/html/unsdgIndia/deewar/containerdata/" ,
    //logFilePath: '/home/itm/Desktop/', //local development
    //logFilePath: '/var/importLog', //production
    dbConfig: {
        env: 'development',
        db: 'mongodb://localhost:27017/unsdg', //local
        //db: 'mongodb://172.17.0.1:27017/unsdg', //production
        port: 27017,
    },
    privateKey:'JhbGciOiJIUzI1N0eXAiOiJKV1QiLC'
}
module.exports = env;