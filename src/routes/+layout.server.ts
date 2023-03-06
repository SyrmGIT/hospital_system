import * as cookieHandler from '$lib/components/ts/cookieHandler';
import { PrismaClient, type Consultant, type Nurse, type Session } from '@prisma/client';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ request, cookies }) => {
	let userCookies = request.headers.get('cookie');

	if (!userCookies) {
		return {};
	}

	let sessions = await cookieHandler.cookiesToArray(userCookies);
	let session_id;

	if (sessions) {
		sessions.forEach((session) => {
			if (session.name == 'session_id') {
				session_id = session.value;
			}
		});
	}

	const prisma = new PrismaClient();
	let session: Session | null = null;

	if (session_id) {
		session = await prisma.session.findUnique({
			where: {
				session: session_id
			}
		});

		if (!session) {
			cookies.set('session_id', '', {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				maxAge: -1,
				secure: true
			});

			return {};
		}

		if (session.expires < new Date()) {
			cookies.set('session_id', '', {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				maxAge: -1,
				secure: true
			});

			return {};
		}
	}

	if (!session_id) {
		return {};
	}

	let user: Consultant | Nurse | null = null;

	if (session!.sessionType == 'consultant') {
		user = await prisma.consultant.findUnique({
			where: {
				id: session!.userId
			}
		});
	} else {
		user = await prisma.nurse.findUnique({
			where: {
				id: session!.userId
			}
		});
	}

	console.log(user);

	return user;
}) satisfies LayoutServerLoad;
