// Public portfolio content. Edit here, then run npm run build.

export const profile = {
  "firstName": "Ebrar",
  "lastName": "Dushullovci",
  "name": "Ebrar Dushullovci",
  "role": "Senior Full-Stack Software Engineer",
  "tagline": "I build the software that runs real *operations*.",
  "pitch": "Senior full-stack engineer working in TypeScript, React/Next.js, Node.js and C#/.NET. At AutomatedPros I lead teams of 3-5 on Orderific, a platform serving thousands of restaurants, and on internal QA and frontend-generation tools. Building software professionally since 2019.",
  "email": "ebrar.dushullovci@gmail.com",
  "github": "https://github.com/ebrardushullovcii",
  "linkedin": "https://www.linkedin.com/in/ebrar-dushullovci/",
  "resume": "/assets/resume/Ebrar-Dushullovci-Resume.pdf",
  "location": "Prishtina, Kosovo",
  "timezone": "CET/CEST",
  "workMode": "Remote across Europe, UK, and US time zones",
  "availability": "Available now",
  "updated": "November 2026",
  "siteUrl": "https://ebrar-dushullovci.netlify.app"
};

export const stackGroups = [
  {
    "name": "Development",
    "items": [
      "TypeScript",
      "React / Next.js",
      "Node.js",
      "C# / .NET",
      "Expo / React Native",
      "Electron"
    ]
  },
  {
    "name": "Data and integration",
    "items": [
      "SQL Server",
      "PostgreSQL",
      "Convex",
      "REST APIs",
      "WebSockets",
      "SignalR"
    ]
  },
  {
    "name": "Quality",
    "items": [
      "Playwright",
      "xUnit",
      "NUnit",
      "CI/CD"
    ]
  },
  {
    "name": "Platform",
    "items": [
      "Docker",
      "Linux",
      "NGINX",
      "vLLM",
      "LiteLLM"
    ]
  }
];

export const skillTiers = [
  {
    "name": "Development",
    "items": [
      "TypeScript",
      "React / Next.js",
      "Node.js",
      "C# / .NET",
      "Expo / React Native",
      "Electron"
    ]
  },
  {
    "name": "Data and integration",
    "items": [
      "SQL Server",
      "PostgreSQL",
      "Convex",
      "REST APIs",
      "WebSockets",
      "SignalR"
    ]
  },
  {
    "name": "Quality",
    "items": [
      "Playwright",
      "xUnit",
      "NUnit",
      "CI/CD"
    ]
  },
  {
    "name": "Platform",
    "items": [
      "Docker",
      "Linux",
      "NGINX",
      "vLLM",
      "LiteLLM"
    ]
  }
];

export const workProjects = [
  {
    "id": "orderific",
    "index": "01",
    "name": "Orderific",
    "url": "https://orderific.com",
    "mark": "/assets/projects/orderific-mark.png",
    "tag": "Real-time operations",
    "title": "Restaurant ordering and kitchen platform",
    "summary": "Ordering and kitchen-display work on Orderific, AutomatedPros' restaurant platform, which serves thousands of restaurants. I lead engineers across architecture, code review and delivery, and work directly with the people using the software.",
    "points": [
      {
        "result": "Ordering and kitchen-display workflows.",
        "how": "Delivered features in React, Next.js and Node.js, including redesigned tablet flows tested with staff."
      },
      {
        "result": "Reusable adapters for delivery and payment integrations."
      },
      {
        "result": "Customer research informed kitchen UI changes.",
        "how": "Across my customer-experience and engineering roles, I visited prospective restaurants in Dubai. Watching chefs use the screens exposed touch controls that were too small and information they did not need."
      }
    ],
    "outcomes": [
      {
        "value": "<1s",
        "label": "placement to kitchen"
      },
      {
        "value": "83% to 98%",
        "label": "staff task completion in usability tests"
      },
      {
        "value": "~40%",
        "label": "less new-integration effort"
      }
    ],
    "stack": "React · Next.js · TypeScript · Node.js · WebSockets · SQL",
    "diagram": {
      "nodes": [
        {
          "id": "app",
          "x": 10,
          "y": 30,
          "w": 118,
          "label": "Customer app",
          "sub": "web · kiosk"
        },
        {
          "id": "pos",
          "x": 10,
          "y": 140,
          "w": 118,
          "label": "POS / service",
          "sub": "staff screens"
        },
        {
          "id": "svc",
          "x": 196,
          "y": 85,
          "w": 128,
          "label": "Order service",
          "sub": "ordering workflows"
        },
        {
          "id": "kds",
          "x": 392,
          "y": 30,
          "w": 118,
          "label": "Kitchen display",
          "sub": "order tickets"
        },
        {
          "id": "mgmt",
          "x": 392,
          "y": 140,
          "w": 118,
          "label": "Management",
          "sub": "dashboards"
        }
      ],
      "edges": [
        [
          "app",
          "svc"
        ],
        [
          "pos",
          "svc"
        ],
        [
          "svc",
          "kds"
        ],
        [
          "svc",
          "mgmt"
        ]
      ]
    }
  },
  {
    "id": "testingmill",
    "index": "02",
    "tag": "Internal platform",
    "title": "TestingMill",
    "summary": "I proposed and led TestingMill, the platform used for all of our internal end-to-end tests by about 20 developers and 5-10 QA staff. I built most of the backend and some of the frontend.",
    "points": [
      {
        "result": "Regression runs went from days to hours.",
        "how": "API-based test templates and datasets support individual and batch runs, streamed results, run history and automatic failure tickets."
      }
    ],
    "outcomes": [
      {
        "value": "~20",
        "label": "developers"
      },
      {
        "value": "5-10",
        "label": "QA staff"
      },
      {
        "value": "Days to hours",
        "label": "regression runs"
      }
    ],
    "stack": "TypeScript · Next.js · REST APIs · QA automation",
    "diagram": {
      "nodes": [
        {
          "id": "tpl",
          "x": 10,
          "y": 85,
          "w": 112,
          "label": "Test templates",
          "sub": "defined by QA"
        },
        {
          "id": "api",
          "x": 176,
          "y": 85,
          "w": 112,
          "label": "API test cases",
          "sub": "executable"
        },
        {
          "id": "run",
          "x": 342,
          "y": 30,
          "w": 112,
          "label": "Batch runs",
          "sub": "on demand"
        },
        {
          "id": "res",
          "x": 342,
          "y": 140,
          "w": 112,
          "label": "Results",
          "sub": "streamed live"
        },
        {
          "id": "tkt",
          "x": 500,
          "y": 140,
          "w": 112,
          "label": "Ticket",
          "sub": "auto-created"
        }
      ],
      "edges": [
        [
          "tpl",
          "api"
        ],
        [
          "api",
          "run"
        ],
        [
          "run",
          "res"
        ],
        [
          "res",
          "tkt"
        ]
      ]
    }
  },
  {
    "id": "figma-to-next",
    "index": "03",
    "tag": "Internal developer tooling",
    "title": "Figma-to-React / Next.js generation",
    "summary": "With a small team, I built the frontend-generation stage of a Laravel-orchestrated pipeline that turns Figma designs into React and Next.js interfaces.",
    "points": [
      {
        "result": "Roughly halved delivery time on design-heavy pages.",
        "how": "The frontend stage turns Figma design data into React and Next.js interfaces within the wider generation system."
      }
    ],
    "outcomes": [
      {
        "value": "~Half",
        "label": "delivery time on design-heavy pages"
      }
    ],
    "stack": "React · Next.js · TypeScript · Figma · Laravel",
    "diagram": {
      "nodes": [
        {
          "id": "fig",
          "x": 10,
          "y": 85,
          "w": 112,
          "label": "Figma file",
          "sub": "nested structure"
        },
        {
          "id": "map",
          "x": 176,
          "y": 85,
          "w": 112,
          "label": "Generation",
          "sub": "Laravel pipeline"
        },
        {
          "id": "tree",
          "x": 342,
          "y": 85,
          "w": 112,
          "label": "Component tree",
          "sub": "React / Next.js"
        }
      ],
      "edges": [
        [
          "fig",
          "map"
        ],
        [
          "map",
          "tree"
        ]
      ]
    }
  },
  {
    "id": "ai-infrastructure",
    "index": "04",
    "tag": "Additional engineering work",
    "title": "Self-hosted model serving",
    "summary": "Diagnosed timeouts and API failures on the team's vLLM, LiteLLM and llama.cpp model servers, evaluated GPU capacity and worked with DevOps on configuration fixes.",
    "points": [],
    "outcomes": [],
    "stack": "vLLM · LiteLLM · llama.cpp · Docker · NGINX",
    "diagram": {
      "nodes": [
        {
          "id": "team",
          "x": 10,
          "y": 85,
          "w": 100,
          "label": "Engineers",
          "sub": "IDEs · agents"
        },
        {
          "id": "gw",
          "x": 160,
          "y": 85,
          "w": 110,
          "label": "NGINX gateway",
          "sub": "auth · TLS"
        },
        {
          "id": "rt",
          "x": 320,
          "y": 85,
          "w": 100,
          "label": "LiteLLM",
          "sub": "routing"
        },
        {
          "id": "m1",
          "x": 470,
          "y": 30,
          "w": 100,
          "label": "vLLM",
          "sub": "GPU node A"
        },
        {
          "id": "m2",
          "x": 470,
          "y": 140,
          "w": 100,
          "label": "vLLM",
          "sub": "GPU node B"
        }
      ],
      "edges": [
        [
          "team",
          "gw"
        ],
        [
          "gw",
          "rt"
        ],
        [
          "rt",
          "m1"
        ],
        [
          "rt",
          "m2"
        ]
      ]
    },
    "compact": true
  }
];

export const personalProjects = [
  {
    "id": "clipvault",
    "name": "ClipVault",
    "status": "Released Windows application",
    "url": "https://getclipvault.netlify.app",
    "repo": "https://github.com/ebrardushullovcii/ClipVault",
    "primary": {
      "label": "Website",
      "href": "https://getclipvault.netlify.app"
    },
    "mark": "/assets/projects/clipvault-mark.png",
    "image": "/assets/projects/clipvault.jpg",
    "imageAlt": "ClipVault editor trimming a League of Legends clip with separate desktop and microphone audio tracks",
    "loop": {
      "src": "/assets/projects/clipvault-loop.mp4",
      "poster": "/assets/projects/clipvault-loop.jpg",
      "pos": "50% 50%"
    },
    "film": {
      "src": "/assets/projects/clipvault-film.mp4",
      "poster": "/assets/projects/clipvault-film.jpg",
      "seconds": 35
    },
    "summary": "A Windows game-clipping app I built for my own use. A replay buffer saves a clip on a hotkey, with separate game and microphone audio tracks, ready to trim and export.",
    "points": [
      "C++/libobs capture with NVENC encoding and x264 fallback; an Electron/React editor for trimming and FFmpeg export.",
      "Installer and portable releases on GitHub. Friends and I have used it daily for months."
    ],
    "stack": "C++ · libobs · Electron · React · FFmpeg"
  },
  {
    "id": "showtracker",
    "name": "ShowTracker",
    "status": "Live on the web",
    "url": "https://showtrackerapp.netlify.app",
    "repo": "https://github.com/ebrardushullovcii/ShowTracker",
    "primary": {
      "label": "Open the app",
      "href": "https://showtrackerapp.netlify.app"
    },
    "mark": "/assets/projects/showtracker-mark.png",
    "image": "/assets/projects/showtracker.jpg",
    "imageAlt": "ShowTracker home watchlist with shows in progress and a shared watch queue",
    "loop": {
      "src": "/assets/projects/showtracker-loop.mp4",
      "poster": "/assets/projects/showtracker.jpg"
    },
    "film": {
      "src": "/assets/projects/showtracker-film.mp4",
      "poster": "/assets/projects/showtracker-film.jpg",
      "seconds": 38
    },
    "summary": "A TV, anime and movie tracker I built for personal use. Tracks progress and upcoming episodes across four media providers, with shared watches and imports. Friends and I have used it daily for months.",
    "points": [
      "Built with Expo/React Native, TypeScript and Convex. iOS and Android are mobile targets, not store releases.",
      "Reconciles episode identities across providers. Compact indexed projections cut data read by about 84% in a 203-title release-sync replay test."
    ],
    "stack": "Expo · React Native · TypeScript · Convex · NativeWind"
  },
  {
    "id": "nestor",
    "name": "Nestor",
    "status": "In development",
    "url": "https://trynestor.netlify.app",
    "repo": "https://github.com/ebrardushullovcii/Nestor",
    "primary": {
      "label": "Website",
      "href": "https://trynestor.netlify.app"
    },
    "mark": "/assets/projects/nestor-mark.png",
    "image": "/assets/projects/nestor.jpg",
    "imageAlt": "Nestor Job Finder with job results, fit scores, and the details of a selected job, on sample data",
    "loop": {
      "src": "/assets/projects/nestor-loop.mp4",
      "poster": "/assets/projects/nestor-loop.jpg",
      "zoom": 1.18
    },
    "film": {
      "src": "/assets/projects/nestor-film.mp4",
      "poster": "/assets/projects/nestor-film.jpg",
      "seconds": 38
    },
    "summary": "An Electron/React job-search app in development, with typed IPC and resumable Playwright browser workflows, using TypeScript and SQLite.",
    "points": [],
    "stack": "Electron · React · TypeScript · SQLite · Playwright"
  }
];

export const heroShots = [
  {
    "id": "orderific",
    "name": "Orderific",
    "status": "Live in restaurants",
    "url": "https://orderific.com",
    "image": "/assets/projects/orderific.jpg",
    "imageAlt": "Orderific restaurant dashboard with sales progress, new customers, weekly stats and latest orders, from Orderific's public site",
    "pan": true
  },
  {
    "id": "nestor",
    "name": "Nestor",
    "status": "In development",
    "url": "https://trynestor.netlify.app",
    "image": "/assets/projects/nestor.jpg",
    "imageAlt": "Nestor Job Finder with job results, fit scores, and the details of a selected job, on sample data",
    "loop": {
      "src": "/assets/projects/nestor-loop.mp4",
      "poster": "/assets/projects/nestor-loop.jpg",
      "zoom": 1.18
    }
  },
  {
    "id": "showtracker",
    "name": "ShowTracker",
    "status": "Live on the web",
    "url": "https://showtrackerapp.netlify.app",
    "image": "/assets/projects/showtracker.jpg",
    "imageAlt": "ShowTracker home watchlist with shows in progress and a shared watch queue",
    "loop": {
      "src": "/assets/projects/showtracker-loop.mp4",
      "poster": "/assets/projects/showtracker.jpg"
    }
  },
  {
    "id": "clipvault",
    "name": "ClipVault",
    "status": "Released for Windows",
    "url": "https://getclipvault.netlify.app",
    "image": "/assets/projects/clipvault.jpg",
    "imageAlt": "ClipVault editor trimming a League of Legends clip with separate desktop and microphone audio tracks",
    "loop": {
      "src": "/assets/projects/clipvault-loop.mp4",
      "poster": "/assets/projects/clipvault-loop.jpg",
      "pos": "50% 50%"
    }
  }
];

export const smallProjects = [
  {
    "name": "global-agent-skills",
    "url": "https://github.com/ebrardushullovcii/global-agent-skills",
    "summary": "Reusable review, prototyping, and handoff workflows for AI coding agents, with install and sync scripts."
  },
  {
    "name": "Arcane Survivors",
    "url": "https://github.com/ebrardushullovcii/RogueLike",
    "summary": "A small Vampire Survivors-style browser game in Phaser 3 and TypeScript with weapons, upgrades, and waves."
  }
];

export const experience = [
  {
    "id": "automatedpros-senior",
    "period": "Jul 2023 - Present",
    "years": "2023 onward",
    "start": "2023-07",
    "end": null,
    "title": "Senior Full-Stack Software Engineer",
    "company": "AutomatedPros",
    "mode": "Full-time / Remote",
    "current": true,
    "summary": "Lead 3-5 engineers across architecture, code review and delivery on Orderific and internal engineering tools.",
    "points": [
      {
        "result": "Worked with the team to rewrite an Elixir/Phoenix codebase in Node.js because too few engineers could maintain the original stack."
      }
    ]
  },
  {
    "id": "nordri",
    "period": "Aug 2026 - Present",
    "years": "2026 onward",
    "start": "2026-08",
    "end": null,
    "title": "Technical Lead",
    "company": "Nordri",
    "mode": "Part-time, concurrent / Remote",
    "current": true,
    "summary": "Sole engineer and product decision owner for a Swiss services marketplace in invite-only user testing. Web, mobile and admin with TypeScript, Next.js, Expo/React Native, Convex and Stripe Connect.",
    "points": [
      {
        "result": "Designed payment recovery around partial failures.",
        "how": "Webhook events are stored before processing and retried. Payouts reserve an operation before calling Stripe, so retries reuse it instead of starting a new payout."
      }
    ]
  },
  {
    "id": "infotech-consultant",
    "period": "Jan 2022 - Aug 2026",
    "years": "2022 - 26",
    "start": "2022-01",
    "end": "2026-08",
    "title": ".NET Consultant",
    "company": "Infotech L.L.C.",
    "mode": "Part-time consultancy / Remote",
    "summary": ".NET architecture reviews, SQL performance work and production incident support alongside my primary role.",
    "points": [
      {
        "result": "Mentored six junior developers through pairing and written playbooks, reducing onboarding from four weeks to ten days."
      }
    ]
  },
  {
    "id": "orderific-cxo",
    "period": "Nov 2021 - Jul 2023",
    "years": "2021 - 23",
    "start": "2021-11",
    "end": "2023-07",
    "title": "Chief Experience Officer",
    "company": "Orderific (AutomatedPros)",
    "mode": "Customer experience and QA leadership",
    "summary": "Led customer experience and QA for Orderific, a product within AutomatedPros. Grew QA from two to five, selected its tools and translated support and test findings into release priorities.",
    "points": [
      "Chose to return to hands-on engineering in July 2023 to focus on building products."
    ]
  },
  {
    "id": "infotech-developer",
    "period": "Aug 2019 - Jan 2022",
    "years": "2019 - 22",
    "start": "2019-08",
    "end": "2022-01",
    "title": ".NET Developer",
    "company": "Infotech L.L.C.",
    "mode": "Full-time / Hybrid",
    "summary": "Developed C# desktop business software with WPF, WinForms and SQL Server for a suite used by around 1,000 client businesses: inventory, sales, tax documents, POS, restaurants, repair workshops and fuel-pump control.",
    "points": [
      "Reduced car-repair parts lookup from 15 seconds to 2 seconds.",
      "Led development of a .NET MVC logistics and delivery web application covering registration, ordering, tracking and database work."
    ]
  },
  {
    "id": "crea-ko",
    "period": "Jan 2019 - Jul 2019",
    "years": "2019",
    "start": "2019-01",
    "end": "2019-07",
    "title": "Junior .NET Developer",
    "company": "CREA-KO",
    "mode": "First developer role",
    "summary": "Contributed to a team migration of a web ERP from .NET Framework to .NET Core MVC, refactoring frontend and backend code and replacing deprecated dependencies.",
    "points": []
  }
];

export const milestones = [
  {
    "date": "2016-05",
    "label": "First job: call centre and sales",
    "detail": "Tregi Kosovo. Learned to listen for the real problem.",
    "kind": "earlier"
  },
  {
    "date": "2017-06",
    "label": "Technical support, Bit by Bit",
    "detail": "Technical support and customer problem-solving.",
    "kind": "earlier"
  },
  {
    "date": "2017-12",
    "label": "Digital marketing and project management, Beautyque",
    "detail": "Project management and digital marketing at Beautyque.",
    "kind": "earlier"
  },
  {
    "date": "2019-01",
    "label": "Became a developer",
    "detail": "CREA-KO, migrating an ERP from .NET Framework to .NET Core MVC.",
    "kind": "career"
  },
  {
    "date": "2021-11",
    "label": "Chief Experience Officer",
    "detail": "Led customer experience and QA for Orderific, a product within AutomatedPros.",
    "kind": "career"
  },
  {
    "date": "2023-07",
    "label": "Back to hands-on engineering",
    "detail": "Senior Full-Stack Software Engineer at AutomatedPros.",
    "kind": "career"
  },
  {
    "date": "2025-09",
    "label": "Arcane Survivors",
    "status": "Prototype",
    "detail": "A Vampire Survivors-style browser game in Phaser 3 and TypeScript: two classes, auto-attacking weapons, upgrades, and waves. Built for fun.",
    "kind": "project",
    "url": "https://github.com/ebrardushullovcii/RogueLike",
    "image": "/assets/projects/arcane.jpg"
  },
  {
    "date": "2026-01",
    "label": "ClipVault",
    "status": "Released Windows application",
    "detail": "A C++/libobs replay buffer with an Electron/React editor, distributed as installer and portable releases on GitHub.",
    "kind": "project",
    "url": "https://getclipvault.netlify.app",
    "image": "/assets/projects/clipvault.jpg",
    "mark": "/assets/projects/clipvault-mark.png"
  },
  {
    "date": "2026-02",
    "label": "ShowTracker",
    "status": "Live on the web",
    "detail": "TV, anime and movie tracking, live on the web. Expo/React Native and Convex, with iOS and Android as mobile targets.",
    "kind": "project",
    "url": "https://showtrackerapp.netlify.app",
    "image": "/assets/projects/showtracker.jpg",
    "mark": "/assets/projects/showtracker-mark.png"
  },
  {
    "date": "2026-03",
    "label": "Nestor",
    "status": "In development",
    "detail": "Electron/React job-search app in development, with typed IPC and resumable Playwright browser workflows.",
    "kind": "project",
    "url": "https://trynestor.netlify.app",
    "image": "/assets/projects/nestor.jpg",
    "mark": "/assets/projects/nestor-mark.png"
  },
  {
    "date": "2026-08",
    "label": "Started Nordri",
    "detail": "Technical Lead, part-time and concurrent. Swiss services marketplace in invite-only user testing.",
    "kind": "career"
  }
];

export const earlierRoles = "Before engineering: project management and digital marketing at Beautyque (2017–2018) and technical support at Bit by Bit (2017). Those years are why I care about the people who operate the software.";

export const workflow = [
  {
    "title": "Understand the work",
    "body": "Start with the people using the product, its code and its real behaviour."
  },
  {
    "title": "Build and review",
    "body": "Use coding agents for implementation and review while making product and architecture decisions hands-on."
  },
  {
    "title": "Check the result",
    "body": "Verify the running product, document the decisions and leave enough context for the next change."
  }
];

export const about = {
  "quote": "I understand the *workflow* before I abstract the software.",
  "lead": "I started in technical support and project work, moved into .NET development in 2019, then led customer experience and QA. I came back to hands-on engineering because building is where I do my best work.",
  "body": "That path made me comfortable with users, edge cases, and problems that cross team boundaries. I am most useful when the brief is incomplete, the workflow has real constraints, and the product needs someone who can move between the interface and the implementation.",
  "facts": [
    {
      "label": "Languages",
      "value": "English (C2), Albanian (native)"
    },
    {
      "label": "Education",
      "value": "BSc Computer Science, Riinvest College"
    },
    {
      "label": "Based in",
      "value": "Prishtina, Kosovo / CET/CEST"
    },
    {
      "label": "Off the clock",
      "value": "Building my own tools, cooking over charcoal, games, and walks with Yuna the Pomeranian"
    }
  ]
};

export const contact = {
  "heading": "Let's talk about your *product*.",
  "body": "Open to senior full-stack and product engineering roles, working remotely from Prishtina. A few lines about the product, the team and what you need is the best way to start.",
  "fit": [
    "Full-stack product engineering",
    "Internal tools and QA automation",
    "Desktop and cross-platform products",
    "AI-assisted development"
  ]
};
