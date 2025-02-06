
import 'dotenv/config';
import passport, { serializeUser } from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import {pool} from '../index'
import { queries } from '../queries'
import argon from 'argon2'
import {Strategy as GoogleStrategy} from 'passport-google-oauth20'
import {Strategy as GithubStrategy} from 'passport-github2'
const findOrCreateGoogleUser = async (googleID: string, displayName: string) => {
    try{
        let result = await pool.query(queries.users.checkGoogleUserIfExistsQ, [googleID])
        if (result.rowCount === 0){
            let result2 = await pool.query(queries.users.createGoogleUser, ["google", googleID])



            try{
                let result = await pool.query(queries.categories.createCategoryQ, [result2.rows[0].id, "uncategorized", 'expenses'])
                let result4 = await pool.query(queries.categories.createCategoryQ, [result2.rows[0].id, "uncategorized", 'income'])
                let result5 = await pool.query(queries.categories.createCategoryQ, [result2.rows[0].id, "uncategorized", 'savings'])
            }catch(e){
                console.log(e)
            }


            if (result2.rowCount! > 0){
                return result2.rows[0]
            }
        }else{
            return result.rows[0]
        }
    }catch(e){
        console.log(e)
    }

}
const findOrCreateGithubUser = async (githubID: string, displayName: string) => {
    try{
        let result = await pool.query(queries.users.checkGithubUserIfExistsQ, [githubID])
        if (result.rowCount === 0){
            let result2 = await pool.query(queries.users.createGithubUserQ, ["github", githubID])
            try{
                let result = await pool.query(queries.categories.createCategoryQ, [result2.rows[0].id, "uncategorized", 'expenses'])
                let result4 = await pool.query(queries.categories.createCategoryQ, [result2.rows[0].id, "uncategorized", 'income'])
                let result5 = await pool.query(queries.categories.createCategoryQ, [result2.rows[0].id, "uncategorized", 'savings'])
            }catch(e){
                console.log(e)
            }


            if (result2.rowCount! > 0){
                return result2.rows[0]
            }
        }else{
            return result.rows[0]
        }
    }catch(e){
        console.log(e)
    }

}

passport.use(
    new LocalStrategy( {usernameField: "username", passwordField: "password"}, async (username,password, done) => {
        console.log("KDOAKDAOKDAOD")
        console.log(username, password)
        try{
            const findUser = await pool.query(queries.users.checkUserIfExistByUsernameQ, [username])
            if (findUser.rowCount === 0){
                throw new Error("User not found"); 
            }
            const user = findUser.rows[0]
            if (await argon.verify(user.password, password)){

                done(null, user) // sends data to the login passport.authenticate
            }else{
                throw new Error("Password Not Right")
            }
        }catch(e){
            done(e, false, {message: "incorrect password"})
            console.log(e)
        }

    })
)
//https://stackoverflow.com/questions/77697948/passport-js-google-oauth20-strategy-typescript-error


console.log(process.env.GOOGLE_CLIENT_ID)
 
passport.use(new GoogleStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID!,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: "http://localhost:3001/api/auth/google/callback"
  },
    async (accessToken, refreshToken, profile, done) => {
    try{
        const user = await findOrCreateGoogleUser(profile.id, profile.displayName)
        done(null, user)
    }catch(e){
        console.log(e)
    }

  }
));


passport.use(new GithubStrategy({
    clientID:process.env.GITHUB_CLIENT_ID!,
    clientSecret:process.env.GITHUB_CLIENT_SECRET!,
    callbackURL: "http://localhost:3001/api/auth/github/callback"
  },
    async (accessToken: string, refreshToken: string, profile: { id: string; displayName: string; }, done: (arg0: null, arg1: any) => void) => {
    try{
        const user = await findOrCreateGithubUser(profile.id, profile.displayName)
        done(null, user)
    }catch(e){
        console.log(e)
    }

  }
));

//https://stackoverflow.com/questions/66849999/how-to-fix-no-overload-matches-this-call-error-when-using-passport-serializeu
passport.serializeUser((user: any, done)=> {
    console.log("Serialize");
    done(null, user.id)
})

passport.deserializeUser(async (id, done)=> {
    console.log("DeSerialize");
    try {
        const findUser = await pool.query(queries.users.checkUserIfExistsQ, [id])
        if (findUser.rowCount! > 0){
            const user = findUser.rows[0]
            console.log(user);
            done(null, user)
        }else{
            throw new Error("invalid user desirialize")
        }
    }catch(e){
        done(e, null)
    }
})


