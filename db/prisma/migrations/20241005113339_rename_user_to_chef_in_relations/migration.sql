/*
  Warnings:

  - The primary key for the `user_metadataONevent` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `user_id` on the `user_metadataONevent` table. All the data in the column will be lost.
  - The primary key for the `user_metadataONunit` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `user_id` on the `user_metadataONunit` table. All the data in the column will be lost.
  - Added the required column `chef_id` to the `user_metadataONevent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `chef_id` to the `user_metadataONunit` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "user_metadataONevent" DROP CONSTRAINT "user_metadataONevent_user_id_fkey";

-- DropForeignKey
ALTER TABLE "user_metadataONunit" DROP CONSTRAINT "user_metadataONunit_user_id_fkey";

-- AlterTable
ALTER TABLE "user_metadataONevent" DROP CONSTRAINT "user_metadataONevent_pkey",
DROP COLUMN "user_id",
ADD COLUMN     "chef_id" TEXT NOT NULL,
ADD CONSTRAINT "user_metadataONevent_pkey" PRIMARY KEY ("chef_id", "event_id");

-- AlterTable
ALTER TABLE "user_metadataONunit" DROP CONSTRAINT "user_metadataONunit_pkey",
DROP COLUMN "user_id",
ADD COLUMN     "chef_id" TEXT NOT NULL,
ADD CONSTRAINT "user_metadataONunit_pkey" PRIMARY KEY ("chef_id", "unit_id");

-- AddForeignKey
ALTER TABLE "user_metadataONunit" ADD CONSTRAINT "user_metadataONunit_chef_id_fkey" FOREIGN KEY ("chef_id") REFERENCES "user_metadata"("firebase_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_metadataONevent" ADD CONSTRAINT "user_metadataONevent_chef_id_fkey" FOREIGN KEY ("chef_id") REFERENCES "user_metadata"("firebase_id") ON DELETE RESTRICT ON UPDATE CASCADE;
