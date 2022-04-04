import { MigrationInterface, QueryRunner } from 'typeorm';

export class seeds1649086390446 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO "user" (id, "createdAt", username) VALUES('ea38bc9b-b770-4848-a736-9d44d5841641'::uuid, '2022-04-04 10:33:47.470', 'user1')`,
    );
    await queryRunner.query(
      `INSERT INTO "user" (id, "createdAt", username) VALUES('f528b4d5-f6a1-408e-bb2c-9e2a90363233'::uuid, '2022-04-04 10:33:47.570', 'user2')`,
    );

    await queryRunner.query(
      `INSERT INTO post (id, message, "type", "createdAt", "dateIdCursor", "authorId", "referencedPostId") VALUES('31068b45-1d63-4961-b61b-20481e815700'::uuid, 'My message 0', '0'::post_type_enum::post_type_enum, '2022-04-04 10:33:46.000', '2022-04-04 10:33:46.47031068b45-1d63-4961-b61b-20481e815700', 'f528b4d5-f6a1-408e-bb2c-9e2a90363233'::uuid, NULL)`,
    );

    await queryRunner.query(
      `INSERT INTO post (id, message, "type", "createdAt", "dateIdCursor", "authorId", "referencedPostId") VALUES('31068b45-1d63-4961-b61b-20481e815701'::uuid, 'My message 1', '0'::post_type_enum::post_type_enum, '2022-04-04 10:33:47.000', '2022-04-04 10:33:47.47031068b45-1d63-4961-b61b-20481e815701', 'f528b4d5-f6a1-408e-bb2c-9e2a90363233'::uuid, NULL)`,
    );

    await queryRunner.query(
      `INSERT INTO post (id, message, "type", "createdAt", "dateIdCursor", "authorId", "referencedPostId") VALUES('31068b45-1d63-4961-b61b-20481e815702'::uuid, 'My message 2', '0'::post_type_enum::post_type_enum, '2022-04-04 10:33:48.000', '2022-04-04 10:33:48.47031068b45-1d63-4961-b61b-20481e815702', 'f528b4d5-f6a1-408e-bb2c-9e2a90363233'::uuid, NULL)`,
    );

    await queryRunner.query(
      `INSERT INTO post (id, message, "type", "createdAt", "dateIdCursor", "authorId", "referencedPostId") VALUES('31068b45-1d63-4961-b61b-20481e815703'::uuid, 'My message 3', '0'::post_type_enum::post_type_enum, '2022-04-04 10:33:49.000', '2022-04-04 10:33:49.47031068b45-1d63-4961-b61b-20481e815703', 'f528b4d5-f6a1-408e-bb2c-9e2a90363233'::uuid, NULL)`,
    );

    await queryRunner.query(
      `INSERT INTO post (id, message, "type", "createdAt", "dateIdCursor", "authorId", "referencedPostId") VALUES('31068b45-1d63-4961-b61b-20481e815704'::uuid, 'My message 4', '0'::post_type_enum::post_type_enum, '2022-04-04 10:33:50.000', '2022-04-04 10:33:50.47031068b45-1d63-4961-b61b-20481e815704', 'f528b4d5-f6a1-408e-bb2c-9e2a90363233'::uuid, NULL)`,
    );

    await queryRunner.query(
      `INSERT INTO post (id, message, "type", "createdAt", "dateIdCursor", "authorId", "referencedPostId") VALUES('31068b45-1d63-4961-b61b-20481e815705'::uuid, 'My message 5', '0'::post_type_enum::post_type_enum, '2022-04-04 10:33:51.000', '2022-04-04 10:33:51.47031068b45-1d63-4961-b61b-20481e815705', 'f528b4d5-f6a1-408e-bb2c-9e2a90363233'::uuid, NULL)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM post WHERE id='31068b45-1d63-4961-b61b-20481e815700'::uuid`,
    );

    await queryRunner.query(
      `DELETE FROM post WHERE id='31068b45-1d63-4961-b61b-20481e815701'::uuid`,
    );

    await queryRunner.query(
      `DELETE FROM post WHERE id='31068b45-1d63-4961-b61b-20481e815702'::uuid`,
    );

    await queryRunner.query(
      `DELETE FROM post WHERE id='31068b45-1d63-4961-b61b-20481e815703'::uuid`,
    );

    await queryRunner.query(
      `DELETE FROM post WHERE id='31068b45-1d63-4961-b61b-20481e815704'::uuid`,
    );

    await queryRunner.query(
      `DELETE FROM post WHERE id='31068b45-1d63-4961-b61b-20481e815705'::uuid`,
    );

    await queryRunner.query(
      `DELETE FROM "user" WHERE id='ea38bc9b-b770-4848-a736-9d44d5841641'::uuid`,
    );

    await queryRunner.query(
      `DELETE FROM "user" WHERE id='f528b4d5-f6a1-408e-bb2c-9e2a90363233'::uuid`,
    );
  }
}
