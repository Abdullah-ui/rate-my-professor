import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Pinecone } from "@pinecone-database/pinecone";

// system prompt that contains the guidelines on how the bot should act
const systemPrompt = `
You are a helpful and knowledgeable assistant for a "Rate My Professor" platform. Your role is to assist students in finding the best professors based on their specific queries. You do this by leveraging a database of professor reviews and applying a Retrieval-Augmented Generation (RAG) approach to present the top 3 professors that match the student's needs.

Guidelines:

Understand the Query:

Carefully analyze the student's query to understand the subject, department, or specific attributes they are looking for in a professor (e.g., teaching style, helpfulness, course difficulty).
Retrieve Relevant Data:

Use the database of professor reviews to identify relevant professors who match the student's criteria. Consider factors like subject expertise, student reviews, and overall ratings.
Rank and Recommend:

Select the top 3 professors who best align with the student's request. Rank them based on their relevance, student satisfaction, and review quality.
Provide a brief summary for each professor, including the subject they teach, their average rating, and a concise snippet from student reviews that highlights their strengths.
Respond Clearly:

Present the results in a clear and concise manner, ensuring that the student can easily understand why each professor was selected. Include the professor's name, subject, star rating, and a key review comment.
Personalization:

If the student's query is vague, ask clarifying questions to better understand their needs.
If no professors perfectly match the query, provide the closest matches and explain why these professors were selected.
Example Interaction:

Student Query: "I'm looking for a good Computer Science professor who explains concepts clearly."

Your Response:

Dr. Emily Johnson - Computer Science

Rating: 5 stars
Review Snippet: "Dr. Johnson is an amazing professor! Her lectures are clear, and she's always willing to help outside of class."
Dr. Sarah Thompson - Computer Science

Rating: 4 stars
Review Snippet: "Dr. Thompson is very engaging and makes complex concepts easy to understand. Highly recommend!"
Dr. Mark Garcia - Computer Science

Rating: 4 stars
Review Snippet: "Good professor with interesting lectures. He makes sure students grasp the core concepts before moving on."
Focus on providing students with the best possible recommendations based on their individual needs.
`

// the list that maintains the history of the chat
var chat_history = [
    {
      role: "user",
      parts: [{ text: "you are an assistant that helps with searching up for professors" }],
    },
    {
      role: "model",
      parts: [{ text: "I am a helpful assistant" }],
    },
  ]

export async function POST(req){
    const data = await req.json() //data from the request
    // initializing pinecone
    const pc = new Pinecone({
        apiKey: process.env.PINECONE_API_KEY,
    })
    // pinecone index
    const index = pc.index("rag").namespace('ns1')
    // initialing the genAI
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    // text embedding model
    const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
    const text = data[data.length-1].content    // returns the last message of the user
    // embedding the current prompt 
    const result = await model.embedContent(text);
    const embedding = result.embedding;

    // finding all the matches that matches the current prompt value from pinecone database
    const query_from_pinecone = await index.query({
        topK: 5,
        includeMetadata: true,
        vector: embedding["values"],
      })

    // finding matches from our existing database on pinecone
    let resultString = '\n\nReturned results from the vector db (done automatically): '
    query_from_pinecone.matches.forEach((match) => {
        resultString += `
        Returned Results:
        Professor: ${match.id}
        Review: ${match.metadata.stars}
        Subject: ${match.metadata.subject}
        Stars: ${match.metadata.stars}
        \n\n`
    });

    // getting the last message and their content from the request json file
    const lastMessage = data[data.length - 1]
    const lastMessageContent = lastMessage.content + resultString
    const lastDataWithoutLastMessage = data.slice(0, data.length - 1)

    // initializing model 
    const text_model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", systemInstruction: systemPrompt });

    // initializing chat history
    const chat = text_model.startChat({
        history: chat_history,
        stream: true,
      });
      
    // response from gemini 
    const completion = await chat.sendMessage(lastMessageContent);
    const response = completion.response.text()

    // appending to the chat history the new messages
    chat_history = [
      ...chat_history,
      {
        role: "user",
        parts: [{ text: lastMessageContent }],
      },
      {
        role: "model",
        parts: [{ text: response }],
      },
    ]

    // const returnStream = new ReadableStream({
    //   async start(controller) {
    //     const encoder = new TextEncoder()
    //     try {
    //       for await (const chunk of completion) {
    //         const content = chunk.choices[0]?.delta?.content
    //         if (content) {
    //           const text = encoder.encode(content)
    //           controller.enqueue(text)
    //         }
    //       }
    //     } catch (err) {
    //       controller.error(err)
    //     } finally {
    //       controller.close()
    //     }
    //   },
    // })
    // return new NextResponse(returnStream)

    // console.log("this is the return stream: ", returnStream)
    // for (const chunk in returnStream){
    //   console.log(chunk)
    // }

    // tried to stream response but i couldnt figure out on how to do it with gemini chat, will fix this later
    // so i just return the response as a string
    return new NextResponse(response)
}