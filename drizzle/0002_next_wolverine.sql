CREATE TABLE "transactions_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"amount_sent" integer DEFAULT 0
);
--> statement-breakpoint
ALTER TABLE "transactions_table" ADD CONSTRAINT "transactions_table_user_id_users_table_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users_table"("id") ON DELETE cascade ON UPDATE no action;