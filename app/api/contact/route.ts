import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

type ContactPayload = {
  name?: string
  email?: string
  phone?: string
  solution?: string
  sector?: string
  message?: string
}

function requireEnv(name: string) {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Missing ${name} environment variable.`)
  }
  return value
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as ContactPayload
    const name = (payload.name || "").trim()
    const email = (payload.email || "").trim()
    const phone = (payload.phone || "").trim()
    const solution = (payload.solution || "").trim()
    const sector = (payload.sector || "").trim()
    const message = (payload.message || "").trim()

    if (!name || !message || !phone) {
      return NextResponse.json({ error: "Missing fields." }, { status: 400 })
    }

    const host = requireEnv("SMTP_HOST")
    const port = Number(requireEnv("SMTP_PORT"))
    const user = requireEnv("SMTP_USER")
    const pass = requireEnv("SMTP_PASS")
    const from = requireEnv("SMTP_FROM")
    const to = requireEnv("SMTP_TO")

    if (Number.isNaN(port)) {
      return NextResponse.json({ error: "SMTP_PORT must be a number." }, { status: 500 })
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    })

    await transporter.sendMail({
      from,
      to,
      subject: "New contact request - 1erSysteme",
      text: `Name: ${name}\nEmail: ${email || "N/A"}\nPhone: ${
        phone || "N/A"
      }\nSolution: ${solution || "N/A"}\nSector: ${sector || "N/A"}\n\nMessage:\n${message}`,
      html: `
        <div>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email || "N/A"}</p>
          <p><strong>Phone:</strong> ${phone || "N/A"}</p>
          <p><strong>Solution:</strong> ${solution || "N/A"}</p>
          <p><strong>Sector:</strong> ${sector || "N/A"}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br />")}</p>
        </div>
      `,
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("Contact email error:", error)
    if (error instanceof Error && error.message.startsWith("Missing ")) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    return NextResponse.json({ error: "Failed to send email." }, { status: 500 })
  }
}
