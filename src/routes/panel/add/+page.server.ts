import { PrismaClient } from '@prisma/client';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ request }: any) => {
		const prisma = new PrismaClient();

		let body = await request.formData();

		let errorMessage = [];

		if (!body.get('email')) errorMessage.push('Email is required');
		if (!body.get('firstName')) errorMessage.push('First Name is required');
		if (!body.get('lastName')) errorMessage.push('Last Name is required');
		if (!body.get('city')) errorMessage.push('City is required');
		if (!body.get('county')) errorMessage.push('County is required');
		if (!body.get('house')) errorMessage.push('House is required');
		if (!body.get('street')) errorMessage.push('Street is required');
		if (!body.get('postcode')) errorMessage.push('Postcode is required');
		if (!body.get('phonenumber')) errorMessage.push('Phone Number is required');
		if (!body.get('date_of_birth')) errorMessage.push('Date of Birth is required');

		if (errorMessage.length) {
			return fail(400, { error: errorMessage });
		}

		const user = await prisma.patient.create({
			data: {
				email: body.get('email'),
				firstName: body.get('firstName'),
				lastName: body.get('lastName'),
				city: body.get('city'),
				county: body.get('county'),
				house: body.get('house'),
				street: body.get('street'),
				postcode: body.get('postcode'),
				phonenumber: body.get('phonenumber'),
				date_of_birth: body.get('date_of_birth')
			}
		});

		throw redirect(307, '/panel');
	}
};
