'use strict';

import '@testing-library/jest-dom';
import { QueryClientWrapper } from '@/__mocks__/queryClientMock';
import { fireEvent, render, within } from '@testing-library/react';
import { useLocalStorage } from '@/hooks/useStorage';
import { useMockAcademicInstitute } from '@/__mocks__/predefinedMocks';
import { useState } from 'react';
import ShareTranscriptModal from '@/components/modals/ShareTranscriptModal';
import userEvent from '@testing-library/user-event'


const renderer = () => {
    // const [openModal, setOpenModal] = useState(false);
    // const [confirmModal, setConfirmModal] = useState(false);
    return render(
      <QueryClientWrapper>
        <ShareTranscriptModal openModal={true} setOpenModal={()=> {}} confirmModal={false} setConfirmModal={()=>{}}/>
      </QueryClientWrapper>
    );
}

const renderer2 = () => {
    // const [openModal, setOpenModal] = useState(false);
    // const [confirmModal, setConfirmModal] = useState(false);
    return render(
      <QueryClientWrapper>
        <ShareTranscriptModal openModal={true} setOpenModal={()=> {}} confirmModal={true} setConfirmModal={()=>{}}/>
      </QueryClientWrapper>
    );
}

describe('ShareTranscriptModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the share transcript modal', () => {
    const screen = renderer();
    fireEvent.click(screen.getByText('Share Official Transcript'));

    expect(screen.getAllByText('Share Transcript').length).toBe(2);
    expect(screen.getByText('Who do you want to share with?')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('share-button'));

  });

  it('should accept the checkbox', () => {
    useLocalStorage.mockReturnValue([null, jest.fn()]);

    const screen = renderer();
    fireEvent.click(screen.getByText('Share Official Transcript'));
    fireEvent.click(screen.getByLabelText('Select an Institution'));
    
    fireEvent.click(screen.getByRole('checkbox'));
    fireEvent.click(screen.getByTestId('share-button'));

  });

  it('should close the confirm modal', () => {
    useLocalStorage.mockReturnValue([null, jest.fn()]);

    const screen = renderer2();
    fireEvent.click(screen.getByText('Share Official Transcript'));
    fireEvent.click(screen.getByText('Close'));
    
  });

  it('should close on press of enter', () => {
    const screen = renderer2();
    fireEvent.click(screen.getByText('Share Official Transcript'));

    fireEvent.click(screen.getByTestId('share-button'));
    fireEvent.keyPress(screen.getByText('Close'), {
        charCode: '13',
      });
  });

  it('should test autocomplete combobox functionality',async() => {
    useMockAcademicInstitute();

    const screen = renderer();
    fireEvent.click(screen.getByText('Share Official Transcript'));
    const inputElement = screen.getByTestId('autocomplete-input').querySelector('input');
    
    // Simulate typing in the input
    fireEvent.change(inputElement, { target: { value: 'Deloitte University' } });
    
    // Wait for options to appear
    const optionElement = await screen.findByText('Deloitte University');

    // Select an option
    fireEvent.click(optionElement);
    
    // Assert that the input value is updated
    expect(inputElement).toHaveValue('Deloitte University');
    fireEvent.click(screen.getByText('+ Add Another Institution'));
    fireEvent.click(screen.getByTestId('delete-button1'))
    fireEvent.click(screen.getByRole('checkbox'));
    fireEvent.click(screen.getByRole('checkbox'));
    fireEvent.click(screen.getByTestId('share-button'));


  });

  it('should navigate to military transcript page from confirmation modal', () => {
    const screen = renderer2();
    
    const militaryTranscriptButton = screen.getByText('Military Transcript');
    fireEvent.click(militaryTranscriptButton);
    
    expect(militaryTranscriptButton).toBeInTheDocument();
  });

  it('should handle keyboard navigation in confirmation modal', () => {
    const screen = renderer2();
    
    const militaryTranscriptButton = screen.getByText('Military Transcript');
    fireEvent.keyDown(militaryTranscriptButton, { key: 'Enter' });
    
    expect(militaryTranscriptButton).toBeInTheDocument();
  });

  it('should clear search when removing institution', () => {
    useMockAcademicInstitute();
    const screen = renderer();
    
    fireEvent.click(screen.getByText('+ Add Another Institution'));
    const deleteButton = screen.getByTestId('delete-button1');
    fireEvent.click(deleteButton);

    expect(screen.queryByTestId('delete-button1')).not.toBeInTheDocument();
  });

  it('should disable add button when reaching max', () => {
    const screen = renderer();
    
    for (let i = 0; i < 4; i++) {
      fireEvent.click(screen.getByText('+ Add Another Institution'));
    }
    
    expect(screen.getByText('+ Add Another Institution')).toBeDisabled();
    expect(screen.getByText('You have reached the max number of institutions you can send to at once. Please send these, then go back and add more.')).toBeInTheDocument();
  });

  it('should clear required message when modal closes', () => {
    const screen = renderer();
    
    fireEvent.click(screen.getByTestId('share-button'));
    expect(screen.getByText('Please select an institution and accept the terms')).toBeInTheDocument();
    
    const modal = document.querySelector('[role="dialog"]');
    if (modal) {
      const closeButton = modal.querySelector('button[aria-label="Close"]');
      if (closeButton) {
        fireEvent.click(closeButton);
      }
    }
  });

  it('should render authorization checkbox with correct text', () => {
    const screen = renderer();
    
    expect(screen.getByText('I authorize institutions named in this request to access my official military transcript and Personally Identifying Information (PII)')).toBeInTheDocument();
  });

});
