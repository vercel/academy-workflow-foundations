export const MENU = [
  { name: "Margherita", price: 14 },
  { name: "Pepperoni", price: 16 },
  { name: "Sal's Special", price: 19 },
  { name: "The Carbonara", price: 21 },
  { name: "Veggie Garden", price: 17 },
] as const;

export type PizzaName = (typeof MENU)[number]["name"];
export type Size = "small" | "medium" | "large";
export type Crust = "thin" | "thick";

export type Order = {
  id: string;
  customerName: string;
  email: string;
  pizza: PizzaName;
  size: Size;
  crust: Crust;
  address: string;
  cardLast4: string;
  placedAt: string;
};

export type OrderStatus =
  | "placed"
  | "charged"
  | "confirmed"
  | "in-the-kitchen"
  | "ready-for-pickup"
  | "out-for-delivery"
  | "delivered"
  | "review-sent"
  | "escalated"
  | "failed";

export const STATUS_LABEL: Record<OrderStatus, string> = {
  placed: "Order placed",
  charged: "Card charged",
  confirmed: "Confirmation email sent",
  "in-the-kitchen": "In the kitchen",
  "ready-for-pickup": "Ready for pickup",
  "out-for-delivery": "Out for delivery",
  delivered: "Delivered",
  "review-sent": "Review request sent",
  escalated: "Order escalated",
  failed: "Order failed",
};
