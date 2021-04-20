import Items from "./items.constant";
import Updates from "./updates.constant";

const HelpMenuConfig = {
  logToConsole: true,
  publishEvents: false,

  enableNotificationIndicator: true,
  notificationIndicatorExpiration: 1000 * 60 * 60 * 24 * 7 * 2,

  helpMenuTitle: "Get Help",
  updatesLabel: "What's New?",
  // eslint-disable-next-line camelcase
  list_of_updates: Updates,
  entriesLabel: "Search Help",
  // eslint-disable-next-line camelcase
  list_of_elements: Items,

  helpMenuWidth: 500,
};

export default HelpMenuConfig;
