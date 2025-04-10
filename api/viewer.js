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

    res.writeHead(200, {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename="document.pdf"',
      'Content-Length': buffer.length,
      'Accept-Ranges': 'bytes',
      'Cache-Control': 'no-store',
    });

    res.end(buffer);
  } catch (error) {
    console.error("PDF proxy error:", error);
    res.status(500).send("Internal Server Error");
  }
}
