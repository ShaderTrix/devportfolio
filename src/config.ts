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
    "Hey, I'm Shivanshu Chauhan — a Technical Artist working in Unreal Engine 5 and Unity. I spend most of my time building shaders, VFX, procedural tools and editor automation, and profiling what I build so it holds its frame budget. Performance is the part I'm best at. Right now most of my own work is in Unreal 5 — a Lumen scene I took from 22 fps to 43, a data-driven PCG forest tool with a custom C++ editor window, and a Nanite tessellation sand system. At work I own the CPU/GPU frame budget on a live mobile title. Outside of production work I'm usually sculpting, texturing, or tinkering with rendering tricks just for fun.",

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
      category: "Engines",
      items: [
        { name: "Unity", icon: "unity" },
        { name: "Unreal Engine", icon: "unrealengine" },
      ],
    },
    {
      category: "Languages",
      items: [
        { name: "C#", icon: "csharp" },
        { name: "C++", icon: "cplusplus" },
        { name: "Python", icon: "python" },
        { name: "MEL" },
      ],
    },
    {
      category: "Shaders",
      items: [
        { name: "HLSL" },
        { name: "GLSL" },
      ],
    },
    {
      category: "3D & DCC",
      items: [
        { name: "Blender", icon: "blender" },
        { name: "Maya", icon: "autodeskmaya" },
        { name: "3ds Max", icon: "autodesk" },
        { name: "ZBrush" },
        { name: "Mudbox" },
      ],
    },
    {
      category: "Texturing & Rendering",
      items: [
        { name: "Substance" },
        { name: "Marmoset" },
        { name: "V-Ray" },
        { name: "Arnold" },
      ],
    },
    {
      category: "2D & Tools",
      items: [
        { name: "Photoshop", icon: "adobephotoshop" },
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
        "I work on Sorry! World by Hasbro, where I own the CPU/GPU frame budget and build the shaders, VFX and editor tools that go into the game.",
      highlights: [
        "Keep the title live at 60 fps on low and mid-range Android and iOS. I set the art budgets and find the overdraw, state changes and draw call spikes before they ship.",
        "Built three rendering systems that are live in Sorry! World: quadtree occlusion culling, SDF text instancing and a tiled image shader. All three cut draw calls on the heaviest screens.",
        "Developed features and live-ops screens, handling their animations, shaders, VFX and audio. I also moved content onto Addressables and optimised the build size.",
        "Wrote the Unity editor tools the art team uses day to day: batch validators, atlas auditors, debug overlays, custom inspectors.",
      ],
    },

    {
      company: "Dirtcube Interactive",
      title: "3D Artist",
      dateRange: "Mar 2021 - Jul 2024",
      description:
        "I worked on Gamestarz, modelling and texturing 3D environments and handling the lighting, rigging and rendering setup in Unity.",
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
          image: "",   // preview comes from the YouTube clip (previewClip)
          detailImage: "",
          description:
            "Your UI has layers upon layers of fullscreen panels stacked on top of each other, and the bottom ones are still rendering for absolutely no reason. This system catches them red-handed and shuts them off.",
          link: "https://github.com/ShaderTrix/Unity_ShaderTrix_Public/tree/main/Assets/Scripts/UIOcclusionCullingOrtho",
          demoLink: "https://www.youtube.com/watch?v=X_14W7rgOC4&t=198s",
          previewClip: [198, 219],   // Techart list preview: loop this range (s) of the demo video
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
          image: "/projects/tmp-instanced.webp",
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
          image: "",   // preview comes from the YouTube clip (previewClip)
          detailImage: "",
          description:
            "A GPU-driven approach to reconstructing animated characters as dynamic voxel representations in Unity URP, using custom MRT render passes and compute shaders.",
          link: "https://github.com/ShaderTrix/Unity_ShaderTrix_Public/tree/main/Assets/Compute%20Shader/PixelizerGun",
          demoLink: "https://www.youtube.com/watch?v=X_14W7rgOC4&t=4s",
          previewClip: [4, 41],   // Techart list preview: loop this range (s) of the demo video
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
          image: "",   // preview comes from the YouTube clip (previewClip)
          detailImage: "",
          description:
            "A GPU compute-shader mass-spring system in Unity that simulates cloth and soft bodies — structural, shear, and bend springs solved in parallel, with collisions, wind, pinning, and grab interaction.",
          link: "",
          demoLink: "https://www.youtube.com/watch?v=X_14W7rgOC4&t=166s",
          previewClip: [166, 198],   // Techart list preview: loop this range (s) of the demo video
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
          slug: "sand-trail-system",
          name: "Sand System — Nanite Tessellation Material",
          tagline: "Anything that touches the sand leaves a real trail, and the dunes slowly fill it back in.",
          image: "",   // preview comes from the YouTube clip (previewClip)
          detailImage: "",
          engine: "unreal",
          description:
            "Deformable sand on a World Partition desert in UE 5.7: characters, enemies and physics props carve displaced trails with raised rims through Nanite tessellation, and the trails refill over time. One depth capture, two render targets and a C++ actor drive it, with Niagara wind and footstep FX tied in.",
          link: "",
          demoLink: "https://www.youtube.com/watch?v=KQElCqW_DWI&t=9s",
          previewClip: [9, 27],   // Techart list preview: loop this range (s) of the demo video
          skills: ["Unreal Engine", "Nanite Tessellation", "Render Targets", "C++", "Niagara"],
          longDescription: [
            "The target was Black Myth: Wukong–style sand: walk through it and you leave a real dent with a little berm of sand pushed up around it, not a decal. And it shouldn't only work for the player. Enemies, physics cubes, anything with geometry should carve it too, without any of them knowing the sand exists.",
            "So the trail is recorded from below. A C++ actor (ASandTrailCapture) follows the player and keeps an orthographic depth capture underneath them, looking up, with the landscape hidden. Whatever reaches down into the sand shows up in that capture, so there's no per-actor stamping code at all. Every frame an accumulation material folds the capture into a ping-pong render target that keeps the lowest contact height (R) and how long ago it was pressed (G), scrolling the history as the capture follows the player. The capture is snapped to whole texels so trails don't swim.",
            "The landscape material does the rest under Nanite tessellation: it compares the stored contact height with its own world height to get a press mask (blurred with a golden-angle disc), ring-samples around it for the rim, and displaces down into the press and up along the rim. The age channel refills old prints after a set time. One material parameter collection carries the capture centre, size, depth, rim and refill settings, shared by the C++, the materials and Niagara, so everything reads the same numbers.",
            "Around it sits the wind: Niagara streaks that find the highest dune crests near the player and blow along them, ambient wind, a footstep puff from a C++ AnimNotify that only fires in levels that have the sand actor (the locomotion anims are shared), and wind that bends around the character's legs using potential flow around a cylinder when they stand still. The material adds panning wind normals with a gust mask.",
          ],
          galleryImages: ["/projects/sand-trail-diagram.webp"],   // detail page only (inlineImage would also show as a list thumbnail)
          tables: [
            {
              title: "Problems and fixes",
              text: true,
              head: ["Problem", "Cause", "Fix"],
              rows: [
                ["Top-down ground capture came out black", "The landscape doesn't render in orthographic scene captures on this setup (ShowOnly with the landscape proxies failed too)", "Redesigned around one capture below the pawn looking up, storing absolute contact Z; the landscape material compares against its own world Z. No ground capture needed, which also halves the capture cost."],
                ["Trails broke at low altitude", "Unreal clamps emissive to ≥ 0 in MaterialTemplate.ush, so negative world Z was lost when writing the render target", "Allow Negative Emissive Color on the materials that write the render targets."],
                ["Spikes and noise in the displacement", "Implicit-mip Texture2DSample in a displacement Custom node gives wrong derivatives under Nanite", "Texture2DSampleLevel(…, 0) on the displacement path; mips only for shading."],
                ["Fins and sideways prints on slopes", "Non-uniform landscape scale (32, 32, 3.5) skewed the normal Nanite displaces along", "First a correction factor k = |S·n| / |S·S·n|. Final fix: re-scaled the landscape to a uniform 32 with Python tools that stitch the World Partition heightmap tiles and remap the heights, keeping the same dunes."],
                ["Trails jittered while moving", "The capture moved by sub-texel amounts", "Texel-snapped the capture and scrolled the history by the exact centre offset."],
                ["Refill looked wrong on slopes", "Height-based decay", "An age channel (G) for time-based refill."],
                ["Rims too weak", "Tessellation density limits fine rims", "Edge lift on the brush, a ring-sampled rim mask and smoothstep shaping. Niagara clump berms read as pebbles, so they were cut."],
                ["Holes in the tessellation on Mac", "Metal with a fine r.Nanite.DicingRate and large displacement", "DicingRate 2 on Mac; final renders on PC."],
                ["Broken normals in a Custom node", "BC5 normal maps aren't unpacked in Custom HLSL", "Manual unpack: xy·2 − 1, z = √(1 − dot(xy, xy))."],
                ["Footstep FX in every level", "The Niagara notify lived in shared animations", "A C++ AnimNotify asks the level's sand actor to spawn the puff, so the level owns the setting."],
                ["Leg-wind particles left behind", "Infinite-lifetime world-space particles survive Deactivate()", "DeactivateImmediate() on movement, reset on reactivation."],
              ],
            },
          ],
          codeTitle: "The math",
          codeBlocks: [
            {
              label: "Press mask: penetration into a band of SandDepth",
              code: "press = saturate((trailZ - (z + depth)) / (z - (z + depth)))",
            },
            {
              label: "Rim: max of the ring samples minus the blurred inside",
              code: "rim = smoothstep(0, 1, saturate(pNear - pIn))\ndisplacement = SandDepth * (1 - press) + RimHeight * rim",
            },
            {
              label: "History scroll (axes swapped: the capture looks up)",
              code: "prevUV = uv + (center - prevCenter) / captureSize",
            },
            {
              label: "Leg wind: potential flow around a cylinder of radius R",
              code: "u = U * (1 - R² (x² - y²) / r⁴)\nv = -2 U R² x y / r⁴",
            },
          ],
        },
        {
          slug: "scene-optimization",
          name: "Scene Optimization — GPU Time Cut by 49%",
          tagline: "Lumen on a MacBook at half the cost, shipped with four quality tiers.",
          image: "",   // preview comes from the YouTube clip (previewClip)
          detailImage: "",
          engine: "unreal",
          description:
            "A sci-fi corridor level in UE 5.7 optimized on an M3 Pro MacBook: hardware Lumen to tuned software Lumen, TSR to TAA, instanced Nanite geometry, fewer shadow casters and cheaper materials, plus baked Low/Medium tiers. Epic GPU time went from 43.9 ms to 22.2 ms.",
          link: "",
          demoLink: "https://www.youtube.com/watch?v=KQElCqW_DWI&t=27s",
          previewClip: [27, 48],   // Techart list preview: loop this range (s) of the demo video
          skills: ["Unreal Engine", "Lumen", "Profiling", "Nanite", "C++"],
          longDescription: [
            "The starting point was a modular sci-fi level running hardware Lumen, TSR, thousands of separate static meshes and shadows on nearly every light. On an M3 Pro MacBook that came out at 22 fps on Epic. The goal: keep Lumen's look on the high end, ship a version that runs well on the low end, and prove every change with numbers from a packaged build, not the editor.",
            "Each change was measured on its own, with ProfileGPU on the same frame and stat unit A/B toggles. The biggest wins: hardware to software Lumen with slower surface-cache updates, no mesh SDF tracing and traced reflections only on glossy surfaces (GI + reflections + scene lighting 18.9 → 9.8 ms); TAA instead of TSR (3.8 → 1.0 ms); dynamic shadows only on the seven key spotlights; refraction and two-sided materials cut back (translucency 4.0 → 1.3 ms). Placed meshes were converted to instanced, Nanite-enabled actors with an editor tool, taking draw calls from about 2,500 to 650, and draw and cull distances were set on props, decals and lights.",
            "The level ships with four tiers, switched live from a pause menu by a C++ quality manager: scalability level, console variables, a post-process volume and a tagged light set per tier. Low and Medium use baked lighting (Lightmass on Apple Silicon needed bUseEmbree off, and 471 mirrored instances needed a Python fix to bake on the right face); High and Epic use the tuned software Lumen. A rail-camera benchmark sequence records an FPS chart for each tier.",
            "Two Mac-only problems turned up along the way. Mouse-look in fullscreen stalled for 50–100 ms; Unreal Insights showed a render flush in Slate, and Instruments traced it to the window resize callback, so the build runs windowed. The first shot hitched because two Niagara systems recompiled every session; resaving them and pooling and pre-warming the impacts fixed it.",
          ],
          // tables on the detail page; `text: true` for prose cells that wrap
          tables: [
            {
              title: "Results",
              caption: "Packaged build, 1512×982, same 30 s rail flight. GPU ms per frame.",
              head: ["Tier", "Render %", "GPU before", "GPU after", "Saved", "FPS before → after"],
              rows: [
                ["Low", "60", "6.67", "5.55", "−17%", "117 → 120 (cap)"],
                ["Medium", "70", "13.16", "8.39", "−36%", "73 → 103"],
                ["High", "80", "26.13", "14.62", "−44%", "37 → 65"],
                ["Epic", "90", "43.87", "22.19", "−49%", "22 → 44"],
              ],
            },
          ],
          // full write-up with interactive charts, embedded on the detail page (+ a PDF of it)
          report: {
            html: "/projects/scene-optimization/report.html",
            pdf: "/projects/scene-optimization/report.pdf",
          },
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
          image: "",   // preview comes from the YouTube clip (previewClip)
          detailImage: "",
          description:
            "A GPU-driven crowd system in Unity where thousands of agents follow a CPU-baked flow field and resolve their own collisions against a GPU-side BVH of the level.",
          link: "https://github.com/ShaderTrix/Unity_ShaderTrix_Public/tree/main/Assets/Compute%20Shader/FlowFieldPathfinding",
          demoLink: "https://www.youtube.com/watch?v=X_14W7rgOC4&t=41s",
          previewClip: [41, 127],   // Techart list preview: loop this range (s) of the demo video
          skills: ["Unity", "Compute Shaders", "HLSL", "Pathfinding", "GPU-Driven Rendering"],
          longDescription: [
            "Instead of A* per agent, the CPU walks the grid once toward the goal and bakes out a flow field — a direction to move in from every cell. Thousands of agents on the GPU just follow it, with a bit of flocking-style separation so they don't pile on top of each other. Throw in a couple of fun toys too: repel zones agents swerve away from, and spiral vortices that suck them in and fling them around.",
            "The fun part is collision: every agent raycasts against a GPU-side BVH of the level mesh to slide along walls, fall off ledges, and land on the ground — all inside the compute shader, no Rigidbodies involved. Rendering is GPU-driven as well, using instanced draws with vertex-animation textures for movement poses, LODs, and a Hi-Z occlusion pass so only the agents actually on screen get drawn.",
          ],
        },
        {
          slug: "pcg-forest",
          name: "Procedural Forest — PCG & Forest Designer Tool",
          tagline: "One generic PCG graph, forests defined as data, and a C++ editor tool to design them live.",
          engine: "unreal",
          image: "",   // preview comes from the YouTube clip (previewClip)
          detailImage: "",
          description:
            "A PCG forest where every layer (trees, rocks, grass, flowers, logs) lives in a data asset instead of the graph, and a custom C++ editor window, the PCG Cinematic Forest Designer, lets artists build and tune those layers with the forest regenerating live. A river spline cuts a clean path through it.",
          link: "",
          demoLink: "https://www.youtube.com/watch?v=KQElCqW_DWI&t=48s",
          previewClip: [48, 72],   // Techart list preview: loop this range (s) of the demo video
          skills: ["Unreal Engine", "PCG Framework", "C++ / Slate", "Editor Tools", "Data Assets"],
          longDescription: [
            "PCG graphs turn into spaghetti fast when every forest is its own hand-tuned graph. Here the graph is generic and the forest is data: a Blueprint data asset holds an array of layers, each with its own meshes and weights, density, footprint and looseness, seed, scale, tilt and height-offset ranges, slope and noise culling, and how close it may get to the river. A new biome is a new data asset, not a new graph.",
            "The PCG graph reads the asset from its actor, filters out disabled layers, partitions them by index and runs a loop subgraph once per layer. Each iteration surface-samples the landscape with that layer's density and spacing, culls by spatial noise and slope, randomises the transforms, carves out the river spline, keeps only the points inside the layer's distance band from it, picks a mesh by weight and spawns it. Points from earlier layers are passed along to the next iteration.",
            "On top sits the PCG Cinematic Forest Designer, an editor tool written in C++ and Slate. It opens on any forest data asset (Tools menu, or right-click the asset), lists the layers with thumbnails and on/off toggles, and edits one layer at a time: mesh cards with weights shown as percentages, sliders for density, spacing and transform ranges, and terrain and river rules. Every edit is one undoable transaction written straight into the asset, and the forests using it regenerate live. Presets can be created, saved and swapped into the level from the same window.",
            "The fields are found by reflection, because the asset and its structs are Blueprint types that store members under generated names (Density_10_<GUID>). The tool matches them by their struct-editor names, so artists can keep editing the Blueprint struct without breaking it.",
          ],
          galleryImages: [
            "/projects/pcg-forest-designer.webp",
            "/projects/pcg-forest-loop.webp",
            "/projects/pcg-forest-subgraph.webp",
          ],
          tables: [
            {
              title: "Problems and fixes",
              text: true,
              head: ["Problem", "Cause", "Fix"],
              rows: [
                ["Inner mesh lists vanished when reading the layers", "PCG attributes can't hold nested arrays; extracting an array of structs drops the inner arrays and splits members into separate attributes", "Layers.Meshes goes into the loop as its own input and is filtered per iteration by the layer's Type, so meshes don't leak across layers."],
                ["Only the first layer generated", "Settings override pins take one data item (\"too many data items… only first used\")", "A Loop subgraph over Attribute Partition by $Index, one iteration per layer."],
                ["Partition kept grouping wrong", "Attribute Partition defaulted (and reverted) to @Last", "Set it explicitly to $Index."],
                ["Overrides said attribute 'None' not found", "Delete Attributes only takes plain names; selectors like TransformMin.Location silently keep nothing", "Copy Attributes with the selector as the source and the pin's property name as the target."],
                ["River cut in the wrong places", "Reading the water body's spline directly gave bad cuts, and spline edits from Blueprint code don't notify PCG", "A guide spline actor copies the river's points and tangents in world space, Get Spline Data uses Always Requery Actors, and the forest is force-regenerated after a sync. Extents Modifier set to Set, not Multiply."],
                ["Property 'Data' does not exist", "Get Actor Property reads from whichever actor owns the running PCG component; a stray PCG volume with the same graph had none", "Removed the stray volume; the graph only runs on the forest actor."],
              ],
            },
          ],
        },
        {
          slug: "mecha-scorpion",
          name: "Mecha Scorpion — Control Rig",
          tagline: "Eight legs, two gatlings, a stinger gun and pincers, all driven procedurally. No walk cycle.",
          image: "",   // preview comes from the YouTube clip (previewClip)
          detailImage: "",
          engine: "unreal",
          description:
            "A playable mech scorpion in UE 5.7, rigged in Blender and animated entirely by a procedural Control Rig: full-body IK plants the eight legs on the terrain as it walks, and the guns, tail and pincers aim and react to what the player does. A C++ pawn handles tank-style movement, aiming and the weapon FX.",
          link: "",
          demoLink: "https://www.youtube.com/watch?v=KQElCqW_DWI&t=72s",
          previewClip: [72, 84],   // Techart list preview: loop this range (s) of the demo video
          skills: ["Unreal Engine", "Control Rig", "Full Body IK", "C++", "Blender"],
          longDescription: [
            "The scorpion started as a hard-surface model, rigged in Blender with Python scripts: rigid skinning (each mesh piece follows one bone), eight four-bone legs, two back gatlings with yaw, pitch and barrel bones, a four-bone tail ending in a stinger gun, and two pincers. Nothing is keyframed. Every pose comes from the Control Rig at runtime.",
            "In Unreal the Control Rig does the walking. Procedural full-body IK keeps all eight feet planted on the uneven ground, steps them as the body moves, and lets the body settle over its legs, so it climbs and turns over the dunes without a single walk cycle. The same rig aims the back guns and the tail at the point under the crosshair, spins the gatling barrels while they fire, kicks the tail back when the stinger fires, and drives the pincer attack.",
            "A C++ pawn (AMechaScorpionCharacter) feeds the rig: smoothed tank steering (throttle, turn, strafe), the aim point from a trace along the camera arm (not the camera itself, so the firing shake doesn't jitter the guns), the firing state and the pincer attack's progress. It also runs the weapons: looping muzzle FX on both gatlings, laser sights traced from each gun's pitch bone to whatever they hit, the stinger shot with an eased recoil, and a subtle noise-based camera wobble while firing.",
          ],
        },
        {
          slug: "niagara-powers",
          name: "Niagara VFX — Smoke & Neon Powers",
          tagline: "Superpower effects for a third-person character, each with its own idle, dash and glide look.",
          image: "",   // preview comes from the YouTube clip (previewClip)
          detailImage: "",
          engine: "unreal",
          description:
            "A set of Niagara character powers in UE 5.7: smoke and neon, each with its own idle, dash and glide effects, switched on a third-person character from a power wheel and driven by the character's movement.",
          link: "",
          demoLink: "https://www.youtube.com/watch?v=KQElCqW_DWI&t=84s",
          previewClip: [84, 94],   // Techart list preview: loop this range (s) of the demo video
          skills: ["Unreal Engine", "Niagara", "VFX", "Materials", "Blueprints"],
          longDescription: [
            "Each power is a family of Niagara systems rather than one effect: a static version that hangs around the character while idle, a dash that streaks along the move, and a glide that trails behind in the air. Switching powers swaps the whole family, so the character reads differently in every state.",
            "Smoke is built from soft alpha-blended flipbook puffs and noise-driven trails that billow off the body and thin out over time. Neon goes the other way: additive glow, bubbles and bright ribbon trails that leave a light-painted afterimage of the dash. The materials are custom: additive and alpha-blended particle shaders, trail materials panning noise textures, and glow sprites.",
            "The character side is a Blueprint third-person setup with its own input mapping (dash, glide, fast sprint, wall run, absorb and four power slots), a power widget for picking the active power, and Mixamo fall and flying animations retargeted onto the mannequin with IK Retargeter.",
          ],
        },
        {
          slug: "material-instance-editor",
          name: "Editor Tool — Material Instance Editor",
          tagline: "Every instance of a material in one editable grid.",
          image: "",   // preview comes from the YouTube clip (previewClip)
          detailImage: "",
          engine: "unreal",
          description:
            "A C++/Slate editor tool that opens any material's whole instance family as a spreadsheet: one row per Material Instance, one column per parameter, and every cell editable in place.",
          link: "",
          demoLink: "https://www.youtube.com/watch?v=KQElCqW_DWI&t=94s",
          previewClip: [94, 98],   // Techart list preview: loop this range (s) of the demo video
          skills: ["Unreal Engine", "C++", "Slate", "Editor Tools", "Materials"],
          longDescription: [
            "Tweaking one value across forty Material Instances normally means opening forty editors. This tool opens the whole family at once: right-click a material or instance and pick Edit Instances (or open it from the Tools menu), and every instance that inherits from it is listed as a row, found through the asset registry's Parent tag rather than by loading every asset.",
            "The columns are the parent's parameters: scalars, vectors, textures and static switches. Editing a cell writes straight to that instance as an undoable transaction. Overridden values are tinted so you can see at a glance what each instance changes, any cell can be reset to the parent, and filters, an Overridden only view and a Whole Family toggle cut the grid down when a material has a lot of children. An unsaved-changes dot shows which instances still need saving.",
            "It lives in the project's Editor module as an engine subsystem that only exists in the editor, so the game build stays clean. The look is deliberately plain: standard editor buttons and muted type colours, so it feels like part of Unreal rather than a separate app.",
          ],
        },
        {
          slug: "level-mesh-instancer",
          name: "Editor Tool — Level Mesh Instancer",
          tagline: "Find the repeated static meshes in a level and turn them into ISM/HISM prefabs in one click.",
          image: "",   // preview comes from the YouTube clip (previewClip)
          detailImage: "",
          engine: "unreal",
          description:
            "A C++/Slate editor tool that scans a level for repeated static meshes and converts each group into an instanced (ISM or HISM) prefab Blueprint, placed over the originals without deleting them.",
          link: "",
          demoLink: "https://www.youtube.com/watch?v=KQElCqW_DWI&t=98s",
          previewClip: [98, 102],   // Techart list preview: loop this range (s) of the demo video
          skills: ["Unreal Engine", "C++", "Slate", "Editor Tools", "Instancing"],
          longDescription: [
            "Levels built by hand end up with hundreds of separate StaticMeshActors that are really the same few meshes, and each one costs its own draw call. Scan Level groups every plain StaticMeshActor by mesh and materials and shows the totals up front: distinct meshes, placed actors, how many are used only once, how many repeat, and how many actors could be instanced.",
            "Each group is a row with its instance count and a Repeated or Unique tag. Select highlights the actors it covers in the viewport. To ISM or To HISM creates a child Blueprint of a base Blueprint you pick (one with an ISM and/or HISM component, shown with green or red found/missing badges), stores every placement as an instance inside it, and drops it over the originals. The originals move to an _Instanced_Originals Outliner folder instead of being deleted, so you can hide the folder to compare and only remove them once you're happy.",
            "It grew out of the instancing step in the Scene Optimization project, where one-off conversion scripts took draw calls from about 2,500 to 650; this window replaced those scripts with something any artist can run on any level. Like the other tools it's editor-only C++ in the project's Editor module, with a How to use section built into the window.",
          ],
          galleryImages: ["/projects/level-mesh-instancer.webp"],
        },
        {
          slug: "flashbang-post-process",
          name: "Flashbang — Post-Process Material",
          tagline: "A white-out, then the moment of the bang burned into your eyes.",
          image: "/projects/flashbang-poster.webp",   // poster frame for the video
          video: "/projects/flashbang.mp4",   // self-hosted preview (not on YouTube), 1280 px, 30 fps, no audio
          detailImage: "",
          engine: "unreal",
          description:
            "A flashbang screen effect as one post-process material in UE 5.7: the screen whites out, then a frozen snapshot of the moment of the bang lingers as a colour-shifting afterimage over a wobbling, double-vision view of the live scene, fading back to normal.",
          link: "",
          skills: ["Unreal Engine", "Post Process", "Materials", "HLSL", "Render Targets"],
          longDescription: [
            "Real flashbangs don't just make the screen white. What you remember is the afterimage: the scene at the instant of the bang, burned in and hanging over everything for a few seconds after. So the effect is built around a snapshot. When the flashbang goes off, the frame is captured into a render target and the detonation time is written into a material parameter (it sits at −100 the rest of the time, so the effect is fully off).",
            "A Custom HLSL node does the timing and the afterimage. From the time since the bang it builds two fades: a short one for the white-out and a longer one for the afterimage, both scaled by a single Speed value. The captured frame is remapped and boosted so only its bright shapes survive, then tinted by a blue → green → red ramp that moves as it fades, with animated noise breaking it up, so it reads like a retinal burn rather than a static overlay.",
            "Underneath, the live scene is sampled twice through the post-process input with UVs drifting on sine and cosine of time, which gives the dazed, doubled vision while you recover. The white-out, the afterimage and the doubled scene are added together as the material's emissive, so the whole thing is one post-process material with no extra passes.",
          ],
          galleryImages: ["/projects/flashbang-material.webp"],
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
