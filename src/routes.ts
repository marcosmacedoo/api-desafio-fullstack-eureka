import express from 'express'
import { CepController } from './controllers/CepController'

const routes = express.Router()

routes.get('/cep/:cep', CepController.show)

export { routes }
