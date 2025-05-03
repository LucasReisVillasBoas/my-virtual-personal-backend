import { Migration } from '@mikro-orm/migrations';

export class Migration20250427013149 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `create table "professionals" ("id" uuid not null default gen_random_uuid(), "created_at" timestamptz not null, "updated_at" timestamptz not null, "name" varchar(255) not null, "type" varchar(255) not null, constraint "professionals_pkey" primary key ("id"));`,
    );

    this.addSql(
      `create table "professionals_users" ("professionals_id" uuid not null, "user_id" uuid not null, constraint "professionals_users_pkey" primary key ("professionals_id", "user_id"));`,
    );

    this.addSql(
      `alter table "professionals_users" add constraint "professionals_users_professionals_id_foreign" foreign key ("professionals_id") references "professionals" ("id") on update cascade on delete cascade;`,
    );
    this.addSql(
      `alter table "professionals_users" add constraint "professionals_users_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete cascade;`,
    );

    this.addSql(`drop table if exists "user_professionals" cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(
      `alter table "professionals_users" drop constraint "professionals_users_professionals_id_foreign";`,
    );

    this.addSql(
      `create table "user_professionals" ("user_1_id" uuid not null, "user_2_id" uuid not null, constraint "user_professionals_pkey" primary key ("user_1_id", "user_2_id"));`,
    );

    this.addSql(
      `alter table "user_professionals" add constraint "user_professionals_user_1_id_foreign" foreign key ("user_1_id") references "user" ("id") on update cascade on delete cascade;`,
    );
    this.addSql(
      `alter table "user_professionals" add constraint "user_professionals_user_2_id_foreign" foreign key ("user_2_id") references "user" ("id") on update cascade on delete cascade;`,
    );

    this.addSql(`drop table if exists "professionals" cascade;`);

    this.addSql(`drop table if exists "professionals_users" cascade;`);
  }
}
