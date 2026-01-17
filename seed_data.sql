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
('Silver Linings Foundation', 'group'),
('Greenwood Community Fund', 'group'),
('Lighthouse Supporters', 'group'),
('Emily Carter', 'person');

-- ---------------- Housing Buildings ----------------
INSERT INTO housing_building (name)
VALUES
('Bright Sky Apartments'),
('Silver Linings Apartments'),
('Micah''s Mission');

-- ---------------- Volunteer Engagements: Last 6 Months ----------------
INSERT INTO volunteer_engagements (volunteer_id, event_date, location, number_volunteers, software_signups)
VALUES

-- January 2026
-- Micah's Mission - Basement
((SELECT id FROM volunteers WHERE name='Alice Johnson'), '2026-01-05', 'Micah''s Mission - Basement', 15, 3),
((SELECT id FROM volunteers WHERE name='Bob Smith'), '2026-01-12', 'Micah''s Mission - Basement', 22, 5),
((SELECT id FROM volunteers WHERE name='Grace Lee'), '2026-01-19', 'Micah''s Mission - Basement', 18, 2),

-- Kitchen
((SELECT id FROM volunteers WHERE name='Northside Volunteers'), '2026-01-06', 'Kitchen', 12, 1),
((SELECT id FROM volunteers WHERE name='Carol Martinez'), '2026-01-13', 'Kitchen', 28, 6),
((SELECT id FROM volunteers WHERE name='Alice Johnson'), '2026-01-20', 'Kitchen', 20, 3),

-- Dorothy Day Food Pantry
((SELECT id FROM volunteers WHERE name='Carol Martinez'), '2026-01-07', 'Dorothy Day Food Pantry', 16, 2),
((SELECT id FROM volunteers WHERE name='Southside Helpers'), '2026-01-14', 'Dorothy Day Food Pantry', 25, 7),
((SELECT id FROM volunteers WHERE name='Eastside Volunteers'), '2026-01-21', 'Dorothy Day Food Pantry', 18, 4),

-- Community Picnic
((SELECT id FROM volunteers WHERE name='Faith Helpers'), '2026-01-08', 'Community Picnic', 22, 5),
((SELECT id FROM volunteers WHERE name='Ian Thompson'), '2026-01-15', 'Community Picnic', 18, 2),
((SELECT id FROM volunteers WHERE name='Carol Martinez'), '2026-01-22', 'Community Picnic', 30, 8),

-- Silver Linings
((SELECT id FROM volunteers WHERE name='Bob Smith'), '2026-01-09', 'Silver Linings', 14, 1),
((SELECT id FROM volunteers WHERE name='Eastside Volunteers'), '2026-01-16', 'Silver Linings', 20, 3),

-- Bright Sky
((SELECT id FROM volunteers WHERE name='Alice Johnson'), '2026-01-11', 'Bright Sky', 16, 2),
((SELECT id FROM volunteers WHERE name='Northside Volunteers'), '2026-01-18', 'Bright Sky', 19, 4);


-- August 2025
((SELECT id FROM volunteers WHERE name='Alice Johnson'), '2025-08-05', 'Kitchen', 13, 2),
((SELECT id FROM volunteers WHERE name='Bob Smith'), '2025-08-12', 'Dorothy Day Food Pantry', 18, 3),
((SELECT id FROM volunteers WHERE name='Carol Martinez'), '2025-08-19', 'Community Picnic', 22, 5),

-- September 2025
((SELECT id FROM volunteers WHERE name='Alice Johnson'), '2025-09-02', 'Bright Sky', 15, 2),
((SELECT id FROM volunteers WHERE name='Bob Smith'), '2025-09-09', 'Silver Linings', 12, 1),
((SELECT id FROM volunteers WHERE name='Carol Martinez'), '2025-09-16', 'Dorothy Day Food Pantry', 20, 4),

-- October 2025
((SELECT id FROM volunteers WHERE name='Faith Helpers'), '2025-10-03', 'Community Picnic', 28, 6),
((SELECT id FROM volunteers WHERE name='Downtown Community Group'), '2025-10-10', 'Micah''s Mission - Basement', 18, 3),
((SELECT id FROM volunteers WHERE name='Eastside Volunteers'), '2025-10-17', 'Micah''s Mission - Pantry', 22, 5),
`((SELECT id FROM volunteers WHERE name='Bob Smith'), '2025-10-10', 'Micah''s Mission - Basement', 20, 4),
((SELECT id FROM volunteers WHERE name='Grace Lee'), '2025-10-17', 'Micah''s Mission - Pantry', 25, 6),

-- November 2025
((SELECT id FROM volunteers WHERE name='Alice Johnson'), '2025-11-03', 'Micah''s Mission - Basement', 18, 3),
((SELECT id FROM volunteers WHERE name='Bob Smith'), '2025-11-10', 'Micah''s Mission - Basement', 16, 2),
((SELECT id FROM volunteers WHERE name='Carol Martinez'), '2025-11-10', 'Micah''s Mission - Basement', 28, 7),
((SELECT id FROM volunteers WHERE name='Downtown Community Group'), '2025-11-06', 'Micah''s Mission - Pantry', 20, 4),
((SELECT id FROM volunteers WHERE name='Eastside Volunteers'), '2025-11-12', 'Micah''s Mission - Pantry', 26, 5),

-- December 2025
((SELECT id FROM volunteers WHERE name='Alice Johnson'), '2025-12-02', 'Micah''s Mission - Basement', 22, 5),
((SELECT id FROM volunteers WHERE name='Grace Lee'), '2025-12-09', 'Micah''s Mission - Basement', 19, 4),
((SELECT id FROM volunteers WHERE name='Downtown Community Group'), '2025-12-03', 'Micah''s Mission - Pantry', 23, 5),
((SELECT id FROM volunteers WHERE name='Hannah Kim'), '2025-12-10', 'Micah''s Mission - Pantry', 15, 2);


-- ---------------- Volunteer Engagements: 2024 ----------------
-- January 2024
((SELECT id FROM volunteers WHERE name='Alice Johnson'), '2024-01-06', 'Micah''s Mission - Basement', 14, 2),
((SELECT id FROM volunteers WHERE name='Grace Lee'), '2024-01-13', 'Micah''s Mission - Basement', 18, 4),
((SELECT id FROM volunteers WHERE name='Northside Volunteers'), '2024-01-07', 'Kitchen', 20, 5),
((SELECT id FROM volunteers WHERE name='Carol Martinez'), '2024-01-08', 'Dorothy Day Food Pantry', 15, 3),
((SELECT id FROM volunteers WHERE name='Faith Helpers'), '2024-01-09', 'Community Picnic', 22, 6),
((SELECT id FROM volunteers WHERE name='Downtown Community Group'), '2024-01-19', 'Kitchen', 18, 4),

-- August 2024
((SELECT id FROM volunteers WHERE name='Alice Johnson'), '2024-08-05', 'Kitchen', 16, 3),
((SELECT id FROM volunteers WHERE name='Bob Smith'), '2024-08-12', 'Dorothy Day Food Pantry', 20, 4),
((SELECT id FROM volunteers WHERE name='Carol Martinez'), '2024-08-19', 'Community Picnic', 23, 5),
((SELECT id FROM volunteers WHERE name='Grace Lee'), '2024-08-12', 'Dorothy Day Food Pantry', 19, 3),
((SELECT id FROM volunteers WHERE name='Downtown Community Group'), '2024-08-19', 'Community Picnic', 21, 4),

-- September 2024
((SELECT id FROM volunteers WHERE name='Alice Johnson'), '2024-09-02', 'Bright Sky', 18, 4),
((SELECT id FROM volunteers WHERE name='Bob Smith'), '2024-09-09', 'Silver Linings', 15, 2),
((SELECT id FROM volunteers WHERE name='Carol Martinez'), '2024-09-16', 'Dorothy Day Food Pantry', 20, 5),

-- October 2024
((SELECT id FROM volunteers WHERE name='Faith Helpers'), '2024-10-03', 'Community Picnic', 25, 6),
((SELECT id FROM volunteers WHERE name='Downtown Community Group'), '2024-10-10', 'Micah''s Mission - Basement', 19, 3),
((SELECT id FROM volunteers WHERE name='Eastside Volunteers'), '2024-10-17', 'Micah''s Mission - Pantry', 22, 5),

-- November 2024
((SELECT id FROM volunteers WHERE name='Alice Johnson'), '2024-11-04', 'Micah''s Mission - Basement', 17, 3),
((SELECT id FROM volunteers WHERE name='Bob Smith'), '2024-11-11', 'Micah''s Mission - Basement', 15, 2),
((SELECT id FROM volunteers WHERE name='Carol Martinez'), '2024-11-11', 'Micah''s Mission - Basement', 26, 6),
((SELECT id FROM volunteers WHERE name='Downtown Community Group'), '2024-11-06', 'Micah''s Mission - Pantry', 21, 4),
((SELECT id FROM volunteers WHERE name='Eastside Volunteers'), '2024-11-13', 'Micah''s Mission - Pantry', 19, 3),

-- December 2024
((SELECT id FROM volunteers WHERE name='Alice Johnson'), '2024-12-02', 'Micah''s Mission - Basement', 22, 5),
((SELECT id FROM volunteers WHERE name='Grace Lee'), '2024-12-09', 'Micah''s Mission - Basement', 20, 4),
((SELECT id FROM volunteers WHERE name='Downtown Community Group'), '2024-12-03', 'Micah''s Mission - Pantry', 23, 5),
((SELECT id FROM volunteers WHERE name='Hannah Kim'), '2024-12-10', 'Micah''s Mission - Pantry', 18, 3),

-- January 2025
((SELECT id FROM volunteers WHERE name='Alice Johnson'), '2025-01-06', 'Micah''s Mission - Basement', 20, 5),
((SELECT id FROM volunteers WHERE name='Grace Lee'), '2025-01-13', 'Micah''s Mission - Basement', 18, 4),
((SELECT id FROM volunteers WHERE name='Northside Volunteers'), '2025-01-07', 'Kitchen', 22, 5),
((SELECT id FROM volunteers WHERE name='Carol Martinez'), '2025-01-08', 'Dorothy Day Food Pantry', 19, 4),
((SELECT id FROM volunteers WHERE name='Faith Helpers'), '2025-01-09', 'Community Picnic', 23, 6);



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

-- August 2025
((SELECT id FROM donors WHERE name='Bob Johnson'), '2025-08-03', 120.00, FALSE, FALSE, 'Monthly support donation'),
((SELECT id FROM donors WHERE name='Faith Helpers'), '2025-08-07', 450.00, TRUE, FALSE, 'Summer fundraiser contribution'),
((SELECT id FROM donors WHERE name='Community Giving Circle'), '2025-08-15', 300.00, FALSE, TRUE, 'Restricted for food pantry'),
((SELECT id FROM donors WHERE name='Greenwood Community Fund'), '2025-08-20', 500.00, TRUE, FALSE, 'Community grant'),
((SELECT id FROM donors WHERE name='Emily Carter'), '2025-08-25', 75.00, FALSE, FALSE, 'Personal donation'),

-- September 2025
((SELECT id FROM donors WHERE name='Bob Johnson'), '2025-09-05', 180.00, TRUE, FALSE, 'Special monthly donation'),
((SELECT id FROM donors WHERE name='Faith Helpers'), '2025-09-12', 550.00, TRUE, FALSE, 'Fundraiser event contribution'),
((SELECT id FROM donors WHERE name='Silver Linings Foundation'), '2025-09-18', 1200.00, TRUE, TRUE, 'Restricted grant for housing'),
((SELECT id FROM donors WHERE name='Lighthouse Supporters'), '2025-09-22', 400.00, FALSE, FALSE, 'Community support'),

-- October 2025
((SELECT id FROM donors WHERE name='Bob Johnson'), '2025-10-03', 160.00, FALSE, FALSE, 'Monthly support donation'),
((SELECT id FROM donors WHERE name='Faith Helpers'), '2025-10-10', 500.00, TRUE, FALSE, 'Fall fundraiser'),
((SELECT id FROM donors WHERE name='Emily Carter'), '2025-10-17', 90.00, FALSE, FALSE, 'Personal donation'),
((SELECT id FROM donors WHERE name='Community Giving Circle'), '2025-10-21', 350.00, FALSE, TRUE, 'Restricted to youth programs'),

-- November 2025
((SELECT id FROM donors WHERE name='Bob Johnson'), '2025-11-04', 170.00, TRUE, FALSE, 'Monthly support donation'),
((SELECT id FROM donors WHERE name='Faith Helpers'), '2025-11-11', 600.00, TRUE, FALSE, 'Pre-holiday fundraiser'),
((SELECT id FROM donors WHERE name='Silver Linings Foundation'), '2025-11-15', 1100.00, TRUE, TRUE, 'Restricted grant for shelter services'),
((SELECT id FROM donors WHERE name='Greenwood Community Fund'), '2025-11-20', 450.00, FALSE, FALSE, 'Community contribution'),

-- December 2025
((SELECT id FROM donors WHERE name='Bob Johnson'), '2025-12-01', 200.00, TRUE, FALSE, 'End-of-year donation'),
((SELECT id FROM donors WHERE name='Faith Helpers'), '2025-12-05', 700.00, TRUE, FALSE, 'Holiday fundraiser'),
((SELECT id FROM donors WHERE name='Emily Carter'), '2025-12-10', 120.00, FALSE, FALSE, 'Personal contribution'),
((SELECT id FROM donors WHERE name='Lighthouse Supporters'), '2025-12-15', 500.00, TRUE, FALSE, 'Community donation'),

-- January 2026
((SELECT id FROM donors WHERE name='Bob Johnson'), '2026-01-01', 180.00, TRUE, FALSE, 'New Year donation'),
((SELECT id FROM donors WHERE name='Faith Helpers'), '2026-01-03', 650.00, TRUE, FALSE, 'January fundraiser'),
((SELECT id FROM donors WHERE name='Emily Carter'), '2026-01-07', 100.00, FALSE, FALSE, 'Personal contribution'),
((SELECT id FROM donors WHERE name='Greenwood Community Fund'), '2026-01-10', 400.00, FALSE, FALSE, 'Monthly community grant'),
((SELECT id FROM donors WHERE name='Lighthouse Supporters'), '2026-01-15', 450.00, FALSE, FALSE, 'Community donation');

-- ---------------- Housing: Last 6 Months ----------------
INSERT INTO housing (
    housing_building_id, month_date, occupancy_percent, operational_reserves, replacement_reserves,
    current_vacancies, upcoming_vacancies, upcoming_new_leases, notes
)
VALUES
-- Bright Sky Apartments
((SELECT id FROM housing_buildings WHERE name='Bright Sky Apartments'), '2025-08-01', 92.0, 11300, 4700, 2, 1, 1, 'August data'),
((SELECT id FROM housing_buildings WHERE name='Bright Sky Apartments'), '2025-09-01', 91.0, 11500, 4800, 2, 1, 1, 'September data'),
((SELECT id FROM housing_buildings WHERE name='Bright Sky Apartments'), '2025-10-01', 89.5, 11800, 4900, 3, 1, 2, 'October data'),
((SELECT id FROM housing_buildings WHERE name='Bright Sky Apartments'), '2025-11-01', 90.5, 12000, 5000, 3, 1, 2, 'November data'),
((SELECT id FROM housing_buildings WHERE name='Bright Sky Apartments'), '2025-12-01', 85.0, 12500, 5200, 4, 2, 1, 'December data'),
((SELECT id FROM housing_buildings WHERE name='Bright Sky Apartments'), '2026-01-01', 87.0, 12700, 5300, 3, 2, 1, 'January data'),

-- Silver Linings Apartments
((SELECT id FROM housing_buildings WHERE name='Silver Linings Apartments'), '2025-08-01', 94.0, 14200, 5700, 1, 0, 1, 'August data'),
((SELECT id FROM housing_buildings WHERE name='Silver Linings Apartments'), '2025-09-01', 93.0, 14500, 5800, 1, 0, 1, 'September data'),
((SELECT id FROM housing_buildings WHERE name='Silver Linings Apartments'), '2025-10-01', 91.5, 14800, 5900, 2, 1, 1, 'October data'),
((SELECT id FROM housing_buildings WHERE name='Silver Linings Apartments'), '2025-11-01', 92.0, 15000, 6000, 2, 0, 1, 'November data'),
((SELECT id FROM housing_buildings WHERE name='Silver Linings Apartments'), '2025-12-01', 88.0, 15500, 6200, 3, 1, 2, 'December data'),
((SELECT id FROM housing_buildings WHERE name='Silver Linings Apartments'), '2026-01-01', 89.0, 15700, 6300, 2, 2, 1, 'January data');


-- ---------------- Media Seed Data: Last 6 Months ----------------
INSERT INTO media_stats (
    month_date, platform, total_visits, unique_visits, pageviews, bounce_rate, 
    social_views, audience_start, audience_end, total_sent, total_opens, open_rate, total_clicks, click_rate, notes
)
VALUES
-- Website Metrics
('2025-08-01', 'Website', 5200, 4300, 9800, 58.5, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'August Website Metrics'),
('2025-09-01', 'Website', 4800, 4000, 9400, 60.2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'September Website Metrics'),
('2025-10-01', 'Website', 5600, 4500, 10500, 57.8, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'October Website Metrics'),
('2025-11-01', 'Website', 6100, 5000, 11500, 55.5, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'November Website Metrics'),
('2025-12-01', 'Website', 5900, 4700, 11000, 56.7, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'December Website Metrics'),
('2026-01-01', 'Website', 6300, 5100, 11800, 54.9, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'January Website Metrics'),

-- Facebook Metrics
('2025-08-01', 'Facebook', NULL, NULL, NULL, NULL, 31200, 6200, 6250, NULL, NULL, NULL, NULL, NULL, 'August Facebook Metrics'),
('2025-09-01', 'Facebook', NULL, NULL, NULL, NULL, 29800, 6250, 6300, NULL, NULL, NULL, NULL, NULL, 'September Facebook Metrics'),
('2025-10-01', 'Facebook', NULL, NULL, NULL, NULL, 34500, 6300, 6350, NULL, NULL, NULL, NULL, NULL, 'October Facebook Metrics'),
('2025-11-01', 'Facebook', NULL, NULL, NULL, NULL, 36800, 6350, 6400, NULL, NULL, NULL, NULL, NULL, 'November Facebook Metrics'),
('2025-12-01', 'Facebook', NULL, NULL, NULL, NULL, 38200, 6400, 6450, NULL, NULL, NULL, NULL, NULL, 'December Facebook Metrics'),
('2026-01-01', 'Facebook', NULL, NULL, NULL, NULL, 40000, 6450, 6500, NULL, NULL, NULL, NULL, NULL, 'January Facebook Metrics'),

-- Instagram Metrics
('2025-08-01', 'Instagram', NULL, NULL, NULL, NULL, 1250, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'August Instagram Metrics'),
('2025-09-01', 'Instagram', NULL, NULL, NULL, NULL, 980, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'September Instagram Metrics'),
('2025-10-01', 'Instagram', NULL, NULL, NULL, NULL, 1430, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'October Instagram Metrics'),
('2025-11-01', 'Instagram', NULL, NULL, NULL, NULL, 1680, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'November Instagram Metrics'),
('2025-12-01', 'Instagram', NULL, NULL, NULL, NULL, 2120, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'December Instagram Metrics'),
('2026-01-01', 'Instagram', NULL, NULL, NULL, NULL, 2500, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'January Instagram Metrics'),

-- TikTok Metrics
('2025-08-01', 'TikTok', NULL, NULL, NULL, NULL, 480, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'August TikTok Metrics'),
('2025-09-01', 'TikTok', NULL, NULL, NULL, NULL, 560, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'September TikTok Metrics'),
('2025-10-01', 'TikTok', NULL, NULL, NULL, NULL, 620, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'October TikTok Metrics'),
('2025-11-01', 'TikTok', NULL, NULL, NULL, NULL, 700, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'November TikTok Metrics'),
('2025-12-01', 'TikTok', NULL, NULL, NULL, NULL, 838, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'December TikTok Metrics'),
('2025-10-24', 'Newsletter', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2998, 786, 13.10, 118, 4, 'Oct 24 Newsletter'),
('2025-10-31', 'Newsletter', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2995, 537, 18.10, 79, 2.70, 'Oct 31 Newsletter'),
('2025-11-07', 'Newsletter', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2996, 544, 18.30, 82, 2.80, 'Nov 7 Newsletter');

-- ---------------- kitchen ----------------
-- Add 2022-2023 historical data to supplement existing records
INSERT INTO kitchen (week_date, total_meals_served, notes)
VALUES
-- 2022
('2022-01-03', 450, 'New Year week, steady operations'),
('2022-03-14', 520, 'Spring break week, increased attendance'),
('2022-05-09', 480, 'Mother''s Day week preparations'),
('2022-06-20', 510, 'Summer program start'),
('2022-08-08', 495, 'Mid-summer operations'),
('2022-09-12', 540, 'Back to school surge'),
('2022-10-17', 525, 'Fall season steady'),
('2022-11-14', 610, 'Thanksgiving preparation week'),
('2022-11-21', 380, 'Post-Thanksgiving, slower week'),
('2022-12-19', 320, 'Holiday week, reduced operations'),

-- 2023
('2023-01-09', 465, 'Winter operations resuming'),
('2023-02-13', 490, 'Valentine''s week activities'),
('2023-03-20', 515, 'Spring season begins'),
('2023-04-17', 505, 'Easter week preparations'),
('2023-06-05', 530, 'Summer programs in full swing'),
('2023-07-10', 545, 'Peak summer operations'),
('2023-08-14', 520, 'Late summer steady'),
('2023-09-18', 550, 'Fall semester start'),
('2023-10-30', 580, 'Halloween week, busy'),
('2023-11-20', 640, 'Pre-Thanksgiving rush'),
('2023-12-11', 475, 'Holiday preparations');
('2026-01-01', 'TikTok', NULL, NULL, NULL, NULL, 910, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'January TikTok Metrics'),

-- Newsletter Metrics
('2025-08-15', 'Newsletter', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2950, 450, 15.3, 75, 2.5, 'Aug 15 Newsletter'),
('2025-09-01', 'Newsletter', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3000, 480, 16.0, 80, 2.7, 'September Newsletter'),
('2025-10-01', 'Newsletter', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3100, 510, 16.5, 95, 3.0, 'October Newsletter'),
('2025-11-01', 'Newsletter', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3200, 530, 16.6, 100, 3.1, 'November Newsletter'),
('2025-12-01', 'Newsletter', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3300, 560, 17.0, 110, 3.3, 'December Newsletter'),
('2026-01-01', 'Newsletter', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3400, 580, 17.1, 115, 3.4, 'January Newsletter');

