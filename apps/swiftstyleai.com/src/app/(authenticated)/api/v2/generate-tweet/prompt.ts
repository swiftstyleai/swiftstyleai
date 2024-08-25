export function generatePrompt(input: string): string {
  const prompt = `Please create a tweet based on the your's input below without altering its meaning. Anything in brackets () in the input are criteria that the tweet must satisfy:\n
${input}`;

  return prompt;
}
