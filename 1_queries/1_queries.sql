SELECT id, name, email, password
  FROM users
  WHERE email = 'tristanjacobs@gmail.com';

SELECT AVG(end_date - start_date) AS average_duration
  FROM reservations;

SELECT properties.id AS id, title, cost_per_night, AVG(rating) AS average_rating
  FROM properties
  JOIN property_reviews ON property_id = properties.id
  WHERE city like '%Vancouver%'
  GROUP BY properties.id
  HAVING AVG(rating) >= 4
  ORDER BY cost_per_night;
  LIMIT 10;

SELECT city, COUNT(reservations) AS total_reservations
  FROM reservations
  JOIN properties ON properties.id = property_id
  GROUP BY city
  ORDER BY total_reservations DESC;

SELECT properties.id AS id, title, cost_per_night, start_date, AVG(rating) AS average_rating
  FROM reservations
  JOIN properties ON properties.id = reservations.property_id
  JOIN property_reviews ON property_reviews.property_id = reservations.property_id
  WHERE reservations.guest_id = 1 AND end_date < now()::date
  GROUP BY properties.id, reservations.id
  ORDER BY start_date
  LIMIT 10;