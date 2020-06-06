var express = require("express")

var server = express()

//captura do banco de dados
var db = require("./database/db")

//configuração de recursos públicos
server.use(express.static(__dirname))

//habilitar uso do request body na api
server.use(express.urlencoded({ extended: true }))

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

    console.log(request.query)

    return response.render("create-point.html")
})

server.post("/create-point", function(request, response){
    /* console.log(request.body) */

    //Insere na tabela
    var query = `
    INSERT INTO tb_point(
        point_name,
        point_image,
        point_address,
        point_address2,
        point_state,
        point_city,
        point_items
    ) VALUES (?, ?, ?, ?, ?, ?, ?)`

    var values = [
        request.body.name,
        request.body.image,
        request.body.address,
        request.body.address2,
        request.body.state,
        request.body.city,
        request.body.itens
    ]

    function afterInsertData(err) {
        if(err){
            console.log(err)
        }

        console.log("Ponto de Coleta cadastrado com sucesso")
        console.log(this)
        return response.render("create-point.html", { saved: true })  
    }

    db.run(query, values, afterInsertData)
})

server.get("/search", function(request, response){

    let search = request.query.search

    if(search == ""){
        return response.render("search.html", { total: 0 })
    }

    //Consultar os dados na tabela
    db.all(`SELECT * FROM tb_point WHERE point_city LIKE '%${search}%'`, function (err, rows) {
        if(err){
            console.log(err)
        }

        /* console.log("Lista de Pontos de Coletas")
        console.log(rows) */
        let total = rows.length
        return response.render("search.html", { points: rows, total: total })
    })
})


//iniciar o servidor
server.listen(3000)