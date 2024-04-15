import { classesConsumption } from '@/core/constants/classConsumption'
import { energyConnectionTypes } from '@/core/constants/energyConnection'
import { taxModalities } from '@/core/constants/taxModality'
import { isDocumentValid } from '@/utils/validateDocument'
import { z } from 'zod'

const [monofasico, ...outrasConexoes] = Object.keys(energyConnectionTypes)
const [residencial, ...outrasClasses] = Object.keys(classesConsumption)
const [azul, ...outrasModalidades] = Object.keys(taxModalities)

export const checkEligibilitySchema = z.object({
  numeroDoDocumento: z.string().refine((value) => isDocumentValid(value), {
    message: 'Invalid document, must be either CPF or CNPJ length',
  }),
  tipoDeConexao: z.enum([monofasico, ...outrasConexoes]),
  classeDeConsumo: z.enum([residencial, ...outrasClasses]),
  modalidadeTarifaria: z.enum([azul, ...outrasModalidades]),
  historicoDeConsumo: z.array(z.number().min(0).max(9999)).min(3).max(12),
})
