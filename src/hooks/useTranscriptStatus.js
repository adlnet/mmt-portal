'use strict';

import { axiosInstance } from '@/config/axiosConfig';
import { oneHour } from '@/config/timeConstants';
import { transcriptStatus } from '@/config/endpoints';
import { useQuery, useQueryClient } from 'react-query';

/**
 * @function useTranscriptStatus
 * @description Hook to get the status of the transcript
 * @param {Object} transcriptStatusFilters
 * @returns {useQuery}
 */

export function useTranscriptStatus(transcriptStatusFilters = {}) {
  const queryClient = useQueryClient();

  // Convert filter obj to a query string for API request
  const queryStr = filters => {
    const params = new URLSearchParams();
    if (filters.status) {
      params.append('status', filters.status);
    }
    if (filters.branch) {
      params.append('branch', filters.branch);
    }
    if (filters.recent) {
      params.append('recent', 'true');
    }
    return String(params);
  };

  return useQuery(
    ['transcriptStatuses', transcriptStatusFilters],
    () => {
      const query = queryStr(transcriptStatusFilters);

      // If the query is not empty, get the filter data from the backend API (transcript-status/?xxx=yyy), otherwise get all the data (transcript-status/)
      let transcriptStatusUrl = transcriptStatus;
      if (query) {
        transcriptStatusUrl += '?' + query;
      }
      return axiosInstance.get(transcriptStatusUrl).then(res => res.data);
    },
    {
      staleTime: oneHour,
      retry: false,
      onSuccess: data => {
        data?.forEach(hit => {
          queryClient.setQueryData(['transcriptStatus', hit.id], hit);
        });
      },
      onError: err => {
        console.error('Error fetching transcript status');
      },
    }
  );
}
