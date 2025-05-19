import Image from "next/image";

export default async function Home() {
  const res = await fetch("http://localhost:3000/api/fetch-data");
  const data = await res.json();
  console.log(data);
  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      <main></main>
    </div>
  );
}
