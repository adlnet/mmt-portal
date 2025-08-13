'use strict'

import { axiosInstance } from '@/config/axiosConfig';
import { occupationUpdates } from '@/config/endpoints';
import { oneHour } from '@/config/timeConstants';
import { useQuery, useQueryClient } from 'react-query';

/**
 * @function useOccupationUpdates
 * @description Hook to get the academic institutions
 * @returns {useQuery}
 */

export function useOccupationUpdates() {
  const queryClient = useQueryClient();
  return useQuery(
    ['occupationUpdates'],
    () => axiosInstance.get(occupationUpdates).then(res => res.data),
    {
      staleTime: oneHour,
      retry: false,
      onSuccess: data => {
        data?.forEach(occupation => {
          queryClient.setQueryData(['useOccupationUpdates', occupation.course], occupation);
        });
      },
      onError: err => {
        console.error('Error fetching occupation updates');
      },
    }
  );
}


