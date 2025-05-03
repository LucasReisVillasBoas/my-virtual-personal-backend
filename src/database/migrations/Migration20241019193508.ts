import { Migration } from '@mikro-orm/migrations';

export class Migration20241019193508 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "training" drop constraint "training_user_id_foreign";`);

    this.addSql(`drop index "training_user_id_index";`);
    this.addSql(`alter table "training" drop column "user_id";`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "training" add column "user_id" uuid not null;`);
    this.addSql(`alter table "training" add constraint "training_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;`);
    this.addSql(`create index "training_user_id_index" on "training" ("user_id");`);
  }

}
