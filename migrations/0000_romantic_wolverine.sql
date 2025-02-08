CREATE TYPE "public"."borrow_status" AS ENUM('BORROWED', 'RETURNED');--> statement-breakpoint
CREATE TYPE "public"."roles" AS ENUM('USER', 'ADMIN');--> statement-breakpoint
CREATE TYPE "public"."stats" AS ENUM('ACCEPTED', 'REJECTED', 'PENDING');--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"full_name" varchar(255) NOT NULL,
	"university_id" integer NOT NULL,
	"university_card" text NOT NULL,
	"role" "roles" DEFAULT 'USER' NOT NULL,
	"status" "stats" DEFAULT 'PENDING' NOT NULL,
	"borrowedBooksStatus" "borrow_status" DEFAULT 'RETURNED' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"last_Activity_date" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_id_unique" UNIQUE("id"),
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_university_id_unique" UNIQUE("university_id")
);
