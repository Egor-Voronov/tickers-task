import { useState, useEffect, useRef } from "react";
import type { FC } from "react";
import type { ITickerTableProps } from "./TickerTable.types.ts";
import { TickerTableRow } from "./TickerTableRow";
import styles from "@/shared/styles/table.module.css";

export const TickerTable: FC<ITickerTableProps> = ({ data, onModalOpen }) => {
  const [changedCells, setChangedCells] = useState<Record<string, boolean>>({});
  const prevData = useRef<typeof data>([]);

  useEffect(() => {
    const newChangedCells: Record<string, boolean> = {};
    data.forEach((newItem, index) => {
      const oldItem = prevData.current[index];
      if (oldItem) {
        if (
          newItem.price !== oldItem.price ||
          newItem.bestBidPrice !== oldItem.bestBidPrice ||
          newItem.percentChange !== oldItem.percentChange
        ) {
          newChangedCells[newItem.tradeId] = true;
        }
      }
    });

    setChangedCells(newChangedCells);
    prevData.current = data;

    const timeout = setTimeout(() => {
      setChangedCells({});
    }, 1000);

    return () => clearTimeout(timeout);
  }, [data]);

  return (
    <div>
      <table role="header" className={styles.table}>
        <thead>
          <tr>
            <th>Имя котировки</th>
            <th>Цена</th>
            <th>Лучшая цена</th>
            <th>Изменение цены</th>
          </tr>
        </thead>
        <tbody className={styles.tableContent}>
          {data.map((item) => (
            <TickerTableRow
              onModalOpen={onModalOpen}
              key={item.tradeId}
              data={item}
              isChanged={changedCells[item.tradeId]}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
