export const siteConfig = {
  name: "Shivanshu Chauhan",
  title: "Technical Artist II | UI Systems | Shaders | GPU Optimisation",
  description:
    "Unity UI Systems, Rendering, Shaders, GPU-driven Systems and Tool Development",

  accentColor: "#D99A32",   // hazard amber (Industrial Concrete theme, src/styles/global.css)

  // Rotating roles shown under the hero name (animated typewriter)
  roles: [
    "Full-time creative thinker",
    "Always a team player",
    "Professional Technical Artist",
    "Part-time gamer",
    "Aspiring Graphics Technical Artist",
    "Shader Artist",
  ],

  // CV / resume file (lives in /public)
  resumeUrl: "/Shivanshu_Chauhan_CV.pdf",

  social: {
    email: "shivanshuchauhan1998@gmail.com",
    linkedin: "https://www.linkedin.com/in/shivanshu-chauhan-89095b186",
    github: "https://github.com/ShaderTrix",
    artstation: "https://www.artstation.com/shivanshuchauhan/albums/6216110",
    youtube: "https://www.youtube.com/@shivanshuchauhan3032"
  },

  aboutMe:
    "Hey, I'm Shivanshu Chauhan — a Technical Artist who lives somewhere between art and engineering. I spend most of my time building shaders, rendering features, and tools that help artists and designers bring their ideas to life without fighting the engine to do it. I care a lot about making things look good while still running smoothly, especially on mobile, where every bit of performance counts. Outside of production work I'm usually sculpting, texturing, or tinkering with rendering tricks just for fun.",

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

  // Categorised tool / skill stack shown on the About page.
  // `icon` is a Simple Icons slug rendered as a logo; items without one
  // fall back to a clean text "monogram" card.
  toolStack: [
    {
      category: "Languages & Engines",
      items: [
        { name: "Unity", icon: "unity" },
        { name: "Unreal Engine", icon: "unrealengine" },
        { name: "C#", icon: "csharp" },
        { name: "C++", icon: "cplusplus" },
        { name: "Python", icon: "python" },
        { name: "HLSL" },
        { name: "GLSL" },
        { name: "MEL" },
      ],
    },
    {
      category: "Software I use",
      items: [
        { name: "Blender", icon: "blender" },
        { name: "Maya", icon: "autodeskmaya" },
        { name: "3ds Max", icon: "autodesk" },
        { name: "ZBrush" },
        { name: "Mudbox" },
        { name: "Substance" },
        { name: "Photoshop", icon: "adobephotoshop" },
        { name: "Marmoset" },
        { name: "V-Ray" },
        { name: "Arnold" },
        { name: "Spine2D", icon: "spine" },
        { name: "GitHub", icon: "github" },
      ],
    },
  ],

  experience: [
    {
      company: "Gameberry Labs",
      title: "Technical Artist II",
      dateRange: "Jul 2024 - Present",
      description:
        "I work on Sorry! World by Hasbro and Backgammon Friends Online, building the UI performance systems and GPU tooling that keep these titles running smoothly on low-end mobile hardware.",
      highlights: [
        "Designed and shipped three production UI performance systems now live in Sorry! World by Hasbro — occlusion culling, TextMeshPro instancing, and tiled image rendering — reducing UI draw calls to a single batch and recovering significant FPS on UI-heavy screens",
        "Owned the CPU-GPU performance budget across two live mobile titles, eliminating overdraw hotspots and redundant state changes to maintain stable 60fps on mid-range and low-end devices",
        "Built GPU-driven VFX using compute shaders, removing CPU instancing bottlenecks for high-density particle and destruction effects",
        "Developed custom Unity Editor tools — batch validators, atlas auditors, debug overlays, custom inspectors — to reduce iteration time between art and engineering",
      ],
    },

    {
      company: "Dirtcube Interactive",
      title: "3D Artist",
      dateRange: "Mar 2021 - Jul 2024",
      description:
        "I worked on Gamestarz, modeling and texturing 3D environments while picking up lighting, rigging, and rendering work in Unity along the way.",
      highlights: [
        "Created and optimised 3D models, textures, and materials for real-time Unity environments within strict polygon and texture budgets",
        "Implemented PBR lighting and rendering setups balancing visual quality against performance on Android and iOS targets",
        "Rigged and animated characters in Maya and Blender; managed 2D character pipelines using Spine2D",
        "Collaborated with engineering to resolve rendering artefacts and ensure asset compatibility across target devices",
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
          slug: "rendering-optimization",
          name: "UI Occlusion Culling System",
          tagline: "Stop drawing the UI you can't see",
          image: "/projects/ui-occlusion-culling.gif",
          detailImage: "",
          description:
            "Your UI has layers upon layers of fullscreen panels stacked on top of each other, and the bottom ones are still rendering for absolutely no reason. This system catches them red-handed and shuts them off.",
          link: "https://github.com/ShaderTrix/Unity_ShaderTrix_Public/tree/main/Assets/Scripts/UIOcclusionCullingOrtho",
          demoLink: "https://www.youtube.com/watch?v=X_14W7rgOC4&t=198s",
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
          usageNotes: [
            "Slap the TMPInstancingUtil component onto an empty UI GameObject — think of it as TextMeshPro's cooler sibling who showed up with its own UVs.",
            "Make a material from the modified TMP SDF shader and put it on that text. This is the only \"setup\" step, promise.",
            "Now use that exact same material on every other text too. Don't touch its settings between texts — seriously, just don't, that's the whole trick.",
            "Got a new font? That's the only time you need a new material. One font = one material, forever, for every styled text using it.",
            "Go nuts changing color, outline, underlay, dilate — whatever you want, per text, per instance — and watch it all still melt into a single draw call. Enjoy!",
          ],
          ndaProtected: true,
        },
        {
          slug: "ui-tiled-image",
          name: "UI Tiled Image",
          tagline: "One big image, sliced into atlas-friendly pieces, drawn as one quad",
          image: "/projects/tiled-image.png",
          detailImage: "",
          hideDetailBanner: true,
          description:
            "A custom UI Graphic + shader that lets a big image live in the sprite atlas as a grid of small, atlas-friendly pieces, while still rendering on screen as a single seamless image in one draw call.",
          link: "",
          skills: ["Unity UI", "Shaders", "Sprite Atlas", "C#", "Performance"],
          longDescription: [
            "Big UI images are annoying for sprite atlases — they either hog a huge chunk of atlas space or get rejected entirely if they don't fit. The fix here is to slice the source image into a grid of smaller sprites (Sprite Mode: Multiple), which pack into the atlas way more efficiently alongside everything else. The component reads that slice data straight off the sprite — grid size, cell size, and each tile's atlas UV region — with zero manual setup beyond hitting 'Force Resync Chunks'.",
            "On screen, it draws a single quad, not a grid of quads. A small custom shader does the trick: for every pixel it figures out which grid cell that point falls into, looks up that cell's atlas region, and remaps the UV to sample the right tile. End result: the image looks whole and seamless, but it's actually built from a bunch of small, atlas-friendly pieces — one material, one draw call.",
            "Live in production on Sorry! World by Hasbro, used to fit large UI art into the sprite atlas without blowing the budget or splitting it into multiple draw calls.",
          ],
          inlineImage: "/projects/tiled-image.png",
          usageNotes: [
            "Set the source image's Sprite Mode to Multiple — Unity needs to know it's allowed to be chopped up.",
            "Open the Sprite Editor and slice it into a grid — 5x5, 10x10, whatever size cells you like — then hit Apply.",
            "Make sure it actually gets packed into a sprite atlas. That's the entire point of this exercise, don't skip it.",
            "Drop the UI_TiledImage component onto an empty UI GameObject, point it at your sliced sprite, and smash the Resync Chunks button.",
          ],
          ndaProtected: true,
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
          link: "https://github.com/ShaderTrix/Unity_ShaderTrix_Public/tree/main/Assets/Compute%20Shader/PixelizerGun",
          demoLink: "https://www.youtube.com/watch?v=X_14W7rgOC4&t=4s",
          skills: ["Unity", "Compute Shaders", "HLSL", "Rendering"],
          longDescription: [
            "Basically: turn characters into cubes, on the GPU, in real time. Instead of voxelizing meshes the slow way, this captures the character on screen and rebuilds it as a grid of instanced cubes using compute shaders — so the cube count just scales with how big the character looks on screen. Free LOD, nice.",
            "When an enemy goes down, those cubes stop following the character and get shoved around by a little GPU physics pass instead, so they tumble and scatter like a disintegration effect. Whole thing stays on the GPU the entire time.",
          ],
        },
        {
          slug: "mass-spring-cloth",
          name: "GPU Mass-Spring Soft-Body & Cloth",
          tagline: "Thousands of springs solved on the GPU, in real time.",
          image: "/projects/CustomMassSpringPhysics.gif",
          detailImage: "",
          description:
            "A GPU compute-shader mass-spring system in Unity that simulates cloth and soft bodies — structural, shear, and bend springs solved in parallel, with collisions, wind, pinning, and grab interaction.",
          link: "",
          demoLink: "https://www.youtube.com/watch?v=X_14W7rgOC4&t=166s",
          skills: ["Unity", "Compute Shaders", "HLSL", "Physics", "RK4 Integration"],
          longDescription: [
            "Cloth as a network of point masses held together by springs — the classic mass-spring model, but the whole solve runs on the GPU. Every vertex becomes a spring node, and three kinds of springs hold the mesh together: structural (elastic) springs along the edges, shear springs across the diagonals to resist stretching, and bend springs that stop the fabric from folding in on itself. Each spring type has its own stiffness, so you can dial in anything from stiff leather to floppy silk.",
            "The forces get integrated with RK4 (fourth-order Runge-Kutta) rather than a plain Euler step — that's what keeps a stiff, high-tension cloth from exploding, letting the solver stay stable even with strong spring constants. A second compute pass resolves collisions against sphere and box colliders with configurable restitution and friction, so the cloth drapes, slides, and settles on scene geometry instead of clipping through it.",
            "On top of the core solve there's wind driven by noise for natural gusting, pinned nodes to anchor corners or seams, and a grab system that lets you reach in and yank the cloth around at runtime. The simulated points drive a SkinnedMeshRenderer through a generated bone hierarchy, so it renders like any other skinned mesh. Runs entirely in FixedUpdate on the GPU, scaling to thousands of springs without touching the CPU physics loop.",
          ],
          highlights: [
            "Structural, shear, and bend springs — each with independent stiffness",
            "RK4 integration for stability under high spring tension",
            "GPU collision pass against sphere and box colliders (restitution + friction)",
            "Noise-driven wind, pinned anchor nodes, and runtime grab interaction",
            "Drives a SkinnedMeshRenderer via a generated bone hierarchy",
          ],
        },
        {
          slug: "niagara-inter-emitter",
          name: "Niagara VFX — Inter-Emitter Force & Skeletal Mesh Sampling",
          tagline: "Particles reading a skeletal mesh, and particles pushing on other particles.",
          image: "/projects/inter-emitter-niagara.gif",
          detailImage: "",
          engine: "unreal",
          link: "",
          skills: ["Unreal Engine", "Niagara", "VFX", "Compute", "Skeletal Mesh"],
          description:
            "An Unreal Niagara system where particles sample a live skeletal mesh to drive their positions, and one emitter's particles exert custom force vectors onto another emitter's orbs through attribute readers.",
          longDescription: [
            "Two things going on here, both about particles talking to something outside themselves. First, skeletal mesh sampling: a primary emitter reads vertices straight off an animated skeletal mesh every frame and pins its particles to them, so the particle field follows the character's motion live — deforming, stretching, and settling exactly as the mesh animates rather than sitting on a static shape.",
            "Second, and the more interesting part, is inter-emitter communication. The primary particles don't just sit there — each one exposes a custom force vector, and a second emitter of orb particles reads those forces through Niagara's attribute readers, letting one particle system push, pull, and steer another. It's essentially a little force-field pipeline built between emitters, with no CPU round-trip.",
            "The result is a reactive, layered effect: a mesh-driven primary shape acting as a moving source of force, and a cloud of secondary orbs responding to it in real time. It's a good showcase of Niagara's compute logic and the attribute-reader plumbing that makes emitter-to-emitter communication possible.",
          ],
          highlights: [
            "Live skeletal-mesh vertex sampling drives primary particle positions",
            "Primary particles expose custom per-particle force vectors",
            "Secondary orb emitter reads those forces via Niagara attribute readers",
            "Emitter-to-emitter force pipeline running entirely in Niagara compute",
          ],
        },
        {
          slug: "niagara-sdf-gradient",
          name: "Niagara VFX — SDF Texture Gradient & Finite Differences",
          tagline: "Particles reading a distance field and riding its gradient along the isolines.",
          image: "/projects/sdf-gradient-niagara.gif",
          detailImage: "",
          engine: "unreal",
          link: "",
          skills: ["Unreal Engine", "Niagara", "VFX", "Scratch Module", "SDF"],
          description:
            "A custom Niagara scratch module that samples a 2D signed distance field texture, computes the local gradient with finite differences, and steers particles along the field's isolines.",
          longDescription: [
            "The whole effect rests on one idea: a signed distance field texture tells you, at every point, how far you are from a shape's edge. If you can read the direction that distance changes fastest — the gradient — you can push particles perpendicular to it and have them flow neatly along the shape's contours (its isolines) instead of drifting randomly.",
            "There's no gradient stored in the texture, so the scratch module computes it on the fly with finite differences: it samples the SDF a tiny step to the left and right for ∂x, up and down for ∂y, and the differences give a local gradient vector for that particle's position. Rotate that vector 90° and you have a tangent — a direction that follows the isoline rather than crossing it — which becomes the particle's steering force.",
            "All of it lives in a hand-written Niagara scratch module, so it's raw vector math running per particle on the GPU: texture sampling, finite-difference derivatives, and the calculus that turns a static distance field into live motion. A tidy proof of the advanced math and GPU data-sampling that scratch modules make possible.",
          ],
          highlights: [
            "Custom Niagara scratch module samples a 2D SDF texture per particle",
            "Local gradient (∂x, ∂y) computed on the fly via finite differences",
            "Gradient rotated to a tangent to steer particles along the isolines",
            "Pure per-particle vector math + GPU texture sampling in a scratch module",
          ],
        },
        {
          slug: "jump-flood-sdf",
          name: "GPU Jump Flood — SDF, Glow & Outlines",
          tagline: "Nearest-seed distance fields from any texture, in a handful of GPU passes.",
          image: "/projects/floodfill.png",
          detailImage: "",
          description:
            "A GPU compute-shader implementation of the Jump Flood Algorithm that turns any texture into a signed distance field and nearest-seed (Voronoi) map — the basis for glow, outline, and SDF effects.",
          link: "",
          skills: ["Unity", "Compute Shaders", "HLSL", "SDF", "Rendering"],
          longDescription: [
            "The Jump Flood Algorithm (JFA) answers one question for every pixel: 'which is the nearest filled pixel to me, and how far away is it?' — and it does it in roughly log₂(resolution) passes instead of flooding the image one ring at a time. That makes it fast enough to run every frame on the GPU, even on large textures.",
            "It starts by seeding: every opaque pixel (alpha above a cutoff) writes its own UV coordinate and colour into a buffer, packed cleverly into an RGBA-float texture so both position and colour survive in the channels. Then the flood: a ping-pong pass samples nine neighbours at a step width that halves each iteration — 128, 64, 32, … 1 — each pixel keeping whichever seed is closest. After the last pass, every pixel knows its nearest seed's UV and colour.",
            "A final pass converts that nearest-seed distance into the actual effect: a smoothstep falloff over the distance gives you a clean outline or a soft glow tinted by any colour, and the raw distance field itself is a proper SDF you can reuse for shadows, borders, or shape morphing. One texture in, a distance field out — no CPU work in the loop.",
          ],
          highlights: [
            "Jump Flood Algorithm in ~log₂(N) GPU passes instead of an O(N) flood fill",
            "Seeds pack UV + colour into an RGBA-float ping-pong buffer",
            "Outputs a reusable signed distance field from any input texture",
            "Drives glow, outline, and Voronoi effects with a tunable falloff + colour",
          ],
        },
        {
          slug: "gpu-rain-system",
          name: "Niagara VFX — GPU Rain Particles: Depth Occlusion & Wet-Edge Highlights",
          tagline: "Rain that knows what's indoors, what's exposed, and where the water drips.",
          image: "/projects/rainsystem_wip.gif",
          detailImage: "",
          engine: "unreal",
          link: "",
          skills: ["Unreal Engine", "Niagara", "VFX", "VR", "Screen-Space Effects"],
          description:
            "A GPU rain particle system with top-down depth-heightfield occlusion for dry indoor spots, exposed-normal wetness masking, a player-centric rain volume, edge dripping, and camera-lens water distortion — built with VR performance in mind.",
          longDescription: [
            "The core problem with cheap rain is that it falls through roofs. This system fixes that with a top-down depth pass: the scene is captured from above into a height field, and each raindrop checks that buffer to see whether something is above it. If there's a roof or ledge in the way, the drop gets culled — so overhangs, doorways, and indoor areas stay dry automatically, and the culling respects the rain's direction so slanted rain shadows fall where they should.",
            "Wetness is driven by geometry, not guesswork: surfaces are masked by how exposed their normals are to the sky, so upward-facing faces darken and glisten while sheltered undersides stay dry. The rain itself follows the player as a local volume — particles only ever simulate in a box around the camera, which keeps the count tiny and the whole thing cheap enough for VR, where you're paying for every frame twice.",
            "On top of the simulation sit the finishing touches: water beads and drips off exposed edges, and a camera-lens post-process adds subtle screen-space distortion, like rain hitting a visor. Between the depth-buffer reads, the normal-based masking, and the custom shader math for the drips and lens warp, it's a compact showcase of performance-minded, VR-friendly rendering architecture.",
          ],
          inlineImage: "/projects/rainsystem_module.png",
          highlights: [
            "Top-down depth height-field occlusion keeps indoor/overhang areas dry (with directional rain support)",
            "Exposed-normal wetness masking — sky-facing surfaces get wet, sheltered ones stay dry",
            "Player-centric local rain volume keeps particle counts low for VR",
            "Edge water dripping plus a camera-lens post-process distortion pass",
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
          link: "https://github.com/ShaderTrix/Unity_ShaderTrix_Public/tree/main/Assets/Compute%20Shader/FlowFieldPathfinding",
          demoLink: "https://www.youtube.com/watch?v=X_14W7rgOC4&t=41s",
          skills: ["Unity", "Compute Shaders", "HLSL", "Pathfinding", "GPU-Driven Rendering"],
          longDescription: [
            "Instead of A* per agent, the CPU walks the grid once toward the goal and bakes out a flow field — a direction to move in from every cell. Thousands of agents on the GPU just follow it, with a bit of flocking-style separation so they don't pile on top of each other. Throw in a couple of fun toys too: repel zones agents swerve away from, and spiral vortices that suck them in and fling them around.",
            "The fun part is collision: every agent raycasts against a GPU-side BVH of the level mesh to slide along walls, fall off ledges, and land on the ground — all inside the compute shader, no Rigidbodies involved. Rendering is GPU-driven as well, using instanced draws with vertex-animation textures for movement poses, LODs, and a Hi-Z occlusion pass so only the agents actually on screen get drawn.",
          ],
        },
        {
          slug: "pcg-forest",
          name: "PCG Data Asset Driven Forest",
          tagline: "Decoupling forest data from the graph that plants it",
          engine: "unreal",
          image: "/projects/PCGForest01.png",
          detailImage: "",
          description:
            "A procedural forest built with Unreal's PCG (Procedural Content Generation) framework, where every biome, density, and scatter rule lives in Data Assets instead of being hardcoded into the graph itself.",
          link: "",
          skills: ["Unreal Engine", "PCG Framework", "Data Assets", "Procedural Generation", "Blueprints"],
          longDescription: [
            "This one's about keeping procedural systems from turning into spaghetti. Unreal's PCG framework is great at generating content on a graph, but if every tweak to a forest's density, species mix, or scatter rules means digging back into the graph itself, that graph becomes a bottleneck fast — especially once designers want to iterate without touching nodes.",
            "The fix: pull all the tunable data out of the graph and into Primary Data Assets. Things like tree species, spawn density curves, slope/altitude constraints, and biome-specific scatter weights all live in standalone assets that the PCG graph reads from at generation time. The graph itself stays generic and reusable — it just asks 'what data asset am I working with right now?' and adapts accordingly.",
            "The payoff is that a designer can spin up a brand new biome — say, a denser pine forest versus a sparse dry scrubland — by duplicating a Data Asset and tweaking values in the editor, without opening the PCG graph at all. The graph doesn't care what forest it's building; it just executes the same procedural logic against whatever data it's handed. That separation is what makes the system scale past a single hand-tuned forest.",
          ],
          galleryImages: [
            "/projects/PCGForest02.png",
            "/projects/PCGForest03.png",
            "/projects/PCGForest04.png",
          ],
          highlights: [
            "Forest generation rules driven entirely by Data Assets, not hardcoded graph values",
            "PCG graph stays generic and reusable across any number of biomes",
            "New biomes/variants created by duplicating a Data Asset — zero graph edits needed",
            "Keeps designer-facing tuning decoupled from the underlying procedural logic",
          ],
        },
        {
          slug: "shader-experiments",
          name: "Shader SDF experiments",
          tagline: "SDFs, procedural rendering, research",
          image: "/projects/shape01.png",
          detailImage: "",
          description:
            "Collection of shader experiments including signed distance fields, procedural rendering, and custom effects.",
          link: "",
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
