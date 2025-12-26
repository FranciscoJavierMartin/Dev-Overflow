import type { Question, Tag } from '@/generated/prisma/client';

export type QuestionWithTags = Question & { tags: Tag[] };
export type QuestionItem = Question & { tags: { name: string }[] } & {
  author: { name: string; image: string };
};
