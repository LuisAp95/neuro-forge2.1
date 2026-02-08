import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { get, set, getCacheKey } from "../lib/cache";

interface Testimonial {
  id: number;
  name: string;
  title: string;
  comment: string;
  image_url: string | null;
  sort_order: number;
}

const CACHE_KEY = getCacheKey("testimonials");

export function useTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(
    () => get<Testimonial[]>(CACHE_KEY) ?? [],
  );
  const [loading, setLoading] = useState(
    () => get<Testimonial[]>(CACHE_KEY) == null,
  );
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const cached = get<Testimonial[]>(CACHE_KEY);
    if (cached != null && cached.length >= 0) {
      setTestimonials(cached);
      setLoading(false);
      if (cached.length > 0) return;
    }

    async function fetchTestimonials() {
      try {
        const { data, error } = await supabase
          .from("testimonials")
          .select("*")
          .order("sort_order", { ascending: true });

        if (error) throw error;
        const list = data || [];
        set(CACHE_KEY, list);
        setTestimonials(list);
      } catch (err) {
        setError(err as Error);
        console.error("Error fetching testimonials:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchTestimonials();
  }, []);

  return { testimonials, loading, error };
}
