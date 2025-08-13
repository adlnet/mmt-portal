'use strict'

import { academicInstitute } from '@/config/endpoints';
import { axiosInstance } from '@/config/axiosConfig';
import { oneHour } from '@/config/timeConstants';
import { useQuery, useQueryClient } from 'react-query';

/**
 * @function useAcademicInstitute
 * @description Hook to get the academic institutions
 * @returns {useQuery}
 */

export function useAcademicInstitute() {
  const queryClient = useQueryClient();
  return useQuery(
    ['academicInstitutes'],
    () => axiosInstance.get(academicInstitute).then(res => res.data),
    {
      staleTime: oneHour,
      retry: false,
      onSuccess: data => {
        data?.forEach(institute => {
          queryClient.setQueryData(['academicInstitute', institute.id], institute);
        });
      },
      onError: err => {
        console.error('Error fetching academic institutes');
      },
    }
  );
}


