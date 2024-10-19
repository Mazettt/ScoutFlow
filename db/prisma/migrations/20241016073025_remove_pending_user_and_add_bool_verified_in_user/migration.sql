/*
  Warnings:

  - You are about to drop the `pending_user` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pending_userONrole` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pending_userONunit` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "pending_userONrole" DROP CONSTRAINT "pending_userONrole_pending_user_id_fkey";

-- DropForeignKey
ALTER TABLE "pending_userONrole" DROP CONSTRAINT "pending_userONrole_role_id_fkey";

-- DropForeignKey
ALTER TABLE "pending_userONunit" DROP CONSTRAINT "pending_userONunit_pending_user_id_fkey";

-- DropForeignKey
ALTER TABLE "pending_userONunit" DROP CONSTRAINT "pending_userONunit_unit_id_fkey";

-- AlterTable
ALTER TABLE "user_metadata" ADD COLUMN     "verified" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "pending_user";

-- DropTable
DROP TABLE "pending_userONrole";

-- DropTable
DROP TABLE "pending_userONunit";
