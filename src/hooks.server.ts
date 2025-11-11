import { redirect } from '@sveltejs/kit';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// Handle Chrome DevTools well-known requests gracefully
	if (event.url.pathname.startsWith('/.well-known/')) {
		return new Response(null, { status: 404 });
	}

	// Check if the request is for the root path
	if (event.url.pathname === '/') {
		// Redirect to /Home using a temporary redirect (307)
		redirect(307, '/Home');
	}

	// If not the root path, continue processing the request as normal
	const response = await resolve(event);
	return response;
};
