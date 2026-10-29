import { useState } from "react";
import Card from "./Card";
import Skeleton from "./Skeleton";
import useExchangeRates from "../hooks/useExchangeRates";
import { formatDate } from "../utils/formatDate";

// "1234.5" → "$1,234.50" or "€1,234.50"
function formatForeign(amount, currency) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount);
}

// Shows your balance in US dollars and euros, using live rates.
// Nothing is fetched until you click the button ("on demand").
function CurrencyCard({ balance }) {
  const [showRates, setShowRates] = useState(false);
  const { rates, date, loading, error, retry } = useExchangeRates(showRates);

  return (
    <Card className="p-5 space-y-3">
      <div className="flex justify-between items-center gap-3">
        <h3 className="font-semibold">Balance in other currencies</h3>
        {!showRates && (
          <button
            onClick={() => setShowRates(true)}
            className="text-sm px-3 py-1.5 rounded-lg bg-[#3B2416] text-amber-50 hover:bg-[#2A190F] shadow"
          >
            Show in USD / EUR
          </button>
        )}
      </div>

      {!showRates && (
        <p className="text-sm text-stone-600">
          See what your balance is worth in US dollars and euros at today's rates.
        </p>
      )}

      {/* Loading: skeleton bars instead of a blank space */}
      {showRates && loading && (
        <div className="grid grid-cols-2 gap-4" aria-label="Loading exchange rates">
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
          <Skeleton className="h-3 w-40 col-span-2" />
        </div>
      )}

      {/* Error: a message and a way to try again */}
      {showRates && !loading && error && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-800">
          <p>{error}</p>
          <button onClick={retry} className="mt-2 font-semibold underline">
            Try again
          </button>
        </div>
      )}

      {/* Success */}
      {showRates && !loading && !error && rates && (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-white/70 border border-[#E2C49C] p-3">
              <p className="text-xs text-stone-500">US dollars</p>
              <p className="text-xl font-bold text-[#3B2416]">
                {formatForeign(balance * rates.USD, "USD")}
              </p>
            </div>
            <div className="rounded-lg bg-white/70 border border-[#E2C49C] p-3">
              <p className="text-xs text-stone-500">Euros</p>
              <p className="text-xl font-bold text-[#3B2416]">
                {formatForeign(balance * rates.EUR, "EUR")}
              </p>
            </div>
          </div>
          <p className="text-xs text-stone-500">
            Rates from Frankfurter, {date && formatDate(date)}. ₹1 = ${rates.USD} = €{rates.EUR}
          </p>
        </>
      )}
    </Card>
  );
}

export default CurrencyCard;
