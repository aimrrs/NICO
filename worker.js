export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // 1. Handle Waitlist POST
    if (url.pathname === "/api/waitlist" && request.method === "POST") {
      try {
        const body = await request.json();
        const email = body?.email;

        if (!email || typeof email !== "string" || !email.includes("@")) {
          return new Response(
            JSON.stringify({ error: "A valid email address is required." }),
            {
              status: 400,
              headers: { "Content-Type": "application/json" },
            }
          );
        }

        const cleanEmail = email.trim().toLowerCase();
        const timestamp = new Date().toISOString();

        // If Cloudflare KV is bound to WAITLIST_KV
        if (env.WAITLIST_KV) {
          await env.WAITLIST_KV.put(
            `email:${cleanEmail}`,
            JSON.stringify({
              email: cleanEmail,
              timestamp,
              source: body?.source || "modal",
            })
          );
        }

        return new Response(
          JSON.stringify({ success: true, message: "Added to waitlist" }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          }
        );
      } catch (err) {
        return new Response(
          JSON.stringify({ error: "Server error processing request." }),
          {
            status: 500,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
    }

    // 2. Serve static assets
    return env.ASSETS.fetch(request);
  },
};
