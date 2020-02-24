const Hapi = require('@hapi/hapi');

const port = process.env.PORT || 3000;

const init = async () => {
  const server = Hapi.server({
    host: '0.0.0.0',
    port,
  });



  server.route({
    method: 'GET',
    path: '/userinfo',
    config: {
      cors: {
        origin: 'ignore',
        credentials: 'true',
      }
    },
    handler: function(request, h) {
      const response = h.response({
        username: 'johndoe',
        name: 'john Doe',
        email: 'johndoe@gmailcom'
      });

      if (request.headers.cookie) {
        console.log('Cookie:', request.headers.cookie);
      }

      if (!(request.headers.cookie && request.headers.cookie.indexOf('sessionid') !== -1)) {
        response.header('Set-Cookie', 'sessionid=298zf09hf012fh2');
      }

      // response.header('Access-Control-Allow-Origin', '*');
      // response.header('Access-Control-Allow-Credentials', 'true');
      response.header('X-Lofasz', '123');

      return response;
    },
  });

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
