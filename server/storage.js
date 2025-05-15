const { createPathHelper } = require('./utils');
const { users } = require('../shared/schema');

const sampleProducts = [
  {
    id: "1",
    name: "Chocolate Fudge Cake",
    description: "Rich, moist chocolate cake layered with decadent fudge frosting",
    price: 35.99,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
    rating: 4.8,
    baker: {
      name: "Sarah Johnson",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg"
    },
    tags: ["Best Seller", "Chocolate"]
  },
  {
    id: "2",
    name: "Vanilla Bean Cupcakes",
    description: "Light and fluffy vanilla cupcakes with real vanilla bean buttercream",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d",
    rating: 4.5,
    baker: {
      name: "Mike Wilson",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg"
    },
    tags: ["Cupcakes", "Vanilla"]
  },
  {
    id: "3",
    name: "Vegan Carrot Cake",
    description: "Moist carrot cake made with plant-based ingredients and cashew cream frosting",
    price: 42.99,
    image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729",
    rating: 4.7,
    baker: {
      name: "Emma Davis",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg"
    },
    tags: ["Vegan", "Healthy"]
  }
];

/**
 * Storage interface for user and product management
 * @interface
 */
class IStorage {
  /**
   * Get a user by their ID
   * @param {number} id - The user ID
   * @returns {Promise<User|undefined>}
   */
  async getUser(id) {}

  /**
   * Get a user by their username
   * @param {string} username - The username to search for
   * @returns {Promise<User|undefined>}
   */
  async getUserByUsername(username) {}

  /**
   * Create a new user
   * @param {User} user - The user data to insert
   * @returns {Promise<User>}
   */
  async createUser(user) {}

  /**
   * Get all products
   * @returns {Promise<Array>}
   */
  async getProducts() {}

  /**
   * Get a product by ID
   * @param {string} id - The product ID
   * @returns {Promise<Product|undefined>}
   */
  async getProduct(id) {}
}

/**
 * In-memory implementation of the storage interface
 */
class MemStorage {
  constructor() {
    this.users = new Map();
    this.products = new Map(sampleProducts.map(product => [product.id, product]));
    this.currentId = 1;
  }

  /**
   * Get a user by their ID
   * @param {number} id - The user ID
   * @returns {Promise<User|undefined>}
   */
  async getUser(id) {
    return this.users.get(id);
  }

  /**
   * Get a user by their username
   * @param {string} username - The username to search for
   * @returns {Promise<User|undefined>}
   */
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  /**
   * Create a new user
   * @param {User} insertUser - The user data to insert
   * @returns {Promise<User>}
   */
  async createUser(insertUser) {
    const id = this.currentId++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  /**
   * Get all products
   * @returns {Promise<Array>}
   */
  async getProducts() {
    return Array.from(this.products.values());
  }

  /**
   * Get a product by ID
   * @param {string} id - The product ID
   * @returns {Promise<Product|undefined>}
   */
  async getProduct(id) {
    return this.products.get(id);
  }
}

const storage = new MemStorage();

module.exports = {
  storage,
  IStorage,
  MemStorage
}; 