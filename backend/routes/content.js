const express = require("express")
const { append } = require("express/lib/response")
const { verify_token } = require("../controllers/auth")
const router = express.Router()

const {
    create_content,
    get_contents,
    get_content,
    add_cast,
    add_crew,
    update_content,
    delete_content,
    get_cont_detail,
    add_media_files,
    update_cast,
    update_crew,
    update_media_files,
    sort_content

} = require("../controllers/content")

router.post("/create", verify_token, create_content)
router.post("/add_cast/:cont_id", verify_token, add_cast)
router.post("/add_crew/:cont_id", verify_token, add_crew)
router.get("/get_contents", verify_token, get_contents)
router.get("/get_content/:cont_id", verify_token, get_content)
router.put("/update_content/:cont_id", verify_token, update_content)
router.put("/update_cast/:cont_id", verify_token, update_cast)
router.put("/update_crew/:cont_id", verify_token, update_crew)
router.put("/update_mediafiles/:cont_id", verify_token, update_media_files)
router.delete("/delete_content/:cont_id", verify_token, delete_content)
router.get("/content_detail/:cont_id", verify_token, get_cont_detail)
router.post("/add_mediafiles/:cont_id", verify_token, add_media_files)
router.get("/sort_content/:search", verify_token, sort_content)


module.exports = router