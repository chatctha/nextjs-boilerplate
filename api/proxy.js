// api/proxy.js
const POWER_AUTOMATE_URL = "https://1851aa13258ce32bb4a8a9264b9335.8e.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/51d2dcd4261a4aea9428447073cc4522/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=t0nsF82fejfsYe8tKN7a12k6oeFu_iToODrwGJmVTv";

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const response = await fetch(POWER_AUTOMATE_URL, {
      method: 'POST', // ✅ บังคับ POST เสมอ
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body ?? {}),
      redirect: 'follow' // ✅ เพิ่มบรรทัดนี้
    });

    const data = await response.text();
    return res.status(response.status).send(data);
  } catch (error) {
    console.error('Proxy error:', error);
    return res.status(500).json({ 
      error: 'Proxy failed', 
      message: error.message 
    });
  }
}
