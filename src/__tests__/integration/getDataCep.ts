import request from 'supertest'
import { app } from '../../app'

describe('GET /cep/:cep', () => {
    it('Should be returned status code 400 why cep 43522gg is invalid', async () => {
        const response = await request(app).get('/cep/43522gg')

        expect(response.statusCode).toBe(400)
    })

    it('Should be returned status code 404 why cep 12345678 not found API ViaCEP', async () => {
        const response = await request(app).get('/cep/12345678')

        expect(response.statusCode).toBe(404)
    })

    it('Should be returned status code 200 why cep 64083080 exists in database', async () => {
        const response = await request(app).get('/cep/64083080')

        expect(response.statusCode).toBe(200)
    })

    it('Should be returned status code 201 why cep 64480000 will saved in database', async () => {
        const response = await request(app).get('/cep/64480000')

        expect(response.statusCode).toBe(201)
    })
})
