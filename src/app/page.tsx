import { ActionBlueprintGraph } from "../types/resTypes";
import capLetters from "@/utils/capLetters";
export default async function Home() {
  const res = await fetch("http://localhost:3000/api/fetch-data");
  const data: ActionBlueprintGraph = await res.json();

  return (
    <div className="flex justify-center items-center bg-gray-300 ">
      <main className="relative flex items-center justify-center min-w-screen min-h-screen">
        {data.nodes.map((node) => {
          return (
            <div
              key={node.id}
              className="absolute bg-white border border-gray-300 rounded-md p-3 shadow-sm w-48"
              style={{
                left: `${node.position.x}px`,
                top: `${node.position.y}px`,
                transform: "translate(-160%, 300%)",
              }}
            >
              <p className="text-xs text-gray-500">{capLetters(node.type)}</p>
              <p className="font-medium text-black">{node.data.name}</p>
            </div>
          );
        })}
      </main>
    </div>
  );
}
