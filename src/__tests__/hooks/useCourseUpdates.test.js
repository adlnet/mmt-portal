'use strict'

import { QueryClientWrapper } from '@/__mocks__/queryClientMock';
import { renderHook, waitFor } from '@testing-library/react';
import { useCourseUpdates } from '@/hooks/useCourseUpdates';
import mockAxios from 'jest-mock-axios';
import transcriptData from '@/__mocks__/data/transcript.data';

jest.unmock('@/hooks/useCourseUpdates');

const { mockTranscriptData } = transcriptData;

const wrapper = ({ children }) => (
  <QueryClientWrapper>{children}</QueryClientWrapper>
);

describe('useCourseUpdate', () => {
  it('should make an API call', async () => {
    mockAxios.get.mockResolvedValueOnce({ data: mockTranscriptData });
    const { result } = renderHook(() => useCourseUpdates(), { wrapper });

    await waitFor(() => {
      expect(result.current.data).toEqual(mockTranscriptData);
    });
  
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
  });
  
});