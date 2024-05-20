import SessionMaster from '../../SessionManager';

export default async function handler(req, res) {
    const SERVER_URL = SessionMaster.get('serverURL');
    const { email, shoppingListId } = req.query;  // Extract email and shoppingListId from query parameters

    if (!email) {
        res.status(400).json({ message: 'Email parameter is missing' });
        return;
    }

    try {
        let url = `${SERVER_URL}/users/${encodeURIComponent(email)}/shoppinglist`;
        if (shoppingListId) {
            url += `/${encodeURIComponent(shoppingListId)}`;
        }
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch shopping list: ${response.status}`);
        }

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
