import { Board } from "@/components/Board/Board";

export default function Home() {
  return (
    <div style={{ maxHeight: "100svh" }} className="overflow-hidden flex  items-start justify-center bg-zinc-50 font-sans">
      <main className="flex flex-1 w-full h-full flex-col items-center justify-between bg-white mx-auto">
        <div className="flex flex-col items-center justify-center gap-6 text-center">
          <h1 className="my-12 text-3xl font-semibold leading-14 tracking-tight text-zinc-900 sm:text-5xl sm:leading-14 md:text-6xl md:leading-14">
            22 October
          </h1>
          <Board />
        </div>
      </main>
    </div>
  );
}
