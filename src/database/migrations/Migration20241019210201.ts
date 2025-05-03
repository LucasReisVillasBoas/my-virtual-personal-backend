import { Migration } from '@mikro-orm/migrations';

export class Migration20241019210201 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`drop table if exists "exercise_muscle_group_list" cascade;`);

    this.addSql(`alter table "exercise" add column "muscle_group_id" uuid null;`);
    this.addSql(`alter table "exercise" add constraint "exercise_muscle_group_id_foreign" foreign key ("muscle_group_id") references "muscle_group" ("id") on update cascade on delete set null;`);
    this.addSql(`create index "exercise_muscle_group_id_index" on "exercise" ("muscle_group_id");`);
  }

  override async down(): Promise<void> {
    this.addSql(`create table "exercise_muscle_group_list" ("exercise_id" uuid not null, "muscle_group_id" uuid not null, constraint "exercise_muscle_group_list_pkey" primary key ("exercise_id", "muscle_group_id"));`);

    this.addSql(`alter table "exercise_muscle_group_list" add constraint "exercise_muscle_group_list_exercise_id_foreign" foreign key ("exercise_id") references "exercise" ("id") on update cascade on delete cascade;`);
    this.addSql(`alter table "exercise_muscle_group_list" add constraint "exercise_muscle_group_list_muscle_group_id_foreign" foreign key ("muscle_group_id") references "muscle_group" ("id") on update cascade on delete cascade;`);

    this.addSql(`alter table "exercise" drop constraint "exercise_muscle_group_id_foreign";`);

    this.addSql(`drop index "exercise_muscle_group_id_index";`);
    this.addSql(`alter table "exercise" drop column "muscle_group_id";`);
  }

}
