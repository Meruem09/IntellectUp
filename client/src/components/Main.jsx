import ChatWindow from "./ChatWindow";
import Split from 'react-split';
import { Component, use, useState } from "react";
import Content from "./Content";
import Quizzes from "./Quizzes";
import Notes from "./Notes";


  const tabs = [
    {name:'Content', Component:<Content/>},
    {name:'Quizzes', Component:<Quizzes/>},
    {name:'Notes', Component:<Notes/>}
  ]

const Main = () => {

     const [activeTab, setActiveTab] = useState("Quizzes");

  return (

    <>
      <Split
        className="flex h-[10%] "
        gutterclassname="custom-gutter"
        sizes={[50, 50]}
        minSize={[550,300]}
        gutterSize={1}
        direction="horizontal"
      >
        <div>
          <ChatWindow/>
        </div>
        <div>
          <div className="min-h-screen bg-black text-white">
           <div className="flex space-x-6  border-gray-700 px-6 py-4">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                className={`text-lg font-medium ${
                  activeTab === tab.name ? "text-blue-400  border-blue-400" : "text-gray-400"
                }`}
                onClick={() => setActiveTab(tab.name)}
              >
                {tab.name}
              </button>
            ))}
           </div>

            <div className="p-6 h-screen">
              {tabs.find((tab) => tab.name === activeTab)?.Component}
            </div>
          </div>
        </div>
      </Split>
    </> 
   );
}
 
export default Main;