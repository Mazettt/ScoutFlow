-- CreateTable
CREATE TABLE "test1" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "test1_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "test2" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "test2_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "test1OnTest2" (
    "test1_id" INTEGER NOT NULL,
    "test2_id" INTEGER NOT NULL,

    CONSTRAINT "test1OnTest2_pkey" PRIMARY KEY ("test1_id","test2_id")
);

-- AddForeignKey
ALTER TABLE "test1OnTest2" ADD CONSTRAINT "test1OnTest2_test1_id_fkey" FOREIGN KEY ("test1_id") REFERENCES "test1"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "test1OnTest2" ADD CONSTRAINT "test1OnTest2_test2_id_fkey" FOREIGN KEY ("test2_id") REFERENCES "test2"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
