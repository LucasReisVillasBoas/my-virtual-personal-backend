import { Migration } from '@mikro-orm/migrations';

export class Migration20250724002214_create_additional_info_table extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "additional_info" (
      "id" uuid not null default gen_random_uuid(),
      "created_at" timestamptz not null,
      "updated_at" timestamptz not null,
      "user_id" uuid not null,
      "pre_existing_health_conditions" text[] null,
      "medication_use" text[] null,
      "time_training_weightlifting" varchar(255) null,
      "training_frequency" varchar(255) null,
      "time_availability_per_training" varchar(255) null,
      "other_regular_physical_activity" text[] null,
      "liked_disliked_exercises" varchar(255) null,
      "muscle_focus" text[] null,
      constraint "additional_info_pkey" primary key ("id")
    );`);

    this.addSql(`create index "additional_info_user_id_index" on "additional_info" ("user_id");`);

    this.addSql(`alter table "additional_info" add constraint "additional_info_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "additional_info" cascade;`);
  }

}
