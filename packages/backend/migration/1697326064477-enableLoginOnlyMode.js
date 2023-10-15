export class EnableLoginOnlyMode1697326064477 {
    name = 'EnableLoginOnlyMode1697326064477'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "meta" ADD "enableLoginOnlyMode" boolean NOT NULL DEFAULT false`);
    }

    async down(queryRunner) {
			await queryRunner.query(`ALTER TABLE "meta" DROP COLUMN "enableLoginOnlyMode" boolean NOT NULL DEFAULT false`);
    }
}
