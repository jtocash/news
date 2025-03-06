import { useState } from "react";

interface ExpandableTextProps {
    maxLength?: number; // Optional maxLength
    text: string;
    children: string;
}

export default function ExpandableText({ text, maxLength = 100 }: ExpandableTextProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => setIsExpanded(!isExpanded);

    return (
        <div className="cursor-pointer text-blue-500 hover:underline" onClick={toggleExpand}>
            {isExpanded ? text : text.length > maxLength ? `${text.slice(0, maxLength)}...` : text}

        </div>
    );
}
