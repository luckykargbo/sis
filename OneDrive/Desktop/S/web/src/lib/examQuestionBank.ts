export interface ExamQuestion {
  id: number;
  subject: string;
  text: string;
  options: string[];
  answer: number;
}

export type GradeLevel = 'JSS 1' | 'JSS 2' | 'JSS 3' | 'SSS 1' | 'SSS 2' | 'SSS 3';
export type AcademicStream = 'Science' | 'Arts' | 'Commercial' | 'General';

const JSS1_QUESTIONS: ExamQuestion[] = [
  { id: 101, subject: 'Mathematics', text: 'If a box contains 45 apples and 18 are eaten, how many apples remain?', options: ['25', '27', '28', '30'], answer: 1 },
  { id: 102, subject: 'Mathematics', text: 'What is the place value of 7 in the number 47,820?', options: ['Hundreds', 'Thousands', 'Tens', 'Ten Thousands'], answer: 1 },
  { id: 103, subject: 'Mathematics', text: 'What is 3/5 expressed as a percentage?', options: ['30%', '50%', '60%', '75%'], answer: 2 },
  { id: 104, subject: 'Mathematics', text: 'Calculate the perimeter of a square with a side length of 9 cm.', options: ['18 cm', '27 cm', '36 cm', '81 cm'], answer: 2 },
  { id: 105, subject: 'Integrated Science', text: 'Which component of blood helps to carry oxygen throughout the human body?', options: ['White blood cells', 'Red blood cells', 'Platelets', 'Plasma'], answer: 1 },
  { id: 106, subject: 'Integrated Science', text: 'What is the process by which green plants manufacture food using sunlight?', options: ['Respiration', 'Transpiration', 'Photosynthesis', 'Germination'], answer: 2 },
  { id: 107, subject: 'English Language', text: 'Choose the correct plural form of the word "Child":', options: ['Childs', 'Children', 'Childrens', 'Childes'], answer: 1 },
  { id: 108, subject: 'English Language', text: 'Identify the verb in: "The students listened attentively to the teacher."', options: ['students', 'listened', 'attentively', 'teacher'], answer: 1 },
  { id: 109, subject: 'English Language', text: 'Select the antonym for the word "Ancient":', options: ['Old', 'Modern', 'Historical', 'Traditional'], answer: 1 },
  { id: 110, subject: 'Social Studies', text: 'What is the highest law-making body in Sierra Leone?', options: ['Supreme Court', 'Parliament', 'Cabinet', 'City Council'], answer: 1 },
];

const JSS2_QUESTIONS: ExamQuestion[] = [
  { id: 201, subject: 'Mathematics', text: 'Simplify the algebraic expression: 4x + 7 - 2x + 3', options: ['6x + 10', '2x + 10', '2x + 4', '6x + 4'], answer: 1 },
  { id: 202, subject: 'Mathematics', text: 'If a vehicle travels 150 km in 3 hours, what is its average speed?', options: ['40 km/h', '45 km/h', '50 km/h', '60 km/h'], answer: 2 },
  { id: 203, subject: 'Mathematics', text: 'Solve for y: 3y - 9 = 15', options: ['y = 6', 'y = 8', 'y = 7', 'y = 5'], answer: 1 },
  { id: 204, subject: 'Integrated Science', text: 'Which organelle is referred to as the powerhouse of the cell?', options: ['Nucleus', 'Mitochondria', 'Chloroplast', 'Vacuole'], answer: 1 },
  { id: 205, subject: 'Integrated Science', text: 'Which organ removes nitrogenous waste products from the bloodstream?', options: ['Heart', 'Liver', 'Kidneys', 'Lungs'], answer: 2 },
  { id: 206, subject: 'English Language', text: 'Complete: "Neither the teacher nor the students _____ in the hall."', options: ['was', 'were', 'is', 'be'], answer: 1 },
  { id: 207, subject: 'English Language', text: 'Identify the figure of speech in "The wind whispered through the trees":', options: ['Metaphor', 'Simile', 'Personification', 'Hyperbole'], answer: 2 },
  { id: 208, subject: 'Social Studies', text: 'What is the capital city of Sierra Leone?', options: ['Bo', 'Kenema', 'Freetown', 'Makeni'], answer: 2 },
  { id: 209, subject: 'Mathematics', text: 'Express 0.045 in scientific notation (standard form).', options: ['4.5 × 10⁻²', '4.5 × 10⁻¹', '45 × 10⁻³', '4.5 × 10²'], answer: 0 },
  { id: 210, subject: 'Social Studies', text: 'In which year did Sierra Leone gain independence?', options: ['1957', '1961', '1971', '1996'], answer: 1 },
];

const JSS3_QUESTIONS: ExamQuestion[] = [
  { id: 301, subject: 'Mathematics', text: 'Solve the quadratic equation: x² - 5x + 6 = 0', options: ['x = 2 or x = 3', 'x = -2 or x = -3', 'x = 1 or x = 6', 'x = -1 or x = 5'], answer: 0 },
  { id: 302, subject: 'Mathematics', text: 'Calculate the volume of a cylinder with radius 7 cm and height 10 cm. (π = 22/7)', options: ['1,540 cm³', '770 cm³', '220 cm³', '440 cm³'], answer: 0 },
  { id: 303, subject: 'Mathematics', text: 'Find the gradient of the line passing through (2, 3) and (4, 11).', options: ['2', '3', '4', '8'], answer: 2 },
  { id: 304, subject: 'Integrated Science', text: 'Which chemical gas turns limewater milky when bubbled through it?', options: ['Oxygen', 'Carbon dioxide', 'Hydrogen', 'Nitrogen'], answer: 1 },
  { id: 305, subject: 'Integrated Science', text: 'What energy transformation occurs when an electric bulb is switched on?', options: ['Light to heat', 'Electrical to light & heat', 'Chemical to light', 'Mechanical to electrical'], answer: 1 },
  { id: 306, subject: 'English Language', text: 'Choose the correct form: "If he _____ harder, he would have passed the BECE exam."', options: ['studied', 'had studied', 'studies', 'has studied'], answer: 1 },
  { id: 307, subject: 'English Language', text: 'Identify the passive form of: "The boy kicked the ball."', options: ['The ball is kicked by the boy.', 'The ball was kicked by the boy.', 'The ball has been kicked.', 'The boy was kicking the ball.'], answer: 1 },
  { id: 308, subject: 'English Language', text: 'What is the meaning of the idiom "To turn over a new leaf"?', options: ['To start reading a book', 'To change behavior for the better', 'To travel abroad', 'To plant a new tree'], answer: 1 },
  { id: 309, subject: 'Mathematics', text: 'Evaluate: log₁₀(1000)', options: ['1', '2', '3', '10'], answer: 2 },
  { id: 310, subject: 'Integrated Science', text: 'What is the chemical symbol for Gold?', options: ['Go', 'Ag', 'Au', 'Fe'], answer: 2 },
];

const SSS1_QUESTIONS: ExamQuestion[] = [
  { id: 401, subject: 'Mathematics', text: 'Solve simultaneous equations: 2x + y = 7 and x - y = 2', options: ['x = 3, y = 1', 'x = 4, y = -1', 'x = 2, y = 3', 'x = 5, y = -3'], answer: 0 },
  { id: 402, subject: 'Mathematics', text: 'If log₁₀ 2 = 0.3010 and log₁₀ 3 = 0.4771, calculate log₁₀ 6.', options: ['0.1761', '0.7781', '0.1436', '0.9030'], answer: 1 },
  { id: 403, subject: 'Biology', text: 'Which organelle is responsible for protein synthesis in living cells?', options: ['Ribosome', 'Golgi apparatus', 'Lysosome', 'Endoplasmic reticulum'], answer: 0 },
  { id: 404, subject: 'Chemistry', text: 'What type of chemical bonding exists between Sodium (Na) and Chlorine (Cl) in NaCl?', options: ['Covalent', 'Ionic / Electrovalent', 'Metallic', 'Hydrogen'], answer: 1 },
  { id: 405, subject: 'Physics', text: 'Calculate the acceleration of a 5 kg mass subjected to a net force of 20 N.', options: ['2 m/s²', '4 m/s²', '100 m/s²', '15 m/s²'], answer: 1 },
  { id: 406, subject: 'English Language', text: 'Choose the word nearest in meaning to "Prudent":', options: ['Careless', 'Cautious & Wise', 'Extravagant', 'Foolish'], answer: 1 },
  { id: 407, subject: 'English Language', text: 'Identify the error: "The team of players are ready for the final match."', options: ['team', 'are (should be is)', 'ready', 'match'], answer: 1 },
  { id: 408, subject: 'English Language', text: 'Which figure of speech is demonstrated in "Parting is such sweet sorrow"?', options: ['Oxymoron', 'Hyperbole', 'Irony', 'Euphemism'], answer: 0 },
  { id: 409, subject: 'Chemistry', text: 'What is the PH value of a neutral aqueous solution at 25°C?', options: ['0', '7', '14', '1'], answer: 1 },
  { id: 410, subject: 'Mathematics', text: 'Find the sum of the first 10 terms of the AP: 2, 5, 8, 11...', options: ['145', '155', '165', '175'], answer: 1 },
];

// SSS 2 Science Stream
const SSS2_SCIENCE_QUESTIONS: ExamQuestion[] = [
  { id: 511, subject: 'Physics', text: 'According to Newton\'s Second Law of Motion, Force is equal to:', options: ['Mass × Velocity', 'Mass × Acceleration', 'Work ÷ Time', 'Half Mass × Velocity²'], answer: 1 },
  { id: 512, subject: 'Chemistry', text: 'What general formula represents the Alkene homologous series?', options: ['C_n H_2n+2', 'C_n H_2n', 'C_n H_2n-2', 'C_n H_2n+1 OH'], answer: 1 },
  { id: 513, subject: 'Biology', text: 'Which biological process involves water movement across a semi-permeable membrane?', options: ['Diffusion', 'Osmosis', 'Active transport', 'Phagocytosis'], answer: 1 },
  { id: 514, subject: 'Further Mathematics', text: 'Calculate the derivative of f(x) = 3x³ - 5x² + 4x - 7.', options: ['9x² - 10x + 4', '6x² - 5x', '9x³ - 10x²', '3x² - 10x + 4'], answer: 0 },
  { id: 515, subject: 'Chemistry', text: 'What is the molar mass of H₂SO₄? (H=1, S=32, O=16)', options: ['49 g/mol', '98 g/mol', '100 g/mol', '196 g/mol'], answer: 1 },
  { id: 516, subject: 'Physics', text: 'An electric resistor of 10 Ω carries a current of 2 A. What is the potential difference across it?', options: ['5 V', '12 V', '20 V', '40 V'], answer: 2 },
  { id: 517, subject: 'Biology', text: 'Which blood vessel carries oxygenated blood from the lungs to the left atrium of the heart?', options: ['Vena cava', 'Pulmonary artery', 'Pulmonary vein', 'Aorta'], answer: 2 },
  { id: 518, subject: 'English Language', text: 'Select the option opposite in meaning to "Ephemeral":', options: ['Transient', 'Everlasting & Permanent', 'Brief', 'Fugitive'], answer: 1 },
  { id: 519, subject: 'Mathematics', text: 'Solve for x in: 2^(2x + 1) = 32', options: ['x = 1.5', 'x = 2', 'x = 2.5', 'x = 3'], answer: 1 },
  { id: 520, subject: 'Further Mathematics', text: 'Evaluate the definite integral ∫ from 0 to 2 of (3x²) dx.', options: ['4', '6', '8', '12'], answer: 2 },
];

// SSS 2 Arts Stream
const SSS2_ARTS_QUESTIONS: ExamQuestion[] = [
  { id: 521, subject: 'Literature-in-English', text: 'What literary term describes a fatal flaw leading to the downfall of a tragic hero?', options: ['Hubris / Hamartia', 'Catharsis', 'Soliloquy', 'Anaphora'], answer: 0 },
  { id: 522, subject: 'Government', text: 'Which organ of government is responsible for interpreting laws and administering justice?', options: ['Legislature', 'Executive', 'Judiciary', 'Civil Service'], answer: 2 },
  { id: 523, subject: 'History', text: 'Which European conference in 1884-1885 formalized the Scramble for Africa?', options: ['Paris Peace Conference', 'Berlin Conference', 'London Congress', 'Vienna Treaty'], answer: 1 },
  { id: 524, subject: 'Literature-in-English', text: 'When a character speaks their innermost thoughts alone on stage, it is called a:', options: ['Monologue', 'Soliloquy', 'Dialogue', 'Prologue'], answer: 1 },
  { id: 525, subject: 'Government', text: 'A system of government where power is shared between central and component regional units is:', options: ['Unitary', 'Federal', 'Confederate', 'Monarchical'], answer: 1 },
  { id: 526, subject: 'English Language', text: 'Choose the correct reporting speech for: "I am leaving now," he said.', options: ['He said he is leaving now.', 'He said that he was leaving then.', 'He said he leaves then.', 'He says he was leaving.'], answer: 1 },
  { id: 527, subject: 'History', text: 'Who was the first Prime Minister of independent Sierra Leone in 1961?', options: ['Sir Milton Margai', 'Sir Albert Margai', 'Siaka Stevens', 'Joseph Saidu Momoh'], answer: 0 },
  { id: 528, subject: 'English Language', text: 'Select the option opposite in meaning to "Ephemeral":', options: ['Transient', 'Everlasting & Permanent', 'Brief', 'Fugitive'], answer: 1 },
  { id: 529, subject: 'Government', text: 'Which principle asserts that no person is above the law and all are equal before it?', options: ['Separation of Powers', 'Rule of Law', 'Parliamentary Supremacy', 'Delegated Legislation'], answer: 1 },
  { id: 530, subject: 'Literature-in-English', text: 'Identify the device in: "The light danced upon the rippling waters."', options: ['Metaphor', 'Simile', 'Personification', 'Irony'], answer: 2 },
];

// SSS 2 Commercial Stream
const SSS2_COMMERCIAL_QUESTIONS: ExamQuestion[] = [
  { id: 531, subject: 'Financial Accounting', text: 'Which accounting statement shows the financial position of a business at a specific date?', options: ['Income Statement', 'Trial Balance', 'Balance Sheet (Statement of Financial Position)', 'Cash Flow Statement'], answer: 2 },
  { id: 532, subject: 'Commerce', text: 'Which financial institution acts as the banker to the government and issues national currency?', options: ['Commercial Bank', 'Central Bank', 'Development Bank', 'Microfinance Bank'], answer: 1 },
  { id: 533, subject: 'Economics', text: 'According to the Law of Demand, when the price of a normal good increases, quantity demanded:', options: ['Increases', 'Decreases', 'Remains constant', 'Fluctuates to zero'], answer: 1 },
  { id: 534, subject: 'Financial Accounting', text: 'In double-entry bookkeeping, an increase in an Asset account is recorded as a:', options: ['Credit', 'Debit', 'Liability', 'Capital deduction'], answer: 1 },
  { id: 535, subject: 'Commerce', text: 'A document issued by a carrier acknowledging receipt of cargo for sea shipment is called a:', options: ['Bill of Lading', 'Invoice', 'Delivery Note', 'Consignment Note'], answer: 0 },
  { id: 536, subject: 'Economics', text: 'What type of inflation is caused by a persistent increase in the cost of production inputs?', options: ['Demand-pull inflation', 'Cost-push inflation', 'Hyperinflation', 'Stagflation'], answer: 1 },
  { id: 537, subject: 'Business Mathematics', text: 'Calculate simple interest on $5,000 invested at 6% per annum for 3 years.', options: ['$300', '$600', '$900', '$1,200'], answer: 2 },
  { id: 538, subject: 'Financial Accounting', text: 'Which error occurs when a transaction is completely omitted from the accounting books?', options: ['Error of Commission', 'Error of Omission', 'Error of Principle', 'Compensating Error'], answer: 1 },
  { id: 539, subject: 'Commerce', text: 'Wholesale trade involves buying goods in:', options: ['Small quantities from retailers', 'Bulk from manufacturers and selling to retailers', 'Single units directly to consumers', 'Foreign markets only'], answer: 1 },
  { id: 540, subject: 'Economics', text: 'Opportunity cost is best defined as:', options: ['The monetary price of a commodity', 'The next best alternative forgone', 'Total production expenditure', 'The cost of opening a business'], answer: 1 },
];

// SSS 3 Science Stream (WASSCE Standard)
const SSS3_SCIENCE_QUESTIONS: ExamQuestion[] = [
  { id: 611, subject: 'Physics (WASSCE)', text: 'What is the half-life of a radioactive isotope if 100g decays to 12.5g in 24 days?', options: ['4 days', '6 days', '8 days', '12 days'], answer: 1 },
  { id: 612, subject: 'Chemistry (WASSCE)', text: 'What functional group is characteristic of Organic Carboxylic Acids?', options: ['-OH', '-CHO', '-COOH', '-COOR'], answer: 2 },
  { id: 613, subject: 'Biology (WASSCE)', text: 'Which hormone regulates blood glucose level by promoting glycogenesis in the liver?', options: ['Glucagon', 'Insulin', 'Adrenaline', 'Thyroxin'], answer: 1 },
  { id: 614, subject: 'Mathematics (WASSCE)', text: 'Solve for x: log₂ (x + 3) + log₂ (x - 3) = 4', options: ['x = 5', 'x = 4', 'x = 3', 'x = 6'], answer: 0 },
  { id: 615, subject: 'Physics (WASSCE)', text: 'Which law states that energy can neither be created nor destroyed, only transformed?', options: ['Zeroth Law', 'First Law of Thermodynamics', 'Second Law', 'Third Law'], answer: 1 },
  { id: 616, subject: 'Chemistry (WASSCE)', text: 'According to Faraday\'s First Law of Electrolysis, mass deposited (m) is proportional to:', options: ['Quantity of electricity (Q = I × t)', 'Voltage squared', 'Resistance', 'Temperature'], answer: 0 },
  { id: 617, subject: 'Biology (WASSCE)', text: 'Cell division resulting in daughter cells with half the chromosome number of parent cell is:', options: ['Mitosis', 'Meiosis', 'Binary fission', 'Budding'], answer: 1 },
  { id: 618, subject: 'Mathematics (WASSCE)', text: 'In how many different ways can 5 distinct books be arranged on a shelf?', options: ['25', '60', '120', '720'], answer: 2 },
  { id: 619, subject: 'Physics (WASSCE)', text: 'What phenomenon causes light waves to bend when passing from air into water?', options: ['Reflection', 'Refraction', 'Diffraction', 'Polarization'], answer: 1 },
  { id: 620, subject: 'English Language', text: 'Choose the word opposite in meaning to "Meticulous":', options: ['Scrupulous', 'Careless & Sloppy', 'Thorough', 'Precise'], answer: 1 },
];

// SSS 3 Arts Stream (WASSCE Standard)
const SSS3_ARTS_QUESTIONS: ExamQuestion[] = [
  { id: 621, subject: 'Literature (WASSCE)', text: 'Identify the literary device in: "The city was a monster, swallowing all who entered."', options: ['Extended Metaphor', 'Simile', 'Hyperbole', 'Alliteration'], answer: 0 },
  { id: 622, subject: 'Government (WASSCE)', text: 'Which international organization was founded in Lagos in 1975 to foster West African integration?', options: ['AU', 'ECOWAS', 'Commonwealth', 'Mano River Union'], answer: 1 },
  { id: 623, subject: 'History (WASSCE)', text: 'The Hut Tax War of 1898 in Sierra Leone was led in the North by:', options: ['Bai Bureh', 'Madam Yoko', 'Kai Londo', 'Sengbe Pieh'], answer: 0 },
  { id: 624, subject: 'English Language', text: 'Select the correct sentence structure for WASSCE essay registry:', options: ['In spite of the rain, we arrived early.', 'Despite of the rain, we arrived early.', 'In spite the rain, we arrived early.', 'Despite that rain, we arrived early.'], answer: 0 },
  { id: 625, subject: 'Literature (WASSCE)', text: 'The emotional release or cleansing experienced by the audience at the end of a tragedy is:', options: ['Catharsis', 'Climax', 'Denouement', 'Nemesis'], answer: 0 },
  { id: 626, subject: 'Government (WASSCE)', text: 'A veto power in the United Nations Security Council is exercised by how many permanent members?', options: ['3', '5', '7', '10'], answer: 1 },
  { id: 627, subject: 'History (WASSCE)', text: 'The Amistad slave ship revolt of 1839 was led by which Sierra Leonean hero?', options: ['Sengbe Pieh (Joseph Cinqué)', 'Bai Bureh', 'John Ezzidio', 'Sir Samuel Lewis'], answer: 0 },
  { id: 628, subject: 'English Language', text: 'Choose the word opposite in meaning to "Meticulous":', options: ['Scrupulous', 'Careless & Sloppy', 'Thorough', 'Precise'], answer: 1 },
  { id: 629, subject: 'Government (WASSCE)', text: 'The official document containing a political party\'s principles and promises before an election is:', options: ['Constitution', 'Manifesto', 'Hansard', 'White Paper'], answer: 1 },
  { id: 630, subject: 'Literature (WASSCE)', text: 'A poem consisting of fourteen lines with a strict rhyme scheme is a:', options: ['Sonnet', 'Elegy', 'Ode', 'Ballad'], answer: 0 },
];

// SSS 3 Commercial Stream (WASSCE Standard)
const SSS3_COMMERCIAL_QUESTIONS: ExamQuestion[] = [
  { id: 631, subject: 'Financial Accounting (WASSCE)', text: 'Under which method of depreciation does the annual depreciation charge remain constant over asset life?', options: ['Reducing Balance Method', 'Straight Line Method', 'Sum of Years Digits', 'Revaluation Method'], answer: 1 },
  { id: 632, subject: 'Commerce (WASSCE)', text: 'A market where existing government and corporate stocks/shares are traded is the:', options: ['Money Market', 'Secondary Capital Market (Stock Exchange)', 'Commodity Market', 'Foreign Exchange Market'], answer: 1 },
  { id: 633, subject: 'Economics (WASSCE)', text: 'Gross Domestic Product (GDP) measures total market value of final goods produced:', options: ['By citizens worldwide', 'Within country geographical boundaries', 'Including net income from abroad', 'By government sector only'], answer: 1 },
  { id: 634, subject: 'Financial Accounting (WASSCE)', text: 'Goodwill in a partnership firm is created when:', options: ['A partner retires or new partner is admitted', 'Firm makes a net loss', 'Capital accounts are closed', 'Bank balance decreases'], answer: 0 },
  { id: 635, subject: 'Commerce (WASSCE)', text: 'The principle of insurance stating that the insured cannot profit from a loss is:', options: ['Utmost Good Faith', 'Indemnity', 'Insurable Interest', 'Proximate Cause'], answer: 1 },
  { id: 636, subject: 'Economics (WASSCE)', text: 'Central Bank policy regulating money supply through interest rates and open market operations is:', options: ['Fiscal Policy', 'Monetary Policy', 'Commercial Policy', 'Income Policy'], answer: 1 },
  { id: 637, subject: 'Cost Accounting', text: 'Costs that change directly in proportion to changes in production output volume are:', options: ['Fixed Costs', 'Variable Costs', 'Semi-variable Costs', 'Sunk Costs'], answer: 1 },
  { id: 638, subject: 'English Language', text: 'Choose the word opposite in meaning to "Meticulous":', options: ['Scrupulous', 'Careless & Sloppy', 'Thorough', 'Precise'], answer: 1 },
  { id: 639, subject: 'Mathematics (WASSCE)', text: 'Solve for x: log₂ (x + 3) + log₂ (x - 3) = 4', options: ['x = 5', 'x = 4', 'x = 3', 'x = 6'], answer: 0 },
  { id: 640, subject: 'Financial Accounting (WASSCE)', text: 'The excess of Current Assets over Current Liabilities is known as:', options: ['Capital Employed', 'Working Capital', 'Net Profit', 'Reserve Capital'], answer: 1 },
];

/**
 * Get randomized, non-repeating questions tailored specifically for a target grade level and academic stream.
 */
export function getExamQuestionsForGradeAndStream(
  grade: GradeLevel,
  stream: AcademicStream = 'General',
  count = 10
): ExamQuestion[] {
  let pool: ExamQuestion[] = [];

  if (grade === 'JSS 1') pool = JSS1_QUESTIONS;
  else if (grade === 'JSS 2') pool = JSS2_QUESTIONS;
  else if (grade === 'JSS 3') pool = JSS3_QUESTIONS;
  else if (grade === 'SSS 1') pool = SSS1_QUESTIONS;
  else if (grade === 'SSS 2') {
    if (stream === 'Science') pool = SSS2_SCIENCE_QUESTIONS;
    else if (stream === 'Arts') pool = SSS2_ARTS_QUESTIONS;
    else if (stream === 'Commercial') pool = SSS2_COMMERCIAL_QUESTIONS;
    else pool = SSS2_SCIENCE_QUESTIONS; // Default Science if stream not specified
  } else if (grade === 'SSS 3') {
    if (stream === 'Science') pool = SSS3_SCIENCE_QUESTIONS;
    else if (stream === 'Arts') pool = SSS3_ARTS_QUESTIONS;
    else if (stream === 'Commercial') pool = SSS3_COMMERCIAL_QUESTIONS;
    else pool = SSS3_SCIENCE_QUESTIONS;
  } else {
    pool = JSS1_QUESTIONS;
  }

  // Shuffle pool randomly
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
