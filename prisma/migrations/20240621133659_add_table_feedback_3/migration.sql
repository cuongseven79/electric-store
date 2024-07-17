/*
  Warnings:

  - You are about to drop the column `star` on the `FeedBack` table. All the data in the column will be lost.
  - Added the required column `rate` to the `FeedBack` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FeedBack" DROP COLUMN "star",
ADD COLUMN     "rate" INTEGER NOT NULL;
