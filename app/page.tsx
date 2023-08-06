/** @format */
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import AuthButtonServer from "./auth-button-server"
import Likes from "./likes"
import NewTweet from "./new-tweet"

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    console.log("session is null")
    redirect("/login")
  }

  const { data } = await supabase
    .from("tweets")
    .select("*, profiles(*), likes(*)")

  const tweets =
    data?.map((tweet) => ({
      ...tweet,
      user_has_liked_tweet: tweet.likes.find(
        (like) => like.user_id === session.user.id
      ),
      likes: tweet.likes.length,
    })) ?? []

  return (
    <>
      <AuthButtonServer />
      <NewTweet />
      {tweets?.map((tweet) => (
        <div key={tweet.id}>
          <p>
            {tweet?.profiles?.name} {tweet?.profiles?.username}
          </p>
          <div>{tweet.title}</div>
          <Likes tweet={tweet} />
        </div>
      ))}
    </>
  )
}
