export default async function handler(req, res) {
    // Check if the request method is POST
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    try {
        // Get the request body (in Next.js, req.body is usually already parsed)
        const reqData = req.body; // No need to await unless using specific middleware

        // Fetch data from the external API
        const apiResponse = await fetch(
            'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyBFJUHSrrvUvGHnytkYTaKdomiQWKN8uZ4',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: `I will give you a user question and make sure to return the response in ONLY json format with answer. question: ${reqData.text}`
                                }
                            ]
                        }
                    ]
                }),
            }
        );

        // Parse the fetch response as JSON
        const data = await apiResponse.json();

        const raw = data.candidates[0].content.parts[0].text
        console.log(raw)
        let cleaned = raw
            .replace(/^```json\s*\n?/, '') // Remove ```json and optional newline
            .replace(/```\s*$/, '')        // Remove closing ``` and optional trailing whitespace
            .trim();                       // Remove leading/trailing whitespace

        // Log the cleaned string for debugging
        console.log("Cleaned input:", cleaned);

        // Validate that cleaned string is not empty
        if (!cleaned) {
            return res.status(400).json({ message: "Bad Request: Empty JSON string after cleaning" });
        }

        // Parse the cleaned JSON string
        let jsonQuestion;
        try {

            jsonQuestion = JSON.parse(cleaned);

        } catch (parseError) {
            console.error("JSON parsing error:", parseError.message);
            console.error("Invalid JSON string:", cleaned);
            return res.status(400).json({ message: "Invalid JSON format", error: parseError.message });
        }

        if (!jsonQuestion.response) {
            return res.status(400).json({ message: "Bad Request: JSON must contain a 'response' field" });
        }
        return res.status(200).json(jsonQuestion);
    } catch (error) {
        // Log the error and return a 500 status with an error message
        console.error("Failed to fetch data:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
