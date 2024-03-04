import PostCard from "@/components/parts/postCard/postCard";
import { db } from "@/firebase/client";
import { PostData } from "@/types/post";
import { getDocs, collection } from "firebase/firestore";

export default async function Home() {
  const postsRef = collection(db, "posts");
  const postsSnap = await getDocs(postsRef);
  const postDocs = postsSnap.docs;
  return (
    <>
      <div className="flex justify-center">
        <main className="flex flex-col gap-12 py-6">
          {postDocs.map((value, index) => {
            console.log(value.data());
            const postData = value.data() as PostData;
            const postId = value.id;
            return <PostCard postData={postData} postId={postId} key={index} />;
          })}
        </main>
      </div>
    </>
  );
}
