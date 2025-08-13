'use strict';

import { QueryClientWrapper } from '@/__mocks__/queryClientMock';
import { act, fireEvent, render } from '@testing-library/react';
import InputField from '@/components/InputField';

const renderer = () => {
    return render(
      <QueryClientWrapper>
        <InputField 
        placeholder={"Input Field"}
        onChange={() => console.log('tada')} />
      </QueryClientWrapper>
    );
};

describe ('InputField component test', () => {
    it ('show that a card can render', () =>{
        const screen = renderer();
        expect(screen.getByPlaceholderText('Input Field'));

        act(() => {
            fireEvent.keyPress(screen.getByPlaceholderText('Input Field'), {
              charCode: '13',
            });
            fireEvent.submit(screen.getByPlaceholderText('Input Field'));
          });

        //   expect(console.log).toHaveBeenCalledTimes(1);

    })  
})