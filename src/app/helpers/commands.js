
const hello = () => {
  return {
    msg: "Hi, How are you. Welcome to my web app."
  };
}

const about = () => {
  return {
    msg: "Version 1.0.0: A fullstack web application developed by Ishan Pandey."
  }
}

const github = () => {
  return {
    //TODO: Add github link to this project
    redirect: "url"
  }
}

const help = () => {
  return {
    msg: "/about: to get software version info.\n \t\t\t\t/github: to visit github repo of the website\n \t\t\t\t/about dev: to visit developer portfolio\n \t\t\t\t/hello: to greet the machine"
  }
}

const aboutDev = () => {
  return {
    redirect: "https://ipdev.netlify.app/"
  }
}

const commands = (cmd="") => {
  if (cmd.toLowerCase().includes("hello")) return hello();
  if (cmd.toLowerCase().includes("help")) return help();
  if (cmd.toLowerCase().includes("about dev")) return aboutDev();
  if (cmd.toLowerCase().includes("about")) return about();
  if (cmd.toLowerCase().includes("github")) return github();
  return {
    msg: "Invalid Command use /help to know commands"
  }

}




export default commands;