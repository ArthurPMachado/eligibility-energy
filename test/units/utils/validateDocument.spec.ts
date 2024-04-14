import { isDocumentValid } from '@/utils/validateDocument'

describe('Validate Regex Document', () => {
  it('should be able to validate natural person document', async () => {
    const document = '12345678901'

    const isValidDocument = isDocumentValid(document)

    expect(isValidDocument).toEqual(true)
  })

  it('should be able to validate legal person document', async () => {
    const document = '12345678901234'

    const isValidDocument = isDocumentValid(document)

    expect(isValidDocument).toEqual(true)
  })

  it('should not be able to validate document', async () => {
    const extensiveDocument = '46575318753187536175831685'
    const shortDocument = '123456'

    const isValidExtensiveDocument = isDocumentValid(extensiveDocument)
    const isValidShortDocument = isDocumentValid(shortDocument)

    expect(isValidExtensiveDocument).toEqual(false)
    expect(isValidShortDocument).toEqual(false)
  })
})
