import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateContranstPositionCategories1681789773456 implements MigrationInterface {
    name = 'UpdateContranstPositionCategories1681789773456'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "position_categories" DROP CONSTRAINT "UQ_2b03ba25b544ad1c334ce6c5bef"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "position_categories" ADD CONSTRAINT "UQ_2b03ba25b544ad1c334ce6c5bef" UNIQUE ("level")`);
    }

}
