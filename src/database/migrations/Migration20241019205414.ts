import { Migration } from '@mikro-orm/migrations';

export class Migration20241019205414 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "exercise" add constraint "exercise_code_unique" unique ("code");`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "exercise" drop constraint "exercise_code_unique";`);
  }

}
