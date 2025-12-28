-- CreateEnum
CREATE TYPE "VoteTarget" AS ENUM ('question', 'answer');

-- CreateEnum
CREATE TYPE "VoteType" AS ENUM ('downvote', 'upvote');

-- CreateTable
CREATE TABLE "Vote" (
    "type" "VoteType" NOT NULL,
    "target" "VoteTarget" NOT NULL,
    "targetId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "Vote_pkey" PRIMARY KEY ("targetId","authorId")
);

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
