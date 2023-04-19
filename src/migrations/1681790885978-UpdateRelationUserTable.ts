import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateRelationUserTable1681790885978 implements MigrationInterface {
    name = 'UpdateRelationUserTable1681790885978'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_07e0e701989f1040fadbe54096f"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "REL_07e0e701989f1040fadbe54096"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_07e0e701989f1040fadbe54096f" FOREIGN KEY ("level") REFERENCES "position_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_07e0e701989f1040fadbe54096f"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "REL_07e0e701989f1040fadbe54096" UNIQUE ("level")`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_07e0e701989f1040fadbe54096f" FOREIGN KEY ("level") REFERENCES "position_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
