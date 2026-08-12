import type { ImageMetadata } from "astro";

import smileMakeoverImg from "../assets/results/smile-makeover.jpg";
import complexCaseDesignImg from "../assets/results/complex-case-design.png";
import fullArchRestorationImg from "../assets/results/full-arch-restoration.jpg";
import functionalRejuvenationImg from "../assets/results/functional-rejuvenation.jpg";
import restorativeExcellenceImg from "../assets/results/restorative-excellence.jpg";

export interface CaseStudyStep {
  n: string;
  title: string;
  body: string;
}

export interface CaseStudyCandidate {
  title: string;
  body: string;
}

export interface CaseStudyGlanceItem {
  dt: string;
  dd: string;
}

export interface CaseStudy {
  slug: string;
  seoTitle: string;
  seoDescription: string;
  /** H1 + breadcrumb label */
  name: string;
  heroLede: string;
  image: ImageMetadata;
  /** MedicalProcedure "name" — defaults to `name` when omitted */
  procedureName?: string;
  procedureDescription: string;
  /** Optional extra MedicalProcedure properties */
  howPerformed?: string;
  followUp?: string;
  overviewHeading: string;
  overviewParagraphs: string[];
  glance: CaseStudyGlanceItem[];
  steps: CaseStudyStep[];
  candidates: CaseStudyCandidate[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "smile-makeover",
    seoTitle: "Smile Makeover Case Study | Thrive Dental Bayside",
    seoDescription:
      "Explore a real smile makeover transformation at Thrive Dental in Bayside, Queens NY — correcting spacing, discoloration, and symmetry with porcelain veneers.",
    name: "Smile Makeover",
    heroLede:
      "Correcting spacing and discoloration for a perfectly symmetrical, radiant result — your dream smile, crafted with precision in Bayside, Queens NY.",
    image: smileMakeoverImg,
    procedureDescription:
      "Comprehensive cosmetic transformation correcting spacing, discoloration, and symmetry using porcelain veneers, whitening, and advanced digital planning.",
    overviewHeading: "What is a smile makeover?",
    overviewParagraphs: [
      "A smile makeover is a customized combination of cosmetic dental procedures designed to address everything that bothers you about your smile in a single, cohesive treatment plan. At Thrive Dental in Bayside, Queens NY, smile makeovers are our signature — blending artistry with clinical precision to deliver genuinely life-changing results.",
      "Porcelain veneers are often the centerpiece: ultra-thin shells of ceramic that mask chips, close gaps, correct mild crowding, and achieve the shade of white you've always wanted — all without extensive tooth reduction. Paired with professional whitening for natural teeth, the result is a smile that's bright, balanced, and completely natural-looking.",
      "What makes a smile makeover at Thrive different is the digital planning process. You see your new smile before we start — allowing real collaboration between patient and dentist to design something that fits your face, your personality, and your life. Serving patients from Bayside, Flushing, and across Queens NY.",
    ],
    glance: [
      { dt: "Procedure type", dd: "Cosmetic smile transformation" },
      { dt: "Restorations used", dd: "Porcelain veneers, whitening, bonding" },
      { dt: "Treatment duration", dd: "3–6 weeks total" },
      { dt: "Anesthesia", dd: "Local anesthesia; minimal discomfort" },
      { dt: "Longevity", dd: "10–20 years for veneers" },
      { dt: "Recovery", dd: "Sensitivity for 1–2 weeks" },
    ],
    steps: [
      { n: "01", title: "Smile Analysis & Wish List", body: "We review photos, discuss your goals, and evaluate spacing, color, symmetry, and gum proportions — then create a personalized treatment plan ranked by impact and priority." },
      { n: "02", title: "Digital Smile Preview", body: "Using digital mockup tools, you see a simulation of your new smile before committing. We refine together until the preview matches your vision perfectly." },
      { n: "03", title: "Whitening & Alignment", body: "Professional in-office whitening or Invisalign treatment is completed first, establishing the foundation that all cosmetic restorations will be designed to complement." },
      { n: "04", title: "Porcelain Veneer Placement", body: "Ultra-thin porcelain veneers are custom-crafted and bonded with precision — correcting spacing, shape, and color in a single placement appointment." },
    ],
    candidates: [
      { title: "Gaps, crowding, or misalignment", body: "Patients with spacing issues that affect confidence in photos or conversation find smile makeovers transformative — without years of orthodontic treatment in many cases." },
      { title: "Staining and discoloration", body: "Coffee, wine, smoking, and tetracycline staining that resists standard whitening respond beautifully to the combination of professional whitening and veneers." },
      { title: "Camera-shy due to smile concerns", body: "If you avoid smiling in photos or have felt self-conscious for years, a smile makeover is one of the highest-impact changes you can make for confidence and quality of life." },
    ],
  },
  {
    slug: "complex-case-design",
    seoTitle: "Complex Case Design Case Study | Thrive Dental Bayside",
    seoDescription:
      "A real complex dental case at Thrive Dental in Bayside, Queens NY — multi-disciplinary design resolving aesthetic and functional challenges comprehensively.",
    name: "Complex Case Design",
    heroLede:
      "A multi-disciplinary approach to resolving complex aesthetic and health concerns — where experience, coordination, and precision converge for exceptional results.",
    image: complexCaseDesignImg,
    procedureDescription:
      "A multi-disciplinary approach to resolving complex aesthetic and functional dental concerns through coordinated, sequenced treatment planning.",
    overviewHeading: "What is complex case design?",
    overviewParagraphs: [
      "Some smiles present challenges that go beyond any single procedure. Complex case design is what happens when our Bayside, Queens NY team combines clinical expertise, precise sequencing, and multi-disciplinary coordination to transform the most demanding cases into outstanding outcomes.",
      "These cases typically involve several interacting problems: bone loss, missing teeth, collapsed bite, old failing restorations, and significant aesthetic concerns — all of which must be addressed in the right order for treatment to succeed. Attempting any of these issues in isolation would be incomplete; addressing them together, intelligently, produces results that are both beautiful and durable.",
      "At Thrive Dental, complex case management is one of our clinical strengths. We've helped patients in Bayside, Flushing, Fresh Meadows, and across Queens NY achieve outcomes they were told weren't possible elsewhere. If you've been told your case is \"too complicated,\" we encourage you to get a second opinion from our team.",
    ],
    glance: [
      { dt: "Procedure type", dd: "Multi-disciplinary rehabilitation" },
      { dt: "Treatments involved", dd: "Varies — implants, crowns, ortho, perio" },
      { dt: "Treatment duration", dd: "3 months to 1+ year depending on scope" },
      { dt: "Anesthesia", dd: "Local; IV sedation available" },
      { dt: "Longevity", dd: "Decades with proper maintenance" },
      { dt: "Recovery", dd: "Phase-dependent; managed throughout" },
    ],
    steps: [
      { n: "01", title: "Multi-Disciplinary Evaluation", body: "Complex cases begin with a thorough diagnostic workup: CBCT imaging, periodontal probing, TMJ assessment, and photographic documentation to understand the full clinical picture." },
      { n: "02", title: "Coordinated Treatment Sequencing", body: "We sequence treatments in the correct order — periodontal health first, then orthodontic or surgical phase, then restorative — to ensure each phase builds on a healthy foundation." },
      { n: "03", title: "Collaborative Specialist Coordination", body: "When specialist care is needed (periodontist, oral surgeon, orthodontist), we coordinate referrals and communicate the full treatment plan to ensure seamless, unified care." },
      { n: "04", title: "Final Restorations & Long-term Maintenance", body: "Definitive restorations are placed once all pre-restorative work is complete, followed by a structured maintenance program to protect the investment for decades." },
    ],
    candidates: [
      { title: "Multiple interrelated dental issues", body: "When problems like bone loss, missing teeth, bite collapse, and aesthetic concerns all exist together, only a coordinated multi-disciplinary approach delivers lasting results." },
      { title: "Previous treatment that needs revision", body: "Failed implants, misaligned prior restorations, or incomplete past treatment often require complex redesign — an area where our team's experience is particularly valuable." },
      { title: "High expectations for the outcome", body: "Patients who want the very best result — and understand that achieving it requires patience and coordination — are the ideal candidates for complex case design." },
    ],
  },
  {
    slug: "full-arch-restoration",
    seoTitle: "Full Arch Restoration Case Study | Thrive Dental Bayside",
    seoDescription:
      "Explore a real full arch dental restoration case at Thrive Dental in Bayside, Queens NY — complete porcelain reconstruction for a confident, lasting smile.",
    name: "Full Arch Restoration",
    heroLede:
      "Complete functional and aesthetic reconstruction using advanced porcelain ceramics — designed digitally, crafted precisely, and built to last a lifetime.",
    image: fullArchRestorationImg,
    procedureDescription:
      "Complete functional and aesthetic reconstruction of all teeth using advanced porcelain ceramics, digital planning, and precision placement.",
    followUp: "Routine dental checkups every 6 months",
    howPerformed:
      "Digital planning, tooth preparation, temporary placement, and final porcelain bonding",
    overviewHeading: "What is full arch restoration?",
    overviewParagraphs: [
      "Full arch restoration is one of dentistry's most comprehensive procedures — rebuilding every tooth in the upper or lower jaw (or both) to achieve optimal function, health, and beauty. At Thrive Dental in Bayside, Queens NY, we combine digital smile design with master ceramics to deliver results that look natural and last decades.",
      "Unlike piecemeal dentistry, full arch rehabilitation treats the mouth as an interconnected system. Bite forces, jaw alignment, tooth proportions, and gum aesthetics are all considered together, resulting in a smile that feels as good as it looks.",
      "Each case begins with CBCT imaging and comprehensive records, allowing our team to plan digitally before touching a single tooth. Patients preview their new smile in 3D before any irreversible steps are taken — a commitment to transparency that sets Thrive apart in Queens NY.",
    ],
    glance: [
      { dt: "Procedure type", dd: "Full-mouth rehabilitation" },
      { dt: "Restorations used", dd: "Porcelain crowns, veneers, bridges" },
      { dt: "Treatment duration", dd: "4–8 weeks (with temporaries)" },
      { dt: "Anesthesia", dd: "Local anesthesia; sedation available" },
      { dt: "Longevity", dd: "15–25 years with proper care" },
      { dt: "Recovery", dd: "Minimal — normal activity same day" },
    ],
    steps: [
      { n: "01", title: "Comprehensive Exam & Digital Imaging", body: "We begin with a full-mouth evaluation including CBCT cone-beam scans, intraoral photos, and digital bite analysis to map every millimeter of your anatomy." },
      { n: "02", title: "Digital Smile Design & Planning", body: "Using advanced software, your new smile is designed virtually so you can preview the outcome before a single tooth is touched. Occlusion, proportions, and phonetics are all optimized." },
      { n: "03", title: "Tooth Preparation & Temporaries", body: "Teeth are precisely prepared and beautiful temporaries are placed, letting you test the look and feel for weeks while your final restorations are crafted by our ceramist." },
      { n: "04", title: "Final Porcelain Placement", body: "Custom-shaded full-arch porcelain restorations are bonded with precision. Bite, function, and aesthetics are verified and fine-tuned before you leave the chair." },
    ],
    candidates: [
      { title: "Severely worn or eroded teeth", body: "Patients with significant enamel loss due to grinding, acid erosion, or aging are ideal candidates for full arch reconstruction." },
      { title: "Multiple missing or failing teeth", body: "When several teeth are compromised, a full-arch approach provides predictable, long-lasting results better than piecemeal treatment." },
      { title: "Functional or aesthetic concerns", body: "Difficulty chewing, jaw pain, or deep dissatisfaction with smile appearance are all strong indicators for comprehensive rehabilitation." },
    ],
  },
  {
    slug: "functional-rejuvenation",
    seoTitle: "Functional Rejuvenation Case Study | Thrive Dental Bayside",
    seoDescription:
      "See a real functional rejuvenation case at Thrive Dental in Bayside, Queens — restoring bite alignment, structural integrity, and natural brightness.",
    name: "Functional Rejuvenation",
    heroLede:
      "Restoring bite alignment and structural integrity while enhancing natural brightness — where health and beauty come together for lasting results.",
    image: functionalRejuvenationImg,
    procedureDescription:
      "Restoring bite alignment and structural integrity while enhancing natural brightness through occlusal equilibration and aesthetic restorations.",
    overviewHeading: "What is functional rejuvenation?",
    overviewParagraphs: [
      "Functional rejuvenation addresses the dual reality that your smile must both look great and work perfectly. At Thrive Dental in Bayside, Queens NY, this treatment combines bite correction, structural repair, and professional whitening into a seamlessly coordinated plan.",
      "Many patients come to us with teeth that have been worn down by years of grinding, acidic foods, or simple neglect — leaving them dull, short, and functionally compromised. Rejuvenation rebuilds those teeth to their ideal form and function using the latest composite and porcelain materials, precisely shade-matched to achieve a naturally bright result.",
      "What sets this approach apart is the attention to occlusion: we don't just restore what's visible, we ensure your bite is properly balanced so the new restorations last. Patients in Queens NY routinely report that headaches, jaw tension, and chewing discomfort disappear alongside their smile concerns.",
    ],
    glance: [
      { dt: "Procedure type", dd: "Functional & aesthetic restoration" },
      { dt: "Restorations used", dd: "Composite bonding, porcelain, whitening" },
      { dt: "Treatment duration", dd: "2–6 weeks depending on scope" },
      { dt: "Anesthesia", dd: "Local anesthesia; sedation available" },
      { dt: "Longevity", dd: "10–20 years with maintenance" },
      { dt: "Recovery", dd: "Minimal sensitivity for 1–2 weeks" },
    ],
    steps: [
      { n: "01", title: "Bite Analysis & Jaw Alignment Assessment", body: "We evaluate occlusal relationships, TMJ health, and wear patterns to understand the root causes of functional breakdown before designing any solution." },
      { n: "02", title: "Occlusal Equilibration Planning", body: "Using articulated study models and digital bite records, we map out the precise adjustments needed to restore balanced, harmonious jaw function." },
      { n: "03", title: "Restorative & Whitening Treatment", body: "Damaged teeth are restored with tooth-colored composites or porcelain, and professional whitening lifts natural teeth to match — creating uniformity across the arch." },
      { n: "04", title: "Functional Verification & Maintenance", body: "Bite is tested under real-world chewing conditions, fine-tuned, and a maintenance protocol is established to protect the results long-term." },
    ],
    candidates: [
      { title: "Teeth grinders & clenchers", body: "Bruxism causes accelerated wear and structural damage that functional rejuvenation addresses comprehensively — restoring lost tooth structure and protecting what remains." },
      { title: "Dull, stained, or uneven teeth", body: "When brightness and symmetry are concerns alongside function, combined whitening and restorative treatment delivers dramatic aesthetic improvements." },
      { title: "Bite discomfort or jaw tension", body: "Patients experiencing headaches, jaw soreness, or uneven chewing often have underlying bite issues that functional rejuvenation resolves at the source." },
    ],
  },
  {
    slug: "restorative-excellence",
    seoTitle: "Restorative Excellence Case Study | Thrive Dental Bayside",
    seoDescription:
      "Real crown and bridge restorative case at Thrive Dental in Bayside, Queens NY — precision porcelain work to restore confidence, function, and oral health.",
    name: "Restorative Excellence",
    heroLede:
      "Precision crown and bridge work to restore lost confidence and oral health — where function meets flawless aesthetics in Bayside, Queens NY.",
    image: restorativeExcellenceImg,
    procedureName: "Restorative Excellence — Crown & Bridge",
    procedureDescription:
      "Precision crown and bridge work using all-ceramic porcelain restorations to restore lost confidence, function, and oral health.",
    overviewHeading: "What is restorative crown & bridge work?",
    overviewParagraphs: [
      "Dental crowns and bridges have long been the cornerstone of restorative dentistry — but at Thrive Dental in Bayside, Queens NY, we elevate this fundamental treatment to an art form. Using only all-ceramic, metal-free materials, our restorations are virtually indistinguishable from natural teeth.",
      "A crown encases a damaged tooth completely, restoring its shape, strength, and appearance. A bridge uses adjacent teeth as anchors to span a gap left by one or more missing teeth. Together, they address the most common restorative challenges patients face — from cracked teeth and large fillings to missing teeth that affect chewing and speech.",
      "What defines restorative excellence at Thrive isn't just the materials — it's the attention to marginal fit, shade matching, and bite equilibration that ensures restorations feel completely natural from day one. Our Queens NY patients routinely report that they forget the work was ever done.",
    ],
    glance: [
      { dt: "Procedure type", dd: "Crown & bridge restoration" },
      { dt: "Materials", dd: "All-ceramic, metal-free porcelain" },
      { dt: "Treatment duration", dd: "2–3 appointments over 2–3 weeks" },
      { dt: "Anesthesia", dd: "Local anesthesia; sedation available" },
      { dt: "Longevity", dd: "15–25 years with proper care" },
      { dt: "Recovery", dd: "Minimal — normal function same day" },
    ],
    steps: [
      { n: "01", title: "Comprehensive Dental Exam & X-rays", body: "We assess existing crowns, bridges, and remaining tooth structure, identifying areas of decay, failed margins, or compromised aesthetics that need to be addressed." },
      { n: "02", title: "Treatment Planning & Shade Selection", body: "A detailed restorative plan is created, specifying which teeth need new crowns or bridges and selecting the precise porcelain shade to achieve natural harmony with the smile." },
      { n: "03", title: "Tooth Preparation & Temporaries", body: "Teeth are precisely shaped to receive new restorations, and high-quality temporaries are placed to protect and preview the final result while your custom work is crafted." },
      { n: "04", title: "Final Crown & Bridge Delivery", body: "Precision-fit porcelain crowns and bridges are cemented with biocompatible adhesive. Marginal integrity, bite, and aesthetics are verified to ensure long-term success." },
    ],
    candidates: [
      { title: "Failing or aging crown work", body: "Old metal or porcelain-fused-to-metal crowns that show dark margins, chips, or mismatched color are ideal candidates for replacement with modern all-ceramic restorations." },
      { title: "Missing teeth with healthy neighbors", body: "When implants aren't feasible or desired, a precision ceramic bridge provides a fixed, natural-looking solution that restores both function and appearance." },
      { title: "Compromised structural integrity", body: "Teeth weakened by large fillings, root canals, or cracks benefit enormously from full-coverage crown protection — preventing fracture and extending tooth longevity." },
    ],
  },
];
