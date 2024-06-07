const db = require('./db')

const Post = db.sequelize.define('postagens', {
    titulo: {
        type: db.Sequelize.STRING
    },
    conteudo: {
        type: db.Sequelize.TEXT
    }
})

// Use o Comando a baixo para executar a criação da tabela corretamente
// Post.sync({force: true})

module.exports = Post