import Card from "./Card";

const toneColours = {
  default: "text-[#3B2416]",
  income: "text-green-700",
  expense: "text-red-700",
};

// A small card with a label and one big number, e.g. "Balance ₹5,000"
function StatBox({ label, value, tone = "default" }) {
  return (
    <Card className="p-5">
      <p className="text-sm text-stone-500">{label}</p>
      <p className={`text-2xl font-bold ${toneColours[tone]}`}>{value}</p>
    </Card>
  );
}

export default StatBox;
