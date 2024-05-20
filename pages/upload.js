export default function UploadForm() {
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', event.target.file.files[0]);

        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            const result = await response.json();

        } else {
            console.error('Upload failed');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" name="file" required />
            <button type="submit">Upload File</button>
        </form>
    );
}
