'use strict'

import { QueryClientWrapper } from '@/__mocks__/queryClientMock';
import { renderHook, waitFor } from '@testing-library/react';
import { useAdditionalLearningUpdates } from '@/hooks/useAdditionalLearningUpdates';
import academicInstituteData from '@/__mocks__/data/academicInstitute.data';
import mockAxios from 'jest-mock-axios';

jest.unmock('@/hooks/useAdditionalLearningUpdates');

const { mockAcademicInstituteData } = academicInstituteData;

const wrapper = ({ children }) => (
  <QueryClientWrapper>{children}</QueryClientWrapper>
);

describe('useAdditionalLearningUpdates', () => {
  it('should make an API call', async () => {
    mockAxios.get.mockResolvedValueOnce({ data: mockAcademicInstituteData });
    const { result } = renderHook(() => useAdditionalLearningUpdates(), { wrapper });

    await waitFor(() => {
      expect(result.current.data).toEqual(mockAcademicInstituteData);
    });
  
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
  });

  it('should handle error', async () => {
    const mockError = new Error('Failed to fetch AI');
    mockAxios.get.mockRejectedValueOnce(mockError);

    const { result } = renderHook(() => useAdditionalLearningUpdates(), { wrapper });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });
  });
});
