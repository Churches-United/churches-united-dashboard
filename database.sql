-------------------------------------------------------
--------------------------------------------------
-- START FROM SCRATCH:
DROP TRIGGER IF EXISTS "on_user_update" ON "user";
DROP TABLE IF EXISTS "user";


-------------------------------------------------------
--------------------------------------------------
-- TABLE SCHEMAS:
-- Default
-- CREATE TABLE "user" (
--   "id" SERIAL PRIMARY KEY,
--   "username" VARCHAR (80) UNIQUE NOT NULL,
--   "password" VARCHAR (1000) NOT NULL,
--   "inserted_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
--   "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now()
-- );

-- Proposed user table 
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR(100) NOT NULL UNIQUE,
    "email" VARCHAR(255) NOT NULL UNIQUE,
    "password" VARCHAR(255) NOT NULL,
    "first_name" VARCHAR(100) NOT NULL,
    "last_name" VARCHAR(100) NOT NULL,
    "role" VARCHAR(50) NOT NULL,
    "department" VARCHAR(50),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);

---------kitchen table
CREATE TABLE "kitchen" (
  "id" SERIAL PRIMARY KEY,
  "week_start_date" DATE NOT NULL,
  "week_end_date" DATE NOT NULL,
  "total_meals_served" INTEGER NOT NULL CHECK (total_meals_served >= 0),
  "notes" TEXT,
  "created_by" INTEGER REFERENCES "user"(id) ON DELETE SET NULL,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(week_start_date, week_end_date)
);

-------------------------------------------------------
--------------------------------------------------
-- SEED DATA:
--   You'll need to actually register users via the application in order to get hashed
--   passwords. Once you've done that, you can modify this INSERT statement to include
--   your dummy users. Be sure to copy/paste their hashed passwords, as well.
--   This is only for development purposes! Here's a commented-out example:
-- INSERT INTO "user"
--   ("username", "password")
--   VALUES
--   ('unicorn10', '$2a$10$oGi81qjXmTh/slGzYOr2fu6NGuCwB4kngsiWQPToNrZf5X8hxkeNG'), --pw: 123
--   ('cactusfox', '$2a$10$8./c/6fB2BkzdIrAUMWOxOlR75kgmbx/JMrMA5gA70c9IAobVZquW'); --pw: 123


-------------------------------------------------------
--------------------------------------------------
-- AUTOMAGIC UPDATED_AT:

-- Did you know that you can make and execute functions
-- in PostgresQL? Wild, right!? I'm not making this up. Here
-- is proof that I am not making this up:
  -- https://x-team.com/blog/automatic-timestamps-with-postgresql/

-- Create a function that sets a row's updated_at column
-- to NOW():
CREATE OR REPLACE FUNCTION set_updated_at_to_now() -- 👈
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger on the user table that will execute
-- the set_update_at_to_now function on any rows that
-- have been touched by an UPDATE query:
CREATE TRIGGER on_user_update
BEFORE UPDATE ON "user"
FOR EACH ROW
EXECUTE PROCEDURE set_updated_at_to_now();
