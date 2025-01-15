-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" CHAR(60) NOT NULL,
    "organizationId" INTEGER,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

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

-- CreateTable
CREATE TABLE "Devices" (
    "id" SERIAL NOT NULL,
    "uuid" UUID NOT NULL,
    "token" TEXT NOT NULL,
    "mac" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "ipv4" TEXT NOT NULL,
    "firmwareVersion" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "organizationId" INTEGER NOT NULL,

    CONSTRAINT "Devices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Geolocations" (
    "id" SERIAL NOT NULL,
    "deviceId" INTEGER NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Geolocations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Devices_uuid_key" ON "Devices"("uuid");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Devices" ADD CONSTRAINT "Devices_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Geolocations" ADD CONSTRAINT "Geolocations_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Devices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

INSERT INTO "Address" (id, country, postal, "addressLine1", "addressLine2", "addressLine3") VALUES (1, 'USA', '95134', 'Cisco Systems, Inc.', '170 West Tasman Dr.', 'San Jose, CA');
INSERT INTO "Address" (id, country, postal, "addressLine1", "addressLine2", "addressLine3") VALUES (2, 'Poland', '30-059', 'Akademia Górniczo-Hutnicza im. Stanisława Staszica w Krakowie', 'al. Mickiewicza 30', null);
INSERT INTO "Address" (id, country, postal, "addressLine1", "addressLine2", "addressLine3") VALUES (3, 'Poland', '02-222', 'Microsoft Sp. z o.o.', 'Al. Jerozolimskie 195a', null);
INSERT INTO "Address" (id, country, postal, "addressLine1", "addressLine2", "addressLine3") VALUES (4, 'USA', '12-123', 'Google HQ ', '1600 Amphitheatre Parkway', 'Mountain View, CA');

INSERT INTO "Organization" (id, name, "addressId") VALUES (1, 'MeshCentral', 1);
INSERT INTO "Organization" (id, name, "addressId") VALUES (2, 'Inpost', 2);
INSERT INTO "Organization" (id, name, "addressId") VALUES (3, 'Fedex', 3);
INSERT INTO "Organization" (id, name, "addressId") VALUES (4, 'DPD', 4);

INSERT INTO "User" (id, email, password, "organizationId", "createdAt", "isAdmin") VALUES (2, 'test2@test.com', '$2b$10$MAMUVuA2GBanFwoh0xrfsuugKjv6OSLtNSvxfJh4KXcy9dvMHw10q', 1, '2024-12-06 19:09:08.237', false);
INSERT INTO "User" (id, email, password, "organizationId", "createdAt", "isAdmin") VALUES (22, 'test4@example.com', '$2b$10$sKrIwZzBkvQnmkRtQ0vCde/Z2tQCnqkrfpJcgk906fxPwnsrF9Mw6', null, '2024-12-13 16:22:43.326', false);
INSERT INTO "User" (id, email, password, "organizationId", "createdAt", "isAdmin") VALUES (23, 'test5@example.com', '$2b$10$JFo9WkrAgyPSxr3QD9WGSe9OdjeO22bzefoBZ6nkTYwuxClUS4i3K', null, '2024-12-13 17:14:37.088', false);
INSERT INTO "User" (id, email, password, "organizationId", "createdAt", "isAdmin") VALUES (21, 'test3@example.com', '$2b$10$9hOX3vTJ/Vvq2m/qwVz4yedhQgH75kUYDT9jIOy31omhilnF2mi0a', 2, '2024-12-13 16:18:37.438', false);
INSERT INTO "User" (id, email, password, "organizationId", "createdAt", "isAdmin") VALUES (1, 'test@test.com', '$2b$10$iwxspVhE4PgpKxvjqXzCiu0B..QN/LNIws178OKFx5XBmFH1NDs1u', 1, '2024-11-04 16:13:18.973', true);

INSERT INTO public."Devices" (id, uuid, token, mac, name, ipv4, "firmwareVersion", "createdAt", "updatedAt", "organizationId") VALUES (17, '8e7c1813-7151-466f-894b-eaa3a7055c95', '$2b$10$Rq8qxZLkHa0jHPhIN8iAXeMiVCjnGf/p8XdWBJyTWehSDMz6XZRb6', '00:00:00:00:00:00', 'Truck-152', '192.168.1.1', '1.2.3', '2025-01-14 10:30:47.014', '2025-01-14 10:30:47.014', 1);
INSERT INTO public."Devices" (id, uuid, token, mac, name, ipv4, "firmwareVersion", "createdAt", "updatedAt", "organizationId") VALUES (23, '1a594c1e-1b7f-4bbe-ab36-acaf24f81f27', '$2b$10$YLxZafPA3imgAVWCYLl/d.o/cutqogkmyeDrYQatMnLqPn0s0TJGS', 'D0:CC:43:2D:6D:D8', 'Truck-173', '192.168.152.174', '1.2.4', '2025-01-15 10:50:58.599', '2025-01-15 10:50:58.599', 1);
INSERT INTO public."Devices" (id, uuid, token, mac, name, ipv4, "firmwareVersion", "createdAt", "updatedAt", "organizationId") VALUES (25, '4638f5bf-0b55-436d-8f8f-304e9786cd53', '$2b$10$wmLIcU5ncvYeobh5j99WtO8g9Eo8gkuTEkExJWlLlJJBloyQkzVd6', 'AF:43:2D:3B:96:77', 'International-2', '192.168.12.111', '1.1.4', '2025-01-15 11:09:42.186', '2025-01-15 11:09:42.186', 1);
INSERT INTO public."Devices" (id, uuid, token, mac, name, ipv4, "firmwareVersion", "createdAt", "updatedAt", "organizationId") VALUES (26, '3a8fb2d4-cba2-46f7-aa67-23bcb44956c8', '$2b$10$Yv9LlpJJWsgWFOsg9qWfE.L4xOlCOEhUb.tTB8bDLk.lI5fC5p4uK', '55:4D:F2:8C:12:4F', 'Truck-43', '192.168.17.55', '1.1.3', '2025-01-15 11:13:54.066', '2025-01-15 11:13:54.066', 1);
INSERT INTO public."Devices" (id, uuid, token, mac, name, ipv4, "firmwareVersion", "createdAt", "updatedAt", "organizationId") VALUES (27, '9a3a5c89-3d42-4ddd-959a-957a98b8f55b', '$2b$10$.9qQu1TujwKEZtxg23Nk7.Yj9GCaedGqTxvr1rw2NOxZp6g9jvLMy', 'AF:54:D2:F2:C2:12', 'Truck-219', '192.168.55.73', '1.1.4', '2025-01-15 11:18:49.793', '2025-01-15 11:18:49.793', 1);
INSERT INTO public."Devices" (id, uuid, token, mac, name, ipv4, "firmwareVersion", "createdAt", "updatedAt", "organizationId") VALUES (28, 'e54dbe59-f25f-4ea6-914c-7b39f9fe61fc', '$2b$10$4MKWXcXz01u7Flqc6xNwfeu3okFqDojtbBFEa2KM7EcaVE3osXOv6', '00:00:00:00:00:00', 'Truck-1', '192.168.11.32', '1.1.1', '2025-01-15 11:28:17.459', '2025-01-15 11:28:17.459', 2);


INSERT INTO public."Geolocations" (id, "deviceId", longitude, latitude, "addedAt") VALUES (1, 17, 20.085551, 50.066823, '2025-01-14 10:44:50.706');
INSERT INTO public."Geolocations" (id, "deviceId", longitude, latitude, "addedAt") VALUES (2, 17, 20.098586, 50.069839, '2025-01-14 10:45:35.552');
INSERT INTO public."Geolocations" (id, "deviceId", longitude, latitude, "addedAt") VALUES (3, 17, 20.163603, 50.077854, '2025-01-14 10:45:57.440');
INSERT INTO public."Geolocations" (id, "deviceId", longitude, latitude, "addedAt") VALUES (4, 17, 20.238705, 50.088208, '2025-01-14 10:46:23.611');
INSERT INTO public."Geolocations" (id, "deviceId", longitude, latitude, "addedAt") VALUES (5, 17, 20.373116, 50.131143, '2025-01-14 10:47:34.122');
INSERT INTO public."Geolocations" (id, "deviceId", longitude, latitude, "addedAt") VALUES (6, 17, 20.390968, 50.144236, '2025-01-15 10:33:14.491');
INSERT INTO public."Geolocations" (id, "deviceId", longitude, latitude, "addedAt") VALUES (7, 17, 20.510273, 50.144566, '2025-01-15 10:33:30.555');
INSERT INTO public."Geolocations" (id, "deviceId", longitude, latitude, "addedAt") VALUES (8, 17, 20.6567, 50.209867, '2025-01-15 10:33:51.975');
INSERT INTO public."Geolocations" (id, "deviceId", longitude, latitude, "addedAt") VALUES (9, 17, 20.723305, 50.242265, '2025-01-15 10:34:50.306');
INSERT INTO public."Geolocations" (id, "deviceId", longitude, latitude, "addedAt") VALUES (10, 17, 20.807076, 50.301183, '2025-01-15 10:35:12.905');
INSERT INTO public."Geolocations" (id, "deviceId", longitude, latitude, "addedAt") VALUES (11, 17, 20.919514, 50.353238, '2025-01-15 10:35:27.862');
INSERT INTO public."Geolocations" (id, "deviceId", longitude, latitude, "addedAt") VALUES (12, 17, 21.038647, 50.382144, '2025-01-15 10:35:51.938');
INSERT INTO public."Geolocations" (id, "deviceId", longitude, latitude, "addedAt") VALUES (13, 17, 21.114006, 50.4188, '2025-01-15 10:36:12.085');
INSERT INTO public."Geolocations" (id, "deviceId", longitude, latitude, "addedAt") VALUES (14, 17, 21.209106, 50.409612, '2025-01-15 10:36:37.390');
INSERT INTO public."Geolocations" (id, "deviceId", longitude, latitude, "addedAt") VALUES (15, 23, 18.54445, 54.306284, '2025-01-15 10:57:15.957');
INSERT INTO public."Geolocations" (id, "deviceId", longitude, latitude, "addedAt") VALUES (16, 23, 18.555994, 54.306233, '2025-01-15 10:57:46.206');
INSERT INTO public."Geolocations" (id, "deviceId", longitude, latitude, "addedAt") VALUES (17, 23, 18.584232, 54.293988, '2025-01-15 10:58:09.201');
INSERT INTO public."Geolocations" (id, "deviceId", longitude, latitude, "addedAt") VALUES (18, 23, 18.604145, 54.266327, '2025-01-15 10:58:51.681');
INSERT INTO public."Geolocations" (id, "deviceId", longitude, latitude, "addedAt") VALUES (19, 23, 18.691864, 54.100275, '2025-01-15 10:59:31.741');
INSERT INTO public."Geolocations" (id, "deviceId", longitude, latitude, "addedAt") VALUES (20, 23, 18.628693, 53.705649, '2025-01-15 10:59:55.314');
INSERT INTO public."Geolocations" (id, "deviceId", longitude, latitude, "addedAt") VALUES (21, 23, 18.614273, 53.488454, '2025-01-15 11:00:28.220');
INSERT INTO public."Geolocations" (id, "deviceId", longitude, latitude, "addedAt") VALUES (22, 23, 18.636246, 53.455758, '2025-01-15 11:00:42.430');
INSERT INTO public."Geolocations" (id, "deviceId", longitude, latitude, "addedAt") VALUES (23, 23, 18.693924, 53.429583, '2025-01-15 11:01:00.066');
INSERT INTO public."Geolocations" (id, "deviceId", longitude, latitude, "addedAt") VALUES (24, 23, 18.734436, 52.998256, '2025-01-15 11:01:19.052');
INSERT INTO public."Geolocations" (id, "deviceId", longitude, latitude, "addedAt") VALUES (25, 23, 18.722591, 52.976245, '2025-01-15 11:01:48.141');
INSERT INTO public."Geolocations" (id, "deviceId", longitude, latitude, "addedAt") VALUES (26, 23, 18.679848, 52.959187, '2025-01-15 11:02:17.540');
INSERT INTO public."Geolocations" (id, "deviceId", longitude, latitude, "addedAt") VALUES (27, 23, 19.064026, 52.531261, '2025-01-15 11:03:41.830');
INSERT INTO public."Geolocations" (id, "deviceId", longitude, latitude, "addedAt") VALUES (28, 23, 19.456787, 52.231164, '2025-01-15 11:03:58.167');
INSERT INTO public."Geolocations" (id, "deviceId", longitude, latitude, "addedAt") VALUES (29, 23, 19.631796, 51.895298, '2025-01-15 11:04:15.730');
INSERT INTO public."Geolocations" (id, "deviceId", longitude, latitude, "addedAt") VALUES (30, 23, 19.61669, 51.890266, '2025-01-15 11:04:42.945');
INSERT INTO public."Geolocations" (id, "deviceId", longitude, latitude, "addedAt") VALUES (31, 23, 19.572401, 51.882054, '2025-01-15 11:05:13.475');
INSERT INTO public."Geolocations" (id, "deviceId", longitude, latitude, "addedAt") VALUES (32, 23, 19.622955, 51.89069, '2025-01-15 11:05:37.683');
INSERT INTO public."Geolocations" (id, "deviceId", longitude, latitude, "addedAt") VALUES (33, 23, 19.730072, 51.904036, '2025-01-15 11:05:50.956');
INSERT INTO public."Geolocations" (id, "deviceId", longitude, latitude, "addedAt") VALUES (34, 23, 20.030136, 52.038977, '2025-01-15 11:06:05.473');
INSERT INTO public."Geolocations" (id, "deviceId", longitude, latitude, "addedAt") VALUES (35, 23, 20.611725, 52.145288, '2025-01-15 11:06:24.660');
INSERT INTO public."Geolocations" (id, "deviceId", longitude, latitude, "addedAt") VALUES (36, 25, 13.292084, 52.430897, '2025-01-15 11:11:15.417');
INSERT INTO public."Geolocations" (id, "deviceId", longitude, latitude, "addedAt") VALUES (37, 26, 18.694954, 54.391053, '2025-01-15 11:15:09.619');
INSERT INTO public."Geolocations" (id, "deviceId", longitude, latitude, "addedAt") VALUES (38, 27, 16.948128, 51.04501, '2025-01-15 11:20:33.064');
INSERT INTO public."Geolocations" (id, "deviceId", longitude, latitude, "addedAt") VALUES (39, 28, 20.961914, 52.227799, '2025-01-15 11:30:05.673');