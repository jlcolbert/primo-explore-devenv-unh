const Items = [
  {
    id: "getting-started",
    title: "Getting Started",
    description:
      "brief static html content with an overview on how to use BULS; links to direct to main BULS help page in WordPress, other pages, and/or other sections of the menu",
    icon: { code: "description", group: "action" },
    template: `
      <h2>Using the Library Search Box</h2>
      <p>The Library Search Box allows you to find scholarly articles, books, journals, streaming media, and more.</p>
      <p>The <a href="https://libraryguides.unh.edu/librarysearchbox_unhmanchester">Using the UNH Manchester Library Search Box</a> guide gives in-depth instructions for searching.</p>
      <p>See the What's in Search section for a more detailed breakdown about the content types, collections, and materials not available in the results.</p>
      <h2>Search Tips</h2>
      <p>In a Basic Search, the items in your results will contain all of your search terms. Your terms might be in the title, author name, abstract, indexed full text, subjects, and more.</p>
      <p>Use the Advanced Search for more specific or complex searches. An Advanced Search allows you to limit your results using certain parameters, and build complex search strings.</p>
      <h3>Filter Results</h3>
      <p>Use the filters on the left side of the results (or above if on a small screen or phone) to limit what results you get.</p>
      <p>For example, you can limit your results to peer-reviewed articles that are Open Access, or published after a certain year.</p>
      <p>You can click the lock on your current filters to have them remembered if you edit your search.</p>
      <p>Move your cursor to the right of a filter and click the box that appears to exclude results that fit that parameter.</p>
    `,
  },
  /*
   *   {
   *   id: "tutorials",
   *   title: "Library Tutorials",
   *   description:
   *    "at a minimum, links to individual videos and a playlist of existing BULS video tutorials (tbd if in Kaltura, WordPress, or youtube); if possible and desired, embed using Kaltura embed code",
   *   icon: { code: "shop_two", group: "action" },
   *   template: `
   *    <h2>Library Tutorials</h2>
   *    <h3>Basic Tutorial Guides</h3>
   *    <ul>
   *      <li>
   *        <a class="arrow-link md-primoExplore-theme" href="https://libraryguides.unh.edu/tutorials" target="_blank">
   *          <span ng-if="link.linkURL.length > 0 &amp;&amp; link.displayLabel.indexOf('$$E') != 0" ng-bind-html="link.displayLabel">Library Tutorials: Start Here</span>
   *        </a>
   *      </li>
   *      <li>
   *        <a class="arrow-link md-primoExplore-theme" href="https://libraryguides.unh.edu/c.php?g=904188&p=6519518" target="_blank">
   *          <span ng-if="link.linkURL.length > 0 &amp;&amp; link.displayLabel.indexOf('$$E') != 0" g-bind-html="link.displayLabel">How to Find Full Text</span>
   *        </a>
   *      </li>
   *      <li>
   *        <a class="arrow-link md-primoExplore-theme" href="https://libraryguides.unh.edu/c.php?g=904188&p=6550618" target="_blank">
   *          <span ng-if="link.linkURL.length > 0 &amp;&amp; link.displayLabel.indexOf('$$E') != 0" ng-bind-html="link.displayLabel">How to Find a Book</span>
   *        </a>
   *      </li>
   *      <li>
   *        <a class="arrow-link md-primoExplore-theme" href="https://libraryguides.unh.edu/c.php?g=904188&p=6527296" target="_blank">
   *          <span ng-if="link.linkURL.length > 0 &amp;&amp; link.displayLabel.indexOf('$$E') != 0" ng-bind-html="link.displayLabel">How to Request Full Text</span>
   *        </a>
   *      </li>
   *      <li>
   *        <a class="arrow-link md-primoExplore-theme" href="https://libraryguides.unh.edu/c.php?g=904188&p=7768455" target="_blank">
   *          <span ng-if="link.linkURL.length > 0 &amp;&amp; link.displayLabel.indexOf('$$E') != 0" ng-bind-html="link.displayLabel">How to Find Journals</span>
   *        </a>
   *      </li>
   *    </ul>
   *    <h3>In-Depth Guides</h3>
   *    <ul>
   *      <li>
   *        <a class="arrow-link md-primoExplore-theme" href="https://libraryguides.unh.edu/librarysearchbox_unhdurham">How to Use the UNH Durham Library Search Box</a>
   *      </li>
   *      <li>
   *        <a class="arrow-link md-primoExplore-theme" href="https://libraryguides.unh.edu/LCC">Library Call Numbers</a>
   *      </li>
   *    </ul>
   *   `,
   *   },
   */
  {},
  {
    id: "whats-in-search",
    title: "What am I searching?",
    description: `brief description of material types, "scopes", and collections; may have submenus for each of the above; likely also link out to WordPress page with all PCI collections`,
    icon: { code: "toc", group: "action" },
    template: `
      <h2>Databases/Journals</h2>
      <h3>Databases</h3>
      <p>The UNH Library subscribes to many databases. When you perform a search, your results will include items from (most of) those databases.</p>
      <p>While many of the databases are primarily used to find scholarly articles, some databases also provide access to statistics, images and audio, historical documents, and more.</p>
      <p>You can search the name of a database in the Library Search Box, or you can use our <a href="https://library.unh.edu/find/databases">Databases</a> page to look for and visit specific databases.</p>
      <h3>Journals</h3>
      <p>Most of the time, the resources in databases come from journals. You can search in specific journals by using the <a href="https://unh.primo.exlibrisgroup.com/discovery/jsearch?vid=01USNH_UNH:MANCH">Journal Search</a>.</p>
      <p>You can access the Journal Search on the main page of the library's website, or in the top menu links of the Library Search Box.</p>
      <h2>Library Books</h2>
      <p>The library provides access to physical books as well as e-books.</p>
      <h2>Streaming Media</h2>
      <p>Through the library, you have access to audio and video materials for free.</p>
      <p>These materials include movies in Kanopy, plays in Alexander Street Press, and music in Music Online, to name a few.</p>
      <h2>Newspapers</h2>
      <p>When you search, your results won't include newspaper articles. Instead, you have the option to repeat your search in the dedicated <a href="https://unh.primo.exlibrisgroup.com/discovery/npsearch?vid=01USNH_UNH:MANCH">Newspapers Search</a>, which only includes newspaper articles.</p>
      <p>You can find links to the <a href="https://unh.primo.exlibrisgroup.com/discovery/npsearch?vid=01USNH_UNH:MANCH">Newspapers Search</a> in the top menu links, at the bottom of your search results, and in the Resource Type filter.</p>
      <h2>What's not included?</h2>
      <p>Not every database gives full-text access. Some only index bibliographic information about resources.</p>
      <p>By default, your search results will only include online resources with full text. You can see the resources with no full text by clicking "Include items with no full text".</p>
      <h2>Getting Full-Text</h2>
      <p>If we don't have an article, book or book chapter, or any other resource, you can request it through Interlibrary Loan.<p>
      <p>With Interlibrary Loan, we will borrow the resource you want from another library and check it out to you for free.</p>
      <p>You can fill out the Interlibrary Loan form manually, or you can click "Interlibrary Loan (DURHAM users)" in "How to find it" to autopopulate a form. <strong>You must be logged into your library account to see the Interlibrary Loan option.</strong></p>
    `,
  },
  {
    id: "didnt-find",
    title: "Didn't find it?",
    description: `TBD info about ILL, scope of collections, and problem cases`,
    icon: { code: "swap_horiz", group: "action" },
    template: `
      <p>Research can be an iterative process. It takes time and patience to figure out the right search to find what you're looking for. When you're having trouble, try these options:<p>
      <h2>Repeat your search in an external database</h2>
      <p>Using the "External Search" filter, click "Books & Media Worldwide" to repeat your search in our WorldCat discovery service. Use this primarily for books, CDs, DVDs, and other physical items.</p>
      <p>Also in the "External Search" filter is the option to repeat your search in Google Scholar. Use this for scholarly articles.</p>
      <p>Search specific subjects using our subscription databases. For example, if you're writing a paper for an English class, look in MLA or JSTOR.</p>
      <h2>Citation Trails</h2>
      <p>Look in the bibliography/works cited of an article or book that talks about your research topic and investigate the sources it cites.</p>
      <p>Look for red arrows pointing up or down in your search results: clicking on those will show you what the resource cites or what resources cite it.</p>
      <h2>Ask Us!</h2>
      <p>The UNH librarians can help you with search strategies, citations and citation management, bibliographies, and more!</p>
      <p>You can contact us in a few ways:</p>
      <ul>
        <li>The "Ask a Librarian" link on the front page of the library website.</li>
        <li>Anywhere else you see the "Ask a Librarian" link.</li>
        <li><a href="https://unh.az1.qualtrics.com/jfe/form/SV_dpqDvKxeELKYBYV">Tell us how we can help you</a></li>
        <li><a href="https://outlook.office365.com/owa/calendar/ReferenceAppointmentcalendar@wildcatsunh.onmicrosoft.com/bookings/">Make an appointment</a></li>
        <li>Email us at: <a href="mailto:unhm.library@unh.edu">unhm.library@unh.edu</a></li>
      </ul>
      `,
  },
  {},
  {
    id: "guides",
    title: "Research Guides",
    description: `info about research, subject, course, and how to guides; how to find in BULS by way of search and related more info links; link out to LibGuides home`,
    icon: { code: "directions", group: "maps" },
    template: `
      <h2>Find Your Research Path</h2>
      <p>Our experts can help you get a start. Subject guides provide recommendations for finding articles, books, and background information. Course guides identify course-specific library resource but can also help you with similar classes.</p>
      <p>You can find Subject Guides, How-To Guides, Course Guides, and more on our <a href="https://libraryguides.unh.edu/">Research Guides</a> page.</p>
    `,
  },
  {},
  {
    id: "saving-results",
    title: "Saving Results",
    description:
      "information about My Favorites, exporting results, ref managers",
    icon: { code: "save", group: "content" },
    template: `
      <h2>My Favorites</h2>
      <p>
      <span>Favorites let you save results and label them for easy recall. To use:</span>
      <ul>
          <li>Sign In first</li>
          <li>Click the pushpin next to the title to save to My Favorites</li>
          <li>To view My Favorites, click the pushpin in the upper right menu</li>
          <li>Use the "...Send To" options to export to other formats and reference managers.</li>
          <li>Organize your results by adding labels. For example, frequently used databases.</li>
      </ul>
      </p>
      <h2>Saved Searches</h2>
      <p>You can save searches to run again later, or to set alerts to be notified via email when new records are available.</p>
      <p>Saved search alerts are most effective when combined with filters, such as material type(s), date range, and availability.</p> 
      <p>After doing a search...</p>
      <ul>
          <li>Sign In first</li>
          <li>Click the Save Search pin at the top of the results list.</li>
          <li>You'll receive a prompt to optionally set a notifcation for email alerts</li>
          <li>To return to your saved searches, click the pushpin icon in the upper right corner (same as for My Favorites)</li>
          <li>Alerts can be enabled or disabled by selecting the bell icon</li>
      </ul>
    `,
  },
  {
    id: "citing-sources",
    title: "Citing Sources",
    description:
      "likely, but may depend on if including saving results; would have info about ref managers",
    icon: { code: "create", group: "content" },
    template: `
      <h2>Citation Formatting</h2>
      Use the quotation mark icon to copy a citation in these formats:
      <ul>
        <li>APA (7th edition)</li>
        <li>Chicago 17th/Turabian 9th Author-Date</li>
        <li>Chicago 17th/Turabian 9th Notes-Bibliography</li>
        <li>MLA (8th edition)</li>
        <li>IEEE</li>
      </ul>
      <p>Double check the citation details and formatting for accuracy.</p>
      <p>See our <a href="https://libraryguides.unh.edu/unhmcitingsources" target="_blank">Citing Sources Research Guide</a> for more information about citing sources.</p>
      <h2>Citation Managers</h2>
      <p>Bibliographic management tools allow you to store, manage, and format citations. They can import references from databases, place citations formatted in various styles directly into your text, and create reference lists.</p>
      <p>They are also a good way to create a library of the resources you've cited; some managers even save the PDF for you.</p>
      <p>Note: EndNote can be purchased at the UNH Computer Store. The UNH Library does not subscribe to EndNote.</p>
      <h3>Saving Citations</h3>
      <p>Citation managers import bibliographic information about the resource. Most include a browser plugin for clipping this information.</p>
      <p>The Library Search Box also lets you export citations in RIS format to manually import into your citation manager, such as:</p>
      <ul>
        <li>Zotero</li>
        <li>Mendeley</li>
        <li>Othe citation managers that use RIS format</li>
      </ul>
    `,
  },
  {
    id: "account",
    title: "My Library Account",
    description:
      "information about My Library Account functionality- loans, renewals, policies?; may also highlight or link to My Library Account",
    icon: { code: "account_box", group: "action" },
    template: `
    <h2>My Library Account</h2>
    <p>Your Library Account and Library Card consists of the following tabs, which enable you to view the contents of your library card and perform library services, such as renewing a book or canceling a request:</p>
    <ul>
      <li>Overview – Displays a summary of each of the tabs to allow you to see if any action is required.</li>
      <li>Loans – Displays all of your current and outstanding loans.</li>
      <li>Requests – Displays all of your current requests.</li>
      <li>Fines & Fees – Displays all of your current fees and fines.</li>
      <li>Blocks & Messages – Displays all general messages and any blocks that may prevent you from accessing services in the library.</li>
      <li>Personal Details – You can tailor the user interface so that it reflects the way you usually search. For example, you can specify the default language.</li>
    </ul>
    <p><a href="https://unh.primo.exlibrisgroup.com/discovery/login?vid=01USNH_UNH:MANCH&lang=en">Sign in</a> to your Library Account by clicking the "Sign in" link in the top right corner. After you sign in, click your name and click "Library Card".</p>
    `,
  },
  {},
  {
    id: "ask-us",
    title: "Ask Us",
    description:
      "needs definition; how to point to chat? link to ask a librarian?",
    icon: { code: "forum", group: "communication" },
    template: `
      <h2>Ask Us!</h2>
      <p>The UNH librarians can help you with search strategies, citations and citation management, bibliographies, and more!</p>
      <p>You can contact us in a few ways:</p>
      <ul>
        <li>The "Ask a Librarian" link on the front page of the library website.</li>
        <li>Anywhere else you see the "Ask a Librarian" link.</li>
        <li><a href="https://unh.az1.qualtrics.com/jfe/form/SV_dpqDvKxeELKYBYV">Tell us how we can help you</a></li>
        <li><a href="https://outlook.office365.com/owa/calendar/ReferenceAppointmentcalendar@wildcatsunh.onmicrosoft.com/bookings/">Make an appointment</a></li>
        <li>Email us at: <a href="mailto:unhm.library@unh.edu">unhm.library@unh.edu</a></li>
      </ul>
      <h2>Other Contact Information</h2>
      <h3>Email or Call</h3>
      <p>Email us at: <a href="mailto:unhm.library@unh.edu">unhm.library@unh.edu</a></p>
      <h4>Dimond Library</h4>
      <p><a href="https://library.unh.edu/directory/all?last_name=&amp;role=All&amp;category=36">Research Center</a><br />
      (603) 862-1544</p>
      <p><a href="https://library.unh.edu/directory/all?last_name=&amp;role=All&amp;category=24">Government Information</a><br />
      (603) 862-1435</p>
      <p><a href="https://library.unh.edu/directory/all?last_name=&amp;role=All&amp;category=3">Special Collections &amp; Archives</a><br />
      (603) 862-2714</p>
      <p><a href="https://library.unh.edu/directory/all?last_name=&amp;role=All&amp;category=4">Circulation Desk</a><br />
      (603) 862-3125</p>
      <p><a href="https://library.unh.edu/directory/all?last_name=&amp;role=All&amp;category=4">Reserves</a><br />
      (603) 862-3125</p>
      <h4>Branch Libraries</h4>
      <p><a href="https://library.unh.edu/directory/all?last_name=&amp;role=All&amp;category=20">Chemistry Library</a><br />
      (603) 862-1083</p>
      <p><a href="https://library.unh.edu/directory/all?last_name=&amp;role=All&amp;category=22">Engineering, Math, &amp; Computer Science Library</a><br />
      (603) 862-1196</p>
      <p><a href="https://library.unh.edu/directory/all?last_name=&amp;role=All&amp;category=34">Physics Library</a><br />
      (603) 862-2348</p>
      <h4>UNH Manchester Library</h4>
      <p><a href="https://libraryguides.unh.edu/remoteaccess/researchhelp" title="UNH Manchester Research Help">UNH Manchester Library</a> (603) 641-4173</p>
      <h4>UNH Law Library</h4>
      <p><a href="https://law.unh.libguides.com/home" title="UNH Law Library">UNH Law Library</a> (603) 513-5130</p>
    `,
  },
];

export default Items;
