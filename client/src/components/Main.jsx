import ChatWindow from "./ChatWindow";
import Split from 'react-split';
const Main = () => {
  return (
    <>
      <Split
      
      
      
      >
        <div>
          <ChatWindow/>
        </div>
        <div>
          <Content/>
          <Quizzes/>
          <Notes/>
        </div>
      </Split>
    </> 
   );
}
 
export default Main;