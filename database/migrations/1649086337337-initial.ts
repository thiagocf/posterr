import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1649086337337 implements MigrationInterface {
    name = 'initial1649086337337'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_follow_link" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "followerUserId" uuid NOT NULL, "followingUserId" uuid NOT NULL, CONSTRAINT "PK_e84432ddc145b50bea1a1dbaef6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_554d27a4a101ac0a104b343676" ON "user_follow_link" ("followerUserId", "followingUserId") `);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL, "username" character varying(14) NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."post_type_enum" AS ENUM('0', '1', '2')`);
        await queryRunner.query(`CREATE TABLE "post" ("id" uuid NOT NULL, "message" character varying(777) NOT NULL, "type" "public"."post_type_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL, "dateIdCursor" character varying(60) NOT NULL, "authorId" uuid NOT NULL, "referencedPostId" uuid, CONSTRAINT "UQ_7f0ad1c85d41b5c7651f403d657" UNIQUE ("dateIdCursor"), CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_follow_link" ADD CONSTRAINT "FK_14559189082c8df2f5bd4841c35" FOREIGN KEY ("followerUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_follow_link" ADD CONSTRAINT "FK_e9455baeb80e5f6906053f08a0a" FOREIGN KEY ("followingUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_c6fb082a3114f35d0cc27c518e0" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_f893299bb890553faf1a9b9e646" FOREIGN KEY ("referencedPostId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_f893299bb890553faf1a9b9e646"`);
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_c6fb082a3114f35d0cc27c518e0"`);
        await queryRunner.query(`ALTER TABLE "user_follow_link" DROP CONSTRAINT "FK_e9455baeb80e5f6906053f08a0a"`);
        await queryRunner.query(`ALTER TABLE "user_follow_link" DROP CONSTRAINT "FK_14559189082c8df2f5bd4841c35"`);
        await queryRunner.query(`DROP TABLE "post"`);
        await queryRunner.query(`DROP TYPE "public"."post_type_enum"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_554d27a4a101ac0a104b343676"`);
        await queryRunner.query(`DROP TABLE "user_follow_link"`);
    }

}
