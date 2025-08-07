export async function GET() {
  const manifest = {
    "name": "M.A.G.I.A.",
    "short_name": "MAGIA",
    "description": "Interface migrada com sucesso 🎉",
    "start_url": "/",
    "display": "standalone",
    "background_color": "#000000",
    "theme_color": "#1a1a1a",
    "orientation": "portrait-primary",
    "scope": "/",
    "categories": ["productivity", "utilities"],
    "icons": [
      {
        "src": "/faviconx.ico",
        "sizes": "16x16 32x32 48x48",
        "type": "image/x-icon",
        "purpose": "any"
      },
      {
        "src": "/faviconx.ico",
        "sizes": "192x192",
        "type": "image/x-icon",
        "purpose": "any maskable"
      },
      {
        "src": "/faviconx.ico",
        "sizes": "512x512",
        "type": "image/x-icon",
        "purpose": "any maskable"
      }
    ]
  };
  
  return Response.json(manifest, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}