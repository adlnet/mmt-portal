'use strict';

// Get transcript status color
export const getTranscriptStatusColor = status => {
  switch (status.toLowerCase()) {
    case 'downloaded':
      return 'bg-green-100 text-green-800';
    case 'delivered':
      return 'bg-indigo-base text-indigo';
    case 'opened':
      return 'bg-blue-200 text-blue-custom';
    case 'pending':
      return 'bg-peach text-brown';
    case 'new':
      return 'bg-green-100 text-green-800';
    case 'completed':
      return 'bg-purple-100 text-violet-950';
    default:
      return 'bg-green-100 text-green-800';
  }
}