import { IncomingForm } from 'formidable';

export const config = {
    api: {
        bodyParser: false, // Disable the default Next.js body parser
    },
};

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const form = new IncomingForm();

        form.parse(req, (err, fields, files) => {
            if (err) {
                return res.status(500).json({ error: err.toString() });
            }
            // `files` contains data about the uploaded file
            // `fields` will contain any other form fields
            console.log('Uploaded file:', files);
            res.status(200).json({ message: 'File uploaded successfully', data: files });
        });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
