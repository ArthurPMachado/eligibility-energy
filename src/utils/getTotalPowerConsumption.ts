export function getTotalPowerConsumption(historicoDeConsumo: number[]): number {
  return historicoDeConsumo.reduce((total, currentValue) => {
    return total + currentValue
  }, 0)
}
