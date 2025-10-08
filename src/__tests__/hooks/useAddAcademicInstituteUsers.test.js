'use strict'

import { QueryClientWrapper } from '@/__mocks__/queryClientMock';
import { act, renderHook, waitFor } from '@testing-library/react';
import { useAddAcademicInstituteUsers } from '@/hooks/useAddAcademicInstituteUsers';
import mockAxios from 'jest-mock-axios';

jest.unmock('@/hooks/useAddAcademicInstituteUsers');

const wrapper = ({ children }) => (
  <QueryClientWrapper>{children}</QueryClientWrapper>
);

describe('useAddAcademicInstituteUsers', () => {
  beforeEach(() => {
    mockAxios.reset();
  });

  it('should successfully add a new user', async () => {
    const mockResponse = {
      data: {
        id: 1,
        members: [
          {
            email: 'test@example.com',
            first_name: 'DDD',
            last_name: 'OOO',
            position: 'Tester'
          }
        ]
      }
    };

    const userData = {
      email: 'test@example.com',
      first_name: 'DDD',
      last_name: 'OOO',
      position: 'Tester'
    };

    mockAxios.patch.mockResolvedValueOnce(mockResponse);

    const { result } = renderHook(() => useAddAcademicInstituteUsers(), { wrapper });

    act(() => {
      result.current.mutate({ instituteId: 1, userData });
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockAxios.patch).toHaveBeenCalledTimes(1);
  });

it('should handle error', async () => {
    const mockError = new Error('Failed to add user');
    mockAxios.patch.mockRejectedValueOnce(mockError);

    const userData = {
      email: 'test@example.com',
      first_name: 'DDD',
      last_name: 'OOO',
      position: 'Tester'
    };

    const { result } = renderHook(() => useAddAcademicInstituteUsers(), { wrapper });

    act(() => {
      result.current.mutate({ instituteId: 1, userData });
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toEqual(mockError);
    expect(mockAxios.patch).toHaveBeenCalledTimes(1);
  });
});
