import { Migration } from '@mikro-orm/migrations';

export class Migration20250723234158 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "restriction" add constraint "restriction_code_unique" unique ("code");`);

    this.addSql(`alter table "goals" add constraint "goals_code_unique" unique ("code");`);

    this.addSql(`alter table "exercise" add column "user_id" uuid null;`);
    this.addSql(`alter table "exercise" add constraint "exercise_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete set null;`);
    this.addSql(`create index "exercise_user_id_index" on "exercise" ("user_id");`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "exercise" drop constraint "exercise_user_id_foreign";`);

    this.addSql(`drop index "exercise_user_id_index";`);
    this.addSql(`alter table "exercise" drop column "user_id";`);

    this.addSql(`alter table "restriction" drop constraint "restriction_code_unique";`);

    this.addSql(`alter table "goals" drop constraint "goals_code_unique";`);
  }

}
