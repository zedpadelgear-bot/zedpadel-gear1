// Adidas Padel Rackets 2026 Collection
// Exchange Rate: 1 EUR = 23.5 ZMW
// Formula: ((Euro Price + 33) * 23.5) + 600

const adidasProducts = [
    {
        id: 11,
        name: "Adidas Metalbone 2026 by Ale Galán",
        brand: "Adidas",
        category: "rackets",
        price: 8365,
        originalPrice: 8900,
        image: "https://via.placeholder.com/400x500/1a1a1a/E69628?text=Adidas+Metalbone+2026",
        description: "Flagship padel designed for advanced players seeking balance between power and maneuverability. Diamond shape with Weight & Balance System adjusting up to 11.2g. Carbon Aluminized 16K surface with 3D roughness. EVA core delivers medium touch. Frame Power Groove and Extra Power Grip. Low Poly design.",
        specs: { weight: "360-375g", balance: "High (Adjustable)", shape: "Diamond", core: "EVA Medium", face: "Carbon Aluminized 16K" },
        available: true
    },
    {
        id: 12,
        name: "Adidas Metalbone HRD 2026",
        brand: "Adidas",
        category: "rackets",
        price: 8483,
        originalPrice: 9050,
        image: "https://via.placeholder.com/400x500/1a1a1a/E69628?text=Adidas+Metalbone+HRD",
        description: "Takes power further with High Memory EVA rubber core providing greater hardness and exit on offensive shots. Perfect for aggressive players. Weight & Balance System customizable. Carbon Aluminized 16K with HRD core for maximum hardness. Advanced-level offensive profile.",
        specs: { weight: "360-375g", balance: "High (Adjustable)", shape: "Diamond", core: "High Memory EVA", face: "Carbon Aluminized 16K" },
        available: true
    },
    {
        id: 13,
        name: "Adidas Metalbone Control 2026",
        brand: "Adidas",
        category: "rackets",
        price: 8248,
        originalPrice: 8800,
        image: "https://via.placeholder.com/400x500/1a1a1a/E69628?text=Adidas+Metalbone+Ctrl",
        description: "Most balanced option in Metalbone range. Round shape expands sweet spot for superior control. Maintains Metalbone touch without head-heavy feel. Weight & Balance System. Carbon Aluminized 16K with Soft Performance EVA. Great control and precision for technical players.",
        specs: { weight: "345-360g", balance: "Low (Adjustable)", shape: "Round", core: "Soft Performance EVA", face: "Carbon Aluminized 16K" },
        available: true
    },
    {
        id: 14,
        name: "Adidas Metalbone Carbon 2026",
        brand: "Adidas",
        category: "rackets",
        price: 7425,
        originalPrice: 7950,
        image: "https://via.placeholder.com/400x500/1a1a1a/E69628?text=Adidas+Metalbone+Carbon",
        description: "Carbon as protagonist for more maneuverable padel without losing power. Ideal for quick movements and good response on fast shots. Diamond shape with hard touch. Carbon Aluminized 16K construction for stiffness. Lighter weight than standard Metalbone.",
        specs: { weight: "350-365g", balance: "Medium-High", shape: "Diamond", core: "EVA", face: "Carbon Aluminized 16K" },
        available: true
    },
    {
        id: 15,
        name: "Adidas Metalbone Carbon Control 2026",
        brand: "Adidas",
        category: "rackets",
        price: 7308,
        originalPrice: 7800,
        image: "https://via.placeholder.com/400x500/1a1a1a/E69628?text=Adidas+Metalbone+C+Ctrl",
        description: "Maximum control thanks to round shape and carbon enhancing maneuverability. Advanced control with reduced weight. Quick effective response in defense. Very comfortable for long sessions. Round shape carbon construction for maximum maneuverability.",
        specs: { weight: "345-360g", balance: "Low", shape: "Round", core: "EVA", face: "Carbon Aluminized 16K" },
        available: true
    },
    {
        id: 16,
        name: "Adidas Metalbone 3.5 2026",
        brand: "Adidas",
        category: "rackets",
        price: 6505,
        originalPrice: 6950,
        image: "https://via.placeholder.com/400x500/1a1a1a/E69628?text=Adidas+Metalbone+3.5",
        description: "2026 edition pushes limits of performance and power. Designed for offensive expert players. Diamond shape positions sweet spot at top for explosive shots. Power Groove, Low Poly design, Spin Blade, Extra Power Grip & Octagonal Structure. Custom Weight system up to 11.2g.",
        specs: { weight: "350-365g", balance: "High", shape: "Diamond", core: "Soft Performance", face: "16K Carbon" },
        available: true
    },
    {
        id: 17,
        name: "Adidas Arrow Hit Attack 2026",
        brand: "Adidas",
        category: "rackets",
        price: 5765,
        originalPrice: 6150,
        image: "https://via.placeholder.com/400x500/1a1a1a/E69628?text=Adidas+Arrow+Hit",
        description: "Designed for players seeking offensive padel with diamond shape and high balance for maximum power on every smash. Ideal for playing near net and dominating offensive play. Explosive power on smash. Structural Reinforcement and Smart Holes Curve.",
        specs: { weight: "355-370g", balance: "High", shape: "Diamond", core: "EVA", face: "Carbon" },
        available: true
    },
    {
        id: 18,
        name: "Adidas Arrow Hit Control 2026",
        brand: "Adidas",
        category: "rackets",
        price: 5548,
        originalPrice: 5900,
        image: "https://via.placeholder.com/400x500/1a1a1a/E69628?text=Adidas+Arrow+Ctrl",
        description: "Defensive version with round shape and low balance for maximum control. Perfect for prioritizing security on returns. Total control on every shot with large sweet spot. Adiprene technology for comfort and low balance for defensive stability.",
        specs: { weight: "350-365g", balance: "Low", shape: "Round", core: "Soft EVA", face: "Fiberglass/Carbon" },
        available: true
    },
    {
        id: 19,
        name: "Adidas Cross It Light 2026 by Martita Ortega",
        brand: "Adidas",
        category: "rackets",
        price: 6858,
        originalPrice: 7350,
        image: "https://via.placeholder.com/400x500/1a1a1a/E69628?text=Adidas+Cross+It",
        description: "Designed for speed, precision, and confidence. Lightest padel in adidas 2026 collection. Dynamic Air Flow for faster swing, Extra Power Grip adds power, 11 Thirteen pattern brings firmness. Spin Blade Mold enhances spin. Soft Energy EVA and Aluminized Carbon 24K deliver comfort and controlled power.",
        specs: { weight: "345-360g", balance: "Even", shape: "Round", core: "Soft Energy EVA", face: "Aluminized Carbon 24K" },
        available: true
    },
    {
        id: 20,
        name: "Adidas Metalbone Team Light 2026",
        brand: "Adidas",
        category: "rackets",
        price: 4695,
        originalPrice: 5050,
        image: "https://via.placeholder.com/400x500/1a1a1a/E69628?text=Adidas+Team+Light",
        description: "Lightweight performance for competitive progression. Enhances maneuverability, comfort and control for evolving players. Fiber glass composition for softer touch, round shape for control, lightweight construction. Great for intermediate players developing technique.",
        specs: { weight: "340-355g", balance: "Even", shape: "Round", core: "Soft EVA", face: "Fiberglass" },
        available: true
    }
];