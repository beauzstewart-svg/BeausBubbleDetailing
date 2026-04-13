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
        price: 110,
        description: "Deep vacuum, wipe-down, glass cleaning, and interior reset.",
        items: ["Full interior vacuum", "Dashboard and trim wipe-down", "Streak-free windows"]
      },
      {
        title: "Full Detail",
        price: 185,
        description: "Complete interior and exterior service for a like-new finish.",
        items: ["Foam hand wash", "Interior detail", "Tire and trim finish"]
      },
      {
        title: "Exterior Detail",
        price: 90,
        description: "Paint-safe exterior wash and finish enhancement.",
        items: ["Hand wash", "Wheel and tire clean", "Sealant finish"]
      }
    ],
    offerPricingTiers: [
      {
        id: "sedan-coupe",
        prices: { exterior: 90, interior: 110, fullDetail: 185 }
      },
      {
        id: "midsize-suv",
        prices: { exterior: 100, interior: 120, fullDetail: 205 }
      },
      {
        id: "suv-trucks",
        prices: { exterior: 110, interior: 130, fullDetail: 220 }
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
