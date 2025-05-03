import { Migration } from '@mikro-orm/migrations';

export class Migration20241019195156 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "training_type" add constraint "training_type_code_unique" unique ("code");`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "training_type" drop constraint "training_type_code_unique";`);
  }

}
