import { MigrationInterface, QueryRunner } from "typeorm"

export class RenameReadersTable1737257394399 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ReadersTable" RENAME TO readers_table;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE readers_table RENAME TO "ReadersTable";`);
    }

}
