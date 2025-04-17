export async function generateAIResponse({
  name,
  description,
  schema,
  apiId,
}: {
  name: string;
  description: string;
  schema: any;
  apiId?: string;
}) {
  try {
    const response = await fetch("/api/mockapicall", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description,
        schema,
        apiId,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || `API responded with status ${response.status}`
      );
    }

    const data = await response.json();
    return { response: data.result };
  } catch (error: any) {
    console.error("Error generating AI response:", error);
    throw new Error(`Failed to generate response: ${error.message}`);
  }
}