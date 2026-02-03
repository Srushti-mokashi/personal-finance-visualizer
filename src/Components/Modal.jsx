export default function Modal({ open, onClose, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-slate-700/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Content */}
      <div
        className="
          relative z-10
          w-full max-w-lg
          rounded-xl
          bg-slate-900
          border border-white/10
          p-6
          shadow-2xl
        "
      >
        {children}
      </div>
    </div>
  );
}
