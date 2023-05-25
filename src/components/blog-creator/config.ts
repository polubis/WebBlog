const INIT_MDX = `<Prelude>
  <M>
    I don't know about you, but I like creating components - especially the more
    advanced ones.
  </M>
  <M>
    If you write a component library yourself, and you have a small number of
    components - testing is not problematic, and documentation is not needed.
  </M>
  <M>
    However, if you have much more components and they will be used by other
    developers - you have a problem.
  </M>
  <M>
    That's why such technologies as <B>chromatic</B> and <B>storybook</B> were
    created, which you will learn now.
  </M>
</Prelude>

<Section>
  <XL>1. Creating example project</XL>
  <M>
    Demonstrating these technologies makes no sense without a project. Here I
    will use a typical React project generated from this{" "}
    <A outside href="https://github.com/polubis/CRA-TEMPLATE">
      repository template
    </A>
    .
  </M>
</Section>

<Section>
  <XL>2. Storybook</XL>
  <M>
    Technology that gives you a separate development environment, playground for
    components, automatic documentation and cool tools for debugging. In simple
    words - just take all of your components and render them in another app
    separately.
  </M>
  <Img
    src="https://raw.githubusercontent.com/polubis/WebBlog/Chromatic-and-storybook/src/articles/testing/chromatic-and-storybook/storybook.gif"
    description="Storybook presented"
  />
  <Hint hasBg>
    <B>Storybook</B> is not reserved only for React. Check the{" "}
    <A
      href="https://storybook.js.org/docs/react/get-started/introduction"
      outside
    >
      docs
    </A>{" "}
    for more information.
  </Hint>
</Section>

<Section>
  <XL>3. Adding storybook to project</XL>
  <M>
    It's very simple. Be sure that you are in the root directory of the project.
    Then all you need to do is type commands described in{" "}
    <A href="https://storybook.js.org/docs/react/get-started/install" outside>
      docs
    </A>
    . Just run <B>npx storybook init</B> and wait until process end.
  </M>
  <M>
    When files are generated - run <B>npm run storybook</B>. This command will
    run <B>storybook environment</B> and you can start the real fun.
  </M>
  <Hint hasBg>
    Changes from this step can be found in this{" "}
    <A
      href="https://github.com/polubis/Chromatic-and-storybook/commit/3d1eafb0ab611fb3764782133aa199d8f9795323"
      outside
    >
      commit
    </A>
    .
  </Hint>
  <Hint hasBg>
    The script can ask you about migration to <B>npm7</B> if you are using{" "}
    <B>npm8</B> or higher - just confirm that.
  </Hint>
</Section>

<Section>
  <XL>4. Removing generated stories</XL>
  <M>
    In our case, we need to document real components which we are using in our
    small app. So let's remove <B>src/stories</B> directory.
  </M>
  <Hint hasBg>
    Changes from this step can be found in this{" "}
    <A
      href="https://github.com/polubis/Chromatic-and-storybook/commit/50a5abe6bc805bf51e248777a5a6b2c036324f02"
      outside
    >
      commit
    </A>
    .
  </Hint>
</Section>

<Section>
  <XL>5. Adding first story</XL>
  <M>
    Let's add story for <B>InputField</B> component. As you can see, it's a
    pretty small amount of code to get nice documentation and be able to play
    with it while developing without any need to run the full app.
  </M>
  <Snippet
    description="Story added"
    linesCount={23}
    src="https://raw.githubusercontent.com/polubis/Chromatic-and-storybook/main/src/ui/input-field/InputField.stories.tsx"
  />
  <Hint hasBg>
    Changes from this step can be found in this{" "}
    <A
      href="https://github.com/polubis/Chromatic-and-storybook/commit/4f3215478bfef324467861ef9ada93fef08acafd#diff-4df550f19ec86d7ca5cc131deaf12062401a3d38b9c9fd85f82e616e916a0a63"
      outside
    >
      commit
    </A>
    .
  </Hint>
</Section>

<Section>
  <XL>6. Chromatic</XL>
  <M>
    When you have <B>storybook</B> - you can use <B>chromatic</B>. Now the magic
    starts. <B>Chromatic</B> it's a game changer. This technology takes your
    components with stories and builds them into an automatically deployed web
    app.
  </M>
  <M>
    You can trigger the build manually or perform it on the pipeline after
    merging or creating a pull request to a dedicated branch.
  </M>
  <M>
    The best feature is an option to compare how your components look between
    different code versions. <B>Chromatic</B> detects that and draws differences
    for you in UI. The code change is displayed as well.
  </M>
  <Img
    src="https://raw.githubusercontent.com/polubis/WebBlog/Chromatic-and-storybook/src/articles/testing/chromatic-and-storybook/chromatic.gif"
    description="Life is great now"
  />
  <M>
    The code that impacts the look of the components is marked with yellow
    bullets. After that, you need to go and accept or reject this change. This
    is a great job for <B>project owner</B>.
  </M>
</Section>

<Section>
  <XL>7. Chromatic configuration</XL>
  <M>
    Just go to{" "}
    <A href="https://www.chromatic.com" outside>
      chromatic
    </A>{" "}
    and log in via your source control provider.
  </M>
  <M>
    Now create <B>chromatic</B> project via choosing repository. A token will be
    generated. Type <B>npm install --save-dev chromatic</B> in terminal. After
    this push your commit via <B>git push</B> and type{" "}
    <B>npx chromatic --project-token=YOUR_TOKEN</B> - this create the first
    build.
  </M>
  <M>
    The script will ask you to add the build script into <B>package.json</B>{" "}
    file - just confirm that.
  </M>
  <Hint hasBg>
    Changes from this step can be found in this{" "}
    <A
      href="https://github.com/polubis/Chromatic-and-storybook/commit/d49f91b80ed6695b4eb056ad99126dae63328ced"
      outside
    >
      commit
    </A>
    .
  </Hint>
</Section>

<Section>
  <XL>8. Detecting first changes</XL>
  <M>
    Now you need to change the implementation of the component that indicates
    changes in UI. After that just type <B>npm run chromatic</B> to trigger a
    new snapshot build and check changes.
  </M>
  <M>
    If changes are found you need to review them and accept them. Without this,
    it will always compare with the previously accepted version of the build :).
  </M>
  <Img
    src="https://raw.githubusercontent.com/polubis/WebBlog/Chromatic-and-storybook/src/articles/testing/chromatic-and-storybook/changes-found.jpg"
    description="Changes found"
  />
  <Hint hasBg>
    Changes from this step can be found in this{" "}
    <A
      href="https://github.com/polubis/Chromatic-and-storybook/commit/c2dfd772b48f9136a8635720bf2f4d7374be879d"
      outside
    >
      commit
    </A>
    .
  </Hint>
</Section>

<Section>
  <XL>9. Last improvements</XL>
  <M>
    In this step we remove <B>build-storybook.log</B> from repo. Just add that
    file name to <B>.gitignore</B>.
  </M>
  <M>
    Also, you need to remove the project token from the source repository and
    use it from <B>.env</B> files as documentation recommends. Also, we can
    achieve that by <B>secrets</B>. I prefer this approach.
  </M>
  <Img
    src="https://raw.githubusercontent.com/polubis/WebBlog/Chromatic-and-storybook/src/articles/testing/chromatic-and-storybook/secrets.jpg"
    description="Changes found"
  />
  <M>
    After that remove{" "}
    <B>"chromatic": "npx chromatic --project-token=YOUR_TOKEN"</B> from{" "}
    <B>package.json</B> - it's not needed. Soon you will run your builds
    automatically.
  </M>
  <Hint hasBg>
    Changes from this step can be found in this{" "}
    <A
      href="https://github.com/polubis/Chromatic-and-storybook/commit/640fa8c6504a88bbaee4b0a352bc0e93436d764a"
      outside
    >
      commit
    </A>
    .
  </Hint>
</Section>

<Section>
  <XL>10. Integrating with pipeline</XL>
  <M>
    Let's trigger our builds on PR to the main branch. So current workflow will
    be:
  </M>
  <List items="Developer changes implementation, PR is raised to main, Chromatic builds components and requests review, Review is accepted -> you can merge into main" />
  <M>
    Of course, the process can be aligned with your project. This is just the
    simplest one.
  </M>
  <M>
    To achieve that, we need to add pipeline configuration to the repository.
  </M>
  <Snippet
    description="Configuration"
    linesCount={23}
    src="https://raw.githubusercontent.com/polubis/Chromatic-and-storybook/a67b143fb64a5a1555ad660300b308017e4e2e84/.github/workflows/chromatic.yaml"
  />
  <M>
    It should be added under <B>.github/workflows</B>. Now to test that follow
    the steps below:
  </M>
  <List items="Create a new branch from main, Change component implementation which indicates UI, Raises PR to main, Check is build created" />
  <Img
    src="https://raw.githubusercontent.com/polubis/WebBlog/Chromatic-and-storybook/src/articles/testing/chromatic-and-storybook/final.gif"
    description="Automation"
  />
  <Hint hasBg>
    Changes from this step can be found in this{" "}
    <A
      href="https://github.com/polubis/Chromatic-and-storybook/commit/a67b143fb64a5a1555ad660300b308017e4e2e84"
      outside
    >
      commit
    </A>
    .
  </Hint>
</Section>

<Example>
  <M>
    <A href="https://github.com/polubis/Chromatic-and-storybook" outside>
      Repository
    </A>{" "}
    to play with.
  </M>
</Example>

<Summary>
  <M>
    After this short adventure, you know how to boost your work with these nice
    tools.
  </M>
  <M>
    Feel free to contact me if you have any questions/proposals. Have a nice day
    and good health!
  </M>
</Summary>
`

const SMALL_MDX = `<Prelude>
  <M>
    Have you ever found yourself feeling overwhelmed or stressed out? Maybe you have a lot on your plate, or you're dealing with a difficult situation at work or in your personal life. Whatever the cause, it's important to find ways to manage your stress and take care of yourself.
  </M>
</Prelude>
<Section>
  <XL>Meditation</XL>
  <M>
    One way to do this is through meditation. Meditation is a simple yet powerful technique that can help you relax, reduce stress, and improve your overall well-being. There are many different types of meditation, but they all involve focusing your attention on a particular object, such as your breath or a mantra. By doing this, you can quiet your mind and achieve a state of deep relaxation.
  </M>
  <M>
    Another way to manage stress is through exercise. Exercise has been shown to be an effective way to reduce stress and improve mood. When you exercise, your body releases endorphins, which are natural chemicals that can help you feel good and reduce feelings of stress and anxiety. Exercise also helps to improve your physical health, which can in turn improve your mental health and well-being.
  </M>
</Section>
<Summary>
  <M>
    This article discusses two effective ways to manage stress and improve overall well-being: meditation and exercise. Meditation involves focusing attention on an object, such as the breath or a mantra, to achieve a state of deep relaxation. Exercise, on the other hand, releases endorphins that improve mood and reduce stress and anxiety. Both practices have been shown to be effective in improving mental and physical health.
  </M>
</Summary>
`
const MEDIUM_MDX = `<Prelude>
  <M>
    The rise of technology has dramatically transformed how we live our lives. With new advancements and innovations constantly emerging, it's important to stay up-to-date with the latest trends and developments. In this article, we will explore some of the latest trends in technology and how they are shaping our world.
  </M>
</Prelude>
<Section>
  <XL>The Internet of Things (IoT)</XL>
  <M>
    One of the most significant trends in technology is the <B>Internet of Things (IoT)</B>. IoT refers to the interconnectivity of everyday devices, allowing them to collect and share data. This technology is rapidly changing the way we live our lives, from smart homes that can automatically adjust temperature and lighting to self-driving cars that can communicate with traffic lights and other vehicles. With the rise of IoT, we can expect to see even more devices become interconnected and integrated into our daily lives.
  </M>
  <M>
      Here's an example of how IoT is used in the healthcare industry: hospitals can use sensors to monitor patients' vitals and alert doctors if there are any changes. This can help improve patient outcomes and reduce the risk of complications.
  </M>
  <Snippet>
  </Snippet>
</Section>
<Section>
  <XL>Artificial Intelligence (AI)</XL>
  <M>
    Another major trend in technology is <B>artificial intelligence (AI)</B>. AI refers to the ability of machines to learn and perform tasks that would typically require human intelligence. This technology is already being used in a wide range of applications, from self-driving cars to virtual assistants like Siri and Alexa. As AI continues to develop, we can expect to see even more advanced applications, such as personalized healthcare and predictive analytics.
  </M>
  <M>
    For example, AI can be used to analyze medical data to identify patterns and predict disease outbreaks. This can help healthcare professionals better understand the spread of diseases and develop more effective treatments.
  </M>
  <M>
    AI development involves a series of steps such as:
  </M>
    <List items="data gathering, pre-processing, model design, training, validation, deployment." />
  <M>
    During these stages, AI developers may make changes to the implementation and create pull requests (PRs) to merge their changes into the main codebase. To ensure the quality of the AI system, its components are tested using various tools and techniques such as model evaluation, performance metrics, and validation techniques. For instance, Chromatic is a popular tool used for testing the user interface of AI-based systems. After the review of the changes is completed and accepted, the AI system can be merged into the main codebase for deployment.
  </M>
    <A href="https://www.ibm.com/watson/health">Learn more about IBM Watson Health</A>
</Section>
<Section>
  <XL>Blockchain</XL>
  <M>
    <B>Blockchain</B> is another trend in technology that has gained significant attention in recent years. Blockchain is a decentralized digital ledger that records transactions and is virtually impossible to tamper with. This technology has the potential to transform a wide range of industries, from banking and finance to supply chain management and healthcare. With blockchain, we can expect to see greater transparency and security in various industries.
  </M>
  <Img src="https://loremflickr.com/640/360" alt="This random cat photo" />
  <Hint hasBg>Don't worry, it's just a random photo</Hint>
</Section>
<Section>
  <XL>Quantum Computing</XL>
  <M>
    Finally, <B>quantum computing</B> is a rapidly developing field that has the potential to revolutionize computing as we know it. Unlike traditional computing, which relies on binary digits (bits), quantum computing uses quantum bits (qubits) to perform calculations. This allows for significantly faster processing and greater computational power. While still in its early stages, quantum computing has the potential to impact a wide range of industries, from finance and logistics to pharmaceuticals and cybersecurity.
  </M>
  <Snippet
    description="Random code snippet"
    linesCount={23}
    src="https://raw.githubusercontent.com/polubis/Chromatic-and-storybook/main/src/ui/input-field/InputField.stories.tsx"
  />
</Section>
<Summary>
  <M>
    This <B>article</B> explores some of the latest trends in technology, including the Internet of Things (IoT), artificial intelligence (AI), blockchain, and quantum computing. IoT is rapidly changing how we live our lives, with interconnected devices becoming more integrated into our daily routines. AI is being used in a variety of applications, from self-driving cars to personalized healthcare. Blockchain has the potential to transform industries by providing greater transparency and security. Finally, quantum computing has the potential to revolutionize computing as we know it, with significantly faster processing and greater computational power.
  </M>
</Summary>
`
const HUGE_MDX = `<Prelude>
  <M>
    Code written by programmer is like a unique signature. We can recognize the
    author by a few lines. Let's create our unique signature by creating a
    flexible component for code snippets.
  </M>
</Prelude>

<Section>
  <XL>1. Library choice</XL>
  <M>
    The most complicated part of the component will be code syntax highlighting.
    It is better to use a battle-tested library like <B>prism</B>. In our case,
    we will use the popular wrapper - <B>prism-react-renderer</B>.
  </M>
  <M>
    The reason is simple - we can easily customize how the component works with{" "}
    <B>props</B>. Below is an example of how you can display a piece of
    <B>jsx</B> code.
  </M>
  <Snippet
    linesCount={15}
    src="https://raw.githubusercontent.com/polubis/React-code-snippet-component/main/snippets/1.tsx"
  />
  <M>
    The component injects the appropriate styles. We can customize the behavior
    and appearance to suit our needs.
  </M>
</Section>
<Section>
  <XL>2. Overwriting the theme</XL>
  <M>
    To override the theme we need an array in which we define styles for each
    element.
  </M>
  <Snippet
    linesCount={55}
    src="https://raw.githubusercontent.com/polubis/React-code-snippet-component/main/src/code/setup.ts"
  />
</Section>

<Section>
  <XL>3. Creating Code component</XL>
  <M>
    We need a wrapper for our library. First, let's determine what the{" "}
    <B>props</B> object will look like. We will define the interfaces in a
    separate file for better clarity.
  </M>
  <Snippet
    linesCount={8}
    src="https://raw.githubusercontent.com/polubis/React-code-snippet-component/main/src/code/models.ts"
  />
  <M>Then the component itself.</M>
  <Snippet
    linesCount={45}
    src="https://raw.githubusercontent.com/polubis/React-code-snippet-component/main/src/code/Code.tsx"
  />
  <M>
    We used <B>memo</B> to limit rerenders. Component will update only when code
    snippet changes. All that's left is to overwrite the styles we don't like.
  </M>
  <Snippet
    linesCount={85}
    src="https://raw.githubusercontent.com/polubis/React-code-snippet-component/main/src/code/style.ts"
  />
</Section>

<Section>
  <XL>4. Creating Snippet component</XL>
  <M>
    This component will be responsible for retrieving the content and deciding
    how to pass the parameters. It will use the previously created <B>Code</B>{" "}
    component. As before, let's start with the models.
  </M>
  <Snippet
    linesCount={69}
    src="https://raw.githubusercontent.com/polubis/React-code-snippet-component/main/src/snippet/models.ts"
  />
  <M>
    The created models will be used to implement several components. Each of
    them will have a different role. Let's start with the <B>Snippet</B>{" "}
    component.
  </M>
  <Snippet
    linesCount={17}
    src="https://raw.githubusercontent.com/polubis/React-code-snippet-component/main/src/snippet/Snippet.tsx"
  />
  <M>
    Pay attention to the exception that we <B>throw</B>. We did that because in
    the absence of <B>children</B> and <B>src</B>, our component will not work
    properly.
  </M>
  <M>
    Also, the import of the <B>SnippetProps</B> interface from another file is
    noteworthy. Separation of interfaces from implementations can be helpful
    when we want to reuse models in other components. It also changes the way
    how developer thinks. It is a bit like <B>test driven development</B>{" "}
    approach. After all, <B>TypeScript</B> is similar to one big test which
    checks our codebase in real time during compilation.
  </M>
  <Hint hasBg>
    In this{" "}
    <A
      href="/articles/quick-wins/improving-code-that-was-not-written-by-us/"
      outside
    >
      article
    </A>{" "}
    you can read more about <B>TDD</B>.
  </Hint>
</Section>

<Section>
  <XL>5. Implementing StaticSnippet component</XL>
  <M>
    This one will just render code snippet passed as <B>children</B>.
  </M>
  <Snippet
    linesCount={9}
    src="https://raw.githubusercontent.com/polubis/React-code-snippet-component/main/src/snippet/StaticSnippet.tsx"
  />
  <M>
    As before, we added implementation to the prepared model. In this case we
    just wrapped our <B>SnippetContent</B> component. We did this for the sake
    of transparency.
  </M>
</Section>

<Section>
  <XL>6. Creating SnippetContent component</XL>
  <M>
    This component adds the layout, header and description if they are passed.
  </M>
  <Snippet
    linesCount={28}
    src="https://raw.githubusercontent.com/polubis/React-code-snippet-component/main/src/snippet/SnippetContent.tsx"
  />
  <M>
    Next are styles. Nothing fancy here. Just some css for <B>header</B> and{" "}
    <B>description</B>.
  </M>
  <Snippet
    linesCount={32}
    src="https://raw.githubusercontent.com/polubis/React-code-snippet-component/main/src/snippet/style.ts"
  />
</Section>

<Section>
  <XL>7. Creating DynamicSnippet component</XL>
  <M>
    We'll use presentation from <B>SnippetContent</B> and models that we created
    before.
  </M>
  <Snippet
    linesCount={76}
    src="https://raw.githubusercontent.com/polubis/React-code-snippet-component/main/src/snippet/DynamicSnippet.tsx"
  />
  <M>What is going on here?</M>
  <List items="ASCII art is generated, We're fetching snippet via src, Code is parsed to text, We're changing state during the retrieval of the snippet, When state is pending we return ASCII art instead of code" />
</Section>

<Section>
  <XL>8. Generating ASCII art</XL>
  <M>
    We need to add some dummy characters when there are more lines in code
    snippet than in ASCII art to prevent content size change.
  </M>
  <M>
    Also, when our snippet is smaller than height of ASCII art, we need to
    remove some lines from graphic. Reason is the same - <B>user experience</B>.
  </M>
  <Snippet
    linesCount={126}
    src="https://raw.githubusercontent.com/polubis/React-code-snippet-component/main/src/snippet/ASCII.ts"
  />
</Section>

<Section>
  <XL>9. Usage</XL>
  <M>Just pass correct props and you can customize what you need.</M>
  <Snippet
    linesCount={50}
    src="https://raw.githubusercontent.com/polubis/React-code-snippet-component/main/src/App.tsx"
  />
</Section>
<Summary>
  <M>
    Right now you're able to render the code in a cool and fancy way. We've
    checked how separation of models can be useful to share type definitions
    between different files.
  </M>
  <M>
    Maybe there is a place for improvements. Feel free to try and remember to
    share results on our{" "}
    <A href="https://www.linkedin.com/in/adrian-po%C5%82ubi%C5%84ski-281ab2172/" outside>
      Linkedin
    </A>
    .
  </M>
</Summary>
`

export { INIT_MDX, SMALL_MDX, MEDIUM_MDX, HUGE_MDX }