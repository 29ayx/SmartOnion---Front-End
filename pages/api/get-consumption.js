import SessionMaster from '../../SessionManager'
export default async function handler(req, res) {
    const SERVER_URL = SessionMaster.get('serverURL');
    const { profile } = req.query;  // Extract email from query parameters

    try {
        const externalApiResponse = await fetch(SERVER_URL+`/api/consumption/profile/${encodeURIComponent(profile)}`, {
            
            headers: {
                'Content-Type': 'application/json',
                // Optionally add other headers, such as Authorization
            },
        });

        console.log(SERVER_URL+`/api/consumption/profile/${encodeURIComponent(profile)}`)

        if (!externalApiResponse.ok) {
            throw new Error(`Failed to fetch: ${externalApiResponse.status}`);
        }

        const data = await externalApiResponse.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
