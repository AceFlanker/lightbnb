INSERT INTO users
  VALUES (1, 'Dynah	Morrott', 'dmorrott0@google.de', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO users
  VALUES (2, 'Reinaldos	Parkisson', 'rparkisson1@examiner.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO users
  VALUES (3, 'Lyda	Yedall', 'lyedall2@t.co', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO users
  VALUES (4, 'Johanna	Aisbett', 'jaisbett3@zdnet.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO users
  VALUES (5, 'Jessie	Collyns', 'jcollyns4@delicious.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');


INSERT INTO properties
  VALUES (1, 5, 'Dreamcatcher', 'Catch your dreams', 'http://dummyimage.com/549x439.png/ff4444/ffffff', 'http://dummyimage.com/1449x918.png/dddddd/000000', 287, 3, 5, 12, 'France', '22 Elka Road', 'Le Mans', 'Pays de la Loire', '72080 CEDEX 9', TRUE);

INSERT INTO properties
  VALUES (2, 5, 'Cabin in the Woods', 'Catch your nightmares', 'http://dummyimage.com/464x251.png/cc0000/ffffff', 'http://dummyimage.com/1405x945.png/cc0000/ffffff', 170, 1, 4, 8, '	Mexico', '739 Drewry Crossing', 'Anahuac', 'Veracruz Llave', '92035', TRUE);

INSERT INTO properties
  VALUES (3, 2, 'Dragon''s Den', 'Not real dragons', 'http://dummyimage.com/323x432.png/cc0000/ffffff', 'http://dummyimage.com/1891x1007.png/ff4444/ffffff', 100, 1, 2, 5, '	Canada', '4 Delaware Court', 'Lamont', 'Alberta', 'N2E', TRUE);

INSERT INTO properties
  VALUES (4, 2, 'Twilight Zone', 'Black and White', 'http://dummyimage.com/560x341.png/dddddd/000000', 'http://dummyimage.com/1365x1011.png/cc0000/ffffff', 444, 4, 6, 12, 'Canada', '888 Amoth Terrace', 'Salaberry-de-Valleyfield', 'Québec', 'J3Y', TRUE);

INSERT INTO properties
  VALUES (5, 1, 'Hearthstone', 'Well met!', 'http://dummyimage.com/511x328.png/cc0000/ffffff', 'http://dummyimage.com/1541x876.png/5fa2dd/ffffff', 143, 2, 2, 7, 'United States', '56239 American Place', 'Huntington Beach', 'California', '	92648', TRUE);


INSERT INTO reservations
  VALUES (1, '2021-06-28', '2021-07-28', 5, 3);

INSERT INTO reservations
  VALUES (2, '2021-10-16', '2021-10-17', 3, 3);

INSERT INTO reservations
  VALUES (3, '2021-07-19', '2021-11-14', 4, 5);

INSERT INTO reservations
  VALUES (4, '2021-04-26', '2021-06-10', 2, 4);

INSERT INTO reservations
  VALUES (5, '2021-09-20', '2021-09-01', 1, 4);


INSERT INTO property_reviews
  VALUES (1, 5, 4, 3, 4, 'Clean and great service');

INSERT INTO property_reviews
  VALUES (2, 3, 5, 1, 2, 'Meh');

INSERT INTO property_reviews
  VALUES (3, 4, 2, 4, 3, 'Just okay');

