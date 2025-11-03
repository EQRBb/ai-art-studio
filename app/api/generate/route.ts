import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  console.log('=== API Route Called ===')
  
  try {
    const body = await request.json()
    console.log('Request body:', body)
    
    const { prompt } = body

    if (!prompt || typeof prompt !== 'string') {
      console.log('Invalid prompt')
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      )
    }

    // Check if API key exists
    if (!process.env.HUGGINGFACE_API_KEY) {
      console.error('HUGGINGFACE_API_KEY is not set')
      return NextResponse.json(
        { error: 'Server configuration error: API key missing' },
        { status: 500 }
      )
    }

    console.log('✅ Starting generation with prompt:', prompt.substring(0, 50) + '...')

    // Generate image using HuggingFace API (updated endpoint)
    const response = await fetch(
      'https://router.huggingface.co/hf-inference/models/stabilityai/stable-diffusion-xl-base-1.0',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            num_inference_steps: 30,
            guidance_scale: 7.5,
          },
          options: { 
            wait_for_model: true,
            use_cache: false,
          }
        }),
      }
    )

    console.log('✅ HuggingFace API response status:', response.status)
    console.log('Response headers:', Object.fromEntries(response.headers.entries()))

    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ HuggingFace API error:', response.status, errorText)
      
      // If model is loading, return a more helpful error
      if (response.status === 503) {
        return NextResponse.json(
          { error: 'AI model is loading. Please try again in 20 seconds.' },
          { status: 503 }
        )
      }

      if (response.status === 401) {
        return NextResponse.json(
          { error: 'Invalid API key. Please check your HuggingFace token.' },
          { status: 500 }
        )
      }
      
      return NextResponse.json(
        { error: `Failed to generate image: ${errorText || response.statusText}` },
        { status: response.status }
      )
    }

    // Get the image as a blob
    console.log('📥 Receiving image from HuggingFace...')
    const imageBlob = await response.blob()
    console.log('✅ Image blob received:', imageBlob.size, 'bytes, type:', imageBlob.type)

    // Convert blob to buffer
    const buffer = Buffer.from(await imageBlob.arrayBuffer())

    // Create a unique filename
    const filename = `${Date.now()}-${Math.random().toString(36).substring(7)}.png`
    console.log('Uploading to Supabase:', filename)

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(filename, buffer, {
        contentType: 'image/png',
        cacheControl: '3600',
      })

    if (uploadError) {
      console.error('Supabase upload error:', uploadError)
      return NextResponse.json(
        { error: `Failed to upload image: ${uploadError.message}` },
        { status: 500 }
      )
    }

    console.log('Image uploaded successfully')

    // Get the public URL
    const { data: urlData } = supabase.storage
      .from('images')
      .getPublicUrl(filename)

    const image_url = urlData.publicUrl

    // Save to database
    const { data: dbData, error: dbError } = await supabase
      .from('images')
      .insert([
        {
          prompt,
          image_url,
        },
      ])
      .select()
      .single()

    if (dbError) {
      console.error('Database error:', dbError)
      return NextResponse.json(
        { error: `Failed to save to database: ${dbError.message}` },
        { status: 500 }
      )
    }

    console.log('✅ Image saved to database with ID:', dbData.id)
    console.log('🎉 SUCCESS! Image URL:', image_url)

    return NextResponse.json({
      success: true,
      image_url,
      id: dbData.id,
      prompt: prompt,
    })
  } catch (error) {
    console.error('❌ FATAL ERROR in generate API:', error)
    if (error instanceof Error) {
      console.error('Error stack:', error.stack)
    }
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}


