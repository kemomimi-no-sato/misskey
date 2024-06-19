export class DeleteCreatedAt1697737204579 {
	name = 'DeleteCreatedAt1697737204579'

	async up(queryRunner) {
		await queryRunner.query(`ALTER TABLE "messaging_message" DROP COLUMN "createdAt"`);
		await queryRunner.query(`ALTER TABLE "user_group" DROP COLUMN "createdAt"`);
		await queryRunner.query(`ALTER TABLE "user_group_invitation" DROP COLUMN "createdAt"`);
		await queryRunner.query(`ALTER TABLE "user_group_invite" DROP COLUMN "createdAt"`);
		await queryRunner.query(`ALTER TABLE "user_group_joining" DROP COLUMN "createdAt"`);
	}

	async down(queryRunner) {
		await queryRunner.query(`ALTER TABLE "user_group_joining" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL`);
		await queryRunner.query(`ALTER TABLE "user_group_invite" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL`);
		await queryRunner.query(`ALTER TABLE "user_group_invitation" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL`);
		await queryRunner.query(`ALTER TABLE "user_group" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL`);
		await queryRunner.query(`ALTER TABLE "messaging_message" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL`);
	}

}
