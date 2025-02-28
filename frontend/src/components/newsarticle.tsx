import { useState } from "react";

interface ExpandableTextProps {
    text: string;  // 'text' is required and must be a string
    maxLength?: number;  // 'maxLength' is optional and must be a number
}

export default function ExpandableText({ text, maxLength = 100 }: ExpandableTextProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => setIsExpanded(!isExpanded);

    return (
        <div className="cursor-pointer text-blue-500 hover:underline" onClick={toggleExpand}>
        {isExpanded ? text : `${text.slice(0, maxLength)}->`}
        <span className="ml-1 text-gray-400">
            <p>
        {isExpanded ? "Show less" : "Show more"}
                </p>
        </span>
        </div>
);
}