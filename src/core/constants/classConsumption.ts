export const classesConsumption = {
  residencial: 'residencial',
  industrial: 'industrial',
  comercial: 'comercial',
  rural: 'rural',
  poderPublico: 'poderPublico',
}

/**
 * The code create a anonymous function and calls right after it, passing the
 * classesConsumption object as an argument, destructure this object and return the
 * eligibleConsumptions
 */
export const eligibleConsumptions = (({
  rural,
  poderPublico,
  ...restConsumptions
}) => restConsumptions)(classesConsumption)
