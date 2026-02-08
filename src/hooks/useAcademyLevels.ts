import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { get, set, getCacheKey } from "../lib/cache";

interface AcademyLevel {
  id: number;
  level: string;
  stars: number;
  image_url: string | null;
  sort_order: number;
}

const CACHE_KEY = getCacheKey("academy_levels");

export function useAcademyLevels() {
  const [levels, setLevels] = useState<AcademyLevel[]>(
    () => get<AcademyLevel[]>(CACHE_KEY) ?? [],
  );
  const [loading, setLoading] = useState(
    () => get<AcademyLevel[]>(CACHE_KEY) == null,
  );
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const cached = get<AcademyLevel[]>(CACHE_KEY);
    if (cached != null && cached.length >= 0) {
      setLevels(cached);
      setLoading(false);
      if (cached.length > 0) return;
    }

    async function fetchLevels() {
      try {
        const { data, error } = await supabase
          .from("academy_levels")
          .select("*")
          .order("sort_order", { ascending: true });

        if (error) throw error;
        const list = data || [];
        set(CACHE_KEY, list);
        setLevels(list);
      } catch (err) {
        setError(err as Error);
        console.error("Error fetching academy levels:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchLevels();
  }, []);

  return { levels, loading, error };
}
