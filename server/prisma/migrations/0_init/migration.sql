-- CreateTable
CREATE TABLE "files" (
    "id" SERIAL NOT NULL,
    "vehicle_id" INTEGER,
    "filepath" TEXT,

    CONSTRAINT "files_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "insurer" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "guarantor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "people" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "phone_number" TEXT,
    "driver_license_number" TEXT,
    "id_number" TEXT,
    "current_address" TEXT,
    "business_license_number" TEXT,
    "insurer_plate" TEXT,
    "service_card_number" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transactions" (
    "id" SERIAL NOT NULL,
    "vehicle_id" INTEGER,
    "date" TEXT,
    "amount" TEXT,
    "label" TEXT,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" TEXT,
    "password" TEXT,
    "role" INTEGER,

    CONSTRAINT "users_pkey1" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicle_driver" (
    "id" SERIAL NOT NULL,
    "vehicle_id" INTEGER,
    "user_id" INTEGER,
    "primary" BOOLEAN,

    CONSTRAINT "drivers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicle_insurer" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "vehicle_insurer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicle_owner" (
    "id" SERIAL NOT NULL,
    "vehicle_id" INTEGER,
    "owner_id" INTEGER,
    "date_added" TEXT,

    CONSTRAINT "vehicle_owner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicles" (
    "id" SERIAL NOT NULL,
    "plate" TEXT DEFAULT '000000',
    "vin" TEXT DEFAULT 'ZYX00000000',
    "commercial_license_num" TEXT DEFAULT 'ABC000',
    "vehicle_color" TEXT,
    "vehicle_model" TEXT,
    "fuel_type" BOOLEAN,
    "activation_date" TEXT DEFAULT '1900-01-01',
    "registration_date" TEXT DEFAULT '1900-01-01',
    "notes" TEXT,
    "category" TEXT,
    "owner_id" INTEGER,
    "engine_no" TEXT,

    CONSTRAINT "vehicles_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "files" ADD CONSTRAINT "files_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "payments_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicle_driver" ADD CONSTRAINT "driver_vehicle_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "people"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicle_driver" ADD CONSTRAINT "drivers_vehicle_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "vehicle_owner" ADD CONSTRAINT "vehicle_owner_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "people"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicle_owner" ADD CONSTRAINT "vehicle_owner_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "people"("id") ON DELETE CASCADE ON UPDATE CASCADE;

