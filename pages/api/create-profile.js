import SessionMaster from '../../SessionManager';

export default async function handler(req, res) {
    const SERVER_URL = SessionMaster.get('serverURL');

    if (!SERVER_URL) {
        res.status(500).json({ success: false, error: 'Server URL is not set' });
        return;
    }

    if (req.method === 'POST') {
        const { userEmail, dob, name, dietgoal, allergies } = req.body;



        try {
            const response = await fetch(`${SERVER_URL}/profiles`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userEmail, dob, name, dietgoal, allergies }),
            });

            const data = await response.json();

            if (response.ok) {
                res.status(200).json({ success: true, data });
            } else {
                console.error('Error response from server:', data);
                res.status(response.status).json({ success: false, error: data.error || 'Registration failed' });
            }
        } catch (error) {
            console.error('Fetch error:', error);
            res.status(500).json({ success: false, error: 'Server error' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
