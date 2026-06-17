#!/usr/bin/env -S deno run --allow-net --allow-read
/*
	We use a import prefix because we want tobe able to run this script in a Deno environment without any external dependencies.
	This import is from the Deno standard library and does not require a version number.
*/
// deno-lint-ignore no-import-prefix no-unversioned-import
import { serveDir } from "jsr:@std/http/file-server";

const server = Deno.serve(
	(req) =>
		serveDir(req, {
			// fsRoot: "./public",	// Serve files from the public directory
			quiet: false,		// Log requests to the console for debugging purposes
			enableCors: true,	// Enable CORS to allow usage of module scripts from the browser
			headers: [
				// Disable caching to ensure the latest version of files is always served
				"Cache-Control: no-cache",
			],
		}),
);

Deno.addSignalListener("SIGINT", async () => {
	console.log("shutting down");
	await server.shutdown();
});
