import { PrismaClient } from '@prisma/client';
import { fail, redirect } from '@sveltejs/kit';
import * as bcrypt from 'bcrypt';

export const actions = {
	default: async ({ request }: any) => {
		const prisma = new PrismaClient();

		let body = await request.formData();

		let errorMessage = [];

		console.log(body);

		if (!body.get('fname')) errorMessage.push('First name is required');
		if (!body.get('lname')) errorMessage.push('Last name is required');
		if (!body.get('email')) errorMessage.push('Email is required');
		if (!body.get('name')) errorMessage.push('Name is required');
		if (!body.get('password')) errorMessage.push('Password is required');
		if (!body.get('password') !== body.get('cpassword')) errorMessage.push('Password does not match');
		if (body.get('role') == 'consultant' && !body.get('specialism')) errorMessage.push('Specialism is required');
		if (body.get('role') == 'nurse' && !body.get('ward')) errorMessage.push('Ward is required');

		if (errorMessage.length) {
			return fail(400, { error: errorMessage });
		}

		let password = await bcrypt.hash(body.get('password'), 10);

		if (body.get('role') == 'nurse') {
			const user = await prisma.nurse.create({
				data: {
					firstName: body.get('fname'),
					lastName: body.get('lname'),
					email: body.get('email'),
					password,
					ward: body.get('ward')
				}
			});
		} else {
			const user = await prisma.consultant.create({
				data: {
					firstName: body.get('fname'),
					lastName: body.get('lname'),
					email: body.get('email'),
					password,
					specialism: body.get('specialism')
				}
			});
		}

		throw redirect(307, '/admin/users');
	}
};
