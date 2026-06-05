import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import type {
  Project,
  Certificate,
  Skill,
  TimelineEntry,
  HistoryEntry,
  CountryStat,
  VisitorStat,
  GithubSummary,
} from '@damta/types';

export const useProjects = () =>
  useQuery({ queryKey: ['projects'], queryFn: () => api.get<Project[]>('/projects') });

export const useCertificates = () =>
  useQuery({ queryKey: ['certificates'], queryFn: () => api.get<Certificate[]>('/certificates') });

export const useSkills = () =>
  useQuery({ queryKey: ['skills'], queryFn: () => api.get<Skill[]>('/skills') });

export const useTimeline = () =>
  useQuery({ queryKey: ['timeline'], queryFn: () => api.get<TimelineEntry[]>('/timeline') });

export const useHistory = () =>
  useQuery({ queryKey: ['history'], queryFn: () => api.get<HistoryEntry[]>('/history') });

export const useCountries = () =>
  useQuery({ queryKey: ['countries'], queryFn: () => api.get<CountryStat[]>('/stats/countries') });

export const useVisitorStats = () =>
  useQuery({ queryKey: ['visitor-stats'], queryFn: () => api.get<VisitorStat[]>('/stats/visitors') });

export const useGithub = () =>
  useQuery({
    queryKey: ['github'],
    queryFn: () => api.get<GithubSummary>('/github'),
    staleTime: 10 * 60 * 1000,
  });

export const useVisitorCount = () =>
  useQuery({
    queryKey: ['visitor-count'],
    queryFn: () => api.get<{ count: number }>('/visitors/count'),
  });
