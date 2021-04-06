export let searchTargets = {
  config: [
    {
      name: 'Books & Media Worldwide',
      url: 'https://unhlibrary.on.worldcat.org/search?',
      img:
        './custom/01USNH_UNH-EXPLORE/node_modules/@orbis-cascade/primo-explore-external-search/worldcat-logo.png',
      alt: 'Worldcat Logo',
      mapping: function (queries, filters) {
        const query_mappings = {
          any: 'kw',
          title: 'ti',
          creator: 'au',
          subject: 'su',
          isbn: 'bn',
          issn: 'n2',
        };
        try {
          return (
            'queryString=' +
            queries
              .map((part) => {
                let terms = part.split(',');
                let type = query_mappings[terms[0]] || 'kw';
                let string = terms[2] || '';
                let join = terms[3] || '';
                return type + ':' + string + ' ' + join + ' ';
              })
              .join('')
          );
        } catch (e) {
          return '';
        }
      },
    },
    {
      name: 'Google Scholar',
      url: 'https://scholar.google.com/scholar?q=',
      img:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/200px-Google_%22G%22_Logo.svg.png',
      alt: 'Google Scholar Logo',
      mapping: function (queries, filters) {
        try {
          return queries.map((part) => part.split(',')[2] || '').join(' ');
        } catch (e) {
          return '';
        }
      },
    },
  ],
};
