import { Migration } from '@mikro-orm/migrations';

export class Migration20241015213537 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `alter table "user" drop column "username", drop column "email";`,
    );

    this.addSql(
      `alter table "user" add column "full_name" varchar(255) not null, add column "nickname" varchar(255) null, add column "age" varchar(255) not null, add column "height" varchar(255) not null, add column "weight" varchar(255) not null;`,
    );
    this.addSql(`alter table "user" alter column "id" drop default;`);
    this.addSql(
      `alter table "user" alter column "id" type uuid using ("id"::text::uuid);`,
    );
    this.addSql(
      `alter table "user" alter column "id" set default gen_random_uuid();`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(
      `alter table "user" alter column "id" type text using ("id"::text);`,
    );

    this.addSql(
      `alter table "user" drop column "full_name", drop column "nickname", drop column "age", drop column "height", drop column "weight";`,
    );

    this.addSql(
      `alter table "user" add column "username" varchar(255) not null, add column "email" varchar(255) not null;`,
    );
    this.addSql(`alter table "user" alter column "id" drop default;`);
    this.addSql(
      `alter table "user" alter column "id" type int using ("id"::int);`,
    );
    this.addSql(`create sequence if not exists "user_id_seq";`);
    this.addSql(
      `select setval('user_id_seq', (select max("id") from "user"));`,
    );
    this.addSql(
      `alter table "user" alter column "id" set default nextval('user_id_seq');`,
    );
  }
}
