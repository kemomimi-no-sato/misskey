/*
 * SPDX-FileCopyrightText: syuilo and misskey-project
 * SPDX-License-Identifier: AGPL-3.0-only
 */

export class userGroup1718808755000 {
    name = 'userGroup1718808755000'

		async up(queryRunner) {
			await queryRunner.query(`ALTER TABLE "user_profile" ALTER COLUMN "emailNotificationTypes" SET DEFAULT '["follow", "receiveFollowRequest", "groupInvited"]'`);
			await queryRunner.query(`CREATE TYPE "public"."antenna_src_enum_old" AS ENUM('home', 'all', 'users', 'list', 'group')`);
			await queryRunner.query(`ALTER TABLE "antenna" ALTER COLUMN "src" TYPE "public"."antenna_src_enum_old" USING "src"::"text"::"public"."antenna_src_enum_old"`);
			await queryRunner.query(`DROP TYPE "public"."antenna_src_enum"`);
			await queryRunner.query(`ALTER TYPE "public"."antenna_src_enum_old" RENAME TO "antenna_src_enum"`);
			await queryRunner.query(`ALTER TABLE "antenna" ADD "userGroupJoiningId" character varying(32)`);
			await queryRunner.query(`ALTER TABLE "antenna" ADD CONSTRAINT "FK_ccbf5a8c0be4511133dcc50ddeb" FOREIGN KEY ("userGroupJoiningId") REFERENCES "user_group_joining"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
	}

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "antenna" DROP CONSTRAINT "FK_ccbf5a8c0be4511133dcc50ddeb"`);
        await queryRunner.query(`ALTER TABLE "antenna" DROP COLUMN "userGroupJoiningId"`);
        await queryRunner.query(`ALTER TYPE "public"."antenna_src_enum" RENAME TO "antenna_src_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."antenna_src_enum" AS ENUM('home', 'all', 'users', 'list')`);
        await queryRunner.query(`ALTER TABLE "antenna" ALTER COLUMN "src" TYPE "public"."antenna_src_enum" USING "src"::"text"::"public"."antenna_src_enum"`);
        await queryRunner.query(`DROP TYPE "public"."antenna_src_enum_old"`);
        await queryRunner.query(`ALTER TABLE "user_profile" ALTER COLUMN "emailNotificationTypes" SET DEFAULT '["follow","receiveFollowRequest"]'`);
    }
}
