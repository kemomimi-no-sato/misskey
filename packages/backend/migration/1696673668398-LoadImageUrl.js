export class LoadImageUrl1696673668398 {
    name = 'LoadImageUrl1696673668398'

    async up(queryRunner) {
			await queryRunner.query(`ALTER TABLE "meta" ADD "loadImageUrl" character varying(1024)`);
			await queryRunner.query(`ALTER TABLE "meta" ADD "splashImageUrl" character varying(1024)`);
	}

	async down(queryRunner) {
			await queryRunner.query(`ALTER TABLE "meta" DROP COLUMN "loadImageUrl"`);
			await queryRunner.query(`ALTER TABLE "meta" DROP COLUMN "splashImageUrl"`);
	}
}

