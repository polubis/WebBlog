import React from "react"
import { createAlertsProvider } from "../../../ui/alerts/AlertsProvider"
import Badge from "../../../../components/article/Badge"
import theme from "../../../../utils/theme"
import styled from "styled-components"

const Container = styled.div`
    position: fixed;
    top: 20px;
    left: 0;
    right: 0;
    width: 280px;
    margin: 0 auto;
    z-index: 2000;
    
    & > * {
        margin-bottom: 8px;
    }
`

const [
    BlogCreatorAlertsProvider,
    useBlogCreatorAlertsProvider,
] = createAlertsProvider<{ message: string }>({
    ContainerComponent: ({ alerts, remove }) => (
        <Container className="col">
            {alerts.map(({ id, message }) => (
                <Badge
                    key={id}
                    color={theme.bg}
                    background={theme.secondary}
                    onClick={() => remove(id)}
                >
                    {message}
                </Badge>
            ))}
        </Container>
    ),
})

export { BlogCreatorAlertsProvider, useBlogCreatorAlertsProvider }
