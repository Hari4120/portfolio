import type { SiteContent } from "@/types";

export const siteContent: SiteContent = {
  config: {
    title: "Abhinandan Barad | Full Stack Engineer",
    description: "Portfolio of Abhinandan Barad - Full Stack Software Engineer specializing in Cloud, Security, AI, and Data Viz.",
    author: "Abhinandan Barad",
    role: "Full Stack Software Engineer",
    location: "Hyderabad, IN",
    email: "b_abhinandan@outlook.com",
    github: "https://github.com/Hari4120",
    linkedin: "https://www.linkedin.com/in/abhinandan-b-542543320/",
    resumePath: "/Abhinandan_Barad_Resume.pdf",
  },

  nav: [
    { label: "Summary", href: "#summary" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
  ],

  hero: {
    heading: "ABHINANDAN BARAD",
    role: "Software Engineer & Architect",
    tagline: "Full Stack Engineer — Cloud, Security, AI, Data Viz.",
  },

  summaryPhases: [
    "Engineering distributed systems at scale — and knowing when to simplify them.",
    "Architecting enterprise security for regulated cloud platforms.",
    "Integrating AI agents into production workflows.",
    "Bridging the gap between frontend interfaces, backend orchestration, and secure cloud infrastructure.",
    "Designing systems that stay reliable, secure, and fast under real-world load."
  ],

  skills: [
    "Python", "JavaScript (ES6+)", "TypeScript", "Java", "Fastify", "SQL",
    "React.js", "Redux (Saga)", "TanStack Query", "Zod", "Recharts", "Tailwind CSS",
    "Flask", "RESTful APIs", "Microservices", "Event-Driven Design", "JSON Schema",
    "AWS", "ECR", "S3", "Lambda", "DynamoDB", "ALB", "SQS", "Docker", "CI/CD", "Vite",
    "SOC2 Compliance", "OAuth 2.0", "MFA", "CORS", "Secure Cookies", "osquery",
    "Google Drive API", "Google Sheets API", "OpenAI API", "Groq", "Gemini", "Selenium",
    "Git", "Bitbucket", "Vitest", "Docker Compose", "Linux"
  ],

  experienceBlocks: [
    {
      company: "iCompaas",
      period: "Aug 2024 – Present",
      description: "B2B automated cloud compliance & security management platform serving regulated enterprises.",
      items: [
        {
          title: "Trackr — Google-Backed Tracking BI",
          description: "Architected a single-container Node/React BI tool leveraging Google Sheets as a zero-DB data layer. Engineered secure per-user OAuth and stored configs via Drive APIs. Shipped a draggable dashboard with 21 widget types and cross-sheet joins. Eliminated database overhead by collapsing a legacy 5-service Docker stack into a single 80MB container.",
        },
        {
          title: "Generative AI & LLM Integration",
          description: "Designed and shipped a real-time Compliance Remediation Assistant integrating OpenAI and Groq models with precision-engineered system prompts, reducing mean time-to-remediation for compliance gaps.",
        },
        {
          title: "Device Management Platform Revamp",
          description: "Led end-to-end development of a unified cross-platform Device Management system (Linux, macOS, Windows), integrating osquery for automated security telemetry and compliance reporting — significantly expanding endpoint coverage and auditability.",
        },
        {
          title: "SOC2 Compliance Hardening",
          description: "Spearheaded platform-wide security hardening by enforcing CORS policies, Secure cookie flags, and automated password lifecycle management across 10+ microservices, enabling a critical enterprise compliance milestone.",
        },
        {
          title: "Enterprise Integrations",
          description: "Architected resilient integration services for Microsoft 365 (Graph API) and Zoho Mail, handling OAuth 2.0 flows, MFA enforcement, and batch synchronization for directories exceeding 10,000 users.",
        },
        {
          title: "Performance Engineering",
          description: "Delivered 40%+ latency improvements on login flows and compliance policy generation by redesigning API orchestration and introducing multi-layer caching across data and orchestration services.",
        },
        {
          title: "Infrastructure & DevOps",
          description: "Resolved production-grade memory issues in Python microservices via worker lifecycle management, improving uptime during high-concurrency syncs. Authored AWS CloudFormation templates managing ALB routing for a multi-service architecture.",
        },
        {
          title: "Frontend Engineering",
          description: "Modernized enterprise dashboards with dynamic data visualization, global timezone localization, shimmer loading states, and async code-split components — improving perceived performance for an international user base.",
        },
      ],
    },
    {
      company: "Academic Research",
      period: "2022 – 2024",
      description: "University projects exploring applied ML, cryptography, and secure cloud computing.",
      items: [
        {
          title: "Gold Price Prediction Pipeline",
          description: "Built an ML regression pipeline forecasting gold prices from macroeconomic indicators using Random Forest with cross-validation, achieving R² = 0.89 and MAE of $1.42 across 10k samples.",
        },
        {
          title: "Encrypted Cloud Data Search",
          description: "Designed a privacy-preserving search system enabling secure keyword queries over AES-256 encrypted cloud datasets with O(log n) indexing, demonstrating applied cryptography and security-by-design.",
        },
      ],
    },
  ],

  projects: [
    {
      title: "Trackr — Google-Backed Tracking BI",
      description: "A self-hostable BI dashboard leveraging Google Sheets as a zero-DB data layer via per-user OAuth. Ships a draggable canvas with 21 widget types and cross-sheet aggregation. Re-architected a legacy 5-service Docker/MySQL stack into a single 80MB Node container—delivering the same product with half the code and zero operational overhead. (Node 20, Fastify, React, TanStack Query, Recharts, Google APIs)",
      animationType: "chart",
      telemetry: [
        { label: "ARCHITECTURE", value: "ZERO-DB" },
        { label: "CONTAINERS", value: "5 → 1" },
        { label: "WIDGET TYPES", value: "21" }
      ],
      colSpan: "md:col-span-3",
      delay: 0.1,
    },
    {
      title: "Gold Price Prediction Pipeline",
      description: "Built a machine learning regression pipeline to forecast gold prices from macroeconomic indicators, applying feature engineering and cross-validation techniques. (Python, Scikit-learn, Pandas)",
      animationType: "pulse",
      telemetry: [
        { label: "MAE", value: "$1.42" },
        { label: "R² SCORE", value: "0.89" },
        { label: "DATASET", value: "10K SAMPLES" }
      ],
      colSpan: "md:col-span-1",
      delay: 0.2,
    },
    {
      title: "Encrypted Cloud Data Search",
      description: "Designed a privacy-preserving search system enabling secure keyword queries over encrypted cloud datasets, demonstrating applied cryptography and security-by-design. (Java, MySQL, Cryptography)",
      animationType: "orbit",
      telemetry: [
        { label: "ENCRYPTION", value: "AES-256" },
        { label: "INDEXING", value: "O(log n)" },
        { label: "SCHEME", value: "SSE" }
      ],
      colSpan: "md:col-span-2",
      delay: 0.3,
    },
  ]
};