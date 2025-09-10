import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type {ReactNode} from 'react'
import CalendarCtxProvider from "./stores/calendar/calendarCtxProvider.tsx";

const queryClient = new QueryClient()

// Create a wrapper component
const AppWrapper = () => {
    return (
        <StrictMode>
            <QueryClientProvider client={queryClient}>
                <FluentProvider theme={webLightTheme}>
                    <CalendarCtxProvider>
                        <App />
                    </CalendarCtxProvider>
                </FluentProvider>
            </QueryClientProvider>
        </StrictMode>
    )
}

createRoot(document.getElementById('root')!).render(<AppWrapper /> as ReactNode)
