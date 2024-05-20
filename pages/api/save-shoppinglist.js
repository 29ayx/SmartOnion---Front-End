import SessionMaster from '../../SessionManager';

export default async function handler(req, res) {
    const SERVER_URL = SessionMaster.get('serverURL');
    const { email, description, shoppingItems } = req.body;

    if (!email) {
        res.status(400).json({ message: 'Email is missing' });
        return;
    }

    const endpoint = `${SERVER_URL}/users/${encodeURIComponent(email)}/shoppinglist`;

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                description,
                shoppingItems
            }),
        });

        if (!response.ok) {
            throw new Error(`Failed to save shopping list: ${response.status}`);
        }

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
