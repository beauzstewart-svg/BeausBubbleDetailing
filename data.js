(function () {
  window.BBD_DATA = {
    heroBadges: [
      "Fully mobile detailing",
      "Paint-safe products",
      "Same-day and weekend slots"
    ],
    services: [
      {
        title: "Interior Detail",
        price: 70,
        description: "Deep vacuum, wipe-down, glass cleaning, and interior reset.",
        items: ["Full interior vacuum", "Dashboard and trim wipe-down", "Streak-free windows"]
      },
      {
        title: "Full Detail",
        price: 120,
        description: "Complete interior and exterior service for a like-new finish.",
        items: ["Foam hand wash", "Interior detail", "Tire and trim finish"]
      },
      {
        title: "Exterior Detail",
        price: 60,
        description: "Paint-safe exterior wash and finish enhancement.",
        items: ["Hand wash", "Wheel and tire clean", "Sealant finish"]
      }
    ],
    offerPricingTiers: [
      {
        id: "sedan-coupe",
        prices: { exterior: 60, interior: 70, fullDetail: 120 }
      },
      {
        id: "midsize-suv",
        prices: { exterior: 70, interior: 80, fullDetail: 140 }
      },
      {
        id: "suv-trucks",
        prices: { exterior: 80, interior: 90, fullDetail: 160 }
      }
    ],
    detailTypes: ["Interior Detail", "Exterior Detail", "Full Detail", "Maintenance Wash"],
    addOns: ["Pet hair removal", "Seat shampoo", "Leather condition", "Spray wax"],
    serviceAreas: [
      {
        id: "dallas",
        name: "Dallas",
        description: "Park Cities, Uptown, Lakewood, and nearby neighborhoods.",
        image: "assets/bbd-dallas.webp"
      },
      {
        id: "plano",
        name: "Plano",
        description: "Flexible mobile appointments throughout Plano.",
        image: "assets/bbd-plano.jpg"
      },
      {
        id: "fort-worth",
        name: "Fort Worth",
        description: "By-request service with advance scheduling.",
        image: "assets/bbd-fortworth.jpg"
      }
    ],
    extraAreas: ["Highland Park", "University Park", "Frisco", "Richardson", "Irving", "Arlington"],
    contactEmail: "beauzstewart@gmail.com"
  };
})();
