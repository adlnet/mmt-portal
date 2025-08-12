'use strict';

import { QueryClientWrapper } from '@/__mocks__/queryClientMock';
import { renderHook, waitFor } from '@testing-library/react';
import { useTranscriptStatus } from '@/hooks/useTranscriptStatus';
import mockAxios from 'jest-mock-axios';
import transcriptStatusTableData from '@/__mocks__/data/transcriptStatus.data';

jest.unmock('@/hooks/useTranscriptStatus');

const wrapper = ({ children }) => (
  <QueryClientWrapper>{children}</QueryClientWrapper>
);

describe('useTranscriptStatus', () => {
  const { mockTranscriptStatusData } = transcriptStatusTableData;

  it('should get transcript status without filters', async () => {
    mockAxios.get.mockResolvedValueOnce({ data: mockTranscriptStatusData });

    const { result } = renderHook(() => useTranscriptStatus(), { wrapper });
    
    await waitFor(() => {
      expect(result.current.data).toEqual(mockTranscriptStatusData);
    });
  });

  it('should get transcript status with filters', async () => {
    const filters = {
      status: 'pending',
      branch: 'Air Force',
      recent: true
    };

    const filteredData = mockTranscriptStatusData.filter(item => item.status === 'Delivered' && item.academic_institute === 'Deloitte University');

    mockAxios.get.mockResolvedValueOnce({ data: filteredData });

    const { result } = renderHook(() => useTranscriptStatus(filters), { wrapper });

    await waitFor(() => {
      expect(result.current.data).toEqual(filteredData);
      expect(mockAxios.get).toHaveBeenCalledWith('/transcript-status/?status=pending&branch=Air+Force&recent=true');
    });
  });
});