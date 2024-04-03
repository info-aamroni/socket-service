import axios from 'axios';

const index = async (req, res) => {
    try {
        const arr = await axios.get(`${process.env.BASE_URL}/users`)
        res.json(arr.data);
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ err: 'Failed to fetch data from third-party API' });
    }
}

const show = async (req, res) => {
    try {
        const arr = await axios.get(`${process.env.BASE_URL}/users/${req.params.id}`)
        res.json(arr.data);
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ err: 'Failed to fetch data from third-party API' });
    }
}

export { index, show }