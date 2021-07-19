import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from 'typeorm';

export class CreateSchema1626655800554 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "user",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: "firstName",
                    type: "varchar",
                },
                {
                    name: "lastName",
                    type: "varchar",
                },
            ]
        }), true)

        await queryRunner.createTable(new Table({
            name: "folder",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: "name",
                    type: "varchar",
                }
            ]
        }), true)

        await queryRunner.createTable(new Table({
            name: "todo",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: "name",
                    type: "varchar",
                },
                {
                    name: "description",
                    type: "varchar",
                },
                {
                    name: "isCompleted",
                    type: "boolean",
                }
            ]
        }), true);

        await queryRunner.addColumn("todo", new TableColumn({
            name: "folderId",
            type: "int"
        }));

        await queryRunner.createForeignKey("todo", new TableForeignKey({
            columnNames: ["folderId"],
            referencedColumnNames: ["id"],
            referencedTableName: "folder",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("todo");
        const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("folderId") !== -1);
        await queryRunner.dropForeignKey("todo", foreignKey);
        await queryRunner.dropColumn("todo", "folderId");
        await queryRunner.dropTable("todo");
        await queryRunner.dropTable("folder");
        await queryRunner.dropTable("user");
    }

}

