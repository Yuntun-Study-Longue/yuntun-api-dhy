const { Main } = require('./router');

exports.register = async function (server, options, next) {
  const prefix = options.prefix ? options.prefix : '';
  // const api_version = options.api_version ? options.api_version : process.env.npm_package_version; // need deep think, whether add api version control or not
  
  await server.register([
    { plugin: Main, routes: { prefix: `${prefix}/base` } },
  ])
};

exports.name = 'yuntun-api-seed';
exports.multiple = 'true';