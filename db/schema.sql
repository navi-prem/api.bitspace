create extension if not exists "uuid-ossp";

create table waitlist (
    email varchar PRIMARY KEY,
    name varchar(25),
    is_deleted boolean DEFAULT false
);

create table timelines (
    timeline_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    title varchar(25) NOT NULL,
    content varchar[] NOT NULL,
    date Date NOT NULL,
    is_deleted boolean DEFAULT(false)
);

create table users (
    github_id varchar PRIMARY KEY,
    username varchar,
    is_banned boolean,
    title varchar(64),
    created_at timestamptz DEFAULT now(),
    discord_id varchar,
    strike int DEFAULT 0,
    points int DEFAULT 0,
    notify boolean DEFAULT (false),
    is_super_mod boolean DEFAULT (false)
);

create table roles (
    rank int PRIMARY KEY default 10,
    r_name varchar(25) NOT NULL
);

create table user_roles (
    user_id varchar,
    rank int,

    PRIMARY KEY(user_id, rank),
    FOREIGN KEY(user_id) REFERENCES users(github_id),
    FOREIGN KEY(rank) REFERENCES roles(rank)
);
