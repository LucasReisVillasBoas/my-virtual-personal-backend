import { Migration } from '@mikro-orm/migrations';

export class Migration20241019200154 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "muscle_group" add constraint "muscle_group_code_unique" unique ("code");`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "muscle_group" drop constraint "muscle_group_code_unique";`);
  }

}
