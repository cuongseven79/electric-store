-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
