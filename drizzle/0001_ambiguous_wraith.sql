CREATE TABLE "accounts_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"balance" integer DEFAULT 0
);
--> statement-breakpoint
ALTER TABLE "accounts_table" ADD CONSTRAINT "accounts_table_user_id_users_table_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users_table"("id") ON DELETE cascade ON UPDATE no action;