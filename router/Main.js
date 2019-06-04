const Joi = require('joi');

const Global = {};
let Main = Object.create(Global);

Main = Object.assign( Main, {
    MODULE_NAME: 'main',
    RD_EXPIRES: 7200,
    routers: [
      // GET 获取接口请求参数
      {
        method: 'GET',
        path: `/base/get_params/{param_name}`,
        config: {
          handler: async (request, h)=> {
            const { query, params, payload } = request;
            console.log( query, params, payload );
            return h.response('ok')
          },
          description: '获取接口请求参数',
          tags: ['api'],
          notes: '使用方式，一些特殊备注',
          validate: {
            query: Joi.object().keys({
              post_key: Joi.string().required(),
            }),
            params: Joi.object().keys({
              param_name: Joi.string().required(),
            }),
          }
        }
      },
      // POST 获取接口请求参数
      {
        method: 'POST',
        path: `/base/post_params/{param_name}`,
        config: {
          handler: async (request, h)=> {
            const { query, params, payload } = request;
            console.log( query, params, payload );
            return h.response('ok')
          },
          description: 'POST获取接口请求参数',
          tags: ['api'],
          notes: '使用方式，一些特殊备注',
          validate: {
            payload: Joi.object().keys({
              post_key: Joi.string().required(),
            }),
            params: Joi.object().keys({
              param_name: Joi.string().required(),
            }),
          }
        }
      }
    ]
});

module.exports = {
  Main,
}