import React from 'react'
import { redirect } from 'next/navigation'

async function updateVisits(slug: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}url/all/shorts/${slug}/update/`, {
    method: 'PUT'
  })
  if (!res.ok) {
    throw new Error('Failed to update visit count')
  }
  return res.json()
}

async function getUrl(slug: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}url/all/shorts/${slug}/`)
  if (!res.ok) {
    throw new Error('Failed to fetch URL')
  }
  return res.json()
}

const Page = async ({
  params,
}: {
  params: { slug: string }
}) => {
  // First update the visit count
  await updateVisits(params.slug)
  
  // Then get and redirect to the URL
  const data = await getUrl(params.slug)
  redirect(data.url)

  // This won't be reached due to redirect
  return null
}

export default Page