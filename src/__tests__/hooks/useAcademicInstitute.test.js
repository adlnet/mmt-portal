'use strict'

import { QueryClientWrapper } from '@/__mocks__/queryClientMock';
import { renderHook, waitFor } from '@testing-library/react';
import { useAcademicInstitute } from '@/hooks/useAcademicInstitute';
import academicInstituteData from '@/__mocks__/data/academicInstitute.data';
import mockAxios from 'jest-mock-axios';

jest.unmock('@/hooks/useAcademicInstitute');

const { mockAcademicInstituteData } = academicInstituteData;

const wrapper = ({ children }) => (
  <QueryClientWrapper>{children}</QueryClientWrapper>
);

describe('useAcademicInstitute', () => {
  it('should make an API call', async () => {
    mockAxios.get.mockResolvedValueOnce({ data: mockAcademicInstituteData });
    const { result } = renderHook(() => useAcademicInstitute(), { wrapper });

    await waitFor(() => {
      expect(result.current.data).toEqual(mockAcademicInstituteData);
    });
  
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
  });
});