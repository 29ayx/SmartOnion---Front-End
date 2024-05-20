import SessionMaster from '../../SessionManager'
export default async function handler(req, res) {
    const SERVER_URL = SessionMaster.get('serverURL');
    const { family } = req.query;  // Extract email from query parameters

    if (!family) {
        res.status(400).json({ message: 'Email parameter is missing' });
        return;
    }



    try {
        const response = await fetch(`${SERVER_URL}/api/consumption/family/${encodeURIComponent(family)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch family consumption: ${response.status}`);
        }


        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
