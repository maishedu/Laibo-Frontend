import { MetadataRoute } from 'next'
import { fetchDynamicRoutes} from "@/lib/api-util";

const WEBSITE_HOST_URL = process.env.SITE_URL || 'https://www.laibo.co.ke'

type changeFrequency =
  | 'always'
  | 'hourly'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly'
  | 'never'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let dynamicRoute = await fetchDynamicRoutes()
  const changeFrequency = 'daily' as changeFrequency

  const dynamic = dynamicRoute.map((url) => ({
    url: `${WEBSITE_HOST_URL}${url}`,
    lastModified: new Date().toISOString(),
    changeFrequency
  }))

  const routes = ['', '/market','/login','/signup', '/press','/how-it-works','/contact','/terms-conditions','/privacypolicy'].map((route) => ({
    url: `${WEBSITE_HOST_URL}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency,
  }))

  return [...routes, ...dynamic]
}
