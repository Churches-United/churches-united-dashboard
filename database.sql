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

---------pantry
CREATE TABLE "pantry" (
  "id" SERIAL PRIMARY KEY,
  "week_date" DATE NOT NULL UNIQUE,  
  "first_time_households" INTEGER NOT NULL DEFAULT 0 CHECK (first_time_households >= 0),
  "returning_households" INTEGER NOT NULL DEFAULT 0 CHECK (returning_households >= 0),
  "total_adults" INTEGER NOT NULL DEFAULT 0 CHECK (total_adults >= 0),
  "total_children" INTEGER NOT NULL DEFAULT 0 CHECK (total_children >= 0),
  "total_seniors" INTEGER NOT NULL DEFAULT 0 CHECK (total_seniors >= 0),
  "total_pounds_distributed" DECIMAL(10, 2) NOT NULL DEFAULT 0 CHECK (total_pounds_distributed >= 0),
  "notes" TEXT,
  "created_by" INTEGER REFERENCES "user"(id) ON DELETE SET NULL,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--seed data

INSERT INTO "pantry" 
  ("week_date", "first_time_households", "returning_households", "total_adults", "total_children", "total_seniors", "total_pounds_distributed", "notes", "created_by")
VALUES
  ('2024-11-04', 5, 8, 20, 15, 3, 450.50, 'Normal week', 1),
  ('2024-11-11', 3, 10, 18, 12, 4, 380.75, 'Veterans Day week', 1),
  ('2024-11-18', 7, 12, 25, 18, 5, 520.00, 'Thanksgiving prep', 1),
  ('2024-11-25', 2, 9, 15, 10, 2, 340.25, 'Post-Thanksgiving', 1),
  ('2024-12-02', 4, 11, 22, 14, 3, 410.50, 'Back to normal', 1),
  ('2024-12-09', 6, 13, 28, 20, 6, 495.75, 'Holiday rush', 1),
  ('2024-12-16', 3, 8, 16, 11, 2, 350.00, 'Holiday week', 1);


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
