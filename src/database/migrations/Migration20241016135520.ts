import { Migration } from '@mikro-orm/migrations';

export class Migration20241016135520 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `alter table "user" add column "created_at" timestamptz not null, add column "updated_at" timestamptz not null;`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(
      `alter table "user" drop column "created_at", drop column "updated_at";`,
    );
  }
}
