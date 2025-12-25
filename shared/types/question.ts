import type { Question, Tag } from '@/generated/prisma/client';

export type QuestionWithTags = Question & { tags: Tag[] };
