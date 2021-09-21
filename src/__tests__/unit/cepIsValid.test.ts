import { cepIsValid } from "../../utils/cepIsValid"

describe('cepIsValid', () => {
    it('should be return true with cep to equal 64083080', () => {
        const cep = '64083080'

        const result = cepIsValid(cep)

        expect(result).toBe(true)
    })

    it('should be return false with cep to equal sajndasubdfu', () => {
        const cep = 'sajndasubdfu'

        const result = cepIsValid(cep)

        expect(result).toBe(false)
    })

    it('should be return false with cep to equal asdfghjk', () => {
        const cep = 'asdfghjk'

        const result = cepIsValid(cep)

        expect(result).toBe(false)
    })

    it('should be return false with cep to equal 64077850', () => {
        const cep = '64077850'

        const result = cepIsValid(cep)

        expect(result).toBe(true)
    })

    it('should be return false with cep to equal ?q=64083080', () => {
        const cep = '?q=64083080'

        const result = cepIsValid(cep)

        expect(result).toBe(false)
    })
})
