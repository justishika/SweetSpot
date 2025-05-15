const express = require('express');
const fs = require('fs');
const path = require('path');
const { createServer: createViteServer, createLogger } = require('vite');
const { nanoid } = require('nanoid');

const viteLogger = createLogger();

/**
 * Log a message with a timestamp and source
 * @param {string} message - The message to log
 * @param {string} [source="express"] - The source of the log message
 */
function log(message, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

/**
 * Set up Vite middleware and development server
 * @param {import('express').Express} app - Express application instance
 * @param {import('http').Server} server - HTTP server instance
 */
async function setupVite(app, server) {
  const projectRoot = path.resolve(__dirname, '..');
  const clientRoot = path.resolve(projectRoot, 'client');

  const serverOptions = {
    root: clientRoot,
    server: {
      middlewareMode: true,
      hmr: { server },
      fs: {
        strict: false,
        allow: ['..']
      }
    },
    appType: 'custom'
  };

  const vite = await createViteServer(serverOptions);

  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(clientRoot, "index.html");
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(template);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}

/**
 * Serve static files from the build directory
 * @param {import('express').Express} app - Express application instance
 */
function serveStatic(app) {
  const distPath = path.resolve(__dirname, "..", "dist", "public");

  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  app.use(express.static(distPath));

  // fall through to index.html if the file doesn't exist
  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}

module.exports = {
  log,
  setupVite,
  serveStatic
}; 