import { createBrowserClient, createServerClient as createSsrServerClient } from '@supabase/ssr'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import type { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies'
import { cookies } from 'next/headers'

export const createSupabaseServerClient_old = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase URL and Anon Key must be defined')
  }

  return createSupabaseClient(supabaseUrl, supabaseKey)
}

// NEW: Server Component Client Creator
export const createServerClient = (cookieStore: ReadonlyRequestCookies) => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SECRET_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase URL and Anon Key must be defined')
  }

  return createSsrServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set(name: string, value: string, options: any) {
        console.warn('Attempted to set cookie in Server Component context');
      },
      remove(name: string, options: any) {
        console.warn('Attempted to remove cookie in Server Component context');
      },
    },
  })
}

export const createSupabaseBrowserClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase URL and Anon Key must be defined')
  }

  return createBrowserClient(supabaseUrl, supabaseKey)
}

// Simple client creation function matching the example - ALIAS FOR BROWSER CLIENT
export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  
