import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { get, set, getCacheKey } from "../lib/cache";

interface ContentBlock {
  hero?: any;
  whatWeDo?: any;
  mission?: any;
  founder?: any;
  officePhoto?: any;
}

const CACHE_KEY = getCacheKey("about");

export function useAboutData() {
  const [data, setData] = useState<ContentBlock>(
    () => get<ContentBlock>(CACHE_KEY) ?? {},
  );
  const [loading, setLoading] = useState(() => !get<ContentBlock>(CACHE_KEY));
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const cached = get<ContentBlock>(CACHE_KEY);
    if (cached && Object.keys(cached).length > 0) {
      setData(cached);
      setLoading(false);
      return;
    }

    async function fetchAboutData() {
      try {
        const { data: blocks, error } = await supabase
          .from("content_blocks")
          .select("section, content")
          .eq("page", "about");

        if (error) throw error;

        const contentData: ContentBlock = {};
        blocks?.forEach((block) => {
          contentData[block.section as keyof ContentBlock] = block.content;
        });

        set(CACHE_KEY, contentData);
        setData(contentData);
      } catch (err) {
        setError(err as Error);
        console.error("Error fetching about data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchAboutData();
  }, []);

  return { data, loading, error };
}
