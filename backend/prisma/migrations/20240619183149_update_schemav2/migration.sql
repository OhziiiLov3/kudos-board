/*
  Warnings:

  - The primary key for the `Card` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `spaceId` on the `Card` table. All the data in the column will be lost.
  - The primary key for the `Space` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Space` table. All the data in the column will be lost.
  - Added the required column `space_id` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_spaceId_fkey";

-- AlterTable
ALTER TABLE "Card" DROP CONSTRAINT "Card_pkey",
DROP COLUMN "id",
DROP COLUMN "spaceId",
ADD COLUMN     "card_id" SERIAL NOT NULL,
ADD COLUMN     "space_id" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ALTER COLUMN "message" DROP NOT NULL,
ALTER COLUMN "gifUrl" DROP NOT NULL,
ADD CONSTRAINT "Card_pkey" PRIMARY KEY ("card_id");

-- AlterTable
ALTER TABLE "Space" DROP CONSTRAINT "Space_pkey",
DROP COLUMN "id",
ADD COLUMN     "space_id" SERIAL NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ALTER COLUMN "title" DROP NOT NULL,
ALTER COLUMN "category" DROP NOT NULL,
ADD CONSTRAINT "Space_pkey" PRIMARY KEY ("space_id");

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_space_id_fkey" FOREIGN KEY ("space_id") REFERENCES "Space"("space_id") ON DELETE RESTRICT ON UPDATE CASCADE;
