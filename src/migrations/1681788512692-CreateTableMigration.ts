import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableMigration1681788512692 implements MigrationInterface {
    name = 'CreateTableMigration1681788512692'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "deletedAt"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "deletedAt" TIMESTAMP`);
    }

}
