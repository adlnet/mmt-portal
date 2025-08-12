'use strict';

import { getTranscriptStatusColor } from '@/utils/getTranscriptStatusColor';

describe('getTranscriptStatusColor', () => {
  it('should get correct color for status without caring about case sensitivity', () => {
    expect(getTranscriptStatusColor('dOwnloaded')).toBe('bg-green-100 text-green-800');
    expect(getTranscriptStatusColor('delivered')).toBe('bg-indigo-base text-indigo');
    expect(getTranscriptStatusColor('oPened')).toBe('bg-blue-200 text-blue-custom');
    expect(getTranscriptStatusColor('pending')).toBe('bg-peach text-brown');
    expect(getTranscriptStatusColor('laTest')).toBe('bg-green-100 text-green-800');
    expect(getTranscriptStatusColor('comPleTed')).toBe('bg-purple-100 text-violet-950');
    expect(getTranscriptStatusColor('neW')).toBe('bg-green-100 text-green-800');

  });

  it('should return default color for unknown status', () => {
    expect(getTranscriptStatusColor('???!!!')).toBe('bg-green-100 text-green-800');
  });
});