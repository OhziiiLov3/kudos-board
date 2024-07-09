/*
  Warnings:

  - You are about to drop the column `author` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `author` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `author` on the `Space` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Card" DROP COLUMN "author",
ADD COLUMN     "authorId" INTEGER;

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "author",
ADD COLUMN     "authorId" INTEGER;

-- AlterTable
ALTER TABLE "Space" DROP COLUMN "author",
ADD COLUMN     "authorId" INTEGER;

-- CreateTable
CREATE TABLE "User" (
    "user_id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Space" ADD CONSTRAINT "Space_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;
