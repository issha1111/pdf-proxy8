export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).send('Missing PDF URL');
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch PDF');
    }

    const buffer = await response.arrayBuffer();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename="document.pdf"');
    res.send(Buffer.from(buffer));
  } catch (err) {
    res.status(500).send('Error fetching or displaying PDF');
  }
}
