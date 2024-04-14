import { getCO2Economy } from '@/utils/getCO2Economy'
import { getTotalPowerConsumption } from '@/utils/getTotalPowerConsumption'
import { consumptionHistory } from 'test/data/consumptionHistory'

describe('Get CO2 Economy', () => {
  it('should be able to get CO2 Economy from the last 12 months', async () => {
    const totalPowerConsumption = getTotalPowerConsumption(consumptionHistory)

    const co2Economy = getCO2Economy(totalPowerConsumption)

    expect(totalPowerConsumption).to.be.greaterThan(co2Economy)
    expect(co2Economy).to.be.lessThan(10000)
  })
})
