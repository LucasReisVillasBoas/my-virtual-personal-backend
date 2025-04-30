import { Migration } from '@mikro-orm/migrations';

export class Migration20241017210843 extends Migration {
  override async up(): Promise<void> {
    this.addSql(`alter table "user" drop constraint "user_gender_id_foreign";`);

    this.addSql(
      `alter table "training" drop constraint "training_user_id_foreign";`,
    );
    this.addSql(
      `alter table "training" drop constraint "training_training_type_id_foreign";`,
    );

    this.addSql(
      `alter table "gender" add constraint "gender_code_unique" unique ("code");`,
    );

    this.addSql(`alter table "user" alter column "gender_id" drop default;`);
    this.addSql(
      `alter table "user" alter column "gender_id" type uuid using ("gender_id"::text::uuid);`,
    );
    this.addSql(`alter table "user" alter column "gender_id" set not null;`);
    this.addSql(
      `alter table "user" add constraint "user_gender_id_foreign" foreign key ("gender_id") references "gender" ("id") on update cascade;`,
    );

    this.addSql(`alter table "training" alter column "user_id" drop default;`);
    this.addSql(
      `alter table "training" alter column "user_id" type uuid using ("user_id"::text::uuid);`,
    );
    this.addSql(`alter table "training" alter column "user_id" set not null;`);
    this.addSql(
      `alter table "training" alter column "training_type_id" drop default;`,
    );
    this.addSql(
      `alter table "training" alter column "training_type_id" type uuid using ("training_type_id"::text::uuid);`,
    );
    this.addSql(
      `alter table "training" alter column "training_type_id" set not null;`,
    );
    this.addSql(
      `alter table "training" add constraint "training_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;`,
    );
    this.addSql(
      `alter table "training" add constraint "training_training_type_id_foreign" foreign key ("training_type_id") references "training_type" ("id") on update cascade;`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "user" drop constraint "user_gender_id_foreign";`);

    this.addSql(
      `alter table "training" drop constraint "training_user_id_foreign";`,
    );
    this.addSql(
      `alter table "training" drop constraint "training_training_type_id_foreign";`,
    );

    this.addSql(`alter table "gender" drop constraint "gender_code_unique";`);

    this.addSql(`alter table "user" alter column "gender_id" drop default;`);
    this.addSql(
      `alter table "user" alter column "gender_id" type uuid using ("gender_id"::text::uuid);`,
    );
    this.addSql(`alter table "user" alter column "gender_id" drop not null;`);
    this.addSql(
      `alter table "user" add constraint "user_gender_id_foreign" foreign key ("gender_id") references "gender" ("id") on update cascade on delete set null;`,
    );

    this.addSql(`alter table "training" alter column "user_id" drop default;`);
    this.addSql(
      `alter table "training" alter column "user_id" type uuid using ("user_id"::text::uuid);`,
    );
    this.addSql(`alter table "training" alter column "user_id" drop not null;`);
    this.addSql(
      `alter table "training" alter column "training_type_id" drop default;`,
    );
    this.addSql(
      `alter table "training" alter column "training_type_id" type uuid using ("training_type_id"::text::uuid);`,
    );
    this.addSql(
      `alter table "training" alter column "training_type_id" drop not null;`,
    );
    this.addSql(
      `alter table "training" add constraint "training_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete set null;`,
    );
    this.addSql(
      `alter table "training" add constraint "training_training_type_id_foreign" foreign key ("training_type_id") references "training_type" ("id") on update cascade on delete set null;`,
    );
  }
}
