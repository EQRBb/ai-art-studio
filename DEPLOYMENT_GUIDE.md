# 🚀 Quick Deployment Guide

This is a fast-track guide to get your app deployed to Vercel in under 10 minutes.

## Prerequisites Checklist

Before you start, make sure you have:

- [ ] GitHub account
- [ ] Vercel account (free)
- [ ] Supabase account (free)
- [ ] HuggingFace account (free)

## Step 1: Supabase Setup (5 minutes)

### 1.1 Create Project
1. Go to [supabase.com](https://supabase.com) → **New Project**
2. Name: `image-generator` (or anything)
3. Database password: Create a strong password
4. Region: Choose closest to you
5. Click **Create** and wait ~2 minutes

### 1.2 Create Database Table
1. Go to **SQL Editor** → **New query**
2. Copy and run this SQL:

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

### 1.3 Create Storage Bucket
1. Go to **Storage** → **New bucket**
2. Name: `images`
3. **✅ CHECK "Public bucket"** (important!)
4. Click **Create**

### 1.4 Add Storage Policies
1. Click on `images` bucket → **Policies** → **New policy**
2. Create two policies:

**Upload Policy:**
- Name: `Allow public uploads`
- Command: `INSERT`
- Target: `public`
- USING expression: `bucket_id = 'images'`

**Download Policy:**
- Name: `Allow public downloads`
- Command: `SELECT`
- Target: `public`
- USING expression: `bucket_id = 'images'`

### 1.5 Get API Keys
1. Go to **Settings** → **API**
2. Copy:
   - **Project URL**: `https://xxx.supabase.co`
   - **anon public key**: `eyJ...` (the long string)

## Step 2: HuggingFace API Key (2 minutes)

1. Go to [huggingface.co/settings/tokens](https://huggingface.co/settings/tokens)
2. Click **New token**
3. Name: `image-generator`
4. Type: **Read**
5. Click **Generate**
6. Copy the token: `hf_...`

## Step 3: Push to GitHub (2 minutes)

```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit: AI Image Generator"

# Create GitHub repo and push
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

## Step 4: Deploy to Vercel (3 minutes)

### 4.1 Import Project
1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **Import Git Repository**
3. Select your GitHub repository
4. Click **Import**

### 4.2 Configure Build Settings
Leave defaults:
- Framework: **Next.js**
- Root Directory: `./`
- Build Command: `npm run build`
- Output Directory: `.next`

### 4.3 Add Environment Variables

Click **Environment Variables** and add these:

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key |
| `HUGGINGFACE_API_KEY` | Your HuggingFace token |

### 4.4 Deploy
1. Click **Deploy**
2. Wait 2-3 minutes
3. Done! 🎉

## Step 5: Test Your App

1. Click **Visit** to open your live app
2. Enter a prompt like: `"A serene mountain landscape at sunset"`
3. Click **Generate Image**
4. Wait ~20-30 seconds (first request may be slower)
5. Your image should appear!
6. Go to **Gallery** to see all generated images

## Troubleshooting

### "Failed to generate image"
- Check your HuggingFace API key is correct
- Wait 30 seconds and try again (model might be loading)

### "Failed to upload image"
- Verify storage bucket is **public** (🌐 icon)
- Check storage policies are created correctly

### "Failed to save to database"
- Verify database table exists with correct schema
- Check RLS policies are enabled

### Environment variables not working
- Make sure you added all 3 variables
- Redeploy: Vercel Dashboard → Deployments → three dots → Redeploy

## Post-Deployment

### Update README
Add your live URL to the README:

```markdown
**Live Demo**: https://your-project.vercel.app
```

### Share Your Work
Your app is now live! Share the link:
- On Twitter/X with #buildinpublic
- On LinkedIn
- Add to your portfolio
- Submit to your instructor

---

**Estimated Total Time**: 12 minutes ⏱️

**Need help?** Check the detailed [README.md](./README.md) or [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)

