import SessionMaster from '../../SessionManager'
export default async function handler(req, res) {
    const SERVER_URL = SessionMaster.get('serverURL');
    const { email } = req.query;  // Extract email from query parameters


    // Check if email is provided, and if not, return an error response
    if (!email) {
        res.status(400).json({ message: 'Email parameter is missing' });
        return;
    }

    try {
        const externalApiResponse = await fetch(SERVER_URL+`/users/${encodeURIComponent(email)}/inventory`, {
            headers: {
                'Content-Type': 'application/json',
                // Optionally add other headers, such as Authorization
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
