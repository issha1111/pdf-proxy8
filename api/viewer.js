import https from "https";
import http from "http";

export default function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).send("Missing PDF URL");
  }

  const client = url.startsWith("https") ? https : http;

  client.get(url, (streamRes) => {
    if (streamRes.statusCode !== 200) {
      res.status(streamRes.statusCode).send("Failed to fetch PDF");
      return;
    }

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'inline; filename="document.pdf"');

    streamRes.pipe(res);
  }).on("error", (err) => {
    console.error(err);
    res.status(500).send("Error fetching PDF");
  });
}
