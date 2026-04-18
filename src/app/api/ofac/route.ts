import { NextRequest, NextResponse } from 'next/server'

const SDN_URL = 'https://www.treasury.gov/ofac/downloads/sdn.csv'

// Cache the parsed SDN list in memory (refresh every 24h)
let cache: { entries: SdnEntry[]; fetchedAt: number } | null = null

interface SdnEntry {
  name: string
  type: string
  program: string
  remarks: string
}

function normalize(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]/g, ' ').replace(/\s+/g, ' ').trim()
}

function parseCSV(text: string): SdnEntry[] {
  const lines = text.split('\n')
  const entries: SdnEntry[] = []

  for (const line of lines) {
    if (!line.trim()) continue
    // CSV fields: Ent_num, SDN_Name, SDN_Type, Program, Title, Call_Sign, ...
    const cols = line.split(',').map(c => c.trim().replace(/^"|"$/g, ''))
    const name = cols[1] ?? ''
    if (!name || name === '-0- ') continue
    entries.push({
      name: name.replace(/ -0-$/, '').trim(),
      type: cols[2] ?? '',
      program: cols[3] ?? '',
      remarks: cols[11] ?? '',
    })
  }
  return entries
}

async function getSdnList(): Promise<SdnEntry[]> {
  const now = Date.now()
  if (cache && now - cache.fetchedAt < 24 * 60 * 60 * 1000) {
    return cache.entries
  }

  const res = await fetch(SDN_URL, { next: { revalidate: 86400 } })
  if (!res.ok) throw new Error('Failed to fetch SDN list')

  const text = await res.text()
  const entries = parseCSV(text)
  cache = { entries, fetchedAt: now }
  return entries
}

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q')?.trim()
  if (!q || q.length < 2) {
    return NextResponse.json({ error: 'Query too short' }, { status: 400 })
  }

  try {
    const entries = await getSdnList()
    const qNorm = normalize(q)
    const qWords = qNorm.split(' ').filter(Boolean)

    const matches = entries.filter(e => {
      const eNorm = normalize(e.name)
      return qWords.every(w => eNorm.includes(w)) || eNorm.includes(qNorm)
    })

    return NextResponse.json({
      query: q,
      total: matches.length,
      results: matches.slice(0, 20),
      source: 'OFAC SDN List (treasury.gov)',
    })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch OFAC data' }, { status: 502 })
  }
}
