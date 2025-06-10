import { Migration } from '@mikro-orm/migrations';

export class Migration20250505230342 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "professionals" add column "email" varchar(255) not null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "professionals" drop column "email";`);
  }

}
