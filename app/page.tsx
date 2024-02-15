import PostCard from "@/components/parts/postCard";

export default function Home() {
  return (
    <>
      <div className="flex justify-center">
        <main className="flex flex-col gap-12 py-6">
          <PostCard />
          <PostCard />
        </main>
      </div>
    </>
  );
}
