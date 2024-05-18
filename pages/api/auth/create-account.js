export default async function handler(req, res) {
    const SERVER_URL = process.env.SERVER_URL;

if(req.method === 'POST') {
    const { email, password } = req.body;

    try {
        const response = await fetch(SERVER_URL+'/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            res.status(200).json({ success: true, data });
        } else {
            res.status(response.status).json({ success: false, error: data.error || 'Registration failed' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server error' });
    }
}  else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
}
}