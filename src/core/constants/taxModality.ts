/* eslint-disable @typescript-eslint/no-unused-vars */
export const taxModalities = {
  azul: 'azul',
  branca: 'branca',
  verde: 'verde',
  convencional: 'convencional',
}

/**
 * The code create a anonymous function and calls right after it, passing the
 * taxModalities object as an argument, destructure this object and return the
 * eligibleTaxModalities
 */
export const eligibleTaxModalities = (({ azul, verde, ...restModalities }) =>
  restModalities)(taxModalities)
