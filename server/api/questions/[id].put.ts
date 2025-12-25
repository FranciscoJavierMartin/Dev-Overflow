import type { User } from '@/generated/prisma/client';
import {
  editQuestionSchema,
  questionIdSchema,
} from '~~/shared/utils/validations/schemas/question';
import { prisma } from '~~/lib/prisma';
import { validateRequestBody } from '~~/server/utils/sync/validate-request-body';
import { validateRouterParams } from '~~/server/utils/sync/validate-router-params';

// TODO: Convert all tags to lowercase
export default defineEventHandler(async (event) => {
  const { id } = await validateRouterParams(event, questionIdSchema);
  const { title, content, tags } = await validateRequestBody(
    event,
    editQuestionSchema,
  );
  const user: User = event.context.user;
  const question = await prisma.question.findUnique({
    where: {
      id,
    },
    include: {
      tags: true,
    },
  });

  if (!question) {
    throw createError({
      statusCode: 404,
      message: 'Question not found',
    });
  }

  if (question.authorId !== user.id) {
    throw createError({
      statusCode: 401,
      message: 'User is not author question',
    });
  }

  await prisma.$transaction(async (tx) => {
    const tags2Add = tags.filter((tag) =>
      question.tags.some(({ name }) => tag !== name),
    );
    const tags2Remove = question.tags
      .filter(({ name }) => !tags.includes(name))
      .map(({ name }) => name);

    // Add new tags
    const tagsInDb = await Promise.all(
      tags2Add.map((tag) =>
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

    // Decrease questions count
    await tx.tag.updateMany({
      where: {
        name: {
          in: tags2Remove,
        },
      },
      data: {
        questions: {
          decrement: 1,
        },
      },
    });

    // Remove unused tags
    await tx.tag.deleteMany({
      where: {
        name: {
          in: tags2Remove,
        },
        questions: 0,
      },
      limit: tags2Remove.length,
    });

    return await tx.question.update({
      where: {
        id,
        authorId: user.id,
      },
      data: {
        title,
        content,
        tags: {
          connect: tagsInDb,
        },
      },
    });
  });

  return {
    question,
  };
});
