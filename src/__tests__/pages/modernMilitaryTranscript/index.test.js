'use strict';

import '@testing-library/jest-dom'
import { QueryClient, QueryClientProvider } from 'react-query';
import { downloadTranscript, openTranscript } from '@/hooks/useTranscript';
import { downloadTranscriptLegacy, openTranscriptLegacy } from '@/hooks/useTranscriptLegacy';
import { fireEvent, render } from '@testing-library/react';
import { useAuthenticatedUser, useMockTranscript, useMockTranscriptLegacy, useMockTranscriptNull, useMockTranscriptStatus } from '@/__mocks__/predefinedMocks';
import ModernMilitaryTranscript from '@/pages/modernMilitaryTranscript/index';
import mockRouter from 'next-router-mock';

const queryClient = new QueryClient();
const renderer = () => {
  return render(
    <QueryClientProvider client={queryClient}>
      <ModernMilitaryTranscript />
    </QueryClientProvider>
  );
};

describe('ModernMilitaryTranscript Page', () => {

    beforeEach(() => {
      mockRouter.setCurrentUrl('/modernMilitaryTranscript');

      useMockTranscriptStatus();
      useMockTranscript();
      useMockTranscriptLegacy();
    });

  it('should render the page', () => {
    useAuthenticatedUser();
    const { getByText, getAllByText } = renderer();
    expect(getByText('Transcript')).toBeInTheDocument();
    expect(getByText('Format')).toBeInTheDocument();
    expect(getByText('Modernized')).toBeInTheDocument();
    expect(getByText('Help Center')).toBeInTheDocument();
    fireEvent.click(getByText('Share Official Transcript'))
    expect(getAllByText('Share Transcript').length).toBe(2);
  });

  it('should handle format change between modernized and legacy', () => {
    useAuthenticatedUser();
    const { getByLabelText} = renderer();

    const legacyRadio = getByLabelText('Legacy');
    const modernizedRadio = getByLabelText('Modernized');

    fireEvent.click(legacyRadio);
    expect(legacyRadio).toBeChecked();
    expect(modernizedRadio).not.toBeChecked();

    fireEvent.click(modernizedRadio);
    expect(legacyRadio).not.toBeChecked();
    expect(modernizedRadio).toBeChecked();
  });

  it('should handle transcript actions when there is no transcript found', () => {
    useAuthenticatedUser();
    useMockTranscriptNull();
    
    const { queryByText, getByRole } = renderer();

    const downloadBtn = getByRole('button', { 
      name: /Download/i 
    });

    fireEvent.click(downloadBtn);

    expect(queryByText('No transcript found')).toBeInTheDocument();

    const openBtn = getByRole('button', {
      name: /View/i
    });

    fireEvent.click(openBtn);

    expect(queryByText('No transcript found')).toBeInTheDocument();

  });

  it('should handle transcript download actions when there is transcript found', () => {
    useAuthenticatedUser();
    const { getByRole, queryByText, getByLabelText } = renderer();
    
    const downloadBtn = getByRole('button', { 
      name: /Download/i 
    });

    fireEvent.click(downloadBtn);
    
    expect(downloadTranscript).toHaveBeenCalled();
    
    const toast = queryByText('No transcript found');
    expect(toast).not.toBeInTheDocument();

    const legacyRadio = getByLabelText('Legacy');

    fireEvent.click(legacyRadio);
    fireEvent.click(downloadBtn);
    expect(downloadTranscriptLegacy).toHaveBeenCalled();
    expect(toast).not.toBeInTheDocument();
  });

  it('should handle transcript open actions when there is transcript found', () => {
    useAuthenticatedUser();
    const { getByRole, queryByText, getByLabelText } = renderer();
    
    const openBtn = getByRole('button', {
      name: /View/i
    });

    fireEvent.click(openBtn);
    
    expect(openTranscript).toHaveBeenCalledWith('1');

    const toast = queryByText('No transcript found');
    expect(toast).not.toBeInTheDocument();

    const legacyRadio = getByLabelText('Legacy');

    fireEvent.click(legacyRadio);
    fireEvent.click(openBtn);
    expect(openTranscriptLegacy).toHaveBeenCalledWith('1');
    expect(toast).not.toBeInTheDocument();
  })

});
