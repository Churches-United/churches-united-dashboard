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
---------Donations

CREATE TABLE "donors" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(255) NOT NULL,
  "type" VARCHAR(50) NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "donations" (
  "id" SERIAL PRIMARY KEY,
  "donor_id" INTEGER NOT NULL REFERENCES donors(id),
  "date" DATE NOT NULL,
  "amount" DECIMAL(8,2) NOT NULL,
  "notable" BOOLEAN NOT NULL DEFAULT FALSE,
  "restricted" BOOLEAN NOT NULL DEFAULT FALSE,
  "notes" TEXT,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
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
---------Volunteers tables
CREATE TABLE "volunteers" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(255) NOT NULL,
  "type" VARCHAR(50) NOT NULL, 
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE "volunteer_events" (
  "id" SERIAL PRIMARY KEY,
  "volunteer_id" INTEGER NOT NULL
    REFERENCES volunteers(id),
  "event_date" DATE NOT NULL,
  location VARCHAR(255) NOT NULL,
  "number_volunteers" INTEGER NOT NULL DEFAULT 1,
  "software_signups" INTEGER NOT NULL DEFAULT 0,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);




-- ============================================
-- COMPLIANCE WEEKLY TABLE - FRESH START
-- ============================================

-- Drop existing table if exists
DROP TABLE IF EXISTS compliance_weekly CASCADE;

-- Create table
CREATE TABLE "compliance_weekly" (
    "id" SERIAL PRIMARY KEY,
    "date" DATE NOT NULL UNIQUE,
    
    "hh_without_children" INTEGER NOT NULL DEFAULT 0 CHECK (hh_without_children >= 0),
    "hh_with_children" INTEGER NOT NULL DEFAULT 0 CHECK (hh_with_children >= 0),
    "total_households" INTEGER GENERATED ALWAYS AS (hh_without_children + hh_with_children) STORED,
    
    "adults" INTEGER NOT NULL DEFAULT 0 CHECK (adults >= 0),
    "children" INTEGER NOT NULL DEFAULT 0 CHECK (children >= 0),
    "seniors_55_plus" INTEGER NOT NULL DEFAULT 0 CHECK (seniors_55_plus >= 0),
    "total_individuals" INTEGER GENERATED ALWAYS AS (adults + children + seniors_55_plus) STORED,
    
    "female" INTEGER NOT NULL DEFAULT 0 CHECK (female >= 0),
    "male" INTEGER NOT NULL DEFAULT 0 CHECK (male >= 0),
    "other_gender" INTEGER NOT NULL DEFAULT 0 CHECK (other_gender >= 0),
    "total_gender" INTEGER GENERATED ALWAYS AS (female + male + other_gender) STORED,
    
    "white" INTEGER NOT NULL DEFAULT 0 CHECK (white >= 0),
    "black_african_american" INTEGER NOT NULL DEFAULT 0 CHECK (black_african_american >= 0),
    "native_american" INTEGER NOT NULL DEFAULT 0 CHECK (native_american >= 0),
    "other_race" INTEGER NOT NULL DEFAULT 0 CHECK (other_race >= 0),
    "multi_racial" INTEGER NOT NULL DEFAULT 0 CHECK (multi_racial >= 0),
    "total_race" INTEGER GENERATED ALWAYS AS (white + black_african_american + native_american + other_race + multi_racial) STORED,
    
    "one_condition" INTEGER NOT NULL DEFAULT 0 CHECK (one_condition >= 0),
    "two_conditions" INTEGER NOT NULL DEFAULT 0 CHECK (two_conditions >= 0),
    "three_plus_conditions" INTEGER NOT NULL DEFAULT 0 CHECK (three_plus_conditions >= 0),
    "total_conditions" INTEGER GENERATED ALWAYS AS (one_condition + two_conditions + three_plus_conditions) STORED,
    
    "total_exits" INTEGER NOT NULL DEFAULT 0 CHECK (total_exits >= 0),
    
    "created_by" INTEGER REFERENCES "user"(id) ON DELETE SET NULL,
    "submitted_by" INTEGER REFERENCES "user"(id) ON DELETE SET NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "submitted_at" TIMESTAMPTZ
);

-- Create indexes
CREATE INDEX idx_compliance_date ON compliance_weekly(date);
CREATE INDEX idx_compliance_year ON compliance_weekly((EXTRACT(YEAR FROM date)));
CREATE INDEX idx_compliance_created_by ON compliance_weekly(created_by);
CREATE INDEX idx_compliance_submitted_by ON compliance_weekly(submitted_by);

-- Add comments
COMMENT ON TABLE compliance_weekly IS 'Weekly compliance reports - date is always Monday via DATE_TRUNC on INSERT';
COMMENT ON COLUMN compliance_weekly.date IS 'Always stores Monday of the week (enforced by DATE_TRUNC in INSERT)';

-- Success message
SELECT 'compliance_weekly table created successfully!' AS status;

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
