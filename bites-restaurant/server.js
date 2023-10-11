const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()


server.use(middlewares)
server.use(router)
server.use((req, res, next) => {
    res.header('ACCESS-CONTROL-ALLOW-ORIGIN', 'https://bites-restaurant.onrender.com/menu'),
        res.header('ACCESS-CONTROL-ALLOW-Headers', '*')
})
server.listen(process.env.PORT || 4000, () => {
    console.log('JSON Server is running')
})
