import { useEffect } from "react";

// A reusable pop-up that asks for confirmation.
// - title, children: what the pop-up says
// - confirmLabel:    text on the red button (e.g. "Delete")
// - onConfirm:       runs when the red button is clicked
// - onCancel:        runs on Cancel, on Esc, or when the dark background is clicked
// The parent decides when to show it: it simply doesn't render <Modal> otherwise.
function Modal({ title, children, confirmLabel = "Confirm", onConfirm, onCancel }) {
  // Close with the Esc key. The listener is removed when the pop-up goes away
  // (the cleanup function), and re-added only if onCancel changes.
  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onCancel();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onCancel]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      onClick={onCancel}
    >
      {/* stopPropagation: clicking inside the box must not count as a click
          on the dark background, which would close it */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-xl border border-[#CFA97A] bg-[#F3E6D3] p-6 shadow-xl"
      >
        <h3 id="modal-title" className="text-xl font-semibold text-[#3B2416]">
          {title}
        </h3>
        <div className="mt-2 text-stone-700">{children}</div>

        <div className="mt-5 flex justify-end gap-3">
          <button
            onClick={onCancel}
            autoFocus
            className="rounded-lg border border-[#CFA97A] px-4 py-2 font-medium text-[#3B2416] hover:bg-[#EAD9BF]"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="rounded-lg bg-red-700 px-4 py-2 font-semibold text-white shadow hover:bg-red-800"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
