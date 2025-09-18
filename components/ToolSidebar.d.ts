import React from 'react';
interface Tool {
    id: string;
    name: string;
    icon: React.ReactNode;
}
interface ToolSidebarProps {
    tools: Tool[];
}
declare const ToolSidebar: React.FC<ToolSidebarProps>;
export default ToolSidebar;
//# sourceMappingURL=ToolSidebar.d.ts.map