var express = require("express")

var server = express()

//configuração de recursos públicos
server.use(express.static(__dirname))

//utilizando template engines
var nunjucks = require("nunjucks")
nunjucks.configure(__dirname + "/views", {
    express: server,
    noCache: true
})

//configuração de rotas
server.get("/", function(request, response){
    //response.send("Welcome to NLW!")
    return response.render("index.html", { title: "Seu Marketplace de coleta de resíduos" })
})

server.get("/create-point", function(request, response){
    return response.render("create-point.html")
})

server.get("/search", function(request, response){
    return response.render("search.html")
})


//iniciar o servidor
server.listen(3000)