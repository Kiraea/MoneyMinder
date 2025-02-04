

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
    },
    categories: {
        getCategoriesQ: `
            SELECT *
            FROM categories c
            WHERE user_id = $1
        `,
        getCategoriesByIdQ: `
            SELECT *
            FROM categories c
            WHERE user_id = $1 c.id = $2 
        `,
        createCategoryQ: `
            INSERT INTO categories (user_id, name, type) VALUES ($1, $2, $3) RETURNING *
        `,
        updateCategoryQ: `

        `,
        deleteCategoryQ: `
            DELETE FROM categories c 
            WHERE c.user_id = $1 AND c.id = $2 
            RETURNING *
        `
    },
    expenses: {
        getExpensesQ: `
            SELECT e.id, e.user_id, e.description, e.amount, TO_CHAR(e.date, 'Mon DD, YYYY') as date
            c.name AS category_name
            FROM expenses e JOIN categories c
                            ON e.category_id = c.id
            WHERE e.user_id = $1
        `,
        getExpensesByIdQ: `
            SELECT *
            FROM expenses e
            WHERE e.user_id = $1 e.id = $2 
        `,
        createExpenseQ: `
            INSERT INTO expenses (user_id, description, category_id, amount, date) VALUES ($1, $2, $3, $4, $5) RETURNING *
        `,
        updateExpenseQ: `

        `,
        deleteExpenseQ:`
            DELETE FROM expenses e
            WHERE e.user_id = $1 AND e.id = $2 
            RETURNING *
        `,
    },



}

export {queries}