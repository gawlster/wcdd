-- Release 2 of 2 (contract): only safe once the release that stopped using "hasResponded" is live.

-- Catch rows the previous release marked as responded during the release-1 deploy window
UPDATE "FormSubmission" SET "respondedAt" = "createdAt" WHERE "hasResponded" = true AND "respondedAt" IS NULL;

-- AlterTable
ALTER TABLE "FormSubmission" DROP COLUMN "hasResponded";
