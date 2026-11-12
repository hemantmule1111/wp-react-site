// WorkPilot feature content for the marketing page, based on https://hr.wpart.co.in/documentation/
// Spotlight rows show a screenshot. Put each image at public/images/workpilot/<shot>.png (about 1600x1000).
// Until a file exists, a placeholder frame with the file name is shown.
export const spotlight = [
  {
    shot: 'dashboard', icon: '🏠', title: 'A dashboard people actually open',
    text: 'One-tap check in and out, leave balances, announcements, holidays, birthdays and work anniversaries, all on the first screen.',
    points: ['Check in / check out button', 'Leave balance cards', 'Upcoming holidays, birthdays and anniversaries', 'Notification bell with "mark all read"', 'Light and dark theme'],
  },
  {
    shot: 'attendance', icon: '⏱️', title: 'Attendance you can trust',
    text: 'A calendar for every employee, a team view for managers, and optional proof of presence: selfie, QR, GPS location or biometric machines.',
    points: ['Day-by-day calendar: present, half day, absent, leave, holiday', 'Fix a missed punch with a regularization request', 'Selfie check-in, rotating office QR code, geo-fence', 'Biometric machine punches through an API', 'Late and early rules turn into half days automatically'],
  },
  {
    shot: 'leave', icon: '🌴', title: 'Leave and approvals, sorted',
    text: 'Employees apply in seconds and managers approve with one click. Balances, overlaps and holidays are checked before anything is submitted.',
    points: ['Any number of leave types with quotas and carry-forward', 'Half-day leave, paid and unpaid types', '"Who is off" team view', 'Company holiday calendar with Indian holidays pre-loaded', 'Approve or reject with a note'],
  },
  {
    shot: 'payroll', icon: '💸', title: 'Payroll with Indian statutory built in',
    text: 'Salary structures, monthly runs and professional payslips. PF, ESIC and professional tax are calculated from dated, editable rates.',
    points: ['Custom earning and deduction categories', 'PF, ESIC, professional tax, gratuity provision, cost to company', 'Draft, review, approve, mark paid, with a second approver', 'One-off items: arrears, bonus, gratuity, leave encashment', 'PF ECR, ESIC, PT and bank transfer files'],
  },
  {
    shot: 'payslip', icon: '🧾', title: 'Payslips with your letterhead',
    text: 'Branded payslips with your logo, colour and signatory. Employees view and print them as PDF as soon as payroll is approved.',
    points: ['Paid days and loss-of-pay days', 'Earnings, deductions, net pay in figures and words', 'Print or save as PDF', '"Payslip ready" notification'],
  },
  {
    shot: 'employees', icon: '👥', title: 'Employee records and documents',
    text: 'A searchable directory with full profiles, career history, salary revisions and verified documents. Sensitive fields stay protected.',
    points: ['Automatic employee codes', 'PAN, Aadhaar, education and other document uploads', 'HR verifies and locks documents', 'Career events: confirmation, promotion, transfer', 'Create a login with a one-time temporary password'],
  },
  {
    shot: 'orgchart', icon: '🌳', title: 'A live org chart',
    text: 'See the whole company as a tree, colour-coded by department. Zoom, fit to screen and click through to a profile.',
    points: ['Direct-report counts on every card', 'Highlight a department', 'Zoom and fit controls'],
  },
  {
    shot: 'overtime', icon: '🕒', title: 'Overtime from real punch times',
    text: 'Work past shift end, on a weekly off or on a holiday creates a claim for approval, priced with your own multipliers.',
    points: ['Claims created from punches', 'Daily and monthly caps, filing window', 'Rate locked at approval', 'Flows into the payslip'],
  },
  {
    shot: 'helpdesk', icon: '💬', title: 'Chat, help desk and policies',
    text: 'Team chat, private HR tickets and policies with "I have read it" tracking keep everyone connected and compliant.',
    points: ['Direct, group and company-wide chat with files', 'Help desk: HR, payroll, IT, grievance', 'Policy acknowledgements with versions', 'Announcements, pinned to the top'],
  },
  {
    shot: 'letters', icon: '📄', title: 'Letters, assets and HR tests',
    text: 'Issue offer, appointment, experience and relieving letters in a click. Track laptops and ID cards. Run written interview tests in the office.',
    points: ['Auto-filled letters with reference numbers', 'Asset issue and return with history', 'Multiple-choice and written tests with a timer', 'Pass / fail results and private interview notes'],
  },
  {
    shot: 'security', icon: '🔐', title: 'Roles, security and audit trail',
    text: 'Seven built-in roles, two-step sign-in with an authenticator app, and an audit log of every sensitive change.',
    points: ['Super Admin, HR Admin, Payroll Admin, Manager, Employee, Management, Auditor', 'Two-step sign-in with recovery codes', 'Sign-in lockout and password rules', 'Audit log: who, what, old and new value, when'],
  },
  {
    shot: 'languages', icon: '🌐', title: 'Works on phones, in Hindi and Marathi',
    text: 'Install WorkPilot on a phone from the browser. Choose English, Hindi or Marathi on the sign-in page, and everything prints cleanly on A4.',
    points: ['Add to Home screen on Android and iPhone', 'Hindi and Marathi on key screens', 'Light and dark theme', 'Print-ready payslips and letters'],
  },
  {
    shot: 'platform', icon: '🏢', title: 'Managing several companies? One platform',
    text: 'The platform owner creates companies, sets employee limits and subscription dates, and keeps an eye on health, backups and activity.',
    points: ['Create and suspend companies', 'Employee limits and subscription end dates', 'Health checks and daily backups', 'Platform activity log'],
  },
];

// The complete feature list, grouped.
export const featureGroups = [
  { icon: '🧭', title: 'Getting started', items: ['Sign in with company code, email and password', 'Password rules and lockout after 5 wrong tries', 'Notification bell', 'Light and dark theme', 'Works on phones, installable as an app', 'Hindi and Marathi on key screens'] },
  { icon: '🔑', title: 'Roles & permissions', items: ['Super Admin, HR Admin, Payroll Admin', 'Reporting Manager and Employee', 'Management (read-only) and Auditor', 'Managers see their whole reporting tree', 'Bank, PAN and Aadhaar fields restricted'] },
  { icon: '👤', title: 'Employee self-service', items: ['Dashboard and quick actions', 'Attendance calendar and requests', 'Apply for and cancel leave', 'View and print payslips', 'Own profile, documents and career tab', 'Org chart and announcements'] },
  { icon: '✅', title: 'Manager tools', items: ['Approvals page for leave and attendance', 'Team today and who is off', 'Approval badges and notifications', 'Approve or reject with a note'] },
  { icon: '🗂️', title: 'HR administration', items: ['Employee directory with search and filters', 'Automatic employee codes', 'Users and access: disable, reset password', 'Departments, designations and shifts', 'Leave types and holidays', 'Company profile and payslip branding', 'Announcements with pinning', 'Reports with CSV export'] },
  { icon: '📍', title: 'Attendance rules', items: ['Shifts with grace and half-day thresholds', 'Selfie on check-in', 'Rotating QR code at the office entrance', 'GPS geo-fence for office locations', 'Biometric machine integration', 'Late and early rules', 'Forgot-to-check-out reminders'] },
  { icon: '🌴', title: 'Leave management', items: ['Leave types with quotas', 'Carry-forward caps', 'Half days, paid and unpaid', 'Balance and overlap checks', 'Team time-off view', 'Holiday calendar'] },
  { icon: '💰', title: 'Payroll', items: ['Salary master with custom categories', 'Salary structures and revision history', 'Monthly payroll runs', 'PF, ESIC and professional tax', 'Employer contributions and CTC', 'Dated statutory rates', 'Second-approver control', 'One-off items and calculators', 'PF, ESIC, PT and bank files'] },
  { icon: '🕒', title: 'Overtime', items: ['Claims from punch times', 'Manager approval', 'Configurable rates and caps', 'Included in payslips and payroll CSV'] },
  { icon: '📑', title: 'Documents & letters', items: ['Employee document uploads', 'HR verification and lock', 'Offer, appointment, experience and relieving letters', 'Custom letter templates', 'Reference numbers and print to PDF'] },
  { icon: '🧰', title: 'Assets & help desk', items: ['Asset register with issue and return', 'Condition tracking and history', 'Help desk tickets with priorities', 'Private grievances', 'Internal notes for HR'] },
  { icon: '📣', title: 'Engagement', items: ['Company announcements', 'Birthdays and anniversaries', 'Direct, group and Everyone chat', 'File sharing in chat', 'Policies with acknowledgement tracking'] },
  { icon: '🎯', title: 'Hiring tests', items: ['Tests with multiple-choice and written questions', 'Time limit and pass mark', 'Access code per candidate', 'Live status and auto-marking', 'Interview notes'] },
  { icon: '🛡️', title: 'Security & data', items: ['Two-step sign-in with an authenticator app', 'Audit log of sensitive changes', 'Secure document downloads', 'Company data download as ZIP', 'Daily database backups', 'Email for welcome, resets and alerts'] },
];
