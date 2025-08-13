'use strict';

import { QueryClientWrapper } from '@/__mocks__/queryClientMock';
import { render } from '@testing-library/react';
import SecondaryButton from '@/components/SecondaryButton';

const renderer = () => {
    return render(
      <QueryClientWrapper>
        <SecondaryButton onClick={null} id='id1'>
          test
        </SecondaryButton>
      </QueryClientWrapper>
    );
};

describe ('Secondary Button component test', () => {
    it ('show that a button can render', () =>{
        const screen = renderer();
        expect(screen.getByText('test'))
    })  
})