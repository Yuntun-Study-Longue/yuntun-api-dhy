const { Main } = require('./router');

exports.register = async function (server, options, next) {
  const prefix = options.prefix ? options.prefix : '';
  
  await server.register([
    { plugin: Main, routes: { prefix: `${prefix}/base` } },
  ])
};

exports.name = 'yuntun-api-seed';
exports.multiple = 'true';