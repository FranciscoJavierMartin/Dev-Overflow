import type { Question, Tag } from '@/generated/prisma/client';

export type QuestionWithTags = Question & { tags: Tag[] };
export type QuestionItem = Question & {
  tags: { id: string; name: string }[];
} & {
  author: { id: string; name: string; image: string };
};
