/** @format */

"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"

export default function Likes({ tweet }) {
  console.log(tweet)
  const router = useRouter()
  const handleLikes = async () => {
    const supabase = createClientComponentClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    if (tweet.user_has_liked_tweet) {
      await supabase
        .from("likes")
        .delete()
        .match({ tweet_id: tweet.id, user_id: user?.id })
    } else {
      await supabase
        .from("likes")
        .insert({ tweet_id: tweet.id, user_id: user?.id })
    }
    router.refresh()
  }
  return <button onClick={handleLikes}>{tweet.likes}Likes</button>
}
