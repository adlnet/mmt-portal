'use strict';

import '@testing-library/jest-dom/extend-expect'
import { QueryClientWrapper } from '@/__mocks__/queryClientMock';
import { TranscriptTrackingTable } from '@/components/TranscriptTrackingTable';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { useMockTranscriptStatus } from '@/__mocks__/predefinedMocks';
import { useTranscriptStatus } from '@/hooks/useTranscriptStatus';
import SearchBar from '@/components/SearchBar';


const renderer = () => {
  return render(
    <QueryClientWrapper>
      <TranscriptTrackingTable />
    </QueryClientWrapper>
  );
};

describe('Transcript Tracking Table Tests', () => {
    it('Tests that the table renders', () => {
        const screen = renderer()
        expect(screen.getAllByText('Action By').length).toBe(2);
        expect(screen.getByText('Transcript Recipient')).toBeInTheDocument
        expect(screen.getByText('Date Initiated')).toBeInTheDocument
        expect(screen.getByText('Action Date')).toBeInTheDocument
        fireEvent.click(screen.getByText('Search'));
        fireEvent.change(screen.getByPlaceholderText('Search'), {
          target: { value: '?' },
        });

        act(() => {
              fireEvent.keyPress(screen.getByPlaceholderText('Search'), {});
            });

        //fireEvent.click(screen.getByText('All'));


    })

    it('Tests that the table searches', () => {
      const screen = renderer()

      const searchBar = screen.getByTestId('search-bar-t');
      fireEvent.change(searchBar, { target: { value: 'a' } });
      fireEvent.click(screen.getByText('Clear Filter'));


      fireEvent.keyPress(screen.getByText('Search'), {});



  })


  it('Tests that the recent dropdown gets clicked', () => {
    useMockTranscriptStatus();
    const screen = renderer()

    const dropdown = fireEvent.click(screen.getByText('Recent'));

    expect(screen.queryByText('Last 30 Days')).toBeInTheDocument();

    fireEvent.click(screen.queryByText('Last 30 Days'));

    expect(screen.queryByText('Last 30 Days')).toBeInTheDocument();

    fireEvent.click(screen.queryByText('Last 30 Days'));
    fireEvent.click(screen.queryByText('All'));

    expect(screen.queryByText('Recent')).toBeInTheDocument();

})

it('Tests that the status dropdown gets clicked', () => {
  useMockTranscriptStatus();
  const screen = renderer()

  const dropdown = fireEvent.click(screen.getByTestId('status-dropdown'));

  expect(screen.getByTestId('dropdown-item-Delivered')).toBeInTheDocument();

  fireEvent.click(screen.getByTestId('dropdown-item-Delivered'));

  expect(screen.getByTestId('status-dropdown')).toBeInTheDocument();

  fireEvent.click(screen.getByTestId('status-dropdown'));
  fireEvent.click(screen.queryByText('All'));

  expect(screen.getByTestId('status-dropdown')).toBeInTheDocument();

})

  
});