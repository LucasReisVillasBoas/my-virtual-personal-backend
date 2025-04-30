import { Migration } from '@mikro-orm/migrations';

export class Migration20241016140417 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `create table "exercise" ("id" uuid not null default gen_random_uuid(), "created_at" timestamptz not null, "updated_at" timestamptz not null, "code" varchar(255) not null, "description" varchar(255) not null, constraint "exercise_pkey" primary key ("id"));`,
    );

    this.addSql(
      `create table "gender" ("id" uuid not null default gen_random_uuid(), "created_at" timestamptz not null, "updated_at" timestamptz not null, "code" varchar(255) not null, "description" varchar(255) not null, constraint "gender_pkey" primary key ("id"));`,
    );

    this.addSql(
      `create table "muscle_group" ("id" uuid not null default gen_random_uuid(), "created_at" timestamptz not null, "updated_at" timestamptz not null, "code" varchar(255) not null, "description" varchar(255) not null, constraint "muscle_group_pkey" primary key ("id"));`,
    );

    this.addSql(
      `create table "restriction" ("id" uuid not null default gen_random_uuid(), "created_at" timestamptz not null, "updated_at" timestamptz not null, "code" varchar(255) not null, "description" varchar(255) not null, constraint "restriction_pkey" primary key ("id"));`,
    );

    this.addSql(
      `create table "training_type" ("id" uuid not null default gen_random_uuid(), "created_at" timestamptz not null, "updated_at" timestamptz not null, "code" varchar(255) not null, "description" varchar(255) not null, constraint "training_type_pkey" primary key ("id"));`,
    );

    this.addSql(
      `create table "goals" ("id" uuid not null default gen_random_uuid(), "created_at" timestamptz not null, "updated_at" timestamptz not null, "code" varchar(255) not null, "description" varchar(255) not null, "active" boolean not null, "user_id" uuid not null, constraint "goals_pkey" primary key ("id"));`,
    );
    this.addSql(`create index "goals_user_id_index" on "goals" ("user_id");`);

    this.addSql(
      `alter table "goals" add constraint "goals_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "exercise" cascade;`);

    this.addSql(`drop table if exists "gender" cascade;`);

    this.addSql(`drop table if exists "muscle_group" cascade;`);

    this.addSql(`drop table if exists "restriction" cascade;`);

    this.addSql(`drop table if exists "training_type" cascade;`);

    this.addSql(`drop table if exists "goals" cascade;`);
  }
}
