"use client";

import PostCard from "@/components/parts/postCard/postCard";
import { db } from "@/firebase/client";
import { PostData } from "@/types/post";
import { getDocs, collection } from "firebase/firestore";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { postDocsAtom, postHistoryAtom } from "@/atoms/atom";
import Loading from "./loading";
import { historyKey, postCollName } from "@/const/const";

export default function Home() {
  const [postHistory, setPostHistory] = useAtom(postHistoryAtom);
  const [postDocs, setPostDocs] = useAtom(postDocsAtom);
  useEffect(() => {
    if (localStorage.hasOwnProperty(historyKey)) {
      const history = localStorage.getItem(historyKey);
      history && setPostHistory(JSON.parse(history));
    } else {
      localStorage.setItem(historyKey, JSON.stringify(postHistory));
    }
    const getPosts = async () => {
      const postsRef = collection(db, postCollName);
      const postsSnap = await getDocs(postsRef);
      setPostDocs(postsSnap.docs);
    };
    getPosts();
  }, []);
  return (
    <>
      <div className="flex justify-center">
        <main className="flex flex-col gap-12 py-6">
          {postDocs ? (
            postDocs.map((value, index) => {
              console.log(value.data());
              const postData = value.data() as PostData;
              const postId = value.id;
              return (
                <PostCard
                  key={index}
                  postData={postData}
                  postId={postId}
                  postHistory={postHistory}
                  setPostHistory={setPostHistory}
                />
              );
            })
          ) : (
            <div className="mt-20">
              <Loading />
            </div>
          )}
        </main>
      </div>
    </>
  );
}
