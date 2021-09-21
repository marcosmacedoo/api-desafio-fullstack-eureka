function cepIsValid(cep: string) {
    const cepIsNumber = Number(cep) || false
    return cepIsNumber && cep.length === 8
}

export { cepIsValid }
