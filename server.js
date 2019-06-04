require('dotenv')
const Hapi = require('hapi');
const laabr = require('laabr');
const Inert = require('inert');
const Vision = require('vision');
const Good = require('good');
const HapiSwagger = require('hapi-swagger');
const Susie = require('susie');
const Nes = require('nes');

const Path = require('path');
const { Main } = require('./router');
const { SERVER_PORT, SERVER_HOST } = process.env;

const start = async () => {
  const server = Hapi.server({
      port: SERVER_PORT || 3000, 
      host: SERVER_HOST || 'localhost',
      routes: {cors: true},
  });

  const options = {
    pathPrefixSize: 1,
    basePath: `/`,
    jsonPath: `${process.env.npm_package_prefix}_${process.env.npm_package_author_name}/swagger.json`,
    swaggerUIPath: `${process.env.npm_package_prefix}_${process.env.npm_package_author_name}/swaggerui/`,
    documentationPath: `${process.env.npm_package_prefix}_${process.env.npm_package_author_name}/documentation`,
    info: {
      'title': `${process.env.npm_package_name} API Documentation`,
      'version': process.env.npm_package_version,
    }
  };

  let server_setting = [
    { plugin: Inert },
    { plugin: Vision },
    { plugin: Susie },
    { plugin: Nes },
    { plugin: laabr.plugin, options: {indent: 0 } },
    { plugin: HapiSwagger, options }
  ];

  await server.register(server_setting);

  server.path(Path.join(__dirname, './public'));

  const routes = [
    ...Main.routers,
  ]

  server.route(routes);
  await server.start();
  console.log(`Listening on //${SERVER_HOST}:${SERVER_PORT}`)
}
start();



