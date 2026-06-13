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
          usageNotes: [
            "Slap the TMPInstancingUtil component onto an empty UI GameObject — think of it as TextMeshPro's cooler sibling who showed up with its own UVs.",
            "Make a material from the modified TMP SDF shader and put it on that text. This is the only \"setup\" step, promise.",
            "Now use that exact same material on every other text too. Don't touch its settings between texts — seriously, just don't, that's the whole trick.",
            "Got a new font? That's the only time you need a new material. One font = one material, forever, for every styled text using it.",
            "Go nuts changing color, outline, underlay, dilate — whatever you want, per text, per instance — and watch it all still melt into a single draw call. Enjoy!",
          ],
          codeBlocks: [
            {
              label: "C# (Component + Editor)",
              code: `[DisallowMultipleComponent]
public class TMPInstancingUtil : BaseTextMeshProUGUI, ITextPreprocessor
{
    public string oldFontMaterialName; // Just for reference
    [Range(0, 1)] public float m_greyscale = 0.0f;
    [Range(-1, 1)] public float m_FaceDilate = 0.0f;
    [ColorUsage(true, false)] public Color m_OutlineColor = Color.white;
    [Range(0f, 1)] public float m_OutlineThickness = 0.0f;
    [ColorUsage(true, false)] public Color m_UnderlayColor = Color.white;
    [Range(-1, 1)] public float m_OffsetX = 0.0f;
    [Range(-1, 1f)] public float m_OffsetY = 0.0f;
    [Range(-1, 1)] public float m_UnderlayDilate = 0.0f;
    [HideInInspector][Range(0, 1)] public float m_UnderlaySoftness = 0.0f;

    private List<Vector2> originalUVs01 = new List<Vector2>();
    private List<Vector4> UV1 = new List<Vector4>();
    private List<Vector4> outlineUV = new List<Vector4>();
    private List<Vector4> underlayUV = new List<Vector4>();
    private Vector3 lastLossyScale;
    private static Vector3 unity_ColorSpaceLuminance = new Vector3(0.2f, 0.707f, 0.071f);
    private Color cachedColor;

    protected override void Awake()
    {
        base.Awake();
        cachedColor = color;
    }

    public override void Rebuild(CanvasUpdate update)
    {
        if (this == null) return;
        if (mesh && !string.IsNullOrEmpty(text)) ForceMeshUpdate();
        UpdateMaterial();
        base.Rebuild(update);
    }

    private void LateUpdate()
    {
        if (transform.lossyScale != lastLossyScale)
        {
            lastLossyScale = transform.lossyScale;
            if (mesh && !string.IsNullOrEmpty(text)) ForceMeshUpdate();
        }
    }

    public override void ForceMeshUpdate(bool ignoreActiveState = false, bool forceTextReparsing = false)
    {
        base.ForceMeshUpdate(ignoreActiveState, forceTextReparsing);

        if (mesh == null || string.IsNullOrEmpty(text))
            return;

        ApplyVertexColors(mesh);
        ModifyUV(mesh);
    }

    private bool SubmeshHasVisibleChars(int materialIndex)
    {
        if (textInfo == null || textInfo.characterInfo == null) return false;

        for (int i = 0; i < textInfo.characterCount; i++)
        {
            var charInfo = textInfo.characterInfo[i];
            if (charInfo.isVisible && charInfo.materialReferenceIndex == materialIndex)
                return true;
        }

        return false;
    }

    private void ApplyVertexColors(Mesh mesh)
    {
        if (textInfo == null || textInfo.characterCount == 0) return;

        Color32[] vertexColors = mesh.colors32;
        if (vertexColors == null || vertexColors.Length == 0) return;

        for (int i = 0; i < textInfo.characterCount; i++)
        {
            var charInfo = textInfo.characterInfo[i];
            if (!charInfo.isVisible) continue;

            int materialIndex = charInfo.materialReferenceIndex;
            int vertexIndex = charInfo.vertexIndex;

            var colors = textInfo.meshInfo[materialIndex].colors32;
            if (vertexIndex + 3 >= colors.Length) continue;

            for (int j = 0; j < 4; j++)
            {
                Color32 original = colors[vertexIndex + j];
                colors[vertexIndex + j] = ApplyGreyScale(original, m_greyscale);
            }
        }

        UpdateVertexData(TMP_VertexDataUpdateFlags.Colors32);
    }

    // Bakes per-instance color/outline/underlay properties into UV1/UV2/UV3
    private void ModifyUV(Mesh mesh)
    {
        if (string.IsNullOrEmpty(text) || textInfo == null || textInfo.meshInfo == null)
            return;

        int subMeshCount = textInfo.meshInfo.Length;

        for (int sm = 0; sm < subMeshCount; sm++)
        {
            TMP_MeshInfo meshInfo = textInfo.meshInfo[sm];
            int vertexCount = meshInfo.mesh.vertexCount;

            if (!SubmeshHasVisibleChars(sm))
            {
                meshInfo.Clear();
                UpdateGeometry(meshInfo.mesh, sm);
                continue;
            }

            Mesh subMesh = meshInfo.mesh;
            subMesh.GetUVs(1, originalUVs01);

            EnsureListCapacity(originalUVs01, vertexCount);
            EnsureListCapacity(UV1, vertexCount);
            EnsureListCapacity(outlineUV, vertexCount);
            EnsureListCapacity(underlayUV, vertexCount);

            for (int i = 0; i < vertexCount; i++)
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
            subMesh.SetUVs(3, underlayUV);
            subMesh.UploadMeshData(false);

            UpdateGeometry(subMesh, sm);
        }
    }

    private Color ApplyGreyScale(Color col, float t)
    {
        float grey = Vector3.Dot(new Vector3(col.r, col.g, col.b), unity_ColorSpaceLuminance);
        return Color.Lerp(col, new Color(grey, grey, grey, col.a), t);
    }

    private void EnsureListCapacity<T>(List<T> list, int requiredCount)
    {
        while (list.Count < requiredCount)
            list.Add(default);
        if (list.Count > requiredCount)
            list.RemoveRange(requiredCount, list.Count - requiredCount);
    }
}

// --- Custom Editor ---
#if UNITY_EDITOR
[CustomEditor(typeof(TMPInstancingUtil), true), CanEditMultipleObjects]
public class TMPInstancingEditor : TMP_EditorPanelUI
{
    private SerializedProperty greyscale;
    private SerializedProperty faceDilate;
    private SerializedProperty outlineColor;
    private SerializedProperty outlineThickness;
    private SerializedProperty underlayColor;
    private SerializedProperty offsetX;
    private SerializedProperty offsetY;
    private SerializedProperty underlayDialate;

    private SerializedProperty preserveNumbers;
    private SerializedProperty farsi;
    private SerializedProperty fixTags;
    private SerializedProperty isArabic;

    private GUIStyle propertiesTitle;
    private bool rtlFoldout = true;

    protected override void OnEnable()
    {
        base.OnEnable();

        greyscale = serializedObject.FindProperty("m_greyscale");
        faceDilate = serializedObject.FindProperty("m_FaceDilate");
        outlineColor = serializedObject.FindProperty("m_OutlineColor");
        outlineThickness = serializedObject.FindProperty("m_OutlineThickness");
        underlayColor = serializedObject.FindProperty("m_UnderlayColor");
        offsetX = serializedObject.FindProperty("m_OffsetX");
        offsetY = serializedObject.FindProperty("m_OffsetY");
        underlayDialate = serializedObject.FindProperty("m_UnderlayDilate");

        preserveNumbers = serializedObject.FindProperty("preserveNumbers");
        farsi = serializedObject.FindProperty("farsi");
        fixTags = serializedObject.FindProperty("fixTags");
        isArabic = serializedObject.FindProperty("isArabic");

        propertiesTitle = new GUIStyle(EditorStyles.boldLabel);
        propertiesTitle.alignment = TextAnchor.MiddleCenter;
        propertiesTitle.normal.textColor = Color.cyan;
    }

    public override void OnInspectorGUI()
    {
        serializedObject.Update();

        base.OnInspectorGUI();

        EditorGUILayout.Space();

        DrawInstancingBlock();
        DrawRTLBlock();

        serializedObject.ApplyModifiedProperties();
    }

    private void DrawInstancingBlock()
    {
        EditorGUILayout.BeginVertical(EditorStyles.helpBox);

        EditorGUILayout.LabelField("Instanced Properties", propertiesTitle);
        EditorGUILayout.Space(4);

        EditorGUILayout.PropertyField(greyscale);
        EditorGUILayout.PropertyField(faceDilate);
        EditorGUILayout.PropertyField(outlineColor);
        EditorGUILayout.PropertyField(outlineThickness);
        EditorGUILayout.PropertyField(underlayColor);
        EditorGUILayout.PropertyField(offsetX);
        EditorGUILayout.PropertyField(offsetY);
        EditorGUILayout.PropertyField(underlayDialate);

        EditorGUILayout.EndVertical();
        EditorGUILayout.Space(10);
    }

    private void DrawRTLBlock()
    {
        rtlFoldout = EditorGUILayout.Foldout(rtlFoldout, "RTL Settings", true);

        if (!rtlFoldout) return;

        EditorGUILayout.BeginVertical(EditorStyles.helpBox);

        EditorGUI.BeginChangeCheck();

        EditorGUILayout.PropertyField(farsi);
        EditorGUILayout.PropertyField(isArabic);
        EditorGUILayout.PropertyField(preserveNumbers);

        var tmp = target as TMP_Text;
        if (tmp != null && tmp.richText)
        {
            EditorGUILayout.PropertyField(fixTags);
        }

        if (GUILayout.Button("Re-Fix Text"))
        {
            ForceTextRefresh();
        }

        if (EditorGUI.EndChangeCheck())
        {
            ForceTextRefresh();
        }

        EditorGUILayout.EndVertical();
    }

    private void ForceTextRefresh()
    {
        foreach (var t in targets)
        {
            TMP_Text tmp = t as TMP_Text;
            if (tmp == null) continue;

            tmp.ForceMeshUpdate();
            tmp.SetVerticesDirty();
            tmp.SetLayoutDirty();

            EditorUtility.SetDirty(tmp);
        }
    }
}
#endif`,
            },
            {
              label: "Shader",
              code: `Shader "TextMeshPro/Distance Field_Instancing" {

Properties {
	_FaceTex			("Face Texture", 2D) = "white" {}
	_FaceUVSpeedX		("Face UV Speed X", Range(-5, 5)) = 0.0
	_FaceUVSpeedY		("Face UV Speed Y", Range(-5, 5)) = 0.0
	_FaceColor		    ("Face Color", Color) = (1,1,1,1)
	_FaceDilate			("Face Dilate", Range(-1,1)) = 0

	_OutlineColor	    ("Outline Color", Color) = (0,0,0,1)
	_OutlineTex			("Outline Texture", 2D) = "white" {}
	_OutlineUVSpeedX	("Outline UV Speed X", Range(-5, 5)) = 0.0
	_OutlineUVSpeedY	("Outline UV Speed Y", Range(-5, 5)) = 0.0
	_OutlineWidth		("Outline Thickness", Range(0, 1)) = 0
	_OutlineSoftness	("Outline Softness", Range(0,1)) = 0

	_Bevel				("Bevel", Range(0,1)) = 0.5
	_BevelOffset		("Bevel Offset", Range(-0.5,0.5)) = 0
	_BevelWidth			("Bevel Width", Range(-.5,0.5)) = 0
	_BevelClamp			("Bevel Clamp", Range(0,1)) = 0
	_BevelRoundness		("Bevel Roundness", Range(0,1)) = 0

	_LightAngle			("Light Angle", Range(0.0, 6.2831853)) = 3.1416
	_SpecularColor	    ("Specular", Color) = (1,1,1,1)
	_SpecularPower		("Specular", Range(0,4)) = 2.0
	_Reflectivity		("Reflectivity", Range(5.0,15.0)) = 10
	_Diffuse			("Diffuse", Range(0,1)) = 0.5
	_Ambient			("Ambient", Range(1,0)) = 0.5

	_BumpMap 			("Normal map", 2D) = "bump" {}
	_BumpOutline		("Bump Outline", Range(0,1)) = 0
	_BumpFace			("Bump Face", Range(0,1)) = 0

	_ReflectFaceColor	("Reflection Color", Color) = (0,0,0,1)
	_ReflectOutlineColor("Reflection Color", Color) = (0,0,0,1)
	_Cube 				("Reflection Cubemap", Cube) = "black" { /* TexGen CubeReflect */ }
	_EnvMatrixRotation	("Texture Rotation", vector) = (0, 0, 0, 0)


	_UnderlayColor	    ("Border Color", Color) = (0,0,0, 0.5)
	_UnderlayOffsetX	("Border OffsetX", Range(-1,1)) = 0
	_UnderlayOffsetY	("Border OffsetY", Range(-1,1)) = 0
	_UnderlayDilate		("Border Dilate", Range(-1,1)) = 0
	_UnderlaySoftness	("Border Softness", Range(0,1)) = 0

	_GlowColor		    ("Color", Color) = (0, 1, 0, 0.5)
	_GlowOffset			("Offset", Range(-1,1)) = 0
	_GlowInner			("Inner", Range(0,1)) = 0.05
	_GlowOuter			("Outer", Range(0,1)) = 0.05
	_GlowPower			("Falloff", Range(1, 0)) = 0.75

	_WeightNormal		("Weight Normal", float) = 0
	_WeightBold			("Weight Bold", float) = 0.5

	_ShaderFlags		("Flags", float) = 0
	_ScaleRatioA		("Scale RatioA", float) = 1
	_ScaleRatioB		("Scale RatioB", float) = 1
	_ScaleRatioC		("Scale RatioC", float) = 1

	_MainTex			("Font Atlas", 2D) = "white" {}
	_TextureWidth		("Texture Width", float) = 512
	_TextureHeight		("Texture Height", float) = 512
	_GradientScale		("Gradient Scale", float) = 5.0
	_ScaleX				("Scale X", float) = 1.0
	_ScaleY				("Scale Y", float) = 1.0
	_PerspectiveFilter	("Perspective Correction", Range(0, 1)) = 0.875
	_Sharpness			("Sharpness", Range(-1,1)) = 0

	_VertexOffsetX		("Vertex OffsetX", float) = 0
	_VertexOffsetY		("Vertex OffsetY", float) = 0

	_MaskCoord			("Mask Coordinates", vector) = (0, 0, 32767, 32767)
	_ClipRect			("Clip Rect", vector) = (-32767, -32767, 32767, 32767)
	_MaskSoftnessX		("Mask SoftnessX", float) = 0
	_MaskSoftnessY		("Mask SoftnessY", float) = 0

	_StencilComp		("Stencil Comparison", Float) = 8
	_Stencil			("Stencil ID", Float) = 0
	_StencilOp			("Stencil Operation", Float) = 0
	_StencilWriteMask	("Stencil Write Mask", Float) = 255
	_StencilReadMask	("Stencil Read Mask", Float) = 255

	_CullMode			("Cull Mode", Float) = 0
	_ColorMask			("Color Mask", Float) = 15
}

SubShader {

	Tags
	{
		"Queue"="Transparent"
		"IgnoreProjector"="True"
		"RenderType"="Transparent"
	}

	Stencil
	{
		Ref [_Stencil]
		Comp [_StencilComp]
		Pass [_StencilOp]
		ReadMask [_StencilReadMask]
		WriteMask [_StencilWriteMask]
	}

	Cull [_CullMode]
	ZWrite Off
	Lighting Off
	Fog { Mode Off }
	ZTest [unity_GUIZTestMode]
	Blend One OneMinusSrcAlpha
	ColorMask [_ColorMask]

	Pass {
		CGPROGRAM
		#pragma target 3.0
		#pragma vertex VertShader
		#pragma fragment PixShader
		#pragma shader_feature __ BEVEL_ON
		#pragma shader_feature __ UNDERLAY_ON UNDERLAY_INNER
		#pragma shader_feature __ GLOW_ON

		#pragma multi_compile __ UNITY_UI_CLIP_RECT
		#pragma multi_compile __ UNITY_UI_ALPHACLIP

		#include "UnityCG.cginc"
		#include "UnityUI.cginc"
		#include "TMPro_Properties.cginc"
		#include "TMPro.cginc"

		struct vertex_t
		{
			UNITY_VERTEX_INPUT_INSTANCE_ID
			float4	position		: POSITION;
			float3	normal			: NORMAL;
			fixed4	color			: COLOR;
			float4	texcoord0		: TEXCOORD0;
			float4	texcoord1		: TEXCOORD1;
			float4 myCol : TEXCOORD2;   // per-instance outline color (baked from UV2)
			float4 myCol2 : TEXCOORD3;  // per-instance underlay color + dilate (baked from UV3)
		};

		struct pixel_t
		{
			UNITY_VERTEX_INPUT_INSTANCE_ID
			UNITY_VERTEX_OUTPUT_STEREO
			float4	position		: SV_POSITION;
			fixed4	color			: COLOR;
			float2	atlas			: TEXCOORD0;		// Atlas
			float4	param			: TEXCOORD1;		// alphaClip, scale, bias, weight
			float4	mask			: TEXCOORD2;		// Position in object space(xy), pixel Size(zw)
			float3	viewDir			: TEXCOORD3;

		    #if (UNDERLAY_ON || UNDERLAY_INNER)
			float4	texcoord2		: TEXCOORD4;		// u,v, scale, bias
			fixed4	underlayColor	: COLOR1;
		    #endif

		    float4 textures			: TEXCOORD5;
			float4 myCol : TEXCOORD6;
			float4 myCol2 : TEXCOORD7;
			float4 myCol3 : TEXCOORD8;
		};

		// Used by Unity internally to handle Texture Tiling and Offset.
		float4 _FaceTex_ST;
		float4 _OutlineTex_ST;
		float _UIMaskSoftnessX;
        float _UIMaskSoftnessY;
        int _UIVertexColorAlwaysGammaSpace;

		pixel_t VertShader(vertex_t input)
		{
			pixel_t output;

			UNITY_INITIALIZE_OUTPUT(pixel_t, output);
			UNITY_SETUP_INSTANCE_ID(input);
			UNITY_TRANSFER_INSTANCE_ID(input,output);
			UNITY_INITIALIZE_VERTEX_OUTPUT_STEREO(output);

			float bold = step(input.texcoord0.w, 0);

			float4 vert = input.position;
			vert.x += _VertexOffsetX;
			vert.y += _VertexOffsetY;

			float4 vPosition = UnityObjectToClipPos(vert);

			float2 pixelSize = vPosition.w;
			pixelSize /= float2(_ScaleX, _ScaleY) * abs(mul((float2x2)UNITY_MATRIX_P, _ScreenParams.xy));
			float scale = rsqrt(dot(pixelSize, pixelSize));
			scale *= abs(input.texcoord0.w) * _GradientScale * (_Sharpness + 1);
			if (UNITY_MATRIX_P[3][3] == 0) scale = lerp(abs(scale) * (1 - _PerspectiveFilter), scale, abs(dot(UnityObjectToWorldNormal(input.normal.xyz), normalize(WorldSpaceViewDir(vert)))));

			float weight = lerp(_WeightNormal, _WeightBold, bold) / 4.0;
			weight = (weight + input.texcoord1.w) * _ScaleRatioA * 0.5;

			float bias =(.5 - weight) + (.5 / scale);

			float alphaClip = (1.0 - input.texcoord1.z * _ScaleRatioA - _OutlineSoftness * _ScaleRatioA);

		    #if GLOW_ON
			alphaClip = min(alphaClip, 1.0 - _GlowOffset * _ScaleRatioB - _GlowOuter * _ScaleRatioB);
		    #endif

			alphaClip = alphaClip / 2.0 - ( .5 / scale) - weight;

		    #if (UNDERLAY_ON || UNDERLAY_INNER)
			float4 underlayColor = float4(input.myCol2.xyz,1);
			underlayColor.rgb *= underlayColor.a;

			float bScale = scale;
			bScale /= 1 + ((_UnderlaySoftness*_ScaleRatioC) * bScale);
			float bBias = (0.5 - weight) * bScale - 0.5 - ((input.myCol2.w * _ScaleRatioC) * 0.5 * bScale);

			float x = -(input.texcoord1.x * _ScaleRatioC) * _GradientScale / _TextureWidth;
			float y = -(input.texcoord1.y * _ScaleRatioC) * _GradientScale / _TextureHeight;
			float2 bOffset = float2(x, y);
		    #endif

			// Generate UV for the Masking Texture
			float4 clampedRect = clamp(_ClipRect, -2e10, 2e10);
			float2 maskUV = (vert.xy - clampedRect.xy) / (clampedRect.zw - clampedRect.xy);

			// Support for texture tiling and offset
			float2 textureUV = input.texcoord1;
			float2 faceUV = TRANSFORM_TEX(textureUV, _FaceTex);
			float2 outlineUV = TRANSFORM_TEX(textureUV, _OutlineTex);


            if (_UIVertexColorAlwaysGammaSpace && !IsGammaSpace())
            {
                input.color.rgb = UIGammaToLinear(input.color.rgb);
            }
			output.position = vPosition;
			output.color = input.color;
			output.atlas =	input.texcoord0;
			output.param =	float4(alphaClip, scale, bias, weight);
			const half2 maskSoftness = half2(max(_UIMaskSoftnessX, _MaskSoftnessX), max(_UIMaskSoftnessY, _MaskSoftnessY));
			output.mask = half4(vert.xy * 2 - clampedRect.xy - clampedRect.zw, 0.25 / (0.25 * maskSoftness + pixelSize.xy));
			output.viewDir =	mul((float3x3)_EnvMatrix, _WorldSpaceCameraPos.xyz - mul(unity_ObjectToWorld, vert).xyz);
			#if (UNDERLAY_ON || UNDERLAY_INNER)
			output.texcoord2 = float4(input.texcoord0 + bOffset, bScale, bBias);
			output.underlayColor =	underlayColor;
			#endif
			output.textures = float4(faceUV, outlineUV);

			// Per-instance style data, carried straight from the baked UVs
			output.myCol = input.myCol;
			output.myCol2 = input.myCol2;
			output.myCol3 = input.texcoord1;
			return output;
		}


		fixed4 PixShader(pixel_t input) : SV_Target
		{
			UNITY_SETUP_INSTANCE_ID(input);

			float c = tex2D(_MainTex, input.atlas).a;

		    #ifndef UNDERLAY_ON
			clip(c - input.param.x);
		    #endif

			float	scale	= input.param.y;
			float	bias	= input.param.z;
			float	weight	= input.param.w;
			float	sd = (bias - c) * scale;

			// Outline thickness/softness come from the per-instance baked data
			float outline = (input.myCol3.z * _ScaleRatioA) * scale;
			float softness = (_OutlineSoftness * _ScaleRatioA) * scale;

			half4 faceColor = _FaceColor;
			half4 outlineColor = input.myCol; // per-instance outline color

			faceColor.rgb *= input.color.rgb;

			faceColor *= tex2D(_FaceTex, input.textures.xy + float2(_FaceUVSpeedX, _FaceUVSpeedY) * _Time.y);
			outlineColor *= tex2D(_OutlineTex, input.textures.zw + float2(_OutlineUVSpeedX, _OutlineUVSpeedY) * _Time.y);

			faceColor = GetColor(sd, faceColor, outlineColor, outline, softness);

		    #if BEVEL_ON
			float3 dxy = float3(0.5 / _TextureWidth, 0.5 / _TextureHeight, 0);
			float3 n = GetSurfaceNormal(input.atlas, weight, dxy);

			float3 bump = UnpackNormal(tex2D(_BumpMap, input.textures.xy + float2(_FaceUVSpeedX, _FaceUVSpeedY) * _Time.y)).xyz;
			bump *= lerp(_BumpFace, _BumpOutline, saturate(sd + outline * 0.5));
			n = normalize(n- bump);

			float3 light = normalize(float3(sin(_LightAngle), cos(_LightAngle), -1.0));

			float3 col = GetSpecular(n, light);
			faceColor.rgb += col*faceColor.a;
			faceColor.rgb *= 1-(dot(n, light)*_Diffuse);
			faceColor.rgb *= lerp(_Ambient, 1, n.z*n.z);

			fixed4 reflcol = texCUBE(_Cube, reflect(input.viewDir, -n));
			faceColor.rgb += reflcol.rgb * lerp(_ReflectFaceColor.rgb, _ReflectOutlineColor.rgb, saturate(sd + outline * 0.5)) * faceColor.a;
		    #endif

		    #if UNDERLAY_ON
			float d = tex2D(_MainTex, input.texcoord2.xy).a * input.texcoord2.z;
			faceColor += input.underlayColor * saturate(d - input.texcoord2.w) * (1 - faceColor.a);
		    #endif

		    #if UNDERLAY_INNER
			float d = tex2D(_MainTex, input.texcoord2.xy).a * input.texcoord2.z;
			faceColor += input.underlayColor * (1 - saturate(d - input.texcoord2.w)) * saturate(1 - sd) * (1 - faceColor.a);
		    #endif

		    #if GLOW_ON
			float4 glowColor = GetGlowColor(sd, scale);
			faceColor.rgb += glowColor.rgb * glowColor.a;
		    #endif

		// Alternative implementation to UnityGet2DClipping with support for softness.
		    #if UNITY_UI_CLIP_RECT
			half2 m = saturate((_ClipRect.zw - _ClipRect.xy - abs(input.mask.xy)) * input.mask.zw);
			faceColor *= m.x * m.y;
		    #endif

		    #if UNITY_UI_ALPHACLIP
			clip(faceColor.a - 0.001);
		    #endif

  		    return faceColor * input.color.a;
		}
		ENDCG
	}
}

Fallback "TextMeshPro/Mobile/Distance Field"
CustomEditor "TMPro.EditorUtilities.TMP_SDFShaderGUI"
}`,
            },
          ],
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
