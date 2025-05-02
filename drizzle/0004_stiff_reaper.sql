CREATE INDEX "name_idx" ON "transactions_table" USING btree ("amount_sent");--> statement-breakpoint
CREATE UNIQUE INDEX "email_idx" ON "transactions_table" USING btree ("id");--> statement-breakpoint
ALTER TABLE "transactions_table" ADD CONSTRAINT "min_amount_sent" CHECK ("transactions_table"."amount_sent" > 20);--> statement-breakpoint
CREATE VIEW "public"."user_view" AS (select "id", "name", "age", "email" from "users_table" where "users_table"."id" = 5);