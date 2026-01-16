-- ---------------- Volunteers ----------------
INSERT INTO volunteers (name, type)
VALUES
('Alice Johnson', 'Individual'),
('Bob Smith', 'Individual'),
('Carol Martinez', 'Individual'),
('Downtown Community Group', 'Group'),
('Eastside Volunteers', 'Group'),
('Faith Helpers', 'Group'),
('Grace Lee', 'Individual'),
('Hannah Kim', 'Individual'),
('Northside Volunteers', 'Group'),
('Southside Helpers', 'Group'),
('Ian Thompson', 'Individual');

-- ---------------- Donors ----------------
INSERT INTO donors (name, type)
VALUES
('Bob Johnson', 'person'),
('Faith Helpers', 'group'),
('Community Giving Circle', 'group'),
('Anonymous Donor', 'person'),
('Silver Linings Foundation', 'group');

-- ---------------- Housing Buildings ----------------
INSERT INTO housing_building (name)
VALUES
('Bright Sky Apartments'),
('Silver Linings Apartments'),
('Micah''s Mission');

-- ---------------- Volunteer Engagements ----------------
INSERT INTO volunteer_engagements (volunteer_id, event_date, location, number_volunteers, software_signups)
VALUES
-- November 2025
((SELECT id FROM volunteers WHERE name='Alice Johnson'), '2025-11-03', 'Micah''s Mission - Basement', 1, 0),
((SELECT id FROM volunteers WHERE name='Bob Smith'), '2025-11-10', 'Micah''s Mission - Basement', 1, 1),
((SELECT id FROM volunteers WHERE name='Carol Martinez'), '2025-11-10', 'Micah''s Mission - Basement', 5, 0),
((SELECT id FROM volunteers WHERE name='Downtown Community Group'), '2025-11-05', 'Micah''s Mission - Pantry', 1, 2),
((SELECT id FROM volunteers WHERE name='Eastside Volunteers'), '2025-11-12', 'Micah''s Mission - Pantry', 4, 1),
((SELECT id FROM volunteers WHERE name='Alice Johnson'), '2025-11-06', 'Kitchen', 1, 0),
((SELECT id FROM volunteers WHERE name='Bob Smith'), '2025-11-13', 'Kitchen', 1, 1),
((SELECT id FROM volunteers WHERE name='Downtown Community Group'), '2025-11-20', 'Kitchen', 1, 0),
((SELECT id FROM volunteers WHERE name='Carol Martinez'), '2025-11-07', 'Dorothy Day Food Pantry', 6, 2),
((SELECT id FROM volunteers WHERE name='Eastside Volunteers'), '2025-11-14', 'Dorothy Day Food Pantry', 3, 0),
((SELECT id FROM volunteers WHERE name='Faith Helpers'), '2025-11-08', 'Community Picnic', 8, 3),
((SELECT id FROM volunteers WHERE name='Carol Martinez'), '2025-11-15', 'Community Picnic', 5, 1),
((SELECT id FROM volunteers WHERE name='Bob Smith'), '2025-11-09', 'Silver Linings', 1, 0),
((SELECT id FROM volunteers WHERE name='Eastside Volunteers'), '2025-11-16', 'Silver Linings', 4, 0),
((SELECT id FROM volunteers WHERE name='Alice Johnson'), '2025-11-11', 'Bright Sky', 1, 0),
((SELECT id FROM volunteers WHERE name='Downtown Community Group'), '2025-11-18', 'Bright Sky', 1, 1),
((SELECT id FROM volunteers WHERE name='Faith Helpers'), '2025-11-19', 'Other', 2, 0),

-- December 2025
((SELECT id FROM volunteers WHERE name='Alice Johnson'), '2025-12-01', 'Micah''s Mission - Basement', 2, 1),
((SELECT id FROM volunteers WHERE name='Bob Smith'), '2025-12-08', 'Micah''s Mission - Basement', 1, 0),
((SELECT id FROM volunteers WHERE name='Grace Lee'), '2025-12-15', 'Micah''s Mission - Basement', 3, 2),
((SELECT id FROM volunteers WHERE name='Downtown Community Group'), '2025-12-02', 'Micah''s Mission - Pantry', 2, 1),
((SELECT id FROM volunteers WHERE name='Eastside Volunteers'), '2025-12-09', 'Micah''s Mission - Pantry', 3, 0),
((SELECT id FROM volunteers WHERE name='Hannah Kim'), '2025-12-16', 'Micah''s Mission - Pantry', 1, 0),
((SELECT id FROM volunteers WHERE name='Alice Johnson'), '2025-12-03', 'Kitchen', 1, 0),
((SELECT id FROM volunteers WHERE name='Northside Volunteers'), '2025-12-10', 'Kitchen', 4, 1),
((SELECT id FROM volunteers WHERE name='Downtown Community Group'), '2025-12-17', 'Kitchen', 2, 0),
((SELECT id FROM volunteers WHERE name='Carol Martinez'), '2025-12-04', 'Dorothy Day Food Pantry', 5, 1),
((SELECT id FROM volunteers WHERE name='Eastside Volunteers'), '2025-12-11', 'Dorothy Day Food Pantry', 3, 2),
((SELECT id FROM volunteers WHERE name='Southside Helpers'), '2025-12-18', 'Dorothy Day Food Pantry', 2, 0),
((SELECT id FROM volunteers WHERE name='Faith Helpers'), '2025-12-05', 'Community Picnic', 6, 1),
((SELECT id FROM volunteers WHERE name='Carol Martinez'), '2025-12-12', 'Community Picnic', 4, 0),
((SELECT id FROM volunteers WHERE name='Ian Thompson'), '2025-12-19', 'Community Picnic', 3, 0),
((SELECT id FROM volunteers WHERE name='Bob Smith'), '2025-12-06', 'Silver Linings', 2, 1),
((SELECT id FROM volunteers WHERE name='Eastside Volunteers'), '2025-12-13', 'Silver Linings', 3, 0),
((SELECT id FROM volunteers WHERE name='Grace Lee'), '2025-12-20', 'Silver Linings', 1, 1),
((SELECT id FROM volunteers WHERE name='Alice Johnson'), '2025-12-07', 'Bright Sky', 1, 0),
((SELECT id FROM volunteers WHERE name='Downtown Community Group'), '2025-12-14', 'Bright Sky', 2, 1),
((SELECT id FROM volunteers WHERE name='Hannah Kim'), '2025-12-21', 'Bright Sky', 1, 0),
((SELECT id FROM volunteers WHERE name='Faith Helpers'), '2025-12-08', 'Other', 3, 1),
((SELECT id FROM volunteers WHERE name='Northside Volunteers'), '2025-12-15', 'Other', 2, 0),
((SELECT id FROM volunteers WHERE name='Southside Helpers'), '2025-12-22', 'Other', 1, 0),

-- January 2026
((SELECT id FROM volunteers WHERE name='Alice Johnson'), '2026-01-05', 'Micah''s Mission - Basement', 1, 0),
((SELECT id FROM volunteers WHERE name='Bob Smith'), '2026-01-12', 'Micah''s Mission - Basement', 2, 1),
((SELECT id FROM volunteers WHERE name='Grace Lee'), '2026-01-19', 'Micah''s Mission - Basement', 3, 0),
((SELECT id FROM volunteers WHERE name='Downtown Community Group'), '2026-01-06', 'Kitchen', 1, 0),
((SELECT id FROM volunteers WHERE name='Northside Volunteers'), '2026-01-13', 'Kitchen', 4, 1),
((SELECT id FROM volunteers WHERE name='Alice Johnson'), '2026-01-20', 'Kitchen', 2, 0),
((SELECT id FROM volunteers WHERE name='Carol Martinez'), '2026-01-07', 'Dorothy Day Food Pantry', 3, 0),
((SELECT id FROM volunteers WHERE name='Southside Helpers'), '2026-01-14', 'Dorothy Day Food Pantry', 5, 2),
((SELECT id FROM volunteers WHERE name='Eastside Volunteers'), '2026-01-21', 'Dorothy Day Food Pantry', 2, 1),
((SELECT id FROM volunteers WHERE name='Faith Helpers'), '2026-01-08', 'Community Picnic', 4, 1),
((SELECT id FROM volunteers WHERE name='Ian Thompson'), '2026-01-15', 'Community Picnic', 3, 0),
((SELECT id FROM volunteers WHERE name='Carol Martinez'), '2026-01-22', 'Community Picnic', 6, 2);

-- ---------------- Volunteer Engagements: 2024 ----------------
INSERT INTO volunteer_engagements (volunteer_id, event_date, location, number_volunteers, software_signups)
VALUES
-- November 2024
((SELECT id FROM volunteers WHERE name='Alice Johnson'), '2024-11-04', 'Micah''s Mission - Basement', 1, 0),
((SELECT id FROM volunteers WHERE name='Bob Smith'), '2024-11-11', 'Micah''s Mission - Basement', 1, 1),
((SELECT id FROM volunteers WHERE name='Carol Martinez'), '2024-11-11', 'Micah''s Mission - Basement', 4, 0),

((SELECT id FROM volunteers WHERE name='Downtown Community Group'), '2024-11-06', 'Micah''s Mission - Pantry', 2, 1),
((SELECT id FROM volunteers WHERE name='Eastside Volunteers'), '2024-11-13', 'Micah''s Mission - Pantry', 3, 0),

((SELECT id FROM volunteers WHERE name='Alice Johnson'), '2024-11-07', 'Kitchen', 1, 0),
((SELECT id FROM volunteers WHERE name='Bob Smith'), '2024-11-14', 'Kitchen', 1, 1),

((SELECT id FROM volunteers WHERE name='Carol Martinez'), '2024-11-08', 'Dorothy Day Food Pantry', 5, 1),
((SELECT id FROM volunteers WHERE name='Eastside Volunteers'), '2024-11-15', 'Dorothy Day Food Pantry', 3, 0),

((SELECT id FROM volunteers WHERE name='Faith Helpers'), '2024-11-09', 'Community Picnic', 6, 2),

((SELECT id FROM volunteers WHERE name='Bob Smith'), '2024-11-10', 'Silver Linings', 1, 0),
((SELECT id FROM volunteers WHERE name='Downtown Community Group'), '2024-11-17', 'Bright Sky', 2, 1),

-- ---------------- Volunteer Engagements: 2024 ----------------
INSERT INTO volunteer_engagements (volunteer_id, event_date, location, number_volunteers, software_signups)
VALUES

-- December 2024
((SELECT id FROM volunteers WHERE name='Alice Johnson'), '2024-12-02', 'Micah''s Mission - Basement', 2, 1),
((SELECT id FROM volunteers WHERE name='Grace Lee'), '2024-12-09', 'Micah''s Mission - Basement', 3, 1),

((SELECT id FROM volunteers WHERE name='Downtown Community Group'), '2024-12-03', 'Micah''s Mission - Pantry', 2, 1),
((SELECT id FROM volunteers WHERE name='Hannah Kim'), '2024-12-10', 'Micah''s Mission - Pantry', 1, 0),

((SELECT id FROM volunteers WHERE name='Northside Volunteers'), '2024-12-04', 'Kitchen', 4, 1),

((SELECT id FROM volunteers WHERE name='Carol Martinez'), '2024-12-05', 'Dorothy Day Food Pantry', 4, 1),
((SELECT id FROM volunteers WHERE name='Southside Helpers'), '2024-12-12', 'Dorothy Day Food Pantry', 2, 0),

((SELECT id FROM volunteers WHERE name='Faith Helpers'), '2024-12-06', 'Community Picnic', 5, 1),
((SELECT id FROM volunteers WHERE name='Ian Thompson'), '2024-12-13', 'Community Picnic', 3, 0),

((SELECT id FROM volunteers WHERE name='Bob Smith'), '2024-12-07', 'Silver Linings', 2, 1),
((SELECT id FROM volunteers WHERE name='Downtown Community Group'), '2024-12-14', 'Bright Sky', 2, 1),

-- January 2025 (for year-boundary testing)
((SELECT id FROM volunteers WHERE name='Alice Johnson'), '2025-01-06', 'Micah''s Mission - Basement', 1, 0),
((SELECT id FROM volunteers WHERE name='Grace Lee'), '2025-01-13', 'Micah''s Mission - Basement', 2, 1),

((SELECT id FROM volunteers WHERE name='Northside Volunteers'), '2025-01-07', 'Kitchen', 3, 1),

((SELECT id FROM volunteers WHERE name='Carol Martinez'), '2025-01-08', 'Dorothy Day Food Pantry', 3, 0),

((SELECT id FROM volunteers WHERE name='Faith Helpers'), '2025-01-09', 'Community Picnic', 4, 1);


-- ---------------- Events ----------------
INSERT INTO events (name, datetime, venue, type, shelter_id, notes)
VALUES
('Holiday Fundraiser', '2025-12-15 18:00:00-06', 'Community Hall', 'Fundraiser', NULL, 'Annual holiday fundraising event'),
('Winter Coat Drive', '2025-12-20 10:00:00-06', 'Micah''s Mission - Basement', 'Community Events', 
  (SELECT id FROM housing_building WHERE name='Micah''s Mission'), 'Collecting coats for families in need'),
('Soup Kitchen Prep', '2025-12-22 09:00:00-06', 'Kitchen', 'Large Volunteer Event', NULL, 'Preparing meals for the community'),
('Neighborhood Clean-Up', '2025-12-28 08:30:00-06', 'Bright Sky', 'Community Events', NULL, NULL),
('Summer Picnic', '2025-06-10 12:00:00-06', 'Community Picnic', 'Community Events', NULL, 'Fun picnic with games and food'),
('Back-to-School Drive', '2025-08-20 14:00:00-06', 'Dorothy Day Food Pantry', 'Fundraiser', NULL, 'Supplies for students'),
('Volunteer Appreciation Night', '2025-09-15 18:30:00-06', 'Silver Linings', 'Other', NULL, 'Celebrating our volunteers'),
('Emergency Shelter Setup', '2025-11-05 16:00:00-06', 'Micah''s Mission - Pantry', 'Large Volunteer Event', 
  (SELECT id FROM housing_building WHERE name='Micah''s Mission'), 'Preparing emergency kits'),
('Community Art Fair', '2025-10-12 10:00:00-06', 'Community Hall', 'Community Events', NULL, 'Local artists showcase'),
('Charity Auction', '2025-11-22 19:00:00-06', 'Community Hall', 'Fundraiser', NULL, 'Auction to support programs');

-- ---------------- Donations ----------------
INSERT INTO donations (donor_id, date, amount, notable, restricted, notes)
VALUES
((SELECT id FROM donors WHERE name='Bob Johnson'), '2025-01-05', 150.00, FALSE, FALSE, 'Monthly support donation'),
((SELECT id FROM donors WHERE name='Faith Helpers'), '2025-01-12', 500.00, TRUE, FALSE, 'Group fundraiser contribution'),
((SELECT id FROM donors WHERE name='Community Giving Circle'), '2025-02-03', 250.00, FALSE, TRUE, 'Restricted for food pantry'),
((SELECT id FROM donors WHERE name='Anonymous Donor'), '2025-02-10', 75.00, FALSE, FALSE, 'Anonymous cash donation'),
((SELECT id FROM donors WHERE name='Bob Johnson'), '2025-03-01', 200.00, TRUE, FALSE, 'Winter support donation'),
((SELECT id FROM donors WHERE name='Silver Linings Foundation'), '2025-03-15', 1000.00, TRUE, TRUE, 'Annual grant restricted to shelter services'),

-- Additional donations (seed December / January)
((SELECT id FROM donors WHERE name='Bob Johnson'), '2025-12-01', 90.50, FALSE, FALSE, 'All systems normal'),
((SELECT id FROM donors WHERE name='Faith Helpers'), '2025-12-01', 85.00, FALSE, FALSE, 'Preparing for winter'),
((SELECT id FROM donors WHERE name='Bob Johnson'), '2026-01-01', 88.00, FALSE, FALSE, 'Monthly maintenance completed'),
((SELECT id FROM donors WHERE name='Faith Helpers'), '2026-01-01', 80.00, FALSE, FALSE, 'New lease agreements starting');

-- ---------------- Housing ----------------
INSERT INTO housing (
    housing_building_id, month_date, occupancy_percent, operational_reserves, replacement_reserves,
    current_vacancies, upcoming_vacancies, upcoming_new_leases, notes
)
VALUES
((SELECT id FROM housing_building WHERE name='Bright Sky Apartments'), '2025-09-01', 91.0, 11500, 4800, 2, 1, 1, 'September data'),
((SELECT id FROM housing_building WHERE name='Bright Sky Apartments'), '2025-10-01', 89.5, 11800, 4900, 3, 1, 2, 'October data'),
((SELECT id FROM housing_building WHERE name='Bright Sky Apartments'), '2025-11-01', 90.5, 12000, 5000, 3, 1, 2, 'November data'),
((SELECT id FROM housing_building WHERE name='Bright Sky Apartments'), '2025-12-01', 85.0, 12500, 5200, 4, 2, 1, 'December data initial'),
((SELECT id FROM housing_building WHERE name='Silver Linings Apartments'), '2025-09-01', 93.0, 14500, 5800, 1, 0, 1, 'September data'),
((SELECT id FROM housing_building WHERE name='Silver Linings Apartments'), '2025-10-01', 91.5, 14800, 5900, 2, 1, 1, 'October data'),
((SELECT id FROM housing_building WHERE name='Silver Linings Apartments'), '2025-11-01', 92.0, 15000, 6000, 2, 0, 1, 'November data'),
((SELECT id FROM housing_building WHERE name='Silver Linings Apartments'), '2025-12-01', 88.0, 15500, 6200, 3, 1, 2, 'December data initial');

-- ---------------- Media ----------------
INSERT INTO media_stats (
    month_date, platform, total_visits, unique_visits, pageviews, bounce_rate, social_views, audience_start, audience_end, total_sent, total_opens, open_rate, total_clicks, click_rate, notes
)
VALUES
('2025-01-01', 'Website', 2800, 2300, 4900, 62, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'January Website Metrics'),
('2025-02-01', 'Website', 4200, 3600, 6200, 76, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'February Website Metrics'),
('2025-03-01', 'Website', 4000, 3500, 5600, 79.79, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'March Website Metrics'),
('2025-01-01', 'Facebook', NULL, NULL, NULL, NULL, 24622, 6002, 6008, NULL, NULL, NULL, NULL, NULL, 'January Facebook Metrics'),
('2025-02-01', 'Facebook', NULL, NULL, NULL, NULL, 42648, 6005, 6031, NULL, NULL, NULL, NULL, NULL, 'February Facebook Metrics'),
('2025-03-01', 'Facebook', NULL, NULL, NULL, NULL, 31550, 6031, 6045, NULL, NULL, NULL, NULL, NULL, 'March Facebook Metrics'),
('2025-05-01', 'Instagram', NULL, NULL, NULL, NULL, 916, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'May Instagram Metrics'),
('2025-06-01', 'Instagram', NULL, NULL, NULL, NULL, 212, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'June Instagram Metrics'),
('2025-11-01', 'TikTok', NULL, NULL, NULL, NULL, 523, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'November TikTok Metrics'),
('2025-12-01', 'TikTok', NULL, NULL, NULL, NULL, 838, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'December TikTok Metrics'),
('2025-10-24', 'Newsletter', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2998, 786, 13.10, 118, 4, 'Oct 24 Newsletter'),
('2025-10-31', 'Newsletter', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2995, 537, 18.10, 79, 2.70, 'Oct 31 Newsletter'),
('2025-11-07', 'Newsletter', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2996, 544, 18.30, 82, 2.80, 'Nov 7 Newsletter');
