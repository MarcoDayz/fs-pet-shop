DROP TABLE pets;

CREATE TABLE pets(
    pet_id serial,
    name text,
    age integer,
    kind text
);

INSERT INTO pets(name,age,kind) VALUES('fluffy', 10, 'rabbit');
INSERT INTO pets(name,age,kind) VALUES('grizzly', 20, 'bear');