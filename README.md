# 🎨 AI Art Studio

A beautiful, modern AI art generator built with Next.js 16, Supabase, and Stable Diffusion XL. Create stunning images from text prompts and explore them in an elegant gallery.

![Tech Stack](https://img.shields.io/badge/Next.js-16-black)
![Supabase](https://img.shields.io/badge/Supabase-Database-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)

**🚀 Live Demo**: [https://ai-art-studios.vercel.app/](https://ai-art-studios.vercel.app/)

## ✨ Features

- 🤖 **AI Image Generation** - Generate images from text prompts using HuggingFace's Stable Diffusion
- 🎨 **Beautiful Gallery** - View all generated images in a responsive, animated gallery
- 💾 **Cloud Storage** - Images stored securely in Supabase Storage
- 🎭 **Smooth Animations** - Framer Motion for delightful micro-interactions
- 📱 **Fully Responsive** - Works beautifully on mobile, tablet, and desktop
- 🌈 **Modern UI** - Gradient backgrounds, glassmorphism, and hover effects

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion 12
- **Database**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage
- **AI**: HuggingFace Inference API (Stable Diffusion XL)

## 🛠️ Quick Start

### Prerequisites

- Node.js 18+
- [Supabase](https://supabase.com) account
- [HuggingFace](https://huggingface.co) account with API access

### Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up Supabase**
   - Create a new project at [supabase.com](https://supabase.com)
   - Run this SQL in the SQL Editor:
     ```sql
     CREATE TABLE images (
       id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
       prompt TEXT NOT NULL,
       image_url TEXT NOT NULL,
       created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
     );
     
     CREATE INDEX idx_images_created_at ON images(created_at DESC);
     
     ALTER TABLE images ENABLE ROW LEVEL SECURITY;
     CREATE POLICY "Allow public read access" ON images FOR SELECT USING (true);
     CREATE POLICY "Allow public insert access" ON images FOR INSERT WITH CHECK (true);
     ```
   - Create a public storage bucket named `images`
   - Set up storage policies for public uploads/downloads

3. **Get API Keys**
   - **Supabase**: Settings → API → Copy `Project URL` and `anon` key
   - **HuggingFace**: [Settings → Tokens](https://huggingface.co/settings/tokens) → Create token

4. **Configure environment variables**
   
   Create `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   HUGGINGFACE_API_KEY=hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

5. **Run development server**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:3000](http://localhost:3000)

## 🎮 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🌐 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import repository in [Vercel](https://vercel.com/new)
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `HUGGINGFACE_API_KEY`
4. Deploy! 🚀

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/image-generator-gallery)

## 📱 Usage

1. Enter a text prompt (e.g., "A serene mountain landscape at sunset")
2. Click **Generate** or press Enter
3. Wait ~30 seconds for AI to create your image
4. View your image and explore the gallery

## 📝 Project Structure

```
image-generator-gallery/
├── app/
│   ├── api/generate/route.ts    # Image generation API
│   ├── gallery/page.tsx          # Gallery page
│   ├── page.tsx                  # Home page
│   └── components/               # React components
├── lib/supabase.ts               # Supabase client
└── public/                       # Static assets
```

## 💡 Technical Highlights

- **Next.js App Router** - React Server Components for optimal performance
- **Supabase** - PostgreSQL + S3-compatible storage in one platform
- **HuggingFace Inference API** - Free Stable Diffusion XL with `wait_for_model: true`
- **Framer Motion** - Lightweight animations
- **Tailwind CSS** - Utility-first styling

## 🔧 Troubleshooting

- **"AI model is loading"** - Wait 20-30 seconds for model warm-up
- **Images not appearing** - Verify Supabase storage bucket is public and policies are set
- **Environment variables not working** - Restart dev server after adding `.env.local`

## 📄 License

MIT License - feel free to use this project for learning or portfolio purposes!

---

**Live Demo**: [https://ai-art-studios.vercel.app/](https://ai-art-studios.vercel.app/)

Made with 💜 using Next.js, Supabase & Stable Diffusion XL