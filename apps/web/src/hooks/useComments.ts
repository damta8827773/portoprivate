import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/api';
import { getIdToken } from '../lib/firebase';
import type { Comment } from '@damta/types';

/** Identity is derived server-side from the Firebase token, not sent here. */
export interface NewComment {
  comment: string;
  rating?: number;
  parentId?: number;
}

export const useComments = () =>
  useQuery({
    queryKey: ['comments'],
    queryFn: () => api.get<Comment[]>('/comments'),
    refetchInterval: 15_000, // light polling stands in for Firestore realtime
  });

export function useCreateComment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (body: NewComment) => {
      const token = await getIdToken();
      if (!token) throw new Error('Anda harus masuk untuk mengirim pesan.');
      return api.post<Comment>('/comments', body, token);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['comments'] }),
  });
}
