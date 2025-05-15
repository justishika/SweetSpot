/**
 * @typedef {import('express').Express} Express
 * @typedef {import('http').Server} Server
 */

const { createServer } = require("http");
const { storage } = require("./storage");

/**
 * Register application routes
 * @param {Express} app - Express application instance
 * @returns {Promise<Server>} HTTP server instance
 */
async function registerRoutes(app) {
  // Products endpoints
  app.get("/api/products", async (req, res) => {
    try {
      const products = await storage.getProducts();
      res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const product = await storage.getProduct(req.params.id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ error: "Failed to fetch product" });
    }
  });

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  const httpServer = createServer(app);

  return httpServer;
}

module.exports = {
  registerRoutes
}; 