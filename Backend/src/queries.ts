

const queries = {
    users: {
        checkUserIfExistsQ: `
            SELECT *
            FROM users u 
            WHERE u.id = $1;
        `,
        checkUserIfExistByUsernameQ: `
            SELECT *
            FROM users u 
            WHERE u.username = $1;       
        `,
        createUser: `
            INSERT INTO users (username, password, display_name) VALUES ($1, $2, $3) RETURNING *;
        `,
        checkGoogleUserIfExistsQ: `
            SELECT *
            FROM users u
            WHERE provider = 'google' AND provider_id = $1
        `,
        createGoogleUser:`
            INSERT INTO users (display_name, provider, provider_id ) VALUES ('user', $1, $2) RETURNING *;
        `,
        checkGithubUserIfExistsQ: `
            SELECT *
            FROM users u
            WHERE provider = 'github' AND provider_id = $1
        `,
        createGithubUserQ:`
            INSERT INTO users (display_name, provider, provider_id ) VALUES ('user', $1, $2) RETURNING *;
        `,
    }

}

export {queries}