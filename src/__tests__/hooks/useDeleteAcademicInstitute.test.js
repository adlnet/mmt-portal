'use strict';

import { QueryClientWrapper } from '@/__mocks__/queryClientMock';
import { renderHook, waitFor, act } from '@testing-library/react';
import { useDeleteAcademicInstituteUsers } from '@/hooks/useDeleteAacademicInstituteUsers';
import mockAxios from 'jest-mock-axios';

jest.unmock('@/hooks/useDeleteAacademicInstituteUsers');

const wrapper = ({ children }) => (
  <QueryClientWrapper>{children}</QueryClientWrapper>
);

describe('useDeleteAcademicInstituteUsers', () => {
  beforeEach(() => {
    mockAxios.reset();
  });

  it('should successfully delete a user', async () => {
    const mockResponse = {
      data: {
        id: 1,
        institute: 1,
        members: [
          {
            email: 'test@example.com',
            first_name: 'DDD',
            last_name: 'OOO',
            position: 'tester'
          }
        ],
        administrators: []
      }
    };

    const updatedUsers = {
      members: [
        {
          email: 'hahaha@example.com',
          first_name: 'haha',
          last_name: 'ahahah',
          position: 'User'
        }
      ],
      administrators: []
    };

        mockAxios.put.mockResolvedValueOnce(mockResponse);

    const { result } = renderHook(() => useDeleteAcademicInstituteUsers(), { wrapper });

    act(() => {
      result.current.mutate({ instituteId: 1, updatedUsers });
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });
  });

    it('should handle error', async () => {
        mockAxios.put.mockRejectedValueOnce(new Error('Error'));

        const { result } = renderHook(() => useDeleteAcademicInstituteUsers(), { wrapper });

        act(() => {
        result.current.mutate({ instituteId: 1, updatedUsers: { members: [], administrators: [] } });
        });

        await waitFor(() => {
        expect(result.current.isError).toBe(true);
        });
    });
});
