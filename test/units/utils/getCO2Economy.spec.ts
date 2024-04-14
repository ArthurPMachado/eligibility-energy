import { getCO2Economy } from '@/utils/getCO2Economy'
import { getTotalPowerConsumption } from '@/utils/getTotalPowerConsumption'
import { historicConsumption } from 'test/data/historicConsumption'

describe('Get Total of Power Consumption', () => {
  it('should return the total power consumption', async () => {
    const totalPowerConsumption = getTotalPowerConsumption(historicConsumption)

    const co2Economy = getCO2Economy(totalPowerConsumption)

    expect(totalPowerConsumption).to.be.greaterThan(co2Economy)
    expect(co2Economy).to.be.lessThan(10000)
  })
})
