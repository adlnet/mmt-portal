'use strict';

import { act, renderHook } from '@testing-library/react-hooks';
import { useTableSearch } from '@/hooks/useTableSearch';
import transcriptStatusTableData from '@/__mocks__/data/transcriptStatus.data';

const { mockTranscriptStatusData, emptyMockTranscriptStatusData} = transcriptStatusTableData;

describe('useTableSearch', () => {
  it('should return the initial data', () => {
    const { result } = renderHook(() => useTableSearch(mockTranscriptStatusData));

    expect(result.current.filteredData).toEqual(mockTranscriptStatusData);
  });

  it('should return all data when search val is empty', () => {
    const { result } = renderHook(() => useTableSearch(mockTranscriptStatusData, ''));

    expect(result.current.filteredData).toEqual(mockTranscriptStatusData);
  });

  it('should handle data being empty', () => {
    const { result } = renderHook(() => useTableSearch(emptyMockTranscriptStatusData, 'testing'));

    expect(result.current.filteredData).toEqual(undefined);
  });

  it('should get data based on search value', () => {
    expect(mockTranscriptStatusData[0].transcript.last_name).toBe("testing");

    const { result } = renderHook(() => useTableSearch(mockTranscriptStatusData));

    act(() => {
      result.current.handleSearch('deloitte', mockTranscriptStatusData);
    });

    expect(result.current.filteredData).toEqual([mockTranscriptStatusData[0]]);
  });
});