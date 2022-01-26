-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "dateTaken" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "metadata" JSONB NOT NULL DEFAULT '{}',
    "takenAtLat" DOUBLE PRECISION,
    "takenAtLng" DOUBLE PRECISION,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TagGroup" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "TagGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tagGroupId" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TagsOnImage" (
    "id" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,
    "imageId" TEXT NOT NULL,

    CONSTRAINT "TagsOnImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TagGroup_name_key" ON "TagGroup"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_tagGroupId_key" ON "Tag"("name", "tagGroupId");

-- CreateIndex
CREATE UNIQUE INDEX "TagsOnImage_tagId_imageId_key" ON "TagsOnImage"("tagId", "imageId");

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_tagGroupId_fkey" FOREIGN KEY ("tagGroupId") REFERENCES "TagGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnImage" ADD CONSTRAINT "TagsOnImage_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnImage" ADD CONSTRAINT "TagsOnImage_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE CASCADE ON UPDATE CASCADE;