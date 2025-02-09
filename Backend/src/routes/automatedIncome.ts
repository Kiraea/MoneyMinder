import express from 'express'
import { createAutomatedIncome, deleteAutomatedIncome, getAutomatedIncome, getAutomatedIncomeById,patchAutomatedIncome } from '../handlers/automatedIncome'

const router = express()


router.get('/', getAutomatedIncome)

router.get('/:automatedIncomeId', getAutomatedIncomeById)

router.post('/', createAutomatedIncome)

router.patch('/:automatedIncomeId', patchAutomatedIncome)

router.delete('/:automatedIncomeId',deleteAutomatedIncome)


export default router




