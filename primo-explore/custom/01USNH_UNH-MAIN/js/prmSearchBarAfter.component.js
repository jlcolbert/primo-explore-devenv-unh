// - configure Search Bar Sub Menu - //
app
  .component('prmSearchBarAfter', {
    bindings: {
      parentCtrl: '<',
    },
    template:
      '<search-bar-sub-menu parent-ctrl="$ctrl.parentCtrl"></search-bar-sub-menu>',
  })
  .constant('searchBarSubMenuItems', [
    {
      name: 'How To Search',
      description: 'Learn how to use the library search box',
      action: 'https://libraryguides.unh.edu/librarysearchbox_unhdurham',
      icon: {
        set: 'action',
        icon: 'ic_info_24px',
      },
      show_xs: true,
      cssClasses: 'button-over-light',
    },
    {
      name: 'UNH Law Library',
      description: 'Search the Law Library',
      action:
        'https://unh.primo.exlibrisgroup.com/discovery/search?vid=01USNH_UNH:LAW',
      icon: {
        set: 'action',
        icon: 'ic_search_24px',
      },
      show_xs: true,
      cssClasses: 'button-over-light',
    },
    {
      name: 'UNH Manchester Library',
      description: 'Search the Manchester Library',
      action:
        'https://unh.primo.exlibrisgroup.com/discovery/search?vid=01USNH_UNH:MANCH',
      icon: {
        set: 'action',
        icon: 'ic_search_24px',
      },
      show_xs: true,
      cssClasses: 'button-over-light',
    },
    {
      name: 'Ask a Librarian',
      description: 'Get help with your research',
      action: 'https://library.unh.edu/research-support/ask-librarian',
      icon: {
        set: 'action',
        icon: 'ic_question_answer_24px',
      },
      cssClasses: 'button-over-light',
    },
  ]);
