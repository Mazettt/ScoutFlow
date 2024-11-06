/*
  Warnings:

  - You are about to drop the `user_metadata` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_metadataONevent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_metadataONrole` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_metadataONunit` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "local" DROP CONSTRAINT "local_keyresp_userid_fkey";

-- DropForeignKey
ALTER TABLE "user_metadataONevent" DROP CONSTRAINT "user_metadataONevent_chef_id_fkey";

-- DropForeignKey
ALTER TABLE "user_metadataONevent" DROP CONSTRAINT "user_metadataONevent_event_id_fkey";

-- DropForeignKey
ALTER TABLE "user_metadataONrole" DROP CONSTRAINT "user_metadataONrole_role_id_fkey";

-- DropForeignKey
ALTER TABLE "user_metadataONrole" DROP CONSTRAINT "user_metadataONrole_user_id_fkey";

-- DropForeignKey
ALTER TABLE "user_metadataONunit" DROP CONSTRAINT "user_metadataONunit_chef_id_fkey";

-- DropForeignKey
ALTER TABLE "user_metadataONunit" DROP CONSTRAINT "user_metadataONunit_unit_id_fkey";

-- DropTable
DROP TABLE "user_metadata";

-- DropTable
DROP TABLE "user_metadataONevent";

-- DropTable
DROP TABLE "user_metadataONrole";

-- DropTable
DROP TABLE "user_metadataONunit";

-- CreateTable
CREATE TABLE "userdata" (
    "firebase_id" VARCHAR(256) NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "userdata_pkey" PRIMARY KEY ("firebase_id")
);

-- CreateTable
CREATE TABLE "userdataONrole" (
    "user_id" TEXT NOT NULL,
    "role_id" INTEGER NOT NULL,

    CONSTRAINT "userdataONrole_pkey" PRIMARY KEY ("user_id","role_id")
);

-- CreateTable
CREATE TABLE "userdataONunit" (
    "chef_id" TEXT NOT NULL,
    "unit_id" INTEGER NOT NULL,

    CONSTRAINT "userdataONunit_pkey" PRIMARY KEY ("chef_id","unit_id")
);

-- CreateTable
CREATE TABLE "userdataONevent" (
    "chef_id" TEXT NOT NULL,
    "event_id" INTEGER NOT NULL,

    CONSTRAINT "userdataONevent_pkey" PRIMARY KEY ("chef_id","event_id")
);

-- AddForeignKey
ALTER TABLE "local" ADD CONSTRAINT "local_keyresp_userid_fkey" FOREIGN KEY ("keyresp_userid") REFERENCES "userdata"("firebase_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userdataONrole" ADD CONSTRAINT "userdataONrole_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "userdata"("firebase_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userdataONrole" ADD CONSTRAINT "userdataONrole_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userdataONunit" ADD CONSTRAINT "userdataONunit_chef_id_fkey" FOREIGN KEY ("chef_id") REFERENCES "userdata"("firebase_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userdataONunit" ADD CONSTRAINT "userdataONunit_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userdataONevent" ADD CONSTRAINT "userdataONevent_chef_id_fkey" FOREIGN KEY ("chef_id") REFERENCES "userdata"("firebase_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userdataONevent" ADD CONSTRAINT "userdataONevent_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
