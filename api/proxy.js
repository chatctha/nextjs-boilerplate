// api/proxy.js
const POWER_AUTOMATE_URL = "https://1851aa13258ce32bb4a8a9264b9335.8e.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/750e8bb23f4b49788a1a5722e5cf6f80/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=BR3M3BL8f9gjr6FMUbCR-uwuXjPGI_SuUUndqhPFi50";

export default async function handler(req, res) {
  // CORS Headers ทุก request
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // ✅ ตอบ preflight ทันที ไม่ต้อง fetch ต่อ
  if (req.method === 'OPTIONS') {
    res.status(204).end(); // 204 No Content ดีกว่า 200
    return;
  }

  try {
    const response = await fetch(POWER_AUTOMATE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body ?? {}),
      redirect: 'follow'
    });

    const data = await response.text();
    return res.status(200).send(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
