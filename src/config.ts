export const siteConfig = {
  name: "ShaderTrix",
  title: "Technical Artist | 3D Artist | Graphics Programmer",
  description:
    "Unity UI Systems, Rendering, Shaders, GPU-driven Systems and Tool Development",

  accentColor: "#8ab870",

  social: {
    email: "shivanshuchauhan1998@gmail.com",
    linkedin: "https://www.linkedin.com/in/shivanshu-chauhan-89095b186",
    github: "https://github.com/ShaderTrix",
    artstation: "https://www.artstation.com/shivanshuchauhan/albums/6216110",
    youtube: "https://www.youtube.com/@shivanshuchauhan3032"
  },

  aboutMe:
    "Hey, I'm ShaderTrix — a Technical Artist who lives somewhere between art and engineering. I spend most of my time building shaders, rendering features, and tools that help artists and designers bring their ideas to life without fighting the engine to do it. I care a lot about making things look good while still running smoothly, especially on mobile, where every bit of performance counts. Outside of production work I'm usually sculpting, texturing, or tinkering with rendering tricks just for fun.",

  skills: [
    "Unity (Built-in / URP / HDRP)",
    "Unreal Engine",
    "Shader Development",
    "Realtime Rendering",
    "Lighting & Rendering Setups",
    "Performance Optimization",
    "Rigging & Animation",
    "Editor Tooling",
    "C#",
    "C++",
    "HLSL",
    "Maya",
    "ZBrush",
    "Substance Painter",
    "Blender",
    "Photoshop",
  ],

  experience: [
    {
      company: "Gameberry Labs",
      title: "Technical Artist II",
      dateRange: "Jul 2024 - Present",
      description:
        "I work on Sorry! World by Hasbro, helping shape the mechanics, visuals, and systems that keep the game feeling good to play.",
      highlights: [
        "Helped tune game mechanics that lifted player retention by ~15%, working closely with data and player feedback",
        "Bridged the gap between art and engineering in a fast-paced live-ops environment",
        "Optimized rendering and gameplay performance to keep frame times stable on low-end devices",
      ],
    },

    {
      company: "Dirtcube Interactive",
      title: "3D Artist",
      dateRange: "Mar 2021 - Jul 2024",
      description:
        "I worked on Gamestarz, modeling and texturing 3D environments while picking up lighting, rigging, and rendering work in Unity along the way.",
      highlights: [
        "Modeled, textured, rigged, and animated 3D assets and characters using Maya, ZBrush, Blender, and Substance",
        "Set up real-time lighting and rendering in Unity with performance in mind",
        "Created and optimized assets for real-time environments",
      ],
    },
  ],

  education: [
    {
      school: "KJ Somaiya College of Science and Commerce",
      degree: "Bachelor of Science in Computer Science",
      dateRange: "2020",
      achievements: [
        "Computer Science Graduate",
        "Focused on app development, game development, and web development",
        "Worked with languages and tools like Java, Python, C, C++, and Android Studio",
      ],
    },
    {
      school: "MAAC (Maya Academy of Advanced Cinematics)",
      degree: "Game Art and Development Course",
      dateRange: "2018 - 2020",
      achievements: [
        "Focused on 3D game art and animation",
        "Picked up 2D pipeline tools for texture creation",
        "Worked with Unity & Unreal Engine",
        "Used software like Maya, 3ds Max, Substance Painter, Substance Designer, Blender, ZBrush, and Mudbox",
      ],
    },
  ],

  // ---------------------------------------------------------------------------
  // PROJECT CATEGORIES
  // Three "work" pages, each backed by one category below.
  // Every project gets a unique `slug` -> its own detail page at /projects/<slug>.
  // `longDescription` is an array of paragraphs shown on the detail page.
  // `highlights` is an optional bullet list shown on the detail page.
  //
  // IMAGES / GIFS (optional):
  //   `image`       -> background of the tile + banner on the detail page.
  //   `detailImage` -> override just the detail-page banner (falls back to `image`).
  //   Put files in /public (e.g. public/projects/foo.gif) and reference them
  //   from the site root, e.g. image: "/projects/foo.gif". Leave "" for the
  //   default gradient/solid look. Both .jpg/.png/.webp and .gif work.
  // ---------------------------------------------------------------------------
  projectCategories: {
    professional: {
      label: "Professional Projects",
      blurb:
        "Shipped, production work from studios — systems built for large-scale mobile games and real teams.",
      projects: [
        {
          slug: "gameberry-ui-systems",
          name: "Live-Ops UI Systems",
          tagline: "Unity UI architecture for 6M+ DAU titles",
          image: "", // e.g. "/projects/ui-systems.gif"
          detailImage: "",
          description:
            "Scalable UI systems and tooling supporting live products with millions of daily active users.",
          link: "",
          skills: ["Unity", "UI Systems", "C#", "Performance"],
          longDescription: [
            "Designed and maintained Unity UI systems for live mobile titles serving over 6 million daily active users, balancing rich visuals against strict performance budgets on low-end devices.",
            "Built reusable UI components and editor tooling that let designers iterate without engineering bottlenecks, and profiled CPU/GPU workloads to keep frame times stable across the device matrix.",
          ],
          highlights: [
            "Authored shared UI component library used across multiple features",
            "Reduced UI-driven draw calls and layout rebuild costs on low-end hardware",
            "Bridged art and engineering through custom editor workflows",
          ],
        },
        {
          slug: "rendering-optimization",
          name: "Rendering & Performance Optimization",
          tagline: "Stable frame times on low-end mobile",
          image: "",
          detailImage: "",
          description:
            "Rendering features and CPU-GPU optimization work to hold target frame rates across a wide device range.",
          link: "",
          skills: ["Rendering", "GPU Profiling", "Optimization"],
          longDescription: [
            "Profiled and optimized rendering pipelines for mobile titles, targeting consistent frame pacing on the lowest-supported hardware.",
            "Worked across shaders, batching, and overdraw to cut GPU cost while preserving the intended art direction.",
          ],
          highlights: [
            "Identified and resolved GPU bottlenecks via frame captures",
            "Tuned shaders and material setups for mobile GPUs",
          ],
        },
      ],
    },

    personal: {
      label: "Personal Project",
      blurb:
        "Self-directed graphics and rendering work — shaders, GPU systems, and tools built to learn and experiment.",
      projects: [
        {
          slug: "gpu-pixelizer",
          name: "Screen-Space Character Voxelisation",
          tagline:
            "Custom URP render passes, compute shader reconstruction, and GPU-driven destruction.",
          image: "/projects/pixelizer_preview.gif",
          detailImage: "",
          description:
            "A GPU-driven approach to reconstructing animated characters as dynamic voxel representations in Unity URP, using custom MRT render passes and compute shaders.",
          link: "https://github.com/ShaderTrix/Unity_URPShaders/tree/main/Assets/Compute%20Shader/PixelizerGun",
          skills: ["Unity", "Compute Shaders", "HLSL", "Rendering"],
          longDescription: [
            "Basically: turn characters into cubes, on the GPU, in real time. Instead of voxelizing meshes the slow way, this captures the character on screen and rebuilds it as a grid of instanced cubes using compute shaders — so the cube count just scales with how big the character looks on screen. Free LOD, nice.",
            "When an enemy goes down, those cubes stop following the character and get shoved around by a little GPU physics pass instead, so they tumble and scatter like a disintegration effect. Whole thing stays on the GPU the entire time.",
          ],
        },
        {
          slug: "flow-field-agents",
          name: "Flow Field Agent Movement System",
          tagline: "Large-scale steering with flow fields",
          image: "",
          detailImage: "",
          description:
            "Large-scale agent steering using flow fields and spatial partitioning, with debug visualization tools.",
          link: "https://github.com/ShaderTrix/Unity_SRPShaders",
          skills: ["Unity", "C#", "AI Systems", "Optimization"],
          longDescription: [
            "A large-scale agent steering system using flow fields and spatial partitioning, supporting many agents updating in real time.",
            "Includes debug visualization tools and scalable update strategies suitable for real-time applications.",
          ],
          highlights: [
            "Flow-field navigation with spatial partitioning",
            "Built-in debug visualization for field and agents",
          ],
        },
        {
          slug: "shader-experiments",
          name: "Shader & Rendering Experiments",
          tagline: "SDFs, procedural rendering, research",
          image: "",
          detailImage: "",
          description:
            "Collection of shader experiments including signed distance fields, procedural rendering, and custom effects.",
          link: "https://github.com/ShaderTrix",
          skills: ["HLSL", "Rendering", "Shaders"],
          longDescription: [
            "An ongoing collection of shader experiments spanning signed distance fields, procedural rendering techniques, custom effects, and general rendering research.",
            "Used as a sandbox for trying out ideas before folding the useful ones into larger systems.",
          ],
          highlights: [
            "Signed distance field experiments",
            "Procedural and custom rendering effects",
          ],
        },
      ],
    },

    random: {
      label: "Random Projects",
      blurb:
        "Odds and ends — small experiments, prototypes, and one-off ideas that don't fit anywhere else.",
      projects: [
        {
          slug: "weekend-prototype",
          name: "Weekend Prototype",
          tagline: "A small idea, built fast",
          image: "",
          detailImage: "",
          description:
            "A placeholder for a quick experiment. Replace this with one of your own one-off builds.",
          link: "",
          skills: ["Prototype"],
          longDescription: [
            "This is a template entry for a random / one-off project. Edit it in src/config.ts under projectCategories.random.projects.",
            "Add as many entries as you like — each one automatically gets a tile here and its own detail page.",
          ],
          highlights: [
            "Edit me in src/config.ts",
          ],
        },
      ],
    },    
    proGames: {
      label: "Professional Games",
      blurb: "Production-ready game titles developed across studios, detailing systems engineering, mechanics, and core architectural contributions.",
      projects: [] // You can leave this empty for now and fill it with your data later!
    }
  },
};

// Convenience: every project flattened, tagged with its category key/label.
export type ProjectCategoryKey = keyof typeof siteConfig.projectCategories;

export const allProjects = (
  Object.keys(siteConfig.projectCategories) as ProjectCategoryKey[]
).flatMap((key) =>
  siteConfig.projectCategories[key].projects.map((project) => ({
    ...project,
    categoryKey: key,
    categoryLabel: siteConfig.projectCategories[key].label,
  }))
);
