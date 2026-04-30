import React from "react";

export const CardSkeleton = () => (
    <div className="flex flex-col gap-4">
        <div className="w-full h-[200px] md:h-[350px] bg-white/5 animate-pulse rounded-sm" />
        <div className="space-y-2">
            <div className="w-3/4 h-6 bg-white/5 animate-pulse rounded" />
        </div>
    </div>
);

export const ListSkeleton = () => (
    <div className="flex items-center gap-4 py-3 border-b border-white/5">
        <div className="w-10 h-10 bg-white/5 animate-pulse rounded-sm flex-shrink-0" />
        <div className="flex-1 space-y-2">
            <div className="w-1/2 h-4 bg-white/5 animate-pulse rounded" />
            <div className="w-1/4 h-3 bg-white/5 animate-pulse rounded" />
        </div>
    </div>
);
