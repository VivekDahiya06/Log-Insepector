import type { FC, JSX } from 'react';
import { styled, Tooltip, tooltipClasses, type TooltipProps } from '@mui/material';


// Type Definition for Props
interface Props {
    children: JSX.Element;
    title: string;
}

const ToolTip: FC<Props> = ({ children, title }) => {

    // Custom Components
    const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
        <Tooltip {...props} arrow classes={{ popper: className }} />
    ))(() => ({
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: '#000000',
            color: '#fff',
        },
        [`& .${tooltipClasses.arrow}`]: {
            color: '#000000',
        },

    }));


    return (
        <CustomTooltip
            title={title}
            arrow
            slotProps={{
                popper: {
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [0, -8],
                            },
                        },
                    ],
                },
            }}
        >
            {children}
        </CustomTooltip>
    )
}

export default ToolTip;
