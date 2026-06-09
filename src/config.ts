export const siteConfig = {
  name: "Shivanshu Chauhan",
  title: "Technical Artist | UI Technical Artist | Graphics Programmer",
  description:
    "Unity UI Systems, Rendering, Shaders, GPU-driven Systems and Tool Development",

  accentColor: "#00ffb3",

  social: {
    email: "shivanshuchauhan1998@gmail.com",
    linkedin: "https://www.linkedin.com/in/shivanshu-chauhan-89095b186",
    github: "https://github.com/ShaderTrix",
    artstation: "https://www.artstation.com/shivanshuchauhan/albums/6216110"
  },

  aboutMe:
    "Technical Artist with production experience developing Unity UI systems, rendering features, tools, and GPU-driven workflows for large-scale mobile games. I work at the intersection of art and engineering, building performant solutions for artists, designers, and players. My current interests include shader development, rendering systems, compute shaders, flow-field simulation, and graphics optimization.",

  skills: [
    "Unity",
    "C#",
    "HLSL",
    "Compute Shaders",
    "Rendering",
    "Technical Art",
    "UI Systems",
    "Performance Optimization",
    "GPU Profiling",
    "Flow Field Simulation",
    "C++",
    "Unreal Engine"
  ],

  projects: [
    {
      name: "GPU Pixelizer System",
      description:
        "GPU-driven voxel disintegration effect using MRT capture and compute-shader-based voxel accumulation. Designed for high visual fidelity while eliminating CPU-side bottlenecks.",
      link: "https://github.com/ShaderTrix/Unity_URPShaders",
      skills: ["Unity", "Compute Shaders", "HLSL", "Rendering"],
    },

    {
      name: "Flow Field Agent Movement System",
      description:
        "Large-scale agent steering system using flow fields and spatial partitioning. Includes debug visualization tools and scalable update strategies for real-time applications.",
      link: "https://github.com/ShaderTrix/Unity_SRPShaders",
      skills: ["Unity", "C#", "AI Systems", "Optimization"],
    },

    {
      name: "Shader & Rendering Experiments",
      description:
        "Collection of shader experiments including signed distance fields, procedural rendering techniques, custom effects, and rendering research.",
      link: "https://github.com/ShaderTrix",
      skills: ["HLSL", "Rendering", "Shaders"],
    },
  ],

  experience: [
    {
      company: "Gameberry Labs",
      title: "Technical Artist II",
      dateRange: "Jul 2024 - Present",
      bullets: [
        "Developed gameplay systems and technical solutions supporting products with over 6 million daily active users.",
        "Optimized CPU-GPU workloads to maintain stable frame times on low-end mobile devices.",
        "Bridged communication between engineering and art teams through tooling and technical workflows.",
        "Worked on rendering, performance optimization, UI systems, and gameplay features.",
      ],
    },

    {
      company: "Dirtcube Interactive",
      title: "Technical Artist",
      dateRange: "Mar 2021 - Jul 2024",
      bullets: [
        "Created and optimized assets for real-time environments.",
        "Implemented lighting and rendering workflows in Unity.",
        "Built shaders, visual effects, and technical art pipelines.",
        "Worked with Blender, Substance, Photoshop, and Unity to deliver production-ready content.",
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
        "Specialized interest in graphics programming and real-time rendering",
      ],
    },
  ],
};
