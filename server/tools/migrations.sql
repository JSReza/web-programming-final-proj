-- Drop existing tables if they exist
DROP TABLE IF EXISTS friend_activities;
DROP TABLE IF EXISTS activities;
DROP TABLE IF EXISTS friends;

-- Create activities table
CREATE TABLE activities (
    id SERIAL PRIMARY KEY,
    type VARCHAR(100) NOT NULL,
    duration INTEGER NOT NULL,
    date TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create friends table
CREATE TABLE friends (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create friend_activities table
CREATE TABLE friend_activities (
    id SERIAL PRIMARY KEY,
    friend_id INTEGER REFERENCES friends(id) ON DELETE CASCADE,
    type VARCHAR(100) NOT NULL,
    duration INTEGER NOT NULL,
    date TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_friend_activities_friend_id_date ON friend_activities(friend_id, date);
CREATE INDEX idx_friend_activities_friend_id ON friend_activities(friend_id);

-- Insert sample data
INSERT INTO friends (name) VALUES
('Kendrick Lamar'),
('Billie Eilish');

INSERT INTO friend_activities (friend_id, type, duration, date) VALUES
(1, 'Boxing', 30, '2025-03-03 10:00:00'),
(1, 'Weight lifting', 30, '2025-03-02 15:00:00');