import React from 'react'
import clsx from "clsx";
import Card from './card';

const WorkSpaceCard = ({ 
    isListView, 
    isGridView, 
    currentPagelist
  }) => {
  return (
    <div className={clsx({
      ["grid gap-4 view-layout"]: true,
      ["grid-cols-1 list-view"]: isListView,
      ["grid-cols-2 grid-view"]: isGridView
    })}>
      <Card 
        // key={}
        isListView={isListView} 
        isGridView={isGridView} 
        currentPagelist={currentPagelist} 
      />
    </div>
  )
}

export default WorkSpaceCard
