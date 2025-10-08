import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const BLOG_ASSET_BASE_DIRS = [
  path.join(process.cwd(), 'content', 'blog'),
  path.join(process.cwd(), 'public', 'content', 'blog')
]

const MIME_TYPES: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.webp': 'image/webp'
}

export async function GET(
  _request: Request,
  { params }: { params: { path?: string[] } }
) {
  const segments = params.path ?? []

  if (!Array.isArray(segments) || segments.length === 0) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  if (segments.some(segment => segment.includes('..') || segment.includes('\\') || segment.startsWith('.'))) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  let resolvedPath: string | null = null
  let stats: Awaited<ReturnType<typeof fs.stat>> | null = null

  for (const baseDir of BLOG_ASSET_BASE_DIRS) {
    const candidate = path.join(baseDir, ...segments)
    const normalized = path.normalize(candidate)

    if (!normalized.startsWith(baseDir)) {
      continue
    }

    try {
      const candidateStats = await fs.stat(normalized)
      if (candidateStats.isFile()) {
        resolvedPath = normalized
        stats = candidateStats
        break
      }
    } catch {
      continue
    }
  }

  if (!resolvedPath || !stats) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  const ext = path.extname(resolvedPath).toLowerCase()
  const mimeType = MIME_TYPES[ext] ?? 'application/octet-stream'
  const fileBuffer = await fs.readFile(resolvedPath)
  const arrayBuffer = fileBuffer.buffer.slice(
    fileBuffer.byteOffset,
    fileBuffer.byteOffset + fileBuffer.byteLength
  )
  const body = new Uint8Array(arrayBuffer)

  return new NextResponse(body as unknown as BodyInit, {
    headers: {
      'Content-Type': mimeType,
      'Content-Length': stats.size.toString(),
      'Cache-Control': 'public, max-age=31536000, immutable'
    }
  })
}
