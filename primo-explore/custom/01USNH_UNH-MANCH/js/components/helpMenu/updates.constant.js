const Updates = [
  {
    id: "hathitrust-availability",
    title: "'Print version unavailable for checkout'?",
    description:
      "the hathitrust emergency temporary access service (ETAS) allows online reading access to selected materials",
    icon: { code: "link", group: "content" },
    template: `
      <p class="big-text"><strong>If books are found via a Library Search, the text "Print Version Unavailable for Checkout" will be displayed with the results. Those materials will all also contain links to the full text online (“Full Text Available at HathiTrust”).</strong></p>
      <h3>How to Access Books via HathiTrust</h3>
      <ol>
        <li>Click "HathiTrust Emergency Temporary Access: Click here then login for access" to see the book in Hathitrust.</li>
        <li>From anywhere on the HathiTrust website, click the yellow LOG IN button.</li>
        <li>Find and select the University of New Hampshire in the list of partner institutions.</li>
        <li>Log in with your UNH id and password.</li>
        <li>When you have logged in, you will be returned to the book in HathiTrust.</li>
      </ol>
      <a href="https://libraryguides.unh.edu/hathitrust"><strong>To learn more about the Hathitrust Emergency Temporary Access Service, visit this Research Guide.</strong></a>
      `,
  },
  {
    id: "visiting-the-libraries",
    title: "Remote Access",
    description:
      "discussion of covid-related changes to bu libraries operation",
    icon: { code: "business", group: "communication" },
    template: `
      <h2>Try Online First</h2>
      <p>Many of our print books will not circulate during the pandemic. Try limiting your search to electronic items using the "Available Online" search profile.</p>
      <p>Our services, such as research help, are still available online. Ask a librarian for more help!.</p>
      <p><a href="https://libraryguides.unh.edu/remoteaccess">Visit our Remote Access Research Guide for more information about using library resources and services remotely.</a></p>
       `,
  },
  {},
  {
    id: "new-features",
    title: "What's New in the Library Search Box?",
    description: "information on newly added features",
    icon: { code: "extension", group: "action" },
    template: `
      <h2>Recently Added Features</h2>
      <h3>Available Online</h3>
      <p>Click the dropdown menu that says "Library Catalog & Articles" and select "Available Online" to limit your results to only things we have immediate online access to. Expand your results to include items you can get through Interlibrary Loan.</p>
      <h3>External Search</h3>
      <p>The External Search filter on the left side of the results allows you to repeat your search in WorldCat (Books & Media Worldwide) or Google Scholar.</p>
      <h3>Help Menu</h3>
      <p>This is what you're looking at right now! In the top right menu of the webpage, click the circular icon with the question mark to open this help menu. It contains a lot of information about searching for resources.</p>
      <h3>Author Information Card</h3>
      <p>At the bottom of some item records, a new section will be created titled "More information about the author". If certain parameters are met, this Author Information Card pulls information about the author from Wikidata, DBpedia, and more!</p>
      <h3>Newspaper Search</h3>
      <p>Newspaper articles will no longer be included in your results. Instead, you can use the dedicated Newspaper Search. You can get to this by doing a regular search and then clicking "Newspaper Search" in the Resource Type filter, or by scrolling to the bottom of your results and clicking the link there. There is also a link in the top menu of the results page.</p>
      </ul>
    `,
  },
];

export default Updates;
