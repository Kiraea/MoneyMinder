import express from 'express'
import { checkSessionToken, deleteSessionToken, githubLogin, googleLogin, login} from '../handlers/auth'
import passport from 'passport'

const router = express()


router.post('/login', passport.authenticate('local'), login);

router.get('/google/', passport.authenticate('google', {scope: ['profile']}))
router.get('/google/callback', passport.authenticate('google', {scope: ['profile'], failureRedirect: "/register"}), googleLogin)

router.get('/github/', passport.authenticate('github', {scope: ['profile']}))
router.get('/github/callback', passport.authenticate('github', {scope: ['profile'], failureRedirect: "/register"}), githubLogin)

router.post('/checkSessionToken', checkSessionToken)
router.post('/logout', deleteSessionToken)




export default router