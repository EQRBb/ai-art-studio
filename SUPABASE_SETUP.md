# 🗄️ Supabase Setup Guide

This guide will walk you through setting up Supabase for the AI Image Generator Gallery.

## Step 1: Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click **New Project**
4. Fill in:
   - **Name**: `image-generator-gallery` (or any name you like)
   - **Database Password**: Choose a strong password (save it!)
   - **Region**: Choose closest to your users
   - **Pricing Plan**: Free tier is perfect for this project
5. Click **Create new project**
6. Wait ~2 minutes for provisioning

## Step 2: Create the Database Table

1. In your Supabase dashboard, go to **SQL Editor**
2. Click **New query**
3. Paste this SQL:

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

-- Enable Row Level Security
ALTER TABLE images ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access" ON images
  FOR SELECT USING (true);

-- Allow public insert access
CREATE POLICY "Allow public insert access" ON images
  FOR INSERT WITH CHECK (true);
```

4. Click **Run** (or press ⌘/Ctrl + Enter)
5. You should see "Success. No rows returned"

## Step 3: Create Storage Bucket

1. Go to **Storage** in the left sidebar
2. Click **New bucket**
3. Settings:
   - **Name**: `images`
   - **Public bucket**: ✅ CHECK THIS BOX (important!)
   - **File size limit**: 50 MB (default is fine)
   - **Allowed MIME types**: Leave empty for all types
4. Click **Create bucket**

## Step 4: Set Up Storage Policies

1. Click on your `images` bucket
2. Go to the **Policies** tab
3. Click **New policy**

### Policy 1: Allow Public Uploads

1. Click **Create a policy from scratch**
2. Settings:
   - **Policy name**: `Allow public uploads`
   - **Policy command**: `INSERT`
   - **Target roles**: `public`
3. In the **USING expression**, paste:
```sql
bucket_id = 'images'
```
4. Click **Review** → **Save policy**

### Policy 2: Allow Public Downloads

1. Click **New policy** again
2. Click **Create a policy from scratch**
3. Settings:
   - **Policy name**: `Allow public downloads`
   - **Policy command**: `SELECT`
   - **Target roles**: `public`
4. In the **USING expression**, paste:
```sql
bucket_id = 'images'
```
5. Click **Review** → **Save policy**

## Step 5: Get Your API Keys

1. Go to **Settings** → **API** (gear icon in sidebar)
2. Find these values:

### Project URL
Copy the URL that looks like:
```
https://xxxxxxxxxxxxx.supabase.co
```

### API Keys
Under **Project API keys**, copy the `anon` `public` key (the long string)

## Step 6: Add to Your Project

1. Open your `.env.local` file
2. Add:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-long-anon-key-here
```

3. Save the file
4. Restart your dev server

## Verification

### Check Database Table

1. Go to **Table Editor** → **images**
2. You should see an empty table with columns: `id`, `prompt`, `image_url`, `created_at`

### Check Storage Bucket

1. Go to **Storage** → **images**
2. You should see an empty bucket
3. The bucket should show a 🌐 icon (indicating it's public)

## Testing

1. Run your Next.js app: `npm run dev`
2. Generate an image
3. Check Supabase:
   - **Table Editor** → `images` should have a new row
   - **Storage** → `images` should have a new image file

## Troubleshooting

### Images not saving to database

- Check if RLS policies are created
- Verify the table structure matches the SQL above
- Check browser console for errors

### Images not uploading to storage

- Make sure the bucket is **public** (🌐 icon)
- Verify storage policies exist for both INSERT and SELECT
- Check that the bucket name is exactly `images`

### CORS errors

- Ensure you're using `NEXT_PUBLIC_` prefix for environment variables
- Restart your dev server after changing .env.local
- Clear browser cache and try again

## Security Notes

**For Production:**

1. **Restrict INSERT policy** to authenticated users only
2. **Add rate limiting** to prevent abuse
3. **Validate file types** and sizes
4. **Add image moderation** to prevent inappropriate content
5. **Consider implementing authentication**

Example authenticated-only insert policy:
```sql
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'images' 
  AND auth.role() = 'authenticated'
);
```

## Next Steps

✅ Database table created
✅ Storage bucket created and configured
✅ Policies set up
✅ API keys added to project

You're all set! Your Supabase backend is ready to store AI-generated images. 🎉


