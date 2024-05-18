import SessionMaster from '../../SessionManager';

export default async function handler(req, res) {
    const SERVER_URL = SessionMaster.get('serverURL');
    const { email, itemId } = req.query;  // Extract email and itemId from query parameters

    // Check if email and itemId are provided, and if not, return an error response
    if (!email || !itemId) {
        res.status(400).json({ message: 'Email or itemId parameter is missing' });
        return;
    }

    try {
        const externalApiResponse = await fetch(`${SERVER_URL}/api/inventory/${encodeURIComponent(email)}/${encodeURIComponent(itemId)}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!externalApiResponse.ok) {
            throw new Error(`Failed to fetch: ${externalApiResponse.status}`);
        }

        const data = await externalApiResponse.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
