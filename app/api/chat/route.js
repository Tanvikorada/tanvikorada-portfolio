export const runtime = 'edge';

const SYSTEM_PROMPT = `
You are Tanvi's personal AI Assistant embedded in her portfolio website.
You are professional, intelligent, and concise.

Knowledge Base (RAG Context):
- Name: Korada Tanvi
- Location: Chennai, India (Tamil Nadu)
- Email: tanvikorada@gmail.com
- Education: B.Tech CSE (Cloud Computing) at SRMIST Chennai (2024 - 2028), CGPA 9.27/10.
- Skills: OpenAI API, Groq, Claude, Gemini, LangChain, Next.js, React, Node.js, Python, PostgreSQL, YOLO, MediaPipe.
- Projects:
  1. AppCompiler: 4-stage LLM pipeline converting natural language to DB/API/UI. First-author research paper published (DOI 10.5281/zenodo.20644045) with 85-90% success rate.
  2. SatyaLabel: AI Compliance Checker for packaged products (OCR + Gemini Vision). Built for SIH 2026.
  3. TrackR: AI-powered full-stack application tracker with Groq LLaMA 3.3.
  4. Physio: Real-time exercise form correction using MediaPipe and React Three Fiber.
- Roles: Camogenics (Photographer, Winner: 'Saving Nature'), Andropedia (Media), SlugNPlug (Hardware).
- Current Status: Open to internships, full-time roles, and freelance collaborations.

If someone asks about her availability, tell them she is open to work and provide her email.
Always keep answers under 3-4 sentences. Be friendly and helpful.
`;

export async function POST(req) {
  try {
    const { messages } = await req.json();

    const apiKey = process.env.GROQ_API_KEY || process.env.OPENAI_API_KEY;
    
    // If we have a real API key, proxy to Groq/OpenAI for true intelligence
    if (apiKey) {
      const endpoint = process.env.GROQ_API_KEY 
        ? 'https://api.groq.com/openai/v1/chat/completions'
        : 'https://api.openai.com/v1/chat/completions';
        
      const model = process.env.GROQ_API_KEY ? 'llama-3.3-70b-versatile' : 'gpt-4o-mini';

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: model,
          messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
          stream: true,
          temperature: 0.7,
        })
      });

      if (!response.ok) {
        throw new Error('LLM API Error');
      }

      // Pass the SSE stream directly back to the client
      return new Response(response.body, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      });
    }

    // FALLBACK: Simulated Intelligent Mock RAG
    // This runs if the user hasn't added an API key yet, guaranteeing a working UI out-of-the-box.
    const lastUserMsg = messages[messages.length - 1].content.toLowerCase();
    
    let mockResponse = "I'm Tanvi's AI assistant. To enable my full neural network, please add a GROQ_API_KEY to the Vercel environment variables. In the meantime, I can tell you that Tanvi is an amazing AI-native Full Stack Developer!";
    
    if (lastUserMsg.includes('skill') || lastUserMsg.includes('tech') || lastUserMsg.includes('stack')) {
      mockResponse = "Tanvi is highly skilled in GenAI (OpenAI, Groq, LangChain) and Full-Stack Development (React, Next.js, Node.js, PostgreSQL). She's also experienced with Computer Vision tools like YOLO and MediaPipe.";
    } else if (lastUserMsg.includes('project') || lastUserMsg.includes('build')) {
      mockResponse = "She has built impressive projects like 'AppCompiler' (an LLM pipeline that generates full codebases), 'SatyaLabel' (an AI compliance checker for SIH), and 'Physio' (real-time exercise form correction).";
    } else if (lastUserMsg.includes('education') || lastUserMsg.includes('study') || lastUserMsg.includes('college')) {
      mockResponse = "Tanvi is currently pursuing her B.Tech in CSE (Cloud Computing) at SRMIST Chennai (2024-2028), maintaining an excellent CGPA of 9.27/10.";
    } else if (lastUserMsg.includes('contact') || lastUserMsg.includes('hire') || lastUserMsg.includes('work')) {
      mockResponse = "Tanvi is currently open to internships and freelance collaborations! You can reach her directly at tanvikorada@gmail.com.";
    } else if (lastUserMsg.includes('hi') || lastUserMsg.includes('hello')) {
      mockResponse = "Hello! I'm Tanvi's AI assistant. How can I help you learn more about her background or projects?";
    }

    // Create a readable stream to simulate typewriter effect for the mock response
    const stream = new ReadableStream({
      async start(controller) {
        // We simulate SSE chunks
        const chunks = mockResponse.split(' ');
        for (const chunk of chunks) {
          const sseData = `data: ${JSON.stringify({ choices: [{ delta: { content: chunk + ' ' } }] })}\n\n`;
          controller.enqueue(new TextEncoder().encode(sseData));
          await new Promise(resolve => setTimeout(resolve, 50)); // typing delay
        }
        controller.enqueue(new TextEncoder().encode('data: [DONE]\n\n'));
        controller.close();
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
