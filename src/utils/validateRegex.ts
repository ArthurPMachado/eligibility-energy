import {
  legalPersonDocument,
  naturalPersonDocument,
} from '@/core/constants/documentNumber'

export function isValidDocument(valueToValidate: string): boolean {
  const isNaturalPersonDocument = naturalPersonDocument.test(valueToValidate)
  const isLegalPersonDocument = legalPersonDocument.test(valueToValidate)

  if (!isNaturalPersonDocument && !isLegalPersonDocument) {
    return false
  }

  return true
}
