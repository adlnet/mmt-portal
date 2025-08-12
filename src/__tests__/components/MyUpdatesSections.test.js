'use strict';

import { QueryClientWrapper } from '@/__mocks__/queryClientMock';
import { fireEvent, render } from '@testing-library/react';
import MyUpdatesSections from '@/components/MyUpdatesSections';

const renderer = () => {
    return render(
      <QueryClientWrapper>
        <MyUpdatesSections
         title={"Updates Title"} description={"Updates desc"} icon={<div>Test icon</div>} badgelabel={"Badge Label"} sentDate={"Sent date"} date={"date"} />
      </QueryClientWrapper>
    );
};

describe ('MyUpdatesSections component test', () => {
    it ('show that a card MyUpdatesSections render', () =>{
        const screen = renderer();
        expect(screen.getByText('Updates Title'));
        expect(screen.getByText('Updates desc'));
        expect(screen.getByText('Test icon'));
        expect(screen.getByText('Badge Label'));
        expect(screen.getByText('Sent date'));
        expect(screen.getByText('date'));        

    })  
})