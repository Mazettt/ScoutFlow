/*
  Warnings:

  - You are about to drop the `_eventTouser_metadata` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_roleTouser_metadata` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_unitTouser_metadata` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `test1` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `test1OnTest2` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `test2` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_eventTouser_metadata" DROP CONSTRAINT "_eventTouser_metadata_A_fkey";

-- DropForeignKey
ALTER TABLE "_eventTouser_metadata" DROP CONSTRAINT "_eventTouser_metadata_B_fkey";

-- DropForeignKey
ALTER TABLE "_roleTouser_metadata" DROP CONSTRAINT "_roleTouser_metadata_A_fkey";

-- DropForeignKey
ALTER TABLE "_roleTouser_metadata" DROP CONSTRAINT "_roleTouser_metadata_B_fkey";

-- DropForeignKey
ALTER TABLE "_unitTouser_metadata" DROP CONSTRAINT "_unitTouser_metadata_A_fkey";

-- DropForeignKey
ALTER TABLE "_unitTouser_metadata" DROP CONSTRAINT "_unitTouser_metadata_B_fkey";

-- DropForeignKey
ALTER TABLE "test1OnTest2" DROP CONSTRAINT "test1OnTest2_test1_id_fkey";

-- DropForeignKey
ALTER TABLE "test1OnTest2" DROP CONSTRAINT "test1OnTest2_test2_id_fkey";

-- DropTable
DROP TABLE "_eventTouser_metadata";

-- DropTable
DROP TABLE "_roleTouser_metadata";

-- DropTable
DROP TABLE "_unitTouser_metadata";

-- DropTable
DROP TABLE "test1";

-- DropTable
DROP TABLE "test1OnTest2";

-- DropTable
DROP TABLE "test2";

-- CreateTable
CREATE TABLE "user_metadataONrole" (
    "user_id" TEXT NOT NULL,
    "role_id" INTEGER NOT NULL,

    CONSTRAINT "user_metadataONrole_pkey" PRIMARY KEY ("user_id","role_id")
);

-- CreateTable
CREATE TABLE "user_metadataONunit" (
    "user_id" TEXT NOT NULL,
    "unit_id" INTEGER NOT NULL,

    CONSTRAINT "user_metadataONunit_pkey" PRIMARY KEY ("user_id","unit_id")
);

-- CreateTable
CREATE TABLE "user_metadataONevent" (
    "user_id" TEXT NOT NULL,
    "event_id" INTEGER NOT NULL,

    CONSTRAINT "user_metadataONevent_pkey" PRIMARY KEY ("user_id","event_id")
);

-- AddForeignKey
ALTER TABLE "user_metadataONrole" ADD CONSTRAINT "user_metadataONrole_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user_metadata"("firebase_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_metadataONrole" ADD CONSTRAINT "user_metadataONrole_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_metadataONunit" ADD CONSTRAINT "user_metadataONunit_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user_metadata"("firebase_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_metadataONunit" ADD CONSTRAINT "user_metadataONunit_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_metadataONevent" ADD CONSTRAINT "user_metadataONevent_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user_metadata"("firebase_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_metadataONevent" ADD CONSTRAINT "user_metadataONevent_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
