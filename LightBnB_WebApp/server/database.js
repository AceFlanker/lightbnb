const properties = require('./json/properties.json');
const users = require('./json/users.json');

const { Pool } = require('pg');
const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

/// Users

// /**
//  * Get a single user from the database given their email.
//  * @param {String} email The email of the user.
//  * @return {Promise<{}>} A promise to the user.
//  */
// const getUserWithEmail = function(email) {
//   let user;
//   for (const userId in users) {
//     user = users[userId];
//     if (user.email.toLowerCase() === email.toLowerCase()) {
//       break;
//     } else {
//       user = null;
//     }
//   }
//   return Promise.resolve(user);
// }
// exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  return pool
    .query(`
      SELECT *
      FROM users
      WHERE email = $1
    `, [email])
    .then(user => user.rows[0])
    .catch(() => null);
}
exports.getUserWithEmail = getUserWithEmail;


// /**
//  * Get a single user from the database given their id.
//  * @param {string} id The id of the user.
//  * @return {Promise<{}>} A promise to the user.
//  */
// const getUserWithId = function(id) {
//   return Promise.resolve(users[id]);
// }
// exports.getUserWithId = getUserWithId;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return pool
    .query(`
      SELECT *
      FROM users
      WHERE id = $1
    `, [id])
    .then(user => user.rows[0])
    .catch(() => null);
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
// const addUser =  function(user) {
//   const userId = Object.keys(users).length + 1;
//   user.id = userId;
//   users[userId] = user;
//   return Promise.resolve(user);
// }
// exports.addUser = addUser;

const addUser =  function(user) {
  return pool
    .query(`
      INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3)
      RETURNING *
    `, [user.name, user.email, user.password])
    .then(user => user.rows[0])
    .catch(() => null);
}
exports.addUser = addUser;


/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
// const getAllReservations = function(guest_id, limit = 10) {
//   return getAllProperties(null, 2);
// }
// exports.getAllReservations = getAllReservations;

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  return pool
    .query(`
      SELECT properties.*, reservations.*, AVG(rating) AS average_rating
        FROM reservations
        JOIN properties ON properties.id = reservations.property_id
        JOIN property_reviews ON property_reviews.property_id = properties.id
        WHERE reservations.guest_id = $1
        GROUP BY properties.id, reservations.id
        LIMIT $2;
    `, [guest_id, limit])
    .then(result => result.rows)
    .catch(err => err.message);
}
exports.getAllReservations = getAllReservations;



/// Properties

// /**
//  * Get all properties.
//  * @param {{}} options An object containing query options.
//  * @param {*} limit The number of results to return.
//  * @return {Promise<[{}]>}  A promise to the properties.
//  */
// const getAllProperties = function(options, limit = 10) {
//   const limitedProperties = {};
//   for (let i = 1; i <= limit; i++) {
//     limitedProperties[i] = properties[i];
//   }
//   return Promise.resolve(limitedProperties);
// }
// exports.getAllProperties = getAllProperties;

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
// const getAllProperties = function(options, limit = 10) {
//   return pool
//     .query(`
//       SELECT *
//         FROM properties
//         LIMIT $1
//     `, [limit])
//     .then(result => result.rows)
//     .catch(err => err.message);
// }
// exports.getAllProperties = getAllProperties;


const getAllProperties = function (options, limit = 10) {

  const queryParams = [];
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;
  
  const prefix = () => queryParams.length > 1 ? 'AND' : 'WHERE';
  
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `${prefix()} city LIKE $${queryParams.length} `;
  }

  if (options.owner_id) {
    queryParams.push(`${options.owner_id}`);
    queryString += `${prefix()} properties.owner_id = $${queryParams.length} `;
  }

  if (options.minimum_price_per_night) {
    console.log('WHY: ', prefix());
    queryParams.push(`${options.minimum_price_per_night * 100}`);
    queryString += `${prefix()} cost_per_night >= $${queryParams.length} `;
  }

  if (options.maximum_price_per_night) {
    queryParams.push(`${options.maximum_price_per_night * 100}`);
    queryString += `${prefix()} cost_per_night <= $${queryParams.length} `;
  }

  queryString += `
  GROUP BY properties.id
  `;

  if (options.minimum_rating) {
    queryParams.push(`${options.minimum_rating}`);
    queryString += `HAVING AVG(rating) >= $${queryParams.length} `;
  }

  queryParams.push(limit);
  queryString += `
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  return pool.query(queryString, queryParams).then(res => res.rows).catch(err => err.message);
};
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
// const addProperty = function(property) {
//   const propertyId = Object.keys(properties).length + 1;
//   property.id = propertyId;
//   properties[propertyId] = property;
//   return Promise.resolve(property);
// }
// exports.addProperty = addProperty;

const addProperty = function(property) {
  console.log(property);
  const queryParams = [
    property.owner_id,
    property.title,
    property.description,
    property.thumbnail_photo_url,
    property.cover_photo_url,
    property.cost_per_night,
    property.parking_spaces,
    property.number_of_bathrooms,
    property.number_of_bedrooms,
    property.country,
    property.street,
    property.city,
    property.province,
    property.post_code,
  ]
  return pool
    .query(`
      INSERT INTO properties
      VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      RETURNING *
    `, queryParams)
    .then(user => user.rows[0])
    .catch(() => null);
}
exports.addProperty = addProperty;