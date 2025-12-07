import http from 'http';
import express from 'express';
import { initWsServer } from './config/ws';

export function attachWs(app: express.Express, port: number) {
  const server = http.createServer(app);
  initWsServer(server);
  server.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`HTTP+WS listening on ${port}`);
  });
  return server;
}
