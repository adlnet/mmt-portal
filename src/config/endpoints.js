'use strict';

// local host endpoint from .env
export const backendHost = process.env.NEXT_PUBLIC_BACKEND_HOST;
const api = '/api/';
const elasticApi = '/es-api/';

export const academicInstituteUsers = `${backendHost}${api}manage-academic-institutes/`;
export const academicInstitute = `${backendHost}${api}academic-institutes/`;

// Transcript urls
export const transcript = `${backendHost}${api}transcript/`;
export const transcriptLegacy = `${backendHost}${api}transcript/legacy/`;
export const transcriptStatus = `${backendHost}${api}transcript-status/`;

//Updates
export const courseUpdates = `${backendHost}${api}course-updates/`;
export const occupationUpdates = `${backendHost}${api}occupation-updates/`;
export const additionalLearningUpdates = `${backendHost}${api}additional-updates/`;

