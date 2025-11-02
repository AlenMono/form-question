// Question.tsx
import React from "react";
import type { Question } from "../data/FormSchema";

export function QuestionItem({
    question,
    value,
    index,
    onChange,
}: {
    question: Question;
    value: any;
    index: number;
    onChange: (val: any) => void;
})
{
    if (question.type === "text")
    {
        return (
            <div className="flex flex-col space-y-1">
                <label className="font-medium">
                    {index + 1}. {question.label}
                </label>
                <input
                    type="text"
                    value={value || ""}
                    onChange={(e) => onChange(e.target.value)}
                    className="border rounded px-2 py-1"
                />
            </div>
        );
    }

    if (question.type === "radio")
    {
        return (
            <div className="flex flex-col space-y-1">
                <label className="font-medium">
                    {index + 1}. {question.label}
                </label>
                <div className="flex flex-wrap gap-2">
                    {question.options?.map((opt) => (
                        <label key={opt.value} className="flex items-center gap-1">
                            <input
                                type="radio"
                                name={String(question.id)}
                                value={opt.value}
                                checked={value === opt.value}
                                onChange={() => onChange(opt.value)}
                            />
                            {opt.label}
                        </label>
                    ))}
                </div>
            </div>
        );
    }

    if (question.type === "select")
    {
        return (
            <div className="flex flex-col space-y-1">
                <label className="font-medium">
                    {index + 1}. {question.label}
                </label>
                <select
                    value={value || ""}
                    onChange={(e) => onChange(e.target.value)}
                    className="border rounded px-2 py-1"
                >
                    <option value="">Select...</option>
                    {question.options?.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            </div>
        );
    }

    return null;
}
