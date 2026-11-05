// Videos from https://www.youtube.com/@mulehemant/videos (scanned 2026-11-05).
// To add a video, append { id, title, full, category } — id is the part after ?v= in the YouTube URL.
export const channelUrl = "https://www.youtube.com/@mulehemant/videos";
export const channelName = "All in one coder";

export const allVideos = [
  { id: "5Gz7URCDs-c", title: "Vegas Mobile Fuel", full: "Vegas Mobile Fuel", category: "Other" },
  { id: "NbkkFXWwYMM", title: "The Fluid Box", full: "The Fluid Box", category: "Other" },
  { id: "mmF9E69LBOM", title: "WordPress: Update Footer Section", full: "How to Update Content in WordPress for Footer Section", category: "WordPress" },
  { id: "LXmF_HlRlAg", title: "WordPress: Update Testimonials Section", full: "How to Update Content in WordPress for Testimonials Section", category: "WordPress" },
  { id: "IW6d5Gr7M7k", title: "WordPress: Update Most Popular Section", full: "How to Update Content in WordPress for Most Popular Section", category: "WordPress" },
  { id: "_-y4GRhucRI", title: "WordPress: Update Parallax Video Section", full: "How to Update Content in WordPress for Parallax Video Section", category: "WordPress" },
  { id: "32BWiBIh1Es", title: "WordPress: Update Popular Destination Section", full: "How to Update Content in WordPress for Popular Destination Section", category: "WordPress" },
  { id: "ebTL5O9cy8M", title: "WordPress: Update Number Parallax Section", full: "How to Update Content in WordPress for Number Parallax Section", category: "WordPress" },
  { id: "TB6nvpvG1tI", title: "WordPress: Update Popular Tour Section", full: "How to Update Content in WordPress for Popular Tour Section", category: "WordPress" },
  { id: "ELv57LwJ_iA", title: "WordPress: Update About Us Section", full: "How to Update Content in WordPress for About Us Section", category: "WordPress" },
  { id: "1b5ax5yLd-I", title: "WordPress: Update Home page slider", full: "How to Update Content in Wordpress for Home page slider", category: "WordPress" },
  { id: "lJEddjYIMek", title: "How to crate FAQ using Html, CSS, and jQuery", full: "How to crate FAQ using Html, CSS, and jQuery", category: "HTML & CSS" },
  { id: "qMaPQHUWBdI", title: "4 - How to Create Blocks In Shopify", full: "4 - How to Create Blocks In Shopify | Shopify store complete setup | Shopify store development", category: "Shopify" },
  { id: "M6nhLUkJQzA", title: "Create Table Using HTML CSS.", full: "Create Table Using HTML CSS.", category: "HTML & CSS" },
  { id: "b6E52ssFgUE", title: "Create Tabs using HTML", full: "Create Tabs using HTML | CSS | jQuery", category: "HTML & CSS" },
  { id: "J0BfZ92EXug", title: "Create Navigation using HTML", full: "Create Navigation using HTML | CSS | Unorder List.", category: "HTML & CSS" },
  { id: "JkXB0MpxCA8", title: "Affix with Bootstrap CSS - step by step. Create a fix Menu with UL li - List order - Easy and simple", full: "Affix with Bootstrap CSS - step by step. Create a fix Menu with UL li - List order - Easy and simple", category: "HTML & CSS" },
  { id: "g593_i84JE8", title: "Photoshop Tutorials for Beginners", full: "Photoshop Tutorials for Beginners | Learn Photoshop Marquee tool | Create Website with Photoshop", category: "Photoshop" },
  { id: "CGSO9L9HsRM", title: "7 - PSD / Photoshop convert into HTML Website ", full: "7 - PSD / Photoshop convert into HTML Website  | Create Responsive Websites with Bootstrap", category: "Photoshop" },
  { id: "5ZpUjwLO3u4", title: "6 - PSD / Photoshop convert into HTML Website ", full: "6 - PSD / Photoshop convert into HTML Website  | Create Responsive Websites with Bootstrap", category: "Photoshop" },
  { id: "rq6rYexNLvs", title: "5 - PSD / Photoshop convert into HTML Website ", full: "5 - PSD / Photoshop convert into HTML Website  | Create Responsive Websites with Bootstrap", category: "Photoshop" },
  { id: "YNuHY9aWA2U", title: "4 - PSD / Photoshop convert into HTML Website ", full: "4 - PSD / Photoshop convert into HTML Website  | Create Responsive Websites with Bootstrap", category: "Photoshop" },
  { id: "RomusBBbXj8", title: "3 - PSD / Photoshop convert into HTML Website ", full: "3 - PSD / Photoshop convert into HTML Website  | Create Responsive Websites with Bootstrap", category: "Photoshop" },
  { id: "LRpoj0XePqc", title: "1 - PSD / Photoshop convert into HTML Website ", full: "1 - PSD / Photoshop convert into HTML Website  | Create Responsive Websites with Bootstrap", category: "Photoshop" },
  { id: "mJZ61C_gYXQ", title: "2 - PSD / Photoshop convert into HTML Website ", full: "2 - PSD / Photoshop convert into HTML Website  | Create Responsive Websites with Bootstrap", category: "Photoshop" },
  { id: "2IXQAX0oXRk", title: "Photoshop Tutorials Introduction", full: "Photoshop Tutorials Introduction | How to create a website Layout / Mockup step by step.", category: "Photoshop" },
  { id: "gUXEOP9RsiY", title: "12 - Contact Form in Shopify", full: "12 - Contact Form in Shopify | Shopify store complete setup | Shopify store development", category: "Shopify" },
  { id: "WUxveVNus0c", title: "11 - How to Build Static Page in Shopify", full: "11 - How to Build Static Page in Shopify | Shopify store complete setup | Shopify store development", category: "Shopify" },
  { id: "Vpcxavblwug", title: "10 - Overview About Shopify Admin", full: "10 - Overview About Shopify Admin | Shopify store complete setup | Shopify store development", category: "Shopify" },
  { id: "_RHCz0G-SYw", title: "9 - How Upload Media in Shopify", full: "9 - How Upload Media in Shopify | Shopify store complete setup | Shopify store development", category: "Shopify" },
  { id: "oWhk5YmjoDw", title: "8 - How To Edit Header in Shopify", full: "8 - How To Edit Header in Shopify | Shopify store complete setup | Shopify store development", category: "Shopify" },
];

export const categories = ["All", ...new Set(allVideos.map((v) => v.category))];
