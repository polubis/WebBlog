import React from "react"
import styled from "styled-components"

import Layout from "../components/layout/Layout"
import ArticleTile from "../components/article-tile/ArticleTile"
import theme from "../utils/theme"
import ReactArticleOverlay from "../components/articles-overlays/ReactArticleOverlay"
import AngularArticleOverlay from "../components/articles-overlays/AngularArticleOverlay"

const ArticlesPage = styled.div`
  display: grid;
  grid-template-columns: 442px 442px 442px;
  grid-template-rows: auto;
  grid-gap: 72px;
  justify-content: center;
  padding: 100px 82px;
  box-sizing: border-box;

  & > div {
    &::after,
    &::before {
      position: absolute;
      height: 128px;
      width: 1px;
      background: ${theme.primary};
    }

    &::after {
      top: 0;
      right: 0;
    }

    &::before {
      bottom: 0;
      left: 0;
    }

    &:nth-of-type(3n) {
      &::before {
        content: "";
      }
    }

    &:first-of-type,
    &:nth-of-type(3n + 4) {
      &::after {
        content: "";
      }
    }

    &:nth-of-type(3n + 2) {
      &::after,
      &::before {
        content: "";
      }
    }
  }
`

const ArticlesPageOverlays = styled.div`
  position: absolute;
  display: flex;
  flex-flow: column;
  padding: 240px 82px;
  box-sizing: border-box;
  margin: 0 auto;
  left: 0;
  right: 0;
  width: 1420px;

  svg {
    margin-bottom: 200px;

    &:nth-of-type(odd) {
      margin-left: auto;
    }

    &:nth-of-type(even) {
      margin-right: auto;
    }
  }
`

export default function (): React.ReactElement {
  return (
    <Layout>
      <ArticlesPageOverlays>
        <AngularArticleOverlay />
        <ReactArticleOverlay />
      </ArticlesPageOverlays>
      <ArticlesPage>
        <ArticleTile
          article={{
            title: "TDD in React",
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Pellentesque congue blandit sapien, eget tristique diam 
          rutrum eu. In tincidunt felis vel leo varius consectetur. 
          Phasellus rutrum elit urna, ac mollis lectus tempor vitae. 
          Vestibulum maximus leo erat, eget porta mi commodo a. 
          Qu`,
            tags: ["react", "angular", "vue"],
          }}
        />
        <ArticleTile
          article={{
            title: "TDD in React",
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Pellentesque congue blandit sapien, eget tristique diam 
          rutrum eu. In tincidunt felis vel leo varius consectetur. 
          Phasellus rutrum elit urna, ac mollis lectus tempor vitae. 
          Vestibulum maximus leo erat, eget porta mi commodo a. 
          Qu`,
            tags: ["react", "angular", "vue"],
          }}
        />
        <ArticleTile
          article={{
            title: "TDD in React",
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Pellentesque congue blandit sapien, eget tristique diam 
          rutrum eu. In tincidunt felis vel leo varius consectetur. 
          Phasellus rutrum elit urna, ac mollis lectus tempor vitae. 
          Vestibulum maximus leo erat, eget porta mi commodo a. 
          Qu`,
            tags: ["react", "angular", "vue"],
          }}
        />
        <ArticleTile
          article={{
            title: "TDD in React",
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Pellentesque congue blandit sapien, eget tristique diam 
          rutrum eu. In tincidunt felis vel leo varius consectetur. 
          Phasellus rutrum elit urna, ac mollis lectus tempor vitae. 
          Vestibulum maximus leo erat, eget porta mi commodo a. 
          Qu`,
            tags: ["react", "angular", "vue"],
          }}
        />
        <ArticleTile
          article={{
            title: "TDD in React",
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Pellentesque congue blandit sapien, eget tristique diam 
          rutrum eu. In tincidunt felis vel leo varius consectetur. 
          Phasellus rutrum elit urna, ac mollis lectus tempor vitae. 
          Vestibulum maximus leo erat, eget porta mi commodo a. 
          Qu`,
            tags: ["react", "angular", "vue"],
          }}
        />{" "}
        <ArticleTile
          article={{
            title: "TDD in React",
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Pellentesque congue blandit sapien, eget tristique diam 
        rutrum eu. In tincidunt felis vel leo varius consectetur. 
        Phasellus rutrum elit urna, ac mollis lectus tempor vitae. 
        Vestibulum maximus leo erat, eget porta mi commodo a. 
        Qu`,
            tags: ["react", "angular", "vue"],
          }}
        />{" "}
        <ArticleTile
          article={{
            title: "TDD in React",
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      Pellentesque congue blandit sapien, eget tristique diam 
      rutrum eu. In tincidunt felis vel leo varius consectetur. 
      Phasellus rutrum elit urna, ac mollis lectus tempor vitae. 
      Vestibulum maximus leo erat, eget porta mi commodo a. 
      Qu`,
            tags: ["react", "angular", "vue"],
          }}
        />{" "}
        <ArticleTile
          article={{
            title: "TDD in React",
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
    Pellentesque congue blandit sapien, eget tristique diam 
    rutrum eu. In tincidunt felis vel leo varius consectetur. 
    Phasellus rutrum elit urna, ac mollis lectus tempor vitae. 
    Vestibulum maximus leo erat, eget porta mi commodo a. 
    Qu`,
            tags: ["react", "angular", "vue"],
          }}
        />{" "}
        <ArticleTile
          article={{
            title: "TDD in React",
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
  Pellentesque congue blandit sapien, eget tristique diam 
  rutrum eu. In tincidunt felis vel leo varius consectetur. 
  Phasellus rutrum elit urna, ac mollis lectus tempor vitae. 
  Vestibulum maximus leo erat, eget porta mi commodo a. 
  Qu`,
            tags: ["react", "angular", "vue"],
          }}
        />{" "}
        <ArticleTile
          article={{
            title: "TDD in React",
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Pellentesque congue blandit sapien, eget tristique diam 
          rutrum eu. In tincidunt felis vel leo varius consectetur. 
          Phasellus rutrum elit urna, ac mollis lectus tempor vitae. 
          Vestibulum maximus leo erat, eget porta mi commodo a. 
          Qu`,
            tags: ["react", "angular", "vue"],
          }}
        />{" "}
        <ArticleTile
          article={{
            title: "TDD in React",
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Pellentesque congue blandit sapien, eget tristique diam 
        rutrum eu. In tincidunt felis vel leo varius consectetur. 
        Phasellus rutrum elit urna, ac mollis lectus tempor vitae. 
        Vestibulum maximus leo erat, eget porta mi commodo a. 
        Qu`,
            tags: ["react", "angular", "vue"],
          }}
        />{" "}
        <ArticleTile
          article={{
            title: "TDD in React",
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      Pellentesque congue blandit sapien, eget tristique diam 
      rutrum eu. In tincidunt felis vel leo varius consectetur. 
      Phasellus rutrum elit urna, ac mollis lectus tempor vitae. 
      Vestibulum maximus leo erat, eget porta mi commodo a. 
      Qu`,
            tags: ["react", "angular", "vue"],
          }}
        />{" "}
        <ArticleTile
          article={{
            title: "TDD in React",
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
    Pellentesque congue blandit sapien, eget tristique diam 
    rutrum eu. In tincidunt felis vel leo varius consectetur. 
    Phasellus rutrum elit urna, ac mollis lectus tempor vitae. 
    Vestibulum maximus leo erat, eget porta mi commodo a. 
    Qu`,
            tags: ["react", "angular", "vue"],
          }}
        />
        <ArticleTile
          article={{
            title: "TDD in React",
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Pellentesque congue blandit sapien, eget tristique diam 
          rutrum eu. In tincidunt felis vel leo varius consectetur. 
          Phasellus rutrum elit urna, ac mollis lectus tempor vitae. 
          Vestibulum maximus leo erat, eget porta mi commodo a. 
          Qu`,
            tags: ["react", "angular", "vue"],
          }}
        />
        <ArticleTile
          article={{
            title: "TDD in React",
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Pellentesque congue blandit sapien, eget tristique diam 
          rutrum eu. In tincidunt felis vel leo varius consectetur. 
          Phasellus rutrum elit urna, ac mollis lectus tempor vitae. 
          Vestibulum maximus leo erat, eget porta mi commodo a. 
          Qu`,
            tags: ["react", "angular", "vue"],
          }}
        />
        <ArticleTile
          article={{
            title: "TDD in React",
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Pellentesque congue blandit sapien, eget tristique diam 
          rutrum eu. In tincidunt felis vel leo varius consectetur. 
          Phasellus rutrum elit urna, ac mollis lectus tempor vitae. 
          Vestibulum maximus leo erat, eget porta mi commodo a. 
          Qu`,
            tags: ["react", "angular", "vue"],
          }}
        />
        <ArticleTile
          article={{
            title: "TDD in React",
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Pellentesque congue blandit sapien, eget tristique diam 
          rutrum eu. In tincidunt felis vel leo varius consectetur. 
          Phasellus rutrum elit urna, ac mollis lectus tempor vitae. 
          Vestibulum maximus leo erat, eget porta mi commodo a. 
          Qu`,
            tags: ["react", "angular", "vue"],
          }}
        />
        <ArticleTile
          article={{
            title: "TDD in React",
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Pellentesque congue blandit sapien, eget tristique diam 
          rutrum eu. In tincidunt felis vel leo varius consectetur. 
          Phasellus rutrum elit urna, ac mollis lectus tempor vitae. 
          Vestibulum maximus leo erat, eget porta mi commodo a. 
          Quisque elit velit, maximus ac risus eu, aliquet scelerisque 
          lacus. Sed id mollis leo. Curabitur faucibus tempor velit ut 
          finibus. In vel mi vel odio interdum aliquam. Cras eu quam 
          velit. Morbi eleifend erat vel enim hendrerit, id vehicula urna 
          egestas.`,
            tags: ["react", "angular", "vue"],
          }}
        />
        <ArticleTile
          article={{
            title: "TDD in React",
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Pellentesque congue blandit sapien, eget tristique diam 
          rutrum eu. In tincidunt felis vel leo varius consectetur. 
          Phasellus rutrum elit urna, ac mollis lectus tempor vitae. 
          Vestibulum maximus leo erat, eget porta mi commodo a. 
          Quisque elit velit, maximus ac risus eu, aliquet scelerisque 
          lacus. Sed id mollis leo. Curabitur faucibus tempor velit ut 
          finibus. In vel mi vel odio interdum aliquam. Cras eu quam 
          velit. Morbi eleifend erat vel enim hendrerit, id vehicula urna 
          egestas.`,
            tags: ["react", "angular", "vue"],
          }}
        />
        <ArticleTile
          article={{
            title: "TDD in React",
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Pellentesque congue blandit sapien, eget tristique diam 
          rutrum eu. In tincidunt felis vel leo varius consectetur. 
          Phasellus rutrum elit urna, ac mollis lectus tempor vitae. 
          Vestibulum maximus leo erat, eget porta mi commodo a. 
          Quisque elit velit, maximus ac risus eu, aliquet scelerisque 
          lacus. Sed id mollis leo. Curabitur faucibus tempor velit ut 
          finibus. In vel mi vel odio interdum aliquam. Cras eu quam 
          velit. Morbi eleifend erat vel enim hendrerit, id vehicula urna 
          egestas.`,
            tags: ["react", "angular", "vue"],
          }}
        />
        <ArticleTile
          article={{
            title: "TDD in React",
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Pellentesque congue blandit sapien, eget tristique diam 
          rutrum eu. In tincidunt felis vel leo varius consectetur. 
          Phasellus rutrum elit urna, ac mollis lectus tempor vitae. 
          Vestibulum maximus leo erat, eget porta mi commodo a. 
          Quisque elit velit, maximus ac risus eu, aliquet scelerisque 
          lacus. Sed id mollis leo. Curabitur faucibus tempor velit ut 
          finibus. In vel mi vel odio interdum aliquam. Cras eu quam 
          velit. Morbi eleifend erat vel enim hendrerit, id vehicula urna 
          egestas.`,
            tags: ["react", "angular", "vue"],
          }}
        />
      </ArticlesPage>
    </Layout>
  )
}
