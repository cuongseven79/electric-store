-- CreateTable
CREATE TABLE "Blog" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER,
    "title" VARCHAR(512) NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tagName" VARCHAR(255) NOT NULL,

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("id")
);
