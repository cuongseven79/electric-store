/*
  Warnings:

  - You are about to drop the column `Review` on the `FeedBack` table. All the data in the column will be lost.
  - You are about to drop the column `Star` on the `FeedBack` table. All the data in the column will be lost.
  - Added the required column `productId` to the `FeedBack` table without a default value. This is not possible if the table is not empty.
  - Added the required column `review` to the `FeedBack` table without a default value. This is not possible if the table is not empty.
  - Added the required column `star` to the `FeedBack` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `FeedBack` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FeedBack" DROP COLUMN "Review",
DROP COLUMN "Star",
ADD COLUMN     "productId" INTEGER NOT NULL,
ADD COLUMN     "review" VARCHAR(1024) NOT NULL,
ADD COLUMN     "star" INTEGER NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "FeedBack" ADD CONSTRAINT "FeedBack_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
