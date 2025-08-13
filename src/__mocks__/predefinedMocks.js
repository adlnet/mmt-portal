// import jest from 'jest';
import { useAcademicInstitute } from '@/hooks/useAcademicInstitute';
import { useAuth } from '@/contexts/AuthContext';
import { useTranscript } from '@/hooks/useTranscript';
import { useTranscriptLegacy } from '@/hooks/useTranscriptLegacy';
import { useTranscriptStatus } from '@/hooks/useTranscriptStatus';
import academicInstitute from '@/__mocks__/data/academicInstitute.data';
import transcriptStatusTableData from '@/__mocks__/data/transcriptStatus.data';


/**
 *
 * @returns {{
 * user: {
 * user: {
 * id: '1',
 * username: 'test',
 * email: 'test@test.com',
 * },
 * },
 * }}
 */

export const useAuthenticatedUser = () =>
  useAuth.mockImplementation(() => ({
    user: {
      user: {
        id: '1',
        username: 'test',
        first_name: 'Test',
        last_name: 'User',
        email: 'test@test.com',
      },
    },
    login: jest.fn(),
    logout: jest.fn(),
  }));

/**
 *
 * @returns
 *
 */

export const logoutFn = jest.fn();
export const loginFn = jest.fn();
export const useUnauthenticatedUser = () =>
  useAuth.mockReturnValue({
    user: null,
    login: jest.fn(),
    logout: jest.fn(),
  });

export const useMockTranscriptStatus = () => {
  useTranscriptStatus.mockReturnValue({
    data: transcriptStatusTableData.mockTranscriptStatusData,
    isSuccess: true,
    isError: false,
  });
};

export const useMockTranscript = () => {
  useTranscript.mockReturnValue({
    data: [{ id: '1' }],
    isSuccess: true,
    isError: false,
  });
}


export const useMockTranscriptLegacy = () => {
  useTranscriptLegacy.mockReturnValue({
    data: [{ id: '1' }],
    isSuccess: true,
    isError: false,
  });
}

export const useMockTranscriptNull = () => {
  useTranscript.mockReturnValue({ data: null });
  useTranscriptLegacy.mockReturnValue({ data: null });
}

export const useMockAcademicInstitute = () => {
  useAcademicInstitute.mockReturnValue({
    data: academicInstitute.mockAcademicInstituteData,
    isSuccess: true,
    isError: false,
  })
}


