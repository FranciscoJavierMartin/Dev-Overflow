import * as v from 'valibot';
import type { User } from 'better-auth';
import { askQuestionSchema } from '~~/shared/utils/validations/schemas/question';
import { prisma } from '~~/lib/prisma';

export default defineEventHandler(async (event) => {
  const { title, content, tags } = await readValidatedBody(
    event,
    v.parser(askQuestionSchema),
  );
  const user: User = event.context.user;

  // await prisma.$transaction(async (tx) => {
  //   tags.map((tag) => {
  //     tx.tag.upsert({
  //       where: {
  //         name: tag,
  //       },
  //     });
  //   });
  // const question = await tx.question.create({
  //   data: {
  //     title,
  //     content,
  //     authorId: user.id,
  //   },
  // });

  // tags.forEach(async (tag) => {
  //   tx.tag.upsert({
  //     where: {
  //       name:,
  //     },
  //   });
  // });
  // });

  return {
    user: event.context.user,
  };
});
