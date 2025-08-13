// mock useRouter
jest.mock('next/dist/client/router', () => require('next-router-mock'));

// mocking the useAuth hook
jest.mock('@/contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));

// Mock the endpoints
jest.mock('@/config/endpoints', () => ({
  transcript: '/transcript/',
  transcriptStatus: '/transcript-status/',
  transcriptLegacy: '/transcript/legacy/',
}));

// Mock the useStorage hook
jest.mock('@/hooks/useStorage', () => ({
  useLocalStorage: jest.fn().mockReturnValue([{ consentGiven: true }, jest.fn()])
}));

// Mock the useTranscriptStatus hook
jest.mock('@/hooks/useTranscriptStatus', () => ({
  useTranscriptStatus: jest.fn().mockReturnValue({ 
    data: []
  })
}));

// Mock the useTranscript hooks
jest.mock('@/hooks/useTranscript', () => ({
  useTranscript: jest.fn(),
  downloadTranscript: jest.fn(),
  openTranscript: jest.fn()
}));

// Mock the useTranscriptLegacy hooks
jest.mock('@/hooks/useTranscriptLegacy', () => ({
  useTranscriptLegacy: jest.fn(),
  downloadTranscriptLegacy: jest.fn(),
  openTranscriptLegacy: jest.fn()
}));

// Mock the useAcademicInstitute hook
jest.mock('@/hooks/useAcademicInstitute', () => ({
  useAcademicInstitute: jest.fn().mockReturnValue({
    data: []
  })
}));

jest.mock('next/router', () => require('next-router-mock'));

// mocking the interaction observer
const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});
window.IntersectionObserver = mockIntersectionObserver;
