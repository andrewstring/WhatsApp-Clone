const express = require("express")

port = 3900
const app = express()

app.use(express.static("build"))
app.listen(port, () => {
    console.log(`Server started on port: ${port}`)
})

app.get("/", () => {
    resizeBy.sendFile(path.join(__dirname), "index.html")
})