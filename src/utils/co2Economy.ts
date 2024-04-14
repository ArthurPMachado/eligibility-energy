export function getCO2Economy(powerConsumption: number): number {
  const CO2PER1000KWH = 84

  const co2Economy = (powerConsumption * CO2PER1000KWH) / 1000

  return co2Economy
}
