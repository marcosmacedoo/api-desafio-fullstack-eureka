import { Request, Response } from 'express'
import {
    query,
    collection,
    where,
    getDocs,
    addDoc,
} from 'firebase/firestore/lite'

import { database } from '../database/database'
import { api } from '../services/api'
import { cepIsValid } from '../utils/cepIsValid'
import { fillEmptyFieldsDataCep } from '../utils/fillEmptyFieldsDataCep'

type RequestParams = {
    cep: string
}

type DataCep = {
    cep?: string
    logradouro?: string
    complemento?: string
    bairro?: string
    localidade?: string
    uf?: string
    ibge?: string
    gia?: string
    ddd?: string
    siafi?: string
    erro?: boolean
}

const collectionCeps = collection(database, 'ceps')

const CepController = {
    async show(request: Request, response: Response) {
        let dataCep: DataCep = {}
        let statusCode = 200
        const { cep } = request.params as RequestParams

        if (!cepIsValid(cep)) {
            statusCode = 400
            dataCep = { erro: true }
        } else {
            // Verificar se cep está no banco de dados
            const queryFindCep = query(collectionCeps, where('cep', '==', cep))
            const querySnapshot = await getDocs(queryFindCep)

            // Se encontrou o cep no banco
            if (!querySnapshot.empty) {
                querySnapshot.forEach((doc) => {
                    dataCep = doc.data()
                })
            } else {
                // Se não encontrou no banco
                try {
                    const responseApiViaCep = await api.get<DataCep>(
                        `${cep}/json/unicode`
                    )
                    const { data } = responseApiViaCep

                    // Verificando se a API ViaCEP retornou { erro: true }
                    if (!data?.erro) {
                        dataCep = fillEmptyFieldsDataCep(data)

                        // Adicionando o cep sem pontuações
                        dataCep = { ...dataCep, cep }

                        // Salvar dataCep no banco de dados
                        await addDoc(collectionCeps, dataCep)

                        statusCode = 201
                    } else {
                        dataCep = { erro: true }
                        statusCode = 404
                    }
                } catch {
                    dataCep = { erro: true }
                    statusCode = 404
                }
            }
        }

        return response.status(statusCode).json(dataCep)
    },
}

export { CepController }
