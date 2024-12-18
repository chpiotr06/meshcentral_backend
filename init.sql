-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "organizationId" INTEGER,
ADD COLUMN     "password" CHAR(60) NOT NULL,
ADD COLUMN     "isAdmin" BOOLEAN DEFAULT FALSE;


-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "country" TEXT NOT NULL,
    "postal" TEXT NOT NULL,
    "addressLine1" TEXT NOT NULL,
    "addressLine2" TEXT NOT NULL,
    "addressLine3" TEXT,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Organization" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "addressId" INTEGER NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

INSERT INTO "Address" (id, country, postal, "addressLine1", "addressLine2", "addressLine3") VALUES (1, 'USA', '95134', 'Cisco Systems, Inc.', '170 West Tasman Dr.', 'San Jose, CA');
INSERT INTO "Address" (id, country, postal, "addressLine1", "addressLine2", "addressLine3") VALUES (2, 'Poland', '30-059', 'Akademia Górniczo-Hutnicza im. Stanisława Staszica w Krakowie', 'al. Mickiewicza 30', null);
INSERT INTO "Address" (id, country, postal, "addressLine1", "addressLine2", "addressLine3") VALUES (3, 'Poland', '02-222', 'Microsoft Sp. z o.o.', 'Al. Jerozolimskie 195a', null);
INSERT INTO "Address" (id, country, postal, "addressLine1", "addressLine2", "addressLine3") VALUES (4, 'USA', '12-123', 'Google HQ ', '1600 Amphitheatre Parkway', 'Mountain View, CA');

INSERT INTO "Organization" (id, name, "addressId") VALUES (1, 'Cisco', 1);
INSERT INTO "Organization" (id, name, "addressId") VALUES (2, 'AGH', 2);
INSERT INTO "Organization" (id, name, "addressId") VALUES (3, 'Microsoft', 3);
INSERT INTO "Organization" (id, name, "addressId") VALUES (4, 'Google', 4);


INSERT INTO "User" (id, email, password, "organizationId", "createdAt", "isAdmin") VALUES (2, 'test2@test.com', '$2b$10$MAMUVuA2GBanFwoh0xrfsuugKjv6OSLtNSvxfJh4KXcy9dvMHw10q', 1, '2024-12-06 19:09:08.237', false);
INSERT INTO "User" (id, email, password, "organizationId", "createdAt", "isAdmin") VALUES (22, 'test4@example.com', '$2b$10$sKrIwZzBkvQnmkRtQ0vCde/Z2tQCnqkrfpJcgk906fxPwnsrF9Mw6', null, '2024-12-13 16:22:43.326', false);
INSERT INTO "User" (id, email, password, "organizationId", "createdAt", "isAdmin") VALUES (23, 'test5@example.com', '$2b$10$JFo9WkrAgyPSxr3QD9WGSe9OdjeO22bzefoBZ6nkTYwuxClUS4i3K', null, '2024-12-13 17:14:37.088', false);
INSERT INTO "User" (id, email, password, "organizationId", "createdAt", "isAdmin") VALUES (21, 'test3@example.com', '$2b$10$9hOX3vTJ/Vvq2m/qwVz4yedhQgH75kUYDT9jIOy31omhilnF2mi0a', null, '2024-12-13 16:18:37.438', false);
INSERT INTO "User" (id, email, password, "organizationId", "createdAt", "isAdmin") VALUES (1, 'test@test.com', '$2b$10$iwxspVhE4PgpKxvjqXzCiu0B..QN/LNIws178OKFx5XBmFH1NDs1u', null, '2024-11-04 16:13:18.973', true);


