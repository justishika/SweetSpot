/**
 * @typedef {Object} Product
 * @property {number} id
 * @property {string} name
 * @property {string} description
 * @property {number} price
 * @property {string} image
 * @property {string[]} [galleryImages]
 * @property {number} [category]
 * @property {string} [categoryName]
 * @property {number} rating
 * @property {number} [reviewCount]
 * @property {string[]} [tags]
 * @property {{name: string, avatar: string}} [baker]
 * @property {string[]} [occasions]
 * @property {string[]} [flavors]
 * @property {number} sales
 */

/**
 * @typedef {Product & {
 *   quantity: number,
 *   options?: Record<string, string>
 * }} CartItem
 */

/**
 * @typedef {Object} Category
 * @property {number} id
 * @property {string} name
 * @property {string} image
 * @property {number} [count]
 */

/**
 * @typedef {Object} Testimonial
 * @property {number} id
 * @property {string} name
 * @property {string} initials
 * @property {string} comment
 * @property {number} rating
 * @property {string} avatarBg
 */

// Export empty object to make this a module
export {}; 