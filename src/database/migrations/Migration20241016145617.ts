import { Migration } from '@mikro-orm/migrations';

export class Migration20241016145617 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `create table "training" ("id" uuid not null default gen_random_uuid(), "created_at" timestamptz not null, "updated_at" timestamptz not null, "active" boolean not null, "user_id" uuid null, "training_type_id" uuid null, "goals_id" uuid null, constraint "training_pkey" primary key ("id"));`,
    );
    this.addSql(
      `create index "training_user_id_index" on "training" ("user_id");`,
    );
    this.addSql(
      `create index "training_training_type_id_index" on "training" ("training_type_id");`,
    );
    this.addSql(
      `create index "training_goals_id_index" on "training" ("goals_id");`,
    );

    this.addSql(
      `alter table "training" add constraint "training_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete set null;`,
    );
    this.addSql(
      `alter table "training" add constraint "training_training_type_id_foreign" foreign key ("training_type_id") references "training_type" ("id") on update cascade on delete set null;`,
    );
    this.addSql(
      `alter table "training" add constraint "training_goals_id_foreign" foreign key ("goals_id") references "goals" ("id") on update cascade on delete set null;`,
    );

    this.addSql(`alter table "goals" drop constraint "goals_user_id_foreign";`);

    this.addSql(
      `alter table "user" add column "gender_id" uuid null, add column "restriction_id" uuid null;`,
    );
    this.addSql(
      `alter table "user" add constraint "user_gender_id_foreign" foreign key ("gender_id") references "gender" ("id") on update cascade on delete set null;`,
    );
    this.addSql(
      `alter table "user" add constraint "user_restriction_id_foreign" foreign key ("restriction_id") references "restriction" ("id") on update cascade on delete set null;`,
    );
    this.addSql(`create index "user_gender_id_index" on "user" ("gender_id");`);
    this.addSql(
      `create index "user_restriction_id_index" on "user" ("restriction_id");`,
    );

    this.addSql(`alter table "goals" alter column "user_id" drop default;`);
    this.addSql(
      `alter table "goals" alter column "user_id" type uuid using ("user_id"::text::uuid);`,
    );
    this.addSql(`alter table "goals" alter column "user_id" drop not null;`);
    this.addSql(
      `alter table "goals" add constraint "goals_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete set null;`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "training" cascade;`);

    this.addSql(`alter table "user" drop constraint "user_gender_id_foreign";`);
    this.addSql(
      `alter table "user" drop constraint "user_restriction_id_foreign";`,
    );

    this.addSql(`alter table "goals" drop constraint "goals_user_id_foreign";`);

    this.addSql(`drop index "user_gender_id_index";`);
    this.addSql(`drop index "user_restriction_id_index";`);
    this.addSql(
      `alter table "user" drop column "gender_id", drop column "restriction_id";`,
    );

    this.addSql(`alter table "goals" alter column "user_id" drop default;`);
    this.addSql(
      `alter table "goals" alter column "user_id" type uuid using ("user_id"::text::uuid);`,
    );
    this.addSql(`alter table "goals" alter column "user_id" set not null;`);
    this.addSql(
      `alter table "goals" add constraint "goals_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;`,
    );
  }
}
