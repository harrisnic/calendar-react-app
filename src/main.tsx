import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type {ReactNode} from 'react'
import CalendarCtxProvider from "./stores/calendar/CalendarCtxProvider.tsx";

const queryClient = new QueryClient()

// Create a wrapper component
const AppWrapper = () => {
    return (
        <StrictMode>
            <QueryClientProvider client={queryClient}>
                <CalendarCtxProvider>
                    <App />
                </CalendarCtxProvider>
            </QueryClientProvider>
        </StrictMode>
    )
}

createRoot(document.getElementById('root')!).render(<AppWrapper /> as ReactNode)
