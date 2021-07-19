import {MigrationInterface, QueryRunner} from "typeorm";

export class initialMigration1626714913033 implements MigrationInterface {
    name = 'initialMigration1626714913033'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "todo" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "isCompleted" boolean NOT NULL DEFAULT false, "folderId" integer, "userId" integer, CONSTRAINT "PK_d429b7114371f6a35c5cb4776a7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "folder" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_6278a41a706740c94c02e288df8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "todo" ADD CONSTRAINT "FK_b9ab0f64f8c8161a7b6f1b5932c" FOREIGN KEY ("folderId") REFERENCES "folder"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "todo" ADD CONSTRAINT "FK_1e982e43f63a98ad9918a86035c" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo" DROP CONSTRAINT "FK_1e982e43f63a98ad9918a86035c"`);
        await queryRunner.query(`ALTER TABLE "todo" DROP CONSTRAINT "FK_b9ab0f64f8c8161a7b6f1b5932c"`);
        await queryRunner.query(`DROP TABLE "folder"`);
        await queryRunner.query(`DROP TABLE "todo"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
