import https from 'https';

const key = '02c06a7d-c2f3-4b9f-aba4-4bad3086c54d';

const testConfigs = [
  { path: '/api/v1/portfolio', headers: { 'Authorization': `Bearer ${key}` } },
  { path: '/api/v1/portfolio', headers: { 'Authorization': key } },
  { path: '/api/v1/portfolio', headers: { 'X-API-KEY': key } },
  { path: '/api/v1/portfolio', headers: { 'apiKey': key } },
  { path: '/api/v1/portfolio', headers: { 'api-key': key } },
  { path: '/api/v1/portfolio', headers: { 'token': key } },
  { path: '/api/portfolio', headers: { 'Authorization': `Bearer ${key}` } },
  { path: '/api/user/portfolio', headers: { 'Authorization': `Bearer ${key}` } },
  { path: '/api/user', headers: { 'Authorization': `Bearer ${key}` } },
  { path: '/api/v1/user', headers: { 'Authorization': `Bearer ${key}` } },
  { path: '/api/holdings', headers: { 'Authorization': `Bearer ${key}` } },
  { path: '/api/v1/holdings', headers: { 'Authorization': `Bearer ${key}` } },
  { path: '/api/leaderboard', headers: { 'Authorization': `Bearer ${key}` } },
  { path: '/api/challenge', headers: { 'Authorization': `Bearer ${key}` } },
  { path: '/swagger-ui.html', headers: {} },
  { path: '/v3/api-docs', headers: {} },
  { path: '/api-docs', headers: {} },
  { path: '/actuator/health', headers: {} }
];

async function run() {
  for (const cfg of testConfigs) {
    await new Promise(resolve => {
      const options = {
        hostname: 'api.megabull.in',
        port: 443,
        path: cfg.path,
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          ...cfg.headers
        },
        timeout: 4000
      };

      const req = https.request(options, (res) => {
        let body = '';
        res.on('data', (d) => { body += d; });
        res.on('end', () => {
          console.log(`[${res.statusCode}] ${cfg.path} | Headers: ${JSON.stringify(cfg.headers)} => ${body.substring(0, 120)}`);
          resolve();
        });
      });

      req.on('error', (e) => {
        console.log(`[ERR] ${cfg.path}: ${e.message}`);
        resolve();
      });
      req.end();
    });
  }
}

run();
