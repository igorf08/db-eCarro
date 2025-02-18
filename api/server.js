const jsonServer = require('json-server')

const server = jsonServer.create()

const cors = require('cors');

const allowedOrigins = [
    'https://e-carro-souenergy.vercel.app/',
    'https://e-carro-souenergy.vercel.app/administracao',
    'https://e-carro-souenergy.vercel.app/administracao/criar',
    
]; 
const corsOption = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};

const fs = require('fs')
const path = require('path')
const filePath = path.join('db.json')
const data = fs.readFileSync(filePath, "utf-8");
const db = JSON.parse(data);
const router = jsonServer.router(db)

const middlewares = jsonServer.defaults()

server.use(cors(corsOption));
server.use(middlewares)
server.use(jsonServer.rewriter({
    '/api/*': '/$1',
    '/blog/:resource/:id/show': '/:resource/:id'
}))
server.use(router)
server.listen(3000, () => {
    console.log('JSON Server is running')
})

module.exports = server
