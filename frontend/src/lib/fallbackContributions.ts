import type { ContributionCalendar } from '@damta/types';

/**
 * Empty placeholder shown until the API answers. Deliberately NOT fabricated
 * activity: the calendar must only ever display the real GitHub graph.
 */
export function fallbackContributions(): ContributionCalendar {
  return {
    totalContributions: 0,
    weeks: [],
    months: [],
    bestDay: null,
    averagePerDay: 0,
    configured: false,
  };
}
