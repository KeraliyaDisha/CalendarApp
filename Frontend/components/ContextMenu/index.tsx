import React, { useEffect, useCallback } from "react";
import { Scissors, Copy, Clipboard, Trash2 } from "lucide-react";
import { useContextMenuActions } from "@/hooks/useContextMenuActions";

interface ContextMenuProps {
  x: number;
  y: number;
  id: string | null;
  refetch: () => void; // Required for the hook
  onCut: () => void;
  onCopy: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onClose: () => void;
}

export default function ContextMenu({
  x,
  y,
  id,
  refetch,
  onCut,
  onCopy,
  onDuplicate,
  onDelete,
  onClose,
}: ContextMenuProps) {
  const actions = useContextMenuActions(refetch);

  // Wrap the actions so you can perform extra behavior.
  const handleCut = useCallback(() => {
    if (!id) return;
    actions.handleCutAction(id);
    onCut();
    onClose();
  }, [id, actions, onCut, onClose]);

  const handleCopy = useCallback(() => {
    if (!id) return;
    actions.handleCopyAction(id);
    onCopy();
    onClose();
  }, [id, actions, onCopy, onClose]);

  const handleDuplicate = useCallback(() => {
    if (!id) return;
    actions.handleDuplicateAction(id);
    onDuplicate();
    onClose();
  }, [id, actions, onDuplicate, onClose]);

  const handleDelete = useCallback(async () => {
    if (!id) return;
    await actions.handleDeleteAction(id);
    onDelete();
    onClose();
  }, [id, actions, onDelete, onClose]);

  // Global keydown listener for the Delete key.
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Delete") {
        handleDelete();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleDelete]);

  return (
    <div
      className="absolute bg-[#F5F5F5] shadow-lg border border-gray-200 rounded-lg p-2 w-56 z-50"
      style={{ top: y, left: x }}
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* Cut Option */}
      <button
        onClick={handleCut}
        className="flex items-center w-full px-3 py-2 text-gray-700 hover:bg-gray-200 transition rounded-md"
      >
        <Scissors className="w-4 h-4 text-gray-500" />
        <span className="ml-2">Cut</span>
        <span className="ml-auto text-gray-400 text-xs">Ctrl+X</span>
      </button>

      {/* Copy Option */}
      <button
        onClick={handleCopy}
        className="flex items-center w-full px-3 py-2 text-gray-700 hover:bg-gray-200 transition rounded-md"
      >
        <Copy className="w-4 h-4 text-gray-500" />
        <span className="ml-2">Copy</span>
        <span className="ml-auto text-gray-400 text-xs">Ctrl+C</span>
      </button>

      {/* Duplicate Option */}
      <button
        onClick={handleDuplicate}
        className="flex items-center w-full px-3 py-2 text-gray-700 hover:bg-gray-200 transition rounded-md"
      >
        <Clipboard className="w-4 h-4 text-gray-500" />
        <span className="ml-2">Duplicate</span>
        <span className="ml-auto text-gray-400 text-xs">Ctrl+D</span>
      </button>

      {/* Divider */}
      <div className="border-t border-gray-200 my-1"></div>

      {/* Delete Option */}
      <button
        onClick={handleDelete}
        className="flex items-center w-full px-3 py-2 text-red-500 hover:bg-red-50 transition rounded-md"
      >
        <Trash2 className="w-4 h-4 text-red-500" />
        <span className="ml-2">Delete</span>
        <span className="ml-auto text-gray-400 text-xs">Delete</span>
      </button>
    </div>
  );
}
