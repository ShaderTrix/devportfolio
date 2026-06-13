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
      label: "Professional Project",
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
          name: "UI Occlusion Culling System",
          tagline: "Stop drawing the UI you can't see",
          image: "/projects/ui-occlusion-culling.gif",
          detailImage: "",
          description:
            "Your UI has layers upon layers of fullscreen panels stacked on top of each other, and the bottom ones are still rendering for absolutely no reason. This system catches them red-handed and shuts them off.",
          link: "",
          skills: ["Unity UI", "Jobs/Burst", "Spatial Partitioning", "C#", "Performance"],
          longDescription: [
            "Every frame, every visible UI image on the canvas gets dropped into a native quadtree — basically a lazy filing system that groups nearby things together so you don't have to compare everything against everything else. Then a Burst-compiled job goes through each element and asks one nosy little question: 'is something fully opaque sitting directly on top of you, completely blocking you from view?' If the answer is yes, that element gets told to stop rendering. No mesh, no draw call, nothing — it's basically put in time-out until it's needed again.",
            "Of course, not everything gets to play this game. Semi-transparent UI, masks, and anything wearing the 'IgnoreUICulling' tag get a free pass — they always render, no questions asked, because guessing wrong on those looks really bad really fast. The quadtree is also lazy in a good way: it only rebuilds when the UI hierarchy actually changes, so most frames it's just doing quick lookups instead of redoing all the work.",
            "Production tested on Sorry! World — and on real devices, this thing claws back a genuinely surprising 15-20 FPS on UI-heavy screens, depending on how stacked the screen is and what hardware it's running on. Turns out 'just stop drawing things nobody can see' is a pretty good optimization.",
          ],
        },
        {
          slug: "tmp-instancing",
          name: "UI TextMeshPro Instancing System",
          tagline: "Hundreds of uniquely styled UI texts, one draw call",
          image: "/projects/tmp-instanced.png",
          detailImage: "",
          hideDetailBanner: true,
          description:
            "A custom TextMeshPro component and SDF shader that lets hundreds of on-screen texts each have their own color, outline, and underlay — without breaking batching.",
          link: "",
          skills: ["Unity UI", "TextMeshPro", "Shaders", "C#", "Performance"],
          longDescription: [
            "Normally, every unique combination of text color, outline, underlay, or dilate on TextMeshPro means another material — and every extra material is another draw call. This component sidesteps that entirely: per-instance properties like greyscale, face dilate, outline color/thickness, and underlay color/dilate get baked straight into each character's mesh UVs and vertex colors at runtime, then read back out by a custom SDF shader. The result is dozens of differently styled texts sharing one material and batching into a single draw call.",
            "The system is live in production on Sorry! World by Hasbro, running hundreds of text instances on screen at once with no measurable performance loss.",
          ],
          inlineImage: "/projects/tmp-instanced-02.png",
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
          name: "GPU Flow-Field Crowd Pathfinding",
          tagline: "Thousands of agents, one flow field, zero per-agent pathfinding.",
          image: "/projects/flow-field.gif",
          detailImage: "",
          description:
            "A GPU-driven crowd system in Unity where thousands of agents follow a CPU-baked flow field and resolve their own collisions against a GPU-side BVH of the level.",
          link: "https://github.com/ShaderTrix/Unity_URPShaders/tree/main/Assets/Compute%20Shader/FlowFieldPathfinding",
          skills: ["Unity", "Compute Shaders", "HLSL", "Pathfinding", "GPU-Driven Rendering"],
          longDescription: [
            "Instead of A* per agent, the CPU walks the grid once toward the goal and bakes out a flow field — a direction to move in from every cell. Thousands of agents on the GPU just follow it, with a bit of flocking-style separation so they don't pile on top of each other. Throw in a couple of fun toys too: repel zones agents swerve away from, and spiral vortices that suck them in and fling them around.",
            "The fun part is collision: every agent raycasts against a GPU-side BVH of the level mesh to slide along walls, fall off ledges, and land on the ground — all inside the compute shader, no Rigidbodies involved. Rendering is GPU-driven as well, using instanced draws with vertex-animation textures for movement poses, LODs, and a Hi-Z occlusion pass so only the agents actually on screen get drawn.",
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
