import type { Question, Tag, User } from '@/generated/prisma/client';
import { editQuestionSchema } from '~~/shared/utils/validations/schemas/question';
import { prisma } from '~~/lib/prisma';

// TODO: Convert all tags to lowercase
export default defineEventHandler(async (event) => {
  const { title, content, tags, questionId } = await validateRequestBody(
    event,
    // TODO: Add validation to check if question exists and check it user is question's author
    editQuestionSchema,
  );
  const user: User = event.context.user;
  const question = await prisma.question.findUnique({
    where: {
      id: questionId,
      authorId: user.id,
    },
    include: {
      tags: true,
    },
  });

  if (!question) {
    throw createError({
      statusCode: 401,
    });
  }

  await prisma.$transaction(async (tx) => {
    const tags2Add =
      question.tags?.filter((tag) =>
        tags.some((t) => t.toLowerCase() !== tag.name.toLowerCase()),
      ) ?? [];
    const tags2Remove = question.tags?.filter((tag) => tags.includes(tag.name));

    // Add new tags
    const dbTags = await Promise.all(
      tags2Add.map((tag) =>
        tx.tag.upsert({
          where: {
            name: tag.name,
          },
          create: {
            name: tag.name,
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

    return await tx.question.update({
      where: {
        id: questionId,
        authorId: user.id,
      },
      data: {
        title,
        content,
        tags: {
          create: dbTags,
        },
      },
    });
  });

  return {
    question,
  };
});
