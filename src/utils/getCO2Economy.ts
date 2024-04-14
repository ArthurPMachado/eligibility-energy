export function getCO2Economy(powerConsumption: number): number {
  const CO2PER1000KWH = 84

  const co2EconomyTotal = (powerConsumption * CO2PER1000KWH) / 1000

  const co2Economy = Number(co2EconomyTotal.toFixed(2))

  return co2Economy
}
