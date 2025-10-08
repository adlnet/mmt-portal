'use strict'

import { QueryClientWrapper } from '@/__mocks__/queryClientMock';
import { renderHook, waitFor } from '@testing-library/react';
import { useAcademicInstituteUsers } from "@/hooks/useAcademicInstituteUsers";
import academicInstituteData from '@/__mocks__/data/academicInstitute.data';
import mockAxios from 'jest-mock-axios';

jest.unmock('@/hooks/useAcademicInstituteUsers');

const { mockAcademicInstituteData } = academicInstituteData;

const wrapper = ({ children }) => (
  <QueryClientWrapper>{children}</QueryClientWrapper>
);

describe('useAcademicInstituteUsers', () => {
  it('should make an API call', async () => {
    mockAxios.get.mockResolvedValueOnce({ data: mockAcademicInstituteData });
    const { result } = renderHook(() => useAcademicInstituteUsers(), { wrapper });

    await waitFor(() => {
      expect(result.current.data).toEqual(mockAcademicInstituteData);
    });
  
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
  });

  it('should handle error', async () => {
    const mockError = new Error('Failed to fetch users');
    mockAxios.get.mockRejectedValueOnce(mockError);

    const { result } = renderHook(() => useAcademicInstituteUsers(), { wrapper });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

  });
});
