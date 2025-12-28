import type { Answer, Question, Tag } from '@/generated/prisma/client';

export type QuestionWithTags = Question & { tags: Tag[] };
export type Author = { id: string; name: string; image: string };
export type QuestionItem = Question & {
  tags: { id: string; name: string }[];
} & {
  author: Author;
};
export type AnswerWithAuthor = Answer & { author: Author };
