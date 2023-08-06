/** @format */

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import AuthButtonServer from "./auth-button-server"

export default async function Home() {
  console.log("cookies", cookies)
  const supabase = createServerComponentClient({ cookies })
  const {
    data: { session },
  } = await supabase.auth.getSession()
  console.log("session", session)
  // if (!session) {
  //   console.log("session is null")
  //   redirect("/login")
  // }

  const { data: tweets } = await supabase.from("tweets").select()
  return (
    <>
      <div>ホーム</div>
      <AuthButtonServer />
      <pre>{JSON.stringify(tweets, null, 2)}</pre>
    </>
  )
}
