import express from 'express'
import { index, show } from "../controllers/usercontroller.js";

const route = express.Router()

route.get('/', index)
route.get('/:id', show)


export default route;