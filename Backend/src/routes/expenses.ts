import express from 'express'
import { getExpenses, getExpense, createExpense, deleteExpense, patchExpense} from '../handlers/expenses'

const router = express()


router.get('/', getExpenses)

router.get('/:expenseId', getExpense)

router.post('/', createExpense)

router.patch('/:expenseId', patchExpense)

router.delete('/:expenseId', deleteExpense)


export default router




