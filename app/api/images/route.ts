import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '15', 10)
    const offset = parseInt(searchParams.get('offset') || '0', 10)

    console.log(`📥 Fetching images: limit=${limit}, offset=${offset}`)

    // Fetch images with pagination
    const { data, error, count } = await supabase
      .from('images')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) {
      console.error('❌ Database error:', error)
      return NextResponse.json(
        { error: `Failed to fetch images: ${error.message}` },
        { status: 500 }
      )
    }

    console.log(`✅ Fetched ${data?.length || 0} images, total count: ${count}`)

    return NextResponse.json({
      success: true,
      images: data || [],
      total: count || 0,
      limit,
      offset,
      hasMore: (count || 0) > offset + limit,
    })
  } catch (error) {
    console.error('❌ Error in images API:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}

