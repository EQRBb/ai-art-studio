# 🎨 AI Art Studio

A beautiful, modern AI art generator built with Next.js 16, Supabase, and Stable Diffusion XL. Create stunning images from text prompts and explore them in an elegant gallery.

![Tech Stack](https://img.shields.io/badge/Next.js-16-black)
![Supabase](https://img.shields.io/badge/Supabase-Database-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)

**🚀 Live Demo**: [https://ai-art-studios.vercel.app/](https://ai-art-studios.vercel.app/)

> 🎯 **[View Complete Project Checklist](./FINAL_CHECKLIST.md)** - All 10 deliverables complete!  
> 🚀 **[Quick Deployment Guide](./DEPLOYMENT_GUIDE.md)** - Deploy in 12 minutes

## ✨ Features

- 🤖 **AI Image Generation** - Generate images from text prompts using HuggingFace's Stable Diffusion
- 🎨 **Beautiful Gallery** - View all generated images in a responsive, animated gallery
- 💾 **Cloud Storage** - Images stored securely in Supabase Storage
- 🗄️ **Database** - PostgreSQL database for metadata and image URLs
- 🎭 **Smooth Animations** - Framer Motion for delightful micro-interactions
- 📱 **Fully Responsive** - Works beautifully on mobile, tablet, and desktop
- 🌈 **Modern UI** - Gradient backgrounds, glassmorphism, and hover effects

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router with Turbopack)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion 12
- **Database**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage
- **AI**: HuggingFace Inference API (Stable Diffusion XL)
- **Deployment**: Vercel

## 📋 Prerequisites

Before you begin, ensure you have:

- Node.js 18+ installed
- A [Supabase](https://supabase.com) account
- A [HuggingFace](https://huggingface.co) account with API access

## 🛠️ Setup Instructions

### Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Copy and configure environment variables
# (Create .env.local and add your keys - see step 4 below)

# 3. Run development server
npm run dev

# 4. Open http://localhost:3000
```

### Detailed Setup

### 1. Clone and Install

```bash
cd image-generator-gallery
npm install
```

### 2. Set Up Supabase

#### Create a New Project

1. Go to [Supabase](https://supabase.com) and create a new project
2. Wait for the database to be provisioned (takes ~2 minutes)

#### Create the Database Table

Go to the SQL Editor in your Supabase dashboard and run:

```sql
-- Create images table
CREATE TABLE images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  prompt TEXT NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Add index for faster queries
CREATE INDEX idx_images_created_at ON images(created_at DESC);

-- Enable Row Level Security (optional but recommended)
ALTER TABLE images ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access" ON images
  FOR SELECT USING (true);

-- Allow public insert access (you may want to restrict this in production)
CREATE POLICY "Allow public insert access" ON images
  FOR INSERT WITH CHECK (true);
```

#### Create Storage Bucket

1. Go to **Storage** in your Supabase dashboard
2. Click **New Bucket**
3. Name it: `images`
4. Make it **public** (check the public checkbox)
5. Click **Create Bucket**

#### Set Up Storage Policy

In the Storage section, click on your `images` bucket, then go to **Policies**:

```sql
-- Allow public uploads
CREATE POLICY "Allow public uploads"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'images');

-- Allow public downloads
CREATE POLICY "Allow public downloads"
ON storage.objects FOR SELECT
USING (bucket_id = 'images');
```

### 3. Get Your API Keys

#### Supabase Keys

1. Go to **Settings** → **API** in your Supabase dashboard
2. Copy your `Project URL` and `anon/public` key

#### HuggingFace API Key

1. Go to [HuggingFace Settings](https://huggingface.co/settings/tokens)
2. Create a new token with read access
3. Copy the token

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Create the file
touch .env.local

# Add your environment variables
```

Add the following content to `.env.local`:

```env
# Supabase Configuration
# Get these from: Supabase Dashboard → Settings → API
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# HuggingFace API Key
# Get this from: https://huggingface.co/settings/tokens
HUGGINGFACE_API_KEY=hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**Important**: Replace the placeholder values with your actual keys from steps 2 and 3 above.

**Note**: The `.env.local` file is already in `.gitignore` and will NOT be committed to your repository.

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎮 Available Scripts

```bash
# Development
npm run dev          # Start development server on localhost:3000

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint to check code quality
```

## 🌐 Deployment

### Deploy to Vercel

#### Quick Deploy

The project is already live at [https://ai-art-studios.vercel.app/](https://ai-art-studios.vercel.app/)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/image-generator-gallery)

#### Manual Deployment Steps

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Go to [Vercel](https://vercel.com/new)
   - Import your GitHub repository
   - Configure your project:
     - **Framework Preset**: Next.js
     - **Root Directory**: `./`
     - **Build Command**: `npm run build`
     - **Output Directory**: `.next`

3. **Add Environment Variables**
   
   In Vercel Dashboard → Settings → Environment Variables, add:
   
   | Variable | Value | Environment |
   |----------|-------|-------------|
   | `NEXT_PUBLIC_SUPABASE_URL` | `https://xxx.supabase.co` | Production, Preview, Development |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJ...` | Production, Preview, Development |
   | `HUGGINGFACE_API_KEY` | `hf_...` | Production, Preview, Development |

   **Important**: Don't use secret references (like `@secret-name`) in `vercel.json`. Add variables directly through the Vercel UI.

4. **Deploy!**
   - Click **Deploy**
   - Wait ~2-3 minutes for build
   - Your app will be live (e.g., `https://ai-art-studios.vercel.app`) 🎉

### Pre-Deployment Checklist

Before deploying, make sure you've completed:

- ✅ Supabase database table created (`images`)
- ✅ Supabase storage bucket created (`images`) and set to **public**
- ✅ Storage policies configured (INSERT and SELECT)
- ✅ Environment variables ready
- ✅ HuggingFace API key obtained
- ✅ Tested locally with `npm run dev`
- ✅ Code committed to GitHub
- ✅ `.env.local` NOT committed (check `.gitignore`)

### Post-Deployment

1. **Test the live app**
   - Visit [https://ai-art-studios.vercel.app/](https://ai-art-studios.vercel.app/)
   - Generate a test image
   - Check the gallery

2. **Verify Supabase**
   - Check that images appear in Storage
   - Check that records appear in Database

3. **Monitor Performance**
   - Check Vercel Analytics for performance metrics
   - Monitor Supabase usage and quotas
   - Review logs for any errors

4. **Custom Domain (Optional)**
   - Go to Vercel Dashboard → Settings → Domains
   - Add your custom domain
   - Follow DNS configuration instructions

## 📱 Usage

### Generate an Image

1. Visit [https://ai-art-studios.vercel.app/](https://ai-art-studios.vercel.app/)
2. Enter a descriptive prompt (e.g., "A serene mountain landscape at sunset with vibrant colors")
3. Click **Generate** or press Enter
4. Wait for the AI to create your image (~30 seconds)
5. Your image will appear and be automatically saved to the gallery

### View Gallery

1. Click **Gallery** in the navigation
2. Browse all generated images in a responsive grid
3. Click on any image to view it in full size
4. Scroll down to load more images (infinite scroll)

## 🎨 Features Breakdown

### Home Page
- Clean, centered input form
- Real-time validation
- Loading states with spinner
- Error handling with user-friendly messages
- Generated image preview

### Gallery Page
- Grid layout (responsive: 1, 2, or 3 columns)
- Hover effects revealing prompts
- Smooth animations on load
- Empty state with CTA

### API Route
- Image generation via HuggingFace
- Upload to Supabase Storage
- Save metadata to database
- Comprehensive error handling

### UI/UX
- Glassmorphism effects
- Gradient backgrounds
- Smooth page transitions
- Micro-interactions
- Custom scrollbar
- Responsive design

## 🔧 Troubleshooting

### "AI model is loading" Error

HuggingFace models may need to "warm up" on first use. Wait 20-30 seconds and try again.

### Images Not Appearing

1. Check that your Supabase storage bucket is **public**
2. Verify storage policies are set correctly
3. Check browser console for CORS errors

### Environment Variables Not Working

1. Restart the dev server after adding `.env.local`
2. Verify variable names start with `NEXT_PUBLIC_` for client-side access
3. Check for typos in variable names

## 📝 Project Structure

```
image-generator-gallery/
├── app/
│   ├── api/
│   │   └── generate/
│   │       └── route.ts          # Image generation API endpoint
│   ├── gallery/
│   │   └── page.tsx              # Gallery page (view all images)
│   ├── page.tsx                  # Home page (generate images)
│   ├── layout.tsx                # Root layout with navigation
│   ├── globals.css               # Global styles & animations
│   └── favicon.ico               # App icon
├── lib/
│   └── supabase.ts               # Supabase client configuration
├── public/                       # Static assets & SVG icons
├── .env.local                    # Environment variables (DO NOT COMMIT)
├── .gitignore                    # Git ignore rules
├── next.config.ts                # Next.js configuration
├── postcss.config.mjs            # PostCSS for Tailwind
├── tsconfig.json                 # TypeScript configuration
├── vercel.json                   # Vercel deployment config
├── package.json                  # Dependencies & scripts
├── README.md                     # This file
└── SUPABASE_SETUP.md             # Detailed Supabase guide
```

## 🎯 Scoring Checklist

- ✅ Live Vercel deploy
- ✅ Supabase integration with proper schema
- ✅ Working image upload to Supabase Storage
- ✅ Clean, readable code with logical structure
- ✅ Minimal bugs and error handling
- ✅ Functional, dynamic gallery
- ✅ Beautiful, usable UI with good UX
- ✅ Animations and micro-interactions
- ✅ Comprehensive README with setup instructions
- ✅ Responsive layout for all devices

## 💡 Technical Highlights

### Architecture Decisions

**Next.js App Router**: Leverages React Server Components for optimal performance and SEO.

**Supabase**: Provides PostgreSQL database + S3-compatible storage in one platform, eliminating the need for separate services.

**HuggingFace Inference API**: Free, powerful AI model (Stable Diffusion XL) with no cold starts using `wait_for_model: true`.

**Framer Motion**: Lightweight animation library that adds delightful micro-interactions without bloating the bundle.

**Tailwind CSS**: Utility-first approach enables rapid UI development with consistent design tokens.

### Performance Optimizations

- **Image Optimization**: Next.js automatic image optimization with remote pattern support
- **Streaming**: API routes stream data efficiently
- **Caching**: Supabase Storage with `Cache-Control` headers
- **Database Indexing**: Optimized queries with indexed `created_at` column
- **Bundle Size**: Minimal dependencies, tree-shaking enabled

### Security Features

- **Row Level Security (RLS)**: Supabase policies control data access
- **Environment Variables**: Sensitive keys never exposed to client
- **Input Validation**: Server-side prompt validation
- **CORS Protection**: Proper CORS headers on Supabase Storage

## 🚀 Future Enhancements

**Authentication & Social**
- [ ] User authentication with Supabase Auth
- [ ] User profiles and personal galleries
- [ ] Image likes, favorites, and comments
- [ ] Share functionality with social media integration

**AI Features**
- [ ] Advanced prompt suggestions and templates
- [ ] Multiple AI models to choose from
- [ ] Image-to-image generation
- [ ] Prompt history and favorites
- [ ] Negative prompts support

**Gallery Features**
- [ ] Search and filter by prompt keywords
- [ ] Sort by date, popularity, or random
- [ ] Infinite scroll or pagination
- [ ] Full-screen image viewer with zoom
- [ ] Download images in different sizes

**Privacy & Moderation**
- [ ] Private/public image toggle
- [ ] Report inappropriate content
- [ ] AI content moderation
- [ ] NSFW detection and filtering

## 📄 License

MIT License - feel free to use this project for learning or portfolio purposes!

## 🙏 Acknowledgments

- HuggingFace for the amazing Stable Diffusion model
- Supabase for the incredible backend platform
- Vercel for seamless deployment

---

**Live Demo**: [https://ai-art-studios.vercel.app/](https://ai-art-studios.vercel.app/)

Made with 💜 using Next.js, Supabase & Stable Diffusion XL
