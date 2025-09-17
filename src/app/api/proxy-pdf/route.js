export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const url = searchParams.get("url");

    if (!url) {
      return new Response("Missing PDF url", { status: 400 });
    }

    const response = await fetch(url);

    if (!response.ok) {
      return new Response("Error fetching PDF", { status: response.status });
    }

    const buffer = await response.arrayBuffer();

    return new Response(buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    return new Response("Proxy error: " + error.message, { status: 500 });
  }
}
