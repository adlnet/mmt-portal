'use strict';

import { NewTranscriptTable } from '@/components/NewTranscriptTable';
import { QueryClientWrapper } from '@/__mocks__/queryClientMock';
import { fireEvent, render, screen } from '@testing-library/react';
import { useMockTranscriptStatus } from '@/__mocks__/predefinedMocks';
import transcriptStatusTableData from '@/__mocks__/data/transcriptStatus.data';

const renderer = () => {
  return render(
    <QueryClientWrapper>
      <NewTranscriptTable data={transcriptStatusTableData.mockTranscriptStatusData}
                    currentPage={1}/>
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
});