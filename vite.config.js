const path = require('path');

module.exports = async () => {
  const { defineConfig } = await import('vite');
  const react = await import('@vitejs/plugin-react');
  const runtimeErrorOverlay = await import('@replit/vite-plugin-runtime-error-modal');
  const cartographer = process.env.NODE_ENV !== "production" && process.env.REPL_ID !== undefined
    ? await import('@replit/vite-plugin-cartographer')
    : null;

  return defineConfig({
    plugins: [
      react.default(),
      runtimeErrorOverlay.default(),
      ...(cartographer ? [cartographer.cartographer()] : []),
    ],
    server: {
      fs: {
        strict: false,
        allow: ['..']
      },
      middlewareMode: true,
      watch: {
        usePolling: true,
        interval: 100
      }
    }
  });
}; 