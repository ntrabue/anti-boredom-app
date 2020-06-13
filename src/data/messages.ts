const mainButtonOptions: string[] = [
  "I'm bored!",
  "I have nothing to do!",
  "Help!",
  "Cure my boredom",
];

const waitingMessageOptions: string[] = [
  "Really... again?",
  "Ya know, Only boring people can be bored",
  "Please wait...",
  "Scanning your brain... hold still",
  "Consulting the wizard... please wait",
];

const randomNumber = (options: unknown[]) => {
  return Math.floor(Math.random() * Math.floor(options.length));
};

export const getButtonOption = () => {
  return mainButtonOptions[randomNumber(mainButtonOptions)];
};

export const getWaitingOptions = () => {
  return waitingMessageOptions[randomNumber(waitingMessageOptions)];
};
