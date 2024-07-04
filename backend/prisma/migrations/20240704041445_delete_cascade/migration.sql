-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_space_id_fkey";

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_space_id_fkey" FOREIGN KEY ("space_id") REFERENCES "Space"("space_id") ON DELETE CASCADE ON UPDATE CASCADE;
