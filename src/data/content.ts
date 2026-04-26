import type { SiteContent } from "@/types";

export const siteContent: SiteContent = {
  config: {
    title: "Abhinandan Barad | Full Stack Engineer",
    description: "Portfolio of Abhinandan Barad - Full Stack Software Engineer specializing in Cloud, Security, and AI.",
    author: "Abhinandan Barad",
    role: "Full Stack Software Engineer",
    location: "Hyderabad, IN",
    phone: "+91 7032835922",
    email: "b_abhinandan@outlook.com"
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
    tagline: "Full Stack Engineer — Cloud, Security, AI.",
  },

  summary: "Engineering distributed microservices, architecting enterprise security platforms, and integrating AI-powered capabilities. My focus bridges the gap between frontend interfaces, deep backend orchestration, and secure cloud infrastructure. Designing systems that remain reliable, secure, and fast under real-world load.",

  skills: [
    "Python", "JavaScript (ES6+)", "TypeScript", "Java", "SQL",
    "React.js", "Redux (Saga)", "HTML5", "CSS3", "Recharts", "Tailwind CSS",
    "Flask", "RESTful APIs", "Microservices", "Event-Driven Design", "JSON Schema",
    "AWS", "ECR", "S3", "Lambda", "DynamoDB", "ALB", "CloudFormation", "Docker", "CI/CD",
    "SOC2 Compliance", "OAuth 2.0", "MFA", "CORS", "Secure Cookies", "osquery",
    "Microsoft Graph API", "Zoho Mail API", "OpenAI API", "Groq", "Gemini", "Selenium",
    "Git", "Bitbucket", "Jira", "Gunicorn", "Nginx", "Docker Compose", "Linux"
  ],

  experiences: [
    {
      title: "Generative AI & LLM Integration",
      description: "Designed and shipped a real-time Compliance Remediation Assistant integrating OpenAI and Groq models with precision-engineered system prompts, enabling security teams to surface context-aware guidance and directly reducing mean time-to-remediation for compliance gaps.",
    },
    {
      title: "Device Management Platform Revamp",
      description: "Led end-to-end development of a unified cross-platform Device Management system (Linux, macOS, Windows), integrating osquery for automated security telemetry and disk-encryption compliance reporting — significantly expanding endpoint coverage and auditability.",
    },
    {
      title: "SOC2 Compliance Hardening",
      description: "Spearheaded platform-wide security hardening by enforcing CORS policies, Secure cookie flags, MFA retrieval logic, and automated password lifecycle management across 10+ microservices, enabling a critical enterprise compliance milestone.",
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

  projects: [
    {
      title: "Gold Price Prediction Pipeline",
      description: "Built a machine learning regression pipeline to forecast gold prices from macroeconomic indicators, applying feature engineering and cross-validation techniques. (Python, Scikit-learn, Pandas)",
      animationType: "pulse",
      telemetry: [
        { label: "STATUS", value: "ACTIVE" },
        { label: "LATENCY", value: "12ms" },
        { label: "ACCURACY", value: "94.2%" }
      ],
      colSpan: "md:col-span-1",
      delay: 0.1,
    },
    {
      title: "Encrypted Cloud Data Search",
      description: "Designed a privacy-preserving search system enabling secure keyword queries over encrypted cloud datasets, demonstrating applied cryptography and security-by-design. (Java, MySQL, Cryptography)",
      animationType: "orbit",
      telemetry: [
        { label: "ENCRYPTION", value: "AES-256" },
        { label: "NODES", value: "64" },
        { label: "QPS", value: "1.2k" }
      ],
      colSpan: "md:col-span-2",
      delay: 0.2,
    },
    {
      title: "Automated Cloud Compliance & Security",
      description: "Contributed to a B2B platform for regulated enterprises. Automated SOC2 compliance hardening, cross-platform device management via osquery, and integrated a real-time LLM-powered Compliance Remediation Assistant using OpenAI and Groq to drastically reduce mean time-to-remediation. (Next.js, Python, AWS, AI Agents)",
      animationType: "secure",
      telemetry: [
        { label: "POLICY", value: "SOC2" },
        { label: "AGENTS", value: "ACTIVE" },
        { label: "LLM", value: "GROQ-LLAMA3" }
      ],
      colSpan: "md:col-span-3",
      delay: 0.3,
    },
  ]
};