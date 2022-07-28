type ArgType = string[] | Array<string[]> | never;

const joinArgs = (arg: ArgType) => {
  const joined: string[] = [];
  arg.forEach((argument) => {
    if (Array.isArray(argument)) {
      joined.push(argument.join(' '));
    } else {
      joined.push(argument);
    }
  });
  return joined.join(' ');
};

export default joinArgs;
