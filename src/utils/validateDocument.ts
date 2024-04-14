import {
  legalPersonDocument,
  naturalPersonDocument,
} from '@/core/constants/documentNumber'

export function isDocumentValid(documentToValidate: string): boolean {
  const isNaturalPersonDocument = naturalPersonDocument.test(documentToValidate)
  const isLegalPersonDocument = legalPersonDocument.test(documentToValidate)

  if (!isNaturalPersonDocument && !isLegalPersonDocument) {
    return false
  }

  return true
}
