export interface IElegibleResponse {
  elegivel: boolean
  economiaAnualDeCO2: number
}

export interface IIneligibleResponse {
  elegivel: boolean
  razoesDeInelegibilidade: string[]
}
