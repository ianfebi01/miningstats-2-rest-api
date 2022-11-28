import Income from "../models/Income.js";
import moment from "moment";
import Cost from "../models/Cost.js";
export const getOverview = async (req, res) => {
  try {
    const thisMonth = new Date().getMonth() + 1;
    const income = await Income.aggregate([
      { $match: { $expr: { $eq: [{ $month: "$date" }, thisMonth] } } },
      {
        $group: {
          total: { $sum: "$value" },
          totalFee: { $sum: "$fee" },
          _id: {
            month: {
              $month: "$date",
            },
            year: {
              $year: "$date",
            },
          },
        },
      },
    ]);
    const allIncome = await Income.aggregate([
      {
        $project: {
          income: { $subtract: ["$value", "$fee"] },
          date: "$date",
        },
      },
      {
        $group: {
          total: { $sum: "$income" },
          _id: {
            month: {
              $month: "$date",
            },
            year: {
              $year: "$date",
            },
          },
        },
      },
      {
        $sort: {
          " $date": 1,
        },
      },
    ]);
    const incomePrev = await Income.aggregate([
      { $match: { $expr: { $eq: [{ $month: "$date" }, thisMonth - 1] } } },
      {
        $group: {
          total: { $sum: "$value" },
          totalFee: { $sum: "$fee" },
          _id: {
            month: {
              $month: "$date",
            },
            year: {
              $year: "$date",
            },
          },
        },
      },
    ]);
    const incomeNext = await Income.aggregate([
      { $match: { $expr: { $eq: [{ $month: "$date" }, thisMonth + 1] } } },
      {
        $group: {
          total: { $sum: "$value" },
          totalFee: { $sum: "$fee" },
          _id: {
            month: {
              $month: "$date",
            },
            year: {
              $year: "$date",
            },
          },
        },
      },
    ]);
    const cost = await Cost.aggregate([
      { $match: { $expr: { $eq: [{ $month: "$date" }, thisMonth] } } },
      {
        $group: {
          total: { $sum: "$price" },
          _id: {
            month: {
              $month: "$date",
            },
            year: {
              $year: "$date",
            },
          },
        },
      },
    ]);

    const month = moment(String(income[0]?._id?.month)).format("MMMM");

    const allMonth = allIncome.map((item) =>
      moment(String(item?._id?.month)).format("MMMM")
    );
    const allIncomeTotal = allIncome.map((item) => item?.total);
    res.send({
      overview: {
        month: month,
        profit: income[0]?.total - income[0]?.totalFee,
        cost: cost[0]?.total,
        incomePrev: incomePrev[0],
        incomeNext: incomeNext[0],
        allMonth: allMonth,
        allIncomeTotal: allIncomeTotal,
        allIncome: allIncome,
      },
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
