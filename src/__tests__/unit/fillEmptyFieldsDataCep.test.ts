import { DataCepModel } from '../../models/DataCepModel'
import { fillEmptyFieldsDataCep } from '../../utils/fillEmptyFieldsDataCep'

describe('fillEmptyFieldsDataCep', () => {
    it('should be fill in all fields with the value "Não possui"', () => {
        const dataCep: DataCepModel = {
            bairro: '',
            cep: '',
            complemento: '',
            ddd: '',
            gia: '',
            ibge: '',
            localidade: '',
            logradouro: '',
            siafi: '',
            uf: ''
        }

        const result = fillEmptyFieldsDataCep(dataCep)

        expect(result).toStrictEqual({
            bairro: 'Não possui',
            cep: 'Não possui',
            complemento: 'Não possui',
            ddd: 'Não possui',
            gia: 'Não possui',
            ibge: 'Não possui',
            localidade: 'Não possui',
            logradouro: 'Não possui',
            siafi: 'Não possui',
            uf: 'Não possui'
        })
    })

    it('should be fill in fields complemento and ibge with the value "Não possui"', () => {
        const dataCep: DataCepModel = {
            bairro: 'Parque Ideal',
            cep: '64083080',
            complemento: '',
            ddd: '86',
            gia: '121',
            ibge: '',
            localidade: 'Teresina',
            logradouro: 'Conjunto Redonda',
            siafi: '1213',
            uf: 'PI'
        }

        const result = fillEmptyFieldsDataCep(dataCep)

        expect(result).toStrictEqual({
            bairro: 'Parque Ideal',
            cep: '64083080',
            complemento: 'Não possui',
            ddd: '86',
            gia: '121',
            ibge: 'Não possui',
            localidade: 'Teresina',
            logradouro: 'Conjunto Redonda',
            siafi: '1213',
            uf: 'PI'
        })
    })

    it('should be return empty object', () => {
        const dataCep: DataCepModel = {}

        const result = fillEmptyFieldsDataCep(dataCep)

        expect(result).toStrictEqual({})
    })
})
