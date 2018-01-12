INSERT INTO users_helo (username, name, pictureUrl ) VALUES ($1, $2, $3)
RETURNING *;