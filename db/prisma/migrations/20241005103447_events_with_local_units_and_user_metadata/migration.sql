-- CreateEnum
CREATE TYPE "AgeGroup" AS ENUM ('Farfadet', 'Louveteau', 'Scout', 'Pionnier', 'Compagnon');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Admin', 'RG', 'RespMatos', 'RespCompta', 'Chef');

-- AlterTable
ALTER TABLE "test" ALTER COLUMN "updated_at" DROP DEFAULT;

-- CreateTable
CREATE TABLE "user_metadata" (
    "firebase_id" TEXT NOT NULL,
    "roles" "Role"[],

    CONSTRAINT "user_metadata_pkey" PRIMARY KEY ("firebase_id")
);

-- CreateTable
CREATE TABLE "unit" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "age_group" "AgeGroup" NOT NULL,
    "local_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "unit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "local" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "address" VARCHAR(100) NOT NULL,
    "postalcode" VARCHAR(10) NOT NULL,
    "city" VARCHAR(100) NOT NULL,
    "keyresp_userid" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "local_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(256) NOT NULL,
    "start_date" TIMESTAMP(6) NOT NULL,
    "end_date" TIMESTAMP(6) NOT NULL,
    "need_help" BOOLEAN NOT NULL DEFAULT false,
    "unit_id" INTEGER NOT NULL,
    "local_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_unitTouser_metadata" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_eventTouser_metadata" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_unitTouser_metadata_AB_unique" ON "_unitTouser_metadata"("A", "B");

-- CreateIndex
CREATE INDEX "_unitTouser_metadata_B_index" ON "_unitTouser_metadata"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_eventTouser_metadata_AB_unique" ON "_eventTouser_metadata"("A", "B");

-- CreateIndex
CREATE INDEX "_eventTouser_metadata_B_index" ON "_eventTouser_metadata"("B");

-- AddForeignKey
ALTER TABLE "unit" ADD CONSTRAINT "unit_local_id_fkey" FOREIGN KEY ("local_id") REFERENCES "local"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "local" ADD CONSTRAINT "local_keyresp_userid_fkey" FOREIGN KEY ("keyresp_userid") REFERENCES "user_metadata"("firebase_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event" ADD CONSTRAINT "event_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event" ADD CONSTRAINT "event_local_id_fkey" FOREIGN KEY ("local_id") REFERENCES "local"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_unitTouser_metadata" ADD CONSTRAINT "_unitTouser_metadata_A_fkey" FOREIGN KEY ("A") REFERENCES "unit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_unitTouser_metadata" ADD CONSTRAINT "_unitTouser_metadata_B_fkey" FOREIGN KEY ("B") REFERENCES "user_metadata"("firebase_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_eventTouser_metadata" ADD CONSTRAINT "_eventTouser_metadata_A_fkey" FOREIGN KEY ("A") REFERENCES "event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_eventTouser_metadata" ADD CONSTRAINT "_eventTouser_metadata_B_fkey" FOREIGN KEY ("B") REFERENCES "user_metadata"("firebase_id") ON DELETE CASCADE ON UPDATE CASCADE;
