const express = require("express")
const helmet = require("helmet")
const carsRouter = require("./cars/cars-router.js")

const server = express()
const HOST = process.env.HOST || "localhost"
const PORT = process.env.PORT || 5000

server.use(helmet())
server.use(express.json())

server.use("/api/cars", carsRouter)
server.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({ message: "Something went wrong." })
})

server.listen(PORT, HOST, () => {
    console.log(`\nRunning on http://${HOST}:${PORT}\n`)
})