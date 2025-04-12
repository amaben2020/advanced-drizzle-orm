ALTER TABLE "transactions_table" RENAME COLUMN "user_id" TO "sender_id";--> statement-breakpoint
ALTER TABLE "transactions_table" DROP CONSTRAINT "transactions_table_user_id_users_table_id_fk";
--> statement-breakpoint
ALTER TABLE "transactions_table" ADD COLUMN "receiver_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "transactions_table" ADD CONSTRAINT "transactions_table_sender_id_users_table_id_fk" FOREIGN KEY ("sender_id") REFERENCES "public"."users_table"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions_table" ADD CONSTRAINT "transactions_table_receiver_id_users_table_id_fk" FOREIGN KEY ("receiver_id") REFERENCES "public"."users_table"("id") ON DELETE cascade ON UPDATE no action;