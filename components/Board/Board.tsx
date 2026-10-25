"use client";
import { motion } from "motion/react";
import './Board.css';
import { DragDropProvider } from "@dnd-kit/react";
import {
  type Layout,
  Compactor,
  ResizeHandleAxis,
  useContainerWidth,
  useGridContainer,
  useGridItem,
  useGridPlaceholder,
  useGridResizeHandle,
} from "@snapgridjs/react";
import { Dispatch, SetStateAction, useState } from "react";

export const diagonalCompactor: Compactor = {
  type: null,
  allowOverlap: false,
  preventCollision: true,
  compact(layout: Layout, cols: number): Layout {
    return [...layout]
  },
};

export function Board() {
  const { width, containerRef } = useContainerWidth();
  const [layout, setLayout] = useState<Layout>([
    { i: "2026-10-22-1", x: 0, y: 0, w: 4, h: 2, maxW: 4, maxH: 5, minW: 1, minH: 1 },
    { i: "2026-10-22-2", x: 0, y: 2, w: 2, h: 1, maxW: 4, maxH: 5, minW: 1, minH: 1},
    { i: "2026-10-22-3", x: 2, y: 2, w: 1, h: 1, maxW: 4, maxH: 5, minW: 1, minH: 1 },
    { i: "2026-10-22-4", x: 0, y: 3, w: 1, h: 1, maxW: 4, maxH: 5, minW: 1, minH: 1 },
    { i: "2026-10-22-5", x: 1, y: 3, w: 1, h: 1, maxW: 4, maxH: 5, minW: 1, minH: 1 },
    { i: "2026-10-22-6", x: 2, y: 3, w: 1, h: 1 },
  ]);

  
  return (
    <div ref={containerRef} className="max-md:w-screen flex grow-none lg:aspect-square lg:max-h-screen lg:w-auto">
      <DragDropProvider>
        <Surface layout={layout} width={width} onLayoutChange={setLayout} />
      </DragDropProvider>
    </div>
  );
}

function Surface({ layout, width, onLayoutChange }:{layout: Layout, width: number, onLayoutChange: Dispatch<SetStateAction<Layout>>}) {
  const { containerProps, group } = useGridContainer({
    layout,
    width,
    compactor: diagonalCompactor,
    onLayoutChange,
    gridConfig: { rowHeight: 120, cols: 4,  margin: [4,4], maxRows: 4 },
    dragConfig: { enabled: true,  bounded: true },
  });
  const placeholder = useGridPlaceholder(group);
  return (
    <div {...containerProps} className="outline-3 outline-mauve-200/60 mx-auto lg:rounded-xl lg:max-h-full   lg:w-auto bg-zinc-50 grid grid-cols-4 grid-rows-4 gap-4">
      {layout.map((item:Layout[0]) => (
        <Tile key={item.i} id={item.i} group={group} item={item} />
      ))}
      {placeholder && <div className="placeholder" style={placeholder.style} />}
    </div>
  );
}

function ResizeHandle({ id, group, handle, position }: { id: string; group: string; handle: ResizeHandleAxis, position: string }) {
  const resize = useGridResizeHandle({ id, handle, group });
  return (
    <div
    id={`resize-handle-${id}-${handle}`}
      ref={resize.ref}
      {...resize.handleProps}
      className={`resize-handle absolute ${position} rounded-md w-10 h-10 border-zinc-600 hover:bg-zinc-100 transition-duration-300 z-200`}
    />
  );
}

function Tile({ id, group, className, item }: { id: string; group: string; className?: string, item: any}) {
  const { ref, style,  } = useGridItem({ id, group });
 
  return (
    <motion.div
        key={id}
        initial={false}
        layout
        transition={{ type: "tween", stiffness: 50, damping: 10 }}
        style={{  ...style }}
        className={`tile lg:w-[120px] flex items-center bg-white border-mauve-50 border-1 rounded-none shadow-md ${className || ''} `}
        ref={ref}>
        <textarea placeholder="Enter text" className="pointer-events-auto w-full h-fit max-h-full focus:border-0 focus:outline-none text-xl resize-none p-2 mt-4 text-center text-pretty" >{item?.i}</textarea> 
        <ResizeHandle
            id={id}
            group={group}
            handle="nw"
            position="top-0 left-0 rotate-180"
        />
        <ResizeHandle
            id={id}
            group={group}
            handle="se"
            position="bottom-0 right-0"
        />
    </motion.div>
  );
}
