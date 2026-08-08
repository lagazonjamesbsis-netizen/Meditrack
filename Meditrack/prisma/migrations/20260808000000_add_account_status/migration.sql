-- CreateEnum
CREATE TYPE "AccountStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "User" ADD COLUMN "status" "AccountStatus" NOT NULL DEFAULT 'PENDING';

-- Backfill: existing users keep access (approval applies to new registrations only)
UPDATE "User" SET "status" = 'APPROVED' WHERE "deletedAt" IS NULL;
