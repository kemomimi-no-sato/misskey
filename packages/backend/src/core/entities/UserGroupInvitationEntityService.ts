import { Inject, Injectable } from '@nestjs/common';
import { DI } from '@/di-symbols.js';
import type { UserGroupInvitationsRepository } from '@/models/_.js';
import type { } from '@/models/Blocking.js';
import type { MiUserGroupInvitation } from '@/models/UserGroupInvitation.js';
import { bindThis } from '@/decorators.js';
import { UserGroupEntityService } from './UserGroupEntityService.js';

@Injectable()
export class UserGroupInvitationEntityService {
	constructor(
		@Inject(DI.userGroupInvitationsRepository)
		private userGroupInvitationsRepository: UserGroupInvitationsRepository,

		private userGroupEntityService: UserGroupEntityService,
	) {
	}

	@bindThis
	public async pack(
		src: MiUserGroupInvitation['id'] | MiUserGroupInvitation,
	) {
		const invitation = typeof src === 'object' ? src : await this.userGroupInvitationsRepository.findOneByOrFail({ id: src });

		return {
			id: invitation.id,
			group: await this.userGroupEntityService.pack(invitation.userGroup ?? invitation.userGroupId),
		};
	}

	@bindThis
	public packMany(
		invitations: any[],
	) {
		return Promise.all(invitations.map(x => this.pack(x)));
	}
}
