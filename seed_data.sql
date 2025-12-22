INSERT INTO volunteers (name, type)
VALUES
('Alice Johnson', 'Individual'),
('Bob Smith', 'Individual'),
('Carol Martinez', 'Individual'),
('Downtown Community Group', 'Group'),
('Eastside Volunteers', 'Group'),
('Faith Helpers', 'Group');

INSERT INTO volunteer_events (volunteer_id, event_date, location, number_volunteers, software_signups)
VALUES
-- Micah's Mission Basement
(5, '2025-11-03', 'Micah''s Mission - Basement', 1, 0),
(6, '2025-11-10', 'Micah''s Mission - Basement', 1, 1),
(7, '2025-11-10', 'Micah''s Mission - Basement', 5, 0),

-- Micah's Mission Pantry
(8, '2025-11-05', 'Micah''s Mission - Pantry', 1, 2),
(9, '2025-11-12', 'Micah''s Mission - Pantry', 4, 1),

-- Kitchen
(5, '2025-11-06', 'Kitchen', 1, 0),
(6, '2025-11-13', 'Kitchen', 1, 1),
(8, '2025-11-20', 'Kitchen', 1, 0),

-- Dorothy Day Food Pantry
(7, '2025-11-07', 'Dorothy Day Food Pantry', 6, 2),
(9, '2025-11-14', 'Dorothy Day Food Pantry', 3, 0),

-- Community Picnic
(10, '2025-11-08', 'Community Picnic', 8, 3),
(7, '2025-11-15', 'Community Picnic', 5, 1),

-- Silver Linings
(6, '2025-11-09', 'Silver Linings', 1, 0),
(9, '2025-11-16', 'Silver Linings', 4, 0),

-- Bright Sky
(5, '2025-11-11', 'Bright Sky', 1, 0),
(8, '2025-11-18', 'Bright Sky', 1, 1),

-- Other
(10, '2025-11-19', 'Other', 2, 0);


INSERT INTO "events" (name, datetime, venue, type, shelter_id, notes)
VALUES
-- Upcoming Events
('Holiday Fundraiser', '2025-12-15 18:00:00-06', 'Community Hall', 'Fundraiser', NULL, 'Annual holiday fundraising event'),
('Winter Coat Drive', '2025-12-20 10:00:00-06', 'Micah''s Mission - Basement', 'Community Events', 1, 'Collecting coats for families in need'),
('Soup Kitchen Prep', '2025-12-22 09:00:00-06', 'Kitchen', 'Large Volunteer Event', NULL, 'Preparing meals for the community'),
('Neighborhood Clean-Up', '2025-12-28 08:30:00-06', 'Bright Sky', 'Community Events', NULL, NULL),

-- Past Events
('Summer Picnic', '2025-06-10 12:00:00-06', 'Community Picnic', 'Community Events', NULL, 'Fun picnic with games and food'),
('Back-to-School Drive', '2025-08-20 14:00:00-06', 'Dorothy Day Food Pantry', 'Fundraiser', 2, 'Supplies for students'),
('Volunteer Appreciation Night', '2025-09-15 18:30:00-06', 'Silver Linings', 'Other', NULL, 'Celebrating our volunteers'),

-- Misc
('Emergency Shelter Setup', '2025-11-05 16:00:00-06', 'Micah''s Mission - Pantry', 'Large Volunteer Event', 1, 'Preparing emergency kits'),
('Community Art Fair', '2025-10-12 10:00:00-06', 'Community Hall', 'Community Events', NULL, 'Local artists showcase'),
('Charity Auction', '2025-11-22 19:00:00-06', 'Community Hall', 'Fundraiser', NULL, 'Auction to support programs');


INSERT INTO "donors" (name, type)
VALUES
('Bob Johnson', 'person'),
('Faith Helpers', 'group'),
('Community Giving Circle', 'group'),
('Anonymous Donor', 'person'),
('Silver Linings Foundation', 'group');

INSERT INTO "donations" (
  "donor_id",
  "date",
  "amount",
  "notable",
  "restricted",
  "notes"
)
VALUES
(1, '2025-01-05', 150.00, FALSE, FALSE, 'Monthly support donation'),
(2, '2025-01-12', 500.00, TRUE,  FALSE, 'Group fundraiser contribution'),
(3, '2025-02-03', 250.00, FALSE, TRUE,  'Restricted for food pantry'),
(4, '2025-02-10', 75.00,  FALSE, FALSE, 'Anonymous cash donation'),
(1, '2025-03-01', 200.00, TRUE,  FALSE, 'Winter support donation'),
(5, '2025-03-15', 1000.00, TRUE,  TRUE,  'Annual grant restricted to shelter services');

VALUES
-- December 2025
(1, DATE '2025-12-01', 90.5, 12000.00, 5000.00, 2, 1, 1, 'All systems normal'),
(2, DATE '2025-12-01', 85.0, 15000.00, 7000.00, 3, 2, 0, 'Preparing for winter'),
-- January 2026
(1, DATE '2026-01-01', 88.0, 12500.00, 5000.00, 1, 2, 1, 'Monthly maintenance completed'),
(2, DATE '2026-01-01', 80.0, 15500.00, 7000.00, 4, 1, 2, 'New lease agreements starting');

-- Insert Media data
INSERT INTO media_stats (
    month_date, platform, total_visits, unique_visits, pageviews, bounce_rate, social_views, audience_start, audience_end, total_sent, total_opens, open_rate, total_clicks, click_rate, notes
) VALUES
-- Website
('2025-01-01', 'Website', 2800, 2300, 4900, 62, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'January Website Metrics'),
('2025-02-01', 'Website', 4200, 3600, 6200, 76, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'February Website Metrics'),
('2025-03-01', 'Website', 4000, 3500, 5600, 79.79, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'March Website Metrics'),

-- Facebook
('2025-01-01', 'Facebook', NULL, NULL, NULL, NULL, 24622, 6002, 6008, NULL, NULL, NULL, NULL, NULL, 'January Facebook Metrics'),
('2025-02-01', 'Facebook', NULL, NULL, NULL, NULL, 42648, 6005, 6031, NULL, NULL, NULL, NULL, NULL, 'February Facebook Metrics'),
('2025-03-01', 'Facebook', NULL, NULL, NULL, NULL, 31550, 6031, 6045, NULL, NULL, NULL, NULL, NULL, 'March Facebook Metrics'),

-- Instagram
('2025-05-01', 'Instagram', NULL, NULL, NULL, NULL, 916, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'May Instagram Metrics'),
('2025-06-01', 'Instagram', NULL, NULL, NULL, NULL, 212, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'June Instagram Metrics'),

-- TikTok
('2025-11-01', 'TikTok', NULL, NULL, NULL, NULL, 523, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'November TikTok Metrics'),
('2025-12-01', 'TikTok', NULL, NULL, NULL, NULL, 838, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'December TikTok Metrics'),

-- Newsletter
('2025-10-24', 'Newsletter', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2998, 786, 13.10, 118, 4, 'Oct 24 Newsletter'),
('2025-10-31', 'Newsletter', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2995, 537, 18.10, 79, 2.70, 'Oct 31 Newsletter'),
('2025-11-07', 'Newsletter', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2996, 544, 18.30, 82, 2.80, 'Nov 7 Newsletter');


INSERT INTO "housing_building" (name)
VALUES
('Bright Sky Apartments'),
('Silver Linings Apartments'),
('Micah''s Mission');


INSERT INTO housing (
    housing_building_id, month_date, occupancy_percent, operational_reserves, replacement_reserves,
    current_vacancies, upcoming_vacancies, upcoming_new_leases, notes
)
VALUES
-- Bright Sky Apartments
(1, '2025-09-01', 91.0, 11500, 4800, 2, 1, 1, 'September data'),
(1, '2025-10-01', 89.5, 11800, 4900, 3, 1, 2, 'October data'),
(1, '2025-11-01', 90.5, 12000, 5000, 3, 1, 2, 'November data'),
(1, '2025-12-01', 85.0, 12500, 5200, 4, 2, 1, 'December data initial'),

-- Silver Linings Apartments
(2, '2025-09-01', 93.0, 14500, 5800, 1, 0, 1, 'September data'),
(2, '2025-10-01', 91.5, 14800, 5900, 2, 1, 1, 'October data'),
(2, '2025-11-01', 92.0, 15000, 6000, 2, 0, 1, 'November data'),
(2, '2025-12-01', 88.0, 15500, 6200, 3, 1, 2, 'December data initial');