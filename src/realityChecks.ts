
export type ReminderConfig = {enabled:boolean; count:number; start:string; end:string}
export const defaultReminders:ReminderConfig={enabled:false,count:7,start:'09:00',end:'21:00'}
export function minutes(time:string){const m=/^([01]\d|2[0-3]):([0-5]\d)$/.exec(time);return m?Number(m[1])*60+Number(m[2]):null}
export function validConfig(c:ReminderConfig){return Number.isInteger(c.count)&&c.count>=5&&c.count<=12&&minutes(c.start)!==null&&minutes(c.end)!==null}
// Equal times mean a full 24-hour window; otherwise an end before a start runs into the following day.
export function windowLength(start:string,end:string){const a=minutes(start),b=minutes(end);if(a===null||b===null)return 0;return a===b?1440:(b-a+1440)%1440}
function seeded(seed:number){let x=seed|0;return ()=>{x=(Math.imul(1664525,x)+1013904223)|0;return (x>>>0)/4294967296}}
export function generateTimes(c:ReminderConfig,date:Date):Date[]{
 if(!validConfig(c))return []
 const start=minutes(c.start)!,len=windowLength(c.start,c.end)
 const midnight=new Date(date.getFullYear(),date.getMonth(),date.getDate())
 const seed=Number(`${date.getFullYear()}${String(date.getMonth()+1).padStart(2,'0')}${String(date.getDate()).padStart(2,'0')}`)+c.count*97+start*13+len
 const random=seeded(seed)
 // Stratified randomness makes every day unpredictable while avoiding notification clusters.
 return Array.from({length:c.count},(_,i)=>{
  const position=(i+0.15+random()*0.7)/c.count
  return new Date(midnight.getTime()+(start+Math.floor(len*position))*60000)
 })
}
export async function scheduleReminders(c:ReminderConfig):Promise<'scheduled'|'disabled'|'unavailable'|'denied'> {
 if(!c.enabled||!validConfig(c))return 'disabled'
 if(!('Notification' in window))return 'unavailable'
 if(Notification.permission==='default'){
  const permission=await Notification.requestPermission()
  if(permission!=='granted')return 'denied'
 }
 if(Notification.permission!=='granted')return 'denied'
 return 'scheduled'
}
