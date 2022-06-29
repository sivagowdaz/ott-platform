const { json } = require("express/lib/response")
const { pool } = require("../db")

const admin_checker = async(data) => {
    const { username, email } = data
    try {
        let db_user_data = await pool.query("select * from user_register where email = $1 and username = $2", [email, username])
        let is_admin = db_user_data.rows[0].is_admin
        console.log(is_admin)
        return is_admin
    } catch (error) {
        console.log(error.message)
        return false
    }
}

const create_content = async(req, res) => {
    const is_admin = await admin_checker(req.user)
    console.log("theht",is_admin)
    const {
        cat_id,
        cont_title,
        cont_desc,
        genre,
        duration,
        age_limit,
        release_time,
        ratting 
    } = req.body
    if (cat_id && cont_title && cont_desc && genre && duration && age_limit && release_time && ratting && is_admin) {
        try {
            let content_created = await pool.query("insert into content (cat_id, cont_title, cont_desc, genre, duration, age_limit, release_time, ratting) values($1, $2, $3, $4, $5, $6, $7, $8) returning *",[cat_id, cont_title, cont_desc, genre, duration, age_limit, release_time, ratting])
            console.log(content_created)
            return res.json(content_created.rows[0])
        } catch (error) {
            console.log("inside the catch")
            console.log(error.message)
            res.json({ "status": "something went wrong!! try again" })
        }
    }
}

const add_cast = async(req, res) => {
    const is_admin = await admin_checker(req.user)
    const cont_id = req.params.cont_id
    const {
        char1,
        char2,
        char3,
        char4,
        char5
    } = req.body
    if (is_admin) {
        try {
            let cast_info = await pool.query("insert into casting(cont_id, charectore1, charectore2, charectore3, charectore4, charectore5) values($1, $2, $3, $4, $5, $6) returning *", [cont_id, char1, char2, char3, char4, char5])
            console.log(cast_info)
            return res.json(cast_info.rows[0])
        } catch (error) {
            console.log(error.message)
            return res.json({"status":"something went wrong!! try again..."})
        }

    } else {
        res.json({"staus":"you do not have the admin previladge"})
    }
}


const add_crew = async(req, res) => {
    const is_admin = await admin_checker(req.user)
    const cont_id = req.params.cont_id
    const {
        director,
        producer,
        music_dir,
        DOP,
        camera_man
    } = req.body
    if (is_admin) {
        try {
            let crew_info = await pool.query("insert into crew(cont_id, director, producer, music_dir, DOP, camera_man) values($1, $2, $3, $4, $5, $6) returning *", [cont_id, director, producer, music_dir, DOP, camera_man])
            console.log(crew_info)
            return res.json(crew_info.rows[0])
        } catch (error) {
            console.log(error.message)
            return res.json({ "status": "something went wrong!! try again..." })
        }

    } else {
        res.json({ "staus": "you do not have the admin previladge" })
    }
}


const get_contents = async(req, res) => {
    let type = req.query.type
    let cat_id;
    if (type === "movie") {
        cat_id = 1
    }
    else if (type === "series") {
        cat_id = 2
    } else if (type === "serial") {
        cat_id = 3
    }

    if (req.user) {
        try {
            requested_content = cat_id && await pool.query("select * from content where cat_id = $1", [cat_id])
            return res.json(requested_content.rows)
        } catch (error) {
            console.log(error.message)
            return res.json({"status":"something went wrong! try again..."})
        }
    } else {
        return json({"status":"access denied"})
    }
}

const get_content = async(req, res) => {
    const { cont_id } = req.params
    if (req.user) {
        try {
            req_content = await pool.query("select * from content where cont_id = $1", [cont_id])
            console.log(req_content)
            return res.json(req_content.rows[0])
        } catch (error) {
            console.log(error.message)
            return res.json({ "status": "something went wrong!! try again.." })
        }
    } else {
        return res.json({"status":"access denaid"})
    }
}

const update_content = async(req, res) => {
    const is_admin = admin_checker(req.user)
    const {cont_id} = req.params
    const {
        cat_id,
        cont_title,
        cont_desc,
        genre,
        duration,
        age_limit,
        release_time,
        ratting
    } = req.body
    console.log("the content values", req.body)
    if (is_admin) {
        try {
            const updated_content = await pool.query("update content set cat_id = $1, cont_title = $2, cont_desc = $3, genre = $4, duration = $5, age_limit = $6, release_time = $7, ratting = $8 where cont_id = $9", [cat_id, cont_title, cont_desc, genre, duration, age_limit, release_time, ratting, cont_id])
            console.log(updated_content)
            return res.json({"status":"content is updated successfully"})
        } catch (error) {
            console.log(error.message)
            return res.json({"status":"something went wrong!! try again.."})
        }
    } else {
        return res.json({"staus":"you are don not have the admin previladge"})
    }
}


const delete_content = async(req, res) => {
    const is_admin = admin_checker(req.user)
    const cont_id = req.params.cont_id
    if (is_admin) {
        try {
            await pool.query("delete from casting where cont_id = $1", [cont_id])
            await pool.query("delete from crew where cont_id = $1", [cont_id])
            await pool.query("delete from content_file where cont_id = $1", [cont_id])
            let deleted_cont = await pool.query("delete from content where cont_id = $1 returning *", [cont_id])
            console.log(deleted_cont)
            return res.json({ "status": "deleted the content successfully" })
        } catch (error) {
            console.log(error.message)
            return res.json({"status":"something went wrong!! try again.."})
        }
    } else {
        return res.json({"status":"you don not have the admin previladge"})
    }
}

const get_cont_detail = async(req, res) => {
    const cont_id = req.params.cont_id
    console.log(cont_id)
    try {
        let cont_detail = await pool.query("select * from content C, casting Ct, crew Cw where C.cont_id=Ct.cont_id and C.cont_id=Cw.cont_id and C.cont_id in($1)", [cont_id])
        let cont_d1 = await pool.query("select * from content where cont_id=$1",[cont_id])
        let cont_d2 = await pool.query("select * from casting where cont_id=$1",[cont_id])
        let cont_d3 = await pool.query("select * from crew where cont_id=$1", [cont_id])
        let cont_d4 = await pool.query("select * from content_file where cont_id=$1", [cont_id])
        res_obj = [{...cont_d1.rows[0]}, {...cont_d2.rows[0]}, {...cont_d3.rows[0]}, {...cont_d4.rows[0]}]
        res.status(200).json(res_obj)
        
    } catch (error) {
        console.logi=(error.message)
    }
}

const add_media_files = async (req, res) => {
    cont_id = req.params.cont_id
    const {image_url1, image_url2, vedio_url2 } = req.body
    const is_admin = admin_checker(req.user)

    try {
        if (is_admin) {
            let media_create_res = await pool.query("insert into content_file(cont_id, image_url1, image_url2, vedio_url2) values($1, $2, $3, $4) returning *", [cont_id, image_url1, image_url2, vedio_url2])
            res.status(200).json(media_create_res.rows[0])
        } else {
            return res.status(500).json({"status":"you do not have admin preveladge"})
        }
    } catch (error) {
        console.log(error.message)
    }
}

const update_cast = async (req, res) => {
    const is_admin = admin_checker(req.user)
    const { cont_id } = req.params
    const {
        charectore1,
        charectore2,
        charectore3,
        charectore4,
        charectore5
    } = req.body

    console.log("the cast valus ", req.body)
    try {
        if (is_admin) {
            let result = await pool.query("update casting set charectore1=$1, charectore2=$2, charectore3=$3, charectore4=$4, charectore5=$5 where cont_id=$6", [charectore1, charectore2, charectore3, charectore4, charectore5, cont_id])
            res.status(200).json(result)
        } else {
            res.status(500).json("you do not have the admin previladge")
        }
    } catch (error) {
        console.log(error)
        res.status(401).json("something went wrong")
    }
}

const update_crew = async (req, res) => {
    const is_admin = admin_checker(req.user)
    const { cont_id } = req.params
    const {
        director,
        producer,
        music_dir,
        DOP,
        camera_man
    } = req.body

    console.log("the crew data", req.body)
    try {
        if (is_admin) {
            let result = await pool.query("update crew set director=$1, producer=$2, music_dir=$3, DOP=$4, camera_man=$5 where cont_id=$6", [director, producer, music_dir, DOP, camera_man, cont_id])
            res.status(200).json(result)
        } else {
            res.status(401).json("you do not have the admin previladge")
        }
    } catch (error) {
        console.log(error)
    }
}

const update_media_files = async (req, res) => {
    const is_admin = admin_checker(req.user)
    const { cont_id } = req.params
    const {
        image_url1,
        image_url2,
        vedio_url2
    } = req.body
    
    console.log("the media data is", req.body)
    try {
        if (is_admin) {
            let result = await pool.query("update content_file set image_url1=$1, image_url2=$2, vedio_url2=$3 where cont_id=$4", [image_url1, image_url2, vedio_url2, cont_id])
            res.status(200).json(result)
        } else {
            res.status(400).json("you do not have the admin previladge")
        }
    } catch (error) {
        console.log(error)
        res.status(500).send("something went wrong....")
    }
}
const sort_content = async(req, res) => {
    let search_string = req.params.search
    string_array = search_string.split(" ")
    console.log("the search string is", search_string)
    try {
        let movie_result = await pool.query("select cont_id from content where to_tsvector(cont_title || ' ' || cont_desc) @@ plainto_tsquery($1) and cat_id=1", [search_string]) 
        let series_result = await pool.query("select cont_id from content where to_tsvector(cont_title || ' ' || cont_desc) @@ plainto_tsquery($1) and cat_id=2", [search_string]) 
        let serial_result = await pool.query("select cont_id from content where to_tsvector(cont_title || ' ' || cont_desc) @@ plainto_tsquery($1) and cat_id=3", [search_string]) 
        res.status(200).json({movies:movie_result.rows, series: series_result.rows, serials: serial_result.rows})
    }catch(error){
        console.log(error)
        res.send("something went wrong")
    }
}
module.exports = {
    create_content,
    add_cast,
    add_crew,
    get_contents,
    get_content,
    update_content,
    delete_content,
    get_cont_detail,
    add_media_files,
    update_cast,
    update_crew, 
    update_media_files,
    sort_content
}