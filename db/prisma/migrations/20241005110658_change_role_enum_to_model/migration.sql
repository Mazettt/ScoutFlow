/*
  Warnings:

  - You are about to alter the column `B` on the `_eventTouser_metadata` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `B` on the `_unitTouser_metadata` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `keyresp_userid` on the `local` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - The primary key for the `user_metadata` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `roles` on the `user_metadata` table. All the data in the column will be lost.
  - You are about to alter the column `firebase_id` on the `user_metadata` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.

*/
-- DropForeignKey
ALTER TABLE "_eventTouser_metadata" DROP CONSTRAINT "_eventTouser_metadata_B_fkey";

-- DropForeignKey
ALTER TABLE "_unitTouser_metadata" DROP CONSTRAINT "_unitTouser_metadata_B_fkey";

-- DropForeignKey
ALTER TABLE "local" DROP CONSTRAINT "local_keyresp_userid_fkey";

-- AlterTable
ALTER TABLE "_eventTouser_metadata" ALTER COLUMN "B" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "_unitTouser_metadata" ALTER COLUMN "B" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "local" ALTER COLUMN "name" SET DATA TYPE VARCHAR(256),
ALTER COLUMN "address" SET DATA TYPE VARCHAR(1024),
ALTER COLUMN "keyresp_userid" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "unit" ALTER COLUMN "name" SET DATA TYPE VARCHAR(256);

-- AlterTable
ALTER TABLE "user_metadata" DROP CONSTRAINT "user_metadata_pkey",
DROP COLUMN "roles",
ALTER COLUMN "firebase_id" SET DATA TYPE VARCHAR(100),
ADD CONSTRAINT "user_metadata_pkey" PRIMARY KEY ("firebase_id");

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "role" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_roleTouser_metadata" (
    "A" INTEGER NOT NULL,
    "B" VARCHAR(100) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "role_name_key" ON "role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_roleTouser_metadata_AB_unique" ON "_roleTouser_metadata"("A", "B");

-- CreateIndex
CREATE INDEX "_roleTouser_metadata_B_index" ON "_roleTouser_metadata"("B");

-- AddForeignKey
ALTER TABLE "local" ADD CONSTRAINT "local_keyresp_userid_fkey" FOREIGN KEY ("keyresp_userid") REFERENCES "user_metadata"("firebase_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_roleTouser_metadata" ADD CONSTRAINT "_roleTouser_metadata_A_fkey" FOREIGN KEY ("A") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_roleTouser_metadata" ADD CONSTRAINT "_roleTouser_metadata_B_fkey" FOREIGN KEY ("B") REFERENCES "user_metadata"("firebase_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_unitTouser_metadata" ADD CONSTRAINT "_unitTouser_metadata_B_fkey" FOREIGN KEY ("B") REFERENCES "user_metadata"("firebase_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_eventTouser_metadata" ADD CONSTRAINT "_eventTouser_metadata_B_fkey" FOREIGN KEY ("B") REFERENCES "user_metadata"("firebase_id") ON DELETE CASCADE ON UPDATE CASCADE;
