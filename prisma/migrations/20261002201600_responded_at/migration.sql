-- Release 1 of 2 (expand): purely additive, so the previous release keeps working while this deploys.
-- Release 2 will backfill any stragglers and drop "hasResponded".

-- AlterTable
ALTER TABLE "FormSubmission" ADD COLUMN     "respondedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- Backfill: the real response time was never recorded, so use the submission time
UPDATE "FormSubmission" SET "respondedAt" = "createdAt" WHERE "hasResponded" = true;

-- CreateIndex
CREATE INDEX "FormSubmission_createdAt_idx" ON "FormSubmission"("createdAt");
