import express from 'express'
import { createIncome, deleteIncome, getIncome, getIncomeById, patchIncome } from '../handlers/income'

const router = express()


router.get('/', getIncome)

router.get('/:incomeId', getIncomeById)

router.post('/', createIncome)

router.patch('/:incomeId', patchIncome)

router.delete('/:incomeId', deleteIncome)


export default router




