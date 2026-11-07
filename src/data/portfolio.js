// Websites we have delivered. Images live in public/images/projects (projectN-768x768.jpg).
const IMG = `${import.meta.env.BASE_URL}images/projects/`;
const ACF = 'This project was created by Wpart with the WordPress platform, utilizing the ACF - Advanced custom fields pro plugins and integrated web form solutions.';
const ELEMENTOR = 'Developed by Wpart using WordPress, the Elementor page builder, and custom web forms.';

// image = file name without size suffix. url/cta are optional (no button without a url).
// Entries named "Project N" are placeholders: set their real name, url and cta.
const list = [
  { name: 'Assam Holidays', image: 'project11', text: ACF, url: 'https://assamholidays.com/', cta: 'Visit Website' },
  { name: 'Franchising WA', image: 'project12', text: ACF, url: 'https://franchisingwa.com.au/', cta: 'Go to Site' },
  { name: 'Custom Fuel App', image: 'project13', text: ACF, url: 'https://customfuelapp.com/', cta: 'View Website' },
  { name: 'Saidatta Services', image: 'project1-1', text: ELEMENTOR, url: 'https://saidattaservices.com/', cta: 'Visit Website' },
  { name: 'Nutri Planet', image: 'project2', text: ACF, url: 'https://nutriplanet.com/', cta: 'Go to Site' },
  { name: 'Adam Suites', image: 'project14', text: ELEMENTOR, url: 'https://adamsuites.com/', cta: 'View Website' },
  { name: 'Aloha Mobile Fuel', image: 'project15', text: ELEMENTOR, url: 'https://alohamobilefuel.com/', cta: 'Browse Now' },
  { name: 'Every Day Chemist 247', image: 'project16', text: ACF, url: 'https://www.everydaychemist247.com/', cta: 'Visit Website' },
  { name: 'Blink Fuel', image: 'project17', text: ELEMENTOR, url: 'https://blinkfuel.com/', cta: 'Go to Site' },
  { name: 'SRC Doors', image: 'project4', text: ELEMENTOR, url: 'https://srcdoors.com/', cta: 'Explore Site' },
  { name: 'Kop Armsapts', image: 'project19', text: ELEMENTOR, url: 'https://koparmsapts.com/', cta: 'View Website' },
  { name: 'Industri Designs', image: 'project22', text: ELEMENTOR, url: 'https://industridesigns.com/', cta: 'Browse Now' },
  { name: 'Highwings Realtors', image: 'project21', text: ELEMENTOR },
  { name: 'Skills2Zen', image: 'project6', text: ELEMENTOR, url: 'https://skills2zen.com/', cta: 'Visit Website' },
  { name: 'Southwest Propane', image: 'project3', text: ELEMENTOR, url: 'https://southwestpropane.org/', cta: 'Visit Website' },
  { name: 'Brainstorm International', image: 'project10', text: ELEMENTOR, url: 'https://www.brainstorminternational.co.in/', cta: 'Visit Website' },
  { name: 'Printery Dubai', image: 'project20', text: ELEMENTOR, url: 'https://printerydubai.com/', cta: 'Visit Website' },
  { name: 'VK Web', image: 'project23', text: ELEMENTOR, url: 'https://vkweb.fr/', cta: 'Visit Website' },
  { name: 'Barefoot Bushcraft', image: 'project25', text: ELEMENTOR, url: 'https://barefootbushcraft.com/', cta: 'Visit Website' },
  { name: 'Jyoti Labs', image: 'project5', text: ELEMENTOR, url: 'https://www.jyothylabs.com/', cta: 'Visit Website' },
  { name: 'Tricona Services', image: 'project8', text: ELEMENTOR, url: 'https://tricona.ca/', cta: 'Visit Website' },
  { name: 'Unique Wedding', image: 'project9', text: ELEMENTOR, url: 'https://www.u-wed.com/', cta: 'Visit Website' },
];

export const portfolio = list.map((p) => ({ ...p, image: `${IMG}${p.image}-768x768.jpg` }));
