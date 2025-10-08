'use strict'

import { academicInstituteUsers } from '@/config/endpoints';
import { axiosInstance } from '@/config/axiosConfig';
import { useMutation, useQueryClient } from 'react-query';

/**
 * @function useAddAcademicInstituteUser
 * @description Hook to add a new user to academic institute
 * @returns {useMutation}
 */

export function useAddAcademicInstituteUsers() {
  const queryClient = useQueryClient();
  
  return useMutation(
    ({ instituteId, userData }) => 
      axiosInstance.patch(`${academicInstituteUsers}${instituteId}/`, {
        members: [userData]
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['academicInstituteUsers']);
      },
      onError: (err) => {
        console.error('Error adding new user:');
      },
    }
  );
}
