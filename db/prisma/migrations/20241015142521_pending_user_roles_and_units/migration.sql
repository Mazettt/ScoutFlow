-- CreateTable
CREATE TABLE "pending_user" (
    "firebase_id" VARCHAR(256) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pending_user_pkey" PRIMARY KEY ("firebase_id")
);

-- CreateTable
CREATE TABLE "pending_userONrole" (
    "pending_user_id" TEXT NOT NULL,
    "role_id" INTEGER NOT NULL,

    CONSTRAINT "pending_userONrole_pkey" PRIMARY KEY ("pending_user_id","role_id")
);

-- CreateTable
CREATE TABLE "pending_userONunit" (
    "pending_user_id" TEXT NOT NULL,
    "unit_id" INTEGER NOT NULL,

    CONSTRAINT "pending_userONunit_pkey" PRIMARY KEY ("pending_user_id","unit_id")
);

-- AddForeignKey
ALTER TABLE "pending_userONrole" ADD CONSTRAINT "pending_userONrole_pending_user_id_fkey" FOREIGN KEY ("pending_user_id") REFERENCES "pending_user"("firebase_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pending_userONrole" ADD CONSTRAINT "pending_userONrole_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pending_userONunit" ADD CONSTRAINT "pending_userONunit_pending_user_id_fkey" FOREIGN KEY ("pending_user_id") REFERENCES "pending_user"("firebase_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pending_userONunit" ADD CONSTRAINT "pending_userONunit_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
