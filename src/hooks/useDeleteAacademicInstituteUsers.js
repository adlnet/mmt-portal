'use strict';

import { academicInstituteUsers } from '@/config/endpoints';
import { axiosInstance } from '@/config/axiosConfig';
import { useMutation, useQueryClient } from 'react-query';

/**
 * @function useDeleteAcademicInstituteUser
 * @description Hook to delete a user from AI by updating the entire user list
 * @returns {useMutation}
 */

export function useDeleteAcademicInstituteUsers() {
  const queryClient = useQueryClient();
  
  return useMutation(
    ({ instituteId, updatedUsers }) => 
      axiosInstance.put(`${academicInstituteUsers}${instituteId}/`, {
        institute: instituteId,
        members: updatedUsers.members,
        administrators: updatedUsers.administrators
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['academicInstituteUsers']);
      },
      onError: (err) => {
        console.error('Error deleting user:');
      },
    }
  );
}
