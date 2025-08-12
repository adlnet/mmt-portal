'use strict';

import { QueryClientWrapper } from '@/__mocks__/queryClientMock';
import { renderHook, waitFor } from '@testing-library/react';
import { useDeleteTranscriptStatus } from '@/hooks/useDeleteTranscriptStatus';
import mockAxios from 'jest-mock-axios';
import transcriptStatusTableData from '@/__mocks__/data/transcriptStatus.data';

// Mock the transcript status endpoints
jest.mock('@/config/endpoints', () => ({
  transcriptStatus: '/transcript-status/',
}));

const { mockTranscriptStatusData } = transcriptStatusTableData;

const wrapper = ({ children }) => (
  <QueryClientWrapper>{children}</QueryClientWrapper>
);

describe('useDeleteTranscriptStatus', () => {
  it('should make a delete call', async () => {
    mockAxios.delete.mockResolvedValueOnce({ data: mockTranscriptStatusData });

    const { result } = renderHook(() => useDeleteTranscriptStatus(), { wrapper });

    result.current.mutate(1);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockAxios.delete).toHaveBeenCalledTimes(1);
    expect(mockAxios.delete).toHaveBeenCalledWith('/transcript-status/1/');
  });
});