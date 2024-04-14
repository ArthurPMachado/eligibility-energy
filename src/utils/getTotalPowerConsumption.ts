export function getTotalPowerConsumption(historicoDeConsumo: number[]): number {
  const totalConsumption = historicoDeConsumo.reduce((total, currentValue) => {
    return total + currentValue
  }, 0)

  return totalConsumption
}
