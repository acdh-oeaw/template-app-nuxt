export function sliceTrailingSlash(pathname: string): string {
	if (pathname.endsWith("/")) return pathname.slice(0, -1);

	return pathname;
}
