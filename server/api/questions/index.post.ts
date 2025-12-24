import * as v from 'valibot';
import type { User } from 'better-auth';
import { askQuestionSchema } from '~~/shared/utils/validations/schemas/question';
import { prisma } from '~~/lib/prisma';
import type { Question } from '@/generated/prisma/client';

export default defineEventHandler(async (event) => {
  const { title, content, tags } = await readValidatedBody(
    event,
    v.parser(askQuestionSchema),
  );
  const user: User = event.context.user;
  let question: Question | null = null;

  await prisma.$transaction(async (tx) => {
    const dbTags = await Promise.all(
      tags.map((tag) =>
        tx.tag.upsert({
          where: {
            name: tag,
          },
          create: {
            name: tag,
            questions: 1,
          },
          update: {
            questions: {
              increment: 1,
            },
          },
        }),
      ),
    );

    question = await tx.question.create({
      data: {
        title,
        content,
        authorId: user.id,
        tags: {
          connect: dbTags,
        },
      },
    });
  });

  return {
    question,
  };
});
