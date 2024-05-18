// pages/api/add-item.js
import SessionMaster from '../../SessionManager';

export default async function handler(req, res) {
    const SERVER_URL = SessionMaster.get('serverURL');

    if (req.method === 'POST') {
        const { email, name, quantity, calories, expiryDate, crucial, notifyBefore } = req.body;

        try {

            
            const response = await fetch(`${SERVER_URL}/users/${email}/additem`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, quantity, calories, expiryDate, crucial, notifyBefore }),
            });


            const data = await response.json();

            if (response.ok) {
                res.status(200).json({ success: true, data });
            } else {
                res.status(response.status).json({ success: false, error: data.error || 'Failed to add item' });
            }
        } catch (error) {
            res.status(500).json({ success: false, error: 'Server error' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
