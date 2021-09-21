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
}

function fillEmptyFieldsDataCep(dataCep: DataCep) {
    // Transformando o objeto em uma matriz
    const dataArray = Object.entries(dataCep).map((rowData) => [
        rowData[0],
        rowData[1].length === 0 ? 'Não possui' : rowData[1],
    ])

    // Transformando a matriz em objeto
    const formattedDataCep: DataCep = dataArray.reduce((obj, rowData) => {
        return { ...obj, [rowData[0]]: rowData[1] }
    }, {})

    return formattedDataCep
}

export { fillEmptyFieldsDataCep }
