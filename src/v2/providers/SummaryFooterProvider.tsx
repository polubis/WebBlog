import { createPageProvider } from "./PageProvider"
import { Layout, } from "../core/models"

interface SummaryFooterModel {
    type: 'article' | 'lesson'
}

const [
    SummaryFooterProvider,
    useSummaryFooterProvider,
] = createPageProvider<SummaryFooterModel>(null)

export { SummaryFooterProvider, useSummaryFooterProvider }
