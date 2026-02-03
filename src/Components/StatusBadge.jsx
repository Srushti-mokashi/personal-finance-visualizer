const styles = {
  pending: "bg-amber-100 text-amber-700",
  succeeded: "bg-emerald-100 text-emerald-700",
  cancelled: "bg-rose-100 text-rose-700",
};

const StatusBadge = ({ status }) => (
  <span
    className={`rounded-full px-2 py-0.5 text-xs font-medium ${styles[status]}`}
  >
    {status}
  </span>
);

export default StatusBadge;
