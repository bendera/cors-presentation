const Hapi = require('@hapi/hapi');
const Inert = require('inert');
const path = require('path');

const port = process.env.PORT || 3000;

const init = async () => {
  const server = Hapi.server({
    host: '0.0.0.0',
    port,
    routes: {
      files: {
        relativeTo: path.join(__dirname, 'public'),
      },
    },
  });

  await server.register(Inert);

  server.route({
    method: 'GET',
    path: '/',
    handler: function(request, h) {
      return h.file('index.html');
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
