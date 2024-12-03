export default function validateFile(
	files: File,
	expectedFileType: string,
	maxFileSize: number
): boolean {
	if (files.size > maxFileSize) {
		return false;
	}

	if (files.type !== expectedFileType) {
		return false;
	}

	if (files.name === '') {
		return false;
	}

	return true;
}
