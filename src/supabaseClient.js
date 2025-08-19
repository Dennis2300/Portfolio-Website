import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseApiKey = import.meta.env.VITE_SUPABASE_API_KEY;

export const supabase = createClient(supabaseUrl, supabaseApiKey);

export const storageService = {
  async getImages(country) {
    try {
      const { data: files, error } = await supabase.storage
        .from('Portfolio Images')
        .list(`images/${country}`)

      if (error) {
        console.error('Error listing files:', error)
        return []
      }

      if (!files || files.length === 0) {
        return []
      }

      // Create public URLs for each image
      const images = files.map(file => {
        const { data: urlData } = supabase.storage
          .from('Portfolio Images')
          .getPublicUrl(`images/${country}/${file.name}`)

        return {
          name: file.name,
          url: urlData.publicUrl,
          country: country
        }
      })

      return images

    } catch (error) {
      console.error('Error fetching images:', error)
      return []
    }
  }
}

export default storageService
