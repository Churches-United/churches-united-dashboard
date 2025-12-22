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
-- );;

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
--------- hr_weekly table
   CREATE TABLE "hr_weekly"(
  "id" SERIAL PRIMARY KEY,
  "week_date" DATE NOT NULL UNIQUE,
  "total_positions" INTEGER NOT NULL DEFAULT 0 CHECK (total_positions >= 0),
  "open_positions" INTEGER NOT NULL DEFAULT 0 CHECK (open_positions >= 0),
  "new_hires_this_week" INTEGER NOT NULL DEFAULT 0 CHECK (new_hires_this_week >= 0),
  "employee_turnover" INTEGER NOT NULL DEFAULT 0 CHECK (employee_turnover >= 0),
  "evaluations_due" INTEGER NOT NULL DEFAULT 0 CHECK (evaluations_due >= 0),
  "notes" TEXT,
  "created_by" INTEGER REFERENCES "user"(id) ON DELETE SET NULL,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

---------Event table
CREATE TABLE "events" (
    "id" SERIAL PRIMARY KEY, 
    "name" VARCHAR(255) NOT NULL,
    "datetime" TIMESTAMPTZ NOT NULL, 
    "venue" VARCHAR(255) NOT NULL,
    "type" VARCHAR(255) NOT NULL,
    "shelter_id" INTEGER REFERENCES shelters(id),
    "notes" VARCHAR(255),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

---------Shelter tables
CREATE TABLE "shelters" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
-- North Campus 
CREATE TABLE "shelter_info" (
    "id" SERIAL PRIMARY KEY,
    "shelter_id" INTEGER NOT NULL REFERENCES shelters(id),
    "month_date" DATE NOT NULL, 
    "occupancy_percent" DECIMAL(5,2),
    "operational_reserves" DECIMAL(12,2),
    "replacement_reserves" DECIMAL(12,2),
    "current_vacancies" INTEGER,
    "upcoming_vacancies" INTEGER,
    "upcoming_new_leases" INTEGER,
    "notes" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE ("shelter_id", "report_month")
);

---------Donation tables

CREATE TABLE "donations" (
  "id" BIGSERIAL PRIMARY KEY,
  "donor_id" BIGINT NOT NULL REFERENCES donors(id),
  "date" DATE NOT NULL,
  "amount" DECIMAL(8,2) NOT NULL,
  "notable" BOOLEAN NOT NULL DEFAULT FALSE,
  "restricted" BOOLEAN NOT NULL DEFAULT FALSE,
  "notes" TEXT,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE "donors" (
  "id" BIGSERIAL PRIMARY KEY,
  "name" VARCHAR(255) NOT NULL,
  "type" VARCHAR(50) NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
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
--  fake seed data for hr weekly testing 
INSERT INTO "hr_weekly"
  ("week_date", "total_positions", "open_positions", "new_hires_this_week", "employee_turnover", "evaluations_due", "notes", "created_by")
VALUES
  ('2024-11-04', 12, 2, 0, 0, 3, 'Normal week', 1),
  ('2024-11-11', 12, 2, 1, 0, 2, 'One new hire in Kitchen', 1),
  ('2024-11-18', 12, 1, 0, 0, 4, 'Thanksgiving prep week', 1),
  ('2024-11-25', 12, 1, 0, 1, 1, 'One termination', 1),
  ('2024-12-02', 13, 2, 1, 0, 5, 'New development position added', 1),
  ('2024-12-09', 13, 2, 0, 0, 3, 'Holiday season', 1),
  ('2024-12-16', 13, 1, 1, 0, 2, 'End of year hiring', 1);


-
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









-- ============================================
-- SHELTER WEEKLY TABLE - BASED ON ACTUAL DATA
-- ============================================
-- Tracks: Review dates, Shelter guests by type, Incidents, Community members served

DROP TABLE IF EXISTS shelter_weekly CASCADE;


CREATE TABLE "shelter_weekly" (
    "id" SERIAL PRIMARY KEY,
    "date" DATE NOT NULL UNIQUE,  -- Report date (always Monday via DATE_TRUNC)
    
    -- Shelter Guests by Category
    "single_men" INTEGER NOT NULL DEFAULT 0 CHECK (single_men >= 0),
    "housing_men" INTEGER NOT NULL DEFAULT 0 CHECK (housing_men >= 0),
    "single_women" INTEGER NOT NULL DEFAULT 0 CHECK (single_women >= 0),
    "housing_women" INTEGER NOT NULL DEFAULT 0 CHECK (housing_women >= 0),
    "families" INTEGER NOT NULL DEFAULT 0 CHECK (families >= 0),
    "hybrid_va_holdover" INTEGER NOT NULL DEFAULT 0 CHECK (hybrid_va_holdover >= 0),
    "total_guests" INTEGER GENERATED ALWAYS AS (
        single_men + housing_men + single_women + housing_women + families + hybrid_va_holdover
    ) STORED,
    
    -- Incidents and Community Outreach
    "incident_reports" INTEGER NOT NULL DEFAULT 0 CHECK (incident_reports >= 0),
    "community_members_served" INTEGER NOT NULL DEFAULT 0 CHECK (community_members_served >= 0),
    "nights_found_sleeping_outside" INTEGER NOT NULL DEFAULT 0 CHECK (nights_found_sleeping_outside >= 0),
    
    -- Metadata
    "created_by" INTEGER REFERENCES "user"(id) ON DELETE SET NULL,
    "submitted_by" INTEGER REFERENCES "user"(id) ON DELETE SET NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "submitted_at" TIMESTAMPTZ,
    
    -- Notes
    "notes" TEXT
);




-- ============================================
-- FINANCE WEEKLY TABLE - BASED ON ACTUAL DATA
-- ============================================
-- Tracks: Assets, Operating account, Bills, Payroll, Revenue, Major expenses

DROP TABLE IF EXISTS finance_weekly CASCADE;
CREATE TABLE "finance_weekly" (
    "id" SERIAL PRIMARY KEY,
    "date" DATE NOT NULL UNIQUE,  -- Report date (always Monday via DATE_TRUNC)
    
    -- Financial Summary
    "total_assets" DECIMAL(12,2) NOT NULL DEFAULT 0 CHECK (total_assets >= 0),
    "operating_account_balance" DECIMAL(12,2) NOT NULL DEFAULT 0 CHECK (operating_account_balance >= 0),
    "bills_paid" DECIMAL(12,2) NOT NULL DEFAULT 0 CHECK (bills_paid >= 0),
    "payroll_paid" DECIMAL(12,2) NOT NULL DEFAULT 0 CHECK (payroll_paid >= 0),
    "revenue_received" DECIMAL(12,2) NOT NULL DEFAULT 0 CHECK (revenue_received >= 0),
    
    -- Major Expenses (free text list)
    "major_expenses" TEXT,
    
    -- Notes
    "notes" TEXT,
    
    -- Calculated Fields
    "net_change" DECIMAL(12,2) GENERATED ALWAYS AS (revenue_received - bills_paid - payroll_paid) STORED,
    
    -- Metadata
    "created_by" INTEGER REFERENCES "user"(id) ON DELETE SET NULL,
    "submitted_by" INTEGER REFERENCES "user"(id) ON DELETE SET NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "submitted_at" TIMESTAMPTZ
);