"use client";

import React, { useState } from "react";
import LayersPanel from "@/components/ui/ui-builder/internal/layers-panel";
import EditorPanel from "@/components/ui/ui-builder/internal/editor-panel";
import PropsPanel from "@/components/ui/ui-builder/internal/props-panel";
import { NavBar } from "@/components/ui/ui-builder/internal/nav";
import { ThemeProvider } from "next-themes";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ThemePanel } from "@/components/ui/ui-builder/internal/theme-panel";
import {
  ResizablePanel,
  ResizableHandle,
  ResizablePanelGroup,
} from "../resizable";
import { Button } from "../button";

const ComponentEditor = () => {
  const mainPanels = [
    {
      title: "Page Config",
      content: <PageConfigPanel className="p-4 overflow-y-auto" />,
      defaultSize: 25,
    },
    {
      title: "UI Editor",
      content: <EditorPanel className="pb-20 md:pb-0 overflow-y-auto" />,
      defaultSize: 50,
    },
    {
      title: "Props",
      content: <PropsPanel className="p-4 overflow-y-auto" />,
      defaultSize: 25,
    },
  ];

  const [selectedPanel, setSelectedPanel] = useState(mainPanels[0]);
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div
        data-testid="component-editor"
        className="flex flex-col w-full flex-grow h-full"
      >
        <NavBar />
        {/* Desktop Layout */}
        <div className="hidden md:flex size-full">
          <ResizablePanelGroup
            direction="horizontal"
            className="flex overflow-hidden size-full"
          >
            {mainPanels.map((panel, index) => (
              <React.Fragment key={panel.title}>
                {index > 0 && <ResizableHandle withHandle />}
                <ResizablePanel defaultSize={panel.defaultSize} minSize={15} className="min-h-full">
                  {panel.content}
                </ResizablePanel>
              </React.Fragment>
            ))}
          </ResizablePanelGroup>
        </div>
        {/* Mobile Layout */}
        <div className="flex size-full flex-col md:hidden overflow-hidden ">
          {selectedPanel.content}
          <div className="absolute bottom-4 left-4 right-4 z-50">
            <div className="flex justify-center rounded-full bg-primary p-2 shadow-lg">
              {mainPanels.map((panel, index) => (
                <Button
                  key={panel.title}
                  variant={selectedPanel.title !== panel.title ? "default" : "secondary"}
                  size="sm"
                  className="flex-1"
                  onClick={() => setSelectedPanel(panel)}
                >
                  {panel.title}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

function PageConfigPanel({ className }: { className: string }) {
  return (
    <Tabs defaultValue="layers" className={className}>
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="layers">Layers</TabsTrigger>
        <TabsTrigger value="theme">Theme</TabsTrigger>
      </TabsList>
      <TabsContent value="layers">
        <LayersPanel />
      </TabsContent>
      <TabsContent value="theme">
        <ThemePanel />
      </TabsContent>
    </Tabs>
  );
}

export default ComponentEditor;
