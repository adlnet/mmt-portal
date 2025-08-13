'use strict';

import { axiosInstance } from '@/config/axiosConfig';
import { oneHour } from '@/config/timeConstants';
import { transcriptLegacy } from '@/config/endpoints';
import { useQuery, useQueryClient } from 'react-query';

/**
 * @function useTranscriptStatus
 * @description Hook to get the legacy transcripts
 * @returns {useQuery}
 */

export function useTranscriptLegacy() {
  const queryClient = useQueryClient();
  return useQuery(
    ['transcriptLegacies'],
    () => axiosInstance.get(transcriptLegacy).then(res => res.data),
    {
      staleTime: oneHour,
      retry: false,
      onSuccess: data => {
        data?.forEach(hit => {
          queryClient.setQueryData(['transcriptLegacy', hit.id], hit);
        });
      },
      onError: err => {
        console.error('Error fetching transcript Legacy');
      },
    }
  );
}

/**
 * @function downloadTranscript
 * @description Function to download the legacy transcript
 * @param {string} id - Transcript ID
 */

export function downloadTranscriptLegacy(id, lastName) {
  const last_name = lastName || "Chen"
  axiosInstance(`${transcriptLegacy}${id}/`, { responseType: 'blob' })
    .then(res => {
      return res.data;
    })
    .then(blob => {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${last_name}_Legacy_transcript.pdf`;
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
 * @function openTranscriptLegacy
 * @description Function to open the Legacy transcript
 * mask the URL and open the transcript in a new tab
 * @param {string} id - Transcript ID
 */

export function openTranscriptLegacy(id) {
  window.open(`${transcriptLegacy}${id}/`);
}