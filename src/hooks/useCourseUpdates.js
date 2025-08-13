'use strict'

import { axiosInstance } from '@/config/axiosConfig';
import { courseUpdates } from '@/config/endpoints';
import { oneHour } from '@/config/timeConstants';
import { useQuery, useQueryClient } from 'react-query';

/**
 * @function useCourseUpdates
 * @description Hook to get the academic institutions
 * @returns {useQuery}
 */

export function useCourseUpdates() {
  const queryClient = useQueryClient();
  return useQuery(
    ['courseUpdates'],
    () => axiosInstance.get(courseUpdates).then(res => res.data),
    {
      staleTime: oneHour,
      retry: false,
      onSuccess: data => {
        data?.forEach(course => {
          queryClient.setQueryData(['courseUpdates', course.course], course);
        });
      },
      onError: err => {
        console.error('Error fetching course updates');
      },
    }
  );
}


