

const queries = {
    users: {
        checkUserIfExistsQ: `
            SELECT *
            FROM users u 
            WHERE u.username = $1;
        `,
        createUser: `
            INSERT INTO users (username, password, display_name) VALUES ($1, $2, $3) RETURNING *;
        `
    }

}

export {queries}