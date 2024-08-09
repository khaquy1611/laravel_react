import { useState } from 'react'
import { useQuery } from 'react-query'
import { getLocationData } from '@/services/BaseServices'

const useLocationState = () => {
  const [provinceId, setProvinceId] = useState<string | undefined>('')
  const [districtId, setDistrictId] = useState<string | undefined>('')
  const { isLoading: isProvinceLoading, data: provinces } = useQuery(
    ['provinces'],
    () => getLocationData('provinces', undefined)
  )
  const { isLoading: isDistrictLoading, data: districts } = useQuery(
    ['districts', provinceId],
    () => getLocationData('districts', provinceId),
    {
      enabled: !!provinceId,
    }
  )
  const { isLoading: isWardLoading, data: wards } = useQuery(
    ['wards', districtId],
    () => getLocationData('wards', districtId),
    {
      enabled: !!districtId,
    }
  )

  return {
    provinces: provinces || [],
    districts: districts || [],
    wards: wards || [],
    isProvinceLoading,
    isDistrictLoading,
    isWardLoading,
    setProvinceId,
    setDistrictId,
  }
}

export default useLocationState
