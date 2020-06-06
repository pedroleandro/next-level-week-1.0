//importar dependência do sqlite3

var sqlite3 = require("sqlite3").verbose()

//objeto para operações no banco de dados
const db = new sqlite3.Database("./app/database/database.db")

module.exports = db

/* db.serialize(

    function () {

        // Cria a tabela
        db.run(`
                CREATE TABLE IF NOT EXISTS tb_point(
                    point_id integer PRIMARY KEY AUTOINCREMENT,
                    point_name varchar,
                    point_image varchar,
                    point_address varchar,
                    point_address2 varchar,
                    point_state varchar,
                    point_city varchar,
                    point_items varchar
                );
            `)

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
            "Corona",
            "https://bit.ly/3cEMoUj",
            "Nova Caxias",
            "Residencial n 2148",
            "Maranhão",
            "Caxias",
            "Lâmpadas, Pilhas e Baterias"
        ]

        function afterInsertData(err) {
            if(err){
                console.log(err)
            }

            console.log("Ponto de Coleta cadastrado com sucesso")
            console.log(this)
        }

        //db.run(query, values, afterInsertData)

        //Deletar um dado na tabela
        db.run(`DELETE FROM tb_point WHERE point_id = ?`, [2], function (err) {
            if(err){
                console.log(err)
            }

            console.log("Ponto de Coleta deletado com sucesso")
        })

        //Consultar os dados na tabela
        db.all(`SELECT * FROM tb_point`, function (err, rows) {
            if(err){
                console.log(err)
            }

            console.log("Lista de Pontos de Coletas")
            console.log(rows)
        })

        //Atualizar um dado na tabela
    }
) */
