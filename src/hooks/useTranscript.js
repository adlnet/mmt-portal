'use strict';

import { axiosInstance } from '@/config/axiosConfig';
import { oneHour } from '@/config/timeConstants';
import { transcript } from '@/config/endpoints';
import { useQuery, useQueryClient } from 'react-query';

/**
 * @function useTranscriptStatus
 * @description Hook to get the modern transcripts
 * @returns {useQuery}
 */

export function useTranscript() {
  const queryClient = useQueryClient();
  return useQuery(
    ['transcripts'],
    () => axiosInstance.get(transcript).then(res => res.data),
    {
      staleTime: oneHour,
      retry: false,
      onSuccess: data => {
        data?.forEach(hit => {
          queryClient.setQueryData(['transcript', hit.id], hit);
        });
      },
      onError: err => {
        console.error('Error fetching transcript');
      },
    }
  );
}

/**
 * @function downloadTranscript
 * @description Function to download the Modern transcript
 * @param {string} id - Transcript ID
 */

export function downloadTranscript(id, lastName) {
  const last_name = lastName || "Chen"
  axiosInstance(`${transcript}${id}/`, { responseType: 'blob' })
    .then(res => {
      return res.data;
    })
    .then(blob => {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${last_name}_Modernized_transcript.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(link.href);
    })
    .catch(err => {
      console.error('Download failed');
    });
}

/**
 * @function openTranscript
 * @description Function to open the Modern transcript
 * mask the URL and open the transcript in a new tab
 * @param {string} id - Transcript ID
 */

export function openTranscript(id) {
  window.open(`${transcript}${id}/`);
}