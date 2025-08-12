'use strict';

import * as XLSX from 'xlsx';
import { exportToExcel } from '@/utils/exportToExcel';
import transcriptData from '@/__mocks__/data/transcript.data';

// Mock the xlsx
jest.mock('xlsx', () => ({
  utils: {
    json_to_sheet: jest.fn(() => ({ mockSheet: 'testSheet' })),
    book_new: jest.fn(() => ({ mockWorkbook: 'testWorkbook' })),
    book_append_sheet: jest.fn(),
  },
  writeFile: jest.fn(),
}));

const { mockTranscript } = transcriptData;

describe('exportToExcel', () => {

  it('should create a workbook and write to a file with the provided data', () => {

    exportToExcel({ data: mockTranscript, fileName: 'test' });

    expect(XLSX.utils.json_to_sheet).toHaveBeenCalledWith(mockTranscript);
    expect(XLSX.utils.book_new).toHaveBeenCalled();
    expect(XLSX.utils.book_append_sheet).toHaveBeenCalledWith(
      { mockWorkbook: 'testWorkbook'},
      { mockSheet: 'testSheet' },
      'Sheet1'
    );
    expect(XLSX.writeFile).toHaveBeenCalledWith({ mockWorkbook: 'testWorkbook'}, 'test.xlsx');
  });
});