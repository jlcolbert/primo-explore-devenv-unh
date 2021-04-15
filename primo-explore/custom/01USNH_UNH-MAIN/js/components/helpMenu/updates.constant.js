const Updates = [
  {
    id: "hathitrust-availability",
    title: "Hathi Trust Availability ETAS",
    description:
      "the hathitrust emergency temporary access service (ETAS) allows online reading access to selected materials",
    icon: { code: "mediation", group: "action" },
    template: `
      <h3>About the HathiTrust Emergency Temporary Access Service (ETAS)</h3>
      <p>The HathiTrust Emergency Temporary Access Service (ETAS) allows current BU students, faculty, and staff to have <strong>online reading access to selected materials that are in the BU Libraries but are currently unavailable due to the closure of the Libraries</strong>.</p>
      <p>Faculty, students, and staff can access these materials via <a href="http://library.bu.edu/buls">BU Libraries Search</a>. Physical books in BU Libraries that are also available via HathiTrust will have a “<strong>Full Text Available at HathiTrust</strong>” link included in their records in BU Libraries Search.</p>
      <p class="big-text"><strong>Access to these books is a multi-step process. Please follow the steps outlined below to read the books online.</strong></p>
      <h3>How to Access Books via HathiTrust</h3>
      <p>
        Faculty, students, and staff can access these materials via BU Libraries Search. Physical books in BU Libraries that are also available via
        HathiTrust will have a “<strong>Full Text Available at HathiTrust</strong>” link included in their records in BU Libraries Search.
        <em>(Note: This link will also be shown for out-of-copyright items; for those items the link will take you directly to the item without having to follow the steps below.)</em>
      </p>
    `,
  },
  {
    id: "visiting-the-libraries",
    title: "Visiting the Libraries",
    description:
      "discussion of covid-related changes to bu libraries operation",
    icon: { code: "business", group: "communication" },
    template: `
      <h2>Try Online First</h2>
      <p>
        Our building capacity has been significantly reduced to comply with public health guidelines. To avoid long waits, try connecting with us online
        before you come to our physical locations. We have expanded our online service delivery and may be able to help you without a visit to one of our branches.
      </p>
    `,
  },
];

export default Updates;
