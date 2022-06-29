const express = require("express")
const router = express.Router()

const {
    register_user,
    register_admin,
    login,
    verify,
    get_refresh_token,
    verify_token,
    get_all_users,
    get_single_user,
    delete_user,
    update_user,
} = require("../controllers/auth")

router.post("/register", register_user)
router.post("/register-admin", verify_token, register_admin )
router.post("/login", verify, login)
router.post("/refresh_token", get_refresh_token)
router.get("/get_all_users", verify_token, get_all_users)
router.get("/get_single_user/:email", verify_token, get_single_user)
router.delete("/delete_user/:email", verify_token, delete_user), 
router.put("/update_user", verify_token, update_user), 



module.exports = router