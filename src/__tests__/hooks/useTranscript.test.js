'use strict'

import { QueryClientWrapper } from '@/__mocks__/queryClientMock';
import { downloadTranscript, openTranscript, useTranscript } from '@/hooks/useTranscript';
import { renderHook, waitFor } from '@testing-library/react';
import mockAxios from 'jest-mock-axios';
import transcriptData from '@/__mocks__/data/transcript.data';

jest.unmock('@/hooks/useTranscript');

const { mockTranscriptData } = transcriptData;

const wrapper = ({ children }) => (
  <QueryClientWrapper>{children}</QueryClientWrapper>
);

describe('useTranscript', () => {
  it('should make an API call', async () => {
    mockAxios.get.mockResolvedValueOnce({ data: mockTranscriptData });
    const { result } = renderHook(() => useTranscript(), { wrapper });

    await waitFor(() => {
      expect(result.current.data).toEqual(mockTranscriptData);
    });
  
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
  });
  
  describe('download transcript', () => {
    const mockBlob = new Blob(['test']);
    const mockId = '1';
    const mockLastName = 'Doe'

    let mockLink;

    beforeEach(() => {
      mockLink = {
        click: jest.fn(),
        remove: jest.fn(),
        download: ''
      };

      document.createElement = jest.fn().mockReturnValue(mockLink);
      document.body.appendChild = jest.fn();
      URL.createObjectURL = jest.fn().mockReturnValue('test');
      URL.revokeObjectURL = jest.fn();

      mockAxios.mockImplementation(() => {
        return Promise.resolve({ data: mockBlob });
      });
    });

    it('should download transcript', async () => {
      
      downloadTranscript(mockId,mockLastName);

      expect(mockAxios).toHaveBeenCalledWith('/transcript/1/', expect.objectContaining({ responseType: 'blob' }));

      // Wait for all promises to resolve
      await new Promise(process.nextTick);

      expect(document.createElement).toHaveBeenCalledWith('a');
      expect(URL.createObjectURL).toHaveBeenCalledWith(mockBlob);
      expect(mockLink.download).toBe(`${mockLastName}_Modernized_transcript.pdf`);
      expect(document.body.appendChild).toHaveBeenCalledWith(mockLink);
      expect(mockLink.click).toHaveBeenCalled();
      expect(mockLink.remove).toHaveBeenCalled();
      expect(URL.revokeObjectURL).toHaveBeenCalledWith('test');
    });

    it('should handle download error', async () => {
      console.error = jest.fn();
      mockAxios.mockImplementation(() => Promise.reject());

      downloadTranscript(mockId,mockLastName);

      // Wait for all promises to resolve
      await new Promise(process.nextTick);

      expect(console.error).toHaveBeenCalledWith('Download failed');
    });
  });

  describe('openTranscript', () => {
    const mockId = '1';
    
    it('should open transcript', () => {
      window.open = jest.fn();
      openTranscript(mockId);
      expect(window.open).toHaveBeenCalledWith('/transcript/1/');
    });
  });
});