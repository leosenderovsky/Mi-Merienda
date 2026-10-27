import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { createServer } from 'vite';

const vite = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'silent',
});

try {
  const mod = await vite.ssrLoadModule('/src/App.tsx');
  const html = renderToString(createElement(mod.default));
  const anchors = html.match(/<a\b/g)?.length ?? 0;
  const images = html.match(/<img\b/g)?.length ?? 0;
  console.log(`chars=${html.length} a=${anchors} img=${images}`);
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  const stack = error instanceof Error && error.stack ? error.stack : '';
  console.error(message);
  console.error(stack.split('\n').slice(0, 12).join('\n'));
  process.exitCode = 1;
} finally {
  await vite.close();
}
