import { Migration } from '@mikro-orm/migrations';

export class Migration20241016163002 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `create table "exercise_muscle_group_list" ("exercise_id" uuid not null, "muscle_group_id" uuid not null, constraint "exercise_muscle_group_list_pkey" primary key ("exercise_id", "muscle_group_id"));`,
    );

    this.addSql(
      `create table "training_exercise" ("id" uuid not null default gen_random_uuid(), "created_at" timestamptz not null, "updated_at" timestamptz not null, "sets" int null, "reps" varchar(255) null, "rest_time" varchar(255) null, "training_id" uuid null, "exercise_id" uuid null, constraint "training_exercise_pkey" primary key ("id"));`,
    );
    this.addSql(
      `create index "training_exercise_training_id_index" on "training_exercise" ("training_id");`,
    );
    this.addSql(
      `create index "training_exercise_exercise_id_index" on "training_exercise" ("exercise_id");`,
    );

    this.addSql(
      `alter table "exercise_muscle_group_list" add constraint "exercise_muscle_group_list_exercise_id_foreign" foreign key ("exercise_id") references "exercise" ("id") on update cascade on delete cascade;`,
    );
    this.addSql(
      `alter table "exercise_muscle_group_list" add constraint "exercise_muscle_group_list_muscle_group_id_foreign" foreign key ("muscle_group_id") references "muscle_group" ("id") on update cascade on delete cascade;`,
    );

    this.addSql(
      `alter table "training_exercise" add constraint "training_exercise_training_id_foreign" foreign key ("training_id") references "training" ("id") on update cascade on delete set null;`,
    );
    this.addSql(
      `alter table "training_exercise" add constraint "training_exercise_exercise_id_foreign" foreign key ("exercise_id") references "exercise" ("id") on update cascade on delete set null;`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "exercise_muscle_group_list" cascade;`);

    this.addSql(`drop table if exists "training_exercise" cascade;`);
  }
}
