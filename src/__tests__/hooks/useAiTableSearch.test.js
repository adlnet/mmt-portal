'use strict';

import { act, renderHook } from '@testing-library/react-hooks';
import { useAITableSearch } from '@/hooks/useAITableSearch';
import transcriptStatusTableData from '@/__mocks__/data/transcriptStatus.data';

const { mockTranscriptStatusData, } = transcriptStatusTableData;

describe('useAITableSearch', () => {
  it('should return the initial data', () => {
    const { result } = renderHook(() => useAITableSearch(mockTranscriptStatusData));

    expect(result.current.filteredData.oneGroup).toEqual(mockTranscriptStatusData);
  });

  it('should get data based on search value', () => {
    expect(mockTranscriptStatusData[0].transcript.last_name).toBe("testing");

    const { result } = renderHook(() => useAITableSearch(mockTranscriptStatusData));

    act(() => {
      result.current.handleSearch('deloitte', mockTranscriptStatusData);
    });

    expect(result.current.filteredData.oneGroup).toEqual([mockTranscriptStatusData[0]]);
  });
});