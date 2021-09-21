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
        const { cep } = request.params as RequestParams
        let dataCep: DataCep = {}

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
                if (!dataCep?.erro) {
                    dataCep = fillEmptyFieldsDataCep(data)

                    // Adicionando o cep sem pontuações
                    dataCep = { ...dataCep, cep }

                    // Salvar dataCep no banco de dados
                    await addDoc(collectionCeps, dataCep)
                } else {
                    dataCep = { erro: true }
                }
            } catch {
                dataCep = { erro: true }
            }
        }

        return response.json(dataCep)
    },
}

export { CepController }
