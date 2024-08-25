import { type MessageInput } from '../../types';

// import { PromptTemplate } from "@langchain/core/prompts";

// // An example prompt with one input variable
// const replyPrompt = new PromptTemplate({
//   inputVariables: ["adjective"],
//   template: "Tell me a {adjective} joke.",
// });

export function generatePrompt(inputs: {
  message: MessageInput;
  input?: string;
  replies: MessageInput[];
}): string {
  const { message, input, replies } = inputs;

  let prompt = `User @${message.user} posted a tweet: "${message.text}"\n\n`;

  if (replies && replies.length > 0) {
    prompt += 'Here are some replies:\n\n';

    replies.forEach((reply, index) => {
      prompt += `Reply ${index + 1} from @${reply.user}:\n"${reply.text}"\n\n`;
    });
  }

  if (input) {
    prompt += `Please complete a reply to @${message.user}'s tweet above based on the following suggestions: "${input}".`;
  } else {
    prompt += `Please generate a reply to @${message.user}'s tweet above.`;
  }

  return prompt;
}
