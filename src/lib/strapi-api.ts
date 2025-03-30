export async function fetchStrapiData(endpoint: string, tags: string[]) {
  // Ajouter un cache pour les données
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/${endpoint}`,
      {
        next: {
          tags: tags, // Cache avec les tags pour les données de Strapi
          revalidate: 86400, // Revalidation toutes les 86400 secondes (1jour)
        },
        headers: {
          "Cache-Control":
            "public, max-age=86400, stale-while-revalidate=86400",
        },
      }
    );
    if (!res.ok) throw new Error("Failed to fetch data");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
