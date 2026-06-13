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
          code: `for (int i = 0; i < vertexCount; i++)
{
    UV1[i] = new Vector4(m_OffsetX, m_OffsetY, m_OutlineThickness, m_FaceDilate);

    outlineUV[i] = (Vector4)ApplyGreyScale(m_OutlineColor, m_greyscale);

    underlayUV[i] = new Vector4(
        ApplyGreyScale(m_UnderlayColor, m_greyscale).r,
        ApplyGreyScale(m_UnderlayColor, m_greyscale).g,
        ApplyGreyScale(m_UnderlayColor, m_greyscale).b,
        m_UnderlayDilate);
}

subMesh.SetUVs(1, UV1);
subMesh.SetUVs(2, outlineUV);
subMesh.SetUVs(3, underlayUV);`,
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
          codeBlocks: [
            {
              label: "C# (Component + Editor)",
              code: `[RequireComponent(typeof(CanvasRenderer))]
public class UI_TiledImage : MaskableGraphic, ILayoutElement
{
    public Sprite sprite;
    public bool preserveAspect = false;

    [System.Serializable]
    public struct SpriteChunk
    {
        public Sprite sprite;
        public int col;
        public int row;
        public Vector4 uvRegion; // (offsetX, offsetY, sizeX, sizeY) in atlas UV space
    }

    [SerializeField] private List<SpriteChunk> _chunks = new List<SpriteChunk>();

    [SerializeField] private int _columns = 1;
    [SerializeField] private int _rows = 1;
    [SerializeField] private Vector2 _cellSize = Vector2.one; // pixel size of one slice
    [SerializeField] private Shader _tiledShader;
    private Vector4[] _regions;
    private const string TiledShaderName = "Unlit/UI_TiledImage";
    static readonly int ID_Regions = Shader.PropertyToID("_ChunkRegions");
    static readonly int ID_Columns = Shader.PropertyToID("_GridColumns");
    static readonly int ID_Rows = Shader.PropertyToID("_GridRows");
    static readonly int ID_Count = Shader.PropertyToID("_ChunkCount");

    private Material _matInstance;

    public override Texture mainTexture => sprite != null ? sprite.texture : s_WhiteTexture;

    protected override void OnEnable()
    {
        base.OnEnable();
        ResolveShader();
        UnityEngine.U2D.SpriteAtlasManager.atlasRegistered += OnAtlasRegistered;
        BuildRegionArray();
        SetMaterialDirty();
        SetVerticesDirty();
    }

    protected override void OnDisable()
    {
        UnityEngine.U2D.SpriteAtlasManager.atlasRegistered -= OnAtlasRegistered;
        base.OnDisable();
        if (_matInstance != null)
        {
            if (Application.isPlaying) Destroy(_matInstance); else DestroyImmediate(_matInstance);
            _matInstance = null;
        }
    }

    private void OnAtlasRegistered(UnityEngine.U2D.SpriteAtlas atlas)
    {
        BuildRegionArray();
        SetMaterialDirty();
    }

    public override Material GetModifiedMaterial(Material baseMaterial)
    {
        Material baseMat = base.GetModifiedMaterial(baseMaterial);
        if (baseMat == null) return null;

        Shader shader = ResolveShader();
        if (shader == null) return baseMat;

        if (_matInstance == null)
            _matInstance = new Material(shader) { name = "UI_TiledImage (Instance)" };
        else if (_matInstance.shader != shader)
            _matInstance.shader = shader;

        CopyStencilState(baseMat, _matInstance);
        ApplyToMaterial(_matInstance);
        return _matInstance;
    }

    private void ApplyToMaterial(Material m)
    {
        if (m == null || _regions == null || _regions.Length == 0) return;
        m.SetVectorArray(ID_Regions, _regions);
        m.SetInteger(ID_Columns, _columns);
        m.SetInteger(ID_Rows, _rows);
        m.SetInteger(ID_Count, _chunks.Count);
    }

    // Draws a single full-rect quad — the shader does the per-cell tiling
    protected override void OnPopulateMesh(VertexHelper vh)
    {
        vh.Clear();
        if (sprite == null || _chunks == null || _chunks.Count == 0) return;

        Rect r = GetDrawingRect(preserveAspect);
        if (r.width <= 0 || r.height <= 0) return;

        Color32 c = color;
        vh.AddVert(new Vector3(r.xMin, r.yMin), c, new Vector2(0f, 0f));
        vh.AddVert(new Vector3(r.xMin, r.yMax), c, new Vector2(0f, 1f));
        vh.AddVert(new Vector3(r.xMax, r.yMax), c, new Vector2(1f, 1f));
        vh.AddVert(new Vector3(r.xMax, r.yMin), c, new Vector2(1f, 0f));

        vh.AddTriangle(0, 1, 2);
        vh.AddTriangle(2, 3, 0);
    }

    // Reads the per-cell atlas UV regions straight off the sliced sprite
    private void BuildRegionArray()
    {
        if (_chunks == null || _chunks.Count == 0) { _regions = null; return; }

        int len = Mathf.Max(_columns * _rows, _chunks.Count);
        _regions = new Vector4[len];
        for (int i = 0; i < _chunks.Count; i++)
        {
            var ch = _chunks[i];

            Vector4 region = ch.uvRegion;
            if (ch.sprite != null)
            {
                Vector4 outer = UnityEngine.Sprites.DataUtility.GetOuterUV(ch.sprite);
                region = new Vector4(outer.x, outer.y, outer.z - outer.x, outer.w - outer.y);
            }

            int idx = ch.row * _columns + ch.col;
            if (idx >= 0 && idx < _regions.Length)
                _regions[idx] = region;
        }
    }

    // Re-derives grid size, cell size and chunk list from the sprite's slice data
    public void UpdateChunks()
    {
        if (sprite == null) { _chunks.Clear(); _regions = null; return; }
#if UNITY_EDITOR
        string path = AssetDatabase.GetAssetPath(sprite.texture);
        Object[] allAssets = AssetDatabase.LoadAllAssetsAtPath(path);
        if (allAssets == null || allAssets.Length <= 1) return;

        var sprites = allAssets.OfType<Sprite>().ToList();
        if (sprites.Count == 0) return;

        float texW = sprite.texture.width;
        float texH = sprite.texture.height;

        _cellSize = new Vector2(
            sprites.Min(s => s.rect.width),
            sprites.Min(s => s.rect.height));

        const float tol = 1f; // pixels
        _columns = CountDistinct(sprites.Select(s => s.rect.x), tol);
        _rows = CountDistinct(sprites.Select(s => s.rect.y), tol);

        _chunks.Clear();
        foreach (var s in sprites)
        {
            int col = Mathf.RoundToInt(s.rect.x / _cellSize.x);
            // Unity Y is bottom-up; grid rows are top-down so we flip.
            int row = Mathf.RoundToInt((texH - s.rect.y - s.rect.height) / _cellSize.y);

            Vector4 outer = UnityEngine.Sprites.DataUtility.GetOuterUV(s);
            Vector4 uvRegion = new Vector4(
                outer.x, outer.y,
                outer.z - outer.x, outer.w - outer.y);

            _chunks.Add(new SpriteChunk { sprite = s, col = col, row = row, uvRegion = uvRegion });
        }

        BuildRegionArray();
        EditorUtility.SetDirty(this);
#endif
    }

    public override void SetNativeSize()
    {
        if (sprite == null) return;
        rectTransform.sizeDelta = new Vector2(_cellSize.x * _columns, _cellSize.y * _rows);
        SetAllDirty();
    }
}

// --- Custom Editor ---
[CustomEditor(typeof(UI_TiledImage), true)]
[CanEditMultipleObjects]
public class UI_TiledImageEditor : GraphicEditor
{
    SerializedProperty _sprite, _preserveAspect, _maskable, _tiledShader;
    SerializedProperty _columns, _rows, _cellSize;

    protected override void OnEnable()
    {
        base.OnEnable();
        _sprite         = serializedObject.FindProperty("sprite");
        _preserveAspect = serializedObject.FindProperty("preserveAspect");
        _maskable       = serializedObject.FindProperty("m_Maskable");
        _tiledShader    = serializedObject.FindProperty("_tiledShader");

        _columns  = serializedObject.FindProperty("_columns");
        _rows     = serializedObject.FindProperty("_rows");
        _cellSize = serializedObject.FindProperty("_cellSize");
    }

    public override void OnInspectorGUI()
    {
        serializedObject.Update();

        EditorGUI.BeginChangeCheck();
        EditorGUILayout.PropertyField(_sprite);
        bool spriteChanged = EditorGUI.EndChangeCheck();

        AppearanceControlsGUI();
        RaycastControlsGUI();
        EditorGUILayout.PropertyField(_maskable);
        EditorGUILayout.PropertyField(_preserveAspect);
        EditorGUILayout.PropertyField(_tiledShader, new GUIContent("Tiled Shader"));

        // Read-only, auto-derived grid/cell info for quick sanity checks
        using (new EditorGUI.DisabledScope(true))
        {
            EditorGUILayout.LabelField("Grid",
                $"{_columns.intValue} x {_rows.intValue}  ({_columns.intValue * _rows.intValue} cells)");
            EditorGUILayout.LabelField("Cell Size",
                $"{_cellSize.vector2Value.x} x {_cellSize.vector2Value.y} px");
        }

        serializedObject.ApplyModifiedProperties();

        // Re-derive immediately when the sprite is swapped in the inspector
        if (spriteChanged)
        {
            foreach (var t in targets)
            {
                var ci = (UI_TiledImage)t;
                ci.UpdateChunks();
                ci.SetAllDirty();
            }
            serializedObject.Update();
        }

        if (GUILayout.Button("Force Resync Chunks"))
        {
            AssetDatabase.Refresh();
            foreach (var t in targets)
            {
                var ci = (UI_TiledImage)t;
                ci.UpdateChunks();
                ci.SetAllDirty();
                EditorUtility.SetDirty(ci);
            }
            AssetDatabase.SaveAssets();
        }

        if (GUILayout.Button("Set Native Size"))
        {
            foreach (var t in targets) ((UI_TiledImage)t).SetNativeSize();
        }
    }
}`,
            },
            {
              label: "Shader",
              code: `Shader "Unlit/UI_TiledImage"
{
    Properties
    {
        [PerRendererData]_MainTex ("Texture", 2D) = "white" {}

        _StencilComp ("Stencil Comparison", Float) = 8
        _Stencil ("Stencil ID", Float) = 0
        _StencilOp ("Stencil Operation", Float) = 0
        _StencilWriteMask ("Stencil Write Mask", Float) = 255
        _StencilReadMask ("Stencil Read Mask", Float) = 255
        _ColorMask ("Color Mask", Float) = 15
        [Toggle(UNITY_UI_ALPHACLIP)] _UseUIAlphaClip ("Use Alpha Clip", Float) = 0
    }
    SubShader
    {
        Tags{"RenderType" = "Transparent" "Queue" = "Transparent"}
        Stencil
        {
            Ref [_Stencil]
            Comp [_StencilComp]
            Pass [_StencilOp]
            ReadMask [_StencilReadMask]
            WriteMask [_StencilWriteMask]
        }
        ColorMask [_ColorMask]
        Cull Off ZWrite Off Blend SrcAlpha OneMinusSrcAlpha
        Pass
        {
            CGPROGRAM
            #pragma vertex vert
            #pragma fragment frag

            #pragma multi_compile DUMMY PIXELSNAP_ON
            #pragma multi_compile __ UNITY_UI_CLIP_RECT
            #pragma multi_compile __ UNITY_UI_ALPHACLIP

            #include "UnityUI.cginc"
            #include "UnityCG.cginc"

            float4 _ClipRect;

            struct appdata
            {
                float4 vertex : POSITION;
                float2 uv : TEXCOORD0;
                float4 color : COLOR;
            };

            struct v2f
            {
                float4 vertex : SV_POSITION;
                float2 uv : TEXCOORD0;
                float4 worldPosition : TEXCOORD1;
                float4 color : COLOR;
            };

            sampler2D _MainTex;
            float4 _MainTex_ST;
            float4 _ChunkRegions[512];   // (offsetX, offsetY, sizeX, sizeY)
            int _GridColumns, _GridRows, _ChunkCount;

            v2f vert (appdata v)
            {
                v2f o;
                o.vertex = UnityObjectToClipPos(v.vertex);
                o.uv = v.uv;
                o.worldPosition = v.vertex;
                o.color = v.color;
                return o;
            }

            fixed4 frag (v2f i) : SV_Target
            {
                // Which grid cell does this pixel fall into?
                int cellX = (int)floor(i.uv.x * _GridColumns);
                int cellY = (int)floor((1.0 - i.uv.y) * _GridRows);

                cellX = clamp(cellX, 0, _GridColumns - 1);
                cellY = clamp(cellY, 0, _GridRows - 1);

                int cellOffset = cellY * _GridColumns + cellX;
                float4 region = _ChunkRegions[cellOffset]; // (offsetX, offsetY, sizeX, sizeY)

                // Remap this cell's local UV into that chunk's atlas region
                float2 localUV = frac(float2(i.uv.x * _GridColumns, i.uv.y * _GridRows));
                float2 atlasUV = region.xy + localUV * region.zw;

                float4 col = tex2D(_MainTex, atlasUV) * i.color;

                #ifdef UNITY_UI_CLIP_RECT
                    col.a *= UnityGet2DClipping(i.worldPosition.xy, _ClipRect);
                #endif
                #ifdef UNITY_UI_ALPHACLIP
                    clip (col.a - 0.001);
                #endif
                return col;
            }
            ENDCG
        }
    }
}`,
            },
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
