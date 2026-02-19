import { NextRequest, NextResponse } from "next/server"

/**
 * Proxies product images from supplier sites (e.g. Hikvision) to avoid hotlink blocking.
 * Use when direct image URLs return 403 or don't load.
 * Example: /api/proxy-image?url=https://www.hikvision.com/...
 */
export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url")
  if (!url) {
    return NextResponse.json({ error: "Missing url parameter" }, { status: 400 })
  }

  let parsed: URL
  try {
    parsed = new URL(url)
  } catch {
    return NextResponse.json({ error: "Invalid url" }, { status: 400 })
  }

  // Only allow HTTPS and known supplier domains
  if (parsed.protocol !== "https:") {
    return NextResponse.json({ error: "Only HTTPS URLs allowed" }, { status: 400 })
  }
  const allowedHosts = ["www.hikvision.com", "hikvision.com", "eu.hikvision.com"]
  if (!allowedHosts.some((h) => parsed.hostname === h || parsed.hostname.endsWith("." + h))) {
    return NextResponse.json({ error: "Domain not allowed" }, { status: 400 })
  }

  try {
    const res = await fetch(url, {
      headers: {
        Accept: "image/*",
        "User-Agent": "1erSysteme-ProductPage/1.0",
      },
      cache: "force-cache",
      next: { revalidate: 86400 }, // cache 24h
    })

    if (!res.ok) {
      return NextResponse.json(
        { error: `Upstream returned ${res.status}` },
        { status: res.status === 404 ? 404 : 502 }
      )
    }

    const contentType = res.headers.get("content-type") ?? "image/jpeg"
    const buffer = await res.arrayBuffer()

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
      },
    })
  } catch (e) {
    console.error("[proxy-image]", e)
    return NextResponse.json({ error: "Failed to fetch image" }, { status: 502 })
  }
}
