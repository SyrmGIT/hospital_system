export async function cookiesToArray(cookiestring: string) {
	if (cookiestring) {
		let cookies = cookiestring.split('; ');
		let cookiesArray = [];

		for (let i = 0; i < cookies.length; i++) {
			let cookie = cookies[i].split('=');
			cookiesArray.push({
				name: cookie[0],
				value: cookie[1]
			});
		}
		return cookiesArray;
	} else {
		return [];
	}
}

export async function getUserSession(cookiestring: string) {
	if (cookiestring) {
		let sessions = await cookiesToArray(cookiestring);

		let session_id;
		sessions.forEach((session) => {
			if (session.name == 'session_id') {
				session_id = session.value;
			}
		});

		return session_id;
	}
}

export async function getAdminSession(cookiestring: string) {
	if (cookiestring) {
		let sessions = await cookiesToArray(cookiestring);

		let session_id;
		sessions.forEach((session) => {
			if (session.name == 'admin_session_id') {
				session_id = session.value;
			}
		});

		return session_id;
	}
}
