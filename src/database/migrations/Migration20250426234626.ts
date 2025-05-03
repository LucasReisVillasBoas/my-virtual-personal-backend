import { Migration } from '@mikro-orm/migrations';

export class Migration20250426234626 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `alter table "user_professionals" drop constraint "user_professionals_user_1_id_foreign";`,
    );
    this.addSql(
      `alter table "user_professionals" drop constraint "user_professionals_user_2_id_foreign";`,
    );

    this.addSql(
      `alter table "user_professionals" drop constraint "user_professionals_pkey";`,
    );
    this.addSql(
      `alter table "user_professionals" drop column "user_1_id", drop column "user_2_id";`,
    );

    this.addSql(
      `alter table "user_professionals" add column "personal_trainer_id" uuid not null, add column "nutritionist_id" uuid not null;`,
    );
    this.addSql(
      `alter table "user_professionals" add constraint "user_professionals_personal_trainer_id_foreign" foreign key ("personal_trainer_id") references "user" ("id") on update cascade on delete cascade;`,
    );
    this.addSql(
      `alter table "user_professionals" add constraint "user_professionals_nutritionist_id_foreign" foreign key ("nutritionist_id") references "user" ("id") on update cascade on delete cascade;`,
    );
    this.addSql(
      `alter table "user_professionals" add constraint "user_professionals_pkey" primary key ("personal_trainer_id", "nutritionist_id");`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(
      `alter table "user_professionals" drop constraint "user_professionals_personal_trainer_id_foreign";`,
    );
    this.addSql(
      `alter table "user_professionals" drop constraint "user_professionals_nutritionist_id_foreign";`,
    );

    this.addSql(
      `alter table "user_professionals" drop constraint "user_professionals_pkey";`,
    );
    this.addSql(
      `alter table "user_professionals" drop column "personal_trainer_id", drop column "nutritionist_id";`,
    );

    this.addSql(
      `alter table "user_professionals" add column "user_1_id" uuid not null, add column "user_2_id" uuid not null;`,
    );
    this.addSql(
      `alter table "user_professionals" add constraint "user_professionals_user_1_id_foreign" foreign key ("user_1_id") references "user" ("id") on update cascade on delete cascade;`,
    );
    this.addSql(
      `alter table "user_professionals" add constraint "user_professionals_user_2_id_foreign" foreign key ("user_2_id") references "user" ("id") on update cascade on delete cascade;`,
    );
    this.addSql(
      `alter table "user_professionals" add constraint "user_professionals_pkey" primary key ("user_1_id", "user_2_id");`,
    );
  }
}
