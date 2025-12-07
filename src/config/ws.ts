import { WebSocketServer } from 'ws';
import { mockEventEmitter } from '../mock/eventEmitter';

export function initWsServer(server: import('http').Server) {
  const wss = new WebSocketServer({ server });

  wss.on('connection', (ws) => {
    ws.send(JSON.stringify({ event: 'connected', data: { ts: Date.now() } }));

    const pingInterval = setInterval(() => {
      ws.send(JSON.stringify({ event: 'ping', data: { ts: Date.now() } }));
    }, 20000);

    ws.on('close', () => clearInterval(pingInterval));
  });

  // Relay mock events to clients
  const forward = (event: string, data: unknown) => {
    const payload = JSON.stringify({ event, data });
    wss.clients.forEach((client) => {
      if (client.readyState === 1) {
        client.send(payload);
      }
    });
  };

  mockEventEmitter.on('transaction.created', (data) => forward('transaction.created', data));
  mockEventEmitter.on('account.balance.updated', (data) => forward('account.balance.updated', data));
  mockEventEmitter.on('stock.tick', (data) => forward('stock.tick', data));
  mockEventEmitter.on('intraday.order.update', (data) => forward('intraday.order.update', data));
  mockEventEmitter.on('fraud.alert', (data) => forward('fraud.alert', data));

  return wss;
}
