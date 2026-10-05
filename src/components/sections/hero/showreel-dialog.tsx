"use client";

// ---------------------------------------------------------------------------
// ShowreelDialog: the full-size player that opens when the hero's moving
// video card is clicked (see moving-visual.tsx).
//
// Built on the native <dialog> element opened with showModal(), so the
// browser handles the hard parts: it sits above everything (top layer, not
// affected by the card's transforms or the hero's overflow-hidden), Esc
// closes it, focus moves inside it and goes back to the card afterwards, and
// the rest of the page can't be tabbed to while it's open.
//
// On open the video starts from the beginning WITH sound (the click counts
// as the user gesture browsers require for sound) and with the normal
// controls. Closing (the X button, Esc, or a click on the dark backdrop)
// pauses it. The page behind doesn't scroll while it's open.
// ---------------------------------------------------------------------------
import { useImperativeHandle, useRef, type Ref } from "react";

export interface ShowreelDialogHandle {
  open: () => void;
}

interface ShowreelDialogProps {
  videoSrc: string;
  /** Called after the dialog has closed (any way), e.g. to resume the preview. */
  onClosed?: () => void;
  /** Gives the caller `open()`. */
  ref?: Ref<ShowreelDialogHandle>;
}

export function ShowreelDialog({ videoSrc, onClosed, ref }: ShowreelDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useImperativeHandle(ref, () => ({
    open() {
      const dialog = dialogRef.current;
      const video = videoRef.current;
      if (!dialog || !video || dialog.open) return;
      document.documentElement.style.overflow = "hidden";
      dialog.showModal();
      video.currentTime = 0;
      video.muted = false;
      // play() can still be refused (e.g. a browser that blocks sound); the
      // controls stay available, so the viewer can press play themselves.
      void video.play().catch(() => {});
    },
  }));

  const handleClose = () => {
    videoRef.current?.pause();
    document.documentElement.style.overflow = "";
    onClosed?.();
  };

  return (
    <dialog
      ref={dialogRef}
      aria-label="Denvo Lab showreel"
      onClose={handleClose}
      // A click that lands on the dialog element itself (not the video or
      // the button) is a click on the dark backdrop around the player.
      onClick={(e) => {
        if (e.target === e.currentTarget) e.currentTarget.close();
      }}
      className="m-auto max-h-none w-[min(92vw,calc(85svh*16/9))] max-w-none overflow-visible border-0 bg-transparent p-0 text-white backdrop:bg-black/85 backdrop:backdrop-blur-sm"
    >
      <div className="relative">
        <video
          ref={videoRef}
          src={videoSrc}
          controls
          playsInline
          preload="none"
          className="aspect-video w-full rounded-2xl bg-black"
        />
        <button
          type="button"
          onClick={() => dialogRef.current?.close()}
          aria-label="Close the showreel"
          className="absolute right-3 top-3 flex size-11 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition-colors hover:bg-black/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-default md:right-4 md:top-4"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M3 3l12 12M15 3L3 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </dialog>
  );
}
