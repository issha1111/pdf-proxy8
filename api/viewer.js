export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    res.status(400).send("Missing PDF URL");
    return;
  }

  try {
    const pdfRes = await fetch(url);

    if (!pdfRes.ok) {
      res.status(500).send("Failed to fetch PDF");
      return;
    }

    const arrayBuffer = await pdfRes.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'inline; filename="document.pdf"');
    res.setHeader("Content-Length", buffer.length);

    res.end(buffer);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}
