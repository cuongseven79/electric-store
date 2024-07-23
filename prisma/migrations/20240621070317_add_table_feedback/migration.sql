-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "feedbackId" INTEGER;

-- CreateTable
CREATE TABLE "FeedBack" (
    "id" SERIAL NOT NULL,
    "Star" INTEGER NOT NULL,
    "Review" VARCHAR(1024) NOT NULL,

    CONSTRAINT "FeedBack_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_feedbackId_fkey" FOREIGN KEY ("feedbackId") REFERENCES "FeedBack"("id") ON DELETE SET NULL ON UPDATE CASCADE;
