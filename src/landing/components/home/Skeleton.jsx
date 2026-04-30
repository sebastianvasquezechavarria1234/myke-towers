import React from "react";

export const Skeleton = ({ height = "h-[200px] md:h-[350px]", hasText = true }) => (
    <div className="flex flex-col gap-4">
        <div className={`w-full ${height} bg-white/5 animate-pulse rounded-sm`} />
        {hasText && (
            <div className="space-y-2">
                <div className="w-3/4 h-6 bg-white/5 animate-pulse rounded" />
                <div className="w-1/2 h-4 bg-white/5 animate-pulse rounded opacity-50" />
            </div>
        )}
    </div>
);
