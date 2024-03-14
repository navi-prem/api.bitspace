create extension if not exists "uuid-ossp";

-- drop table waitlist;

create table waitlist (
    email varchar PRIMARY KEY,
    name varchar(25),
    is_deleted boolean DEFAULT false
);
