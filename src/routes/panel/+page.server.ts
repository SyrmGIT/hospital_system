import { cookiesToArray } from '$lib/components/ts/cookieHandler';
import { PrismaClient } from '@prisma/client';

export async function load({ request }: any) {
	const prisma = new PrismaClient();
	const patients = await prisma.patient.findMany({});

	let userCookies = request.headers.get('cookie');
	let sessions = await cookiesToArray(userCookies);
	let session_id;

	if (sessions) {
		sessions.forEach((session) => {
			if (session.name == 'session_id') {
				session_id = session.value;
			}
		});
	}

	return {
		patients
	};
}
