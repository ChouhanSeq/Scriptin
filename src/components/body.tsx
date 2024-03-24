// @ts-nocheck
import { useMemo, useState } from "react";
import Quotes from "./quotes";
import Footer from "./footer";
import CounterCard from "./features/counter";

const Body = ({ scripts, addScript }) => {

  const defaultToggles = { isAddCounter: false, isAddScript: false };
  const [toggles, updateToggles] = useState(defaultToggles);

  const Notes = () => {
    return (
      <p>
        {scripts?.length ? scripts.map((script: any, index) => (
          <p className="Cards" key={'card' + index}>
            <div><b><u>{script?.heading}</u></b> {script?.type ? <span className="Tag">{script.type}</span> : '' }</div>
            <div>
              <pre>{script?.content}</pre>
              <span className="DateContainer">Date: {script?.dateCreated}</span>
            </div>
          </p>
        )) : ''}
      </p>
    )
  }

  const CounterButton = () => {
    return (
      <div className="Cards Button" onClick={() => updateToggles(prev => ({...prev, isAddCounter: !prev.isAddCounter }))}>
        {!toggles.isAddCounter ? 'Start' : 'Cancel'} Counter
      </div>
    )
  }

  const AddScriptButton = () => {
    return (
      <div className="Cards Button" onClick={() => updateToggles(prev => ({...prev, isAddScript: !prev.isAddScript }))}>
        {!toggles.isAddScript ? 'Add' : 'Cancel'} Script
      </div>
    )
  }

  const newCounterIndexNumber = useMemo(() => {
    return (scripts?.filter( script => script.type === 'COUNTER')?.length || 0) + 1;
  }, [scripts]);

  return (
    <div>
      <Quotes />
      <Notes />
      <CounterButton />
      <AddScriptButton />
      {toggles.isAddScript && <Footer addScript={addScript} />}
      {toggles.isAddCounter && <CounterCard cardIndex={newCounterIndexNumber} addScript={addScript} />}
    </div>)
}

export default Body;