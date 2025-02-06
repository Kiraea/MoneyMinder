import express from 'express'
import { createSaving, deleteSaving, getSavingById, getSavings, patchSaving } from '../handlers/savings'

const router = express()


router.get('/', getSavings)

router.get('/:savingId', getSavingById)

router.post('/', createSaving)

router.patch('/:savingId', patchSaving)

router.delete('/:savingId', deleteSaving)


export default router




