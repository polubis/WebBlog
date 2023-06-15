import { useEffect } from "react"

interface Configuration {
    text: string;
    active: boolean;
}

const useLeavePageAlert = ({ active, text }: Configuration) => {
    useEffect(() => {
        if (confirm === undefined) {
            return;
        }

        const handleRouteChange = (): void => {
            if (!active) {
                return;
            }

            confirm(text)
        }

        const handleSessionEnd = (e: BeforeUnloadEvent): void => {
            if (!active) {
                return;
            }

            if (!confirm(text)) {
                e.returnValue = text
                history.pushState(null, document.title, location.href);
                e.preventDefault();
            }
        }

        addEventListener('popstate', handleRouteChange);
        addEventListener('beforeunload', handleSessionEnd);

        return () => {
            removeEventListener('popstate', handleRouteChange);
            removeEventListener('beforeunload', handleSessionEnd);
        }
    }, [active, text])
}

export { useLeavePageAlert }