import { ActionBlueprintGraph } from "../types/resTypes";
import capLetters from "@/utils/capLetters";
import { DialogTrigger, Dialog, DialogContent } from "@/components/ui/dialog";
import PrefillContent from "@/components/customComponents/Prefill/PrefillContent";
import PrefillHeader from "@/components/customComponents/Prefill/PrefillHeader";
export default async function Home() {
  const res = await fetch("http://localhost:3000/api/fetch-data");
  const data: ActionBlueprintGraph = await res.json();

  return (
    <main className="relative flex items-center justify-center min-w-screen min-h-screen bg-gray-300 overflow-scroll">
      {data.nodes.map((node) => {
        return (
          <Dialog key={node.id}>
            <DialogTrigger
              className="absolute flex flex-col items-start justify-start bg-white border border-gray-300 rounded-md p-3 shadow-sm w-48"
              style={{
                left: `${node.position.x}px`,
                top: `${node.position.y}px`,
                transform: "translate(-160%, 300%)",
              }}
            >
              <div>
                <p className="text-xs text-gray-500">{capLetters(node.type)}</p>
                <p className="font-medium text-black">{node.data.name}</p>
              </div>
            </DialogTrigger>
            <DialogContent>
              <PrefillHeader />
              <PrefillContent />
            </DialogContent>
          </Dialog>
        );
      })}
    </main>
  );
}
