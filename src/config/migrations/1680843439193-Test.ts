import { MigrationInterface, QueryRunner } from 'typeorm';

export class Test1680843439193 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('alter table user_profile drop user_no');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
