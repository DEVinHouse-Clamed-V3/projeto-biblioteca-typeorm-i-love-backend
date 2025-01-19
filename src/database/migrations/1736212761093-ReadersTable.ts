import { MigrationInterface, QueryRunner } from "typeorm"
import { Table } from "typeorm";

export class ReadersTable1736212761093 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "ReadersTable",
                columns: [
                    { name: "id", type: "serial", isPrimary: true },
                    { name: "name", type: "varchar", isNullable: false },
                    { name: "email", type: "varchar", isNullable: false },
                    { name: "phone_number", type: "varchar", isNullable: true },
                    { name: "birthdate", type: "date", isNullable: true },
                    { name: "address", type: "text", isNullable: true },
                    { name: "active", type: "boolean", default: true },
                    { name: "created_at", type: "timestamp", default: "now()" },
                    { name: "updated_at", type: "timestamp", default: "now()" },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("ReadersTable");
    }

}
