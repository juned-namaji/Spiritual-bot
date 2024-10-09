import type { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/chat/',
    },
    sitemap: `${process.env.VERCEL_URL}/sitemap.xml`,
  }
}   