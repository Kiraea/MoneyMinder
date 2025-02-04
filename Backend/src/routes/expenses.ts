import express from 'express'
import { getExpenses, getExpense, createExpense, deleteExpense, updateExpense} from '../handlers/expenses'

const router = express()


router.get('/', getExpenses)

router.get('/:expenseId', getExpense)

router.post('/', createExpense)

router.patch('/:expenseId', updateExpense)

router.delete('/:expenseId', deleteExpense)


export default router




