'use strict';

import '@testing-library/jest-dom'
import { QueryClient, QueryClientProvider } from 'react-query';
import { downloadTranscript, useTranscript } from '@/hooks/useTranscript';
import { fireEvent, render } from '@testing-library/react';
import { useAuthenticatedUser, useMockTranscript, useMockTranscriptLegacy, useMockTranscriptNull, useMockTranscriptStatus } from '@/__mocks__/predefinedMocks';
import Home from '@/pages/index';
import mockRouter from 'next-router-mock';

const queryClient = new QueryClient();
const renderer = () => {
  return render(
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  );
};

describe('Home Page', () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl('/');

    useMockTranscriptStatus();
    useMockTranscript();
    useMockTranscriptLegacy();
  });

  it('should render the page', () => {
    useAuthenticatedUser();
    const { getByText } = renderer();
    expect(getByText('MMT')).toBeInTheDocument();
    expect(getByText('Overview')).toBeInTheDocument();
    expect(getByText('Modernized Military Transcript')).toBeInTheDocument();
    expect(getByText('Help Center')).toBeInTheDocument();

    fireEvent.click(getByText('View Tracking Status'))

  });

  it('should handle transcript actions when there is no transcript found', () => {
    useAuthenticatedUser();
    useMockTranscriptNull();

    const { queryByText, getByRole } = renderer();

    const downloadBtn = getByRole('button', { 
      name: /Download Unofficial Transcript/i 
    });

    fireEvent.click(downloadBtn);

    expect(queryByText('No transcript found')).toBeInTheDocument();

  });

  it('should handle transcript actions when there is transcript found', () => {
    useAuthenticatedUser();
    const { getByRole, queryByText } = renderer();
    
    const downloadBtn = getByRole('button', { 
      name: /Download Unofficial Transcript/i 
    });

    fireEvent.click(downloadBtn);
    
    expect(downloadTranscript).toHaveBeenCalled();
    
    const toast = queryByText('No transcript found');
    expect(toast).not.toBeInTheDocument();
  });

  it('should navigate to the right path when the user clicks on the button', () => {
    useAuthenticatedUser();
    const { getByRole } = renderer();

    fireEvent.click(getByRole('button',
      { name: /Share Official Transcript/i }
    ));

    expect(mockRouter).toMatchObject({ asPath: '/modernMilitaryTranscript' });

  });

  it('should display the transcript status updates', () => {
    useAuthenticatedUser();
    const { getByText } = renderer();

    expect(getByText('My Updates')).toBeInTheDocument();
    expect(getByText('Transcript Submission')).toBeInTheDocument();

    expect(getByText('Deloitte University')).toBeInTheDocument();
    expect(getByText('CNU')).toBeInTheDocument();
    expect(getByText('BYU')).toBeInTheDocument();

  });
});
