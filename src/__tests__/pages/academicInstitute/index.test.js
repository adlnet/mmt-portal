'use strict';

import { QueryClientWrapper } from '@/__mocks__/queryClientMock';
import {
  createSaveSearchMockFn,
  useAuthenticatedUser,
  useMockCreateSaveSearch,
  useUnauthenticatedUser,
} from '@/__mocks__/predefinedMocks';
import { fireEvent, render } from '@testing-library/react';
import ModernMilitaryTranscriptAIPage from '@/pages/academicInstitute';

const renderer = () => {
  return render(
    <QueryClientWrapper>
      <ModernMilitaryTranscriptAIPage />
    </QueryClientWrapper>
  );
};

afterEach(() => {
  jest.resetAllMocks();
});

describe('Request Military Transcript AI Page', () => {
  it('should render the page', () => {
      useAuthenticatedUser();
      const { getByText, getByPlaceholderText, getByTestId, getByRole } = renderer();
      
      expect(getByText('Welcome !')).toBeInTheDocument();

      fireEvent.click(getByText('Search'));

      expect(getByText('Search')).toBeInTheDocument();
      fireEvent.change(getByPlaceholderText('Search'), {
        target: { value: 'John' },
      });
      fireEvent.click(getByText('Search'));

      fireEvent.click(getByText('Request Military Transcript'))

      expect(getByPlaceholderText('First Name')).toBeInTheDocument();
      fireEvent.change(getByPlaceholderText('First Name'), {
        target: { value: 'John' },
      });
      fireEvent.change(getByPlaceholderText('Last Name'), {
        target: { value: 'Doe' },
      });

      // fireEvent.change(getByPlaceholderText("MM/DD/YYYY"), {
      //   target: { value: '01/01/1990' },
      // });
      fireEvent.change(getByPlaceholderText('#########'), {
        target: { value: '1111' },
      });

      fireEvent.click(getByTestId('requestTranscriptButton'))

    
      expect(getByText('Confirm by clicking the checkbox that you have been granted the necessary permissions by service member before proceeding.')).toBeInTheDocument();


      fireEvent.click(getByTestId('requestmilitaryTranscript'))


      fireEvent.click(getByRole('checkbox'))

      fireEvent.click(getByTestId('requestTranscriptButton'))

      expect(getByText('Fill out the required Social Security Number. It has be to exactly 9 digits with no spaces and no letters.')).toBeInTheDocument();


      fireEvent.change(getByPlaceholderText('#########'), {
        target: { value: '111111111' },
      });

      fireEvent.click(getByTestId('requestTranscriptButton'))

      expect(getByText('Your transcript request have been successfully delivered!')).toBeInTheDocument();

      
  });


});