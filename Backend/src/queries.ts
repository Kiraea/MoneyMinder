

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
        `,
        findUncategorizedCategory: `
            SELECT c.id
            FROM categories c
            WHERE c.name = $1 AND c.user_id = $2
        `
    },
    expenses: {
        getExpensesQ: `
            SELECT e.id, e.user_id, e.description, e.amount, TO_CHAR(e.date, 'Mon DD, YYYY') as date,
            c.name AS category_name, c.id AS category_id
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

        deleteExpenseQ:`
            DELETE FROM expenses e
            WHERE e.user_id = $1 AND e.id = $2 
            RETURNING *
        `,
        batchUpdateExpensesCategoryQ:`
            UPDATE expenses
            SET category_id = $1
            WHERE user_id = $2 AND category_id = $3
            RETURNING *
        `
    },
    income: {
        getIncomeQ: `
            SELECT i.id, i.user_id, i.description, i.amount, TO_CHAR(i.date, 'Mon DD, YYYY') as date,
            c.name AS category_name, c.id AS category_id
            FROM income i JOIN categories c
                            ON i.category_id = c.id
            WHERE i.user_id = $1
        `,
        getIncomeByIdQ: `
            SELECT *
            FROM income i
            WHERE i.user_id = $1 i.id = $2 
        `,
        createIncomeQ: `
            INSERT INTO income (user_id, description, category_id, amount, date) VALUES ($1, $2, $3, $4, $5) RETURNING *
        `,

        deleteIncomeQ:`
            DELETE FROM income i 
            WHERE i.user_id = $1 AND i.id = $2 
            RETURNING *
        `,
        batchUpdateIncomeCategoryQ:`
            UPDATE income
            SET category_id = $1
            WHERE user_id = $2 AND category_id = $3
            RETURNING *
        `
    },
    savings: {
        getSavingsQ: `
            SELECT s.id, s.user_id, s.description, s.amount, TO_CHAR(s.date, 'Mon DD, YYYY') as date,
            c.name AS category_name, c.id AS category_id
            FROM savings s JOIN categories c
                            ON s.category_id = c.id
            WHERE s.user_id = $1
        `,
        getSavingsByIdQ: `
            SELECT *
            FROM savings s
            WHERE s.user_id = $1 s.id = $2 
        `,
        createSavingQ: `
            INSERT INTO savings (user_id, description, category_id, amount, date) VALUES ($1, $2, $3, $4, $5) RETURNING *
        `,

        deleteSavingQ:`
            DELETE FROM savings s 
            WHERE s.user_id = $1 AND s.id = $2 
            RETURNING *
        `,
        batchUpdateSavingsCategoryQ:`
            UPDATE savings 
            SET category_id = $1
            WHERE user_id = $2 AND category_id = $3
            RETURNING *
        `
    }



}

export {queries}