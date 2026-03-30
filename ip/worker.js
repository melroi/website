export default {
  async fetch(request) {
    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
    const ua = request.headers.get('User-Agent') || '';

    // CLI (curl, wget, httpie...) → texte brut
    if (/curl|wget|httpie|python-requests/i.test(ua)) {
      return new Response(ip + '\n', {
        headers: { 'Content-Type': 'text/plain' },
      });
    }

    // Navigateur → HTML minimaliste
    const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>ip</title></head><body>${ip}</body></html>`;
    return new Response(html, {
      headers: { 'Content-Type': 'text/html; charset=UTF-8' },
    });
  },
};
