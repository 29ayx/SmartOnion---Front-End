import SessionMaster from '../../SessionManager';

export default async function handler(req, res) {
    const SERVER_URL = SessionMaster.get('serverURL');
    const { profileId, quantity, itemId } = req.body;  // Extract profileId, quantity, and itemId from request body

    // Parse quantity to integer
    const parsedQuantity = parseInt(quantity, 10);

    if (isNaN(parsedQuantity)) {
        res.status(400).json({ message: 'Invalid quantity' });
        return;
    }



    try {
        if (req.method === 'POST') {
            const externalApiResponse = await fetch(`${SERVER_URL}/api/inventory/consume/${encodeURIComponent(profileId)}/${itemId}?quantity=${parsedQuantity}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(req.body),
            });

            if (!externalApiResponse.ok) {
                throw new Error(`Failed to update: ${externalApiResponse.status}`);
            }

            const data = await externalApiResponse.json();
            res.status(200).json(data);
        } else {
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
