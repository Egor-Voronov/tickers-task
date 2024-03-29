import { useState } from "react";
import type { FC } from "react";
import type { ITabsProps } from "./Tabs.types.ts";
import { TickerTable } from "@/widgets/TickerTable";
import { TickerModal, tickerModalStore } from "@/widgets/TickerModal";

export const Tabs: FC<ITabsProps> = ({ data, activeTab }) => {
  const modalStore = tickerModalStore;
  const [localShowModal, setLocalShowModal] = useState(modalStore.showModal);

  const handleClose = () => {
    modalStore.closeModal();
    setLocalShowModal(false);
  };

  const handleOpen = () => {
    modalStore.openModal();
    setLocalShowModal(true);
  };

  return (
    <>
      <h1>Активный таб: {activeTab}</h1>
      {activeTab && <TickerTable data={data} onModalOpen={handleOpen} />}
      <TickerModal
        showModal={localShowModal}
        onModalClose={handleClose}
        data={data}
      />
    </>
  );
};
