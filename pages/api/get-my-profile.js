import SessionMaster from '../../SessionManager';

export default async function handler(req, res) {
    const { profileId } = req.query;
    const SERVER_URL = SessionMaster.get('serverURL');

    // if (!profileId || profileId === 'test') {
    //     res.status(400).json({ message: 'Profile ID is required' });
    //     return;
    // }

    if (req.method === 'GET') {
        try {

            const externalApiResponse = await fetch(`${SERVER_URL}/profiles/${profileId}`, {
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
    } else if (req.method === 'PUT') {
        try {
            const updatedData = req.body;

            if (!updatedData) {
                res.status(400).json({ message: 'No data provided for update' });
                return;
            }

            const externalApiResponse = await fetch(`${SERVER_URL}/profiles/${profileId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });

            if (!externalApiResponse.ok) {
                throw new Error(`Failed to update: ${externalApiResponse.status}`);
            }

            const data = await externalApiResponse.json();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }  else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
