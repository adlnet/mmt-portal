'use strict';

import '@testing-library/jest-dom'; 
import { QueryClientWrapper } from '@/__mocks__/queryClientMock';
import { fireEvent, render } from '@testing-library/react';
import Accordion from '@/components/Accordion';
import Pagination from '@/components/Pagination';

const paginateFront= jest.fn();
const paginate= jest.fn();
const paginateBack= jest.fn();

const renderer = () => {
    return render(
      <QueryClientWrapper>
        <Pagination postsPerPage={10} totalPosts={100} paginateFront={paginateFront} paginate={paginate} paginateBack={paginateBack} currentPage={1} />
      </QueryClientWrapper>
    );
};

describe ('Pagination component test', () => {
    it ('should show previous buttons as disabled when on first page', () =>{
        const screen = renderer();

        expect(screen.getByTestId('prev-button').disabled).toBe(true);
    });

    it('should render page numbers', () => {
      
      const screen = renderer();
      
      fireEvent.click(screen.getByText('2'));
      
      expect(paginate).toHaveBeenCalledWith(2);
      expect(paginate).toHaveBeenCalledTimes(1);
      
    });

    it('should click next page and prev', () => {
      
      const screen = renderer();
            
      fireEvent.click(screen.getByTestId('next-button'));
      fireEvent.click(screen.getByTestId('prev-button'));

      expect(paginate).toHaveBeenCalledWith(2);
      
    });



})