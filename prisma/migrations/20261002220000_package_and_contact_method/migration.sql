-- Purely additive and nullable, so the previous release keeps inserting rows while this deploys.
-- Existing rows stay null: they were submitted before the form asked for these.

-- CreateEnum
CREATE TYPE "ContactMethod" AS ENUM ('phone', 'email');

-- AlterTable
ALTER TABLE "FormSubmission" ADD COLUMN     "packageId" TEXT,
ADD COLUMN     "preferredContact" "ContactMethod";
