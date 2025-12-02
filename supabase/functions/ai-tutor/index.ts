import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, topic, grade, message, history, count } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    let systemPrompt = "";
    let userMessage = "";

    if (action === "generate_questions") {
      systemPrompt = `You are a biology teacher creating quiz questions for ${grade || "high school"} students following the Sindh Board curriculum (Jamshoro). Generate exactly ${count || 5} multiple choice questions about: ${topic}.

Rules:
- Each question should test understanding, not just memorization
- Include 4 options (A, B, C, D)
- Provide the correct answer and a brief explanation
- Questions should be appropriate for the grade level
- Format as JSON array

Return ONLY valid JSON in this exact format:
[
  {
    "question": "Question text here?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswer": 0,
    "explanation": "Brief explanation of why this answer is correct"
  }
]`;
      userMessage = `Generate ${count || 5} biology quiz questions about: ${topic}`;
    } else if (action === "teach") {
      systemPrompt = `You are an expert biology tutor teaching ${grade || "high school"} students following the Sindh Board curriculum (Jamshoro, Pakistan). Your role is to:

1. Explain concepts clearly and simply
2. Use analogies and real-world examples
3. Break down complex topics into digestible parts
4. Be encouraging and supportive
5. Answer questions patiently
6. Use Urdu terms in parentheses when helpful for Pakistani students

Current topic: ${topic || "General Biology"}

Keep responses concise but informative. Use markdown for formatting.`;
      
      userMessage = message || `Explain ${topic} to me`;
    } else if (action === "explain_answer") {
      systemPrompt = `You are a biology tutor. A student got a quiz question wrong. Explain why the correct answer is right and why their answer was wrong. Be encouraging and educational.`;
      userMessage = message;
    }

    const messages = [
      { role: "system", content: systemPrompt }
    ];

    if (history && history.length > 0) {
      messages.push(...history);
    }
    
    messages.push({ role: "user", content: userMessage });

    console.log("Sending request to AI gateway for action:", action);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages,
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI Gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add credits to continue." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (action === "generate_questions") {
      // Parse JSON from the response
      try {
        const jsonMatch = content.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
          const questions = JSON.parse(jsonMatch[0]);
          return new Response(JSON.stringify({ questions }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
      } catch (parseError) {
        console.error("Failed to parse questions JSON:", parseError);
      }
    }

    return new Response(JSON.stringify({ response: content }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("AI Tutor error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
