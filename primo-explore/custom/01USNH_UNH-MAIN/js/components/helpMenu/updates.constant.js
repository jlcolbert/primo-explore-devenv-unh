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
    title: "Visiting the Libraries: COVID-19",
    description:
      "discussion of covid-related changes to bu libraries operation",
    icon: { code: "business", group: "communication" },
    template: `
      <h2>Try Online First</h2>
      <p>Many of our print books will not circulate during the pandemic. Try limiting your search to electronic items using the "Available Online" search profile.</p>
      <p>Our services, such as research help, are still available online. Ask a librarian for more help!.</p>
      <a href="https://library.unh.edu/blog/2021/01/covid-19-phased-return"</a>COVID-19 Phased Return Information</a>
      <h2>Building Access</h2>
      <p>During the pandemic, our buildings have limited hours and are open only to UNH students, faculty, and staff who are part of the UNH COVID testing protocol.</p>
      <p><strong>Beginning on March 9, everyone wishing to use the library will need swipe in with their UNH ID (with a valid Wildcat pass) to enter our library locations.</strong></p>
      <p>As with all campus buildings, library users must wear masks when in library spaces. Hand sanitizer and sanitizing wipes will be available, and patrons are asked to maintain a 6-foot physical distance from other patrons, not move furniture, and practice recommended hygiene to limit the spread of COVID-19. To allow for physical distancing, our meeting and study rooms now have reduced occupancy limits.</p>
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
      <h3>Information Below Search Box</h3>
      <p>The menu below the search box contains links to important information and resources, such as links to the other campus search boxes, library locations, and a tutorial research guide.</p>
      <h3>Help Menu</h3>
      <p>This is what you're looking at right now! In the top right menu of the webpage, click the circular icon with the question mark to open this help menu. It contains a lot of information about searching for resources.</p>
      <h3>Newspaper Search</h3>
      <p>Newspaper articles will no longer be included in your results. Instead, you can use the dedicated Newspaper Search. You can get to this by doing a regular search and then clicking "Newspaper Search" in the Resource Type filter, or by scrolling to the bottom of your results and clicking the link there. There is also a link in the top menu of the results page.</p>
      <h3>Unpaywall</h3>
      <p>The Library Search Box already indicates if an article is Open Access (meaning it can be accessed without paying for it, even if you're not in your library account). However, it doesn't always give you a link to the Open Access version. With this new feature, a link that says "View Open Access Version via Unpaywall" will show up in your results. Clicking this link will download directly or take you to the article, for free! (It sometimes even finds Open Access versions when the Library Search Box can't, including on items we don't have access to.)</p>
      </ul>
    `,
  },
];

export default Updates;
