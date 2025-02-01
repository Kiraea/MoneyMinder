import express from 'express'
import { deleteCategory, getCategories, getCategoryById, createCategory, updateCategory } from '../handlers/categories'

const router = express()


router.get('/', getCategories)

router.get('/:categoryId', getCategoryById)

router.post('/', createCategory)

router.patch('/:categoryId', updateCategory)

router.delete('/:categoryId', deleteCategory)


export default router




