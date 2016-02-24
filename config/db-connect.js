module.exports = function() {
  var dbConfig = {
    username: process.env.DB_USERNAME || 'hobbyhub',
    password: process.env.DB_PASSWORD || 'spiderman',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 27017,
    database: process.env.DB_NAME || 'hobbyhub-dev'
  };

  var url = 'mongodb://'+dbConfig.username+':'+dbConfig.password+'@'+dbConfig.host+':'+dbConfig.port+'/'+dbConfig.database;
  return url;
}()
