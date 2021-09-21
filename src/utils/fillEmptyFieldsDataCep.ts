import { DataCepModel } from '../models/DataCepModel'

function fillEmptyFieldsDataCep(dataCep: DataCepModel) {
    let formattedDataCepObject: DataCepModel = {}

    // Se o objeto estiver vazio
    if (Object.keys(dataCep).length > 0) {
        // Transformando o objeto em uma matriz
        const formattedDataCepArray = Object.entries(dataCep).map((rowData) => [
            rowData[0],
            rowData[1].length === 0 ? 'Não possui' : rowData[1],
        ])

        // Transformando a matriz em objeto
        formattedDataCepObject = Object.fromEntries(formattedDataCepArray)
    }

    return formattedDataCepObject
}

export { fillEmptyFieldsDataCep }
