import { app } from '@/app'
import request from 'supertest'

describe('Check Eligibility (e2e)', async () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('[POST] /eligibility', async () => {
    const response = await request(app.server)
      .post('/eligibility')
      .send({
        numeroDoDocumento: '12345678901234',
        tipoDeConexao: 'bifasico',
        classeDeConsumo: 'residencial',
        modalidadeTarifaria: 'convencional',
        historicoDeConsumo: [1000, 475, 342],
      })

    expect(response.statusCode).toEqual(200)
    expect(response.body.elegivel).toEqual(true)
  })

  test('[POST] /eligibility with invalid data', async () => {
    const response = await request(app.server)
      .post('/eligibility')
      .send({
        numeroDoDocumento: '12345678901234',
        tipoDeConexao: 'tetrafasico',
        classeDeConsumo: 'residencial',
        modalidadeTarifaria: 'convencional',
        historicoDeConsumo: [1000, 475, 342],
      })

    expect(response.statusCode).toEqual(400)
    expect(response.body.message).toEqual('Validation error.')
  })
})
