const ExternalSearchConfig = [
  {
    name: "Books & Media Worldwide",
    url: "https://unhlibrary.on.worldcat.org/search?",
    img: "/discovery/custom/01USNH_UNH-MAIN/img/worldcat_logo.png",
    alt: "Worldcat Logo",
    // eslint-disable-next-line no-unused-vars
    mapping(queries, filters) {
      const queryMappings = {
        any: "kw",
        title: "ti",
        creator: "au",
        subject: "su",
        isbn: "bn",
        issn: "n2",
      };
      try {
        return `queryString=${queries
          .map((part) => {
            const terms = part.split(",");
            const type = queryMappings[terms[0]] || "kw";
            const string = terms[2] || "";
            const join = terms[3] || "";
            return `${type}:${string} ${join} `;
          })
          .join("")}`;
      } catch (e) {
        return "";
      }
    },
  },
  {
    name: "Google Scholar",
    url:
      "https://unh.idm.oclc.org/login?qurl=https%3A//scholar.google.com/scholar?q=",
    img:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/200px-Google_%22G%22_Logo.svg.png",
    alt: "Google Scholar Logo",
    // eslint-disable-next-line no-unused-vars
    mapping(queries, filters) {
      try {
        return queries.map((part) => part.split(",")[2] || "").join(" ");
      } catch (e) {
        return "";
      }
    },
  },
];

export default ExternalSearchConfig;
