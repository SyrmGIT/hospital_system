-- CreateTable
CREATE TABLE "Patient" (
    "PatientId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Email" TEXT NOT NULL,
    "FirstName" TEXT NOT NULL,
    "LastName" TEXT NOT NULL,
    "City" TEXT NOT NULL,
    "Street" TEXT NOT NULL,
    "County" TEXT NOT NULL,
    "House" TEXT,
    "Postcode" TEXT NOT NULL,
    "Phonenumber" TEXT,
    "wardWardId" INTEGER,
    CONSTRAINT "Patient_wardWardId_fkey" FOREIGN KEY ("wardWardId") REFERENCES "Ward" ("WardId") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Consultant" (
    "ConsultantId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Email" TEXT NOT NULL,
    "FirstName" TEXT NOT NULL,
    "LastName" TEXT NOT NULL,
    "Specialism" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Nurse" (
    "NurseId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "FirstName" TEXT NOT NULL,
    "LastName" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "WardId" INTEGER NOT NULL,
    CONSTRAINT "Nurse_WardId_fkey" FOREIGN KEY ("WardId") REFERENCES "Ward" ("WardId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Ward" (
    "WardId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "WardName" TEXT NOT NULL,
    "BedCount" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Patient_Email_key" ON "Patient"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "Consultant_Email_key" ON "Consultant"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "Nurse_Email_key" ON "Nurse"("Email");
