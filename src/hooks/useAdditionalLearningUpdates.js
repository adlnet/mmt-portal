'use strict'

import { additionalLearningUpdates } from '@/config/endpoints';
import { axiosInstance } from '@/config/axiosConfig';
import { oneHour } from '@/config/timeConstants';
import { useQuery, useQueryClient } from 'react-query';

/**
 * @function useAdditionalLearningUpdates
 * @description Hook to get the academic institutions
 * @returns {useQuery}
 */

export function useAdditionalLearningUpdates() {
  const queryClient = useQueryClient();
  return useQuery(
    ['additionalLearningUpdates'],
    () => axiosInstance.get(additionalLearningUpdates).then(res => res.data),
    {
      staleTime: oneHour,
      retry: false,
      onSuccess: data => {
        data?.forEach(course => {
          queryClient.setQueryData(['additionalLearningUpdates', course.course], course);
        });
      },
      onError: err => {
        console.error('Error fetching course updates');
      },
    }
  );
}


