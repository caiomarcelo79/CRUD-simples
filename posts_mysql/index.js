const express = require("express")
const app = express()
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const Post = require('./models/Post')
const { where } = require("sequelize")




// Conifg
    // Template Engine
        app.engine('handlebars', handlebars.engine({defaultLayout: 'main', runtimeOptions: {
            allowProtoPropertiesByDefault: true,
            allowProtoMethodsByDefault: true
        }}))
        app.set('view engine', 'handlebars')
    // Body Parser
        app.use(bodyParser.urlencoded({extended: false}))
        app.use(bodyParser.json())
        
// Rotas

    app.get("/", function(req, res){
        Post.findAll({order: [['id', 'DESC']]}).then(function(posts){
            res.render('home', {posts: posts})
        })
        
    })

    app.get("/cad", function(req, res){
        res.render('formulario')
    })

    app.post("/add", function(req, res){
        Post.create({
            titulo: req.body.titulo,
            conteudo: req.body.conteudo
        }).then(function(){
            res.redirect("/")
        }).catch(function(erro){
            res.send("Post NAO foi criado, verifique o ERRO: "+erro)
        })
    })

    app.get('/edit/:id', function(req, res){
        res.render('edicao')
        id_post = req.params.id
        return id_post
    })

    app.post('/edite', function(req, res){

        Post.update({
            titulo: req.body.titulo, 
            conteudo: req.body.conteudo
        }, {
            where: {'id': id_post}
        }).then(function(){
            res.redirect("/")
        }).catch(function(erro){
            res.send("Houve um erro: "+erro)
        })
        
    })

    app.get('/del/:id', function(req, res){
        Post.destroy({where: {'id': req.params.id}}).then(function(){
            res.render('deletado')
        }).catch(function(erro){
            res.send("esta postagem não existe: "+erro)
        })
    })


app.listen(process.env.PORT || 8081, function(){
    console.log("Servidor rodando na url http://localhost:8081")
})
//localhost:8081