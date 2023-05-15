import type { GatsbyConfig } from "gatsby"

const site = {
  url: `https://greenonsoftware.com`,
  name: "GreenOn Software",
  description: `A place for people who love programming and personal development.`,
  authors: [
    {
      id: "polubis",
      name: "polubis",
      firstName: "Adrian",
      lastName: "Połubiński",
      role: "Senior Frontend Developer",
      bio:
        "Software development and application design are more than just a job for me. I have been a freelancer for a few years and I carried out projects in various technologies. Focused on React, TypeScript, NodeJS. In my free time, I play guitar.",
      githubURL: "https://github.com/polubis",
      linkedinURL:
        "https://www.linkedin.com/in/adrian-po%C5%82ubi%C5%84ski-281ab2172/",
    },
    {
      id: "awęgrodzki",
      name: "awęgrodzki",
      firstName: "Artur",
      lastName: "Węgrodzki",
      role: ".NET developer",
      bio:
        "Daily working in C# and .NET environments. Specialized in Backend APIs, Xamarin mobile applications and databases. In my free time, I ride a bike and play games.",
      linkedinURL:
        "https://www.linkedin.com/in/artur-w%C4%99grodzki-926109194/",
    },
    {
      id: "kreszko",
      name: "kreszko",
      firstName: "Krzysztof",
      lastName: "Reszko",
      role: "Editor & Reviewer",
      bio:
        "English teacher. In the meantime, I do translation and editing work. My Interests are fitness and video games.",
    },
    {
      id: "kwozniak",
      name: "kwozniak",
      firstName: "Kacper",
      lastName: "Woźniak",
      role: "Frontend developer",
      bio:
        "Professionally - frontend developer focused on React, Vue and Typescript. I am happy to engage in additional activities related to programming. Privately - motorization enthusiast.",
      githubURL: "https://github.com/ajronn",
      linkedinURL: "https://www.linkedin.com/in/ajronn/",
    },
    {
      id: "pjurczyk",
      name: "pjurczyk",
      firstName: "Patryk",
      lastName: "Jurczyk",
      role: "Frontend developer",
      bio:
        "The technologies I develop are React and TypeScript. I like to take on more and more difficult things because with them I can learn the most. I spend my free time actively at the gym or cycling.",
      githubURL: "https://github.com/PatrykJurczyk",
      linkedinURL: "https://www.linkedin.com/in/patryk-jurczyk-832311241/",
    },
    {
      id: "kzalewska",
      name: "kzalewska",
      firstName: "Klaudia",
      lastName: "Zalewska",
      role: "Junior Q&A",
      bio:
        "I have a foundation in programming and JavaScript, which helps me ensure software quality and create seamless user experiences. Outside of work, I enjoy reading criminal books.",
      githubURL: "https://github.com/klaudiazalewska",
      linkedinURL: "https://www.linkedin.com/in/klaudia-zalewska-725902231/",
    },
    {
      id: "tmarczak",
      name: "tmarczak",
      firstName: "Tomasz",
      lastName: "Marczak",
      role: "Frontend developer",
      bio:
        "Coding is my hobby and I made friends with TypeScript and React. I’m curently working in cruise ship industry and love designing useful things. Besides that I'm interested in a little bit of everything and nothing in particular, however boxing seem to tickle my mind more. I love cats and 'The Office'.",
      githubURL: "https://tomaszmarczak.github.io/",
      linkedinURL: "https://www.linkedin.com/in/tomasz-marczak-4a12a811a/",
    },
    {
      id: "stymcio",
      name: "stymcio",
      firstName: "Szymon",
      lastName: "Tymcio",
      role: "Frontend Developer",
      bio:
        "Driven by a passion for creating engaging websites, I am a dedicated web technology enthusiast who is eager to explore the latest trends and push the boundaries.",
      githubURL: "https://github.com/pypcio",
      linkedinURL: "https://www.linkedin.com/in/szymon-tymcio-411882261/",
    },
    {
      id: "goteii",
      name: "goteii",
      firstName: "Dawid",
      lastName: "Dowgiałło",
      role: "Frontend Developer",
      bio:
        "Frontend developer with a knowledge of Angular, Vue, React, JS and Typescript. In my free time I expand my knowledge, play games and listen to music.",
      githubURL: "https://github.com/Goteii",
      linkedinURL:
        "https://www.linkedin.com/in/dawid-dowgia%C5%82%C5%82o-49a4741a9/",
    },
  ],
}

const config: GatsbyConfig = {
  siteMetadata: {
    ...site,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [],
}

export default config
