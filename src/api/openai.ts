import OpenAI from 'openai';
const openai = new OpenAI({
  apiKey: 'esto es falso', //import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const extractJsonString = (input: string): string => {
  const startIndex = input.indexOf('{');
  const endIndex = input.lastIndexOf('}');
  if (startIndex === -1 || endIndex === -1 || startIndex > endIndex) {
    return '';
  }
  return input.slice(startIndex, endIndex + 1);
};

export const callToAssistant = async (object: string): Promise<string> => {
  try {
    const thread = await openai.beta.threads.create();
    await openai.beta.threads.messages.create(thread.id, {
      role: 'user',
      content: `Using the provided JSON: ${object}, please generate a detailed rehabilitation program of 15 days with exercises for each day, ensuring that includes fields name, groups, description and days. And inside every exercise should be name, the correspondant id, series, maxRep, minRep. Give me a JSON with the result. Don't return anything that is not the json content as an output`,
    });
    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: 'asst_angL6UB1FsRQEVM4OjRMnl0p',
    });
    await openai.beta.threads.runs.retrieve(thread.id, run.id);
    let actualRun = await openai.beta.threads.runs.retrieve(
      // use the thread created earlier
      thread.id,
      run.id,
    );
    while (
      actualRun.status === 'queued' ||
      actualRun.status === 'in_progress' ||
      actualRun.status === 'requires_action'
    ) {
      // keep polling until the run is completed
      await new Promise(resolve => setTimeout(resolve, 1000));
      actualRun = await openai.beta.threads.runs.retrieve(thread.id, run.id);
    }
    const messages = await openai.beta.threads.messages.list(thread.id);
    const lastMessageForRun = messages.data
      .filter(message => message.run_id === run.id && message.role === 'assistant')
      .pop();
    if (lastMessageForRun) {
      const messageValue = lastMessageForRun.content[0] as {
        text: { value: string };
      };

      return extractJsonString(`${messageValue?.text?.value}`);
    } else {
      return '';
    }
  } catch (error) {
    throw new Error('No ha salido bien la creación del programa');
  }
};
