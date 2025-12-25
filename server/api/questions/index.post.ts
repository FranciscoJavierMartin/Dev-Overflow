import { askQuestionSchema } from '~~/shared/utils/validations/schemas/question';
import { prisma } from '~~/lib/prisma';
import type { User } from '@/generated/prisma/client';
import { validateRequestBody } from '~~/server/utils/validate-request-body';

export default defineEventHandler(async (event) => {
  const { title, content, tags } = await validateRequestBody(
    event,
    askQuestionSchema,
  );
  const user: User = event.context.user;

  const question = await prisma.$transaction(async (tx) => {
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

    return await tx.question.create({
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
