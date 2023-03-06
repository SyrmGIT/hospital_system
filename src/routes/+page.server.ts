import { PrismaClient } from '@prisma/client';
import { fail, redirect } from '@sveltejs/kit';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import * as cookieHandler from '$lib/components/ts/cookieHandler';

export async function load({ request }: any) {
	const prisma = new PrismaClient();

	const example = await prisma.consultant.findUnique({
		where: {
			email: 'johndoe@example.com'
		}
	});

	if (!example) {
		await prisma.ward.create({
			data: {
				wardName: 'Example Ward',
				bedCount: 10
			}
		});

		await prisma.consultant.create({
			data: {
				email: 'johndoe@example.com',
				firstName: 'John',
				lastName: 'Doe',
				password: await bcrypt.hash('password', 10),
				specialism: 'General',
				ward: {
					connect: {
						id: 1
					}
				}
			}
		});

		await prisma.patient.create({
			data: {
				email: 'patient@example.com',
				firstName: 'Jerry',
				lastName: 'Brown',
				city: 'London',
				street: '1 Example Street',
				county: 'Greater London',
				house: '1',
				postcode: 'SW1A 1AA',
				date_of_birth: '1990-01-01',
				phonenumber: '01234567890',
				ward: {
					connect: {
						id: 1
					}
				}
			}
		});

		await prisma.nurse.create({
			data: {
				email: 'patient@example.com',
				firstName: 'Jerry',
				lastName: 'Brown',
				password: await bcrypt.hash('password', 10),
				ward: {
					connect: {
						id: 1
					}
				}
			}
		});
	}

	let cookies = request.headers.get('cookie');
	let sessions = await cookieHandler.cookiesToArray(cookies);
	let session_id;

	if (sessions) {
		sessions.forEach((session) => {
			if (session.name == 'session_id') {
				session_id = session.value;
			}
		});
	}

	if (session_id) {
		throw redirect(307, '/panel');
	}

	return;
}

export const actions = {
	default: async ({ request, cookies }: any) => {
		const prisma = new PrismaClient();

		let body = await request.formData();

		let errorMessage = [];

		if (!body.get('email')) errorMessage.push('Email is required');
		if (!body.get('password')) errorMessage.push('Password is required');

		if (errorMessage.length) {
			return fail(400, { error: errorMessage });
		}

		const consultant = await prisma.consultant.findUnique({
			where: {
				email: body.get('email')
			}
		});

		const sessionType = consultant ? 'consultant' : 'nurse';

		const user =
			consultant ||
			(await prisma.nurse.findUnique({
				where: {
					email: body.get('email')
				}
			}));

		if (!user) {
			return fail(400, { error: ['Incorrect details'] });
		}

		let password = await bcrypt.compare(body.get('password'), user.password);

		if (!password) {
			return fail(400, { error: ['Incorrect details'] });
		}

		const sessionToken = crypto.randomBytes(20).toString('hex');

		await prisma.session.create({
			data: {
				userId: user.id,
				sessionType: sessionType,
				session: sessionToken,
				expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
			}
		});

		cookies.set('session_id', sessionToken, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			maxAge: 60 * 60 * 24 * 7, // one week
			secure: true
		});

		throw redirect(307, '/panel');
	}
};
