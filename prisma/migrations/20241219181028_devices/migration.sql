-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isAdmin" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Devices" (
    "id" SERIAL NOT NULL,
    "Uuid" UUID NOT NULL,
    "Token" TEXT NOT NULL,
    "Mac" TEXT NOT NULL,
    "FirmwareVersion" TEXT NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,
    "organizationId" INTEGER NOT NULL,

    CONSTRAINT "Devices_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Devices" ADD CONSTRAINT "Devices_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
