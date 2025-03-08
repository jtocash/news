import { useState } from "react";

interface ExpandableTextProps {
    text: string;
    title: string;
    children: string;
}

export default function ExpandableText({ title, text }: ExpandableTextProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => setIsExpanded(!isExpanded);

    return (
        <div
            className="cursor-pointer text-blue-500 hover:underline"
            onClick={toggleExpand}
        >
            {getDisplayedText(title, text, isExpanded)}
        </div>
    );
}

function getDisplayedText(title: string, text: string, isExpanded: boolean) {
    if (isExpanded) {
        return text;
    }

    else
    {
        return title;
    }

}


