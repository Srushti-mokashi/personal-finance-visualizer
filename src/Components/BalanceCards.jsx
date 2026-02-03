import { useFinance } from "../Context/FinanceContext";
import { useCurrency } from "../Context/CurrencyContext";

export default function BalanceCards() {
  const { cashBalance, onlineBalance } = useFinance();
  const { currency, convert } = useCurrency();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* ONLINE */}
      <div className="rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 p-4 shadow-sm">
        <p className="text-xl text-slate-500 dark:text-slate-400">💳 Online Balance</p>
        <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">
          {currency} {convert(onlineBalance)}
        </h3>
      </div>

      {/* CASH */}
      <div className="rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 p-4 shadow-sm">
        <p className="text-xl text-slate-500 dark:text-slate-400">💵 Cash in Hand</p>
        <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">
          {currency} {convert(cashBalance)}
        </h3>
      </div>
    </div>
  );
}
