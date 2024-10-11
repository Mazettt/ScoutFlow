-- CreateEnum
CREATE TYPE "AgeGroup" AS ENUM ('Farfadet', 'Louveteau', 'Scout', 'Pionnier', 'Compagnon');

-- CreateTable
CREATE TABLE "test" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(256) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "test_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(256) NOT NULL,

    CONSTRAINT "role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_metadata" (
    "firebase_id" VARCHAR(256) NOT NULL,

    CONSTRAINT "user_metadata_pkey" PRIMARY KEY ("firebase_id")
);

-- CreateTable
CREATE TABLE "unit" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(256) NOT NULL,
    "age_group" "AgeGroup" NOT NULL,
    "local_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "unit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "local" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(256) NOT NULL,
    "address" VARCHAR(1024) NOT NULL,
    "postalcode" VARCHAR(10) NOT NULL,
    "city" VARCHAR(256) NOT NULL,
    "keyresp_userid" VARCHAR(256) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

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
CREATE TABLE "user_metadataONrole" (
    "user_id" TEXT NOT NULL,
    "role_id" INTEGER NOT NULL,

    CONSTRAINT "user_metadataONrole_pkey" PRIMARY KEY ("user_id","role_id")
);

-- CreateTable
CREATE TABLE "user_metadataONunit" (
    "chef_id" TEXT NOT NULL,
    "unit_id" INTEGER NOT NULL,

    CONSTRAINT "user_metadataONunit_pkey" PRIMARY KEY ("chef_id","unit_id")
);

-- CreateTable
CREATE TABLE "user_metadataONevent" (
    "chef_id" TEXT NOT NULL,
    "event_id" INTEGER NOT NULL,

    CONSTRAINT "user_metadataONevent_pkey" PRIMARY KEY ("chef_id","event_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "role_name_key" ON "role"("name");

-- AddForeignKey
ALTER TABLE "unit" ADD CONSTRAINT "unit_local_id_fkey" FOREIGN KEY ("local_id") REFERENCES "local"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "local" ADD CONSTRAINT "local_keyresp_userid_fkey" FOREIGN KEY ("keyresp_userid") REFERENCES "user_metadata"("firebase_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event" ADD CONSTRAINT "event_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event" ADD CONSTRAINT "event_local_id_fkey" FOREIGN KEY ("local_id") REFERENCES "local"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_metadataONrole" ADD CONSTRAINT "user_metadataONrole_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user_metadata"("firebase_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_metadataONrole" ADD CONSTRAINT "user_metadataONrole_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_metadataONunit" ADD CONSTRAINT "user_metadataONunit_chef_id_fkey" FOREIGN KEY ("chef_id") REFERENCES "user_metadata"("firebase_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_metadataONunit" ADD CONSTRAINT "user_metadataONunit_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_metadataONevent" ADD CONSTRAINT "user_metadataONevent_chef_id_fkey" FOREIGN KEY ("chef_id") REFERENCES "user_metadata"("firebase_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_metadataONevent" ADD CONSTRAINT "user_metadataONevent_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
