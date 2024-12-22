import { useRef, useState } from "react";

import classNames from "classnames";

interface Tab {
  label: string;
  disabled?: boolean;
}

const tabs: Tab[] = [{ label: "Description" }, { label: "Reviews" }];

const ContentTab = () => {
  const tablistRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<Tab>(tabs[0]);
  const isActive = (tab: Tab) => activeTab.label === tab.label;
  const tabId = (label: string) => `${label}-tab`;
  const panelId = (label: string) => `${label}-panel`;

  return (
    <>
      <div
        ref={tablistRef}
        role="tablist"
        aria-label="Select tab"
        aria-orientation="horizontal"
        className="flex gap-2 border-b border-b-neutral-200 pb-1 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {tabs.map((tab) => (
          <button
            key={tab.label}
            type="button"
            role="tab"
            id={tabId(tab.label)}
            aria-controls={panelId(tab.label)}
            aria-selected={isActive(tab)}
            disabled={tab.disabled}
            tabIndex={isActive(tab) ? 0 : -1}
            onClick={() => setActiveTab(tab)}
            className={classNames(
              "px-4 py-2 rounded-md font-medium whitespace-nowrap text-neutral-500 hover:enabled:bg-primary-100 hover:enabled:text-primary-800 active:enabled:bg-primary-200 active:enabled:text-primary-900 disabled:text-disabled-500 focus-visible:outline focus-visible:-outline-offset-2 focus-visible:shadow-[inset_0_0_0_4px_rgb(255,255,255)]",
              { "!bg-neutral-100 !text-black": isActive(tab) },
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.map((tab) => (
        <div
          key={tab.label}
          role="tabpanel"
          id={panelId(tab.label)}
          aria-labelledby={tabId(tab.label)}
        >
          {isActive(tab) && (
            <p className="p-4 text-neutral-500">Content for tab {tab.label}</p>
          )}
        </div>
      ))}
    </>
  );
};

export default ContentTab;
