"use client";

import PostCard from "@/components/parts/postCard/postCard";
import { db } from "@/firebase/client";
import { getDocs, collection } from "firebase/firestore";
import { useEffect } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { postDocsAtom, userAtom, userModalAtom } from "@/atoms/atom";
import Loading from "./loading";
import { postCollName } from "@/const/const";

export default function Home() {
  const [postDocs, setPostDocs] = useAtom(postDocsAtom);
  const user = useAtomValue(userAtom);
  const setHandleUserModal = useSetAtom(userModalAtom);
  // TODO 投稿した後にデータ更新取得する処理を作成
  useEffect(() => {
    const getPosts = async () => {
      const postsRef = collection(db, postCollName);
      const postsSnap = await getDocs(postsRef);
      setPostDocs(postsSnap.docs);
    };
    getPosts();
    // ユーザー未登録、登録モーダル表示
    !user && setHandleUserModal(true);
  }, []);
  return (
    <>
      <div className="flex justify-center">
        <main className="flex flex-col gap-12 py-6">
          {postDocs ? (
            postDocs.map((value, index) => {
              const postData = value.data() as PostData;
              const postId = value.id;
              return (
                <PostCard key={index} postData={postData} postId={postId} />
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
