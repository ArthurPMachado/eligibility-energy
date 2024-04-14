import { getCO2Economy } from '@/utils/getCO2Economy'
import { getTotalPowerConsumption } from '@/utils/getTotalPowerConsumption'
import { historicConsumption } from 'test/data/historicConsumption'

describe('Get CO2 Economy', () => {
  it('should be able to get CO2 Economy from the last 12 months', async () => {
    const totalPowerConsumption = getTotalPowerConsumption(historicConsumption)

    const co2Economy = getCO2Economy(totalPowerConsumption)

    expect(totalPowerConsumption).to.be.greaterThan(co2Economy)
    expect(co2Economy).to.be.lessThan(10000)
  })
})
