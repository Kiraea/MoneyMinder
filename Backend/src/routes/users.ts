import express  from "express";
import { createUser, deleteUser, getUserById, getUsers, updateUser } from "../handlers/users";


const router = express();

router.get('/', getUsers)
router.get('/:id', getUserById)

router.post('/', createUser)
router.delete('/:id', deleteUser)
router.patch('/:id',  updateUser)










export default router 