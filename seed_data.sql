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
((SELECT id FROM volunteers WHERE name='Bob Smith'), '2025-10-10', 'Micah''s Mission - Basement', 20, 4),
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
('2026-01-01', 'TikTok', NULL, NULL, NULL, NULL, 910, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'January TikTok Metrics'),

-- Newsletter Metrics
('2025-08-15', 'Newsletter', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2950, 450, 15.3, 75, 2.5, 'Aug 15 Newsletter'),
('2025-09-01', 'Newsletter', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3000, 480, 16.0, 80, 2.7, 'September Newsletter'),
('2025-10-01', 'Newsletter', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3100, 510, 16.5, 95, 3.0, 'October Newsletter'),
('2025-11-01', 'Newsletter', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3200, 530, 16.6, 100, 3.1, 'November Newsletter'),
('2025-12-01', 'Newsletter', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3300, 560, 17.0, 110, 3.3, 'December Newsletter'),
('2026-01-01', 'Newsletter', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3400, 580, 17.1, 115, 3.4, 'January Newsletter');






/*shelter weekly "*/
INSERT INTO shelter_weekly (
  date,
  single_men,
  housing_men,
  single_women,
  housing_women,
  families,
  hybrid_va_holdover,
  incident_reports,
  community_members_served,
  nights_found_sleeping_outside,
  created_by,
  notes
) VALUES
('2025-07-01', 42, 18, 26, 12, 9, 6, 3, 28, 6, 1, 'Stable summer intake'),
('2025-07-08', 44, 19, 27, 12, 10, 6, 2, 31, 7, 1, 'Slight increase in single men'),
('2025-07-15', 45, 20, 28, 13, 10, 7, 4, 29, 8, 1, 'Increased outreach activity'),
('2025-07-22', 46, 20, 29, 14, 11, 7, 3, 34, 9, 1, 'Heat-related outreach'),
('2025-07-29', 48, 21, 30, 14, 11, 8, 5, 36, 10, 1, 'Peak summer demand'),

('2025-08-05', 47, 21, 29, 14, 12, 8, 3, 35, 9, 1, 'Consistent summer levels'),
('2025-08-12', 49, 22, 30, 15, 12, 8, 4, 38, 10, 1, 'Increased family units'),
('2025-08-19', 50, 22, 31, 15, 13, 9, 6, 40, 11, 1, 'High outreach week'),
('2025-08-26', 51, 23, 32, 16, 13, 9, 4, 42, 12, 1, 'End of summer surge'),

('2025-09-02', 49, 23, 31, 16, 12, 9, 3, 39, 10, 1, 'Back-to-school season'),
('2025-09-09', 50, 24, 32, 17, 12, 10, 4, 41, 11, 1, 'Stable occupancy'),
('2025-09-16', 52, 25, 33, 17, 13, 10, 5, 43, 12, 1, 'Gradual fall increase'),
('2025-09-23', 53, 25, 34, 18, 13, 10, 4, 45, 13, 1, 'More nights outside reported'),
('2025-09-30', 54, 26, 34, 18, 14, 11, 6, 46, 14, 1, 'Cooling temperatures'),

('2025-10-07', 55, 26, 35, 19, 14, 11, 5, 48, 15, 1, 'Cold-weather prep'),
('2025-10-14', 56, 27, 36, 19, 15, 12, 6, 50, 16, 1, 'Increased shelter usage'),
('2025-10-21', 57, 27, 37, 20, 15, 12, 7, 52, 17, 1, 'More incident reports'),
('2025-10-28', 58, 28, 38, 20, 16, 12, 6, 54, 18, 1, 'Approaching winter'),

('2025-11-04', 60, 29, 39, 21, 16, 13, 5, 56, 19, 1, 'Winter demand rising'),
('2025-11-11', 61, 30, 40, 21, 17, 13, 6, 58, 20, 1, 'Veterans outreach'),
('2025-11-18', 62, 30, 41, 22, 17, 14, 7, 60, 21, 1, 'Thanksgiving week'),
('2025-11-25', 63, 31, 42, 22, 18, 14, 6, 62, 22, 1, 'Holiday strain'),

('2025-12-02', 64, 32, 43, 23, 18, 15, 7, 65, 24, 1, 'Cold snap'),
('2025-12-09', 65, 32, 44, 23, 19, 15, 8, 67, 26, 1, 'Extreme weather'),
('2025-12-16', 66, 33, 45, 24, 19, 16, 7, 69, 27, 1, 'High winter occupancy'),
('2025-12-23', 67, 34, 46, 24, 20, 16, 6, 71, 28, 1, 'Holiday week'),
('2025-12-29', 68, 34, 47, 25, 20, 17, 5, 73, 29, 1, 'Year-end report');



/* finance weekly */
INSERT INTO finance_weekly (
  date,
  total_assets,
  operating_account_balance,
  bills_paid,
  payroll_paid,
  revenue_received,
  major_expenses,
  notes,
  created_by
) VALUES
('2025-07-01', 125000.00, 42000.00, 8200.00, 14500.00, 18000.00, 'Payroll, Utilities, Food supplies', 'Stable summer operations', 1),
('2025-07-08', 127300.00, 43800.00, 7900.00, 14500.00, 19500.00, 'Payroll, Facility maintenance', 'Small private donation received', 1),
('2025-07-15', 128900.00, 45200.00, 8600.00, 14500.00, 20000.00, 'Payroll, Outreach supplies', 'Community outreach grant', 1),
('2025-07-22', 130400.00, 46700.00, 9100.00, 14500.00, 20500.00, 'Payroll, HVAC repair', 'Unexpected repair expense', 1),
('2025-07-29', 132200.00, 48600.00, 8700.00, 14500.00, 21500.00, 'Payroll, Food program', 'End of month balance increase', 1),

('2025-08-05', 134000.00, 50500.00, 9200.00, 15000.00, 23000.00, 'Payroll, Insurance, Utilities', 'Insurance premium paid', 1),
('2025-08-12', 135800.00, 52200.00, 8900.00, 15000.00, 22500.00, 'Payroll, Program supplies', 'Steady operations', 1),
('2025-08-19', 137900.00, 54100.00, 9400.00, 15000.00, 24500.00, 'Payroll, Transportation', 'Transportation support grant', 1),
('2025-08-26', 139600.00, 55800.00, 9600.00, 15000.00, 25500.00, 'Payroll, Equipment purchase', 'Equipment upgrade completed', 1),

('2025-09-02', 141200.00, 57300.00, 9800.00, 15000.00, 26000.00, 'Payroll, Rent, Utilities', 'Start of fall programs', 1),
('2025-09-09', 143100.00, 59000.00, 10200.00, 15000.00, 27000.00, 'Payroll, Food supplies', 'Increased program usage', 1),
('2025-09-16', 145000.00, 60700.00, 9900.00, 15000.00, 27500.00, 'Payroll, Outreach materials', 'Strong donor engagement', 1),
('2025-09-23', 147100.00, 62600.00, 10400.00, 15000.00, 29500.00, 'Payroll, Winter prep supplies', 'Preparing for cold season', 1),
('2025-09-30', 149000.00, 64500.00, 10100.00, 15000.00, 29000.00, 'Payroll, Utilities', 'Stable close to Q3', 1),

('2025-10-07', 151300.00, 66500.00, 10800.00, 15500.00, 31000.00, 'Payroll, Heating systems', 'Cold weather transition', 1),
('2025-10-14', 153600.00, 68400.00, 11200.00, 15500.00, 32000.00, 'Payroll, Fuel, Maintenance', 'Higher heating costs', 1),
('2025-10-21', 155900.00, 70200.00, 11500.00, 15500.00, 32500.00, 'Payroll, Security upgrades', 'Safety improvements made', 1),
('2025-10-28', 158200.00, 72000.00, 11800.00, 15500.00, 33000.00, 'Payroll, Winter clothing', 'Winter gear distribution', 1),

('2025-11-04', 160800.00, 74100.00, 12000.00, 16000.00, 35000.00, 'Payroll, Utilities, Food', 'Increased demand', 1),
('2025-11-11', 163400.00, 76400.00, 11800.00, 16000.00, 36000.00, 'Payroll, Veterans services', 'Veterans Day support', 1),
('2025-11-18', 166100.00, 78800.00, 12500.00, 16000.00, 38000.00, 'Payroll, Holiday food supplies', 'Thanksgiving preparations', 1),
('2025-11-25', 168700.00, 81100.00, 12800.00, 16000.00, 39000.00, 'Payroll, Holiday outreach', 'Strong donor support', 1),

('2025-12-02', 171600.00, 83500.00, 13000.00, 16500.00, 40000.00, 'Payroll, Heating, Snow removal', 'Early winter storms', 1),
('2025-12-09', 174900.00, 86200.00, 13500.00, 16500.00, 43000.00, 'Payroll, Emergency supplies', 'Extreme cold response', 1),
('2025-12-16', 178200.00, 89000.00, 13800.00, 16500.00, 45000.00, 'Payroll, Gift cards, Supplies', 'Holiday assistance programs', 1),
('2025-12-23', 181500.00, 91800.00, 14000.00, 16500.00, 47000.00, 'Payroll, Holiday meals', 'Peak holiday giving', 1),
('2025-12-29', 185000.00, 94500.00, 13800.00, 16500.00, 46000.00, 'Payroll, Year-end adjustments', 'Year-end financial close', 1);


/*compliance weekly data*/

INSERT INTO compliance_weekly (
  date,

  hh_without_children,
  hh_with_children,

  adults,
  children,
  seniors_55_plus,

  female,
  male,
  other_gender,

  white,
  black_african_american,
  native_american,
  other_race,
  multi_racial,

  one_condition,
  two_conditions,
  three_plus_conditions,

  total_exits,
  created_by
) VALUES
-- JULY 2025
('2025-07-01', 32, 14, 68, 26, 12, 54, 50, 2, 34, 40, 6, 12, 14, 42, 26, 12, 6, 1),
('2025-07-08', 33, 14, 69, 27, 12, 55, 51, 2, 35, 41, 6, 12, 14, 43, 26, 12, 5, 1),
('2025-07-15', 34, 15, 71, 28, 13, 56, 54, 2, 36, 42, 6, 13, 14, 44, 27, 13, 7, 1),
('2025-07-22', 35, 15, 72, 29, 13, 57, 55, 2, 36, 43, 7, 13, 15, 45, 27, 13, 6, 1),
('2025-07-29', 36, 16, 74, 30, 14, 58, 58, 2, 37, 44, 7, 14, 16, 46, 28, 14, 8, 1),

-- AUGUST 2025
('2025-08-05', 36, 16, 75, 31, 14, 59, 59, 2, 38, 45, 7, 14, 16, 47, 28, 14, 6, 1),
('2025-08-12', 37, 17, 77, 32, 15, 60, 62, 2, 38, 46, 8, 15, 17, 48, 29, 15, 7, 1),
('2025-08-19', 38, 17, 78, 33, 15, 61, 63, 2, 39, 47, 8, 15, 17, 49, 29, 15, 8, 1),
('2025-08-26', 39, 18, 80, 34, 16, 62, 66, 2, 40, 48, 8, 16, 18, 50, 30, 16, 9, 1),

-- SEPTEMBER 2025
('2025-09-02', 38, 18, 79, 33, 16, 61, 65, 2, 39, 47, 8, 16, 17, 49, 30, 16, 7, 1),
('2025-09-09', 39, 18, 80, 34, 16, 62, 66, 2, 40, 48, 8, 16, 18, 50, 30, 16, 6, 1),
('2025-09-16', 40, 19, 82, 35, 17, 63, 69, 2, 41, 49, 9, 17, 18, 51, 31, 17, 8, 1),
('2025-09-23', 41, 19, 83, 36, 17, 64, 70, 2, 42, 50, 9, 17, 19, 52, 31, 17, 9, 1),
('2025-09-30', 42, 20, 85, 37, 18, 65, 73, 2, 43, 51, 9, 18, 19, 53, 32, 18, 7, 1),

-- OCTOBER 2025
('2025-10-07', 43, 20, 86, 38, 18, 66, 74, 2, 44, 52, 9, 18, 20, 54, 32, 18, 8, 1),
('2025-10-14', 44, 21, 88, 39, 19, 67, 77, 2, 45, 53, 10, 19, 20, 55, 33, 19, 9, 1),
('2025-10-21', 45, 21, 89, 40, 19, 68, 78, 2, 46, 54, 10, 19, 21, 56, 33, 19, 10, 1),
('2025-10-28', 46, 22, 91, 41, 20, 69, 81, 2, 47, 55, 10, 20, 21, 57, 34, 20, 9, 1),

-- NOVEMBER 2025
('2025-11-04', 47, 22, 92, 42, 20, 70, 82, 2, 48, 56, 10, 20, 22, 58, 34, 20, 8, 1),
('2025-11-11', 48, 23, 94, 43, 21, 71, 85, 2, 49, 57, 11, 21, 22, 59, 35, 21, 9, 1),
('2025-11-18', 49, 23, 95, 44, 21, 72, 86, 2, 50, 58, 11, 21, 23, 60, 35, 21, 10, 1),
('2025-11-25', 50, 24, 97, 45, 22, 73, 89, 2, 51, 59, 11, 22, 23, 61, 36, 22, 11, 1),

-- DECEMBER 2025
('2025-12-02', 51, 24, 98, 46, 22, 74, 90, 2, 52, 60, 11, 22, 24, 62, 36, 22, 10, 1),
('2025-12-09', 52, 25, 100, 47, 23, 75, 93, 2, 53, 61, 12, 23, 24, 63, 37, 23, 9, 1),
('2025-12-16', 53, 25, 101, 48, 23, 76, 94, 2, 54, 62, 12, 23, 25, 64, 37, 23, 8, 1),
('2025-12-23', 54, 26, 103, 49, 24, 77, 97, 2, 55, 63, 12, 24, 25, 65, 38, 24, 7, 1),
('2025-12-29', 55, 26, 104, 50, 24, 78, 98, 2, 56, 64, 12, 24, 26, 66, 38, 24, 6, 1);


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





DELETE FROM kitchen;
DELETE FROM pantry;
DELETE FROM hr_weekly;

-- KITCHEN SEED DATA
-- Columns: week_date, total_meals_served, notes
-- ============================================

INSERT INTO kitchen (week_date, total_meals_served, notes) VALUES
-- 2022 Data (Mondays)
('2022-01-10', 385, 'Cold weather, good turnout'),
('2022-03-14', 420, 'Spring increase in attendance'),
('2022-05-09', 395, 'Mother''s Day week'),
('2022-07-11', 410, 'Summer meals program active'),
('2022-09-12', 450, 'Back to school season'),
('2022-11-14', 510, 'Thanksgiving prep week'),

-- 2023 Data (Mondays)
('2023-01-09', 390, 'New Year operations'),
('2023-03-13', 435, 'Spring growth'),
('2023-05-08', 405, 'Steady mid-year operations'),
('2023-07-10', 425, 'Summer program running well'),
('2023-09-11', 465, 'Fall season begins'),
('2023-11-13', 520, 'Pre-Thanksgiving week busy'),

-- 2024 Data (Mondays)
('2024-01-08', 400, 'Strong start to year'),
('2024-03-11', 445, 'Spring attendance rising'),
('2024-05-13', 415, 'Mother''s Day preparation'),
('2024-07-08', 430, 'Summer meals steady'),
('2024-09-09', 475, 'Back to school rush'),
('2024-11-11', 530, 'Holiday season begins');

-- ============================================
-- PANTRY SEED DATA
-- Columns: week_date, first_time_households, returning_households, 
--          total_adults, total_children, total_seniors, total_pounds_distributed, notes
-- ============================================

INSERT INTO pantry (week_date, first_time_households, returning_households, total_adults, total_children, total_seniors, total_pounds_distributed, notes) VALUES
-- 2022 Data (Mondays)
('2022-01-10', 25, 120, 180, 95, 45, 3250, 'Winter demand high'),
('2022-03-14', 30, 135, 200, 105, 50, 3580, 'Spring distribution'),
('2022-05-09', 22, 128, 185, 100, 48, 3420, 'Steady distribution'),
('2022-07-11', 28, 130, 195, 98, 46, 3500, 'Summer operations'),
('2022-09-12', 32, 140, 210, 110, 52, 3750, 'Back to school support'),
('2022-11-14', 35, 150, 225, 120, 55, 4100, 'Thanksgiving week'),

-- 2023 Data (Mondays)
('2023-01-09', 27, 123, 185, 97, 46, 3300, 'Cold weather operations'),
('2023-03-13', 33, 137, 205, 108, 51, 3650, 'Spring increase'),
('2023-05-08', 24, 131, 190, 102, 49, 3480, 'Mid-spring distribution'),
('2023-07-10', 29, 133, 198, 100, 47, 3550, 'Summer steady'),
('2023-09-11', 34, 142, 215, 112, 53, 3800, 'Fall support programs'),
('2023-11-13', 38, 155, 230, 125, 58, 4200, 'Pre-Thanksgiving prep'),

-- 2024 Data (Mondays)
('2024-01-08', 28, 125, 188, 99, 47, 3350, 'New year demand'),
('2024-03-11', 35, 140, 210, 110, 52, 3700, 'Spring growth'),
('2024-05-13', 26, 135, 195, 105, 50, 3520, 'Mother''s Day week'),
('2024-07-08', 30, 136, 200, 103, 48, 3600, 'Summer distribution'),
('2024-09-09', 36, 145, 220, 115, 54, 3850, 'Back to school season'),
('2024-11-11', 40, 160, 240, 130, 60, 4300, 'Holiday season peak');

-- ============================================
-- HR SEED DATA
-- Columns: week_date, total_positions, open_positions, new_hires_this_week, 
--          employee_turnover, evaluations_due, notes
-- ============================================

INSERT INTO hr_weekly (week_date, total_positions, open_positions, new_hires_this_week, employee_turnover, evaluations_due, notes) VALUES
-- 2022 Data (Mondays)
('2022-01-10', 45, 5, 2, 1, 3, 'Q1 hiring season'),
('2022-03-14', 46, 4, 1, 0, 4, 'Spring staffing stable'),
('2022-05-09', 47, 3, 1, 0, 2, 'Mid-year hiring'),
('2022-07-11', 48, 4, 2, 1, 3, 'Summer positions filled'),
('2022-09-12', 47, 5, 1, 2, 5, 'Fall turnover'),
('2022-11-14', 48, 4, 2, 1, 6, 'Pre-holiday staffing'),

-- 2023 Data (Mondays)
('2023-01-09', 47, 5, 3, 1, 7, 'New year hiring push'),
('2023-03-13', 50, 3, 2, 0, 5, 'Growth phase'),
('2023-05-08', 51, 3, 1, 0, 4, 'Mid-spring stability'),
('2023-07-10', 51, 4, 1, 1, 3, 'Summer operations'),
('2023-09-11', 52, 2, 2, 0, 6, 'Strong retention'),
('2023-11-13', 53, 3, 1, 1, 8, 'Year-end planning'),

-- 2024 Data (Mondays)
('2024-01-08', 52, 4, 2, 1, 9, 'Annual review cycle'),
('2024-03-11', 53, 3, 1, 0, 5, 'Q1 stable'),
('2024-05-13', 54, 2, 3, 0, 4, 'Spring expansion'),
('2024-07-08', 55, 3, 1, 1, 6, 'Summer operations'),
('2024-09-09', 55, 2, 2, 1, 7, 'Fall hiring'),
('2024-11-11', 56, 3, 1, 0, 8, 'Holiday season staffing');

--- 2026 compliance data-----
-- SAMPLE DATA FOR JANUARY 2026
-- Compliance Weekly Reports
-- This data shows realistic growth trends for a homeless shelter/housing program

INSERT INTO compliance_weekly (
  date,
  hh_without_children,
  hh_with_children,
  adults,
  children,
  seniors_55_plus,
  female,
  male,
  other_gender,
  white,
  black_african_american,
  native_american,
  other_race,
  multi_racial,
  one_condition,
  two_conditions,
  three_plus_conditions,
  total_exits,
  created_by
) VALUES
-- JANUARY 2026
('2026-01-06', 56, 27, 106, 51, 25, 79, 100, 3, 57, 65, 13, 25, 22, 67, 39, 25, 8, 1),
('2026-01-13', 57, 27, 107, 52, 25, 80, 101, 3, 58, 66, 13, 25, 22, 68, 39, 25, 7, 1),
('2026-01-20', 58, 28, 109, 53, 26, 81, 104, 3, 59, 67, 14, 26, 22, 69, 40, 26, 9, 1),
('2026-01-27', 59, 28, 110, 54, 26, 82, 105, 3, 60, 68, 14, 26, 22, 70, 40, 26, 6, 1);

-- NOTES ON THE DATA:
-- Week of Jan 6: 83 total households, 182 total individuals (106 adults + 51 children + 25 seniors)
-- Week of Jan 13: 84 total households, 184 total individuals (107 adults + 52 children + 25 seniors)
-- Week of Jan 20: 86 total households, 188 total individuals (109 adults + 53 children + 26 seniors)
-- Week of Jan 27: 87 total households, 190 total individuals (110 adults + 54 children + 26 seniors)

-- Demographics verification for Jan 6:
-- Age: 106 + 51 + 25 = 182
-- Gender: 79 + 100 + 3 = 182
-- Race: 57 + 65 + 13 + 25 + 22 = 182
-- Conditions: 67 + 39 + 25 = 131 (individuals can have multiple conditions)

-- Demographics verification for Jan 13:
-- Age: 107 + 52 + 25 = 184
-- Gender: 80 + 101 + 3 = 184
-- Race: 58 + 66 + 13 + 25 + 22 = 184
-- Conditions: 68 + 39 + 25 = 132

-- Demographics verification for Jan 20:
-- Age: 109 + 53 + 26 = 188
-- Gender: 81 + 104 + 3 = 188
-- Race: 59 + 67 + 14 + 26 + 22 = 188
-- Conditions: 69 + 40 + 26 = 135

-- Demographics verification for Jan 27:
-- Age: 110 + 54 + 26 = 190
-- Gender: 82 + 105 + 3 = 190
-- Race: 60 + 68 + 14 + 26 + 22 = 190
-- Conditions: 70 + 40 + 26 = 136




-----shelter weekly data-----
INSERT INTO shelter_weekly (
    date,
    single_men,
    housing_men,
    single_women,
    housing_women,
    families,
    hybrid_va_holdover,
    incident_reports,
    community_members_served,
    nights_found_sleeping_outside,
    notes
) VALUES
(
    '2026-01-05',
    42, 18, 27, 14, 11, 6,
    3, 95, 12,
    'Cold weather surge; increased family intake after New Year.'
),
(
    '2026-01-12',
    45, 20, 29, 15, 13, 7,
    4, 102, 15,
    'Extreme cold week; additional outreach and warming resources used.'
),
(
    '2026-01-19',
    40, 22, 26, 17, 12, 5,
    2, 88, 10,
    'Slight decrease in incidents; more guests transitioned to housing.'
),
(
    '2026-01-26',
    38, 24, 25, 18, 14, 4,
    1, 91, 9,
    'End-of-month stabilization; improved housing placements.'
);
