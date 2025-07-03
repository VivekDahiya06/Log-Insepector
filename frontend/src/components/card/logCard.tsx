import { type FC } from 'react';
import type { Log } from '../../types/log.types';
import { VscGraphLine } from "react-icons/vsc";
import { Chip } from '@mui/material';

// Type Definition for Props
interface LogCardProps {
    Log: Log;
}

const Log_Card: FC<LogCardProps> = ({ Log }) => {
    let color = '#bdbdbd'; // default gray
    switch (Log.level) {
        case 'error':
            color = '#f44336'; // red
            break;
        case 'warn':
            color = '#ff9800'; // orange
            break;
        case 'info':
            color = '#2196f3'; // blue
            break;
        case 'debug':
            color = '#4caf50'; // green
            break;
        default:
            color = '#bdbdbd'; // gray
    }
    return (
        <main
            className={
                `relative w-full max-w-sm border rounded-xl shadow-lg bg-white flex flex-col transition-transform duration-300 hover:scale-[1.025] hover:shadow-2xl`
            }
            style={{
                borderLeft: `6px solid ${color}`,
                marginBottom: 20,
            }}
        >
            {/* Floating log level chip */}
            <Chip
                label={Log.level.toUpperCase()}
                sx={{
                    position: 'absolute',
                    top: 16,
                    left: -24,
                    backgroundColor: color,
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: 14,
                    letterSpacing: 1,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    zIndex: 2,
                }}
            />
            <section className="w-full flex flex-col items-start justify-start gap-2 pl-14 pr-8 pt-8 pb-5">
                <header className="w-full flex items-center gap-4 mb-2">
                    <VscGraphLine size={26} color={color} />
                    <h1 className="text-lg font-semibold break-words max-w-[22ch] text-gray-900">{Log.message}</h1>
                </header>
                <div className="w-full flex flex-col gap-1 text-sm text-gray-700">
                    <div className="flex flex-row gap-2"><span className="font-medium w-28">Resource ID:</span> <span className="truncate">{Log.resourceId}</span></div>
                    <div className="flex flex-row gap-2"><span className="font-medium w-28">Timestamp:</span> <span className="truncate">{Log.timestamp}</span></div>
                    <div className="flex flex-row gap-2"><span className="font-medium w-28">Trace ID:</span> <span className="truncate">{Log.traceId}</span></div>
                    <div className="flex flex-row gap-2"><span className="font-medium w-28">Span ID:</span> <span className="truncate">{Log.spanId}</span></div>
                    <div className="flex flex-row gap-2"><span className="font-medium w-28">Commit:</span> <span className="truncate">{Log.commit}</span></div>
                </div>
            </section>
        </main>
    )
}

export default Log_Card;
