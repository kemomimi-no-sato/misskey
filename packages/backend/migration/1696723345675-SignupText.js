export class SignupText1696723345675 {
    name = 'SignupText1696723345675'

	async up(queryRunner) {
		await queryRunner.query(`ALTER TABLE "meta" ADD "signupText" character varying(1024)`);
		await queryRunner.query(`ALTER TABLE "meta" ADD "loginText" character varying(1024)`);
		await queryRunner.query(`ALTER TABLE "meta" ADD "exploreOtherServersText" character varying(1024)`);
	}
	async down(queryRunner) {
			await queryRunner.query(`ALTER TABLE "meta" DROP COLUMN "signupText"`);
			await queryRunner.query(`ALTER TABLE "meta" DROP COLUMN "loginText"`);
			await queryRunner.query(`ALTER TABLE "meta" DROP COLUMN "exploreOtherServersText"`);
	}
}
