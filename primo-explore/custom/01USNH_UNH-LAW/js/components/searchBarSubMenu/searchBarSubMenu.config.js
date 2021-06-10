const SearchBarSubMenuConfig = [
  {
    name: "How To Search",
    description: "Learn how to use the library search box",
    action: "https://libraryguides.unh.edu/librarysearchbox_unhdurham",
    icon: {
      set: "action",
      icon: "ic_info_24px",
    },
    // eslint-disable-next-line camelcase
    show_xs: true,
    cssClasses: "button-over-light",
  },
  {
    name: "Citation Search",
    description: "Search with citation information, DOI, or other identifiers",
    action:
      "https://unh.primo.exlibrisgroup.com/discovery/citationlinker?vid=01USNH_UNH:MAIN",
    icon: {
      set: "editor",
      icon: "ic_format_quote_24px",
    },
    // eslint-disable-next-line camelcase
    show_xs: true,
    cssClasses: "button-over-light",
  },
  {
    name: "Hours",
    description: "Library hours",
    action: "https://law.unh.libguides.com/home/calendar",
    icon: {
      set: "action",
      icon: "ic_schedule_24px",
    },
    // eslint-disable-next-line camelcase
    show_xs: true,
    cssClasses: "button-over-light",
  },
  {
    name: "UNH Durham Library",
    description: "Search the Durham Library",
    action:
      "https://unh.primo.exlibrisgroup.com/discovery/search?vid=01USNH_UNH:MAIN&lang=en",
    icon: {
      set: "action",
      icon: "ic_search_24px",
    },
    // eslint-disable-next-line camelcase
    show_xs: true,
    cssClasses: "button-over-light",
  },
  {
    name: "UNH Manchester Library",
    description: "Search the Manchester Library",
    action:
      "https://unh.primo.exlibrisgroup.com/discovery/search?vid=01USNH_UNH:MANCH",
    icon: {
      set: "action",
      icon: "ic_search_24px",
    },
    // eslint-disable-next-line camelcase
    show_xs: true,
    cssClasses: "button-over-light",
  },
];

export default SearchBarSubMenuConfig;
