import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { trimTrailingSlash } from 'hono/trailing-slash';

const app = new Hono();

app.use(
  '/*',
  cors({
    origin: (o) => o,
    credentials: true,
    allowHeaders: [
      'X-Custom-Header',
      'Upgrade-Insecure-Requests',
      'Content-Type',
      'Authorization'
    ],
    exposeHeaders: ['Set-Cookie']
  })
);

app.use('/*', trimTrailingSlash());

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

serve(
  {
    fetch: app.fetch,
    port: 3000
  },
  (info) => {
    console.log(`Server is running on http://${info.address}:${info.port}`);
  }
);
