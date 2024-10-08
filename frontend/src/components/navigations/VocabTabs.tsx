import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useAppSelector } from '../../data/state/hooksForTS';

interface VocabTabsProps {
    wordTypeIdx: number
    setWordTypeIdx: (_: number) => any
}
export default function VocabTabs({ wordTypeIdx,
    setWordTypeIdx }: VocabTabsProps) {

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setWordTypeIdx(newValue);
    };

    const vocabulary = useAppSelector((state) => state.mainValues.analysis.vocabulary)
    const wordTypes = Object.keys(vocabulary)

    React.useEffect(() => {
        // scroll to top (appears scrolled all the way to the bottom)
        const id = "card-head" // "tabs-top"
        const el = document.getElementById(id); if (!el) return
        el.scrollIntoView({ "behavior": "smooth", "block": "end", "inline": "end" })
    }, [])

    return (
        <Box className="w-full" sx={{ bgcolor: 'background.paper' }}>
            <Tabs
                id="vocab-tabs"
                value={wordTypeIdx}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons={false}
                selectionFollowsFocus
                aria-label="scrollable prevent tabs example"
            >
                {wordTypes.map(el => {
                    return (<Tab label={el} />)
                })}
            </Tabs>
        </Box>
    );
}