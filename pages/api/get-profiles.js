import { useEffect } from 'react';
import SessionMaster from '../../SessionManager';

export default async function handler(req, res) {

    const SERVER_URL = SessionMaster.get('serverURL');
    const email = req.query.email;


    if (req.method !== 'GET') {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
        return;
    }


    if (!email) {
        res.status(400).json({ message: 'Email is required' });
        
        return;
    }

    try {
       
        const externalApiResponse = await fetch(`${SERVER_URL}/profiles/owner/${email}`, {
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
