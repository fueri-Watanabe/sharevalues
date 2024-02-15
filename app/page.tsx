import PostCard from "@/components/parts/postCard/postCard";

export default function Home() {
  return (
    <>
      <div className="flex justify-center">
        <main className="flex flex-col gap-12 py-6">
          {Array(10)
            .fill("")
            .map((value, index) => {
              return <PostCard key={index} />;
            })}
        </main>
      </div>
    </>
  );
}
