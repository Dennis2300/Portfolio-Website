import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseApiKey = import.meta.env.VITE_SUPABASE_API_KEY;

export const supabase = createClient(supabaseUrl, supabaseApiKey);

export const storageService = {
  async getCountryImages() {
    try {
      // Fetch the images of countries from the database
      const { data: files, error } = await supabase.storage
        .from("Portfolio Images")
        .list(`images/${country}`, {
          limit: 100,
          offset: 0,
          sortBy: { column: "name", order: "asc" },
        });

      // Check for errors and handle them
      if (error) {
        console.error("Error fetching images:", error);
        return [];
      }

      // If no files are found, return an empty array
      if (!files || files.length === 0) {
        console.log("No images found for the specified country.");
        return [];
      }

      // Create public URLs for each image
      const images = files.map((file) => {
        const { data: urlData } = supabase.storage
          .from("Portfolio Images")
          .getPublicUrl(`images/${country}/${file.name}`);

        return {
          name: file.name,
          url: urlData.publicUrl,
          country: country,
        };
      });

      return images;
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  },
};

export default storageService;
