--TABLE CREATION FOR DBMS-MINI DATABASE

-- crating roles table
create table roles(
    role_id numeric(5) primary key,
    role_name varchar(25),
    role_desc varchar(100)
    );
------------------------------

-- crating user_register table
create table user_register (
    username varchar(25) not null, 
    email varchar(35) primary key,
    password varchar(25) not null,
    is_admin numeric(5) references roles(role_id),
    is_staff numeric(5) references roles(role_id),
    is_customer numeric(5) references roles(role_id),
    unique(username, password)
    );
------------------------------

-- crating userprofile table
create table userprofile(
    email varchar(35) references user_register(email) not null,
    first_name varchar(50),
    middle_name varchar(50),
    last_name varchar(50),
    about varchar(150),
    image_url varchar(100)
    );    
------------------------------

-- crating category table
create table category(
    cat_id numeric(5) primary key not null,
    cat_name varchar(25),
    cat_desc varchar(100)
    );    
------------------------------

-- crating content table

-- creating trigger function
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;    

create table content(
    cont_id bigserial primary key not null,
    cat_id numeric(2) references category(cat_id) not null,
    cont_title varchar(50) not null,
    cont_desc varchar(150) not null,
    genre varchar(25) not null,
    duration varchar(20) not null,
    age_limit numeric(2) not null,
    release_time date not null,
    ratting numeric(2,1),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

--creating trigger
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON content
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();    
------------------------------

--creating content_file table
create table content_file(
    cont_id int references content(cont_id) not null,
    image_url1 varchar(200) not null,
    image_url2 varchar(200) not null,
    vedio_url2 varchar(200) not null
    );
------------------------------

--creating cast table
create table casting(
    cont_id int references content(cont_id) primary key not null,
    charectore1 varchar(200) not null,
    charectore2 varchar(200) not null,
    charectore3 varchar(200) not null,
    charectore4 varchar(200) not null,
    charectore5 varchar(200) not null
    );
------------------------------

--creating crew table   
create table crew(
    cont_id int references content(cont_id) primary key not null,
    director varchar(50) not null,
    producer varchar(50) not null,
    music_dir varchar(50) not null,
    DOP varchar(50) not null,
    camera_man varchar(50) not null
    );
-----------------------

create table refreshToken(
    refresh_token varchar(300) not null
    );