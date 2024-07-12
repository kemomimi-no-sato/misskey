/*
 * SPDX-FileCopyrightText: syuilo and misskey-project
 * SPDX-License-Identifier: AGPL-3.0-only
 */

export class roleIsBgColor1720809981448 {
	name = 'roleIsBgColor1720809981448'

	async up(queryRunner) {
			await queryRunner.query(`ALTER TABLE "role" ADD "isBgColor" boolean NOT NULL DEFAULT false`);
	}

	async down(queryRunner) {
			await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "isBgColor"`);
	}
}
