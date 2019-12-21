const express = require("express")
const db = require("../utils/db")

const router = express.Router()

router.get("/", async (req, res, next) => {
    try{
        res.json(await db('cars').select())
    }
    catch(err) {
        next(err)
    }
})

router.get("/:id", async (req, res, next) => {
    try{
        res.json(await db('cars').where('id', req.params.id).first())
    }
    catch(err) {
        next(err)
    }
})

router.post("/", async (req, res, next) => {
    try{
        const payload = {
            VIN: req.body.VIN,
            make: req.body.make,
            model: req.body.model,
            mileage: req.body.mileage
        }
        const [id] = await db('cars').insert(payload)
        res.json(await db('cars').where('id', id).first())
    }
    catch(err) {
        next(err)
    }
})

module.exports = router