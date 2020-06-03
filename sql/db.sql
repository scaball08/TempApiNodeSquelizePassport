create table if not exists projects(
    id integer PRIMARY KEY generated by DEFAULT As IDENTITY,
    name text not null CHECK (name <> ' '), 
    priority integer not null,
    description text ,
    deliverydate DATE not null
); 

create table if not exists tasks(
    id integer PRIMARY KEY generated BY DEFAULT AS IDENTITY,
    name text NOT NULL CHECK (name <> ' '),
    done BOOLEAN,
    project_id INTEGER REFERENCES projects(id)
);

create table if not exists users(
    id integer PRIMARY KEY generated BY DEFAULT AS IDENTITY,
    username text NOT NULL CHECK (username <> ''),
    first_name text NOT NULL CHECK (first_name <> ''),
    last_name text NOT NULL CHECK (last_name <> ''),
    email text NOT NULL CHECK (email <> ''),
    password text NOT NULL CHECK (password <> ''),
    login_count integer
);



create table if not exists roles(
    id integer PRIMARY KEY generated BY DEFAULT AS IDENTITY,
    nombre text NOT NULL CHECK (nombre <> '')
);


CREATE TABLE usuario_roles (
  user_id integer NOT NULL,
  role_id integer NOT NULL
  );

INSERT INTO projects(name,priority,description,deliverydate)
VALUES('Make rest Api Squelize',1,'using Javascript','2020-05-12');