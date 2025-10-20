import React from "react";
import { useGetDashBoardQuery } from "../../../lib/redux/services/dashboard/dashboard.service";

const DashBoard = () => {
  const { data } = useGetDashBoardQuery();

  const cards = [
    {
      title: "Total Borders",
      value: data?.border.totalBorder,
      color: "bg-blue-500",
    },
    {
      title: "Total Deposit",
      value: data?.deposit.totalAmount,
      subtitle: `Transactions: ${data?.deposit.totalCount}`,
      color: "bg-green-500",
    },
    {
      title: "Total Meals",
      value: data?.meal?.totalMealCount ?? 0,
      subtitle: `Total: ${data?.meal.mealTotal}`,
      color: "bg-yellow-500",
    },
  ];
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`${card.color} text-white rounded-2xl p-6 shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl cursor-pointer`}
          >
            <span className="text-sm opacity-80">{card.title}</span>
            <p className="text-3xl font-bold mt-2">{card.value}</p>
            {card.subtitle && (
              <span className="text-sm opacity-80 mt-1 block">
                {card.subtitle}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashBoard;
