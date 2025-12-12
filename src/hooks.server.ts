import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// Handle Chrome DevTools well-known requests gracefully
	if (event.url.pathname.startsWith('/.well-known/')) {
		return new Response(null, { status: 404 });
	}

	// If not the root path, continue processing the request as normal
	const response = await resolve(event);
	return response;
};
