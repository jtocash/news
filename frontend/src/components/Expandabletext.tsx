import { useState, useEffect } from "react";

interface ExpandableTextProps {
    text: string;
    title: string;
    children?: string;
}



export default function ExpandableText({ title, text }: ExpandableTextProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [titleclass, settitleclass] = useState("");
    useEffect(() => {
       if (isExpanded)
       {
           settitleclass("bold")
       }
       else
       {
           settitleclass("")
       }

    }, [isExpanded]); // Runs whenever 'count' changes


    const toggleExpand = () => setIsExpanded(!isExpanded);

    return (
        <div>
            <div className={titleclass} onClick={toggleExpand}>
                {title}
            </div>
            {isExpanded && <div style={{marginTop: '1rem'}} className="mt-1">{text}</div>}
        </div>
    );
}
