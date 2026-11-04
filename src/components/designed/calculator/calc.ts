/**
 * The conversion model behind /calculator: rainbow `ODIN/business/CONVERSION-MODEL.md` § 1, the
 * same formulas for every industry. Pure, so the page and its check share one definition.
 *
 * The lift is the merchant's own assumption, never ours: Pulse has measured no uplift, and the
 * only number we quote is the one a holdback measures on the merchant's traffic.
 */
export interface Inputs {
  spend: number; // marketing and acquisition, a month
  visits: number; // website and app, a month
  orders: number; // completed, a month
  aov: number; // average order value
  margin: number; // gross margin, percent
  lift: number; // relative conversion lift the merchant assumes, percent
}

const div = (a: number, b: number) => (b > 0 ? a / b : 0);

export function model(i: Inputs) {
  const revenue = i.orders * i.aov;
  const m = i.margin / 100;
  const liftedOrders = i.orders * (1 + i.lift / 100);
  return {
    spendPerVisit: div(i.spend, i.visits),
    conversion: div(i.orders, i.visits) * 100,
    costPerOrder: div(i.spend, i.orders),
    revenue,
    revenuePerVisit: div(revenue, i.visits),
    grossProfit: revenue * m,
    /** What one tenth of a percentage point of conversion is worth in gross profit, a month. */
    perTenthPoint: i.visits * 0.001 * i.aov * m,
    liftedConversion: div(liftedOrders, i.visits) * 100,
    extraOrders: liftedOrders - i.orders,
    extraRevenue: (liftedOrders - i.orders) * i.aov,
    extraGrossProfit: (liftedOrders - i.orders) * i.aov * m,
    liftedCostPerOrder: div(i.spend, liftedOrders),
  };
}
