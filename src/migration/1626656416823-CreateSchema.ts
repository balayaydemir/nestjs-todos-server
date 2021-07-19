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

        await queryRunner.addColumn("todo", new TableColumn({
            name: "userId",
            type: "int"
        }));

        await queryRunner.createForeignKey("todo", new TableForeignKey({
            columnNames: ["userId"],
            referencedColumnNames: ["id"],
            referencedTableName: "user",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("todo");
        const foreignKey1 = table.foreignKeys.find(fk => fk.columnNames.indexOf("folderId") !== -1);
        const foreignKey2 = table.foreignKeys.find(fk => fk.columnNames.indexOf("userId") !== -1);
        await queryRunner.dropForeignKeys("todo", [foreignKey1, foreignKey2]);
        await queryRunner.dropColumn("todo", "folderId");
        await queryRunner.dropColumn("todo", "userId");
        await queryRunner.dropTable("todo");
        await queryRunner.dropTable("folder");
        await queryRunner.dropTable("user");
    }

}

