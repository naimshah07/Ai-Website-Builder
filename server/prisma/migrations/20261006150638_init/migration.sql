/*
  Warnings:

  - You are about to drop the column `editable_state` on the `WebsiteProject` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `WebsiteProject` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "WebsiteProject" DROP COLUMN "editable_state",
DROP COLUMN "state";
