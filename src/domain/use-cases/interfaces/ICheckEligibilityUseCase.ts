import { Either } from '@/core/either'
import { IElegibleResponse, IIneligibleResponse } from './IEligibilityResponse'

export interface ICheckEligibilityUseCaseRequest {
  numeroDoDocumento?: string
  tipoDeConexao: string
  classeDeConsumo: string
  modalidadeTarifaria: string
  historicoDeConsumo: number[]
}

export type ICheckEligibilityUseCaseResponse = Either<
  IIneligibleResponse,
  IElegibleResponse
>
