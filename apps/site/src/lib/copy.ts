export type CopyResult = "copied" | "failed";

/** Clipboard is undefined in insecure contexts; a denied permission rejects. Both report "failed". */
export async function copyText(text: string, clipboard: Pick<Clipboard, "writeText"> | undefined): Promise<CopyResult> {
	if (!clipboard) return "failed";
	try {
		await clipboard.writeText(text);
		return "copied";
	} catch {
		return "failed";
	}
}
