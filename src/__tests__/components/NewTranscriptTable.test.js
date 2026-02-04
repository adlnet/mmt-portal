'use strict';

import { NewTranscriptTable } from '@/components/NewTranscriptTable';
import { QueryClientWrapper } from '@/__mocks__/queryClientMock';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useMockTranscriptStatus } from '@/__mocks__/predefinedMocks';
import transcriptStatusTableData from '@/__mocks__/data/transcriptStatus.data';

jest.mock('@/hooks/useTranscript', () => ({
  downloadTranscript: jest.fn()
}));

jest.mock('@/hooks/useTranscriptLegacy', () => ({
  downloadTranscriptLegacy: jest.fn()
}));

jest.mock('@/utils/exportToExcel', () => ({
  exportToExcel: jest.fn()
}));

const mockProps = {
  data: transcriptStatusTableData.mockTranscriptStatusData,
  currentPage: 1,
  setCurrentPage: jest.fn(),
  onFiltersChange: jest.fn(),
  transcriptStatusFilters: {
    status: '',
    branch: '',
    recent: false
  }
};

const renderer = (props = mockProps) => {
  return render(
    <QueryClientWrapper>
      <NewTranscriptTable {...props} />
    </QueryClientWrapper>
  );
};

describe('New Transcript Table Tests', () => {
    it('Tests that the table renders', () => {
        useMockTranscriptStatus();
        const screen = renderer();
        expect(screen.getByText('First Name')).toBeInTheDocument;
        expect(screen.getByText('Last Name')).toBeInTheDocument;
        expect(screen.getByText('DOB')).toBeInTheDocument;
        expect(screen.getByText('Branch')).toBeInTheDocument;
        expect(screen.getByText('Received On')).toBeInTheDocument;
    })

    it('Tests that the Export to Excel button works', () => {
      useMockTranscriptStatus();
      const screen = renderer()
      fireEvent.click(screen.getByText('Export to Excel'))

    })
    it('Tests that the Download Button works', () => {
      useMockTranscriptStatus();
      const screen = renderer()
      fireEvent.click(screen.getByText('Download'))

    })

    it('Tests that the Legacy Download Button works', () => {
      useMockTranscriptStatus();
      const screen = renderer()
      fireEvent.click(screen.getByText('Download'))
      fireEvent.click(screen.getByText('Legacy'))

    })

    it('Tests that the Modernized Download Button works', () => {
      useMockTranscriptStatus();
      const screen = renderer()
      fireEvent.click(screen.getByText('Download'))
      fireEvent.click(screen.getByText('Modernized'))

    })

   it('should handle recent filter changes', () => {
      useMockTranscriptStatus();
      const screen = renderer();
      
      fireEvent.click(screen.getByText('Recent'));
      
      fireEvent.click(screen.getByText('Last 30 Days'));
      
      expect(mockProps.onFiltersChange).toHaveBeenCalledWith('recent', true);
    });

});
