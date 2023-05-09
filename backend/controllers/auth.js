const {pool} = require("../db")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcryptjs')




//MIDDLEWARE FUNCTION

const verify = async(req, res, next) => {
    const { email, password } = req.body

    let user = await pool.query("select * from user_register where email = $1", [email])
    let dbpassword
    let isMatch
    if (user.rows[0]) {
        dbpassword = user.rows[0].password
        isMatch = await bcrypt.compare(password, dbpassword)
        console.log("the password", isMatch)
    }
    if (isMatch) {
        req.user = user.rows[0]
        next()
    } else {
        res.json({ status: "Invalid password or email" })
    }
   
}

const verify_token = (req, res, next) => {
    const authToken = req.headers.authorization
    if (authToken) {
        let jwt_string = authToken.split(" ")[1]
        jwt.verify(jwt_string, process.env.SECRET, (err, user) => {
            if (err) {
                return res.json({status:"invalid token"})
            }
            req.user = user
            next()
        })
    } else {
        return res.json({"status":"authentication token is not provided"})
    }
}

const access_token_generator = (user) => {
    token = jwt.sign(user, process.env.SECRET, { expiresIn: '100m' })
    console.log(token)
    return token
}

const  refresh_token_generator = (user) => {
    token = jwt.sign(user, process.env.SECRET, { expiresIn: '1d' })
    console.log(token)
    return token
}


const register_user = async(req, res) => {
    const { username, email, password } = req.body
    
    try {
        const salt = await bcrypt.genSalt(10)
        let hashed_password = await bcrypt.hash(password, salt)
        newUser = await pool.query("insert into user_register (username, email, password, is_admin, is_staff, is_customer) values($1, $2, $3, $4, $5, $6) returning *", [username, email, hashed_password, null, null, 3])
        await pool.query("insert into userprofile (email) values($1)", [email])
        res.status(200).json(newUser.rows)
    } catch (error) {
        console.log("error found",error)
        res.json({ "status":"something went wrong!! try again..."})
    }
    
}

const register_admin = async(req, res) => {
    const { username, email, password, is_admin, is_staff, is_customer } = req.body
    console.log(username, is_admin, is_staff, is_customer, email, password)
    try {
        const salt = await bcrypt.genSalt(10)
        let hashed_password = await bcrypt.hash(password, salt)
        let db_user_data = await pool.query("select * from user_register where email = $1 and username = $2", [req.user.email, req.user.username])
        if (db_user_data.rows[0].is_admin) {
            newUser = await pool.query("insert into user_register (username, email, password, is_admin, is_staff, is_customer) values($1, $2, $3, $4, $5, $6) returning *", [username, email, hashed_password, is_admin, is_staff, is_customer])
            await pool.query("insert into userprofile (email) values($1)", [email])
            res.status(200).json(newUser.rows)
        } else {
            res.status(500).json({"error":"you are not the admin!!"})
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).json({"error":"something went wrong!! try again"})
    }
}



const login = async (req, res) => {
    try {
        user = req.user
        access_token = access_token_generator({ username: req.user.username, email: req.user.email })
        refresh_token = refresh_token_generator({ username: req.user.username, email: req.user.email })
        await pool.query("insert into refreshToken (refresh_token) values($1)", [refresh_token])
        res.json({ "tokens": { access_token, refresh_token }, user})
    } catch (error) {
        console.log(error.message)
    }
}

const get_refresh_token = async(req, res) => {
    const { refresh_token } = req.body
    
    if (refresh_token) {
        db_refrsh_token = await pool.query("select * from refreshToken where refresh_token = $1", [refresh_token])
        if (db_refrsh_token) {
            console.log(db_refrsh_token)
            jwt.verify(refresh_token, process.env.SECRET, (err, user) => {
                if (err) {
                    return res.json({ status: "invalid token" })
                }
                req.user = user
            })
        } else {
            return req.json({status: "refresh token not found in the database"})
        }
    } else {
        return req.json({status:"include the refresh token in body of the request"})
    }

    if (req.user) {
        const {username, email} = req.user
        new_access_token = access_token_generator({username,email})
        new_refresh_token = refresh_token_generator({username, email})
    } else {
        return res.status(400).json("please login again")
    }
    
    await pool.query("delete from refreshToken where refresh_token = $1", [refresh_token])
    await pool.query("insert into refreshToken (refresh_token) values($1)", [new_refresh_token])

    return res.json({access_token:new_access_token, refresh_token:new_refresh_token})

}

const get_all_users = async(req, res) => {
    const { username, email } = req.user
    console.log(username, email)
    let db_user_data = await pool.query("select * from user_register where email = $1 and username = $2", [email, username])
    console.log(db_user_data)
    let is_admin = db_user_data.rows[0].is_admin
    if (is_admin) {
        try {
            console.log("inside the try block")
            let all_users = await pool.query("select * from user_register")
            res.json(all_users.rows)
        } catch (error) {
            console.log(error.message)
            res.json({"status":"something went wrong!! try again.."})
        }
    } else {
        res.json({status:"you don't have the admin previladge"})
    }
}

const get_single_user = async(req, res) => {
    const { username, email } = req.user
    const { email: sentEmail } = req.params

    console.log(email, sentEmail)

    let db_user_data = await pool.query("select * from user_register where email = $1 and username = $2", [email, username])
    let is_admin = db_user_data.rows[0].is_admin
    // try {
    //     console.log('inside the try block')
    // } catch (error) {
    //     console.log(error)
    // }
    if (is_admin || email === sentEmail) {
        let required_user = await pool.query("select * from user_register where email = $1", [sentEmail])
        let user_profile = await pool.query("select * from userprofile where email = $1", [sentEmail])
        
        console.log(user_profile.rows[0])
        resdata = [required_user.rows[0], user_profile.rows[0] ]
        return res.json(resdata)
    } else {
        return res.json({"status":"you do not have the admin previladge"})
    }
}


const delete_user = async (req, res) => {

    let  { username, email } = req.user
    console.log("inside the delete user", username, email)
    tar_email = req.params.email
    console.log(req.body)
    console.log(tar_email)
    let db_user_data = await pool.query("select * from user_register where email = $1 and username = $2", [email, username])
    let is_admin = db_user_data.rows[0].is_admin

    if (is_admin) {
        try {
            await pool.query("delete from userprofile where email = $1", [tar_email])
            let response = await pool.query("delete from user_register where email = $1 returning *", [tar_email])
            response.rows[0].username && res.json("deleted successfully")
        } catch (error) {
            console.log(error.message)
            res.json({"status":"something went wrong!! try again.."})
        }
    } else {
        res.json({ status: "you don't have the admin previladge" })
    }
}

const update_user = async (req, res) => { 
    const {email:sentEmail} = req.query
    const { username, email } = req.user
    const { first_name, middle_name, last_name, about, image_url, user_email } = req.body
    

    let db_user_data = await pool.query("select * from user_register where email = $1 and username = $2", [email, username])
    let is_admin = db_user_data.rows[0].is_admin

    if (email === sentEmail || is_admin) {
        if (first_name || middle_name || last_name || about || image_url) {
            try {
                let updated_user = await pool.query("update userprofile set first_name = $1, middle_name = $2, last_name=$3, about = $4, image_url = $5 where email = $6", [first_name, middle_name, last_name, about, image_url, user_email])
                console.log("the updated user is", updated_user)
                console.log("the request body is", req.body)
                updated_user && res.json({ "status": "the user updated succesfully" })
            } catch (error) {
                console.log(error.message)
                return res.json({"status":"something went wrong!! try again..."})
            }
        }
    } else {
        return res.json({"status":"you do not have the admin previladge"})
    }

}

module.exports = {
    register_user,
    register_admin,
    login,
    verify,
    verify_token,
    get_all_users,
    get_single_user,
    delete_user,
    get_refresh_token,
    update_user
}

