import express  from "express";
import { createUser, deleteUser, getUserById, getUsers, updateUser, getPublicDetails} from "../handlers/users";


const router = express();

router.get('/', getUsers)
router.get('/:id', getUserById)

router.post('/', createUser)
router.delete('/:id', deleteUser)
router.patch('/:id',  updateUser)


//he URL /users/me can be used to return data from the current user. Many APIs, such as StackExchange, Facebook, Spotify and Google+ adopt this approach.
router.get('/me/publicDetails' , getPublicDetails)









export default router 