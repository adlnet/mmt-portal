'use strict'

import { axiosInstance } from '@/config/axiosConfig'
import { transcriptStatus } from '@/config/endpoints'
import { useMutation, useQueryClient } from 'react-query'

const deleteSearch = async (id) => await axiosInstance.delete(`${transcriptStatus}${id}/`);

/**
 * @function useDeleteTranscriptStatus
 * @description Hook to delete the transcript status
 * @returns {useMutation}
 */

export function useDeleteTranscriptStatus() {
  const queryClient = useQueryClient();

  return useMutation((id) => deleteSearch(id), {
    onSettled: () => {
      queryClient.invalidateQueries(['transcriptStatuses']);
    },
    onError: err => {
      console.error('Error deleting transcript status');
    },
  });
}