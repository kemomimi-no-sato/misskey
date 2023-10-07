export class IsFox1696180972720 {
    name = 'IsFox1696180972720'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" ADD "isFox" boolean NOT NULL DEFAULT false`);
				await queryRunner.query(`COMMENT ON COLUMN "user"."isFox"	IS 'Whether the User is a fox.'`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isFox"`);
    }
}
