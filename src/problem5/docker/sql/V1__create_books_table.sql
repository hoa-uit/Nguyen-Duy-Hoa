CREATE TABLE Books (
    id uuid DEFAULT public.uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    authors VARCHAR(255)[], -- Array of author names
    genre VARCHAR(50),
    is_deleted BOOLEAN DEFAULT FALSE, -- Indicates if the book is deleted
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);