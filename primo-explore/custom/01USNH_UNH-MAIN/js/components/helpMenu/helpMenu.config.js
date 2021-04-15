import Items from "./items.constant";
import Updates from "./updates.constant";

const HelpMenuConfig = {
  logToConsole: true,
  publishEvents: false,

  enableNotificationIndicator: true,
  notificationIndicatorExpiration: 1000 * 60 * 60 * 24 * 7 * 2,

  helpMenuTitle: "Search Menu",
  updatesLabel: "Search Updates",
  // eslint-disable-next-line camelcase
  list_of_updates: Updates,
  entriesLabel: "Help Entries",
  // eslint-disable-next-line camelcase
  list_of_elements: Items,

  helpMenuWidth: 500,
};

export default HelpMenuConfig;
