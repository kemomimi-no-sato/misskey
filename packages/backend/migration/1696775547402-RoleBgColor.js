export class RoleBgColor1696775547402 {
    name = 'RoleBgColor1696775547402'

    async up(queryRunner) {
			await queryRunner.query(`ALTER TABLE "role" ADD "bgColor" character varying(256)`);
	}

	async down(queryRunner) {
			await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "bgColor"`);
	}
}
