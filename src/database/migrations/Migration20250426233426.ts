import { Migration } from '@mikro-orm/migrations';

export class Migration20250426233426 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `create table "user_professionals" ("user_1_id" uuid not null, "user_2_id" uuid not null, constraint "user_professionals_pkey" primary key ("user_1_id", "user_2_id"));`,
    );

    this.addSql(
      `alter table "user_professionals" add constraint "user_professionals_user_1_id_foreign" foreign key ("user_1_id") references "user" ("id") on update cascade on delete cascade;`,
    );
    this.addSql(
      `alter table "user_professionals" add constraint "user_professionals_user_2_id_foreign" foreign key ("user_2_id") references "user" ("id") on update cascade on delete cascade;`,
    );

    this.addSql(
      `alter table "user" add column "role" text check ("role" in ('user', 'personal_trainer', 'nutritionist', 'gym')) not null;`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "user_professionals" cascade;`);

    this.addSql(`alter table "user" drop column "role";`);
  }
}
