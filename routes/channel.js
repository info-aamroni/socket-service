import express from 'express'

const route = express.Router()

route.get('/', (req, res) => {
    res.send({id: '1', name: 'Kabir Khan Channel'})
})

export default route;