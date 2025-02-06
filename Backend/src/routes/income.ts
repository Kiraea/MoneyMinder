import express from 'express'
import { createIncome, deleteIncome, getIncome, getIncomeById, patchIncome } from '../handlers/income'

const router = express()


router.get('/', getIncome)

router.get('/:expenseId', getIncomeById)

router.post('/', createIncome)

router.patch('/:expenseId', patchIncome)

router.delete('/:expenseId', deleteIncome)


export default router




