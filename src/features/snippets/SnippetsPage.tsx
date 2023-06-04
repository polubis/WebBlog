import React from "react"

import Layout from "../../components/layout/Layout"
import { SiteMeta } from "../../utils/SiteMeta"
import { Content } from "../../ui"
import { AllDataResponse } from "../../api"
import { SnippetPreview } from "./SnippetPreview"

interface SnippetsPageProps {
    pageContext: AllDataResponse
}

const SnippetCreatorPage = ({
    pageContext: { site, translationObject, footerArticles },
}: SnippetsPageProps) => {
    const t = translationObject["en"]

    return (
        <SiteMeta
            siteName={site.siteName}
            siteLang={site.langs.en.html}
            gaPage="snippets"
            url="/snippets/"
            robots="index,follow"
            title={`${site.siteName} snippets preview: Play with generated snippets and learn how to code`}
            description="Use generated snippets and learn stuff quickly, by examples and without wasting time."
            type="website"
            image="/icon-192x192.png"
        >
            <Layout disableFooter disableSocialBar articles={footerArticles} t={t} routes={site.routes}>
                <Content paddingY>
                    <SnippetPreview />
                </Content>
            </Layout>
        </SiteMeta>
    )
}

export default SnippetCreatorPage
