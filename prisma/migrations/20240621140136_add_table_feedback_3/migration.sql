-- AddForeignKey
ALTER TABLE "FeedBack" ADD CONSTRAINT "FeedBack_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
