import { useState, useEffect } from 'react';
import { getFromLocalStorage } from '../utils/getFromLocalStorage';
import type { CalendarData } from '../types/calendarData';
import type { Passage } from '../types/passage';

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [calendarData, setCalendarData] = useState<CalendarData>({});
  const [passages, setPassages] = useState<Passage[]>([]);

  useEffect(() => {
    getFromLocalStorage()
    .then(() => {
      setCalendarData(JSON.parse(localStorage.getItem('calendarData') ?? '{}'));
      setPassages(JSON.parse(localStorage.getItem('passages') ?? '{}'));
    })
    .finally(() => {
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <h1>Daily Lectionary LSB</h1>
      {isLoading && (
        <h2>Loading...</h2>
      )}
      {!isLoading && (
        <>
          <h2>{calendarData.date}</h2>
          {passages?.map((passage, pid) => {
            return (
              <div key={pid}>
                <h2 className="font-bold text-center">{passage.label}</h2>
                {passage.optional && (<h2 className="font-bold text-center">(Optional)</h2>)}
                {passage.chapters.map((chapter, cid) => {
                  return(
                    <table key={cid}>
                      <tbody>
                        {chapter.verses.map((verse, vid) => {
                          return(
                            <tr key={vid}>
                              <td className="align-top min-w-8">{verse.verse}</td>
                              <td>{verse.text}</td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  )
                })}
              </div>
            )
          })}
        </>
      )}
    </>
  );
}
