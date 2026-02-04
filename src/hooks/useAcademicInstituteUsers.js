'use strict'

import { academicInstituteUsers } from '@/config/endpoints';
import { axiosInstance } from '@/config/axiosConfig';
import { oneHour } from '@/config/timeConstants';
import { useQuery } from 'react-query';

/**
 * @function useAcademicInstituteUsers
 * @description Hook to get the academic institute users
 * @returns {useQuery}
 */

export function useAcademicInstituteUsers() {
  return useQuery(
    ['academicInstituteUsers'],
    () => axiosInstance.get(academicInstituteUsers).then(res => res.data),
    {
      staleTime: oneHour,
      retry: false,
      onError: err => {
        console.error('Error fetching academic institute users');
      },
    }
  );
}
