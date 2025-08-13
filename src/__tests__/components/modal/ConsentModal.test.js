'use strict';

import '@testing-library/jest-dom';
import { QueryClientWrapper } from '@/__mocks__/queryClientMock';
import { fireEvent, render } from '@testing-library/react';
import { useLocalStorage } from '@/hooks/useStorage';
import ConsentModal from '@/components/modals/ConsentModal';

jest.mock('@/hooks/useStorage', () => ({
  useLocalStorage: jest.fn()
}));

const renderer = () => {
    return render(
      <QueryClientWrapper>
        <ConsentModal />
      </QueryClientWrapper>
    );
}

describe('ConsentModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the consent modal when userInfoConsent info is null', () => {
    useLocalStorage.mockReturnValue([null, jest.fn()]);

    const screen = renderer();

    expect(screen.getByText('We Value Your Privacy')).toBeInTheDocument();
    expect(screen.getByText('Individually identifiable information')).toBeInTheDocument();
    expect(screen.getByText('Social security numbers')).toBeInTheDocument();
    expect(screen.getByText('User location')).toBeInTheDocument();
  });

  it('should not render the consent modal when userInfoConsent info is not null', () => {
    useLocalStorage.mockReturnValue([{ consentGiven: true }, jest.fn()]);

    const screen = renderer();

    expect(screen.queryByText('We Value Your Privacy')).not.toBeInTheDocument();
    expect(screen.queryByText('Individually identifiable information')).not.toBeInTheDocument();
    expect(screen.queryByText('Social security numbers')).not.toBeInTheDocument();
    expect(screen.queryByText('User location')).not.toBeInTheDocument();
  });

  it('should handle checkbox and accept button interaction correctly', () => {
    useLocalStorage.mockReturnValue([null, jest.fn()]);

    const screen = renderer();

    const acceptBtn = screen.getByRole('button', { name: 'Accept' });

    expect(acceptBtn).toBeDisabled();

    fireEvent.click(screen.getByRole('checkbox'));

    expect(acceptBtn).not.toBeDisabled();
  });

  it('should handle checkbox and decline button interaction correctly', () => {
    useLocalStorage.mockReturnValue([null, jest.fn()]);

    const screen = renderer();

    const declineBtn = screen.getByRole('button', { name: 'Decline' });

    fireEvent.click(declineBtn);

    expect(screen.getByText('Please accept the terms')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('checkbox'));

    fireEvent.click(declineBtn);

    expect(screen.getByText('Please accept the terms to continue')).toBeInTheDocument();
  });

  it('should handle accept button click correctly', () => {
    const setUserInfoConsent = jest.fn();
    useLocalStorage.mockReturnValue([null, setUserInfoConsent]);

    const screen = renderer();

    fireEvent.click(screen.getByRole('checkbox'));
    
    fireEvent.click(screen.getByRole('button', { name: 'Accept' }));

    expect(setUserInfoConsent).toHaveBeenCalledWith({
      consentGiven: true,
      consentData: {
        date: expect.anything(),
        items: [
          'individually identifiable information',
          'social security numbers',
          'user location'
        ],
        language: navigator.language,
        version: '1.0'
      }
    });
  });
});