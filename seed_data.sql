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
